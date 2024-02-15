declare module "com/github/dfenerski/ui5_di/di-container/types/DependencyProxyContext" {
    import type { IDependencyWraplet } from 'com\github\dfenerski\ui5_di\di-container\interfaces\IDependencyWraplet';
    type DependencyProxyContext<T extends object> = Pick<IDependencyWraplet<T>, 'dependencyInstance'>;
}
//# sourceMappingURL=DependencyProxyContext.d.ts.map