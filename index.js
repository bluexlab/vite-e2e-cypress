#!/usr/bin/env node
import { createRequire } from "module";
import path from 'path'
import { execa } from 'execa'
import { program } from 'commander'
import vite from 'vite'
const { build, preview } = vite

program
  .name('vite-e2e-cypress')
  .description('Simple command line script to run cypress e2e with vite')
  .option('-r, --root, <root>', 'root path for vite project')
  .option('-p, --port <port>', 'port to serve the vite server')
  .option('-c, --config-file <configFile>', 'path to vite config file')
  .option('--headless', 'run in headless mode without GUI')
  .option('--mode', 'specify the mode the dev server should run in.', 'production')
  .option('-s, --spec <spec>', '(headless only) runs a specific spec file. defaults to "all"', 'all') 

program.parse()

const options = program.opts()

const resolveModule = function (request, context) {
  let resolvedPath
  try {
    try {
      resolvedPath = createRequire(path.resolve(context, 'package.json')).resolve(request)
    } catch (e) {
      resolvedPath = resolve(request, { paths: [context] })
    }
  } catch (e) {}
  return resolvedPath
}

;(async () => {
  const cwd = process.cwd()
  const root = options.root ? path.resolve(cwd, options.root) : cwd
  const configFile = path.resolve(cwd, options.configFile || 'vite.config.ts')
  const port = options.port || 8080
  const configs = {
    root,
    configFile,
    mode: options.mode || 'production'
  }
  await build(configs)

  const previewServer = await preview({
    ...configs,
    preview: {
      port,
      open: false
    }
  })

  previewServer.printUrls()

  let cyArgs = [
    options.headless ? 'run' : 'open', // open or run
    '--config', `baseUrl=http://localhost:${port}`
  ]
  if (options.headless) {
    cyArgs = cyArgs.concat(['--spec', options.spec])
  }

  // Use loadModule to allow users to customize their Cypress dependency version.
  const cypressBinPath = resolveModule('cypress/bin/cypress', cwd) ||
    resolveModule('cypress/bin/cypress', __dirname)
  const runner = execa(cypressBinPath, cyArgs, { stdio: 'inherit' })
  if (previewServer) {
    runner.on('error', () => {
      previewServer.httpServer.close()
      process.exit(1)
    })
    runner.on('exit', code => {
      previewServer.httpServer.close()
      process.exit(code)
    })
  }

  return runner
})()
