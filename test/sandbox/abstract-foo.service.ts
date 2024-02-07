import { Injectable } from '../../src/Injector';

@Injectable()
export abstract class FooService {
    public abstract getFooMessage(): string;
}
