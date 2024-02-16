import { Inject, Injectable, settle } from './ui5-di/Injector';

@Injectable()
@Injectable('UTIL:M')
@Injectable('UTIL:B')
class UtilService {
    public getMessage() {
        return 'UTIL';
    }
}

const i = <any>settle('UTIL:M');
i.getMessage = function () {
    return 'UTIL:M';
};

const i1 = <any>settle('UTIL:B');
i1.getMessage = function () {
    return 'UTIL:B';
};

@Injectable()
class Base {
    constructor(
        @Inject('UTIL:M')
        public readonly utilService: UtilService,
    ) {}
}

@Injectable()
class SuperDef extends Base {
    constructor(public readonly utilService: UtilService) {
        super(settle('UTIL:M'));
    }
}

@Injectable()
class SuperM extends Base {}

@Injectable()
class SuperB extends Base {
    constructor(
        @Inject('UTIL:B')
        public readonly utilService: UtilService,
    ) {
        super(utilService);
    }
}

const b = settle(Base);
const sm = settle(SuperM);
const sdef = settle(SuperDef);
const sb = settle(SuperB);

console.error(b.utilService.getMessage());
console.error(sm.utilService.getMessage());
console.error(sdef.utilService.getMessage());
console.error(sb.utilService.getMessage());
