import Component from 'sap/ui/core/Component';
import JSONModel from 'sap/ui/model/json/JSONModel';
import { FactoryOnly, Injectable } from '../ui5-di/Injector';
import type { App } from './models/App';

export const APP_INSTANCE_1 = Symbol('APP_INSTANCE_1');
export const APP_INSTANCE_2 = Symbol('APP_INSTANCE_2');

@Injectable(APP_INSTANCE_1)
@Injectable(APP_INSTANCE_2)
@FactoryOnly()
export class AppStateService {
    private readonly _model: JSONModel;

    public get state(): App {
        return this._model.getData();
    }

    public setInvoiceId(invoiceId: string) {
        this._model.setProperty('/invoiceId', invoiceId);
    }

    public setClickCount(clickCount: number) {
        this._model.setProperty('/clickCount', clickCount);
    }

    public incrementClickCount() {
        this._model.setProperty('/clickCount', this.state.clickCount + 1);
    }

    public constructor(app: App, name: string) {
        this._model = new JSONModel(app);
        Component.getComponentById(
            'com.github.dfenerski.infinite_velocity.Component',
        )!.setModel(this._model, name);
    }
}
