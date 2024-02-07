import { FooService } from '../abstract-foo/Foo.service';
import { Injectable } from '../ui5-di/Injector';

@Injectable()
export class FooConsumerService {
    public constructor(private readonly fooService: FooService) {}

    public getFooConsumerMessage(): string {
        return 'Foo consumer message;' + this.fooService.getFooMessage();
    }
}
