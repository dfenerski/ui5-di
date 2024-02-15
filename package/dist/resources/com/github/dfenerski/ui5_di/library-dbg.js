sap.ui.define(["sap/ui/core/Lib"], function (Lib) {
  "use strict";

  // Add shims for the ES modules & utility remap of current lib
  sap.ui.loader.config({
    map: {
      '*': {
        'reflect-metadata': 'ui5-di/reflect-metadata/Reflect',
        'reflect-metadata/lite': 'ui5-di/reflect-metadata/ReflectLite',
        'ui5-di': 'com/github/dfenerski/ui5_di/Injector',
        'ui5-di/injector-util': 'com/github/dfenerski/ui5_di/injector-util'
      }
    },
    shim: {
      'ui5-di/reflect-metadata/Reflect': {
        amd: true,
        deps: [],
        exports: 'Reflect'
      },
      'ui5-di/reflect-metadata/ReflectLite': {
        amd: true,
        deps: [],
        exports: 'Reflect'
      }
    }
  });

  // Delegate further initialization of this library to the Core
  const thisLib = Lib.init({
    name: 'com.github.dfenerski.ui5_di',
    version: '${version}',
    dependencies: [],
    types: [],
    interfaces: [],
    controls: [],
    elements: [],
    noLibraryCSS: true
  });

  // Export the library namespace
  return thisLib;
});