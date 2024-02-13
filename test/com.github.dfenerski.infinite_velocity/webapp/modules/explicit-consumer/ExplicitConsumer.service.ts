import { Inject, Injectable } from 'ui5-di';
import { ExplicitService } from '../explicit/Explicit.service';

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
