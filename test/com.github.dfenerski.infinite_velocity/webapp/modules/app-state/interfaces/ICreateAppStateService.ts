import type { App } from '../models/App';

export interface ICreateAppStateService {
    readonly modelName: string;
    readonly data: Pick<App, 'invoiceId'>;
}
