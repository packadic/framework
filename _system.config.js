System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: "typescript",
  babelOptions: {
    "optional": [
      "runtime",
      "optimisation.modules.system"
    ]
  },
  typescriptOptions: {
    "module": "commonjs",
    "emitDecoratorMetadata": true
  },
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },
  packages: {
    "app": {
      "main": "init",
      //"defaultExtension": "ts"
    }
  }
});
