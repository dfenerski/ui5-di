import { Injectable, settle } from './ui5-di/Injector';
import { UtilHelper2Service } from './util-helper-2.service';
import { UtilHelperService } from './util-helper.service';
import { UtilService } from './util.service';

@Injectable()
export class UtilSuperService extends UtilService {
    constructor(private readonly utilHelper2Service: UtilHelper2Service) {
        super(settle(UtilHelperService));
    }

    public override getUtilMessage(): string {
        return (
            super.getUtilMessage() +
            ` and ${this.utilHelper2Service.getUtilHelper2Message()}`
        );
    }
}
