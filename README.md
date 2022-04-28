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

Run dev server instead of build the app and run preview server.
Might be helpful for local development to reflect code change immediately without restarting cypress.
```shell
vite-cy-e2e -d
```