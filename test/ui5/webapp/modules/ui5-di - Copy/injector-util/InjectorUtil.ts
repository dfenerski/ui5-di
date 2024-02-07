import type { Class, InjectionToken, PrimitiveInjectionToken } from '../misc';
import { ReflectUtil } from '../reflect-util/ReflectUtil';
import type { IResolveInjectionTokens } from './interfaces/IResolveInjectionTokens';
import {
    DependencyResolutionStrategy as DRS,
    DependencyResolutionStrategyList as DRSList,
} from './misc/constants';
import {
    E_DRS_EXPLICIT_VALIDATION,
    E_DRS_NON_EXPLICIT_VALIDATION,
} from './misc/errors';
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
    private static validateDependencyResolutionStrategy(
        drs: DRST,
        primitiveTokens: PrimitiveInjectionToken[],
    ) {
        if (drs === DRS.EXPLICIT && !primitiveTokens.length) {
            throw E_DRS_EXPLICIT_VALIDATION;
        } else if (drs !== DRS.EXPLICIT && primitiveTokens.length) {
            throw E_DRS_NON_EXPLICIT_VALIDATION;
        }
    }

    public static parseInjectableArguments(
        drsOrMainPrimitiveToken:
            | DRST
            | PrimitiveInjectionToken = DRS.POLYMORPHIC,
        additionalPrimitiveTokens: PrimitiveInjectionToken[],
    ) {
        const isDRSProvided = getIsDRSProvided(drsOrMainPrimitiveToken);
        const drs = isDRSProvided ? drsOrMainPrimitiveToken : DRS.EXPLICIT;
        const primitiveTokens = isDRSProvided
            ? additionalPrimitiveTokens
            : [drsOrMainPrimitiveToken, ...additionalPrimitiveTokens];
        // Validate parsed parameter combination
        this.validateDependencyResolutionStrategy(drs, primitiveTokens);
        //
        return {
            drs,
            primitiveTokens,
        };
    }

    public static resolveInjectionTokens<T extends {}>({
        dependencyClass,
        drs,
        primitiveTokens,
    }: IResolveInjectionTokens<T>): InjectionToken<T>[] {
        if (drs === DRS.POLYMORPHIC) {
            return [dependencyClass.name];
        } else if (drs === DRS.DISCRETE) {
            return [dependencyClass];
        } else {
            return primitiveTokens;
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
