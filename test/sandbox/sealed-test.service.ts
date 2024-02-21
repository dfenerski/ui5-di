import { SealedDefaultService } from './sealed-default.service';
import { dumpContainerInfo, settle } from './ui5-di/Injector';

const sealedDefault = settle<SealedDefaultService>('S');

const { SealedAlternativeService } = await import(
    './sealed-alternative.service'
);

const sealedAlternative = settle<typeof SealedAlternativeService>('S');

dumpContainerInfo();
