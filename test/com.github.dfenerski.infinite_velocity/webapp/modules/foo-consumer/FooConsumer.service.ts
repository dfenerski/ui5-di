import { Injectable } from 'ui5-di';
import { FooService } from '../abstract-foo/Foo.service';

@Injectable()
export class FooConsumerService {
    public constructor(private readonly fooService: FooService) {}

    public getFooConsumerMessage(): string {
        return 'Foo consumer message;' + this.fooService.getFooMessage();
    }
}
