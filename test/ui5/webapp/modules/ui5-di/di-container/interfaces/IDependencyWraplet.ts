import type {
    Class,
    ClassInstance,
    ClassInstanceProxy,
    Nullable,
} from '../../misc';

export interface IDependencyWraplet<T extends {}> {
    dependencyClass: Class<T>;
    dependencyInstance: Nullable<ClassInstance<T>>;
    dependencyProxy: ClassInstanceProxy<T>;
    precedence: number;
}
