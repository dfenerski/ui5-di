//@ui5-bundle com/github/dfenerski/ui5_di/library-preload.js
sap.ui.predefine("com/github/dfenerski/ui5_di/Injector", ["reflect-metadata/lite","./di-container/DIContainer","./di-container/misc/constants","./injector-util/InjectorUtil","./injector-util/misc/constants","./misc","./reflect-util/ReflectUtil"],function(e,n,t,c,s,r,o){"use strict";const i=n["DIContainer"];const a=t["Precedence"];const d=c["InjectorUtil"];const l=s["DependencyResolutionStrategy"];const y=r["E_INJECTOR_NO_DEPENDENCY_FACTORY"];const p=o["ReflectUtil"];class I{static logger=console;static _container=new i;static dumpContainerInfo(){this.logger.error("Injector._container:\n",this._container)}static createDependencyProxy(e){return new Proxy(e,{get:(e,n,t)=>{if(!e.dependencyInstance){return undefined}return Reflect.get(e.dependencyInstance,n,t)}})}static register(e){const n=p.getIsFactoryOnly(e);const t=p.getParameterTypes(e);if(!n){t.forEach(e=>this.register(e))}const c=p.getInjectionToken(e);const s=p.getPrecedence(e);if(this._container.has(c)){const{dependencyClass:e,dependencyInstance:n,precedence:t}=this._container.get(c);const r=p.getIsFactoryOnly(e);if(t>s){return}else if(r&&n){return}}const r={dependencyInstance:null};const o={dependencyClass:e,dependencyInstance:null,dependencyProxy:this.createDependencyProxy(r),dependencyProxyContext:r,precedence:s};this._container.set(c,o)}static settle(e,n){const t=d.normalizeSettleToken(e);const{dependencyClass:c,dependencyInstance:s,dependencyProxy:r,dependencyProxyContext:o,precedence:i}=this._container.get(t);if(s){return s}const a=p.getIsFactoryOnly(c);if(a&&!n){throw new Error(y)}const l=p.getParameterTypes(c);const I=p.getParameterInjectionTokens(c);const u=a?[]:l.map((e,n)=>this.settle(I[n]||p.getInjectionToken(e)));const P=n?n():new c(...u);o.dependencyInstance=P;this._container.set(t,{dependencyClass:c,dependencyInstance:P,dependencyProxy:r,dependencyProxyContext:o,precedence:i});return P}static settleLazy(e,n){const t=d.normalizeSettleToken(e);const{dependencyClass:c,dependencyInstance:s,dependencyProxy:r}=this._container.get(t);if(s){return[s,()=>s]}const o=p.getIsFactoryOnly(c);if(o&&!n){throw new Error(y)}return[r,()=>this.settle(t,n)]}static Inject(e){return function(n,t,c){const s=p.getParameterInjectionTokens(n);s[c]=e;p.setParameterInjectionTokens(n,s)}}static Injectable(e=l.POLYMORPHIC){const{drs:n,primitiveToken:t}=d.parseInjectableArguments(e);return function(e){const c=d.resolveInjectionToken({dependencyClass:e,drs:n,primitiveToken:t});const s=p.getPrecedence(e)||a.DEFAULT;p.setInjectionToken(e,c);p.setPrecedence(e,s);I.register(e)}}static Precedence(e){return function(n){p.setPrecedence(n,e)}}static Final(){return function(e){p.setPrecedence(e,a.FINAL)}}static FactoryOnly(){return function(e){p.setIsFactoryOnly(e,true)}}}const u=I.dumpContainerInfo.bind(I);const P=I.settle.bind(I);const f=I.settleLazy.bind(I);const g=I.Inject.bind(I);const j=I.Injectable.bind(I);const m=I.Precedence.bind(I);const C=I.Final.bind(I);const h=I.FactoryOnly.bind(I);var T={__esModule:true};T.FactoryOnly=h;T.Final=C;T.Inject=g;T.Injectable=j;T.Precedence=m;T.dumpContainerInfo=u;T.settle=P;T.settleLazy=f;return T});
sap.ui.predefine("com/github/dfenerski/ui5_di/di-container/DIContainer", ["./misc/errors"],function(r){"use strict";const t=r["E_DI_CONTAINER_NO_WRAPLET"];class e{_registry=new Map;has(r){return this._registry.has(r)}get(r){const e=this._registry.get(r);if(!e){throw new Error(t)}return e}set(r,t){this._registry.set(r,t)}}var s={__esModule:true};s.DIContainer=e;return s});
sap.ui.predefine("com/github/dfenerski/ui5_di/di-container/misc/constants", [],function(){"use strict";const e=Object.freeze({DEFAULT:0,FINAL:999});var r={__esModule:true};r.Precedence=e;return r});
sap.ui.predefine("com/github/dfenerski/ui5_di/di-container/misc/errors", [],function(){"use strict";const e="DI container failed: could not find requested dependency for given token";var n={__esModule:true};n.E_DI_CONTAINER_NO_WRAPLET=e;return n});
sap.ui.predefine("com/github/dfenerski/ui5_di/injector-util/InjectorUtil", ["../reflect-util/ReflectUtil","./misc/constants"],function(e,t){"use strict";const n=e["ReflectUtil"];const r=t["DependencyResolutionStrategy"];const s=t["DependencyResolutionStrategyList"];function i(e){return s.includes(e)}function c(e){return typeof e==="function"}class o{static parseInjectableArguments(e=r.POLYMORPHIC){const t=i(e);const n=t?e:r.EXPLICIT;const s=t?null:e;return{drs:n,primitiveToken:s}}static resolveInjectionToken({dependencyClass:e,drs:t,primitiveToken:n}){if(t===r.POLYMORPHIC){return e.name}else if(t===r.DISCRETE){return e}else{return n}}static normalizeSettleToken(e){const t=c(e);if(t){return n.getInjectionToken(e)}return e}}var u={__esModule:true};u.InjectorUtil=o;return u});
sap.ui.predefine("com/github/dfenerski/ui5_di/injector-util/misc/constants", [],function(){"use strict";const e=Object.freeze({POLYMORPHIC:"POLYMORPHIC",DISCRETE:"DISCRETE",EXPLICIT:"EXPLICIT"});const t=Object.values(e);var n={__esModule:true};n.DependencyResolutionStrategy=e;n.DependencyResolutionStrategyList=t;return n});
sap.ui.predefine("com/github/dfenerski/ui5_di/library", ["sap/ui/core/Lib"],function(e){"use strict";sap.ui.loader.config({map:{"*":{"reflect-metadata":"ui5-di/reflect-metadata/Reflect","reflect-metadata/lite":"ui5-di/reflect-metadata/ReflectLite","ui5-di":"com/github/dfenerski/ui5_di/Injector","ui5-di/injector-util":"com/github/dfenerski/ui5_di/injector-util"}},shim:{"ui5-di/reflect-metadata/Reflect":{amd:true,deps:[],exports:"Reflect"},"ui5-di/reflect-metadata/ReflectLite":{amd:true,deps:[],exports:"Reflect"}}});const t=e.init({name:"com.github.dfenerski.ui5_di",version:"${version}",dependencies:[],types:[],interfaces:[],controls:[],elements:[],noLibraryCSS:true});return t});
sap.ui.predefine("com/github/dfenerski/ui5_di/misc", [],function(){"use strict";const e="Factory-only dependency must be instantiated via a factory function but none was provided";var n={__esModule:true};n.E_INJECTOR_NO_DEPENDENCY_FACTORY=e;return n});
sap.ui.predefine("com/github/dfenerski/ui5_di/reflect-util/ReflectUtil", ["./misc/errors"],function(e){"use strict";const t=e["E_REFLECT_UTIL_NO_DI_TOKEN"];class n{static getInjectionToken(e){const n=Reflect.getOwnMetadata("ui5di:injectionToken",e);if(!n){throw new Error(t)}return n}static getParameterInjectionTokens(e){return Reflect.getOwnMetadata("ui5di:parameterInjectionTokens",e)||{}}static getParameterTypes(e){return Reflect.getOwnMetadata("design:paramtypes",e)||[]}static getPrecedence(e){return Reflect.getOwnMetadata("ui5di:precedence",e)}static getIsFactoryOnly(e){return Reflect.getOwnMetadata("ui5di:isFactoryOnly",e)}static setInjectionToken(e,t){return Reflect.defineMetadata("ui5di:injectionToken",t,e)}static setParameterInjectionTokens(e,t){return Reflect.defineMetadata("ui5di:parameterInjectionTokens",t,e)}static setPrecedence(e,t){return Reflect.defineMetadata("ui5di:precedence",t,e)}static setIsFactoryOnly(e,t){return Reflect.defineMetadata("ui5di:isFactoryOnly",t,e)}}var a={__esModule:true};a.ReflectUtil=n;return a});
sap.ui.predefine("com/github/dfenerski/ui5_di/reflect-util/misc/errors", [],function(){"use strict";const e="Reflection failed: no DI token found for class";var n={__esModule:true};n.E_REFLECT_UTIL_NO_DI_TOKEN=e;return n});
sap.ui.require.preload({
	"com/github/dfenerski/ui5_di/di-container/interfaces/IDependencyWraplet.js":function(){

},
	"com/github/dfenerski/ui5_di/di-container/types/DIRegistry.js":function(){

},
	"com/github/dfenerski/ui5_di/di-container/types/DependencyProxyContext.js":function(){

},
	"com/github/dfenerski/ui5_di/injector-util/interfaces/IResolveInjectionTokens.js":function(){

},
	"com/github/dfenerski/ui5_di/injector-util/types/DependencyResolutionStrategyType.js":function(){

},
	"com/github/dfenerski/ui5_di/manifest.json":'{"_version":"1.21.0","sap.app":{"id":"com.github.dfenerski.ui5_di","type":"library","embeds":[],"applicationVersion":{"version":"0.0.5"},"title":"com.github.dfenerski.ui5_di","description":"A package for ui5 development at warp speed","resources":"resources.json","offline":true},"sap.ui":{"technology":"UI5","supportedThemes":[]},"sap.ui5":{"dependencies":{"minUI5Version":"1.120","libs":{}},"library":{"i18n":false,"css":false,"content":{"controls":[],"elements":[],"types":[],"interfaces":[]}}}}',
	"com/github/dfenerski/ui5_di/reflect-util/types/ParameterInjectionTokens.js":function(){

}
});
//# sourceMappingURL=library-preload.js.map