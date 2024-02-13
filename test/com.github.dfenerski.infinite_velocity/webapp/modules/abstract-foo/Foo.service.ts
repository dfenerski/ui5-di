import { Injectable } from 'ui5-di';

@Injectable()
export abstract class FooService {
    public abstract getFooMessage(): string;
}
