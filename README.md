# Dependency Injection library for SAPUI5 / OpenUI5

Unlock true warp speed development.

### Features

-   no modules, manage through decorators
    -   maybe easier to manage? you just control stuff through decorators, no need to create dedicated scopes
-   lazy loads imports, evaluates them only when settle is requested
-   no explicit registration / coupling is done
-   dependency pool can lasily expand when you import new stuff

### Usage

1. Install

`npm install ui5-di`

2. Setup compiler options

Enable `experimentalDecorators`, `emitDecoratorMetadata` & `verbatimModuleSyntax` in your `tsconfig.json`

```json
{
    "compilerOptions": {
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true,
        "verbatimModuleSyntax": true
    }
}
```

3. Add type mapping

Add `ui5-di` to your `tsconfig.json`:

```json
    "compilerOptions": {
        "paths": {
            "ui5-di": [
                "./node_modules/ui5-di/src/com/github/dfenerski/ui5_di/Injector"
            ],
        }
    },
```

4. Add Babel configuration

If you don't have one, add the following `.babelrc.json` configuration to your project. The UI5 Tooling will automatically pick this up.

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
        ["@babel/plugin-proposal-decorators", { "legacy": true }]
    ],
    "presets": [
        ["transform-ui5", {}],
        ["@babel/preset-typescript", {}]
    ]
}
```

5. Decorate your service class

```typescript
import { Injectable } from 'ui5-di';

@Injectable()
export class UtilService {
    public getUtilMessage(): string {
        return 'Util service message';
    }
}
```

6. Use automatically resolved dependency tree in your controller

```typescript
export default class Main extends BaseController {
    private readonly utilService = settle(UtilService);

    public handleSomeEvent() {
        MessageBox.show(this.utilService.getUtilMessage());
    }
}
```

For additional information refer to the sample app inside `/test`. App can be started using `npm run start` from inside its directory.

### Technical

This DI system has 2 peculiarities:

-   it has no "modules" concept. In Angular & NestJS DI, you have a tree-like DI-Module system where each registered class belongs strictly to its module and optionally can be exported (made visible) to others who import it.
    Here all instances are registered in the same container (`Map`) behind the scenes and in order to manage dependencies you have to then use DRS & @Precedence. By setting priority & defining the polymorphic behavior you can control the hierarchy of registered clases.
-   it has a "2 - phase" concept. Class dependencies are evaluated at import-time, lazily populating a virtual graph. Only when you request a specific instance (by token), the graph (or a part of it) is hydrated with instances. The exploratory phase always precedes the hydration phase (before you do `new Stuff` you always have to `import { Stuff }` first), but may also succeed it (suppose a new app view is open, controller imports are evaluated, deps are added to virtual graph). This feature requires additional management of the global class pool - we need to be able to say when we want newly explored dehydrated dependencies to override previously hydrated ones (which may have lower importance).

Both points are (easily) managed through tools provided in this lib. While somewhat unique, this plays nice with the lazy evaluation of imports in the web environment & saves effort of implementing more complex tree-like scope management solution like in the mentioned frameworks.
Additionally, due to the "2 phase" concept, you don't have to explicitly manage dependencies, like in popular libraries such as InversifyJS or similar. There, you'd have to explicitly call `.register` or similar method to define registration order & dependency pool. Here the exploratory phase of the system populates the virtual graph for you, dynamically resolving the hierarchy through the decorators.
