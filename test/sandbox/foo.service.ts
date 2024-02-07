import { Injectable } from '../../src/Injector';

@Injectable()
export class FooService {
    public getFooMessage(): string {
        return 'Foo message';
    }
}
