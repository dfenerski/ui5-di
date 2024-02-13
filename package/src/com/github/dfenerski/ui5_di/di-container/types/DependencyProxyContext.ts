import type { IDependencyWraplet } from '../interfaces/IDependencyWraplet';

export type DependencyProxyContext<T extends object> = Pick<
    IDependencyWraplet<T>,
    'dependencyInstance'
>;
