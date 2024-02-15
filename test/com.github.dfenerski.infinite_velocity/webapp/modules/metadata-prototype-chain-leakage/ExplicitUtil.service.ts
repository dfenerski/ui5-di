import { Injectable } from 'ui5-di';

export const TOKEN = Symbol('ExplicitUtil');

@Injectable(TOKEN)
export class ExplicitUtil {
    public getMessage() {
        return '__EXPLICIT__';
    }
}
