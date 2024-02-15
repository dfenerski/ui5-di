declare module "com/github/dfenerski/ui5_di/injector-util/InjectorUtil" {
    import type { Class, InjectionToken, PrimitiveInjectionToken } from 'com\github\dfenerski\ui5_di\misc';
    import type { IResolveInjectionTokens } from 'com\github\dfenerski\ui5_di\injector-util\interfaces\IResolveInjectionTokens';
    import type { DependencyResolutionStrategyType as DRST } from 'com\github\dfenerski\ui5_di\injector-util\types\DependencyResolutionStrategyType';
    function getIsDRSProvided(drsOrMainPrimitiveToken: any): drsOrMainPrimitiveToken is DRST;
    function getIsDependencyClassInjectionToken<T extends object>(injecitonToken: InjectionToken<T>): injecitonToken is Class<T>;
    /**
     * Namespaced helper functions for the Injector class.
     */
    class InjectorUtil {
        static parseInjectableArguments(drsOrInjectionToken?: DRST | PrimitiveInjectionToken): {
            drs: any;
            primitiveToken: any;
        };
        static resolveInjectionToken<T extends object>({ dependencyClass, drs, primitiveToken, }: IResolveInjectionTokens<T>): InjectionToken<T>;
        static normalizeSettleToken<T extends object>(injectionToken: InjectionToken<T>): InjectionToken<T>;
    }
}
//# sourceMappingURL=InjectorUtil.d.ts.map