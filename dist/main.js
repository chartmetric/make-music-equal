// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"2glVN":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "26170a8763aff760";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && ![
        'localhost',
        '127.0.0.1',
        '0.0.0.0'
    ].includes(hostname) ? 'wss' : 'ws';
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        disposedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === 'reload') fullReload();
        else if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
                await hmrApplyUpdates(assets);
                hmrDisposeQueue();
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                let processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    if (ws instanceof WebSocket) {
        ws.onerror = function(e) {
            if (e.message) console.error(e.message);
        };
        ws.onclose = function() {
            console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
        };
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ('reload' in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"adjPd":[function(require,module,exports,__globalThis) {
var _pronounsGridJs = require("./charts/pronouns_grid.js");
var _countriesChartJs = require("./charts/countries_chart.js");
var _genreChartJs = require("./charts/genre_chart.js");
var _compositionChartJs = require("./charts/composition_chart.js");
var _searchableTableJs = require("./charts/searchable_table.js");
var _hmcCarouselJs = require("./components/hmc_carousel.js");
var _searchableCountriesChartJs = require("./charts/searchable_countries_chart.js");
"use strict";
window.Webflow ||= [];
window.Webflow.push(()=>{
    (0, _pronounsGridJs.renderPronounGridChart)();
    (0, _countriesChartJs.renderCountryChart)();
    (0, _genreChartJs.renderGenreChart)();
    (0, _compositionChartJs.renderCompositionChart)();
    (0, _searchableTableJs.renderSearchableTable)();
    (0, _hmcCarouselJs.renderCarousel)();
    (0, _searchableCountriesChartJs.renderCountriesChart)();
});

},{"./charts/pronouns_grid.js":"hfRUE","./charts/countries_chart.js":"gMG4g","./charts/genre_chart.js":"03968","./charts/composition_chart.js":"iBKsn","./charts/searchable_table.js":"hZXvU","./components/hmc_carousel.js":"i3uP2","./charts/searchable_countries_chart.js":"pUaH1"}],"hfRUE":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "renderPronounGridChart", ()=>renderPronounGridChart);
"use strict";
async function fetchData() {
    const response = await fetch('https://share.chartmetric.com/make-music-equal/pronoun_grid_data.csv');
    const csvText = await response.text();
    const rows = csvText.trim().split('\n');
    const data = rows.slice(1).map((row)=>{
        const values = row.split(',');
        return {
            x: +values[0],
            y: +values[1],
            point: values[2]
        };
    });
    return data;
}
function getColor(point) {
    switch(point){
        case 'he/him':
            return '#C0E7F4';
        case 'she/her':
            return '#F0899A';
        case 'they/them':
            return '#B7A7F9';
        default:
            return '#CECECE';
    }
}
async function renderPronounGridChart() {
    const fetchedData = await fetchData();
    const data = {
        datasets: [
            {
                data: fetchedData,
                backgroundColor ({ raw }) {
                    return getColor(raw.point);
                },
                borderWidth: 0,
                width: ({ chart })=>(chart.chartArea || {}).width / 10 - 1,
                height: ({ chart })=>(chart.chartArea || {}).width / 10 - 1
            }
        ]
    };
    const config = {
        type: 'matrix',
        data,
        options: {
            aspectRatio: 1,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: true,
                    callbacks: {
                        label: function(context) {
                            const dataPoint = context.raw;
                            const pronounCount = fetchedData.filter((d)=>d.point === dataPoint.point).length;
                            return `${pronounCount}% of artists use ${dataPoint.point} pronouns`;
                        },
                        title: function(context) {
                            return '';
                        }
                    }
                }
            },
            scales: {
                x: {
                    display: false,
                    min: 0.5,
                    max: 10.5,
                    offset: false
                },
                y: {
                    display: false,
                    min: 0.5,
                    max: 10.5,
                    offset: false
                }
            }
        }
    };
    new Chart(document.getElementById('pronoun-grid-chart'), config);
    new Chart(document.getElementById('modal-pronoun-grid-chart'), config);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports,__globalThis) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"gMG4g":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "renderCountryChart", ()=>renderCountryChart);
