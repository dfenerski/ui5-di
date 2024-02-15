import type { InjectionToken } from '../misc';
import type { IDependencyWraplet } from './interfaces/IDependencyWraplet';
import { E_DI_CONTAINER_NO_WRAPLET } from './misc/errors';
import type { DIRegistry } from './types/DIRegistry';

/**
 * Map adapter implementation for the DI container.
 */
export class DIContainer {
    private readonly _registry: DIRegistry = new Map();

    public has<T extends object>(injectionToken: InjectionToken<T>): boolean {
        return this._registry.has(injectionToken);
    }

    public get<T extends object>(
        injectionToken: InjectionToken<T>,
    ): IDependencyWraplet<T> {
        const dependencyWraplet = this._registry.get(injectionToken);
        // Abort if requested dependency wraplet could not be found
        if (!dependencyWraplet) {
            throw new Error(E_DI_CONTAINER_NO_WRAPLET);
        }
        //
        return <IDependencyWraplet<T>>dependencyWraplet;
    }

    public set<T extends object>(
        injectionToken: InjectionToken<T>,
        dependencyWraplet: IDependencyWraplet<T>,
    ) {
        this._registry.set(injectionToken, dependencyWraplet);
    }
}
