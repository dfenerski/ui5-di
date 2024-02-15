sap.ui.define(["../reflect-util/ReflectUtil", "./misc/constants"], function (___reflect_util_ReflectUtil, ___misc_constants) {
  "use strict";

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const ReflectUtil = ___reflect_util_ReflectUtil["ReflectUtil"];
  const DRS = ___misc_constants["DependencyResolutionStrategy"];
  const DRSList = ___misc_constants["DependencyResolutionStrategyList"];
  function getIsDRSProvided(drsOrMainPrimitiveToken) {
    return DRSList.includes(drsOrMainPrimitiveToken);
  }
  function getIsDependencyClassInjectionToken(injecitonToken) {
    return typeof injecitonToken === 'function';
  }

  /**
   * Namespaced helper functions for the Injector class.
   */
  class InjectorUtil {
    static parseInjectableArguments(drsOrInjectionToken = DRS.POLYMORPHIC) {
      const isDRSProvided = getIsDRSProvided(drsOrInjectionToken);
      const drs = isDRSProvided ? drsOrInjectionToken : DRS.EXPLICIT;
      const primitiveToken = isDRSProvided ? null : drsOrInjectionToken;
      //
      return {
        drs,
        primitiveToken
      };
    }
    static resolveInjectionToken({
      dependencyClass,
      drs,
      primitiveToken
    }) {
      if (drs === DRS.POLYMORPHIC) {
        return dependencyClass.name;
      } else if (drs === DRS.DISCRETE) {
        return dependencyClass;
      } else {
        return primitiveToken;
      }
    }
    static normalizeSettleToken(injectionToken) {
      const isDependencyClassInjectionToken = getIsDependencyClassInjectionToken(injectionToken);
      //
      if (isDependencyClassInjectionToken) {
        return ReflectUtil.getInjectionToken(injectionToken);
      }
      //
      return injectionToken;
    }
  }
  var __exports = {
    __esModule: true
  };
  __exports.InjectorUtil = InjectorUtil;
  return __exports;
});