sap.ui.define(["reflect-metadata/lite", "./di-container/DIContainer", "./di-container/misc/constants", "./injector-util/InjectorUtil", "./injector-util/misc/constants", "./misc", "./reflect-util/ReflectUtil"], function (__reflect_metadata_lite, ___di_container_DIContainer, ___di_container_misc_constants, ___injector_util_InjectorUtil, ___injector_util_misc_constants, ___misc, ___reflect_util_ReflectUtil) {
  "use strict";

  const DIContainer = ___di_container_DIContainer["DIContainer"];
  const P = ___di_container_misc_constants["Precedence"];
  const InjectorUtil = ___injector_util_InjectorUtil["InjectorUtil"];
  const DRS = ___injector_util_misc_constants["DependencyResolutionStrategy"];
  const E_INJECTOR_NO_DEPENDENCY_FACTORY = ___misc["E_INJECTOR_NO_DEPENDENCY_FACTORY"];
  const ReflectUtil = ___reflect_util_ReflectUtil["ReflectUtil"];
  /**
   * Main class
   */
  class Injector {
    static logger = console;
    static _container = new DIContainer();
    static dumpContainerInfo() {
      this.logger.error('Injector._container:\n', this._container);
    }
    static createDependencyProxy(dependencyProxyContext) {
      // Return a proxy to a dummy target: do nothing if dependency instance is not available or forward call to it otherwise
      return new Proxy(dependencyProxyContext, {
        get: (context, prop, receiver) => {
          if (!context.dependencyInstance) {
            return undefined;
          }
          //
          return Reflect.get(context.dependencyInstance, prop, receiver);
        }
      });
    }
    static register(dependencyClass) {
      // Check if dependency can only be instantiated via factory
      const isFactoryOnly = ReflectUtil.getIsFactoryOnly(dependencyClass);
      // Retrieve the constructor parameter types
      const nestedDependencyClasses = ReflectUtil.getParameterTypes(dependencyClass);
      // Recursively visit each nested dependency, unless a factory will instantiate it
      if (!isFactoryOnly) {
        nestedDependencyClasses.forEach(nestedDependencyClass => this.register(nestedDependencyClass));
      }
      // Retrieve metadata
      const injectionToken = ReflectUtil.getInjectionToken(dependencyClass);
      const precedence = ReflectUtil.getPrecedence(dependencyClass);
      // Check whether current registration would override an existing one
      if (this._container.has(injectionToken)) {
        const {
          dependencyClass: existingDependencyClass,
          dependencyInstance,
          precedence: extistingPrecedence
        } = this._container.get(injectionToken);
        const isSealedSettlement = ReflectUtil.getIsSealedSettlement(existingDependencyClass);
        // Abort override if attempting to register the same dependency class for the same injection token
        if (existingDependencyClass === dependencyClass) {
          return;
        }
        // Abort if existing precedence is higher
        else if (extistingPrecedence > precedence) {
          return;
        }
        // Abort if settlement is sealed
        else if (isSealedSettlement && dependencyInstance) {
          return;
        }
      }
      // Create dependency wraplet
      const dependencyProxyContext = {
        dependencyInstance: null
      };
      const dependencyWraplet = {
        dependencyClass,
        dependencyInstance: null,
        dependencyProxy: this.createDependencyProxy(dependencyProxyContext),
        dependencyProxyContext,
        precedence
      };
      // Add new dependency wraplet to container
      this._container.set(injectionToken, dependencyWraplet);
    }
    static settle(settleToken, dependencyFactory) {
      const injectionToken = InjectorUtil.normalizeSettleToken(settleToken);
      const {
        dependencyClass,
        dependencyInstance,
        dependencyProxy,
        dependencyProxyContext,
        precedence
      } = this._container.get(injectionToken);
      // Return existing instance if already settled
      if (dependencyInstance) {
        return dependencyInstance;
      }
      // Check if dependency can only be instantiated via factory
      const isFactoryOnly = ReflectUtil.getIsFactoryOnly(dependencyClass);
      // Ensure a dependency factory is indeed provided
      if (isFactoryOnly && !dependencyFactory) {
        throw new Error(E_INJECTOR_NO_DEPENDENCY_FACTORY);
      }
      // Retrieve the constructor parameter types
      const nestedDependencyClasses = ReflectUtil.getParameterTypes(dependencyClass);
      // Retrieve existing parameter metadata
      const parameterInjectionTokens = ReflectUtil.getParameterInjectionTokens(dependencyClass);
      // Recursively settle nested dependencies, unless a factory will instantiate the dependency
      const resolvedNestedDependencyInstances = isFactoryOnly ? [] : nestedDependencyClasses.map((dependencyClass, index) => this.settle(parameterInjectionTokens[index] || ReflectUtil.getInjectionToken(dependencyClass)));
      // Resolve leaf dependency
      const resolvedDependencyInstance = dependencyFactory ? dependencyFactory() : new dependencyClass(...resolvedNestedDependencyInstances);
      // Update proxy context
      dependencyProxyContext.dependencyInstance = resolvedDependencyInstance;
      // Save settled instance
      this._container.set(injectionToken, {
        dependencyClass,
        dependencyInstance: resolvedDependencyInstance,
        dependencyProxy,
        dependencyProxyContext,
        precedence
      });
      // Return settled instance
      return resolvedDependencyInstance;
    }
    static settleLazy(settleToken, dependencyFactory) {
      const injectionToken = InjectorUtil.normalizeSettleToken(settleToken);
      const {
        dependencyClass,
        dependencyInstance,
        dependencyProxy
      } = this._container.get(injectionToken);
      // Return existing instance if already settled
      if (dependencyInstance) {
        return [dependencyInstance, () => dependencyInstance];
      }
      // Check if dependency can only be instantiated via factory
      const isFactoryOnly = ReflectUtil.getIsFactoryOnly(dependencyClass);
      // Ensure a dependency factory is indeed provided
      if (isFactoryOnly && !dependencyFactory) {
        throw new Error(E_INJECTOR_NO_DEPENDENCY_FACTORY);
      }
      // Return a proxy which can be shimmed & a callback to invoke settlement
      return [dependencyProxy, () => this.settle(injectionToken, dependencyFactory)];
    }
    static Inject(primitiveToken) {
      return function (dependencyClass, _, parameterIndex) {
        // Retrieve existing parameter metadata
        const parameterInjectionTokens = ReflectUtil.getParameterInjectionTokens(dependencyClass);
        // Assign primitive token override
        parameterInjectionTokens[parameterIndex] = primitiveToken;
        // Save updated metadata
        ReflectUtil.setParameterInjectionTokens(dependencyClass, parameterInjectionTokens);
      };
    }
    static Injectable(drsOrInjectionToken = DRS.POLYMORPHIC) {
      const {
        drs,
        primitiveToken
      } = InjectorUtil.parseInjectableArguments(drsOrInjectionToken);
      //
      return function (dependencyClass) {
        const injectionToken = InjectorUtil.resolveInjectionToken({
          dependencyClass,
          drs,
          primitiveToken
        });
        const precedence = ReflectUtil.getPrecedence(dependencyClass) || P.DEFAULT;
        //
        ReflectUtil.setInjectionToken(dependencyClass, injectionToken);
        ReflectUtil.setPrecedence(dependencyClass, precedence);
        //
        Injector.register(dependencyClass);
      };
    }
    static Precedence(precedence) {
      return function (dependencyClass) {
        ReflectUtil.setPrecedence(dependencyClass, precedence);
      };
    }
    static Final() {
      return function (dependencyClass) {
        ReflectUtil.setPrecedence(dependencyClass, P.FINAL);
      };
    }
    static FactoryOnly(params) {
      return function (dependencyClass) {
        ReflectUtil.setIsFactoryOnly(dependencyClass, true);
        if (params?.seal !== false) {
          ReflectUtil.setIsSealedSettlement(dependencyClass, true);
        }
      };
    }
    static Seal() {
      return function (dependencyClass) {
        ReflectUtil.setIsSealedSettlement(dependencyClass, true);
      };
    }
  }

  /**
   * Export facade for convenience
   */
  const dumpContainerInfo = Injector.dumpContainerInfo.bind(Injector);
  const settle = Injector.settle.bind(Injector);
  const settleLazy = Injector.settleLazy.bind(Injector);
  const Inject = Injector.Inject.bind(Injector);
  const Injectable = Injector.Injectable.bind(Injector);
  const Precedence = Injector.Precedence.bind(Injector);
  const Final = Injector.Final.bind(Injector);
  const FactoryOnly = Injector.FactoryOnly.bind(Injector);
  const Seal = Injector.Seal.bind(Injector);
  var __exports = {
    __esModule: true
  };
  __exports.FactoryOnly = FactoryOnly;
  __exports.Final = Final;
  __exports.Inject = Inject;
  __exports.Injectable = Injectable;
  __exports.Precedence = Precedence;
  __exports.Seal = Seal;
  __exports.dumpContainerInfo = dumpContainerInfo;
  __exports.settle = settle;
  __exports.settleLazy = settleLazy;
  return __exports;
});