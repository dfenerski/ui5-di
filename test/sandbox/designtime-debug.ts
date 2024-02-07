import 'reflect-metadata';

function deco(_: any) {}

@deco
class Foo {
    constructor(private readonly foo: number) {}
}

console.error('Metadata:', Reflect.getMetadata('design:paramtypes', Foo));
