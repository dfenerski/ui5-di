import { Injectable } from '../../src/Injector';
import { UtilHelperService } from './util-helper.service';

@Injectable()
export class UtilService {
    constructor(private readonly utilHelperService: UtilHelperService) {}

    public getUtilMessage(): string {
        return `Util message, ${this.utilHelperService.getUtilHelperMessage()}`;
    }
}
