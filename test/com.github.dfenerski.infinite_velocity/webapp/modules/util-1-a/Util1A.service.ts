import { Injectable } from 'ui5-di';

@Injectable()
export class Util1AService {
    public getUtil1AMessage(): string {
        return '1A_Util service message_A1';
    }
}
