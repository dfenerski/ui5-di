import { Injectable } from 'ui5-di';
import { UtilService } from '../util/Util.service';

@Injectable()
export class MessageService {
    constructor(private readonly utilService: UtilService) {}

    public getMessage(): string {
        return 'Message service message.' + this.utilService.getUtilMessage();
    }
}