"use strict";
async function fetchData() {
    const response = await fetch('https://share.chartmetric.com/make-music-equal/country-breakdown.csv');
    const csvText = await response.text();
    const rows = csvText.trim().split('\n');
    if (rows.length < 2) return []; // Return empty array if no data is available
    const values = rows[1].split(',').map((value)=>value.trim());
    const data = [
        {
            country_name: values[0],
            he_him: Number(values[1]) || 0,
            she_her: Number(values[2]) || 0,
            they_them: Number(values[3]) || 0
        }
    ];
    return data;
}
async function renderCountryChart() {
    const data = await fetchData();
    if (data.length === 0) return; // No data to render
    const countryData = data[0]; // Only use the first row of data
    const container = document.getElementById('donut-countries-container');
    // Create a canvas for the country
    const canvas = document.createElement('canvas');
    canvas.id = `doughnut-chart-0`;
    canvas.style.width = '300px';
    canvas.style.height = '300px';
    // Append canvas to container
    const chartWrapper = document.createElement('div');
    chartWrapper.style.display = 'flex';
    chartWrapper.style.flexDirection = 'column';
    chartWrapper.style.alignItems = 'center';
    chartWrapper.appendChild(canvas);
    container.appendChild(chartWrapper);
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [
                'he/him',
                'she/her',
                'they/them'
            ],
            datasets: [
                {
                    data: [
                        countryData.he_him,
                        countryData.she_her,
                        countryData.they_them
                    ],
                    backgroundColor: [
                        '#C0E7F4',
                        '#F0899A',
                        '#B7A7F9'
                    ],
                    borderWidth: 1
                }
            ]
        },
        options: {
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: (context)=>{
                            let value = context.raw;
                            if (value >= 1000000) value = (value / 1000000).toFixed(1) + 'm';
                            else if (value >= 1000) value = (value / 1000).toFixed(1) + 'k';
                            return `${value} artists`;
                        }
                    }
                }
            },
            cutout: '40%' // Adjusts the size of the doughnut hole
        }
    });
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"03968":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "renderGenreChart", ()=>renderGenreChart);
"use strict";
async function fetchData() {
    const response = await fetch('https://share.chartmetric.com/make-music-equal/top5-genre-data.csv');
    const csvText = await response.text();
    const rows = csvText.trim().split('\n');
    const data = rows.slice(1).map((row)=>{
        const values = row.split(',');
        return {
            genre: values[0].trim(),
            he_him: Number(values[1].trim()) || 0,
            she_her: Number(values[2].trim()) || 0,
            they_them: Number(values[3].trim()) || 0
        };
    });
    return data;
}
async function renderGenreChart() {
    const data = await fetchData();
    const labels = data.map((row)=>row.genre);
    const ctx = document.getElementById('top5-genre-chart').getContext('2d');
    ctx.canvas.height = 300;
    ctx.canvas.width = 300;
    const orangeGr = ctx.createLinearGradient(0, 0, 0, 400);
    orangeGr.addColorStop(0, '#F0899A'); // Start color
    orangeGr.addColorStop(1, '#EEC23F'); // End color
    const datasets = [
        {
            label: 'he/him',
            data: data.map((row)=>row.he_him),
            backgroundColor: orangeGr
        },
        {
            label: 'she/her',
            data: data.map((row)=>row.she_her),
            backgroundColor: '#C0E7F4'
        },
        {
            label: 'they/them',
            data: data.map((row)=>row.they_them),
            backgroundColor: '#B7A7F9'
        }
    ];
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            plugins: {
                title: {
                    display: false
                },
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        title: function(context) {
                            let totalArtists = context[0].chart.data.datasets.reduce((sum, dataset)=>sum + dataset.data[context[0].dataIndex], 0);
                            const totalArtistsFormatted = function(totalArtists) {
                                if (totalArtists >= 1000000) return (totalArtists / 1000000).toFixed(1) + 'm';
                                else if (totalArtists >= 1000) return (totalArtists / 1000).toFixed(1) + 'k';
                                return totalArtists;
                            };
                            return `${context[0].label} (${totalArtistsFormatted(totalArtists)} total artists)`;
                        },
                        label: (context)=>{
                            let value = context.raw;
                            if (value >= 1000000) value = (value / 1000000).toFixed(1) + 'm';
                            else if (value >= 1000) value = (value / 1000).toFixed(1) + 'k';
                            return `${value} artists use ${context.dataset.label} pronouns`;
                        }
                    }
                }
            },
            indexAxis: 'y',
            scales: {
                x: {
                    stacked: true,
                    ticks: {
                        callback: function(value) {
                            if (value >= 1000000) return (value / 1000000).toFixed(0) + 'm';
                            else if (value >= 1000) return (value / 1000).toFixed(0) + 'k';
                            return value;
                        }
                    },
                    grid: {
                        display: true
                    }
                },
                y: {
                    stacked: true,
                    ticks: {
                        callback: function(index) {
                            return labels[index];
                        }
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"iBKsn":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "renderCompositionChart", ()=>renderCompositionChart);
"use strict";
async function fetchData() {
    const response = await fetch('https://share.chartmetric.com/make-music-equal/solo-band-data.csv');
    const csvText = await response.text();
    const rows = csvText.trim().split('\n');
    const headers = rows[0].split(',');
    const data = rows.slice(1).map((row)=>{
        const values = row.split(',');
        return {
            country_name: values[0].trim(),
            is_band: Number(values[1].trim()) || 0
        };
    });
    return data;
}
async function renderCompositionChart() {
    const data = await fetchData();
    const labels = data.map((row)=>row.country_name);
    const ctx = document.getElementById('solo-band-chart').getContext('2d');
    ctx.canvas.height = 300;
    ctx.canvas.width = 300;
    const orangeGr = ctx.createLinearGradient(0, 0, 0, 400);
    orangeGr.addColorStop(0, '#F0899A'); // Start color
    orangeGr.addColorStop(1, '#EEC23F'); // End color
    const datasets = [
        {
            label: 'is_band',
            data: data.map((row)=>row.is_band),
            backgroundColor: orangeGr
        }
    ];
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            plugins: {
                title: {
                    display: false
                },
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: (context)=>{
                            let value = context.raw;
                            if (value >= 1000000) value = (value / 1000000).toFixed(1) + 'm';
                            else if (value >= 1000) value = (value / 1000).toFixed(1) + 'k';
                            return `${value} artists`;
                        }
                    }
                }
            },
            indexAxis: 'x',
            scales: {
                x: {
                    display: true,
                    stacked: false,
                    barPercentage: 1,
                    categoryPercentage: 1,
                    grid: {
                        display: false
                    }
                },
                y: {
                    display: true,
                    stacked: false,
                    ticks: {
                        callback: function(value) {
                            if (value >= 1000000) return (value / 1000000).toFixed(0) + 'm';
                            else if (value >= 1000) return (value / 1000).toFixed(0) + 'k';
                            return value;
                        }
                    }
                }
            },
            responsive: true
        }
    });
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hZXvU":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "renderSearchableTable", ()=>renderSearchableTable);
"use strict";
// Fetch Data and Initialize Table
async function fetchData() {
    const response = await fetch('https://chartmetric-public.s3.us-west-2.amazonaws.com/make-music-equal/mme-data.csv');
    const csvText = await response.text();
    const rows = csvText.trim().split('\n');
    const data = rows.slice(1).map((row)=>{
        const values = row.split(',');
        return {
            artist_name: values[1].trim(),
            chartmetric_url: values[2].trim(),
            country_name: values[3].trim(),
            pronouns: values[4].trim(),
            is_band: values[5].trim(),
            genre: values[6].trim()
        };
    });
    return data;
}
async function renderSearchableTable() {
    const data = await fetchData();
    const gridOptions = {
        rowData: data,
        pagination: true,
        paginationPageSize: 50,
        paginationPageSizeSelector: false,
        columnDefs: [
            {
                headerName: "Artist",
                field: "artist_name",
                cellRenderer: (params)=>{
                    const link = document.createElement("a");
                    link.href = params.data.chartmetric_url;
                    link.target = "_blank";
                    link.textContent = params.value;
                    return link;
                }
            },
            {
                headerName: "Country",
                field: "country_name"
            },
            {
                headerName: "Pronouns",
                field: "pronouns"
            },
            {
                headerName: "Composition",
                field: "is_band"
            },
            {
                headerName: "Genre",
                field: "genre"
            }
        ],
        defaultColDef: {
            flex: 1,
            minWidth: 150,
            sortable: true,
            filter: true
        }
    };
    const style = document.createElement("style");
    style.innerHTML = `
    /* Remove text decoration from links */
    .ag-cell a {
      color: inherit;
    }
    
    .ag-cell a:hover {
        font-weight: bold;
      }

    /* Bold headers */
    .ag-header-cell {
      font-weight: bold;
    }

    /* Highlight rows on hover */
    .ag-row:hover {
      background-color: #C0E7F4 !important;
    }

    overscroll-behavior: contain;
  `;
    document.head.appendChild(style);
    // Ensure the grid container exists
    const tableElement = document.querySelector("#searchable-table");
    // Initialize the table
    agGrid.createGrid(tableElement, gridOptions);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"i3uP2":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "renderCarousel", ()=>renderCarousel);
