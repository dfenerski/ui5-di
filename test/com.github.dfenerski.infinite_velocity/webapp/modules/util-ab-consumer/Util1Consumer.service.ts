import { Injectable, settle } from 'ui5-di';
import { Util1AService } from '../util-1-a/Util1A.service';
import { Util1BService } from '../util-1-b/Util1B.service';
import { UtilAConsumerService } from '../util-a-consumer/UtilAConsumer.service';

@Injectable()
export class UtilABConsumerService extends UtilAConsumerService {
    public constructor(private readonly util1BService: Util1BService) {
        super(settle(Util1AService));
    }

    public override getConsumerMessage(): string {
        return (
            'Super util consumer' +
            this.util1BService.getUtil1Message() +
            '\n' +
            super.getConsumerMessage()
        );
    }
}
