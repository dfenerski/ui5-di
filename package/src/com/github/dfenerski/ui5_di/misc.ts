/* eslint-disable @typescript-eslint/no-explicit-any */

// TYPES
export type ConcreteClass<T extends object> = { new (...args: any[]): T };
export type AbstractClass<T extends object> = abstract new (
    ...args: any[]
) => T;
export type Class<T extends object> = ConcreteClass<T> | AbstractClass<T>;
export type ClassInstance<T extends object> = InstanceType<Class<T>>;
export type ClassInstanceProxy<T extends object> = ClassInstance<T> & {
    __isUI5DependencyProxy: true;
};
export type PrimitiveInjectionToken = string | symbol;
export type InjectionToken<T extends object> =
    | PrimitiveInjectionToken
    | Class<T>;
export type Nullable<T> = T | null;

// ERRORS
export const E_INJECTOR_NO_DEPENDENCY_FACTORY = new Error(
    'Factory-only dependency must be instantiated via a factory function but none was provided',
);
