import UIComponent from "sap/ui/core/UIComponent";
import { settle } from "ui5-di";
import { AppStateFactory } from "./modules/app-state/AppState.factory";
import {
    APP_INSTANCE_1,
    APP_INSTANCE_2,
} from "./modules/app-state/AppState.service";

/**
 * @namespace com.github.dfenerski.infinite_velocity
 */
export default class Component extends UIComponent {
    public static metadata = {
        manifest: "json",
    };

    public constructor() {
        super("com.github.dfenerski.infinite_velocity.Component");
        //
        settle(APP_INSTANCE_1, () =>
            AppStateFactory.createAppStateService({
                modelName: "app1",
                data: {
                    invoiceId: "INV-1",
                },
            })
        );
        settle(APP_INSTANCE_2, () =>
            AppStateFactory.createAppStateService({
                modelName: "app2",
                data: {
                    invoiceId: "INV-2",
                },
            })
        );
    }

    public init(): void {
        // call the base component's init function
        super.init();

        // create the views based on the url/hash
        this.getRouter().initialize();
    }
}
