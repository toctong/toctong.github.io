import {
  init_vue_runtime_esm_bundler,
  reactive,
  watch
} from "./chunk-KQ22XY7Y.js";
import "./chunk-EWTE5DHJ.js";

// node_modules/.pnpm/vitepress-plugin-tabs@0.5.0_vitepress@1.5.0_@algolia+client-search@5.19.0_@types+node@22.10.7_2pi6kddsovzpblo3fcgzom6tvm/node_modules/vitepress-plugin-tabs/src/client/index.ts
import PluginTabs from "G:/大神之路/my_blog/node_modules/.pnpm/vitepress-plugin-tabs@0.5.0_vitepress@1.5.0_@algolia+client-search@5.19.0_@types+node@22.10.7_2pi6kddsovzpblo3fcgzom6tvm/node_modules/vitepress-plugin-tabs/src/client/PluginTabs.vue";
import PluginTabsTab from "G:/大神之路/my_blog/node_modules/.pnpm/vitepress-plugin-tabs@0.5.0_vitepress@1.5.0_@algolia+client-search@5.19.0_@types+node@22.10.7_2pi6kddsovzpblo3fcgzom6tvm/node_modules/vitepress-plugin-tabs/src/client/PluginTabsTab.vue";

// node_modules/.pnpm/vitepress-plugin-tabs@0.5.0_vitepress@1.5.0_@algolia+client-search@5.19.0_@types+node@22.10.7_2pi6kddsovzpblo3fcgzom6tvm/node_modules/vitepress-plugin-tabs/src/client/useTabsSelectedState.ts
init_vue_runtime_esm_bundler();
var injectionKey = "vitepress:tabSharedState";
var ls = typeof localStorage !== "undefined" ? localStorage : null;
var localStorageKey = "vitepress:tabsSharedState";
var setLocalStorageValue = (v) => {
  if (!ls) return;
  ls.setItem(localStorageKey, JSON.stringify(v));
};
var provideTabsSharedState = (app) => {
  const state = reactive({});
  watch(
    () => state.content,
    (newStateContent, oldStateContent) => {
      if (newStateContent && oldStateContent) {
        setLocalStorageValue(newStateContent);
      }
    },
    { deep: true }
  );
  app.provide(injectionKey, state);
};

// node_modules/.pnpm/vitepress-plugin-tabs@0.5.0_vitepress@1.5.0_@algolia+client-search@5.19.0_@types+node@22.10.7_2pi6kddsovzpblo3fcgzom6tvm/node_modules/vitepress-plugin-tabs/src/client/index.ts
var enhanceAppWithTabs = (app) => {
  provideTabsSharedState(app);
  app.component("PluginTabs", PluginTabs);
  app.component("PluginTabsTab", PluginTabsTab);
};
export {
  enhanceAppWithTabs
};
//# sourceMappingURL=vitepress-plugin-tabs_client.js.map
