import { Inject, Injectable } from 'ui5-di';
import { ExplicitUtil, TOKEN } from './ExplicitUtil.service';

@Injectable()
export class BaseService {
    constructor(
        @Inject(TOKEN)
        protected readonly explicitUtilService: ExplicitUtil,
    ) {}

    public getBaseMessage(): string {
        return 'Base service message:' + this.explicitUtilService.getMessage();
    }
}
