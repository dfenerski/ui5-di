import MessageBox from 'sap/m/MessageBox';
import { settle, settleLazy } from 'ui5-di';
import { AppStateConsumerService } from '../modules/app-state-consumer/AppStateConsumer.service';
import {
    APP_INSTANCE_1,
    APP_INSTANCE_2,
    AppStateService,
} from '../modules/app-state/AppState.service';
import '../modules/concrete-foo/Foo.service';
import { ExplicitConsumerService } from '../modules/explicit-consumer/ExplicitConsumer.service';
import { FooConsumerService } from '../modules/foo-consumer/FooConsumer.service';
import { LazyUtilService } from '../modules/lazy-util/LazyUtil.service';
import { MessageService } from '../modules/message/Message.service';
import { SuperService } from '../modules/metadata-prototype-chain-leakage/Super.service';
import { UtilABConsumerService } from '../modules/util-ab-consumer/Util1Consumer.service';
import BaseController from './BaseController';

/**
 * @namespace com.github.dfenerski.infinite_velocity.controller
 */
export default class Main extends BaseController {
    private readonly messageService = settle(MessageService);
    private readonly explicitConsumerService = settle(ExplicitConsumerService);
    private readonly fooConsumserService = settle(FooConsumerService);
    private readonly appStateConsumerService = settle(AppStateConsumerService);
    private readonly appModel1 = settle<AppStateService>(APP_INSTANCE_1);
    private readonly appModel2 = settle<AppStateService>(APP_INSTANCE_2);
    private readonly utilABConsumer = settleLazy(UtilABConsumerService);
    private readonly superService = settleLazy(SuperService);

    public override onInit(): void {
        const [lazyUtilService, cb] = settleLazy(LazyUtilService);
        setInterval(() => {
            console.error('Lazy service:', lazyUtilService.getUtilMessage?.());
        }, 1000);
        setTimeout(() => {
            cb();
        }, 6500);
    }

    public showResult1(): void {
        MessageBox.show(this.messageService.getMessage());
    }

    public showResult2(): void {
        MessageBox.show(
            this.explicitConsumerService.getExplicitConsumerMessage(),
        );
    }

    public showResult3(): void {
        MessageBox.show(this.fooConsumserService.getFooConsumerMessage());
    }

    public showResult4(): void {
        MessageBox.show(
            this.appStateConsumerService.getAppStateConsumerServiceMessage(),
        );
    }

    public showResult5(): void {
        this.appModel1.incrementClickCount();
    }

    public showResult6(): void {
        this.appModel2.incrementClickCount();
    }

    public showResult7(): void {
        MessageBox.show(this.utilABConsumer[1]().getConsumerMessage());
    }

    public showResult8(): void {
        MessageBox.show(this.superService[1]().getSuperMessage());
    }
}
