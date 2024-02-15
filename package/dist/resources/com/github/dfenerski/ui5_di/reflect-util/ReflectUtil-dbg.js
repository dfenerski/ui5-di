sap.ui.define(["./misc/errors"], function (___misc_errors) {
  "use strict";

  const E_REFLECT_UTIL_NO_DI_TOKEN = ___misc_errors["E_REFLECT_UTIL_NO_DI_TOKEN"];
  /**
   * Convenience adapter for the Reflect API.
   * All metadata is set & retrieved from concrete object, ignoring prototype chain. This helps to avoid unexpected behavior when using inheritance.
   */
  class ReflectUtil {
    /**
     * GETTERS
     */

    static getInjectionToken(dependencyClass) {
      const injectionToken = Reflect.getOwnMetadata('ui5di:injectionToken', dependencyClass);
      // Abort if no token was found
      if (!injectionToken) {
        throw new Error(E_REFLECT_UTIL_NO_DI_TOKEN);
      }
      //
      return injectionToken;
    }
    static getParameterInjectionTokens(dependencyClass) {
      return Reflect.getOwnMetadata('ui5di:parameterInjectionTokens', dependencyClass) || {};
    }
    static getParameterTypes(dependencyClass) {
      return Reflect.getOwnMetadata('design:paramtypes', dependencyClass) || [];
    }
    static getPrecedence(dependencyClass) {
      return Reflect.getOwnMetadata('ui5di:precedence', dependencyClass);
    }
    static getIsFactoryOnly(dependencyClass) {
      return Reflect.getOwnMetadata('ui5di:isFactoryOnly', dependencyClass);
    }

    /**
     * SETTERS
     */

    static setInjectionToken(dependencyClass, injectionToken) {
      return Reflect.defineMetadata('ui5di:injectionToken', injectionToken, dependencyClass);
    }
    static setParameterInjectionTokens(dependencyClass, parameterInjectionTokens) {
      return Reflect.defineMetadata('ui5di:parameterInjectionTokens', parameterInjectionTokens, dependencyClass);
    }
    static setPrecedence(dependencyClass, precedence) {
      return Reflect.defineMetadata('ui5di:precedence', precedence, dependencyClass);
    }
    static setIsFactoryOnly(dependencyClass, isFactoryOnly) {
      return Reflect.defineMetadata('ui5di:isFactoryOnly', isFactoryOnly, dependencyClass);
    }
  }
  var __exports = {
    __esModule: true
  };
  __exports.ReflectUtil = ReflectUtil;
  return __exports;
});