import type { Class, InjectionToken } from '../misc';
import { E_REFLECT_UTIL_NO_DI_TOKEN } from './misc/errors';
import type { ParameterInjectionTokens } from './types/ParameterInjectionTokens';

/**
 * Convenience adapter for the Reflect API.
 * All metadata is set & retrieved from concrete object, ignoring prototype chain. This helps to avoid unexpected behavior when using inheritance.
 */
export class ReflectUtil {
    /**
     * GETTERS
     */

    public static getInjectionToken<T extends object>(
        dependencyClass: Class<T>,
    ): InjectionToken<T> {
        const injectionToken = Reflect.getOwnMetadata(
            'ui5di:injectionToken',
            dependencyClass,
        );
        // Abort if no token was found
        if (!injectionToken) {
            throw new Error(E_REFLECT_UTIL_NO_DI_TOKEN);
        }
        //
        return injectionToken;
    }

    public static getParameterInjectionTokens<T extends object>(
        dependencyClass: Class<T>,
    ): ParameterInjectionTokens {
        // Collect current instance type annotations if any
        const ownParameterTypes = this.getOwnParameterTypes(dependencyClass);
        // Get inherited annotations
        const metadata: ParameterInjectionTokens =
            Reflect.getMetadata(
                'ui5di:parameterInjectionTokens',
                dependencyClass,
            ) || {};
        // Get own annotations
        const ownMetadata: ParameterInjectionTokens =
            Reflect.getOwnMetadata(
                'ui5di:parameterInjectionTokens',
                dependencyClass,
            ) || {};
        // Merge annotations into a new object:
        // 1. Preserve inherited ones, so constructors of super classes inherit base class annotations
        // 2. Overwrite with own ones, so constructors of super classes decide the injection tokens
        // 3. Remove inherited annotations for non-decorated params so super class constructors don't get polluted from the inheritance
        const parameterInjectionTokens = Object.assign(
            {},
            metadata,
            ownMetadata,
        );
        for (let i = 0; i < ownParameterTypes.length; i++) {
            if (ownParameterTypes[i] && !ownMetadata[i]) {
                delete parameterInjectionTokens[i];
            }
        }
        // Return resolved injection tokens
        return parameterInjectionTokens;
    }

    public static getParameterTypes<T extends object>(
        dependencyClass: Class<T>,
    ): Class<object>[] {
        return Reflect.getMetadata('design:paramtypes', dependencyClass) || [];
    }

    private static getOwnParameterTypes<T extends object>(
        dependencyClass: Class<T>,
    ): Class<object>[] {
        return (
            Reflect.getOwnMetadata('design:paramtypes', dependencyClass) || []
        );
    }

    public static getPrecedence<T extends object>(
        dependencyClass: Class<T>,
    ): number | undefined {
        return Reflect.getOwnMetadata('ui5di:precedence', dependencyClass);
    }

    public static getIsFactoryOnly<T extends object>(
        dependencyClass: Class<T>,
    ): boolean | undefined {
        return Reflect.getOwnMetadata('ui5di:isFactoryOnly', dependencyClass);
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
