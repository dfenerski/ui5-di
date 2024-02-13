import { Injectable } from 'ui5-di';
import { Util1AService } from '../util-1-a/Util1A.service';

@Injectable()
export class UtilAConsumerService {
    public constructor(private readonly util1AService: Util1AService) {}

    public getConsumerMessage(): string {
        return (
            'Consuming util service:' + this.util1AService.getUtil1AMessage()
        );
    }
}
