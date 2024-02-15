import { Injectable, settle } from 'ui5-di';
import { BaseService } from './Base.service';
import { TOKEN } from './ExplicitUtil.service';
import { SuperUtil } from './SuperUtil.service';

@Injectable()
export class SuperService extends BaseService {
    constructor(private readonly superUtilService: SuperUtil) {
        super(settle(TOKEN));
    }

    public getSuperMessage(): string {
        return (
            'Super service message:' +
            this.superUtilService.getSuperUtilMessage() +
            '\n' +
            super.getBaseMessage()
        );
    }
}
