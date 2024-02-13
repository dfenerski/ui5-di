import { Injectable } from 'ui5-di';
import { DependencyResolutionStrategy as DRS } from 'ui5-di/injector-util/misc/constants';
import { UtilService } from '../util/Util.service';

@Injectable(DRS.DISCRETE)
export class LazyUtilService {
    constructor(private readonly utilService: UtilService) {}

    public getUtilMessage() {
        return 'This is a lazy service;' + this.utilService.getUtilMessage();
    }
}
