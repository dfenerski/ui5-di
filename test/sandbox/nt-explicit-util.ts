import { Injectable } from './ui5-di/Injector';

export const NT_UTIL_SVC = Symbol('NtExplicitUtil');

@Injectable(NT_UTIL_SVC)
export class NtExplicitUtil {
    public getNtExplicitUtilMessage(): string {
        return '__NT_UTIL__';
    }
}