"use strict";
async function fetchData() {
    const response = await fetch('https://chartmetric-public.s3.us-west-2.amazonaws.com/make-music-equal/hmc-articles.csv');
    const csvText = await response.text();
    const rows = csvText.trim().split('\n');
    const data = rows.slice(1).map((row)=>{
        const values = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map((value)=>value.replace(/^"|"$/g, '').trim());
        return {
            name: values[1],
            published_at: new Date(values[2]).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            }),
            url: values[3]
        };
    });
    return data;
}
async function renderCarousel() {
    const data = await fetchData();
    const carousel = document.getElementById('hmc-articles-carousel');
    carousel.style.display = 'flex';
    carousel.style.overflowX = 'auto';
    carousel.style.scrollSnapType = 'x mandatory';
    carousel.style.scrollBehavior = 'smooth';
    carousel.style.gap = '10px';
    carousel.style.whiteSpace = 'nowrap';
    carousel.style.scrollbarWidth = 'none'; // Hide scrollbar for Firefox
    carousel.style.msOverflowStyle = 'none'; // Hide scrollbar for IE/Edge
    carousel.style.alignItems = 'flex-start'; // Aligns items properly
    carousel.style.justifyContent = 'flex-start'; // Ensures no extra space at start
    carousel.style.padding = '10px 0 10px 10px'; // Left padding to prevent cut-off
    // Hide scrollbar for WebKit browsers (Chrome, Safari)
    const style = document.createElement('style');
    style.innerHTML = `
        #hmc-articles-carousel::-webkit-scrollbar {
            display: none;
        }
        .carousel-item {
            flex: 0 0 auto;
            width: 300px;
            height: 200px;
            display: flex;
            justify-content: flex-end;
            flex-direction: column;
            align-items: flex-start;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            background-color: #fff;
            scroll-snap-align: start;
            text-align: center;
            overflow:hidden;
            padding: 1rem;
        }
        .carousel-text {
            word-wrap: break-word;
            white-space: pre-wrap;
            word-break: break-word;
            font-family: Helvetica Neue, sans-serif;
            text-align: left;
        }
        .carousel-title {
            font-weight: bold;
            font-size: 1rem;
            line-height: 1rem;
            background: linear-gradient(225deg, #4D8BB6 0%, #53A751 100%);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .carousel-date {
            margin: 1rem 0;
            font-size: 1rem;
            color: #555;
        }
    `;
    document.head.appendChild(style);
    // Populate the carousel with items
    data.forEach((article)=>{
        const articleLink = document.createElement('a');
        articleLink.href = article.url;
        articleLink.target = "_blank"; // Opens in new tab
        articleLink.rel = "noopener noreferrer"; // Security best practice
        articleLink.style.textDecoration = 'none';
        articleLink.style.color = 'inherit';
        const articleDiv = document.createElement('div');
        articleDiv.classList.add('carousel-item');
        // const articleImage = document.createElement('img');
        // articleImage.src = article.image_url;
        // articleImage.alt = article.name;
        const textContainer = document.createElement('div');
        textContainer.classList.add('carousel-text');
        const articleName = document.createElement('p');
        articleName.classList.add('carousel-title');
        articleName.textContent = article.name;
        const articlePublishedAt = document.createElement('p');
        articlePublishedAt.classList.add('carousel-date');
        articlePublishedAt.textContent = article.published_at;
        textContainer.appendChild(articleName);
        textContainer.appendChild(articlePublishedAt);
        // articleDiv.appendChild(articleImage);
        articleDiv.appendChild(textContainer);
        articleLink.appendChild(articleDiv);
        carousel.appendChild(articleLink);
    });
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"pUaH1":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "renderCountriesChart", ()=>renderCountriesChart);
"use strict";
async function fetchData() {
    const response = await fetch('https://share.chartmetric.com/make-music-equal/country-breakdown.csv');
    const csvText = await response.text();
    const rows = csvText.trim().split('\n');
    if (rows.length < 2) return []; // Return empty array if no data is available
    const headers = rows[0].split(',').map((header)=>header.trim());
    const data = rows.slice(1).map((row)=>{
        const values = row.split(',').map((value)=>value.trim());
        return {
            country_name: values[0],
            he_him: Number(values[1]) || 0,
            she_her: Number(values[2]) || 0,
            they_them: Number(values[3]) || 0
        };
    });
    return data;
}
async function renderCountriesChart() {
    const data = await fetchData();
    if (data.length === 0) return; // No data to render
    const container = document.getElementById('searchable-countries-container');
    // Create a wrapper for the search input and dropdown
    const searchWrapper = document.createElement('div');
    searchWrapper.style.position = 'relative';
    searchWrapper.style.marginBottom = '20px';
    // Create an input field for searching
    const input = document.createElement('input');
    input.id = 'country-search';
    input.placeholder = 'Search for a country...';
    input.style.width = '100%';
    input.style.padding = '0.5rem';
    input.style.border = '1px solid #D8D8D8';
    input.style.borderRadius = '5px';
    input.style.boxSizing = 'border-box';
    input.style.lineHeight = '1.5';
    input.style.setProperty('--webkit-input-placeholder', 'line-height: 1.5;');
    // Set the initial value of the input to the first country's name
    input.value = data[0].country_name;
    input.addEventListener('click', ()=>{
        updateDropdown('');
        dropdown.style.display = 'block';
    });
    // Create a dropdown container for the options
    const dropdown = document.createElement('div');
    dropdown.id = 'country-dropdown';
    dropdown.style.position = 'absolute';
    dropdown.style.top = '100%';
    dropdown.style.left = '0';
    dropdown.style.width = '100%';
    dropdown.style.border = '1px solid #D8D8D8';
    dropdown.style.borderRadius = '5px';
    dropdown.style.backgroundColor = '#FFFFFF';
    dropdown.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    dropdown.style.zIndex = '1000';
    dropdown.style.maxHeight = '200px';
    dropdown.style.overflowY = 'auto';
    dropdown.style.display = 'none';
    dropdown.style.lineHeight = '1.5';
    // Append input and dropdown to the wrapper
    searchWrapper.appendChild(input);
    searchWrapper.appendChild(dropdown);
    // Append the wrapper to the container
    container.appendChild(searchWrapper);
    // Populate dropdown with country names
    const updateDropdown = (filter)=>{
        dropdown.innerHTML = ''; // Clear previous options
        const filteredData = data.filter((countryData)=>countryData.country_name.toLowerCase().includes(filter.toLowerCase())).sort((a, b)=>a.country_name.localeCompare(b.country_name)); // Sort alphabetically
        filteredData.forEach((countryData, index)=>{
            const option = document.createElement('div');
            option.textContent = countryData.country_name;
            option.style.padding = '0.5rem';
            option.style.cursor = 'pointer';
            option.style.borderBottom = '1px solid #F0F0F0';
            option.style.backgroundColor = '#FFFFFF';
            option.addEventListener('mouseover', ()=>{
                option.style.backgroundColor = '#F5F5F5';
            });
            option.addEventListener('mouseout', ()=>{
                option.style.backgroundColor = '#FFFFFF';
            });
            option.addEventListener('click', ()=>{
                input.value = countryData.country_name;
                dropdown.style.display = 'none';
                renderChart(index);
            });
            dropdown.appendChild(option);
        });
        dropdown.style.display = filteredData.length > 0 ? 'block' : 'none';
    };
    // Update dropdown on input
    input.addEventListener('input', ()=>{
        updateDropdown(input.value);
    });
    // Hide dropdown when clicking outside
    document.addEventListener('click', (event)=>{
        if (!searchWrapper.contains(event.target)) dropdown.style.display = 'none';
    });
    // Function to render chart for selected country
    const renderChart = (countryIndex)=>{
        const countryData = data[countryIndex];
        // Remove existing chart if any
        const existingCanvas = document.getElementById('searchable-donut');
        if (existingCanvas) existingCanvas.remove();
        // Create a canvas for the country
        const canvas = document.createElement('canvas');
        canvas.id = `searchable-donut`;
        canvas.style.width = '300px';
        canvas.style.height = '300px';
        // Append canvas to container
        const chartWrapper = document.createElement('div');
        chartWrapper.style.display = 'flex';
        chartWrapper.style.flexDirection = 'column';
        chartWrapper.style.alignItems = 'center';
        chartWrapper.appendChild(canvas);
        container.appendChild(chartWrapper);
        const ctx = canvas.getContext('2d');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: [
                    'he/him',
                    'she/her',
                    'they/them'
                ],
                datasets: [
                    {
                        data: [
                            countryData.he_him,
                            countryData.she_her,
                            countryData.they_them
                        ],
                        backgroundColor: [
                            '#C0E7F4',
                            '#F0899A',
                            '#B7A7F9'
                        ],
                        borderWidth: 1
                    }
                ]
            },
            options: {
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: (context)=>{
                                let value = context.raw;
                                if (value >= 1000000) value = (value / 1000000).toFixed(1) + 'm';
                                else if (value >= 1000) value = (value / 1000).toFixed(1) + 'k';
                                return `${value} artists`;
                            }
                        }
                    }
                },
                cutout: '40%' // Adjusts the size of the doughnut hole
            }
        });
    };
    // Initial render for the first country
    renderChart(0);
    // Update chart on dropdown change
    dropdown.addEventListener('change', (event)=>{
        renderChart(event.target.value);
    });
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["2glVN","adjPd"], "adjPd", "parcelRequire94c2")

//# sourceMappingURL=main.js.map
