if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global2 = uni.requireGlobal();
  ArrayBuffer = global2.ArrayBuffer;
  Int8Array = global2.Int8Array;
  Uint8Array = global2.Uint8Array;
  Uint8ClampedArray = global2.Uint8ClampedArray;
  Int16Array = global2.Int16Array;
  Uint16Array = global2.Uint16Array;
  Int32Array = global2.Int32Array;
  Uint32Array = global2.Uint32Array;
  Float32Array = global2.Float32Array;
  Float64Array = global2.Float64Array;
  BigInt64Array = global2.BigInt64Array;
  BigUint64Array = global2.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue, shared) {
  "use strict";
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$R = {
    name: "UniGridItem",
    inject: ["grid"],
    props: {
      index: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        column: 0,
        showBorder: true,
        square: true,
        highlight: true,
        left: 0,
        top: 0,
        openNum: 2,
        width: 0,
        borderColor: "#e5e5e5"
      };
    },
    created() {
      this.column = this.grid.column;
      this.showBorder = this.grid.showBorder;
      this.square = this.grid.square;
      this.highlight = this.grid.highlight;
      this.top = this.hor === 0 ? this.grid.hor : this.hor;
      this.left = this.ver === 0 ? this.grid.ver : this.ver;
      this.borderColor = this.grid.borderColor;
      this.grid.children.push(this);
      this.width = this.grid.width;
    },
    beforeDestroy() {
      this.grid.children.forEach((item, index) => {
        if (item === this) {
          this.grid.children.splice(index, 1);
        }
      });
    },
    methods: {
      _onClick() {
        this.grid.change({
          detail: {
            index: this.index
          }
        });
      }
    }
  };
  function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
    return $data.width ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        style: vue.normalizeStyle("width:" + $data.width + ";" + ($data.square ? "height:" + $data.width : "")),
        class: "uni-grid-item"
      },
      [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass([{ "uni-grid-item--border": $data.showBorder, "uni-grid-item--border-top": $data.showBorder && $props.index < $data.column, "uni-highlight": $data.highlight }, "uni-grid-item__box"]),
            style: vue.normalizeStyle({ "border-right-color": $data.borderColor, "border-bottom-color": $data.borderColor, "border-top-color": $data.borderColor }),
            onClick: _cache[0] || (_cache[0] = (...args) => $options._onClick && $options._onClick(...args))
          },
          [
            vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ],
          6
          /* CLASS, STYLE */
        )
      ],
      4
      /* STYLE */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_0$6 = /* @__PURE__ */ _export_sfc(_sfc_main$R, [["render", _sfc_render$d], ["__scopeId", "data-v-25caaff7"], ["__file", "C:/easyjob/easyjob-front/easyjob-app/node_modules/@dcloudio/uni-ui/lib/uni-grid-item/uni-grid-item.vue"]]);
  const ON_SHOW = "onShow";
  const ON_LAUNCH = "onLaunch";
  const ON_LOAD = "onLoad";
  const ON_REACH_BOTTOM = "onReachBottom";
  const ON_PULL_DOWN_REFRESH = "onPullDownRefresh";
  function resolveEasycom(component, easycom2) {
    return shared.isString(component) ? easycom2 : component;
  }
  const createHook = (lifecycle) => (hook, target = vue.getCurrentInstance()) => {
    !vue.isInSSRComponentSetup && vue.injectHook(lifecycle, hook, target);
  };
  const onShow = /* @__PURE__ */ createHook(ON_SHOW);
  const onLaunch = /* @__PURE__ */ createHook(ON_LAUNCH);
  const onLoad = /* @__PURE__ */ createHook(ON_LOAD);
  const onReachBottom = /* @__PURE__ */ createHook(ON_REACH_BOTTOM);
  const onPullDownRefresh = /* @__PURE__ */ createHook(ON_PULL_DOWN_REFRESH);
  const _sfc_main$Q = {
    name: "UniGrid",
    emits: ["change"],
    props: {
      // 每列显示个数
      column: {
        type: Number,
        default: 3
      },
      // 是否显示边框
      showBorder: {
        type: Boolean,
        default: true
      },
      // 边框颜色
      borderColor: {
        type: String,
        default: "#D2D2D2"
      },
      // 是否正方形显示,默认为 true
      square: {
        type: Boolean,
        default: true
      },
      highlight: {
        type: Boolean,
        default: true
      }
    },
    provide() {
      return {
        grid: this
      };
    },
    data() {
      const elId = `Uni_${Math.ceil(Math.random() * 1e6).toString(36)}`;
      return {
        elId,
        width: 0
      };
    },
    created() {
      this.children = [];
    },
    mounted() {
      this.$nextTick(() => {
        this.init();
      });
    },
    methods: {
      init() {
        setTimeout(() => {
          this._getSize((width) => {
            this.children.forEach((item, index) => {
              item.width = width;
            });
          });
        }, 50);
      },
      change(e) {
        this.$emit("change", e);
      },
      _getSize(fn) {
        uni.createSelectorQuery().in(this).select(`#${this.elId}`).boundingClientRect().exec((ret) => {
          this.width = parseInt((ret[0].width - 1) / this.column) + "px";
          fn(this.width);
        });
      }
    }
  };
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-grid-wrap" }, [
      vue.createElementVNode("view", {
        id: $data.elId,
        ref: "uni-grid",
        class: vue.normalizeClass(["uni-grid", { "uni-grid--border": $props.showBorder }]),
        style: vue.normalizeStyle({ "border-left-color": $props.borderColor })
      }, [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ], 14, ["id"])
    ]);
  }
  const __easycom_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$Q, [["render", _sfc_render$c], ["__scopeId", "data-v-c73220d0"], ["__file", "C:/easyjob/easyjob-front/easyjob-app/node_modules/@dcloudio/uni-ui/lib/uni-grid/uni-grid.vue"]]);
  const _imports_0 = "/static/update_bg.png";
  var isVue2 = false;
  function set(target, key, val) {
    if (Array.isArray(target)) {
      target.length = Math.max(target.length, key);
      target.splice(key, 1, val);
      return val;
    }
    target[key] = val;
    return val;
  }
  function del(target, key) {
    if (Array.isArray(target)) {
      target.splice(key, 1);
      return;
    }
    delete target[key];
  }
  function getDevtoolsGlobalHook() {
    return getTarget().__VUE_DEVTOOLS_GLOBAL_HOOK__;
  }
  function getTarget() {
    return typeof navigator !== "undefined" && typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : {};
  }
  const isProxyAvailable = typeof Proxy === "function";
  const HOOK_SETUP = "devtools-plugin:setup";
  const HOOK_PLUGIN_SETTINGS_SET = "plugin:settings:set";
  let supported;
  let perf;
  function isPerformanceSupported() {
    var _a;
    if (supported !== void 0) {
      return supported;
    }
    if (typeof window !== "undefined" && window.performance) {
      supported = true;
      perf = window.performance;
    } else if (typeof globalThis !== "undefined" && ((_a = globalThis.perf_hooks) === null || _a === void 0 ? void 0 : _a.performance)) {
      supported = true;
      perf = globalThis.perf_hooks.performance;
    } else {
      supported = false;
    }
    return supported;
  }
  function now() {
    return isPerformanceSupported() ? perf.now() : Date.now();
  }
  class ApiProxy {
    constructor(plugin, hook) {
      this.target = null;
      this.targetQueue = [];
      this.onQueue = [];
      this.plugin = plugin;
      this.hook = hook;
      const defaultSettings = {};
      if (plugin.settings) {
        for (const id in plugin.settings) {
          const item = plugin.settings[id];
          defaultSettings[id] = item.defaultValue;
        }
      }
      const localSettingsSaveId = `__vue-devtools-plugin-settings__${plugin.id}`;
      let currentSettings = Object.assign({}, defaultSettings);
      try {
        const raw = localStorage.getItem(localSettingsSaveId);
        const data = JSON.parse(raw);
        Object.assign(currentSettings, data);
      } catch (e) {
      }
      this.fallbacks = {
        getSettings() {
          return currentSettings;
        },
        setSettings(value) {
          try {
            localStorage.setItem(localSettingsSaveId, JSON.stringify(value));
          } catch (e) {
          }
          currentSettings = value;
        },
        now() {
          return now();
        }
      };
      if (hook) {
        hook.on(HOOK_PLUGIN_SETTINGS_SET, (pluginId, value) => {
          if (pluginId === this.plugin.id) {
            this.fallbacks.setSettings(value);
          }
        });
      }
      this.proxiedOn = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target.on[prop];
          } else {
            return (...args) => {
              this.onQueue.push({
                method: prop,
                args
              });
            };
          }
        }
      });
      this.proxiedTarget = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target[prop];
          } else if (prop === "on") {
            return this.proxiedOn;
          } else if (Object.keys(this.fallbacks).includes(prop)) {
            return (...args) => {
              this.targetQueue.push({
                method: prop,
                args,
                resolve: () => {
                }
              });
              return this.fallbacks[prop](...args);
            };
          } else {
            return (...args) => {
              return new Promise((resolve) => {
                this.targetQueue.push({
                  method: prop,
                  args,
                  resolve
                });
              });
            };
          }
        }
      });
    }
    async setRealTarget(target) {
      this.target = target;
      for (const item of this.onQueue) {
        this.target.on[item.method](...item.args);
      }
      for (const item of this.targetQueue) {
        item.resolve(await this.target[item.method](...item.args));
      }
    }
  }
  function setupDevtoolsPlugin(pluginDescriptor, setupFn) {
    const descriptor = pluginDescriptor;
    const target = getTarget();
    const hook = getDevtoolsGlobalHook();
    const enableProxy = isProxyAvailable && descriptor.enableEarlyProxy;
    if (hook && (target.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !enableProxy)) {
      hook.emit(HOOK_SETUP, pluginDescriptor, setupFn);
    } else {
      const proxy = enableProxy ? new ApiProxy(descriptor, hook) : null;
      const list = target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [];
      list.push({
        pluginDescriptor: descriptor,
        setupFn,
        proxy
      });
      if (proxy) {
        setupFn(proxy.proxiedTarget);
      }
    }
  }
  /*!
    * pinia v2.0.36
    * (c) 2023 Eduardo San Martin Morote
    * @license MIT
    */
  let activePinia;
  const setActivePinia = (pinia) => activePinia = pinia;
  const piniaSymbol = Symbol("pinia");
  function isPlainObject(o2) {
    return o2 && typeof o2 === "object" && Object.prototype.toString.call(o2) === "[object Object]" && typeof o2.toJSON !== "function";
  }
  var MutationType;
  (function(MutationType2) {
    MutationType2["direct"] = "direct";
    MutationType2["patchObject"] = "patch object";
    MutationType2["patchFunction"] = "patch function";
  })(MutationType || (MutationType = {}));
  const IS_CLIENT = typeof window !== "undefined";
  const USE_DEVTOOLS = IS_CLIENT;
  const _global = /* @__PURE__ */ (() => typeof window === "object" && window.window === window ? window : typeof self === "object" && self.self === self ? self : typeof global === "object" && global.global === global ? global : typeof globalThis === "object" ? globalThis : { HTMLElement: null })();
  function bom(blob, { autoBom = false } = {}) {
    if (autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
      return new Blob([String.fromCharCode(65279), blob], { type: blob.type });
    }
    return blob;
  }
  function download(url, name, opts) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.onload = function() {
      saveAs(xhr.response, name, opts);
    };
    xhr.onerror = function() {
      console.error("could not download file");
    };
    xhr.send();
  }
  function corsEnabled(url) {
    const xhr = new XMLHttpRequest();
    xhr.open("HEAD", url, false);
    try {
      xhr.send();
    } catch (e) {
    }
    return xhr.status >= 200 && xhr.status <= 299;
  }
  function click(node2) {
    try {
      node2.dispatchEvent(new MouseEvent("click"));
    } catch (e) {
      const evt = document.createEvent("MouseEvents");
      evt.initMouseEvent("click", true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null);
      node2.dispatchEvent(evt);
    }
  }
  const _navigator = typeof navigator === "object" ? navigator : { userAgent: "" };
  const isMacOSWebView = /* @__PURE__ */ (() => /Macintosh/.test(_navigator.userAgent) && /AppleWebKit/.test(_navigator.userAgent) && !/Safari/.test(_navigator.userAgent))();
  const saveAs = !IS_CLIENT ? () => {
  } : (
    // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
    typeof HTMLAnchorElement !== "undefined" && "download" in HTMLAnchorElement.prototype && !isMacOSWebView ? downloadSaveAs : (
      // Use msSaveOrOpenBlob as a second approach
      "msSaveOrOpenBlob" in _navigator ? msSaveAs : (
        // Fallback to using FileReader and a popup
        fileSaverSaveAs
      )
    )
  );
  function downloadSaveAs(blob, name = "download", opts) {
    const a2 = document.createElement("a");
    a2.download = name;
    a2.rel = "noopener";
    if (typeof blob === "string") {
      a2.href = blob;
      if (a2.origin !== location.origin) {
        if (corsEnabled(a2.href)) {
          download(blob, name, opts);
        } else {
          a2.target = "_blank";
          click(a2);
        }
      } else {
        click(a2);
      }
    } else {
      a2.href = URL.createObjectURL(blob);
      setTimeout(function() {
        URL.revokeObjectURL(a2.href);
      }, 4e4);
      setTimeout(function() {
        click(a2);
      }, 0);
    }
  }
  function msSaveAs(blob, name = "download", opts) {
    if (typeof blob === "string") {
      if (corsEnabled(blob)) {
        download(blob, name, opts);
      } else {
        const a2 = document.createElement("a");
        a2.href = blob;
        a2.target = "_blank";
        setTimeout(function() {
          click(a2);
        });
      }
    } else {
      navigator.msSaveOrOpenBlob(bom(blob, opts), name);
    }
  }
  function fileSaverSaveAs(blob, name, opts, popup) {
    popup = popup || open("", "_blank");
    if (popup) {
      popup.document.title = popup.document.body.innerText = "downloading...";
    }
    if (typeof blob === "string")
      return download(blob, name, opts);
    const force = blob.type === "application/octet-stream";
    const isSafari = /constructor/i.test(String(_global.HTMLElement)) || "safari" in _global;
    const isChromeIOS = /CriOS\/[\d]+/.test(navigator.userAgent);
    if ((isChromeIOS || force && isSafari || isMacOSWebView) && typeof FileReader !== "undefined") {
      const reader = new FileReader();
      reader.onloadend = function() {
        let url = reader.result;
        if (typeof url !== "string") {
          popup = null;
          throw new Error("Wrong reader.result type");
        }
        url = isChromeIOS ? url : url.replace(/^data:[^;]*;/, "data:attachment/file;");
        if (popup) {
          popup.location.href = url;
        } else {
          location.assign(url);
        }
        popup = null;
      };
      reader.readAsDataURL(blob);
    } else {
      const url = URL.createObjectURL(blob);
      if (popup)
        popup.location.assign(url);
      else
        location.href = url;
      popup = null;
      setTimeout(function() {
        URL.revokeObjectURL(url);
      }, 4e4);
    }
  }
  function toastMessage(message2, type) {
    const piniaMessage = "🍍 " + message2;
    if (typeof __VUE_DEVTOOLS_TOAST__ === "function") {
      __VUE_DEVTOOLS_TOAST__(piniaMessage, type);
    } else if (type === "error") {
      console.error(piniaMessage);
    } else if (type === "warn") {
      console.warn(piniaMessage);
    } else {
      console.log(piniaMessage);
    }
  }
  function isPinia(o2) {
    return "_a" in o2 && "install" in o2;
  }
  function checkClipboardAccess() {
    if (!("clipboard" in navigator)) {
      toastMessage(`Your browser doesn't support the Clipboard API`, "error");
      return true;
    }
  }
  function checkNotFocusedError(error) {
    if (error instanceof Error && error.message.toLowerCase().includes("document is not focused")) {
      toastMessage('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn");
      return true;
    }
    return false;
  }
  async function actionGlobalCopyState(pinia) {
    if (checkClipboardAccess())
      return;
    try {
      await navigator.clipboard.writeText(JSON.stringify(pinia.state.value));
      toastMessage("Global state copied to clipboard.");
    } catch (error) {
      if (checkNotFocusedError(error))
        return;
      toastMessage(`Failed to serialize the state. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  async function actionGlobalPasteState(pinia) {
    if (checkClipboardAccess())
      return;
    try {
      pinia.state.value = JSON.parse(await navigator.clipboard.readText());
      toastMessage("Global state pasted from clipboard.");
    } catch (error) {
      if (checkNotFocusedError(error))
        return;
      toastMessage(`Failed to deserialize the state from clipboard. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  async function actionGlobalSaveState(pinia) {
    try {
      saveAs(new Blob([JSON.stringify(pinia.state.value)], {
        type: "text/plain;charset=utf-8"
      }), "pinia-state.json");
    } catch (error) {
      toastMessage(`Failed to export the state as JSON. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  let fileInput;
  function getFileOpener() {
    if (!fileInput) {
      fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = ".json";
    }
    function openFile() {
      return new Promise((resolve, reject) => {
        fileInput.onchange = async () => {
          const files = fileInput.files;
          if (!files)
            return resolve(null);
          const file = files.item(0);
          if (!file)
            return resolve(null);
          return resolve({ text: await file.text(), file });
        };
        fileInput.oncancel = () => resolve(null);
        fileInput.onerror = reject;
        fileInput.click();
      });
    }
    return openFile;
  }
  async function actionGlobalOpenStateFile(pinia) {
    try {
      const open2 = await getFileOpener();
      const result = await open2();
      if (!result)
        return;
      const { text, file } = result;
      pinia.state.value = JSON.parse(text);
      toastMessage(`Global state imported from "${file.name}".`);
    } catch (error) {
      toastMessage(`Failed to export the state as JSON. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  function formatDisplay(display) {
    return {
      _custom: {
        display
      }
    };
  }
  const PINIA_ROOT_LABEL = "🍍 Pinia (root)";
  const PINIA_ROOT_ID = "_root";
  function formatStoreForInspectorTree(store) {
    return isPinia(store) ? {
      id: PINIA_ROOT_ID,
      label: PINIA_ROOT_LABEL
    } : {
      id: store.$id,
      label: store.$id
    };
  }
  function formatStoreForInspectorState(store) {
    if (isPinia(store)) {
      const storeNames = Array.from(store._s.keys());
      const storeMap = store._s;
      const state2 = {
        state: storeNames.map((storeId) => ({
          editable: true,
          key: storeId,
          value: store.state.value[storeId]
        })),
        getters: storeNames.filter((id) => storeMap.get(id)._getters).map((id) => {
          const store2 = storeMap.get(id);
          return {
            editable: false,
            key: id,
            value: store2._getters.reduce((getters, key) => {
              getters[key] = store2[key];
              return getters;
            }, {})
          };
        })
      };
      return state2;
    }
    const state = {
      state: Object.keys(store.$state).map((key) => ({
        editable: true,
        key,
        value: store.$state[key]
      }))
    };
    if (store._getters && store._getters.length) {
      state.getters = store._getters.map((getterName) => ({
        editable: false,
        key: getterName,
        value: store[getterName]
      }));
    }
    if (store._customProperties.size) {
      state.customProperties = Array.from(store._customProperties).map((key) => ({
        editable: true,
        key,
        value: store[key]
      }));
    }
    return state;
  }
  function formatEventData(events) {
    if (!events)
      return {};
    if (Array.isArray(events)) {
      return events.reduce((data, event) => {
        data.keys.push(event.key);
        data.operations.push(event.type);
        data.oldValue[event.key] = event.oldValue;
        data.newValue[event.key] = event.newValue;
        return data;
      }, {
        oldValue: {},
        keys: [],
        operations: [],
        newValue: {}
      });
    } else {
      return {
        operation: formatDisplay(events.type),
        key: formatDisplay(events.key),
        oldValue: events.oldValue,
        newValue: events.newValue
      };
    }
  }
  function formatMutationType(type) {
    switch (type) {
      case MutationType.direct:
        return "mutation";
      case MutationType.patchFunction:
        return "$patch";
      case MutationType.patchObject:
        return "$patch";
      default:
        return "unknown";
    }
  }
  let isTimelineActive = true;
  const componentStateTypes = [];
  const MUTATIONS_LAYER_ID = "pinia:mutations";
  const INSPECTOR_ID = "pinia";
  const { assign: assign$1 } = Object;
  const getStoreType = (id) => "🍍 " + id;
  function registerPiniaDevtools(app, pinia) {
    setupDevtoolsPlugin({
      id: "dev.esm.pinia",
      label: "Pinia 🍍",
      logo: "https://pinia.vuejs.org/logo.svg",
      packageName: "pinia",
      homepage: "https://pinia.vuejs.org",
      componentStateTypes,
      app
    }, (api2) => {
      if (typeof api2.now !== "function") {
        toastMessage("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html.");
      }
      api2.addTimelineLayer({
        id: MUTATIONS_LAYER_ID,
        label: `Pinia 🍍`,
        color: 15064968
      });
      api2.addInspector({
        id: INSPECTOR_ID,
        label: "Pinia 🍍",
        icon: "storage",
        treeFilterPlaceholder: "Search stores",
        actions: [
          {
            icon: "content_copy",
            action: () => {
              actionGlobalCopyState(pinia);
            },
            tooltip: "Serialize and copy the state"
          },
          {
            icon: "content_paste",
            action: async () => {
              await actionGlobalPasteState(pinia);
              api2.sendInspectorTree(INSPECTOR_ID);
              api2.sendInspectorState(INSPECTOR_ID);
            },
            tooltip: "Replace the state with the content of your clipboard"
          },
          {
            icon: "save",
            action: () => {
              actionGlobalSaveState(pinia);
            },
            tooltip: "Save the state as a JSON file"
          },
          {
            icon: "folder_open",
            action: async () => {
              await actionGlobalOpenStateFile(pinia);
              api2.sendInspectorTree(INSPECTOR_ID);
              api2.sendInspectorState(INSPECTOR_ID);
            },
            tooltip: "Import the state from a JSON file"
          }
        ],
        nodeActions: [
          {
            icon: "restore",
            tooltip: "Reset the state (option store only)",
            action: (nodeId) => {
              const store = pinia._s.get(nodeId);
              if (!store) {
                toastMessage(`Cannot reset "${nodeId}" store because it wasn't found.`, "warn");
              } else if (!store._isOptionsAPI) {
                toastMessage(`Cannot reset "${nodeId}" store because it's a setup store.`, "warn");
              } else {
                store.$reset();
                toastMessage(`Store "${nodeId}" reset.`);
              }
            }
          }
        ]
      });
      api2.on.inspectComponent((payload, ctx) => {
        const proxy = payload.componentInstance && payload.componentInstance.proxy;
        if (proxy && proxy._pStores) {
          const piniaStores = payload.componentInstance.proxy._pStores;
          Object.values(piniaStores).forEach((store) => {
            payload.instanceData.state.push({
              type: getStoreType(store.$id),
              key: "state",
              editable: true,
              value: store._isOptionsAPI ? {
                _custom: {
                  value: vue.toRaw(store.$state),
                  actions: [
                    {
                      icon: "restore",
                      tooltip: "Reset the state of this store",
                      action: () => store.$reset()
                    }
                  ]
                }
              } : (
                // NOTE: workaround to unwrap transferred refs
                Object.keys(store.$state).reduce((state, key) => {
                  state[key] = store.$state[key];
                  return state;
                }, {})
              )
            });
            if (store._getters && store._getters.length) {
              payload.instanceData.state.push({
                type: getStoreType(store.$id),
                key: "getters",
                editable: false,
                value: store._getters.reduce((getters, key) => {
                  try {
                    getters[key] = store[key];
                  } catch (error) {
                    getters[key] = error;
                  }
                  return getters;
                }, {})
              });
            }
          });
        }
      });
      api2.on.getInspectorTree((payload) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          let stores = [pinia];
          stores = stores.concat(Array.from(pinia._s.values()));
          payload.rootNodes = (payload.filter ? stores.filter((store) => "$id" in store ? store.$id.toLowerCase().includes(payload.filter.toLowerCase()) : PINIA_ROOT_LABEL.toLowerCase().includes(payload.filter.toLowerCase())) : stores).map(formatStoreForInspectorTree);
        }
      });
      api2.on.getInspectorState((payload) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          const inspectedStore = payload.nodeId === PINIA_ROOT_ID ? pinia : pinia._s.get(payload.nodeId);
          if (!inspectedStore) {
            return;
          }
          if (inspectedStore) {
            payload.state = formatStoreForInspectorState(inspectedStore);
          }
        }
      });
      api2.on.editInspectorState((payload, ctx) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          const inspectedStore = payload.nodeId === PINIA_ROOT_ID ? pinia : pinia._s.get(payload.nodeId);
          if (!inspectedStore) {
            return toastMessage(`store "${payload.nodeId}" not found`, "error");
          }
          const { path } = payload;
          if (!isPinia(inspectedStore)) {
            if (path.length !== 1 || !inspectedStore._customProperties.has(path[0]) || path[0] in inspectedStore.$state) {
              path.unshift("$state");
            }
          } else {
            path.unshift("state");
          }
          isTimelineActive = false;
          payload.set(inspectedStore, path, payload.state.value);
          isTimelineActive = true;
        }
      });
      api2.on.editComponentState((payload) => {
        if (payload.type.startsWith("🍍")) {
          const storeId = payload.type.replace(/^🍍\s*/, "");
          const store = pinia._s.get(storeId);
          if (!store) {
            return toastMessage(`store "${storeId}" not found`, "error");
          }
          const { path } = payload;
          if (path[0] !== "state") {
            return toastMessage(`Invalid path for store "${storeId}":
${path}
Only state can be modified.`);
          }
          path[0] = "$state";
          isTimelineActive = false;
          payload.set(store, path, payload.state.value);
          isTimelineActive = true;
        }
      });
    });
  }
  function addStoreToDevtools(app, store) {
    if (!componentStateTypes.includes(getStoreType(store.$id))) {
      componentStateTypes.push(getStoreType(store.$id));
    }
    setupDevtoolsPlugin({
      id: "dev.esm.pinia",
      label: "Pinia 🍍",
      logo: "https://pinia.vuejs.org/logo.svg",
      packageName: "pinia",
      homepage: "https://pinia.vuejs.org",
      componentStateTypes,
      app,
      settings: {
        logStoreChanges: {
          label: "Notify about new/deleted stores",
          type: "boolean",
          defaultValue: true
        }
        // useEmojis: {
        //   label: 'Use emojis in messages ⚡️',
        //   type: 'boolean',
        //   defaultValue: true,
        // },
      }
    }, (api2) => {
      const now2 = typeof api2.now === "function" ? api2.now.bind(api2) : Date.now;
      store.$onAction(({ after, onError, name, args }) => {
        const groupId = runningActionId++;
        api2.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: now2(),
            title: "🛫 " + name,
            subtitle: "start",
            data: {
              store: formatDisplay(store.$id),
              action: formatDisplay(name),
              args
            },
            groupId
          }
        });
        after((result) => {
          activeAction = void 0;
          api2.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: now2(),
              title: "🛬 " + name,
              subtitle: "end",
              data: {
                store: formatDisplay(store.$id),
                action: formatDisplay(name),
                args,
                result
              },
              groupId
            }
          });
        });
        onError((error) => {
          activeAction = void 0;
          api2.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: now2(),
              logType: "error",
              title: "💥 " + name,
              subtitle: "end",
              data: {
                store: formatDisplay(store.$id),
                action: formatDisplay(name),
                args,
                error
              },
              groupId
            }
          });
        });
      }, true);
      store._customProperties.forEach((name) => {
        vue.watch(() => vue.unref(store[name]), (newValue, oldValue) => {
          api2.notifyComponentUpdate();
          api2.sendInspectorState(INSPECTOR_ID);
          if (isTimelineActive) {
            api2.addTimelineEvent({
              layerId: MUTATIONS_LAYER_ID,
              event: {
                time: now2(),
                title: "Change",
                subtitle: name,
                data: {
                  newValue,
                  oldValue
                },
                groupId: activeAction
              }
            });
          }
        }, { deep: true });
      });
      store.$subscribe(({ events, type }, state) => {
        api2.notifyComponentUpdate();
        api2.sendInspectorState(INSPECTOR_ID);
        if (!isTimelineActive)
          return;
        const eventData = {
          time: now2(),
          title: formatMutationType(type),
          data: assign$1({ store: formatDisplay(store.$id) }, formatEventData(events)),
          groupId: activeAction
        };
        activeAction = void 0;
        if (type === MutationType.patchFunction) {
          eventData.subtitle = "⤵️";
        } else if (type === MutationType.patchObject) {
          eventData.subtitle = "🧩";
        } else if (events && !Array.isArray(events)) {
          eventData.subtitle = events.type;
        }
        if (events) {
          eventData.data["rawEvent(s)"] = {
            _custom: {
              display: "DebuggerEvent",
              type: "object",
              tooltip: "raw DebuggerEvent[]",
              value: events
            }
          };
        }
        api2.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: eventData
        });
      }, { detached: true, flush: "sync" });
      const hotUpdate = store._hotUpdate;
      store._hotUpdate = vue.markRaw((newStore) => {
        hotUpdate(newStore);
        api2.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: now2(),
            title: "🔥 " + store.$id,
            subtitle: "HMR update",
            data: {
              store: formatDisplay(store.$id),
              info: formatDisplay(`HMR update`)
            }
          }
        });
        api2.notifyComponentUpdate();
        api2.sendInspectorTree(INSPECTOR_ID);
        api2.sendInspectorState(INSPECTOR_ID);
      });
      const { $dispose } = store;
      store.$dispose = () => {
        $dispose();
        api2.notifyComponentUpdate();
        api2.sendInspectorTree(INSPECTOR_ID);
        api2.sendInspectorState(INSPECTOR_ID);
        api2.getSettings().logStoreChanges && toastMessage(`Disposed "${store.$id}" store 🗑`);
      };
      api2.notifyComponentUpdate();
      api2.sendInspectorTree(INSPECTOR_ID);
      api2.sendInspectorState(INSPECTOR_ID);
      api2.getSettings().logStoreChanges && toastMessage(`"${store.$id}" store installed 🆕`);
    });
  }
  let runningActionId = 0;
  let activeAction;
  function patchActionForGrouping(store, actionNames) {
    const actions = actionNames.reduce((storeActions, actionName) => {
      storeActions[actionName] = vue.toRaw(store)[actionName];
      return storeActions;
    }, {});
    for (const actionName in actions) {
      store[actionName] = function() {
        const _actionId = runningActionId;
        const trackedStore = new Proxy(store, {
          get(...args) {
            activeAction = _actionId;
            return Reflect.get(...args);
          },
          set(...args) {
            activeAction = _actionId;
            return Reflect.set(...args);
          }
        });
        return actions[actionName].apply(trackedStore, arguments);
      };
    }
  }
  function devtoolsPlugin({ app, store, options }) {
    if (store.$id.startsWith("__hot:")) {
      return;
    }
    if (options.state) {
      store._isOptionsAPI = true;
    }
    if (typeof options.state === "function") {
      patchActionForGrouping(
        // @ts-expect-error: can cast the store...
        store,
        Object.keys(options.actions)
      );
      const originalHotUpdate = store._hotUpdate;
      vue.toRaw(store)._hotUpdate = function(newStore) {
        originalHotUpdate.apply(this, arguments);
        patchActionForGrouping(store, Object.keys(newStore._hmrPayload.actions));
      };
    }
    addStoreToDevtools(
      app,
      // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
      store
    );
  }
  function createPinia() {
    const scope = vue.effectScope(true);
    const state = scope.run(() => vue.ref({}));
    let _p = [];
    let toBeInstalled = [];
    const pinia = vue.markRaw({
      install(app) {
        setActivePinia(pinia);
        {
          pinia._a = app;
          app.provide(piniaSymbol, pinia);
          app.config.globalProperties.$pinia = pinia;
          if (USE_DEVTOOLS) {
            registerPiniaDevtools(app, pinia);
          }
          toBeInstalled.forEach((plugin) => _p.push(plugin));
          toBeInstalled = [];
        }
      },
      use(plugin) {
        if (!this._a && !isVue2) {
          toBeInstalled.push(plugin);
        } else {
          _p.push(plugin);
        }
        return this;
      },
      _p,
      // it's actually undefined here
      // @ts-expect-error
      _a: null,
      _e: scope,
      _s: /* @__PURE__ */ new Map(),
      state
    });
    if (USE_DEVTOOLS && typeof Proxy !== "undefined") {
      pinia.use(devtoolsPlugin);
    }
    return pinia;
  }
  function patchObject(newState, oldState) {
    for (const key in oldState) {
      const subPatch = oldState[key];
      if (!(key in newState)) {
        continue;
      }
      const targetValue = newState[key];
      if (isPlainObject(targetValue) && isPlainObject(subPatch) && !vue.isRef(subPatch) && !vue.isReactive(subPatch)) {
        newState[key] = patchObject(targetValue, subPatch);
      } else {
        {
          newState[key] = subPatch;
        }
      }
    }
    return newState;
  }
  const noop = () => {
  };
  function addSubscription(subscriptions, callback, detached, onCleanup = noop) {
    subscriptions.push(callback);
    const removeSubscription = () => {
      const idx = subscriptions.indexOf(callback);
      if (idx > -1) {
        subscriptions.splice(idx, 1);
        onCleanup();
      }
    };
    if (!detached && vue.getCurrentScope()) {
      vue.onScopeDispose(removeSubscription);
    }
    return removeSubscription;
  }
  function triggerSubscriptions(subscriptions, ...args) {
    subscriptions.slice().forEach((callback) => {
      callback(...args);
    });
  }
  function mergeReactiveObjects(target, patchToApply) {
    if (target instanceof Map && patchToApply instanceof Map) {
      patchToApply.forEach((value, key) => target.set(key, value));
    }
    if (target instanceof Set && patchToApply instanceof Set) {
      patchToApply.forEach(target.add, target);
    }
    for (const key in patchToApply) {
      if (!patchToApply.hasOwnProperty(key))
        continue;
      const subPatch = patchToApply[key];
      const targetValue = target[key];
      if (isPlainObject(targetValue) && isPlainObject(subPatch) && target.hasOwnProperty(key) && !vue.isRef(subPatch) && !vue.isReactive(subPatch)) {
        target[key] = mergeReactiveObjects(targetValue, subPatch);
      } else {
        target[key] = subPatch;
      }
    }
    return target;
  }
  const skipHydrateSymbol = Symbol("pinia:skipHydration");
  function shouldHydrate(obj) {
    return !isPlainObject(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
  }
  const { assign } = Object;
  function isComputed(o2) {
    return !!(vue.isRef(o2) && o2.effect);
  }
  function createOptionsStore(id, options, pinia, hot) {
    const { state, actions, getters } = options;
    const initialState = pinia.state.value[id];
    let store;
    function setup() {
      if (!initialState && !hot) {
        {
          pinia.state.value[id] = state ? state() : {};
        }
      }
      const localState = hot ? (
        // use ref() to unwrap refs inside state TODO: check if this is still necessary
        vue.toRefs(vue.ref(state ? state() : {}).value)
      ) : vue.toRefs(pinia.state.value[id]);
      return assign(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
        if (name in localState) {
          console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${name}" in store "${id}".`);
        }
        computedGetters[name] = vue.markRaw(vue.computed(() => {
          setActivePinia(pinia);
          const store2 = pinia._s.get(id);
          return getters[name].call(store2, store2);
        }));
        return computedGetters;
      }, {}));
    }
    store = createSetupStore(id, setup, options, pinia, hot, true);
    return store;
  }
  function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
    let scope;
    const optionsForPlugin = assign({ actions: {} }, options);
    if (!pinia._e.active) {
      throw new Error("Pinia destroyed");
    }
    const $subscribeOptions = {
      deep: true
      // flush: 'post',
    };
    {
      $subscribeOptions.onTrigger = (event) => {
        if (isListening) {
          debuggerEvents = event;
        } else if (isListening == false && !store._hotUpdating) {
          if (Array.isArray(debuggerEvents)) {
            debuggerEvents.push(event);
          } else {
            console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug.");
          }
        }
      };
    }
    let isListening;
    let isSyncListening;
    let subscriptions = vue.markRaw([]);
    let actionSubscriptions = vue.markRaw([]);
    let debuggerEvents;
    const initialState = pinia.state.value[$id];
    if (!isOptionsStore && !initialState && !hot) {
      {
        pinia.state.value[$id] = {};
      }
    }
    const hotState = vue.ref({});
    let activeListener;
    function $patch(partialStateOrMutator) {
      let subscriptionMutation;
      isListening = isSyncListening = false;
      {
        debuggerEvents = [];
      }
      if (typeof partialStateOrMutator === "function") {
        partialStateOrMutator(pinia.state.value[$id]);
        subscriptionMutation = {
          type: MutationType.patchFunction,
          storeId: $id,
          events: debuggerEvents
        };
      } else {
        mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
        subscriptionMutation = {
          type: MutationType.patchObject,
          payload: partialStateOrMutator,
          storeId: $id,
          events: debuggerEvents
        };
      }
      const myListenerId = activeListener = Symbol();
      vue.nextTick().then(() => {
        if (activeListener === myListenerId) {
          isListening = true;
        }
      });
      isSyncListening = true;
      triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
    }
    const $reset = isOptionsStore ? function $reset2() {
      const { state } = options;
      const newState = state ? state() : {};
      this.$patch(($state) => {
        assign($state, newState);
      });
    } : (
      /* istanbul ignore next */
      () => {
        throw new Error(`🍍: Store "${$id}" is built using the setup syntax and does not implement $reset().`);
      }
    );
    function $dispose() {
      scope.stop();
      subscriptions = [];
      actionSubscriptions = [];
      pinia._s.delete($id);
    }
    function wrapAction(name, action) {
      return function() {
        setActivePinia(pinia);
        const args = Array.from(arguments);
        const afterCallbackList = [];
        const onErrorCallbackList = [];
        function after(callback) {
          afterCallbackList.push(callback);
        }
        function onError(callback) {
          onErrorCallbackList.push(callback);
        }
        triggerSubscriptions(actionSubscriptions, {
          args,
          name,
          store,
          after,
          onError
        });
        let ret;
        try {
          ret = action.apply(this && this.$id === $id ? this : store, args);
        } catch (error) {
          triggerSubscriptions(onErrorCallbackList, error);
          throw error;
        }
        if (ret instanceof Promise) {
          return ret.then((value) => {
            triggerSubscriptions(afterCallbackList, value);
            return value;
          }).catch((error) => {
            triggerSubscriptions(onErrorCallbackList, error);
            return Promise.reject(error);
          });
        }
        triggerSubscriptions(afterCallbackList, ret);
        return ret;
      };
    }
    const _hmrPayload = /* @__PURE__ */ vue.markRaw({
      actions: {},
      getters: {},
      state: [],
      hotState
    });
    const partialStore = {
      _p: pinia,
      // _s: scope,
      $id,
      $onAction: addSubscription.bind(null, actionSubscriptions),
      $patch,
      $reset,
      $subscribe(callback, options2 = {}) {
        const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
        const stopWatcher = scope.run(() => vue.watch(() => pinia.state.value[$id], (state) => {
          if (options2.flush === "sync" ? isSyncListening : isListening) {
            callback({
              storeId: $id,
              type: MutationType.direct,
              events: debuggerEvents
            }, state);
          }
        }, assign({}, $subscribeOptions, options2)));
        return removeSubscription;
      },
      $dispose
    };
    const store = vue.reactive(
      assign(
        {
          _hmrPayload,
          _customProperties: vue.markRaw(/* @__PURE__ */ new Set())
          // devtools custom properties
        },
        partialStore
        // must be added later
        // setupStore
      )
    );
    pinia._s.set($id, store);
    const setupStore = pinia._e.run(() => {
      scope = vue.effectScope();
      return scope.run(() => setup());
    });
    for (const key in setupStore) {
      const prop = setupStore[key];
      if (vue.isRef(prop) && !isComputed(prop) || vue.isReactive(prop)) {
        if (hot) {
          set(hotState.value, key, vue.toRef(setupStore, key));
        } else if (!isOptionsStore) {
          if (initialState && shouldHydrate(prop)) {
            if (vue.isRef(prop)) {
              prop.value = initialState[key];
            } else {
              mergeReactiveObjects(prop, initialState[key]);
            }
          }
          {
            pinia.state.value[$id][key] = prop;
          }
        }
        {
          _hmrPayload.state.push(key);
        }
      } else if (typeof prop === "function") {
        const actionValue = hot ? prop : wrapAction(key, prop);
        {
          setupStore[key] = actionValue;
        }
        {
          _hmrPayload.actions[key] = prop;
        }
        optionsForPlugin.actions[key] = prop;
      } else {
        if (isComputed(prop)) {
          _hmrPayload.getters[key] = isOptionsStore ? (
            // @ts-expect-error
            options.getters[key]
          ) : prop;
          if (IS_CLIENT) {
            const getters = setupStore._getters || // @ts-expect-error: same
            (setupStore._getters = vue.markRaw([]));
            getters.push(key);
          }
        }
      }
    }
    {
      assign(store, setupStore);
      assign(vue.toRaw(store), setupStore);
    }
    Object.defineProperty(store, "$state", {
      get: () => hot ? hotState.value : pinia.state.value[$id],
      set: (state) => {
        if (hot) {
          throw new Error("cannot set hotState");
        }
        $patch(($state) => {
          assign($state, state);
        });
      }
    });
    {
      store._hotUpdate = vue.markRaw((newStore) => {
        store._hotUpdating = true;
        newStore._hmrPayload.state.forEach((stateKey) => {
          if (stateKey in store.$state) {
            const newStateTarget = newStore.$state[stateKey];
            const oldStateSource = store.$state[stateKey];
            if (typeof newStateTarget === "object" && isPlainObject(newStateTarget) && isPlainObject(oldStateSource)) {
              patchObject(newStateTarget, oldStateSource);
            } else {
              newStore.$state[stateKey] = oldStateSource;
            }
          }
          set(store, stateKey, vue.toRef(newStore.$state, stateKey));
        });
        Object.keys(store.$state).forEach((stateKey) => {
          if (!(stateKey in newStore.$state)) {
            del(store, stateKey);
          }
        });
        isListening = false;
        isSyncListening = false;
        pinia.state.value[$id] = vue.toRef(newStore._hmrPayload, "hotState");
        isSyncListening = true;
        vue.nextTick().then(() => {
          isListening = true;
        });
        for (const actionName in newStore._hmrPayload.actions) {
          const action = newStore[actionName];
          set(store, actionName, wrapAction(actionName, action));
        }
        for (const getterName in newStore._hmrPayload.getters) {
          const getter = newStore._hmrPayload.getters[getterName];
          const getterValue = isOptionsStore ? (
            // special handling of options api
            vue.computed(() => {
              setActivePinia(pinia);
              return getter.call(store, store);
            })
          ) : getter;
          set(store, getterName, getterValue);
        }
        Object.keys(store._hmrPayload.getters).forEach((key) => {
          if (!(key in newStore._hmrPayload.getters)) {
            del(store, key);
          }
        });
        Object.keys(store._hmrPayload.actions).forEach((key) => {
          if (!(key in newStore._hmrPayload.actions)) {
            del(store, key);
          }
        });
        store._hmrPayload = newStore._hmrPayload;
        store._getters = newStore._getters;
        store._hotUpdating = false;
      });
    }
    if (USE_DEVTOOLS) {
      const nonEnumerable = {
        writable: true,
        configurable: true,
        // avoid warning on devtools trying to display this property
        enumerable: false
      };
      ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((p2) => {
        Object.defineProperty(store, p2, assign({ value: store[p2] }, nonEnumerable));
      });
    }
    pinia._p.forEach((extender) => {
      if (USE_DEVTOOLS) {
        const extensions = scope.run(() => extender({
          store,
          app: pinia._a,
          pinia,
          options: optionsForPlugin
        }));
        Object.keys(extensions || {}).forEach((key) => store._customProperties.add(key));
        assign(store, extensions);
      } else {
        assign(store, scope.run(() => extender({
          store,
          app: pinia._a,
          pinia,
          options: optionsForPlugin
        })));
      }
    });
    if (store.$state && typeof store.$state === "object" && typeof store.$state.constructor === "function" && !store.$state.constructor.toString().includes("[native code]")) {
      console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${store.$id}".`);
    }
    if (initialState && isOptionsStore && options.hydrate) {
      options.hydrate(store.$state, initialState);
    }
    isListening = true;
    isSyncListening = true;
    return store;
  }
  function defineStore(idOrOptions, setup, setupOptions) {
    let id;
    let options;
    const isSetupStore = typeof setup === "function";
    if (typeof idOrOptions === "string") {
      id = idOrOptions;
      options = isSetupStore ? setupOptions : setup;
    } else {
      options = idOrOptions;
      id = idOrOptions.id;
      if (typeof id !== "string") {
        throw new Error(`[🍍]: "defineStore()" must be passed a store id as its first argument.`);
      }
    }
    function useStore(pinia, hot) {
      const currentInstance = vue.getCurrentInstance();
      pinia = // in test mode, ignore the argument provided as we can always retrieve a
      // pinia instance with getActivePinia()
      pinia || currentInstance && vue.inject(piniaSymbol, null);
      if (pinia)
        setActivePinia(pinia);
      if (!activePinia) {
        throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Did you forget to install pinia?
	const pinia = createPinia()
	app.use(pinia)
This will fail in production.`);
      }
      pinia = activePinia;
      if (!pinia._s.has(id)) {
        if (isSetupStore) {
          createSetupStore(id, setup, options, pinia);
        } else {
          createOptionsStore(id, options, pinia);
        }
        {
          useStore._pinia = pinia;
        }
      }
      const store = pinia._s.get(id);
      if (hot) {
        const hotId = "__hot:" + id;
        const newStore = isSetupStore ? createSetupStore(hotId, setup, options, pinia, true) : createOptionsStore(hotId, assign({}, options), pinia, true);
        hot._hotUpdate(newStore);
        delete pinia.state.value[hotId];
        pinia._s.delete(hotId);
      }
      if (IS_CLIENT && currentInstance && currentInstance.proxy && // avoid adding stores that are just built for hot module replacement
      !hot) {
        const vm = currentInstance.proxy;
        const cache = "_pStores" in vm ? vm._pStores : vm._pStores = {};
        cache[id] = store;
      }
      return store;
    }
    useStore.$id = id;
    return useStore;
  }
  const useAppInfoStore = defineStore("appInfo", {
    state: () => {
      return {
        statusBar: 0,
        navBarHeight: 0,
        screenWidth: 0,
        screenHeight: 0,
        deviceId: "",
        deviceBrand: "",
        appVersion: ""
      };
    },
    actions: {
      setInfo(statusBar, navBarHeight, screenWidth, screenHeight, deviceId, deviceBrand, appVersion) {
        this.statusBar = statusBar;
        this.navBarHeight = navBarHeight;
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        this.deviceId = deviceId;
        this.deviceBrand = deviceBrand;
        this.appVersion = appVersion;
      },
      getInfo() {
        return {
          statusBar: this.statusBar,
          navBarHeight: this.navBarHeight,
          screenWidth: this.screenWidth,
          screenHeight: this.screenHeight,
          deviceId: this.deviceId,
          deviceBrand: this.deviceBrand,
          appVersion: this.appVersion
        };
      }
    }
  });
  const _sfc_main$P = {
    __name: "Update",
    setup(__props, { expose }) {
      const { proxy } = vue.getCurrentInstance();
      const appInfoStore = useAppInfoStore();
      const { deviceId, appVersion } = appInfoStore.getInfo();
      const checkDialogRef = vue.ref();
      const updateInfo = vue.ref({});
      const checkUpdate = async (showTips) => {
        downloading.value = false;
        let result = await proxy.Request({
          url: proxy.Api.checkUpdate,
          showLoading: showTips,
          params: {
            deviceId,
            appVersion
          }
        });
        if (!result) {
          return;
        }
        if (result.data == null) {
          if (showTips) {
            proxy.Message.success("已经是最新版");
          }
          return;
        }
        updateInfo.value = result.data;
        checkDialogRef.value.show();
      };
      const downloading = vue.ref(false);
      const downloadPercent = vue.ref({
        progress: 0,
        totalBytesWritten: 0,
        totalBytesExpectedToWrite: 0
      });
      const updateApp = () => {
        downloading.value = true;
        let downloadTask = uni.downloadFile({
          url: proxy.Api.domain + proxy.Api.downloadApp + "?id=" + updateInfo.value.id,
          success: (downloadResult) => {
            if (downloadResult.statusCode == 200) {
              close();
              plus.runtime.install(
                downloadResult.tempFilePath,
                { force: false },
                function() {
                  plus.nativeUI.toast("安装成功");
                  plus.runtime.restart();
                },
                function(e) {
                  plus.nativeUI.toast("安装失败");
                }
              );
            }
          }
        });
        downloadTask.onProgressUpdate((res) => {
          downloadPercent.value = res;
        });
      };
      expose({ checkUpdate });
      const close = () => {
        checkDialogRef.value.close();
      };
      return (_ctx, _cache) => {
        const _component_Dialog = vue.resolveComponent("Dialog");
        return vue.openBlock(), vue.createElementBlock("view", null, [
          vue.createVNode(
            _component_Dialog,
            {
              ref_key: "checkDialogRef",
              ref: checkDialogRef,
              styleBg: "none",
              styleBorder: "none",
              showCancel: false
            },
            {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", { class: "update-panel" }, [
                  vue.createElementVNode("view", { class: "update-img" }, [
                    vue.createElementVNode("image", {
                      src: _imports_0,
                      mode: "widthFix"
                    })
                  ]),
                  vue.createElementVNode("view", { class: "update-body" }, [
                    vue.createElementVNode(
                      "view",
                      { class: "update-version" },
                      " 升级到最新版本V" + vue.toDisplayString(updateInfo.value.version),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "view",
                      { class: "file-siez" },
                      " 文件大小：" + vue.toDisplayString(vue.unref(proxy).Utils.size2Str(updateInfo.value.size)),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode("view", { class: "update-info-title" }, "更新内容："),
                    (vue.openBlock(true), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList(updateInfo.value.updateList, (item, index) => {
                        return vue.openBlock(), vue.createElementBlock(
                          "view",
                          { class: "update-info" },
                          vue.toDisplayString(index + 1) + "、" + vue.toDisplayString(item),
                          1
                          /* TEXT */
                        );
                      }),
                      256
                      /* UNKEYED_FRAGMENT */
                    )),
                    downloading.value ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 0,
                      class: "update-progress"
                    }, [
                      vue.createElementVNode("progress", {
                        percent: downloadPercent.value.progress,
                        "show-info": "",
                        "stroke-width": "3"
                      }, null, 8, ["percent"]),
                      vue.createElementVNode(
                        "view",
                        { class: "update-tips" },
                        " 正在下载，请稍后(" + vue.toDisplayString(vue.unref(proxy).Utils.size2Str(downloadPercent.value.totalBytesWritten)) + "/" + vue.toDisplayString(vue.unref(proxy).Utils.size2Str(downloadPercent.value.totalBytesExpectedToWrite)) + ") ",
                        1
                        /* TEXT */
                      )
                    ])) : vue.createCommentVNode("v-if", true),
                    !downloading.value ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 1,
                      class: "update-btn",
                      onClick: updateApp
                    }, "立即更新")) : vue.createCommentVNode("v-if", true)
                  ]),
                  !downloading.value ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    class: "update-close"
                  }, [
                    vue.createElementVNode("view", {
                      class: "iconfont icon-close",
                      onClick: close
                    })
                  ])) : vue.createCommentVNode("v-if", true)
                ])
              ]),
              _: 1
              /* STABLE */
            },
            512
            /* NEED_PATCH */
          )
        ]);
      };
    }
  };
  const Update = /* @__PURE__ */ _export_sfc(_sfc_main$P, [["__scopeId", "data-v-a7c235a9"], ["__file", "C:/easyjob/easyjob-front/easyjob-app/src/pages/components/Update.vue"]]);
  const useQuestionCategoryStore = defineStore("questionCategoryInfo", {
    state: () => {
      return {
        categoryList: []
      };
    },
    actions: {
      setInfo(categoryList) {
        this.categoryList = categoryList;
      },
      getInfo() {
        return this.categoryList;
      }
    }
  });
  const _sfc_main$O = {
    __name: "Index",
    setup(__props) {
      const { proxy } = vue.getCurrentInstance();
      const updateRef = vue.ref();
      const checkUpdate = () => {
        vue.nextTick(() => {
          updateRef.value.checkUpdate(false);
        });
      };
      checkUpdate();
      const questionCategoryStore = useQuestionCategoryStore();
      const carouselList = vue.ref([]);
      const loadCarouselData = async () => {
        let result = await proxy.Request({
          url: proxy.Api.loadCarousel,
          showLoading: false
        });
        if (!result) {
          return;
        }
        carouselList.value = result.data;
      };
      loadCarouselData();
      const goExam = () => {
        uni.switchTab({
          url: "./exam/ExamIndex"
        });
      };
      const swiperJump = (data) => {
        let url = `/pages/share/ShareDetail?shareId=${data.objectId}`;
        if (data.objectType == 1) {
          url = `/pages/question/QuestionDetail?questionId=${data.objectId}`;
        } else if (data.objectType == 2) {
          url = `/pages/carousel/ExamQuestion?questionId=${data.objectId}`;
        } else if (data.objectType == 3) {
          url = `/pages/carousel/WebView?url=${encodeURI(data.outerLink)}`;
        }
        uni.navigateTo({
          url
        });
      };
      const goSearch = () => {
        uni.navigateTo({
          url: `/pages/search/SearchIndex`
        });
      };
      const goQuestion = (item) => {
        uni.navigateTo({
          url: `/pages/question/QuestionList?categoryId=${item.categoryId}&categoryName=${encodeURIComponent(item.categoryName)}`
        });
      };
      return (_ctx, _cache) => {
        const _component_Navbar = vue.resolveComponent("Navbar");
        const _component_uni_grid_item = resolveEasycom(vue.resolveDynamicComponent("uni-grid-item"), __easycom_0$6);
        const _component_uni_grid = resolveEasycom(vue.resolveDynamicComponent("uni-grid"), __easycom_1$1);
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createVNode(_component_Navbar, {
              showLeft: false,
              title: "EasyJob"
            }),
            vue.createElementVNode("view", { class: "content" }, [
              vue.createElementVNode("view", { class: "uni-margin-wrap" }, [
                vue.createElementVNode("swiper", {
                  class: "swiper-box",
                  "indicator-dots": "",
                  autoplay: "true"
                }, [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList(carouselList.value, (item, index) => {
                      return vue.openBlock(), vue.createElementBlock("swiper-item", { key: index }, [
                        vue.createElementVNode("view", { class: "swiper-item" }, [
                          vue.createElementVNode("image", {
                            onClick: ($event) => swiperJump(item),
                            src: vue.unref(proxy).Api.domain + vue.unref(proxy).Api.imageUrl + item.imgPath,
                            mode: "aspectFill",
                            style: { width: "100%" }
                          }, null, 8, ["onClick", "src"])
                        ])
                      ]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])
              ]),
              vue.createElementVNode("view", { class: "quick-list" }, [
                vue.createElementVNode("view", {
                  class: "quick-item search",
                  onClick: goSearch
                }, [
                  vue.createElementVNode("view", { class: "title" }, "搜索入口"),
                  vue.createElementVNode("view", { class: "summary" }, "支持通过关键词搜索"),
                  vue.createElementVNode("view", { class: "btn" }, "去搜索")
                ]),
                vue.createElementVNode("view", {
                  class: "quick-item interview",
                  onClick: goExam
                }, [
                  vue.createElementVNode("view", { class: "title" }, "在线考试"),
                  vue.createElementVNode("view", { class: "summary" }, "考考你学的怎么样了"),
                  vue.createElementVNode("view", { class: "btn" }, "去考试")
                ])
              ]),
              vue.createElementVNode("view", { class: "category-title" }, "八股文分类"),
              vue.createElementVNode("view", { class: "category-list" }, [
                vue.createVNode(_component_uni_grid, {
                  column: 3,
                  "show-border": false,
                  square: false
                }, {
                  default: vue.withCtx(() => [
                    (vue.openBlock(true), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList(vue.unref(questionCategoryStore).getInfo(), (item, index) => {
                        return vue.openBlock(), vue.createBlock(_component_uni_grid_item, {
                          index,
                          key: index
                        }, {
                          default: vue.withCtx(() => [
                            vue.createElementVNode("view", { class: "category-item" }, [
                              vue.createElementVNode("view", {
                                class: "category-item-inner",
                                style: vue.normalizeStyle({ background: item.bgColor }),
                                onClick: ($event) => goQuestion(item)
                              }, [
                                item.iconPath ? (vue.openBlock(), vue.createElementBlock("image", {
                                  key: 0,
                                  style: { width: "100%", height: "100px" },
                                  src: vue.unref(proxy).Api.domain + vue.unref(proxy).Api.imageUrl + item.iconPath,
                                  mode: "aspectFill"
                                }, null, 8, ["src"])) : (vue.openBlock(), vue.createElementBlock(
                                  "view",
                                  { key: 1 },
                                  vue.toDisplayString(item.categoryName),
                                  1
                                  /* TEXT */
                                ))
                              ], 12, ["onClick"])
                            ])
                          ]),
                          _: 2
                          /* DYNAMIC */
                        }, 1032, ["index"]);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ]),
                  _: 1
                  /* STABLE */
                })
              ]),
              vue.createVNode(
                Update,
                {
                  ref_key: "updateRef",
                  ref: updateRef
                },
                null,
                512
                /* NEED_PATCH */
              )
            ])
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  };
  const PagesIndex = /* @__PURE__ */ _export_sfc(_sfc_main$O, [["__scopeId", "data-v-75f76a7e"], ["__file", "C:/easyjob/easyjob-front/easyjob-app/src/pages/Index.vue"]]);
  const _sfc_main$N = {
    __name: "QuestionCategory",
    emits: ["select"],
    setup(__props, { expose, emit }) {
      vue.getCurrentInstance();
      const questionCategoryStore = useQuestionCategoryStore();
      const categoryPoupRef = vue.ref();
      const currentCategoryId = vue.ref(0);
      const show = (category) => {
        currentCategoryId.value = category.categoryId;
        categoryPoupRef.value.show();
      };
      const selectCategory = (item) => {
        currentCategoryId.value = item.categoryId;
        emit("select", {
          categoryName: item.categoryName,
          categoryId: item.categoryId + ""
        });
        categoryPoupRef.value.close();
      };
      expose({
        show
      });
      return (_ctx, _cache) => {
        const _component_Popup = vue.resolveComponent("Popup");
        return vue.openBlock(), vue.createElementBlock("view", null, [
          vue.createVNode(
            _component_Popup,
            {
              type: "right",
              ref_key: "categoryPoupRef",
              ref: categoryPoupRef
            },
            {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", { class: "category-list" }, [
                  vue.createElementVNode(
                    "view",
                    {
                      class: vue.normalizeClass(["item", currentCategoryId.value == 0 ? "active" : ""]),
                      onClick: _cache[0] || (_cache[0] = ($event) => selectCategory({ categoryId: 0, categoryName: "全部分类" }))
                    },
                    " 全部分类 ",
                    2
                    /* CLASS */
                  ),
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList(vue.unref(questionCategoryStore).getInfo(), (item) => {
                      return vue.openBlock(), vue.createElementBlock("view", {
                        class: vue.normalizeClass([
                          "item",
                          currentCategoryId.value == item.categoryId ? "active" : ""
                        ]),
                        onClick: ($event) => selectCategory(item)
                      }, vue.toDisplayString(item.categoryName), 11, ["onClick"]);
                    }),
                    256
                    /* UNKEYED_FRAGMENT */
                  ))
                ])
              ]),
              _: 1
              /* STABLE */
            },
            512
            /* NEED_PATCH */
          )
        ]);
      };
    }
  };
  const QuestionCategory = /* @__PURE__ */ _export_sfc(_sfc_main$N, [["__scopeId", "data-v-9a096f2b"], ["__file", "C:/easyjob/easyjob-front/easyjob-app/src/pages/question/QuestionCategory.vue"]]);
  const fontData = [
    {
      "font_class": "arrow-down",
      "unicode": ""
    },
    {
      "font_class": "arrow-left",
      "unicode": ""
    },
    {
      "font_class": "arrow-right",
      "unicode": ""
    },
    {
      "font_class": "arrow-up",
      "unicode": ""
    },
    {
      "font_class": "auth",
      "unicode": ""
    },
    {
      "font_class": "auth-filled",
      "unicode": ""
    },
    {
      "font_class": "back",
      "unicode": ""
    },
    {
      "font_class": "bars",
      "unicode": ""
    },
    {
      "font_class": "calendar",
      "unicode": ""
    },
    {
      "font_class": "calendar-filled",
      "unicode": ""
    },
    {
      "font_class": "camera",
      "unicode": ""
    },
    {
      "font_class": "camera-filled",
      "unicode": ""
    },
    {
      "font_class": "cart",
      "unicode": ""
    },
    {
      "font_class": "cart-filled",
      "unicode": ""
    },
    {
      "font_class": "chat",
      "unicode": ""
    },
    {
      "font_class": "chat-filled",
      "unicode": ""
    },
    {
      "font_class": "chatboxes",
      "unicode": ""
    },
    {
      "font_class": "chatboxes-filled",
      "unicode": ""
    },
    {
      "font_class": "chatbubble",
      "unicode": ""
    },
    {
      "font_class": "chatbubble-filled",
      "unicode": ""
    },
    {
      "font_class": "checkbox",
      "unicode": ""
    },
    {
      "font_class": "checkbox-filled",
      "unicode": ""
    },
    {
      "font_class": "checkmarkempty",
      "unicode": ""
    },
    {
      "font_class": "circle",
      "unicode": ""
    },
    {
      "font_class": "circle-filled",
      "unicode": ""
    },
    {
      "font_class": "clear",
      "unicode": ""
    },
    {
      "font_class": "close",
      "unicode": ""
    },
    {
      "font_class": "closeempty",
      "unicode": ""
    },
    {
      "font_class": "cloud-download",
      "unicode": ""
    },
    {
      "font_class": "cloud-download-filled",
      "unicode": ""
    },
    {
      "font_class": "cloud-upload",
      "unicode": ""
    },
    {
      "font_class": "cloud-upload-filled",
      "unicode": ""
    },
    {
      "font_class": "color",
      "unicode": ""
    },
    {
      "font_class": "color-filled",
      "unicode": ""
    },
    {
      "font_class": "compose",
      "unicode": ""
    },
    {
      "font_class": "contact",
      "unicode": ""
    },
    {
      "font_class": "contact-filled",
      "unicode": ""
    },
    {
      "font_class": "down",
      "unicode": ""
    },
    {
      "font_class": "bottom",
      "unicode": ""
    },
    {
      "font_class": "download",
      "unicode": ""
    },
    {
      "font_class": "download-filled",
      "unicode": ""
    },
    {
      "font_class": "email",
      "unicode": ""
    },
    {
      "font_class": "email-filled",
      "unicode": ""
    },
    {
      "font_class": "eye",
      "unicode": ""
    },
    {
      "font_class": "eye-filled",
      "unicode": ""
    },
    {
      "font_class": "eye-slash",
      "unicode": ""
    },
    {
      "font_class": "eye-slash-filled",
      "unicode": ""
    },
    {
      "font_class": "fire",
      "unicode": ""
    },
    {
      "font_class": "fire-filled",
      "unicode": ""
    },
    {
      "font_class": "flag",
      "unicode": ""
    },
    {
      "font_class": "flag-filled",
      "unicode": ""
    },
    {
      "font_class": "folder-add",
      "unicode": ""
    },
    {
      "font_class": "folder-add-filled",
      "unicode": ""
    },
    {
      "font_class": "font",
      "unicode": ""
    },
    {
      "font_class": "forward",
      "unicode": ""
    },
    {
      "font_class": "gear",
      "unicode": ""
    },
    {
      "font_class": "gear-filled",
      "unicode": ""
    },
    {
      "font_class": "gift",
      "unicode": ""
    },
    {
      "font_class": "gift-filled",
      "unicode": ""
    },
    {
      "font_class": "hand-down",
      "unicode": ""
    },
    {
      "font_class": "hand-down-filled",
      "unicode": ""
    },
    {
      "font_class": "hand-up",
      "unicode": ""
    },
    {
      "font_class": "hand-up-filled",
      "unicode": ""
    },
    {
      "font_class": "headphones",
      "unicode": ""
    },
    {
      "font_class": "heart",
      "unicode": ""
    },
    {
      "font_class": "heart-filled",
      "unicode": ""
    },
    {
      "font_class": "help",
      "unicode": ""
    },
    {
      "font_class": "help-filled",
      "unicode": ""
    },
    {
      "font_class": "home",
      "unicode": ""
    },
    {
      "font_class": "home-filled",
      "unicode": ""
    },
    {
      "font_class": "image",
      "unicode": ""
    },
    {
      "font_class": "image-filled",
      "unicode": ""
    },
    {
      "font_class": "images",
      "unicode": ""
    },
    {
      "font_class": "images-filled",
      "unicode": ""
    },
    {
      "font_class": "info",
      "unicode": ""
    },
    {
      "font_class": "info-filled",
      "unicode": ""
    },
    {
      "font_class": "left",
      "unicode": ""
    },
    {
      "font_class": "link",
      "unicode": ""
    },
    {
      "font_class": "list",
      "unicode": ""
    },
    {
      "font_class": "location",
      "unicode": ""
    },
    {
      "font_class": "location-filled",
      "unicode": ""
    },
    {
      "font_class": "locked",
      "unicode": ""
    },
    {
      "font_class": "locked-filled",
      "unicode": ""
    },
    {
      "font_class": "loop",
      "unicode": ""
    },
    {
      "font_class": "mail-open",
      "unicode": ""
    },
    {
      "font_class": "mail-open-filled",
      "unicode": ""
    },
    {
      "font_class": "map",
      "unicode": ""
    },
    {
      "font_class": "map-filled",
      "unicode": ""
    },
    {
      "font_class": "map-pin",
      "unicode": ""
    },
    {
      "font_class": "map-pin-ellipse",
      "unicode": ""
    },
    {
      "font_class": "medal",
      "unicode": ""
    },
    {
      "font_class": "medal-filled",
      "unicode": ""
    },
    {
      "font_class": "mic",
      "unicode": ""
    },
    {
      "font_class": "mic-filled",
      "unicode": ""
    },
    {
      "font_class": "micoff",
      "unicode": ""
    },
    {
      "font_class": "micoff-filled",
      "unicode": ""
    },
    {
      "font_class": "minus",
      "unicode": ""
    },
    {
      "font_class": "minus-filled",
      "unicode": ""
    },
    {
      "font_class": "more",
      "unicode": ""
    },
    {
      "font_class": "more-filled",
      "unicode": ""
    },
    {
      "font_class": "navigate",
      "unicode": ""
    },
    {
      "font_class": "navigate-filled",
      "unicode": ""
    },
    {
      "font_class": "notification",
      "unicode": ""
    },
    {
      "font_class": "notification-filled",
      "unicode": ""
    },
    {
      "font_class": "paperclip",
      "unicode": ""
    },
    {
      "font_class": "paperplane",
      "unicode": ""
    },
    {
      "font_class": "paperplane-filled",
      "unicode": ""
    },
    {
      "font_class": "person",
      "unicode": ""
    },
    {
      "font_class": "person-filled",
      "unicode": ""
    },
    {
      "font_class": "personadd",
      "unicode": ""
    },
    {
      "font_class": "personadd-filled",
      "unicode": ""
    },
    {
      "font_class": "personadd-filled-copy",
      "unicode": ""
    },
    {
      "font_class": "phone",
      "unicode": ""
    },
    {
      "font_class": "phone-filled",
      "unicode": ""
    },
    {
      "font_class": "plus",
      "unicode": ""
    },
    {
      "font_class": "plus-filled",
      "unicode": ""
    },
    {
      "font_class": "plusempty",
      "unicode": ""
    },
    {
      "font_class": "pulldown",
      "unicode": ""
    },
    {
      "font_class": "pyq",
      "unicode": ""
    },
    {
      "font_class": "qq",
      "unicode": ""
    },
    {
      "font_class": "redo",
      "unicode": ""
    },
    {
      "font_class": "redo-filled",
      "unicode": ""
    },
    {
      "font_class": "refresh",
      "unicode": ""
    },
    {
      "font_class": "refresh-filled",
      "unicode": ""
    },
    {
      "font_class": "refreshempty",
      "unicode": ""
    },
    {
      "font_class": "reload",
      "unicode": ""
    },
    {
      "font_class": "right",
      "unicode": ""
    },
    {
      "font_class": "scan",
      "unicode": ""
    },
    {
      "font_class": "search",
      "unicode": ""
    },
    {
      "font_class": "settings",
      "unicode": ""
    },
    {
      "font_class": "settings-filled",
      "unicode": ""
    },
    {
      "font_class": "shop",
      "unicode": ""
    },
    {
      "font_class": "shop-filled",
      "unicode": ""
    },
    {
      "font_class": "smallcircle",
      "unicode": ""
    },
    {
      "font_class": "smallcircle-filled",
      "unicode": ""
    },
    {
      "font_class": "sound",
      "unicode": ""
    },
    {
      "font_class": "sound-filled",
      "unicode": ""
    },
    {
      "font_class": "spinner-cycle",
      "unicode": ""
    },
    {
      "font_class": "staff",
      "unicode": ""
    },
    {
      "font_class": "staff-filled",
      "unicode": ""
    },
    {
      "font_class": "star",
      "unicode": ""
    },
    {
      "font_class": "star-filled",
      "unicode": ""
    },
    {
      "font_class": "starhalf",
      "unicode": ""
    },
    {
      "font_class": "trash",
      "unicode": ""
    },
    {
      "font_class": "trash-filled",
      "unicode": ""
    },
    {
      "font_class": "tune",
      "unicode": ""
    },
    {
      "font_class": "tune-filled",
      "unicode": ""
    },
    {
      "font_class": "undo",
      "unicode": ""
    },
    {
      "font_class": "undo-filled",
      "unicode": ""
    },
    {
      "font_class": "up",
      "unicode": ""
    },
    {
      "font_class": "top",
      "unicode": ""
    },
    {
      "font_class": "upload",
      "unicode": ""
    },
    {
      "font_class": "upload-filled",
      "unicode": ""
    },
    {
      "font_class": "videocam",
      "unicode": ""
    },
    {
      "font_class": "videocam-filled",
      "unicode": ""
    },
    {
      "font_class": "vip",
      "unicode": ""
    },
    {
      "font_class": "vip-filled",
      "unicode": ""
    },
    {
      "font_class": "wallet",
      "unicode": ""
    },
    {
      "font_class": "wallet-filled",
      "unicode": ""
    },
    {
      "font_class": "weibo",
      "unicode": ""
    },
    {
      "font_class": "weixin",
      "unicode": ""
    }
  ];
  const getVal = (val) => {
    const reg = /^[0-9]*$/g;
    return typeof val === "number" || reg.test(val) ? val + "px" : val;
  };
  const _sfc_main$M = {
    name: "UniIcons",
    emits: ["click"],
    props: {
      type: {
        type: String,
        default: ""
      },
      color: {
        type: String,
        default: "#333333"
      },
      size: {
        type: [Number, String],
        default: 16
      },
      customPrefix: {
        type: String,
        default: ""
      },
      fontFamily: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        icons: fontData
      };
    },
    computed: {
      unicode() {
        let code = this.icons.find((v2) => v2.font_class === this.type);
        if (code) {
          return code.unicode;
        }
        return "";
      },
      iconSize() {
        return getVal(this.size);
      },
      styleObj() {
        if (this.fontFamily !== "") {
          return `color: ${this.color}; font-size: ${this.iconSize}; font-family: ${this.fontFamily};`;
        }
        return `color: ${this.color}; font-size: ${this.iconSize};`;
      }
    },
    methods: {
      _onClick() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "text",
      {
        style: vue.normalizeStyle($options.styleObj),
        class: vue.normalizeClass(["uni-icons", ["uniui-" + $props.type, $props.customPrefix, $props.customPrefix ? $props.type : ""]]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options._onClick && $options._onClick(...args))
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0$5 = /* @__PURE__ */ _export_sfc(_sfc_main$M, [["render", _sfc_render$b], ["__scopeId", "data-v-946bce22"], ["__file", "C:/easyjob/easyjob-front/easyjob-app/node_modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue"]]);
  const _sfc_main$L = {
    name: "UniRate",
    props: {
      isFill: {
        // 星星的类型，是否镂空
        type: [Boolean, String],
        default: true
      },
      color: {
        // 星星未选中的颜色
        type: String,
        default: "#ececec"
      },
      activeColor: {
        // 星星选中状态颜色
        type: String,
        default: "#ffca3e"
      },
      disabledColor: {
        // 星星禁用状态颜色
        type: String,
        default: "#c0c0c0"
      },
      size: {
        // 星星的大小
        type: [Number, String],
        default: 24
      },
      value: {
        // 当前评分
        type: [Number, String],
        default: 0
      },
      modelValue: {
        // 当前评分
        type: [Number, String],
        default: 0
      },
      max: {
        // 最大评分
        type: [Number, String],
        default: 5
      },
      margin: {
        // 星星的间距
        type: [Number, String],
        default: 0
      },
      disabled: {
        // 是否可点击
        type: [Boolean, String],
        default: false
      },
      readonly: {
        // 是否只读
        type: [Boolean, String],
        default: false
      },
      allowHalf: {
        // 是否显示半星
        type: [Boolean, String],
        default: false
      },
      touchable: {
        // 是否支持滑动手势
        type: [Boolean, String],
        default: true
      }
    },
    data() {
      return {
        valueSync: "",
        userMouseFristMove: true,
        userRated: false,
        userLastRate: 1
      };
    },
    watch: {
      value(newVal) {
        this.valueSync = Number(newVal);
      },
      modelValue(newVal) {
        this.valueSync = Number(newVal);
      }
    },
    computed: {
      stars() {
        const value = this.valueSync ? this.valueSync : 0;
        const starList = [];
        const floorValue = Math.floor(value);
        const ceilValue = Math.ceil(value);
        for (let i2 = 0; i2 < this.max; i2++) {
          if (floorValue > i2) {
            starList.push({
              activeWitch: "100%"
            });
          } else if (ceilValue - 1 === i2) {
            starList.push({
              activeWitch: (value - floorValue) * 100 + "%"
            });
          } else {
            starList.push({
              activeWitch: "0"
            });
          }
        }
        return starList;
      },
      marginNumber() {
        return Number(this.margin);
      }
    },
    created() {
      this.valueSync = Number(this.value || this.modelValue);
      this._rateBoxLeft = 0;
      this._oldValue = null;
    },
    mounted() {
      setTimeout(() => {
        this._getSize();
      }, 100);
    },
    methods: {
      touchstart(e) {
        if (this.readonly || this.disabled)
          return;
        const {
          clientX,
          screenX
        } = e.changedTouches[0];
        this._getRateCount(clientX || screenX);
      },
      touchmove(e) {
        if (this.readonly || this.disabled || !this.touchable)
          return;
        const {
          clientX,
          screenX
        } = e.changedTouches[0];
        this._getRateCount(clientX || screenX);
      },
      /**
       * 兼容 PC @tian
       */
      mousedown(e) {
      },
      mousemove(e) {
      },
      mouseleave(e) {
      },
      /**
       * 获取星星个数
       */
      _getRateCount(clientX) {
        this._getSize();
        const size = Number(this.size);
        if (isNaN(size)) {
          return new Error("size 属性只能设置为数字");
        }
        const rateMoveRange = clientX - this._rateBoxLeft;
        let index = parseInt(rateMoveRange / (size + this.marginNumber));
        index = index < 0 ? 0 : index;
        index = index > this.max ? this.max : index;
        const range = parseInt(rateMoveRange - (size + this.marginNumber) * index);
        let value = 0;
        if (this._oldValue === index && !this.PC)
          return;
        this._oldValue = index;
        if (this.allowHalf) {
          if (range > size / 2) {
            value = index + 1;
          } else {
            value = index + 0.5;
          }
        } else {
          value = index + 1;
        }
        value = Math.max(0.5, Math.min(value, this.max));
        this.valueSync = value;
        this._onChange();
      },
      /**
       * 触发动态修改
       */
      _onChange() {
        this.$emit("input", this.valueSync);
        this.$emit("update:modelValue", this.valueSync);
        this.$emit("change", {
          value: this.valueSync
        });
      },
      /**
       * 获取星星距离屏幕左侧距离
       */
      _getSize() {
        uni.createSelectorQuery().in(this).select(".uni-rate").boundingClientRect().exec((ret) => {
          if (ret) {
            this._rateBoxLeft = ret[0].left;
          }
        });
      }
    }
  };
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$5);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode(
        "view",
        {
          ref: "uni-rate",
          class: "uni-rate"
        },
        [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($options.stars, (star, index) => {
              return vue.openBlock(), vue.createElementBlock(
                "view",
                {
                  class: vue.normalizeClass(["uni-rate__icon", { "uni-cursor-not-allowed": $props.disabled }]),
                  style: vue.normalizeStyle({ "margin-right": $options.marginNumber + "px" }),
                  key: index,
                  onTouchstart: _cache[0] || (_cache[0] = vue.withModifiers((...args) => $options.touchstart && $options.touchstart(...args), ["stop"])),
                  onTouchmove: _cache[1] || (_cache[1] = vue.withModifiers((...args) => $options.touchmove && $options.touchmove(...args), ["stop"])),
                  onMousedown: _cache[2] || (_cache[2] = vue.withModifiers((...args) => $options.mousedown && $options.mousedown(...args), ["stop"])),
                  onMousemove: _cache[3] || (_cache[3] = vue.withModifiers((...args) => $options.mousemove && $options.mousemove(...args), ["stop"])),
                  onMouseleave: _cache[4] || (_cache[4] = (...args) => $options.mouseleave && $options.mouseleave(...args))
                },
                [
                  vue.createVNode(_component_uni_icons, {
                    color: $props.color,
                    size: $props.size,
                    type: $props.isFill ? "star-filled" : "star"
                  }, null, 8, ["color", "size", "type"]),
                  vue.createElementVNode(
                    "view",
                    {
                      style: vue.normalizeStyle({ width: star.activeWitch }),
                      class: "uni-rate__icon-on"
                    },
                    [
                      vue.createVNode(_component_uni_icons, {
                        color: $props.disabled ? $props.disabledColor : $props.activeColor,
                        size: $props.size,
                        type: "star-filled"
                      }, null, 8, ["color", "size"])
                    ],
                    4
                    /* STYLE */
                  )
                ],
                38
                /* CLASS, STYLE, HYDRATE_EVENTS */
              );
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ],
        512
        /* NEED_PATCH */
      )
    ]);
  }
  const __easycom_2$1 = /* @__PURE__ */ _export_sfc(_sfc_main$L, [["render", _sfc_render$a], ["__scopeId", "data-v-eff2699a"], ["__file", "C:/easyjob/easyjob-front/easyjob-app/node_modules/@dcloudio/uni-ui/lib/uni-rate/uni-rate.vue"]]);
  const _sfc_main$K = {
    __name: "QuestionItem",
    props: {
      data: {
        type: Object
      },
      showDetail: {
        type: Boolean,
        default: true
      },
      categoryId: {
        type: String
      }
    },
    setup(__props) {
      const props = __props;
      const { proxy } = vue.getCurrentInstance();
      const showDetailHandler = (data) => {
        if (!props.showDetail) {
          return;
        }
        let url = `/pages/question/QuestionDetail?questionId=${data.questionId}&categoryId=${props.categoryId || ""}`;
        uni.navigateTo({
          url
        });
      };
      return (_ctx, _cache) => {
        const _component_uni_rate = resolveEasycom(vue.resolveDynamicComponent("uni-rate"), __easycom_2$1);
        return vue.openBlock(), vue.createElementBlock("view", {
          class: "question-item",
          onClick: _cache[0] || (_cache[0] = ($event) => showDetailHandler(__props.data))
        }, [
          vue.createElementVNode("view", { class: "title-info" }, [
            vue.createElementVNode("text", { class: "title" }, [
              vue.createElementVNode("rich-text", {
                nodes: __props.data.title
              }, null, 8, ["nodes"])
            ])
          ]),
          vue.createElementVNode("view", { class: "difficulty" }, [
            vue.createVNode(_component_uni_rate, {
              readonly: true,
              size: "18",
              value: __props.data.difficultyLevel,
              activeColor: "#aa6bd9"
            }, null, 8, ["value"])
          ]),
          vue.createElementVNode("view", { class: "question-info" }, [
            vue.createElementVNode("view", { class: "user-info" }, [
              vue.createElementVNode("text", { class: "iconfont icon-use icon-data" }),
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString(__props.data.createUserName),
                1
                /* TEXT */
              ),
              vue.createElementVNode("text", { class: "dot" }),
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString(vue.unref(proxy).Utils.dateformat(__props.data.createTime)),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "read-count" }, [
              vue.createElementVNode("text", { class: "iconfont icon-eye icon-data" }),
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString(__props.data.readCount),
                1
                /* TEXT */
              )
            ])
          ])
        ]);
      };
    }
  };
  const QuestionItem = /* @__PURE__ */ _export_sfc(_sfc_main$K, [["__scopeId", "data-v-7f964f02"], ["__file", "C:/easyjob/easyjob-front/easyjob-app/src/pages/question/QuestionItem.vue"]]);
  const _sfc_main$J = {
    __name: "QuestionList",
    props: {
      showLeft: {
        type: Boolean,
        default: true
      }
    },
    setup(__props) {
      const { proxy } = vue.getCurrentInstance();
      const categoryInfo = vue.ref({
        categoryId: "0",
        categoryName: "全部分类"
      });
      const dataSrouce = vue.ref({});
      const loadStatus = vue.ref(null);
      const loadDataList = async () => {
        loadStatus.value = "loading";
        let result = await proxy.Request({
          url: proxy.Api.loadQuestion,
          showLoading: false,
          params: {
            categoryId: categoryInfo.value.categoryId,
            pageNo: dataSrouce.value.pageNo || 1
          }
        });
        if (!result) {
          return;
        }
        loadStatus.value = "more";
        dataSrouce.value = result.data;
      };
      loadDataList();
      const questionCategoryRef = vue.ref();
      const showCategory = () => {
        questionCategoryRef.value.show(categoryInfo.value);
      };
      const selectCategory = (category) => {
        categoryInfo.value = Object.assign({}, category);
        loadDataList();
      };
      onLoad((options) => {
        if (Object.keys(options).length > 0) {
          let { categoryId, categoryName } = options;
          categoryName = decodeURIComponent(categoryName);
          categoryInfo.value = {
            categoryId,
            categoryName
          };
        }
        loadDataList();
      });
      return (_ctx, _cache) => {
        const _component_Navbar = vue.resolveComponent("Navbar");
        const _component_DataList = vue.resolveComponent("DataList");
        return vue.openBlock(), vue.createElementBlock("view", null, [
          vue.createVNode(_component_Navbar, {
            showLeft: __props.showLeft,
            title: categoryInfo.value.categoryName
          }, {
            right: vue.withCtx(() => [
              vue.createElementVNode("view", {
                class: "iconfont icon-more-line",
                onClick: showCategory
              })
            ]),
            _: 1
            /* STABLE */
          }, 8, ["showLeft", "title"]),
          vue.createElementVNode("view", null, [
            vue.createElementVNode("view", { class: "question-list" }, [
              vue.createVNode(_component_DataList, {
                dataSource: dataSrouce.value,
                onLoadData: loadDataList,
                loadStatus: loadStatus.value
              }, {
                default: vue.withCtx(({ data }) => [
                  vue.createVNode(QuestionItem, {
                    data,
                    categoryId: categoryInfo.value.categoryId,
                    showDetail: true
                  }, null, 8, ["data", "categoryId"])
                ]),
                _: 1
                /* STABLE */
              }, 8, ["dataSource", "loadStatus"])
            ])
          ]),
          vue.createVNode(
            QuestionCategory,
            {
              ref_key: "questionCategoryRef",
              ref: questionCategoryRef,
              onSelect: selectCategory
            },
            null,
            512
            /* NEED_PATCH */
          )
        ]);
      };
    }
  };
  const PagesQuestionQuestionList = /* @__PURE__ */ _export_sfc(_sfc_main$J, [["__scopeId", "data-v-c3973b29"], ["__file", "C:/easyjob/easyjob-front/easyjob-app/src/pages/question/QuestionList.vue"]]);
  const _sfc_main$I = {
    __name: "QuestionIndex",
    setup(__props) {
      onReachBottom(() => {
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createBlock(PagesQuestionQuestionList, { showLeft: false });
      };
    }
  };
  const PagesQuestionQuestionIndex = /* @__PURE__ */ _export_sfc(_sfc_main$I, [["__file", "C:/easyjob/easyjob-front/easyjob-app/src/pages/question/QuestionIndex.vue"]]);
  const block0 = (Comp) => {
    (Comp.$wxs || (Comp.$wxs = [])).push("handler");
    (Comp.$wxsModules || (Comp.$wxsModules = {}))["handler"] = "0cd8c87f";
  };
  const _sfc_main$H = {
    name: "node",
    options: {},
    data() {
      return {
        ctrl: {}
      };
    },
    props: {
      name: String,
      attrs: {
        type: Object,
        default() {
          return {};
        }
      },
      childs: Array,
      opts: Array
    },
    components: {},
    mounted() {
      this.$nextTick(() => {
        for (this.root = this.$parent; this.root.$options.name !== "uv-parse"; this.root = this.root.$parent)
          ;
      });
      if (this.opts[0]) {
        let i2;
        for (i2 = this.childs.length; i2--; ) {
          if (this.childs[i2].name === "img")
            break;
        }
        if (i2 !== -1) {
          this.observer = uni.createIntersectionObserver(this).relativeToViewport({
            top: 500,
            bottom: 500
          });
          this.observer.observe("._img", (res) => {
            if (res.intersectionRatio) {
              this.$set(this.ctrl, "load", 1);
              this.observer.disconnect();
            }
          });
        }
      }
    },
    beforeDestroy() {
      if (this.observer) {
        this.observer.disconnect();
      }
    },
    methods: {
      /**
       * @description 播放视频事件
       * @param {Event} e
       */
      play(e) {
        this.root.$emit("play");
      },
      /**
       * @description 图片点击事件
       * @param {Event} e
       */
      imgTap(e) {
        const node2 = this.childs[e.currentTarget.dataset.i];
        if (node2.a) {
          this.linkTap(node2.a);
          return;
        }
        if (node2.attrs.ignore)
          return;
        node2.attrs.src = node2.attrs.src || node2.attrs["data-src"];
        this.root.$emit("imgtap", node2.attrs);
        if (this.root.previewImg) {
          uni.previewImage({
            current: parseInt(node2.attrs.i),
            urls: this.root.imgList
          });
        }
      },
      /**
       * @description 图片长按
       */
      imgLongTap(e) {
        const attrs = this.childs[e.currentTarget.dataset.i].attrs;
        if (this.opts[3] && !attrs.ignore) {
          uni.showActionSheet({
            itemList: ["保存图片"],
            success: () => {
              const save = (path) => {
                uni.saveImageToPhotosAlbum({
                  filePath: path,
                  success() {
                    uni.showToast({
                      title: "保存成功"
                    });
                  }
                });
              };
              if (this.root.imgList[attrs.i].startsWith("http")) {
                uni.downloadFile({
                  url: this.root.imgList[attrs.i],
                  success: (res) => save(res.tempFilePath)
                });
              } else {
                save(this.root.imgList[attrs.i]);
              }
            }
          });
        }
      },
      /**
       * @description 图片加载完成事件
       * @param {Event} e
       */
      imgLoad(e) {
        const i2 = e.currentTarget.dataset.i;
        if (!this.childs[i2].w) {
          this.$set(this.ctrl, i2, e.detail.width);
        } else if (this.opts[1] && !this.ctrl[i2] || this.ctrl[i2] === -1) {
          this.$set(this.ctrl, i2, 1);
        }
        this.checkReady();
      },
      /**
       * @description 检查是否所有图片加载完毕
       */
      checkReady() {
        if (this.root && !this.root.lazyLoad) {
          this.root._unloadimgs -= 1;
          if (!this.root._unloadimgs) {
            setTimeout(() => {
              this.root.getRect().then((rect) => {
                this.root.$emit("ready", rect);
              }).catch(() => {
                this.root.$emit("ready", {});
              });
            }, 350);
          }
        }
      },
      /**
       * @description 链接点击事件
       * @param {Event} e
       */
      linkTap(e) {
        const node2 = e.currentTarget ? this.childs[e.currentTarget.dataset.i] : {};
        const attrs = node2.attrs || e;
        const href = attrs.href;
        this.root.$emit("linktap", Object.assign({
          innerText: this.root.getText(node2.children || [])
          // 链接内的文本内容
        }, attrs));
        if (href) {
          if (href[0] === "#") {
            this.root.navigateTo(href.substring(1)).catch(() => {
            });
          } else if (href.split("?")[0].includes("://")) {
            if (this.root.copyLink) {
              plus.runtime.openWeb(href);
            }
          } else {
            uni.navigateTo({
              url: href,
              fail() {
                uni.switchTab({
                  url: href,
                  fail() {
                  }
                });
              }
            });
          }
        }
      },
      /**
       * @description 错误事件
       * @param {Event} e
       */
      mediaError(e) {
        const i2 = e.currentTarget.dataset.i;
        const node2 = this.childs[i2];
        if (node2.name === "video" || node2.name === "audio") {
          let index = (this.ctrl[i2] || 0) + 1;
          if (index > node2.src.length) {
            index = 0;
          }
          if (index < node2.src.length) {
            this.$set(this.ctrl, i2, index);
            return;
          }
        } else if (node2.name === "img") {
          if (this.opts[2]) {
            this.$set(this.ctrl, i2, -1);
          }
          this.checkReady();
        }
        if (this.root) {
          this.root.$emit("error", {
            source: node2.name,
            attrs: node2.attrs,
            errMsg: e.detail.errMsg
          });
        }
      }
    }
  };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_node = vue.resolveComponent("node", true);
    return vue.openBlock(), vue.createElementBlock("view", {
      id: $props.attrs.id,
      class: vue.normalizeClass("_block _" + $props.name + " " + $props.attrs.class),
      style: vue.normalizeStyle($props.attrs.style)
    }, [
      (vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList($props.childs, (n2, i2) => {
          return vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            { key: i2 },
            [
              vue.createCommentVNode(" 图片 "),
              vue.createCommentVNode(" 占位图 "),
              n2.name === "img" && !n2.t && ($props.opts[1] && !$data.ctrl[i2] || $data.ctrl[i2] < 0) ? (vue.openBlock(), vue.createElementBlock("image", {
                key: 0,
                class: "_img",
                style: vue.normalizeStyle(n2.attrs.style),
                src: $data.ctrl[i2] < 0 ? $props.opts[2] : $props.opts[1],
                mode: "widthFix"
              }, null, 12, ["src"])) : vue.createCommentVNode("v-if", true),
              vue.createCommentVNode(" 显示图片 "),
              vue.createCommentVNode(" 表格中的图片，使用 rich-text 防止大小不正确 "),
              n2.name === "img" && n2.t ? (vue.openBlock(), vue.createElementBlock("rich-text", {
                key: 1,
                style: vue.normalizeStyle("display:" + n2.t),
                nodes: [{ attrs: { style: n2.attrs.style, src: n2.attrs.src }, name: "img" }],
                "data-i": i2,
                onClick: _cache[0] || (_cache[0] = vue.withModifiers((...args) => $options.imgTap && $options.imgTap(...args), ["stop"]))
              }, null, 12, ["nodes", "data-i"])) : n2.name === "img" ? (vue.openBlock(), vue.createElementBlock("image", {
                key: 2,
                id: n2.attrs.id,
                class: vue.normalizeClass("_img " + n2.attrs.class),
                style: vue.normalizeStyle(($data.ctrl[i2] === -1 ? "display:none;" : "") + "width:" + ($data.ctrl[i2] || 1) + "px;" + n2.attrs.style),
                src: n2.attrs.src || ($data.ctrl.load ? n2.attrs["data-src"] : ""),
                mode: !n2.h ? "widthFix" : !n2.w ? "heightFix" : "",
                "data-i": i2,
                onLoad: _cache[1] || (_cache[1] = (...args) => $options.imgLoad && $options.imgLoad(...args)),
                onError: _cache[2] || (_cache[2] = (...args) => $options.mediaError && $options.mediaError(...args)),
                onClick: _cache[3] || (_cache[3] = vue.withModifiers((...args) => $options.imgTap && $options.imgTap(...args), ["stop"])),
                onLongpress: _cache[4] || (_cache[4] = (...args) => $options.imgLongTap && $options.imgLongTap(...args))
              }, null, 46, ["id", "src", "mode", "data-i"])) : n2.text ? (vue.openBlock(), vue.createElementBlock(
                vue.Fragment,
                { key: 3 },
                [
                  vue.createCommentVNode(" 文本 "),
                  vue.createElementVNode(
                    "text",
                    { decode: "" },
                    vue.toDisplayString(n2.text),
                    1
                    /* TEXT */
                  )
                ],
                2112
                /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
              )) : n2.name === "br" ? (vue.openBlock(), vue.createElementBlock("text", { key: 4 }, "\\n")) : n2.name === "a" ? (vue.openBlock(), vue.createElementBlock(
                vue.Fragment,
                { key: 5 },
                [
                  vue.createCommentVNode(" 链接 "),
                  vue.createElementVNode("view", {
                    id: n2.attrs.id,
                    class: vue.normalizeClass((n2.attrs.href ? "_a " : "") + n2.attrs.class),
                    "hover-class": "_hover",
                    style: vue.normalizeStyle("display:inline;" + n2.attrs.style),
                    "data-i": i2,
                    onClick: _cache[5] || (_cache[5] = vue.withModifiers((...args) => $options.linkTap && $options.linkTap(...args), ["stop"]))
                  }, [
                    vue.createVNode(_component_node, {
                      name: "span",
                      childs: n2.children,
                      opts: $props.opts,
                      style: { "display": "inherit" }
                    }, null, 8, ["childs", "opts"])
                  ], 14, ["id", "data-i"])
                ],
                2112
                /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
              )) : n2.html ? (vue.openBlock(), vue.createElementBlock(
                vue.Fragment,
                { key: 6 },
                [
                  vue.createCommentVNode(" 视频 "),
                  vue.createElementVNode("view", {
                    id: n2.attrs.id,
                    class: vue.normalizeClass("_video " + n2.attrs.class),
                    style: vue.normalizeStyle(n2.attrs.style),
                    innerHTML: n2.html,
                    onVplay: _cache[6] || (_cache[6] = vue.withModifiers((...args) => $options.play && $options.play(...args), ["stop"]))
                  }, null, 46, ["id", "innerHTML"])
                ],
                2112
                /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
              )) : n2.name === "iframe" ? (vue.openBlock(), vue.createElementBlock("iframe", {
                key: 7,
                style: vue.normalizeStyle(n2.attrs.style),
                allowfullscreen: n2.attrs.allowfullscreen,
                frameborder: n2.attrs.frameborder,
                src: n2.attrs.src
              }, null, 12, ["allowfullscreen", "frameborder", "src"])) : n2.name === "embed" ? (vue.openBlock(), vue.createElementBlock("embed", {
                key: 8,
                style: vue.normalizeStyle(n2.attrs.style),
                src: n2.attrs.src
              }, null, 12, ["src"])) : n2.name === "table" && n2.c || n2.name === "li" ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 9,
                id: n2.attrs.id,
                class: vue.normalizeClass("_" + n2.name + " " + n2.attrs.class),
                style: vue.normalizeStyle(n2.attrs.style)
              }, [
                n2.name === "li" ? (vue.openBlock(), vue.createBlock(_component_node, {
                  key: 0,
                  childs: n2.children,
                  opts: $props.opts
                }, null, 8, ["childs", "opts"])) : (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  { key: 1 },
                  vue.renderList(n2.children, (tbody, x2) => {
                    return vue.openBlock(), vue.createElementBlock(
                      "view",
                      {
                        key: x2,
                        class: vue.normalizeClass("_" + tbody.name + " " + tbody.attrs.class),
                        style: vue.normalizeStyle(tbody.attrs.style)
                      },
                      [
                        tbody.name === "td" || tbody.name === "th" ? (vue.openBlock(), vue.createBlock(_component_node, {
                          key: 0,
                          childs: tbody.children,
                          opts: $props.opts
                        }, null, 8, ["childs", "opts"])) : (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          { key: 1 },
                          vue.renderList(tbody.children, (tr, y2) => {
                            return vue.openBlock(), vue.createElementBlock(
                              vue.Fragment,
                              { key: y2 },
                              [
                                tr.name === "td" || tr.name === "th" ? (vue.openBlock(), vue.createElementBlock(
                                  "view",
                                  {
                                    key: 0,
                                    class: vue.normalizeClass("_" + tr.name + " " + tr.attrs.class),
                                    style: vue.normalizeStyle(tr.attrs.style)
                                  },
                                  [
                                    vue.createVNode(_component_node, {
                                      childs: tr.children,
                                      opts: $props.opts
                                    }, null, 8, ["childs", "opts"])
                                  ],
                                  6
                                  /* CLASS, STYLE */
                                )) : (vue.openBlock(), vue.createElementBlock(
                                  "view",
                                  {
                                    key: 1,
                                    class: vue.normalizeClass("_" + tr.name + " " + tr.attrs.class),
                                    style: vue.normalizeStyle(tr.attrs.style)
                                  },
                                  [
                                    (vue.openBlock(true), vue.createElementBlock(
                                      vue.Fragment,
                                      null,
                                      vue.renderList(tr.children, (td, z2) => {
                                        return vue.openBlock(), vue.createElementBlock(
                                          "view",
                                          {
                                            key: z2,
                                            class: vue.normalizeClass("_" + td.name + " " + td.attrs.class),
                                            style: vue.normalizeStyle(td.attrs.style)
                                          },
                                          [
                                            vue.createVNode(_component_node, {
                                              childs: td.children,
                                              opts: $props.opts
                                            }, null, 8, ["childs", "opts"])
                                          ],
                                          6
                                          /* CLASS, STYLE */
                                        );
                                      }),
                                      128
                                      /* KEYED_FRAGMENT */
                                    ))
                                  ],
                                  6
                                  /* CLASS, STYLE */
                                ))
                              ],
                              64
                              /* STABLE_FRAGMENT */
                            );
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ],
                      6
                      /* CLASS, STYLE */
                    );
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ], 14, ["id"])) : !n2.c ? (vue.openBlock(), vue.createElementBlock(
                vue.Fragment,
                { key: 10 },
                [
                  vue.createCommentVNode(" 富文本 "),
                  vue.createElementVNode("rich-text", {
                    id: n2.attrs.id,
                    style: vue.normalizeStyle("display:inline;" + n2.f),
                    preview: false,
                    selectable: $props.opts[4],
                    "user-select": $props.opts[4],
                    nodes: [n2]
                  }, null, 12, ["id", "selectable", "user-select", "nodes"])
                ],
                2112
                /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
              )) : n2.c === 2 ? (vue.openBlock(), vue.createElementBlock(
                vue.Fragment,
                { key: 11 },
                [
                  vue.createCommentVNode(" 继续递归 "),
                  vue.createElementVNode("view", {
                    id: n2.attrs.id,
                    class: vue.normalizeClass("_block _" + n2.name + " " + n2.attrs.class),
                    style: vue.normalizeStyle(n2.f + ";" + n2.attrs.style)
                  }, [
                    (vue.openBlock(true), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList(n2.children, (n22, j2) => {
                        return vue.openBlock(), vue.createBlock(_component_node, {
                          key: j2,
                          style: vue.normalizeStyle(n22.f),
                          name: n22.name,
                          attrs: n22.attrs,
                          childs: n22.children,
                          opts: $props.opts
                        }, null, 8, ["style", "name", "attrs", "childs", "opts"]);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ], 14, ["id"])
                ],
                2112
                /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
              )) : (vue.openBlock(), vue.createBlock(_component_node, {
                key: 12,
                style: vue.normalizeStyle(n2.f),
                name: n2.name,
                attrs: n2.attrs,
                childs: n2.children,
                opts: $props.opts
              }, null, 8, ["style", "name", "attrs", "childs", "opts"]))
            ],
            64
            /* STABLE_FRAGMENT */
          );
        }),
        128
        /* KEYED_FRAGMENT */
      ))
    ], 14, ["id"]);
  }
  if (typeof block0 === "function")
    block0(_sfc_main$H);
  const node = /* @__PURE__ */ _export_sfc(_sfc_main$H, [["render", _sfc_render$9], ["__scopeId", "data-v-92bb29ca"], ["__file", "C:/easyjob/easyjob-front/easyjob-app/src/pages/components/uv-parse/components/uv-parse/node/node.vue"]]);
  const config = {
    // 信任的标签（保持标签名不变）
    trustTags: makeMap("a,abbr,ad,audio,b,blockquote,br,code,col,colgroup,dd,del,dl,dt,div,em,fieldset,h1,h2,h3,h4,h5,h6,hr,i,img,ins,label,legend,li,ol,p,q,ruby,rt,source,span,strong,sub,sup,table,tbody,td,tfoot,th,thead,tr,title,ul,video"),
    // 块级标签（转为 div，其他的非信任标签转为 span）
    blockTags: makeMap("address,article,aside,body,caption,center,cite,footer,header,html,nav,pre,section"),
    // 行内标签
    inlineTags: makeMap("abbr,b,big,code,del,em,i,ins,label,q,small,span,strong,sub,sup"),
    // 要移除的标签
    ignoreTags: makeMap("area,base,canvas,embed,frame,head,iframe,input,link,map,meta,param,rp,script,source,style,textarea,title,track,wbr"),
    // 自闭合的标签
    voidTags: makeMap("area,base,br,col,circle,ellipse,embed,frame,hr,img,input,line,link,meta,param,path,polygon,rect,source,track,use,wbr"),
    // html 实体
    entities: {
      lt: "<",
      gt: ">",
      quot: '"',
      apos: "'",
      ensp: " ",
      emsp: " ",
      nbsp: " ",
      semi: ";",
      ndash: "–",
      mdash: "—",
      middot: "·",
      lsquo: "‘",
      rsquo: "’",
      ldquo: "“",
      rdquo: "”",
      bull: "•",
      hellip: "…",
      larr: "←",
      uarr: "↑",
      rarr: "→",
      darr: "↓"
    },
    // 默认的标签样式
    tagStyle: {
      address: "font-style:italic",
      big: "display:inline;font-size:1.2em",
      caption: "display:table-caption;text-align:center",
      center: "text-align:center",
      cite: "font-style:italic",
      dd: "margin-left:40px",
      mark: "background-color:yellow",
      pre: "font-family:monospace;white-space:pre",
      s: "text-decoration:line-through",
      small: "display:inline;font-size:0.8em",
      strike: "text-decoration:line-through",
      u: "text-decoration:underline"
    },
    // svg 大小写对照表
    svgDict: {
      animatetransform: "animateTransform",
      lineargradient: "linearGradient",
      viewbox: "viewBox",
      attributename: "attributeName",
      repeatcount: "repeatCount",
      repeatdur: "repeatDur"
    }
  };
  const tagSelector = {};
  const {
    windowWidth
  } = uni.getSystemInfoSync();
  const blankChar = makeMap(" ,\r,\n,	,\f");
  let idIndex = 0;
  config.ignoreTags.iframe = void 0;
  config.trustTags.iframe = true;
  config.ignoreTags.embed = void 0;
  config.trustTags.embed = true;
  function makeMap(str) {
    const map = /* @__PURE__ */ Object.create(null);
    const list = str.split(",");
    for (let i2 = list.length; i2--; ) {
      map[list[i2]] = true;
    }
    return map;
  }
  function decodeEntity(str, amp) {
    let i2 = str.indexOf("&");
    while (i2 !== -1) {
      const j2 = str.indexOf(";", i2 + 3);
      let code;
      if (j2 === -1)
        break;
      if (str[i2 + 1] === "#") {
        code = parseInt((str[i2 + 2] === "x" ? "0" : "") + str.substring(i2 + 2, j2));
        if (!isNaN(code)) {
          str = str.substr(0, i2) + String.fromCharCode(code) + str.substr(j2 + 1);
        }
      } else {
        code = str.substring(i2 + 1, j2);
        if (config.entities[code] || code === "amp" && amp) {
          str = str.substr(0, i2) + (config.entities[code] || "&") + str.substr(j2 + 1);
        }
      }
      i2 = str.indexOf("&", i2 + 1);
    }
    return str;
  }
  function mergeNodes(nodes) {
    let i2 = nodes.length - 1;
    for (let j2 = i2; j2 >= -1; j2--) {
      if (j2 === -1 || nodes[j2].c || !nodes[j2].name || nodes[j2].name !== "div" && nodes[j2].name !== "p" && nodes[j2].name[0] !== "h" || (nodes[j2].attrs.style || "").includes("inline")) {
        if (i2 - j2 >= 5) {
          nodes.splice(j2 + 1, i2 - j2, {
            name: "div",
            attrs: {},
            children: nodes.slice(j2 + 1, i2 + 1)
          });
        }
        i2 = j2 - 1;
      }
    }
  }
  function Parser(vm) {
    this.options = vm || {};
    this.tagStyle = Object.assign({}, config.tagStyle, this.options.tagStyle);
    this.imgList = vm.imgList || [];
    this.imgList._unloadimgs = 0;
    this.plugins = vm.plugins || [];
    this.attrs = /* @__PURE__ */ Object.create(null);
    this.stack = [];
    this.nodes = [];
    this.pre = (this.options.containerStyle || "").includes("white-space") && this.options.containerStyle.includes("pre") ? 2 : 0;
  }
  Parser.prototype.parse = function(content) {
    for (let i2 = this.plugins.length; i2--; ) {
      if (this.plugins[i2].onUpdate) {
        content = this.plugins[i2].onUpdate(content, config) || content;
      }
    }
    new Lexer(this).parse(content);
    while (this.stack.length) {
      this.popNode();
    }
    if (this.nodes.length > 50) {
      mergeNodes(this.nodes);
    }
    return this.nodes;
  };
  Parser.prototype.expose = function() {
    for (let i2 = this.stack.length; i2--; ) {
      const item = this.stack[i2];
      if (item.c || item.name === "a" || item.name === "video" || item.name === "audio")
        return;
      item.c = 1;
    }
  };
  Parser.prototype.hook = function(node2) {
    for (let i2 = this.plugins.length; i2--; ) {
      if (this.plugins[i2].onParse && this.plugins[i2].onParse(node2, this) === false) {
        return false;
      }
    }
    return true;
  };
  Parser.prototype.getUrl = function(url) {
    const domain = this.options.domain;
    if (url[0] === "/") {
      if (url[1] === "/") {
        url = (domain ? domain.split("://")[0] : "http") + ":" + url;
      } else if (domain) {
        url = domain + url;
      } else {
        url = plus.io.convertLocalFileSystemURL(url);
      }
    } else if (!url.includes("data:") && !url.includes("://")) {
      if (domain) {
        url = domain + "/" + url;
      } else {
        url = plus.io.convertLocalFileSystemURL(url);
      }
    }
    return url;
  };
  Parser.prototype.parseStyle = function(node2) {
    const attrs = node2.attrs;
    const list = (this.tagStyle[node2.name] || "").split(";").concat((attrs.style || "").split(";"));
    const styleObj = {};
    let tmp = "";
    if (attrs.id && !this.xml) {
      if (this.options.useAnchor) {
        this.expose();
      } else if (node2.name !== "img" && node2.name !== "a" && node2.name !== "video" && node2.name !== "audio") {
        attrs.id = void 0;
      }
    }
    if (attrs.width) {
      styleObj.width = parseFloat(attrs.width) + (attrs.width.includes("%") ? "%" : "px");
      attrs.width = void 0;
    }
    if (attrs.height) {
      styleObj.height = parseFloat(attrs.height) + (attrs.height.includes("%") ? "%" : "px");
      attrs.height = void 0;
    }
    for (let i2 = 0, len = list.length; i2 < len; i2++) {
      const info = list[i2].split(":");
      if (info.length < 2)
        continue;
      const key = info.shift().trim().toLowerCase();
      let value = info.join(":").trim();
      if (value[0] === "-" && value.lastIndexOf("-") > 0 || value.includes("safe")) {
        tmp += `;${key}:${value}`;
      } else if (!styleObj[key] || value.includes("import") || !styleObj[key].includes("import")) {
        if (value.includes("url")) {
          let j2 = value.indexOf("(") + 1;
          if (j2) {
            while (value[j2] === '"' || value[j2] === "'" || blankChar[value[j2]]) {
              j2++;
            }
            value = value.substr(0, j2) + this.getUrl(value.substr(j2));
          }
        } else if (value.includes("rpx")) {
          value = value.replace(/[0-9.]+\s*rpx/g, ($2) => parseFloat($2) * windowWidth / 750 + "px");
        }
        styleObj[key] = value;
      }
    }
    node2.attrs.style = tmp;
    return styleObj;
  };
  Parser.prototype.onTagName = function(name) {
    this.tagName = this.xml ? name : name.toLowerCase();
    if (this.tagName === "svg") {
      this.xml = (this.xml || 0) + 1;
      config.ignoreTags.style = void 0;
    }
  };
  Parser.prototype.onAttrName = function(name) {
    name = this.xml ? name : name.toLowerCase();
    if (name.substr(0, 5) === "data-") {
      if (name === "data-src" && !this.attrs.src) {
        this.attrName = "src";
      } else if (this.tagName === "img" || this.tagName === "a") {
        this.attrName = name;
      } else {
        this.attrName = void 0;
      }
    } else {
      this.attrName = name;
      this.attrs[name] = "T";
    }
  };
  Parser.prototype.onAttrVal = function(val) {
    const name = this.attrName || "";
    if (name === "style" || name === "href") {
      this.attrs[name] = decodeEntity(val, true);
    } else if (name.includes("src")) {
      this.attrs[name] = this.getUrl(decodeEntity(val, true));
    } else if (name) {
      this.attrs[name] = val;
    }
  };
  Parser.prototype.onOpenTag = function(selfClose) {
    const node2 = /* @__PURE__ */ Object.create(null);
    node2.name = this.tagName;
    node2.attrs = this.attrs;
    if (this.options.nodes.length) {
      node2.type = "node";
    }
    this.attrs = /* @__PURE__ */ Object.create(null);
    const attrs = node2.attrs;
    const parent = this.stack[this.stack.length - 1];
    const siblings = parent ? parent.children : this.nodes;
    const close = this.xml ? selfClose : config.voidTags[node2.name];
    if (tagSelector[node2.name]) {
      attrs.class = tagSelector[node2.name] + (attrs.class ? " " + attrs.class : "");
    }
    if (node2.name === "embed") {
      this.expose();
    }
    if (node2.name === "video" || node2.name === "audio") {
      if (node2.name === "video" && !attrs.id) {
        attrs.id = "v" + idIndex++;
      }
      if (!attrs.controls && !attrs.autoplay) {
        attrs.controls = "T";
      }
      node2.src = [];
      if (attrs.src) {
        node2.src.push(attrs.src);
        attrs.src = void 0;
      }
      this.expose();
    }
    if (close) {
      if (!this.hook(node2) || config.ignoreTags[node2.name]) {
        if (node2.name === "base" && !this.options.domain) {
          this.options.domain = attrs.href;
        } else if (node2.name === "source" && parent && (parent.name === "video" || parent.name === "audio") && attrs.src) {
          parent.src.push(attrs.src);
        }
        return;
      }
      const styleObj = this.parseStyle(node2);
      if (node2.name === "img") {
        if (attrs.src) {
          if (attrs.src.includes("webp")) {
            node2.webp = "T";
          }
          if (attrs.src.includes("data:") && !attrs["original-src"]) {
            attrs.ignore = "T";
          }
          if (!attrs.ignore || node2.webp || attrs.src.includes("cloud://")) {
            for (let i2 = this.stack.length; i2--; ) {
              const item = this.stack[i2];
              if (item.name === "a") {
                node2.a = item.attrs;
              }
              if (item.name === "table" && !node2.webp && !attrs.src.includes("cloud://")) {
                if (!styleObj.display || styleObj.display.includes("inline")) {
                  node2.t = "inline-block";
                } else {
                  node2.t = styleObj.display;
                }
                styleObj.display = void 0;
              }
              item.c = 1;
            }
            attrs.i = this.imgList.length.toString();
            let src = attrs["original-src"] || attrs.src;
            this.imgList.push(src);
            if (!node2.t) {
              this.imgList._unloadimgs += 1;
            }
            if (this.options.lazyLoad) {
              attrs["data-src"] = attrs.src;
              attrs.src = void 0;
            }
          }
        }
        if (styleObj.display === "inline") {
          styleObj.display = "";
        }
        if (attrs.ignore) {
          styleObj["max-width"] = styleObj["max-width"] || "100%";
          attrs.style += ";-webkit-touch-callout:none";
        }
        if (parseInt(styleObj.width) > windowWidth) {
          styleObj.height = void 0;
        }
        if (!isNaN(parseInt(styleObj.width))) {
          node2.w = "T";
        }
        if (!isNaN(parseInt(styleObj.height)) && (!styleObj.height.includes("%") || parent && (parent.attrs.style || "").includes("height"))) {
          node2.h = "T";
        }
      } else if (node2.name === "svg") {
        siblings.push(node2);
        this.stack.push(node2);
        this.popNode();
        return;
      }
      for (const key in styleObj) {
        if (styleObj[key]) {
          attrs.style += `;${key}:${styleObj[key].replace(" !important", "")}`;
        }
      }
      attrs.style = attrs.style.substr(1) || void 0;
    } else {
      if ((node2.name === "pre" || (attrs.style || "").includes("white-space") && attrs.style.includes("pre")) && this.pre !== 2) {
        this.pre = node2.pre = 1;
      }
      node2.children = [];
      this.stack.push(node2);
    }
    siblings.push(node2);
  };
  Parser.prototype.onCloseTag = function(name) {
    name = this.xml ? name : name.toLowerCase();
    let i2;
    for (i2 = this.stack.length; i2--; ) {
      if (this.stack[i2].name === name)
        break;
    }
    if (i2 !== -1) {
      while (this.stack.length > i2) {
        this.popNode();
      }
    } else if (name === "p" || name === "br") {
      const siblings = this.stack.length ? this.stack[this.stack.length - 1].children : this.nodes;
      siblings.push({
        name,
        attrs: {
          class: tagSelector[name] || "",
          style: this.tagStyle[name] || ""
        }
      });
    }
  };
  Parser.prototype.popNode = function() {
    const node2 = this.stack.pop();
    let attrs = node2.attrs;
    const children = node2.children;
    const parent = this.stack[this.stack.length - 1];
    const siblings = parent ? parent.children : this.nodes;
    if (!this.hook(node2) || config.ignoreTags[node2.name]) {
      if (node2.name === "title" && children.length && children[0].type === "text" && this.options.setTitle) {
        uni.setNavigationBarTitle({
          title: children[0].text
        });
      }
      siblings.pop();
      return;
    }
    if (node2.pre && this.pre !== 2) {
      this.pre = node2.pre = void 0;
      for (let i2 = this.stack.length; i2--; ) {
        if (this.stack[i2].pre) {
          this.pre = 1;
        }
      }
    }
    const styleObj = {};
    if (node2.name === "svg") {
      if (this.xml > 1) {
        this.xml--;
        return;
      }
      let src = "";
      const style = attrs.style;
      attrs.style = "";
      attrs.xmlns = "http://www.w3.org/2000/svg";
      (function traversal(node3) {
        if (node3.type === "text") {
          src += node3.text;
          return;
        }
        const name = config.svgDict[node3.name] || node3.name;
        src += "<" + name;
        for (const item in node3.attrs) {
          const val = node3.attrs[item];
          if (val) {
            src += ` ${config.svgDict[item] || item}="${val}"`;
          }
        }
        if (!node3.children) {
          src += "/>";
        } else {
          src += ">";
          for (let i2 = 0; i2 < node3.children.length; i2++) {
            traversal(node3.children[i2]);
          }
          src += "</" + name + ">";
        }
      })(node2);
      node2.name = "img";
      node2.attrs = {
        src: "data:image/svg+xml;utf8," + src.replace(/#/g, "%23"),
        style,
        ignore: "T"
      };
      node2.children = void 0;
      this.xml = false;
      config.ignoreTags.style = true;
      return;
    }
    if (attrs.align) {
      if (node2.name === "table") {
        if (attrs.align === "center") {
          styleObj["margin-inline-start"] = styleObj["margin-inline-end"] = "auto";
        } else {
          styleObj.float = attrs.align;
        }
      } else {
        styleObj["text-align"] = attrs.align;
      }
      attrs.align = void 0;
    }
    if (attrs.dir) {
      styleObj.direction = attrs.dir;
      attrs.dir = void 0;
    }
    if (node2.name === "font") {
      if (attrs.color) {
        styleObj.color = attrs.color;
        attrs.color = void 0;
      }
      if (attrs.face) {
        styleObj["font-family"] = attrs.face;
        attrs.face = void 0;
      }
      if (attrs.size) {
        let size = parseInt(attrs.size);
        if (!isNaN(size)) {
          if (size < 1) {
            size = 1;
          } else if (size > 7) {
            size = 7;
          }
          styleObj["font-size"] = ["x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large"][size - 1];
        }
        attrs.size = void 0;
      }
    }
    if ((attrs.class || "").includes("align-center")) {
      styleObj["text-align"] = "center";
    }
    Object.assign(styleObj, this.parseStyle(node2));
    if (node2.name !== "table" && parseInt(styleObj.width) > windowWidth) {
      styleObj["max-width"] = "100%";
      styleObj["box-sizing"] = "border-box";
    }
    if (config.blockTags[node2.name]) {
      node2.name = "div";
    } else if (!config.trustTags[node2.name] && !this.xml) {
      node2.name = "span";
    }
    if (node2.name === "a" || node2.name === "ad" || node2.name === "iframe") {
      this.expose();
    } else if (node2.name === "video") {
      if ((styleObj.height || "").includes("auto")) {
        styleObj.height = void 0;
      }
      let str = '<video style="width:100%;height:100%"';
      for (const item in attrs) {
        if (attrs[item]) {
          str += " " + item + '="' + attrs[item] + '"';
        }
      }
      if (this.options.pauseVideo) {
        str += ` onplay="this.dispatchEvent(new CustomEvent('vplay',{bubbles:!0}));for(var e=document.getElementsByTagName('video'),t=0;t<e.length;t++)e[t]!=this&&e[t].pause()"`;
      }
      str += ">";
      for (let i2 = 0; i2 < node2.src.length; i2++) {
        str += '<source src="' + node2.src[i2] + '">';
      }
      str += "</video>";
      node2.html = str;
    } else if ((node2.name === "ul" || node2.name === "ol") && node2.c) {
      const types2 = {
        a: "lower-alpha",
        A: "upper-alpha",
        i: "lower-roman",
        I: "upper-roman"
      };
      if (types2[attrs.type]) {
        attrs.style += ";list-style-type:" + types2[attrs.type];
        attrs.type = void 0;
      }
      for (let i2 = children.length; i2--; ) {
        if (children[i2].name === "li") {
          children[i2].c = 1;
        }
      }
    } else if (node2.name === "table") {
      let padding = parseFloat(attrs.cellpadding);
      let spacing = parseFloat(attrs.cellspacing);
      const border = parseFloat(attrs.border);
      const bordercolor = styleObj["border-color"];
      const borderstyle = styleObj["border-style"];
      if (node2.c) {
        if (isNaN(padding)) {
          padding = 2;
        }
        if (isNaN(spacing)) {
          spacing = 2;
        }
      }
      if (border) {
        attrs.style += `;border:${border}px ${borderstyle || "solid"} ${bordercolor || "gray"}`;
      }
      if (node2.flag && node2.c) {
        styleObj.display = "grid";
        if (spacing) {
          styleObj["grid-gap"] = spacing + "px";
          styleObj.padding = spacing + "px";
        } else if (border) {
          attrs.style += ";border-left:0;border-top:0";
        }
        const width = [];
        const trList = [];
        const cells = [];
        const map = {};
        (function traversal(nodes) {
          for (let i2 = 0; i2 < nodes.length; i2++) {
            if (nodes[i2].name === "tr") {
              trList.push(nodes[i2]);
            } else {
              traversal(nodes[i2].children || []);
            }
          }
        })(children);
        for (let row = 1; row <= trList.length; row++) {
          let col = 1;
          for (let j2 = 0; j2 < trList[row - 1].children.length; j2++) {
            const td = trList[row - 1].children[j2];
            if (td.name === "td" || td.name === "th") {
              while (map[row + "." + col]) {
                col++;
              }
              let style = td.attrs.style || "";
              let start = style.indexOf("width") ? style.indexOf(";width") : 0;
              if (start !== -1) {
                let end = style.indexOf(";", start + 6);
                if (end === -1) {
                  end = style.length;
                }
                if (!td.attrs.colspan) {
                  width[col] = style.substring(start ? start + 7 : 6, end);
                }
                style = style.substr(0, start) + style.substr(end);
              }
              style += ";display:flex";
              start = style.indexOf("vertical-align");
              if (start !== -1) {
                const val = style.substr(start + 15, 10);
                if (val.includes("middle")) {
                  style += ";align-items:center";
                } else if (val.includes("bottom")) {
                  style += ";align-items:flex-end";
                }
              } else {
                style += ";align-items:center";
              }
              start = style.indexOf("text-align");
              if (start !== -1) {
                const val = style.substr(start + 11, 10);
                if (val.includes("center")) {
                  style += ";justify-content: center";
                } else if (val.includes("right")) {
                  style += ";justify-content: right";
                }
              }
              style = (border ? `;border:${border}px ${borderstyle || "solid"} ${bordercolor || "gray"}` + (spacing ? "" : ";border-right:0;border-bottom:0") : "") + (padding ? `;padding:${padding}px` : "") + ";" + style;
              if (td.attrs.colspan) {
                style += `;grid-column-start:${col};grid-column-end:${col + parseInt(td.attrs.colspan)}`;
                if (!td.attrs.rowspan) {
                  style += `;grid-row-start:${row};grid-row-end:${row + 1}`;
                }
                col += parseInt(td.attrs.colspan) - 1;
              }
              if (td.attrs.rowspan) {
                style += `;grid-row-start:${row};grid-row-end:${row + parseInt(td.attrs.rowspan)}`;
                if (!td.attrs.colspan) {
                  style += `;grid-column-start:${col};grid-column-end:${col + 1}`;
                }
                for (let rowspan = 1; rowspan < td.attrs.rowspan; rowspan++) {
                  for (let colspan = 0; colspan < (td.attrs.colspan || 1); colspan++) {
                    map[row + rowspan + "." + (col - colspan)] = 1;
                  }
                }
              }
              if (style) {
                td.attrs.style = style;
              }
              cells.push(td);
              col++;
            }
          }
          if (row === 1) {
            let temp = "";
            for (let i2 = 1; i2 < col; i2++) {
              temp += (width[i2] ? width[i2] : "auto") + " ";
            }
            styleObj["grid-template-columns"] = temp;
          }
        }
        node2.children = cells;
      } else {
        if (node2.c) {
          styleObj.display = "table";
        }
        if (!isNaN(spacing)) {
          styleObj["border-spacing"] = spacing + "px";
        }
        if (border || padding) {
          (function traversal(nodes) {
            for (let i2 = 0; i2 < nodes.length; i2++) {
              const td = nodes[i2];
              if (td.name === "th" || td.name === "td") {
                if (border) {
                  td.attrs.style = `border:${border}px ${borderstyle || "solid"} ${bordercolor || "gray"};${td.attrs.style || ""}`;
                }
                if (padding) {
                  td.attrs.style = `padding:${padding}px;${td.attrs.style || ""}`;
                }
              } else if (td.children) {
                traversal(td.children);
              }
            }
          })(children);
        }
      }
      if (this.options.scrollTable && !(attrs.style || "").includes("inline")) {
        const table = Object.assign({}, node2);
        node2.name = "div";
        node2.attrs = {
          style: "overflow:auto"
        };
        node2.children = [table];
        attrs = table.attrs;
      }
    } else if ((node2.name === "td" || node2.name === "th") && (attrs.colspan || attrs.rowspan)) {
      for (let i2 = this.stack.length; i2--; ) {
        if (this.stack[i2].name === "table") {
          this.stack[i2].flag = 1;
          break;
        }
      }
    } else if (node2.name === "ruby") {
      node2.name = "span";
      for (let i2 = 0; i2 < children.length - 1; i2++) {
        if (children[i2].type === "text" && children[i2 + 1].name === "rt") {
          children[i2] = {
            name: "div",
            attrs: {
              style: "display:inline-block;text-align:center"
            },
            children: [{
              name: "div",
              attrs: {
                style: "font-size:50%;" + (children[i2 + 1].attrs.style || "")
              },
              children: children[i2 + 1].children
            }, children[i2]]
          };
          children.splice(i2 + 1, 1);
        }
      }
    } else if (node2.c) {
      (function traversal(node3) {
        node3.c = 2;
        for (let i2 = node3.children.length; i2--; ) {
          const child = node3.children[i2];
          if (child.name && (config.inlineTags[child.name] || (child.attrs.style || "").includes("inline") && child.children) && !child.c) {
            traversal(child);
          }
          if (!child.c || child.name === "table") {
            node3.c = 1;
          }
        }
      })(node2);
    }
    if ((styleObj.display || "").includes("flex") && !node2.c) {
      for (let i2 = children.length; i2--; ) {
        const item = children[i2];
        if (item.f) {
          item.attrs.style = (item.attrs.style || "") + item.f;
          item.f = void 0;
        }
      }
    }
    const flex = parent && ((parent.attrs.style || "").includes("flex") || (parent.attrs.style || "").includes("grid")) && !node2.c;
    if (flex) {
      node2.f = ";max-width:100%";
    }
    if (children.length >= 50 && node2.c && !(styleObj.display || "").includes("flex")) {
      mergeNodes(children);
    }
    for (const key in styleObj) {
      if (styleObj[key]) {
        const val = `;${key}:${styleObj[key].replace(" !important", "")}`;
        if (flex && (key.includes("flex") && key !== "flex-direction" || key === "align-self" || key.includes("grid") || styleObj[key][0] === "-" || key.includes("width") && val.includes("%"))) {
          node2.f += val;
          if (key === "width") {
            attrs.style += ";width:100%";
          }
        } else {
          attrs.style += val;
        }
      }
    }
    attrs.style = attrs.style.substr(1) || void 0;
  };
  Parser.prototype.onText = function(text) {
    if (!this.pre) {
      let trim = "";
      let flag;
      for (let i2 = 0, len = text.length; i2 < len; i2++) {
        if (!blankChar[text[i2]]) {
          trim += text[i2];
        } else {
          if (trim[trim.length - 1] !== " ") {
            trim += " ";
          }
          if (text[i2] === "\n" && !flag) {
            flag = true;
          }
        }
      }
      if (trim === " ") {
        if (flag)
          return;
        else {
          const parent = this.stack[this.stack.length - 1];
          if (parent && parent.name[0] === "t")
            return;
        }
      }
      text = trim;
    }
    const node2 = /* @__PURE__ */ Object.create(null);
    node2.type = "text";
    node2.text = decodeEntity(text);
    if (this.hook(node2)) {
      const siblings = this.stack.length ? this.stack[this.stack.length - 1].children : this.nodes;
      siblings.push(node2);
    }
  };
  function Lexer(handler) {
    this.handler = handler;
  }
  Lexer.prototype.parse = function(content) {
    this.content = content || "";
    this.i = 0;
    this.start = 0;
    this.state = this.text;
    for (let len = this.content.length; this.i !== -1 && this.i < len; ) {
      this.state();
    }
  };
  Lexer.prototype.checkClose = function(method) {
    const selfClose = this.content[this.i] === "/";
    if (this.content[this.i] === ">" || selfClose && this.content[this.i + 1] === ">") {
      if (method) {
        this.handler[method](this.content.substring(this.start, this.i));
      }
      this.i += selfClose ? 2 : 1;
      this.start = this.i;
      this.handler.onOpenTag(selfClose);
      if (this.handler.tagName === "script") {
        this.i = this.content.indexOf("</", this.i);
        if (this.i !== -1) {
          this.i += 2;
          this.start = this.i;
        }
        this.state = this.endTag;
      } else {
        this.state = this.text;
      }
      return true;
    }
    return false;
  };
  Lexer.prototype.text = function() {
    this.i = this.content.indexOf("<", this.i);
    if (this.i === -1) {
      if (this.start < this.content.length) {
        this.handler.onText(this.content.substring(this.start, this.content.length));
      }
      return;
    }
    const c2 = this.content[this.i + 1];
    if (c2 >= "a" && c2 <= "z" || c2 >= "A" && c2 <= "Z") {
      if (this.start !== this.i) {
        this.handler.onText(this.content.substring(this.start, this.i));
      }
      this.start = ++this.i;
      this.state = this.tagName;
    } else if (c2 === "/" || c2 === "!" || c2 === "?") {
      if (this.start !== this.i) {
        this.handler.onText(this.content.substring(this.start, this.i));
      }
      const next = this.content[this.i + 2];
      if (c2 === "/" && (next >= "a" && next <= "z" || next >= "A" && next <= "Z")) {
        this.i += 2;
        this.start = this.i;
        this.state = this.endTag;
        return;
      }
      let end = "-->";
      if (c2 !== "!" || this.content[this.i + 2] !== "-" || this.content[this.i + 3] !== "-") {
        end = ">";
      }
      this.i = this.content.indexOf(end, this.i);
      if (this.i !== -1) {
        this.i += end.length;
        this.start = this.i;
      }
    } else {
      this.i++;
    }
  };
  Lexer.prototype.tagName = function() {
    if (blankChar[this.content[this.i]]) {
      this.handler.onTagName(this.content.substring(this.start, this.i));
      while (blankChar[this.content[++this.i]])
        ;
      if (this.i < this.content.length && !this.checkClose()) {
        this.start = this.i;
        this.state = this.attrName;
      }
    } else if (!this.checkClose("onTagName")) {
      this.i++;
    }
  };
  Lexer.prototype.attrName = function() {
    let c2 = this.content[this.i];
    if (blankChar[c2] || c2 === "=") {
      this.handler.onAttrName(this.content.substring(this.start, this.i));
      let needVal = c2 === "=";
      const len = this.content.length;
      while (++this.i < len) {
        c2 = this.content[this.i];
        if (!blankChar[c2]) {
          if (this.checkClose())
            return;
          if (needVal) {
            this.start = this.i;
            this.state = this.attrVal;
            return;
          }
          if (this.content[this.i] === "=") {
            needVal = true;
          } else {
            this.start = this.i;
            this.state = this.attrName;
            return;
          }
        }
      }
    } else if (!this.checkClose("onAttrName")) {
      this.i++;
    }
  };
  Lexer.prototype.attrVal = function() {
    const c2 = this.content[this.i];
    const len = this.content.length;
    if (c2 === '"' || c2 === "'") {
      this.start = ++this.i;
      this.i = this.content.indexOf(c2, this.i);
      if (this.i === -1)
        return;
      this.handler.onAttrVal(this.content.substring(this.start, this.i));
    } else {
      for (; this.i < len; this.i++) {
        if (blankChar[this.content[this.i]]) {
          this.handler.onAttrVal(this.content.substring(this.start, this.i));
          break;
        } else if (this.checkClose("onAttrVal"))
          return;
      }
    }
    while (blankChar[this.content[++this.i]])
      ;
    if (this.i < len && !this.checkClose()) {
      this.start = this.i;
      this.state = this.attrName;
    }
  };
  Lexer.prototype.endTag = function() {
    const c2 = this.content[this.i];
    if (blankChar[c2] || c2 === ">" || c2 === "/") {
      this.handler.onCloseTag(this.content.substring(this.start, this.i));
      if (c2 !== ">") {
        this.i = this.content.indexOf(">", this.i);
        if (this.i === -1)
          return;
      }
      this.start = ++this.i;
      this.state = this.text;
    } else {
      this.i++;
    }
  };
  const plugins = [];
  const _sfc_main$G = {
    name: "uv-parse",
    data() {
      return {
        nodes: []
      };
    },
    props: {
      containerStyle: {
        type: String,
        default: ""
      },
      content: {
        type: String,
        default: ""
      },
      copyLink: {
        type: [Boolean, String],
        default: true
      },
      domain: String,
      errorImg: {
        type: String,
        default: ""
      },
      lazyLoad: {
        type: [Boolean, String],
        default: false
      },
      loadingImg: {
        type: String,
        default: ""
      },
      pauseVideo: {
        type: [Boolean, String],
        default: true
      },
      previewImg: {
        type: [Boolean, String],
        default: true
      },
      scrollTable: [Boolean, String],
      selectable: [Boolean, String],
      setTitle: {
        type: [Boolean, String],
        default: true
      },
      showImgMenu: {
        type: [Boolean, String],
        default: true
      },
      tagStyle: Object,
      useAnchor: [Boolean, Number]
    },
    emits: ["load", "ready", "imgtap", "linktap", "play", "error"],
    components: {
      node
    },
    watch: {
      content(content) {
        this.setContent(content);
      }
    },
    created() {
      this.plugins = [];
      for (let i2 = plugins.length; i2--; ) {
        this.plugins.push(new plugins[i2](this));
      }
    },
    mounted() {
      if (this.content && !this.nodes.length) {
        this.setContent(this.content);
      }
    },
    beforeDestroy() {
      this._hook("onDetached");
    },
    methods: {
      /**
       * @description 将锚点跳转的范围限定在一个 scroll-view 内
       * @param {Object} page scroll-view 所在页面的示例
       * @param {String} selector scroll-view 的选择器
       * @param {String} scrollTop scroll-view scroll-top 属性绑定的变量名
       */
      in(page, selector, scrollTop) {
        if (page && selector && scrollTop) {
          this._in = {
            page,
            selector,
            scrollTop
          };
        }
      },
      /**
       * @description 锚点跳转
       * @param {String} id 要跳转的锚点 id
       * @param {Number} offset 跳转位置的偏移量
       * @returns {Promise}
       */
      navigateTo(id, offset) {
        return new Promise((resolve, reject) => {
          if (!this.useAnchor) {
            reject(Error("Anchor is disabled"));
            return;
          }
          offset = offset || parseInt(this.useAnchor) || 0;
          let deep = " ";
          const selector = uni.createSelectorQuery().in(this._in ? this._in.page : this).select((this._in ? this._in.selector : "._root") + (id ? `${deep}#${id}` : "")).boundingClientRect();
          if (this._in) {
            selector.select(this._in.selector).scrollOffset().select(this._in.selector).boundingClientRect();
          } else {
            selector.selectViewport().scrollOffset();
          }
          selector.exec((res) => {
            if (!res[0]) {
              reject(Error("Label not found"));
              return;
            }
            const scrollTop = res[1].scrollTop + res[0].top - (res[2] ? res[2].top : 0) + offset;
            if (this._in) {
              this._in.page[this._in.scrollTop] = scrollTop;
            } else {
              uni.pageScrollTo({
                scrollTop,
                duration: 300
              });
            }
            resolve();
          });
        });
      },
      /**
       * @description 获取文本内容
       * @return {String}
       */
      getText(nodes) {
        let text = "";
        (function traversal(nodes2) {
          for (let i2 = 0; i2 < nodes2.length; i2++) {
            const node2 = nodes2[i2];
            if (node2.type === "text") {
              text += node2.text.replace(/&amp;/g, "&");
            } else if (node2.name === "br") {
              text += "\n";
            } else {
              const isBlock = node2.name === "p" || node2.name === "div" || node2.name === "tr" || node2.name === "li" || node2.name[0] === "h" && node2.name[1] > "0" && node2.name[1] < "7";
              if (isBlock && text && text[text.length - 1] !== "\n") {
                text += "\n";
              }
              if (node2.children) {
                traversal(node2.children);
              }
              if (isBlock && text[text.length - 1] !== "\n") {
                text += "\n";
              } else if (node2.name === "td" || node2.name === "th") {
                text += "	";
              }
            }
          }
        })(nodes || this.nodes);
        return text;
      },
      /**
       * @description 获取内容大小和位置
       * @return {Promise}
       */
      getRect() {
        return new Promise((resolve, reject) => {
          uni.createSelectorQuery().in(this).select("#_root").boundingClientRect().exec((res) => res[0] ? resolve(res[0]) : reject(Error("Root label not found")));
        });
      },
      /**
       * @description 暂停播放媒体
       */
      pauseMedia() {
        for (let i2 = (this._videos || []).length; i2--; ) {
          this._videos[i2].pause();
        }
        const command = 'for(var e=document.getElementsByTagName("video"),i=e.length;i--;)e[i].pause()';
        let page = this.$parent;
        while (!page.$scope)
          page = page.$parent;
        page.$scope.$getAppWebview().evalJS(command);
      },
      /**
       * @description 设置媒体播放速率
       * @param {Number} rate 播放速率
       */
      setPlaybackRate(rate) {
        this.playbackRate = rate;
        for (let i2 = (this._videos || []).length; i2--; ) {
          this._videos[i2].playbackRate(rate);
        }
        const command = 'for(var e=document.getElementsByTagName("video"),i=e.length;i--;)e[i].playbackRate=' + rate;
        let page = this.$parent;
        while (!page.$scope)
          page = page.$parent;
        page.$scope.$getAppWebview().evalJS(command);
      },
      /**
       * @description 设置内容
       * @param {String} content html 内容
       * @param {Boolean} append 是否在尾部追加
       */
      setContent(content, append) {
        if (!append || !this.imgList) {
          this.imgList = [];
        }
        const nodes = new Parser(this).parse(content);
        this.$set(this, "nodes", append ? (this.nodes || []).concat(nodes) : nodes);
        this._videos = [];
        this.$nextTick(() => {
          this._hook("onLoad");
          this.$emit("load");
        });
        if (this.lazyLoad || this.imgList._unloadimgs < this.imgList.length / 2) {
          let height = 0;
          const callback = (rect) => {
            if (!rect || !rect.height)
              rect = {};
            if (rect.height === height) {
              this.$emit("ready", rect);
            } else {
              height = rect.height;
              setTimeout(() => {
                this.getRect().then(callback).catch(callback);
              }, 350);
            }
          };
          this.getRect().then(callback).catch(callback);
        } else {
          if (!this.imgList._unloadimgs) {
            this.getRect().then((rect) => {
              this.$emit("ready", rect);
            }).catch(() => {
              this.$emit("ready", {});
            });
          }
        }
      },
      /**
       * @description 调用插件钩子函数
       */
      _hook(name) {
        for (let i2 = plugins.length; i2--; ) {
          if (this.plugins[i2][name]) {
            this.plugins[i2][name]();
          }
        }
      }
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_node = vue.resolveComponent("node");
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        id: "_root",
        class: vue.normalizeClass(($props.selectable ? "_select " : "") + "_root"),
        style: vue.normalizeStyle($props.containerStyle)
      },
      [
        !$data.nodes[0] ? vue.renderSlot(_ctx.$slots, "default", { key: 0 }, void 0, true) : (vue.openBlock(), vue.createBlock(_component_node, {
          key: 1,
          childs: $data.nodes,
          opts: [$props.lazyLoad, $props.loadingImg, $props.errorImg, $props.showImgMenu, $props.selectable],
          name: "span"
        }, null, 8, ["childs", "opts"]))
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const uvParse = /* @__PURE__ */ _export_sfc(_sfc_main$G, [["render", _sfc_render$8], ["__scopeId", "data-v-4a07da53"], ["__file", "C:/easyjob/easyjob-front/easyjob-app/src/pages/components/uv-parse/components/uv-parse/uv-parse.vue"]]);
  const LETTER = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z"
  ];
  const QUESTION_TYPE = {
    0: "判断题",
    1: "单选题",
    2: "多选题"
  };
  const LOCAL_STORAGE_KEY = {
    "show_notice_bar": {
      key: "show_notice_bar",
      desc: "左右滑动提示"
    },
    "exam_answer": {
      key: "exam_answer",
      desc: "考试答案"
    },
    "token": {
      key: "token",
      desc: "token"
    },
    "avatar": {
      key: "avatarupdate",
      desc: "头像最后更新时间"
    },
    "readMode": {
      key: "readMode",
      desc: "阅读模式"
    },
    "searchHistory": {
      key: "searchHistory",
      desc: "搜索历史"
    }
  };
  const _sfc_main$F = {
    __name: "QuestionDetail",
    setup(__props) {
      const { proxy } = vue.getCurrentInstance();
      const loadDataNext = (_nextType) => {
        nextType.value = _nextType;
        loadDetail();
      };
      const questionData = vue.ref({});
      const currentId = vue.ref();
      const categoryId = vue.ref();
      const nextType = vue.ref(null);
      const loadDetail = async () => {
        let result = await proxy.Request({
          url: proxy.Api.getQuestionDetailNext,
          params: {
            currentId: currentId.value,
            categoryId: categoryId.value || "",
            nextType: nextType.value
          }
        });
        if (!result) {
          return;
        }
        questionData.value = result.data;
        currentId.value = result.data.questionId;
      };
      onLoad((option) => {
        currentId.value = option.questionId;
        categoryId.value = option.categoryId;
        nextType.value = null;
        loadDetail();
      });
      const updateCollect = (haveCollect) => {
        questionData.value.haveCollect = haveCollect;
      };
      const readMode = vue.ref(uni.getStorageSync(LOCAL_STORAGE_KEY.readMode.key) || "0");
      const changeMode = () => {
        const _readMode = uni.getStorageSync(LOCAL_STORAGE_KEY.readMode.key);
        if (_readMode == "" || _readMode == "0") {
          uni.setStorageSync(LOCAL_STORAGE_KEY.readMode.key, "1");
          readMode.value = "1";
        } else {
          uni.setStorageSync(LOCAL_STORAGE_KEY.readMode.key, "0");
          readMode.value = "0";
        }
        showAnswer.value = false;
      };
      const showAnswer = vue.ref(false);
      const showAnswerHandler = () => {
        showAnswer.value = true;
      };
      const containerStyle = vue.ref(
        "word-wrap:break-word;word-break:normal;word-break:break-all;"
      );
      return (_ctx, _cache) => {
        const _component_Navbar = vue.resolveComponent("Navbar");
        const _component_ShowTips = vue.resolveComponent("ShowTips");
        const _component_SlidePage = vue.resolveComponent("SlidePage");
        const _component_Footer = vue.resolveComponent("Footer");
        return vue.openBlock(), vue.createElementBlock("view", null, [
          vue.createVNode(_component_Navbar, { title: "八股文详情" }),
          vue.createVNode(_component_ShowTips),
          vue.createVNode(_component_SlidePage, { onLoadData: loadDataNext }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("view", { class: "question-detail" }, [
                vue.createElementVNode("view", { class: "title-info" }, [
                  vue.createVNode(QuestionItem, {
                    data: questionData.value,
                    showDetail: false
                  }, null, 8, ["data"])
                ]),
                questionData.value.question ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "question"
                }, [
                  vue.createElementVNode("view", { class: "question-title" }, "问题描述"),
                  vue.createVNode(uvParse, {
                    class: "rich-text",
                    content: questionData.value.question,
                    "container-style": containerStyle.value
                  }, null, 8, ["content", "container-style"])
                ])) : vue.createCommentVNode("v-if", true),
                vue.createElementVNode("view", { class: "line" }),
                readMode.value === "1" || readMode.value === "0" && showAnswer.value ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 1,
                  class: "question-content"
                }, [
                  vue.createElementVNode("view", { class: "title" }, [
                    vue.createTextVNode("-"),
                    vue.createElementVNode("text", { class: "inner" }, "问题解析"),
                    vue.createTextVNode("-")
                  ]),
                  questionData.value.answerAnalysis ? (vue.openBlock(), vue.createBlock(uvParse, {
                    key: 0,
                    class: "rich-text",
                    content: questionData.value.answerAnalysis,
                    "container-style": containerStyle.value
                  }, null, 8, ["content", "container-style"])) : vue.createCommentVNode("v-if", true)
                ])) : vue.createCommentVNode("v-if", true)
              ])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_Footer, {
            objectId: questionData.value.questionId + "",
            collectType: 1,
            onUpdateCollect: updateCollect,
            haveCollect: questionData.value.haveCollect
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("view", { class: "page-op" }, [
                vue.createElementVNode("view", {
                  class: "btn btn-mode",
                  onClick: changeMode
                }, [
                  vue.createElementVNode(
                    "text",
                    null,
                    vue.toDisplayString(readMode.value == "0" ? "背题模式" : "阅读模式"),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("text", { class: "iconfont icon-exchange" })
                ]),
                readMode.value === "0" ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "btn show-answer",
                  onClick: showAnswerHandler
                }, "查看答案")) : vue.createCommentVNode("v-if", true)
              ])
            ]),
            _: 1
            /* STABLE */
          }, 8, ["objectId", "haveCollect"])
        ]);
      };
    }
  };
  const PagesQuestionQuestionDetail = /* @__PURE__ */ _export_sfc(_sfc_main$F, [["__scopeId", "data-v-8dd3b9b5"], ["__file", "C:/easyjob/easyjob-front/easyjob-app/src/pages/question/QuestionDetail.vue"]]);
  const isObject = (val) => val !== null && typeof val === "object";
  const defaultDelimiters = ["{", "}"];
  class BaseFormatter {
    constructor() {
      this._caches = /* @__PURE__ */ Object.create(null);
    }
    interpolate(message2, values, delimiters = defaultDelimiters) {
      if (!values) {
        return [message2];
      }
      let tokens = this._caches[message2];
      if (!tokens) {
        tokens = parse(message2, delimiters);
        this._caches[message2] = tokens;
      }
      return compile(tokens, values);
    }
  }
  const RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
  const RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
  function parse(format, [startDelimiter, endDelimiter]) {
    const tokens = [];
    let position = 0;
    let text = "";
    while (position < format.length) {
      let char = format[position++];
      if (char === startDelimiter) {
        if (text) {
          tokens.push({ type: "text", value: text });
        }
        text = "";
        let sub = "";
        char = format[position++];
        while (char !== void 0 && char !== endDelimiter) {
          sub += char;
          char = format[position++];
        }
        const isClosed = char === endDelimiter;
        const type = RE_TOKEN_LIST_VALUE.test(sub) ? "list" : isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ? "named" : "unknown";
        tokens.push({ value: sub, type });
      } else {
        text += char;
      }
    }
    text && tokens.push({ type: "text", value: text });
    return tokens;
  }
  function compile(tokens, values) {
    const compiled = [];
    let index = 0;
    const mode = Array.isArray(values) ? "list" : isObject(values) ? "named" : "unknown";
    if (mode === "unknown") {
      return compiled;
    }
    while (index < tokens.length) {
      const token = tokens[index];
      switch (token.type) {
        case "text":
          compiled.push(token.value);
          break;
        case "list":
          compiled.push(values[parseInt(token.value, 10)]);
          break;
        case "named":
          if (mode === "named") {
            compiled.push(values[token.value]);
          } else {
            {
              console.warn(`Type of token '${token.type}' and format of value '${mode}' don't match!`);
            }
          }
          break;
        case "unknown":
          {
            console.warn(`Detect 'unknown' type of token!`);
          }
          break;
      }
      index++;
    }
    return compiled;
  }
  const LOCALE_ZH_HANS = "zh-Hans";
  const LOCALE_ZH_HANT = "zh-Hant";
  const LOCALE_EN = "en";
  const LOCALE_FR = "fr";
  const LOCALE_ES = "es";
  const hasOwnProperty = Object.prototype.hasOwnProperty;
  const hasOwn = (val, key) => hasOwnProperty.call(val, key);
  const defaultFormatter = new BaseFormatter();
  function include(str, parts) {
    return !!parts.find((part) => str.indexOf(part) !== -1);
  }
  function startsWith(str, parts) {
    return parts.find((part) => str.indexOf(part) === 0);
  }
  function normalizeLocale(locale, messages2) {
    if (!locale) {
      return;
    }
    locale = locale.trim().replace(/_/g, "-");
    if (messages2 && messages2[locale]) {
      return locale;
    }
    locale = locale.toLowerCase();
    if (locale === "chinese") {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf("zh") === 0) {
      if (locale.indexOf("-hans") > -1) {
        return LOCALE_ZH_HANS;
      }
      if (locale.indexOf("-hant") > -1) {
        return LOCALE_ZH_HANT;
      }
      if (include(locale, ["-tw", "-hk", "-mo", "-cht"])) {
        return LOCALE_ZH_HANT;
      }
      return LOCALE_ZH_HANS;
    }
    let locales = [LOCALE_EN, LOCALE_FR, LOCALE_ES];
    if (messages2 && Object.keys(messages2).length > 0) {
      locales = Object.keys(messages2);
    }
    const lang = startsWith(locale, locales);
    if (lang) {
      return lang;
    }
  }
  class I18n {
    constructor({ locale, fallbackLocale, messages: messages2, watcher, formater }) {
      this.locale = LOCALE_EN;
      this.fallbackLocale = LOCALE_EN;
      this.message = {};
      this.messages = {};
      this.watchers = [];
      if (fallbackLocale) {
        this.fallbackLocale = fallbackLocale;
      }
      this.formater = formater || defaultFormatter;
      this.messages = messages2 || {};
      this.setLocale(locale || LOCALE_EN);
      if (watcher) {
        this.watchLocale(watcher);
      }
    }
    setLocale(locale) {
      const oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      if (oldLocale !== this.locale) {
        this.watchers.forEach((watcher) => {
          watcher(this.locale, oldLocale);
        });
      }
    }
    getLocale() {
      return this.locale;
    }
    watchLocale(fn) {
      const index = this.watchers.push(fn) - 1;
      return () => {
        this.watchers.splice(index, 1);
      };
    }
    add(locale, message2, override = true) {
      const curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message2);
        } else {
          Object.keys(message2).forEach((key) => {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message2[key];
            }
          });
        }
      } else {
        this.messages[locale] = message2;
      }
    }
    f(message2, values, delimiters) {
      return this.formater.interpolate(message2, values, delimiters).join("");
    }
    t(key, locale, values) {
      let message2 = this.message;
      if (typeof locale === "string") {
        locale = normalizeLocale(locale, this.messages);
        locale && (message2 = this.messages[locale]);
      } else {
        values = locale;
      }
      if (!hasOwn(message2, key)) {
        console.warn(`Cannot translate the value of keypath ${key}. Use the value of keypath as default.`);
        return key;
      }
      return this.formater.interpolate(message2[key], values).join("");
    }
  }
  function watchAppLocale(appVm, i18n) {
    if (appVm.$watchLocale) {
      appVm.$watchLocale((newLocale) => {
        i18n.setLocale(newLocale);
      });
    } else {
      appVm.$watch(() => appVm.$locale, (newLocale) => {
        i18n.setLocale(newLocale);
      });
    }
  }
  function getDefaultLocale() {
    if (typeof uni !== "undefined" && uni.getLocale) {
      return uni.getLocale();
    }
    if (typeof global !== "undefined" && global.getLocale) {
      return global.getLocale();
    }
    return LOCALE_EN;
  }
  function initVueI18n(locale, messages2 = {}, fallbackLocale, watcher) {
    if (typeof locale !== "string") {
      [locale, messages2] = [
        messages2,
        locale
      ];
    }
    if (typeof locale !== "string") {
      locale = getDefaultLocale();
    }
    if (typeof fallbackLocale !== "string") {
      fallbackLocale = typeof __uniConfig !== "undefined" && __uniConfig.fallbackLocale || LOCALE_EN;
    }
    const i18n = new I18n({
      locale,
      fallbackLocale,
      messages: messages2,
      watcher
    });
    let t2 = (key, values) => {
      if (typeof getApp !== "function") {
        t2 = function(key2, values2) {
          return i18n.t(key2, values2);
        };
      } else {
        let isWatchedAppLocale = false;
        t2 = function(key2, values2) {
          const appVm = getApp().$vm;
          if (appVm) {
            appVm.$locale;
            if (!isWatchedAppLocale) {
              isWatchedAppLocale = true;
              watchAppLocale(appVm, i18n);
            }
          }
          return i18n.t(key2, values2);
        };
      }
      return t2(key, values);
    };
    return {
      i18n,
      f(message2, values, delimiters) {
        return i18n.f(message2, values, delimiters);
      },
      t(key, values) {
        return t2(key, values);
      },
      add(locale2, message2, override = true) {
        return i18n.add(locale2, message2, override);
      },
      watch(fn) {
        return i18n.watchLocale(fn);
      },
      getLocale() {
        return i18n.getLocale();
      },
      setLocale(newLocale) {
        return i18n.setLocale(newLocale);
      }
    };
  }
  const easycom = {
    autoscan: true,
    custom: {
      "^uni-(.*)": "@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue"
    }
  };
  const pages = [
    {
      path: "pages/Index",
      style: {
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/question/QuestionIndex",
      style: {
        navigationStyle: "custom",
        enablePullDownRefresh: true
      }
    },
    {
      path: "pages/question/QuestionList",
      style: {
        enablePullDownRefresh: true,
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/question/QuestionDetail",
      style: {
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/exam/ExamIndex",
      style: {
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/exam/ExamQuestion",
      style: {
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/share/ShareIndex",
      style: {
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/share/ShareDetail",
      style: {
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/my/MyIndex",
      style: {
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/my/CollectQuestion",
      style: {
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/my/CollectExamQuestion",
      style: {
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/my/CollectShare",
      style: {
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/my/ExamList",
      style: {
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/my/WrongExamQuestion",
      style: {
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/my/Feedback",
      style: {
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/my/FeedbackReply",
      style: {
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/account/LoginAndRegister",
      style: {
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/carousel/ExamQuestion",
      style: {
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/carousel/WebView",
      style: {
        navigationBarTitleText: "外部连接"
      }
    },
    {
      path: "pages/search/SearchIndex",
      style: {
        navigationStyle: "custom"
      }
    }
  ];
  const tabBar = {
    color: "#494949",
    selectedColor: "#8f60df",
    backgroundColor: "#fff",
    iconfontSrc: "/static/icon/iconfont.ttf",
    height: "60px",
    borderStyle: "black",
    list: [
      {
        pagePath: "pages/Index",
        text: "首页",
        color: "#494949",
        iconfont: {
          text: "",
          selectedText: "",
          fontSize: "22px",
          color: "#494949",
          selectedColor: "#8f60df"
        }
      },
      {
        pagePath: "pages/question/QuestionIndex",
        text: "八股文",
        iconfont: {
          text: "",
          selectedText: "",
          fontSize: "22px",
          color: "#494949",
          selectedColor: "#8f60df"
        }
      },
      {
        pagePath: "pages/exam/ExamIndex",
        text: "在线考试",
        iconfont: {
          text: "",
          selectedText: "",
          fontSize: "22px",
          color: "#494949",
          selectedColor: "#8f60df"
        }
      },
      {
        pagePath: "pages/share/ShareIndex",
        text: "经验分享",
        iconfont: {
          text: "",
          selectedText: "",
          fontSize: "22px",
          color: "#494949",
          selectedColor: "#8f60df"
        }
      },
      {
        pagePath: "pages/my/MyIndex",
        text: "我的",
        iconfont: {
          text: "",
          selectedText: "",
          fontSize: "22px",
          color: "#494949",
          selectedColor: "#8f60df"
        }
      }
    ]
  };
  const globalStyle = {
    navigationBarTextStyle: "white",
    navigationBarBackgroundColor: "#8f60df",
    "app-plus": {
      pullToRefresh: {
        style: "circle",
        color: "#8f60df"
      },
      bounce: "none"
    }
  };
  const t$1 = {
    easycom,
    pages,
    tabBar,
    globalStyle
  };
  function n(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
  }
  function s(e, t2, n2) {
    return e(n2 = { path: t2, exports: {}, require: function(e2, t3) {
      return function() {
        throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
      }(null == t3 && n2.path);
    } }, n2.exports), n2.exports;
  }
  var r = s(function(e, t2) {
    var n2;
    e.exports = (n2 = n2 || function(e2, t3) {
      var n3 = Object.create || function() {
        function e3() {
        }
        return function(t4) {
          var n4;
          return e3.prototype = t4, n4 = new e3(), e3.prototype = null, n4;
        };
      }(), s2 = {}, r2 = s2.lib = {}, i2 = r2.Base = { extend: function(e3) {
        var t4 = n3(this);
        return e3 && t4.mixIn(e3), t4.hasOwnProperty("init") && this.init !== t4.init || (t4.init = function() {
          t4.$super.init.apply(this, arguments);
        }), t4.init.prototype = t4, t4.$super = this, t4;
      }, create: function() {
        var e3 = this.extend();
        return e3.init.apply(e3, arguments), e3;
      }, init: function() {
      }, mixIn: function(e3) {
        for (var t4 in e3)
          e3.hasOwnProperty(t4) && (this[t4] = e3[t4]);
        e3.hasOwnProperty("toString") && (this.toString = e3.toString);
      }, clone: function() {
        return this.init.prototype.extend(this);
      } }, o2 = r2.WordArray = i2.extend({ init: function(e3, n4) {
        e3 = this.words = e3 || [], this.sigBytes = n4 != t3 ? n4 : 4 * e3.length;
      }, toString: function(e3) {
        return (e3 || c2).stringify(this);
      }, concat: function(e3) {
        var t4 = this.words, n4 = e3.words, s3 = this.sigBytes, r3 = e3.sigBytes;
        if (this.clamp(), s3 % 4)
          for (var i3 = 0; i3 < r3; i3++) {
            var o3 = n4[i3 >>> 2] >>> 24 - i3 % 4 * 8 & 255;
            t4[s3 + i3 >>> 2] |= o3 << 24 - (s3 + i3) % 4 * 8;
          }
        else
          for (i3 = 0; i3 < r3; i3 += 4)
            t4[s3 + i3 >>> 2] = n4[i3 >>> 2];
        return this.sigBytes += r3, this;
      }, clamp: function() {
        var t4 = this.words, n4 = this.sigBytes;
        t4[n4 >>> 2] &= 4294967295 << 32 - n4 % 4 * 8, t4.length = e2.ceil(n4 / 4);
      }, clone: function() {
        var e3 = i2.clone.call(this);
        return e3.words = this.words.slice(0), e3;
      }, random: function(t4) {
        for (var n4, s3 = [], r3 = function(t5) {
          t5 = t5;
          var n5 = 987654321, s4 = 4294967295;
          return function() {
            var r4 = ((n5 = 36969 * (65535 & n5) + (n5 >> 16) & s4) << 16) + (t5 = 18e3 * (65535 & t5) + (t5 >> 16) & s4) & s4;
            return r4 /= 4294967296, (r4 += 0.5) * (e2.random() > 0.5 ? 1 : -1);
          };
        }, i3 = 0; i3 < t4; i3 += 4) {
          var a3 = r3(4294967296 * (n4 || e2.random()));
          n4 = 987654071 * a3(), s3.push(4294967296 * a3() | 0);
        }
        return new o2.init(s3, t4);
      } }), a2 = s2.enc = {}, c2 = a2.Hex = { stringify: function(e3) {
        for (var t4 = e3.words, n4 = e3.sigBytes, s3 = [], r3 = 0; r3 < n4; r3++) {
          var i3 = t4[r3 >>> 2] >>> 24 - r3 % 4 * 8 & 255;
          s3.push((i3 >>> 4).toString(16)), s3.push((15 & i3).toString(16));
        }
        return s3.join("");
      }, parse: function(e3) {
        for (var t4 = e3.length, n4 = [], s3 = 0; s3 < t4; s3 += 2)
          n4[s3 >>> 3] |= parseInt(e3.substr(s3, 2), 16) << 24 - s3 % 8 * 4;
        return new o2.init(n4, t4 / 2);
      } }, u2 = a2.Latin1 = { stringify: function(e3) {
        for (var t4 = e3.words, n4 = e3.sigBytes, s3 = [], r3 = 0; r3 < n4; r3++) {
          var i3 = t4[r3 >>> 2] >>> 24 - r3 % 4 * 8 & 255;
          s3.push(String.fromCharCode(i3));
        }
        return s3.join("");
      }, parse: function(e3) {
        for (var t4 = e3.length, n4 = [], s3 = 0; s3 < t4; s3++)
          n4[s3 >>> 2] |= (255 & e3.charCodeAt(s3)) << 24 - s3 % 4 * 8;
        return new o2.init(n4, t4);
      } }, h2 = a2.Utf8 = { stringify: function(e3) {
        try {
          return decodeURIComponent(escape(u2.stringify(e3)));
        } catch (e4) {
          throw new Error("Malformed UTF-8 data");
        }
      }, parse: function(e3) {
        return u2.parse(unescape(encodeURIComponent(e3)));
      } }, l2 = r2.BufferedBlockAlgorithm = i2.extend({ reset: function() {
        this._data = new o2.init(), this._nDataBytes = 0;
      }, _append: function(e3) {
        "string" == typeof e3 && (e3 = h2.parse(e3)), this._data.concat(e3), this._nDataBytes += e3.sigBytes;
      }, _process: function(t4) {
        var n4 = this._data, s3 = n4.words, r3 = n4.sigBytes, i3 = this.blockSize, a3 = r3 / (4 * i3), c3 = (a3 = t4 ? e2.ceil(a3) : e2.max((0 | a3) - this._minBufferSize, 0)) * i3, u3 = e2.min(4 * c3, r3);
        if (c3) {
          for (var h3 = 0; h3 < c3; h3 += i3)
            this._doProcessBlock(s3, h3);
          var l3 = s3.splice(0, c3);
          n4.sigBytes -= u3;
        }
        return new o2.init(l3, u3);
      }, clone: function() {
        var e3 = i2.clone.call(this);
        return e3._data = this._data.clone(), e3;
      }, _minBufferSize: 0 });
      r2.Hasher = l2.extend({ cfg: i2.extend(), init: function(e3) {
        this.cfg = this.cfg.extend(e3), this.reset();
      }, reset: function() {
        l2.reset.call(this), this._doReset();
      }, update: function(e3) {
        return this._append(e3), this._process(), this;
      }, finalize: function(e3) {
        return e3 && this._append(e3), this._doFinalize();
      }, blockSize: 16, _createHelper: function(e3) {
        return function(t4, n4) {
          return new e3.init(n4).finalize(t4);
        };
      }, _createHmacHelper: function(e3) {
        return function(t4, n4) {
          return new d2.HMAC.init(e3, n4).finalize(t4);
        };
      } });
      var d2 = s2.algo = {};
      return s2;
    }(Math), n2);
  }), i = r, o = (s(function(e, t2) {
    var n2;
    e.exports = (n2 = i, function(e2) {
      var t3 = n2, s2 = t3.lib, r2 = s2.WordArray, i2 = s2.Hasher, o2 = t3.algo, a2 = [];
      !function() {
        for (var t4 = 0; t4 < 64; t4++)
          a2[t4] = 4294967296 * e2.abs(e2.sin(t4 + 1)) | 0;
      }();
      var c2 = o2.MD5 = i2.extend({ _doReset: function() {
        this._hash = new r2.init([1732584193, 4023233417, 2562383102, 271733878]);
      }, _doProcessBlock: function(e3, t4) {
        for (var n3 = 0; n3 < 16; n3++) {
          var s3 = t4 + n3, r3 = e3[s3];
          e3[s3] = 16711935 & (r3 << 8 | r3 >>> 24) | 4278255360 & (r3 << 24 | r3 >>> 8);
        }
        var i3 = this._hash.words, o3 = e3[t4 + 0], c3 = e3[t4 + 1], p2 = e3[t4 + 2], f2 = e3[t4 + 3], g2 = e3[t4 + 4], m2 = e3[t4 + 5], y2 = e3[t4 + 6], _2 = e3[t4 + 7], w2 = e3[t4 + 8], v2 = e3[t4 + 9], I2 = e3[t4 + 10], S2 = e3[t4 + 11], b2 = e3[t4 + 12], k2 = e3[t4 + 13], C = e3[t4 + 14], T2 = e3[t4 + 15], P2 = i3[0], A2 = i3[1], E2 = i3[2], O = i3[3];
        P2 = u2(P2, A2, E2, O, o3, 7, a2[0]), O = u2(O, P2, A2, E2, c3, 12, a2[1]), E2 = u2(E2, O, P2, A2, p2, 17, a2[2]), A2 = u2(A2, E2, O, P2, f2, 22, a2[3]), P2 = u2(P2, A2, E2, O, g2, 7, a2[4]), O = u2(O, P2, A2, E2, m2, 12, a2[5]), E2 = u2(E2, O, P2, A2, y2, 17, a2[6]), A2 = u2(A2, E2, O, P2, _2, 22, a2[7]), P2 = u2(P2, A2, E2, O, w2, 7, a2[8]), O = u2(O, P2, A2, E2, v2, 12, a2[9]), E2 = u2(E2, O, P2, A2, I2, 17, a2[10]), A2 = u2(A2, E2, O, P2, S2, 22, a2[11]), P2 = u2(P2, A2, E2, O, b2, 7, a2[12]), O = u2(O, P2, A2, E2, k2, 12, a2[13]), E2 = u2(E2, O, P2, A2, C, 17, a2[14]), P2 = h2(P2, A2 = u2(A2, E2, O, P2, T2, 22, a2[15]), E2, O, c3, 5, a2[16]), O = h2(O, P2, A2, E2, y2, 9, a2[17]), E2 = h2(E2, O, P2, A2, S2, 14, a2[18]), A2 = h2(A2, E2, O, P2, o3, 20, a2[19]), P2 = h2(P2, A2, E2, O, m2, 5, a2[20]), O = h2(O, P2, A2, E2, I2, 9, a2[21]), E2 = h2(E2, O, P2, A2, T2, 14, a2[22]), A2 = h2(A2, E2, O, P2, g2, 20, a2[23]), P2 = h2(P2, A2, E2, O, v2, 5, a2[24]), O = h2(O, P2, A2, E2, C, 9, a2[25]), E2 = h2(E2, O, P2, A2, f2, 14, a2[26]), A2 = h2(A2, E2, O, P2, w2, 20, a2[27]), P2 = h2(P2, A2, E2, O, k2, 5, a2[28]), O = h2(O, P2, A2, E2, p2, 9, a2[29]), E2 = h2(E2, O, P2, A2, _2, 14, a2[30]), P2 = l2(P2, A2 = h2(A2, E2, O, P2, b2, 20, a2[31]), E2, O, m2, 4, a2[32]), O = l2(O, P2, A2, E2, w2, 11, a2[33]), E2 = l2(E2, O, P2, A2, S2, 16, a2[34]), A2 = l2(A2, E2, O, P2, C, 23, a2[35]), P2 = l2(P2, A2, E2, O, c3, 4, a2[36]), O = l2(O, P2, A2, E2, g2, 11, a2[37]), E2 = l2(E2, O, P2, A2, _2, 16, a2[38]), A2 = l2(A2, E2, O, P2, I2, 23, a2[39]), P2 = l2(P2, A2, E2, O, k2, 4, a2[40]), O = l2(O, P2, A2, E2, o3, 11, a2[41]), E2 = l2(E2, O, P2, A2, f2, 16, a2[42]), A2 = l2(A2, E2, O, P2, y2, 23, a2[43]), P2 = l2(P2, A2, E2, O, v2, 4, a2[44]), O = l2(O, P2, A2, E2, b2, 11, a2[45]), E2 = l2(E2, O, P2, A2, T2, 16, a2[46]), P2 = d2(P2, A2 = l2(A2, E2, O, P2, p2, 23, a2[47]), E2, O, o3, 6, a2[48]), O = d2(O, P2, A2, E2, _2, 10, a2[49]), E2 = d2(E2, O, P2, A2, C, 15, a2[50]), A2 = d2(A2, E2, O, P2, m2, 21, a2[51]), P2 = d2(P2, A2, E2, O, b2, 6, a2[52]), O = d2(O, P2, A2, E2, f2, 10, a2[53]), E2 = d2(E2, O, P2, A2, I2, 15, a2[54]), A2 = d2(A2, E2, O, P2, c3, 21, a2[55]), P2 = d2(P2, A2, E2, O, w2, 6, a2[56]), O = d2(O, P2, A2, E2, T2, 10, a2[57]), E2 = d2(E2, O, P2, A2, y2, 15, a2[58]), A2 = d2(A2, E2, O, P2, k2, 21, a2[59]), P2 = d2(P2, A2, E2, O, g2, 6, a2[60]), O = d2(O, P2, A2, E2, S2, 10, a2[61]), E2 = d2(E2, O, P2, A2, p2, 15, a2[62]), A2 = d2(A2, E2, O, P2, v2, 21, a2[63]), i3[0] = i3[0] + P2 | 0, i3[1] = i3[1] + A2 | 0, i3[2] = i3[2] + E2 | 0, i3[3] = i3[3] + O | 0;
      }, _doFinalize: function() {
        var t4 = this._data, n3 = t4.words, s3 = 8 * this._nDataBytes, r3 = 8 * t4.sigBytes;
        n3[r3 >>> 5] |= 128 << 24 - r3 % 32;
        var i3 = e2.floor(s3 / 4294967296), o3 = s3;
        n3[15 + (r3 + 64 >>> 9 << 4)] = 16711935 & (i3 << 8 | i3 >>> 24) | 4278255360 & (i3 << 24 | i3 >>> 8), n3[14 + (r3 + 64 >>> 9 << 4)] = 16711935 & (o3 << 8 | o3 >>> 24) | 4278255360 & (o3 << 24 | o3 >>> 8), t4.sigBytes = 4 * (n3.length + 1), this._process();
        for (var a3 = this._hash, c3 = a3.words, u3 = 0; u3 < 4; u3++) {
          var h3 = c3[u3];
          c3[u3] = 16711935 & (h3 << 8 | h3 >>> 24) | 4278255360 & (h3 << 24 | h3 >>> 8);
        }
        return a3;
      }, clone: function() {
        var e3 = i2.clone.call(this);
        return e3._hash = this._hash.clone(), e3;
      } });
      function u2(e3, t4, n3, s3, r3, i3, o3) {
        var a3 = e3 + (t4 & n3 | ~t4 & s3) + r3 + o3;
        return (a3 << i3 | a3 >>> 32 - i3) + t4;
      }
      function h2(e3, t4, n3, s3, r3, i3, o3) {
        var a3 = e3 + (t4 & s3 | n3 & ~s3) + r3 + o3;
        return (a3 << i3 | a3 >>> 32 - i3) + t4;
      }
      function l2(e3, t4, n3, s3, r3, i3, o3) {
        var a3 = e3 + (t4 ^ n3 ^ s3) + r3 + o3;
        return (a3 << i3 | a3 >>> 32 - i3) + t4;
      }
      function d2(e3, t4, n3, s3, r3, i3, o3) {
        var a3 = e3 + (n3 ^ (t4 | ~s3)) + r3 + o3;
        return (a3 << i3 | a3 >>> 32 - i3) + t4;
      }
      t3.MD5 = i2._createHelper(c2), t3.HmacMD5 = i2._createHmacHelper(c2);
    }(Math), n2.MD5);
  }), s(function(e, t2) {
    var n2;
    e.exports = (n2 = i, void function() {
      var e2 = n2, t3 = e2.lib.Base, s2 = e2.enc.Utf8;
      e2.algo.HMAC = t3.extend({ init: function(e3, t4) {
        e3 = this._hasher = new e3.init(), "string" == typeof t4 && (t4 = s2.parse(t4));
        var n3 = e3.blockSize, r2 = 4 * n3;
        t4.sigBytes > r2 && (t4 = e3.finalize(t4)), t4.clamp();
        for (var i2 = this._oKey = t4.clone(), o2 = this._iKey = t4.clone(), a2 = i2.words, c2 = o2.words, u2 = 0; u2 < n3; u2++)
          a2[u2] ^= 1549556828, c2[u2] ^= 909522486;
        i2.sigBytes = o2.sigBytes = r2, this.reset();
      }, reset: function() {
        var e3 = this._hasher;
        e3.reset(), e3.update(this._iKey);
      }, update: function(e3) {
        return this._hasher.update(e3), this;
      }, finalize: function(e3) {
        var t4 = this._hasher, n3 = t4.finalize(e3);
        return t4.reset(), t4.finalize(this._oKey.clone().concat(n3));
      } });
    }());
  }), s(function(e, t2) {
    e.exports = i.HmacMD5;
  })), a = s(function(e, t2) {
    e.exports = i.enc.Utf8;
  }), c = s(function(e, t2) {
    var n2;
    e.exports = (n2 = i, function() {
      var e2 = n2, t3 = e2.lib.WordArray;
      function s2(e3, n3, s3) {
        for (var r2 = [], i2 = 0, o2 = 0; o2 < n3; o2++)
          if (o2 % 4) {
            var a2 = s3[e3.charCodeAt(o2 - 1)] << o2 % 4 * 2, c2 = s3[e3.charCodeAt(o2)] >>> 6 - o2 % 4 * 2;
            r2[i2 >>> 2] |= (a2 | c2) << 24 - i2 % 4 * 8, i2++;
          }
        return t3.create(r2, i2);
      }
      e2.enc.Base64 = { stringify: function(e3) {
        var t4 = e3.words, n3 = e3.sigBytes, s3 = this._map;
        e3.clamp();
        for (var r2 = [], i2 = 0; i2 < n3; i2 += 3)
          for (var o2 = (t4[i2 >>> 2] >>> 24 - i2 % 4 * 8 & 255) << 16 | (t4[i2 + 1 >>> 2] >>> 24 - (i2 + 1) % 4 * 8 & 255) << 8 | t4[i2 + 2 >>> 2] >>> 24 - (i2 + 2) % 4 * 8 & 255, a2 = 0; a2 < 4 && i2 + 0.75 * a2 < n3; a2++)
            r2.push(s3.charAt(o2 >>> 6 * (3 - a2) & 63));
        var c2 = s3.charAt(64);
        if (c2)
          for (; r2.length % 4; )
            r2.push(c2);
        return r2.join("");
      }, parse: function(e3) {
        var t4 = e3.length, n3 = this._map, r2 = this._reverseMap;
        if (!r2) {
          r2 = this._reverseMap = [];
          for (var i2 = 0; i2 < n3.length; i2++)
            r2[n3.charCodeAt(i2)] = i2;
        }
        var o2 = n3.charAt(64);
        if (o2) {
          var a2 = e3.indexOf(o2);
          -1 !== a2 && (t4 = a2);
        }
        return s2(e3, t4, r2);
      }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" };
    }(), n2.enc.Base64);
  });
  const u = "FUNCTION", h = "OBJECT", l = "CLIENT_DB", d = "pending", p = "fullfilled", f = "rejected";
  function g(e) {
    return Object.prototype.toString.call(e).slice(8, -1).toLowerCase();
  }
  function m(e) {
    return "object" === g(e);
  }
  function y(e) {
    return "function" == typeof e;
  }
  function _(e) {
    return function() {
      try {
        return e.apply(e, arguments);
      } catch (e2) {
        console.error(e2);
      }
    };
  }
  const w = "REJECTED", v = "NOT_PENDING";
  class I {
    constructor({ createPromise: e, retryRule: t2 = w } = {}) {
      this.createPromise = e, this.status = null, this.promise = null, this.retryRule = t2;
    }
    get needRetry() {
      if (!this.status)
        return true;
      switch (this.retryRule) {
        case w:
          return this.status === f;
        case v:
          return this.status !== d;
      }
    }
    exec() {
      return this.needRetry ? (this.status = d, this.promise = this.createPromise().then((e) => (this.status = p, Promise.resolve(e)), (e) => (this.status = f, Promise.reject(e))), this.promise) : this.promise;
    }
  }
  function S(e) {
    return e && "string" == typeof e ? JSON.parse(e) : e;
  }
  const b = true, k = "app", T = S([]), P = k, A = S(""), E = S("[]") || [];
  let x = "";
  try {
    x = "__UNI__E1BE708";
  } catch (e) {
  }
  let R = {};
  function U(e, t2 = {}) {
    var n2, s2;
    return n2 = R, s2 = e, Object.prototype.hasOwnProperty.call(n2, s2) || (R[e] = t2), R[e];
  }
  R = uni._globalUniCloudObj ? uni._globalUniCloudObj : uni._globalUniCloudObj = {};
  const L = ["invoke", "success", "fail", "complete"], N = U("_globalUniCloudInterceptor");
  function D(e, t2) {
    N[e] || (N[e] = {}), m(t2) && Object.keys(t2).forEach((n2) => {
      L.indexOf(n2) > -1 && function(e2, t3, n3) {
        let s2 = N[e2][t3];
        s2 || (s2 = N[e2][t3] = []), -1 === s2.indexOf(n3) && y(n3) && s2.push(n3);
      }(e, n2, t2[n2]);
    });
  }
  function F(e, t2) {
    N[e] || (N[e] = {}), m(t2) ? Object.keys(t2).forEach((n2) => {
      L.indexOf(n2) > -1 && function(e2, t3, n3) {
        const s2 = N[e2][t3];
        if (!s2)
          return;
        const r2 = s2.indexOf(n3);
        r2 > -1 && s2.splice(r2, 1);
      }(e, n2, t2[n2]);
    }) : delete N[e];
  }
  function q(e, t2) {
    return e && 0 !== e.length ? e.reduce((e2, n2) => e2.then(() => n2(t2)), Promise.resolve()) : Promise.resolve();
  }
  function M(e, t2) {
    return N[e] && N[e][t2] || [];
  }
  function K(e) {
    D("callObject", e);
  }
  const j = U("_globalUniCloudListener"), B = "response", $ = "needLogin", W = "refreshToken", z = "clientdb", J = "cloudfunction", H = "cloudobject";
  function G(e) {
    return j[e] || (j[e] = []), j[e];
  }
  function V(e, t2) {
    const n2 = G(e);
    n2.includes(t2) || n2.push(t2);
  }
  function Q(e, t2) {
    const n2 = G(e), s2 = n2.indexOf(t2);
    -1 !== s2 && n2.splice(s2, 1);
  }
  function Y(e, t2) {
    const n2 = G(e);
    for (let e2 = 0; e2 < n2.length; e2++) {
      (0, n2[e2])(t2);
    }
  }
  let X, Z = false;
  function ee() {
    return X || (X = new Promise((e) => {
      Z && e(), function t2() {
        if ("function" == typeof getCurrentPages) {
          const t3 = getCurrentPages();
          t3 && t3[0] && (Z = true, e());
        }
        Z || setTimeout(() => {
          t2();
        }, 30);
      }();
    }), X);
  }
  function te(e) {
    const t2 = {};
    for (const n2 in e) {
      const s2 = e[n2];
      y(s2) && (t2[n2] = _(s2));
    }
    return t2;
  }
  class ne extends Error {
    constructor(e) {
      super(e.message), this.errMsg = e.message || e.errMsg || "unknown system error", this.code = this.errCode = e.code || e.errCode || "SYSTEM_ERROR", this.errSubject = this.subject = e.subject || e.errSubject, this.cause = e.cause, this.requestId = e.requestId;
    }
    toJson(e = 0) {
      if (!(e >= 10))
        return e++, { errCode: this.errCode, errMsg: this.errMsg, errSubject: this.errSubject, cause: this.cause && this.cause.toJson ? this.cause.toJson(e) : this.cause };
    }
  }
  var se = { request: (e) => uni.request(e), uploadFile: (e) => uni.uploadFile(e), setStorageSync: (e, t2) => uni.setStorageSync(e, t2), getStorageSync: (e) => uni.getStorageSync(e), removeStorageSync: (e) => uni.removeStorageSync(e), clearStorageSync: () => uni.clearStorageSync() };
  function re(e) {
    return e && re(e.__v_raw) || e;
  }
  function ie() {
    return { token: se.getStorageSync("uni_id_token") || se.getStorageSync("uniIdToken"), tokenExpired: se.getStorageSync("uni_id_token_expired") };
  }
  function oe({ token: e, tokenExpired: t2 } = {}) {
    e && se.setStorageSync("uni_id_token", e), t2 && se.setStorageSync("uni_id_token_expired", t2);
  }
  let ae, ce;
  function ue() {
    return ae || (ae = uni.getSystemInfoSync()), ae;
  }
  function he() {
    let e, t2;
    try {
      if (uni.getLaunchOptionsSync) {
        if (uni.getLaunchOptionsSync.toString().indexOf("not yet implemented") > -1)
          return;
        const { scene: n2, channel: s2 } = uni.getLaunchOptionsSync();
        e = s2, t2 = n2;
      }
    } catch (e2) {
    }
    return { channel: e, scene: t2 };
  }
  function le() {
    const e = uni.getLocale && uni.getLocale() || "en";
    if (ce)
      return { ...ce, locale: e, LOCALE: e };
    const t2 = ue(), { deviceId: n2, osName: s2, uniPlatform: r2, appId: i2 } = t2, o2 = ["pixelRatio", "brand", "model", "system", "language", "version", "platform", "host", "SDKVersion", "swanNativeVersion", "app", "AppPlatform", "fontSizeSetting"];
    for (let e2 = 0; e2 < o2.length; e2++) {
      delete t2[o2[e2]];
    }
    return ce = { PLATFORM: r2, OS: s2, APPID: i2, DEVICEID: n2, ...he(), ...t2 }, { ...ce, locale: e, LOCALE: e };
  }
  var de = { sign: function(e, t2) {
    let n2 = "";
    return Object.keys(e).sort().forEach(function(t3) {
      e[t3] && (n2 = n2 + "&" + t3 + "=" + e[t3]);
    }), n2 = n2.slice(1), o(n2, t2).toString();
  }, wrappedRequest: function(e, t2) {
    return new Promise((n2, s2) => {
      t2(Object.assign(e, { complete(e2) {
        e2 || (e2 = {});
        const t3 = e2.data && e2.data.header && e2.data.header["x-serverless-request-id"] || e2.header && e2.header["request-id"];
        if (!e2.statusCode || e2.statusCode >= 400)
          return s2(new ne({ code: "SYS_ERR", message: e2.errMsg || "request:fail", requestId: t3 }));
        const r2 = e2.data;
        if (r2.error)
          return s2(new ne({ code: r2.error.code, message: r2.error.message, requestId: t3 }));
        r2.result = r2.data, r2.requestId = t3, delete r2.data, n2(r2);
      } }));
    });
  }, toBase64: function(e) {
    return c.stringify(a.parse(e));
  } }, pe = { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" };
  const { t: fe } = initVueI18n({ "zh-Hans": { "uniCloud.init.paramRequired": "缺少参数：{param}", "uniCloud.uploadFile.fileError": "filePath应为File对象" }, "zh-Hant": { "uniCloud.init.paramRequired": "缺少参数：{param}", "uniCloud.uploadFile.fileError": "filePath应为File对象" }, en: pe, fr: { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" }, es: { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" }, ja: pe }, "zh-Hans");
  var ge = class {
    constructor(e) {
      ["spaceId", "clientSecret"].forEach((t2) => {
        if (!Object.prototype.hasOwnProperty.call(e, t2))
          throw new Error(fe("uniCloud.init.paramRequired", { param: t2 }));
      }), this.config = Object.assign({}, { endpoint: 0 === e.spaceId.indexOf("mp-") ? "https://api.next.bspapp.com" : "https://api.bspapp.com" }, e), this.config.provider = "aliyun", this.config.requestUrl = this.config.endpoint + "/client", this.config.envType = this.config.envType || "public", this.config.accessTokenKey = "access_token_" + this.config.spaceId, this.adapter = se, this._getAccessTokenPromiseHub = new I({ createPromise: () => this.requestAuth(this.setupRequest({ method: "serverless.auth.user.anonymousAuthorize", params: "{}" }, "auth")).then((e2) => {
        if (!e2.result || !e2.result.accessToken)
          throw new ne({ code: "AUTH_FAILED", message: "获取accessToken失败" });
        this.setAccessToken(e2.result.accessToken);
      }), retryRule: v });
    }
    get hasAccessToken() {
      return !!this.accessToken;
    }
    setAccessToken(e) {
      this.accessToken = e;
    }
    requestWrapped(e) {
      return de.wrappedRequest(e, this.adapter.request);
    }
    requestAuth(e) {
      return this.requestWrapped(e);
    }
    request(e, t2) {
      return Promise.resolve().then(() => this.hasAccessToken ? t2 ? this.requestWrapped(e) : this.requestWrapped(e).catch((t3) => new Promise((e2, n2) => {
        !t3 || "GATEWAY_INVALID_TOKEN" !== t3.code && "InvalidParameter.InvalidToken" !== t3.code ? n2(t3) : e2();
      }).then(() => this.getAccessToken()).then(() => {
        const t4 = this.rebuildRequest(e);
        return this.request(t4, true);
      })) : this.getAccessToken().then(() => {
        const t3 = this.rebuildRequest(e);
        return this.request(t3, true);
      }));
    }
    rebuildRequest(e) {
      const t2 = Object.assign({}, e);
      return t2.data.token = this.accessToken, t2.header["x-basement-token"] = this.accessToken, t2.header["x-serverless-sign"] = de.sign(t2.data, this.config.clientSecret), t2;
    }
    setupRequest(e, t2) {
      const n2 = Object.assign({}, e, { spaceId: this.config.spaceId, timestamp: Date.now() }), s2 = { "Content-Type": "application/json" };
      return "auth" !== t2 && (n2.token = this.accessToken, s2["x-basement-token"] = this.accessToken), s2["x-serverless-sign"] = de.sign(n2, this.config.clientSecret), { url: this.config.requestUrl, method: "POST", data: n2, dataType: "json", header: s2 };
    }
    getAccessToken() {
      return this._getAccessTokenPromiseHub.exec();
    }
    async authorize() {
      await this.getAccessToken();
    }
    callFunction(e) {
      const t2 = { method: "serverless.function.runtime.invoke", params: JSON.stringify({ functionTarget: e.name, functionArgs: e.data || {} }) };
      return this.request(this.setupRequest(t2));
    }
    getOSSUploadOptionsFromPath(e) {
      const t2 = { method: "serverless.file.resource.generateProximalSign", params: JSON.stringify(e) };
      return this.request(this.setupRequest(t2));
    }
    uploadFileToOSS({ url: e, formData: t2, name: n2, filePath: s2, fileType: r2, onUploadProgress: i2 }) {
      return new Promise((o2, a2) => {
        const c2 = this.adapter.uploadFile({ url: e, formData: t2, name: n2, filePath: s2, fileType: r2, header: { "X-OSS-server-side-encrpytion": "AES256" }, success(e2) {
          e2 && e2.statusCode < 400 ? o2(e2) : a2(new ne({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
        }, fail(e2) {
          a2(new ne({ code: e2.code || "UPLOAD_FAILED", message: e2.message || e2.errMsg || "文件上传失败" }));
        } });
        "function" == typeof i2 && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((e2) => {
          i2({ loaded: e2.totalBytesSent, total: e2.totalBytesExpectedToSend });
        });
      });
    }
    reportOSSUpload(e) {
      const t2 = { method: "serverless.file.resource.report", params: JSON.stringify(e) };
      return this.request(this.setupRequest(t2));
    }
    async uploadFile({ filePath: e, cloudPath: t2, fileType: n2 = "image", onUploadProgress: s2, config: r2 }) {
      if ("string" !== g(t2))
        throw new ne({ code: "INVALID_PARAM", message: "cloudPath必须为字符串类型" });
      if (!(t2 = t2.trim()))
        throw new ne({ code: "CLOUDPATH_REQUIRED", message: "cloudPath不可为空" });
      if (/:\/\//.test(t2))
        throw new ne({ code: "INVALID_PARAM", message: "cloudPath不合法" });
      const i2 = r2 && r2.envType || this.config.envType, o2 = (await this.getOSSUploadOptionsFromPath({ env: i2, filename: t2 })).result, a2 = "https://" + o2.cdnDomain + "/" + o2.ossPath, { securityToken: c2, accessKeyId: u2, signature: h2, host: l2, ossPath: d2, id: p2, policy: f2, ossCallbackUrl: m2 } = o2, y2 = { "Cache-Control": "max-age=2592000", "Content-Disposition": "attachment", OSSAccessKeyId: u2, Signature: h2, host: l2, id: p2, key: d2, policy: f2, success_action_status: 200 };
      if (c2 && (y2["x-oss-security-token"] = c2), m2) {
        const e2 = JSON.stringify({ callbackUrl: m2, callbackBody: JSON.stringify({ fileId: p2, spaceId: this.config.spaceId }), callbackBodyType: "application/json" });
        y2.callback = de.toBase64(e2);
      }
      const _2 = { url: "https://" + o2.host, formData: y2, fileName: "file", name: "file", filePath: e, fileType: n2 };
      if (await this.uploadFileToOSS(Object.assign({}, _2, { onUploadProgress: s2 })), m2)
        return { success: true, filePath: e, fileID: a2 };
      if ((await this.reportOSSUpload({ id: p2 })).success)
        return { success: true, filePath: e, fileID: a2 };
      throw new ne({ code: "UPLOAD_FAILED", message: "文件上传失败" });
    }
    getTempFileURL({ fileList: e } = {}) {
      return new Promise((t2, n2) => {
        Array.isArray(e) && 0 !== e.length || n2(new ne({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" })), t2({ fileList: e.map((e2) => ({ fileID: e2, tempFileURL: e2 })) });
      });
    }
    async getFileInfo({ fileList: e } = {}) {
      if (!Array.isArray(e) || 0 === e.length)
        throw new ne({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" });
      const t2 = { method: "serverless.file.resource.info", params: JSON.stringify({ id: e.map((e2) => e2.split("?")[0]).join(",") }) };
      return { fileList: (await this.request(this.setupRequest(t2))).result };
    }
  };
  var me = { init(e) {
    const t2 = new ge(e), n2 = { signInAnonymously: function() {
      return t2.authorize();
    }, getLoginState: function() {
      return Promise.resolve(false);
    } };
    return t2.auth = function() {
      return n2;
    }, t2.customAuth = t2.auth, t2;
  } };
  const ye = "undefined" != typeof location && "http:" === location.protocol ? "http:" : "https:";
  var _e;
  !function(e) {
    e.local = "local", e.none = "none", e.session = "session";
  }(_e || (_e = {}));
  var we = function() {
  };
  const ve = () => {
    let e;
    if (!Promise) {
      e = () => {
      }, e.promise = {};
      const t3 = () => {
        throw new ne({ message: 'Your Node runtime does support ES6 Promises. Set "global.Promise" to your preferred implementation of promises.' });
      };
      return Object.defineProperty(e.promise, "then", { get: t3 }), Object.defineProperty(e.promise, "catch", { get: t3 }), e;
    }
    const t2 = new Promise((t3, n2) => {
      e = (e2, s2) => e2 ? n2(e2) : t3(s2);
    });
    return e.promise = t2, e;
  };
  function Ie(e) {
    return void 0 === e;
  }
  function Se(e) {
    return "[object Null]" === Object.prototype.toString.call(e);
  }
  var be;
  function ke(e) {
    const t2 = (n2 = e, "[object Array]" === Object.prototype.toString.call(n2) ? e : [e]);
    var n2;
    for (const e2 of t2) {
      const { isMatch: t3, genAdapter: n3, runtime: s2 } = e2;
      if (t3())
        return { adapter: n3(), runtime: s2 };
    }
  }
  !function(e) {
    e.WEB = "web", e.WX_MP = "wx_mp";
  }(be || (be = {}));
  const Ce = { adapter: null, runtime: void 0 }, Te = ["anonymousUuidKey"];
  class Pe extends we {
    constructor() {
      super(), Ce.adapter.root.tcbObject || (Ce.adapter.root.tcbObject = {});
    }
    setItem(e, t2) {
      Ce.adapter.root.tcbObject[e] = t2;
    }
    getItem(e) {
      return Ce.adapter.root.tcbObject[e];
    }
    removeItem(e) {
      delete Ce.adapter.root.tcbObject[e];
    }
    clear() {
      delete Ce.adapter.root.tcbObject;
    }
  }
  function Ae(e, t2) {
    switch (e) {
      case "local":
        return t2.localStorage || new Pe();
      case "none":
        return new Pe();
      default:
        return t2.sessionStorage || new Pe();
    }
  }
  class Ee {
    constructor(e) {
      if (!this._storage) {
        this._persistence = Ce.adapter.primaryStorage || e.persistence, this._storage = Ae(this._persistence, Ce.adapter);
        const t2 = `access_token_${e.env}`, n2 = `access_token_expire_${e.env}`, s2 = `refresh_token_${e.env}`, r2 = `anonymous_uuid_${e.env}`, i2 = `login_type_${e.env}`, o2 = `user_info_${e.env}`;
        this.keys = { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2, anonymousUuidKey: r2, loginTypeKey: i2, userInfoKey: o2 };
      }
    }
    updatePersistence(e) {
      if (e === this._persistence)
        return;
      const t2 = "local" === this._persistence;
      this._persistence = e;
      const n2 = Ae(e, Ce.adapter);
      for (const e2 in this.keys) {
        const s2 = this.keys[e2];
        if (t2 && Te.includes(e2))
          continue;
        const r2 = this._storage.getItem(s2);
        Ie(r2) || Se(r2) || (n2.setItem(s2, r2), this._storage.removeItem(s2));
      }
      this._storage = n2;
    }
    setStore(e, t2, n2) {
      if (!this._storage)
        return;
      const s2 = { version: n2 || "localCachev1", content: t2 }, r2 = JSON.stringify(s2);
      try {
        this._storage.setItem(e, r2);
      } catch (e2) {
        throw e2;
      }
    }
    getStore(e, t2) {
      try {
        if (!this._storage)
          return;
      } catch (e2) {
        return "";
      }
      t2 = t2 || "localCachev1";
      const n2 = this._storage.getItem(e);
      if (!n2)
        return "";
      if (n2.indexOf(t2) >= 0) {
        return JSON.parse(n2).content;
      }
      return "";
    }
    removeStore(e) {
      this._storage.removeItem(e);
    }
  }
  const Oe = {}, xe = {};
  function Re(e) {
    return Oe[e];
  }
  class Ue {
    constructor(e, t2) {
      this.data = t2 || null, this.name = e;
    }
  }
  class Le extends Ue {
    constructor(e, t2) {
      super("error", { error: e, data: t2 }), this.error = e;
    }
  }
  const Ne = new class {
    constructor() {
      this._listeners = {};
    }
    on(e, t2) {
      return function(e2, t3, n2) {
        n2[e2] = n2[e2] || [], n2[e2].push(t3);
      }(e, t2, this._listeners), this;
    }
    off(e, t2) {
      return function(e2, t3, n2) {
        if (n2 && n2[e2]) {
          const s2 = n2[e2].indexOf(t3);
          -1 !== s2 && n2[e2].splice(s2, 1);
        }
      }(e, t2, this._listeners), this;
    }
    fire(e, t2) {
      if (e instanceof Le)
        return console.error(e.error), this;
      const n2 = "string" == typeof e ? new Ue(e, t2 || {}) : e;
      const s2 = n2.name;
      if (this._listens(s2)) {
        n2.target = this;
        const e2 = this._listeners[s2] ? [...this._listeners[s2]] : [];
        for (const t3 of e2)
          t3.call(this, n2);
      }
      return this;
    }
    _listens(e) {
      return this._listeners[e] && this._listeners[e].length > 0;
    }
  }();
  function De(e, t2) {
    Ne.on(e, t2);
  }
  function Fe(e, t2 = {}) {
    Ne.fire(e, t2);
  }
  function qe(e, t2) {
    Ne.off(e, t2);
  }
  const Me = "loginStateChanged", Ke = "loginStateExpire", je = "loginTypeChanged", Be = "anonymousConverted", $e = "refreshAccessToken";
  var We;
  !function(e) {
    e.ANONYMOUS = "ANONYMOUS", e.WECHAT = "WECHAT", e.WECHAT_PUBLIC = "WECHAT-PUBLIC", e.WECHAT_OPEN = "WECHAT-OPEN", e.CUSTOM = "CUSTOM", e.EMAIL = "EMAIL", e.USERNAME = "USERNAME", e.NULL = "NULL";
  }(We || (We = {}));
  const ze = ["auth.getJwt", "auth.logout", "auth.signInWithTicket", "auth.signInAnonymously", "auth.signIn", "auth.fetchAccessTokenWithRefreshToken", "auth.signUpWithEmailAndPassword", "auth.activateEndUserMail", "auth.sendPasswordResetEmail", "auth.resetPasswordWithToken", "auth.isUsernameRegistered"], Je = { "X-SDK-Version": "1.3.5" };
  function He(e, t2, n2) {
    const s2 = e[t2];
    e[t2] = function(t3) {
      const r2 = {}, i2 = {};
      n2.forEach((n3) => {
        const { data: s3, headers: o3 } = n3.call(e, t3);
        Object.assign(r2, s3), Object.assign(i2, o3);
      });
      const o2 = t3.data;
      return o2 && (() => {
        var e2;
        if (e2 = o2, "[object FormData]" !== Object.prototype.toString.call(e2))
          t3.data = { ...o2, ...r2 };
        else
          for (const e3 in r2)
            o2.append(e3, r2[e3]);
      })(), t3.headers = { ...t3.headers || {}, ...i2 }, s2.call(e, t3);
    };
  }
  function Ge() {
    const e = Math.random().toString(16).slice(2);
    return { data: { seqId: e }, headers: { ...Je, "x-seqid": e } };
  }
  class Ve {
    constructor(e = {}) {
      var t2;
      this.config = e, this._reqClass = new Ce.adapter.reqClass({ timeout: this.config.timeout, timeoutMsg: `请求在${this.config.timeout / 1e3}s内未完成，已中断`, restrictedMethods: ["post"] }), this._cache = Re(this.config.env), this._localCache = (t2 = this.config.env, xe[t2]), He(this._reqClass, "post", [Ge]), He(this._reqClass, "upload", [Ge]), He(this._reqClass, "download", [Ge]);
    }
    async post(e) {
      return await this._reqClass.post(e);
    }
    async upload(e) {
      return await this._reqClass.upload(e);
    }
    async download(e) {
      return await this._reqClass.download(e);
    }
    async refreshAccessToken() {
      let e, t2;
      this._refreshAccessTokenPromise || (this._refreshAccessTokenPromise = this._refreshAccessToken());
      try {
        e = await this._refreshAccessTokenPromise;
      } catch (e2) {
        t2 = e2;
      }
      if (this._refreshAccessTokenPromise = null, this._shouldRefreshAccessTokenHook = null, t2)
        throw t2;
      return e;
    }
    async _refreshAccessToken() {
      const { accessTokenKey: e, accessTokenExpireKey: t2, refreshTokenKey: n2, loginTypeKey: s2, anonymousUuidKey: r2 } = this._cache.keys;
      this._cache.removeStore(e), this._cache.removeStore(t2);
      let i2 = this._cache.getStore(n2);
      if (!i2)
        throw new ne({ message: "未登录CloudBase" });
      const o2 = { refresh_token: i2 }, a2 = await this.request("auth.fetchAccessTokenWithRefreshToken", o2);
      if (a2.data.code) {
        const { code: e2 } = a2.data;
        if ("SIGN_PARAM_INVALID" === e2 || "REFRESH_TOKEN_EXPIRED" === e2 || "INVALID_REFRESH_TOKEN" === e2) {
          if (this._cache.getStore(s2) === We.ANONYMOUS && "INVALID_REFRESH_TOKEN" === e2) {
            const e3 = this._cache.getStore(r2), t3 = this._cache.getStore(n2), s3 = await this.send("auth.signInAnonymously", { anonymous_uuid: e3, refresh_token: t3 });
            return this.setRefreshToken(s3.refresh_token), this._refreshAccessToken();
          }
          Fe(Ke), this._cache.removeStore(n2);
        }
        throw new ne({ code: a2.data.code, message: `刷新access token失败：${a2.data.code}` });
      }
      if (a2.data.access_token)
        return Fe($e), this._cache.setStore(e, a2.data.access_token), this._cache.setStore(t2, a2.data.access_token_expire + Date.now()), { accessToken: a2.data.access_token, accessTokenExpire: a2.data.access_token_expire };
      a2.data.refresh_token && (this._cache.removeStore(n2), this._cache.setStore(n2, a2.data.refresh_token), this._refreshAccessToken());
    }
    async getAccessToken() {
      const { accessTokenKey: e, accessTokenExpireKey: t2, refreshTokenKey: n2 } = this._cache.keys;
      if (!this._cache.getStore(n2))
        throw new ne({ message: "refresh token不存在，登录状态异常" });
      let s2 = this._cache.getStore(e), r2 = this._cache.getStore(t2), i2 = true;
      return this._shouldRefreshAccessTokenHook && !await this._shouldRefreshAccessTokenHook(s2, r2) && (i2 = false), (!s2 || !r2 || r2 < Date.now()) && i2 ? this.refreshAccessToken() : { accessToken: s2, accessTokenExpire: r2 };
    }
    async request(e, t2, n2) {
      const s2 = `x-tcb-trace_${this.config.env}`;
      let r2 = "application/x-www-form-urlencoded";
      const i2 = { action: e, env: this.config.env, dataVersion: "2019-08-16", ...t2 };
      if (-1 === ze.indexOf(e)) {
        const { refreshTokenKey: e2 } = this._cache.keys;
        this._cache.getStore(e2) && (i2.access_token = (await this.getAccessToken()).accessToken);
      }
      let o2;
      if ("storage.uploadFile" === e) {
        o2 = new FormData();
        for (let e2 in o2)
          o2.hasOwnProperty(e2) && void 0 !== o2[e2] && o2.append(e2, i2[e2]);
        r2 = "multipart/form-data";
      } else {
        r2 = "application/json", o2 = {};
        for (let e2 in i2)
          void 0 !== i2[e2] && (o2[e2] = i2[e2]);
      }
      let a2 = { headers: { "content-type": r2 } };
      n2 && n2.onUploadProgress && (a2.onUploadProgress = n2.onUploadProgress);
      const c2 = this._localCache.getStore(s2);
      c2 && (a2.headers["X-TCB-Trace"] = c2);
      const { parse: u2, inQuery: h2, search: l2 } = t2;
      let d2 = { env: this.config.env };
      u2 && (d2.parse = true), h2 && (d2 = { ...h2, ...d2 });
      let p2 = function(e2, t3, n3 = {}) {
        const s3 = /\?/.test(t3);
        let r3 = "";
        for (let e3 in n3)
          "" === r3 ? !s3 && (t3 += "?") : r3 += "&", r3 += `${e3}=${encodeURIComponent(n3[e3])}`;
        return /^http(s)?\:\/\//.test(t3 += r3) ? t3 : `${e2}${t3}`;
      }(ye, "//tcb-api.tencentcloudapi.com/web", d2);
      l2 && (p2 += l2);
      const f2 = await this.post({ url: p2, data: o2, ...a2 }), g2 = f2.header && f2.header["x-tcb-trace"];
      if (g2 && this._localCache.setStore(s2, g2), 200 !== Number(f2.status) && 200 !== Number(f2.statusCode) || !f2.data)
        throw new ne({ code: "NETWORK_ERROR", message: "network request error" });
      return f2;
    }
    async send(e, t2 = {}) {
      const n2 = await this.request(e, t2, { onUploadProgress: t2.onUploadProgress });
      if ("ACCESS_TOKEN_EXPIRED" === n2.data.code && -1 === ze.indexOf(e)) {
        await this.refreshAccessToken();
        const n3 = await this.request(e, t2, { onUploadProgress: t2.onUploadProgress });
        if (n3.data.code)
          throw new ne({ code: n3.data.code, message: n3.data.message });
        return n3.data;
      }
      if (n2.data.code)
        throw new ne({ code: n2.data.code, message: n2.data.message });
      return n2.data;
    }
    setRefreshToken(e) {
      const { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2 } = this._cache.keys;
      this._cache.removeStore(t2), this._cache.removeStore(n2), this._cache.setStore(s2, e);
    }
  }
  const Qe = {};
  function Ye(e) {
    return Qe[e];
  }
  class Xe {
    constructor(e) {
      this.config = e, this._cache = Re(e.env), this._request = Ye(e.env);
    }
    setRefreshToken(e) {
      const { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2 } = this._cache.keys;
      this._cache.removeStore(t2), this._cache.removeStore(n2), this._cache.setStore(s2, e);
    }
    setAccessToken(e, t2) {
      const { accessTokenKey: n2, accessTokenExpireKey: s2 } = this._cache.keys;
      this._cache.setStore(n2, e), this._cache.setStore(s2, t2);
    }
    async refreshUserInfo() {
      const { data: e } = await this._request.send("auth.getUserInfo", {});
      return this.setLocalUserInfo(e), e;
    }
    setLocalUserInfo(e) {
      const { userInfoKey: t2 } = this._cache.keys;
      this._cache.setStore(t2, e);
    }
  }
  class Ze {
    constructor(e) {
      if (!e)
        throw new ne({ code: "PARAM_ERROR", message: "envId is not defined" });
      this._envId = e, this._cache = Re(this._envId), this._request = Ye(this._envId), this.setUserInfo();
    }
    linkWithTicket(e) {
      if ("string" != typeof e)
        throw new ne({ code: "PARAM_ERROR", message: "ticket must be string" });
      return this._request.send("auth.linkWithTicket", { ticket: e });
    }
    linkWithRedirect(e) {
      e.signInWithRedirect();
    }
    updatePassword(e, t2) {
      return this._request.send("auth.updatePassword", { oldPassword: t2, newPassword: e });
    }
    updateEmail(e) {
      return this._request.send("auth.updateEmail", { newEmail: e });
    }
    updateUsername(e) {
      if ("string" != typeof e)
        throw new ne({ code: "PARAM_ERROR", message: "username must be a string" });
      return this._request.send("auth.updateUsername", { username: e });
    }
    async getLinkedUidList() {
      const { data: e } = await this._request.send("auth.getLinkedUidList", {});
      let t2 = false;
      const { users: n2 } = e;
      return n2.forEach((e2) => {
        e2.wxOpenId && e2.wxPublicId && (t2 = true);
      }), { users: n2, hasPrimaryUid: t2 };
    }
    setPrimaryUid(e) {
      return this._request.send("auth.setPrimaryUid", { uid: e });
    }
    unlink(e) {
      return this._request.send("auth.unlink", { platform: e });
    }
    async update(e) {
      const { nickName: t2, gender: n2, avatarUrl: s2, province: r2, country: i2, city: o2 } = e, { data: a2 } = await this._request.send("auth.updateUserInfo", { nickName: t2, gender: n2, avatarUrl: s2, province: r2, country: i2, city: o2 });
      this.setLocalUserInfo(a2);
    }
    async refresh() {
      const { data: e } = await this._request.send("auth.getUserInfo", {});
      return this.setLocalUserInfo(e), e;
    }
    setUserInfo() {
      const { userInfoKey: e } = this._cache.keys, t2 = this._cache.getStore(e);
      ["uid", "loginType", "openid", "wxOpenId", "wxPublicId", "unionId", "qqMiniOpenId", "email", "hasPassword", "customUserId", "nickName", "gender", "avatarUrl"].forEach((e2) => {
        this[e2] = t2[e2];
      }), this.location = { country: t2.country, province: t2.province, city: t2.city };
    }
    setLocalUserInfo(e) {
      const { userInfoKey: t2 } = this._cache.keys;
      this._cache.setStore(t2, e), this.setUserInfo();
    }
  }
  class et {
    constructor(e) {
      if (!e)
        throw new ne({ code: "PARAM_ERROR", message: "envId is not defined" });
      this._cache = Re(e);
      const { refreshTokenKey: t2, accessTokenKey: n2, accessTokenExpireKey: s2 } = this._cache.keys, r2 = this._cache.getStore(t2), i2 = this._cache.getStore(n2), o2 = this._cache.getStore(s2);
      this.credential = { refreshToken: r2, accessToken: i2, accessTokenExpire: o2 }, this.user = new Ze(e);
    }
    get isAnonymousAuth() {
      return this.loginType === We.ANONYMOUS;
    }
    get isCustomAuth() {
      return this.loginType === We.CUSTOM;
    }
    get isWeixinAuth() {
      return this.loginType === We.WECHAT || this.loginType === We.WECHAT_OPEN || this.loginType === We.WECHAT_PUBLIC;
    }
    get loginType() {
      return this._cache.getStore(this._cache.keys.loginTypeKey);
    }
  }
  class tt extends Xe {
    async signIn() {
      this._cache.updatePersistence("local");
      const { anonymousUuidKey: e, refreshTokenKey: t2 } = this._cache.keys, n2 = this._cache.getStore(e) || void 0, s2 = this._cache.getStore(t2) || void 0, r2 = await this._request.send("auth.signInAnonymously", { anonymous_uuid: n2, refresh_token: s2 });
      if (r2.uuid && r2.refresh_token) {
        this._setAnonymousUUID(r2.uuid), this.setRefreshToken(r2.refresh_token), await this._request.refreshAccessToken(), Fe(Me), Fe(je, { env: this.config.env, loginType: We.ANONYMOUS, persistence: "local" });
        const e2 = new et(this.config.env);
        return await e2.user.refresh(), e2;
      }
      throw new ne({ message: "匿名登录失败" });
    }
    async linkAndRetrieveDataWithTicket(e) {
      const { anonymousUuidKey: t2, refreshTokenKey: n2 } = this._cache.keys, s2 = this._cache.getStore(t2), r2 = this._cache.getStore(n2), i2 = await this._request.send("auth.linkAndRetrieveDataWithTicket", { anonymous_uuid: s2, refresh_token: r2, ticket: e });
      if (i2.refresh_token)
        return this._clearAnonymousUUID(), this.setRefreshToken(i2.refresh_token), await this._request.refreshAccessToken(), Fe(Be, { env: this.config.env }), Fe(je, { loginType: We.CUSTOM, persistence: "local" }), { credential: { refreshToken: i2.refresh_token } };
      throw new ne({ message: "匿名转化失败" });
    }
    _setAnonymousUUID(e) {
      const { anonymousUuidKey: t2, loginTypeKey: n2 } = this._cache.keys;
      this._cache.removeStore(t2), this._cache.setStore(t2, e), this._cache.setStore(n2, We.ANONYMOUS);
    }
    _clearAnonymousUUID() {
      this._cache.removeStore(this._cache.keys.anonymousUuidKey);
    }
  }
  class nt extends Xe {
    async signIn(e) {
      if ("string" != typeof e)
        throw new ne({ code: "PARAM_ERROR", message: "ticket must be a string" });
      const { refreshTokenKey: t2 } = this._cache.keys, n2 = await this._request.send("auth.signInWithTicket", { ticket: e, refresh_token: this._cache.getStore(t2) || "" });
      if (n2.refresh_token)
        return this.setRefreshToken(n2.refresh_token), await this._request.refreshAccessToken(), Fe(Me), Fe(je, { env: this.config.env, loginType: We.CUSTOM, persistence: this.config.persistence }), await this.refreshUserInfo(), new et(this.config.env);
      throw new ne({ message: "自定义登录失败" });
    }
  }
  class st extends Xe {
    async signIn(e, t2) {
      if ("string" != typeof e)
        throw new ne({ code: "PARAM_ERROR", message: "email must be a string" });
      const { refreshTokenKey: n2 } = this._cache.keys, s2 = await this._request.send("auth.signIn", { loginType: "EMAIL", email: e, password: t2, refresh_token: this._cache.getStore(n2) || "" }), { refresh_token: r2, access_token: i2, access_token_expire: o2 } = s2;
      if (r2)
        return this.setRefreshToken(r2), i2 && o2 ? this.setAccessToken(i2, o2) : await this._request.refreshAccessToken(), await this.refreshUserInfo(), Fe(Me), Fe(je, { env: this.config.env, loginType: We.EMAIL, persistence: this.config.persistence }), new et(this.config.env);
      throw s2.code ? new ne({ code: s2.code, message: `邮箱登录失败: ${s2.message}` }) : new ne({ message: "邮箱登录失败" });
    }
    async activate(e) {
      return this._request.send("auth.activateEndUserMail", { token: e });
    }
    async resetPasswordWithToken(e, t2) {
      return this._request.send("auth.resetPasswordWithToken", { token: e, newPassword: t2 });
    }
  }
  class rt extends Xe {
    async signIn(e, t2) {
      if ("string" != typeof e)
        throw new ne({ code: "PARAM_ERROR", message: "username must be a string" });
      "string" != typeof t2 && (t2 = "", console.warn("password is empty"));
      const { refreshTokenKey: n2 } = this._cache.keys, s2 = await this._request.send("auth.signIn", { loginType: We.USERNAME, username: e, password: t2, refresh_token: this._cache.getStore(n2) || "" }), { refresh_token: r2, access_token_expire: i2, access_token: o2 } = s2;
      if (r2)
        return this.setRefreshToken(r2), o2 && i2 ? this.setAccessToken(o2, i2) : await this._request.refreshAccessToken(), await this.refreshUserInfo(), Fe(Me), Fe(je, { env: this.config.env, loginType: We.USERNAME, persistence: this.config.persistence }), new et(this.config.env);
      throw s2.code ? new ne({ code: s2.code, message: `用户名密码登录失败: ${s2.message}` }) : new ne({ message: "用户名密码登录失败" });
    }
  }
  class it {
    constructor(e) {
      this.config = e, this._cache = Re(e.env), this._request = Ye(e.env), this._onAnonymousConverted = this._onAnonymousConverted.bind(this), this._onLoginTypeChanged = this._onLoginTypeChanged.bind(this), De(je, this._onLoginTypeChanged);
    }
    get currentUser() {
      const e = this.hasLoginState();
      return e && e.user || null;
    }
    get loginType() {
      return this._cache.getStore(this._cache.keys.loginTypeKey);
    }
    anonymousAuthProvider() {
      return new tt(this.config);
    }
    customAuthProvider() {
      return new nt(this.config);
    }
    emailAuthProvider() {
      return new st(this.config);
    }
    usernameAuthProvider() {
      return new rt(this.config);
    }
    async signInAnonymously() {
      return new tt(this.config).signIn();
    }
    async signInWithEmailAndPassword(e, t2) {
      return new st(this.config).signIn(e, t2);
    }
    signInWithUsernameAndPassword(e, t2) {
      return new rt(this.config).signIn(e, t2);
    }
    async linkAndRetrieveDataWithTicket(e) {
      this._anonymousAuthProvider || (this._anonymousAuthProvider = new tt(this.config)), De(Be, this._onAnonymousConverted);
      return await this._anonymousAuthProvider.linkAndRetrieveDataWithTicket(e);
    }
    async signOut() {
      if (this.loginType === We.ANONYMOUS)
        throw new ne({ message: "匿名用户不支持登出操作" });
      const { refreshTokenKey: e, accessTokenKey: t2, accessTokenExpireKey: n2 } = this._cache.keys, s2 = this._cache.getStore(e);
      if (!s2)
        return;
      const r2 = await this._request.send("auth.logout", { refresh_token: s2 });
      return this._cache.removeStore(e), this._cache.removeStore(t2), this._cache.removeStore(n2), Fe(Me), Fe(je, { env: this.config.env, loginType: We.NULL, persistence: this.config.persistence }), r2;
    }
    async signUpWithEmailAndPassword(e, t2) {
      return this._request.send("auth.signUpWithEmailAndPassword", { email: e, password: t2 });
    }
    async sendPasswordResetEmail(e) {
      return this._request.send("auth.sendPasswordResetEmail", { email: e });
    }
    onLoginStateChanged(e) {
      De(Me, () => {
        const t3 = this.hasLoginState();
        e.call(this, t3);
      });
      const t2 = this.hasLoginState();
      e.call(this, t2);
    }
    onLoginStateExpired(e) {
      De(Ke, e.bind(this));
    }
    onAccessTokenRefreshed(e) {
      De($e, e.bind(this));
    }
    onAnonymousConverted(e) {
      De(Be, e.bind(this));
    }
    onLoginTypeChanged(e) {
      De(je, () => {
        const t2 = this.hasLoginState();
        e.call(this, t2);
      });
    }
    async getAccessToken() {
      return { accessToken: (await this._request.getAccessToken()).accessToken, env: this.config.env };
    }
    hasLoginState() {
      const { refreshTokenKey: e } = this._cache.keys;
      return this._cache.getStore(e) ? new et(this.config.env) : null;
    }
    async isUsernameRegistered(e) {
      if ("string" != typeof e)
        throw new ne({ code: "PARAM_ERROR", message: "username must be a string" });
      const { data: t2 } = await this._request.send("auth.isUsernameRegistered", { username: e });
      return t2 && t2.isRegistered;
    }
    getLoginState() {
      return Promise.resolve(this.hasLoginState());
    }
    async signInWithTicket(e) {
      return new nt(this.config).signIn(e);
    }
    shouldRefreshAccessToken(e) {
      this._request._shouldRefreshAccessTokenHook = e.bind(this);
    }
    getUserInfo() {
      return this._request.send("auth.getUserInfo", {}).then((e) => e.code ? e : { ...e.data, requestId: e.seqId });
    }
    getAuthHeader() {
      const { refreshTokenKey: e, accessTokenKey: t2 } = this._cache.keys, n2 = this._cache.getStore(e);
      return { "x-cloudbase-credentials": this._cache.getStore(t2) + "/@@/" + n2 };
    }
    _onAnonymousConverted(e) {
      const { env: t2 } = e.data;
      t2 === this.config.env && this._cache.updatePersistence(this.config.persistence);
    }
    _onLoginTypeChanged(e) {
      const { loginType: t2, persistence: n2, env: s2 } = e.data;
      s2 === this.config.env && (this._cache.updatePersistence(n2), this._cache.setStore(this._cache.keys.loginTypeKey, t2));
    }
  }
  const ot = function(e, t2) {
    t2 = t2 || ve();
    const n2 = Ye(this.config.env), { cloudPath: s2, filePath: r2, onUploadProgress: i2, fileType: o2 = "image" } = e;
    return n2.send("storage.getUploadMetadata", { path: s2 }).then((e2) => {
      const { data: { url: a2, authorization: c2, token: u2, fileId: h2, cosFileId: l2 }, requestId: d2 } = e2, p2 = { key: s2, signature: c2, "x-cos-meta-fileid": l2, success_action_status: "201", "x-cos-security-token": u2 };
      n2.upload({ url: a2, data: p2, file: r2, name: s2, fileType: o2, onUploadProgress: i2 }).then((e3) => {
        201 === e3.statusCode ? t2(null, { fileID: h2, requestId: d2 }) : t2(new ne({ code: "STORAGE_REQUEST_FAIL", message: `STORAGE_REQUEST_FAIL: ${e3.data}` }));
      }).catch((e3) => {
        t2(e3);
      });
    }).catch((e2) => {
      t2(e2);
    }), t2.promise;
  }, at = function(e, t2) {
    t2 = t2 || ve();
    const n2 = Ye(this.config.env), { cloudPath: s2 } = e;
    return n2.send("storage.getUploadMetadata", { path: s2 }).then((e2) => {
      t2(null, e2);
    }).catch((e2) => {
      t2(e2);
    }), t2.promise;
  }, ct = function({ fileList: e }, t2) {
    if (t2 = t2 || ve(), !e || !Array.isArray(e))
      return { code: "INVALID_PARAM", message: "fileList必须是非空的数组" };
    for (let t3 of e)
      if (!t3 || "string" != typeof t3)
        return { code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" };
    const n2 = { fileid_list: e };
    return Ye(this.config.env).send("storage.batchDeleteFile", n2).then((e2) => {
      e2.code ? t2(null, e2) : t2(null, { fileList: e2.data.delete_list, requestId: e2.requestId });
    }).catch((e2) => {
      t2(e2);
    }), t2.promise;
  }, ut = function({ fileList: e }, t2) {
    t2 = t2 || ve(), e && Array.isArray(e) || t2(null, { code: "INVALID_PARAM", message: "fileList必须是非空的数组" });
    let n2 = [];
    for (let s3 of e)
      "object" == typeof s3 ? (s3.hasOwnProperty("fileID") && s3.hasOwnProperty("maxAge") || t2(null, { code: "INVALID_PARAM", message: "fileList的元素必须是包含fileID和maxAge的对象" }), n2.push({ fileid: s3.fileID, max_age: s3.maxAge })) : "string" == typeof s3 ? n2.push({ fileid: s3 }) : t2(null, { code: "INVALID_PARAM", message: "fileList的元素必须是字符串" });
    const s2 = { file_list: n2 };
    return Ye(this.config.env).send("storage.batchGetDownloadUrl", s2).then((e2) => {
      e2.code ? t2(null, e2) : t2(null, { fileList: e2.data.download_list, requestId: e2.requestId });
    }).catch((e2) => {
      t2(e2);
    }), t2.promise;
  }, ht = async function({ fileID: e }, t2) {
    const n2 = (await ut.call(this, { fileList: [{ fileID: e, maxAge: 600 }] })).fileList[0];
    if ("SUCCESS" !== n2.code)
      return t2 ? t2(n2) : new Promise((e2) => {
        e2(n2);
      });
    const s2 = Ye(this.config.env);
    let r2 = n2.download_url;
    if (r2 = encodeURI(r2), !t2)
      return s2.download({ url: r2 });
    t2(await s2.download({ url: r2 }));
  }, lt = function({ name: e, data: t2, query: n2, parse: s2, search: r2 }, i2) {
    const o2 = i2 || ve();
    let a2;
    try {
      a2 = t2 ? JSON.stringify(t2) : "";
    } catch (e2) {
      return Promise.reject(e2);
    }
    if (!e)
      return Promise.reject(new ne({ code: "PARAM_ERROR", message: "函数名不能为空" }));
    const c2 = { inQuery: n2, parse: s2, search: r2, function_name: e, request_data: a2 };
    return Ye(this.config.env).send("functions.invokeFunction", c2).then((e2) => {
      if (e2.code)
        o2(null, e2);
      else {
        let t3 = e2.data.response_data;
        if (s2)
          o2(null, { result: t3, requestId: e2.requestId });
        else
          try {
            t3 = JSON.parse(e2.data.response_data), o2(null, { result: t3, requestId: e2.requestId });
          } catch (e3) {
            o2(new ne({ message: "response data must be json" }));
          }
      }
      return o2.promise;
    }).catch((e2) => {
      o2(e2);
    }), o2.promise;
  }, dt = { timeout: 15e3, persistence: "session" }, pt = {};
  class ft {
    constructor(e) {
      this.config = e || this.config, this.authObj = void 0;
    }
    init(e) {
      switch (Ce.adapter || (this.requestClient = new Ce.adapter.reqClass({ timeout: e.timeout || 5e3, timeoutMsg: `请求在${(e.timeout || 5e3) / 1e3}s内未完成，已中断` })), this.config = { ...dt, ...e }, true) {
        case this.config.timeout > 6e5:
          console.warn("timeout大于可配置上限[10分钟]，已重置为上限数值"), this.config.timeout = 6e5;
          break;
        case this.config.timeout < 100:
          console.warn("timeout小于可配置下限[100ms]，已重置为下限数值"), this.config.timeout = 100;
      }
      return new ft(this.config);
    }
    auth({ persistence: e } = {}) {
      if (this.authObj)
        return this.authObj;
      const t2 = e || Ce.adapter.primaryStorage || dt.persistence;
      var n2;
      return t2 !== this.config.persistence && (this.config.persistence = t2), function(e2) {
        const { env: t3 } = e2;
        Oe[t3] = new Ee(e2), xe[t3] = new Ee({ ...e2, persistence: "local" });
      }(this.config), n2 = this.config, Qe[n2.env] = new Ve(n2), this.authObj = new it(this.config), this.authObj;
    }
    on(e, t2) {
      return De.apply(this, [e, t2]);
    }
    off(e, t2) {
      return qe.apply(this, [e, t2]);
    }
    callFunction(e, t2) {
      return lt.apply(this, [e, t2]);
    }
    deleteFile(e, t2) {
      return ct.apply(this, [e, t2]);
    }
    getTempFileURL(e, t2) {
      return ut.apply(this, [e, t2]);
    }
    downloadFile(e, t2) {
      return ht.apply(this, [e, t2]);
    }
    uploadFile(e, t2) {
      return ot.apply(this, [e, t2]);
    }
    getUploadMetadata(e, t2) {
      return at.apply(this, [e, t2]);
    }
    registerExtension(e) {
      pt[e.name] = e;
    }
    async invokeExtension(e, t2) {
      const n2 = pt[e];
      if (!n2)
        throw new ne({ message: `扩展${e} 必须先注册` });
      return await n2.invoke(t2, this);
    }
    useAdapters(e) {
      const { adapter: t2, runtime: n2 } = ke(e) || {};
      t2 && (Ce.adapter = t2), n2 && (Ce.runtime = n2);
    }
  }
  var gt = new ft();
  function mt(e, t2, n2) {
    void 0 === n2 && (n2 = {});
    var s2 = /\?/.test(t2), r2 = "";
    for (var i2 in n2)
      "" === r2 ? !s2 && (t2 += "?") : r2 += "&", r2 += i2 + "=" + encodeURIComponent(n2[i2]);
    return /^http(s)?:\/\//.test(t2 += r2) ? t2 : "" + e + t2;
  }
  class yt {
    post(e) {
      const { url: t2, data: n2, headers: s2 } = e;
      return new Promise((e2, r2) => {
        se.request({ url: mt("https:", t2), data: n2, method: "POST", header: s2, success(t3) {
          e2(t3);
        }, fail(e3) {
          r2(e3);
        } });
      });
    }
    upload(e) {
      return new Promise((t2, n2) => {
        const { url: s2, file: r2, data: i2, headers: o2, fileType: a2 } = e, c2 = se.uploadFile({ url: mt("https:", s2), name: "file", formData: Object.assign({}, i2), filePath: r2, fileType: a2, header: o2, success(e2) {
          const n3 = { statusCode: e2.statusCode, data: e2.data || {} };
          200 === e2.statusCode && i2.success_action_status && (n3.statusCode = parseInt(i2.success_action_status, 10)), t2(n3);
        }, fail(e2) {
          n2(new Error(e2.errMsg || "uploadFile:fail"));
        } });
        "function" == typeof e.onUploadProgress && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((t3) => {
          e.onUploadProgress({ loaded: t3.totalBytesSent, total: t3.totalBytesExpectedToSend });
        });
      });
    }
  }
  const _t = { setItem(e, t2) {
    se.setStorageSync(e, t2);
  }, getItem: (e) => se.getStorageSync(e), removeItem(e) {
    se.removeStorageSync(e);
  }, clear() {
    se.clearStorageSync();
  } };
  var wt = { genAdapter: function() {
    return { root: {}, reqClass: yt, localStorage: _t, primaryStorage: "local" };
  }, isMatch: function() {
    return true;
  }, runtime: "uni_app" };
  gt.useAdapters(wt);
  const vt = gt, It = vt.init;
  vt.init = function(e) {
    e.env = e.spaceId;
    const t2 = It.call(this, e);
    t2.config.provider = "tencent", t2.config.spaceId = e.spaceId;
    const n2 = t2.auth;
    return t2.auth = function(e2) {
      const t3 = n2.call(this, e2);
      return ["linkAndRetrieveDataWithTicket", "signInAnonymously", "signOut", "getAccessToken", "getLoginState", "signInWithTicket", "getUserInfo"].forEach((e3) => {
        var n3;
        t3[e3] = (n3 = t3[e3], function(e4) {
          e4 = e4 || {};
          const { success: t4, fail: s2, complete: r2 } = te(e4);
          if (!(t4 || s2 || r2))
            return n3.call(this, e4);
          n3.call(this, e4).then((e5) => {
            t4 && t4(e5), r2 && r2(e5);
          }, (e5) => {
            s2 && s2(e5), r2 && r2(e5);
          });
        }).bind(t3);
      }), t3;
    }, t2.customAuth = t2.auth, t2;
  };
  var St = vt;
  var bt = class extends ge {
    getAccessToken() {
      return new Promise((e, t2) => {
        const n2 = "Anonymous_Access_token";
        this.setAccessToken(n2), e(n2);
      });
    }
    setupRequest(e, t2) {
      const n2 = Object.assign({}, e, { spaceId: this.config.spaceId, timestamp: Date.now() }), s2 = { "Content-Type": "application/json" };
      "auth" !== t2 && (n2.token = this.accessToken, s2["x-basement-token"] = this.accessToken), s2["x-serverless-sign"] = de.sign(n2, this.config.clientSecret);
      const r2 = le();
      s2["x-client-info"] = encodeURIComponent(JSON.stringify(r2));
      const { token: i2 } = ie();
      return s2["x-client-token"] = i2, { url: this.config.requestUrl, method: "POST", data: n2, dataType: "json", header: JSON.parse(JSON.stringify(s2)) };
    }
    uploadFileToOSS({ url: e, formData: t2, name: n2, filePath: s2, fileType: r2, onUploadProgress: i2 }) {
      return new Promise((o2, a2) => {
        const c2 = this.adapter.uploadFile({ url: e, formData: t2, name: n2, filePath: s2, fileType: r2, success(e2) {
          e2 && e2.statusCode < 400 ? o2(e2) : a2(new ne({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
        }, fail(e2) {
          a2(new ne({ code: e2.code || "UPLOAD_FAILED", message: e2.message || e2.errMsg || "文件上传失败" }));
        } });
        "function" == typeof i2 && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((e2) => {
          i2({ loaded: e2.totalBytesSent, total: e2.totalBytesExpectedToSend });
        });
      });
    }
    uploadFile({ filePath: e, cloudPath: t2, fileType: n2 = "image", onUploadProgress: s2 }) {
      if (!t2)
        throw new ne({ code: "CLOUDPATH_REQUIRED", message: "cloudPath不可为空" });
      let r2;
      return this.getOSSUploadOptionsFromPath({ cloudPath: t2 }).then((t3) => {
        const { url: i2, formData: o2, name: a2 } = t3.result;
        r2 = t3.result.fileUrl;
        const c2 = { url: i2, formData: o2, name: a2, filePath: e, fileType: n2 };
        return this.uploadFileToOSS(Object.assign({}, c2, { onUploadProgress: s2 }));
      }).then(() => this.reportOSSUpload({ cloudPath: t2 })).then((t3) => new Promise((n3, s3) => {
        t3.success ? n3({ success: true, filePath: e, fileID: r2 }) : s3(new ne({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
      }));
    }
    deleteFile({ fileList: e }) {
      const t2 = { method: "serverless.file.resource.delete", params: JSON.stringify({ fileList: e }) };
      return this.request(this.setupRequest(t2)).then((e2) => {
        if (e2.success)
          return e2.result;
        throw new ne({ code: "DELETE_FILE_FAILED", message: "删除文件失败" });
      });
    }
    getTempFileURL({ fileList: e } = {}) {
      if (!Array.isArray(e) || 0 === e.length)
        throw new ne({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" });
      const t2 = { method: "serverless.file.resource.getTempFileURL", params: JSON.stringify({ fileList: e }) };
      return this.request(this.setupRequest(t2)).then((e2) => {
        if (e2.success)
          return { fileList: e2.result.fileList.map((e3) => ({ fileID: e3.fileID, tempFileURL: e3.tempFileURL })) };
        throw new ne({ code: "GET_TEMP_FILE_URL_FAILED", message: "获取临时文件链接失败" });
      });
    }
  };
  var kt = { init(e) {
    const t2 = new bt(e), n2 = { signInAnonymously: function() {
      return t2.authorize();
    }, getLoginState: function() {
      return Promise.resolve(false);
    } };
    return t2.auth = function() {
      return n2;
    }, t2.customAuth = t2.auth, t2;
  } };
  function Ct({ data: e }) {
    let t2;
    t2 = le();
    const n2 = JSON.parse(JSON.stringify(e || {}));
    if (Object.assign(n2, { clientInfo: t2 }), !n2.uniIdToken) {
      const { token: e2 } = ie();
      e2 && (n2.uniIdToken = e2);
    }
    return n2;
  }
  async function Tt({ name: e, data: t2 } = {}) {
    await this.__dev__.initLocalNetwork();
    const { localAddress: n2, localPort: s2 } = this.__dev__, r2 = { aliyun: "aliyun", tencent: "tcb" }[this.config.provider], i2 = this.config.spaceId, o2 = `http://${n2}:${s2}/system/check-function`, a2 = `http://${n2}:${s2}/cloudfunctions/${e}`;
    return new Promise((t3, n3) => {
      se.request({ method: "POST", url: o2, data: { name: e, platform: P, provider: r2, spaceId: i2 }, timeout: 3e3, success(e2) {
        t3(e2);
      }, fail() {
        t3({ data: { code: "NETWORK_ERROR", message: "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下，自动切换为已部署的云函数。" } });
      } });
    }).then(({ data: e2 } = {}) => {
      const { code: t3, message: n3 } = e2 || {};
      return { code: 0 === t3 ? 0 : t3 || "SYS_ERR", message: n3 || "SYS_ERR" };
    }).then(({ code: n3, message: s3 }) => {
      if (0 !== n3) {
        switch (n3) {
          case "MODULE_ENCRYPTED":
            console.error(`此云函数（${e}）依赖加密公共模块不可本地调试，自动切换为云端已部署的云函数`);
            break;
          case "FUNCTION_ENCRYPTED":
            console.error(`此云函数（${e}）已加密不可本地调试，自动切换为云端已部署的云函数`);
            break;
          case "ACTION_ENCRYPTED":
            console.error(s3 || "需要访问加密的uni-clientDB-action，自动切换为云端环境");
            break;
          case "NETWORK_ERROR": {
            const e2 = "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下";
            throw console.error(e2), new Error(e2);
          }
          case "SWITCH_TO_CLOUD":
            break;
          default: {
            const e2 = `检测本地调试服务出现错误：${s3}，请检查网络环境或重启客户端再试`;
            throw console.error(e2), new Error(e2);
          }
        }
        return this._callCloudFunction({ name: e, data: t2 });
      }
      return new Promise((e2, n4) => {
        const s4 = Ct.call(this, { data: t2 });
        se.request({ method: "POST", url: a2, data: { provider: r2, platform: P, param: s4 }, success: ({ statusCode: t3, data: s5 } = {}) => !t3 || t3 >= 400 ? n4(new ne({ code: s5.code || "SYS_ERR", message: s5.message || "request:fail" })) : e2({ result: s5 }), fail(e3) {
          n4(new ne({ code: e3.code || e3.errCode || "SYS_ERR", message: e3.message || e3.errMsg || "request:fail" }));
        } });
      });
    });
  }
  const Pt = [{ rule: /fc_function_not_found|FUNCTION_NOT_FOUND/, content: "，云函数[{functionName}]在云端不存在，请检查此云函数名称是否正确以及该云函数是否已上传到服务空间", mode: "append" }];
  var At = /[\\^$.*+?()[\]{}|]/g, Et = RegExp(At.source);
  function Ot(e, t2, n2) {
    return e.replace(new RegExp((s2 = t2) && Et.test(s2) ? s2.replace(At, "\\$&") : s2, "g"), n2);
    var s2;
  }
  const Rt = "request", Ut = "response", Lt = "both";
  const yn = { code: 2e4, message: "System error" }, _n = { code: 20101, message: "Invalid client" };
  function In(e) {
    const { errSubject: t2, subject: n2, errCode: s2, errMsg: r2, code: i2, message: o2, cause: a2 } = e || {};
    return new ne({ subject: t2 || n2 || "uni-secure-network", code: s2 || i2 || yn.code, message: r2 || o2, cause: a2 });
  }
  let bn;
  function An({ secretType: e } = {}) {
    return e === Rt || e === Ut || e === Lt;
  }
  function En({ name: e, data: t2 = {} } = {}) {
    return "DCloud-clientDB" === e && "encryption" === t2.redirectTo && "getAppClientKey" === t2.action;
  }
  function On({ provider: e, spaceId: t2, functionName: n2 } = {}) {
    const { appId: s2, uniPlatform: r2, osName: i2 } = ue();
    let o2 = r2;
    "app" === r2 && (o2 = i2);
    const a2 = function({ provider: e2, spaceId: t3 } = {}) {
      const n3 = T;
      if (!n3)
        return {};
      e2 = function(e3) {
        return "tencent" === e3 ? "tcb" : e3;
      }(e2);
      const s3 = n3.find((n4) => n4.provider === e2 && n4.spaceId === t3);
      return s3 && s3.config;
    }({ provider: e, spaceId: t2 });
    if (!a2 || !a2.accessControl || !a2.accessControl.enable)
      return false;
    const c2 = a2.accessControl.function || {}, u2 = Object.keys(c2);
    if (0 === u2.length)
      return true;
    const h2 = function(e2, t3) {
      let n3, s3, r3;
      for (let i3 = 0; i3 < e2.length; i3++) {
        const o3 = e2[i3];
        o3 !== t3 ? "*" !== o3 ? o3.split(",").map((e3) => e3.trim()).indexOf(t3) > -1 && (s3 = o3) : r3 = o3 : n3 = o3;
      }
      return n3 || s3 || r3;
    }(u2, n2);
    if (!h2)
      return false;
    if ((c2[h2] || []).find((e2 = {}) => e2.appId === s2 && (e2.platform || "").toLowerCase() === o2.toLowerCase()))
      return true;
    throw console.error(`此应用[appId: ${s2}, platform: ${o2}]不在云端配置的允许访问的应用列表内，参考：https://uniapp.dcloud.net.cn/uniCloud/secure-network.html#verify-client`), In(_n);
  }
  function xn({ functionName: e, result: t2, logPvd: n2 }) {
    if (this.__dev__.debugLog && t2 && t2.requestId) {
      const s2 = JSON.stringify({ spaceId: this.config.spaceId, functionName: e, requestId: t2.requestId });
      console.log(`[${n2}-request]${s2}[/${n2}-request]`);
    }
  }
  function Rn(e) {
    const t2 = e.callFunction, n2 = function(n3) {
      const s2 = n3.name;
      n3.data = Ct.call(e, { data: n3.data });
      const r2 = { aliyun: "aliyun", tencent: "tcb", tcb: "tcb" }[this.config.provider], i2 = An(n3), o2 = En(n3), a2 = i2 || o2;
      return t2.call(this, n3).then((e2) => (e2.errCode = 0, !a2 && xn.call(this, { functionName: s2, result: e2, logPvd: r2 }), Promise.resolve(e2)), (e2) => (!a2 && xn.call(this, { functionName: s2, result: e2, logPvd: r2 }), e2 && e2.message && (e2.message = function({ message: e3 = "", extraInfo: t3 = {}, formatter: n4 = [] } = {}) {
        for (let s3 = 0; s3 < n4.length; s3++) {
          const { rule: r3, content: i3, mode: o3 } = n4[s3], a3 = e3.match(r3);
          if (!a3)
            continue;
          let c2 = i3;
          for (let e4 = 1; e4 < a3.length; e4++)
            c2 = Ot(c2, `{$${e4}}`, a3[e4]);
          for (const e4 in t3)
            c2 = Ot(c2, `{${e4}}`, t3[e4]);
          return "replace" === o3 ? c2 : e3 + c2;
        }
        return e3;
      }({ message: `[${n3.name}]: ${e2.message}`, formatter: Pt, extraInfo: { functionName: s2 } })), Promise.reject(e2)));
    };
    e.callFunction = function(t3) {
      const { provider: s2, spaceId: r2 } = e.config, i2 = t3.name;
      let o2, a2;
      if (t3.data = t3.data || {}, e.__dev__.debugInfo && !e.__dev__.debugInfo.forceRemote && E ? (e._callCloudFunction || (e._callCloudFunction = n2, e._callLocalFunction = Tt), o2 = Tt) : o2 = n2, o2 = o2.bind(e), En(t3))
        a2 = n2.call(e, t3);
      else if (An(t3)) {
        a2 = new bn({ secretType: t3.secretType, uniCloudIns: e }).wrapEncryptDataCallFunction(n2.bind(e))(t3);
      } else if (On({ provider: s2, spaceId: r2, functionName: i2 })) {
        a2 = new bn({ secretType: t3.secretType, uniCloudIns: e }).wrapVerifyClientCallFunction(n2.bind(e))(t3);
      } else
        a2 = o2(t3);
      return Object.defineProperty(a2, "result", { get: () => (console.warn("当前返回结果为Promise类型，不可直接访问其result属性，详情请参考：https://uniapp.dcloud.net.cn/uniCloud/faq?id=promise"), {}) }), a2;
    };
  }
  bn = class {
    constructor() {
      throw In({ message: `Platform ${P} is not enabled, please check whether secure network module is enabled in your manifest.json` });
    }
  };
  const Un = Symbol("CLIENT_DB_INTERNAL");
  function Ln(e, t2) {
    return e.then = "DoNotReturnProxyWithAFunctionNamedThen", e._internalType = Un, e.inspect = null, e.__v_raw = void 0, new Proxy(e, { get(e2, n2, s2) {
      if ("_uniClient" === n2)
        return null;
      if ("symbol" == typeof n2)
        return e2[n2];
      if (n2 in e2 || "string" != typeof n2) {
        const t3 = e2[n2];
        return "function" == typeof t3 ? t3.bind(e2) : t3;
      }
      return t2.get(e2, n2, s2);
    } });
  }
  function Nn(e) {
    return { on: (t2, n2) => {
      e[t2] = e[t2] || [], e[t2].indexOf(n2) > -1 || e[t2].push(n2);
    }, off: (t2, n2) => {
      e[t2] = e[t2] || [];
      const s2 = e[t2].indexOf(n2);
      -1 !== s2 && e[t2].splice(s2, 1);
    } };
  }
  const Dn = ["db.Geo", "db.command", "command.aggregate"];
  function Fn(e, t2) {
    return Dn.indexOf(`${e}.${t2}`) > -1;
  }
  function qn(e) {
    switch (g(e = re(e))) {
      case "array":
        return e.map((e2) => qn(e2));
      case "object":
        return e._internalType === Un || Object.keys(e).forEach((t2) => {
          e[t2] = qn(e[t2]);
        }), e;
      case "regexp":
        return { $regexp: { source: e.source, flags: e.flags } };
      case "date":
        return { $date: e.toISOString() };
      default:
        return e;
    }
  }
  function Mn(e) {
    return e && e.content && e.content.$method;
  }
  class Kn {
    constructor(e, t2, n2) {
      this.content = e, this.prevStage = t2 || null, this.udb = null, this._database = n2;
    }
    toJSON() {
      let e = this;
      const t2 = [e.content];
      for (; e.prevStage; )
        e = e.prevStage, t2.push(e.content);
      return { $db: t2.reverse().map((e2) => ({ $method: e2.$method, $param: qn(e2.$param) })) };
    }
    toString() {
      return JSON.stringify(this.toJSON());
    }
    getAction() {
      const e = this.toJSON().$db.find((e2) => "action" === e2.$method);
      return e && e.$param && e.$param[0];
    }
    getCommand() {
      return { $db: this.toJSON().$db.filter((e) => "action" !== e.$method) };
    }
    get isAggregate() {
      let e = this;
      for (; e; ) {
        const t2 = Mn(e), n2 = Mn(e.prevStage);
        if ("aggregate" === t2 && "collection" === n2 || "pipeline" === t2)
          return true;
        e = e.prevStage;
      }
      return false;
    }
    get isCommand() {
      let e = this;
      for (; e; ) {
        if ("command" === Mn(e))
          return true;
        e = e.prevStage;
      }
      return false;
    }
    get isAggregateCommand() {
      let e = this;
      for (; e; ) {
        const t2 = Mn(e), n2 = Mn(e.prevStage);
        if ("aggregate" === t2 && "command" === n2)
          return true;
        e = e.prevStage;
      }
      return false;
    }
    getNextStageFn(e) {
      const t2 = this;
      return function() {
        return jn({ $method: e, $param: qn(Array.from(arguments)) }, t2, t2._database);
      };
    }
    get count() {
      return this.isAggregate ? this.getNextStageFn("count") : function() {
        return this._send("count", Array.from(arguments));
      };
    }
    get remove() {
      return this.isCommand ? this.getNextStageFn("remove") : function() {
        return this._send("remove", Array.from(arguments));
      };
    }
    get() {
      return this._send("get", Array.from(arguments));
    }
    get add() {
      return this.isCommand ? this.getNextStageFn("add") : function() {
        return this._send("add", Array.from(arguments));
      };
    }
    update() {
      return this._send("update", Array.from(arguments));
    }
    end() {
      return this._send("end", Array.from(arguments));
    }
    get set() {
      return this.isCommand ? this.getNextStageFn("set") : function() {
        throw new Error("JQL禁止使用set方法");
      };
    }
    _send(e, t2) {
      const n2 = this.getAction(), s2 = this.getCommand();
      if (s2.$db.push({ $method: e, $param: qn(t2) }), b) {
        const e2 = s2.$db.find((e3) => "collection" === e3.$method), t3 = e2 && e2.$param;
        t3 && 1 === t3.length && "string" == typeof e2.$param[0] && e2.$param[0].indexOf(",") > -1 && console.warn("检测到使用JQL语法联表查询时，未使用getTemp先过滤主表数据，在主表数据量大的情况下可能会查询缓慢。\n- 如何优化请参考此文档：https://uniapp.dcloud.net.cn/uniCloud/jql?id=lookup-with-temp \n- 如果主表数据量很小请忽略此信息，项目发行时不会出现此提示。");
      }
      return this._database._callCloudFunction({ action: n2, command: s2 });
    }
  }
  function jn(e, t2, n2) {
    return Ln(new Kn(e, t2, n2), { get(e2, t3) {
      let s2 = "db";
      return e2 && e2.content && (s2 = e2.content.$method), Fn(s2, t3) ? jn({ $method: t3 }, e2, n2) : function() {
        return jn({ $method: t3, $param: qn(Array.from(arguments)) }, e2, n2);
      };
    } });
  }
  function Bn({ path: e, method: t2 }) {
    return class {
      constructor() {
        this.param = Array.from(arguments);
      }
      toJSON() {
        return { $newDb: [...e.map((e2) => ({ $method: e2 })), { $method: t2, $param: this.param }] };
      }
      toString() {
        return JSON.stringify(this.toJSON());
      }
    };
  }
  function $n(e, t2 = {}) {
    return Ln(new e(t2), { get: (e2, t3) => Fn("db", t3) ? jn({ $method: t3 }, null, e2) : function() {
      return jn({ $method: t3, $param: qn(Array.from(arguments)) }, null, e2);
    } });
  }
  class Wn extends class {
    constructor({ uniClient: e = {}, isJQL: t2 = false } = {}) {
      this._uniClient = e, this._authCallBacks = {}, this._dbCallBacks = {}, e._isDefault && (this._dbCallBacks = U("_globalUniCloudDatabaseCallback")), t2 || (this.auth = Nn(this._authCallBacks)), this._isJQL = t2, Object.assign(this, Nn(this._dbCallBacks)), this.env = Ln({}, { get: (e2, t3) => ({ $env: t3 }) }), this.Geo = Ln({}, { get: (e2, t3) => Bn({ path: ["Geo"], method: t3 }) }), this.serverDate = Bn({ path: [], method: "serverDate" }), this.RegExp = Bn({ path: [], method: "RegExp" });
    }
    getCloudEnv(e) {
      if ("string" != typeof e || !e.trim())
        throw new Error("getCloudEnv参数错误");
      return { $env: e.replace("$cloudEnv_", "") };
    }
    _callback(e, t2) {
      const n2 = this._dbCallBacks;
      n2[e] && n2[e].forEach((e2) => {
        e2(...t2);
      });
    }
    _callbackAuth(e, t2) {
      const n2 = this._authCallBacks;
      n2[e] && n2[e].forEach((e2) => {
        e2(...t2);
      });
    }
    multiSend() {
      const e = Array.from(arguments), t2 = e.map((e2) => {
        const t3 = e2.getAction(), n2 = e2.getCommand();
        if ("getTemp" !== n2.$db[n2.$db.length - 1].$method)
          throw new Error("multiSend只支持子命令内使用getTemp");
        return { action: t3, command: n2 };
      });
      return this._callCloudFunction({ multiCommand: t2, queryList: e });
    }
  } {
    _parseResult(e) {
      return this._isJQL ? e.result : e;
    }
    _callCloudFunction({ action: e, command: t2, multiCommand: n2, queryList: s2 }) {
      function r2(e2, t3) {
        if (n2 && s2)
          for (let n3 = 0; n3 < s2.length; n3++) {
            const r3 = s2[n3];
            r3.udb && "function" == typeof r3.udb.setResult && (t3 ? r3.udb.setResult(t3) : r3.udb.setResult(e2.result.dataList[n3]));
          }
      }
      const i2 = this, o2 = this._isJQL ? "databaseForJQL" : "database";
      function a2(e2) {
        return i2._callback("error", [e2]), q(M(o2, "fail"), e2).then(() => q(M(o2, "complete"), e2)).then(() => (r2(null, e2), Y(B, { type: z, content: e2 }), Promise.reject(e2)));
      }
      const c2 = q(M(o2, "invoke")), u2 = this._uniClient;
      return c2.then(() => u2.callFunction({ name: "DCloud-clientDB", type: l, data: { action: e, command: t2, multiCommand: n2 } })).then((e2) => {
        const { code: t3, message: n3, token: s3, tokenExpired: c3, systemInfo: u3 = [] } = e2.result;
        if (u3)
          for (let e3 = 0; e3 < u3.length; e3++) {
            const { level: t4, message: n4, detail: s4 } = u3[e3], r3 = console["warn" === t4 ? "error" : t4] || console.log;
            let i3 = "[System Info]" + n4;
            s4 && (i3 = `${i3}
详细信息：${s4}`), r3(i3);
          }
        if (t3) {
          return a2(new ne({ code: t3, message: n3, requestId: e2.requestId }));
        }
        e2.result.errCode = e2.result.errCode || e2.result.code, e2.result.errMsg = e2.result.errMsg || e2.result.message, s3 && c3 && (oe({ token: s3, tokenExpired: c3 }), this._callbackAuth("refreshToken", [{ token: s3, tokenExpired: c3 }]), this._callback("refreshToken", [{ token: s3, tokenExpired: c3 }]), Y(W, { token: s3, tokenExpired: c3 }));
        const h2 = [{ prop: "affectedDocs", tips: "affectedDocs不再推荐使用，请使用inserted/deleted/updated/data.length替代" }, { prop: "code", tips: "code不再推荐使用，请使用errCode替代" }, { prop: "message", tips: "message不再推荐使用，请使用errMsg替代" }];
        for (let t4 = 0; t4 < h2.length; t4++) {
          const { prop: n4, tips: s4 } = h2[t4];
          if (n4 in e2.result) {
            const t5 = e2.result[n4];
            Object.defineProperty(e2.result, n4, { get: () => (console.warn(s4), t5) });
          }
        }
        return function(e3) {
          return q(M(o2, "success"), e3).then(() => q(M(o2, "complete"), e3)).then(() => {
            r2(e3, null);
            const t4 = i2._parseResult(e3);
            return Y(B, { type: z, content: t4 }), Promise.resolve(t4);
          });
        }(e2);
      }, (e2) => {
        /fc_function_not_found|FUNCTION_NOT_FOUND/g.test(e2.message) && console.warn("clientDB未初始化，请在web控制台保存一次schema以开启clientDB");
        return a2(new ne({ code: e2.code || "SYSTEM_ERROR", message: e2.message, requestId: e2.requestId }));
      });
    }
  }
  const zn = "token无效，跳转登录页面", Jn = "token过期，跳转登录页面", Hn = { TOKEN_INVALID_TOKEN_EXPIRED: Jn, TOKEN_INVALID_INVALID_CLIENTID: zn, TOKEN_INVALID: zn, TOKEN_INVALID_WRONG_TOKEN: zn, TOKEN_INVALID_ANONYMOUS_USER: zn }, Gn = { "uni-id-token-expired": Jn, "uni-id-check-token-failed": zn, "uni-id-token-not-exist": zn, "uni-id-check-device-feature-failed": zn };
  function Vn(e, t2) {
    let n2 = "";
    return n2 = e ? `${e}/${t2}` : t2, n2.replace(/^\//, "");
  }
  function Qn(e = [], t2 = "") {
    const n2 = [], s2 = [];
    return e.forEach((e2) => {
      true === e2.needLogin ? n2.push(Vn(t2, e2.path)) : false === e2.needLogin && s2.push(Vn(t2, e2.path));
    }), { needLoginPage: n2, notNeedLoginPage: s2 };
  }
  function Yn(e) {
    return e.split("?")[0].replace(/^\//, "");
  }
  function Xn() {
    return function(e) {
      let t2 = e && e.$page && e.$page.fullPath || "";
      return t2 ? ("/" !== t2.charAt(0) && (t2 = "/" + t2), t2) : t2;
    }(function() {
      const e = getCurrentPages();
      return e[e.length - 1];
    }());
  }
  function Zn() {
    return Yn(Xn());
  }
  function es(e = "", t2 = {}) {
    if (!e)
      return false;
    if (!(t2 && t2.list && t2.list.length))
      return false;
    const n2 = t2.list, s2 = Yn(e);
    return n2.some((e2) => e2.pagePath === s2);
  }
  const ts = !!t$1.uniIdRouter;
  const { loginPage: ns, routerNeedLogin: ss, resToLogin: rs, needLoginPage: is, notNeedLoginPage: os, loginPageInTabBar: as } = function({ pages: e = [], subPackages: n2 = [], uniIdRouter: s2 = {}, tabBar: r2 = {} } = t$1) {
    const { loginPage: i2, needLogin: o2 = [], resToLogin: a2 = true } = s2, { needLoginPage: c2, notNeedLoginPage: u2 } = Qn(e), { needLoginPage: h2, notNeedLoginPage: l2 } = function(e2 = []) {
      const t2 = [], n3 = [];
      return e2.forEach((e3) => {
        const { root: s3, pages: r3 = [] } = e3, { needLoginPage: i3, notNeedLoginPage: o3 } = Qn(r3, s3);
        t2.push(...i3), n3.push(...o3);
      }), { needLoginPage: t2, notNeedLoginPage: n3 };
    }(n2);
    return { loginPage: i2, routerNeedLogin: o2, resToLogin: a2, needLoginPage: [...c2, ...h2], notNeedLoginPage: [...u2, ...l2], loginPageInTabBar: es(i2, r2) };
  }();
  if (is.indexOf(ns) > -1)
    throw new Error(`Login page [${ns}] should not be "needLogin", please check your pages.json`);
  function cs(e) {
    const t2 = Zn();
    if ("/" === e.charAt(0))
      return e;
    const [n2, s2] = e.split("?"), r2 = n2.replace(/^\//, "").split("/"), i2 = t2.split("/");
    i2.pop();
    for (let e2 = 0; e2 < r2.length; e2++) {
      const t3 = r2[e2];
      ".." === t3 ? i2.pop() : "." !== t3 && i2.push(t3);
    }
    return "" === i2[0] && i2.shift(), "/" + i2.join("/") + (s2 ? "?" + s2 : "");
  }
  function us(e) {
    const t2 = Yn(cs(e));
    return !(os.indexOf(t2) > -1) && (is.indexOf(t2) > -1 || ss.some((t3) => function(e2, t4) {
      return new RegExp(t4).test(e2);
    }(e, t3)));
  }
  function hs({ redirect: e }) {
    const t2 = Yn(e), n2 = Yn(ns);
    return Zn() !== n2 && t2 !== n2;
  }
  function ls({ api: e, redirect: t2 } = {}) {
    if (!t2 || !hs({ redirect: t2 }))
      return;
    const n2 = function(e2, t3) {
      return "/" !== e2.charAt(0) && (e2 = "/" + e2), t3 ? e2.indexOf("?") > -1 ? e2 + `&uniIdRedirectUrl=${encodeURIComponent(t3)}` : e2 + `?uniIdRedirectUrl=${encodeURIComponent(t3)}` : e2;
    }(ns, t2);
    as ? "navigateTo" !== e && "redirectTo" !== e || (e = "switchTab") : "switchTab" === e && (e = "navigateTo");
    const s2 = { navigateTo: uni.navigateTo, redirectTo: uni.redirectTo, switchTab: uni.switchTab, reLaunch: uni.reLaunch };
    setTimeout(() => {
      s2[e]({ url: n2 });
    });
  }
  function ds({ url: e } = {}) {
    const t2 = { abortLoginPageJump: false, autoToLoginPage: false }, n2 = function() {
      const { token: e2, tokenExpired: t3 } = ie();
      let n3;
      if (e2) {
        if (t3 < Date.now()) {
          const e3 = "uni-id-token-expired";
          n3 = { errCode: e3, errMsg: Gn[e3] };
        }
      } else {
        const e3 = "uni-id-check-token-failed";
        n3 = { errCode: e3, errMsg: Gn[e3] };
      }
      return n3;
    }();
    if (us(e) && n2) {
      n2.uniIdRedirectUrl = e;
      if (G($).length > 0)
        return setTimeout(() => {
          Y($, n2);
        }, 0), t2.abortLoginPageJump = true, t2;
      t2.autoToLoginPage = true;
    }
    return t2;
  }
  function ps() {
    !function() {
      const e2 = Xn(), { abortLoginPageJump: t2, autoToLoginPage: n2 } = ds({ url: e2 });
      t2 || n2 && ls({ api: "redirectTo", redirect: e2 });
    }();
    const e = ["navigateTo", "redirectTo", "reLaunch", "switchTab"];
    for (let t2 = 0; t2 < e.length; t2++) {
      const n2 = e[t2];
      uni.addInterceptor(n2, { invoke(e2) {
        const { abortLoginPageJump: t3, autoToLoginPage: s2 } = ds({ url: e2.url });
        return t3 ? e2 : s2 ? (ls({ api: n2, redirect: cs(e2.url) }), false) : e2;
      } });
    }
  }
  function fs() {
    this.onResponse((e) => {
      const { type: t2, content: n2 } = e;
      let s2 = false;
      switch (t2) {
        case "cloudobject":
          s2 = function(e2) {
            if ("object" != typeof e2)
              return false;
            const { errCode: t3 } = e2 || {};
            return t3 in Gn;
          }(n2);
          break;
        case "clientdb":
          s2 = function(e2) {
            if ("object" != typeof e2)
              return false;
            const { errCode: t3 } = e2 || {};
            return t3 in Hn;
          }(n2);
      }
      s2 && function(e2 = {}) {
        const t3 = G($);
        ee().then(() => {
          const n3 = Xn();
          if (n3 && hs({ redirect: n3 }))
            return t3.length > 0 ? Y($, Object.assign({ uniIdRedirectUrl: n3 }, e2)) : void (ns && ls({ api: "navigateTo", redirect: n3 }));
        });
      }(n2);
    });
  }
  function gs(e) {
    !function(e2) {
      e2.onResponse = function(e3) {
        V(B, e3);
      }, e2.offResponse = function(e3) {
        Q(B, e3);
      };
    }(e), function(e2) {
      e2.onNeedLogin = function(e3) {
        V($, e3);
      }, e2.offNeedLogin = function(e3) {
        Q($, e3);
      }, ts && (U("_globalUniCloudStatus").needLoginInit || (U("_globalUniCloudStatus").needLoginInit = true, ee().then(() => {
        ps.call(e2);
      }), rs && fs.call(e2)));
    }(e), function(e2) {
      e2.onRefreshToken = function(e3) {
        V(W, e3);
      }, e2.offRefreshToken = function(e3) {
        Q(W, e3);
      };
    }(e);
  }
  let ms;
  const ys = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", _s = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
  function ws() {
    const e = ie().token || "", t2 = e.split(".");
    if (!e || 3 !== t2.length)
      return { uid: null, role: [], permission: [], tokenExpired: 0 };
    let n2;
    try {
      n2 = JSON.parse((s2 = t2[1], decodeURIComponent(ms(s2).split("").map(function(e2) {
        return "%" + ("00" + e2.charCodeAt(0).toString(16)).slice(-2);
      }).join(""))));
    } catch (e2) {
      throw new Error("获取当前用户信息出错，详细错误信息为：" + e2.message);
    }
    var s2;
    return n2.tokenExpired = 1e3 * n2.exp, delete n2.exp, delete n2.iat, n2;
  }
  ms = "function" != typeof atob ? function(e) {
    if (e = String(e).replace(/[\t\n\f\r ]+/g, ""), !_s.test(e))
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    var t2;
    e += "==".slice(2 - (3 & e.length));
    for (var n2, s2, r2 = "", i2 = 0; i2 < e.length; )
      t2 = ys.indexOf(e.charAt(i2++)) << 18 | ys.indexOf(e.charAt(i2++)) << 12 | (n2 = ys.indexOf(e.charAt(i2++))) << 6 | (s2 = ys.indexOf(e.charAt(i2++))), r2 += 64 === n2 ? String.fromCharCode(t2 >> 16 & 255) : 64 === s2 ? String.fromCharCode(t2 >> 16 & 255, t2 >> 8 & 255) : String.fromCharCode(t2 >> 16 & 255, t2 >> 8 & 255, 255 & t2);
    return r2;
  } : atob;
  var vs = s(function(e, t2) {
    Object.defineProperty(t2, "__esModule", { value: true });
    const n2 = "chooseAndUploadFile:ok", s2 = "chooseAndUploadFile:fail";
    function r2(e2, t3) {
      return e2.tempFiles.forEach((e3, n3) => {
        e3.name || (e3.name = e3.path.substring(e3.path.lastIndexOf("/") + 1)), t3 && (e3.fileType = t3), e3.cloudPath = Date.now() + "_" + n3 + e3.name.substring(e3.name.lastIndexOf("."));
      }), e2.tempFilePaths || (e2.tempFilePaths = e2.tempFiles.map((e3) => e3.path)), e2;
    }
    function i2(e2, t3, { onChooseFile: s3, onUploadProgress: r3 }) {
      return t3.then((e3) => {
        if (s3) {
          const t4 = s3(e3);
          if (void 0 !== t4)
            return Promise.resolve(t4).then((t5) => void 0 === t5 ? e3 : t5);
        }
        return e3;
      }).then((t4) => false === t4 ? { errMsg: n2, tempFilePaths: [], tempFiles: [] } : function(e3, t5, s4 = 5, r4) {
        (t5 = Object.assign({}, t5)).errMsg = n2;
        const i3 = t5.tempFiles, o2 = i3.length;
        let a2 = 0;
        return new Promise((n3) => {
          for (; a2 < s4; )
            c2();
          function c2() {
            const s5 = a2++;
            if (s5 >= o2)
              return void (!i3.find((e4) => !e4.url && !e4.errMsg) && n3(t5));
            const u2 = i3[s5];
            e3.uploadFile({ filePath: u2.path, cloudPath: u2.cloudPath, fileType: u2.fileType, onUploadProgress(e4) {
              e4.index = s5, e4.tempFile = u2, e4.tempFilePath = u2.path, r4 && r4(e4);
            } }).then((e4) => {
              u2.url = e4.fileID, s5 < o2 && c2();
            }).catch((e4) => {
              u2.errMsg = e4.errMsg || e4.message, s5 < o2 && c2();
            });
          }
        });
      }(e2, t4, 5, r3));
    }
    t2.initChooseAndUploadFile = function(e2) {
      return function(t3 = { type: "all" }) {
        return "image" === t3.type ? i2(e2, function(e3) {
          const { count: t4, sizeType: n3, sourceType: i3 = ["album", "camera"], extension: o2 } = e3;
          return new Promise((e4, a2) => {
            uni.chooseImage({ count: t4, sizeType: n3, sourceType: i3, extension: o2, success(t5) {
              e4(r2(t5, "image"));
            }, fail(e5) {
              a2({ errMsg: e5.errMsg.replace("chooseImage:fail", s2) });
            } });
          });
        }(t3), t3) : "video" === t3.type ? i2(e2, function(e3) {
          const { camera: t4, compressed: n3, maxDuration: i3, sourceType: o2 = ["album", "camera"], extension: a2 } = e3;
          return new Promise((e4, c2) => {
            uni.chooseVideo({ camera: t4, compressed: n3, maxDuration: i3, sourceType: o2, extension: a2, success(t5) {
              const { tempFilePath: n4, duration: s3, size: i4, height: o3, width: a3 } = t5;
              e4(r2({ errMsg: "chooseVideo:ok", tempFilePaths: [n4], tempFiles: [{ name: t5.tempFile && t5.tempFile.name || "", path: n4, size: i4, type: t5.tempFile && t5.tempFile.type || "", width: a3, height: o3, duration: s3, fileType: "video", cloudPath: "" }] }, "video"));
            }, fail(e5) {
              c2({ errMsg: e5.errMsg.replace("chooseVideo:fail", s2) });
            } });
          });
        }(t3), t3) : i2(e2, function(e3) {
          const { count: t4, extension: n3 } = e3;
          return new Promise((e4, i3) => {
            let o2 = uni.chooseFile;
            if ("undefined" != typeof wx && "function" == typeof wx.chooseMessageFile && (o2 = wx.chooseMessageFile), "function" != typeof o2)
              return i3({ errMsg: s2 + " 请指定 type 类型，该平台仅支持选择 image 或 video。" });
            o2({ type: "all", count: t4, extension: n3, success(t5) {
              e4(r2(t5));
            }, fail(e5) {
              i3({ errMsg: e5.errMsg.replace("chooseFile:fail", s2) });
            } });
          });
        }(t3), t3);
      };
    };
  }), Is = n(vs);
  const Ss = "manual";
  function bs(e) {
    return { props: { localdata: { type: Array, default: () => [] }, options: { type: [Object, Array], default: () => ({}) }, spaceInfo: { type: Object, default: () => ({}) }, collection: { type: [String, Array], default: "" }, action: { type: String, default: "" }, field: { type: String, default: "" }, orderby: { type: String, default: "" }, where: { type: [String, Object], default: "" }, pageData: { type: String, default: "add" }, pageCurrent: { type: Number, default: 1 }, pageSize: { type: Number, default: 20 }, getcount: { type: [Boolean, String], default: false }, gettree: { type: [Boolean, String], default: false }, gettreepath: { type: [Boolean, String], default: false }, startwith: { type: String, default: "" }, limitlevel: { type: Number, default: 10 }, groupby: { type: String, default: "" }, groupField: { type: String, default: "" }, distinct: { type: [Boolean, String], default: false }, foreignKey: { type: String, default: "" }, loadtime: { type: String, default: "auto" }, manual: { type: Boolean, default: false } }, data: () => ({ mixinDatacomLoading: false, mixinDatacomHasMore: false, mixinDatacomResData: [], mixinDatacomErrorMessage: "", mixinDatacomPage: {} }), created() {
      this.mixinDatacomPage = { current: this.pageCurrent, size: this.pageSize, count: 0 }, this.$watch(() => {
        var e2 = [];
        return ["pageCurrent", "pageSize", "localdata", "collection", "action", "field", "orderby", "where", "getont", "getcount", "gettree", "groupby", "groupField", "distinct"].forEach((t2) => {
          e2.push(this[t2]);
        }), e2;
      }, (e2, t2) => {
        if (this.loadtime === Ss)
          return;
        let n2 = false;
        const s2 = [];
        for (let r2 = 2; r2 < e2.length; r2++)
          e2[r2] !== t2[r2] && (s2.push(e2[r2]), n2 = true);
        e2[0] !== t2[0] && (this.mixinDatacomPage.current = this.pageCurrent), this.mixinDatacomPage.size = this.pageSize, this.onMixinDatacomPropsChange(n2, s2);
      });
    }, methods: { onMixinDatacomPropsChange(e2, t2) {
    }, mixinDatacomEasyGet({ getone: e2 = false, success: t2, fail: n2 } = {}) {
      this.mixinDatacomLoading || (this.mixinDatacomLoading = true, this.mixinDatacomErrorMessage = "", this.mixinDatacomGet().then((n3) => {
        this.mixinDatacomLoading = false;
        const { data: s2, count: r2 } = n3.result;
        this.getcount && (this.mixinDatacomPage.count = r2), this.mixinDatacomHasMore = s2.length < this.pageSize;
        const i2 = e2 ? s2.length ? s2[0] : void 0 : s2;
        this.mixinDatacomResData = i2, t2 && t2(i2);
      }).catch((e3) => {
        this.mixinDatacomLoading = false, this.mixinDatacomErrorMessage = e3, n2 && n2(e3);
      }));
    }, mixinDatacomGet(t2 = {}) {
      let n2 = e.database(this.spaceInfo);
      const s2 = t2.action || this.action;
      s2 && (n2 = n2.action(s2));
      const r2 = t2.collection || this.collection;
      n2 = Array.isArray(r2) ? n2.collection(...r2) : n2.collection(r2);
      const i2 = t2.where || this.where;
      i2 && Object.keys(i2).length && (n2 = n2.where(i2));
      const o2 = t2.field || this.field;
      o2 && (n2 = n2.field(o2));
      const a2 = t2.foreignKey || this.foreignKey;
      a2 && (n2 = n2.foreignKey(a2));
      const c2 = t2.groupby || this.groupby;
      c2 && (n2 = n2.groupBy(c2));
      const u2 = t2.groupField || this.groupField;
      u2 && (n2 = n2.groupField(u2));
      true === (void 0 !== t2.distinct ? t2.distinct : this.distinct) && (n2 = n2.distinct());
      const h2 = t2.orderby || this.orderby;
      h2 && (n2 = n2.orderBy(h2));
      const l2 = void 0 !== t2.pageCurrent ? t2.pageCurrent : this.mixinDatacomPage.current, d2 = void 0 !== t2.pageSize ? t2.pageSize : this.mixinDatacomPage.size, p2 = void 0 !== t2.getcount ? t2.getcount : this.getcount, f2 = void 0 !== t2.gettree ? t2.gettree : this.gettree, g2 = void 0 !== t2.gettreepath ? t2.gettreepath : this.gettreepath, m2 = { getCount: p2 }, y2 = { limitLevel: void 0 !== t2.limitlevel ? t2.limitlevel : this.limitlevel, startWith: void 0 !== t2.startwith ? t2.startwith : this.startwith };
      return f2 && (m2.getTree = y2), g2 && (m2.getTreePath = y2), n2 = n2.skip(d2 * (l2 - 1)).limit(d2).get(m2), n2;
    } } };
  }
  function ks(e) {
    return function(t2, n2 = {}) {
      n2 = function(e2, t3 = {}) {
        return e2.customUI = t3.customUI || e2.customUI, e2.parseSystemError = t3.parseSystemError || e2.parseSystemError, Object.assign(e2.loadingOptions, t3.loadingOptions), Object.assign(e2.errorOptions, t3.errorOptions), "object" == typeof t3.secretMethods && (e2.secretMethods = t3.secretMethods), e2;
      }({ customUI: false, loadingOptions: { title: "加载中...", mask: true }, errorOptions: { type: "modal", retry: false } }, n2);
      const { customUI: s2, loadingOptions: r2, errorOptions: i2, parseSystemError: o2 } = n2, a2 = !s2;
      return new Proxy({}, { get: (s3, c2) => function({ fn: e2, interceptorName: t3, getCallbackArgs: n3 } = {}) {
        return async function(...s4) {
          const r3 = n3 ? n3({ params: s4 }) : {};
          let i3, o3;
          try {
            return await q(M(t3, "invoke"), { ...r3 }), i3 = await e2(...s4), await q(M(t3, "success"), { ...r3, result: i3 }), i3;
          } catch (e3) {
            throw o3 = e3, await q(M(t3, "fail"), { ...r3, error: o3 }), o3;
          } finally {
            await q(M(t3, "complete"), o3 ? { ...r3, error: o3 } : { ...r3, result: i3 });
          }
        };
      }({ fn: async function s4(...u2) {
        let l2;
        a2 && uni.showLoading({ title: r2.title, mask: r2.mask });
        const d2 = { name: t2, type: h, data: { method: c2, params: u2 } };
        "object" == typeof n2.secretMethods && function(e2, t3) {
          const n3 = t3.data.method, s5 = e2.secretMethods || {}, r3 = s5[n3] || s5["*"];
          r3 && (t3.secretType = r3);
        }(n2, d2);
        let p2 = false;
        try {
          l2 = await e.callFunction(d2);
        } catch (e2) {
          p2 = true, l2 = { result: new ne(e2) };
        }
        const { errSubject: f2, errCode: g2, errMsg: m2, newToken: y2 } = l2.result || {};
        if (a2 && uni.hideLoading(), y2 && y2.token && y2.tokenExpired && (oe(y2), Y(W, { ...y2 })), g2) {
          let e2 = m2;
          if (p2 && o2) {
            e2 = (await o2({ objectName: t2, methodName: c2, params: u2, errSubject: f2, errCode: g2, errMsg: m2 })).errMsg || m2;
          }
          if (a2)
            if ("toast" === i2.type)
              uni.showToast({ title: e2, icon: "none" });
            else {
              if ("modal" !== i2.type)
                throw new Error(`Invalid errorOptions.type: ${i2.type}`);
              {
                const { confirm: t3 } = await async function({ title: e3, content: t4, showCancel: n4, cancelText: s5, confirmText: r3 } = {}) {
                  return new Promise((i3, o3) => {
                    uni.showModal({ title: e3, content: t4, showCancel: n4, cancelText: s5, confirmText: r3, success(e4) {
                      i3(e4);
                    }, fail() {
                      i3({ confirm: false, cancel: true });
                    } });
                  });
                }({ title: "提示", content: e2, showCancel: i2.retry, cancelText: "取消", confirmText: i2.retry ? "重试" : "确定" });
                if (i2.retry && t3)
                  return s4(...u2);
              }
            }
          const n3 = new ne({ subject: f2, code: g2, message: m2, requestId: l2.requestId });
          throw n3.detail = l2.result, Y(B, { type: H, content: n3 }), n3;
        }
        return Y(B, { type: H, content: l2.result }), l2.result;
      }, interceptorName: "callObject", getCallbackArgs: function({ params: e2 } = {}) {
        return { objectName: t2, methodName: c2, params: e2 };
      } }) });
    };
  }
  function Cs(e) {
    return U("_globalUniCloudSecureNetworkCache__{spaceId}".replace("{spaceId}", e.config.spaceId));
  }
  async function Ts({ openid: e, callLoginByWeixin: t2 = false } = {}) {
    Cs(this);
    throw new Error(`[SecureNetwork] API \`initSecureNetworkByWeixin\` is not supported on platform \`${P}\``);
  }
  async function Ps(e) {
    const t2 = Cs(this);
    return t2.initPromise || (t2.initPromise = Ts.call(this, e)), t2.initPromise;
  }
  function As(e) {
    return function({ openid: t2, callLoginByWeixin: n2 = false } = {}) {
      return Ps.call(e, { openid: t2, callLoginByWeixin: n2 });
    };
  }
  function Es(e) {
    const t2 = { getSystemInfo: uni.getSystemInfo, getPushClientId: uni.getPushClientId };
    return function(n2) {
      return new Promise((s2, r2) => {
        t2[e]({ ...n2, success(e2) {
          s2(e2);
        }, fail(e2) {
          r2(e2);
        } });
      });
    };
  }
  class Os extends class {
    constructor() {
      this._callback = {};
    }
    addListener(e, t2) {
      this._callback[e] || (this._callback[e] = []), this._callback[e].push(t2);
    }
    on(e, t2) {
      return this.addListener(e, t2);
    }
    removeListener(e, t2) {
      if (!t2)
        throw new Error('The "listener" argument must be of type function. Received undefined');
      const n2 = this._callback[e];
      if (!n2)
        return;
      const s2 = function(e2, t3) {
        for (let n3 = e2.length - 1; n3 >= 0; n3--)
          if (e2[n3] === t3)
            return n3;
        return -1;
      }(n2, t2);
      n2.splice(s2, 1);
    }
    off(e, t2) {
      return this.removeListener(e, t2);
    }
    removeAllListener(e) {
      delete this._callback[e];
    }
    emit(e, ...t2) {
      const n2 = this._callback[e];
      if (n2)
        for (let e2 = 0; e2 < n2.length; e2++)
          n2[e2](...t2);
    }
  } {
    constructor() {
      super(), this._uniPushMessageCallback = this._receivePushMessage.bind(this), this._currentMessageId = -1, this._payloadQueue = [];
    }
    init() {
      return Promise.all([Es("getSystemInfo")(), Es("getPushClientId")()]).then(([{ appId: e } = {}, { cid: t2 } = {}] = []) => {
        if (!e)
          throw new Error("Invalid appId, please check the manifest.json file");
        if (!t2)
          throw new Error("Invalid push client id");
        this._appId = e, this._pushClientId = t2, this._seqId = Date.now() + "-" + Math.floor(9e5 * Math.random() + 1e5), this.emit("open"), this._initMessageListener();
      }, (e) => {
        throw this.emit("error", e), this.close(), e;
      });
    }
    async open() {
      return this.init();
    }
    _isUniCloudSSE(e) {
      if ("receive" !== e.type)
        return false;
      const t2 = e && e.data && e.data.payload;
      return !(!t2 || "UNI_CLOUD_SSE" !== t2.channel || t2.seqId !== this._seqId);
    }
    _receivePushMessage(e) {
      if (!this._isUniCloudSSE(e))
        return;
      const t2 = e && e.data && e.data.payload, { action: n2, messageId: s2, message: r2 } = t2;
      this._payloadQueue.push({ action: n2, messageId: s2, message: r2 }), this._consumMessage();
    }
    _consumMessage() {
      for (; ; ) {
        const e = this._payloadQueue.find((e2) => e2.messageId === this._currentMessageId + 1);
        if (!e)
          break;
        this._currentMessageId++, this._parseMessagePayload(e);
      }
    }
    _parseMessagePayload(e) {
      const { action: t2, messageId: n2, message: s2 } = e;
      "end" === t2 ? this._end({ messageId: n2, message: s2 }) : "message" === t2 && this._appendMessage({ messageId: n2, message: s2 });
    }
    _appendMessage({ messageId: e, message: t2 } = {}) {
      this.emit("message", t2);
    }
    _end({ messageId: e, message: t2 } = {}) {
      this.emit("end", t2), this.close();
    }
    _initMessageListener() {
      uni.onPushMessage(this._uniPushMessageCallback);
    }
    _destroy() {
      uni.offPushMessage(this._uniPushMessageCallback);
    }
    toJSON() {
      return { appId: this._appId, pushClientId: this._pushClientId, seqId: this._seqId };
    }
    close() {
      this._destroy(), this.emit("close");
    }
  }
  async function xs(e, t2) {
    const n2 = `http://${e}:${t2}/system/ping`;
    try {
      const e2 = await (s2 = { url: n2, timeout: 500 }, new Promise((e3, t3) => {
        se.request({ ...s2, success(t4) {
          e3(t4);
        }, fail(e4) {
          t3(e4);
        } });
      }));
      return !(!e2.data || 0 !== e2.data.code);
    } catch (e2) {
      return false;
    }
    var s2;
  }
  async function Rs(e) {
    {
      const { osName: e2, osVersion: t3 } = ue();
      "ios" === e2 && function(e3) {
        if (!e3 || "string" != typeof e3)
          return 0;
        const t4 = e3.match(/^(\d+)./);
        return t4 && t4[1] ? parseInt(t4[1]) : 0;
      }(t3) >= 14 && console.warn("iOS 14及以上版本连接uniCloud本地调试服务需要允许客户端查找并连接到本地网络上的设备（仅开发模式生效，发行模式会连接uniCloud云端服务）");
    }
    const t2 = e.__dev__;
    if (!t2.debugInfo)
      return;
    const { address: n2, servePort: s2 } = t2.debugInfo, { address: r2 } = await async function(e2, t3) {
      let n3;
      for (let s3 = 0; s3 < e2.length; s3++) {
        const r3 = e2[s3];
        if (await xs(r3, t3)) {
          n3 = r3;
          break;
        }
      }
      return { address: n3, port: t3 };
    }(n2, s2);
    if (r2)
      return t2.localAddress = r2, void (t2.localPort = s2);
    const i2 = console["error"];
    let o2 = "";
    if ("remote" === t2.debugInfo.initialLaunchType ? (t2.debugInfo.forceRemote = true, o2 = "当前客户端和HBuilderX不在同一局域网下（或其他网络原因无法连接HBuilderX），uniCloud本地调试服务不对当前客户端生效。\n- 如果不使用uniCloud本地调试服务，请直接忽略此信息。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。") : o2 = "无法连接uniCloud本地调试服务，请检查当前客户端是否与主机在同一局域网下。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。", o2 += "\n- 如果在HBuilderX开启的状态下切换过网络环境，请重启HBuilderX后再试\n- 检查系统防火墙是否拦截了HBuilderX自带的nodejs\n- 检查是否错误的使用拦截器修改uni.request方法的参数", 0 === P.indexOf("mp-") && (o2 += "\n- 小程序中如何使用uniCloud，请参考：https://uniapp.dcloud.net.cn/uniCloud/publish.html#useinmp"), !t2.debugInfo.forceRemote)
      throw new Error(o2);
    i2(o2);
  }
  function Us(e) {
    e._initPromiseHub || (e._initPromiseHub = new I({ createPromise: function() {
      let t2 = Promise.resolve();
      var n2;
      n2 = 1, t2 = new Promise((e2) => {
        setTimeout(() => {
          e2();
        }, n2);
      });
      const s2 = e.auth();
      return t2.then(() => s2.getLoginState()).then((e2) => e2 ? Promise.resolve() : s2.signInAnonymously());
    } }));
  }
  const Ls = { tcb: St, tencent: St, aliyun: me, private: kt };
  let Ns = new class {
    init(e) {
      let t2 = {};
      const n2 = Ls[e.provider];
      if (!n2)
        throw new Error("未提供正确的provider参数");
      t2 = n2.init(e), function(e2) {
        const t3 = {};
        e2.__dev__ = t3, t3.debugLog = "app" === P;
        const n3 = A;
        n3 && !n3.code && (t3.debugInfo = n3);
        const s2 = new I({ createPromise: function() {
          return Rs(e2);
        } });
        t3.initLocalNetwork = function() {
          return s2.exec();
        };
      }(t2), Us(t2), Rn(t2), function(e2) {
        const t3 = e2.uploadFile;
        e2.uploadFile = function(e3) {
          return t3.call(this, e3);
        };
      }(t2), function(e2) {
        e2.database = function(t3) {
          if (t3 && Object.keys(t3).length > 0)
            return e2.init(t3).database();
          if (this._database)
            return this._database;
          const n3 = $n(Wn, { uniClient: e2 });
          return this._database = n3, n3;
        }, e2.databaseForJQL = function(t3) {
          if (t3 && Object.keys(t3).length > 0)
            return e2.init(t3).databaseForJQL();
          if (this._databaseForJQL)
            return this._databaseForJQL;
          const n3 = $n(Wn, { uniClient: e2, isJQL: true });
          return this._databaseForJQL = n3, n3;
        };
      }(t2), function(e2) {
        e2.getCurrentUserInfo = ws, e2.chooseAndUploadFile = Is.initChooseAndUploadFile(e2), Object.assign(e2, { get mixinDatacom() {
          return bs(e2);
        } }), e2.SSEChannel = Os, e2.initSecureNetworkByWeixin = As(e2), e2.importObject = ks(e2);
      }(t2);
      return ["callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "chooseAndUploadFile"].forEach((e2) => {
        if (!t2[e2])
          return;
        const n3 = t2[e2];
        t2[e2] = function() {
          return n3.apply(t2, Array.from(arguments));
        }, t2[e2] = function(e3, t3) {
          return function(n4) {
            let s2 = false;
            if ("callFunction" === t3) {
              const e4 = n4 && n4.type || u;
              s2 = e4 !== u;
            }
            const r2 = "callFunction" === t3 && !s2, i2 = this._initPromiseHub.exec();
            n4 = n4 || {};
            const { success: o2, fail: a2, complete: c2 } = te(n4), h2 = i2.then(() => s2 ? Promise.resolve() : q(M(t3, "invoke"), n4)).then(() => e3.call(this, n4)).then((e4) => s2 ? Promise.resolve(e4) : q(M(t3, "success"), e4).then(() => q(M(t3, "complete"), e4)).then(() => (r2 && Y(B, { type: J, content: e4 }), Promise.resolve(e4))), (e4) => s2 ? Promise.reject(e4) : q(M(t3, "fail"), e4).then(() => q(M(t3, "complete"), e4)).then(() => (Y(B, { type: J, content: e4 }), Promise.reject(e4))));
            if (!(o2 || a2 || c2))
              return h2;
            h2.then((e4) => {
              o2 && o2(e4), c2 && c2(e4), r2 && Y(B, { type: J, content: e4 });
            }, (e4) => {
              a2 && a2(e4), c2 && c2(e4), r2 && Y(B, { type: J, content: e4 });
            });
          };
        }(t2[e2], e2).bind(t2);
      }), t2.init = this.init, t2;
    }
  }();
  (() => {
    const e = E;
    let t2 = {};
    if (e && 1 === e.length)
      t2 = e[0], Ns = Ns.init(t2), Ns._isDefault = true;
    else {
      const t3 = ["auth", "callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "database", "getCurrentUSerInfo", "importObject"];
      let n2;
      n2 = e && e.length > 0 ? "应用有多个服务空间，请通过uniCloud.init方法指定要使用的服务空间" : "应用未关联服务空间，请在uniCloud目录右键关联服务空间", t3.forEach((e2) => {
        Ns[e2] = function() {
          return console.error(n2), Promise.reject(new ne({ code: "SYS_ERR", message: n2 }));
        };
      });
    }
    Object.assign(Ns, { get mixinDatacom() {
      return bs(Ns);
    } }), gs(Ns), Ns.addInterceptor = D, Ns.removeInterceptor = F, Ns.interceptObject = K;
  })();
  var Ds = Ns;
  const en = {
    "uni-load-more.contentdown": "Pull up to show more",
    "uni-load-more.contentrefresh": "loading...",
    "uni-load-more.contentnomore": "No more data"
  };
  const zhHans = {
    "uni-load-more.contentdown": "上拉显示更多",
    "uni-load-more.contentrefresh": "正在加载...",
    "uni-load-more.contentnomore": "没有更多数据了"
  };
  const zhHant = {
    "uni-load-more.contentdown": "上拉顯示更多",
    "uni-load-more.contentrefresh": "正在加載...",
    "uni-load-more.contentnomore": "沒有更多數據了"
  };
  const messages = {
    en,
    "zh-Hans": zhHans,
    "zh-Hant": zhHant
  };
  let platform;
  setTimeout(() => {
    platform = uni.getSystemInfoSync().platform;
  }, 16);
  const {
    t
  } = initVueI18n(messages);
  const _sfc_main$E = {
    name: "UniLoadMore",
    emits: ["clickLoadMore"],
    props: {
      status: {
        // 上拉的状态：more-loading前；loading-loading中；noMore-没有更多了
        type: String,
        default: "more"
      },
      showIcon: {
        type: Boolean,
        default: true
      },
      iconType: {
        type: String,
        default: "auto"
      },
      iconSize: {
        type: Number,
        default: 24
      },
      color: {
        type: String,
        default: "#777777"
      },
      contentText: {
        type: Object,
        default() {
          return {
            contentdown: "",
            contentrefresh: "",
            contentnomore: ""
          };
        }
      },
      showText: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        webviewHide: false,
        platform,
        imgBase64: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzlBMzU3OTlEOUM0MTFFOUI0NTZDNERBQURBQzI4RkUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzlBMzU3OUFEOUM0MTFFOUI0NTZDNERBQURBQzI4RkUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDOUEzNTc5N0Q5QzQxMUU5QjQ1NkM0REFBREFDMjhGRSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDOUEzNTc5OEQ5QzQxMUU5QjQ1NkM0REFBREFDMjhGRSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pt+ALSwAAA6CSURBVHja1FsLkFZVHb98LM+F5bHL8khA1iSeiyQBCRM+YGqKUnnJTDLGI0BGZlKDIU2MMglUiDApEZvSsZnQtBRJtKwQNKQMFYeRDR10WOLd8ljYXdh+v8v5fR3Od+797t1dnOnO/Ofce77z+J//+b/P+ZqtXbs2sJ9MJhNUV1cHJ06cCJo3bx7EPc2aNcvpy7pWrVoF+/fvDyoqKoI2bdoE9fX1F7TjN8a+EXBn/fkfvw942Tf+wYMHg9mzZwfjxo0LDhw4EPa1x2MbFw/fOGfPng1qa2tzcCkILsLDydq2bRsunpOTMM7TD/W/tZDZhPdeKD+yGxHhdu3aBV27dg3OnDlzMVANMheLAO3btw8KCwuDmpoaX5OxbgUIMEq7K8IcPnw4KCsrC/r37x8cP378/4cAXAB3vqSkJMuiDhTkw+XcuXNhOWbMmKBly5YhUT8xArhyFvP0BfwRsAuwxJZJsm/nzp2DTp06he/OU+cZ64K6o0ePBkOHDg2GDx8e6gEbJ5Q/NHNuAJQ1hgBeHUDlR7nVTkY8rQAvAi4z34vR/mPs1FoRsaCgIJThI0eOBC1atEiFGGV+5MiRoS45efJkqFjJFXV1dQuA012m2WcwTw98fy6CqBdsaiIO4CScrGPHjvk4odhavPquRtFWXEC25VgkREKOCh/qDSq+vn37htzD/mZTOmOc5U7zKzBPEedygWshcDyWvs30igAbU+6oyMgJBCFhwQE0fccxN60Ay9iebbjoDh06hMowjQxT4fXq1SskArmHZpkArvixp/kWzHdMeArExSJEaiXIjjRjRJ4DaAGWpibLzXN3Fm1vA5teBgh3j1Rv3bp1YgKwPdmf2p9zcyNYYgPKMfY0T5f5nNYdw158nJ8QawW4CLKwiOBSEgO/hok2eBydR+3dYH+PLxA5J8Vv0KBBwenTp0P2JWAx6+yFEBfs8lMY+y0SWMBNI9E4ThKi58VKTg3FQZS1RQF1cz27eC0QHMu+3E0SkUowjhVt5VdaWhp07949ZHv2Qd1EjDXM2cla1M0nl3GxAs3J9yREzyTdFVKVFOaE9qRA8GM0WebRuo9JGZKA7Mv2SeS/Z8+eoQ9BArMfFrLGo6jvxbhHbJZnKX2Rzz1O7QhJJ9Cs2ZMaWIyq/zhdeqPNfIoHd58clIQD+JSXl4dKlyIAuBdVXZwFVWKspSSoxE++h8x4k3uCnEhE4I5KwRiFWGOU0QWKiCYLbdoRMRKAu2kQ9vkfLU6dOhX06NEjlH+yMRZSinnuyWnYosVcji8CEA/6Cg2JF+IIUBqnGKUTCNwtwBN4f89RiK1R96DEgO2o0NDmtEdvVFdVVYV+P3UAPUEs6GFwV3PHmXkD4vh74iDFJysVI/MlaQhwKeBNTLYX5VuA8T4/gZxA4MRGFxDB6R7OmYPfyykGRJbyie+XnGYnQIC/coH9+vULiYrxrkL9ZA9+0ykaHIfEpM7ge8TiJ2CsHYwyMfafAF1yCGBHYIbCVDjDjKt7BeB51D+LgQa6OkG7IDYEEtvQ7lnXLKLtLdLuJBpE4gPUXcW2+PkZwOex+4cGDhwYDBkyRL7/HFcEwUGPo/8uWRUpYnfxGHco8HkewLHLyYmAawAPuIFZxhOpDfJQ8gbUv41yORAptMWBNr6oqMhWird5+u+iHmBb2nhjDV7HWBNQTgK8y11l5NetWzc5ULscAtSj7nbNI0skhWeUZCc0W4nyH/jO4Vz0u1IeYhbk4AiwM6tjxIWByHsoZ9qcIBPJd/y+DwPfBESOmCa/QF3WiZHucLlEDpNxcNhmheEOPgdQNx6/VZFQzFZ5TN08AHXQt2Ii3EdyFuUsPtTcGPhW5iMiCNELvz+Gdn9huG4HUJaW/w3g0wxV0XaG7arG2WeKiUWYM4Y7GO5ezshTARbbWGw/DvXkpp/ivVvE0JVoMxN4rpGzJMhE5Pl+xlATsDIqikP9F9D2z3h9nOksEUFhK+qO4rcPkoalMQ/HqJLIyb3F3JdjrCcw1yZ8joyJLR5gCo54etlag7qIoeNh1N1BRYj3DTFJ0elotxPlVzkGuYAmL0VSJVGAJA41c4Z6A3BzTLfn0HYwYKEI6CUAMzZEWvLsIcQOo1AmmyyM72nHJCfYsogflGV6jEk9vyQZXSuq6w4c16NsGcGZbwOPr+H1RkOk2LEzjNepxQkihHSCQ4ynAYNRx2zMKV92CQMWqj8J0BRE8EShxRFN6YrfCRhC0x3r/Zm4IbQCcmJoV0kMamllccR6FjHqUC5F2R/wS2dcymOlfAKOS4KmzQb5cpNC2MC7JhVn5wjXoJ44rYhLh8n0eXOCorJxa7POjbSlCGVczr34/RsAmrcvo9s+wGp3tzVhntxiXiJ4nvEYb4FJkf0O8HocAePmLvCxnL0AORraVekJk6TYjDabRVXfRE2lCN1h6ZQRN1+InUbsCpKwoBZHh0dODN9JBCUffItXxEavTQkUtnfTVAplCWL3JISz29h4NjotnuSsQKJCk8dF+kJR6RARjrqFVmfPnj3ZbK8cIJ0msd6jgHPGtfVTQ8VLmlvh4mct9sobRmPic0DyDQQnx/NlfYUgyz59+oScsH379pAwXABD32nTpoUHIToESeI5mnbE/UqDdyLcafEBf2MCqgC7NwxIbMREJQ0g4D4sfJwnD+AmRrII05cfMWJE+L1169bQr+fip06dGp4oJ83lmYd5wj/EmMa4TaHivo4EeCguYZBnkB5g2aWA69OIEnUHOaGysjIYMGBAMGnSpODYsWPZwCpFmm4lNq+4gSLQA7jcX8DwtjEyRC8wjabnXEx9kfWnTJkSJkAo90xpJVV+FmcVNeYAF5zWngS4C4O91MBxmAv8blLEpbjI5sz9MTdAhcgkCT1RO8mZkAjfiYpTEvStAS53Uw1vAiUGgZ3GpuQEYvoiBqlIan7kSDHnTwJQFNiPu0+5VxCVYhcZIjNrdXUDdp+Eq5AZ3Gkg8QAyVZRZIk4Tl4QAbF9cXJxNYZMAtAokgs4BrNxEpCtteXg7DDTMDKYNSuQdKsnJBek7HxewvxaosWxLYXtw+cJp18217wql4aKCfBNoEu0O5VU+PhctJ0YeXD4C6JQpyrlpSLTojpGGGN5YwNziChdIZLk4lvLcFJ9jMX3QdiImY9bmGQU+TRUL5CHITTRlgF8D9ouD1MfmLoEPl5xokIumZ2cfgMpHt47IW9N64Hsh7wQYYjyIugWuF5fCqYncXRd5vPMWyizzvhi/32+nvG0dZc9vR6fZOu0md5e+uC408FvKSIOZwXlGvxPv95izA2Vtvg1xKFWARI+vMX66HUhpQQb643uW1bSjuTWyw2SBvDrBvjFic1eGGlz5esq3ko9uSIlBRqPuFcCv8F4WIcN12nVaBd0SaYwI6PDDImR11JkqgHcPmQssjxIn6bUshygDFJUTxPMpHk+jfjPgupgdnYV2R/g7xSjtpah8RJBewhwf0gGK6XI92u4wXFEU40afJ4DN4h5LcAd+40HI3JgJecuT0c062W0i2hQJUTcxan3/CMW1PF2K6bbA+Daz4xRs1D3Br1Cm0OihKCqizW78/nXAF/G5TXrEcVzaNMH6CyMswqsAHqDyDLEyou8lwOXnKF8DjI6KjV3KzMBiXkDH8ij/H214J5A596ekrZ3F0zXlWeL7+P5eUrNo3/QwC15uxthuzidy7DzKRwEDaAViiDgKbTbz7CJnzo0bN7pIfIiid8SuPwn25o3QCmpnyjlZkyxPP8EomCJzrGb7GJMx7tNsq4MT2xMUYaiErZOluTzKsnz3gwCeCZyVRZJfYplNEokEjwrPtxlxjeYAk+F1F74VAzPxQRNYYdtpOUvWs8J1sGhBJMNsb7igN8plJs1eSmLIhLKE4rvaCX27gOhLpLOsIzJ7qn/i+wZzcvSOZ23/du8TZjwV8zHIXoP4R3ifBxiFz1dcVpa3aPntPE+c6TmIWE9EtcMmAcPdWAhYhAXxcLOQi9L1WhD1Sc8p1d2oL7XGiRKp8F4A2i8K/nfI+y/gsTDJ/YC/8+AD5Uh04KHiGl+cIFPnBDDrPMjwRGkLXyxO4VGbfQWnDH2v0bVWE3C9QOXlepbgjEfIJQI6XDG3z5ahD9cw2pS78ipB85wyScNTvsVzlzzhL8/jRrnmVjfFJK/m3m4nj9vbgQTguT8XZTjsm672R5uJKEaQmBI/c58gyus8ZDagLpEVSJBIyHp4jn++xqPV71OgQgJYEWOtZ/haxRtKmWOBu8xdBLftWltsY84zE6WIEy/eIOWL+BaayMx+KHtL7EAkqdNDLiEXmEMUHniedtJqg9HmZtfvt26vNi0BdG3Ft3g8ZOf7PAu59TxtzivLNIekyi+wD1i8CuUiD9FXAa8C+/xS3JPmZnomyc7H+fb4/Se0bk41Fel621r4cgVxbq91V4jVqwB7HTe2M7jgB+QWHavZkDRPmZcASoZEmBx6i75bGjPcMdL4/VKGFAGWZkGzPG0XAbdL9A81G5LOmUnC9hHKJeO7dcUMjblSl12867ElFTtaGl20xvvLGPdVz/8TVuU7y0x1PG7vtNg24oz9Uo/Z412++VFWI7Fcog9tu9Lm6gvRmIPv9x1xmQAu6RDkXtbOtlGEmpgD5Nvnyc0dcv0EE6cfdi1HmhMf9wDF3k3gtRvEedhxjpgfqPb9PU9iEJHnyOUA7bQUXh6kq/D7l2iTjWv7XOD530BDr8jIrus+srXjt4MzumJMHuTsBa63YKE1+RR5lBjEikCCnWKWiHdzOgKO+nRIBAF88za/IFmJ3eMZov4CYxGBabcpGL8EYx+SeMXJeRwHNsV/h+vdxeuhEpN3ZyNY78Gm2fknJxVGhyjixPiQvVkNzT1elD9Py/aTAL64Hb9vcYmC9zfdXdT/C1LeGbg4rnBaAihDFJH12W5ulfNCNe/xTsP3bp8ikzJs5BF+5PNfAQYAPaseTdsEcaYAAAAASUVORK5CYII="
      };
    },
    computed: {
      iconSnowWidth() {
        return (Math.floor(this.iconSize / 24) || 1) * 2;
      },
      contentdownText() {
        return this.contentText.contentdown || t("uni-load-more.contentdown");
      },
      contentrefreshText() {
        return this.contentText.contentrefresh || t("uni-load-more.contentrefresh");
      },
      contentnomoreText() {
        return this.contentText.contentnomore || t("uni-load-more.contentnomore");
      }
    },
    mounted() {
      var pages2 = getCurrentPages();
      var page = pages2[pages2.length - 1];
      var currentWebview = page.$getAppWebview();
      currentWebview.addEventListener("hide", () => {
        this.webviewHide = true;
      });
      currentWebview.addEventListener("show", () => {
        this.webviewHide = false;
      });
    },
    methods: {
      onClick() {
        this.$emit("clickLoadMore", {
          detail: {
            status: this.status
          }
        });
      }
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "uni-load-more",
      onClick: _cache[0] || (_cache[0] = (...args) => $options.onClick && $options.onClick(...args))
    }, [
      !$data.webviewHide && ($props.iconType === "circle" || $props.iconType === "auto" && $data.platform === "android") && $props.status === "loading" && $props.showIcon ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 0,
          style: vue.normalizeStyle({ width: $props.iconSize + "px", height: $props.iconSize + "px" }),
          class: "uni-load-more__img uni-load-more__img--android-MP"
        },
        [
          vue.createElementVNode(
            "view",
            {
              class: "uni-load-more__img-icon",
              style: vue.normalizeStyle({ borderTopColor: $props.color, borderTopWidth: $props.iconSize / 12 })
            },
            null,
            4
            /* STYLE */
          ),
          vue.createElementVNode(
            "view",
            {
              class: "uni-load-more__img-icon",
              style: vue.normalizeStyle({ borderTopColor: $props.color, borderTopWidth: $props.iconSize / 12 })
            },
            null,
            4
            /* STYLE */
          ),
          vue.createElementVNode(
            "view",
            {
              class: "uni-load-more__img-icon",
              style: vue.normalizeStyle({ borderTopColor: $props.color, borderTopWidth: $props.iconSize / 12 })
            },
            null,
            4
            /* STYLE */
          )
        ],
        4
        /* STYLE */
      )) : !$data.webviewHide && $props.status === "loading" && $props.showIcon ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 1,
          style: vue.normalizeStyle({ width: $props.iconSize + "px", height: $props.iconSize + "px" }),
          class: "uni-load-more__img uni-load-more__img--ios-H5"
        },
        [
          vue.createElementVNode("image", {
            src: $data.imgBase64,
            mode: "widthFix"
          }, null, 8, ["src"])
        ],
        4
        /* STYLE */
      )) : vue.createCommentVNode("v-if", true),
      $props.showText ? (vue.openBlock(), vue.createElementBlock(
        "text",
        {
          key: 2,
          class: "uni-load-more__text",
          style: vue.normalizeStyle({ color: $props.color })
        },
        vue.toDisplayString($props.status === "more" ? $options.contentdownText : $props.status === "loading" ? $options.contentrefreshText : $options.contentnomoreText),
        5
        /* TEXT, STYLE */
      )) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const __easycom_0$4 = /* @__PURE__ */ _export_sfc(_sfc_main$E, [["render", _sfc_render$7], ["__scopeId", "data-v-2c1dd21f"], ["__file", "C:/easyjob/easyjob-front/easyjob-app/node_modules/@dcloudio/uni-ui/lib/uni-load-more/uni-load-more.vue"]]);
  const _sfc_main$D = {
    name: "uniDataChecklist",
    mixins: [Ds.mixinDatacom || {}],
    emits: ["input", "update:modelValue", "change"],
    props: {
      mode: {
        type: String,
        default: "default"
      },
      multiple: {
        type: Boolean,
        default: false
      },
      value: {
        type: [Array, String, Number],
        default() {
          return "";
        }
      },
      // TODO vue3
      modelValue: {
        type: [Array, String, Number],
        default() {
          return "";
        }
      },
      localdata: {
        type: Array,
        default() {
          return [];
        }
      },
      min: {
        type: [Number, String],
        default: ""
      },
      max: {
        type: [Number, String],
        default: ""
      },
      wrap: {
        type: Boolean,
        default: false
      },
      icon: {
        type: String,
        default: "left"
      },
      selectedColor: {
        type: String,
        default: ""
      },
      selectedTextColor: {
        type: String,
        default: ""
      },
      emptyText: {
        type: String,
        default: "暂无数据"
      },
      disabled: {
        type: Boolean,
        default: false
      },
      map: {
        type: Object,
        default() {
          return {
            text: "text",
            value: "value"
          };
        }
      }
    },
    watch: {
      localdata: {
        handler(newVal) {
          this.range = newVal;
          this.dataList = this.getDataList(this.getSelectedValue(newVal));
        },
        deep: true
      },
      mixinDatacomResData(newVal) {
        this.range = newVal;
        this.dataList = this.getDataList(this.getSelectedValue(newVal));
      },
      value(newVal) {
        this.dataList = this.getDataList(newVal);
      },
      modelValue(newVal) {
        this.dataList = this.getDataList(newVal);
      }
    },
    data() {
      return {
        dataList: [],
        range: [],
        contentText: {
          contentdown: "查看更多",
          contentrefresh: "加载中",
          contentnomore: "没有更多"
        },
        isLocal: true,
        styles: {
          selectedColor: "#2979ff",
          selectedTextColor: "#666"
        },
        isTop: 0
      };
    },
    computed: {
      dataValue() {
        if (this.value === "")
          return this.modelValue;
        if (this.modelValue === "")
          return this.value;
        return this.value;
      }
    },
    created() {
      if (this.localdata && this.localdata.length !== 0) {
        this.isLocal = true;
        this.range = this.localdata;
        this.dataList = this.getDataList(this.getSelectedValue(this.range));
      } else {
        if (this.collection) {
          this.isLocal = false;
          this.loadData();
        }
      }
    },
    methods: {
      loadData() {
        this.mixinDatacomGet().then((res) => {
          this.mixinDatacomResData = res.result.data;
          if (this.mixinDatacomResData.length === 0) {
            this.isLocal = false;
            this.mixinDatacomErrorMessage = this.emptyText;
          } else {
            this.isLocal = true;
          }
        }).catch((err) => {
          this.mixinDatacomErrorMessage = err.message;
        });
      },
      /**
       * 获取父元素实例
       */
      getForm(name = "uniForms") {
        let parent = this.$parent;
        let parentName = parent.$options.name;
        while (parentName !== name) {
          parent = parent.$parent;
          if (!parent)
            return false;
          parentName = parent.$options.name;
        }
        return parent;
      },
      change(e) {
        const values = e.detail.value;
        let detail = {
          value: [],
          data: []
        };
        if (this.multiple) {
          this.range.forEach((item) => {
            if (values.includes(item[this.map.value] + "")) {
              detail.value.push(item[this.map.value]);
              detail.data.push(item);
            }
          });
        } else {
          const range = this.range.find((item) => item[this.map.value] + "" === values);
          if (range) {
            detail = {
              value: range[this.map.value],
              data: range
            };
          }
        }
        this.$emit("input", detail.value);
        this.$emit("update:modelValue", detail.value);
        this.$emit("change", {
          detail
        });
        if (this.multiple) {
          this.dataList = this.getDataList(detail.value, true);
        } else {
          this.dataList = this.getDataList(detail.value);
        }
      },
      /**
       * 获取渲染的新数组
       * @param {Object} value 选中内容
       */
      getDataList(value) {
        let dataList = JSON.parse(JSON.stringify(this.range));
        let list = [];
        if (this.multiple) {
          if (!Array.isArray(value)) {
            value = [];
          }
        }
        dataList.forEach((item, index) => {
          item.disabled = item.disable || item.disabled || false;
          if (this.multiple) {
            if (value.length > 0) {
              let have = value.find((val) => val === item[this.map.value]);
              item.selected = have !== void 0;
            } else {
              item.selected = false;
            }
          } else {
            item.selected = value === item[this.map.value];
          }
          list.push(item);
        });
        return this.setRange(list);
      },
      /**
       * 处理最大最小值
       * @param {Object} list
       */
      setRange(list) {
        let selectList = list.filter((item) => item.selected);
        let min = Number(this.min) || 0;
        let max = Number(this.max) || "";
        list.forEach((item, index) => {
          if (this.multiple) {
            if (selectList.length <= min) {
              let have = selectList.find((val) => val[this.map.value] === item[this.map.value]);
              if (have !== void 0) {
                item.disabled = true;
              }
            }
            if (selectList.length >= max && max !== "") {
              let have = selectList.find((val) => val[this.map.value] === item[this.map.value]);
              if (have === void 0) {
                item.disabled = true;
              }
            }
          }
          this.setStyles(item, index);
          list[index] = item;
        });
        return list;
      },
      /**
       * 设置 class
       * @param {Object} item
       * @param {Object} index
       */
      setStyles(item, index) {
        item.styleBackgroud = this.setStyleBackgroud(item);
        item.styleIcon = this.setStyleIcon(item);
        item.styleIconText = this.setStyleIconText(item);
        item.styleRightIcon = this.setStyleRightIcon(item);
      },
      /**
       * 获取选中值
       * @param {Object} range
       */
      getSelectedValue(range) {
        if (!this.multiple)
          return this.dataValue;
        let selectedArr = [];
        range.forEach((item) => {
          if (item.selected) {
            selectedArr.push(item[this.map.value]);
          }
        });
        return this.dataValue.length > 0 ? this.dataValue : selectedArr;
      },
      /**
       * 设置背景样式
       */
      setStyleBackgroud(item) {
        let styles = {};
        let selectedColor = this.selectedColor ? this.selectedColor : "#2979ff";
        if (this.selectedColor) {
          if (this.mode !== "list") {
            styles["border-color"] = item.selected ? selectedColor : "#DCDFE6";
          }
          if (this.mode === "tag") {
            styles["background-color"] = item.selected ? selectedColor : "#f5f5f5";
          }
        }
        let classles = "";
        for (let i2 in styles) {
          classles += `${i2}:${styles[i2]};`;
        }
        return classles;
      },
      setStyleIcon(item) {
        let styles = {};
        let classles = "";
        if (this.selectedColor) {
          let selectedColor = this.selectedColor ? this.selectedColor : "#2979ff";
          styles["background-color"] = item.selected ? selectedColor : "#fff";
          styles["border-color"] = item.selected ? selectedColor : "#DCDFE6";
          if (!item.selected && item.disabled) {
            styles["background-color"] = "#F2F6FC";
            styles["border-color"] = item.selected ? selectedColor : "#DCDFE6";
          }
        }
        for (let i2 in styles) {
          classles += `${i2}:${styles[i2]};`;
        }
        return classles;
      },
      setStyleIconText(item) {
        let styles = {};
        let classles = "";
        if (this.selectedColor) {
          let selectedColor = this.selectedColor ? this.selectedColor : "#2979ff";
          if (this.mode === "tag") {
            styles.color = item.selected ? this.selectedTextColor ? this.selectedTextColor : "#fff" : "#666";
          } else {
            styles.color = item.selected ? this.selectedTextColor ? this.selectedTextColor : selectedColor : "#666";
          }
          if (!item.selected && item.disabled) {
            styles.color = "#999";
          }
        }
        for (let i2 in styles) {
          classles += `${i2}:${styles[i2]};`;
        }
        return classles;
      },
      setStyleRightIcon(item) {
        let styles = {};
        let classles = "";
        if (this.mode === "list") {
          styles["border-color"] = item.selected ? this.styles.selectedColor : "#DCDFE6";
        }
        for (let i2 in styles) {
          classles += `${i2}:${styles[i2]};`;
        }
        return classles;
      }
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_load_more = resolveEasycom(vue.resolveDynamicComponent("uni-load-more"), __easycom_0$4);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "uni-data-checklist",
        style: vue.normalizeStyle({ "margin-top": $data.isTop + "px" })
      },
      [
        !$data.isLocal ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "uni-data-loading"
        }, [
          !_ctx.mixinDatacomErrorMessage ? (vue.openBlock(), vue.createBlock(_component_uni_load_more, {
            key: 0,
            status: "loading",
            iconType: "snow",
            iconSize: 18,
            "content-text": $data.contentText
          }, null, 8, ["content-text"])) : (vue.openBlock(), vue.createElementBlock(
            "text",
            { key: 1 },
            vue.toDisplayString(_ctx.mixinDatacomErrorMessage),
            1
            /* TEXT */
          ))
        ])) : (vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          { key: 1 },
          [
            $props.multiple ? (vue.openBlock(), vue.createElementBlock(
              "checkbox-group",
              {
                key: 0,
                class: vue.normalizeClass(["checklist-group", { "is-list": $props.mode === "list" || $props.wrap }]),
                onChange: _cache[0] || (_cache[0] = (...args) => $options.change && $options.change(...args))
              },
              [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($data.dataList, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock(
                      "label",
                      {
                        class: vue.normalizeClass(["checklist-box", ["is--" + $props.mode, item.selected ? "is-checked" : "", $props.disabled || !!item.disabled ? "is-disable" : "", index !== 0 && $props.mode === "list" ? "is-list-border" : ""]]),
                        style: vue.normalizeStyle(item.styleBackgroud),
                        key: index
                      },
                      [
                        vue.createElementVNode("checkbox", {
                          class: "hidden",
                          hidden: "",
                          disabled: $props.disabled || !!item.disabled,
                          value: item[$props.map.value] + "",
                          checked: item.selected
                        }, null, 8, ["disabled", "value", "checked"]),
                        $props.mode !== "tag" && $props.mode !== "list" || $props.mode === "list" && $props.icon === "left" ? (vue.openBlock(), vue.createElementBlock(
                          "view",
                          {
                            key: 0,
                            class: "checkbox__inner",
                            style: vue.normalizeStyle(item.styleIcon)
                          },
                          [
                            vue.createElementVNode("view", { class: "checkbox__inner-icon" })
                          ],
                          4
                          /* STYLE */
                        )) : vue.createCommentVNode("v-if", true),
                        vue.createElementVNode(
                          "view",
                          {
                            class: vue.normalizeClass(["checklist-content", { "list-content": $props.mode === "list" && $props.icon === "left" }])
                          },
                          [
                            vue.createElementVNode(
                              "text",
                              {
                                class: "checklist-text",
                                style: vue.normalizeStyle(item.styleIconText)
                              },
                              vue.toDisplayString(item[$props.map.text]),
                              5
                              /* TEXT, STYLE */
                            ),
                            $props.mode === "list" && $props.icon === "right" ? (vue.openBlock(), vue.createElementBlock(
                              "view",
                              {
                                key: 0,
                                class: "checkobx__list",
                                style: vue.normalizeStyle(item.styleBackgroud)
                              },
                              null,
                              4
                              /* STYLE */
                            )) : vue.createCommentVNode("v-if", true)
                          ],
                          2
                          /* CLASS */
                        )
                      ],
                      6
                      /* CLASS, STYLE */
                    );
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ],
              34
              /* CLASS, HYDRATE_EVENTS */
            )) : (vue.openBlock(), vue.createElementBlock(
              "radio-group",
              {
                key: 1,
                class: vue.normalizeClass(["checklist-group", { "is-list": $props.mode === "list", "is-wrap": $props.wrap }]),
                onChange: _cache[1] || (_cache[1] = (...args) => $options.change && $options.change(...args))
              },
              [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($data.dataList, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock(
                      "label",
                      {
                        class: vue.normalizeClass(["checklist-box", ["is--" + $props.mode, item.selected ? "is-checked" : "", $props.disabled || !!item.disabled ? "is-disable" : "", index !== 0 && $props.mode === "list" ? "is-list-border" : ""]]),
                        style: vue.normalizeStyle(item.styleBackgroud),
                        key: index
                      },
                      [
                        vue.createElementVNode("radio", {
                          class: "hidden",
                          hidden: "",
                          disabled: $props.disabled || item.disabled,
                          value: item[$props.map.value] + "",
                          checked: item.selected
                        }, null, 8, ["disabled", "value", "checked"]),
                        $props.mode !== "tag" && $props.mode !== "list" || $props.mode === "list" && $props.icon === "left" ? (vue.openBlock(), vue.createElementBlock(
                          "view",
                          {
                            key: 0,
                            class: "radio__inner",
                            style: vue.normalizeStyle(item.styleBackgroud)
                          },
                          [
                            vue.createElementVNode(
                              "view",
                              {
                                class: "radio__inner-icon",
                                style: vue.normalizeStyle(item.styleIcon)
                              },
                              null,
                              4
                              /* STYLE */
                            )
                          ],
                          4
                          /* STYLE */
                        )) : vue.createCommentVNode("v-if", true),
                        vue.createElementVNode(
                          "view",
                          {
                            class: vue.normalizeClass(["checklist-content", { "list-content": $props.mode === "list" && $props.icon === "left" }])
                          },
                          [
                            vue.createElementVNode(
                              "text",
                              {
                                class: "checklist-text",
                                style: vue.normalizeStyle(item.styleIconText)
                              },
                              vue.toDisplayString(item[$props.map.text]),
                              5
                              /* TEXT, STYLE */
                            ),
                            $props.mode === "list" && $props.icon === "right" ? (vue.openBlock(), vue.createElementBlock(
                              "view",
                              {
                                key: 0,
                                style: vue.normalizeStyle(item.styleRightIcon),
                                class: "checkobx__list"
                              },
                              null,
                              4
                              /* STYLE */
                            )) : vue.createCommentVNode("v-if", true)
                          ],
                          2
                          /* CLASS */
                        )
                      ],
                      6
                      /* CLASS, STYLE */
                    );
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ],
              34
              /* CLASS, HYDRATE_EVENTS */
            ))
          ],
          64
          /* STABLE_FRAGMENT */
        ))
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_2 = /* @__PURE__ */ _export_sfc(_sfc_main$D, [["render", _sfc_render$6], ["__scopeId", "data-v-149d584b"], ["__file", "C:/easyjob/easyjob-front/easyjob-app/node_modules/@dcloudio/uni-ui/lib/uni-data-checkbox/uni-data-checkbox.vue"]]);
  const _sfc_main$C = {
    __name: "ExamRecord",
    props: {
      data: {
        type: Object
      }
    },
    emits: ["reload"],
    setup(__props, { emit }) {
      const { proxy } = vue.getCurrentInstance();
      const delExam = (examId) => {
        proxy.Confirm("确认要删除考试记录吗？", async () => {
          let result = await proxy.Request({
            url: proxy.Api.delExam,
            params: {
              examId
            }
          });
          if (!result) {
            return;
          }
          proxy.Message.success("删除成功");
          emit("reload");
        });
      };
      const reStart = (examId) => {
        uni.navigateTo({
          url: "/pages/exam/ExamQuestion?examId=" + examId
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "exam-item" }, [
          vue.createElementVNode(
            "view",
            { class: "create-time" },
            vue.toDisplayString(__props.data.remark || __props.data.createTime),
            1
            /* TEXT */
          ),
          vue.createElementVNode("view", { class: "op-panel" }, [
            vue.createElementVNode(
              "view",
              {
                class: "op a-link",
                onClick: _cache[0] || (_cache[0] = ($event) => reStart(__props.data.examId))
              },
              vue.toDisplayString(__props.data.status == 0 ? "继续" : "查看"),
              1
              /* TEXT */
            ),
            vue.createElementVNode("view", {
              class: "op a-link",
              onClick: _cache[1] || (_cache[1] = ($event) => delExam(__props.data.examId))
            }, "删除")
          ])
        ]);
      };
    }
  };
  const ExamRecord = /* @__PURE__ */ _export_sfc(_sfc_main$C, [["__scopeId", "data-v-35b61b65"], ["__file", "C:/easyjob/easyjob-front/easyjob-app/src/pages/exam/ExamRecord.vue"]]);
  const _sfc_main$B = {
    __name: "ExamNoFinishedModel",
    setup(__props) {
      const { proxy } = vue.getCurrentInstance();
      const dataList = vue.ref([]);
      const loadExam = async () => {
        let result = await proxy.Request({
          url: proxy.Api.loadNoFinishedExam,
          showLoading: true
        });
        if (!result) {
          return;
        }
        if (result.data != null && result.data.length > 0) {
          dialogRef.value.show();
          dataList.value = result.data;
        } else {
          dialogRef.value.close();
        }
      };
      const dialogRef = vue.ref();
      onShow(() => {
        const token = uni.getStorageSync(LOCAL_STORAGE_KEY.token.key);
        if (!token) {
          return;
        }
        loadExam();
      });
      const close = () => {
        dialogRef.value.close();
      };
      return (_ctx, _cache) => {
        const _component_Dialog = vue.resolveComponent("Dialog");
        return vue.openBlock(), vue.createBlock(
          _component_Dialog,
          {
            ref_key: "dialogRef",
            ref: dialogRef,
            title: "未完成的考试",
            showCancel: false,
            okText: "开启新考试",
            okFun: close
          },
          {
            default: vue.withCtx(() => [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(dataList.value, (item) => {
                  return vue.openBlock(), vue.createElementBlock("view", null, [
                    vue.createVNode(ExamRecord, {
                      data: item,
                      onReload: loadExam
                    }, null, 8, ["data"])
                  ]);
                }),
                256
                /* UNKEYED_FRAGMENT */
              ))
            ]),
            _: 1
            /* STABLE */
          },
          512
          /* NEED_PATCH */
        );
      };
    }
  };
  const ExamNoFinishedModel = /* @__PURE__ */ _export_sfc(_sfc_main$B, [["__file", "C:/easyjob/easyjob-front/easyjob-app/src/pages/exam/ExamNoFinishedModel.vue"]]);
  const _sfc_main$A = {
    __name: "ExamIndex",
    setup(__props) {
      const { proxy } = vue.getCurrentInstance();
      const categoryList = vue.ref([]);
      const loadData = async () => {
        let result = await proxy.Request({
          url: proxy.Api.loadAllCategory,
          params: {
            type: 1
          },
          showLoading: false
        });
        if (!result) {
          return;
        }
        categoryList.value = result.data;
      };
      loadData();
      const selectAll = vue.ref();
      const selectAllHandler = (e) => {
        if (e.detail.value.length == 0) {
          categoryIds.value = [];
        } else {
          categoryIds.value = categoryList.value.map((item) => {
            return item.categoryId;
          });
        }
      };
      const categoryIds = vue.ref([]);
      const createExam = async () => {
        if (categoryIds.value.length == 0) {
          proxy.Message.warning("请选择分类");
          return;
        }
        const token = uni.getStorageSync(LOCAL_STORAGE_KEY.token.key);
        if (token == "" || token == null) {
          uni.navigateTo({
            url: "/pages/account/LoginAndRegister"
          });
        }
        let result = await proxy.Request({
          url: proxy.Api.createExam,
          params: {
            categoryIds: categoryIds.value.join(",")
          }
        });
        if (!result) {
          return;
        }
        uni.navigateTo({
          url: "./ExamQuestion?examId=" + result.data.examId
        });
      };
      return (_ctx, _cache) => {
        const _component_Navbar = vue.resolveComponent("Navbar");
        const _component_uni_data_checkbox = resolveEasycom(vue.resolveDynamicComponent("uni-data-checkbox"), __easycom_2);
        return vue.openBlock(), vue.createElementBlock("view", null, [
          vue.createVNode(_component_Navbar, {
            showLeft: false,
            title: "在线考试"
          }),
          vue.createElementVNode("view", { class: "exam" }, [
            vue.createElementVNode("view", { class: "category-title" }, "请选择分类"),
            vue.createVNode(_component_uni_data_checkbox, {
              mode: "list",
              modelValue: categoryIds.value,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => categoryIds.value = $event),
              multiple: "",
              map: {
                text: "categoryName",
                value: "categoryId"
              },
              localdata: categoryList.value
            }, null, 8, ["modelValue", "localdata"]),
            vue.createElementVNode("view", { class: "select-all" }, [
              vue.createVNode(_component_uni_data_checkbox, {
                modelValue: selectAll.value,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => selectAll.value = $event),
                onChange: selectAllHandler,
                multiple: "",
                localdata: [{ value: 1, text: "不怂，全勾上！" }]
              }, null, 8, ["modelValue"])
            ]),
            vue.createElementVNode("view", { class: "btn-panel" }, [
              vue.createElementVNode("button", {
                type: "primary",
                onClick: createExam
              }, "开始考试")
            ]),
            vue.createElementVNode("view", { class: "tips" }, "选择你想检测的分类，进行考试")
          ]),
          vue.createVNode(ExamNoFinishedModel)
        ]);
      };
    }
  };
  const PagesExamExamIndex = /* @__PURE__ */ _export_sfc(_sfc_main$A, [["__scopeId", "data-v-af9f6ffa"], ["__file", "C:/easyjob/easyjob-front/easyjob-app/src/pages/exam/ExamIndex.vue"]]);
  var pattern = {
    email: /^\S+?@\S+?\.\S+?$/,
    idcard: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
    url: new RegExp(
      "^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$",
      "i"
    )
  };
  const FORMAT_MAPPING = {
    "int": "integer",
    "bool": "boolean",
    "double": "number",
    "long": "number",
    "password": "string"
    // "fileurls": 'array'
  };
  function formatMessage(args, resources = "") {
    var defaultMessage = ["label"];
    defaultMessage.forEach((item) => {
      if (args[item] === void 0) {
        args[item] = "";
      }
    });
    let str = resources;
    for (let key in args) {
      let reg = new RegExp("{" + key + "}");
      str = str.replace(reg, args[key]);
    }
    return str;
  }
  function isEmptyValue(value, type) {
    if (value === void 0 || value === null) {
      return true;
    }
    if (typeof value === "string" && !value) {
      return true;
    }
    if (Array.isArray(value) && !value.length) {
      return true;
    }
    if (type === "object" && !Object.keys(value).length) {
      return true;
    }
    return false;
  }
  const types = {
    integer(value) {
      return types.number(value) && parseInt(value, 10) === value;
    },
    string(value) {
      return typeof value === "string";
    },
    number(value) {
      if (isNaN(value)) {
        return false;
      }
      return typeof value === "number";
    },
    "boolean": function(value) {
      return typeof value === "boolean";
    },
    "float": function(value) {
      return types.number(value) && !types.integer(value);
    },
    array(value) {
      return Array.isArray(value);
    },
    object(value) {
      return typeof value === "object" && !types.array(value);
    },
    date(value) {
      return value instanceof Date;
    },
    timestamp(value) {
      if (!this.integer(value) || Math.abs(value).toString().length > 16) {
        return false;
      }
      return true;
    },
    file(value) {
      return typeof value.url === "string";
    },
    email(value) {
      return typeof value === "string" && !!value.match(pattern.email) && value.length < 255;
    },
    url(value) {
      return typeof value === "string" && !!value.match(pattern.url);
    },
    pattern(reg, value) {
      try {
        return new RegExp(reg).test(value);
      } catch (e) {
        return false;
      }
    },
    method(value) {
      return typeof value === "function";
    },
    idcard(value) {
      return typeof value === "string" && !!value.match(pattern.idcard);
    },
    "url-https"(value) {
      return this.url(value) && value.startsWith("https://");
    },
    "url-scheme"(value) {
      return value.startsWith("://");
    },
    "url-web"(value) {
      return false;
    }
  };
  class RuleValidator {
    constructor(message2) {
      this._message = message2;
    }
    async validateRule(fieldKey, fieldValue, value, data, allData) {
      var result = null;
      let rules = fieldValue.rules;
      let hasRequired = rules.findIndex((item) => {
        return item.required;
      });
      if (hasRequired < 0) {
        if (value === null || value === void 0) {
          return result;
        }
        if (typeof value === "string" && !value.length) {
          return result;
        }
      }
      var message2 = this._message;
      if (rules === void 0) {
        return message2["default"];
      }
      for (var i2 = 0; i2 < rules.length; i2++) {
        let rule = rules[i2];
        let vt2 = this._getValidateType(rule);
        Object.assign(rule, {
          label: fieldValue.label || `["${fieldKey}"]`
        });
        if (RuleValidatorHelper[vt2]) {
          result = RuleValidatorHelper[vt2](rule, value, message2);
          if (result != null) {
            break;
          }
        }
        if (rule.validateExpr) {
          let now2 = Date.now();
          let resultExpr = rule.validateExpr(value, allData, now2);
          if (resultExpr === false) {
            result = this._getMessage(rule, rule.errorMessage || this._message["default"]);
            break;
          }
        }
        if (rule.validateFunction) {
          result = await this.validateFunction(rule, value, data, allData, vt2);
          if (result !== null) {
            break;
          }
        }
      }
      if (result !== null) {
        result = message2.TAG + result;
      }
      return result;
    }
    async validateFunction(rule, value, data, allData, vt2) {
      let result = null;
      try {
        let callbackMessage = null;
        const res = await rule.validateFunction(rule, value, allData || data, (message2) => {
          callbackMessage = message2;
        });
        if (callbackMessage || typeof res === "string" && res || res === false) {
          result = this._getMessage(rule, callbackMessage || res, vt2);
        }
      } catch (e) {
        result = this._getMessage(rule, e.message, vt2);
      }
      return result;
    }
    _getMessage(rule, message2, vt2) {
      return formatMessage(rule, message2 || rule.errorMessage || this._message[vt2] || message2["default"]);
    }
    _getValidateType(rule) {
      var result = "";
      if (rule.required) {
        result = "required";
      } else if (rule.format) {
        result = "format";
      } else if (rule.arrayType) {
        result = "arrayTypeFormat";
      } else if (rule.range) {
        result = "range";
      } else if (rule.maximum !== void 0 || rule.minimum !== void 0) {
        result = "rangeNumber";
      } else if (rule.maxLength !== void 0 || rule.minLength !== void 0) {
        result = "rangeLength";
      } else if (rule.pattern) {
        result = "pattern";
      } else if (rule.validateFunction) {
        result = "validateFunction";
      }
      return result;
    }
  }
  const RuleValidatorHelper = {
    required(rule, value, message2) {
      if (rule.required && isEmptyValue(value, rule.format || typeof value)) {
        return formatMessage(rule, rule.errorMessage || message2.required);
      }
      return null;
    },
    range(rule, value, message2) {
      const {
        range,
        errorMessage
      } = rule;
      let list = new Array(range.length);
      for (let i2 = 0; i2 < range.length; i2++) {
        const item = range[i2];
        if (types.object(item) && item.value !== void 0) {
          list[i2] = item.value;
        } else {
          list[i2] = item;
        }
      }
      let result = false;
      if (Array.isArray(value)) {
        result = new Set(value.concat(list)).size === list.length;
      } else {
        if (list.indexOf(value) > -1) {
          result = true;
        }
      }
      if (!result) {
        return formatMessage(rule, errorMessage || message2["enum"]);
      }
      return null;
    },
    rangeNumber(rule, value, message2) {
      if (!types.number(value)) {
        return formatMessage(rule, rule.errorMessage || message2.pattern.mismatch);
      }
      let {
        minimum,
        maximum,
        exclusiveMinimum,
        exclusiveMaximum
      } = rule;
      let min = exclusiveMinimum ? value <= minimum : value < minimum;
      let max = exclusiveMaximum ? value >= maximum : value > maximum;
      if (minimum !== void 0 && min) {
        return formatMessage(rule, rule.errorMessage || message2["number"][exclusiveMinimum ? "exclusiveMinimum" : "minimum"]);
      } else if (maximum !== void 0 && max) {
        return formatMessage(rule, rule.errorMessage || message2["number"][exclusiveMaximum ? "exclusiveMaximum" : "maximum"]);
      } else if (minimum !== void 0 && maximum !== void 0 && (min || max)) {
        return formatMessage(rule, rule.errorMessage || message2["number"].range);
      }
      return null;
    },
    rangeLength(rule, value, message2) {
      if (!types.string(value) && !types.array(value)) {
        return formatMessage(rule, rule.errorMessage || message2.pattern.mismatch);
      }
      let min = rule.minLength;
      let max = rule.maxLength;
      let val = value.length;
      if (min !== void 0 && val < min) {
        return formatMessage(rule, rule.errorMessage || message2["length"].minLength);
      } else if (max !== void 0 && val > max) {
        return formatMessage(rule, rule.errorMessage || message2["length"].maxLength);
      } else if (min !== void 0 && max !== void 0 && (val < min || val > max)) {
        return formatMessage(rule, rule.errorMessage || message2["length"].range);
      }
      return null;
    },
    pattern(rule, value, message2) {
      if (!types["pattern"](rule.pattern, value)) {
        return formatMessage(rule, rule.errorMessage || message2.pattern.mismatch);
      }
      return null;
    },
    format(rule, value, message2) {
      var customTypes = Object.keys(types);
      var format = FORMAT_MAPPING[rule.format] ? FORMAT_MAPPING[rule.format] : rule.format || rule.arrayType;
      if (customTypes.indexOf(format) > -1) {
        if (!types[format](value)) {
          return formatMessage(rule, rule.errorMessage || message2.typeError);
        }
      }
      return null;
    },
    arrayTypeFormat(rule, value, message2) {
      if (!Array.isArray(value)) {
        return formatMessage(rule, rule.errorMessage || message2.typeError);
      }
      for (let i2 = 0; i2 < value.length; i2++) {
        const element = value[i2];
        let formatResult = this.format(rule, element, message2);
        if (formatResult !== null) {
          return formatResult;
        }
      }
      return null;
    }
  };
  class SchemaValidator extends RuleValidator {
    constructor(schema, options) {
      super(SchemaValidator.message);
      this._schema = schema;
      this._options = options || null;
    }
    updateSchema(schema) {
      this._schema = schema;
    }
    async validate(data, allData) {
      let result = this._checkFieldInSchema(data);
      if (!result) {
        result = await this.invokeValidate(data, false, allData);
      }
      return result.length ? result[0] : null;
    }
    async validateAll(data, allData) {
      let result = this._checkFieldInSchema(data);
      if (!result) {
        result = await this.invokeValidate(data, true, allData);
      }
      return result;
    }
    async validateUpdate(data, allData) {
      let result = this._checkFieldInSchema(data);
      if (!result) {
        result = await this.invokeValidateUpdate(data, false, allData);
      }
      return result.length ? result[0] : null;
    }
    async invokeValidate(data, all, allData) {
      let result = [];
      let schema = this._schema;
      for (let key in schema) {
        let value = schema[key];
        let errorMessage = await this.validateRule(key, value, data[key], data, allData);
        if (errorMessage != null) {
          result.push({
            key,
            errorMessage
          });
          if (!all)
            break;
        }
      }
      return result;
    }
    async invokeValidateUpdate(data, all, allData) {
      let result = [];
      for (let key in data) {
        let errorMessage = await this.validateRule(key, this._schema[key], data[key], data, allData);
        if (errorMessage != null) {
          result.push({
            key,
            errorMessage
          });
          if (!all)
            break;
        }
      }
      return result;
    }
    _checkFieldInSchema(data) {
      var keys = Object.keys(data);
      var keys2 = Object.keys(this._schema);
      if (new Set(keys.concat(keys2)).size === keys2.length) {
        return "";
      }
      var noExistFields = keys.filter((key) => {
        return keys2.indexOf(key) < 0;
      });
      var errorMessage = formatMessage({
        field: JSON.stringify(noExistFields)
      }, SchemaValidator.message.TAG + SchemaValidator.message["defaultInvalid"]);
      return [{
        key: "invalid",
        errorMessage
      }];
    }
  }
  function Message() {
    return {
      TAG: "",
      default: "验证错误",
      defaultInvalid: "提交的字段{field}在数据库中并不存在",
      validateFunction: "验证无效",
      required: "{label}必填",
      "enum": "{label}超出范围",
      timestamp: "{label}格式无效",
      whitespace: "{label}不能为空",
      typeError: "{label}类型无效",
      date: {
        format: "{label}日期{value}格式无效",
        parse: "{label}日期无法解析,{value}无效",
        invalid: "{label}日期{value}无效"
      },
      length: {
        minLength: "{label}长度不能少于{minLength}",
        maxLength: "{label}长度不能超过{maxLength}",
        range: "{label}必须介于{minLength}和{maxLength}之间"
      },
      number: {
        minimum: "{label}不能小于{minimum}",
        maximum: "{label}不能大于{maximum}",
        exclusiveMinimum: "{label}不能小于等于{minimum}",
        exclusiveMaximum: "{label}不能大于等于{maximum}",
        range: "{label}必须介于{minimum}and{maximum}之间"
      },
      pattern: {
        mismatch: "{label}格式不匹配"
      }
    };
  }
  SchemaValidator.message = new Message();
  const deepCopy = (val) => {
    return JSON.parse(JSON.stringify(val));
  };
  const typeFilter = (format) => {
    return format === "int" || format === "double" || format === "number" || format === "timestamp";
  };
  const getValue = (key, value, rules) => {
    const isRuleNumType = rules.find((val) => val.format && typeFilter(val.format));
    const isRuleBoolType = rules.find((val) => val.format && val.format === "boolean" || val.format === "bool");
    if (!!isRuleNumType) {
      if (!value && value !== 0) {
        value = null;
      } else {
        value = isNumber(Number(value)) ? Number(value) : value;
      }
    }
    if (!!isRuleBoolType) {
      value = isBoolean(value) ? value : false;
    }
    return value;
  };
  const setDataValue = (field, formdata, value) => {
    formdata[field] = value;
    return value || "";
  };
  const getDataValue = (field, data) => {
    return objGet(data, field);
  };
  const realName = (name, data = {}) => {
    const base_name = _basePath(name);
    if (typeof base_name === "object" && Array.isArray(base_name) && base_name.length > 1) {
      const realname = base_name.reduce((a2, b2) => a2 += `#${b2}`, "_formdata_");
      return realname;
    }
    return base_name[0] || name;
  };
  const isRealName = (name) => {
    const reg = /^_formdata_#*/;
    return reg.test(name);
  };
  const rawData = (object = {}, name) => {
    let newData = JSON.parse(JSON.stringify(object));
    let formData = {};
    for (let i2 in newData) {
      let path = name2arr(i2);
      objSet(formData, path, newData[i2]);
    }
    return formData;
  };
  const name2arr = (name) => {
    let field = name.replace("_formdata_#", "");
    field = field.split("#").map((v2) => isNumber(v2) ? Number(v2) : v2);
    return field;
  };
  const objSet = (object, path, value) => {
    if (typeof object !== "object")
      return object;
    _basePath(path).reduce((o2, k2, i2, _2) => {
      if (i2 === _2.length - 1) {
        o2[k2] = value;
        return null;
      } else if (k2 in o2) {
        return o2[k2];
      } else {
        o2[k2] = /^[0-9]{1,}$/.test(_2[i2 + 1]) ? [] : {};
        return o2[k2];
      }
    }, object);
    return object;
  };
  function _basePath(path) {
    if (Array.isArray(path))
      return path;
    return path.replace(/\[/g, ".").replace(/\]/g, "").split(".");
  }
  const objGet = (object, path, defaultVal = "undefined") => {
    let newPath = _basePath(path);
    let val = newPath.reduce((o2, k2) => {
      return (o2 || {})[k2];
    }, object);
    return !val || val !== void 0 ? val : defaultVal;
  };
  const isNumber = (num) => {
    return !isNaN(Number(num));
  };
  const isBoolean = (bool) => {
    return typeof bool === "boolean";
  };
  const isRequiredField = (rules) => {
    let isNoField = false;
    for (let i2 = 0; i2 < rules.length; i2++) {
      const ruleData = rules[i2];
      if (ruleData.required) {
        isNoField = true;
        break;
      }
    }
    return isNoField;
  };
  const isEqual = (a2, b2) => {
    if (a2 === b2) {
      return a2 !== 0 || 1 / a2 === 1 / b2;
    }
    if (a2 == null || b2 == null) {
      return a2 === b2;
    }
    var classNameA = toString.call(a2), classNameB = toString.call(b2);
    if (classNameA !== classNameB) {
      return false;
    }
    switch (classNameA) {
      case "[object RegExp]":
      case "[object String]":
        return "" + a2 === "" + b2;
      case "[object Number]":
        if (+a2 !== +a2) {
          return +b2 !== +b2;
        }
        return +a2 === 0 ? 1 / +a2 === 1 / b2 : +a2 === +b2;
      case "[object Date]":
      case "[object Boolean]":
        return +a2 === +b2;
    }
    if (classNameA == "[object Object]") {
      var propsA = Object.getOwnPropertyNames(a2), propsB = Object.getOwnPropertyNames(b2);
      if (propsA.length != propsB.length) {
        return false;
      }
      for (var i2 = 0; i2 < propsA.length; i2++) {
        var propName = propsA[i2];
        if (a2[propName] !== b2[propName]) {
          return false;
        }
      }
      return true;
    }
    if (classNameA == "[object Array]") {
      if (a2.toString() == b2.toString()) {
        return true;
      }
      return false;
    }
  };
  const _sfc_main$z = {
    name: "uniForms",
    emits: ["validate", "submit"],
    options: {
      virtualHost: true
    },
    props: {
      // 即将弃用
      value: {
        type: Object,
        default() {
          return null;
        }
      },
      // vue3 替换 value 属性
      modelValue: {
        type: Object,
        default() {
          return null;
        }
      },
      // 1.4.0 开始将不支持 v-model ，且废弃 value 和 modelValue
      model: {
        type: Object,
        default() {
          return null;
        }
      },
      // 表单校验规则
      rules: {
        type: Object,
        default() {
          return {};
        }
      },
      //校验错误信息提示方式 默认 undertext 取值 [undertext|toast|modal]
      errShowType: {
        type: String,
        default: "undertext"
      },
      // 校验触发器方式 默认 bind 取值 [bind|submit]
      validateTrigger: {
        type: String,
        default: "submit"
      },
      // label 位置，默认 left 取值  top/left
      labelPosition: {
        type: String,
        default: "left"
      },
      // label 宽度
      labelWidth: {
        type: [String, Number],
        default: ""
      },
      // label 居中方式，默认 left 取值 left/center/right
      labelAlign: {
        type: String,
        default: "left"
      },
      border: {
        type: Boolean,
        default: false
      }
    },
    provide() {
      return {
        uniForm: this
      };
    },
    data() {
      return {
        // 表单本地值的记录，不应该与传如的值进行关联
        formData: {},
        formRules: {}
      };
    },
    computed: {
      // 计算数据源变化的
      localData() {
        const localVal = this.model || this.modelValue || this.value;
        if (localVal) {
          return deepCopy(localVal);
        }
        return {};
      }
    },
    watch: {
      // 监听数据变化 ,暂时不使用，需要单独赋值
      // localData: {},
      // 监听规则变化
      rules: {
        handler: function(val, oldVal) {
          this.setRules(val);
        },
        deep: true,
        immediate: true
      }
    },
    created() {
      let getbinddata = getApp().$vm.$.appContext.config.globalProperties.binddata;
      if (!getbinddata) {
        getApp().$vm.$.appContext.config.globalProperties.binddata = function(name, value, formName) {
          if (formName) {
            this.$refs[formName].setValue(name, value);
          } else {
            let formVm;
            for (let i2 in this.$refs) {
              const vm = this.$refs[i2];
              if (vm && vm.$options && vm.$options.name === "uniForms") {
                formVm = vm;
                break;
              }
            }
            if (!formVm)
              return console.error("当前 uni-froms 组件缺少 ref 属性");
            if (formVm.model)
              formVm.model[name] = value;
            if (formVm.modelValue)
              formVm.modelValue[name] = value;
            if (formVm.value)
              formVm.value[name] = value;
          }
        };
      }
      this.childrens = [];
      this.inputChildrens = [];
      this.setRules(this.rules);
    },
    methods: {
      /**
       * 外部调用方法
       * 设置规则 ，主要用于小程序自定义检验规则
       * @param {Array} rules 规则源数据
       */
      setRules(rules) {
        this.formRules = Object.assign({}, this.formRules, rules);
        this.validator = new SchemaValidator(rules);
      },
      /**
       * 外部调用方法
       * 设置数据，用于设置表单数据，公开给用户使用 ， 不支持在动态表单中使用
       * @param {Object} key
       * @param {Object} value
       */
      setValue(key, value) {
        let example = this.childrens.find((child) => child.name === key);
        if (!example)
          return null;
        this.formData[key] = getValue(key, value, this.formRules[key] && this.formRules[key].rules || []);
        return example.onFieldChange(this.formData[key]);
      },
      /**
       * 外部调用方法
       * 手动提交校验表单
       * 对整个表单进行校验的方法，参数为一个回调函数。
       * @param {Array} keepitem 保留不参与校验的字段
       * @param {type} callback 方法回调
       */
      validate(keepitem, callback) {
        return this.checkAll(this.formData, keepitem, callback);
      },
      /**
       * 外部调用方法
       * 部分表单校验
       * @param {Array|String} props 需要校验的字段
       * @param {Function} 回调函数
       */
      validateField(props = [], callback) {
        props = [].concat(props);
        let invalidFields = {};
        this.childrens.forEach((item) => {
          const name = realName(item.name);
          if (props.indexOf(name) !== -1) {
            invalidFields = Object.assign({}, invalidFields, {
              [name]: this.formData[name]
            });
          }
        });
        return this.checkAll(invalidFields, [], callback);
      },
      /**
       * 外部调用方法
       * 移除表单项的校验结果。传入待移除的表单项的 prop 属性或者 prop 组成的数组，如不传则移除整个表单的校验结果
       * @param {Array|String} props 需要移除校验的字段 ，不填为所有
       */
      clearValidate(props = []) {
        props = [].concat(props);
        this.childrens.forEach((item) => {
          if (props.length === 0) {
            item.errMsg = "";
          } else {
            const name = realName(item.name);
            if (props.indexOf(name) !== -1) {
              item.errMsg = "";
            }
          }
        });
      },
      /**
       * 外部调用方法 ，即将废弃
       * 手动提交校验表单
       * 对整个表单进行校验的方法，参数为一个回调函数。
       * @param {Array} keepitem 保留不参与校验的字段
       * @param {type} callback 方法回调
       */
      submit(keepitem, callback, type) {
        for (let i2 in this.dataValue) {
          const itemData = this.childrens.find((v2) => v2.name === i2);
          if (itemData) {
            if (this.formData[i2] === void 0) {
              this.formData[i2] = this._getValue(i2, this.dataValue[i2]);
            }
          }
        }
        if (!type) {
          console.warn("submit 方法即将废弃，请使用validate方法代替！");
        }
        return this.checkAll(this.formData, keepitem, callback, "submit");
      },
      // 校验所有
      async checkAll(invalidFields, keepitem, callback, type) {
        if (!this.validator)
          return;
        let childrens = [];
        for (let i2 in invalidFields) {
          const item = this.childrens.find((v2) => realName(v2.name) === i2);
          if (item) {
            childrens.push(item);
          }
        }
        if (!callback && typeof keepitem === "function") {
          callback = keepitem;
        }
        let promise;
        if (!callback && typeof callback !== "function" && Promise) {
          promise = new Promise((resolve, reject) => {
            callback = function(valid, invalidFields2) {
              !valid ? resolve(invalidFields2) : reject(valid);
            };
          });
        }
        let results = [];
        let tempFormData = JSON.parse(JSON.stringify(invalidFields));
        for (let i2 in childrens) {
          const child = childrens[i2];
          let name = realName(child.name);
          const result = await child.onFieldChange(tempFormData[name]);
          if (result) {
            results.push(result);
            if (this.errShowType === "toast" || this.errShowType === "modal")
              break;
          }
        }
        if (Array.isArray(results)) {
          if (results.length === 0)
            results = null;
        }
        if (Array.isArray(keepitem)) {
          keepitem.forEach((v2) => {
            let vName = realName(v2);
            let value = getDataValue(v2, this.localData);
            if (value !== void 0) {
              tempFormData[vName] = value;
            }
          });
        }
        if (type === "submit") {
          this.$emit("submit", {
            detail: {
              value: tempFormData,
              errors: results
            }
          });
        } else {
          this.$emit("validate", results);
        }
        let resetFormData = {};
        resetFormData = rawData(tempFormData, this.name);
        callback && typeof callback === "function" && callback(results, resetFormData);
        if (promise && callback) {
          return promise;
        } else {
          return null;
        }
      },
      /**
       * 返回validate事件
       * @param {Object} result
       */
      validateCheck(result) {
        this.$emit("validate", result);
      },
      _getValue: getValue,
      _isRequiredField: isRequiredField,
      _setDataValue: setDataValue,
      _getDataValue: getDataValue,
      _realName: realName,
      _isRealName: isRealName,
      _isEqual: isEqual
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-forms" }, [
      vue.createElementVNode("form", null, [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ])
    ]);
  }
  const __easycom_3 = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["render", _sfc_render$5], ["__scopeId", "data-v-13523fe0"], ["__file", "C:/easyjob/easyjob-front/easyjob-app/node_modules/@dcloudio/uni-ui/lib/uni-forms/uni-forms.vue"]]);
  const _sfc_main$y = {
    name: "uniFormsItem",
    options: {
      virtualHost: true
    },
    provide() {
      return {
        uniFormItem: this
      };
    },
    inject: {
      form: {
        from: "uniForm",
        default: null
      }
    },
    props: {
      // 表单校验规则
      rules: {
        type: Array,
        default() {
          return null;
        }
      },
      // 表单域的属性名，在使用校验规则时必填
      name: {
        type: [String, Array],
        default: ""
      },
      required: {
        type: Boolean,
        default: false
      },
      label: {
        type: String,
        default: ""
      },
      // label的宽度
      labelWidth: {
        type: [String, Number],
        default: ""
      },
      // label 居中方式，默认 left 取值 left/center/right
      labelAlign: {
        type: String,
        default: ""
      },
      // 强制显示错误信息
      errorMessage: {
        type: [String, Boolean],
        default: ""
      },
      // 1.4.0 弃用，统一使用 form 的校验时机
      // validateTrigger: {
      // 	type: String,
      // 	default: ''
      // },
      // 1.4.0 弃用，统一使用 form 的label 位置
      // labelPosition: {
      // 	type: String,
      // 	default: ''
      // },
      // 1.4.0 以下属性已经废弃，请使用  #label 插槽代替
      leftIcon: String,
      iconColor: {
        type: String,
        default: "#606266"
      }
    },
    data() {
      return {
        errMsg: "",
        userRules: null,
        localLabelAlign: "left",
        localLabelWidth: "70px",
        localLabelPos: "left",
        border: false,
        isFirstBorder: false
      };
    },
    computed: {
      // 处理错误信息
      msg() {
        return this.errorMessage || this.errMsg;
      }
    },
    watch: {
      // 规则发生变化通知子组件更新
      "form.formRules"(val) {
        this.init();
      },
      "form.labelWidth"(val) {
        this.localLabelWidth = this._labelWidthUnit(val);
      },
      "form.labelPosition"(val) {
        this.localLabelPos = this._labelPosition();
      },
      "form.labelAlign"(val) {
      }
    },
    created() {
      this.init(true);
      if (this.name && this.form) {
        this.$watch(
          () => {
            const val = this.form._getDataValue(this.name, this.form.localData);
            return val;
          },
          (value, oldVal) => {
            const isEqual2 = this.form._isEqual(value, oldVal);
            if (!isEqual2) {
              const val = this.itemSetValue(value);
              this.onFieldChange(val, false);
            }
          },
          {
            immediate: false
          }
        );
      }
    },
    unmounted() {
      this.__isUnmounted = true;
      this.unInit();
    },
    methods: {
      /**
       * 外部调用方法
       * 设置规则 ，主要用于小程序自定义检验规则
       * @param {Array} rules 规则源数据
       */
      setRules(rules = null) {
        this.userRules = rules;
        this.init(false);
      },
      // 兼容老版本表单组件
      setValue() {
      },
      /**
       * 外部调用方法
       * 校验数据
       * @param {any} value 需要校验的数据
       * @param {boolean} 是否立即校验
       * @return {Array|null} 校验内容
       */
      async onFieldChange(value, formtrigger = true) {
        const {
          formData,
          localData,
          errShowType,
          validateCheck,
          validateTrigger,
          _isRequiredField,
          _realName
        } = this.form;
        const name = _realName(this.name);
        if (!value) {
          value = this.form.formData[name];
        }
        const ruleLen = this.itemRules.rules && this.itemRules.rules.length;
        if (!this.validator || !ruleLen || ruleLen === 0)
          return;
        const isRequiredField2 = _isRequiredField(this.itemRules.rules || []);
        let result = null;
        if (validateTrigger === "bind" || formtrigger) {
          result = await this.validator.validateUpdate(
            {
              [name]: value
            },
            formData
          );
          if (!isRequiredField2 && (value === void 0 || value === "")) {
            result = null;
          }
          if (result && result.errorMessage) {
            if (errShowType === "undertext") {
              this.errMsg = !result ? "" : result.errorMessage;
            }
            if (errShowType === "toast") {
              uni.showToast({
                title: result.errorMessage || "校验错误",
                icon: "none"
              });
            }
            if (errShowType === "modal") {
              uni.showModal({
                title: "提示",
                content: result.errorMessage || "校验错误"
              });
            }
          } else {
            this.errMsg = "";
          }
          validateCheck(result ? result : null);
        } else {
          this.errMsg = "";
        }
        return result ? result : null;
      },
      /**
       * 初始组件数据
       */
      init(type = false) {
        const {
          validator,
          formRules,
          childrens,
          formData,
          localData,
          _realName,
          labelWidth,
          _getDataValue,
          _setDataValue
        } = this.form || {};
        this.localLabelAlign = this._justifyContent();
        this.localLabelWidth = this._labelWidthUnit(labelWidth);
        this.localLabelPos = this._labelPosition();
        this.form && type && childrens.push(this);
        if (!validator || !formRules)
          return;
        if (!this.form.isFirstBorder) {
          this.form.isFirstBorder = true;
          this.isFirstBorder = true;
        }
        if (this.group) {
          if (!this.group.isFirstBorder) {
            this.group.isFirstBorder = true;
            this.isFirstBorder = true;
          }
        }
        this.border = this.form.border;
        const name = _realName(this.name);
        const itemRule = this.userRules || this.rules;
        if (typeof formRules === "object" && itemRule) {
          formRules[name] = {
            rules: itemRule
          };
          validator.updateSchema(formRules);
        }
        const itemRules = formRules[name] || {};
        this.itemRules = itemRules;
        this.validator = validator;
        this.itemSetValue(_getDataValue(this.name, localData));
      },
      unInit() {
        if (this.form) {
          const {
            childrens,
            formData,
            _realName
          } = this.form;
          childrens.forEach((item, index) => {
            if (item === this) {
              this.form.childrens.splice(index, 1);
              delete formData[_realName(item.name)];
            }
          });
        }
      },
      // 设置item 的值
      itemSetValue(value) {
        const name = this.form._realName(this.name);
        const rules = this.itemRules.rules || [];
        const val = this.form._getValue(name, value, rules);
        this.form._setDataValue(name, this.form.formData, val);
        return val;
      },
      /**
       * 移除该表单项的校验结果
       */
      clearValidate() {
        this.errMsg = "";
      },
      // 是否显示星号
      _isRequired() {
        return this.required;
      },
      // 处理对齐方式
      _justifyContent() {
        if (this.form) {
          const {
            labelAlign
          } = this.form;
          let labelAli = this.labelAlign ? this.labelAlign : labelAlign;
          if (labelAli === "left")
            return "flex-start";
          if (labelAli === "center")
            return "center";
          if (labelAli === "right")
            return "flex-end";
        }
        return "flex-start";
      },
      // 处理 label宽度单位 ,继承父元素的值
      _labelWidthUnit(labelWidth) {
        return this.num2px(this.labelWidth ? this.labelWidth : labelWidth || (this.label ? 70 : "auto"));
      },
      // 处理 label 位置
      _labelPosition() {
        if (this.form)
          return this.form.labelPosition || "left";
        return "left";
      },
      /**
       * 触发时机
       * @param {Object} rule 当前规则内时机
       * @param {Object} itemRlue 当前组件时机
       * @param {Object} parentRule 父组件时机
       */
      isTrigger(rule, itemRlue, parentRule) {
        if (rule === "submit" || !rule) {
          if (rule === void 0) {
            if (itemRlue !== "bind") {
              if (!itemRlue) {
                return parentRule === "" ? "bind" : "submit";
              }
              return "submit";
            }
            return "bind";
          }
          return "submit";
        }
        return "bind";
      },
      num2px(num) {
        if (typeof num === "number") {
          return `${num}px`;
        }
        return num;
      }
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uni-forms-item", ["is-direction-" + $data.localLabelPos, $data.border ? "uni-forms-item--border" : "", $data.border && $data.isFirstBorder ? "is-first-border" : ""]])
      },
      [
        vue.renderSlot(_ctx.$slots, "label", {}, () => [
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["uni-forms-item__label", { "no-label": !$props.label && !$props.required }]),
              style: vue.normalizeStyle({ width: $data.localLabelWidth, justifyContent: $data.localLabelAlign })
            },
            [
              $props.required ? (vue.openBlock(), vue.createElementBlock("text", {
                key: 0,
                class: "is-required"
              }, "*")) : vue.createCommentVNode("v-if", true),
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString($props.label),
                1
                /* TEXT */
              )
            ],
            6
            /* CLASS, STYLE */
          )
        ], true),
        vue.createElementVNode("view", { class: "uni-forms-item__content" }, [
          vue.renderSlot(_ctx.$slots, "default", {}, void 0, true),
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["uni-forms-item__error", { "msg--active": $options.msg }])
            },
            [
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString($options.msg),
                1
                /* TEXT */
              )
            ],
            2
            /* CLASS */
          )
        ])
      ],
      2
      /* CLASS */
    );
  }
  const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["render", _sfc_render$4], ["__scopeId", "data-v-3515f8e1"], ["__file", "C:/easyjob/easyjob-front/easyjob-app/node_modules/@dcloudio/uni-ui/lib/uni-forms-item/uni-forms-item.vue"]]);
  const _sfc_main$x = {
    __name: "ExamQuestionItem",
    props: {
      modelValue: {
        type: [String, Array]
      },
      height: {
        type: Number
      },
      data: {
        type: Object,
        default: {}
      },
      index: {
        type: Number
      },
      showAnswer: {
        type: Boolean,
        default: false
      },
      showHtml: {
        type: Boolean,
        default: false
      }
    },
    emits: ["update:modelValue"],
    setup(__props, { emit }) {
      const props = __props;
      vue.getCurrentInstance();
      const resetTitle = (data) => {
        return `${data.title}(${QUESTION_TYPE[data.questionType]})`;
      };
      const formateAnswerOptions = (question) => {
        let options = [];
        if (question.questionType == 0) {
          options = [
            {
              text: "正确",
              value: "1",
              disable: props.showAnswer
            },
            {
              text: "错误",
              value: "0",
              disable: props.showAnswer
            }
          ];
          return options;
        }
        const questionItemList = question.questionItemList;
        for (let i2 = 0; i2 < questionItemList.length; i2++) {
          options.push({
            text: LETTER[i2] + "、" + questionItemList[i2].title,
            value: i2 + "",
            disable: props.showAnswer
          });
        }
        return options;
      };
      const checkChange = (e) => {
        const value = e.detail.value;
        emit("update:modelValue", value);
        save2Local(value);
      };
      const save2Local = (value) => {
        const data = props.data;
        let examAnswer = uni.getStorageSync(LOCAL_STORAGE_KEY.exam_answer.key);
        if (examAnswer == "") {
          examAnswer = {};
        }
        if (examAnswer[data.examId] == null) {
          examAnswer[data.examId] = {};
        }
        examAnswer[data.examId][data.questionId] = value;
        uni.setStorageSync(LOCAL_STORAGE_KEY.exam_answer.key, examAnswer);
      };
      const getAnswer = (item, answerType) => {
        const answer = answerType == 0 ? item.questionAnswer : item.userAnswer;
        if (answer == null) {
          return "";
        }
        if (item.questionType == 0) {
          return answer == "0" ? "错误" : "正确";
        } else {
          let answerArray = answer;
          if (!(answer instanceof Array)) {
            answerArray = answer.split(",");
          }
          const answerResult = [];
          answerArray.forEach((item2) => {
            answerResult.push(LETTER[Number.parseInt(item2)]);
          });
          return answerResult.join("、");
        }
      };
      return (_ctx, _cache) => {
        const _component_uni_data_checkbox = resolveEasycom(vue.resolveDynamicComponent("uni-data-checkbox"), __easycom_2);
        const _component_uni_forms_item = resolveEasycom(vue.resolveDynamicComponent("uni-forms-item"), __easycom_1);
        const _component_uni_rate = resolveEasycom(vue.resolveDynamicComponent("uni-rate"), __easycom_2$1);
        return vue.openBlock(), vue.createElementBlock(
          "view",
          {
            class: "question-item",
            style: vue.normalizeStyle({ height: __props.height ? __props.height + "px" : "auto" })
          },
          [
            vue.createElementVNode("view", { class: "question-content" }, [
              vue.createCommentVNode("标题"),
              vue.createElementVNode("view", { class: "title-info" }, [
                vue.createElementVNode("rich-text", {
                  nodes: resetTitle(__props.data),
                  class: "title"
                }, null, 8, ["nodes"])
              ]),
              vue.createCommentVNode("问题描述"),
              __props.data.question && __props.showHtml ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "rich-text"
              }, [
                vue.createVNode(uvParse, {
                  content: __props.data.question
                }, null, 8, ["content"])
              ])) : vue.createCommentVNode("v-if", true),
              vue.createCommentVNode("问题选项"),
              (vue.openBlock(), vue.createBlock(_component_uni_forms_item, {
                name: ["questionList", __props.index, "userAnswer"],
                key: __props.data.questionId,
                rules: [{ required: true, errorMessage: "请选择答案" }]
              }, {
                default: vue.withCtx(() => [
                  vue.createElementVNode("view", { class: "question-option" }, [
                    vue.createVNode(_component_uni_data_checkbox, {
                      wrap: true,
                      onChange: checkChange,
                      multiple: __props.data.questionType == 2,
                      "model-value": __props.modelValue,
                      localdata: formateAnswerOptions(__props.data)
                    }, null, 8, ["multiple", "model-value", "localdata"])
                  ])
                ]),
                _: 1
                /* STABLE */
              }, 8, ["name"])),
              vue.createCommentVNode("问题答案"),
              __props.showAnswer ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "question-answer"
              }, [
                vue.createElementVNode("text", null, "答案"),
                vue.createElementVNode(
                  "text",
                  { class: "answer" },
                  vue.toDisplayString(getAnswer(__props.data, 0)),
                  1
                  /* TEXT */
                ),
                __props.data.answerResult != null && __props.data.answerResult != 0 ? (vue.openBlock(), vue.createElementBlock(
                  vue.Fragment,
                  { key: 0 },
                  [
                    vue.createElementVNode("text", null, "您选择"),
                    vue.createElementVNode(
                      "text",
                      { class: "answer my" },
                      vue.toDisplayString(getAnswer(__props.data, 1)),
                      1
                      /* TEXT */
                    ),
                    __props.data.answerResult == 1 ? (vue.openBlock(), vue.createElementBlock("text", {
                      key: 0,
                      class: "iconfont icon-ok"
                    })) : vue.createCommentVNode("v-if", true),
                    __props.data.answerResult == 2 ? (vue.openBlock(), vue.createElementBlock("text", {
                      key: 1,
                      class: "iconfont icon-wrong"
                    })) : vue.createCommentVNode("v-if", true)
                  ],
                  64
                  /* STABLE_FRAGMENT */
                )) : vue.createCommentVNode("v-if", true)
              ])) : vue.createCommentVNode("v-if", true)
            ]),
            __props.showAnswer ? (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 0 },
              [
                vue.createElementVNode("view", { class: "line" }),
                vue.createElementVNode("view", { class: "answer-analysis" }, [
                  vue.createElementVNode("view", { class: "title" }, [
                    vue.createTextVNode("- "),
                    vue.createElementVNode("text", { class: "inner" }, "试题详解"),
                    vue.createTextVNode(" -")
                  ]),
                  vue.createElementVNode("view", { class: "difficulty-panel" }, [
                    vue.createElementVNode("view", { class: "part-title" }, "难度"),
                    vue.createElementVNode("view", { class: "star" }, [
                      vue.createVNode(_component_uni_rate, {
                        size: "20",
                        readyonly: true,
                        value: __props.data.difficultyLevel,
                        activeColor: "#aa6bd9"
                      }, null, 8, ["value"])
                    ])
                  ]),
                  vue.createElementVNode("view", { class: "part-title" }, "题目解析"),
                  vue.createElementVNode("view", { class: "rich-text" }, [
                    __props.data.answerAnalysis ? (vue.openBlock(), vue.createBlock(uvParse, {
                      key: 0,
                      content: __props.data.answerAnalysis
                    }, null, 8, ["content"])) : (vue.openBlock(), vue.createElementBlock("view", {
                      key: 1,
                      class: "no-data"
                    }, " 暂无答案解析 "))
                  ])
                ])
              ],
              64
              /* STABLE_FRAGMENT */
            )) : vue.createCommentVNode("v-if", true)
          ],
          4
          /* STYLE */
        );
      };
    }
  };
  const ExamQuestionItem = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["__scopeId", "data-v-dc11d100"], ["__file", "C:/easyjob/easyjob-front/easyjob-app/src/pages/exam/ExamQuestionItem.vue"]]);
  function obj2strClass(obj) {
    let classess = "";
    for (let key in obj) {
      const val = obj[key];
      if (val) {
        classess += `${key} `;
      }
    }
    return classess;
  }
  function obj2strStyle(obj) {
    let style = "";
    for (let key in obj) {
      const val = obj[key];
      style += `${key}:${val};`;
    }
    return style;
  }
  const _sfc_main$w = {
    name: "uni-easyinput",
    emits: [
      "click",
      "iconClick",
      "update:modelValue",
      "input",
      "focus",
      "blur",
      "confirm",
      "clear",
      "eyes",
      "change",
      "keyboardheightchange"
    ],
    model: {
      prop: "modelValue",
      event: "update:modelValue"
    },
    options: {
      virtualHost: true
    },
    inject: {
      form: {
        from: "uniForm",
        default: null
      },
      formItem: {
        from: "uniFormItem",
        default: null
      }
    },
    props: {
      name: String,
      value: [Number, String],
      modelValue: [Number, String],
      type: {
        type: String,
        default: "text"
      },
      clearable: {
        type: Boolean,
        default: true
      },
      autoHeight: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        default: " "
      },
      placeholderStyle: String,
      focus: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      maxlength: {
        type: [Number, String],
        default: 140
      },
      confirmType: {
        type: String,
        default: "done"
      },
      clearSize: {
        type: [Number, String],
        default: 24
      },
      inputBorder: {
        type: Boolean,
        default: true
      },
      prefixIcon: {
        type: String,
        default: ""
      },
      suffixIcon: {
        type: String,
        default: ""
      },
      trim: {
        type: [Boolean, String],
        default: false
      },
      cursorSpacing: {
        type: Number,
        default: 0
      },
      passwordIcon: {
        type: Boolean,
        default: true
      },
      adjustPosition: {
        type: Boolean,
        default: true
      },
      primaryColor: {
        type: String,
        default: "#2979ff"
      },
      styles: {
        type: Object,
        default() {
          return {
            color: "#333",
            backgroundColor: "#fff",
            disableColor: "#F7F6F6",
            borderColor: "#e5e5e5"
          };
        }
      },
      errorMessage: {
        type: [String, Boolean],
        default: ""
      }
    },
    data() {
      return {
        focused: false,
        val: "",
        showMsg: "",
        border: false,
        isFirstBorder: false,
        showClearIcon: false,
        showPassword: false,
        focusShow: false,
        localMsg: "",
        isEnter: false
        // 用于判断当前是否是使用回车操作
      };
    },
    computed: {
      // 输入框内是否有值
      isVal() {
        const val = this.val;
        if (val || val === 0) {
          return true;
        }
        return false;
      },
      msg() {
        return this.localMsg || this.errorMessage;
      },
      // 因为uniapp的input组件的maxlength组件必须要数值，这里转为数值，用户可以传入字符串数值
      inputMaxlength() {
        return Number(this.maxlength);
      },
      // 处理外层样式的style
      boxStyle() {
        return `color:${this.inputBorder && this.msg ? "#e43d33" : this.styles.color};`;
      },
      // input 内容的类和样式处理
      inputContentClass() {
        return obj2strClass({
          "is-input-border": this.inputBorder,
          "is-input-error-border": this.inputBorder && this.msg,
          "is-textarea": this.type === "textarea",
          "is-disabled": this.disabled,
          "is-focused": this.focusShow
        });
      },
      inputContentStyle() {
        const focusColor = this.focusShow ? this.primaryColor : this.styles.borderColor;
        const borderColor = this.inputBorder && this.msg ? "#dd524d" : focusColor;
        return obj2strStyle({
          "border-color": borderColor || "#e5e5e5",
          "background-color": this.disabled ? this.styles.disableColor : this.styles.backgroundColor
        });
      },
      // input右侧样式
      inputStyle() {
        const paddingRight = this.type === "password" || this.clearable || this.prefixIcon ? "" : "10px";
        return obj2strStyle({
          "padding-right": paddingRight,
          "padding-left": this.prefixIcon ? "" : "10px"
        });
      }
    },
    watch: {
      value(newVal) {
        if (newVal === null) {
          this.val = "";
          return;
        }
        this.val = newVal;
      },
      modelValue(newVal) {
        if (newVal === null) {
          this.val = "";
          return;
        }
        this.val = newVal;
      },
      focus(newVal) {
        this.$nextTick(() => {
          this.focused = this.focus;
          this.focusShow = this.focus;
        });
      }
    },
    created() {
      this.init();
      if (this.form && this.formItem) {
        this.$watch("formItem.errMsg", (newVal) => {
          this.localMsg = newVal;
        });
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.focused = this.focus;
        this.focusShow = this.focus;
      });
    },
    methods: {
      /**
       * 初始化变量值
       */
      init() {
        if (this.value || this.value === 0) {
          this.val = this.value;
        } else if (this.modelValue || this.modelValue === 0 || this.modelValue === "") {
          this.val = this.modelValue;
        } else {
          this.val = "";
        }
      },
      /**
       * 点击图标时触发
       * @param {Object} type
       */
      onClickIcon(type) {
        this.$emit("iconClick", type);
      },
      /**
       * 显示隐藏内容，密码框时生效
       */
      onEyes() {
        this.showPassword = !this.showPassword;
        this.$emit("eyes", this.showPassword);
      },
      /**
       * 输入时触发
       * @param {Object} event
       */
      onInput(event) {
        let value = event.detail.value;
        if (this.trim) {
          if (typeof this.trim === "boolean" && this.trim) {
            value = this.trimStr(value);
          }
          if (typeof this.trim === "string") {
            value = this.trimStr(value, this.trim);
          }
        }
        if (this.errMsg)
          this.errMsg = "";
        this.val = value;
        this.$emit("input", value);
        this.$emit("update:modelValue", value);
      },
      /**
       * 外部调用方法
       * 获取焦点时触发
       * @param {Object} event
       */
      onFocus() {
        this.$nextTick(() => {
          this.focused = true;
        });
        this.$emit("focus", null);
      },
      _Focus(event) {
        this.focusShow = true;
        this.$emit("focus", event);
      },
      /**
       * 外部调用方法
       * 失去焦点时触发
       * @param {Object} event
       */
      onBlur() {
        this.focused = false;
        this.$emit("blur", null);
      },
      _Blur(event) {
        event.detail.value;
        this.focusShow = false;
        this.$emit("blur", event);
        if (this.isEnter === false) {
          this.$emit("change", this.val);
        }
        if (this.form && this.formItem) {
          const { validateTrigger } = this.form;
          if (validateTrigger === "blur") {
            this.formItem.onFieldChange();
          }
        }
      },
      /**
       * 按下键盘的发送键
       * @param {Object} e
       */
      onConfirm(e) {
        this.$emit("confirm", this.val);
        this.isEnter = true;
        this.$emit("change", this.val);
        this.$nextTick(() => {
          this.isEnter = false;
        });
      },
      /**
       * 清理内容
       * @param {Object} event
       */
      onClear(event) {
        this.val = "";
        this.$emit("input", "");
        this.$emit("update:modelValue", "");
        this.$emit("clear");
      },
      /**
       * 键盘高度发生变化的时候触发此事件
       * 兼容性：微信小程序2.7.0+、App 3.1.0+
       * @param {Object} event
       */
      onkeyboardheightchange(event) {
        this.$emit("keyboardheightchange", event);
      },
      /**
       * 去除空格
       */
      trimStr(str, pos = "both") {
        if (pos === "both") {
          return str.trim();
        } else if (pos === "left") {
          return str.trimLeft();
        } else if (pos === "right") {
          return str.trimRight();
        } else if (pos === "start") {
          return str.trimStart();
        } else if (pos === "end") {
          return str.trimEnd();
        } else if (pos === "all") {
          return str.replace(/\s+/g, "");
        } else if (pos === "none") {
          return str;
        }
        return str;
      }
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$5);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uni-easyinput", { "uni-easyinput-error": $options.msg }]),
        style: vue.normalizeStyle($options.boxStyle)
      },
      [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["uni-easyinput__content", $options.inputContentClass]),
            style: vue.normalizeStyle($options.inputContentStyle)
          },
          [
            $props.prefixIcon ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
              key: 0,
              class: "content-clear-icon",
              type: $props.prefixIcon,
              color: "#c0c4cc",
              onClick: _cache[0] || (_cache[0] = ($event) => $options.onClickIcon("prefix")),
              size: "22"
            }, null, 8, ["type"])) : vue.createCommentVNode("v-if", true),
            vue.renderSlot(_ctx.$slots, "left", {}, void 0, true),
            $props.type === "textarea" ? (vue.openBlock(), vue.createElementBlock("textarea", {
              key: 1,
              class: vue.normalizeClass(["uni-easyinput__content-textarea", { "input-padding": $props.inputBorder }]),
              name: $props.name,
              value: $data.val,
              placeholder: $props.placeholder,
              placeholderStyle: $props.placeholderStyle,
              disabled: $props.disabled,
              "placeholder-class": "uni-easyinput__placeholder-class",
              maxlength: $options.inputMaxlength,
              focus: $data.focused,
              autoHeight: $props.autoHeight,
              "cursor-spacing": $props.cursorSpacing,
              "adjust-position": $props.adjustPosition,
              onInput: _cache[1] || (_cache[1] = (...args) => $options.onInput && $options.onInput(...args)),
              onBlur: _cache[2] || (_cache[2] = (...args) => $options._Blur && $options._Blur(...args)),
              onFocus: _cache[3] || (_cache[3] = (...args) => $options._Focus && $options._Focus(...args)),
              onConfirm: _cache[4] || (_cache[4] = (...args) => $options.onConfirm && $options.onConfirm(...args)),
              onKeyboardheightchange: _cache[5] || (_cache[5] = (...args) => $options.onkeyboardheightchange && $options.onkeyboardheightchange(...args))
            }, null, 42, ["name", "value", "placeholder", "placeholderStyle", "disabled", "maxlength", "focus", "autoHeight", "cursor-spacing", "adjust-position"])) : (vue.openBlock(), vue.createElementBlock("input", {
              key: 2,
              type: $props.type === "password" ? "text" : $props.type,
              class: "uni-easyinput__content-input",
              style: vue.normalizeStyle($options.inputStyle),
              name: $props.name,
              value: $data.val,
              password: !$data.showPassword && $props.type === "password",
              placeholder: $props.placeholder,
              placeholderStyle: $props.placeholderStyle,
              "placeholder-class": "uni-easyinput__placeholder-class",
              disabled: $props.disabled,
              maxlength: $options.inputMaxlength,
              focus: $data.focused,
              confirmType: $props.confirmType,
              "cursor-spacing": $props.cursorSpacing,
              "adjust-position": $props.adjustPosition,
              onFocus: _cache[6] || (_cache[6] = (...args) => $options._Focus && $options._Focus(...args)),
              onBlur: _cache[7] || (_cache[7] = (...args) => $options._Blur && $options._Blur(...args)),
              onInput: _cache[8] || (_cache[8] = (...args) => $options.onInput && $options.onInput(...args)),
              onConfirm: _cache[9] || (_cache[9] = (...args) => $options.onConfirm && $options.onConfirm(...args)),
              onKeyboardheightchange: _cache[10] || (_cache[10] = (...args) => $options.onkeyboardheightchange && $options.onkeyboardheightchange(...args))
            }, null, 44, ["type", "name", "value", "password", "placeholder", "placeholderStyle", "disabled", "maxlength", "focus", "confirmType", "cursor-spacing", "adjust-position"])),
            $props.type === "password" && $props.passwordIcon ? (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 3 },
              [
                vue.createCommentVNode(" 开启密码时显示小眼睛 "),
                $options.isVal ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
                  key: 0,
                  class: vue.normalizeClass(["content-clear-icon", { "is-textarea-icon": $props.type === "textarea" }]),
                  type: $data.showPassword ? "eye-slash-filled" : "eye-filled",
                  size: 22,
                  color: $data.focusShow ? $props.primaryColor : "#c0c4cc",
                  onClick: $options.onEyes
                }, null, 8, ["class", "type", "color", "onClick"])) : vue.createCommentVNode("v-if", true)
              ],
              64
              /* STABLE_FRAGMENT */
            )) : vue.createCommentVNode("v-if", true),
            $props.suffixIcon ? (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 4 },
              [
                $props.suffixIcon ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
                  key: 0,
                  class: "content-clear-icon",
                  type: $props.suffixIcon,
                  color: "#c0c4cc",
                  onClick: _cache[11] || (_cache[11] = ($event) => $options.onClickIcon("suffix")),
                  size: "22"
                }, null, 8, ["type"])) : vue.createCommentVNode("v-if", true)
              ],
              64
              /* STABLE_FRAGMENT */
            )) : (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 5 },
              [
                $props.clearable && $options.isVal && !$props.disabled && $props.type !== "textarea" ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
                  key: 0,
                  class: vue.normalizeClass(["content-clear-icon", { "is-textarea-icon": $props.type === "textarea" }]),
                  type: "clear",
                  size: $props.clearSize,
                  color: $options.msg ? "#dd524d" : $data.focusShow ? $props.primaryColor : "#c0c4cc",
                  onClick: $options.onClear
                }, null, 8, ["class", "size", "color", "onClick"])) : vue.createCommentVNode("v-if", true)
              ],
              64
              /* STABLE_FRAGMENT */
            )),
            vue.renderSlot(_ctx.$slots, "right", {}, void 0, true)
          ],
          6
          /* CLASS, STYLE */
        )
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0$3 = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["render", _sfc_render$3], ["__scopeId", "data-v-f7a14e66"], ["__file", "C:/easyjob/easyjob-front/easyjob-app/node_modules/@dcloudio/uni-ui/lib/uni-easyinput/uni-easyinput.vue"]]);
  const _sfc_main$v = {
    __name: "ExamPostModel",
    emits: ["postExam"],
    setup(__props, { expose, emit }) {
      vue.getCurrentInstance();
      const formData = vue.ref({});
      const formDataRef = vue.ref();
      const rules = {
        remark: {
          rules: [{ required: true, errorMessage: "请输入内容" }]
        }
      };
      const submit = () => {
        formDataRef.value.validate((errors, value) => {
          if (errors) {
            return;
          }
          emit("postExam", formData.value.remark);
        });
      };
      const postExamRef = vue.ref();
      const show = () => {
        postExamRef.value.show();
      };
      const close = () => {
        postExamRef.value.close();
      };
      expose({
        show,
        close
      });
      return (_ctx, _cache) => {
        const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_0$3);
        const _component_uni_forms_item = resolveEasycom(vue.resolveDynamicComponent("uni-forms-item"), __easycom_1);
        const _component_uni_forms = resolveEasycom(vue.resolveDynamicComponent("uni-forms"), __easycom_3);
        const _component_Dialog = vue.resolveComponent("Dialog");
        return vue.openBlock(), vue.createElementBlock("view", null, [
          vue.createVNode(
            _component_Dialog,
            {
              title: "提交考试",
              ref_key: "postExamRef",
              ref: postExamRef,
              showCancel: true,
              okFun: submit,
              okText: "提交考试"
            },
            {
              default: vue.withCtx(() => [
                vue.createVNode(_component_uni_forms, {
                  ref_key: "formDataRef",
                  ref: formDataRef,
                  model: formData.value,
                  "label-width": "0",
                  rules
                }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_uni_forms_item, { name: "remark" }, {
                      default: vue.withCtx(() => [
                        vue.createVNode(_component_uni_easyinput, {
                          modelValue: formData.value.remark,
                          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => formData.value.remark = $event),
                          placeholder: "请输入备注",
                          trim: true
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                      /* STABLE */
                    })
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["model"])
              ]),
              _: 1
              /* STABLE */
            },
            512
            /* NEED_PATCH */
          )
        ]);
      };
    }
  };
  const ExamPostModel = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["__file", "C:/easyjob/easyjob-front/easyjob-app/src/pages/exam/ExamPostModel.vue"]]);
  const _sfc_main$u = {
    __name: "TimerCountUp",
    setup(__props, { expose }) {
      vue.getCurrentInstance();
      const totalSeconds = vue.ref(0);
      const seconds = vue.computed(() => {
        return totalSeconds.value % 60;
      });
      const min = vue.computed(() => {
        return parseInt(totalSeconds.value / 60);
      });
      const hour = vue.computed(() => {
        return parseInt(totalSeconds.value / 3600);
      });
      const format = (num) => {
        return num < 10 ? "0" + num : num;
      };
      const timer = vue.ref();
      const start = () => {
        timer.value = setInterval(() => {
          totalSeconds.value++;
        }, 1e3);
      };
      const stop = () => {
        if (timer.value) {
          clearInterval(timer.value);
        }
      };
      expose({
        start,
        stop
      });
      vue.onUnmounted(() => {
        stop();
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "time" }, [
          vue.createElementVNode(
            "view",
            null,
            vue.toDisplayString(format(vue.unref(hour))),
            1
            /* TEXT */
          ),
          vue.createElementVNode("view", null, ":"),
          vue.createElementVNode(
            "view",
            null,
            vue.toDisplayString(format(vue.unref(min))),
            1
            /* TEXT */
          ),
          vue.createElementVNode("view", null, ":"),
          vue.createElementVNode(
            "view",
            null,
            vue.toDisplayString(format(vue.unref(seconds))),
            1
            /* TEXT */
          )
        ]);
      };
    }
  };
  const TimerCountUp = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["__scopeId", "data-v-011d76ed"], ["__file", "C:/easyjob/easyjob-front/easyjob-app/src/pages/components/common/TimerCountUp.vue"]]);
  const _sfc_main$t = {
    __name: "ExamQuestion",
    setup(__props) {
      const { proxy } = vue.getCurrentInstance();
      const appInfoStore = useAppInfoStore();
      const examId = vue.ref();
      onLoad((option) => {
        examId.value = option.examId;
        getExamQuestion();
      });
      const examInfo = vue.ref({});
      const startExamRef = vue.ref();
      const getExamQuestion = async () => {
        let result = await proxy.Request({
          url: proxy.Api.getExamQuestion,
          params: {
            examId: examId.value
          }
        });
        if (!result) {
          return;
        }
        const _examInfo = result.data;
        const _questionList = result.data.examQuestionList;
        let rightCount = 0;
        let examAnswerLocal = uni.getStorageSync(LOCAL_STORAGE_KEY.exam_answer.key);
        _questionList.forEach((element) => {
          if (_examInfo.status == 0) {
            element.userAnswer = void 0;
            if (examAnswerLocal !== "") {
              const examAnswer = examAnswerLocal[_examInfo.examId];
              if (examAnswer != null) {
                element.userAnswer = examAnswer[element.questionId];
              }
            }
          } else if (_examInfo.status == 1 && element.questionType == 2) {
            element.userAnswer = element.userAnswer.split(",");
          }
          if (element.answerResult == 1) {
            rightCount++;
          }
        });
        _examInfo.totalCount = _questionList.length;
        _examInfo.rightCount = rightCount;
        _examInfo.wrongCount = _questionList.length - rightCount;
        examInfo.value = _examInfo;
        formData.value.questionList = _questionList;
        currentExamQuestion.value = _questionList[0];
        if (result.data.status == 0) {
          startExamRef.value.show();
        }
      };
      const timerCountUpRef = vue.ref();
      const startExam = async () => {
        let result = await proxy.Request({
          url: proxy.Api.startExam,
          params: {
            examId: examId.value
          }
        });
        if (!result) {
          return;
        }
        startExamRef.value.close();
        timerCountUpRef.value.start();
      };
      const pageHeight = vue.computed(() => {
        const { statusBar, navBarHeight, screenHeight } = appInfoStore.getInfo();
        return screenHeight - statusBar - navBarHeight - 50;
      });
      const currentIndex = vue.ref(0);
      const currentExamQuestion = vue.ref({});
      const questionChange = (e) => {
        const { current, source } = e.detail;
        currentIndex.value = current;
        currentExamQuestion.value = formData.value.questionList[current];
      };
      const updateCollectHandler = (haveCollect) => {
        currentExamQuestion.value.haveCollect = haveCollect;
      };
      const formData = vue.ref({
        questionList: []
      });
      const formDataRef = vue.ref();
      const postExamRef = vue.ref();
      const submit = () => {
        formDataRef.value.validate(async (errors, value) => {
          if (errors) {
            const questionItemList = formData.value.questionList;
            for (let i2 = 0; i2 < questionItemList.length; i2++) {
              const item = questionItemList[i2];
              if (item.userAnswer == void 0 || item.userAnswer.length == 0) {
                currentIndex.value = i2;
                break;
              }
            }
            return;
          }
          postExamRef.value.show();
        });
      };
      const postExam = async (remark) => {
        let params = {
          examId: examId.value
        };
        const appExamQuestionList = [];
        const questionList = formData.value.questionList;
        questionList.forEach((item) => {
          let userAnswer = item.userAnswer;
          if (item.questionType == 2) {
            userAnswer = userAnswer.sort().join(",");
          }
          appExamQuestionList.push({
            userAnswer,
            questionId: item.questionId
          });
        });
        params.appExamQuestionList = appExamQuestionList;
        params.remark = remark;
        let result = await proxy.Request({
          url: proxy.Api.postExam,
          params,
          dataType: "json"
        });
        if (!result) {
          return;
        }
        proxy.Message.success("考试提交成功");
        postExamRef.value.close();
        timerCountUpRef.value.stop();
        getExamQuestion();
      };
      const back = () => {
        uni.navigateBack();
      };
      const questionPopupRef = vue.ref();
      const showQuestionList = () => {
        questionPopupRef.value.show();
      };
      const popItemWidth = vue.computed(() => {
        const { screenWidth } = appInfoStore.getInfo();
        return screenWidth / 6;
      });
      const selectQuestion = (index) => {
        currentIndex.value = index;
        questionPopupRef.value.close();
      };
      return (_ctx, _cache) => {
        const _component_Navbar = vue.resolveComponent("Navbar");
        const _component_uni_forms = resolveEasycom(vue.resolveDynamicComponent("uni-forms"), __easycom_3);
        const _component_Footer = vue.resolveComponent("Footer");
        const _component_Dialog = vue.resolveComponent("Dialog");
        const _component_Popup = vue.resolveComponent("Popup");
        return vue.openBlock(), vue.createElementBlock("view", null, [
          vue.createVNode(_component_Navbar, { showLeft: false }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("view", { class: "timer" }, [
                vue.createElementVNode("view", { class: "title" }, "耗时"),
                vue.createElementVNode("view", null, [
                  examInfo.value.status == 0 ? (vue.openBlock(), vue.createBlock(
                    TimerCountUp,
                    {
                      key: 0,
                      ref_key: "timerCountUpRef",
                      ref: timerCountUpRef
                    },
                    null,
                    512
                    /* NEED_PATCH */
                  )) : (vue.openBlock(), vue.createElementBlock(
                    "view",
                    { key: 1 },
                    vue.toDisplayString(examInfo.value.useTimeMin) + "分钟",
                    1
                    /* TEXT */
                  ))
                ])
              ])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createElementVNode("view", { class: "question-list" }, [
            vue.createVNode(_component_uni_forms, {
              ref_key: "formDataRef",
              ref: formDataRef,
              modelValue: formData.value
            }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("swiper", {
                  current: currentIndex.value,
                  class: "swiper",
                  onChange: questionChange,
                  style: vue.normalizeStyle({ height: vue.unref(pageHeight) + "px" })
                }, [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList(formData.value.questionList, (item, index) => {
                      return vue.openBlock(), vue.createElementBlock("swiper-item", { key: index }, [
                        vue.createVNode(ExamQuestionItem, {
                          data: item,
                          index,
                          showAnswer: examInfo.value.status == 1,
                          modelValue: formData.value.questionList[index].userAnswer,
                          "onUpdate:modelValue": ($event) => formData.value.questionList[index].userAnswer = $event,
                          showHtml: index == currentIndex.value,
                          height: vue.unref(pageHeight)
                        }, null, 8, ["data", "index", "showAnswer", "modelValue", "onUpdate:modelValue", "showHtml", "height"])
                      ]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ], 44, ["current"])
              ]),
              _: 1
              /* STABLE */
            }, 8, ["modelValue"])
          ]),
          vue.createVNode(_component_Footer, {
            objectId: currentExamQuestion.value.questionId + "",
            haveCollect: currentExamQuestion.value.haveCollect,
            collectType: 2,
            onUpdateCollect: updateCollectHandler
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("view", { class: "footer" }, [
                vue.createElementVNode("view", { class: "btn-panel" }, [
                  examInfo.value.status == 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    class: "btn",
                    onClick: submit
                  }, "交卷")) : (vue.openBlock(), vue.createElementBlock("view", {
                    key: 1,
                    class: "btn",
                    onClick: back
                  }, "返回"))
                ]),
                examInfo.value.status == 1 ? (vue.openBlock(), vue.createElementBlock(
                  vue.Fragment,
                  { key: 0 },
                  [
                    vue.createElementVNode(
                      "view",
                      { class: "iconfont icon-ok" },
                      vue.toDisplayString(examInfo.value.rightCount),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "view",
                      { class: "iconfont icon-wrong" },
                      vue.toDisplayString(examInfo.value.wrongCount),
                      1
                      /* TEXT */
                    )
                  ],
                  64
                  /* STABLE_FRAGMENT */
                )) : vue.createCommentVNode("v-if", true),
                vue.createElementVNode(
                  "view",
                  {
                    class: "iconfont icon-more",
                    onClick: showQuestionList
                  },
                  vue.toDisplayString(currentIndex.value + 1) + "/" + vue.toDisplayString(examInfo.value.totalCount),
                  1
                  /* TEXT */
                )
              ])
            ]),
            _: 1
            /* STABLE */
          }, 8, ["objectId", "haveCollect"]),
          vue.createVNode(
            _component_Dialog,
            {
              title: "开始考试",
              ref_key: "startExamRef",
              ref: startExamRef,
              showCancel: false,
              okFun: startExam,
              okText: "开始答题"
            },
            {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", { class: "question-total" }, [
                  vue.createElementVNode("text", null, "共"),
                  vue.createElementVNode(
                    "text",
                    { class: "count" },
                    vue.toDisplayString(examInfo.value.examQuestionList.length),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("text", null, "题")
                ]),
                vue.createElementVNode("view", null, "开始考试后不要将应用切换到后台"),
                vue.createElementVNode("view", null, "点击“开始答题”开始计时")
              ]),
              _: 1
              /* STABLE */
            },
            512
            /* NEED_PATCH */
          ),
          vue.createVNode(
            ExamPostModel,
            {
              ref_key: "postExamRef",
              ref: postExamRef,
              onPostExam: postExam
            },
            null,
            512
            /* NEED_PATCH */
          ),
          vue.createVNode(
            _component_Popup,
            {
              ref_key: "questionPopupRef",
              ref: questionPopupRef
            },
            {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", { class: "pop-question-list" }, [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList(formData.value.questionList, (item, index) => {
                      return vue.openBlock(), vue.createElementBlock(
                        "view",
                        {
                          class: "question-item",
                          style: vue.normalizeStyle({ width: vue.unref(popItemWidth) + "px", height: vue.unref(popItemWidth) + "px" })
                        },
                        [
                          vue.createElementVNode("view", {
                            class: vue.normalizeClass([
                              "item-inner",
                              currentIndex.value == index ? "active" : "",
                              item.userAnswer ? "answered" : ""
                            ]),
                            style: vue.normalizeStyle({
                              width: vue.unref(popItemWidth) - 20 + "px",
                              height: vue.unref(popItemWidth) - 20 + "px",
                              "border-radius": (vue.unref(popItemWidth) - 20) / 2 + "px"
                            }),
                            onClick: ($event) => selectQuestion(index)
                          }, vue.toDisplayString(index + 1), 15, ["onClick"])
                        ],
                        4
                        /* STYLE */
                      );
                    }),
                    256
                    /* UNKEYED_FRAGMENT */
                  ))
                ])
              ]),
              _: 1
              /* STABLE */
            },
            512
            /* NEED_PATCH */
          )
        ]);
      };
    }
  };
  const PagesExamExamQuestion = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["__scopeId", "data-v-764fe1bd"], ["__file", "C:/easyjob/easyjob-front/easyjob-app/src/pages/exam/ExamQuestion.vue"]]);
  const _sfc_main$s = {
    __name: "ShareItem",
    props: {
      data: {
        type: Object
      },
      showDetail: {
        type: Boolean
      }
    },
    setup(__props) {
      const props = __props;
      const { proxy } = vue.getCurrentInstance();
      const showDetailHandler = (data) => {
        if (!props.showDetail) {
          return;
        }
        let url = `/pages/share/ShareDetail?shareId=${data.shareId}`;
        uni.navigateTo({
          url
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", {
          class: "share-item",
          onClick: _cache[0] || (_cache[0] = ($event) => showDetailHandler(__props.data))
        }, [
          vue.createElementVNode("view", { class: "title-panel" }, [
            vue.createElementVNode("view", { class: "title" }, [
              vue.createElementVNode("rich-text", {
                nodes: __props.data.title
              }, null, 8, ["nodes"])
            ]),
            __props.data.coverType == 2 && __props.showDetail ? (vue.openBlock(), vue.createElementBlock("image", {
              key: 0,
              class: "cover-img",
              src: vue.unref(proxy).Api.domain + vue.unref(proxy).Api.imageUrl + __props.data.coverPath,
              mode: "aspectFill"
            }, null, 8, ["src"])) : vue.createCommentVNode("v-if", true)
          ]),
          __props.data.coverType == 1 && __props.showDetail ? (vue.openBlock(), vue.createElementBlock("image", {
            key: 0,
            class: "cover-full",
            style: { "width": "100%", "background-color": "#eeeeee" },
            mode: "aspectFill",
            src: vue.unref(proxy).Api.domain + vue.unref(proxy).Api.imageUrl + __props.data.coverPath
          }, null, 8, ["src"])) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("view", { class: "share-info" }, [
            vue.createElementVNode("view", { class: "user-info" }, [
              vue.createElementVNode("text", { class: "iconfont icon-user-icon-data" }),
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString(__props.data.createUserName),
                1
                /* TEXT */
              ),
              vue.createElementVNode("text", { class: "dot" }),
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString(vue.unref(proxy).Utils.dateformat(__props.data.createTime)),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "read-count" }, [
              vue.createElementVNode("text", { class: "iconfont icon-eye icon-data" }),
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString(__props.data.readCount),
                1
                /* TEXT */
              )
            ])
          ])
        ]);
      };
    }
  };
  const ShareItem = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["__scopeId", "data-v-f2b61a89"], ["__file", "C:/easyjob/easyjob-front/easyjob-app/src/pages/share/ShareItem.vue"]]);
  const _sfc_main$r = {
    __name: "ShareIndex",
    setup(__props) {
      const { proxy } = vue.getCurrentInstance();
      const dataSource = vue.ref({});
      const loadStatus = vue.ref(null);
      const loadDataList = async () => {
        loadStatus.value = "loading";
        let result = await proxy.Request({
          url: proxy.Api.loadShareInfo,
          params: {
            pageNo: dataSource.value.pageNo
          }
        });
        if (!result) {
          return;
        }
        loadStatus.value = "more";
        dataSource.value = result.data;
      };
      onLoad(() => {
        loadDataList();
      });
      onReachBottom(() => {
      });
      return (_ctx, _cache) => {
        const _component_Navbar = vue.resolveComponent("Navbar");
        const _component_DataList = vue.resolveComponent("DataList");
        return vue.openBlock(), vue.createElementBlock("view", null, [
          vue.createVNode(_component_Navbar, {
            showLeft: false,
            title: "经验分享"
          }),
          vue.createElementVNode("view", { class: "share-list" }, [
            vue.createVNode(_component_DataList, {
              dataSource: dataSource.value,
              onLoadData: loadDataList,
              loadStatus: loadStatus.value
            }, {
              default: vue.withCtx(({ data }) => [
                vue.createVNode(ShareItem, {
                  data,
                  showDetail: true
                }, null, 8, ["data"])
              ]),
              _: 1
              /* STABLE */
            }, 8, ["dataSource", "loadStatus"])
          ])
        ]);
      };
    }
  };
  const PagesShareShareIndex = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["__scopeId", "data-v-f69796a7"], ["__file", "C:/easyjob/easyjob-front/easyjob-app/src/pages/share/ShareIndex.vue"]]);
  const _sfc_main$q = {
    __name: "ShareDetail",
    setup(__props) {
      const { proxy } = vue.getCurrentInstance();
      const currentId = vue.ref();
      const shareData = vue.ref({});
      const nextType = vue.ref(null);
      const loadDetail = async () => {
        let url = proxy.Api.getShareDetailNext;
        let result = await proxy.Request({
          url,
          params: {
            currentId: currentId.value,
            nextType: nextType.value
          }
        });
        if (!result) {
          return;
        }
        shareData.value = result.data;
        currentId.value = result.data.shareId;
      };
      const loadDataNext = (_nextType) => {
        nextType.value = _nextType;
        loadDetail();
      };
      onLoad((option) => {
        currentId.value = option.shareId;
        loadDetail();
      });
      const updateCollect = (_haveCollect) => {
        shareData.value.haveCollect = _haveCollect;
      };
      return (_ctx, _cache) => {
        const _component_Navbar = vue.resolveComponent("Navbar");
        const _component_ShowTips = vue.resolveComponent("ShowTips");
        const _component_SlidePage = vue.resolveComponent("SlidePage");
        const _component_Footer = vue.resolveComponent("Footer");
        return vue.openBlock(), vue.createElementBlock("view", null, [
          vue.createVNode(_component_Navbar, {
            showLeft: true,
            title: "分享详情"
          }),
          vue.createVNode(_component_ShowTips),
          vue.createVNode(
            _component_SlidePage,
            {
              ref: "slidPageRef",
              onLoadData: loadDataNext,
              showFooter: true
            },
            {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", { class: "share-detail" }, [
                  vue.createVNode(ShareItem, {
                    data: shareData.value,
                    showDetail: false
                  }, null, 8, ["data"]),
                  shareData.value.coverType == 1 ? (vue.openBlock(), vue.createElementBlock("image", {
                    key: 0,
                    class: "cover-full",
                    style: { "width": "100%", "background-color": "#eeeeee" },
                    mode: "aspectFill",
                    src: vue.unref(proxy).Api.domain + vue.unref(proxy).Api.imageUrl + shareData.value.coverPath
                  }, null, 8, ["src"])) : vue.createCommentVNode("v-if", true),
                  vue.createElementVNode("view", { class: "detail" }, [
                    vue.createVNode(uvParse, {
                      content: shareData.value.content
                    }, null, 8, ["content"])
                  ])
                ])
              ]),
              _: 1
              /* STABLE */
            },
            512
            /* NEED_PATCH */
          ),
          vue.createVNode(_component_Footer, {
            objectId: shareData.value.shareId + "",
            collectType: 0,
            onUpdateCollect: updateCollect,
            haveCollect: shareData.value.haveCollect
          }, null, 8, ["objectId", "haveCollect"])
        ]);
      };
    }
  };
  const PagesShareShareDetail = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["__scopeId", "data-v-82978c41"], ["__file", "C:/easyjob/easyjob-front/easyjob-app/src/pages/share/ShareDetail.vue"]]);
  const _sfc_main$p = {
    __name: "MyEditInfo",
    emits: ["reload"],
    setup(__props, { expose, emit }) {
      const { proxy } = vue.getCurrentInstance();
      const checkRePassword = (rule, value, data, callback) => {
        if (value != "" && value !== formData.value.password) {
          callback("两次输入的密码不一致");
        }
        return true;
      };
      const formData = vue.ref({});
      const formDataRef = vue.ref();
      const rules = {
        sex: {
          rules: [{ required: true, errorMessage: "请选择性别" }]
        },
        password: {
          rules: [
            { maxLength: 18, errorMessage: "密码长度不能超过18个字符" },
            {
              pattern: /^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z~!@#$%^&*_]{8,}$/,
              errorMessage: "密码必须含有数字字母或特殊字符长度不能少于8位"
            }
          ]
        },
        rePassword: {
          rules: [{ validateFunction: checkRePassword }]
        }
      };
      const submit = () => {
        formDataRef.value.validate(async (err, value) => {
          if (err) {
            return;
          }
          const params = Object.assign({}, formData.value);
          let result = await proxy.Request({
            url: proxy.Api.updateUserInfo,
            params
          });
          if (!result) {
            return;
          }
          proxy.Message.success("修改成功!");
          dialogRef.value.close();
          emit("reload");
        });
      };
      const dialogRef = vue.ref();
      const show = (data) => {
        dialogRef.value.show();
        vue.nextTick(() => {
          formData.value = Object.assign({}, data);
        });
      };
      expose({ show });
      return (_ctx, _cache) => {
        const _component_uni_forms_item = resolveEasycom(vue.resolveDynamicComponent("uni-forms-item"), __easycom_1);
        const _component_uni_data_checkbox = resolveEasycom(vue.resolveDynamicComponent("uni-data-checkbox"), __easycom_2);
        const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_0$3);
        const _component_uni_forms = resolveEasycom(vue.resolveDynamicComponent("uni-forms"), __easycom_3);
        const _component_Dialog = vue.resolveComponent("Dialog");
        return vue.openBlock(), vue.createElementBlock("view", null, [
          vue.createVNode(
            _component_Dialog,
            {
              title: "修改信息",
              ref_key: "dialogRef",
              ref: dialogRef,
              showCancel: true,
              okFun: submit,
              okText: "确定"
            },
            {
              default: vue.withCtx(() => [
                vue.createVNode(_component_uni_forms, {
                  ref_key: "formDataRef",
                  ref: formDataRef,
                  model: formData.value,
                  rules,
                  "label-width": 70,
                  "label-align": "right"
                }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_uni_forms_item, {
                      name: "nickName",
                      label: "昵称"
                    }, {
                      default: vue.withCtx(() => [
                        vue.createElementVNode(
                          "view",
                          { class: "nick-name" },
                          vue.toDisplayString(formData.value.nickName),
                          1
                          /* TEXT */
                        )
                      ]),
                      _: 1
                      /* STABLE */
                    }),
                    vue.createVNode(_component_uni_forms_item, {
                      name: "sex",
                      label: "性别"
                    }, {
                      default: vue.withCtx(() => [
                        vue.createVNode(_component_uni_data_checkbox, {
                          modelValue: formData.value.sex,
                          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => formData.value.sex = $event),
                          localdata: [
                            {
                              text: "男",
                              value: 1
                            },
                            {
                              text: "女",
                              value: 0
                            }
                          ]
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                      /* STABLE */
                    }),
                    vue.createVNode(_component_uni_forms_item, {
                      name: "password",
                      label: "密码"
                    }, {
                      default: vue.withCtx(() => [
                        vue.createVNode(_component_uni_easyinput, {
                          type: "password",
                          modelValue: formData.value.password,
                          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => formData.value.password = $event),
                          placeholder: "请输入密码",
                          prefixIcon: "locked",
                          trim: true
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                      /* STABLE */
                    }),
                    vue.createVNode(_component_uni_forms_item, {
                      name: "rePassword",
                      label: "重复密码"
                    }, {
                      default: vue.withCtx(() => [
                        vue.createElementVNode("view", null, [
                          vue.createVNode(_component_uni_easyinput, {
                            type: "password",
                            modelValue: formData.value.rePassword,
                            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => formData.value.rePassword = $event),
                            placeholder: "请输入密码",
                            prefixIcon: "locked",
                            trim: true
                          }, null, 8, ["modelValue"])
                        ]),
                        vue.createElementVNode("view", { class: "tips" }, "不输入密码表示不修改密码")
                      ]),
                      _: 1
                      /* STABLE */
                    })
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["model"])
              ]),
              _: 1
              /* STABLE */
            },
            512
            /* NEED_PATCH */
          )
        ]);
      };
    }
  };
  const MyEditInfo = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["__scopeId", "data-v-817c068c"], ["__file", "C:/easyjob/easyjob-front/easyjob-app/src/pages/my/MyEditInfo.vue"]]);
  const _sfc_main$o = {
    __name: "MyIndex",
    setup(__props) {
      const { proxy } = vue.getCurrentInstance();
      const updateRef = vue.ref();
      const checkUpdate = () => {
        updateRef.value.checkUpdate(true);
      };
      const jump = (item) => {
        if (item.needLogin) {
          const token = uni.getStorageSync(LOCAL_STORAGE_KEY.token.key);
          if (token == "" || token == null) {
            uni.navigateTo({
              url: "/pages/account/LoginAndRegister"
            });
            return;
          }
        }
        if (item.clickFun) {
          item.clickFun();
          return;
        }
        uni.navigateTo({
          url: item.path
        });
      };
      const collectList = vue.ref([
        {
          text: "八股文",
          icon: "icon-question",
          path: "/pages/my/CollectQuestion",
          color: "#a294e8",
          needLogin: true
        },
        {
          text: "考题",
          icon: "icon-exam1",
          path: "/pages/my/CollectExamQuestion",
          color: "#a294e8",
          needLogin: true
        },
        {
          text: "分享",
          icon: "icon-share",
          path: "/pages/my/CollectShare",
          color: "#a294e8",
          needLogin: true
        }
      ]);
      const accumulationList = vue.ref([
        {
          text: "我的考试",
          icon: "icon-exam1",
          color: "#a294e8",
          path: "/pages/my/ExamList",
          needLogin: true
        },
        {
          text: "我的错题集",
          icon: "icon-wrong-question",
          color: "#a294e8",
          path: "/pages/my/WrongExamQuestion",
          needLogin: true
        }
      ]);
      const serviceList = vue.ref([
        {
          text: "问题反馈",
          icon: "icon-email",
          path: "/pages/my/Feedback",
          color: "#6e80e5",
          needLogin: true
        },
        {
          text: "检查更新",
          icon: "icon-update",
          color: "#6e80e5",
          needLogin: false,
          clickFun: checkUpdate
        }
      ]);
      const logout = () => {
        proxy.Confirm("确定要退出吗？", () => {
          uni.removeStorageSync(LOCAL_STORAGE_KEY.token.key);
          userInfo.value = {};
        });
      };
      const goLogin = () => {
        uni.navigateTo({
          url: "/pages/account/LoginAndRegister"
        });
      };
      const uploadAvatar = () => {
        uni.chooseImage({
          mediaType: ["image"],
          sourceType: ["camera", "album"],
          sizeType: ["compressed"],
          count: 1,
          success: function(res) {
            let header = {
              token: uni.getStorageSync(LOCAL_STORAGE_KEY.token.key)
            };
            uni.showLoading();
            uni.uploadFile({
              url: proxy.Api.domain + proxy.Api.uploadAvatar,
              filePath: res.tempFilePaths[0],
              name: "file",
              header,
              complete: (e) => {
                uni.hideLoading();
                getUserInfo();
                uni.setStorageSync(
                  LOCAL_STORAGE_KEY.avatar.key,
                  new Date().getTime()
                );
              }
            });
          }
        });
      };
      const avatarLastUpdate = vue.ref(0);
      const userInfo = vue.ref({});
      const getUserInfo = async () => {
        let result = await proxy.Request({
          url: proxy.Api.getUserInfo,
          showLoading: false
        });
        if (!result) {
          return;
        }
        userInfo.value = result.data || {};
        avatarLastUpdate.value = uni.getStorageSync(LOCAL_STORAGE_KEY.avatar.key);
      };
      const myEditInfoRef = vue.ref();
      const editInfo = () => {
        myEditInfoRef.value.show(userInfo.value);
      };
      onShow(() => {
        getUserInfo();
      });
      return (_ctx, _cache) => {
        const _component_Navbar = vue.resolveComponent("Navbar");
        const _component_uni_grid_item = resolveEasycom(vue.resolveDynamicComponent("uni-grid-item"), __easycom_0$6);
        const _component_uni_grid = resolveEasycom(vue.resolveDynamicComponent("uni-grid"), __easycom_1$1);
        return vue.openBlock(), vue.createElementBlock("view", null, [
          vue.createVNode(_component_Navbar, {
            showLeft: false,
            title: "个人中心"
          }),
          vue.createElementVNode("view", { class: "user-body" }, [
            vue.createElementVNode("view", { class: "base-info" }, [
              vue.createElementVNode("view", { class: "avatar" }, [
                Object.keys(userInfo.value).length === 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  onClick: goLogin,
                  class: "avatar-no-img no-login"
                }, "未登录")) : (vue.openBlock(), vue.createElementBlock(
                  vue.Fragment,
                  { key: 1 },
                  [
                    userInfo.value.avatar ? (vue.openBlock(), vue.createElementBlock("image", {
                      key: 0,
                      class: "avatar-img",
                      onClick: uploadAvatar,
                      src: `${vue.unref(proxy).Api.domain}${vue.unref(proxy).Api.imageUrl}${userInfo.value.avatar}?${avatarLastUpdate.value}`,
                      mode: "aspectFit"
                    }, null, 8, ["src"])) : (vue.openBlock(), vue.createElementBlock(
                      "view",
                      {
                        key: 1,
                        class: "avatar-no-img",
                        onClick: uploadAvatar
                      },
                      vue.toDisplayString(userInfo.value.nickName.split("")[0]),
                      1
                      /* TEXT */
                    ))
                  ],
                  64
                  /* STABLE_FRAGMENT */
                ))
              ]),
              Object.keys(userInfo.value).length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "user-info"
              }, [
                vue.createElementVNode("view", { class: "nick-name" }, [
                  vue.createElementVNode(
                    "view",
                    null,
                    vue.toDisplayString(userInfo.value.nickName),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("view", {
                    class: "iconfont icon-edit",
                    onClick: editInfo
                  }),
                  vue.createElementVNode("view", {
                    class: "iconfont icon-logout",
                    onClick: logout
                  })
                ]),
                vue.createElementVNode("view", { class: "join-time" }, [
                  vue.createElementVNode("view", { class: "sex" }, [
                    userInfo.value.sex == null ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, "未知")) : vue.createCommentVNode("v-if", true),
                    userInfo.value.sex == 1 ? (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, "男")) : vue.createCommentVNode("v-if", true),
                    userInfo.value.sex == 0 ? (vue.openBlock(), vue.createElementBlock("view", { key: 2 }, "女")) : vue.createCommentVNode("v-if", true)
                  ]),
                  vue.createElementVNode("view", { class: "line" }, "|"),
                  vue.createTextVNode(
                    " " + vue.toDisplayString(vue.unref(proxy).Utils.dateformat(userInfo.value.joinTime)) + " 加入 ",
                    1
                    /* TEXT */
                  )
                ])
              ])) : vue.createCommentVNode("v-if", true)
            ]),
            vue.createElementVNode("view", { class: "part-list" }, [
              vue.createElementVNode("view", { class: "part-title collect" }, "收藏"),
              vue.createElementVNode("view", { class: "item-list" }, [
                vue.createVNode(_component_uni_grid, {
                  column: 3,
                  "show-border": false,
                  square: false
                }, {
                  default: vue.withCtx(() => [
                    (vue.openBlock(true), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList(collectList.value, (item, index) => {
                        return vue.openBlock(), vue.createBlock(_component_uni_grid_item, {
                          index,
                          key: index,
                          onClick: ($event) => jump(item)
                        }, {
                          default: vue.withCtx(() => [
                            vue.createElementVNode("view", { class: "item" }, [
                              vue.createElementVNode(
                                "view",
                                {
                                  class: vue.normalizeClass(["iconfont", item.icon]),
                                  style: vue.normalizeStyle({ color: item.color })
                                },
                                null,
                                6
                                /* CLASS, STYLE */
                              ),
                              vue.createElementVNode(
                                "view",
                                { class: "text" },
                                vue.toDisplayString(item.text),
                                1
                                /* TEXT */
                              )
                            ])
                          ]),
                          _: 2
                          /* DYNAMIC */
                        }, 1032, ["index", "onClick"]);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ]),
                  _: 1
                  /* STABLE */
                })
              ])
            ]),
            vue.createElementVNode("view", { class: "part-list" }, [
              vue.createElementVNode("view", { class: "part-title collect" }, "积累"),
              vue.createElementVNode("view", { class: "item-list" }, [
                vue.createVNode(_component_uni_grid, {
                  column: 2,
                  "show-border": false,
                  square: false
                }, {
                  default: vue.withCtx(() => [
                    (vue.openBlock(true), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList(accumulationList.value, (item, index) => {
                        return vue.openBlock(), vue.createBlock(_component_uni_grid_item, {
                          index,
                          key: index,
                          onClick: ($event) => jump(item)
                        }, {
                          default: vue.withCtx(() => [
                            vue.createElementVNode("view", { class: "item" }, [
                              vue.createElementVNode(
                                "view",
                                {
                                  class: vue.normalizeClass(["iconfont", item.icon]),
                                  style: vue.normalizeStyle({ color: item.color })
                                },
                                null,
                                6
                                /* CLASS, STYLE */
                              ),
                              vue.createElementVNode(
                                "view",
                                { class: "text" },
                                vue.toDisplayString(item.text),
                                1
                                /* TEXT */
                              )
                            ])
                          ]),
                          _: 2
                          /* DYNAMIC */
                        }, 1032, ["index", "onClick"]);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ]),
                  _: 1
                  /* STABLE */
                })
              ])
            ]),
            vue.createElementVNode("view", { class: "part-list" }, [
              vue.createElementVNode("view", { class: "part-title collect" }, "服务"),
              vue.createElementVNode("view", { class: "item-list" }, [
                vue.createVNode(_component_uni_grid, {
                  column: 2,
                  "show-border": false,
                  square: false
                }, {
                  default: vue.withCtx(() => [
                    (vue.openBlock(true), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList(serviceList.value, (item, index) => {
                        return vue.openBlock(), vue.createBlock(_component_uni_grid_item, {
                          index,
                          key: index,
                          onClick: ($event) => jump(item)
                        }, {
                          default: vue.withCtx(() => [
                            vue.createElementVNode("view", { class: "item" }, [
                              vue.createElementVNode(
                                "view",
                                {
                                  class: vue.normalizeClass(["iconfont", item.icon]),
                                  style: vue.normalizeStyle({ color: item.color })
                                },
                                null,
                                6
                                /* CLASS, STYLE */
                              ),
                              vue.createElementVNode(
                                "view",
                                { class: "text" },
                                vue.toDisplayString(item.text),
                                1
                                /* TEXT */
                              )
                            ])
                          ]),
                          _: 2
                          /* DYNAMIC */
                        }, 1032, ["index", "onClick"]);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ]),
                  _: 1
                  /* STABLE */
                })
              ])
            ])
          ]),
          vue.createVNode(
            MyEditInfo,
            {
              ref_key: "myEditInfoRef",
              ref: myEditInfoRef,
              onReload: getUserInfo
            },
            null,
            512
            /* NEED_PATCH */
          ),
          vue.createVNode(
            Update,
            {
              ref_key: "updateRef",
              ref: updateRef
            },
            null,
            512
            /* NEED_PATCH */
          )
        ]);
      };
    }
  };
  const PagesMyMyIndex = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["__scopeId", "data-v-93109bc9"], ["__file", "C:/easyjob/easyjob-front/easyjob-app/src/pages/my/MyIndex.vue"]]);
  const _sfc_main$n = {
    __name: "CollectQuestion",
    setup(__props) {
      const { proxy } = vue.getCurrentInstance();
      const dataSource = vue.ref({});
      const loadStatus = vue.ref(null);
      const loadDataList = async () => {
        loadStatus.value = "loading";
        let result = await proxy.Request({
          url: proxy.Api.myCollect,
          params: {
            pageNo: dataSource.value.pageNo,
            collectType: 1
          }
        });
        if (!result) {
          return;
        }
        loadStatus.value = "more";
        dataSource.value = result.data;
      };
      onLoad(() => {
        loadDataList();
      });
      onReachBottom(() => {
      });
      return (_ctx, _cache) => {
        const _component_Navbar = vue.resolveComponent("Navbar");
        const _component_DataList = vue.resolveComponent("DataList");
        return vue.openBlock(), vue.createElementBlock("view", null, [
          vue.createVNode(_component_Navbar, {
            showLeft: true,
            title: "我收藏的八股文"
          }),
          vue.createElementVNode("view", { class: "question-list" }, [
            vue.createVNode(_component_DataList, {
              dataSource: dataSource.value,
              onLoadData: loadDataList,
              loadStatus: loadStatus.value
            }, {
              default: vue.withCtx(({ data }) => [
                vue.createVNode(QuestionItem, { data }, null, 8, ["data"])
              ]),
              _: 1
              /* STABLE */
            }, 8, ["dataSource", "loadStatus"])
          ])
        ]);
      };
    }
  };
  const PagesMyCollectQuestion = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["__scopeId", "data-v-e462248c"], ["__file", "C:/easyjob/easyjob-front/easyjob-app/src/pages/my/CollectQuestion.vue"]]);
  const _sfc_main$m = {
    __name: "CollectExamQuestion",
    setup(__props) {
      const { proxy } = vue.getCurrentInstance();
      const dataSource = vue.ref({});
      const loadStatus = vue.ref(null);
      const loadDataList = async () => {
        loadStatus.value = "loading";
        let url = proxy.Api.myCollect;
        let result = await proxy.Request({
          url,
          params: {
            pageNo: dataSource.value.pageNo,
            collectType: 2
          }
        });
        if (!result) {
          return;
        }
        loadStatus.value = "more";
        dataSource.value = result.data;
      };
      onLoad(() => {
        loadDataList();
      });
      onReachBottom(() => {
      });
      return (_ctx, _cache) => {
        const _component_Navbar = vue.resolveComponent("Navbar");
        const _component_DataList = vue.resolveComponent("DataList");
        return vue.openBlock(), vue.createElementBlock("view", null, [
          vue.createVNode(_component_Navbar, {
            showLeft: true,
            title: "我收藏的考题"
          }),
          vue.createElementVNode("view", { class: "question-list" }, [
            vue.createVNode(_component_DataList, {
              dataSource: dataSource.value,
              onLoadData: loadDataList,
              loadStatus: loadStatus.value
            }, {
              default: vue.withCtx(({ data }) => [
                vue.createElementVNode("view", { class: "list-item" }, [
                  vue.createVNode(ExamQuestionItem, {
                    showAnswer: true,
                    data,
                    showHtml: true
                  }, null, 8, ["data"])
                ])
              ]),
              _: 1
              /* STABLE */
            }, 8, ["dataSource", "loadStatus"])
          ])
        ]);
      };
    }
  };
  const PagesMyCollectExamQuestion = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["__scopeId", "data-v-170b4e29"], ["__file", "C:/easyjob/easyjob-front/easyjob-app/src/pages/my/CollectExamQuestion.vue"]]);
  const _sfc_main$l = {
    __name: "CollectShare",
    setup(__props) {
      const { proxy } = vue.getCurrentInstance();
      const dataSource = vue.ref({});
      const loadStatus = vue.ref(null);
      const loadDataList = async () => {
        loadStatus.value = "loading";
        let result = await proxy.Request({
          url: proxy.Api.myCollect,
          showLoading: false,
          params: {
            pageNo: dataSource.value.pageNo,
            collectType: 0
          }
        });
        if (!result) {
          return;
        }
        loadStatus.value = "more";
        dataSource.value = result.data;
      };
      onLoad((options) => {
        loadDataList();
      });
      onReachBottom(() => {
      });
      return (_ctx, _cache) => {
        const _component_Navbar = vue.resolveComponent("Navbar");
        const _component_DataList = vue.resolveComponent("DataList");
        return vue.openBlock(), vue.createElementBlock("view", null, [
          vue.createVNode(_component_Navbar, {
            showLeft: true,
            title: "我收藏的分享"
          }),
          vue.createElementVNode("view", { class: "share-list" }, [
            vue.createVNode(_component_DataList, {
              dataSource: dataSource.value,
              onLoadData: loadDataList,
              loadStatus: loadStatus.value
            }, {
              default: vue.withCtx(({ data }) => [
                vue.createVNode(ShareItem, {
                  data,
                  showDetail: true
                }, null, 8, ["data"])
              ]),
              _: 1
              /* STABLE */
            }, 8, ["dataSource", "loadStatus"])
          ])
        ]);
      };
    }
  };
  const PagesMyCollectShare = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["__file", "C:/easyjob/easyjob-front/easyjob-app/src/pages/my/CollectShare.vue"]]);
  const _sfc_main$k = {
    __name: "ExamList",
    setup(__props) {
      const { proxy } = vue.getCurrentInstance();
      const dataSource = vue.ref({});
      const loadStatus = vue.ref(null);
      const loadDataList = async () => {
        loadStatus.value = "loading";
        let result = await proxy.Request({
          url: proxy.Api.myExamList,
          params: {
            pageNo: dataSource.value.pageNo
          }
        });
        if (!result) {
          return;
        }
        loadStatus.value = "more";
        dataSource.value = result.data;
      };
      onLoad(() => {
        loadDataList();
      });
      onReachBottom(() => {
      });
      return (_ctx, _cache) => {
        const _component_Navbar = vue.resolveComponent("Navbar");
        const _component_DataList = vue.resolveComponent("DataList");
        return vue.openBlock(), vue.createElementBlock("view", null, [
          vue.createVNode(_component_Navbar, {
            showLeft: true,
            title: "我的考试记录"
          }),
          vue.createVNode(_component_DataList, {
            dataSource: dataSource.value,
            onLoadData: loadDataList,
            loadStatus: loadStatus.value
          }, {
            default: vue.withCtx(({ data }) => [
              vue.createVNode(ExamRecord, { data }, null, 8, ["data"])
            ]),
            _: 1
            /* STABLE */
          }, 8, ["dataSource", "loadStatus"])
        ]);
      };
    }
  };
  const PagesMyExamList = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["__file", "C:/easyjob/easyjob-front/easyjob-app/src/pages/my/ExamList.vue"]]);
  const _sfc_main$j = {
    __name: "WrongExamQuestion",
    setup(__props) {
      const { proxy } = vue.getCurrentInstance();
      const dataSource = vue.ref({});
      const loadStatus = vue.ref(null);
      const loadDataList = async () => {
        loadStatus.value = "loading";
        let result = await proxy.Request({
          url: proxy.Api.myWrongQuestion,
          showLoading: false,
          params: {
            pageNo: dataSource.value.pageNo
          }
        });
        if (!result) {
          return;
        }
        loadStatus.value = "more";
        result.data.list.forEach((element) => {
          if (element.questionType == 2) {
            element.userAnswer = element.userAnswer.split(",");
          }
        });
        dataSource.value = result.data;
      };
      onLoad(() => {
        loadDataList();
      });
      onReachBottom(() => {
      });
      return (_ctx, _cache) => {
        const _component_Navbar = vue.resolveComponent("Navbar");
        const _component_DataList = vue.resolveComponent("DataList");
        return vue.openBlock(), vue.createElementBlock("view", null, [
          vue.createVNode(_component_Navbar, { title: "我的错题" }),
          vue.createElementVNode("view", { class: "question-list" }, [
            vue.createVNode(_component_DataList, {
              dataSource: dataSource.value,
              onLoadData: loadDataList,
              loadStatus: loadStatus.value
            }, {
              default: vue.withCtx(({ data, index }) => [
                vue.createElementVNode("view", { class: "list-item" }, [
                  vue.createVNode(ExamQuestionItem, {
                    showAnswer: true,
                    data,
                    index,
                    modelValue: data.userAnswer,
                    "onUpdate:modelValue": ($event) => data.userAnswer = $event
                  }, null, 8, ["data", "index", "modelValue", "onUpdate:modelValue"])
                ])
              ]),
              _: 1
              /* STABLE */
            }, 8, ["dataSource", "loadStatus"])
          ])
        ]);
      };
    }
  };
  const PagesMyWrongExamQuestion = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["__scopeId", "data-v-e3e89e37"], ["__file", "C:/easyjob/easyjob-front/easyjob-app/src/pages/my/WrongExamQuestion.vue"]]);
  const _sfc_main$i = {
    __name: "FeedBackEdit",
    emits: ["reload"],
    setup(__props, { expose, emit }) {
      const { proxy } = vue.getCurrentInstance();
      const formData = vue.ref({});
      const formDataRef = vue.ref();
      const rules = {
        content: {
          rules: [{ required: true, errorMessage: "请输入问题" }]
        }
      };
      const submit = () => {
        formDataRef.value.validate(async (errors, value) => {
          if (errors) {
            return;
          }
          const params = Object.assign({}, formData.value);
          let result = await proxy.Request({
            url: proxy.Api.sendFeedback,
            params
          });
          if (!result) {
            return;
          }
          close();
          emit("reload");
        });
      };
      const dialogRef = vue.ref();
      const show = (data) => {
        dialogRef.value.show();
        vue.nextTick(() => {
          formData.value = Object.assign({}, data);
        });
      };
      const close = () => {
        dialogRef.value.close();
      };
      expose({
        show,
        close
      });
      return (_ctx, _cache) => {
        const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_0$3);
        const _component_uni_forms_item = resolveEasycom(vue.resolveDynamicComponent("uni-forms-item"), __easycom_1);
        const _component_uni_forms = resolveEasycom(vue.resolveDynamicComponent("uni-forms"), __easycom_3);
        const _component_Dialog = vue.resolveComponent("Dialog");
        return vue.openBlock(), vue.createElementBlock("view", null, [
          vue.createVNode(
            _component_Dialog,
            {
              title: "问题反馈",
              ref_key: "dialogRef",
              ref: dialogRef,
              showCancel: true,
              okFun: submit,
              okText: "提交"
            },
            {
              default: vue.withCtx(() => [
                vue.createVNode(_component_uni_forms, {
                  ref_key: "formDataRef",
                  ref: formDataRef,
                  model: formData.value,
                  "label-width": "0",
                  rules
                }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_uni_forms_item, { name: "content" }, {
                      default: vue.withCtx(() => [
                        vue.createVNode(_component_uni_easyinput, {
                          type: "textarea",
                          modelValue: formData.value.content,
                          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => formData.value.content = $event),
                          placeholder: "请输入问题",
                          trim: true,
                          maxlength: 500
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                      /* STABLE */
                    })
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["model"])
              ]),
              _: 1
              /* STABLE */
            },
            512
            /* NEED_PATCH */
          )
        ]);
      };
    }
  };
  const FeedbackEdit = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["__file", "C:/easyjob/easyjob-front/easyjob-app/src/pages/my/FeedBackEdit.vue"]]);
  const _sfc_main$h = {
    __name: "Feedback",
    setup(__props) {
      const { proxy } = vue.getCurrentInstance();
      const dataSource = vue.ref({});
      const loadStatus = vue.ref(null);
      const loadDataList = async () => {
        loadStatus.value = "loading";
        let result = await proxy.Request({
          url: proxy.Api.loadFeedback,
          params: {
            pageNo: dataSource.value.pageNo,
            pFeedbackId: 0
          }
        });
        if (!result) {
          return;
        }
        loadStatus.value = "more";
        dataSource.value = result.data;
      };
      onShow(() => {
        loadDataList();
      });
      onReachBottom(() => {
      });
      const feedbackEditRef = vue.ref();
      const showEdit = () => {
        feedbackEditRef.value.show({ pFeedbackId: 0 });
      };
      const showReply = (data) => {
        uni.navigateTo({
          url: "/pages/my/FeedbackReply?pFeedbackId=" + data.feedbackId
        });
      };
      return (_ctx, _cache) => {
        const _component_Navbar = vue.resolveComponent("Navbar");
        const _component_DataList = vue.resolveComponent("DataList");
        return vue.openBlock(), vue.createElementBlock("view", null, [
          vue.createVNode(_component_Navbar, {
            showLeft: true,
            title: "问题反馈"
          }, {
            right: vue.withCtx(() => [
              vue.createElementVNode("view", {
                class: "eidt iconfont icon-edit",
                onClick: showEdit
              })
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createElementVNode("view", { class: "feedback-list" }, [
            vue.createVNode(_component_DataList, {
              dataSource: dataSource.value,
              onLoadData: loadDataList,
              loadStatus: loadStatus.value
            }, {
              default: vue.withCtx(({ data }) => [
                vue.createElementVNode("view", {
                  class: "feed-item",
                  onClick: ($event) => showReply(data)
                }, [
                  vue.createElementVNode(
                    "view",
                    { class: "feed-content" },
                    vue.toDisplayString(data.content),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("view", { class: "feed-info" }, [
                    vue.createElementVNode("view", null, [
                      vue.createElementVNode("text", { class: "iconfont icon-update-time" }),
                      vue.createElementVNode(
                        "text",
                        null,
                        vue.toDisplayString(vue.unref(proxy).Utils.dateformat(data.createTime)),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("view", null, [
                      vue.createTextVNode(" 状态："),
                      data.status == 1 ? (vue.openBlock(), vue.createElementBlock("text", {
                        key: 0,
                        style: { color: "#18bc37" }
                      }, "已回复")) : (vue.openBlock(), vue.createElementBlock("text", {
                        key: 1,
                        style: { color: "#e43d33" }
                      }, "待回复"))
                    ])
                  ])
                ], 8, ["onClick"])
              ]),
              _: 1
              /* STABLE */
            }, 8, ["dataSource", "loadStatus"])
          ]),
          vue.createVNode(
            FeedbackEdit,
            {
              ref_key: "feedbackEditRef",
              ref: feedbackEditRef,
              onReload: loadDataList
            },
            null,
            512
            /* NEED_PATCH */
          )
        ]);
      };
    }
  };
  const PagesMyFeedback = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__scopeId", "data-v-43cab3b7"], ["__file", "C:/easyjob/easyjob-front/easyjob-app/src/pages/my/Feedback.vue"]]);
  const _sfc_main$g = {
    __name: "FeedbackReply",
    setup(__props) {
      const { proxy } = vue.getCurrentInstance();
      const pFeedbackId = vue.ref(0);
      const dataList = vue.ref([]);
      const loadDataList = async () => {
        let result = await proxy.Request({
          url: proxy.Api.loadFeedbackReply,
          params: {
            pFeedbackId: pFeedbackId.value
          }
        });
        if (!result) {
          return;
        }
        dataList.value = result.data;
      };
      onLoad((option) => {
        pFeedbackId.value = option.pFeedbackId;
        loadDataList();
      });
      const feedbackEditRef = vue.ref();
      const showEdit = () => {
        feedbackEditRef.value.show({ pFeedbackId: pFeedbackId.value });
      };
      return (_ctx, _cache) => {
        const _component_Navbar = vue.resolveComponent("Navbar");
        return vue.openBlock(), vue.createElementBlock("view", null, [
          vue.createVNode(_component_Navbar, {
            showLeft: true,
            title: "问题反馈"
          }, {
            right: vue.withCtx(() => [
              vue.createElementVNode("view", {
                class: "eidt iconfont icon-edit",
                onClick: showEdit
              })
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createElementVNode("view", { class: "feedback-list" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(dataList.value, (data) => {
                return vue.openBlock(), vue.createElementBlock("view", { class: "feed-item" }, [
                  data.sendType == 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    class: "feed-content-my"
                  }, [
                    vue.createElementVNode("view", { class: "content-panel" }, [
                      vue.createElementVNode(
                        "view",
                        { class: "time" },
                        vue.toDisplayString(data.createTime),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode(
                        "view",
                        { class: "content" },
                        vue.toDisplayString(data.content),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("view", { class: "icon" }, "我")
                  ])) : (vue.openBlock(), vue.createElementBlock("view", {
                    key: 1,
                    class: "feed-content-other"
                  }, [
                    vue.createElementVNode("view", { class: "icon" }, "管理员"),
                    vue.createElementVNode("view", { class: "content-panel" }, [
                      vue.createElementVNode(
                        "view",
                        { class: "time" },
                        vue.toDisplayString(data.createTime),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode(
                        "view",
                        { class: "content" },
                        vue.toDisplayString(data.content),
                        1
                        /* TEXT */
                      )
                    ])
                  ]))
                ]);
              }),
              256
              /* UNKEYED_FRAGMENT */
            ))
          ]),
          dataList.value.length == 0 ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "no-data"
          }, "暂无回复")) : vue.createCommentVNode("v-if", true),
          vue.createVNode(
            FeedbackEdit,
            {
              ref_key: "feedbackEditRef",
              ref: feedbackEditRef,
              onReload: loadDataList
            },
            null,
            512
            /* NEED_PATCH */
          )
        ]);
      };
    }
  };
  const PagesMyFeedbackReply = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__scopeId", "data-v-99cf92f9"], ["__file", "C:/easyjob/easyjob-front/easyjob-app/src/pages/my/FeedbackReply.vue"]]);
  var md5Exports = {};
  var md5 = {
    get exports() {
      return md5Exports;
    },
    set exports(v2) {
      md5Exports = v2;
    }
  };
  var cryptExports = {};
  var crypt = {
    get exports() {
      return cryptExports;
    },
    set exports(v2) {
      cryptExports = v2;
    }
  };
  (function() {
    var base64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", crypt$1 = {
      // Bit-wise rotation left
      rotl: function(n2, b2) {
        return n2 << b2 | n2 >>> 32 - b2;
      },
      // Bit-wise rotation right
      rotr: function(n2, b2) {
        return n2 << 32 - b2 | n2 >>> b2;
      },
      // Swap big-endian to little-endian and vice versa
      endian: function(n2) {
        if (n2.constructor == Number) {
          return crypt$1.rotl(n2, 8) & 16711935 | crypt$1.rotl(n2, 24) & 4278255360;
        }
        for (var i2 = 0; i2 < n2.length; i2++)
          n2[i2] = crypt$1.endian(n2[i2]);
        return n2;
      },
      // Generate an array of any length of random bytes
      randomBytes: function(n2) {
        for (var bytes = []; n2 > 0; n2--)
          bytes.push(Math.floor(Math.random() * 256));
        return bytes;
      },
      // Convert a byte array to big-endian 32-bit words
      bytesToWords: function(bytes) {
        for (var words = [], i2 = 0, b2 = 0; i2 < bytes.length; i2++, b2 += 8)
          words[b2 >>> 5] |= bytes[i2] << 24 - b2 % 32;
        return words;
      },
      // Convert big-endian 32-bit words to a byte array
      wordsToBytes: function(words) {
        for (var bytes = [], b2 = 0; b2 < words.length * 32; b2 += 8)
          bytes.push(words[b2 >>> 5] >>> 24 - b2 % 32 & 255);
        return bytes;
      },
      // Convert a byte array to a hex string
      bytesToHex: function(bytes) {
        for (var hex = [], i2 = 0; i2 < bytes.length; i2++) {
          hex.push((bytes[i2] >>> 4).toString(16));
          hex.push((bytes[i2] & 15).toString(16));
        }
        return hex.join("");
      },
      // Convert a hex string to a byte array
      hexToBytes: function(hex) {
        for (var bytes = [], c2 = 0; c2 < hex.length; c2 += 2)
          bytes.push(parseInt(hex.substr(c2, 2), 16));
        return bytes;
      },
      // Convert a byte array to a base-64 string
      bytesToBase64: function(bytes) {
        for (var base64 = [], i2 = 0; i2 < bytes.length; i2 += 3) {
          var triplet = bytes[i2] << 16 | bytes[i2 + 1] << 8 | bytes[i2 + 2];
          for (var j2 = 0; j2 < 4; j2++)
            if (i2 * 8 + j2 * 6 <= bytes.length * 8)
              base64.push(base64map.charAt(triplet >>> 6 * (3 - j2) & 63));
            else
              base64.push("=");
        }
        return base64.join("");
      },
      // Convert a base-64 string to a byte array
      base64ToBytes: function(base64) {
        base64 = base64.replace(/[^A-Z0-9+\/]/ig, "");
        for (var bytes = [], i2 = 0, imod4 = 0; i2 < base64.length; imod4 = ++i2 % 4) {
          if (imod4 == 0)
            continue;
          bytes.push((base64map.indexOf(base64.charAt(i2 - 1)) & Math.pow(2, -2 * imod4 + 8) - 1) << imod4 * 2 | base64map.indexOf(base64.charAt(i2)) >>> 6 - imod4 * 2);
        }
        return bytes;
      }
    };
    crypt.exports = crypt$1;
  })();
  var charenc = {
    // UTF-8 encoding
    utf8: {
      // Convert a string to a byte array
      stringToBytes: function(str) {
        return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
      },
      // Convert a byte array to a string
      bytesToString: function(bytes) {
        return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
      }
    },
    // Binary encoding
    bin: {
      // Convert a string to a byte array
      stringToBytes: function(str) {
        for (var bytes = [], i2 = 0; i2 < str.length; i2++)
          bytes.push(str.charCodeAt(i2) & 255);
        return bytes;
      },
      // Convert a byte array to a string
      bytesToString: function(bytes) {
        for (var str = [], i2 = 0; i2 < bytes.length; i2++)
          str.push(String.fromCharCode(bytes[i2]));
        return str.join("");
      }
    }
  };
  var charenc_1 = charenc;
  /*!
   * Determine if an object is a Buffer
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   */
  var isBuffer_1 = function(obj) {
    return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer);
  };
  function isBuffer(obj) {
    return !!obj.constructor && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj);
  }
  function isSlowBuffer(obj) {
    return typeof obj.readFloatLE === "function" && typeof obj.slice === "function" && isBuffer(obj.slice(0, 0));
  }
  (function() {
    var crypt2 = cryptExports, utf8 = charenc_1.utf8, isBuffer2 = isBuffer_1, bin = charenc_1.bin, md5$1 = function(message2, options) {
      if (message2.constructor == String)
        if (options && options.encoding === "binary")
          message2 = bin.stringToBytes(message2);
        else
          message2 = utf8.stringToBytes(message2);
      else if (isBuffer2(message2))
        message2 = Array.prototype.slice.call(message2, 0);
      else if (!Array.isArray(message2) && message2.constructor !== Uint8Array)
        message2 = message2.toString();
      var m2 = crypt2.bytesToWords(message2), l2 = message2.length * 8, a2 = 1732584193, b2 = -271733879, c2 = -1732584194, d2 = 271733878;
      for (var i2 = 0; i2 < m2.length; i2++) {
        m2[i2] = (m2[i2] << 8 | m2[i2] >>> 24) & 16711935 | (m2[i2] << 24 | m2[i2] >>> 8) & 4278255360;
      }
      m2[l2 >>> 5] |= 128 << l2 % 32;
      m2[(l2 + 64 >>> 9 << 4) + 14] = l2;
      var FF = md5$1._ff, GG = md5$1._gg, HH = md5$1._hh, II = md5$1._ii;
      for (var i2 = 0; i2 < m2.length; i2 += 16) {
        var aa = a2, bb = b2, cc = c2, dd = d2;
        a2 = FF(a2, b2, c2, d2, m2[i2 + 0], 7, -680876936);
        d2 = FF(d2, a2, b2, c2, m2[i2 + 1], 12, -389564586);
        c2 = FF(c2, d2, a2, b2, m2[i2 + 2], 17, 606105819);
        b2 = FF(b2, c2, d2, a2, m2[i2 + 3], 22, -1044525330);
        a2 = FF(a2, b2, c2, d2, m2[i2 + 4], 7, -176418897);
        d2 = FF(d2, a2, b2, c2, m2[i2 + 5], 12, 1200080426);
        c2 = FF(c2, d2, a2, b2, m2[i2 + 6], 17, -1473231341);
        b2 = FF(b2, c2, d2, a2, m2[i2 + 7], 22, -45705983);
        a2 = FF(a2, b2, c2, d2, m2[i2 + 8], 7, 1770035416);
        d2 = FF(d2, a2, b2, c2, m2[i2 + 9], 12, -1958414417);
        c2 = FF(c2, d2, a2, b2, m2[i2 + 10], 17, -42063);
        b2 = FF(b2, c2, d2, a2, m2[i2 + 11], 22, -1990404162);
        a2 = FF(a2, b2, c2, d2, m2[i2 + 12], 7, 1804603682);
        d2 = FF(d2, a2, b2, c2, m2[i2 + 13], 12, -40341101);
        c2 = FF(c2, d2, a2, b2, m2[i2 + 14], 17, -1502002290);
        b2 = FF(b2, c2, d2, a2, m2[i2 + 15], 22, 1236535329);
        a2 = GG(a2, b2, c2, d2, m2[i2 + 1], 5, -165796510);
        d2 = GG(d2, a2, b2, c2, m2[i2 + 6], 9, -1069501632);
        c2 = GG(c2, d2, a2, b2, m2[i2 + 11], 14, 643717713);
        b2 = GG(b2, c2, d2, a2, m2[i2 + 0], 20, -373897302);
        a2 = GG(a2, b2, c2, d2, m2[i2 + 5], 5, -701558691);
        d2 = GG(d2, a2, b2, c2, m2[i2 + 10], 9, 38016083);
        c2 = GG(c2, d2, a2, b2, m2[i2 + 15], 14, -660478335);
        b2 = GG(b2, c2, d2, a2, m2[i2 + 4], 20, -405537848);
        a2 = GG(a2, b2, c2, d2, m2[i2 + 9], 5, 568446438);
        d2 = GG(d2, a2, b2, c2, m2[i2 + 14], 9, -1019803690);
        c2 = GG(c2, d2, a2, b2, m2[i2 + 3], 14, -187363961);
        b2 = GG(b2, c2, d2, a2, m2[i2 + 8], 20, 1163531501);
        a2 = GG(a2, b2, c2, d2, m2[i2 + 13], 5, -1444681467);
        d2 = GG(d2, a2, b2, c2, m2[i2 + 2], 9, -51403784);
        c2 = GG(c2, d2, a2, b2, m2[i2 + 7], 14, 1735328473);
        b2 = GG(b2, c2, d2, a2, m2[i2 + 12], 20, -1926607734);
        a2 = HH(a2, b2, c2, d2, m2[i2 + 5], 4, -378558);
        d2 = HH(d2, a2, b2, c2, m2[i2 + 8], 11, -2022574463);
        c2 = HH(c2, d2, a2, b2, m2[i2 + 11], 16, 1839030562);
        b2 = HH(b2, c2, d2, a2, m2[i2 + 14], 23, -35309556);
        a2 = HH(a2, b2, c2, d2, m2[i2 + 1], 4, -1530992060);
        d2 = HH(d2, a2, b2, c2, m2[i2 + 4], 11, 1272893353);
        c2 = HH(c2, d2, a2, b2, m2[i2 + 7], 16, -155497632);
        b2 = HH(b2, c2, d2, a2, m2[i2 + 10], 23, -1094730640);
        a2 = HH(a2, b2, c2, d2, m2[i2 + 13], 4, 681279174);
        d2 = HH(d2, a2, b2, c2, m2[i2 + 0], 11, -358537222);
        c2 = HH(c2, d2, a2, b2, m2[i2 + 3], 16, -722521979);
        b2 = HH(b2, c2, d2, a2, m2[i2 + 6], 23, 76029189);
        a2 = HH(a2, b2, c2, d2, m2[i2 + 9], 4, -640364487);
        d2 = HH(d2, a2, b2, c2, m2[i2 + 12], 11, -421815835);
        c2 = HH(c2, d2, a2, b2, m2[i2 + 15], 16, 530742520);
        b2 = HH(b2, c2, d2, a2, m2[i2 + 2], 23, -995338651);
        a2 = II(a2, b2, c2, d2, m2[i2 + 0], 6, -198630844);
        d2 = II(d2, a2, b2, c2, m2[i2 + 7], 10, 1126891415);
        c2 = II(c2, d2, a2, b2, m2[i2 + 14], 15, -1416354905);
        b2 = II(b2, c2, d2, a2, m2[i2 + 5], 21, -57434055);
        a2 = II(a2, b2, c2, d2, m2[i2 + 12], 6, 1700485571);
        d2 = II(d2, a2, b2, c2, m2[i2 + 3], 10, -1894986606);
        c2 = II(c2, d2, a2, b2, m2[i2 + 10], 15, -1051523);
        b2 = II(b2, c2, d2, a2, m2[i2 + 1], 21, -2054922799);
        a2 = II(a2, b2, c2, d2, m2[i2 + 8], 6, 1873313359);
        d2 = II(d2, a2, b2, c2, m2[i2 + 15], 10, -30611744);
        c2 = II(c2, d2, a2, b2, m2[i2 + 6], 15, -1560198380);
        b2 = II(b2, c2, d2, a2, m2[i2 + 13], 21, 1309151649);
        a2 = II(a2, b2, c2, d2, m2[i2 + 4], 6, -145523070);
        d2 = II(d2, a2, b2, c2, m2[i2 + 11], 10, -1120210379);
        c2 = II(c2, d2, a2, b2, m2[i2 + 2], 15, 718787259);
        b2 = II(b2, c2, d2, a2, m2[i2 + 9], 21, -343485551);
        a2 = a2 + aa >>> 0;
        b2 = b2 + bb >>> 0;
        c2 = c2 + cc >>> 0;
        d2 = d2 + dd >>> 0;
      }
      return crypt2.endian([a2, b2, c2, d2]);
    };
    md5$1._ff = function(a2, b2, c2, d2, x2, s2, t2) {
      var n2 = a2 + (b2 & c2 | ~b2 & d2) + (x2 >>> 0) + t2;
      return (n2 << s2 | n2 >>> 32 - s2) + b2;
    };
    md5$1._gg = function(a2, b2, c2, d2, x2, s2, t2) {
      var n2 = a2 + (b2 & d2 | c2 & ~d2) + (x2 >>> 0) + t2;
      return (n2 << s2 | n2 >>> 32 - s2) + b2;
    };
    md5$1._hh = function(a2, b2, c2, d2, x2, s2, t2) {
      var n2 = a2 + (b2 ^ c2 ^ d2) + (x2 >>> 0) + t2;
      return (n2 << s2 | n2 >>> 32 - s2) + b2;
    };
    md5$1._ii = function(a2, b2, c2, d2, x2, s2, t2) {
      var n2 = a2 + (c2 ^ (b2 | ~d2)) + (x2 >>> 0) + t2;
      return (n2 << s2 | n2 >>> 32 - s2) + b2;
    };
    md5$1._blocksize = 16;
    md5$1._digestsize = 16;
    md5.exports = function(message2, options) {
      if (message2 === void 0 || message2 === null)
        throw new Error("Illegal argument " + message2);
      var digestbytes = crypt2.wordsToBytes(md5$1(message2, options));
      return options && options.asBytes ? digestbytes : options && options.asString ? bin.bytesToString(digestbytes) : crypt2.bytesToHex(digestbytes);
    };
  })();
  const _sfc_main$f = {
    __name: "LoginAndRegister",
    setup(__props) {
      const { proxy } = vue.getCurrentInstance();
      const appInfoStore = useAppInfoStore();
      const { deviceId, deviceBrand } = appInfoStore.getInfo();
      const goBack = () => {
        uni.navigateBack();
      };
      const opType = vue.ref(1);
      const changeOpType = () => {
        if (opType.value == 0) {
          opType.value = 1;
        } else {
          opType.value = 0;
        }
        resetForm();
      };
      const resetForm = () => {
        formData.value = {};
        changeCheckCode();
      };
      const checkCodeUrl = vue.ref(null);
      const changeCheckCode = async () => {
        let result = await proxy.Request({
          url: proxy.Api.checkCode,
          showLoading: false,
          params: {
            deviceId,
            type: opType.value,
            time: new Date().getTime()
          },
          responseType: "arraybuffer"
        });
        if (!result) {
          return;
        }
        const arrayBuffer = new Uint8Array(result);
        const base64 = "data:image/png;base64," + uni.arrayBufferToBase64(arrayBuffer);
        checkCodeUrl.value = base64 || "";
      };
      changeCheckCode();
      const checkRePassword = (rule, value, data, callback) => {
        if (value !== formData.value.password) {
          callback("两次输入的密码不一致");
        }
        return true;
      };
      const formData = vue.ref({});
      const formDataRef = vue.ref();
      const rules = {
        email: {
          rules: [
            { required: true, errorMessage: "请输入邮箱" },
            { maxLength: 20, errorMessage: "昵称长度不能超过20个字符" }
          ]
        },
        nickName: {
          rules: [
            { required: true, errorMessage: "请输入昵称" },
            { maxLength: 20, errorMessage: "昵称长度不能超过20个字符" }
          ]
        },
        sex: {
          rules: [{ required: true, errorMessage: "请选择性别" }]
        },
        password: {
          rules: [
            { required: true, errorMessage: "请输入密码" },
            { maxLength: 18, errorMessage: "密码长度不能超过18个字符" },
            {
              pattern: /^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z~!@#$%^&*_]{8,}$/,
              errorMessage: "密码必须含有数字字母或特殊字符长度不能少于8位"
            }
          ]
        },
        rePassword: {
          rules: [
            { required: true, errorMessage: "请再次输入密码" },
            { validateFunction: checkRePassword }
          ]
        },
        checkCode: {
          rules: [{ required: true, errorMessage: "请输入验证码" }]
        }
      };
      const submitForm = () => {
        formDataRef.value.validate(async (err, value) => {
          if (err) {
            return;
          }
          let url = opType.value == 0 ? proxy.Api.register : proxy.Api.login;
          let params = {};
          Object.assign(params, formData.value);
          params.deviceId = deviceId;
          params.deviceBrand = deviceBrand;
          if (opType.value == 1) {
            params.password = md5Exports(params.password);
          }
          let result = await proxy.Request({
            url,
            params,
            errorCallback: () => {
              changeCheckCode();
            }
          });
          if (!result) {
            return;
          }
          if (opType.value == 0) {
            proxy.Message.success("注册成功");
            changeOpType();
          } else {
            proxy.Message.success("登录成功");
            uni.setStorageSync(LOCAL_STORAGE_KEY.token.key, result.data);
            uni.navigateBack();
          }
        });
      };
      return (_ctx, _cache) => {
        const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_0$3);
        const _component_uni_forms_item = resolveEasycom(vue.resolveDynamicComponent("uni-forms-item"), __easycom_1);
        const _component_uni_data_checkbox = resolveEasycom(vue.resolveDynamicComponent("uni-data-checkbox"), __easycom_2);
        const _component_uni_forms = resolveEasycom(vue.resolveDynamicComponent("uni-forms"), __easycom_3);
        return vue.openBlock(), vue.createElementBlock("view", { class: "login-register" }, [
          vue.createElementVNode("view", { class: "title" }, [
            vue.createElementVNode(
              "view",
              null,
              vue.toDisplayString(opType.value == 0 ? "注册" : "登录"),
              1
              /* TEXT */
            ),
            vue.createElementVNode("view", {
              class: "iconfont icon-close",
              onClick: goBack
            })
          ]),
          vue.createVNode(_component_uni_forms, {
            ref_key: "formDataRef",
            ref: formDataRef,
            model: formData.value,
            "label-width": "0",
            rules
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_forms_item, { name: "email" }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uni_easyinput, {
                    modelValue: formData.value.email,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => formData.value.email = $event),
                    placeholder: "请输入邮箱账号",
                    prefixIcon: "email",
                    trim: true
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              }),
              opType.value == 0 ? (vue.openBlock(), vue.createBlock(_component_uni_forms_item, {
                key: 0,
                name: "nickName"
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uni_easyinput, {
                    modelValue: formData.value.nickName,
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => formData.value.nickName = $event),
                    placeholder: "请输入邮箱昵称",
                    prefixIcon: "email",
                    trim: true
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              })) : vue.createCommentVNode("v-if", true),
              opType.value == 0 ? (vue.openBlock(), vue.createBlock(_component_uni_forms_item, {
                key: 1,
                name: "sex"
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uni_data_checkbox, {
                    modelValue: formData.value.sex,
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => formData.value.sex = $event),
                    localdata: [
                      {
                        text: "男",
                        value: 1
                      },
                      {
                        text: "女",
                        value: 0
                      }
                    ]
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              })) : vue.createCommentVNode("v-if", true),
              vue.createVNode(_component_uni_forms_item, { name: "password" }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uni_easyinput, {
                    type: "password",
                    modelValue: formData.value.password,
                    "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => formData.value.password = $event),
                    placeholder: "请输入密码",
                    prefixIcon: "locked",
                    trim: true
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              }),
              opType.value == 0 ? (vue.openBlock(), vue.createBlock(_component_uni_forms_item, {
                key: 2,
                name: "rePassword"
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uni_easyinput, {
                    type: "password",
                    modelValue: formData.value.rePassword,
                    "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => formData.value.rePassword = $event),
                    placeholder: "请再次输入密码",
                    prefixIcon: "locked",
                    trim: true
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              })) : vue.createCommentVNode("v-if", true),
              vue.createVNode(_component_uni_forms_item, { name: "checkCode" }, {
                default: vue.withCtx(() => [
                  vue.createElementVNode("view", { class: "check-code-panel" }, [
                    vue.createElementVNode("view", { class: "input" }, [
                      vue.createVNode(_component_uni_easyinput, {
                        modelValue: formData.value.checkCode,
                        "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => formData.value.checkCode = $event),
                        placeholder: "请输入验证码",
                        prefixIcon: "paperplane",
                        trim: true
                      }, null, 8, ["modelValue"])
                    ]),
                    vue.createElementVNode("view", { class: "code-image" }, [
                      vue.createElementVNode("img", {
                        src: checkCodeUrl.value,
                        class: "check-code",
                        onClick: _cache[6] || (_cache[6] = ($event) => changeCheckCode())
                      }, null, 8, ["src"])
                    ])
                  ])
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          }, 8, ["model"]),
          vue.createElementVNode(
            "button",
            {
              type: "primary",
              onClick: submitForm
            },
            vue.toDisplayString(opType.value == 0 ? "注册" : "登录"),
            1
            /* TEXT */
          ),
          vue.createElementVNode(
            "view",
            {
              class: "tips",
              onClick: changeOpType
            },
            vue.toDisplayString(opType.value == 0 ? "已有账号直接登录" : "没有账号去注册"),
            1
            /* TEXT */
          )
        ]);
      };
    }
  };
  const PagesAccountLoginAndRegister = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__scopeId", "data-v-51f25c41"], ["__file", "C:/easyjob/easyjob-front/easyjob-app/src/pages/account/LoginAndRegister.vue"]]);
  const _sfc_main$e = {
    __name: "ExamQuestion",
    setup(__props) {
      const { proxy } = vue.getCurrentInstance();
      const questionId = vue.ref(null);
      const examQuestion = vue.ref({ questionItemList: [] });
      const getExamQuestion = async () => {
        let result = await proxy.Request({
          url: proxy.Api.getExamQuestionById,
          params: {
            questionId: questionId.value
          }
        });
        if (!result) {
          return;
        }
        examQuestion.value = result.data;
      };
      onLoad((option) => {
        questionId.value = option.questionId;
        getExamQuestion();
      });
      return (_ctx, _cache) => {
        const _component_Navbar = vue.resolveComponent("Navbar");
        return vue.openBlock(), vue.createElementBlock("view", null, [
          vue.createVNode(_component_Navbar, {
            showLeft: true,
            title: "推荐问题"
          }),
          vue.createElementVNode("view", null, [
            vue.createVNode(ExamQuestionItem, {
              showAnswer: true,
              data: examQuestion.value,
              showHtml: true
            }, null, 8, ["data"])
          ])
        ]);
      };
    }
  };
  const PagesCarouselExamQuestion = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__scopeId", "data-v-6d1ad68c"], ["__file", "C:/easyjob/easyjob-front/easyjob-app/src/pages/carousel/ExamQuestion.vue"]]);
  const _sfc_main$d = {
    __name: "WebView",
    setup(__props) {
      vue.getCurrentInstance();
      const url = vue.ref();
      onLoad((option) => {
        url.value = option.url;
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("web-view", { src: url.value }, null, 8, ["src"]);
      };
    }
  };
  const PagesCarouselWebView = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__file", "C:/easyjob/easyjob-front/easyjob-app/src/pages/carousel/WebView.vue"]]);
  const _sfc_main$c = {
    __name: "Tag",
    props: {
      dataList: {
        type: Array,
        default: []
      },
      showClose: {
        type: Boolean,
        default: true
      }
    },
    emits: ["updateData", "clickHandler"],
    setup(__props, { emit }) {
      const props = __props;
      vue.getCurrentInstance();
      const del2 = (index) => {
        props.dataList.splice(index, 1);
        emit("updateData");
      };
      const clickHandler = (item) => {
        emit("clickHandler", item);
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", null, [
          vue.createElementVNode("view", { class: "tab-list" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(__props.dataList, (item, index) => {
                return vue.openBlock(), vue.createElementBlock("view", { class: "tab-item" }, [
                  vue.createElementVNode("view", {
                    class: "text",
                    onClick: ($event) => clickHandler(item)
                  }, vue.toDisplayString(item), 9, ["onClick"]),
                  __props.showClose ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    class: "iconfont icon-close",
                    onClick: ($event) => del2(index)
                  }, null, 8, ["onClick"])) : vue.createCommentVNode("v-if", true)
                ]);
              }),
              256
              /* UNKEYED_FRAGMENT */
            )),
            __props.dataList.length == 0 ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "no-data"
            }, "暂无记录")) : vue.createCommentVNode("v-if", true)
          ])
        ]);
      };
    }
  };
  const Tag = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__scopeId", "data-v-17f90251"], ["__file", "C:/easyjob/easyjob-front/easyjob-app/src/pages/components/common/Tag.vue"]]);
  const _sfc_main$b = {
    __name: "SearchIndex",
    setup(__props) {
      const { proxy } = vue.getCurrentInstance();
      const showSearch = vue.ref(true);
      const keyword = vue.ref();
      const searchList = vue.ref(
        uni.getStorageSync(LOCAL_STORAGE_KEY.searchHistory.key) || []
      );
      const inputChange = (e) => {
        if (e == "") {
          showSearch.value = true;
        }
      };
      const clearInput = (e) => {
        keyword.value = "";
        showSearch.value = true;
      };
      const tagSearch = (tag) => {
        keyword.value = tag;
        search();
      };
      const saveTag = () => {
        uni.setStorageSync(LOCAL_STORAGE_KEY.searchHistory.key, searchList.value);
      };
      const search = () => {
        if (keyword.value == void 0 || keyword.value.length < 3) {
          proxy.Message.error("请输入关键字");
          return;
        }
        showSearch.value = false;
        if (!searchList.value.includes(keyword.value)) {
          searchList.value.unshift(keyword.value);
          uni.setStorageSync(LOCAL_STORAGE_KEY.searchHistory.key, searchList.value);
        }
        dataSource.pageNo = 1;
        loadDataList();
      };
      const curTab = vue.ref(0);
      const tabList = vue.ref(["八股文", "考题", "分享"]);
      const tabClick = (index) => {
        curTab.value = index;
        dataSource.pageNo = 1;
        dataSource.list = [];
        loadDataList();
      };
      const dataSource = vue.ref({});
      const loadStatus = vue.ref(null);
      const loadDataList = async () => {
        if (keyword.value == void 0 || keyword.value.length < 3) {
          uni.stopPullDownRefresh();
          return;
        }
        loadStatus.value = "loading";
        let result = await proxy.Request({
          url: proxy.Api.search,
          params: {
            keyword: keyword.value,
            pageNo: dataSource.value.pageNo || 1,
            type: curTab.value
          }
        });
        if (!result) {
          return;
        }
        loadStatus.value = "more";
        const list = result.data.list;
        list.forEach((element) => {
          element.curTab = curTab.value;
          element.title = element.title.toLowerCase();
          element.title = element.title.replace(
            keyword.value,
            "<span style='color:red'>" + keyword.value + "</span>"
          );
        });
        dataSource.value = result.data;
      };
      loadDataList();
      onReachBottom(() => {
      });
      return (_ctx, _cache) => {
        const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_0$3);
        const _component_Navbar = vue.resolveComponent("Navbar");
        const _component_DataList = vue.resolveComponent("DataList");
        return vue.openBlock(), vue.createElementBlock("view", null, [
          vue.createVNode(_component_Navbar, { showLeft: true }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("view", { class: "search-panel" }, [
                vue.createVNode(_component_uni_easyinput, {
                  clearable: false,
                  modelValue: keyword.value,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => keyword.value = $event),
                  placeholder: "请输入关键词，至少三个字",
                  prefixIcon: "search",
                  suffixIcon: keyword.value ? "closeempty" : "",
                  trim: true,
                  confirmType: "搜索",
                  onConfirm: search,
                  onInput: inputChange,
                  onIconClick: clearInput
                }, null, 8, ["modelValue", "suffixIcon"])
              ])
            ]),
            right: vue.withCtx(() => [
              vue.createElementVNode("view", {
                class: "iconfont icon-search",
                onClick: search
              })
            ]),
            _: 1
            /* STABLE */
          }),
          showSearch.value ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "search-history"
          }, [
            vue.createElementVNode("view", { class: "search-title" }, "搜索历史"),
            vue.createElementVNode("view", { class: "tag-list" }, [
              vue.createVNode(Tag, {
                dataList: searchList.value,
                onUpdateData: saveTag,
                onClickHandler: tagSearch
              }, null, 8, ["dataList"])
            ])
          ])) : (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
            vue.createElementVNode("view", { class: "search-tab" }, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(tabList.value, (item, index) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    class: vue.normalizeClass(["tab-item", index == curTab.value ? "active" : ""]),
                    onClick: ($event) => tabClick(index)
                  }, vue.toDisplayString(item), 11, ["onClick"]);
                }),
                256
                /* UNKEYED_FRAGMENT */
              ))
            ]),
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["result-list", curTab.value == 0 ? "padding-data-list" : ""])
              },
              [
                vue.createVNode(_component_DataList, {
                  dataSource: dataSource.value,
                  onLoadData: loadDataList,
                  loadStatus: loadStatus.value
                }, {
                  default: vue.withCtx(({ data, extParam }) => [
                    data.curTab == 0 ? (vue.openBlock(), vue.createBlock(QuestionItem, {
                      key: 0,
                      data
                    }, null, 8, ["data"])) : vue.createCommentVNode("v-if", true),
                    data.curTab == 1 ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 1,
                      class: "list-item"
                    }, [
                      vue.createVNode(ExamQuestionItem, {
                        data,
                        showAnswer: true,
                        showHtml: true
                      }, null, 8, ["data"])
                    ])) : vue.createCommentVNode("v-if", true),
                    data.curTab == 2 ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 2,
                      class: "list-item"
                    }, [
                      vue.createVNode(ShareItem, { data }, null, 8, ["data"])
                    ])) : vue.createCommentVNode("v-if", true)
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["dataSource", "loadStatus"])
              ],
              2
              /* CLASS */
            )
          ]))
        ]);
      };
    }
  };
  const PagesSearchSearchIndex = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-0f8d192e"], ["__file", "C:/easyjob/easyjob-front/easyjob-app/src/pages/search/SearchIndex.vue"]]);
  __definePage("pages/Index", PagesIndex);
  __definePage("pages/question/QuestionIndex", PagesQuestionQuestionIndex);
  __definePage("pages/question/QuestionList", PagesQuestionQuestionList);
  __definePage("pages/question/QuestionDetail", PagesQuestionQuestionDetail);
  __definePage("pages/exam/ExamIndex", PagesExamExamIndex);
  __definePage("pages/exam/ExamQuestion", PagesExamExamQuestion);
  __definePage("pages/share/ShareIndex", PagesShareShareIndex);
  __definePage("pages/share/ShareDetail", PagesShareShareDetail);
  __definePage("pages/my/MyIndex", PagesMyMyIndex);
  __definePage("pages/my/CollectQuestion", PagesMyCollectQuestion);
  __definePage("pages/my/CollectExamQuestion", PagesMyCollectExamQuestion);
  __definePage("pages/my/CollectShare", PagesMyCollectShare);
  __definePage("pages/my/ExamList", PagesMyExamList);
  __definePage("pages/my/WrongExamQuestion", PagesMyWrongExamQuestion);
  __definePage("pages/my/Feedback", PagesMyFeedback);
  __definePage("pages/my/FeedbackReply", PagesMyFeedbackReply);
  __definePage("pages/account/LoginAndRegister", PagesAccountLoginAndRegister);
  __definePage("pages/carousel/ExamQuestion", PagesCarouselExamQuestion);
  __definePage("pages/carousel/WebView", PagesCarouselWebView);
  __definePage("pages/search/SearchIndex", PagesSearchSearchIndex);
  const _sfc_main$a = {
    __name: "App",
    setup(__props) {
      const { proxy } = vue.getCurrentInstance();
      const appInfoStore = useAppInfoStore();
      const quesitonCategoryStore = useQuestionCategoryStore();
      const saveDeviceInfo = (e) => {
        let statusBar = 0;
        statusBar = e.statusBarHeight;
        const navBarHeight = 45;
        const deviceId = e.deviceId;
        const deviceBrand = e.deviceBrand;
        appInfoStore.setInfo(
          statusBar,
          navBarHeight,
          e.screenWidth,
          e.screenHeight,
          deviceId,
          deviceBrand,
          e.appWgtVersion
        );
        reportInfo({ deviceId, deviceBrand });
        autoLogin({ deviceId, deviceBrand });
      };
      const reportInfo = async ({ deviceId, deviceBrand }) => {
        await proxy.Request({
          url: proxy.Api.report,
          showLoading: false,
          showError: false,
          params: {
            deviceId,
            deviceBrand
          }
        });
      };
      const autoLogin = async ({ deviceId, deviceBrand }) => {
        let token = uni.getStorageSync(LOCAL_STORAGE_KEY.token.key);
        if (token == "") {
          return;
        }
        let result = await proxy.Request({
          url: proxy.Api.autoLogin,
          showLoading: false,
          showError: false,
          params: {
            token,
            deviceId,
            deviceBrand
          }
        });
        if (!result) {
          return;
        }
        if (result.data != null) {
          uni.setStorageSync(LOCAL_STORAGE_KEY.token.key, result.data);
        }
      };
      const loadCategoryData = async () => {
        let result = await proxy.Request({
          url: proxy.Api.loadAllCategory,
          params: {
            type: 0
          },
          showLoading: false
        });
        if (!result) {
          return;
        }
        quesitonCategoryStore.setInfo(result.data);
      };
      onLaunch(() => {
        uni.getSystemInfo({
          success: (e) => {
            saveDeviceInfo(e);
          }
        });
        loadCategoryData();
      });
      return () => {
      };
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__file", "C:/easyjob/easyjob-front/easyjob-app/src/App.vue"]]);
  const _sfc_main$9 = {
    __name: "Navbar",
    props: {
      title: {
        type: String
      },
      showLeft: {
        type: Boolean,
        default: true
      },
      leftClick: {
        type: Function
      }
    },
    setup(__props) {
      const props = __props;
      const appInfoStore = useAppInfoStore();
      const leftClick = () => {
        if (props.leftClick) {
          props.leftClick();
        } else {
          uni.navigateBack();
        }
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", null, [
          vue.createElementVNode(
            "view",
            {
              class: "navbar",
              style: vue.normalizeStyle({
                height: vue.unref(appInfoStore).getInfo().navBarHeight + vue.unref(appInfoStore).getInfo().statusBar + "px",
                "padding-top": vue.unref(appInfoStore).getInfo().statusBar + "px"
              })
            },
            [
              vue.createElementVNode("view", { class: "left" }, [
                __props.showLeft ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "iconfont icon-back",
                  onClick: leftClick
                })) : vue.createCommentVNode("v-if", true)
              ]),
              vue.createElementVNode("view", { class: "content" }, [
                __props.title ? (vue.openBlock(), vue.createElementBlock(
                  "view",
                  { key: 0 },
                  vue.toDisplayString(__props.title),
                  1
                  /* TEXT */
                )) : vue.createCommentVNode("v-if", true),
                vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
              ]),
              vue.createElementVNode("view", { class: "right" }, [
                vue.renderSlot(_ctx.$slots, "right", {}, void 0, true)
              ])
            ],
            4
            /* STYLE */
          ),
          vue.createElementVNode(
            "view",
            {
              style: vue.normalizeStyle({
                height: vue.unref(appInfoStore).getInfo().navBarHeight + vue.unref(appInfoStore).getInfo().statusBar + "px"
              })
            },
            null,
            4
            /* STYLE */
          )
        ]);
      };
    }
  };
  const Navbar = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-a4f0bb53"], ["__file", "C:/easyjob/easyjob-front/easyjob-app/src/pages/components/common/Navbar.vue"]]);
  const _sfc_main$8 = {
    __name: "DataList",
    props: {
      dataSource: {
        type: Object
      },
      loadStatus: {
        type: String,
        default: "more"
        //“more”  loading  noMore
      }
    },
    emits: ["loadData"],
    setup(__props, { emit }) {
      const props = __props;
      const _loadStatus = vue.computed(() => {
        if (props.loadStatus == "more" && props.dataSource.pageTotal == props.dataSource.pageNo) {
          return "noMore";
        }
        return props.loadStatus;
      });
      const dataList = vue.ref([]);
      onReachBottom(() => {
        if (_loadStatus.value == "loading" || props.dataSource.pageNo >= props.dataSource.pageTotal) {
          return;
        }
        props.dataSource.pageNo += 1;
        emit("loadData");
      });
      onPullDownRefresh(() => {
        props.dataSource.pageNo = 1;
        dataList.value = [];
        emit("loadData");
      });
      vue.watch(
        () => props.dataSource.list,
        (newVal, oldVal) => {
          if (newVal) {
            if (props.dataSource.pageNo == null || props.dataSource.pageNo == 1) {
              dataList.value = newVal;
              return;
            }
            dataList.value = dataList.value.concat(newVal);
          }
        },
        { immediate: true, deep: true }
      );
      return (_ctx, _cache) => {
        const _component_uni_load_more = resolveEasycom(vue.resolveDynamicComponent("uni-load-more"), __easycom_0$4);
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(dataList.value, (item, index) => {
                return vue.renderSlot(_ctx.$slots, "default", {
                  data: item,
                  index: index + (__props.dataSource.pageNo - 1) * __props.dataSource.pageSize
                });
              }),
              256
              /* UNKEYED_FRAGMENT */
            )),
            vue.createVNode(_component_uni_load_more, {
              iconType: "circle",
              status: vue.unref(_loadStatus)
            }, null, 8, ["status"])
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  };
  const DataList = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__file", "C:/easyjob/easyjob-front/easyjob-app/src/pages/components/common/DataList.vue"]]);
  class MPAnimation {
    constructor(options, _this) {
      this.options = options;
      this.animation = uni.createAnimation({
        ...options
      });
      this.currentStepAnimates = {};
      this.next = 0;
      this.$ = _this;
    }
    _nvuePushAnimates(type, args) {
      let aniObj = this.currentStepAnimates[this.next];
      let styles = {};
      if (!aniObj) {
        styles = {
          styles: {},
          config: {}
        };
      } else {
        styles = aniObj;
      }
      if (animateTypes1.includes(type)) {
        if (!styles.styles.transform) {
          styles.styles.transform = "";
        }
        let unit = "";
        if (type === "rotate") {
          unit = "deg";
        }
        styles.styles.transform += `${type}(${args + unit}) `;
      } else {
        styles.styles[type] = `${args}`;
      }
      this.currentStepAnimates[this.next] = styles;
    }
    _animateRun(styles = {}, config2 = {}) {
      let ref = this.$.$refs["ani"].ref;
      if (!ref)
        return;
      return new Promise((resolve, reject) => {
        nvueAnimation.transition(ref, {
          styles,
          ...config2
        }, (res) => {
          resolve();
        });
      });
    }
    _nvueNextAnimate(animates, step = 0, fn) {
      let obj = animates[step];
      if (obj) {
        let {
          styles,
          config: config2
        } = obj;
        this._animateRun(styles, config2).then(() => {
          step += 1;
          this._nvueNextAnimate(animates, step, fn);
        });
      } else {
        this.currentStepAnimates = {};
        typeof fn === "function" && fn();
        this.isEnd = true;
      }
    }
    step(config2 = {}) {
      this.animation.step(config2);
      return this;
    }
    run(fn) {
      this.$.animationData = this.animation.export();
      this.$.timer = setTimeout(() => {
        typeof fn === "function" && fn();
      }, this.$.durationTime);
    }
  }
  const animateTypes1 = [
    "matrix",
    "matrix3d",
    "rotate",
    "rotate3d",
    "rotateX",
    "rotateY",
    "rotateZ",
    "scale",
    "scale3d",
    "scaleX",
    "scaleY",
    "scaleZ",
    "skew",
    "skewX",
    "skewY",
    "translate",
    "translate3d",
    "translateX",
    "translateY",
    "translateZ"
  ];
  const animateTypes2 = ["opacity", "backgroundColor"];
  const animateTypes3 = ["width", "height", "left", "right", "top", "bottom"];
  animateTypes1.concat(animateTypes2, animateTypes3).forEach((type) => {
    MPAnimation.prototype[type] = function(...args) {
      this.animation[type](...args);
      return this;
    };
  });
  function createAnimation(option, _this) {
    if (!_this)
      return;
    clearTimeout(_this.timer);
    return new MPAnimation(option, _this);
  }
  const _sfc_main$7 = {
    name: "uniTransition",
    emits: ["click", "change"],
    props: {
      show: {
        type: Boolean,
        default: false
      },
      modeClass: {
        type: [Array, String],
        default() {
          return "fade";
        }
      },
      duration: {
        type: Number,
        default: 300
      },
      styles: {
        type: Object,
        default() {
          return {};
        }
      },
      customClass: {
        type: String,
        default: ""
      },
      onceRender: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isShow: false,
        transform: "",
        opacity: 1,
        animationData: {},
        durationTime: 300,
        config: {}
      };
    },
    watch: {
      show: {
        handler(newVal) {
          if (newVal) {
            this.open();
          } else {
            if (this.isShow) {
              this.close();
            }
          }
        },
        immediate: true
      }
    },
    computed: {
      // 生成样式数据
      stylesObject() {
        let styles = {
          ...this.styles,
          "transition-duration": this.duration / 1e3 + "s"
        };
        let transform = "";
        for (let i2 in styles) {
          let line = this.toLine(i2);
          transform += line + ":" + styles[i2] + ";";
        }
        return transform;
      },
      // 初始化动画条件
      transformStyles() {
        return "transform:" + this.transform + ";opacity:" + this.opacity + ";" + this.stylesObject;
      }
    },
    created() {
      this.config = {
        duration: this.duration,
        timingFunction: "ease",
        transformOrigin: "50% 50%",
        delay: 0
      };
      this.durationTime = this.duration;
    },
    methods: {
      /**
       *  ref 触发 初始化动画
       */
      init(obj = {}) {
        if (obj.duration) {
          this.durationTime = obj.duration;
        }
        this.animation = createAnimation(Object.assign(this.config, obj), this);
      },
      /**
       * 点击组件触发回调
       */
      onClick() {
        this.$emit("click", {
          detail: this.isShow
        });
      },
      /**
       * ref 触发 动画分组
       * @param {Object} obj
       */
      step(obj, config2 = {}) {
        if (!this.animation)
          return;
        for (let i2 in obj) {
          try {
            if (typeof obj[i2] === "object") {
              this.animation[i2](...obj[i2]);
            } else {
              this.animation[i2](obj[i2]);
            }
          } catch (e) {
            console.error(`方法 ${i2} 不存在`);
          }
        }
        this.animation.step(config2);
        return this;
      },
      /**
       *  ref 触发 执行动画
       */
      run(fn) {
        if (!this.animation)
          return;
        this.animation.run(fn);
      },
      // 开始过度动画
      open() {
        clearTimeout(this.timer);
        this.transform = "";
        this.isShow = true;
        let { opacity, transform } = this.styleInit(false);
        if (typeof opacity !== "undefined") {
          this.opacity = opacity;
        }
        this.transform = transform;
        this.$nextTick(() => {
          this.timer = setTimeout(() => {
            this.animation = createAnimation(this.config, this);
            this.tranfromInit(false).step();
            this.animation.run();
            this.$emit("change", {
              detail: this.isShow
            });
          }, 20);
        });
      },
      // 关闭过度动画
      close(type) {
        if (!this.animation)
          return;
        this.tranfromInit(true).step().run(() => {
          this.isShow = false;
          this.animationData = null;
          this.animation = null;
          let { opacity, transform } = this.styleInit(false);
          this.opacity = opacity || 1;
          this.transform = transform;
          this.$emit("change", {
            detail: this.isShow
          });
        });
      },
      // 处理动画开始前的默认样式
      styleInit(type) {
        let styles = {
          transform: ""
        };
        let buildStyle = (type2, mode) => {
          if (mode === "fade") {
            styles.opacity = this.animationType(type2)[mode];
          } else {
            styles.transform += this.animationType(type2)[mode] + " ";
          }
        };
        if (typeof this.modeClass === "string") {
          buildStyle(type, this.modeClass);
        } else {
          this.modeClass.forEach((mode) => {
            buildStyle(type, mode);
          });
        }
        return styles;
      },
      // 处理内置组合动画
      tranfromInit(type) {
        let buildTranfrom = (type2, mode) => {
          let aniNum = null;
          if (mode === "fade") {
            aniNum = type2 ? 0 : 1;
          } else {
            aniNum = type2 ? "-100%" : "0";
            if (mode === "zoom-in") {
              aniNum = type2 ? 0.8 : 1;
            }
            if (mode === "zoom-out") {
              aniNum = type2 ? 1.2 : 1;
            }
            if (mode === "slide-right") {
              aniNum = type2 ? "100%" : "0";
            }
            if (mode === "slide-bottom") {
              aniNum = type2 ? "100%" : "0";
            }
          }
          this.animation[this.animationMode()[mode]](aniNum);
        };
        if (typeof this.modeClass === "string") {
          buildTranfrom(type, this.modeClass);
        } else {
          this.modeClass.forEach((mode) => {
            buildTranfrom(type, mode);
          });
        }
        return this.animation;
      },
      animationType(type) {
        return {
          fade: type ? 0 : 1,
          "slide-top": `translateY(${type ? "0" : "-100%"})`,
          "slide-right": `translateX(${type ? "0" : "100%"})`,
          "slide-bottom": `translateY(${type ? "0" : "100%"})`,
          "slide-left": `translateX(${type ? "0" : "-100%"})`,
          "zoom-in": `scaleX(${type ? 1 : 0.8}) scaleY(${type ? 1 : 0.8})`,
          "zoom-out": `scaleX(${type ? 1 : 1.2}) scaleY(${type ? 1 : 1.2})`
        };
      },
      // 内置动画类型与实际动画对应字典
      animationMode() {
        return {
          fade: "opacity",
          "slide-top": "translateY",
          "slide-right": "translateX",
          "slide-bottom": "translateY",
          "slide-left": "translateX",
          "zoom-in": "scale",
          "zoom-out": "scale"
        };
      },
      // 驼峰转中横线
      toLine(name) {
        return name.replace(/([A-Z])/g, "-$1").toLowerCase();
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.withDirectives((vue.openBlock(), vue.createElementBlock("view", {
      ref: "ani",
      animation: $data.animationData,
      class: vue.normalizeClass($props.customClass),
      style: vue.normalizeStyle($options.transformStyles),
      onClick: _cache[0] || (_cache[0] = (...args) => $options.onClick && $options.onClick(...args))
    }, [
      vue.renderSlot(_ctx.$slots, "default")
    ], 14, ["animation"])), [
      [vue.vShow, $data.isShow]
    ]);
  }
  const __easycom_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$2], ["__file", "C:/easyjob/easyjob-front/easyjob-app/node_modules/@dcloudio/uni-ui/lib/uni-transition/uni-transition.vue"]]);
  const _sfc_main$6 = {
    name: "uniPopup",
    components: {},
    emits: ["change", "maskClick"],
    props: {
      // 开启动画
      animation: {
        type: Boolean,
        default: true
      },
      // 弹出层类型，可选值，top: 顶部弹出层；bottom：底部弹出层；center：全屏弹出层
      // message: 消息提示 ; dialog : 对话框
      type: {
        type: String,
        default: "center"
      },
      // maskClick
      isMaskClick: {
        type: Boolean,
        default: null
      },
      // TODO 2 个版本后废弃属性 ，使用 isMaskClick
      maskClick: {
        type: Boolean,
        default: null
      },
      backgroundColor: {
        type: String,
        default: "none"
      },
      safeArea: {
        type: Boolean,
        default: true
      },
      maskBackgroundColor: {
        type: String,
        default: "rgba(0, 0, 0, 0.4)"
      },
      borderRadius: {
        type: String
      }
    },
    watch: {
      /**
       * 监听type类型
       */
      type: {
        handler: function(type) {
          if (!this.config[type])
            return;
          this[this.config[type]](true);
        },
        immediate: true
      },
      isDesktop: {
        handler: function(newVal) {
          if (!this.config[newVal])
            return;
          this[this.config[this.type]](true);
        },
        immediate: true
      },
      /**
       * 监听遮罩是否可点击
       * @param {Object} val
       */
      maskClick: {
        handler: function(val) {
          this.mkclick = val;
        },
        immediate: true
      },
      isMaskClick: {
        handler: function(val) {
          this.mkclick = val;
        },
        immediate: true
      },
      // H5 下禁止底部滚动
      showPopup(show) {
      }
    },
    data() {
      return {
        duration: 300,
        ani: [],
        showPopup: false,
        showTrans: false,
        popupWidth: 0,
        popupHeight: 0,
        config: {
          top: "top",
          bottom: "bottom",
          center: "center",
          left: "left",
          right: "right",
          message: "top",
          dialog: "center",
          share: "bottom"
        },
        maskClass: {
          position: "fixed",
          bottom: 0,
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)"
        },
        transClass: {
          backgroundColor: "transparent",
          borderRadius: this.borderRadius || "0",
          position: "fixed",
          left: 0,
          right: 0
        },
        maskShow: true,
        mkclick: true,
        popupstyle: "top"
      };
    },
    computed: {
      getStyles() {
        let res = { backgroundColor: this.bg };
        if (this.borderRadius || "0") {
          res = Object.assign(res, { borderRadius: this.borderRadius });
        }
        return res;
      },
      isDesktop() {
        return this.popupWidth >= 500 && this.popupHeight >= 500;
      },
      bg() {
        if (this.backgroundColor === "" || this.backgroundColor === "none") {
          return "transparent";
        }
        return this.backgroundColor;
      }
    },
    mounted() {
      const fixSize = () => {
        const {
          windowWidth: windowWidth2,
          windowHeight,
          windowTop,
          safeArea,
          screenHeight,
          safeAreaInsets
        } = uni.getSystemInfoSync();
        this.popupWidth = windowWidth2;
        this.popupHeight = windowHeight + (windowTop || 0);
        if (safeArea && this.safeArea) {
          this.safeAreaInsets = safeAreaInsets.bottom;
        } else {
          this.safeAreaInsets = 0;
        }
      };
      fixSize();
    },
    // TODO vue3
    unmounted() {
      this.setH5Visible();
    },
    activated() {
      this.setH5Visible(!this.showPopup);
    },
    deactivated() {
      this.setH5Visible(true);
    },
    created() {
      if (this.isMaskClick === null && this.maskClick === null) {
        this.mkclick = true;
      } else {
        this.mkclick = this.isMaskClick !== null ? this.isMaskClick : this.maskClick;
      }
      if (this.animation) {
        this.duration = 300;
      } else {
        this.duration = 0;
      }
      this.messageChild = null;
      this.clearPropagation = false;
      this.maskClass.backgroundColor = this.maskBackgroundColor;
    },
    methods: {
      setH5Visible(visible = true) {
      },
      /**
       * 公用方法，不显示遮罩层
       */
      closeMask() {
        this.maskShow = false;
      },
      /**
       * 公用方法，遮罩层禁止点击
       */
      disableMask() {
        this.mkclick = false;
      },
      // TODO nvue 取消冒泡
      clear(e) {
        e.stopPropagation();
        this.clearPropagation = true;
      },
      open(direction) {
        if (this.showPopup) {
          return;
        }
        let innerType = ["top", "center", "bottom", "left", "right", "message", "dialog", "share"];
        if (!(direction && innerType.indexOf(direction) !== -1)) {
          direction = this.type;
        }
        if (!this.config[direction]) {
          console.error("缺少类型：", direction);
          return;
        }
        this[this.config[direction]]();
        this.$emit("change", {
          show: true,
          type: direction
        });
      },
      close(type) {
        this.showTrans = false;
        this.$emit("change", {
          show: false,
          type: this.type
        });
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.showPopup = false;
        }, 300);
      },
      // TODO 处理冒泡事件，头条的冒泡事件有问题 ，先这样兼容
      touchstart() {
        this.clearPropagation = false;
      },
      onTap() {
        if (this.clearPropagation) {
          this.clearPropagation = false;
          return;
        }
        this.$emit("maskClick");
        if (!this.mkclick)
          return;
        this.close();
      },
      /**
       * 顶部弹出样式处理
       */
      top(type) {
        this.popupstyle = this.isDesktop ? "fixforpc-top" : "top";
        this.ani = ["slide-top"];
        this.transClass = {
          position: "fixed",
          left: 0,
          right: 0,
          backgroundColor: this.bg,
          borderRadius: this.borderRadius || "0"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
        this.$nextTick(() => {
          this.showPoptrans();
          if (this.messageChild && this.type === "message") {
            this.messageChild.timerClose();
          }
        });
      },
      /**
       * 底部弹出样式处理
       */
      bottom(type) {
        this.popupstyle = "bottom";
        this.ani = ["slide-bottom"];
        this.transClass = {
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          paddingBottom: this.safeAreaInsets + "px",
          backgroundColor: this.bg,
          borderRadius: this.borderRadius || "0"
        };
        if (type)
          return;
        this.showPoptrans();
      },
      /**
       * 中间弹出样式处理
       */
      center(type) {
        this.popupstyle = "center";
        this.ani = ["zoom-out", "fade"];
        this.transClass = {
          position: "fixed",
          display: "flex",
          flexDirection: "column",
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: this.borderRadius || "0"
        };
        if (type)
          return;
        this.showPoptrans();
      },
      left(type) {
        this.popupstyle = "left";
        this.ani = ["slide-left"];
        this.transClass = {
          position: "fixed",
          left: 0,
          bottom: 0,
          top: 0,
          backgroundColor: this.bg,
          borderRadius: this.borderRadius || "0",
          display: "flex",
          flexDirection: "column"
        };
        if (type)
          return;
        this.showPoptrans();
      },
      right(type) {
        this.popupstyle = "right";
        this.ani = ["slide-right"];
        this.transClass = {
          position: "fixed",
          bottom: 0,
          right: 0,
          top: 0,
          backgroundColor: this.bg,
          borderRadius: this.borderRadius || "0",
          display: "flex",
          flexDirection: "column"
        };
        if (type)
          return;
        this.showPoptrans();
      },
      showPoptrans() {
        this.$nextTick(() => {
          this.showPopup = true;
          this.showTrans = true;
        });
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_transition = resolveEasycom(vue.resolveDynamicComponent("uni-transition"), __easycom_0$2);
    return $data.showPopup ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: vue.normalizeClass(["uni-popup", [$data.popupstyle, $options.isDesktop ? "fixforpc-z-index" : ""]])
      },
      [
        vue.createElementVNode(
          "view",
          {
            onTouchstart: _cache[1] || (_cache[1] = (...args) => $options.touchstart && $options.touchstart(...args))
          },
          [
            $data.maskShow ? (vue.openBlock(), vue.createBlock(_component_uni_transition, {
              key: "1",
              name: "mask",
              "mode-class": "fade",
              styles: $data.maskClass,
              duration: $data.duration,
              show: $data.showTrans,
              onClick: $options.onTap
            }, null, 8, ["styles", "duration", "show", "onClick"])) : vue.createCommentVNode("v-if", true),
            vue.createVNode(_component_uni_transition, {
              key: "2",
              "mode-class": $data.ani,
              name: "content",
              styles: $data.transClass,
              duration: $data.duration,
              show: $data.showTrans,
              onClick: $options.onTap
            }, {
              default: vue.withCtx(() => [
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass(["uni-popup__wrapper", [$data.popupstyle]]),
                    style: vue.normalizeStyle($options.getStyles),
                    onClick: _cache[0] || (_cache[0] = (...args) => $options.clear && $options.clear(...args))
                  },
                  [
                    vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
                  ],
                  6
                  /* CLASS, STYLE */
                )
              ]),
              _: 3
              /* FORWARDED */
            }, 8, ["mode-class", "styles", "duration", "show", "onClick"])
          ],
          32
          /* HYDRATE_EVENTS */
        )
      ],
      2
      /* CLASS */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$1], ["__scopeId", "data-v-7db519c7"], ["__file", "C:/easyjob/easyjob-front/easyjob-app/node_modules/@dcloudio/uni-ui/lib/uni-popup/uni-popup.vue"]]);
  const _sfc_main$5 = {
    __name: "Popup",
    props: {
      type: {
        type: String,
        default: "bottom"
      }
    },
    setup(__props, { expose }) {
      const props = __props;
      vue.getCurrentInstance();
      const appInfoStore = useAppInfoStore();
      const paddingTop = vue.computed(() => {
        if (props.type == "bottom") {
          return 0;
        } else {
          const { statusBar, navBarHeight } = appInfoStore.getInfo();
          return statusBar + navBarHeight;
        }
      });
      const popupRef = vue.ref();
      const show = () => {
        popupRef.value.open();
      };
      const close = () => {
        popupRef.value.close();
      };
      expose({
        show,
        close
      });
      return (_ctx, _cache) => {
        const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_0$1);
        return vue.openBlock(), vue.createBlock(_component_uni_popup, {
          ref_key: "popupRef",
          ref: popupRef,
          type: __props.type,
          "background-color": "#fff"
        }, {
          default: vue.withCtx(() => [
            vue.createElementVNode(
              "view",
              {
                class: "pop-body",
                style: vue.normalizeStyle({ "padding-top": vue.unref(paddingTop) + "px" })
              },
              [
                vue.renderSlot(_ctx.$slots, "default")
              ],
              4
              /* STYLE */
            )
          ]),
          _: 3
          /* FORWARDED */
        }, 8, ["type"]);
      };
    }
  };
  const Popup = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__file", "C:/easyjob/easyjob-front/easyjob-app/src/pages/components/common/Popup.vue"]]);
  const _sfc_main$4 = {
    name: "UniNoticeBar",
    emits: ["click", "getmore", "close"],
    props: {
      text: {
        type: String,
        default: ""
      },
      moreText: {
        type: String,
        default: ""
      },
      backgroundColor: {
        type: String,
        default: "#FFF9EA"
      },
      speed: {
        // 默认1s滚动100px
        type: Number,
        default: 100
      },
      color: {
        type: String,
        default: "#FF9A43"
      },
      fontSize: {
        type: Number,
        default: 14
      },
      moreColor: {
        type: String,
        default: "#FF9A43"
      },
      single: {
        // 是否单行
        type: [Boolean, String],
        default: false
      },
      scrollable: {
        // 是否滚动，添加后控制单行效果取消
        type: [Boolean, String],
        default: false
      },
      showIcon: {
        // 是否显示左侧icon
        type: [Boolean, String],
        default: false
      },
      showGetMore: {
        // 是否显示右侧查看更多
        type: [Boolean, String],
        default: false
      },
      showClose: {
        // 是否显示左侧关闭按钮
        type: [Boolean, String],
        default: false
      }
    },
    data() {
      const elId = `Uni_${Math.ceil(Math.random() * 1e6).toString(36)}`;
      const elIdBox = `Uni_${Math.ceil(Math.random() * 1e6).toString(36)}`;
      return {
        textWidth: 0,
        boxWidth: 0,
        wrapWidth: "",
        webviewHide: false,
        elId,
        elIdBox,
        show: true,
        animationDuration: "none",
        animationPlayState: "paused",
        animationDelay: "0s"
      };
    },
    watch: {
      text: function(newValue, oldValue) {
        this.initSize();
      }
    },
    computed: {
      isShowGetMore() {
        return this.showGetMore === true || this.showGetMore === "true";
      },
      isShowClose() {
        return (this.showClose === true || this.showClose === "true") && (this.showGetMore === false || this.showGetMore === "false");
      }
    },
    mounted() {
      var pages2 = getCurrentPages();
      var page = pages2[pages2.length - 1];
      var currentWebview = page.$getAppWebview();
      currentWebview.addEventListener("hide", () => {
        this.webviewHide = true;
      });
      currentWebview.addEventListener("show", () => {
        this.webviewHide = false;
      });
      this.$nextTick(() => {
        this.initSize();
      });
    },
    methods: {
      initSize() {
        if (this.scrollable) {
          let query = [];
          let textQuery = new Promise((resolve, reject) => {
            uni.createSelectorQuery().in(this).select(`#${this.elId}`).boundingClientRect().exec((ret) => {
              this.textWidth = ret[0].width;
              resolve();
            });
          });
          let boxQuery = new Promise((resolve, reject) => {
            uni.createSelectorQuery().in(this).select(`#${this.elIdBox}`).boundingClientRect().exec((ret) => {
              this.boxWidth = ret[0].width;
              resolve();
            });
          });
          query.push(textQuery);
          query.push(boxQuery);
          Promise.all(query).then(() => {
            this.animationDuration = `${this.textWidth / this.speed}s`;
            this.animationDelay = `-${this.boxWidth / this.speed}s`;
            setTimeout(() => {
              this.animationPlayState = "running";
            }, 1e3);
          });
        }
      },
      loopAnimation() {
      },
      clickMore() {
        this.$emit("getmore");
      },
      close() {
        this.show = false;
        this.$emit("close");
      },
      onClick() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$5);
    return $data.show ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: "uni-noticebar",
        style: vue.normalizeStyle({ backgroundColor: $props.backgroundColor }),
        onClick: _cache[1] || (_cache[1] = (...args) => $options.onClick && $options.onClick(...args))
      },
      [
        $props.showIcon === true || $props.showIcon === "true" ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
          key: 0,
          class: "uni-noticebar-icon",
          type: "sound",
          color: $props.color,
          size: $props.fontSize * 1.5
        }, null, 8, ["color", "size"])) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode(
          "view",
          {
            ref: "textBox",
            class: vue.normalizeClass(["uni-noticebar__content-wrapper", {
              "uni-noticebar__content-wrapper--scrollable": $props.scrollable,
              "uni-noticebar__content-wrapper--single": !$props.scrollable && ($props.single || $props.moreText)
            }]),
            style: vue.normalizeStyle({ height: $props.scrollable ? $props.fontSize * 1.5 + "px" : "auto" })
          },
          [
            vue.createElementVNode("view", {
              id: $data.elIdBox,
              class: vue.normalizeClass(["uni-noticebar__content", {
                "uni-noticebar__content--scrollable": $props.scrollable,
                "uni-noticebar__content--single": !$props.scrollable && ($props.single || $props.moreText)
              }])
            }, [
              vue.createElementVNode("text", {
                id: $data.elId,
                ref: "animationEle",
                class: vue.normalizeClass(["uni-noticebar__content-text", {
                  "uni-noticebar__content-text--scrollable": $props.scrollable,
                  "uni-noticebar__content-text--single": !$props.scrollable && ($props.single || $props.showGetMore)
                }]),
                style: vue.normalizeStyle({
                  color: $props.color,
                  fontSize: $props.fontSize + "px",
                  lineHeight: $props.fontSize * 1.5 + "px",
                  width: $data.wrapWidth + "px",
                  "animationDuration": $data.animationDuration,
                  "-webkit-animationDuration": $data.animationDuration,
                  animationPlayState: $data.webviewHide ? "paused" : $data.animationPlayState,
                  "-webkit-animationPlayState": $data.webviewHide ? "paused" : $data.animationPlayState,
                  animationDelay: $data.animationDelay,
                  "-webkit-animationDelay": $data.animationDelay
                })
              }, vue.toDisplayString($props.text), 15, ["id"])
            ], 10, ["id"])
          ],
          6
          /* CLASS, STYLE */
        ),
        $options.isShowGetMore ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          class: "uni-noticebar__more uni-cursor-point",
          onClick: _cache[0] || (_cache[0] = (...args) => $options.clickMore && $options.clickMore(...args))
        }, [
          $props.moreText.length > 0 ? (vue.openBlock(), vue.createElementBlock(
            "text",
            {
              key: 0,
              style: vue.normalizeStyle({ color: $props.moreColor, fontSize: $props.fontSize + "px" })
            },
            vue.toDisplayString($props.moreText),
            5
            /* TEXT, STYLE */
          )) : (vue.openBlock(), vue.createBlock(_component_uni_icons, {
            key: 1,
            type: "right",
            color: $props.moreColor,
            size: $props.fontSize * 1.1
          }, null, 8, ["color", "size"]))
        ])) : vue.createCommentVNode("v-if", true),
        $options.isShowClose ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 2,
          class: "uni-noticebar-close uni-cursor-point"
        }, [
          vue.createVNode(_component_uni_icons, {
            type: "closeempty",
            color: $props.color,
            size: $props.fontSize * 1.1,
            onClick: $options.close
          }, null, 8, ["color", "size", "onClick"])
        ])) : vue.createCommentVNode("v-if", true)
      ],
      4
      /* STYLE */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render], ["__scopeId", "data-v-e94d5e72"], ["__file", "C:/easyjob/easyjob-front/easyjob-app/node_modules/@dcloudio/uni-ui/lib/uni-notice-bar/uni-notice-bar.vue"]]);
  const _sfc_main$3 = {
    __name: "ShowTips",
    setup(__props) {
      vue.getCurrentInstance();
      const showNotice = vue.computed(() => {
        const show = uni.getStorageSync(LOCAL_STORAGE_KEY.show_notice_bar.key);
        return show === "" ? true : show;
      });
      const closeNotice = () => {
        uni.setStorageSync(LOCAL_STORAGE_KEY.show_notice_bar.key, false);
      };
      return (_ctx, _cache) => {
        const _component_uni_notice_bar = resolveEasycom(vue.resolveDynamicComponent("uni-notice-bar"), __easycom_0);
        return vue.openBlock(), vue.createElementBlock("view", { class: "notice" }, [
          vue.unref(showNotice) ? (vue.openBlock(), vue.createBlock(_component_uni_notice_bar, {
            key: 0,
            "show-icon": "",
            text: "左右滑动可以切换上、下一页",
            showClose: true,
            onClick: closeNotice
          })) : vue.createCommentVNode("v-if", true)
        ]);
      };
    }
  };
  const ShowTips = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-600c49d0"], ["__file", "C:/easyjob/easyjob-front/easyjob-app/src/pages/components/common/ShowTips.vue"]]);
  const _sfc_main$2 = {
    __name: "Footer",
    props: {
      haveCollect: {
        type: Boolean,
        default: false
      },
      objectId: {
        type: String
      },
      collectType: {
        type: Number
      }
    },
    emits: ["updateCollect"],
    setup(__props, { emit }) {
      const props = __props;
      const { proxy } = vue.getCurrentInstance();
      const doCollect = async () => {
        let api2 = proxy.Api.addCollect;
        if (props.haveCollect) {
          api2 = proxy.Api.cancelCollect;
        }
        let result = await proxy.Request({
          url: api2,
          params: {
            objectId: props.objectId,
            collectType: props.collectType
          }
        });
        if (!result) {
          return;
        }
        if (props.haveCollect) {
          proxy.Message.success("取消成功");
        } else {
          proxy.Message.success("收藏成功");
        }
        emit("updateCollect", !props.haveCollect);
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "footer" }, [
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["iconfont icon-collect", __props.haveCollect ? "collected" : ""]),
              onClick: doCollect
            },
            null,
            2
            /* CLASS */
          ),
          vue.createElementVNode("view", { class: "other" }, [
            vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ])
        ]);
      };
    }
  };
  const Footer = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-a676f463"], ["__file", "C:/easyjob/easyjob-front/easyjob-app/src/pages/components/common/Footer.vue"]]);
  const _sfc_main$1 = {
    __name: "SlidePage",
    emits: ["loadData"],
    setup(__props, { emit }) {
      vue.getCurrentInstance();
      const appInfoStore = useAppInfoStore();
      const { screenHeight, statusBar, navBarHeight } = appInfoStore.getInfo();
      const paddingBottom = 50;
      const contentHeight = vue.computed(() => {
        const show = uni.getStorageSync(LOCAL_STORAGE_KEY.show_notice_bar.key);
        let tipsHeight = 0;
        if (show === "") {
          tipsHeight = 42;
        }
        return screenHeight - statusBar - navBarHeight - 50 - tipsHeight;
      });
      const nextType = vue.ref(null);
      const startX = vue.ref();
      const startY = vue.ref();
      const touchstart = (e) => {
        const touch = e.changedTouches[0];
        startX.value = touch.clientX;
        startY.value = touch.clientY;
      };
      const touchend = (e) => {
        const touch = e.changedTouches[0];
        const endX = touch.clientX;
        const endY = touch.clientY;
        const moveX = endX - startX.value;
        const moveY = endY - startY.value;
        const absMovex = Math.abs(moveX);
        if (absMovex < 60 || absMovex == 0 || moveY > 50) {
          return;
        }
        if (moveX < 0) {
          nextType.value = 1;
        }
        if (moveX > 0) {
          nextType.value = -1;
        }
        startX.value = 0;
        startY.value = 0;
        emit("loadData", nextType.value);
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(
          "view",
          {
            class: "detail",
            selectable: "true",
            style: vue.normalizeStyle({
              height: vue.unref(contentHeight) + "px",
              "padding-bottom": paddingBottom + "px"
            }),
            onTouchstart: touchstart,
            onTouchend: touchend
          },
          [
            vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ],
          36
          /* STYLE, HYDRATE_EVENTS */
        );
      };
    }
  };
  const SlidePage = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-03b808bc"], ["__file", "C:/easyjob/easyjob-front/easyjob-app/src/pages/components/common/SlidePage.vue"]]);
  const _sfc_main = {
    __name: "Dialog",
    props: {
      styleBg: {
        type: String
      },
      styleBorder: {
        type: String
      },
      title: {
        type: String
      },
      showCancel: {
        type: Boolean,
        default: true
      },
      cancelText: {
        type: String,
        default: "取消"
      },
      cancelFun: {
        type: Function
      },
      okText: {
        type: String,
        default: "确定"
      },
      okFun: {
        type: Function
      }
    },
    setup(__props, { expose }) {
      vue.getCurrentInstance();
      const appInfoStore = useAppInfoStore();
      const screen = vue.computed(() => {
        const { screenWidth, screenHeight } = appInfoStore.getInfo();
        return {
          screenWidth,
          screenHeight: screenHeight * 0.8
        };
      });
      const popupRef = vue.ref();
      const show = () => {
        popupRef.value.open();
      };
      const close = () => {
        popupRef.value.close();
      };
      expose({
        show,
        close
      });
      return (_ctx, _cache) => {
        const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_0$1);
        return vue.openBlock(), vue.createBlock(
          _component_uni_popup,
          {
            ref_key: "popupRef",
            ref: popupRef,
            "is-mask-click": false,
            type: "center"
          },
          {
            default: vue.withCtx(() => [
              vue.createElementVNode(
                "view",
                {
                  class: "popup",
                  style: vue.normalizeStyle({
                    width: vue.unref(screen).screenWidth * 0.85 + "px",
                    background: __props.styleBg ? __props.styleBg : "",
                    border: __props.styleBorder ? __props.styleBorder : ""
                  })
                },
                [
                  __props.title ? (vue.openBlock(), vue.createElementBlock(
                    "view",
                    {
                      key: 0,
                      class: "title"
                    },
                    vue.toDisplayString(__props.title),
                    1
                    /* TEXT */
                  )) : vue.createCommentVNode("v-if", true),
                  vue.createElementVNode(
                    "view",
                    {
                      class: "content",
                      style: vue.normalizeStyle({ "max-height": vue.unref(screen).screenHeight + "px" })
                    },
                    [
                      vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
                    ],
                    4
                    /* STYLE */
                  ),
                  __props.showCancel || __props.okFun ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 1,
                    class: "footer"
                  }, [
                    __props.showCancel ? (vue.openBlock(), vue.createElementBlock(
                      "view",
                      {
                        key: 0,
                        class: "btn btn-cancel",
                        onClick: close
                      },
                      vue.toDisplayString(__props.cancelText),
                      1
                      /* TEXT */
                    )) : vue.createCommentVNode("v-if", true),
                    vue.createElementVNode(
                      "view",
                      {
                        class: "btn btn-ok",
                        onClick: _cache[0] || (_cache[0] = (...args) => __props.okFun && __props.okFun(...args))
                      },
                      vue.toDisplayString(__props.okText),
                      1
                      /* TEXT */
                    )
                  ])) : vue.createCommentVNode("v-if", true)
                ],
                4
                /* STYLE */
              )
            ]),
            _: 3
            /* FORWARDED */
          },
          512
          /* NEED_PATCH */
        );
      };
    }
  };
  const Dialog = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9ca4aa40"], ["__file", "C:/easyjob/easyjob-front/easyjob-app/src/pages/components/common/Dialog.vue"]]);
  const message = {
    error: (msg, callback) => {
      uni.showToast({
        title: msg,
        icon: "none",
        success: callback ? callback : null
      });
    },
    success: (msg, callback) => {
      uni.showToast({
        title: msg,
        icon: "sucess",
        success: callback ? callback : null
      });
    },
    warning: (msg, callback) => {
      uni.showToast({
        title: msg,
        icon: "none",
        success: callback ? callback : null
      });
    }
  };
  const api = {
    //接口域名
    domain: "http://192.168.1.109:9090",
    //图片域名
    imageUrl: "/api/file/getImage/",
    //验证码
    checkCode: "/account/checkCode",
    //注册
    register: "/account/register",
    //登录
    login: "/account/login",
    //自动登录
    autoLogin: "/account/autoLogin",
    //上报
    report: "/index/report",
    //首页轮播图
    loadCarousel: "/index/loadCarousel",
    //轮播考试
    getExamQuestionById: "/index/getExamQuestionById",
    //首页分类
    loadAllCategory: "/index/loadAllCategory",
    //分享
    loadShareInfo: "/share/loadShareList",
    //详情
    getShareDetailNext: "/share/getShareDetailNext",
    //获取问题
    loadQuestion: "/question/loadQuestion",
    //下一篇问题
    getQuestionDetailNext: "/question/getQuestionDetailNext",
    //收藏
    addCollect: "/appUserCollect/addCollect",
    //取消收藏
    cancelCollect: "/appUserCollect/cancelCollect",
    //在线考试
    loadNoFinishedExam: "/appExam/loadNoFinishedExam",
    //删除考试记录
    delExam: "/appExam/delExam",
    //创建考试
    createExam: "/appExam/createExam",
    //开始考试
    startExam: "/appExam/startExam",
    //获取考试题目
    getExamQuestion: "/appExam/getExamQuestion",
    //提交考题
    postExam: "/appExam/postExam",
    //获取用户信息
    getUserInfo: "/my/getUserInfo",
    //我的收藏
    myCollect: "/my/loadCollect",
    //收藏详情
    getCollectNext: "/my/getCollectNext",
    //我的考试
    myExamList: "/my/loadMyExam",
    //我的错题
    myWrongQuestion: "/my/loadWrongQuestion",
    //上传头像
    uploadAvatar: "/api/my/uploadAvatar",
    //更新用户信息
    updateUserInfo: "/my/updateUserInfo",
    //问题反馈
    loadFeedback: "/my/loadFeedback",
    //查询回复
    loadFeedbackReply: "/my/loadFeedbackReply",
    //发送问题
    sendFeedback: "/my/sendFeedback",
    //检查更新
    checkUpdate: "/update/checkVersion",
    //下载
    downloadApp: "/api/update/download",
    //搜索
    search: "/search/search"
  };
  const contentTypeForm = "application/x-www-form-urlencoded;charset=UTF-8";
  const contentTypeJson = "application/json";
  const responseTypeJson = "json";
  let port = uni.getSystemInfoSync().uniPlatform;
  let BASE_URL = api.domain + "/api";
  if (port == "web") {
    BASE_URL = "/api";
  } else {
    BASE_URL = api.domain + "/api";
  }
  const request = (config2) => {
    const {
      url,
      params,
      dataType,
      showLoading = true,
      showError = true,
      errorCallback,
      responseType = responseTypeJson
    } = config2;
    let contentType = contentTypeForm;
    if (dataType != null && dataType == "json") {
      contentType = contentTypeJson;
    }
    let headers = {
      "Content-Type": contentType,
      "X-Requested-With": "XMLHttpRequest",
      "token": uni.getStorageSync(LOCAL_STORAGE_KEY.token.key)
    };
    if (params) {
      for (let item in params) {
        if (params[item] == void 0) {
          params[item] = "";
        }
      }
    }
    return new Promise((resolve, reject) => {
      if (showLoading) {
        uni.showLoading();
      }
      uni.request({
        url: BASE_URL + url,
        data: params,
        header: headers,
        responseType,
        method: "POST"
      }).then((res) => {
        if (showLoading) {
          uni.hideLoading();
        }
        uni.stopPullDownRefresh();
        if (res.statusCode != 200) {
          return Promise.reject("网络连接错误");
        }
        const responseData = res.data;
        if (responseType == "arraybuffer" || responseType == "blob") {
          resolve(responseData);
          return;
        }
        if (responseData.code == 200) {
          resolve(responseData);
          return;
        } else if (responseData.code == 901) {
          uni.navigateTo({
            url: "/pages/account/LoginAndRegister"
          });
          return Promise.reject();
        } else {
          if (errorCallback) {
            errorCallback(responseData.info);
          }
          return Promise.reject(responseData.info);
        }
      }).catch((error) => {
        if (error && showError) {
          message.error(error);
        }
        return null;
      });
    });
  };
  const Utils = {
    dateformat: (date) => {
      if (date == null) {
        return "";
      }
      return date.substr(0, 10);
    },
    size2Str: (limit) => {
      var size = "";
      if (limit < 1024) {
        size = limit.toFixed(2) + "B";
      } else if (limit < 1024 * 1024) {
        size = (limit / 1024).toFixed(2) + "KB";
      } else if (limit < 1024 * 1024 * 1024) {
        size = (limit / (1024 * 1024)).toFixed(2) + "MB";
      } else {
        size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";
      }
      var sizeStr = size + "";
      var index = sizeStr.indexOf(".");
      var dou = sizeStr.substr(index + 1, 2);
      if (dou == "00") {
        return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2);
      }
      return size;
    }
  };
  const confirm = (message2, okfun) => {
    uni.showModal({
      title: "确认操作",
      content: message2,
      success: function(res) {
        if (res.confirm) {
          okfun();
        }
      }
    });
  };
  function createApp() {
    const app = vue.createVueApp(App);
    app.use(createPinia());
    app.component("Navbar", Navbar);
    app.component("DataList", DataList);
    app.component("Popup", Popup);
    app.component("ShowTips", ShowTips);
    app.component("Footer", Footer);
    app.component("SlidePage", SlidePage);
    app.component("Dialog", Dialog);
    app.config.globalProperties.Message = message;
    app.config.globalProperties.Request = request;
    app.config.globalProperties.Api = api;
    app.config.globalProperties.Utils = Utils;
    app.config.globalProperties.Confirm = confirm;
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue, uni.VueShared);
