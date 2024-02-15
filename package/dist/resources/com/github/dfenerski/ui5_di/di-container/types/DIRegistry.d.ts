declare module "com/github/dfenerski/ui5_di/di-container/types/DIRegistry" {
    import type { InjectionToken } from 'com\github\dfenerski\ui5_di\misc';
    import type { IDependencyWraplet } from 'com\github\dfenerski\ui5_di\di-container\interfaces\IDependencyWraplet';
    type DIRegistry<T extends object = object> = Map<InjectionToken<T>, IDependencyWraplet<T>>;
}
//# sourceMappingURL=DIRegistry.d.ts.map