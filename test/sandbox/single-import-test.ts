import { SingleImportService } from './single-import';
import { settle } from './ui5-di/Injector';

const singleImportService = settle(SingleImportService);

const { SingleImportConsumerA } = await import('./single-import-consumer-a');

const singleImportConsumerA = settle(SingleImportConsumerA);

console.log(singleImportService.getMessage());
console.log(singleImportConsumerA.getMessage());

console.log(
    singleImportService.dummyObject ===
        singleImportConsumerA.singleImportService.dummyObject,
);

// dumpContainerInfo();

/**
 * UI5 test missing for this scenario
 */
