import { Injectable } from 'ui5-di';

@Injectable()
export class Util1BService {
    public getUtil1Message(): string {
        return '1B_Util service message_B1';
    }
}
