import { Injectable } from '../ui5-di/Injector';

@Injectable()
export class UtilService {
    public getUtilMessage(): string {
        return 'Util service message';
    }
}
