sap.ui.define(["./misc/errors"], function (___misc_errors) {
  "use strict";

  const E_DI_CONTAINER_NO_WRAPLET = ___misc_errors["E_DI_CONTAINER_NO_WRAPLET"];
  /**
   * Map adapter implementation for the DI container.
   */
  class DIContainer {
    _registry = new Map();
    has(injectionToken) {
      return this._registry.has(injectionToken);
    }
    get(injectionToken) {
      const dependencyWraplet = this._registry.get(injectionToken);
      // Abort if requested dependency wraplet could not be found
      if (!dependencyWraplet) {
        throw new Error(E_DI_CONTAINER_NO_WRAPLET);
      }
      //
      return dependencyWraplet;
    }
    set(injectionToken, dependencyWraplet) {
      this._registry.set(injectionToken, dependencyWraplet);
    }
  }
  var __exports = {
    __esModule: true
  };
  __exports.DIContainer = DIContainer;
  return __exports;
});