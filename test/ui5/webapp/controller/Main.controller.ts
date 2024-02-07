import MessageBox from 'sap/m/MessageBox';
import { AppStateConsumerService } from '../modules/app-state-consumer/AppStateConsumer.service';
import {
    APP_INSTANCE_1,
    APP_INSTANCE_2,
    AppStateService,
} from '../modules/app-state/AppState.service';
import '../modules/concrete-foo/Foo.service';
import { ExplicitConsumerService } from '../modules/explicit-consumer/ExplicitConsumer.service';
import { FooConsumerService } from '../modules/foo-consumer/FooConsumer.service';
import { MessageService } from '../modules/message/Message.service';
import { settle } from '../modules/ui5-di/Injector';
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
}
