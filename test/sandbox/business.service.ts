import { Inject, Injectable } from '../../src/Injector';
import { FooService } from './abstract-foo.service';
import { ExplicitService } from './explicit.service';
import { UtilService } from './util.service';

@Injectable()
export class BusinessService {
    public constructor(
        private readonly utilService: UtilService,
        @Inject('SVC:EXPLICIT')
        private readonly explicitService: ExplicitService,
        private readonly fooService: FooService,
    ) {
        //
    }

    public getBusinessMessage(): string {
        return `Business message: ${this.utilService.getUtilMessage()}`;
    }

    public getBusinessMessage1(): string {
        return `Business message1: ${this.explicitService.getExplicitMessage()}`;
    }

    public getBusinessMessage2(): string {
        return `Business message2: ${this.fooService.getFooMessage()}`;
    }
}
