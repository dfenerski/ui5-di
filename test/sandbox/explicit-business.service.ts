import { ExplicitService } from './explicit.service';
import { Inject, Injectable } from './ui5-di/Injector';

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
