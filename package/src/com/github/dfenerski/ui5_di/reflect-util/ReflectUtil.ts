import type { Class, InjectionToken } from '../misc';
import { E_REFLECT_UTIL_NO_DI_TOKEN } from './misc/errors';
import type { ParameterInjectionTokens } from './types/ParameterInjectionTokens';

/**
 * Convenience adapter for the Reflect API.
 */
export class ReflectUtil {
    /**
     * GETTERS
     */

    public static getInjectionToken<T extends object>(
        dependencyClass: Class<T>,
    ): InjectionToken<T> {
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

    public static getParameterInjectionTokens<T extends object>(
        dependencyClass: Class<T>,
    ): ParameterInjectionTokens {
        return (
            Reflect.getMetadata(
                'ui5di:parameterInjectionTokens',
                dependencyClass,
            ) || {}
        );
    }

    public static getParameterTypes<T extends object>(
        dependencyClass: Class<T>,
    ): Class<object>[] {
        return Reflect.getMetadata('design:paramtypes', dependencyClass) || [];
    }

    public static getPrecedence<T extends object>(
        dependencyClass: Class<T>,
    ): number | undefined {
        return Reflect.getMetadata('ui5di:precedence', dependencyClass);
    }

    public static getIsFactoryOnly<T extends object>(
        dependencyClass: Class<T>,
    ): boolean | undefined {
        return Reflect.getMetadata('ui5di:isFactoryOnly', dependencyClass);
    }

    /**
     * SETTERS
     */

    public static setInjectionToken<T extends object>(
        dependencyClass: Class<T>,
        injectionToken: InjectionToken<T>,
    ) {
        return Reflect.defineMetadata(
            'ui5di:injectionToken',
            injectionToken,
            dependencyClass,
        );
    }

    public static setParameterInjectionTokens<T extends object>(
        dependencyClass: Class<T>,
        parameterInjectionTokens: ParameterInjectionTokens,
    ) {
        return Reflect.defineMetadata(
            'ui5di:parameterInjectionTokens',
            parameterInjectionTokens,
            dependencyClass,
        );
    }

    public static setPrecedence<T extends object>(
        dependencyClass: Class<T>,
        precedence: number,
    ) {
        return Reflect.defineMetadata(
            'ui5di:precedence',
            precedence,
            dependencyClass,
        );
    }

    public static setIsFactoryOnly<T extends object>(
        dependencyClass: Class<T>,
        isFactoryOnly: boolean,
    ) {
        return Reflect.defineMetadata(
            'ui5di:isFactoryOnly',
            isFactoryOnly,
            dependencyClass,
        );
    }
}
