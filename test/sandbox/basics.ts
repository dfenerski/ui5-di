import { dumpContainerInfo, settle } from '../../src/Injector';
import { BusinessService } from './business.service';
import './foo.service';

dumpContainerInfo();

const businessService = settle(BusinessService);

console.log(businessService.getBusinessMessage());
console.log(businessService.getBusinessMessage1());
console.log(businessService.getBusinessMessage2());
