import { Injectable } from 'ui5-di';

@Injectable()
export class SuperUtil {
    public getSuperUtilMessage(): string {
        return 'SuperUtil service message';
    }
}
