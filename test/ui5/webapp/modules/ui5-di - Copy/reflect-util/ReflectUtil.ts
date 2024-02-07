import type { DependencyResolutionStrategyType as DRST } from '../injector-util/types/DependencyResolutionStrategyType';
import type { Class, InjectionToken } from '../misc';
import { E_REFLECT_UTIL_NO_DI_TOKEN } from './misc/errors';
import type { ParameterInjectionTokens } from './types/ParameterInjectionTokens';

/**
 * Convenience adapter for the Reflect API.
 */
export class ReflectUtil {
    public static getInjectionToken<T extends {}>(dependencyClass: Class<T>) {
        const injectionToken = Reflect.getMetadata(
            'ui5di:injectionToken',
            dependencyClass,
        );
        // Abort if no token was found
        if (!injectionToken) {
            throw E_REFLECT_UTIL_NO_DI_TOKEN;
        }
        //
        return injectionToken;
    }

    public static getParameterInjectionTokens<T extends {}>(
        dependencyClass: Class<T>,
    ): ParameterInjectionTokens {
        return (
            Reflect.getMetadata(
                'ui5di:parameterInjectionTokens',
                dependencyClass,
            ) || {}
        );
    }

    public static getParameterTypes<T extends {}>(
        dependencyClass: Class<T>,
    ): Class<{}>[] {
        return Reflect.getMetadata('design:paramtypes', dependencyClass) || [];
    }

    public static getDependencyResolutionStrategy<T extends {}>(
        dependencyClass: Class<T>,
    ) {
        return Reflect.getMetadata(
            'ui5di:dependencyResolutionStrategy',
            dependencyClass,
        );
    }

    public static getPrecedence<T extends {}>(dependencyClass: Class<T>) {
        return Reflect.getMetadata('ui5di:precedence', dependencyClass);
    }

    public static setInjectionToken<T extends {}>(
        dependencyClass: Class<T>,
        injectionToken: InjectionToken<T>,
    ) {
        return Reflect.defineMetadata(
            'ui5di:injectionToken',
            injectionToken,
            dependencyClass,
        );
    }

    public static setParameterInjectionTokens<T extends {}>(
        dependencyClass: Class<T>,
        parameterInjectionTokens: ParameterInjectionTokens,
    ) {
        return Reflect.defineMetadata(
            'ui5di:parameterInjectionTokens',
            parameterInjectionTokens,
            dependencyClass,
        );
    }

    public static setDependencyResolutionStrategy<T extends {}>(
        dependencyClass: Class<T>,
        dependencyResolutionStrategy: DRST,
    ) {
        return Reflect.defineMetadata(
            'ui5di:dependencyResolutionStrategy',
            dependencyResolutionStrategy,
            dependencyClass,
        );
    }

    public static setPrecedence<T extends {}>(
        dependencyClass: Class<T>,
        precedence: number,
    ) {
        return Reflect.defineMetadata(
            'ui5di:precedence',
            precedence,
            dependencyClass,
        );
    }
}
