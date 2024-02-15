declare module "com/github/dfenerski/ui5_di/injector-util/interfaces/IResolveInjectionTokens" {
    import type { Class, Nullable, PrimitiveInjectionToken } from 'com\github\dfenerski\ui5_di\misc';
    import type { DependencyResolutionStrategyType as DRST } from 'com\github\dfenerski\ui5_di\injector-util\types\DependencyResolutionStrategyType';
    interface IResolveInjectionTokens<T extends object> {
        readonly dependencyClass: Class<T>;
        readonly drs: DRST;
        readonly primitiveToken: Nullable<PrimitiveInjectionToken>;
    }
}
//# sourceMappingURL=IResolveInjectionTokens.d.ts.map