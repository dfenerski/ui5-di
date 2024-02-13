import { Injectable } from './ui5-di/Injector';

@Injectable()
export class UtilHelper2Service {
    public getUtilHelper2Message(): string {
        return '2_Util helper message_2';
    }
}
