import { Inject, Injectable } from 'ui5-di';
import { APP_INSTANCE_1, AppStateService } from '../app-state/AppState.service';

@Injectable()
export class AppStateConsumerService {
    public constructor(
        @Inject(APP_INSTANCE_1)
        private readonly appModel: AppStateService,
    ) {}

    public getAppStateConsumerServiceMessage(): string {
        return 'Model consumer message: ' + this.appModel.state.invoiceId;
    }
}
