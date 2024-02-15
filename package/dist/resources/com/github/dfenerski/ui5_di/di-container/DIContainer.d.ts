declare module "com/github/dfenerski/ui5_di/di-container/DIContainer" {
    import type { InjectionToken } from 'com\github\dfenerski\ui5_di\misc';
    import type { IDependencyWraplet } from 'com\github\dfenerski\ui5_di\di-container\interfaces\IDependencyWraplet';
    /**
     * Map adapter implementation for the DI container.
     */
    class DIContainer {
        private readonly _registry;
        has<T extends object>(injectionToken: InjectionToken<T>): boolean;
        get<T extends object>(injectionToken: InjectionToken<T>): IDependencyWraplet<T>;
        set<T extends object>(injectionToken: InjectionToken<T>, dependencyWraplet: IDependencyWraplet<T>): void;
    }
}
//# sourceMappingURL=DIContainer.d.ts.map