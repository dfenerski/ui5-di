import { FooService as BaseFooService } from '../abstract-foo/Foo.service';
import { Final, Injectable } from '../ui5-di/Injector';

@Injectable()
@Final()
export class FooService extends BaseFooService {
    public getFooMessage(): string {
        return 'Concrete foo message';
    }
}
