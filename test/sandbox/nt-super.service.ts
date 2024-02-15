import { NTBaseService } from './nt-base.service';
import { NT_UTIL_SVC } from './nt-explicit-util';
import { Injectable, settle } from './ui5-di/Injector';
import { UtilHelper2Service } from './util-helper-2.service';

@Injectable()
export class NtSuperService extends NTBaseService {
    constructor(private readonly utilHelper2Service: UtilHelper2Service) {
        super(settle(NT_UTIL_SVC));
    }

    public getSuperMessage(): string {
        return (
            'Super service message: ' +
            this.getBaseMessage() +
            this.utilHelper2Service.getUtilHelper2Message()
            // @ts-ignore
            // this.utilHelper2Service.getNtExplicitUtilMessage()
        );
    }
}
