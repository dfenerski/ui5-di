import { SingleImportService } from './single-import';
import { Injectable } from './ui5-di/Injector';

@Injectable()
export class SingleImportConsumerA {
    constructor(public readonly singleImportService: SingleImportService) {}

    public getMessage() {
        return 'CONSUMER_A:' + this.singleImportService.getMessage();
    }
}
