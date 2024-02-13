import { ExplicitService } from './explicit.service';
import { dumpContainerInfo, settle } from './ui5-di/Injector';

const explicitService = settle(ExplicitService);

dumpContainerInfo();

console.error(explicitService.getExplicitMessage());
