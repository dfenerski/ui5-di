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
      // Collect current instance type annotations if any
      const ownParameterTypes = this.getOwnParameterTypes(dependencyClass);
      // Get inherited annotations
      const metadata = Reflect.getMetadata('ui5di:parameterInjectionTokens', dependencyClass) || {};
      // Get own annotations
      const ownMetadata = Reflect.getOwnMetadata('ui5di:parameterInjectionTokens', dependencyClass) || {};
      // Merge annotations into a new object:
      // 1. Preserve inherited ones, so constructors of super classes inherit base class annotations
      // 2. Overwrite with own ones, so constructors of super classes decide the injection tokens
      // 3. Remove inherited annotations for non-decorated params so super class constructors don't get polluted from the inheritance
      const parameterInjectionTokens = Object.assign({}, metadata, ownMetadata);
      for (let i = 0; i < ownParameterTypes.length; i++) {
        if (ownParameterTypes[i] && !ownMetadata[i]) {
          delete parameterInjectionTokens[i];
        }
      }
      // Return resolved injection tokens
      return parameterInjectionTokens;
    }
    static getParameterTypes(dependencyClass) {
      return Reflect.getMetadata('design:paramtypes', dependencyClass) || [];
    }
    static getOwnParameterTypes(dependencyClass) {
      return Reflect.getOwnMetadata('design:paramtypes', dependencyClass) || [];
    }
    static getPrecedence(dependencyClass) {
      return Reflect.getOwnMetadata('ui5di:precedence', dependencyClass);
    }
    static getIsFactoryOnly(dependencyClass) {
      return Reflect.getOwnMetadata('ui5di:isFactoryOnly', dependencyClass);
    }
    static getIsSealedSettlement(dependencyClass) {
      return Reflect.getOwnMetadata('ui5di:isSealedSettlement', dependencyClass);
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
    static setIsSealedSettlement(dependencyClass, isSealedSettlement) {
      return Reflect.defineMetadata('ui5di:isSealedSettlement', isSealedSettlement, dependencyClass);
    }
  }
  var __exports = {
    __esModule: true
  };
  __exports.ReflectUtil = ReflectUtil;
  return __exports;
});