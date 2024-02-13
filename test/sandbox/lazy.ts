import { settleLazy } from './ui5-di/Injector';
import { UtilService } from './util.service';

const [lazy, lazySettler] = settleLazy(UtilService);

setInterval(() => {
    console.log('Lazy service:', lazy.getUtilMessage?.());
}, 1000);

setTimeout(() => {
    lazySettler();
}, 3500);
