import UIComponent from 'sap/ui/core/UIComponent';

sap.ui.loader.config({
    map: {
        '*': {
            'reflect-metadata': 'iv_modules/reflect-metadata/Reflect',
            'reflect-metadata/lite': 'iv_modules/reflect-metadata/ReflectLite',
        },
    },
    shim: {
        'iv_modules/reflect-metadata/Reflect': {
            amd: true,
            deps: [],
            exports: 'Reflect',
        },
        'iv_modules/reflect-metadata/ReflectLite': {
            amd: true,
            deps: [],
            exports: 'Reflect',
        },
    },
});

/**
 * @namespace com.github.dfenerski.infinite_velocity
 */
export default class Component extends UIComponent {
    public static metadata = {
        manifest: 'json',
    };

    public constructor() {
        super('com.github.dfenerski.infinite_velocity.Component');
    }

    public init(): void {
        // call the base component's init function
        super.init();

        // create the views based on the url/hash
        this.getRouter().initialize();
    }
}
