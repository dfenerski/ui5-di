import { Inject, Injectable, settle } from 'ui5-di';

@Injectable()
@Injectable('UTIL:M')
@Injectable('UTIL:B')
class ZUtilService {
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
        public readonly utilService: ZUtilService,
    ) {}
}

@Injectable()
class SuperDef extends Base {
    constructor(public readonly utilService: ZUtilService) {
        super(settle('UTIL:M'));
    }
}

@Injectable()
class SuperM extends Base {}

@Injectable()
class SuperB extends Base {
    constructor(
        @Inject('UTIL:B')
        public readonly utilService: ZUtilService,
    ) {
        super(utilService);
    }
}

@Injectable()
export class ParamTokens {
    constructor(
        private readonly b: Base,
        private readonly sm: SuperM,
        private readonly sdef: SuperDef,
        private readonly sb: SuperB,
    ) {}

    public getMessage() {
        return `
        ${this.b.utilService.getMessage()}
        ${this.sm.utilService.getMessage()}
        ${this.sdef.utilService.getMessage()}
        ${this.sb.utilService.getMessage()}
        `;
    }
}
