import { settle } from 'ui5-di';
import {
    APP_INSTANCE_1,
    AppStateService,
} from '../modules/app-state/AppState.service';
import BaseController from './BaseController';

/**
 * @namespace com.github.dfenerski.infinite_velocity.controller
 */
export default class App extends BaseController {
    private readonly appModel = settle<AppStateService>(APP_INSTANCE_1);

    //
    public onInit(): void {
        setInterval(() => {
            console.error(this.appModel.state);
        }, 1000);
    }
}
