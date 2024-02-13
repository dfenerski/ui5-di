import { BusinessService } from './business.service';
import './foo.service';
import { dumpContainerInfo, settle } from './ui5-di/Injector';

dumpContainerInfo();

const businessService = settle(BusinessService);

console.log(businessService.getBusinessMessage());
console.log(businessService.getBusinessMessage1());
console.log(businessService.getBusinessMessage2());
