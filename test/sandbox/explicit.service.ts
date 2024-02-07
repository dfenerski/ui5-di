import { Injectable } from '../../src/Injector';

@Injectable('SVC:EXPLICIT')
export class ExplicitService {
    public getExplicitMessage(): string {
        return 'Explicit message';
    }
}
