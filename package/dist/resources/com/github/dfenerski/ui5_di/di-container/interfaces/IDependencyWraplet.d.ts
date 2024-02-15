declare module "com/github/dfenerski/ui5_di/di-container/interfaces/IDependencyWraplet" {
    import type { Class, ClassInstance, ClassInstanceProxy, Nullable } from '../../misc';
    import type { DependencyProxyContext } from 'com\github\dfenerski\ui5_di\di-container\types\DependencyProxyContext';
    interface IDependencyWraplet<T extends object> {
        dependencyClass: Class<T>;
        dependencyInstance: Nullable<ClassInstance<T>>;
        dependencyProxy: ClassInstanceProxy<T>;
        dependencyProxyContext: DependencyProxyContext<T>;
        precedence: number;
    }
}
//# sourceMappingURL=IDependencyWraplet.d.ts.map