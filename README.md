# Dependency Injection library for SAPUI5 / OpenUI5

# Intro

Dependency Injection (DI) revolutionizes code architecture by separating object creation from business logic. This powerful pattern boosts modularity, eases testing, and increases scalability. Championed by leading frameworks like Angular and Spring, DI is a proven strategy for building cleaner, more maintainable software.

`ui5-di` is a lightweight, yet robust dependency injection library created for use inside SAPUI5 / OpenUI5, enabling developers to simplify the management of dependencies within their applications. It has seamless integration, offering a simple and decoupled approach to handling service, controller and component dependencies, thus promoting cleaner code, improved maintainability, and scalability.

# Features

-   No explicit dependency registration and no coupling logic
-   Lazy hydration / late binding to class instances, delaying heavy object instantiation until needed
-   Lazy registration: dependencies are evaluated only on file import
-   Simple usage: often annotating classes with `@Injectable` is enough

# Setup

1. Install: `npm install ui5-di`
2. Setup `tsconfig.json` as follows:

```typescript
{
    "compilerOptions": {
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true,
        "verbatimModuleSyntax": true,
        "paths": {
            "ui5-di": [
                "./node_modules/ui5-di/src/com/github/dfenerski/ui5_di/Injector"
            ],
        }
    }
}
```

3. Add `.babelrc.json`

```json
{
    "ignore": ["**/*.d.ts"],
    "plugins": [
        [
            "@babel/plugin-transform-typescript",
            {
                "onlyRemoveTypeImports": true
            }
        ],
        "babel-plugin-transform-typescript-metadata",
        ["@babel/plugin-proposal-decorators", { "version": "legacy" }]
    ],
    "presets": [
        ["transform-ui5", {}],
        ["@babel/preset-typescript", {}]
    ]
}
```

# Usage

### 1. Annotate your service layer classes

```typescript
import { Injectable } from 'ui5-di';

@Injectable()
export class UtilService {
    public getUtilMessage(): string {
        return 'Util service message';
    }
}
```

```typescript
import { Injectable } from 'ui5-di';
import { UtilService } from './Util.service';

@Injectable()
export class BusinessService {
    constructor(
        private readonly utliService: UtilService, // <- automatically instantiated!
    ) {}

    public getMessage(): string {
        return 'Business: ' + this.utilService.getUtilMessage();
    }
}
```

### 2. Hydrate your controllers

```typescript
import { BusinessService } from '../services/BusinessService';

// ...

export default class Main extends BaseController {
    private readonly businessService = settle(BusinessService);

    public handleSomeEvent() {
        MessageBox.show(this.businessService.getMessage());
    }
}
```

For more examples, please refer to the demo app inside `/test/com.github.dfenerski.infinite_velocity`

# Technical

This DI system has 2 peculiarities:

-   it has no "modules" concept. In Angular & NestJS DI, you have a tree-like DI-Module system where each registered class belongs strictly to its module and optionally can be exported (made visible) to others who import it.
    Here all instances are registered in the same container (`Map`) behind the scenes and in order to manage dependencies you have to then use DRS & @Precedence. By setting priority & defining the polymorphic behavior you can control the hierarchy of registered clases.
-   it has a "2 - phase" concept. Class dependencies are evaluated at import-time, lazily populating a virtual graph. Only when you request a specific instance (by token), the graph (or a part of it) is hydrated with instances. The exploratory phase always precedes the hydration phase (before you do `new Stuff` you always have to `import { Stuff }` first), but may also succeed it (suppose a new app view is open, controller imports are evaluated, deps are added to virtual graph). This feature requires additional management of the global class pool - we need to be able to say when we want newly explored dehydrated dependencies to override previously hydrated ones (which may have lower importance).

Both points are (easily) managed through tools provided in this lib. While somewhat unique, this plays nice with the lazy evaluation of imports in the web environment & saves effort of implementing more complex tree-like scope management solution like in the mentioned frameworks.
Additionally, due to the "2 phase" concept, you don't have to explicitly manage dependencies, like in popular libraries such as InversifyJS or similar. There, you'd have to explicitly call `.register` or similar method to define registration order & dependency pool. Here the exploratory phase of the system populates the virtual graph for you, dynamically resolving the hierarchy through the decorators.

# Notes

### Contributions

PRs/Issues/Discussions welcome! You can also always reach me on twitter or linkedin.

### License

This project is licensed under the Apache Software License, version 2.0 except as noted otherwise in the [LICENSE](LICENSE) file.
