import { Inject, Injectable } from '../../src/Injector';
import { ExplicitService } from './explicit.service';

@Injectable()
export class ExplicitBusinessService {
    public constructor(
        @Inject('SVC:EXPLICIT')
        private readonly explicitService: ExplicitService,
    ) {
        //
    }

    public getBusinessMessage(): string {
        return `Explicit Business message: ${this.explicitService.getExplicitMessage()}`;
    }
}
