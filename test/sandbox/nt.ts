import { NtSuperService } from './nt-super.service';
import { settle } from './ui5-di/Injector';

// Reflect.getMetadataKeys(NTBaseService).forEach((key) => {
//     console.error(key + ':' + Reflect.getMetadata(key, NTBaseService));
// });
// Reflect.getMetadataKeys(NtSuperService).forEach((key) => {
//     console.error(key + ':' + Reflect.getMetadata(key, NtSuperService));
// });
// console.error(ReflectUtil.getParameterInjectionTokens(NTBaseService));
// console.error(ReflectUtil.getParameterInjectionTokens(NtSuperService));
const ntSuper = settle(NtSuperService);

// dumpContainerInfo();

// console.error(ntBase.getBaseMessage());
console.error(ntSuper.getSuperMessage());
