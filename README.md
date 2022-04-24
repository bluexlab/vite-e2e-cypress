# vite-e2e-cypress

Run cypress e2e tests within your Vite project.

### Install
```shell
npm install vite-e2e-cypress --save-dev
```

### Usage

```shell
vite-cy-e2e
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
