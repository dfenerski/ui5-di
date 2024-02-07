import { ExplicitService } from '../explicit/Explicit.service';
import { Inject, Injectable } from '../ui5-di/Injector';

@Injectable()
export class ExplicitConsumerService {
    constructor(
        @Inject('SVC:ExplicitService')
        private readonly explicitService: ExplicitService,
    ) {}

    public getExplicitConsumerMessage(): string {
        return (
            'Explicit consumer message: ' +
            this.explicitService.getExplicitMessage()
        );
    }
}
