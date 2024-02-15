import { NT_UTIL_SVC, NtExplicitUtil } from './nt-explicit-util';
import { Inject, Injectable } from './ui5-di/Injector';

@Injectable()
export class NTBaseService {
    constructor(
        @Inject(NT_UTIL_SVC)
        private readonly ntUtilService: NtExplicitUtil,
    ) {}

    public getBaseMessage(): string {
        return 'BASE: ' + this.ntUtilService.getNtExplicitUtilMessage();
    }
}
