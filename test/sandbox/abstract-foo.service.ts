import { Injectable } from './ui5-di/Injector';

@Injectable()
export abstract class FooService {
    public abstract getFooMessage(): string;
}
