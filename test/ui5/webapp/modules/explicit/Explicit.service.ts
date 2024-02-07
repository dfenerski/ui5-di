import { Injectable } from '../ui5-di/Injector';

@Injectable('SVC:ExplicitService')
export class ExplicitService {
    public getExplicitMessage(): string {
        return 'Explicit message';
    }
}
