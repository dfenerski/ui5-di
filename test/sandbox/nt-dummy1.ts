import { Inject, Injectable, settle } from './ui5-di/Injector';

@Injectable('Util')
class UtilExplicit {
    public getUtilMessage(): string {
        return 'Util service message';
    }
}

@Injectable()
class Base {
    constructor(@Inject('Util') protected util: UtilExplicit) {}
}

@Injectable()
class Super extends Base {
    public getFoo() {
        return this.util.getUtilMessage();
    }
}

const s = settle(Super);

console.error(s.getFoo());

console.error(Reflect.get(Super, 'parameterInjectionTokens'));
