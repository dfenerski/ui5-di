import { dumpContainerInfo, settle } from '../../src/Injector';
import { ExplicitService } from './explicit.service';

const explicitService = settle(ExplicitService);

dumpContainerInfo();

console.error(explicitService.getExplicitMessage());
