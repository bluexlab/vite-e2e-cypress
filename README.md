# vite-e2e-cypress

Run cypress e2e tests within your Vite project.

### Install
```shell
npm install vite-e2e-cypress --save-dev
```

### Usage

Run all spec files
```shell
vite-cy-e2e
```

View all options
```shell
vite-cy-e2e --help
```

Running particular spec files

```shell
vite-cy-e2e --headless -s '**/*.spec.js'
```

Specify vite config file path. This example is also the default value.

```shell
vite-cy-e2e -c ./vite.config.ts
```

Specify vite root path. This example is also the default value.

```shell
vite-cy-e2e -r .
```

Run in different mode (default to production)
```shell
vite-cy-e2e -m development
```

> NOTE: When running in production mode, vite-e2e-cypress will build the project and use preview server.
> When running in development mode, vite-e2e-cypress will run the dev server
> to reflect code change without the need to restart cypress.