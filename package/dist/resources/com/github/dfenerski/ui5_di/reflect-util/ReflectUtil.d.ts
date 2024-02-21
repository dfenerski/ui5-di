declare module "com/github/dfenerski/ui5_di/reflect-util/ReflectUtil" {
    import type { Class, InjectionToken } from 'com\github\dfenerski\ui5_di\misc';
    import type { ParameterInjectionTokens } from 'com\github\dfenerski\ui5_di\reflect-util\types\ParameterInjectionTokens';
    /**
     * Convenience adapter for the Reflect API.
     * All metadata is set & retrieved from concrete object, ignoring prototype chain. This helps to avoid unexpected behavior when using inheritance.
     */
    class ReflectUtil {
        /**
         * GETTERS
         */
        static getInjectionToken<T extends object>(dependencyClass: Class<T>): InjectionToken<T>;
        static getParameterInjectionTokens<T extends object>(dependencyClass: Class<T>): ParameterInjectionTokens;
        static getParameterTypes<T extends object>(dependencyClass: Class<T>): Class<object>[];
        private static getOwnParameterTypes;
        static getPrecedence<T extends object>(dependencyClass: Class<T>): number | undefined;
        static getIsFactoryOnly<T extends object>(dependencyClass: Class<T>): boolean | undefined;
        static getIsSealedSettlement<T extends object>(dependencyClass: Class<T>): boolean | undefined;
        /**
         * SETTERS
         */
        static setInjectionToken<T extends object>(dependencyClass: Class<T>, injectionToken: InjectionToken<T>): any;
        static setParameterInjectionTokens<T extends object>(dependencyClass: Class<T>, parameterInjectionTokens: ParameterInjectionTokens): any;
        static setPrecedence<T extends object>(dependencyClass: Class<T>, precedence: number): any;
        static setIsFactoryOnly<T extends object>(dependencyClass: Class<T>, isFactoryOnly: boolean): any;
        static setIsSealedSettlement<T extends object>(dependencyClass: Class<T>, isSealedSettlement: boolean): any;
    }
}
//# sourceMappingURL=ReflectUtil.d.ts.map