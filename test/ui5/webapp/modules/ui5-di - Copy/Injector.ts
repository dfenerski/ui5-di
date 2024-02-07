import 'reflect-metadata/lite';
import { DIContainer } from './di-container/DIContainer';
import type { IDependencyWraplet } from './di-container/interfaces/IDependencyWraplet';
import { Precedence as P } from './di-container/misc/constants';
import { InjectorUtil } from './injector-util/InjectorUtil';
import { DependencyResolutionStrategy as DRS } from './injector-util/misc/constants';
import type { DependencyResolutionStrategyType as DRST } from './injector-util/types/DependencyResolutionStrategyType';
import type {
    Class,
    ClassInstance,
    ClassInstanceProxy,
    ConcreteClass,
    InjectionToken,
    PrimitiveInjectionToken,
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

    private static createDependencyProxy<T extends {}>(
        dependencyWraplet: IDependencyWraplet<T>,
    ): ClassInstanceProxy<T> {
        // Return a proxy to a dummy target: do nothing if dependency instance is not available or forward call to it otherwise
        return <ClassInstanceProxy<T>>new Proxy(<any>dependencyWraplet, {
            get: (target: IDependencyWraplet<T>, prop, receiver) => {
                const { dependencyInstance } = target;
                //
                if (!dependencyInstance) {
                    return undefined;
                }
                //
                return Reflect.get(dependencyInstance, prop, receiver);
            },
        });
    }

    private static register<T extends {}>(dependencyClass: Class<T>) {
        // Retrieve the constructor parameter types
        const nestedDependencyClasses =
            ReflectUtil.getParameterTypes(dependencyClass);
        // Recursively visit each one
        nestedDependencyClasses.forEach((nestedDependencyClass) => {
            this.register(nestedDependencyClass);
        });
        //
        const injectionToken = ReflectUtil.getInjectionToken(dependencyClass);
        const precedence = ReflectUtil.getPrecedence(dependencyClass);
        //
        if (this._container.has(injectionToken)) {
            const { precedence: extistingPrecedence } =
                this._container.get(injectionToken);
            //
            if (extistingPrecedence > precedence) {
                return;
            }
        }
        //
        const dependencyWraplet: IDependencyWraplet<T> = {
            dependencyClass,
            dependencyInstance: null,
            dependencyProxy: <any>null,
            precedence,
        };
        const dependencyProxy = this.createDependencyProxy(dependencyWraplet);
        dependencyWraplet.dependencyProxy = dependencyProxy;
        // Add to container
        this._container.set(injectionToken, dependencyWraplet);
    }

    public static settle<T extends {}>(
        settleToken: InjectionToken<T>,
        dependencyFactory?: () => ClassInstance<T>,
    ): ClassInstance<T> {
        const injectionToken = InjectorUtil.normalizeSettleToken(settleToken);
        const {
            dependencyClass,
            dependencyInstance,
            dependencyProxy,
            precedence,
        } = this._container.get(injectionToken);
        // Return existing instance if already settled
        if (dependencyInstance) {
            return dependencyInstance;
        }
        // Retrieve the constructor parameter types
        const nestedDependencyClasses =
            ReflectUtil.getParameterTypes(dependencyClass);
        // Retrieve existing parameter metadata
        const parameterInjectionTokens =
            ReflectUtil.getParameterInjectionTokens(dependencyClass);
        // Recursively settle nested dependencies
        const resolvedNestedDependencyInstances = nestedDependencyClasses.map(
            (dependencyClass, index) =>
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
        // Save settled instance
        this._container.set(injectionToken, {
            dependencyClass,
            dependencyInstance: resolvedDependencyInstance,
            dependencyProxy,
            precedence,
        });
        // Return settled instance
        return resolvedDependencyInstance;
    }

    public static Inject<T extends {}>(
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

    public static Injectable<T extends {}>(
        drsOrMainPrimitiveToken:
            | DRST
            | PrimitiveInjectionToken = DRS.POLYMORPHIC,
        ...additionalPrimitiveTokens: PrimitiveInjectionToken[]
    ) {
        const { drs, primitiveTokens } = InjectorUtil.parseInjectableArguments(
            drsOrMainPrimitiveToken,
            additionalPrimitiveTokens,
        );
        //
        return function (dependencyClass: Class<T>) {
            const [injectionToken, ...additionalInjectionTokens] =
                InjectorUtil.resolveInjectionTokens({
                    dependencyClass,
                    drs,
                    primitiveTokens,
                });
            const precedence =
                ReflectUtil.getPrecedence(dependencyClass) || P.DEFAULT;
            const isMultiple = additionalInjectionTokens.length > 0;
            //
            ReflectUtil.setDependencyResolutionStrategy(dependencyClass, drs);
            ReflectUtil.setInjectionToken(dependencyClass, injectionToken);
            ReflectUtil.setPrecedence(dependencyClass, precedence);
            //
            Injector.register(dependencyClass);
        };
    }

    public static Precedence<T extends {}>(precedence: number) {
        return function (dependencyClass: Class<T>) {
            ReflectUtil.setPrecedence(dependencyClass, precedence);
        };
    }

    public static Final<T extends {}>() {
        return function (dependencyClass: Class<T>) {
            ReflectUtil.setPrecedence(dependencyClass, P.FINAL);
        };
    }
}

/**
 * Export facade for convenience
 */
const dumpContainerInfo = Injector.dumpContainerInfo.bind(Injector);
const settle = Injector.settle.bind(Injector);
const Inject = Injector.Inject.bind(Injector);
const Injectable = Injector.Injectable.bind(Injector);
const Precedence = Injector.Precedence.bind(Injector);
const Final = Injector.Final.bind(Injector);

export { Final, Inject, Injectable, Precedence, dumpContainerInfo, settle };
