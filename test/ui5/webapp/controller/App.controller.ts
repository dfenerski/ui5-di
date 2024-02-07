import {
    APP_INSTANCE_1,
    APP_INSTANCE_2,
    AppStateService,
} from '../modules/app-state/AppState.service';
import { App as ModelApp } from '../modules/app-state/models/App';
import { settle } from '../modules/ui5-di/Injector';
import BaseController from './BaseController';

/**
 * @namespace com.github.dfenerski.infinite_velocity.controller
 */
export default class App extends BaseController {
    //
    public onInit(): void {
        settle(
            APP_INSTANCE_1,
            () =>
                new AppStateService(
                    new ModelApp({
                        invoiceId: 'INV-1',
                        clickCount: 0,
                    }),
                    'app1',
                ),
        );
        settle(
            APP_INSTANCE_2,
            () =>
                new AppStateService(
                    new ModelApp({
                        invoiceId: 'INV-2',
                        clickCount: 0,
                    }),
                    'app2',
                ),
        );
    }
}
