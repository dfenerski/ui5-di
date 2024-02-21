/* eslint-disable @typescript-eslint/no-explicit-any */

import 'reflect-metadata/lite';
import { DIContainer } from './di-container/DIContainer';
import type { IDependencyWraplet } from './di-container/interfaces/IDependencyWraplet';
import { Precedence as P } from './di-container/misc/constants';
import type { DependencyProxyContext } from './di-container/types/DependencyProxyContext';
import { InjectorUtil } from './injector-util/InjectorUtil';
import { DependencyResolutionStrategy as DRS } from './injector-util/misc/constants';
import type { DependencyResolutionStrategyType as DRST } from './injector-util/types/DependencyResolutionStrategyType';
import {
    E_INJECTOR_NO_DEPENDENCY_FACTORY,
    type Class,
    type ClassInstance,
    type ClassInstanceProxy,
    type ConcreteClass,
    type InjectionToken,
    type PrimitiveInjectionToken,
} from './misc';
import { ReflectUtil } from './reflect-util/ReflectUtil';

/**
 * Main class
 */
class Injector {
    private static readonly logger = console;
    private static readonly _container = new DIContainer();

    public static dumpContainerInfo() {
        this.logger.error('Injector._container:\n', this._container);
    }

    private static createDependencyProxy<T extends object>(
        dependencyProxyContext: DependencyProxyContext<T>,
    ): ClassInstanceProxy<T> {
        // Return a proxy to a dummy target: do nothing if dependency instance is not available or forward call to it otherwise
        return <ClassInstanceProxy<T>>new Proxy(<any>dependencyProxyContext, {
            get: (context: DependencyProxyContext<T>, prop, receiver) => {
                if (!context.dependencyInstance) {
                    return undefined;
                }
                //
                return Reflect.get(context.dependencyInstance, prop, receiver);
            },
        });
    }

    private static register<T extends object>(dependencyClass: Class<T>) {
        // Check if dependency can only be instantiated via factory
        const isFactoryOnly = ReflectUtil.getIsFactoryOnly(dependencyClass);
        // Retrieve the constructor parameter types
        const nestedDependencyClasses =
            ReflectUtil.getParameterTypes(dependencyClass);
        // Recursively visit each nested dependency, unless a factory will instantiate it
        if (!isFactoryOnly) {
            nestedDependencyClasses.forEach((nestedDependencyClass) =>
                this.register(nestedDependencyClass),
            );
        }
        // Retrieve metadata
        const injectionToken = ReflectUtil.getInjectionToken(dependencyClass);
        const precedence = ReflectUtil.getPrecedence(dependencyClass)!;
        // Check whether current registration would override an existing one
        if (this._container.has(injectionToken)) {
            const {
                dependencyClass: existingDependencyClass,
                dependencyInstance,
                precedence: extistingPrecedence,
            } = this._container.get(injectionToken);
            const isSealedSettlement = ReflectUtil.getIsSealedSettlement(
                existingDependencyClass,
            );
            // Abort override if attempting to register the same dependency class for the same injection token
            if (existingDependencyClass === dependencyClass) {
                return;
            }
            // Abort if existing precedence is higher
            else if (extistingPrecedence > precedence) {
                return;
            }
            // Abort if settlement is sealed
            else if (isSealedSettlement && dependencyInstance) {
                return;
            }
        }
        // Create dependency wraplet
        const dependencyProxyContext: DependencyProxyContext<T> = {
            dependencyInstance: null,
        };
        const dependencyWraplet: IDependencyWraplet<T> = {
            dependencyClass,
            dependencyInstance: null,
            dependencyProxy: this.createDependencyProxy(dependencyProxyContext),
            dependencyProxyContext,
            precedence,
        };
        // Add new dependency wraplet to container
        this._container.set(injectionToken, dependencyWraplet);
    }

    public static settle<T extends object>(
        settleToken: InjectionToken<T>,
        dependencyFactory?: () => ClassInstance<T>,
    ): ClassInstance<T> {
        const injectionToken = InjectorUtil.normalizeSettleToken(settleToken);
        const {
            dependencyClass,
            dependencyInstance,
            dependencyProxy,
            dependencyProxyContext,
            precedence,
        } = this._container.get(injectionToken);
        // Return existing instance if already settled
        if (dependencyInstance) {
            return dependencyInstance;
        }
        // Check if dependency can only be instantiated via factory
        const isFactoryOnly = ReflectUtil.getIsFactoryOnly(dependencyClass);
        // Ensure a dependency factory is indeed provided
        if (isFactoryOnly && !dependencyFactory) {
            throw new Error(E_INJECTOR_NO_DEPENDENCY_FACTORY);
        }
        // Retrieve the constructor parameter types
        const nestedDependencyClasses =
            ReflectUtil.getParameterTypes(dependencyClass);
        // Retrieve existing parameter metadata
        const parameterInjectionTokens =
            ReflectUtil.getParameterInjectionTokens(dependencyClass);
        // Recursively settle nested dependencies, unless a factory will instantiate the dependency
        const resolvedNestedDependencyInstances = isFactoryOnly
            ? []
            : nestedDependencyClasses.map((dependencyClass, index) =>
                  this.settle(
                      parameterInjectionTokens[index] ||
                          ReflectUtil.getInjectionToken(dependencyClass),
                  ),
              );
        // Resolve leaf dependency
        const resolvedDependencyInstance = dependencyFactory
            ? dependencyFactory()
            : new (<ConcreteClass<T>>dependencyClass)(
                  ...resolvedNestedDependencyInstances,
              );
        // Update proxy context
        dependencyProxyContext.dependencyInstance = resolvedDependencyInstance;
        // Save settled instance
        this._container.set(injectionToken, {
            dependencyClass,
            dependencyInstance: resolvedDependencyInstance,
            dependencyProxy,
            dependencyProxyContext,
            precedence,
        });
        // Return settled instance
        return resolvedDependencyInstance;
    }

