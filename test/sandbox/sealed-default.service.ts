import { Injectable, Seal } from './ui5-di/Injector';

@Injectable('S')
@Seal()
export class SealedDefaultService {
    public getMessage() {
        return 'BASE';
    }
}
