declare module "com/github/dfenerski/ui5_di/Injector" {
    import 'reflect-metadata/lite';
    import type { DependencyResolutionStrategyType as DRST } from 'com\github\dfenerski\ui5_di\injector-util\types\DependencyResolutionStrategyType';
    import { type ClassInstance, type InjectionToken, type PrimitiveInjectionToken } from './misc';
    /**
     * Main class
     */
    class Injector {
        private static readonly logger;
        private static readonly _container;
        static dumpContainerInfo(): void;
        private static createDependencyProxy;
        private static register;
        static settle<T extends object>(settleToken: InjectionToken<T>, dependencyFactory?: () => ClassInstance<T>): ClassInstance<T>;
        static settleLazy<T extends object>(settleToken: InjectionToken<T>, dependencyFactory?: () => ClassInstance<T>): [ClassInstance<T>, () => ClassInstance<T>];
        static Inject<T extends object>(primitiveToken: PrimitiveInjectionToken): (dependencyClass: Class<T>, _: string | symbol | undefined, parameterIndex: number) => void;
        static Injectable<T extends object>(drsOrInjectionToken?: DRST | PrimitiveInjectionToken): (dependencyClass: Class<T>) => void;
        static Precedence<T extends object>(precedence: number): (dependencyClass: Class<T>) => void;
        static Final<T extends object>(): (dependencyClass: Class<T>) => void;
        static FactoryOnly<T extends object>(params?: {
            seal: boolean;
        }): (dependencyClass: Class<T>) => void;
        static Seal<T extends object>(): (dependencyClass: Class<T>) => void;
    }
    /**
     * Export facade for convenience
     */
    const dumpContainerInfo: any;
    const settle: any;
    const settleLazy: any;
    const Inject: any;
    const Injectable: any;
    const Precedence: any;
    const Final: any;
    const FactoryOnly: any;
    const Seal: any;
    export { FactoryOnly, Final, Inject, Injectable, Precedence, Seal, dumpContainerInfo, settle, settleLazy, };
}
//# sourceMappingURL=Injector.d.ts.map