    public static settleLazy<T extends object>(
        settleToken: InjectionToken<T>,
        dependencyFactory?: () => ClassInstance<T>,
    ): [ClassInstance<T>, () => ClassInstance<T>] {
        const injectionToken = InjectorUtil.normalizeSettleToken(settleToken);
        const { dependencyClass, dependencyInstance, dependencyProxy } =
            this._container.get(injectionToken);
        // Return existing instance if already settled
        if (dependencyInstance) {
            return [dependencyInstance, () => dependencyInstance];
        }
        // Check if dependency can only be instantiated via factory
        const isFactoryOnly = ReflectUtil.getIsFactoryOnly(dependencyClass);
        // Ensure a dependency factory is indeed provided
        if (isFactoryOnly && !dependencyFactory) {
            throw new Error(E_INJECTOR_NO_DEPENDENCY_FACTORY);
        }
        // Return a proxy which can be shimmed & a callback to invoke settlement
        return [
            dependencyProxy,
            () => this.settle(injectionToken, dependencyFactory),
        ];
    }

    public static Inject<T extends object>(
        primitiveToken: PrimitiveInjectionToken,
    ) {
        return function (
            dependencyClass: Class<T>,
            _: string | symbol | undefined,
            parameterIndex: number,
        ) {
            // Retrieve existing parameter metadata
            const parameterInjectionTokens =
                ReflectUtil.getParameterInjectionTokens(dependencyClass);
            // Assign primitive token override
            parameterInjectionTokens[parameterIndex] = primitiveToken;
            // Save updated metadata
            ReflectUtil.setParameterInjectionTokens(
                dependencyClass,
                parameterInjectionTokens,
            );
        };
    }

    public static Injectable<T extends object>(
        drsOrInjectionToken: DRST | PrimitiveInjectionToken = DRS.POLYMORPHIC,
    ) {
        const { drs, primitiveToken } =
            InjectorUtil.parseInjectableArguments(drsOrInjectionToken);
        //
        return function (dependencyClass: Class<T>) {
            const injectionToken = InjectorUtil.resolveInjectionToken({
                dependencyClass,
                drs,
                primitiveToken,
            });
            const precedence =
                ReflectUtil.getPrecedence(dependencyClass) || P.DEFAULT;
            //
            ReflectUtil.setInjectionToken(dependencyClass, injectionToken);
            ReflectUtil.setPrecedence(dependencyClass, precedence);
            //
            Injector.register(dependencyClass);
        };
    }

    public static Precedence<T extends object>(precedence: number) {
        return function (dependencyClass: Class<T>) {
            ReflectUtil.setPrecedence(dependencyClass, precedence);
        };
    }

    public static Final<T extends object>() {
        return function (dependencyClass: Class<T>) {
            ReflectUtil.setPrecedence(dependencyClass, P.FINAL);
        };
    }

    public static FactoryOnly<T extends object>(params?: { seal: boolean }) {
        return function (dependencyClass: Class<T>) {
            ReflectUtil.setIsFactoryOnly(dependencyClass, true);
            if (params?.seal) {
                ReflectUtil.setIsSealedSettlement(dependencyClass, true);
            }
        };
    }

    public static Seal<T extends object>() {
        return function (dependencyClass: Class<T>) {
            ReflectUtil.setIsSealedSettlement(dependencyClass, true);
        };
    }
}

/**
 * Export facade for convenience
 */
const dumpContainerInfo = Injector.dumpContainerInfo.bind(Injector);
const settle = Injector.settle.bind(Injector);
const settleLazy = Injector.settleLazy.bind(Injector);
const Inject = Injector.Inject.bind(Injector);
const Injectable = Injector.Injectable.bind(Injector);
const Precedence = Injector.Precedence.bind(Injector);
const Final = Injector.Final.bind(Injector);
const FactoryOnly = Injector.FactoryOnly.bind(Injector);
const Seal = Injector.Seal.bind(Injector);

export {
    FactoryOnly,
    Final,
    Inject,
    Injectable,
    Precedence,
    Seal,
    dumpContainerInfo,
    settle,
    settleLazy,
};
