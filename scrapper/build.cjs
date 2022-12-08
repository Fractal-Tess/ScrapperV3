const { buildSync } = require('esbuild');

const path = require('node:path');

const original = buildSync({
  entryPoints: [path.join(__dirname, './src/main.ts')],
  format: 'esm',
  target: 'esnext',
  platform: 'node',
  bundle: true,
  write: false,
});

const rx =
  /\b__require\("(_http_agent|_http_client|_http_common|_http_incoming|_http_outgoing|_http_server|_stream_duplex|_stream_passthrough|_stream_readable|_stream_transform|_stream_wrap|_stream_writable|_tls_common|_tls_wrap|assert|async_hooks|buffer|child_process|cluster|console|constants|crypto|dgram|diagnostics_channel|dns|domain|events|fs|http|http2|https|inspector|module|net|os|path|perf_hooks|process|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|trace_events|tty|url|util|v8|vm|wasi|worker_threads|zlib)"\)/gm;
const modules = new Map();
const replacedImports = original.outputFiles[0].text.replace(rx, (_, mod) => {
  const id = '__import_' + mod.toUpperCase();
  modules.set(mod, id);
  return id;
});

let out = '';

modules.forEach(
  (val, key) => (out += `import ${val} from ${JSON.stringify(key)};`)
);
out += replacedImports;

buildSync({
  logLevel: 'info',
  bundle: true,
  format: 'esm',
  target: 'esnext',
  platform: 'node',
  minify: true,
  outfile: 'dist/scrapper.js',
  stdin: {
    contents: out,
  },
});
