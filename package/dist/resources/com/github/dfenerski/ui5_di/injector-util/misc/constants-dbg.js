sap.ui.define([], function () {
  "use strict";

  const DependencyResolutionStrategy = Object.freeze({
    POLYMORPHIC: 'POLYMORPHIC',
    DISCRETE: 'DISCRETE',
    EXPLICIT: 'EXPLICIT'
  });
  const DependencyResolutionStrategyList = Object.values(DependencyResolutionStrategy);
  var __exports = {
    __esModule: true
  };
  __exports.DependencyResolutionStrategy = DependencyResolutionStrategy;
  __exports.DependencyResolutionStrategyList = DependencyResolutionStrategyList;
  return __exports;
});