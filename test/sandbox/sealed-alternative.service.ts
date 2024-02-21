import { Injectable } from './ui5-di/Injector';

@Injectable('S')
export class SealedAlternativeService {
    public getMessage() {
        return 'BASE';
    }
}
