import { dumpContainerInfo, settle } from './ui5-di/Injector';
import { UtilSuperService } from './util-super.service';

dumpContainerInfo();

const utilSuperService = settle(UtilSuperService);

console.log(utilSuperService.getUtilMessage());
