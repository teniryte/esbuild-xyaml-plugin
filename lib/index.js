'use strict';

const xyaml = require('xyaml');
const path = require('path');

module.exports = xyamlPlugin;

function xyamlPlugin() {
  let plugin = {
    name: 'xyaml',
    setup(build) {
      build.onResolve({ filter: /\.yaml/ }, (args) => {
        return {
          path: path.resolve(args.resolveDir, args.path),
          namespace: 'xyaml-ns',
        };
      });

      build.onLoad({ filter: /\.yaml/, namespace: 'xyaml-ns' }, (args) => {
        return {
          contents: JSON.stringify(xyaml.loadFile(args.path).getData()),
          loader: 'json',
        };
      });
    },
  };
  return plugin;
}
