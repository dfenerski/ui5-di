import { Injectable } from './ui5-di/Injector';

@Injectable()
export class SingleImportService {
    public readonly dummyObject: Record<string, unknown>;

    constructor() {
        this.dummyObject = { foo: 'bar' };
    }

    public getMessage() {
        return 'Foo Bar Baz!';
    }
}
