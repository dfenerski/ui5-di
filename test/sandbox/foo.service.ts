import { Injectable } from './ui5-di/Injector';

@Injectable()
export class FooService {
    public getFooMessage(): string {
        return 'Foo message';
    }
}
