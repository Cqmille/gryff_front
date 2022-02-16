import { r as registerInstance, f as createEvent, i as getAssetPath, h, g as getElement } from './index-f1e2a249.js';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, basedir, module) {
	return module = {
		path: basedir,
		exports: {},
		require: function (path, base) {
			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
		}
	}, fn(module, module.exports), module.exports;
}

function getDefaultExportFromNamespaceIfPresent (n) {
	return n && Object.prototype.hasOwnProperty.call(n, 'default') ? n['default'] : n;
}

function getDefaultExportFromNamespaceIfNotNamed (n) {
	return n && Object.prototype.hasOwnProperty.call(n, 'default') && Object.keys(n).length === 1 ? n['default'] : n;
}

function getAugmentedNamespace(n) {
	if (n.__esModule) return n;
	var a = Object.defineProperty({}, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var screenfull = createCommonjsModule(function (module) {
/*!
* screenfull
* v5.2.0 - 2021-11-03
* (c) Sindre Sorhus; MIT License
*/
(function () {
	'use strict';

	var document = typeof window !== 'undefined' && typeof window.document !== 'undefined' ? window.document : {};
	var isCommonjs = 'object' !== 'undefined' && module.exports;

	var fn = (function () {
		var val;

		var fnMap = [
			[
				'requestFullscreen',
				'exitFullscreen',
				'fullscreenElement',
				'fullscreenEnabled',
				'fullscreenchange',
				'fullscreenerror'
			],
			// New WebKit
			[
				'webkitRequestFullscreen',
				'webkitExitFullscreen',
				'webkitFullscreenElement',
				'webkitFullscreenEnabled',
				'webkitfullscreenchange',
				'webkitfullscreenerror'

			],
			// Old WebKit
			[
				'webkitRequestFullScreen',
				'webkitCancelFullScreen',
				'webkitCurrentFullScreenElement',
				'webkitCancelFullScreen',
				'webkitfullscreenchange',
				'webkitfullscreenerror'

			],
			[
				'mozRequestFullScreen',
				'mozCancelFullScreen',
				'mozFullScreenElement',
				'mozFullScreenEnabled',
				'mozfullscreenchange',
				'mozfullscreenerror'
			],
			[
				'msRequestFullscreen',
				'msExitFullscreen',
				'msFullscreenElement',
				'msFullscreenEnabled',
				'MSFullscreenChange',
				'MSFullscreenError'
			]
		];

		var i = 0;
		var l = fnMap.length;
		var ret = {};

		for (; i < l; i++) {
			val = fnMap[i];
			if (val && val[1] in document) {
				for (i = 0; i < val.length; i++) {
					ret[fnMap[0][i]] = val[i];
				}
				return ret;
			}
		}

		return false;
	})();

	var eventNameMap = {
		change: fn.fullscreenchange,
		error: fn.fullscreenerror
	};

	var screenfull = {
		request: function (element, options) {
			return new Promise(function (resolve, reject) {
				var onFullScreenEntered = function () {
					this.off('change', onFullScreenEntered);
					resolve();
				}.bind(this);

				this.on('change', onFullScreenEntered);

				element = element || document.documentElement;

				var returnPromise = element[fn.requestFullscreen](options);

				if (returnPromise instanceof Promise) {
					returnPromise.then(onFullScreenEntered).catch(reject);
				}
			}.bind(this));
		},
		exit: function () {
			return new Promise(function (resolve, reject) {
				if (!this.isFullscreen) {
					resolve();
					return;
				}

				var onFullScreenExit = function () {
					this.off('change', onFullScreenExit);
					resolve();
				}.bind(this);

				this.on('change', onFullScreenExit);

				var returnPromise = document[fn.exitFullscreen]();

				if (returnPromise instanceof Promise) {
					returnPromise.then(onFullScreenExit).catch(reject);
				}
			}.bind(this));
		},
		toggle: function (element, options) {
			return this.isFullscreen ? this.exit() : this.request(element, options);
		},
		onchange: function (callback) {
			this.on('change', callback);
		},
		onerror: function (callback) {
			this.on('error', callback);
		},
		on: function (event, callback) {
			var eventName = eventNameMap[event];
			if (eventName) {
				document.addEventListener(eventName, callback, false);
			}
		},
		off: function (event, callback) {
			var eventName = eventNameMap[event];
			if (eventName) {
				document.removeEventListener(eventName, callback, false);
			}
		},
		raw: fn
	};

	if (!fn) {
		if (isCommonjs) {
			module.exports = {isEnabled: false};
		} else {
			window.screenfull = {isEnabled: false};
		}

		return;
	}

	Object.defineProperties(screenfull, {
		isFullscreen: {
			get: function () {
				return Boolean(document[fn.fullscreenElement]);
			}
		},
		element: {
			enumerable: true,
			get: function () {
				return document[fn.fullscreenElement];
			}
		},
		isEnabled: {
			enumerable: true,
			get: function () {
				// Coerce to boolean in case of old WebKit
				return Boolean(document[fn.fullscreenEnabled]);
			}
		}
	});

	if (isCommonjs) {
		module.exports = screenfull;
	} else {
		window.screenfull = screenfull;
	}
})();
});

const pdfViewerCss = ":host{display:block;height:100%;width:100%;--pdf-viewer-top-offset:0px;--pdf-viewer-bottom-offset:0px}iframe{display:block;width:100%;height:100%;border:none;visibility:hidden}iframe.loaded{visibility:visible}";

let PdfViewer = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.pageChange = createEvent(this, "pageChange", 7);
    this.linkClick = createEvent(this, "linkClick", 7);
    this.enableToolbar = true;
    this.disableScrolling = false;
    this.enableSideDrawer = true;
    this.enableSearch = true;
  }
  updateToolbarVisibility() {
    if (this.toolbarEl) {
      if (this.enableToolbar) {
        this.toolbarEl.classList.remove("hidden");
        this.iframeEl.contentDocument.documentElement.style.setProperty("--toolbar-height", "");
      }
      else {
        this.toolbarEl.classList.add("hidden");
        this.iframeEl.contentDocument.documentElement.style.setProperty("--toolbar-height", "0px");
      }
    }
  }
  updateScrolling() {
    if (this.viewerContainer) {
      if (this.disableScrolling) {
        this.viewerContainer.style.pointerEvents = "none";
        this.viewerContainer.style["WebkitOverflowScrolling"] = "auto";
      }
      else {
        this.viewerContainer.style.pointerEvents = "";
        this.viewerContainer.style["WebkitOverflowScrolling"] = "";
      }
    }
  }
  updateSideDrawerVisibility() {
    if (this.sidebarToggleEl) {
      if (this.enableSideDrawer) {
        this.sidebarToggleEl.classList.remove("hidden");
      }
      else {
        this.sidebarToggleEl.classList.add("hidden");
      }
    }
  }
  updateSearchVisibility() {
    if (this.searchToggleEl) {
      if (this.enableSearch) {
        this.searchToggleEl.classList.remove("hidden");
      }
      else {
        this.searchToggleEl.classList.add("hidden");
      }
    }
  }
  print() {
    return new Promise((resolve) => {
      this.iframeEl.contentWindow.print();
      this.iframeEl
        .contentWindow.PDFViewerApplication.eventBus.on("afterprint", () => {
        resolve();
      }, { once: true });
    });
  }
  updateScale() {
    this.setScale(this.scale);
  }
  async setScale(scale) {
    const contentWindow = this.iframeEl.contentWindow;
    if (contentWindow && contentWindow.PDFViewerApplication) {
      const { pdfViewer } = this.iframeEl
        .contentWindow.PDFViewerApplication;
      pdfViewer.currentScaleValue = scale;
    }
  }
  get viewerSrc() {
    if (this.page) {
      return `${getAssetPath("./pdf-viewer-assets/viewer/web/viewer.html")}?file=${encodeURIComponent(this.src)}#page=${this.page}`;
    }
    return `${getAssetPath("./pdf-viewer-assets/viewer/web/viewer.html")}?file=${encodeURIComponent(this.src)}`;
  }
  componentDidLoad() {
    this.iframeEl.onload = () => {
      this.setCSSVariables();
      this.initButtonVisibility();
      this.addEventListeners();
      this.iframeLoaded = true;
      this.PDFViewerApplication = this.iframeEl.contentWindow.PDFViewerApplication;
    };
  }
  disconnectedCallback() {
    // https://github.com/mozilla/pdf.js/issues/11297
    this.PDFViewerApplication.pdfViewer._pages.forEach(page => page.reset());
  }
  setCSSVariables() {
    for (let i = 0; i < PdfViewer.CSSVariables.length; i++) {
      const value = getComputedStyle(this.element).getPropertyValue(PdfViewer.CSSVariables[i]);
      this.iframeEl.contentDocument.documentElement.style.setProperty(PdfViewer.CSSVariables[i], value);
    }
  }
  initButtonVisibility() {
    this.toolbarEl = this.iframeEl.contentDocument.body.querySelector("#toolbarContainer");
    this.sidebarToggleEl = this.iframeEl.contentDocument.body.querySelector("#sidebarToggle");
    this.searchToggleEl = this.iframeEl.contentDocument.body.querySelector("#viewFind");
    this.updateToolbarVisibility();
    this.updateSideDrawerVisibility();
    this.updateSearchVisibility();
  }
  addEventListeners() {
    this.viewerContainer = this.iframeEl.contentDocument.body.querySelector("#viewerContainer");
    const frameWindow = this.iframeEl.contentWindow;
    const pdfViewer = frameWindow.PDFViewerApplication;
    pdfViewer.initializedPromise.then(() => {
      pdfViewer.eventBus.on("pagechanging", this.handlePageChange.bind(this));
      // when the documents within the pdf viewer finish loading
      pdfViewer.eventBus.on("pagesloaded", () => {
        if (this.scale) {
          this.setScale(this.scale);
        }
      });
    });
    this.viewerContainer.addEventListener("click", this.handleLinkClick.bind(this));
    this.updateScrolling();
    const fullscreenBtn = this.iframeEl.contentDocument.documentElement.querySelector("#fullscreen");
    if (screenfull.isEnabled) {
      screenfull.on("change", () => {
        if (screenfull.isEnabled) {
          const collapseIcon = fullscreenBtn.querySelector("#collapseIcon");
          const fullscreenIcon = fullscreenBtn.querySelector("#fullscreenIcon");
          if (screenfull.isFullscreen) {
            collapseIcon.classList.remove("hidden");
            fullscreenIcon.classList.add("hidden");
          }
          else {
            fullscreenIcon.classList.remove("hidden");
            collapseIcon.classList.add("hidden");
          }
        }
      });
    }
    else {
      fullscreenBtn.classList.add("hidden");
    }
    fullscreenBtn.addEventListener("click", () => {
      if (screenfull.isEnabled) {
        screenfull.toggle(this.iframeEl.contentDocument.documentElement);
      }
    });
  }
  handlePageChange(e) {
    this.pageChange.emit(e.pageNumber);
  }
  handleLinkClick(e) {
    e.preventDefault();
    const link = e.target.tagName === "A" ? e.target : e.target.closest(".linkAnnotation > a");
    if (link) {
      // Ignore internal links to the same document
      if (link.classList.contains("internalLink")) {
        return;
      }
      const href = link.href || "";
      this.linkClick.emit(href);
    }
  }
  render() {
    return (h("iframe", { class: {
        loaded: this.iframeLoaded,
      }, ref: (el) => (this.iframeEl = el), src: this.viewerSrc }));
  }
  static get assetsDirs() { return ["pdf-viewer-assets"]; }
  get element() { return getElement(this); }
  static get watchers() { return {
    "enableToolbar": ["updateToolbarVisibility"],
    "disableScrolling": ["updateScrolling"],
    "enableSideDrawer": ["updateSideDrawerVisibility"],
    "enableSearch": ["updateSearchVisibility"],
    "scale": ["updateScale"]
  }; }
};
PdfViewer.CSSVariables = [
  "--pdf-viewer-top-offset",
  "--pdf-viewer-bottom-offset",
  "--background-color",
  "--toolbar-background-color",
  "--border-color",
  "--icon-color",
  "--accent-color",
  "--page-border-radius",
  "--page-box-shadow",
  "--page-margin",
  "--floating-buttons-offset",
];
PdfViewer.style = pdfViewerCss;

export { PdfViewer as hive_pdf_viewer };
