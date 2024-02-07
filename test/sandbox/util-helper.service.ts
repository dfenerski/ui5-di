import { Injectable } from '../../src/Injector';

@Injectable()
export class UtilHelperService {
    public getUtilHelperMessage(): string {
        return 'Util helper message';
    }
}
