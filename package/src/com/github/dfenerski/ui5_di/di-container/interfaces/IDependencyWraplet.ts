import type {
    Class,
    ClassInstance,
    ClassInstanceProxy,
    Nullable,
} from '../../misc';
import type { DependencyProxyContext } from '../types/DependencyProxyContext';

export interface IDependencyWraplet<T extends object> {
    dependencyClass: Class<T>;
    dependencyInstance: Nullable<ClassInstance<T>>;
    dependencyProxy: ClassInstanceProxy<T>;
    dependencyProxyContext: DependencyProxyContext<T>;
    precedence: number;
}
