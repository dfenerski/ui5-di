sap.ui.define(["./misc/errors"],function(r){"use strict";const t=r["E_DI_CONTAINER_NO_WRAPLET"];class e{_registry=new Map;has(r){return this._registry.has(r)}get(r){const e=this._registry.get(r);if(!e){throw new Error(t)}return e}set(r,t){this._registry.set(r,t)}}var s={__esModule:true};s.DIContainer=e;return s});
//# sourceMappingURL=DIContainer.js.map