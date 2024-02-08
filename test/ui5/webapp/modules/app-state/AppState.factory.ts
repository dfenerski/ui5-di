import { AppStateService } from './AppState.service';
import type { ICreateAppStateService } from './interfaces/ICreateAppStateService';
import { App } from './models/App';

export class AppStateFactory {
    public static createAppStateService({
        modelName,
        data: { invoiceId },
    }: ICreateAppStateService): AppStateService {
        return new AppStateService(
            new App({ invoiceId, clickCount: 0 }),
            modelName,
        );
    }
}
