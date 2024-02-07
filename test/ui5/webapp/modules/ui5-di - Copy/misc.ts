// TYPES
export type ConcreteClass<T extends {}> = { new (...args: any[]): T };
export type AbstractClass<T extends {}> = abstract new (...args: any[]) => T;
export type Class<T extends {}> = ConcreteClass<T> | AbstractClass<T>;
export type ClassInstance<T extends {}> = InstanceType<Class<T>>;
export type ClassInstanceProxy<T extends {}> = ClassInstance<T> & {
    __isUI5DependencyProxy: true;
};
export type PrimitiveInjectionToken = string | symbol;
export type InjectionToken<T extends {}> = PrimitiveInjectionToken | Class<T>;
export type Nullable<T> = T | null;
