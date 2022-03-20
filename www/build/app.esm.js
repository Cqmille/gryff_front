import { B as BUILD, c as consoleDevInfo, p as plt, w as win, H, d as doc, N as NAMESPACE, a as promiseResolve, b as bootstrapLazy } from './index-25b9a15f.js';
import { g as globalScripts } from './app-globals-9393530e.js';

/*
 Stencil Client Patch Browser v2.13.0 | MIT Licensed | https://stenciljs.com
 */
const getDynamicImportFunction = (namespace) => `__sc_import_${namespace.replace(/\s|-/g, '_')}`;
const patchBrowser = () => {
    // NOTE!! This fn cannot use async/await!
    if (BUILD.isDev && !BUILD.isTesting) {
        consoleDevInfo('Running in development mode.');
    }
    if (BUILD.cssVarShim) {
        // shim css vars
        plt.$cssShim$ = win.__cssshim;
    }
    if (BUILD.cloneNodeFix) {
        // opted-in to polyfill cloneNode() for slot polyfilled components
        patchCloneNodeFix(H.prototype);
    }
    if (BUILD.profile && !performance.mark) {
        // not all browsers support performance.mark/measure (Safari 10)
        performance.mark = performance.measure = () => {
            /*noop*/
        };
        performance.getEntriesByName = () => [];
    }
    // @ts-ignore
    const scriptElm = BUILD.scriptDataOpts || BUILD.safari10 || BUILD.dynamicImportShim
        ? Array.from(doc.querySelectorAll('script')).find((s) => new RegExp(`\/${NAMESPACE}(\\.esm)?\\.js($|\\?|#)`).test(s.src) ||
            s.getAttribute('data-stencil-namespace') === NAMESPACE)
        : null;
    const importMeta = import.meta.url;
    const opts = BUILD.scriptDataOpts ? scriptElm['data-opts'] || {} : {};
    if (BUILD.safari10 && 'onbeforeload' in scriptElm && !history.scrollRestoration /* IS_ESM_BUILD */) {
        // Safari < v11 support: This IF is true if it's Safari below v11.
        // This fn cannot use async/await since Safari didn't support it until v11,
        // however, Safari 10 did support modules. Safari 10 also didn't support "nomodule",
        // so both the ESM file and nomodule file would get downloaded. Only Safari
        // has 'onbeforeload' in the script, and "history.scrollRestoration" was added
        // to Safari in v11. Return a noop then() so the async/await ESM code doesn't continue.
        // IS_ESM_BUILD is replaced at build time so this check doesn't happen in systemjs builds.
        return {
            then() {
                /* promise noop */
            },
        };
    }
    if (!BUILD.safari10 && importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    else if (BUILD.dynamicImportShim || BUILD.safari10) {
        opts.resourcesUrl = new URL('.', new URL(scriptElm.getAttribute('data-resources-url') || scriptElm.src, win.location.href)).href;
        if (BUILD.dynamicImportShim) {
            patchDynamicImport(opts.resourcesUrl, scriptElm);
        }
        if (BUILD.dynamicImportShim && !win.customElements) {
            // module support, but no custom elements support (Old Edge)
            // @ts-ignore
            return import(/* webpackChunkName: "polyfills-dom" */ './dom-c5ed0ba5.js').then(() => opts);
        }
    }
    return promiseResolve(opts);
};
const patchDynamicImport = (base, orgScriptElm) => {
    const importFunctionName = getDynamicImportFunction(NAMESPACE);
    try {
        // test if this browser supports dynamic imports
        // There is a caching issue in V8, that breaks using import() in Function
        // By generating a random string, we can workaround it
        // Check https://bugs.chromium.org/p/chromium/issues/detail?id=990810 for more info
        win[importFunctionName] = new Function('w', `return import(w);//${Math.random()}`);
    }
    catch (e) {
        // this shim is specifically for browsers that do support "esm" imports
        // however, they do NOT support "dynamic" imports
        // basically this code is for old Edge, v18 and below
        const moduleMap = new Map();
        win[importFunctionName] = (src) => {
            const url = new URL(src, base).href;
            let mod = moduleMap.get(url);
            if (!mod) {
                const script = doc.createElement('script');
                script.type = 'module';
                script.crossOrigin = orgScriptElm.crossOrigin;
                script.src = URL.createObjectURL(new Blob([`import * as m from '${url}'; window.${importFunctionName}.m = m;`], {
                    type: 'application/javascript',
                }));
                mod = new Promise((resolve) => {
                    script.onload = () => {
                        resolve(win[importFunctionName].m);
                        script.remove();
                    };
                });
                moduleMap.set(url, mod);
                doc.head.appendChild(script);
            }
            return mod;
        };
    }
};
const patchCloneNodeFix = (HTMLElementPrototype) => {
    const nativeCloneNodeFn = HTMLElementPrototype.cloneNode;
    HTMLElementPrototype.cloneNode = function (deep) {
        if (this.nodeName === 'TEMPLATE') {
            return nativeCloneNodeFn.call(this, deep);
        }
        const clonedNode = nativeCloneNodeFn.call(this, false);
        const srcChildNodes = this.childNodes;
        if (deep) {
            for (let i = 0; i < srcChildNodes.length; i++) {
                // Node.ATTRIBUTE_NODE === 2, and checking because IE11
                if (srcChildNodes[i].nodeType !== 2) {
                    clonedNode.appendChild(srcChildNodes[i].cloneNode(true));
                }
            }
        }
        return clonedNode;
    };
};

patchBrowser().then(options => {
  globalScripts();
  return bootstrapLazy([["app-root",[[0,"app-root"]]],["mod-affressource",[[0,"mod-affressource",{"match":[8],"history":[16],"idRessource":[32],"afficherRessources":[32],"commenttext":[32],"message":[32]}]]],["publiq-affressource",[[0,"publiq-affressource",{"match":[8],"history":[16],"connected":[4],"afficherRessources":[32],"commenttext":[32],"message":[32]}]]],["user-affressource",[[0,"user-affressource",{"match":[8],"history":[16],"idRessource":[32],"afficherRessources":[32],"commenttext":[32],"message":[32]}]]],["app-home",[[0,"app-home",{"history":[16]}]]],["context-consumer",[[0,"context-consumer",{"context":[16],"renderer":[16],"subscribe":[16],"unsubscribe":[32]}]]],["mod-monespace",[[0,"mod-monespace",{"history":[16],"modRessource":[32],"modComment":[32],"modsignale":[32],"message":[32],"ressourceId":[32],"ressourceIdsignale":[32],"etatRE":[32]}]]],["public-not-found",[[0,"public-not-found"]]],["publiq-footer",[[0,"publiq-footer"]]],["publiq-ressource-tags",[[0,"publiq-ressource-tags",{"match":[8],"history":[16],"mesRessources":[32],"message":[32]}]]],["stencil-async-content",[[0,"stencil-async-content",{"documentLocation":[1,"document-location"],"content":[32]}]]],["stencil-route-title",[[0,"stencil-route-title",{"titleSuffix":[1,"title-suffix"],"pageTitle":[1,"page-title"]}]]],["stencil-router-prompt",[[0,"stencil-router-prompt",{"when":[4],"message":[1],"history":[16],"unblock":[32]}]]],["stencil-router-redirect",[[0,"stencil-router-redirect",{"history":[16],"root":[1],"url":[1]}]]],["user-connexion",[[0,"user-connexion",{"history":[16],"match":[8],"messageExt":[1,"message-ext"],"email":[32],"password":[32],"reponseServer":[32],"user":[32],"habilitation":[32],"messageErr":[32]}]]],["user-creationressource",[[0,"user-creationressource",{"history":[16],"formNewRessource":[32],"file":[32],"titre":[32],"resume":[32],"tags":[32],"response":[32]}]]],["user-favoris",[[0,"user-favoris",{"history":[16],"utilidateurfavoris":[32],"favorisressource":[32],"message":[32]}]]],["user-inscription",[[0,"user-inscription",{"history":[16],"nom":[32],"prenom":[32],"email":[32],"ville":[32],"profession":[32],"password":[32],"confirmPassword":[32],"reponseServer":[32]}]]],["user-inscription-valid",[[0,"user-inscription-valid",{"history":[16]}]]],["user-modifierprofil",[[0,"user-modifierprofil",{"history":[16],"profil":[32],"message":[32],"ville":[32],"profession":[32]}]]],["user-modifierressource",[[0,"user-modifierressource",{"match":[8],"history":[16],"modifierRessource":[32],"mesressource":[32],"message":[32],"type":[32],"titre":[32],"resume":[32]}]]],["user-monespace",[[0,"user-monespace",{"history":[16],"mesRessources":[32],"message":[32],"nbrVue":[32]}]]],["user-profil",[[0,"user-profil",{"history":[16],"profilRessources":[32],"profil":[32],"message":[32]}]]],["usersuivi-profile",[[0,"usersuivi-profile",{"match":[8],"history":[16],"profilRessources":[32],"profil":[32],"message":[32]}]]],["publiq-nav",[[0,"publiq-nav",{"history":[16],"test":[1],"connected":[4]}]]],["stencil-route",[[0,"stencil-route",{"group":[513],"componentUpdated":[16],"match":[1040],"url":[1],"component":[1],"componentProps":[16],"exact":[4],"routeRender":[16],"scrollTopOffset":[2,"scroll-top-offset"],"routeViewsUpdated":[16],"location":[16],"history":[16],"historyType":[1,"history-type"]}]]],["stencil-route-switch",[[4,"stencil-route-switch",{"group":[513],"scrollTopOffset":[2,"scroll-top-offset"],"location":[16],"routeViewsUpdated":[16]}]]],["stencil-router",[[4,"stencil-router",{"root":[1],"historyType":[1,"history-type"],"titleSuffix":[1,"title-suffix"],"scrollTopOffset":[2,"scroll-top-offset"],"location":[32],"history":[32]}]]],["connexion-nav",[[0,"connexion-nav",{"habilitation":[1]}]]],["hive-pdf-viewer",[[1,"hive-pdf-viewer",{"src":[1],"page":[2],"enableToolbar":[4,"enable-toolbar"],"disableScrolling":[4,"disable-scrolling"],"enableSideDrawer":[4,"enable-side-drawer"],"enableSearch":[4,"enable-search"],"scale":[8],"iframeLoaded":[32],"print":[64],"setScale":[64]}]]],["stencil-route-link",[[4,"stencil-route-link",{"url":[1],"urlMatch":[1,"url-match"],"activeClass":[1,"active-class"],"exact":[4],"strict":[4],"custom":[1],"anchorClass":[1,"anchor-class"],"anchorRole":[1,"anchor-role"],"anchorTitle":[1,"anchor-title"],"anchorTabIndex":[1,"anchor-tab-index"],"anchorId":[1,"anchor-id"],"history":[16],"location":[16],"root":[1],"ariaHaspopup":[1,"aria-haspopup"],"ariaPosinset":[1,"aria-posinset"],"ariaSetsize":[2,"aria-setsize"],"ariaLabel":[1,"aria-label"],"match":[32]}]]]], options);
});
