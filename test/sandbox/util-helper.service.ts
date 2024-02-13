import { Injectable } from './ui5-di/Injector';

@Injectable()
export class UtilHelperService {
    public getUtilHelperMessage(): string {
        return 'Util helper message';
    }
}
