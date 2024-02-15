declare module "com/github/dfenerski/ui5_di/misc" {
    type ConcreteClass<T extends object> = {
        new (...args: any[]): T;
    };
    type AbstractClass<T extends object> = abstract new (...args: any[]) => T;
    type Class<T extends object> = ConcreteClass<T> | AbstractClass<T>;
    type ClassInstance<T extends object> = InstanceType<Class<T>>;
    type ClassInstanceProxy<T extends object> = ClassInstance<T> & {
        __isUI5DependencyProxy: true;
    };
    type PrimitiveInjectionToken = string | symbol;
    type InjectionToken<T extends object> = PrimitiveInjectionToken | Class<T>;
    type Nullable<T> = T | null;
    const E_INJECTOR_NO_DEPENDENCY_FACTORY = "Factory-only dependency must be instantiated via a factory function but none was provided";
}
//# sourceMappingURL=misc.d.ts.map