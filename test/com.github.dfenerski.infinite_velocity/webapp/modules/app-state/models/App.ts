export class App {
    public readonly invoiceId: string = '';
    public readonly clickCount: number = 0;

    public constructor({ invoiceId, clickCount }: App) {
        this.invoiceId = invoiceId;
        this.clickCount = clickCount;
    }
}
