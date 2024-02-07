import type { Class, InjectionToken, PrimitiveInjectionToken } from '../misc';
import { ReflectUtil } from '../reflect-util/ReflectUtil';
import type { IResolveInjectionTokens } from './interfaces/IResolveInjectionTokens';
import {
    DependencyResolutionStrategy as DRS,
    DependencyResolutionStrategyList as DRSList,
} from './misc/constants';
import type { DependencyResolutionStrategyType as DRST } from './types/DependencyResolutionStrategyType';

function getIsDRSProvided(
    drsOrMainPrimitiveToken: any,
): drsOrMainPrimitiveToken is DRST {
    return DRSList.includes(drsOrMainPrimitiveToken);
}

function getIsDependencyClassInjectionToken<T extends {}>(
    injecitonToken: InjectionToken<T>,
): injecitonToken is Class<T> {
    return typeof injecitonToken === 'function';
}

/**
 * Namespaced helper functions for the Injector class.
 */
export class InjectorUtil {
    public static parseInjectableArguments(
        drsOrInjectionToken: DRST | PrimitiveInjectionToken = DRS.POLYMORPHIC,
    ) {
        const isDRSProvided = getIsDRSProvided(drsOrInjectionToken);
        const drs = isDRSProvided ? drsOrInjectionToken : DRS.EXPLICIT;
        const primitiveToken = isDRSProvided ? null : drsOrInjectionToken;
        //
        return {
            drs,
            primitiveToken,
        };
    }

    public static resolveInjectionToken<T extends {}>({
        dependencyClass,
        drs,
        primitiveToken,
    }: IResolveInjectionTokens<T>): InjectionToken<T> {
        if (drs === DRS.POLYMORPHIC) {
            return dependencyClass.name;
        } else if (drs === DRS.DISCRETE) {
            return dependencyClass;
        } else {
            return primitiveToken!;
        }
    }

    public static normalizeSettleToken<T extends {}>(
        injectionToken: InjectionToken<T>,
    ): InjectionToken<T> {
        const isDependencyClassInjectionToken =
            getIsDependencyClassInjectionToken(injectionToken);
        //
        if (isDependencyClassInjectionToken) {
            return ReflectUtil.getInjectionToken(injectionToken);
        }
        //
        return injectionToken;
    }
}
