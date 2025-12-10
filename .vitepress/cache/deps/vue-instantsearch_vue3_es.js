import {
  Fragment,
  createBaseVNode,
  createBlock,
  createCommentVNode,
  createElementBlock,
  createSSRApp,
  createSlots,
  createStaticVNode,
  createTextVNode,
  createVNode,
  guardReactiveProps,
  h,
  init_vue_runtime_esm_bundler,
  mergeProps,
  normalizeClass,
  normalizeProps,
  openBlock,
  renderList,
  renderSlot,
  resolveComponent,
  toDisplayString,
  version,
  withCtx,
  withModifiers
} from "./chunk-KQ22XY7Y.js";
import {
  __commonJS,
  __export,
  __toESM
} from "./chunk-EWTE5DHJ.js";

// node_modules/.pnpm/@algolia+events@4.0.1/node_modules/@algolia/events/events.js
var require_events = __commonJS({
  "node_modules/.pnpm/@algolia+events@4.0.1/node_modules/@algolia/events/events.js"(exports, module) {
    function EventEmitter2() {
      this._events = this._events || {};
      this._maxListeners = this._maxListeners || void 0;
    }
    module.exports = EventEmitter2;
    EventEmitter2.prototype._events = void 0;
    EventEmitter2.prototype._maxListeners = void 0;
    EventEmitter2.defaultMaxListeners = 10;
    EventEmitter2.prototype.setMaxListeners = function(n6) {
      if (!isNumber(n6) || n6 < 0 || isNaN(n6))
        throw TypeError("n must be a positive number");
      this._maxListeners = n6;
      return this;
    };
    EventEmitter2.prototype.emit = function(type) {
      var er, handler, len, args, i6, listeners;
      if (!this._events)
        this._events = {};
      if (type === "error") {
        if (!this._events.error || isObject(this._events.error) && !this._events.error.length) {
          er = arguments[1];
          if (er instanceof Error) {
            throw er;
          } else {
            var err = new Error('Uncaught, unspecified "error" event. (' + er + ")");
            err.context = er;
            throw err;
          }
        }
      }
      handler = this._events[type];
      if (isUndefined(handler))
        return false;
      if (isFunction(handler)) {
        switch (arguments.length) {
          case 1:
            handler.call(this);
            break;
          case 2:
            handler.call(this, arguments[1]);
            break;
          case 3:
            handler.call(this, arguments[1], arguments[2]);
            break;
          default:
            args = Array.prototype.slice.call(arguments, 1);
            handler.apply(this, args);
        }
      } else if (isObject(handler)) {
        args = Array.prototype.slice.call(arguments, 1);
        listeners = handler.slice();
        len = listeners.length;
        for (i6 = 0; i6 < len; i6++)
          listeners[i6].apply(this, args);
      }
      return true;
    };
    EventEmitter2.prototype.addListener = function(type, listener) {
      var m12;
      if (!isFunction(listener))
        throw TypeError("listener must be a function");
      if (!this._events)
        this._events = {};
      if (this._events.newListener)
        this.emit(
          "newListener",
          type,
          isFunction(listener.listener) ? listener.listener : listener
        );
      if (!this._events[type])
        this._events[type] = listener;
      else if (isObject(this._events[type]))
        this._events[type].push(listener);
      else
        this._events[type] = [this._events[type], listener];
      if (isObject(this._events[type]) && !this._events[type].warned) {
        if (!isUndefined(this._maxListeners)) {
          m12 = this._maxListeners;
        } else {
          m12 = EventEmitter2.defaultMaxListeners;
        }
        if (m12 && m12 > 0 && this._events[type].length > m12) {
          this._events[type].warned = true;
          console.error(
            "(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",
            this._events[type].length
          );
          if (typeof console.trace === "function") {
            console.trace();
          }
        }
      }
      return this;
    };
    EventEmitter2.prototype.on = EventEmitter2.prototype.addListener;
    EventEmitter2.prototype.once = function(type, listener) {
      if (!isFunction(listener))
        throw TypeError("listener must be a function");
      var fired = false;
      function g9() {
        this.removeListener(type, g9);
        if (!fired) {
          fired = true;
          listener.apply(this, arguments);
        }
      }
      g9.listener = listener;
      this.on(type, g9);
      return this;
    };
    EventEmitter2.prototype.removeListener = function(type, listener) {
      var list, position, length, i6;
      if (!isFunction(listener))
        throw TypeError("listener must be a function");
      if (!this._events || !this._events[type])
        return this;
      list = this._events[type];
      length = list.length;
      position = -1;
      if (list === listener || isFunction(list.listener) && list.listener === listener) {
        delete this._events[type];
        if (this._events.removeListener)
          this.emit("removeListener", type, listener);
      } else if (isObject(list)) {
        for (i6 = length; i6-- > 0; ) {
          if (list[i6] === listener || list[i6].listener && list[i6].listener === listener) {
            position = i6;
            break;
          }
        }
        if (position < 0)
          return this;
        if (list.length === 1) {
          list.length = 0;
          delete this._events[type];
        } else {
          list.splice(position, 1);
        }
        if (this._events.removeListener)
          this.emit("removeListener", type, listener);
      }
      return this;
    };
    EventEmitter2.prototype.removeAllListeners = function(type) {
      var key, listeners;
      if (!this._events)
        return this;
      if (!this._events.removeListener) {
        if (arguments.length === 0)
          this._events = {};
        else if (this._events[type])
          delete this._events[type];
        return this;
      }
      if (arguments.length === 0) {
        for (key in this._events) {
          if (key === "removeListener") continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners("removeListener");
        this._events = {};
        return this;
      }
      listeners = this._events[type];
      if (isFunction(listeners)) {
        this.removeListener(type, listeners);
      } else if (listeners) {
        while (listeners.length)
          this.removeListener(type, listeners[listeners.length - 1]);
      }
      delete this._events[type];
      return this;
    };
    EventEmitter2.prototype.listeners = function(type) {
      var ret;
      if (!this._events || !this._events[type])
        ret = [];
      else if (isFunction(this._events[type]))
        ret = [this._events[type]];
      else
        ret = this._events[type].slice();
      return ret;
    };
    EventEmitter2.prototype.listenerCount = function(type) {
      if (this._events) {
        var evlistener = this._events[type];
        if (isFunction(evlistener))
          return 1;
        else if (evlistener)
          return evlistener.length;
      }
      return 0;
    };
    EventEmitter2.listenerCount = function(emitter, type) {
      return emitter.listenerCount(type);
    };
    function isFunction(arg) {
      return typeof arg === "function";
    }
    function isNumber(arg) {
      return typeof arg === "number";
    }
    function isObject(arg) {
      return typeof arg === "object" && arg !== null;
    }
    function isUndefined(arg) {
      return arg === void 0;
    }
  }
});

// node_modules/.pnpm/algoliasearch-helper@3.23.0_algoliasearch@5.19.0/node_modules/algoliasearch-helper/src/functions/inherits.js
var require_inherits = __commonJS({
  "node_modules/.pnpm/algoliasearch-helper@3.23.0_algoliasearch@5.19.0/node_modules/algoliasearch-helper/src/functions/inherits.js"(exports, module) {
    "use strict";
    function inherits(ctor, superCtor) {
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
    }
    module.exports = inherits;
  }
});

// node_modules/.pnpm/algoliasearch-helper@3.23.0_algoliasearch@5.19.0/node_modules/algoliasearch-helper/src/DerivedHelper/index.js
var require_DerivedHelper = __commonJS({
  "node_modules/.pnpm/algoliasearch-helper@3.23.0_algoliasearch@5.19.0/node_modules/algoliasearch-helper/src/DerivedHelper/index.js"(exports, module) {
    "use strict";
    var EventEmitter2 = require_events();
    var inherits = require_inherits();
    function DerivedHelper(mainHelper, fn, recommendFn) {
      this.main = mainHelper;
      this.fn = fn;
      this.recommendFn = recommendFn;
      this.lastResults = null;
      this.lastRecommendResults = null;
    }
    inherits(DerivedHelper, EventEmitter2);
    DerivedHelper.prototype.detach = function() {
      this.removeAllListeners();
      this.main.detachDerivedHelper(this);
    };
    DerivedHelper.prototype.getModifiedState = function(parameters) {
      return this.fn(parameters);
    };
    DerivedHelper.prototype.getModifiedRecommendState = function(parameters) {
      return this.recommendFn(parameters);
    };
    module.exports = DerivedHelper;
  }
});

// node_modules/.pnpm/algoliasearch-helper@3.23.0_algoliasearch@5.19.0/node_modules/algoliasearch-helper/src/functions/escapeFacetValue.js
var require_escapeFacetValue = __commonJS({
  "node_modules/.pnpm/algoliasearch-helper@3.23.0_algoliasearch@5.19.0/node_modules/algoliasearch-helper/src/functions/escapeFacetValue.js"(exports, module) {
    "use strict";
    function escapeFacetValue2(value) {
      if (typeof value !== "string") return value;
      return String(value).replace(/^-/, "\\-");
    }
    function unescapeFacetValue2(value) {
      if (typeof value !== "string") return value;
      return value.replace(/^\\-/, "-");
    }
    module.exports = {
      escapeFacetValue: escapeFacetValue2,
      unescapeFacetValue: unescapeFacetValue2
    };
  }
});

// node_modules/.pnpm/algoliasearch-helper@3.23.0_algoliasearch@5.19.0/node_modules/algoliasearch-helper/src/functions/merge.js
var require_merge = __commonJS({
  "node_modules/.pnpm/algoliasearch-helper@3.23.0_algoliasearch@5.19.0/node_modules/algoliasearch-helper/src/functions/merge.js"(exports, module) {
    "use strict";
    function clone(value) {
      if (typeof value === "object" && value !== null) {
        return _merge(Array.isArray(value) ? [] : {}, value);
      }
      return value;
    }
    function isObjectOrArrayOrFunction(value) {
      return typeof value === "function" || Array.isArray(value) || Object.prototype.toString.call(value) === "[object Object]";
    }
    function _merge(target, source) {
      if (target === source) {
        return target;
      }
      for (var key in source) {
        if (!Object.prototype.hasOwnProperty.call(source, key) || key === "__proto__" || key === "constructor") {
          continue;
        }
        var sourceVal = source[key];
        var targetVal = target[key];
        if (typeof targetVal !== "undefined" && typeof sourceVal === "undefined") {
          continue;
        }
        if (isObjectOrArrayOrFunction(targetVal) && isObjectOrArrayOrFunction(sourceVal)) {
          target[key] = _merge(targetVal, sourceVal);
        } else {
          target[key] = clone(sourceVal);
        }
      }
      return target;
    }
    function merge(target) {
      if (!isObjectOrArrayOrFunction(target)) {
        target = {};
      }
      for (var i6 = 1, l4 = arguments.length; i6 < l4; i6++) {
        var source = arguments[i6];
        if (isObjectOrArrayOrFunction(source)) {
          _merge(target, source);
        }
      }
      return target;
    }
    module.exports = merge;
  }
});

// node_modules/.pnpm/algoliasearch-helper@3.23.0_algoliasearch@5.19.0/node_modules/algoliasearch-helper/src/functions/objectHasKeys.js
var require_objectHasKeys = __commonJS({
  "node_modules/.pnpm/algoliasearch-helper@3.23.0_algoliasearch@5.19.0/node_modules/algoliasearch-helper/src/functions/objectHasKeys.js"(exports, module) {
    "use strict";
    function objectHasKeys(obj) {
      return obj && Object.keys(obj).length > 0;
    }
    module.exports = objectHasKeys;
  }
});

// node_modules/.pnpm/algoliasearch-helper@3.23.0_algoliasearch@5.19.0/node_modules/algoliasearch-helper/src/functions/omit.js
var require_omit = __commonJS({
  "node_modules/.pnpm/algoliasearch-helper@3.23.0_algoliasearch@5.19.0/node_modules/algoliasearch-helper/src/functions/omit.js"(exports, module) {
    "use strict";
    function _objectWithoutPropertiesLoose10(source, excluded) {
      if (source === null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key;
      var i6;
      for (i6 = 0; i6 < sourceKeys.length; i6++) {
        key = sourceKeys[i6];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    module.exports = _objectWithoutPropertiesLoose10;
  }
});

// node_modules/.pnpm/algoliasearch-helper@3.23.0_algoliasearch@5.19.0/node_modules/algoliasearch-helper/src/RecommendParameters/index.js
var require_RecommendParameters = __commonJS({
  "node_modules/.pnpm/algoliasearch-helper@3.23.0_algoliasearch@5.19.0/node_modules/algoliasearch-helper/src/RecommendParameters/index.js"(exports, module) {
    "use strict";
    function RecommendParameters(opts) {
      opts = opts || {};
      this.params = opts.params || [];
    }
    RecommendParameters.prototype = {
      constructor: RecommendParameters,
      addParams: function(params) {
        var newParams = this.params.slice();
        newParams.push(params);
        return new RecommendParameters({ params: newParams });
      },
      removeParams: function(id2) {
        return new RecommendParameters({
          params: this.params.filter(function(param) {
            return param.$$id !== id2;
          })
        });
      },
      addFrequentlyBoughtTogether: function(params) {
        return this.addParams(
          Object.assign({}, params, { model: "bought-together" })
        );
      },
      addRelatedProducts: function(params) {
        return this.addParams(
          Object.assign({}, params, { model: "related-products" })
        );
      },
      addTrendingItems: function(params) {
        return this.addParams(
          Object.assign({}, params, { model: "trending-items" })
        );
      },
      addTrendingFacets: function(params) {
        return this.addParams(
          Object.assign({}, params, { model: "trending-facets" })
        );
      },
      addLookingSimilar: function(params) {
        return this.addParams(
          Object.assign({}, params, { model: "looking-similar" })
        );
      },
      _buildQueries: function(indexName, cache) {
        return this.params.filter(function(params) {
          return cache[params.$$id] === void 0;
        }).map(function(params) {
          var query = Object.assign({}, params, {
            indexName,
            // @TODO: remove this if it ever gets handled by the API
            threshold: params.threshold || 0
          });
          delete query.$$id;
          return query;
        });
      }
    };
    module.exports = RecommendParameters;
  }
});

// node_modules/.pnpm/algoliasearch-helper@3.23.0_algoliasearch@5.19.0/node_modules/algoliasearch-helper/src/RecommendResults/index.js
var require_RecommendResults = __commonJS({
  "node_modules/.pnpm/algoliasearch-helper@3.23.0_algoliasearch@5.19.0/node_modules/algoliasearch-helper/src/RecommendResults/index.js"(exports, module) {
    "use strict";
    function RecommendResults(state, results) {
      this._state = state;
      this._rawResults = {};
      var self = this;
      state.params.forEach(function(param) {
        var id2 = param.$$id;
        self[id2] = results[id2];
        self._rawResults[id2] = results[id2];
      });
    }
    RecommendResults.prototype = {
      constructor: RecommendResults
    };
    module.exports = RecommendResults;
  }
});

// node_modules/.pnpm/algoliasearch-helper@3.23.0_algoliasearch@5.19.0/node_modules/algoliasearch-helper/src/requestBuilder.js
var require_requestBuilder = __commonJS({
  "node_modules/.pnpm/algoliasearch-helper@3.23.0_algoliasearch@5.19.0/node_modules/algoliasearch-helper/src/requestBuilder.js"(exports, module) {
    "use strict";
    var merge = require_merge();
    function sortObject(obj) {
      return Object.keys(obj).sort().reduce(function(acc, curr) {
        acc[curr] = obj[curr];
        return acc;
      }, {});
    }
    var requestBuilder = {
      /**
       * Get all the queries to send to the client, those queries can used directly
       * with the Algolia client.
       * @private
       * @param  {string} index The name of the index
       * @param  {SearchParameters} state The state from which to get the queries
       * @return {object[]} The queries
       */
      _getQueries: function getQueries(index3, state) {
        var queries = [];
        queries.push({
          indexName: index3,
          params: requestBuilder._getHitsSearchParams(state)
        });
        state.getRefinedDisjunctiveFacets().forEach(function(refinedFacet) {
          queries.push({
            indexName: index3,
            params: requestBuilder._getDisjunctiveFacetSearchParams(
              state,
              refinedFacet
            )
          });
        });
        state.getRefinedHierarchicalFacets().forEach(function(refinedFacet) {
          var hierarchicalFacet = state.getHierarchicalFacetByName(refinedFacet);
          var currentRefinement = state.getHierarchicalRefinement(refinedFacet);
          var separator = state._getHierarchicalFacetSeparator(hierarchicalFacet);
          if (currentRefinement.length > 0 && currentRefinement[0].split(separator).length > 1) {
            var filtersMap = currentRefinement[0].split(separator).slice(0, -1).reduce(function createFiltersMap(map, segment, level) {
              return map.concat({
                attribute: hierarchicalFacet.attributes[level],
                value: level === 0 ? segment : [map[map.length - 1].value, segment].join(separator)
              });
            }, []);
            filtersMap.forEach(function(filter, level) {
              var params = requestBuilder._getDisjunctiveFacetSearchParams(
                state,
                filter.attribute,
                level === 0
              );
              function hasHierarchicalFacetFilter(value) {
                return hierarchicalFacet.attributes.some(function(attribute) {
                  return attribute === value.split(":")[0];
                });
              }
              var filteredFacetFilters = (params.facetFilters || []).reduce(
                function(acc, facetFilter) {
                  if (Array.isArray(facetFilter)) {
                    var filtered = facetFilter.filter(function(filterValue) {
                      return !hasHierarchicalFacetFilter(filterValue);
                    });
                    if (filtered.length > 0) {
                      acc.push(filtered);
                    }
                  }
                  if (typeof facetFilter === "string" && !hasHierarchicalFacetFilter(facetFilter)) {
                    acc.push(facetFilter);
                  }
                  return acc;
                },
                []
              );
              var parent = filtersMap[level - 1];
              if (level > 0) {
                params.facetFilters = filteredFacetFilters.concat(
                  parent.attribute + ":" + parent.value
                );
              } else if (filteredFacetFilters.length > 0) {
                params.facetFilters = filteredFacetFilters;
              } else {
                delete params.facetFilters;
              }
              queries.push({ indexName: index3, params });
            });
          }
        });
        return queries;
      },
      /**
       * Get all the queries to send to the client, those queries can used directly
       * with the Algolia client.
       * @private
       * @param  {SearchParameters} state The state from which to get the queries
       * @return {object[]} The queries
       */
      _getCompositionQueries: function getQueries(state) {
        return [
          {
            compositionID: state.index,
            requestBody: {
              params: requestBuilder._getCompositionHitsSearchParams(state)
            }
          }
        ];
      },
      /**
       * Build search parameters used to fetch hits
       * @private
       * @param  {SearchParameters} state The state from which to get the queries
       * @return {object.<string, any>} The search parameters for hits
       */
      _getHitsSearchParams: function(state) {
        var facets = state.facets.concat(state.disjunctiveFacets).concat(requestBuilder._getHitsHierarchicalFacetsAttributes(state)).sort();
        var facetFilters = requestBuilder._getFacetFilters(state);
        var numericFilters = requestBuilder._getNumericFilters(state);
        var tagFilters = requestBuilder._getTagFilters(state);
        var additionalParams = {};
        if (facets.length > 0) {
          additionalParams.facets = facets.indexOf("*") > -1 ? ["*"] : facets;
        }
        if (tagFilters.length > 0) {
          additionalParams.tagFilters = tagFilters;
        }
        if (facetFilters.length > 0) {
          additionalParams.facetFilters = facetFilters;
        }
        if (numericFilters.length > 0) {
          additionalParams.numericFilters = numericFilters;
        }
        return sortObject(merge({}, state.getQueryParams(), additionalParams));
      },
      /**
       * Build search parameters used to fetch hits
       * @private
       * @param  {SearchParameters} state The state from which to get the queries
       * @return {object.<string, any>} The search parameters for hits
       */
      _getCompositionHitsSearchParams: function(state) {
        var facets = state.facets.concat(
          state.disjunctiveFacets.map(function(value) {
            return "disjunctive(" + value + ")";
          })
        ).concat(requestBuilder._getHitsHierarchicalFacetsAttributes(state)).sort();
        var facetFilters = requestBuilder._getFacetFilters(state);
        var numericFilters = requestBuilder._getNumericFilters(state);
        var tagFilters = requestBuilder._getTagFilters(state);
        var additionalParams = {};
        if (facets.length > 0) {
          additionalParams.facets = facets.indexOf("*") > -1 ? ["*"] : facets;
        }
        if (tagFilters.length > 0) {
          additionalParams.tagFilters = tagFilters;
        }
        if (facetFilters.length > 0) {
          additionalParams.facetFilters = facetFilters;
        }
        if (numericFilters.length > 0) {
          additionalParams.numericFilters = numericFilters;
        }
        var params = state.getQueryParams();
        delete params.highlightPreTag;
        delete params.highlightPostTag;
        delete params.index;
        return sortObject(merge({}, params, additionalParams));
      },
      /**
       * Build search parameters used to fetch a disjunctive facet
       * @private
       * @param  {SearchParameters} state The state from which to get the queries
       * @param  {string} facet the associated facet name
       * @param  {boolean} hierarchicalRootLevel ?? FIXME
       * @return {object} The search parameters for a disjunctive facet
       */
      _getDisjunctiveFacetSearchParams: function(state, facet, hierarchicalRootLevel) {
        var facetFilters = requestBuilder._getFacetFilters(
          state,
          facet,
          hierarchicalRootLevel
        );
        var numericFilters = requestBuilder._getNumericFilters(state, facet);
        var tagFilters = requestBuilder._getTagFilters(state);
        var additionalParams = {
          hitsPerPage: 0,
          page: 0,
          analytics: false,
          clickAnalytics: false
        };
        if (tagFilters.length > 0) {
          additionalParams.tagFilters = tagFilters;
        }
        var hierarchicalFacet = state.getHierarchicalFacetByName(facet);
        if (hierarchicalFacet) {
          additionalParams.facets = requestBuilder._getDisjunctiveHierarchicalFacetAttribute(
            state,
            hierarchicalFacet,
            hierarchicalRootLevel
          );
        } else {
          additionalParams.facets = facet;
        }
        if (numericFilters.length > 0) {
          additionalParams.numericFilters = numericFilters;
        }
        if (facetFilters.length > 0) {
          additionalParams.facetFilters = facetFilters;
        }
        return sortObject(merge({}, state.getQueryParams(), additionalParams));
      },
      /**
       * Return the numeric filters in an algolia request fashion
       * @private
       * @param {SearchParameters} state the state from which to get the filters
       * @param {string} [facetName] the name of the attribute for which the filters should be excluded
       * @return {string[]} the numeric filters in the algolia format
       */
      _getNumericFilters: function(state, facetName) {
        if (state.numericFilters) {
          return state.numericFilters;
        }
        var numericFilters = [];
        Object.keys(state.numericRefinements).forEach(function(attribute) {
          var operators = state.numericRefinements[attribute] || {};
          Object.keys(operators).forEach(function(operator) {
            var values = operators[operator] || [];
            if (facetName !== attribute) {
              values.forEach(function(value) {
                if (Array.isArray(value)) {
                  var vs = value.map(function(v6) {
                    return attribute + operator + v6;
                  });
                  numericFilters.push(vs);
                } else {
                  numericFilters.push(attribute + operator + value);
                }
              });
            }
          });
        });
        return numericFilters;
      },
      /**
       * Return the tags filters depending on which format is used, either tagFilters or tagRefinements
       * @private
       * @param {SearchParameters} state the state from which to get the filters
       * @return {string} Tag filters in a single string
       */
      _getTagFilters: function(state) {
        if (state.tagFilters) {
          return state.tagFilters;
        }
        return state.tagRefinements.join(",");
      },
      /**
       * Build facetFilters parameter based on current refinements. The array returned
       * contains strings representing the facet filters in the algolia format.
       * @private
       * @param  {SearchParameters} state The state from which to get the queries
       * @param  {string} [facet] if set, the current disjunctive facet
       * @param  {boolean} [hierarchicalRootLevel] ?? FIXME
       * @return {array.<string>} The facet filters in the algolia format
       */
      _getFacetFilters: function(state, facet, hierarchicalRootLevel) {
        var facetFilters = [];
        var facetsRefinements = state.facetsRefinements || {};
        Object.keys(facetsRefinements).sort().forEach(function(facetName) {
          var facetValues = facetsRefinements[facetName] || [];
          facetValues.slice().sort().forEach(function(facetValue) {
            facetFilters.push(facetName + ":" + facetValue);
          });
        });
        var facetsExcludes = state.facetsExcludes || {};
        Object.keys(facetsExcludes).sort().forEach(function(facetName) {
          var facetValues = facetsExcludes[facetName] || [];
          facetValues.sort().forEach(function(facetValue) {
            facetFilters.push(facetName + ":-" + facetValue);
          });
        });
        var disjunctiveFacetsRefinements = state.disjunctiveFacetsRefinements || {};
        Object.keys(disjunctiveFacetsRefinements).sort().forEach(function(facetName) {
          var facetValues = disjunctiveFacetsRefinements[facetName] || [];
          if (facetName === facet || !facetValues || facetValues.length === 0) {
            return;
          }
          var orFilters = [];
          facetValues.slice().sort().forEach(function(facetValue) {
            orFilters.push(facetName + ":" + facetValue);
          });
          facetFilters.push(orFilters);
        });
        var hierarchicalFacetsRefinements = state.hierarchicalFacetsRefinements || {};
        Object.keys(hierarchicalFacetsRefinements).sort().forEach(function(facetName) {
          var facetValues = hierarchicalFacetsRefinements[facetName] || [];
          var facetValue = facetValues[0];
          if (facetValue === void 0) {
            return;
          }
          var hierarchicalFacet = state.getHierarchicalFacetByName(facetName);
          var separator = state._getHierarchicalFacetSeparator(hierarchicalFacet);
          var rootPath = state._getHierarchicalRootPath(hierarchicalFacet);
          var attributeToRefine;
          var attributesIndex;
          if (facet === facetName) {
            if (facetValue.indexOf(separator) === -1 || !rootPath && hierarchicalRootLevel === true || rootPath && rootPath.split(separator).length === facetValue.split(separator).length) {
              return;
            }
            if (!rootPath) {
              attributesIndex = facetValue.split(separator).length - 2;
              facetValue = facetValue.slice(0, facetValue.lastIndexOf(separator));
            } else {
              attributesIndex = rootPath.split(separator).length - 1;
              facetValue = rootPath;
            }
            attributeToRefine = hierarchicalFacet.attributes[attributesIndex];
          } else {
            attributesIndex = facetValue.split(separator).length - 1;
            attributeToRefine = hierarchicalFacet.attributes[attributesIndex];
          }
          if (attributeToRefine) {
            facetFilters.push([attributeToRefine + ":" + facetValue]);
          }
        });
        return facetFilters;
      },
      _getHitsHierarchicalFacetsAttributes: function(state) {
        var out = [];
        return state.hierarchicalFacets.reduce(
          // ask for as much levels as there's hierarchical refinements
          function getHitsAttributesForHierarchicalFacet(allAttributes, hierarchicalFacet) {
            var hierarchicalRefinement = state.getHierarchicalRefinement(
              hierarchicalFacet.name
            )[0];
            if (!hierarchicalRefinement) {
              allAttributes.push(hierarchicalFacet.attributes[0]);
              return allAttributes;
            }
            var separator = state._getHierarchicalFacetSeparator(hierarchicalFacet);
            var level = hierarchicalRefinement.split(separator).length;
            var newAttributes = hierarchicalFacet.attributes.slice(0, level + 1);
            return allAttributes.concat(newAttributes);
          },
          out
        );
      },
      _getDisjunctiveHierarchicalFacetAttribute: function(state, hierarchicalFacet, rootLevel) {
        var separator = state._getHierarchicalFacetSeparator(hierarchicalFacet);
        if (rootLevel === true) {
          var rootPath = state._getHierarchicalRootPath(hierarchicalFacet);
          var attributeIndex = 0;
          if (rootPath) {
            attributeIndex = rootPath.split(separator).length;
          }
          return [hierarchicalFacet.attributes[attributeIndex]];
        }
        var hierarchicalRefinement = state.getHierarchicalRefinement(hierarchicalFacet.name)[0] || "";
        var parentLevel = hierarchicalRefinement.split(separator).length - 1;
        return hierarchicalFacet.attributes.slice(0, parentLevel + 1);
      },
      getSearchForFacetQuery: function(facetName, query, maxFacetHits, state) {
        var stateForSearchForFacetValues = state.isDisjunctiveFacet(facetName) ? state.clearRefinements(facetName) : state;
        var searchForFacetSearchParameters = {
          facetQuery: query,
          facetName
        };
        if (typeof maxFacetHits === "number") {
          searchForFacetSearchParameters.maxFacetHits = maxFacetHits;
        }
        return sortObject(
          merge(
            {},
            requestBuilder._getHitsSearchParams(stateForSearchForFacetValues),
            searchForFacetSearchParameters
          )
        );
      }
    };
    module.exports = requestBuilder;
  }
});

// node_modules/.pnpm/algoliasearch-helper@3.23.0_algoliasearch@5.19.0/node_modules/algoliasearch-helper/src/functions/defaultsPure.js
var require_defaultsPure = __commonJS({
  "node_modules/.pnpm/algoliasearch-helper@3.23.0_algoliasearch@5.19.0/node_modules/algoliasearch-helper/src/functions/defaultsPure.js"(exports, module) {
    "use strict";
    module.exports = function defaultsPure() {
      var sources = Array.prototype.slice.call(arguments);
      return sources.reduceRight(function(acc, source) {
        Object.keys(Object(source)).forEach(function(key) {
          if (source[key] === void 0) {
            return;
          }
          if (acc[key] !== void 0) {
            delete acc[key];
          }
          acc[key] = source[key];
        });
        return acc;
      }, {});
    };
  }
});

// node_modules/.pnpm/algoliasearch-helper@3.23.0_algoliasearch@5.19.0/node_modules/algoliasearch-helper/src/functions/find.js
var require_find = __commonJS({
  "node_modules/.pnpm/algoliasearch-helper@3.23.0_algoliasearch@5.19.0/node_modules/algoliasearch-helper/src/functions/find.js"(exports, module) {
    "use strict";
    module.exports = function find2(array, comparator) {
      if (!Array.isArray(array)) {
        return void 0;
      }
      for (var i6 = 0; i6 < array.length; i6++) {
        if (comparator(array[i6])) {
          return array[i6];
        }
      }
      return void 0;
    };
  }
});

// node_modules/.pnpm/algoliasearch-helper@3.23.0_algoliasearch@5.19.0/node_modules/algoliasearch-helper/src/functions/intersection.js
var require_intersection = __commonJS({
  "node_modules/.pnpm/algoliasearch-helper@3.23.0_algoliasearch@5.19.0/node_modules/algoliasearch-helper/src/functions/intersection.js"(exports, module) {
    "use strict";
    function intersection(arr1, arr2) {
      return arr1.filter(function(value, index3) {
        return arr2.indexOf(value) > -1 && arr1.indexOf(value) === index3;
      });
    }
    module.exports = intersection;
  }
});

// node_modules/.pnpm/algoliasearch-helper@3.23.0_algoliasearch@5.19.0/node_modules/algoliasearch-helper/src/functions/valToNumber.js
var require_valToNumber = __commonJS({
  "node_modules/.pnpm/algoliasearch-helper@3.23.0_algoliasearch@5.19.0/node_modules/algoliasearch-helper/src/functions/valToNumber.js"(exports, module) {
    "use strict";
    function valToNumber(v6) {
      if (typeof v6 === "number") {
        return v6;
      } else if (typeof v6 === "string") {
        return parseFloat(v6);
      } else if (Array.isArray(v6)) {
        return v6.map(valToNumber);
      }
      throw new Error(
        "The value should be a number, a parsable string or an array of those."
      );
    }
    module.exports = valToNumber;
  }
});

// node_modules/.pnpm/algoliasearch-helper@3.23.0_algoliasearch@5.19.0/node_modules/algoliasearch-helper/src/utils/isValidUserToken.js
var require_isValidUserToken = __commonJS({
  "node_modules/.pnpm/algoliasearch-helper@3.23.0_algoliasearch@5.19.0/node_modules/algoliasearch-helper/src/utils/isValidUserToken.js"(exports, module) {
    "use strict";
    module.exports = function isValidUserToken(userToken) {
      if (userToken === null) {
        return false;
      }
      return /^[a-zA-Z0-9_-]{1,64}$/.test(userToken);
    };
  }
});

// node_modules/.pnpm/algoliasearch-helper@3.23.0_algoliasearch@5.19.0/node_modules/algoliasearch-helper/src/SearchParameters/RefinementList.js
var require_RefinementList = __commonJS({
  "node_modules/.pnpm/algoliasearch-helper@3.23.0_algoliasearch@5.19.0/node_modules/algoliasearch-helper/src/SearchParameters/RefinementList.js"(exports, module) {
    "use strict";
    var defaultsPure = require_defaultsPure();
    var objectHasKeys = require_objectHasKeys();
    var omit = require_omit();
    var lib = {
      /**
       * Adds a refinement to a RefinementList
       * @param {RefinementList} refinementList the initial list
       * @param {string} attribute the attribute to refine
       * @param {string} value the value of the refinement, if the value is not a string it will be converted
       * @return {RefinementList} a new and updated refinement list
       */
      addRefinement: function addRefinement(refinementList, attribute, value) {
        if (lib.isRefined(refinementList, attribute, value)) {
          return refinementList;
        }
        var valueAsString = "" + value;
        var facetRefinement = !refinementList[attribute] ? [valueAsString] : refinementList[attribute].concat(valueAsString);
        var mod = {};
        mod[attribute] = facetRefinement;
        return defaultsPure(mod, refinementList);
      },
      /**
       * Removes refinement(s) for an attribute:
       *  - if the value is specified removes the refinement for the value on the attribute
       *  - if no value is specified removes all the refinements for this attribute
       * @param {RefinementList} refinementList the initial list
       * @param {string} attribute the attribute to refine
       * @param {string} [value] the value of the refinement
       * @return {RefinementList} a new and updated refinement lst
       */
      removeRefinement: function removeRefinement(refinementList, attribute, value) {
        if (value === void 0) {
          return lib.clearRefinement(refinementList, function(v6, f12) {
            return attribute === f12;
          });
        }
        var valueAsString = "" + value;
        return lib.clearRefinement(refinementList, function(v6, f12) {
          return attribute === f12 && valueAsString === v6;
        });
      },
      /**
       * Toggles the refinement value for an attribute.
       * @param {RefinementList} refinementList the initial list
       * @param {string} attribute the attribute to refine
       * @param {string} value the value of the refinement
       * @return {RefinementList} a new and updated list
       */
      toggleRefinement: function toggleRefinement(refinementList, attribute, value) {
        if (value === void 0)
          throw new Error("toggleRefinement should be used with a value");
        if (lib.isRefined(refinementList, attribute, value)) {
          return lib.removeRefinement(refinementList, attribute, value);
        }
        return lib.addRefinement(refinementList, attribute, value);
      },
      /**
       * Clear all or parts of a RefinementList. Depending on the arguments, three
       * kinds of behavior can happen:
       *  - if no attribute is provided: clears the whole list
       *  - if an attribute is provided as a string: clears the list for the specific attribute
       *  - if an attribute is provided as a function: discards the elements for which the function returns true
       * @param {RefinementList} refinementList the initial list
       * @param {string} [attribute] the attribute or function to discard
       * @param {string} [refinementType] optional parameter to give more context to the attribute function
       * @return {RefinementList} a new and updated refinement list
       */
      clearRefinement: function clearRefinement2(refinementList, attribute, refinementType) {
        if (attribute === void 0) {
          if (!objectHasKeys(refinementList)) {
            return refinementList;
          }
          return {};
        } else if (typeof attribute === "string") {
          return omit(refinementList, [attribute]);
        } else if (typeof attribute === "function") {
          var hasChanged = false;
          var newRefinementList = Object.keys(refinementList).reduce(
            function(memo, key) {
              var values = refinementList[key] || [];
              var facetList = values.filter(function(value) {
                return !attribute(value, key, refinementType);
              });
              if (facetList.length !== values.length) {
                hasChanged = true;
              }
              memo[key] = facetList;
              return memo;
            },
            {}
          );
          if (hasChanged) return newRefinementList;
          return refinementList;
        }
        return void 0;
      },
      /**
       * Test if the refinement value is used for the attribute. If no refinement value
       * is provided, test if the refinementList contains any refinement for the
       * given attribute.
       * @param {RefinementList} refinementList the list of refinement
       * @param {string} attribute name of the attribute
       * @param {string} [refinementValue] value of the filter/refinement
       * @return {boolean} true if the attribute is refined, false otherwise
       */
      isRefined: function isRefined2(refinementList, attribute, refinementValue) {
        var containsRefinements = Boolean(refinementList[attribute]) && refinementList[attribute].length > 0;
        if (refinementValue === void 0 || !containsRefinements) {
          return containsRefinements;
        }
        var refinementValueAsString = "" + refinementValue;
        return refinementList[attribute].indexOf(refinementValueAsString) !== -1;
      }
    };
    module.exports = lib;
  }
});

// node_modules/.pnpm/algoliasearch-helper@3.23.0_algoliasearch@5.19.0/node_modules/algoliasearch-helper/src/SearchParameters/index.js
var require_SearchParameters = __commonJS({
  "node_modules/.pnpm/algoliasearch-helper@3.23.0_algoliasearch@5.19.0/node_modules/algoliasearch-helper/src/SearchParameters/index.js"(exports, module) {
    "use strict";
    var defaultsPure = require_defaultsPure();
    var find2 = require_find();
    var intersection = require_intersection();
    var merge = require_merge();
    var objectHasKeys = require_objectHasKeys();
    var omit = require_omit();
    var valToNumber = require_valToNumber();
    var isValidUserToken = require_isValidUserToken();
    var RefinementList = require_RefinementList();
    function isEqualNumericRefinement(a6, b3) {
      if (Array.isArray(a6) && Array.isArray(b3)) {
        return a6.length === b3.length && a6.every(function(el, i6) {
          return isEqualNumericRefinement(b3[i6], el);
        });
      }
      return a6 === b3;
    }
    function findArray(array, searchedValue) {
      return find2(array, function(currentValue) {
        return isEqualNumericRefinement(currentValue, searchedValue);
      });
    }
    function SearchParameters(newParameters) {
      var params = newParameters ? SearchParameters._parseNumbers(newParameters) : {};
      if (params.userToken !== void 0 && !isValidUserToken(params.userToken)) {
        console.warn(
          "[algoliasearch-helper] The `userToken` parameter is invalid. This can lead to wrong analytics.\n  - Format: [a-zA-Z0-9_-]{1,64}"
        );
      }
      this.facets = params.facets || [];
      this.disjunctiveFacets = params.disjunctiveFacets || [];
      this.hierarchicalFacets = params.hierarchicalFacets || [];
      this.facetsRefinements = params.facetsRefinements || {};
      this.facetsExcludes = params.facetsExcludes || {};
      this.disjunctiveFacetsRefinements = params.disjunctiveFacetsRefinements || {};
      this.numericRefinements = params.numericRefinements || {};
      this.tagRefinements = params.tagRefinements || [];
      this.hierarchicalFacetsRefinements = params.hierarchicalFacetsRefinements || {};
      var self = this;
      Object.keys(params).forEach(function(paramName) {
        var isKeyKnown = SearchParameters.PARAMETERS.indexOf(paramName) !== -1;
        var isValueDefined = params[paramName] !== void 0;
        if (!isKeyKnown && isValueDefined) {
          self[paramName] = params[paramName];
        }
      });
    }
    SearchParameters.PARAMETERS = Object.keys(new SearchParameters());
    SearchParameters._parseNumbers = function(partialState) {
      if (partialState instanceof SearchParameters) return partialState;
      var numbers = {};
      var numberKeys = [
        "aroundPrecision",
        "aroundRadius",
        "getRankingInfo",
        "minWordSizefor2Typos",
        "minWordSizefor1Typo",
        "page",
        "maxValuesPerFacet",
        "distinct",
        "minimumAroundRadius",
        "hitsPerPage",
        "minProximity"
      ];
      numberKeys.forEach(function(k5) {
        var value = partialState[k5];
        if (typeof value === "string") {
          var parsedValue = parseFloat(value);
          numbers[k5] = isNaN(parsedValue) ? value : parsedValue;
        }
      });
      if (Array.isArray(partialState.insideBoundingBox)) {
        numbers.insideBoundingBox = partialState.insideBoundingBox.map(function(geoRect) {
          if (Array.isArray(geoRect)) {
            return geoRect.map(function(value) {
              return parseFloat(value);
            });
          }
          return geoRect;
        });
      }
      if (partialState.numericRefinements) {
        var numericRefinements = {};
        Object.keys(partialState.numericRefinements).forEach(function(attribute) {
          var operators = partialState.numericRefinements[attribute] || {};
          numericRefinements[attribute] = {};
          Object.keys(operators).forEach(function(operator) {
            var values = operators[operator];
            var parsedValues = values.map(function(v6) {
              if (Array.isArray(v6)) {
                return v6.map(function(vPrime) {
                  if (typeof vPrime === "string") {
                    return parseFloat(vPrime);
                  }
                  return vPrime;
                });
              } else if (typeof v6 === "string") {
                return parseFloat(v6);
              }
              return v6;
            });
            numericRefinements[attribute][operator] = parsedValues;
          });
        });
        numbers.numericRefinements = numericRefinements;
      }
      return merge(partialState, numbers);
    };
    SearchParameters.make = function makeSearchParameters(newParameters) {
      var instance = new SearchParameters(newParameters);
      var hierarchicalFacets = newParameters.hierarchicalFacets || [];
      hierarchicalFacets.forEach(function(facet) {
        if (facet.rootPath) {
          var currentRefinement = instance.getHierarchicalRefinement(facet.name);
          if (currentRefinement.length > 0 && currentRefinement[0].indexOf(facet.rootPath) !== 0) {
            instance = instance.clearRefinements(facet.name);
          }
          currentRefinement = instance.getHierarchicalRefinement(facet.name);
          if (currentRefinement.length === 0) {
            instance = instance.toggleHierarchicalFacetRefinement(
              facet.name,
              facet.rootPath
            );
          }
        }
      });
      return instance;
    };
    SearchParameters.validate = function(currentState, parameters) {
      var params = parameters || {};
      if (currentState.tagFilters && params.tagRefinements && params.tagRefinements.length > 0) {
        return new Error(
          "[Tags] Cannot switch from the managed tag API to the advanced API. It is probably an error, if it is really what you want, you should first clear the tags with clearTags method."
        );
      }
      if (currentState.tagRefinements.length > 0 && params.tagFilters) {
        return new Error(
          "[Tags] Cannot switch from the advanced tag API to the managed API. It is probably an error, if it is not, you should first clear the tags with clearTags method."
        );
      }
      if (currentState.numericFilters && params.numericRefinements && objectHasKeys(params.numericRefinements)) {
        return new Error(
          "[Numeric filters] Can't switch from the advanced to the managed API. It is probably an error, if this is really what you want, you have to first clear the numeric filters."
        );
      }
      if (objectHasKeys(currentState.numericRefinements) && params.numericFilters) {
        return new Error(
          "[Numeric filters] Can't switch from the managed API to the advanced. It is probably an error, if this is really what you want, you have to first clear the numeric filters."
        );
      }
      return null;
    };
    SearchParameters.prototype = {
      constructor: SearchParameters,
      /**
       * Remove all refinements (disjunctive + conjunctive + excludes + numeric filters)
       * @method
       * @param {undefined|string|SearchParameters.clearCallback} [attribute] optional string or function
       * - If not given, means to clear all the filters.
       * - If `string`, means to clear all refinements for the `attribute` named filter.
       * - If `function`, means to clear all the refinements that return truthy values.
       * @return {SearchParameters} new instance with filters cleared
       */
      clearRefinements: function clearRefinements2(attribute) {
        var patch = {
          numericRefinements: this._clearNumericRefinements(attribute),
          facetsRefinements: RefinementList.clearRefinement(
            this.facetsRefinements,
            attribute,
            "conjunctiveFacet"
          ),
          facetsExcludes: RefinementList.clearRefinement(
            this.facetsExcludes,
            attribute,
            "exclude"
          ),
          disjunctiveFacetsRefinements: RefinementList.clearRefinement(
            this.disjunctiveFacetsRefinements,
            attribute,
            "disjunctiveFacet"
          ),
          hierarchicalFacetsRefinements: RefinementList.clearRefinement(
            this.hierarchicalFacetsRefinements,
            attribute,
            "hierarchicalFacet"
          )
        };
        if (patch.numericRefinements === this.numericRefinements && patch.facetsRefinements === this.facetsRefinements && patch.facetsExcludes === this.facetsExcludes && patch.disjunctiveFacetsRefinements === this.disjunctiveFacetsRefinements && patch.hierarchicalFacetsRefinements === this.hierarchicalFacetsRefinements) {
          return this;
        }
        return this.setQueryParameters(patch);
      },
      /**
       * Remove all the refined tags from the SearchParameters
       * @method
       * @return {SearchParameters} new instance with tags cleared
       */
      clearTags: function clearTags() {
        if (this.tagFilters === void 0 && this.tagRefinements.length === 0)
          return this;
        return this.setQueryParameters({
          tagFilters: void 0,
          tagRefinements: []
        });
      },
      /**
       * Set the index.
       * @method
       * @param {string} index the index name
       * @return {SearchParameters} new instance
       */
      setIndex: function setIndex(index3) {
        if (index3 === this.index) return this;
        return this.setQueryParameters({
          index: index3
        });
      },
      /**
       * Query setter
       * @method
       * @param {string} newQuery value for the new query
       * @return {SearchParameters} new instance
       */
      setQuery: function setQuery(newQuery) {
        if (newQuery === this.query) return this;
        return this.setQueryParameters({
          query: newQuery
        });
      },
      /**
       * Page setter
       * @method
       * @param {number} newPage new page number
       * @return {SearchParameters} new instance
       */
      setPage: function setPage(newPage) {
        if (newPage === this.page) return this;
        return this.setQueryParameters({
          page: newPage
        });
      },
      /**
       * Facets setter
       * The facets are the simple facets, used for conjunctive (and) faceting.
       * @method
       * @param {string[]} facets all the attributes of the algolia records used for conjunctive faceting
       * @return {SearchParameters} new instance
       */
      setFacets: function setFacets(facets) {
        return this.setQueryParameters({
          facets
        });
      },
      /**
       * Disjunctive facets setter
       * Change the list of disjunctive (or) facets the helper chan handle.
       * @method
       * @param {string[]} facets all the attributes of the algolia records used for disjunctive faceting
       * @return {SearchParameters} new instance
       */
      setDisjunctiveFacets: function setDisjunctiveFacets(facets) {
        return this.setQueryParameters({
          disjunctiveFacets: facets
        });
      },
      /**
       * HitsPerPage setter
       * Hits per page represents the number of hits retrieved for this query
       * @method
       * @param {number} n number of hits retrieved per page of results
       * @return {SearchParameters} new instance
       */
      setHitsPerPage: function setHitsPerPage(n6) {
        if (this.hitsPerPage === n6) return this;
        return this.setQueryParameters({
          hitsPerPage: n6
        });
      },
      /**
       * typoTolerance setter
       * Set the value of typoTolerance
       * @method
       * @param {string} typoTolerance new value of typoTolerance ("true", "false", "min" or "strict")
       * @return {SearchParameters} new instance
       */
      setTypoTolerance: function setTypoTolerance(typoTolerance) {
        if (this.typoTolerance === typoTolerance) return this;
        return this.setQueryParameters({
          typoTolerance
        });
      },
      /**
       * Add a numeric filter for a given attribute
       * When value is an array, they are combined with OR
       * When value is a single value, it will combined with AND
       * @method
       * @param {string} attribute attribute to set the filter on
       * @param {string} operator operator of the filter (possible values: =, >, >=, <, <=, !=)
       * @param {number | number[]} value value of the filter
       * @return {SearchParameters} new instance
       * @example
       * // for price = 50 or 40
       * state.addNumericRefinement('price', '=', [50, 40]);
       * @example
       * // for size = 38 and 40
       * state.addNumericRefinement('size', '=', 38);
       * state.addNumericRefinement('size', '=', 40);
       */
      addNumericRefinement: function(attribute, operator, value) {
        var val = valToNumber(value);
        if (this.isNumericRefined(attribute, operator, val)) return this;
        var mod = merge({}, this.numericRefinements);
        mod[attribute] = merge({}, mod[attribute]);
        if (mod[attribute][operator]) {
          mod[attribute][operator] = mod[attribute][operator].slice();
          mod[attribute][operator].push(val);
        } else {
          mod[attribute][operator] = [val];
        }
        return this.setQueryParameters({
          numericRefinements: mod
        });
      },
      /**
       * Get the list of conjunctive refinements for a single facet
       * @param {string} facetName name of the attribute used for faceting
       * @return {string[]} list of refinements
       */
      getConjunctiveRefinements: function(facetName) {
        if (!this.isConjunctiveFacet(facetName)) {
          return [];
        }
        return this.facetsRefinements[facetName] || [];
      },
      /**
       * Get the list of disjunctive refinements for a single facet
       * @param {string} facetName name of the attribute used for faceting
       * @return {string[]} list of refinements
       */
      getDisjunctiveRefinements: function(facetName) {
        if (!this.isDisjunctiveFacet(facetName)) {
          return [];
        }
        return this.disjunctiveFacetsRefinements[facetName] || [];
      },
      /**
       * Get the list of hierarchical refinements for a single facet
       * @param {string} facetName name of the attribute used for faceting
       * @return {string[]} list of refinements
       */
      getHierarchicalRefinement: function(facetName) {
        return this.hierarchicalFacetsRefinements[facetName] || [];
      },
      /**
       * Get the list of exclude refinements for a single facet
       * @param {string} facetName name of the attribute used for faceting
       * @return {string[]} list of refinements
       */
      getExcludeRefinements: function(facetName) {
        if (!this.isConjunctiveFacet(facetName)) {
          return [];
        }
        return this.facetsExcludes[facetName] || [];
      },
      /**
       * Remove all the numeric filter for a given (attribute, operator)
       * @method
       * @param {string} attribute attribute to set the filter on
       * @param {string} [operator] operator of the filter (possible values: =, >, >=, <, <=, !=)
       * @param {number} [number] the value to be removed
       * @return {SearchParameters} new instance
       */
      removeNumericRefinement: function(attribute, operator, number) {
        var paramValue = number;
        if (paramValue !== void 0) {
          if (!this.isNumericRefined(attribute, operator, paramValue)) {
            return this;
          }
          return this.setQueryParameters({
            numericRefinements: this._clearNumericRefinements(function(value, key) {
              return key === attribute && value.op === operator && isEqualNumericRefinement(value.val, valToNumber(paramValue));
            })
          });
        } else if (operator !== void 0) {
          if (!this.isNumericRefined(attribute, operator)) return this;
          return this.setQueryParameters({
            numericRefinements: this._clearNumericRefinements(function(value, key) {
              return key === attribute && value.op === operator;
            })
          });
        }
        if (!this.isNumericRefined(attribute)) return this;
        return this.setQueryParameters({
          numericRefinements: this._clearNumericRefinements(function(value, key) {
            return key === attribute;
          })
        });
      },
      /**
       * Get the list of numeric refinements for a single facet
       * @param {string} facetName name of the attribute used for faceting
       * @return {SearchParameters.OperatorList} list of refinements
       */
      getNumericRefinements: function(facetName) {
        return this.numericRefinements[facetName] || {};
      },
      /**
       * Return the current refinement for the (attribute, operator)
       * @param {string} attribute attribute in the record
       * @param {string} operator operator applied on the refined values
       * @return {Array.<number|number[]>} refined values
       */
      getNumericRefinement: function(attribute, operator) {
        return this.numericRefinements[attribute] && this.numericRefinements[attribute][operator];
      },
      /**
       * Clear numeric filters.
       * @method
       * @private
       * @param {string|SearchParameters.clearCallback} [attribute] optional string or function
       * - If not given, means to clear all the filters.
       * - If `string`, means to clear all refinements for the `attribute` named filter.
       * - If `function`, means to clear all the refinements that return truthy values.
       * @return {Object.<string, OperatorList>} new numeric refinements
       */
      _clearNumericRefinements: function _clearNumericRefinements(attribute) {
        if (attribute === void 0) {
          if (!objectHasKeys(this.numericRefinements)) {
            return this.numericRefinements;
          }
          return {};
        } else if (typeof attribute === "string") {
          return omit(this.numericRefinements, [attribute]);
        } else if (typeof attribute === "function") {
          var hasChanged = false;
          var numericRefinements = this.numericRefinements;
          var newNumericRefinements = Object.keys(numericRefinements).reduce(
            function(memo, key) {
              var operators = numericRefinements[key];
              var operatorList = {};
              operators = operators || {};
              Object.keys(operators).forEach(function(operator) {
                var values = operators[operator] || [];
                var outValues = [];
                values.forEach(function(value) {
                  var predicateResult = attribute(
                    { val: value, op: operator },
                    key,
                    "numeric"
                  );
                  if (!predicateResult) outValues.push(value);
                });
                if (outValues.length !== values.length) {
                  hasChanged = true;
                }
                operatorList[operator] = outValues;
              });
              memo[key] = operatorList;
              return memo;
            },
            {}
          );
          if (hasChanged) return newNumericRefinements;
          return this.numericRefinements;
        }
        return void 0;
      },
      /**
       * Add a facet to the facets attribute of the helper configuration, if it
       * isn't already present.
       * @method
       * @param {string} facet facet name to add
       * @return {SearchParameters} new instance
       */
      addFacet: function addFacet(facet) {
        if (this.isConjunctiveFacet(facet)) {
          return this;
        }
        return this.setQueryParameters({
          facets: this.facets.concat([facet])
        });
      },
      /**
       * Add a disjunctive facet to the disjunctiveFacets attribute of the helper
       * configuration, if it isn't already present.
       * @method
       * @param {string} facet disjunctive facet name to add
       * @return {SearchParameters} new instance
       */
      addDisjunctiveFacet: function addDisjunctiveFacet(facet) {
        if (this.isDisjunctiveFacet(facet)) {
          return this;
        }
        return this.setQueryParameters({
          disjunctiveFacets: this.disjunctiveFacets.concat([facet])
        });
      },
      /**
       * Add a hierarchical facet to the hierarchicalFacets attribute of the helper
       * configuration.
       * @method
       * @param {object} hierarchicalFacet hierarchical facet to add
       * @return {SearchParameters} new instance
       * @throws will throw an error if a hierarchical facet with the same name was already declared
       */
      addHierarchicalFacet: function addHierarchicalFacet(hierarchicalFacet) {
        if (this.isHierarchicalFacet(hierarchicalFacet.name)) {
          throw new Error(
            "Cannot declare two hierarchical facets with the same name: `" + hierarchicalFacet.name + "`"
          );
        }
        return this.setQueryParameters({
          hierarchicalFacets: this.hierarchicalFacets.concat([hierarchicalFacet])
        });
      },
      /**
       * Add a refinement on a "normal" facet
       * @method
       * @param {string} facet attribute to apply the faceting on
       * @param {string} value value of the attribute (will be converted to string)
       * @return {SearchParameters} new instance
       */
      addFacetRefinement: function addFacetRefinement(facet, value) {
        if (!this.isConjunctiveFacet(facet)) {
          throw new Error(
            facet + " is not defined in the facets attribute of the helper configuration"
          );
        }
        if (RefinementList.isRefined(this.facetsRefinements, facet, value))
          return this;
        return this.setQueryParameters({
          facetsRefinements: RefinementList.addRefinement(
            this.facetsRefinements,
            facet,
            value
          )
        });
      },
      /**
       * Exclude a value from a "normal" facet
       * @method
       * @param {string} facet attribute to apply the exclusion on
       * @param {string} value value of the attribute (will be converted to string)
       * @return {SearchParameters} new instance
       */
      addExcludeRefinement: function addExcludeRefinement(facet, value) {
        if (!this.isConjunctiveFacet(facet)) {
          throw new Error(
            facet + " is not defined in the facets attribute of the helper configuration"
          );
        }
        if (RefinementList.isRefined(this.facetsExcludes, facet, value))
          return this;
        return this.setQueryParameters({
          facetsExcludes: RefinementList.addRefinement(
            this.facetsExcludes,
            facet,
            value
          )
        });
      },
      /**
       * Adds a refinement on a disjunctive facet.
       * @method
       * @param {string} facet attribute to apply the faceting on
       * @param {string} value value of the attribute (will be converted to string)
       * @return {SearchParameters} new instance
       */
      addDisjunctiveFacetRefinement: function addDisjunctiveFacetRefinement(facet, value) {
        if (!this.isDisjunctiveFacet(facet)) {
          throw new Error(
            facet + " is not defined in the disjunctiveFacets attribute of the helper configuration"
          );
        }
        if (RefinementList.isRefined(this.disjunctiveFacetsRefinements, facet, value))
          return this;
        return this.setQueryParameters({
          disjunctiveFacetsRefinements: RefinementList.addRefinement(
            this.disjunctiveFacetsRefinements,
            facet,
            value
          )
        });
      },
      /**
       * addTagRefinement adds a tag to the list used to filter the results
       * @param {string} tag tag to be added
       * @return {SearchParameters} new instance
       */
      addTagRefinement: function addTagRefinement(tag) {
        if (this.isTagRefined(tag)) return this;
        var modification = {
          tagRefinements: this.tagRefinements.concat(tag)
        };
        return this.setQueryParameters(modification);
      },
      /**
       * Remove a facet from the facets attribute of the helper configuration, if it
       * is present.
       * @method
       * @param {string} facet facet name to remove
       * @return {SearchParameters} new instance
       */
      removeFacet: function removeFacet(facet) {
        if (!this.isConjunctiveFacet(facet)) {
          return this;
        }
        return this.clearRefinements(facet).setQueryParameters({
          facets: this.facets.filter(function(f12) {
            return f12 !== facet;
          })
        });
      },
      /**
       * Remove a disjunctive facet from the disjunctiveFacets attribute of the
       * helper configuration, if it is present.
       * @method
       * @param {string} facet disjunctive facet name to remove
       * @return {SearchParameters} new instance
       */
      removeDisjunctiveFacet: function removeDisjunctiveFacet(facet) {
        if (!this.isDisjunctiveFacet(facet)) {
          return this;
        }
        return this.clearRefinements(facet).setQueryParameters({
          disjunctiveFacets: this.disjunctiveFacets.filter(function(f12) {
            return f12 !== facet;
          })
        });
      },
      /**
       * Remove a hierarchical facet from the hierarchicalFacets attribute of the
       * helper configuration, if it is present.
       * @method
       * @param {string} facet hierarchical facet name to remove
       * @return {SearchParameters} new instance
       */
      removeHierarchicalFacet: function removeHierarchicalFacet(facet) {
        if (!this.isHierarchicalFacet(facet)) {
          return this;
        }
        return this.clearRefinements(facet).setQueryParameters({
          hierarchicalFacets: this.hierarchicalFacets.filter(function(f12) {
            return f12.name !== facet;
          })
        });
      },
      /**
       * Remove a refinement set on facet. If a value is provided, it will clear the
       * refinement for the given value, otherwise it will clear all the refinement
       * values for the faceted attribute.
       * @method
       * @param {string} facet name of the attribute used for faceting
       * @param {string} [value] value used to filter
       * @return {SearchParameters} new instance
       */
      removeFacetRefinement: function removeFacetRefinement(facet, value) {
        if (!this.isConjunctiveFacet(facet)) {
          throw new Error(
            facet + " is not defined in the facets attribute of the helper configuration"
          );
        }
        if (!RefinementList.isRefined(this.facetsRefinements, facet, value))
          return this;
        return this.setQueryParameters({
          facetsRefinements: RefinementList.removeRefinement(
            this.facetsRefinements,
            facet,
            value
          )
        });
      },
      /**
       * Remove a negative refinement on a facet
       * @method
       * @param {string} facet name of the attribute used for faceting
       * @param {string} value value used to filter
       * @return {SearchParameters} new instance
       */
      removeExcludeRefinement: function removeExcludeRefinement(facet, value) {
        if (!this.isConjunctiveFacet(facet)) {
          throw new Error(
            facet + " is not defined in the facets attribute of the helper configuration"
          );
        }
        if (!RefinementList.isRefined(this.facetsExcludes, facet, value))
          return this;
        return this.setQueryParameters({
          facetsExcludes: RefinementList.removeRefinement(
            this.facetsExcludes,
            facet,
            value
          )
        });
      },
      /**
       * Remove a refinement on a disjunctive facet
       * @method
       * @param {string} facet name of the attribute used for faceting
       * @param {string} value value used to filter
       * @return {SearchParameters} new instance
       */
      removeDisjunctiveFacetRefinement: function removeDisjunctiveFacetRefinement(facet, value) {
        if (!this.isDisjunctiveFacet(facet)) {
          throw new Error(
            facet + " is not defined in the disjunctiveFacets attribute of the helper configuration"
          );
        }
        if (!RefinementList.isRefined(this.disjunctiveFacetsRefinements, facet, value))
          return this;
        return this.setQueryParameters({
          disjunctiveFacetsRefinements: RefinementList.removeRefinement(
            this.disjunctiveFacetsRefinements,
            facet,
            value
          )
        });
      },
      /**
       * Remove a tag from the list of tag refinements
       * @method
       * @param {string} tag the tag to remove
       * @return {SearchParameters} new instance
       */
      removeTagRefinement: function removeTagRefinement(tag) {
        if (!this.isTagRefined(tag)) return this;
        var modification = {
          tagRefinements: this.tagRefinements.filter(function(t4) {
            return t4 !== tag;
          })
        };
        return this.setQueryParameters(modification);
      },
      /**
       * Generic toggle refinement method to use with facet, disjunctive facets
       * and hierarchical facets
       * @param  {string} facet the facet to refine
       * @param  {string} value the associated value
       * @return {SearchParameters} new instance
       * @throws will throw an error if the facet is not declared in the settings of the helper
       * @deprecated since version 2.19.0, see {@link SearchParameters#toggleFacetRefinement}
       */
      toggleRefinement: function toggleRefinement(facet, value) {
        return this.toggleFacetRefinement(facet, value);
      },
      /**
       * Generic toggle refinement method to use with facet, disjunctive facets
       * and hierarchical facets
       * @param  {string} facet the facet to refine
       * @param  {string} value the associated value
       * @return {SearchParameters} new instance
       * @throws will throw an error if the facet is not declared in the settings of the helper
       */
      toggleFacetRefinement: function toggleFacetRefinement(facet, value) {
        if (this.isHierarchicalFacet(facet)) {
          return this.toggleHierarchicalFacetRefinement(facet, value);
        } else if (this.isConjunctiveFacet(facet)) {
          return this.toggleConjunctiveFacetRefinement(facet, value);
        } else if (this.isDisjunctiveFacet(facet)) {
          return this.toggleDisjunctiveFacetRefinement(facet, value);
        }
        throw new Error(
          "Cannot refine the undeclared facet " + facet + "; it should be added to the helper options facets, disjunctiveFacets or hierarchicalFacets"
        );
      },
      /**
       * Switch the refinement applied over a facet/value
       * @method
       * @param {string} facet name of the attribute used for faceting
       * @param {value} value value used for filtering
       * @return {SearchParameters} new instance
       */
      toggleConjunctiveFacetRefinement: function toggleConjunctiveFacetRefinement(facet, value) {
        if (!this.isConjunctiveFacet(facet)) {
          throw new Error(
            facet + " is not defined in the facets attribute of the helper configuration"
          );
        }
        return this.setQueryParameters({
          facetsRefinements: RefinementList.toggleRefinement(
            this.facetsRefinements,
            facet,
            value
          )
        });
      },
      /**
       * Switch the refinement applied over a facet/value
       * @method
       * @param {string} facet name of the attribute used for faceting
       * @param {value} value value used for filtering
       * @return {SearchParameters} new instance
       */
      toggleExcludeFacetRefinement: function toggleExcludeFacetRefinement(facet, value) {
        if (!this.isConjunctiveFacet(facet)) {
          throw new Error(
            facet + " is not defined in the facets attribute of the helper configuration"
          );
        }
        return this.setQueryParameters({
          facetsExcludes: RefinementList.toggleRefinement(
            this.facetsExcludes,
            facet,
            value
          )
        });
      },
      /**
       * Switch the refinement applied over a facet/value
       * @method
       * @param {string} facet name of the attribute used for faceting
       * @param {value} value value used for filtering
       * @return {SearchParameters} new instance
       */
      toggleDisjunctiveFacetRefinement: function toggleDisjunctiveFacetRefinement(facet, value) {
        if (!this.isDisjunctiveFacet(facet)) {
          throw new Error(
            facet + " is not defined in the disjunctiveFacets attribute of the helper configuration"
          );
        }
        return this.setQueryParameters({
          disjunctiveFacetsRefinements: RefinementList.toggleRefinement(
            this.disjunctiveFacetsRefinements,
            facet,
            value
          )
        });
      },
      /**
       * Switch the refinement applied over a facet/value
       * @method
       * @param {string} facet name of the attribute used for faceting
       * @param {value} value value used for filtering
       * @return {SearchParameters} new instance
       */
      toggleHierarchicalFacetRefinement: function toggleHierarchicalFacetRefinement(facet, value) {
        if (!this.isHierarchicalFacet(facet)) {
          throw new Error(
            facet + " is not defined in the hierarchicalFacets attribute of the helper configuration"
          );
        }
        var separator = this._getHierarchicalFacetSeparator(
          this.getHierarchicalFacetByName(facet)
        );
        var mod = {};
        var upOneOrMultipleLevel = this.hierarchicalFacetsRefinements[facet] !== void 0 && this.hierarchicalFacetsRefinements[facet].length > 0 && // remove current refinement:
        // refinement was 'beer > IPA', call is toggleRefine('beer > IPA'), refinement should be `beer`
        (this.hierarchicalFacetsRefinements[facet][0] === value || // remove a parent refinement of the current refinement:
        //  - refinement was 'beer > IPA > Flying dog'
        //  - call is toggleRefine('beer > IPA')
        //  - refinement should be `beer`
        this.hierarchicalFacetsRefinements[facet][0].indexOf(
          value + separator
        ) === 0);
        if (upOneOrMultipleLevel) {
          if (value.indexOf(separator) === -1) {
            mod[facet] = [];
          } else {
            mod[facet] = [value.slice(0, value.lastIndexOf(separator))];
          }
        } else {
          mod[facet] = [value];
        }
        return this.setQueryParameters({
          hierarchicalFacetsRefinements: defaultsPure(
            mod,
            this.hierarchicalFacetsRefinements
          )
        });
      },
      /**
       * Adds a refinement on a hierarchical facet.
       * @param {string} facet the facet name
       * @param {string} path the hierarchical facet path
       * @return {SearchParameter} the new state
       * @throws Error if the facet is not defined or if the facet is refined
       */
      addHierarchicalFacetRefinement: function(facet, path) {
        if (this.isHierarchicalFacetRefined(facet)) {
          throw new Error(facet + " is already refined.");
        }
        if (!this.isHierarchicalFacet(facet)) {
          throw new Error(
            facet + " is not defined in the hierarchicalFacets attribute of the helper configuration."
          );
        }
        var mod = {};
        mod[facet] = [path];
        return this.setQueryParameters({
          hierarchicalFacetsRefinements: defaultsPure(
            mod,
            this.hierarchicalFacetsRefinements
          )
        });
      },
      /**
       * Removes the refinement set on a hierarchical facet.
       * @param {string} facet the facet name
       * @return {SearchParameter} the new state
       * @throws Error if the facet is not defined or if the facet is not refined
       */
      removeHierarchicalFacetRefinement: function(facet) {
        if (!this.isHierarchicalFacetRefined(facet)) {
          return this;
        }
        var mod = {};
        mod[facet] = [];
        return this.setQueryParameters({
          hierarchicalFacetsRefinements: defaultsPure(
            mod,
            this.hierarchicalFacetsRefinements
          )
        });
      },
      /**
       * Switch the tag refinement
       * @method
       * @param {string} tag the tag to remove or add
       * @return {SearchParameters} new instance
       */
      toggleTagRefinement: function toggleTagRefinement(tag) {
        if (this.isTagRefined(tag)) {
          return this.removeTagRefinement(tag);
        }
        return this.addTagRefinement(tag);
      },
      /**
       * Test if the facet name is from one of the disjunctive facets
       * @method
       * @param {string} facet facet name to test
       * @return {boolean} true if facet is a disjunctive facet
       */
      isDisjunctiveFacet: function(facet) {
        return this.disjunctiveFacets.indexOf(facet) > -1;
      },
      /**
       * Test if the facet name is from one of the hierarchical facets
       * @method
       * @param {string} facetName facet name to test
       * @return {boolean} true if facetName is a hierarchical facet
       */
      isHierarchicalFacet: function(facetName) {
        return this.getHierarchicalFacetByName(facetName) !== void 0;
      },
      /**
       * Test if the facet name is from one of the conjunctive/normal facets
       * @method
       * @param {string} facet facet name to test
       * @return {boolean} true if facet is a conjunctive facet
       */
      isConjunctiveFacet: function(facet) {
        return this.facets.indexOf(facet) > -1;
      },
      /**
       * Returns true if the facet is refined, either for a specific value or in
       * general.
       * @method
       * @param {string} facet name of the attribute for used for faceting
       * @param {string} value, optional value. If passed will test that this value
       * is filtering the given facet.
       * @return {boolean} returns true if refined
       */
      isFacetRefined: function isFacetRefined2(facet, value) {
        if (!this.isConjunctiveFacet(facet)) {
          return false;
        }
        return RefinementList.isRefined(this.facetsRefinements, facet, value);
      },
      /**
       * Returns true if the facet contains exclusions or if a specific value is
       * excluded.
       *
       * @method
       * @param {string} facet name of the attribute for used for faceting
       * @param {string} [value] optional value. If passed will test that this value
       * is filtering the given facet.
       * @return {boolean} returns true if refined
       */
      isExcludeRefined: function isExcludeRefined(facet, value) {
        if (!this.isConjunctiveFacet(facet)) {
          return false;
        }
        return RefinementList.isRefined(this.facetsExcludes, facet, value);
      },
      /**
       * Returns true if the facet contains a refinement, or if a value passed is a
       * refinement for the facet.
       * @method
       * @param {string} facet name of the attribute for used for faceting
       * @param {string} value optional, will test if the value is used for refinement
       * if there is one, otherwise will test if the facet contains any refinement
       * @return {boolean} true if the facet is refined
       */
      isDisjunctiveFacetRefined: function isDisjunctiveFacetRefined(facet, value) {
        if (!this.isDisjunctiveFacet(facet)) {
          return false;
        }
        return RefinementList.isRefined(
          this.disjunctiveFacetsRefinements,
          facet,
          value
        );
      },
      /**
       * Returns true if the facet contains a refinement, or if a value passed is a
       * refinement for the facet.
       * @method
       * @param {string} facet name of the attribute for used for faceting
       * @param {string} value optional, will test if the value is used for refinement
       * if there is one, otherwise will test if the facet contains any refinement
       * @return {boolean} true if the facet is refined
       */
      isHierarchicalFacetRefined: function isHierarchicalFacetRefined(facet, value) {
        if (!this.isHierarchicalFacet(facet)) {
          return false;
        }
        var refinements = this.getHierarchicalRefinement(facet);
        if (!value) {
          return refinements.length > 0;
        }
        return refinements.indexOf(value) !== -1;
      },
      /**
       * Test if the triple (attribute, operator, value) is already refined.
       * If only the attribute and the operator are provided, it tests if the
       * contains any refinement value.
       * @method
       * @param {string} attribute attribute for which the refinement is applied
       * @param {string} [operator] operator of the refinement
       * @param {string} [value] value of the refinement
       * @return {boolean} true if it is refined
       */
      isNumericRefined: function isNumericRefined(attribute, operator, value) {
        if (value === void 0 && operator === void 0) {
          return Boolean(this.numericRefinements[attribute]);
        }
        var isOperatorDefined = this.numericRefinements[attribute] && this.numericRefinements[attribute][operator] !== void 0;
        if (value === void 0 || !isOperatorDefined) {
          return isOperatorDefined;
        }
        var parsedValue = valToNumber(value);
        var isAttributeValueDefined = findArray(this.numericRefinements[attribute][operator], parsedValue) !== void 0;
        return isOperatorDefined && isAttributeValueDefined;
      },
      /**
       * Returns true if the tag refined, false otherwise
       * @method
       * @param {string} tag the tag to check
       * @return {boolean} true if tag is refined
       */
      isTagRefined: function isTagRefined(tag) {
        return this.tagRefinements.indexOf(tag) !== -1;
      },
      /**
       * Returns the list of all disjunctive facets refined
       * @method
       * @param {string} facet name of the attribute used for faceting
       * @param {value} value value used for filtering
       * @return {string[]} returns the list of refinements
       */
      getRefinedDisjunctiveFacets: function getRefinedDisjunctiveFacets() {
        var self = this;
        var disjunctiveNumericRefinedFacets = intersection(
          Object.keys(this.numericRefinements).filter(function(facet) {
            return Object.keys(self.numericRefinements[facet]).length > 0;
          }),
          this.disjunctiveFacets
        );
        return Object.keys(this.disjunctiveFacetsRefinements).filter(function(facet) {
          return self.disjunctiveFacetsRefinements[facet].length > 0;
        }).concat(disjunctiveNumericRefinedFacets).concat(this.getRefinedHierarchicalFacets()).sort();
      },
      /**
       * Returns the list of all disjunctive facets refined
       * @method
       * @param {string} facet name of the attribute used for faceting
       * @param {value} value value used for filtering
       * @return {string[]} returns the list of refinements
       */
      getRefinedHierarchicalFacets: function getRefinedHierarchicalFacets() {
        var self = this;
        return intersection(
          // enforce the order between the two arrays,
          // so that refinement name index === hierarchical facet index
          this.hierarchicalFacets.map(function(facet) {
            return facet.name;
          }),
          Object.keys(this.hierarchicalFacetsRefinements).filter(function(facet) {
            return self.hierarchicalFacetsRefinements[facet].length > 0;
          })
        ).sort();
      },
      /**
       * Returned the list of all disjunctive facets not refined
       * @method
       * @return {string[]} returns the list of facets that are not refined
       */
      getUnrefinedDisjunctiveFacets: function() {
        var refinedFacets = this.getRefinedDisjunctiveFacets();
        return this.disjunctiveFacets.filter(function(f12) {
          return refinedFacets.indexOf(f12) === -1;
        });
      },
      managedParameters: [
        "index",
        "facets",
        "disjunctiveFacets",
        "facetsRefinements",
        "hierarchicalFacets",
        "facetsExcludes",
        "disjunctiveFacetsRefinements",
        "numericRefinements",
        "tagRefinements",
        "hierarchicalFacetsRefinements"
      ],
      getQueryParams: function getQueryParams() {
        var managedParameters = this.managedParameters;
        var queryParams = {};
        var self = this;
        Object.keys(this).forEach(function(paramName) {
          var paramValue = self[paramName];
          if (managedParameters.indexOf(paramName) === -1 && paramValue !== void 0) {
            queryParams[paramName] = paramValue;
          }
        });
        return queryParams;
      },
      /**
       * Let the user set a specific value for a given parameter. Will return the
       * same instance if the parameter is invalid or if the value is the same as the
       * previous one.
       * @method
       * @param {string} parameter the parameter name
       * @param {any} value the value to be set, must be compliant with the definition
       * of the attribute on the object
       * @return {SearchParameters} the updated state
       */
      setQueryParameter: function setParameter(parameter, value) {
        if (this[parameter] === value) return this;
        var modification = {};
        modification[parameter] = value;
        return this.setQueryParameters(modification);
      },
      /**
       * Let the user set any of the parameters with a plain object.
       * @method
       * @param {object} params all the keys and the values to be updated
       * @return {SearchParameters} a new updated instance
       */
      setQueryParameters: function setQueryParameters(params) {
        if (!params) return this;
        var error = SearchParameters.validate(this, params);
        if (error) {
          throw error;
        }
        var self = this;
        var nextWithNumbers = SearchParameters._parseNumbers(params);
        var previousPlainObject = Object.keys(this).reduce(function(acc, key) {
          acc[key] = self[key];
          return acc;
        }, {});
        var nextPlainObject = Object.keys(nextWithNumbers).reduce(
          function(previous, key) {
            var isPreviousValueDefined = previous[key] !== void 0;
            var isNextValueDefined = nextWithNumbers[key] !== void 0;
            if (isPreviousValueDefined && !isNextValueDefined) {
              return omit(previous, [key]);
            }
            if (isNextValueDefined) {
              previous[key] = nextWithNumbers[key];
            }
            return previous;
          },
          previousPlainObject
        );
        return new this.constructor(nextPlainObject);
      },
      /**
       * Returns a new instance with the page reset. Two scenarios possible:
       * the page is omitted -> return the given instance
       * the page is set -> return a new instance with a page of 0
       * @return {SearchParameters} a new updated instance
       */
      resetPage: function() {
        if (this.page === void 0) {
          return this;
        }
        return this.setPage(0);
      },
      /**
       * Helper function to get the hierarchicalFacet separator or the default one (`>`)
       * @param  {object} hierarchicalFacet the hierarchicalFacet object
       * @return {string} returns the hierarchicalFacet.separator or `>` as default
       */
      _getHierarchicalFacetSortBy: function(hierarchicalFacet) {
        return hierarchicalFacet.sortBy || ["isRefined:desc", "name:asc"];
      },
      /**
       * Helper function to get the hierarchicalFacet separator or the default one (`>`)
       * @private
       * @param  {object} hierarchicalFacet the hierarchicalFacet object
       * @return {string} returns the hierarchicalFacet.separator or `>` as default
       */
      _getHierarchicalFacetSeparator: function(hierarchicalFacet) {
        return hierarchicalFacet.separator || " > ";
      },
      /**
       * Helper function to get the hierarchicalFacet prefix path or null
       * @private
       * @param  {object} hierarchicalFacet the hierarchicalFacet object
       * @return {string} returns the hierarchicalFacet.rootPath or null as default
       */
      _getHierarchicalRootPath: function(hierarchicalFacet) {
        return hierarchicalFacet.rootPath || null;
      },
      /**
       * Helper function to check if we show the parent level of the hierarchicalFacet
       * @private
       * @param  {object} hierarchicalFacet the hierarchicalFacet object
       * @return {string} returns the hierarchicalFacet.showParentLevel or true as default
       */
      _getHierarchicalShowParentLevel: function(hierarchicalFacet) {
        if (typeof hierarchicalFacet.showParentLevel === "boolean") {
          return hierarchicalFacet.showParentLevel;
        }
        return true;
      },
      /**
       * Helper function to get the hierarchicalFacet by it's name
       * @param  {string} hierarchicalFacetName the hierarchicalFacet name
       * @return {object} a hierarchicalFacet
       */
      getHierarchicalFacetByName: function(hierarchicalFacetName) {
        return find2(this.hierarchicalFacets, function(f12) {
          return f12.name === hierarchicalFacetName;
        });
      },
      /**
       * Get the current breadcrumb for a hierarchical facet, as an array
       * @param  {string} facetName Hierarchical facet name
       * @return {array.<string>} the path as an array of string
       */
      getHierarchicalFacetBreadcrumb: function(facetName) {
        if (!this.isHierarchicalFacet(facetName)) {
          return [];
        }
        var refinement = this.getHierarchicalRefinement(facetName)[0];
        if (!refinement) return [];
        var separator = this._getHierarchicalFacetSeparator(
          this.getHierarchicalFacetByName(facetName)
        );
        var path = refinement.split(separator);
        return path.map(function(part) {
          return part.trim();
        });
      },
      toString: function() {
        return JSON.stringify(this, null, 2);
      }
    };
    module.exports = SearchParameters;
  }
});

// node_modules/.pnpm/algoliasearch-helper@3.23.0_algoliasearch@5.19.0/node_modules/algoliasearch-helper/src/functions/compact.js
var require_compact = __commonJS({
  "node_modules/.pnpm/algoliasearch-helper@3.23.0_algoliasearch@5.19.0/node_modules/algoliasearch-helper/src/functions/compact.js"(exports, module) {
    "use strict";
    module.exports = function compact(array) {
      if (!Array.isArray(array)) {
        return [];
      }
      return array.filter(Boolean);
    };
  }
});

// node_modules/.pnpm/algoliasearch-helper@3.23.0_algoliasearch@5.19.0/node_modules/algoliasearch-helper/src/functions/findIndex.js
var require_findIndex = __commonJS({
  "node_modules/.pnpm/algoliasearch-helper@3.23.0_algoliasearch@5.19.0/node_modules/algoliasearch-helper/src/functions/findIndex.js"(exports, module) {
    "use strict";
    module.exports = function find2(array, comparator) {
      if (!Array.isArray(array)) {
        return -1;
      }
      for (var i6 = 0; i6 < array.length; i6++) {
        if (comparator(array[i6])) {
          return i6;
        }
      }
      return -1;
    };
  }
});

// node_modules/.pnpm/algoliasearch-helper@3.23.0_algoliasearch@5.19.0/node_modules/algoliasearch-helper/src/functions/formatSort.js
var require_formatSort = __commonJS({
  "node_modules/.pnpm/algoliasearch-helper@3.23.0_algoliasearch@5.19.0/node_modules/algoliasearch-helper/src/functions/formatSort.js"(exports, module) {
    "use strict";
    var find2 = require_find();
    module.exports = function formatSort(sortBy, defaults) {
      var defaultInstructions = (defaults || []).map(function(sort) {
        return sort.split(":");
      });
      return sortBy.reduce(
        function preparePredicate(out, sort) {
          var sortInstruction = sort.split(":");
          var matchingDefault = find2(
            defaultInstructions,
            function(defaultInstruction) {
              return defaultInstruction[0] === sortInstruction[0];
            }
          );
          if (sortInstruction.length > 1 || !matchingDefault) {
            out[0].push(sortInstruction[0]);
            out[1].push(sortInstruction[1]);
            return out;
          }
          out[0].push(matchingDefault[0]);
          out[1].push(matchingDefault[1]);
          return out;
        },
        [[], []]
      );
    };
  }
});

// node_modules/.pnpm/algoliasearch-helper@3.23.0_algoliasearch@5.19.0/node_modules/algoliasearch-helper/src/functions/orderBy.js
var require_orderBy = __commonJS({
  "node_modules/.pnpm/algoliasearch-helper@3.23.0_algoliasearch@5.19.0/node_modules/algoliasearch-helper/src/functions/orderBy.js"(exports, module) {
    "use strict";
    function compareAscending(value, other) {
      if (value !== other) {
        var valIsDefined = value !== void 0;
        var valIsNull = value === null;
        var othIsDefined = other !== void 0;
        var othIsNull = other === null;
        if (!othIsNull && value > other || valIsNull && othIsDefined || !valIsDefined) {
          return 1;
        }
        if (!valIsNull && value < other || othIsNull && valIsDefined || !othIsDefined) {
          return -1;
        }
      }
      return 0;
    }
    function orderBy(collection, iteratees, orders) {
      if (!Array.isArray(collection)) {
        return [];
      }
      if (!Array.isArray(orders)) {
        orders = [];
      }
      var result = collection.map(function(value, index3) {
        return {
          criteria: iteratees.map(function(iteratee) {
            return value[iteratee];
          }),
          index: index3,
          value
        };
      });
      result.sort(function comparer(object, other) {
        var index3 = -1;
        while (++index3 < object.criteria.length) {
          var res = compareAscending(object.criteria[index3], other.criteria[index3]);
          if (res) {
            if (index3 >= orders.length) {
              return res;
            }
            if (orders[index3] === "desc") {
              return -res;
            }
            return res;
          }
        }
        return object.index - other.index;
      });
      return result.map(function(res) {
        return res.value;
      });
    }
    module.exports = orderBy;
  }
});

// node_modules/.pnpm/algoliasearch-helper@3.23.0_algoliasearch@5.19.0/node_modules/algoliasearch-helper/src/SearchResults/generate-hierarchical-tree.js
var require_generate_hierarchical_tree = __commonJS({
  "node_modules/.pnpm/algoliasearch-helper@3.23.0_algoliasearch@5.19.0/node_modules/algoliasearch-helper/src/SearchResults/generate-hierarchical-tree.js"(exports, module) {
    "use strict";
    module.exports = generateTrees;
    var fv = require_escapeFacetValue();
    var find2 = require_find();
    var prepareHierarchicalFacetSortBy = require_formatSort();
    var orderBy = require_orderBy();
    var escapeFacetValue2 = fv.escapeFacetValue;
    var unescapeFacetValue2 = fv.unescapeFacetValue;
    function generateTrees(state) {
      return function generate(hierarchicalFacetResult, hierarchicalFacetIndex) {
        var hierarchicalFacet = state.hierarchicalFacets[hierarchicalFacetIndex];
        var hierarchicalFacetRefinement = state.hierarchicalFacetsRefinements[hierarchicalFacet.name] && state.hierarchicalFacetsRefinements[hierarchicalFacet.name][0] || "";
        var hierarchicalSeparator = state._getHierarchicalFacetSeparator(hierarchicalFacet);
        var hierarchicalRootPath = state._getHierarchicalRootPath(hierarchicalFacet);
        var hierarchicalShowParentLevel = state._getHierarchicalShowParentLevel(hierarchicalFacet);
        var sortBy = prepareHierarchicalFacetSortBy(
          state._getHierarchicalFacetSortBy(hierarchicalFacet)
        );
        var rootExhaustive = hierarchicalFacetResult.every(function(facetResult) {
          return facetResult.exhaustive;
        });
        var generateTreeFn = generateHierarchicalTree(
          sortBy,
          hierarchicalSeparator,
          hierarchicalRootPath,
          hierarchicalShowParentLevel,
          hierarchicalFacetRefinement
        );
        var results = hierarchicalFacetResult;
        if (hierarchicalRootPath) {
          results = hierarchicalFacetResult.slice(
            hierarchicalRootPath.split(hierarchicalSeparator).length
          );
        }
        return results.reduce(generateTreeFn, {
          name: state.hierarchicalFacets[hierarchicalFacetIndex].name,
          count: null,
          // root level, no count
          isRefined: true,
          // root level, always refined
          path: null,
          // root level, no path
          escapedValue: null,
          exhaustive: rootExhaustive,
          data: null
        });
      };
    }
    function generateHierarchicalTree(sortBy, hierarchicalSeparator, hierarchicalRootPath, hierarchicalShowParentLevel, currentRefinement) {
      return function generateTree(hierarchicalTree, hierarchicalFacetResult, currentHierarchicalLevel) {
        var parent = hierarchicalTree;
        if (currentHierarchicalLevel > 0) {
          var level = 0;
          parent = hierarchicalTree;
          while (level < currentHierarchicalLevel) {
            var data = parent && Array.isArray(parent.data) ? parent.data : [];
            parent = find2(data, function(subtree) {
              return subtree.isRefined;
            });
            level++;
          }
        }
        if (parent) {
          var picked = Object.keys(hierarchicalFacetResult.data).map(function(facetValue) {
            return [facetValue, hierarchicalFacetResult.data[facetValue]];
          }).filter(function(tuple) {
            var facetValue = tuple[0];
            return onlyMatchingTree(
              facetValue,
              parent.path || hierarchicalRootPath,
              currentRefinement,
              hierarchicalSeparator,
              hierarchicalRootPath,
              hierarchicalShowParentLevel
            );
          });
          parent.data = orderBy(
            picked.map(function(tuple) {
              var facetValue = tuple[0];
              var facetCount = tuple[1];
              return format(
                facetCount,
                facetValue,
                hierarchicalSeparator,
                unescapeFacetValue2(currentRefinement),
                hierarchicalFacetResult.exhaustive
              );
            }),
            sortBy[0],
            sortBy[1]
          );
        }
        return hierarchicalTree;
      };
    }
    function onlyMatchingTree(facetValue, parentPath, currentRefinement, hierarchicalSeparator, hierarchicalRootPath, hierarchicalShowParentLevel) {
      if (hierarchicalRootPath && (facetValue.indexOf(hierarchicalRootPath) !== 0 || hierarchicalRootPath === facetValue)) {
        return false;
      }
      return !hierarchicalRootPath && facetValue.indexOf(hierarchicalSeparator) === -1 || // if there is a rootPath, being root level mean 1 level under rootPath
      hierarchicalRootPath && facetValue.split(hierarchicalSeparator).length - hierarchicalRootPath.split(hierarchicalSeparator).length === 1 || // if current refinement is a root level and current facetValue is a root level,
      // keep the facetValue
      facetValue.indexOf(hierarchicalSeparator) === -1 && currentRefinement.indexOf(hierarchicalSeparator) === -1 || // currentRefinement is a child of the facet value
      currentRefinement.indexOf(facetValue) === 0 || // facetValue is a child of the current parent, add it
      facetValue.indexOf(parentPath + hierarchicalSeparator) === 0 && (hierarchicalShowParentLevel || facetValue.indexOf(currentRefinement) === 0);
    }
    function format(facetCount, facetValue, hierarchicalSeparator, currentRefinement, exhaustive) {
      var parts = facetValue.split(hierarchicalSeparator);
      return {
        name: parts[parts.length - 1].trim(),
        path: facetValue,
        escapedValue: escapeFacetValue2(facetValue),
        count: facetCount,
        isRefined: currentRefinement === facetValue || currentRefinement.indexOf(facetValue + hierarchicalSeparator) === 0,
        exhaustive,
        data: null
      };
    }
  }
});

// node_modules/.pnpm/algoliasearch-helper@3.23.0_algoliasearch@5.19.0/node_modules/algoliasearch-helper/src/SearchResults/index.js
var require_SearchResults = __commonJS({
  "node_modules/.pnpm/algoliasearch-helper@3.23.0_algoliasearch@5.19.0/node_modules/algoliasearch-helper/src/SearchResults/index.js"(exports, module) {
    "use strict";
    var compact = require_compact();
    var defaultsPure = require_defaultsPure();
    var fv = require_escapeFacetValue();
    var find2 = require_find();
    var findIndex2 = require_findIndex();
    var formatSort = require_formatSort();
    var orderBy = require_orderBy();
    var escapeFacetValue2 = fv.escapeFacetValue;
    var unescapeFacetValue2 = fv.unescapeFacetValue;
    var generateHierarchicalTree = require_generate_hierarchical_tree();
    function getIndices(attributes) {
      var indices = {};
      attributes.forEach(function(val, idx) {
        indices[val] = idx;
      });
      return indices;
    }
    function assignFacetStats(dest, facetStats, key) {
      if (facetStats && facetStats[key]) {
        dest.stats = facetStats[key];
      }
    }
    function findMatchingHierarchicalFacetFromAttributeName(hierarchicalFacets, hierarchicalAttributeName) {
      return find2(
        hierarchicalFacets,
        function facetKeyMatchesAttribute(hierarchicalFacet) {
          var facetNames = hierarchicalFacet.attributes || [];
          return facetNames.indexOf(hierarchicalAttributeName) > -1;
        }
      );
    }
    function SearchResults(state, results, options) {
      var mainSubResponse = results[0] || {};
      this._rawResults = results;
      var self = this;
      Object.keys(mainSubResponse).forEach(function(key) {
        self[key] = mainSubResponse[key];
      });
      var opts = defaultsPure(options, {
        persistHierarchicalRootCount: false
      });
      Object.keys(opts).forEach(function(key) {
        self[key] = opts[key];
      });
      this.processingTimeMS = results.reduce(function(sum, result) {
        return result.processingTimeMS === void 0 ? sum : sum + result.processingTimeMS;
      }, 0);
      this.disjunctiveFacets = [];
      this.hierarchicalFacets = state.hierarchicalFacets.map(
        function initFutureTree() {
          return [];
        }
      );
      this.facets = [];
      var disjunctiveFacets = state.getRefinedDisjunctiveFacets();
      var facetsIndices = getIndices(state.facets);
      var disjunctiveFacetsIndices = getIndices(state.disjunctiveFacets);
      var nextDisjunctiveResult = 1;
      var mainFacets = mainSubResponse.facets || {};
      Object.keys(mainFacets).forEach(function(facetKey) {
        var facetValueObject = mainFacets[facetKey];
        var hierarchicalFacet = findMatchingHierarchicalFacetFromAttributeName(
          state.hierarchicalFacets,
          facetKey
        );
        if (hierarchicalFacet) {
          var facetIndex = hierarchicalFacet.attributes.indexOf(facetKey);
          var idxAttributeName = findIndex2(state.hierarchicalFacets, function(f12) {
            return f12.name === hierarchicalFacet.name;
          });
          self.hierarchicalFacets[idxAttributeName][facetIndex] = {
            attribute: facetKey,
            data: facetValueObject,
            exhaustive: mainSubResponse.exhaustiveFacetsCount
          };
        } else {
          var isFacetDisjunctive = state.disjunctiveFacets.indexOf(facetKey) !== -1;
          var isFacetConjunctive = state.facets.indexOf(facetKey) !== -1;
          var position;
          if (isFacetDisjunctive) {
            position = disjunctiveFacetsIndices[facetKey];
            self.disjunctiveFacets[position] = {
              name: facetKey,
              data: facetValueObject,
              exhaustive: mainSubResponse.exhaustiveFacetsCount
            };
            assignFacetStats(
              self.disjunctiveFacets[position],
              mainSubResponse.facets_stats,
              facetKey
            );
          }
          if (isFacetConjunctive) {
            position = facetsIndices[facetKey];
            self.facets[position] = {
              name: facetKey,
              data: facetValueObject,
              exhaustive: mainSubResponse.exhaustiveFacetsCount
            };
            assignFacetStats(
              self.facets[position],
              mainSubResponse.facets_stats,
              facetKey
            );
          }
        }
      });
      this.hierarchicalFacets = compact(this.hierarchicalFacets);
      disjunctiveFacets.forEach(function(disjunctiveFacet) {
        var result = results[nextDisjunctiveResult];
        var facets = result && result.facets ? result.facets : {};
        var hierarchicalFacet = state.getHierarchicalFacetByName(disjunctiveFacet);
        Object.keys(facets).forEach(function(dfacet) {
          var facetResults = facets[dfacet];
          var position;
          if (hierarchicalFacet) {
            position = findIndex2(state.hierarchicalFacets, function(f12) {
              return f12.name === hierarchicalFacet.name;
            });
            var attributeIndex = findIndex2(
              self.hierarchicalFacets[position],
              function(f12) {
                return f12.attribute === dfacet;
              }
            );
            if (attributeIndex === -1) {
              return;
            }
            self.hierarchicalFacets[position][attributeIndex].data = self.persistHierarchicalRootCount ? defaultsPure(
              self.hierarchicalFacets[position][attributeIndex].data,
              facetResults
            ) : defaultsPure(
              facetResults,
              self.hierarchicalFacets[position][attributeIndex].data
            );
          } else {
            position = disjunctiveFacetsIndices[dfacet];
            var dataFromMainRequest = mainSubResponse.facets && mainSubResponse.facets[dfacet] || {};
            self.disjunctiveFacets[position] = {
              name: dfacet,
              data: defaultsPure(dataFromMainRequest, facetResults),
              exhaustive: result.exhaustiveFacetsCount
            };
            assignFacetStats(
              self.disjunctiveFacets[position],
              result.facets_stats,
              dfacet
            );
            if (state.disjunctiveFacetsRefinements[dfacet]) {
              state.disjunctiveFacetsRefinements[dfacet].forEach(function(refinementValue) {
                if (!self.disjunctiveFacets[position].data[refinementValue] && state.disjunctiveFacetsRefinements[dfacet].indexOf(
                  unescapeFacetValue2(refinementValue)
                ) > -1) {
                  self.disjunctiveFacets[position].data[refinementValue] = 0;
                }
              });
            }
          }
        });
        nextDisjunctiveResult++;
      });
      state.getRefinedHierarchicalFacets().forEach(function(refinedFacet) {
        var hierarchicalFacet = state.getHierarchicalFacetByName(refinedFacet);
        var separator = state._getHierarchicalFacetSeparator(hierarchicalFacet);
        var currentRefinement = state.getHierarchicalRefinement(refinedFacet);
        if (currentRefinement.length === 0 || currentRefinement[0].split(separator).length < 2) {
          return;
        }
        results.slice(nextDisjunctiveResult).forEach(function(result) {
          var facets = result && result.facets ? result.facets : {};
          Object.keys(facets).forEach(function(dfacet) {
            var facetResults = facets[dfacet];
            var position = findIndex2(state.hierarchicalFacets, function(f12) {
              return f12.name === hierarchicalFacet.name;
            });
            var attributeIndex = findIndex2(
              self.hierarchicalFacets[position],
              function(f12) {
                return f12.attribute === dfacet;
              }
            );
            if (attributeIndex === -1) {
              return;
            }
            var defaultData = {};
            if (currentRefinement.length > 0 && !self.persistHierarchicalRootCount) {
              var root = currentRefinement[0].split(separator)[0];
              defaultData[root] = self.hierarchicalFacets[position][attributeIndex].data[root];
            }
            self.hierarchicalFacets[position][attributeIndex].data = defaultsPure(
              defaultData,
              facetResults,
              self.hierarchicalFacets[position][attributeIndex].data
            );
          });
          nextDisjunctiveResult++;
        });
      });
      Object.keys(state.facetsExcludes).forEach(function(facetName) {
        var excludes = state.facetsExcludes[facetName];
        var position = facetsIndices[facetName];
        self.facets[position] = {
          name: facetName,
          data: mainFacets[facetName],
          exhaustive: mainSubResponse.exhaustiveFacetsCount
        };
        excludes.forEach(function(facetValue) {
          self.facets[position] = self.facets[position] || { name: facetName };
          self.facets[position].data = self.facets[position].data || {};
          self.facets[position].data[facetValue] = 0;
        });
      });
      this.hierarchicalFacets = this.hierarchicalFacets.map(
        generateHierarchicalTree(state)
      );
      this.facets = compact(this.facets);
      this.disjunctiveFacets = compact(this.disjunctiveFacets);
      this._state = state;
    }
    SearchResults.prototype.getFacetByName = function(name) {
      function predicate(facet) {
        return facet.name === name;
      }
      return find2(this.facets, predicate) || find2(this.disjunctiveFacets, predicate) || find2(this.hierarchicalFacets, predicate);
    };
    function extractNormalizedFacetValues(results, attribute) {
      function predicate(facet2) {
        return facet2.name === attribute;
      }
      if (results._state.isConjunctiveFacet(attribute)) {
        var facet = find2(results.facets, predicate);
        if (!facet) return [];
        return Object.keys(facet.data).map(function(name) {
          var value = escapeFacetValue2(name);
          return {
            name,
            escapedValue: value,
            count: facet.data[name],
            isRefined: results._state.isFacetRefined(attribute, value),
            isExcluded: results._state.isExcludeRefined(attribute, name)
          };
        });
      } else if (results._state.isDisjunctiveFacet(attribute)) {
        var disjunctiveFacet = find2(results.disjunctiveFacets, predicate);
        if (!disjunctiveFacet) return [];
        return Object.keys(disjunctiveFacet.data).map(function(name) {
          var value = escapeFacetValue2(name);
          return {
            name,
            escapedValue: value,
            count: disjunctiveFacet.data[name],
            isRefined: results._state.isDisjunctiveFacetRefined(attribute, value)
          };
        });
      } else if (results._state.isHierarchicalFacet(attribute)) {
        var hierarchicalFacetValues = find2(results.hierarchicalFacets, predicate);
        if (!hierarchicalFacetValues) return hierarchicalFacetValues;
        var hierarchicalFacet = results._state.getHierarchicalFacetByName(attribute);
        var separator = results._state._getHierarchicalFacetSeparator(hierarchicalFacet);
        var currentRefinement = unescapeFacetValue2(
          results._state.getHierarchicalRefinement(attribute)[0] || ""
        );
        if (currentRefinement.indexOf(hierarchicalFacet.rootPath) === 0) {
          currentRefinement = currentRefinement.replace(
            hierarchicalFacet.rootPath + separator,
            ""
          );
        }
        var currentRefinementSplit = currentRefinement.split(separator);
        currentRefinementSplit.unshift(attribute);
        setIsRefined(hierarchicalFacetValues, currentRefinementSplit, 0);
        return hierarchicalFacetValues;
      }
      return void 0;
    }
    function setIsRefined(item, currentRefinement, depth) {
      item.isRefined = item.name === (currentRefinement[depth] && currentRefinement[depth].trim());
      if (item.data) {
        item.data.forEach(function(child) {
          setIsRefined(child, currentRefinement, depth + 1);
        });
      }
    }
    function recSort(sortFn, node, names, level) {
      level = level || 0;
      if (Array.isArray(node)) {
        return sortFn(node, names[level]);
      }
      if (!node.data || node.data.length === 0) {
        return node;
      }
      var children = node.data.map(function(childNode) {
        return recSort(sortFn, childNode, names, level + 1);
      });
      var sortedChildren = sortFn(children, names[level]);
      var newNode = defaultsPure({ data: sortedChildren }, node);
      return newNode;
    }
    SearchResults.DEFAULT_SORT = ["isRefined:desc", "count:desc", "name:asc"];
    function vanillaSortFn(order, data) {
      return data.sort(order);
    }
    function sortViaFacetOrdering(facetValues, facetOrdering) {
      var orderedFacets = [];
      var remainingFacets = [];
      var hide = facetOrdering.hide || [];
      var order = facetOrdering.order || [];
      var reverseOrder = order.reduce(function(acc, name, i6) {
        acc[name] = i6;
        return acc;
      }, {});
      facetValues.forEach(function(item) {
        var name = item.path || item.name;
        var hidden = hide.indexOf(name) > -1;
        if (!hidden && reverseOrder[name] !== void 0) {
          orderedFacets[reverseOrder[name]] = item;
        } else if (!hidden) {
          remainingFacets.push(item);
        }
      });
      orderedFacets = orderedFacets.filter(function(facet) {
        return facet;
      });
      var sortRemainingBy = facetOrdering.sortRemainingBy;
      var ordering;
      if (sortRemainingBy === "hidden") {
        return orderedFacets;
      } else if (sortRemainingBy === "alpha") {
        ordering = [
          ["path", "name"],
          ["asc", "asc"]
        ];
      } else {
        ordering = [["count"], ["desc"]];
      }
      return orderedFacets.concat(
        orderBy(remainingFacets, ordering[0], ordering[1])
      );
    }
    function getFacetOrdering(results, attribute) {
      return results.renderingContent && results.renderingContent.facetOrdering && results.renderingContent.facetOrdering.values && results.renderingContent.facetOrdering.values[attribute];
    }
    SearchResults.prototype.getFacetValues = function(attribute, opts) {
      var facetValues = extractNormalizedFacetValues(this, attribute);
      if (!facetValues) {
        return void 0;
      }
      var options = defaultsPure(opts, {
        sortBy: SearchResults.DEFAULT_SORT,
        // if no sortBy is given, attempt to sort based on facetOrdering
        // if it is given, we still allow to sort via facet ordering first
        facetOrdering: !(opts && opts.sortBy)
      });
      var results = this;
      var attributes;
      if (Array.isArray(facetValues)) {
        attributes = [attribute];
      } else {
        var config = results._state.getHierarchicalFacetByName(facetValues.name);
        attributes = config.attributes;
      }
      return recSort(
        function(data, facetName) {
          if (options.facetOrdering) {
            var facetOrdering = getFacetOrdering(results, facetName);
            if (facetOrdering) {
              return sortViaFacetOrdering(data, facetOrdering);
            }
          }
          if (Array.isArray(options.sortBy)) {
            var order = formatSort(options.sortBy, SearchResults.DEFAULT_SORT);
            return orderBy(data, order[0], order[1]);
          } else if (typeof options.sortBy === "function") {
            return vanillaSortFn(options.sortBy, data);
          }
          throw new Error(
            "options.sortBy is optional but if defined it must be either an array of string (predicates) or a sorting function"
          );
        },
        facetValues,
        attributes
      );
    };
    SearchResults.prototype.getFacetStats = function(attribute) {
      if (this._state.isConjunctiveFacet(attribute)) {
        return getFacetStatsIfAvailable(this.facets, attribute);
      } else if (this._state.isDisjunctiveFacet(attribute)) {
        return getFacetStatsIfAvailable(this.disjunctiveFacets, attribute);
      }
      return void 0;
    };
    function getFacetStatsIfAvailable(facetList, facetName) {
      var data = find2(facetList, function(facet) {
        return facet.name === facetName;
      });
      return data && data.stats;
    }
    SearchResults.prototype.getRefinements = function() {
      var state = this._state;
      var results = this;
      var res = [];
      Object.keys(state.facetsRefinements).forEach(function(attributeName) {
        state.facetsRefinements[attributeName].forEach(function(name) {
          res.push(
            getRefinement2(state, "facet", attributeName, name, results.facets)
          );
        });
      });
      Object.keys(state.facetsExcludes).forEach(function(attributeName) {
        state.facetsExcludes[attributeName].forEach(function(name) {
          res.push(
            getRefinement2(state, "exclude", attributeName, name, results.facets)
          );
        });
      });
      Object.keys(state.disjunctiveFacetsRefinements).forEach(function(attributeName) {
        state.disjunctiveFacetsRefinements[attributeName].forEach(function(name) {
          res.push(
            getRefinement2(
              state,
              "disjunctive",
              attributeName,
              name,
              results.disjunctiveFacets
            )
          );
        });
      });
      Object.keys(state.hierarchicalFacetsRefinements).forEach(function(attributeName) {
        state.hierarchicalFacetsRefinements[attributeName].forEach(function(name) {
          res.push(
            getHierarchicalRefinement(
              state,
              attributeName,
              name,
              results.hierarchicalFacets
            )
          );
        });
      });
      Object.keys(state.numericRefinements).forEach(function(attributeName) {
        var operators = state.numericRefinements[attributeName];
        Object.keys(operators).forEach(function(operator) {
          operators[operator].forEach(function(value) {
            res.push({
              type: "numeric",
              attributeName,
              name: value,
              numericValue: value,
              operator
            });
          });
        });
      });
      state.tagRefinements.forEach(function(name) {
        res.push({ type: "tag", attributeName: "_tags", name });
      });
      return res;
    };
    function getRefinement2(state, type, attributeName, name, resultsFacets) {
      var facet = find2(resultsFacets, function(f12) {
        return f12.name === attributeName;
      });
      var count = facet && facet.data && facet.data[name] ? facet.data[name] : 0;
      var exhaustive = facet && facet.exhaustive || false;
      return {
        type,
        attributeName,
        name,
        count,
        exhaustive
      };
    }
    function getHierarchicalRefinement(state, attributeName, name, resultsFacets) {
      var facetDeclaration = state.getHierarchicalFacetByName(attributeName);
      var separator = state._getHierarchicalFacetSeparator(facetDeclaration);
      var split = name.split(separator);
      var rootFacet = find2(resultsFacets, function(facet2) {
        return facet2.name === attributeName;
      });
      var facet = split.reduce(function(intermediateFacet, part) {
        var newFacet = intermediateFacet && find2(intermediateFacet.data, function(f12) {
          return f12.name === part;
        });
        return newFacet !== void 0 ? newFacet : intermediateFacet;
      }, rootFacet);
      var count = facet && facet.count || 0;
      var exhaustive = facet && facet.exhaustive || false;
      var path = facet && facet.path || "";
      return {
        type: "hierarchical",
        attributeName,
        name: path,
        count,
        exhaustive
      };
    }
    module.exports = SearchResults;
  }
});

// node_modules/.pnpm/algoliasearch-helper@3.23.0_algoliasearch@5.19.0/node_modules/algoliasearch-helper/src/functions/flat.js
var require_flat = __commonJS({
  "node_modules/.pnpm/algoliasearch-helper@3.23.0_algoliasearch@5.19.0/node_modules/algoliasearch-helper/src/functions/flat.js"(exports, module) {
    module.exports = function flat(arr) {
      return arr.reduce(function(acc, val) {
        return acc.concat(val);
      }, []);
    };
  }
});

// node_modules/.pnpm/algoliasearch-helper@3.23.0_algoliasearch@5.19.0/node_modules/algoliasearch-helper/src/utils/sortAndMergeRecommendations.js
var require_sortAndMergeRecommendations = __commonJS({
  "node_modules/.pnpm/algoliasearch-helper@3.23.0_algoliasearch@5.19.0/node_modules/algoliasearch-helper/src/utils/sortAndMergeRecommendations.js"(exports, module) {
    "use strict";
    var find2 = require_find();
    var flat = require_flat();
    function getAverageIndices(indexTracker, nrOfObjs) {
      var avgIndices = [];
      Object.keys(indexTracker).forEach(function(key) {
        if (indexTracker[key].count < 2) {
          indexTracker[key].indexSum += 100;
        }
        avgIndices.push({
          objectID: key,
          avgOfIndices: indexTracker[key].indexSum / nrOfObjs
        });
      });
      return avgIndices.sort(function(a6, b3) {
        return a6.avgOfIndices > b3.avgOfIndices ? 1 : -1;
      });
    }
    function sortAndMergeRecommendations(results) {
      var indexTracker = {};
      results.forEach(function(hits) {
        hits.forEach(function(hit, index3) {
          if (!indexTracker[hit.objectID]) {
            indexTracker[hit.objectID] = { indexSum: index3, count: 1 };
          } else {
            indexTracker[hit.objectID] = {
              indexSum: indexTracker[hit.objectID].indexSum + index3,
              count: indexTracker[hit.objectID].count + 1
            };
          }
        });
      });
      var sortedAverageIndices = getAverageIndices(indexTracker, results.length);
      var finalOrder = sortedAverageIndices.reduce(
        function(orderedHits, avgIndexRef) {
          var result = find2(flat(results), function(hit) {
            return hit.objectID === avgIndexRef.objectID;
          });
          return result ? orderedHits.concat(result) : orderedHits;
        },
        []
      );
      return finalOrder;
    }
    module.exports = sortAndMergeRecommendations;
  }
});

// node_modules/.pnpm/algoliasearch-helper@3.23.0_algoliasearch@5.19.0/node_modules/algoliasearch-helper/src/version.js
var require_version = __commonJS({
  "node_modules/.pnpm/algoliasearch-helper@3.23.0_algoliasearch@5.19.0/node_modules/algoliasearch-helper/src/version.js"(exports, module) {
    "use strict";
    module.exports = "3.23.0";
  }
});

// node_modules/.pnpm/algoliasearch-helper@3.23.0_algoliasearch@5.19.0/node_modules/algoliasearch-helper/src/algoliasearch.helper.js
var require_algoliasearch_helper = __commonJS({
  "node_modules/.pnpm/algoliasearch-helper@3.23.0_algoliasearch@5.19.0/node_modules/algoliasearch-helper/src/algoliasearch.helper.js"(exports, module) {
    "use strict";
    var EventEmitter2 = require_events();
    var DerivedHelper = require_DerivedHelper();
    var escapeFacetValue2 = require_escapeFacetValue().escapeFacetValue;
    var inherits = require_inherits();
    var merge = require_merge();
    var objectHasKeys = require_objectHasKeys();
    var omit = require_omit();
    var RecommendParameters = require_RecommendParameters();
    var RecommendResults = require_RecommendResults();
    var requestBuilder = require_requestBuilder();
    var SearchParameters = require_SearchParameters();
    var SearchResults = require_SearchResults();
    var sortAndMergeRecommendations = require_sortAndMergeRecommendations();
    var version2 = require_version();
    function AlgoliaSearchHelper(client, index3, options, searchResultsOptions) {
      if (typeof client.addAlgoliaAgent === "function") {
        client.addAlgoliaAgent("JS Helper (" + version2 + ")");
      }
      this.setClient(client);
      var opts = options || {};
      opts.index = index3;
      this.state = SearchParameters.make(opts);
      this.recommendState = new RecommendParameters({
        params: opts.recommendState
      });
      this.lastResults = null;
      this.lastRecommendResults = null;
      this._queryId = 0;
      this._recommendQueryId = 0;
      this._lastQueryIdReceived = -1;
      this._lastRecommendQueryIdReceived = -1;
      this.derivedHelpers = [];
      this._currentNbQueries = 0;
      this._currentNbRecommendQueries = 0;
      this._searchResultsOptions = searchResultsOptions;
      this._recommendCache = {};
    }
    inherits(AlgoliaSearchHelper, EventEmitter2);
    AlgoliaSearchHelper.prototype.search = function() {
      this._search({ onlyWithDerivedHelpers: false });
      return this;
    };
    AlgoliaSearchHelper.prototype.searchOnlyWithDerivedHelpers = function() {
      this._search({ onlyWithDerivedHelpers: true });
      return this;
    };
    AlgoliaSearchHelper.prototype.searchWithComposition = function() {
      this._runComposition({ onlyWithDerivedHelpers: true });
      return this;
    };
    AlgoliaSearchHelper.prototype.recommend = function() {
      this._recommend();
      return this;
    };
    AlgoliaSearchHelper.prototype.getQuery = function() {
      var state = this.state;
      return requestBuilder._getHitsSearchParams(state);
    };
    AlgoliaSearchHelper.prototype.searchOnce = function(options, cb) {
      var tempState = !options ? this.state : this.state.setQueryParameters(options);
      var queries = requestBuilder._getQueries(tempState.index, tempState);
      var self = this;
      this._currentNbQueries++;
      this.emit("searchOnce", {
        state: tempState
      });
      if (cb) {
        this.client.search(queries).then(function(content) {
          self._currentNbQueries--;
          if (self._currentNbQueries === 0) {
            self.emit("searchQueueEmpty");
          }
          cb(null, new SearchResults(tempState, content.results), tempState);
        }).catch(function(err) {
          self._currentNbQueries--;
          if (self._currentNbQueries === 0) {
            self.emit("searchQueueEmpty");
          }
          cb(err, null, tempState);
        });
        return void 0;
      }
      return this.client.search(queries).then(
        function(content) {
          self._currentNbQueries--;
          if (self._currentNbQueries === 0) self.emit("searchQueueEmpty");
          return {
            content: new SearchResults(tempState, content.results),
            state: tempState,
            _originalResponse: content
          };
        },
        function(e6) {
          self._currentNbQueries--;
          if (self._currentNbQueries === 0) self.emit("searchQueueEmpty");
          throw e6;
        }
      );
    };
    AlgoliaSearchHelper.prototype.findAnswers = function(options) {
      console.warn("[algoliasearch-helper] answers is no longer supported");
      var state = this.state;
      var derivedHelper = this.derivedHelpers[0];
      if (!derivedHelper) {
        return Promise.resolve([]);
      }
      var derivedState = derivedHelper.getModifiedState(state);
      var data = merge(
        {
          attributesForPrediction: options.attributesForPrediction,
          nbHits: options.nbHits
        },
        {
          params: omit(requestBuilder._getHitsSearchParams(derivedState), [
            "attributesToSnippet",
            "hitsPerPage",
            "restrictSearchableAttributes",
            "snippetEllipsisText"
          ])
        }
      );
      var errorMessage = "search for answers was called, but this client does not have a function client.initIndex(index).findAnswers";
      if (typeof this.client.initIndex !== "function") {
        throw new Error(errorMessage);
      }
      var index3 = this.client.initIndex(derivedState.index);
      if (typeof index3.findAnswers !== "function") {
        throw new Error(errorMessage);
      }
      return index3.findAnswers(derivedState.query, options.queryLanguages, data);
    };
    AlgoliaSearchHelper.prototype.searchForFacetValues = function(facet, query, maxFacetHits, userState) {
      var clientHasSFFV = typeof this.client.searchForFacetValues === "function" && // v5 has a wrong sffv signature
      typeof this.client.searchForFacets !== "function";
      var clientHasInitIndex = typeof this.client.initIndex === "function";
      if (!clientHasSFFV && !clientHasInitIndex && typeof this.client.search !== "function") {
        throw new Error(
          "search for facet values (searchable) was called, but this client does not have a function client.searchForFacetValues or client.initIndex(index).searchForFacetValues"
        );
      }
      var state = this.state.setQueryParameters(userState || {});
      var isDisjunctive = state.isDisjunctiveFacet(facet);
      var algoliaQuery = requestBuilder.getSearchForFacetQuery(
        facet,
        query,
        maxFacetHits,
        state
      );
      this._currentNbQueries++;
      var self = this;
      var searchForFacetValuesPromise;
      if (clientHasSFFV) {
        searchForFacetValuesPromise = this.client.searchForFacetValues([
          { indexName: state.index, params: algoliaQuery }
        ]);
      } else if (clientHasInitIndex) {
        searchForFacetValuesPromise = this.client.initIndex(state.index).searchForFacetValues(algoliaQuery);
      } else {
        delete algoliaQuery.facetName;
        searchForFacetValuesPromise = this.client.search([
          {
            type: "facet",
            facet,
            indexName: state.index,
            params: algoliaQuery
          }
        ]).then(function processResponse(response) {
          return response.results[0];
        });
      }
      this.emit("searchForFacetValues", {
        state,
        facet,
        query
      });
      return searchForFacetValuesPromise.then(
        function addIsRefined(content) {
          self._currentNbQueries--;
          if (self._currentNbQueries === 0) self.emit("searchQueueEmpty");
          content = Array.isArray(content) ? content[0] : content;
          content.facetHits.forEach(function(f12) {
            f12.escapedValue = escapeFacetValue2(f12.value);
            f12.isRefined = isDisjunctive ? state.isDisjunctiveFacetRefined(facet, f12.escapedValue) : state.isFacetRefined(facet, f12.escapedValue);
          });
          return content;
        },
        function(e6) {
          self._currentNbQueries--;
          if (self._currentNbQueries === 0) self.emit("searchQueueEmpty");
          throw e6;
        }
      );
    };
    AlgoliaSearchHelper.prototype.searchForCompositionFacetValues = function(facet, query, maxFacetHits, userState) {
      if (typeof this.client.searchForFacetValues !== "function") {
        throw new Error(
          "search for facet values (searchable) was called, but this client does not have a function client.searchForFacetValues"
        );
      }
      var state = this.state.setQueryParameters(userState || {});
      var isDisjunctive = state.isDisjunctiveFacet(facet);
      this._currentNbQueries++;
      var self = this;
      var searchForFacetValuesPromise;
      searchForFacetValuesPromise = this.client.searchForFacetValues({
        compositionID: state.index,
        facetName: facet,
        searchForFacetValuesRequest: {
          params: {
            query,
            maxFacetHits,
            searchQuery: requestBuilder._getCompositionHitsSearchParams(state)
          }
        }
      });
      this.emit("searchForFacetValues", {
        state,
        facet,
        query
      });
      return searchForFacetValuesPromise.then(
        function addIsRefined(content) {
          self._currentNbQueries--;
          if (self._currentNbQueries === 0) self.emit("searchQueueEmpty");
          content = content.results[0];
          content.facetHits.forEach(function(f12) {
            f12.escapedValue = escapeFacetValue2(f12.value);
            f12.isRefined = isDisjunctive ? state.isDisjunctiveFacetRefined(facet, f12.escapedValue) : state.isFacetRefined(facet, f12.escapedValue);
          });
          return content;
        },
        function(e6) {
          self._currentNbQueries--;
          if (self._currentNbQueries === 0) self.emit("searchQueueEmpty");
          throw e6;
        }
      );
    };
    AlgoliaSearchHelper.prototype.setQuery = function(q2) {
      this._change({
        state: this.state.resetPage().setQuery(q2),
        isPageReset: true
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.clearRefinements = function(name) {
      this._change({
        state: this.state.resetPage().clearRefinements(name),
        isPageReset: true
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.clearTags = function() {
      this._change({
        state: this.state.resetPage().clearTags(),
        isPageReset: true
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.addDisjunctiveFacetRefinement = function(facet, value) {
      this._change({
        state: this.state.resetPage().addDisjunctiveFacetRefinement(facet, value),
        isPageReset: true
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.addDisjunctiveRefine = function() {
      return this.addDisjunctiveFacetRefinement.apply(this, arguments);
    };
    AlgoliaSearchHelper.prototype.addHierarchicalFacetRefinement = function(facet, path) {
      this._change({
        state: this.state.resetPage().addHierarchicalFacetRefinement(facet, path),
        isPageReset: true
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.addNumericRefinement = function(attribute, operator, value) {
      this._change({
        state: this.state.resetPage().addNumericRefinement(attribute, operator, value),
        isPageReset: true
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.addFacetRefinement = function(facet, value) {
      this._change({
        state: this.state.resetPage().addFacetRefinement(facet, value),
        isPageReset: true
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.addRefine = function() {
      return this.addFacetRefinement.apply(this, arguments);
    };
    AlgoliaSearchHelper.prototype.addFacetExclusion = function(facet, value) {
      this._change({
        state: this.state.resetPage().addExcludeRefinement(facet, value),
        isPageReset: true
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.addExclude = function() {
      return this.addFacetExclusion.apply(this, arguments);
    };
    AlgoliaSearchHelper.prototype.addTag = function(tag) {
      this._change({
        state: this.state.resetPage().addTagRefinement(tag),
        isPageReset: true
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.addFrequentlyBoughtTogether = function(params) {
      this._recommendChange({
        state: this.recommendState.addFrequentlyBoughtTogether(params)
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.addRelatedProducts = function(params) {
      this._recommendChange({
        state: this.recommendState.addRelatedProducts(params)
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.addTrendingItems = function(params) {
      this._recommendChange({
        state: this.recommendState.addTrendingItems(params)
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.addTrendingFacets = function(params) {
      this._recommendChange({
        state: this.recommendState.addTrendingFacets(params)
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.addLookingSimilar = function(params) {
      this._recommendChange({
        state: this.recommendState.addLookingSimilar(params)
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.removeNumericRefinement = function(attribute, operator, value) {
      this._change({
        state: this.state.resetPage().removeNumericRefinement(attribute, operator, value),
        isPageReset: true
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.removeDisjunctiveFacetRefinement = function(facet, value) {
      this._change({
        state: this.state.resetPage().removeDisjunctiveFacetRefinement(facet, value),
        isPageReset: true
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.removeDisjunctiveRefine = function() {
      return this.removeDisjunctiveFacetRefinement.apply(this, arguments);
    };
    AlgoliaSearchHelper.prototype.removeHierarchicalFacetRefinement = function(facet) {
      this._change({
        state: this.state.resetPage().removeHierarchicalFacetRefinement(facet),
        isPageReset: true
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.removeFacetRefinement = function(facet, value) {
      this._change({
        state: this.state.resetPage().removeFacetRefinement(facet, value),
        isPageReset: true
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.removeRefine = function() {
      return this.removeFacetRefinement.apply(this, arguments);
    };
    AlgoliaSearchHelper.prototype.removeFacetExclusion = function(facet, value) {
      this._change({
        state: this.state.resetPage().removeExcludeRefinement(facet, value),
        isPageReset: true
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.removeExclude = function() {
      return this.removeFacetExclusion.apply(this, arguments);
    };
    AlgoliaSearchHelper.prototype.removeTag = function(tag) {
      this._change({
        state: this.state.resetPage().removeTagRefinement(tag),
        isPageReset: true
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.removeFrequentlyBoughtTogether = function(id2) {
      this._recommendChange({
        state: this.recommendState.removeParams(id2)
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.removeRelatedProducts = function(id2) {
      this._recommendChange({
        state: this.recommendState.removeParams(id2)
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.removeTrendingItems = function(id2) {
      this._recommendChange({
        state: this.recommendState.removeParams(id2)
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.removeTrendingFacets = function(id2) {
      this._recommendChange({
        state: this.recommendState.removeParams(id2)
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.removeLookingSimilar = function(id2) {
      this._recommendChange({
        state: this.recommendState.removeParams(id2)
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.toggleFacetExclusion = function(facet, value) {
      this._change({
        state: this.state.resetPage().toggleExcludeFacetRefinement(facet, value),
        isPageReset: true
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.toggleExclude = function() {
      return this.toggleFacetExclusion.apply(this, arguments);
    };
    AlgoliaSearchHelper.prototype.toggleRefinement = function(facet, value) {
      return this.toggleFacetRefinement(facet, value);
    };
    AlgoliaSearchHelper.prototype.toggleFacetRefinement = function(facet, value) {
      this._change({
        state: this.state.resetPage().toggleFacetRefinement(facet, value),
        isPageReset: true
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.toggleRefine = function() {
      return this.toggleFacetRefinement.apply(this, arguments);
    };
    AlgoliaSearchHelper.prototype.toggleTag = function(tag) {
      this._change({
        state: this.state.resetPage().toggleTagRefinement(tag),
        isPageReset: true
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.nextPage = function() {
      var page = this.state.page || 0;
      return this.setPage(page + 1);
    };
    AlgoliaSearchHelper.prototype.previousPage = function() {
      var page = this.state.page || 0;
      return this.setPage(page - 1);
    };
    function setCurrentPage(page) {
      if (page < 0) throw new Error("Page requested below 0.");
      this._change({
        state: this.state.setPage(page),
        isPageReset: false
      });
      return this;
    }
    AlgoliaSearchHelper.prototype.setCurrentPage = setCurrentPage;
    AlgoliaSearchHelper.prototype.setPage = setCurrentPage;
    AlgoliaSearchHelper.prototype.setIndex = function(name) {
      this._change({
        state: this.state.resetPage().setIndex(name),
        isPageReset: true
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.setQueryParameter = function(parameter, value) {
      this._change({
        state: this.state.resetPage().setQueryParameter(parameter, value),
        isPageReset: true
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.setState = function(newState) {
      this._change({
        state: SearchParameters.make(newState),
        isPageReset: false
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.overrideStateWithoutTriggeringChangeEvent = function(newState) {
      this.state = new SearchParameters(newState);
      return this;
    };
    AlgoliaSearchHelper.prototype.hasRefinements = function(attribute) {
      if (objectHasKeys(this.state.getNumericRefinements(attribute))) {
        return true;
      } else if (this.state.isConjunctiveFacet(attribute)) {
        return this.state.isFacetRefined(attribute);
      } else if (this.state.isDisjunctiveFacet(attribute)) {
        return this.state.isDisjunctiveFacetRefined(attribute);
      } else if (this.state.isHierarchicalFacet(attribute)) {
        return this.state.isHierarchicalFacetRefined(attribute);
      }
      return false;
    };
    AlgoliaSearchHelper.prototype.isExcluded = function(facet, value) {
      return this.state.isExcludeRefined(facet, value);
    };
    AlgoliaSearchHelper.prototype.isDisjunctiveRefined = function(facet, value) {
      return this.state.isDisjunctiveFacetRefined(facet, value);
    };
    AlgoliaSearchHelper.prototype.hasTag = function(tag) {
      return this.state.isTagRefined(tag);
    };
    AlgoliaSearchHelper.prototype.isTagRefined = function() {
      return this.hasTagRefinements.apply(this, arguments);
    };
    AlgoliaSearchHelper.prototype.getIndex = function() {
      return this.state.index;
    };
    function getCurrentPage() {
      return this.state.page;
    }
    AlgoliaSearchHelper.prototype.getCurrentPage = getCurrentPage;
    AlgoliaSearchHelper.prototype.getPage = getCurrentPage;
    AlgoliaSearchHelper.prototype.getTags = function() {
      return this.state.tagRefinements;
    };
    AlgoliaSearchHelper.prototype.getRefinements = function(facetName) {
      var refinements = [];
      if (this.state.isConjunctiveFacet(facetName)) {
        var conjRefinements = this.state.getConjunctiveRefinements(facetName);
        conjRefinements.forEach(function(r7) {
          refinements.push({
            value: r7,
            type: "conjunctive"
          });
        });
        var excludeRefinements = this.state.getExcludeRefinements(facetName);
        excludeRefinements.forEach(function(r7) {
          refinements.push({
            value: r7,
            type: "exclude"
          });
        });
      } else if (this.state.isDisjunctiveFacet(facetName)) {
        var disjunctiveRefinements = this.state.getDisjunctiveRefinements(facetName);
        disjunctiveRefinements.forEach(function(r7) {
          refinements.push({
            value: r7,
            type: "disjunctive"
          });
        });
      }
      var numericRefinements = this.state.getNumericRefinements(facetName);
      Object.keys(numericRefinements).forEach(function(operator) {
        var value = numericRefinements[operator];
        refinements.push({
          value,
          operator,
          type: "numeric"
        });
      });
      return refinements;
    };
    AlgoliaSearchHelper.prototype.getNumericRefinement = function(attribute, operator) {
      return this.state.getNumericRefinement(attribute, operator);
    };
    AlgoliaSearchHelper.prototype.getHierarchicalFacetBreadcrumb = function(facetName) {
      return this.state.getHierarchicalFacetBreadcrumb(facetName);
    };
    AlgoliaSearchHelper.prototype._search = function(options) {
      var state = this.state;
      var states = [];
      var mainQueries = [];
      if (!options.onlyWithDerivedHelpers) {
        mainQueries = requestBuilder._getQueries(state.index, state);
        states.push({
          state,
          queriesCount: mainQueries.length,
          helper: this
        });
        this.emit("search", {
          state,
          results: this.lastResults
        });
      }
      var derivedQueries = this.derivedHelpers.map(function(derivedHelper) {
        var derivedState = derivedHelper.getModifiedState(state);
        var derivedStateQueries = derivedState.index ? requestBuilder._getQueries(derivedState.index, derivedState) : [];
        states.push({
          state: derivedState,
          queriesCount: derivedStateQueries.length,
          helper: derivedHelper
        });
        derivedHelper.emit("search", {
          state: derivedState,
          results: derivedHelper.lastResults
        });
        return derivedStateQueries;
      });
      var queries = Array.prototype.concat.apply(mainQueries, derivedQueries);
      var queryId = this._queryId++;
      this._currentNbQueries++;
      if (!queries.length) {
        return Promise.resolve({ results: [] }).then(
          this._dispatchAlgoliaResponse.bind(this, states, queryId)
        );
      }
      try {
        this.client.search(queries).then(this._dispatchAlgoliaResponse.bind(this, states, queryId)).catch(this._dispatchAlgoliaError.bind(this, queryId));
      } catch (error) {
        this.emit("error", {
          error
        });
      }
      return void 0;
    };
    AlgoliaSearchHelper.prototype._runComposition = function() {
      var state = this.state;
      var states = [];
      var mainQueries = [];
      var derivedQueries = this.derivedHelpers.map(function(derivedHelper) {
        var derivedState = derivedHelper.getModifiedState(state);
        var derivedStateQueries = requestBuilder._getCompositionQueries(derivedState);
        states.push({
          state: derivedState,
          queriesCount: derivedStateQueries.length,
          helper: derivedHelper
        });
        derivedHelper.emit("search", {
          state: derivedState,
          results: derivedHelper.lastResults
        });
        return derivedStateQueries;
      });
      var queries = Array.prototype.concat.apply(mainQueries, derivedQueries);
      var queryId = this._queryId++;
      this._currentNbQueries++;
      if (!queries.length) {
        return Promise.resolve({ results: [] }).then(
          this._dispatchAlgoliaResponse.bind(this, states, queryId)
        );
      }
      if (queries.length > 1) {
        throw new Error("Only one query is allowed when using a composition.");
      }
      var query = queries[0];
      try {
        this.client.search(query).then(this._dispatchAlgoliaResponse.bind(this, states, queryId)).catch(this._dispatchAlgoliaError.bind(this, queryId));
      } catch (error) {
        this.emit("error", {
          error
        });
      }
      return void 0;
    };
    AlgoliaSearchHelper.prototype._recommend = function() {
      var searchState = this.state;
      var recommendState = this.recommendState;
      var index3 = this.getIndex();
      var states = [{ state: recommendState, index: index3, helper: this }];
      var ids = recommendState.params.map(function(param) {
        return param.$$id;
      });
      this.emit("fetch", {
        recommend: {
          state: recommendState,
          results: this.lastRecommendResults
        }
      });
      var cache = this._recommendCache;
      var derivedQueries = this.derivedHelpers.map(function(derivedHelper) {
        var derivedIndex = derivedHelper.getModifiedState(searchState).index;
        if (!derivedIndex) {
          return [];
        }
        var derivedState = derivedHelper.getModifiedRecommendState(
          new RecommendParameters()
        );
        states.push({
          state: derivedState,
          index: derivedIndex,
          helper: derivedHelper
        });
        ids = Array.prototype.concat.apply(
          ids,
          derivedState.params.map(function(param) {
            return param.$$id;
          })
        );
        derivedHelper.emit("fetch", {
          recommend: {
            state: derivedState,
            results: derivedHelper.lastRecommendResults
          }
        });
        return derivedState._buildQueries(derivedIndex, cache);
      });
      var queries = Array.prototype.concat.apply(
        this.recommendState._buildQueries(index3, cache),
        derivedQueries
      );
      if (queries.length === 0) {
        return;
      }
      if (queries.length > 0 && typeof this.client.getRecommendations === "undefined") {
        console.warn(
          "Please update algoliasearch/lite to the latest version in order to use recommend widgets."
        );
        return;
      }
      var queryId = this._recommendQueryId++;
      this._currentNbRecommendQueries++;
      try {
        this.client.getRecommendations(queries).then(this._dispatchRecommendResponse.bind(this, queryId, states, ids)).catch(this._dispatchRecommendError.bind(this, queryId));
      } catch (error) {
        this.emit("error", {
          error
        });
      }
      return;
    };
    AlgoliaSearchHelper.prototype._dispatchAlgoliaResponse = function(states, queryId, content) {
      var self = this;
      if (queryId < this._lastQueryIdReceived) {
        return;
      }
      this._currentNbQueries -= queryId - this._lastQueryIdReceived;
      this._lastQueryIdReceived = queryId;
      if (this._currentNbQueries === 0) this.emit("searchQueueEmpty");
      var results = content.results.slice();
      states.forEach(function(s5) {
        var state = s5.state;
        var queriesCount = s5.queriesCount;
        var helper = s5.helper;
        var specificResults = results.splice(0, queriesCount);
        if (!state.index) {
          helper.emit("result", {
            results: null,
            state
          });
          return;
        }
        helper.lastResults = new SearchResults(
          state,
          specificResults,
          self._searchResultsOptions
        );
        helper.emit("result", {
          results: helper.lastResults,
          state
        });
      });
    };
    AlgoliaSearchHelper.prototype._dispatchRecommendResponse = function(queryId, states, ids, content) {
      if (queryId < this._lastRecommendQueryIdReceived) {
        return;
      }
      this._currentNbRecommendQueries -= queryId - this._lastRecommendQueryIdReceived;
      this._lastRecommendQueryIdReceived = queryId;
      if (this._currentNbRecommendQueries === 0) this.emit("recommendQueueEmpty");
      var cache = this._recommendCache;
      var idsMap = {};
      ids.filter(function(id2) {
        return cache[id2] === void 0;
      }).forEach(function(id2, index3) {
        if (!idsMap[id2]) idsMap[id2] = [];
        idsMap[id2].push(index3);
      });
      Object.keys(idsMap).forEach(function(id2) {
        var indices = idsMap[id2];
        var firstResult = content.results[indices[0]];
        if (indices.length === 1) {
          cache[id2] = firstResult;
          return;
        }
        cache[id2] = Object.assign({}, firstResult, {
          hits: sortAndMergeRecommendations(
            indices.map(function(idx) {
              return content.results[idx].hits;
            })
          )
        });
      });
      var results = {};
      ids.forEach(function(id2) {
        results[id2] = cache[id2];
      });
      states.forEach(function(s5) {
        var state = s5.state;
        var helper = s5.helper;
        if (!s5.index) {
          helper.emit("recommend:result", {
            results: null,
            state
          });
          return;
        }
        helper.lastRecommendResults = new RecommendResults(state, results);
        helper.emit("recommend:result", {
          recommend: {
            results: helper.lastRecommendResults,
            state
          }
        });
      });
    };
    AlgoliaSearchHelper.prototype._dispatchAlgoliaError = function(queryId, error) {
      if (queryId < this._lastQueryIdReceived) {
        return;
      }
      this._currentNbQueries -= queryId - this._lastQueryIdReceived;
      this._lastQueryIdReceived = queryId;
      this.emit("error", {
        error
      });
      if (this._currentNbQueries === 0) this.emit("searchQueueEmpty");
    };
    AlgoliaSearchHelper.prototype._dispatchRecommendError = function(queryId, error) {
      if (queryId < this._lastRecommendQueryIdReceived) {
        return;
      }
      this._currentNbRecommendQueries -= queryId - this._lastRecommendQueryIdReceived;
      this._lastRecommendQueryIdReceived = queryId;
      this.emit("error", {
        error
      });
      if (this._currentNbRecommendQueries === 0) this.emit("recommendQueueEmpty");
    };
    AlgoliaSearchHelper.prototype.containsRefinement = function(query, facetFilters, numericFilters, tagFilters) {
      return query || facetFilters.length !== 0 || numericFilters.length !== 0 || tagFilters.length !== 0;
    };
    AlgoliaSearchHelper.prototype._hasDisjunctiveRefinements = function(facet) {
      return this.state.disjunctiveRefinements[facet] && this.state.disjunctiveRefinements[facet].length > 0;
    };
    AlgoliaSearchHelper.prototype._change = function(event) {
      var state = event.state;
      var isPageReset = event.isPageReset;
      if (state !== this.state) {
        this.state = state;
        this.emit("change", {
          state: this.state,
          results: this.lastResults,
          isPageReset
        });
      }
    };
    AlgoliaSearchHelper.prototype._recommendChange = function(event) {
      var state = event.state;
      if (state !== this.recommendState) {
        this.recommendState = state;
        this.emit("recommend:change", {
          search: {
            results: this.lastResults,
            state: this.state
          },
          recommend: {
            results: this.lastRecommendResults,
            state: this.recommendState
          }
        });
      }
    };
    AlgoliaSearchHelper.prototype.clearCache = function() {
      if (this.client.clearCache) this.client.clearCache();
      return this;
    };
    AlgoliaSearchHelper.prototype.setClient = function(newClient) {
      if (this.client === newClient) return this;
      if (typeof newClient.addAlgoliaAgent === "function") {
        newClient.addAlgoliaAgent("JS Helper (" + version2 + ")");
      }
      this.client = newClient;
      return this;
    };
    AlgoliaSearchHelper.prototype.getClient = function() {
      return this.client;
    };
    AlgoliaSearchHelper.prototype.derive = function(fn, recommendFn) {
      var derivedHelper = new DerivedHelper(this, fn, recommendFn);
      this.derivedHelpers.push(derivedHelper);
      return derivedHelper;
    };
    AlgoliaSearchHelper.prototype.detachDerivedHelper = function(derivedHelper) {
      var pos = this.derivedHelpers.indexOf(derivedHelper);
      if (pos === -1) throw new Error("Derived helper already detached");
      this.derivedHelpers.splice(pos, 1);
    };
    AlgoliaSearchHelper.prototype.hasPendingRequests = function() {
      return this._currentNbQueries > 0;
    };
    module.exports = AlgoliaSearchHelper;
  }
});

// node_modules/.pnpm/algoliasearch-helper@3.23.0_algoliasearch@5.19.0/node_modules/algoliasearch-helper/index.js
var require_algoliasearch_helper2 = __commonJS({
  "node_modules/.pnpm/algoliasearch-helper@3.23.0_algoliasearch@5.19.0/node_modules/algoliasearch-helper/index.js"(exports, module) {
    "use strict";
    var AlgoliaSearchHelper = require_algoliasearch_helper();
    var RecommendParameters = require_RecommendParameters();
    var RecommendResults = require_RecommendResults();
    var SearchParameters = require_SearchParameters();
    var SearchResults = require_SearchResults();
    function algoliasearchHelper5(client, index3, opts, searchResultsOptions) {
      return new AlgoliaSearchHelper(client, index3, opts, searchResultsOptions);
    }
    algoliasearchHelper5.version = require_version();
    algoliasearchHelper5.AlgoliaSearchHelper = AlgoliaSearchHelper;
    algoliasearchHelper5.SearchParameters = SearchParameters;
    algoliasearchHelper5.RecommendParameters = RecommendParameters;
    algoliasearchHelper5.SearchResults = SearchResults;
    algoliasearchHelper5.RecommendResults = RecommendResults;
    module.exports = algoliasearchHelper5;
  }
});

// node_modules/.pnpm/qs@6.9.7/node_modules/qs/lib/formats.js
var require_formats = __commonJS({
  "node_modules/.pnpm/qs@6.9.7/node_modules/qs/lib/formats.js"(exports, module) {
    "use strict";
    var replace = String.prototype.replace;
    var percentTwenties = /%20/g;
    var Format = {
      RFC1738: "RFC1738",
      RFC3986: "RFC3986"
    };
    module.exports = {
      "default": Format.RFC3986,
      formatters: {
        RFC1738: function(value) {
          return replace.call(value, percentTwenties, "+");
        },
        RFC3986: function(value) {
          return String(value);
        }
      },
      RFC1738: Format.RFC1738,
      RFC3986: Format.RFC3986
    };
  }
});

// node_modules/.pnpm/qs@6.9.7/node_modules/qs/lib/utils.js
var require_utils = __commonJS({
  "node_modules/.pnpm/qs@6.9.7/node_modules/qs/lib/utils.js"(exports, module) {
    "use strict";
    var formats = require_formats();
    var has = Object.prototype.hasOwnProperty;
    var isArray = Array.isArray;
    var hexTable = function() {
      var array = [];
      for (var i6 = 0; i6 < 256; ++i6) {
        array.push("%" + ((i6 < 16 ? "0" : "") + i6.toString(16)).toUpperCase());
      }
      return array;
    }();
    var compactQueue = function compactQueue2(queue) {
      while (queue.length > 1) {
        var item = queue.pop();
        var obj = item.obj[item.prop];
        if (isArray(obj)) {
          var compacted = [];
          for (var j2 = 0; j2 < obj.length; ++j2) {
            if (typeof obj[j2] !== "undefined") {
              compacted.push(obj[j2]);
            }
          }
          item.obj[item.prop] = compacted;
        }
      }
    };
    var arrayToObject = function arrayToObject2(source, options) {
      var obj = options && options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      for (var i6 = 0; i6 < source.length; ++i6) {
        if (typeof source[i6] !== "undefined") {
          obj[i6] = source[i6];
        }
      }
      return obj;
    };
    var merge = function merge2(target, source, options) {
      if (!source) {
        return target;
      }
      if (typeof source !== "object") {
        if (isArray(target)) {
          target.push(source);
        } else if (target && typeof target === "object") {
          if (options && (options.plainObjects || options.allowPrototypes) || !has.call(Object.prototype, source)) {
            target[source] = true;
          }
        } else {
          return [target, source];
        }
        return target;
      }
      if (!target || typeof target !== "object") {
        return [target].concat(source);
      }
      var mergeTarget = target;
      if (isArray(target) && !isArray(source)) {
        mergeTarget = arrayToObject(target, options);
      }
      if (isArray(target) && isArray(source)) {
        source.forEach(function(item, i6) {
          if (has.call(target, i6)) {
            var targetItem = target[i6];
            if (targetItem && typeof targetItem === "object" && item && typeof item === "object") {
              target[i6] = merge2(targetItem, item, options);
            } else {
              target.push(item);
            }
          } else {
            target[i6] = item;
          }
        });
        return target;
      }
      return Object.keys(source).reduce(function(acc, key) {
        var value = source[key];
        if (has.call(acc, key)) {
          acc[key] = merge2(acc[key], value, options);
        } else {
          acc[key] = value;
        }
        return acc;
      }, mergeTarget);
    };
    var assign = function assignSingleSource(target, source) {
      return Object.keys(source).reduce(function(acc, key) {
        acc[key] = source[key];
        return acc;
      }, target);
    };
    var decode = function(str, decoder, charset) {
      var strWithoutPlus = str.replace(/\+/g, " ");
      if (charset === "iso-8859-1") {
        return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
      }
      try {
        return decodeURIComponent(strWithoutPlus);
      } catch (e6) {
        return strWithoutPlus;
      }
    };
    var encode = function encode2(str, defaultEncoder, charset, kind, format) {
      if (str.length === 0) {
        return str;
      }
      var string = str;
      if (typeof str === "symbol") {
        string = Symbol.prototype.toString.call(str);
      } else if (typeof str !== "string") {
        string = String(str);
      }
      if (charset === "iso-8859-1") {
        return escape(string).replace(/%u[0-9a-f]{4}/gi, function($0) {
          return "%26%23" + parseInt($0.slice(2), 16) + "%3B";
        });
      }
      var out = "";
      for (var i6 = 0; i6 < string.length; ++i6) {
        var c14 = string.charCodeAt(i6);
        if (c14 === 45 || c14 === 46 || c14 === 95 || c14 === 126 || c14 >= 48 && c14 <= 57 || c14 >= 65 && c14 <= 90 || c14 >= 97 && c14 <= 122 || format === formats.RFC1738 && (c14 === 40 || c14 === 41)) {
          out += string.charAt(i6);
          continue;
        }
        if (c14 < 128) {
          out = out + hexTable[c14];
          continue;
        }
        if (c14 < 2048) {
          out = out + (hexTable[192 | c14 >> 6] + hexTable[128 | c14 & 63]);
          continue;
        }
        if (c14 < 55296 || c14 >= 57344) {
          out = out + (hexTable[224 | c14 >> 12] + hexTable[128 | c14 >> 6 & 63] + hexTable[128 | c14 & 63]);
          continue;
        }
        i6 += 1;
        c14 = 65536 + ((c14 & 1023) << 10 | string.charCodeAt(i6) & 1023);
        out += hexTable[240 | c14 >> 18] + hexTable[128 | c14 >> 12 & 63] + hexTable[128 | c14 >> 6 & 63] + hexTable[128 | c14 & 63];
      }
      return out;
    };
    var compact = function compact2(value) {
      var queue = [{ obj: { o: value }, prop: "o" }];
      var refs = [];
      for (var i6 = 0; i6 < queue.length; ++i6) {
        var item = queue[i6];
        var obj = item.obj[item.prop];
        var keys2 = Object.keys(obj);
        for (var j2 = 0; j2 < keys2.length; ++j2) {
          var key = keys2[j2];
          var val = obj[key];
          if (typeof val === "object" && val !== null && refs.indexOf(val) === -1) {
            queue.push({ obj, prop: key });
            refs.push(val);
          }
        }
      }
      compactQueue(queue);
      return value;
    };
    var isRegExp = function isRegExp2(obj) {
      return Object.prototype.toString.call(obj) === "[object RegExp]";
    };
    var isBuffer = function isBuffer2(obj) {
      if (!obj || typeof obj !== "object") {
        return false;
      }
      return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
    };
    var combine = function combine2(a6, b3) {
      return [].concat(a6, b3);
    };
    var maybeMap = function maybeMap2(val, fn) {
      if (isArray(val)) {
        var mapped = [];
        for (var i6 = 0; i6 < val.length; i6 += 1) {
          mapped.push(fn(val[i6]));
        }
        return mapped;
      }
      return fn(val);
    };
    module.exports = {
      arrayToObject,
      assign,
      combine,
      compact,
      decode,
      encode,
      isBuffer,
      isRegExp,
      maybeMap,
      merge
    };
  }
});

// node_modules/.pnpm/qs@6.9.7/node_modules/qs/lib/stringify.js
var require_stringify = __commonJS({
  "node_modules/.pnpm/qs@6.9.7/node_modules/qs/lib/stringify.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var formats = require_formats();
    var has = Object.prototype.hasOwnProperty;
    var arrayPrefixGenerators = {
      brackets: function brackets(prefix) {
        return prefix + "[]";
      },
      comma: "comma",
      indices: function indices(prefix, key) {
        return prefix + "[" + key + "]";
      },
      repeat: function repeat(prefix) {
        return prefix;
      }
    };
    var isArray = Array.isArray;
    var split = String.prototype.split;
    var push = Array.prototype.push;
    var pushToArray = function(arr, valueOrArray) {
      push.apply(arr, isArray(valueOrArray) ? valueOrArray : [valueOrArray]);
    };
    var toISO = Date.prototype.toISOString;
    var defaultFormat = formats["default"];
    var defaults = {
      addQueryPrefix: false,
      allowDots: false,
      charset: "utf-8",
      charsetSentinel: false,
      delimiter: "&",
      encode: true,
      encoder: utils.encode,
      encodeValuesOnly: false,
      format: defaultFormat,
      formatter: formats.formatters[defaultFormat],
      // deprecated
      indices: false,
      serializeDate: function serializeDate(date) {
        return toISO.call(date);
      },
      skipNulls: false,
      strictNullHandling: false
    };
    var isNonNullishPrimitive = function isNonNullishPrimitive2(v6) {
      return typeof v6 === "string" || typeof v6 === "number" || typeof v6 === "boolean" || typeof v6 === "symbol" || typeof v6 === "bigint";
    };
    var stringify = function stringify2(object, prefix, generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, format, formatter, encodeValuesOnly, charset) {
      var obj = object;
      if (typeof filter === "function") {
        obj = filter(prefix, obj);
      } else if (obj instanceof Date) {
        obj = serializeDate(obj);
      } else if (generateArrayPrefix === "comma" && isArray(obj)) {
        obj = utils.maybeMap(obj, function(value2) {
          if (value2 instanceof Date) {
            return serializeDate(value2);
          }
          return value2;
        });
      }
      if (obj === null) {
        if (strictNullHandling) {
          return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder, charset, "key", format) : prefix;
        }
        obj = "";
      }
      if (isNonNullishPrimitive(obj) || utils.isBuffer(obj)) {
        if (encoder) {
          var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset, "key", format);
          if (generateArrayPrefix === "comma" && encodeValuesOnly) {
            var valuesArray = split.call(String(obj), ",");
            var valuesJoined = "";
            for (var i6 = 0; i6 < valuesArray.length; ++i6) {
              valuesJoined += (i6 === 0 ? "" : ",") + formatter(encoder(valuesArray[i6], defaults.encoder, charset, "value", format));
            }
            return [formatter(keyValue) + "=" + valuesJoined];
          }
          return [formatter(keyValue) + "=" + formatter(encoder(obj, defaults.encoder, charset, "value", format))];
        }
        return [formatter(prefix) + "=" + formatter(String(obj))];
      }
      var values = [];
      if (typeof obj === "undefined") {
        return values;
      }
      var objKeys;
      if (generateArrayPrefix === "comma" && isArray(obj)) {
        objKeys = [{ value: obj.length > 0 ? obj.join(",") || null : void 0 }];
      } else if (isArray(filter)) {
        objKeys = filter;
      } else {
        var keys2 = Object.keys(obj);
        objKeys = sort ? keys2.sort(sort) : keys2;
      }
      for (var j2 = 0; j2 < objKeys.length; ++j2) {
        var key = objKeys[j2];
        var value = typeof key === "object" && typeof key.value !== "undefined" ? key.value : obj[key];
        if (skipNulls && value === null) {
          continue;
        }
        var keyPrefix = isArray(obj) ? typeof generateArrayPrefix === "function" ? generateArrayPrefix(prefix, key) : prefix : prefix + (allowDots ? "." + key : "[" + key + "]");
        pushToArray(values, stringify2(
          value,
          keyPrefix,
          generateArrayPrefix,
          strictNullHandling,
          skipNulls,
          encoder,
          filter,
          sort,
          allowDots,
          serializeDate,
          format,
          formatter,
          encodeValuesOnly,
          charset
        ));
      }
      return values;
    };
    var normalizeStringifyOptions = function normalizeStringifyOptions2(opts) {
      if (!opts) {
        return defaults;
      }
      if (opts.encoder !== null && typeof opts.encoder !== "undefined" && typeof opts.encoder !== "function") {
        throw new TypeError("Encoder has to be a function.");
      }
      var charset = opts.charset || defaults.charset;
      if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
        throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
      }
      var format = formats["default"];
      if (typeof opts.format !== "undefined") {
        if (!has.call(formats.formatters, opts.format)) {
          throw new TypeError("Unknown format option provided.");
        }
        format = opts.format;
      }
      var formatter = formats.formatters[format];
      var filter = defaults.filter;
      if (typeof opts.filter === "function" || isArray(opts.filter)) {
        filter = opts.filter;
      }
      return {
        addQueryPrefix: typeof opts.addQueryPrefix === "boolean" ? opts.addQueryPrefix : defaults.addQueryPrefix,
        allowDots: typeof opts.allowDots === "undefined" ? defaults.allowDots : !!opts.allowDots,
        charset,
        charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults.charsetSentinel,
        delimiter: typeof opts.delimiter === "undefined" ? defaults.delimiter : opts.delimiter,
        encode: typeof opts.encode === "boolean" ? opts.encode : defaults.encode,
        encoder: typeof opts.encoder === "function" ? opts.encoder : defaults.encoder,
        encodeValuesOnly: typeof opts.encodeValuesOnly === "boolean" ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
        filter,
        format,
        formatter,
        serializeDate: typeof opts.serializeDate === "function" ? opts.serializeDate : defaults.serializeDate,
        skipNulls: typeof opts.skipNulls === "boolean" ? opts.skipNulls : defaults.skipNulls,
        sort: typeof opts.sort === "function" ? opts.sort : null,
        strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults.strictNullHandling
      };
    };
    module.exports = function(object, opts) {
      var obj = object;
      var options = normalizeStringifyOptions(opts);
      var objKeys;
      var filter;
      if (typeof options.filter === "function") {
        filter = options.filter;
        obj = filter("", obj);
      } else if (isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
      }
      var keys2 = [];
      if (typeof obj !== "object" || obj === null) {
        return "";
      }
      var arrayFormat;
      if (opts && opts.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = opts.arrayFormat;
      } else if (opts && "indices" in opts) {
        arrayFormat = opts.indices ? "indices" : "repeat";
      } else {
        arrayFormat = "indices";
      }
      var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];
      if (!objKeys) {
        objKeys = Object.keys(obj);
      }
      if (options.sort) {
        objKeys.sort(options.sort);
      }
      for (var i6 = 0; i6 < objKeys.length; ++i6) {
        var key = objKeys[i6];
        if (options.skipNulls && obj[key] === null) {
          continue;
        }
        pushToArray(keys2, stringify(
          obj[key],
          key,
          generateArrayPrefix,
          options.strictNullHandling,
          options.skipNulls,
          options.encode ? options.encoder : null,
          options.filter,
          options.sort,
          options.allowDots,
          options.serializeDate,
          options.format,
          options.formatter,
          options.encodeValuesOnly,
          options.charset
        ));
      }
      var joined = keys2.join(options.delimiter);
      var prefix = options.addQueryPrefix === true ? "?" : "";
      if (options.charsetSentinel) {
        if (options.charset === "iso-8859-1") {
          prefix += "utf8=%26%2310003%3B&";
        } else {
          prefix += "utf8=%E2%9C%93&";
        }
      }
      return joined.length > 0 ? prefix + joined : "";
    };
  }
});

// node_modules/.pnpm/qs@6.9.7/node_modules/qs/lib/parse.js
var require_parse = __commonJS({
  "node_modules/.pnpm/qs@6.9.7/node_modules/qs/lib/parse.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var has = Object.prototype.hasOwnProperty;
    var isArray = Array.isArray;
    var defaults = {
      allowDots: false,
      allowPrototypes: false,
      arrayLimit: 20,
      charset: "utf-8",
      charsetSentinel: false,
      comma: false,
      decoder: utils.decode,
      delimiter: "&",
      depth: 5,
      ignoreQueryPrefix: false,
      interpretNumericEntities: false,
      parameterLimit: 1e3,
      parseArrays: true,
      plainObjects: false,
      strictNullHandling: false
    };
    var interpretNumericEntities = function(str) {
      return str.replace(/&#(\d+);/g, function($0, numberStr) {
        return String.fromCharCode(parseInt(numberStr, 10));
      });
    };
    var parseArrayValue = function(val, options) {
      if (val && typeof val === "string" && options.comma && val.indexOf(",") > -1) {
        return val.split(",");
      }
      return val;
    };
    var isoSentinel = "utf8=%26%2310003%3B";
    var charsetSentinel = "utf8=%E2%9C%93";
    var parseValues = function parseQueryStringValues(str, options) {
      var obj = {};
      var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, "") : str;
      var limit = options.parameterLimit === Infinity ? void 0 : options.parameterLimit;
      var parts = cleanStr.split(options.delimiter, limit);
      var skipIndex = -1;
      var i6;
      var charset = options.charset;
      if (options.charsetSentinel) {
        for (i6 = 0; i6 < parts.length; ++i6) {
          if (parts[i6].indexOf("utf8=") === 0) {
            if (parts[i6] === charsetSentinel) {
              charset = "utf-8";
            } else if (parts[i6] === isoSentinel) {
              charset = "iso-8859-1";
            }
            skipIndex = i6;
            i6 = parts.length;
          }
        }
      }
      for (i6 = 0; i6 < parts.length; ++i6) {
        if (i6 === skipIndex) {
          continue;
        }
        var part = parts[i6];
        var bracketEqualsPos = part.indexOf("]=");
        var pos = bracketEqualsPos === -1 ? part.indexOf("=") : bracketEqualsPos + 1;
        var key, val;
        if (pos === -1) {
          key = options.decoder(part, defaults.decoder, charset, "key");
          val = options.strictNullHandling ? null : "";
        } else {
          key = options.decoder(part.slice(0, pos), defaults.decoder, charset, "key");
          val = utils.maybeMap(
            parseArrayValue(part.slice(pos + 1), options),
            function(encodedVal) {
              return options.decoder(encodedVal, defaults.decoder, charset, "value");
            }
          );
        }
        if (val && options.interpretNumericEntities && charset === "iso-8859-1") {
          val = interpretNumericEntities(val);
        }
        if (part.indexOf("[]=") > -1) {
          val = isArray(val) ? [val] : val;
        }
        if (has.call(obj, key)) {
          obj[key] = utils.combine(obj[key], val);
        } else {
          obj[key] = val;
        }
      }
      return obj;
    };
    var parseObject = function(chain, val, options, valuesParsed) {
      var leaf = valuesParsed ? val : parseArrayValue(val, options);
      for (var i6 = chain.length - 1; i6 >= 0; --i6) {
        var obj;
        var root = chain[i6];
        if (root === "[]" && options.parseArrays) {
          obj = [].concat(leaf);
        } else {
          obj = options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
          var cleanRoot = root.charAt(0) === "[" && root.charAt(root.length - 1) === "]" ? root.slice(1, -1) : root;
          var index3 = parseInt(cleanRoot, 10);
          if (!options.parseArrays && cleanRoot === "") {
            obj = { 0: leaf };
          } else if (!isNaN(index3) && root !== cleanRoot && String(index3) === cleanRoot && index3 >= 0 && (options.parseArrays && index3 <= options.arrayLimit)) {
            obj = [];
            obj[index3] = leaf;
          } else if (cleanRoot !== "__proto__") {
            obj[cleanRoot] = leaf;
          }
        }
        leaf = obj;
      }
      return leaf;
    };
    var parseKeys = function parseQueryStringKeys(givenKey, val, options, valuesParsed) {
      if (!givenKey) {
        return;
      }
      var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, "[$1]") : givenKey;
      var brackets = /(\[[^[\]]*])/;
      var child = /(\[[^[\]]*])/g;
      var segment = options.depth > 0 && brackets.exec(key);
      var parent = segment ? key.slice(0, segment.index) : key;
      var keys2 = [];
      if (parent) {
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
          if (!options.allowPrototypes) {
            return;
          }
        }
        keys2.push(parent);
      }
      var i6 = 0;
      while (options.depth > 0 && (segment = child.exec(key)) !== null && i6 < options.depth) {
        i6 += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
          if (!options.allowPrototypes) {
            return;
          }
        }
        keys2.push(segment[1]);
      }
      if (segment) {
        keys2.push("[" + key.slice(segment.index) + "]");
      }
      return parseObject(keys2, val, options, valuesParsed);
    };
    var normalizeParseOptions = function normalizeParseOptions2(opts) {
      if (!opts) {
        return defaults;
      }
      if (opts.decoder !== null && opts.decoder !== void 0 && typeof opts.decoder !== "function") {
        throw new TypeError("Decoder has to be a function.");
      }
      if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
        throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
      }
      var charset = typeof opts.charset === "undefined" ? defaults.charset : opts.charset;
      return {
        allowDots: typeof opts.allowDots === "undefined" ? defaults.allowDots : !!opts.allowDots,
        allowPrototypes: typeof opts.allowPrototypes === "boolean" ? opts.allowPrototypes : defaults.allowPrototypes,
        arrayLimit: typeof opts.arrayLimit === "number" ? opts.arrayLimit : defaults.arrayLimit,
        charset,
        charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults.charsetSentinel,
        comma: typeof opts.comma === "boolean" ? opts.comma : defaults.comma,
        decoder: typeof opts.decoder === "function" ? opts.decoder : defaults.decoder,
        delimiter: typeof opts.delimiter === "string" || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults.delimiter,
        // eslint-disable-next-line no-implicit-coercion, no-extra-parens
        depth: typeof opts.depth === "number" || opts.depth === false ? +opts.depth : defaults.depth,
        ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
        interpretNumericEntities: typeof opts.interpretNumericEntities === "boolean" ? opts.interpretNumericEntities : defaults.interpretNumericEntities,
        parameterLimit: typeof opts.parameterLimit === "number" ? opts.parameterLimit : defaults.parameterLimit,
        parseArrays: opts.parseArrays !== false,
        plainObjects: typeof opts.plainObjects === "boolean" ? opts.plainObjects : defaults.plainObjects,
        strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults.strictNullHandling
      };
    };
    module.exports = function(str, opts) {
      var options = normalizeParseOptions(opts);
      if (str === "" || str === null || typeof str === "undefined") {
        return options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      }
      var tempObj = typeof str === "string" ? parseValues(str, options) : str;
      var obj = options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      var keys2 = Object.keys(tempObj);
      for (var i6 = 0; i6 < keys2.length; ++i6) {
        var key = keys2[i6];
        var newObj = parseKeys(key, tempObj[key], options, typeof str === "string");
        obj = utils.merge(obj, newObj, options);
      }
      return utils.compact(obj);
    };
  }
});

// node_modules/.pnpm/qs@6.9.7/node_modules/qs/lib/index.js
var require_lib = __commonJS({
  "node_modules/.pnpm/qs@6.9.7/node_modules/qs/lib/index.js"(exports, module) {
    "use strict";
    var stringify = require_stringify();
    var parse = require_parse();
    var formats = require_formats();
    module.exports = {
      formats,
      parse,
      stringify
    };
  }
});

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/util/suit.js
function suit_default(r7, e6, o12) {
  if (!r7) throw new Error("You need to provide `widgetName` in your data");
  var t4 = ["ais-" + r7];
  return e6 && t4.push("-" + e6), o12 && t4.push("--" + o12), t4.join("");
}

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/mixins/suit.js
var t = function(t4) {
  var a6 = t4.name;
  return { props: { classNames: { type: Object, default: void 0 } }, methods: { suit: function(t5, e6) {
    var r7 = suit_default(a6, t5, e6), i6 = this.classNames && this.classNames[r7];
    return i6 ? [r7, i6].join(" ") : r7;
  } } };
};

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/util/polyfills.js
function e(e6) {
  for (var r7 = arguments, n6 = 1; n6 < arguments.length; n6++) {
    var o12 = null != r7[n6] ? r7[n6] : {}, c14 = Object.keys(o12);
    "function" == typeof Object.getOwnPropertySymbols && (c14 = c14.concat(Object.getOwnPropertySymbols(o12).filter(function(e7) {
      return Object.getOwnPropertyDescriptor(o12, e7).enumerable;
    }))), c14.forEach(function(r8) {
      t2(e6, r8, o12[r8]);
    });
  }
  return e6;
}
function t2(e6, t4, r7) {
  return t4 in e6 ? Object.defineProperty(e6, t4, { value: r7, enumerable: true, configurable: true, writable: true }) : e6[t4] = r7, e6;
}

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/util/vue-compat/index-vue3.js
init_vue_runtime_esm_bundler();
init_vue_runtime_esm_bundler();
init_vue_runtime_esm_bundler();
var o = false;
var r = true;
function n(t4) {
  function o12(t5, o13) {
    for (var r7 = [], n6 = arguments.length - 2; n6-- > 0; ) r7[n6] = arguments[n6 + 2];
    var s5 = r7.length > 0 ? r7 : void 0;
    if ("object" == typeof o13 && (o13.attrs || o13.props || o13.scopedSlots || o13.on)) {
      var u5 = Object.keys(o13.on || {}), c14 = Object.assign({}, o13, o13.attrs, o13.props, u5.reduce(function(e6, t6) {
        return e6["on" + t6[0].toUpperCase() + t6.slice(1)] = o13.on[t6], e6;
      }, {}));
      return delete c14.attrs, delete c14.props, delete c14.scopedSlots, u5.forEach(function(e6) {
        return delete c14.on[e6];
      }), c14.on && 0 === Object.keys(c14.on).length && delete c14.on, h(t5, c14, o13.scopedSlots ? Object.assign({ default: function() {
        return s5;
      } }, o13.scopedSlots) : s5);
    }
    return h(t5, o13, s5);
  }
  return function() {
    return t4.call(this, o12);
  };
}
function s(e6) {
  var t4 = e6.$slots || e6.slots;
  return "function" == typeof t4.default ? t4.default() : t4.default;
}
function u(e6, t4) {
  return (e6.$slots || e6.slots || {})[t4];
}

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/util/warn.js
var n2 = /* @__PURE__ */ new Set();
function a(a6) {
  n2.has(a6) || (n2.add(a6), console.warn(a6));
}

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/mixins/widget.js
var n3 = function(n6, i6) {
  var s5;
  void 0 === n6 && (n6 = {});
  var a6 = n6.connector;
  return void 0 === i6 && (i6 = {}), (s5 = { inject: { instantSearchInstance: { from: "$_ais_instantSearchInstance", default: function() {
    var t4 = this.$options._componentTag;
    throw new TypeError('It looks like you forgot to wrap your Algolia search component "<' + t4 + '>" inside of an "<ais-instant-search>" component.');
  } }, getParentIndex: { from: "$_ais_getParentIndex", default: function() {
    var t4 = this;
    return function() {
      return t4.instantSearchInstance.mainIndex;
    };
  } } }, data: function() {
    return { state: null };
  }, created: function() {
    if ("function" == typeof a6) {
      if (this.factory = a6(this.updateState, function() {
      }), this.widget = e(this.factory(this.widgetParams), i6), this.getParentIndex().addWidgets([this.widget]), this.instantSearchInstance._initialResults && !this.instantSearchInstance.started) {
        if ("function" != typeof this.instantSearchInstance.__forceRender) throw new Error("You are using server side rendering with <ais-instant-search> instead of <ais-instant-search-ssr>.");
        this.instantSearchInstance.__forceRender(this.widget, this.getParentIndex());
      }
    } else true !== a6 && a("You are using the InstantSearch widget mixin, but didn't provide a connector.\nWhile this is technically possible, and will give you access to the Helper,\nit's not the recommended way of making custom components.\n\nIf you want to disable this message, pass { connector: true } to the mixin.\n\nRead more on using connectors: https://alg.li/vue-custom");
  } }).beforeUnmount = function() {
    this.widget && this.getParentIndex().removeWidgets([this.widget]);
  }, s5.watch = { widgetParams: { handler: function(e6) {
    this.state = null, this.getParentIndex().removeWidgets([this.widget]), this.widget = e(this.factory(e6), i6), this.getParentIndex().addWidgets([this.widget]);
  }, deep: true } }, s5.methods = { updateState: function(t4, e6) {
    void 0 === t4 && (t4 = {}), e6 || (this.state = t4);
  } }, s5;
};

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/lib/utils/addWidgetId.js
var id = 0;
function addWidgetId(widget) {
  if (widget.dependsOn !== "recommend") {
    return;
  }
  widget.$$id = id++;
}

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/lib/utils/capitalize.js
function capitalize(text) {
  return text.toString().charAt(0).toUpperCase() + text.toString().slice(1);
}

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/lib/utils/noop.js
function noop() {
}

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/lib/utils/logger.js
var deprecate = function deprecate2(fn, message) {
  return fn;
};
var warn = noop;
var _warning = noop;
if (true) {
  warn = function warn2(message) {
    console.warn("[InstantSearch.js]: ".concat(message.trim()));
  };
  deprecate = function deprecate3(fn, message) {
    var hasAlreadyPrinted = false;
    return function() {
      if (!hasAlreadyPrinted) {
        hasAlreadyPrinted = true;
        true ? warn(message) : void 0;
      }
      return fn.apply(void 0, arguments);
    };
  };
  _warning = function warning(condition, message) {
    if (condition) {
      return;
    }
    var hasAlreadyPrinted = _warning.cache[message];
    if (!hasAlreadyPrinted) {
      _warning.cache[message] = true;
      true ? warn(message) : void 0;
    }
  };
  _warning.cache = {};
}

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/lib/utils/typedObject.js
var keys = Object.keys;

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/lib/utils/checkIndexUiState.js
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _slicedToArray(arr, i6) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i6) || _unsupportedIterableToArray(arr, i6) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o12, minLen) {
  if (!o12) return;
  if (typeof o12 === "string") return _arrayLikeToArray(o12, minLen);
  var n6 = Object.prototype.toString.call(o12).slice(8, -1);
  if (n6 === "Object" && o12.constructor) n6 = o12.constructor.name;
  if (n6 === "Map" || n6 === "Set") return Array.from(o12);
  if (n6 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n6)) return _arrayLikeToArray(o12, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i6 = 0, arr2 = new Array(len); i6 < len; i6++) arr2[i6] = arr[i6];
  return arr2;
}
function _iterableToArrayLimit(r7, l4) {
  var t4 = null == r7 ? null : "undefined" != typeof Symbol && r7[Symbol.iterator] || r7["@@iterator"];
  if (null != t4) {
    var e6, n6, i6, u5, a6 = [], f12 = true, o12 = false;
    try {
      if (i6 = (t4 = t4.call(r7)).next, 0 === l4) {
        if (Object(t4) !== t4) return;
        f12 = false;
      } else for (; !(f12 = (e6 = i6.call(t4)).done) && (a6.push(e6.value), a6.length !== l4); f12 = true) ;
    } catch (r8) {
      o12 = true, n6 = r8;
    } finally {
      try {
        if (!f12 && null != t4.return && (u5 = t4.return(), Object(u5) !== u5)) return;
      } finally {
        if (o12) throw n6;
      }
    }
    return a6;
  }
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function getWidgetNames(connectorName) {
  switch (connectorName) {
    case "range":
      return [];
    case "menu":
      return ["menu", "menuSelect"];
    default:
      return [connectorName];
  }
}
var stateToWidgetsMap = {
  query: {
    connectors: ["connectSearchBox"],
    widgets: ["ais.searchBox", "ais.autocomplete", "ais.voiceSearch"]
  },
  refinementList: {
    connectors: ["connectRefinementList"],
    widgets: ["ais.refinementList"]
  },
  menu: {
    connectors: ["connectMenu"],
    widgets: ["ais.menu"]
  },
  hierarchicalMenu: {
    connectors: ["connectHierarchicalMenu"],
    widgets: ["ais.hierarchicalMenu"]
  },
  numericMenu: {
    connectors: ["connectNumericMenu"],
    widgets: ["ais.numericMenu"]
  },
  ratingMenu: {
    connectors: ["connectRatingMenu"],
    widgets: ["ais.ratingMenu"]
  },
  range: {
    connectors: ["connectRange"],
    widgets: ["ais.rangeInput", "ais.rangeSlider", "ais.range"]
  },
  toggle: {
    connectors: ["connectToggleRefinement"],
    widgets: ["ais.toggleRefinement"]
  },
  geoSearch: {
    connectors: ["connectGeoSearch"],
    widgets: ["ais.geoSearch"]
  },
  sortBy: {
    connectors: ["connectSortBy"],
    widgets: ["ais.sortBy"]
  },
  page: {
    connectors: ["connectPagination"],
    widgets: ["ais.pagination", "ais.infiniteHits"]
  },
  hitsPerPage: {
    connectors: ["connectHitsPerPage"],
    widgets: ["ais.hitsPerPage"]
  },
  configure: {
    connectors: ["connectConfigure"],
    widgets: ["ais.configure"]
  },
  places: {
    connectors: [],
    widgets: ["ais.places"]
  }
};
function checkIndexUiState(_ref) {
  var index3 = _ref.index, indexUiState = _ref.indexUiState;
  var mountedWidgets = index3.getWidgets().map(function(widget) {
    return widget.$$type;
  }).filter(Boolean);
  var missingWidgets = keys(indexUiState).reduce(function(acc, parameter) {
    var widgetUiState = stateToWidgetsMap[parameter];
    if (!widgetUiState) {
      return acc;
    }
    var requiredWidgets = widgetUiState.widgets;
    if (requiredWidgets && !requiredWidgets.some(function(requiredWidget) {
      return mountedWidgets.includes(requiredWidget);
    })) {
      acc.push([parameter, {
        connectors: widgetUiState.connectors,
        widgets: widgetUiState.widgets.map(function(widgetIdentifier) {
          return widgetIdentifier.split("ais.")[1];
        })
      }]);
    }
    return acc;
  }, []);
  true ? _warning(missingWidgets.length === 0, 'The UI state for the index "'.concat(index3.getIndexId(), '" is not consistent with the widgets mounted.\n\nThis can happen when the UI state is specified via `initialUiState`, `routing` or `setUiState` but that the widgets responsible for this state were not added. This results in those query parameters not being sent to the API.\n\nTo fully reflect the state, some widgets need to be added to the index "').concat(index3.getIndexId(), '":\n\n').concat(missingWidgets.map(function(_ref2) {
    var _ref4;
    var _ref3 = _slicedToArray(_ref2, 2), stateParameter = _ref3[0], widgets = _ref3[1].widgets;
    return "- `".concat(stateParameter, "` needs one of these widgets: ").concat((_ref4 = []).concat.apply(_ref4, _toConsumableArray(widgets.map(function(name) {
      return getWidgetNames(name);
    }))).map(function(name) {
      return '"'.concat(name, '"');
    }).join(", "));
  }).join("\n"), '\n\nIf you do not wish to display widgets but still want to support their search parameters, you can mount "virtual widgets" that don\'t render anything:\n\n```\n').concat(missingWidgets.filter(function(_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2), _stateParameter = _ref6[0], connectors = _ref6[1].connectors;
    return connectors.length > 0;
  }).map(function(_ref7) {
    var _ref8 = _slicedToArray(_ref7, 2), _stateParameter = _ref8[0], _ref8$ = _ref8[1], connectors = _ref8$.connectors, widgets = _ref8$.widgets;
    var capitalizedWidget = capitalize(widgets[0]);
    var connectorName = connectors[0];
    return "const virtual".concat(capitalizedWidget, " = ").concat(connectorName, "(() => null);");
  }).join("\n"), "\n\nsearch.addWidgets([\n  ").concat(missingWidgets.filter(function(_ref9) {
    var _ref10 = _slicedToArray(_ref9, 2), _stateParameter = _ref10[0], connectors = _ref10[1].connectors;
    return connectors.length > 0;
  }).map(function(_ref11) {
    var _ref12 = _slicedToArray(_ref11, 2), _stateParameter = _ref12[0], widgets = _ref12[1].widgets;
    var capitalizedWidget = capitalize(widgets[0]);
    return "virtual".concat(capitalizedWidget, "({ /* ... */ })");
  }).join(",\n  "), "\n]);\n```\n\nIf you're using custom widgets that do set these query parameters, we recommend using connectors instead.\n\nSee https://www.algolia.com/doc/guides/building-search-ui/widgets/customize-an-existing-widget/js/#customize-the-complete-ui-of-the-widgets")) : void 0;
}

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/lib/utils/getObjectType.js
function getObjectType(object) {
  return Object.prototype.toString.call(object).slice(8, -1);
}

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/lib/utils/checkRendering.js
function checkRendering(rendering, usage) {
  if (rendering === void 0 || typeof rendering !== "function") {
    throw new Error("The render function is not valid (received type ".concat(getObjectType(rendering), ").\n\n").concat(usage));
  }
}

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/lib/utils/clearRefinements.js
function clearRefinements(_ref) {
  var helper = _ref.helper, _ref$attributesToClea = _ref.attributesToClear, attributesToClear = _ref$attributesToClea === void 0 ? [] : _ref$attributesToClea;
  var finalState = helper.state.setPage(0);
  finalState = attributesToClear.reduce(function(state, attribute) {
    if (finalState.isNumericRefined(attribute)) {
      return state.removeNumericRefinement(attribute);
    }
    if (finalState.isHierarchicalFacet(attribute)) {
      return state.removeHierarchicalFacetRefinement(attribute);
    }
    if (finalState.isDisjunctiveFacet(attribute)) {
      return state.removeDisjunctiveFacetRefinement(attribute);
    }
    if (finalState.isConjunctiveFacet(attribute)) {
      return state.removeFacetRefinement(attribute);
    }
    return state;
  }, finalState);
  if (attributesToClear.indexOf("query") !== -1) {
    finalState = finalState.setQuery("");
  }
  return finalState;
}

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/lib/utils/escape-html.js
var htmlEntities = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
var regexUnescapedHtml = /[&<>"']/g;
var regexHasUnescapedHtml = RegExp(regexUnescapedHtml.source);
function escape2(value) {
  return value && regexHasUnescapedHtml.test(value) ? value.replace(regexUnescapedHtml, function(character) {
    return htmlEntities[character];
  }) : value;
}
var htmlCharacters = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'"
};
var regexEscapedHtml = /&(amp|quot|lt|gt|#39);/g;
var regexHasEscapedHtml = RegExp(regexEscapedHtml.source);
function unescape2(value) {
  return value && regexHasEscapedHtml.test(value) ? value.replace(regexEscapedHtml, function(character) {
    return htmlCharacters[character];
  }) : value;
}

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/lib/utils/isPlainObject.js
function _typeof(o12) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o13) {
    return typeof o13;
  } : function(o13) {
    return o13 && "function" == typeof Symbol && o13.constructor === Symbol && o13 !== Symbol.prototype ? "symbol" : typeof o13;
  }, _typeof(o12);
}
function getTag(value) {
  if (value === null) {
    return value === void 0 ? "[object Undefined]" : "[object Null]";
  }
  return Object.prototype.toString.call(value);
}
function isObjectLike(value) {
  return _typeof(value) === "object" && value !== null;
}
function isPlainObject(value) {
  if (!isObjectLike(value) || getTag(value) !== "[object Object]") {
    return false;
  }
  if (Object.getPrototypeOf(value) === null) {
    return true;
  }
  var proto = value;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(value) === proto;
}

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/lib/utils/escape-highlight.js
function _typeof2(o12) {
  "@babel/helpers - typeof";
  return _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o13) {
    return typeof o13;
  } : function(o13) {
    return o13 && "function" == typeof Symbol && o13.constructor === Symbol && o13 !== Symbol.prototype ? "symbol" : typeof o13;
  }, _typeof2(o12);
}
function _objectDestructuringEmpty(obj) {
  if (obj == null) throw new TypeError("Cannot destructure " + obj);
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i6 = 1; i6 < arguments.length; i6++) {
      var source = arguments[i6];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function ownKeys(e6, r7) {
  var t4 = Object.keys(e6);
  if (Object.getOwnPropertySymbols) {
    var o12 = Object.getOwnPropertySymbols(e6);
    r7 && (o12 = o12.filter(function(r8) {
      return Object.getOwnPropertyDescriptor(e6, r8).enumerable;
    })), t4.push.apply(t4, o12);
  }
  return t4;
}
function _objectSpread(e6) {
  for (var r7 = 1; r7 < arguments.length; r7++) {
    var t4 = null != arguments[r7] ? arguments[r7] : {};
    r7 % 2 ? ownKeys(Object(t4), true).forEach(function(r8) {
      _defineProperty(e6, r8, t4[r8]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e6, Object.getOwnPropertyDescriptors(t4)) : ownKeys(Object(t4)).forEach(function(r8) {
      Object.defineProperty(e6, r8, Object.getOwnPropertyDescriptor(t4, r8));
    });
  }
  return e6;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(t4) {
  var i6 = _toPrimitive(t4, "string");
  return "symbol" == _typeof2(i6) ? i6 : String(i6);
}
function _toPrimitive(t4, r7) {
  if ("object" != _typeof2(t4) || !t4) return t4;
  var e6 = t4[Symbol.toPrimitive];
  if (void 0 !== e6) {
    var i6 = e6.call(t4, r7 || "default");
    if ("object" != _typeof2(i6)) return i6;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r7 ? String : Number)(t4);
}
var TAG_PLACEHOLDER = {
  highlightPreTag: "__ais-highlight__",
  highlightPostTag: "__/ais-highlight__"
};
var TAG_REPLACEMENT = {
  highlightPreTag: "<mark>",
  highlightPostTag: "</mark>"
};
function replaceTagsAndEscape(value) {
  return escape2(value).replace(new RegExp(TAG_PLACEHOLDER.highlightPreTag, "g"), TAG_REPLACEMENT.highlightPreTag).replace(new RegExp(TAG_PLACEHOLDER.highlightPostTag, "g"), TAG_REPLACEMENT.highlightPostTag);
}
function recursiveEscape(input) {
  if (isPlainObject(input) && typeof input.value !== "string") {
    return Object.keys(input).reduce(function(acc, key) {
      return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, key, recursiveEscape(input[key])));
    }, {});
  }
  if (Array.isArray(input)) {
    return input.map(recursiveEscape);
  }
  return _objectSpread(_objectSpread({}, input), {}, {
    value: replaceTagsAndEscape(input.value)
  });
}
function escapeHits(hits) {
  if (hits.__escaped === void 0) {
    hits = hits.map(function(_ref) {
      var hit = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
      if (hit._highlightResult) {
        hit._highlightResult = recursiveEscape(hit._highlightResult);
      }
      if (hit._snippetResult) {
        hit._snippetResult = recursiveEscape(hit._snippetResult);
      }
      return hit;
    });
    hits.__escaped = true;
  }
  return hits;
}
function escapeFacets(facetHits) {
  return facetHits.map(function(h8) {
    return _objectSpread(_objectSpread({}, h8), {}, {
      highlighted: replaceTagsAndEscape(h8.highlighted)
    });
  });
}

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/lib/utils/concatHighlightedParts.js
function concatHighlightedParts(parts) {
  var highlightPreTag = TAG_REPLACEMENT.highlightPreTag, highlightPostTag = TAG_REPLACEMENT.highlightPostTag;
  return parts.map(function(part) {
    return part.isHighlighted ? highlightPreTag + part.value + highlightPostTag : part.value;
  }).join("");
}

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/lib/utils/createConcurrentSafePromise.js
function createConcurrentSafePromise() {
  var basePromiseId = -1;
  var latestResolvedId = -1;
  var latestResolvedValue = void 0;
  return function runConcurrentSafePromise(promise) {
    var currentPromiseId = ++basePromiseId;
    return Promise.resolve(promise).then(function(x3) {
      if (latestResolvedValue && currentPromiseId < latestResolvedId) {
        return latestResolvedValue;
      }
      latestResolvedId = currentPromiseId;
      latestResolvedValue = x3;
      return x3;
    });
  };
}

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/lib/utils/isFacetRefined.js
function isFacetRefined(helper, facet, value) {
  if (helper.state.isHierarchicalFacet(facet)) {
    return helper.state.isHierarchicalFacetRefined(facet, value);
  } else if (helper.state.isConjunctiveFacet(facet)) {
    return helper.state.isFacetRefined(facet, value);
  } else {
    return helper.state.isDisjunctiveFacetRefined(facet, value);
  }
}

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/lib/utils/createSendEventForFacet.js
function ownKeys2(e6, r7) {
  var t4 = Object.keys(e6);
  if (Object.getOwnPropertySymbols) {
    var o12 = Object.getOwnPropertySymbols(e6);
    r7 && (o12 = o12.filter(function(r8) {
      return Object.getOwnPropertyDescriptor(e6, r8).enumerable;
    })), t4.push.apply(t4, o12);
  }
  return t4;
}
function _objectSpread2(e6) {
  for (var r7 = 1; r7 < arguments.length; r7++) {
    var t4 = null != arguments[r7] ? arguments[r7] : {};
    r7 % 2 ? ownKeys2(Object(t4), true).forEach(function(r8) {
      _defineProperty2(e6, r8, t4[r8]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e6, Object.getOwnPropertyDescriptors(t4)) : ownKeys2(Object(t4)).forEach(function(r8) {
      Object.defineProperty(e6, r8, Object.getOwnPropertyDescriptor(t4, r8));
    });
  }
  return e6;
}
function _defineProperty2(obj, key, value) {
  key = _toPropertyKey2(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey2(t4) {
  var i6 = _toPrimitive2(t4, "string");
  return "symbol" == _typeof3(i6) ? i6 : String(i6);
}
function _toPrimitive2(t4, r7) {
  if ("object" != _typeof3(t4) || !t4) return t4;
  var e6 = t4[Symbol.toPrimitive];
  if (void 0 !== e6) {
    var i6 = e6.call(t4, r7 || "default");
    if ("object" != _typeof3(i6)) return i6;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r7 ? String : Number)(t4);
}
function _typeof3(o12) {
  "@babel/helpers - typeof";
  return _typeof3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o13) {
    return typeof o13;
  } : function(o13) {
    return o13 && "function" == typeof Symbol && o13.constructor === Symbol && o13 !== Symbol.prototype ? "symbol" : typeof o13;
  }, _typeof3(o12);
}
function _slicedToArray2(arr, i6) {
  return _arrayWithHoles2(arr) || _iterableToArrayLimit2(arr, i6) || _unsupportedIterableToArray2(arr, i6) || _nonIterableRest2();
}
function _nonIterableRest2() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray2(o12, minLen) {
  if (!o12) return;
  if (typeof o12 === "string") return _arrayLikeToArray2(o12, minLen);
  var n6 = Object.prototype.toString.call(o12).slice(8, -1);
  if (n6 === "Object" && o12.constructor) n6 = o12.constructor.name;
  if (n6 === "Map" || n6 === "Set") return Array.from(o12);
  if (n6 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n6)) return _arrayLikeToArray2(o12, minLen);
}
function _arrayLikeToArray2(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i6 = 0, arr2 = new Array(len); i6 < len; i6++) arr2[i6] = arr[i6];
  return arr2;
}
function _iterableToArrayLimit2(r7, l4) {
  var t4 = null == r7 ? null : "undefined" != typeof Symbol && r7[Symbol.iterator] || r7["@@iterator"];
  if (null != t4) {
    var e6, n6, i6, u5, a6 = [], f12 = true, o12 = false;
    try {
      if (i6 = (t4 = t4.call(r7)).next, 0 === l4) {
        if (Object(t4) !== t4) return;
        f12 = false;
      } else for (; !(f12 = (e6 = i6.call(t4)).done) && (a6.push(e6.value), a6.length !== l4); f12 = true) ;
    } catch (r8) {
      o12 = true, n6 = r8;
    } finally {
      try {
        if (!f12 && null != t4.return && (u5 = t4.return(), Object(u5) !== u5)) return;
      } finally {
        if (o12) throw n6;
      }
    }
    return a6;
  }
}
function _arrayWithHoles2(arr) {
  if (Array.isArray(arr)) return arr;
}
function createSendEventForFacet(_ref) {
  var instantSearchInstance = _ref.instantSearchInstance, helper = _ref.helper, attr = _ref.attribute, widgetType = _ref.widgetType;
  var sendEventForFacet = function sendEventForFacet2() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var facetValue = args[1], _args$ = args[2], eventName = _args$ === void 0 ? "Filter Applied" : _args$, _args$2 = args[3], additionalData = _args$2 === void 0 ? {} : _args$2;
    var _args$0$split = args[0].split(":"), _args$0$split2 = _slicedToArray2(_args$0$split, 2), eventType = _args$0$split2[0], eventModifier = _args$0$split2[1];
    var attribute = typeof attr === "string" ? attr : attr(facetValue);
    if (args.length === 1 && _typeof3(args[0]) === "object") {
      instantSearchInstance.sendEventToInsights(args[0]);
    } else if (eventType === "click" && args.length >= 2 && args.length <= 4) {
      if (!isFacetRefined(helper, attribute, facetValue)) {
        instantSearchInstance.sendEventToInsights({
          insightsMethod: "clickedFilters",
          widgetType,
          eventType,
          eventModifier,
          payload: _objectSpread2({
            eventName,
            index: helper.getIndex(),
            filters: ["".concat(attribute, ":").concat(facetValue)]
          }, additionalData),
          attribute
        });
      }
    } else if (true) {
      throw new Error("You need to pass between two and four arguments like:\n  sendEvent('click', facetValue, eventName?, additionalData?);\n\nIf you want to send a custom payload, you can pass one object: sendEvent(customPayload);\n");
    }
  };
  return sendEventForFacet;
}

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/lib/utils/serializer.js
function serializePayload(payload) {
  return btoa(encodeURIComponent(JSON.stringify(payload)));
}

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/lib/utils/createSendEventForHits.js
function ownKeys3(e6, r7) {
  var t4 = Object.keys(e6);
  if (Object.getOwnPropertySymbols) {
    var o12 = Object.getOwnPropertySymbols(e6);
    r7 && (o12 = o12.filter(function(r8) {
      return Object.getOwnPropertyDescriptor(e6, r8).enumerable;
    })), t4.push.apply(t4, o12);
  }
  return t4;
}
function _objectSpread3(e6) {
  for (var r7 = 1; r7 < arguments.length; r7++) {
    var t4 = null != arguments[r7] ? arguments[r7] : {};
    r7 % 2 ? ownKeys3(Object(t4), true).forEach(function(r8) {
      _defineProperty3(e6, r8, t4[r8]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e6, Object.getOwnPropertyDescriptors(t4)) : ownKeys3(Object(t4)).forEach(function(r8) {
      Object.defineProperty(e6, r8, Object.getOwnPropertyDescriptor(t4, r8));
    });
  }
  return e6;
}
function _defineProperty3(obj, key, value) {
  key = _toPropertyKey3(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey3(t4) {
  var i6 = _toPrimitive3(t4, "string");
  return "symbol" == _typeof4(i6) ? i6 : String(i6);
}
function _toPrimitive3(t4, r7) {
  if ("object" != _typeof4(t4) || !t4) return t4;
  var e6 = t4[Symbol.toPrimitive];
  if (void 0 !== e6) {
    var i6 = e6.call(t4, r7 || "default");
    if ("object" != _typeof4(i6)) return i6;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r7 ? String : Number)(t4);
}
function _slicedToArray3(arr, i6) {
  return _arrayWithHoles3(arr) || _iterableToArrayLimit3(arr, i6) || _unsupportedIterableToArray3(arr, i6) || _nonIterableRest3();
}
function _nonIterableRest3() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray3(o12, minLen) {
  if (!o12) return;
  if (typeof o12 === "string") return _arrayLikeToArray3(o12, minLen);
  var n6 = Object.prototype.toString.call(o12).slice(8, -1);
  if (n6 === "Object" && o12.constructor) n6 = o12.constructor.name;
  if (n6 === "Map" || n6 === "Set") return Array.from(o12);
  if (n6 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n6)) return _arrayLikeToArray3(o12, minLen);
}
function _arrayLikeToArray3(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i6 = 0, arr2 = new Array(len); i6 < len; i6++) arr2[i6] = arr[i6];
  return arr2;
}
function _iterableToArrayLimit3(r7, l4) {
  var t4 = null == r7 ? null : "undefined" != typeof Symbol && r7[Symbol.iterator] || r7["@@iterator"];
  if (null != t4) {
    var e6, n6, i6, u5, a6 = [], f12 = true, o12 = false;
    try {
      if (i6 = (t4 = t4.call(r7)).next, 0 === l4) {
        if (Object(t4) !== t4) return;
        f12 = false;
      } else for (; !(f12 = (e6 = i6.call(t4)).done) && (a6.push(e6.value), a6.length !== l4); f12 = true) ;
    } catch (r8) {
      o12 = true, n6 = r8;
    } finally {
      try {
        if (!f12 && null != t4.return && (u5 = t4.return(), Object(u5) !== u5)) return;
      } finally {
        if (o12) throw n6;
      }
    }
    return a6;
  }
}
function _arrayWithHoles3(arr) {
  if (Array.isArray(arr)) return arr;
}
function _typeof4(o12) {
  "@babel/helpers - typeof";
  return _typeof4 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o13) {
    return typeof o13;
  } : function(o13) {
    return o13 && "function" == typeof Symbol && o13.constructor === Symbol && o13 !== Symbol.prototype ? "symbol" : typeof o13;
  }, _typeof4(o12);
}
function chunk(arr) {
  var chunkSize = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 20;
  var chunks = [];
  for (var i6 = 0; i6 < Math.ceil(arr.length / chunkSize); i6++) {
    chunks.push(arr.slice(i6 * chunkSize, (i6 + 1) * chunkSize));
  }
  return chunks;
}
function _buildEventPayloadsForHits(_ref) {
  var getIndex = _ref.getIndex, widgetType = _ref.widgetType, methodName = _ref.methodName, args = _ref.args, instantSearchInstance = _ref.instantSearchInstance;
  if (args.length === 1 && _typeof4(args[0]) === "object") {
    return [args[0]];
  }
  var _args$0$split = args[0].split(":"), _args$0$split2 = _slicedToArray3(_args$0$split, 2), eventType = _args$0$split2[0], eventModifier = _args$0$split2[1];
  var hits = args[1];
  var eventName = args[2];
  var additionalData = args[3] || {};
  if (!hits) {
    if (true) {
      throw new Error("You need to pass hit or hits as the second argument like:\n  ".concat(methodName, "(eventType, hit);\n  "));
    } else {
      return [];
    }
  }
  if ((eventType === "click" || eventType === "conversion") && !eventName) {
    if (true) {
      throw new Error("You need to pass eventName as the third argument for 'click' or 'conversion' events like:\n  ".concat(methodName, "('click', hit, 'Product Purchased');\n\n  To learn more about event naming: https://www.algolia.com/doc/guides/getting-insights-and-analytics/search-analytics/click-through-and-conversions/in-depth/clicks-conversions-best-practices/\n  "));
    } else {
      return [];
    }
  }
  var hitsArray = Array.isArray(hits) ? hits : [hits];
  if (hitsArray.length === 0) {
    return [];
  }
  var queryID = hitsArray[0].__queryID;
  var hitsChunks = chunk(hitsArray);
  var objectIDsByChunk = hitsChunks.map(function(batch) {
    return batch.map(function(hit) {
      return hit.objectID;
    });
  });
  var positionsByChunk = hitsChunks.map(function(batch) {
    return batch.map(function(hit) {
      return hit.__position;
    });
  });
  if (eventType === "view") {
    if (instantSearchInstance.status !== "idle") {
      return [];
    }
    return hitsChunks.map(function(batch, i6) {
      return {
        insightsMethod: "viewedObjectIDs",
        widgetType,
        eventType,
        payload: _objectSpread3({
          eventName: eventName || "Hits Viewed",
          index: getIndex(),
          objectIDs: objectIDsByChunk[i6]
        }, additionalData),
        hits: batch,
        eventModifier
      };
    });
  } else if (eventType === "click") {
    return hitsChunks.map(function(batch, i6) {
      return {
        insightsMethod: "clickedObjectIDsAfterSearch",
        widgetType,
        eventType,
        payload: _objectSpread3({
          eventName: eventName || "Hit Clicked",
          index: getIndex(),
          queryID,
          objectIDs: objectIDsByChunk[i6],
          positions: positionsByChunk[i6]
        }, additionalData),
        hits: batch,
        eventModifier
      };
    });
  } else if (eventType === "conversion") {
    return hitsChunks.map(function(batch, i6) {
      return {
        insightsMethod: "convertedObjectIDsAfterSearch",
        widgetType,
        eventType,
        payload: _objectSpread3({
          eventName: eventName || "Hit Converted",
          index: getIndex(),
          queryID,
          objectIDs: objectIDsByChunk[i6]
        }, additionalData),
        hits: batch,
        eventModifier
      };
    });
  } else if (true) {
    throw new Error('eventType("'.concat(eventType, '") is not supported.\n    If you want to send a custom payload, you can pass one object: ').concat(methodName, "(customPayload);\n    "));
  } else {
    return [];
  }
}
function createSendEventForHits(_ref2) {
  var instantSearchInstance = _ref2.instantSearchInstance, getIndex = _ref2.getIndex, widgetType = _ref2.widgetType;
  var sentEvents = {};
  var timer = void 0;
  var sendEventForHits = function sendEventForHits2() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var payloads = _buildEventPayloadsForHits({
      widgetType,
      getIndex,
      methodName: "sendEvent",
      args,
      instantSearchInstance
    });
    payloads.forEach(function(payload) {
      if (payload.eventType === "click" && payload.eventModifier === "internal" && sentEvents[payload.eventType]) {
        return;
      }
      sentEvents[payload.eventType] = true;
      instantSearchInstance.sendEventToInsights(payload);
    });
    clearTimeout(timer);
    timer = setTimeout(function() {
      sentEvents = {};
    }, 0);
  };
  return sendEventForHits;
}
function createBindEventForHits(_ref3) {
  var getIndex = _ref3.getIndex, widgetType = _ref3.widgetType, instantSearchInstance = _ref3.instantSearchInstance;
  var bindEventForHits = function bindEventForHits2() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    var payloads = _buildEventPayloadsForHits({
      widgetType,
      getIndex,
      methodName: "bindEvent",
      args,
      instantSearchInstance
    });
    return payloads.length ? "data-insights-event=".concat(serializePayload(payloads)) : "";
  };
  return bindEventForHits;
}

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/lib/utils/isIndexWidget.js
function isIndexWidget(widget) {
  return widget.$$type === "ais.index";
}

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/lib/utils/setIndexHelperState.js
function setIndexHelperState(finalUiState, indexWidget) {
  var nextIndexUiState = finalUiState[indexWidget.getIndexId()] || {};
  if (true) {
    checkIndexUiState({
      index: indexWidget,
      indexUiState: nextIndexUiState
    });
  }
  indexWidget.getHelper().setState(indexWidget.getWidgetSearchParameters(indexWidget.getHelper().state, {
    uiState: nextIndexUiState
  }));
  indexWidget.getWidgets().filter(isIndexWidget).forEach(function(widget) {
    return setIndexHelperState(finalUiState, widget);
  });
}

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/lib/utils/debounce.js
function debounce(func, wait) {
  var lastTimeout = null;
  return function() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return new Promise(function(resolve, reject) {
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(function() {
        lastTimeout = null;
        Promise.resolve(func.apply(void 0, args)).then(resolve).catch(reject);
      }, wait);
    });
  };
}

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/lib/utils/defer.js
var nextMicroTask = Promise.resolve();
function defer(callback) {
  var progress = null;
  var cancelled = false;
  var fn = function fn2() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    if (progress !== null) {
      return;
    }
    progress = nextMicroTask.then(function() {
      progress = null;
      if (cancelled) {
        cancelled = false;
        return;
      }
      callback.apply(void 0, args);
    });
  };
  fn.wait = function() {
    if (progress === null) {
      throw new Error("The deferred function should be called before calling `wait()`");
    }
    return progress;
  };
  fn.cancel = function() {
    if (progress === null) {
      return;
    }
    cancelled = true;
  };
  return fn;
}

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/lib/utils/documentation.js
function createDocumentationLink(_ref) {
  var name = _ref.name, _ref$connector = _ref.connector, connector = _ref$connector === void 0 ? false : _ref$connector;
  return ["https://www.algolia.com/doc/api-reference/widgets/", name, "/js/", connector ? "#connector" : ""].join("");
}
function createDocumentationMessageGenerator() {
  for (var _len = arguments.length, widgets = new Array(_len), _key = 0; _key < _len; _key++) {
    widgets[_key] = arguments[_key];
  }
  var links = widgets.map(function(widget) {
    return createDocumentationLink(widget);
  }).join(", ");
  return function(message) {
    return [message, "See documentation: ".concat(links)].filter(Boolean).join("\n\n");
  };
}

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/lib/utils/escapeFacetValue.js
function unescapeFacetValue(value) {
  if (typeof value === "string") {
    return value.replace(/^\\-/, "-");
  }
  return value;
}
function escapeFacetValue(value) {
  if (typeof value === "number" && value < 0 || typeof value === "string") {
    return String(value).replace(/^-/, "\\-");
  }
  return value;
}

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/lib/utils/find.js
function find(items, predicate) {
  var value;
  for (var i6 = 0; i6 < items.length; i6++) {
    value = items[i6];
    if (predicate(value, i6, items)) {
      return value;
    }
  }
  return void 0;
}

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/lib/utils/findIndex.js
function findIndex(array, comparator) {
  if (!Array.isArray(array)) {
    return -1;
  }
  for (var i6 = 0; i6 < array.length; i6++) {
    if (comparator(array[i6])) {
      return i6;
    }
  }
  return -1;
}

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/lib/utils/getAppIdAndApiKey.js
function getAppIdAndApiKey(searchClient) {
  if (searchClient.appId && searchClient.apiKey) {
    return [searchClient.appId, searchClient.apiKey];
  } else if (searchClient.transporter) {
    var transporter = searchClient.transporter;
    var headers = transporter.headers || transporter.baseHeaders;
    var queryParameters = transporter.queryParameters || transporter.baseQueryParameters;
    var APP_ID = "x-algolia-application-id";
    var API_KEY = "x-algolia-api-key";
    var _appId = headers[APP_ID] || queryParameters[APP_ID];
    var _apiKey = headers[API_KEY] || queryParameters[API_KEY];
    return [_appId, _apiKey];
  } else {
    return [searchClient.applicationID, searchClient.apiKey];
  }
}

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/lib/utils/getHighlightedParts.js
function getHighlightedParts(highlightedValue) {
  var highlightPostTag = TAG_REPLACEMENT.highlightPostTag, highlightPreTag = TAG_REPLACEMENT.highlightPreTag;
  var splitByPreTag = highlightedValue.split(highlightPreTag);
  var firstValue = splitByPreTag.shift();
  var elements = !firstValue ? [] : [{
    value: firstValue,
    isHighlighted: false
  }];
  splitByPreTag.forEach(function(split) {
    var splitByPostTag = split.split(highlightPostTag);
    elements.push({
      value: splitByPostTag[0],
      isHighlighted: true
    });
    if (splitByPostTag[1] !== "") {
      elements.push({
        value: splitByPostTag[1],
        isHighlighted: false
      });
    }
  });
  return elements;
}

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/lib/utils/getHighlightFromSiblings.js
var hasAlphanumeric = new RegExp(/\w/i);
function getHighlightFromSiblings(parts, i6) {
  var _parts, _parts2;
  var current = parts[i6];
  var isNextHighlighted = ((_parts = parts[i6 + 1]) === null || _parts === void 0 ? void 0 : _parts.isHighlighted) || true;
  var isPreviousHighlighted = ((_parts2 = parts[i6 - 1]) === null || _parts2 === void 0 ? void 0 : _parts2.isHighlighted) || true;
  if (!hasAlphanumeric.test(unescape2(current.value)) && isPreviousHighlighted === isNextHighlighted) {
    return isPreviousHighlighted;
  }
  return current.isHighlighted;
}

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/lib/utils/getPropertyByPath.js
function getPropertyByPath(object, path) {
  var parts = Array.isArray(path) ? path : path.split(".");
  return parts.reduce(function(current, key) {
    return current && current[key];
  }, object);
}

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/lib/utils/getRefinements.js
function getRefinement(state, type, attribute, name) {
  var resultsFacets = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : [];
  var res = {
    type,
    attribute,
    name,
    escapedValue: escapeFacetValue(name)
  };
  var facet = find(resultsFacets, function(resultsFacet) {
    return resultsFacet.name === attribute;
  });
  var count;
  if (type === "hierarchical") {
    var facetDeclaration = state.getHierarchicalFacetByName(attribute);
    var nameParts = name.split(facetDeclaration.separator);
    var getFacetRefinement = function getFacetRefinement2(facetData) {
      return function(refinementKey) {
        return facetData[refinementKey];
      };
    };
    var _loop = function _loop2(i7) {
      facet = facet && facet.data && find(Object.keys(facet.data).map(getFacetRefinement(facet.data)), function(refinement) {
        return refinement.name === nameParts[i7];
      });
    };
    for (var i6 = 0; facet !== void 0 && i6 < nameParts.length; ++i6) {
      _loop(i6);
    }
    count = facet && facet.count;
  } else {
    count = facet && facet.data && facet.data[res.name];
  }
  if (count !== void 0) {
    res.count = count;
  }
  if (facet && facet.exhaustive !== void 0) {
    res.exhaustive = facet.exhaustive;
  }
  return res;
}
function getRefinements(_results, state) {
  var includesQuery = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
  var results = _results || {};
  var refinements = [];
  var _state$facetsRefineme = state.facetsRefinements, facetsRefinements = _state$facetsRefineme === void 0 ? {} : _state$facetsRefineme, _state$facetsExcludes = state.facetsExcludes, facetsExcludes = _state$facetsExcludes === void 0 ? {} : _state$facetsExcludes, _state$disjunctiveFac = state.disjunctiveFacetsRefinements, disjunctiveFacetsRefinements = _state$disjunctiveFac === void 0 ? {} : _state$disjunctiveFac, _state$hierarchicalFa = state.hierarchicalFacetsRefinements, hierarchicalFacetsRefinements = _state$hierarchicalFa === void 0 ? {} : _state$hierarchicalFa, _state$numericRefinem = state.numericRefinements, numericRefinements = _state$numericRefinem === void 0 ? {} : _state$numericRefinem, _state$tagRefinements = state.tagRefinements, tagRefinements = _state$tagRefinements === void 0 ? [] : _state$tagRefinements;
  Object.keys(facetsRefinements).forEach(function(attribute) {
    var refinementNames = facetsRefinements[attribute];
    refinementNames.forEach(function(refinementName) {
      refinements.push(getRefinement(state, "facet", attribute, refinementName, results.facets));
    });
  });
  Object.keys(facetsExcludes).forEach(function(attribute) {
    var refinementNames = facetsExcludes[attribute];
    refinementNames.forEach(function(refinementName) {
      refinements.push({
        type: "exclude",
        attribute,
        name: refinementName,
        exclude: true
      });
    });
  });
  Object.keys(disjunctiveFacetsRefinements).forEach(function(attribute) {
    var refinementNames = disjunctiveFacetsRefinements[attribute];
    refinementNames.forEach(function(refinementName) {
      refinements.push(getRefinement(
        state,
        "disjunctive",
        attribute,
        // We unescape any disjunctive refined values with `unescapeFacetValue` because
        // they can be escaped on negative numeric values with `escapeFacetValue`.
        unescapeFacetValue(refinementName),
        results.disjunctiveFacets
      ));
    });
  });
  Object.keys(hierarchicalFacetsRefinements).forEach(function(attribute) {
    var refinementNames = hierarchicalFacetsRefinements[attribute];
    refinementNames.forEach(function(refinement) {
      refinements.push(getRefinement(state, "hierarchical", attribute, refinement, results.hierarchicalFacets));
    });
  });
  Object.keys(numericRefinements).forEach(function(attribute) {
    var operators = numericRefinements[attribute];
    Object.keys(operators).forEach(function(operatorOriginal) {
      var operator = operatorOriginal;
      var valueOrValues = operators[operator];
      var refinementNames = Array.isArray(valueOrValues) ? valueOrValues : [valueOrValues];
      refinementNames.forEach(function(refinementName) {
        refinements.push({
          type: "numeric",
          attribute,
          name: "".concat(refinementName),
          numericValue: refinementName,
          operator
        });
      });
    });
  });
  tagRefinements.forEach(function(refinementName) {
    refinements.push({
      type: "tag",
      attribute: "_tags",
      name: refinementName
    });
  });
  if (includesQuery && state.query && state.query.trim()) {
    refinements.push({
      attribute: "query",
      type: "query",
      name: state.query,
      query: state.query
    });
  }
  return refinements;
}

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/lib/utils/getWidgetAttribute.js
function getWidgetAttribute(widget, initOptions) {
  var _widget$getWidgetRend;
  var renderState = (_widget$getWidgetRend = widget.getWidgetRenderState) === null || _widget$getWidgetRend === void 0 ? void 0 : _widget$getWidgetRend.call(widget, initOptions);
  var attribute = null;
  if (renderState && renderState.widgetParams) {
    var widgetParams = renderState.widgetParams;
    if (widgetParams.attribute) {
      attribute = widgetParams.attribute;
    } else if (Array.isArray(widgetParams.attributes)) {
      attribute = widgetParams.attributes[0];
    }
  }
  if (typeof attribute !== "string") {
    throw new Error("Could not find the attribute of the widget:\n\n".concat(JSON.stringify(widget), "\n\nPlease check whether the widget's getWidgetRenderState returns widgetParams.attribute correctly."));
  }
  return attribute;
}

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/lib/utils/hits-absolute-position.js
function _typeof5(o12) {
  "@babel/helpers - typeof";
  return _typeof5 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o13) {
    return typeof o13;
  } : function(o13) {
    return o13 && "function" == typeof Symbol && o13.constructor === Symbol && o13 !== Symbol.prototype ? "symbol" : typeof o13;
  }, _typeof5(o12);
}
function ownKeys4(e6, r7) {
  var t4 = Object.keys(e6);
  if (Object.getOwnPropertySymbols) {
    var o12 = Object.getOwnPropertySymbols(e6);
    r7 && (o12 = o12.filter(function(r8) {
      return Object.getOwnPropertyDescriptor(e6, r8).enumerable;
    })), t4.push.apply(t4, o12);
  }
  return t4;
}
function _objectSpread4(e6) {
  for (var r7 = 1; r7 < arguments.length; r7++) {
    var t4 = null != arguments[r7] ? arguments[r7] : {};
    r7 % 2 ? ownKeys4(Object(t4), true).forEach(function(r8) {
      _defineProperty4(e6, r8, t4[r8]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e6, Object.getOwnPropertyDescriptors(t4)) : ownKeys4(Object(t4)).forEach(function(r8) {
      Object.defineProperty(e6, r8, Object.getOwnPropertyDescriptor(t4, r8));
    });
  }
  return e6;
}
function _defineProperty4(obj, key, value) {
  key = _toPropertyKey4(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey4(t4) {
  var i6 = _toPrimitive4(t4, "string");
  return "symbol" == _typeof5(i6) ? i6 : String(i6);
}
function _toPrimitive4(t4, r7) {
  if ("object" != _typeof5(t4) || !t4) return t4;
  var e6 = t4[Symbol.toPrimitive];
  if (void 0 !== e6) {
    var i6 = e6.call(t4, r7 || "default");
    if ("object" != _typeof5(i6)) return i6;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r7 ? String : Number)(t4);
}
function addAbsolutePosition(hits, page, hitsPerPage) {
  return hits.map(function(hit, idx) {
    return _objectSpread4(_objectSpread4({}, hit), {}, {
      __position: hitsPerPage * page + idx + 1
    });
  });
}

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/lib/utils/hits-query-id.js
function _typeof6(o12) {
  "@babel/helpers - typeof";
  return _typeof6 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o13) {
    return typeof o13;
  } : function(o13) {
    return o13 && "function" == typeof Symbol && o13.constructor === Symbol && o13 !== Symbol.prototype ? "symbol" : typeof o13;
  }, _typeof6(o12);
}
function ownKeys5(e6, r7) {
  var t4 = Object.keys(e6);
  if (Object.getOwnPropertySymbols) {
    var o12 = Object.getOwnPropertySymbols(e6);
    r7 && (o12 = o12.filter(function(r8) {
      return Object.getOwnPropertyDescriptor(e6, r8).enumerable;
    })), t4.push.apply(t4, o12);
  }
  return t4;
}
function _objectSpread5(e6) {
  for (var r7 = 1; r7 < arguments.length; r7++) {
    var t4 = null != arguments[r7] ? arguments[r7] : {};
    r7 % 2 ? ownKeys5(Object(t4), true).forEach(function(r8) {
      _defineProperty5(e6, r8, t4[r8]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e6, Object.getOwnPropertyDescriptors(t4)) : ownKeys5(Object(t4)).forEach(function(r8) {
      Object.defineProperty(e6, r8, Object.getOwnPropertyDescriptor(t4, r8));
    });
  }
  return e6;
}
function _defineProperty5(obj, key, value) {
  key = _toPropertyKey5(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey5(t4) {
  var i6 = _toPrimitive5(t4, "string");
  return "symbol" == _typeof6(i6) ? i6 : String(i6);
}
function _toPrimitive5(t4, r7) {
  if ("object" != _typeof6(t4) || !t4) return t4;
  var e6 = t4[Symbol.toPrimitive];
  if (void 0 !== e6) {
    var i6 = e6.call(t4, r7 || "default");
    if ("object" != _typeof6(i6)) return i6;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r7 ? String : Number)(t4);
}
function addQueryID(hits, queryID) {
  if (!queryID) {
    return hits;
  }
  return hits.map(function(hit) {
    return _objectSpread5(_objectSpread5({}, hit), {}, {
      __queryID: queryID
    });
  });
}

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/lib/utils/hydrateRecommendCache.js
function _typeof7(o12) {
  "@babel/helpers - typeof";
  return _typeof7 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o13) {
    return typeof o13;
  } : function(o13) {
    return o13 && "function" == typeof Symbol && o13.constructor === Symbol && o13 !== Symbol.prototype ? "symbol" : typeof o13;
  }, _typeof7(o12);
}
function ownKeys6(e6, r7) {
  var t4 = Object.keys(e6);
  if (Object.getOwnPropertySymbols) {
    var o12 = Object.getOwnPropertySymbols(e6);
    r7 && (o12 = o12.filter(function(r8) {
      return Object.getOwnPropertyDescriptor(e6, r8).enumerable;
    })), t4.push.apply(t4, o12);
  }
  return t4;
}
function _objectSpread6(e6) {
  for (var r7 = 1; r7 < arguments.length; r7++) {
    var t4 = null != arguments[r7] ? arguments[r7] : {};
    r7 % 2 ? ownKeys6(Object(t4), true).forEach(function(r8) {
      _defineProperty6(e6, r8, t4[r8]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e6, Object.getOwnPropertyDescriptors(t4)) : ownKeys6(Object(t4)).forEach(function(r8) {
      Object.defineProperty(e6, r8, Object.getOwnPropertyDescriptor(t4, r8));
    });
  }
  return e6;
}
function _defineProperty6(obj, key, value) {
  key = _toPropertyKey6(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey6(t4) {
  var i6 = _toPrimitive6(t4, "string");
  return "symbol" == _typeof7(i6) ? i6 : String(i6);
}
function _toPrimitive6(t4, r7) {
  if ("object" != _typeof7(t4) || !t4) return t4;
  var e6 = t4[Symbol.toPrimitive];
  if (void 0 !== e6) {
    var i6 = e6.call(t4, r7 || "default");
    if ("object" != _typeof7(i6)) return i6;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r7 ? String : Number)(t4);
}
function hydrateRecommendCache(helper, initialResults) {
  var recommendCache = Object.keys(initialResults).reduce(function(acc, indexName) {
    var initialResult = initialResults[indexName];
    if (initialResult.recommendResults) {
      return _objectSpread6(_objectSpread6({}, acc), initialResult.recommendResults.results);
    }
    return acc;
  }, {});
  helper._recommendCache = recommendCache;
}

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/lib/utils/hydrateSearchClient.js
function _typeof8(o12) {
  "@babel/helpers - typeof";
  return _typeof8 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o13) {
    return typeof o13;
  } : function(o13) {
    return o13 && "function" == typeof Symbol && o13.constructor === Symbol && o13 !== Symbol.prototype ? "symbol" : typeof o13;
  }, _typeof8(o12);
}
function _slicedToArray4(arr, i6) {
  return _arrayWithHoles4(arr) || _iterableToArrayLimit4(arr, i6) || _unsupportedIterableToArray4(arr, i6) || _nonIterableRest4();
}
function _nonIterableRest4() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray4(o12, minLen) {
  if (!o12) return;
  if (typeof o12 === "string") return _arrayLikeToArray4(o12, minLen);
  var n6 = Object.prototype.toString.call(o12).slice(8, -1);
  if (n6 === "Object" && o12.constructor) n6 = o12.constructor.name;
  if (n6 === "Map" || n6 === "Set") return Array.from(o12);
  if (n6 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n6)) return _arrayLikeToArray4(o12, minLen);
}
function _arrayLikeToArray4(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i6 = 0, arr2 = new Array(len); i6 < len; i6++) arr2[i6] = arr[i6];
  return arr2;
}
function _iterableToArrayLimit4(r7, l4) {
  var t4 = null == r7 ? null : "undefined" != typeof Symbol && r7[Symbol.iterator] || r7["@@iterator"];
  if (null != t4) {
    var e6, n6, i6, u5, a6 = [], f12 = true, o12 = false;
    try {
      if (i6 = (t4 = t4.call(r7)).next, 0 === l4) {
        if (Object(t4) !== t4) return;
        f12 = false;
      } else for (; !(f12 = (e6 = i6.call(t4)).done) && (a6.push(e6.value), a6.length !== l4); f12 = true) ;
    } catch (r8) {
      o12 = true, n6 = r8;
    } finally {
      try {
        if (!f12 && null != t4.return && (u5 = t4.return(), Object(u5) !== u5)) return;
      } finally {
        if (o12) throw n6;
      }
    }
    return a6;
  }
}
function _arrayWithHoles4(arr) {
  if (Array.isArray(arr)) return arr;
}
function ownKeys7(e6, r7) {
  var t4 = Object.keys(e6);
  if (Object.getOwnPropertySymbols) {
    var o12 = Object.getOwnPropertySymbols(e6);
    r7 && (o12 = o12.filter(function(r8) {
      return Object.getOwnPropertyDescriptor(e6, r8).enumerable;
    })), t4.push.apply(t4, o12);
  }
  return t4;
}
function _objectSpread7(e6) {
  for (var r7 = 1; r7 < arguments.length; r7++) {
    var t4 = null != arguments[r7] ? arguments[r7] : {};
    r7 % 2 ? ownKeys7(Object(t4), true).forEach(function(r8) {
      _defineProperty7(e6, r8, t4[r8]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e6, Object.getOwnPropertyDescriptors(t4)) : ownKeys7(Object(t4)).forEach(function(r8) {
      Object.defineProperty(e6, r8, Object.getOwnPropertyDescriptor(t4, r8));
    });
  }
  return e6;
}
function _defineProperty7(obj, key, value) {
  key = _toPropertyKey7(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey7(t4) {
  var i6 = _toPrimitive7(t4, "string");
  return "symbol" == _typeof8(i6) ? i6 : String(i6);
}
function _toPrimitive7(t4, r7) {
  if ("object" != _typeof8(t4) || !t4) return t4;
  var e6 = t4[Symbol.toPrimitive];
  if (void 0 !== e6) {
    var i6 = e6.call(t4, r7 || "default");
    if ("object" != _typeof8(i6)) return i6;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r7 ? String : Number)(t4);
}
function hydrateSearchClient(client, results) {
  if (!results) {
    return;
  }
  if ((!("transporter" in client) || client._cacheHydrated) && (!client._useCache || typeof client.addAlgoliaAgent !== "function")) {
    return;
  }
  var cachedRequest = [Object.keys(results).reduce(function(acc, key) {
    var _results$key = results[key], state = _results$key.state, requestParams = _results$key.requestParams, serverResults = _results$key.results;
    var mappedResults = serverResults && state ? serverResults.map(function(result, idx) {
      return _objectSpread7({
        indexName: state.index || result.index
      }, requestParams !== null && requestParams !== void 0 && requestParams[idx] || result.params ? {
        params: serializeQueryParameters((requestParams === null || requestParams === void 0 ? void 0 : requestParams[idx]) || deserializeQueryParameters(result.params))
      } : {});
    }) : [];
    return acc.concat(mappedResults);
  }, [])];
  var cachedResults = Object.keys(results).reduce(function(acc, key) {
    var res = results[key].results;
    if (!res) {
      return acc;
    }
    return acc.concat(res);
  }, []);
  if ("transporter" in client && !client._cacheHydrated) {
    client._cacheHydrated = true;
    var baseMethod = client.search.bind(client);
    client.search = function(requests) {
      for (var _len = arguments.length, methodArgs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        methodArgs[_key - 1] = arguments[_key];
      }
      var requestsWithSerializedParams = Array.isArray(requests) ? (
        // search client
        requests.map(function(request) {
          return _objectSpread7(_objectSpread7({}, request), {}, {
            params: serializeQueryParameters(request.params)
          });
        })
      ) : (
        // composition client
        serializeQueryParameters(requests.requestBody.params)
      );
      return client.transporter.responsesCache.get({
        method: "search",
        args: [requestsWithSerializedParams].concat(methodArgs)
      }, function() {
        return baseMethod.apply(void 0, [requests].concat(methodArgs));
      });
    };
    client.transporter.responsesCache.set({
      method: "search",
      args: cachedRequest
    }, {
      results: cachedResults
    });
  }
  if (!("transporter" in client)) {
    var cacheKey = "/1/indexes/*/queries_body_".concat(JSON.stringify({
      requests: cachedRequest
    }));
    client.cache = _objectSpread7(_objectSpread7({}, client.cache), {}, _defineProperty7({}, cacheKey, JSON.stringify({
      results: Object.keys(results).map(function(key) {
        return results[key].results;
      })
    })));
  }
}
function deserializeQueryParameters(parameters) {
  return parameters.split("&").reduce(function(acc, parameter) {
    var _parameter$split = parameter.split("="), _parameter$split2 = _slicedToArray4(_parameter$split, 2), key = _parameter$split2[0], value = _parameter$split2[1];
    acc[key] = value ? decodeURIComponent(value) : "";
    return acc;
  }, {});
}
function serializeQueryParameters(parameters) {
  var isObjectOrArray = function isObjectOrArray2(value) {
    return Object.prototype.toString.call(value) === "[object Object]" || Object.prototype.toString.call(value) === "[object Array]";
  };
  var encode = function encode2(format) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }
    var i6 = 0;
    return format.replace(/%s/g, function() {
      return encodeURIComponent(args[i6++]);
    });
  };
  return Object.keys(parameters).map(function(key) {
    return encode("%s=%s", key, isObjectOrArray(parameters[key]) ? JSON.stringify(parameters[key]) : parameters[key]);
  }).join("&");
}

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/lib/utils/isEqual.js
function isPrimitive(obj) {
  return obj !== Object(obj);
}
function isEqual(first, second) {
  if (first === second) {
    return true;
  }
  if (isPrimitive(first) || isPrimitive(second) || typeof first === "function" || typeof second === "function") {
    return first === second;
  }
  if (Object.keys(first).length !== Object.keys(second).length) {
    return false;
  }
  for (var _i = 0, _Object$keys = Object.keys(first); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    if (!(key in second)) {
      return false;
    }
    if (!isEqual(first[key], second[key])) {
      return false;
    }
  }
  return true;
}

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/lib/utils/isFiniteNumber.js
function isFiniteNumber(value) {
  return typeof value === "number" && isFinite(value);
}

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/lib/utils/walkIndex.js
function walkIndex(indexWidget, callback) {
  callback(indexWidget);
  indexWidget.getWidgets().forEach(function(widget) {
    if (isIndexWidget(widget)) {
      walkIndex(widget, callback);
    }
  });
}

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/lib/utils/uniq.js
function uniq(array) {
  return array.filter(function(value, index3, self) {
    return self.indexOf(value) === index3;
  });
}

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/lib/utils/mergeSearchParameters.js
function _typeof9(o12) {
  "@babel/helpers - typeof";
  return _typeof9 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o13) {
    return typeof o13;
  } : function(o13) {
    return o13 && "function" == typeof Symbol && o13.constructor === Symbol && o13 !== Symbol.prototype ? "symbol" : typeof o13;
  }, _typeof9(o12);
}
var _excluded = ["facets", "disjunctiveFacets", "facetsRefinements", "facetsExcludes", "disjunctiveFacetsRefinements", "numericRefinements", "tagRefinements", "hierarchicalFacets", "hierarchicalFacetsRefinements", "ruleContexts"];
function ownKeys8(e6, r7) {
  var t4 = Object.keys(e6);
  if (Object.getOwnPropertySymbols) {
    var o12 = Object.getOwnPropertySymbols(e6);
    r7 && (o12 = o12.filter(function(r8) {
      return Object.getOwnPropertyDescriptor(e6, r8).enumerable;
    })), t4.push.apply(t4, o12);
  }
  return t4;
}
function _objectSpread8(e6) {
  for (var r7 = 1; r7 < arguments.length; r7++) {
    var t4 = null != arguments[r7] ? arguments[r7] : {};
    r7 % 2 ? ownKeys8(Object(t4), true).forEach(function(r8) {
      _defineProperty8(e6, r8, t4[r8]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e6, Object.getOwnPropertyDescriptors(t4)) : ownKeys8(Object(t4)).forEach(function(r8) {
      Object.defineProperty(e6, r8, Object.getOwnPropertyDescriptor(t4, r8));
    });
  }
  return e6;
}
function _defineProperty8(obj, key, value) {
  key = _toPropertyKey8(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey8(t4) {
  var i6 = _toPrimitive8(t4, "string");
  return "symbol" == _typeof9(i6) ? i6 : String(i6);
}
function _toPrimitive8(t4, r7) {
  if ("object" != _typeof9(t4) || !t4) return t4;
  var e6 = t4[Symbol.toPrimitive];
  if (void 0 !== e6) {
    var i6 = e6.call(t4, r7 || "default");
    if ("object" != _typeof9(i6)) return i6;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r7 ? String : Number)(t4);
}
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i6;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i6 = 0; i6 < sourceSymbolKeys.length; i6++) {
      key = sourceSymbolKeys[i6];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i6;
  for (i6 = 0; i6 < sourceKeys.length; i6++) {
    key = sourceKeys[i6];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
var mergeWithRest = function mergeWithRest2(left, right) {
  var facets = right.facets, disjunctiveFacets = right.disjunctiveFacets, facetsRefinements = right.facetsRefinements, facetsExcludes = right.facetsExcludes, disjunctiveFacetsRefinements = right.disjunctiveFacetsRefinements, numericRefinements = right.numericRefinements, tagRefinements = right.tagRefinements, hierarchicalFacets = right.hierarchicalFacets, hierarchicalFacetsRefinements = right.hierarchicalFacetsRefinements, ruleContexts = right.ruleContexts, rest = _objectWithoutProperties(right, _excluded);
  return left.setQueryParameters(rest);
};
var mergeFacets = function mergeFacets2(left, right) {
  return right.facets.reduce(function(_2, name) {
    return _2.addFacet(name);
  }, left);
};
var mergeDisjunctiveFacets = function mergeDisjunctiveFacets2(left, right) {
  return right.disjunctiveFacets.reduce(function(_2, name) {
    return _2.addDisjunctiveFacet(name);
  }, left);
};
var mergeHierarchicalFacets = function mergeHierarchicalFacets2(left, right) {
  return left.setQueryParameters({
    hierarchicalFacets: right.hierarchicalFacets.reduce(function(facets, facet) {
      var index3 = findIndex(facets, function(_2) {
        return _2.name === facet.name;
      });
      if (index3 === -1) {
        return facets.concat(facet);
      }
      var nextFacets = facets.slice();
      nextFacets.splice(index3, 1, facet);
      return nextFacets;
    }, left.hierarchicalFacets)
  });
};
var mergeTagRefinements = function mergeTagRefinements2(left, right) {
  return right.tagRefinements.reduce(function(_2, value) {
    return _2.addTagRefinement(value);
  }, left);
};
var mergeFacetRefinements = function mergeFacetRefinements2(left, right) {
  return left.setQueryParameters({
    facetsRefinements: _objectSpread8(_objectSpread8({}, left.facetsRefinements), right.facetsRefinements)
  });
};
var mergeFacetsExcludes = function mergeFacetsExcludes2(left, right) {
  return left.setQueryParameters({
    facetsExcludes: _objectSpread8(_objectSpread8({}, left.facetsExcludes), right.facetsExcludes)
  });
};
var mergeDisjunctiveFacetsRefinements = function mergeDisjunctiveFacetsRefinements2(left, right) {
  return left.setQueryParameters({
    disjunctiveFacetsRefinements: _objectSpread8(_objectSpread8({}, left.disjunctiveFacetsRefinements), right.disjunctiveFacetsRefinements)
  });
};
var mergeNumericRefinements = function mergeNumericRefinements2(left, right) {
  return left.setQueryParameters({
    numericRefinements: _objectSpread8(_objectSpread8({}, left.numericRefinements), right.numericRefinements)
  });
};
var mergeHierarchicalFacetsRefinements = function mergeHierarchicalFacetsRefinements2(left, right) {
  return left.setQueryParameters({
    hierarchicalFacetsRefinements: _objectSpread8(_objectSpread8({}, left.hierarchicalFacetsRefinements), right.hierarchicalFacetsRefinements)
  });
};
var mergeRuleContexts = function mergeRuleContexts2(left, right) {
  var ruleContexts = uniq([].concat(left.ruleContexts).concat(right.ruleContexts).filter(Boolean));
  if (ruleContexts.length > 0) {
    return left.setQueryParameters({
      ruleContexts
    });
  }
  return left;
};
var mergeSearchParameters = function mergeSearchParameters2() {
  for (var _len = arguments.length, parameters = new Array(_len), _key = 0; _key < _len; _key++) {
    parameters[_key] = arguments[_key];
  }
  return parameters.reduce(function(left, right) {
    var hierarchicalFacetsRefinementsMerged = mergeHierarchicalFacetsRefinements(left, right);
    var hierarchicalFacetsMerged = mergeHierarchicalFacets(hierarchicalFacetsRefinementsMerged, right);
    var tagRefinementsMerged = mergeTagRefinements(hierarchicalFacetsMerged, right);
    var numericRefinementsMerged = mergeNumericRefinements(tagRefinementsMerged, right);
    var disjunctiveFacetsRefinementsMerged = mergeDisjunctiveFacetsRefinements(numericRefinementsMerged, right);
    var facetsExcludesMerged = mergeFacetsExcludes(disjunctiveFacetsRefinementsMerged, right);
    var facetRefinementsMerged = mergeFacetRefinements(facetsExcludesMerged, right);
    var disjunctiveFacetsMerged = mergeDisjunctiveFacets(facetRefinementsMerged, right);
    var ruleContextsMerged = mergeRuleContexts(disjunctiveFacetsMerged, right);
    var facetsMerged = mergeFacets(ruleContextsMerged, right);
    return mergeWithRest(facetsMerged, right);
  });
};

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/lib/utils/range.js
function _toConsumableArray2(arr) {
  return _arrayWithoutHoles2(arr) || _iterableToArray2(arr) || _unsupportedIterableToArray5(arr) || _nonIterableSpread2();
}
function _nonIterableSpread2() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray5(o12, minLen) {
  if (!o12) return;
  if (typeof o12 === "string") return _arrayLikeToArray5(o12, minLen);
  var n6 = Object.prototype.toString.call(o12).slice(8, -1);
  if (n6 === "Object" && o12.constructor) n6 = o12.constructor.name;
  if (n6 === "Map" || n6 === "Set") return Array.from(o12);
  if (n6 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n6)) return _arrayLikeToArray5(o12, minLen);
}
function _iterableToArray2(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles2(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray5(arr);
}
function _arrayLikeToArray5(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i6 = 0, arr2 = new Array(len); i6 < len; i6++) arr2[i6] = arr[i6];
  return arr2;
}
function range(_ref) {
  var _ref$start = _ref.start, start = _ref$start === void 0 ? 0 : _ref$start, end = _ref.end, _ref$step = _ref.step, step = _ref$step === void 0 ? 1 : _ref$step;
  var limitStep = step === 0 ? 1 : step;
  var arrayLength = Math.round((end - start) / limitStep);
  return _toConsumableArray2(Array(arrayLength)).map(function(_2, current) {
    return start + current * limitStep;
  });
}

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/lib/utils/render-args.js
function createInitArgs(instantSearchInstance, parent, uiState) {
  var helper = parent.getHelper();
  return {
    uiState,
    helper,
    parent,
    instantSearchInstance,
    state: helper.state,
    renderState: instantSearchInstance.renderState,
    templatesConfig: instantSearchInstance.templatesConfig,
    createURL: parent.createURL,
    scopedResults: [],
    searchMetadata: {
      isSearchStalled: instantSearchInstance.status === "stalled"
    },
    status: instantSearchInstance.status,
    error: instantSearchInstance.error
  };
}
function createRenderArgs(instantSearchInstance, parent, widget) {
  var results = parent.getResultsForWidget(widget);
  var helper = parent.getHelper();
  return {
    helper,
    parent,
    instantSearchInstance,
    results,
    scopedResults: parent.getScopedResults(),
    state: results && "_state" in results ? results._state : helper.state,
    renderState: instantSearchInstance.renderState,
    templatesConfig: instantSearchInstance.templatesConfig,
    createURL: parent.createURL,
    searchMetadata: {
      isSearchStalled: instantSearchInstance.status === "stalled"
    },
    status: instantSearchInstance.status,
    error: instantSearchInstance.error
  };
}

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/lib/utils/resolveSearchParameters.js
function resolveSearchParameters(current) {
  var parent = current.getParent();
  var states = [current.getHelper().state];
  while (parent !== null) {
    states = [parent.getHelper().state].concat(states);
    parent = parent.getParent();
  }
  return states;
}

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/lib/utils/reverseHighlightedParts.js
function _typeof10(o12) {
  "@babel/helpers - typeof";
  return _typeof10 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o13) {
    return typeof o13;
  } : function(o13) {
    return o13 && "function" == typeof Symbol && o13.constructor === Symbol && o13 !== Symbol.prototype ? "symbol" : typeof o13;
  }, _typeof10(o12);
}
function ownKeys9(e6, r7) {
  var t4 = Object.keys(e6);
  if (Object.getOwnPropertySymbols) {
    var o12 = Object.getOwnPropertySymbols(e6);
    r7 && (o12 = o12.filter(function(r8) {
      return Object.getOwnPropertyDescriptor(e6, r8).enumerable;
    })), t4.push.apply(t4, o12);
  }
  return t4;
}
function _objectSpread9(e6) {
  for (var r7 = 1; r7 < arguments.length; r7++) {
    var t4 = null != arguments[r7] ? arguments[r7] : {};
    r7 % 2 ? ownKeys9(Object(t4), true).forEach(function(r8) {
      _defineProperty9(e6, r8, t4[r8]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e6, Object.getOwnPropertyDescriptors(t4)) : ownKeys9(Object(t4)).forEach(function(r8) {
      Object.defineProperty(e6, r8, Object.getOwnPropertyDescriptor(t4, r8));
    });
  }
  return e6;
}
function _defineProperty9(obj, key, value) {
  key = _toPropertyKey9(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey9(t4) {
  var i6 = _toPrimitive9(t4, "string");
  return "symbol" == _typeof10(i6) ? i6 : String(i6);
}
function _toPrimitive9(t4, r7) {
  if ("object" != _typeof10(t4) || !t4) return t4;
  var e6 = t4[Symbol.toPrimitive];
  if (void 0 !== e6) {
    var i6 = e6.call(t4, r7 || "default");
    if ("object" != _typeof10(i6)) return i6;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r7 ? String : Number)(t4);
}
function reverseHighlightedParts(parts) {
  if (!parts.some(function(part) {
    return part.isHighlighted;
  })) {
    return parts.map(function(part) {
      return _objectSpread9(_objectSpread9({}, part), {}, {
        isHighlighted: false
      });
    });
  }
  return parts.map(function(part, i6) {
    return _objectSpread9(_objectSpread9({}, part), {}, {
      isHighlighted: !getHighlightFromSiblings(parts, i6)
    });
  });
}

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/lib/utils/safelyRunOnBrowser.js
function safelyRunOnBrowser(callback) {
  var _ref = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
    fallback: function fallback2() {
      return void 0;
    }
  }, fallback = _ref.fallback;
  if (typeof window === "undefined") {
    return fallback();
  }
  return callback({
    window
  });
}

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/lib/utils/toArray.js
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/connectors/answers/connectAnswers.js
function _typeof11(o12) {
  "@babel/helpers - typeof";
  return _typeof11 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o13) {
    return typeof o13;
  } : function(o13) {
    return o13 && "function" == typeof Symbol && o13.constructor === Symbol && o13 !== Symbol.prototype ? "symbol" : typeof o13;
  }, _typeof11(o12);
}
function ownKeys10(e6, r7) {
  var t4 = Object.keys(e6);
  if (Object.getOwnPropertySymbols) {
    var o12 = Object.getOwnPropertySymbols(e6);
    r7 && (o12 = o12.filter(function(r8) {
      return Object.getOwnPropertyDescriptor(e6, r8).enumerable;
    })), t4.push.apply(t4, o12);
  }
  return t4;
}
function _objectSpread10(e6) {
  for (var r7 = 1; r7 < arguments.length; r7++) {
    var t4 = null != arguments[r7] ? arguments[r7] : {};
    r7 % 2 ? ownKeys10(Object(t4), true).forEach(function(r8) {
      _defineProperty10(e6, r8, t4[r8]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e6, Object.getOwnPropertyDescriptors(t4)) : ownKeys10(Object(t4)).forEach(function(r8) {
      Object.defineProperty(e6, r8, Object.getOwnPropertyDescriptor(t4, r8));
    });
  }
  return e6;
}
function _defineProperty10(obj, key, value) {
  key = _toPropertyKey10(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey10(t4) {
  var i6 = _toPrimitive10(t4, "string");
  return "symbol" == _typeof11(i6) ? i6 : String(i6);
}
function _toPrimitive10(t4, r7) {
  if ("object" != _typeof11(t4) || !t4) return t4;
  var e6 = t4[Symbol.toPrimitive];
  if (void 0 !== e6) {
    var i6 = e6.call(t4, r7 || "default");
    if ("object" != _typeof11(i6)) return i6;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r7 ? String : Number)(t4);
}
function hasFindAnswersMethod(answersIndex) {
  return typeof answersIndex.findAnswers === "function";
}
var withUsage = createDocumentationMessageGenerator({
  name: "answers",
  connector: true
});
var connectAnswers = function connectAnswers2(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage());
  return function(widgetParams) {
    var _ref = widgetParams || {}, queryLanguages = _ref.queryLanguages, attributesForPrediction = _ref.attributesForPrediction, _ref$nbHits = _ref.nbHits, nbHits = _ref$nbHits === void 0 ? 1 : _ref$nbHits, _ref$renderDebounceTi = _ref.renderDebounceTime, renderDebounceTime = _ref$renderDebounceTi === void 0 ? 100 : _ref$renderDebounceTi, _ref$searchDebounceTi = _ref.searchDebounceTime, searchDebounceTime = _ref$searchDebounceTi === void 0 ? 100 : _ref$searchDebounceTi, _ref$escapeHTML = _ref.escapeHTML, escapeHTML = _ref$escapeHTML === void 0 ? true : _ref$escapeHTML, _ref$extraParameters = _ref.extraParameters, extraParameters = _ref$extraParameters === void 0 ? {} : _ref$extraParameters;
    if (!queryLanguages || queryLanguages.length === 0) {
      throw new Error(withUsage("The `queryLanguages` expects an array of strings."));
    }
    var runConcurrentSafePromise = createConcurrentSafePromise();
    var lastHits = [];
    var isLoading = false;
    var debouncedRender = debounce(renderFn, renderDebounceTime);
    var debouncedRefine;
    return {
      $$type: "ais.answers",
      init: function init(initOptions) {
        var state = initOptions.state, instantSearchInstance = initOptions.instantSearchInstance;
        if (typeof instantSearchInstance.client.initIndex !== "function") {
          throw new Error(withUsage("`algoliasearch` <5 required."));
        }
        var answersIndex = instantSearchInstance.client.initIndex(state.index);
        if (!hasFindAnswersMethod(answersIndex)) {
          throw new Error(withUsage("`algoliasearch` >= 4.8.0 required."));
        }
        debouncedRefine = debounce(answersIndex.findAnswers, searchDebounceTime);
        renderFn(_objectSpread10(_objectSpread10({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: initOptions.instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var _this = this;
        var query = renderOptions.state.query;
        if (!query) {
          lastHits = [];
          isLoading = false;
          renderFn(_objectSpread10(_objectSpread10({}, this.getWidgetRenderState(renderOptions)), {}, {
            instantSearchInstance: renderOptions.instantSearchInstance
          }), false);
          return;
        }
        lastHits = [];
        isLoading = true;
        renderFn(_objectSpread10(_objectSpread10({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance: renderOptions.instantSearchInstance
        }), false);
        runConcurrentSafePromise(debouncedRefine(query, queryLanguages, _objectSpread10(_objectSpread10({}, extraParameters), {}, {
          nbHits,
          attributesForPrediction
        }))).then(function(result) {
          if (!result) {
            return;
          }
          if (escapeHTML && result.hits.length > 0) {
            result.hits = escapeHits(result.hits);
          }
          var hitsWithAbsolutePosition = addAbsolutePosition(result.hits, 0, nbHits);
          var hitsWithAbsolutePositionAndQueryID = addQueryID(hitsWithAbsolutePosition, result.queryID);
          lastHits = hitsWithAbsolutePositionAndQueryID;
          isLoading = false;
          debouncedRender(_objectSpread10(_objectSpread10({}, _this.getWidgetRenderState(renderOptions)), {}, {
            instantSearchInstance: renderOptions.instantSearchInstance
          }), false);
        });
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread10(_objectSpread10({}, renderState), {}, {
          answers: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState() {
        return {
          hits: lastHits,
          isLoading,
          widgetParams
        };
      },
      dispose: function dispose(_ref2) {
        var state = _ref2.state;
        unmountFn();
        return state;
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(state) {
        return state;
      }
    };
  };
};
var connectAnswers_default = connectAnswers;

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/connectors/configure-related-items/connectConfigureRelatedItems.js
var import_algoliasearch_helper2 = __toESM(require_algoliasearch_helper2(), 1);

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/connectors/configure/connectConfigure.js
var import_algoliasearch_helper = __toESM(require_algoliasearch_helper2(), 1);
function _typeof12(o12) {
  "@babel/helpers - typeof";
  return _typeof12 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o13) {
    return typeof o13;
  } : function(o13) {
    return o13 && "function" == typeof Symbol && o13.constructor === Symbol && o13 !== Symbol.prototype ? "symbol" : typeof o13;
  }, _typeof12(o12);
}
function ownKeys11(e6, r7) {
  var t4 = Object.keys(e6);
  if (Object.getOwnPropertySymbols) {
    var o12 = Object.getOwnPropertySymbols(e6);
    r7 && (o12 = o12.filter(function(r8) {
      return Object.getOwnPropertyDescriptor(e6, r8).enumerable;
    })), t4.push.apply(t4, o12);
  }
  return t4;
}
function _objectSpread11(e6) {
  for (var r7 = 1; r7 < arguments.length; r7++) {
    var t4 = null != arguments[r7] ? arguments[r7] : {};
    r7 % 2 ? ownKeys11(Object(t4), true).forEach(function(r8) {
      _defineProperty11(e6, r8, t4[r8]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e6, Object.getOwnPropertyDescriptors(t4)) : ownKeys11(Object(t4)).forEach(function(r8) {
      Object.defineProperty(e6, r8, Object.getOwnPropertyDescriptor(t4, r8));
    });
  }
  return e6;
}
function _defineProperty11(obj, key, value) {
  key = _toPropertyKey11(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey11(t4) {
  var i6 = _toPrimitive11(t4, "string");
  return "symbol" == _typeof12(i6) ? i6 : String(i6);
}
function _toPrimitive11(t4, r7) {
  if ("object" != _typeof12(t4) || !t4) return t4;
  var e6 = t4[Symbol.toPrimitive];
  if (void 0 !== e6) {
    var i6 = e6.call(t4, r7 || "default");
    if ("object" != _typeof12(i6)) return i6;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r7 ? String : Number)(t4);
}
var withUsage2 = createDocumentationMessageGenerator({
  name: "configure",
  connector: true
});
function getInitialSearchParameters(state, widgetParams) {
  return state.setQueryParameters(Object.keys(widgetParams.searchParameters).reduce(function(acc, key) {
    return _objectSpread11(_objectSpread11({}, acc), {}, _defineProperty11({}, key, void 0));
  }, {}));
}
var connectConfigure = function connectConfigure2() {
  var renderFn = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : noop;
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  return function(widgetParams) {
    if (!widgetParams || !isPlainObject(widgetParams.searchParameters)) {
      throw new Error(withUsage2("The `searchParameters` option expects an object."));
    }
    var connectorState = {};
    function refine(helper) {
      return function(searchParameters) {
        var actualState = getInitialSearchParameters(helper.state, widgetParams);
        var nextSearchParameters = mergeSearchParameters(actualState, new import_algoliasearch_helper.default.SearchParameters(searchParameters));
        widgetParams.searchParameters = searchParameters;
        helper.setState(nextSearchParameters).search();
      };
    }
    return {
      $$type: "ais.configure",
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(_objectSpread11(_objectSpread11({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(_objectSpread11(_objectSpread11({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance
        }), false);
      },
      dispose: function dispose(_ref) {
        var state = _ref.state;
        unmountFn();
        return getInitialSearchParameters(state, widgetParams);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        var _renderState$configur;
        var widgetRenderState = this.getWidgetRenderState(renderOptions);
        return _objectSpread11(_objectSpread11({}, renderState), {}, {
          configure: _objectSpread11(_objectSpread11({}, widgetRenderState), {}, {
            widgetParams: _objectSpread11(_objectSpread11({}, widgetRenderState.widgetParams), {}, {
              searchParameters: mergeSearchParameters(new import_algoliasearch_helper.default.SearchParameters((_renderState$configur = renderState.configure) === null || _renderState$configur === void 0 ? void 0 : _renderState$configur.widgetParams.searchParameters), new import_algoliasearch_helper.default.SearchParameters(widgetRenderState.widgetParams.searchParameters)).getQueryParams()
            })
          })
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref2) {
        var helper = _ref2.helper;
        if (!connectorState.refine) {
          connectorState.refine = refine(helper);
        }
        return {
          refine: connectorState.refine,
          widgetParams
        };
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(state, _ref3) {
        var uiState = _ref3.uiState;
        return mergeSearchParameters(state, new import_algoliasearch_helper.default.SearchParameters(_objectSpread11(_objectSpread11({}, uiState.configure), widgetParams.searchParameters)));
      },
      getWidgetUiState: function getWidgetUiState(uiState) {
        return _objectSpread11(_objectSpread11({}, uiState), {}, {
          configure: _objectSpread11(_objectSpread11({}, uiState.configure), widgetParams.searchParameters)
        });
      }
    };
  };
};
var connectConfigure_default = connectConfigure;

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/connectors/configure-related-items/connectConfigureRelatedItems.js
function _typeof13(o12) {
  "@babel/helpers - typeof";
  return _typeof13 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o13) {
    return typeof o13;
  } : function(o13) {
    return o13 && "function" == typeof Symbol && o13.constructor === Symbol && o13 !== Symbol.prototype ? "symbol" : typeof o13;
  }, _typeof13(o12);
}
function ownKeys12(e6, r7) {
  var t4 = Object.keys(e6);
  if (Object.getOwnPropertySymbols) {
    var o12 = Object.getOwnPropertySymbols(e6);
    r7 && (o12 = o12.filter(function(r8) {
      return Object.getOwnPropertyDescriptor(e6, r8).enumerable;
    })), t4.push.apply(t4, o12);
  }
  return t4;
}
function _objectSpread12(e6) {
  for (var r7 = 1; r7 < arguments.length; r7++) {
    var t4 = null != arguments[r7] ? arguments[r7] : {};
    r7 % 2 ? ownKeys12(Object(t4), true).forEach(function(r8) {
      _defineProperty12(e6, r8, t4[r8]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e6, Object.getOwnPropertyDescriptors(t4)) : ownKeys12(Object(t4)).forEach(function(r8) {
      Object.defineProperty(e6, r8, Object.getOwnPropertyDescriptor(t4, r8));
    });
  }
  return e6;
}
function _defineProperty12(obj, key, value) {
  key = _toPropertyKey12(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey12(t4) {
  var i6 = _toPrimitive12(t4, "string");
  return "symbol" == _typeof13(i6) ? i6 : String(i6);
}
function _toPrimitive12(t4, r7) {
  if ("object" != _typeof13(t4) || !t4) return t4;
  var e6 = t4[Symbol.toPrimitive];
  if (void 0 !== e6) {
    var i6 = e6.call(t4, r7 || "default");
    if ("object" != _typeof13(i6)) return i6;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r7 ? String : Number)(t4);
}
function _toConsumableArray3(arr) {
  return _arrayWithoutHoles3(arr) || _iterableToArray3(arr) || _unsupportedIterableToArray6(arr) || _nonIterableSpread3();
}
function _nonIterableSpread3() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray6(o12, minLen) {
  if (!o12) return;
  if (typeof o12 === "string") return _arrayLikeToArray6(o12, minLen);
  var n6 = Object.prototype.toString.call(o12).slice(8, -1);
  if (n6 === "Object" && o12.constructor) n6 = o12.constructor.name;
  if (n6 === "Map" || n6 === "Set") return Array.from(o12);
  if (n6 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n6)) return _arrayLikeToArray6(o12, minLen);
}
function _iterableToArray3(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles3(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray6(arr);
}
function _arrayLikeToArray6(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i6 = 0, arr2 = new Array(len); i6 < len; i6++) arr2[i6] = arr[i6];
  return arr2;
}
var withUsage3 = createDocumentationMessageGenerator({
  name: "configure-related-items",
  connector: true
});
function createOptionalFilter(_ref) {
  var attributeName = _ref.attributeName, attributeValue = _ref.attributeValue, attributeScore = _ref.attributeScore;
  return "".concat(attributeName, ":").concat(attributeValue, "<score=").concat(attributeScore || 1, ">");
}
var connectConfigureRelatedItems = function connectConfigureRelatedItems2(renderFn, unmountFn) {
  return function(widgetParams) {
    var _ref2 = widgetParams || {}, hit = _ref2.hit, matchingPatterns = _ref2.matchingPatterns, _ref2$transformSearch = _ref2.transformSearchParameters, transformSearchParameters = _ref2$transformSearch === void 0 ? function(x3) {
      return x3;
    } : _ref2$transformSearch;
    if (!hit) {
      throw new Error(withUsage3("The `hit` option is required."));
    }
    if (!matchingPatterns) {
      throw new Error(withUsage3("The `matchingPatterns` option is required."));
    }
    var optionalFilters = Object.keys(matchingPatterns).reduce(function(acc, attributeName) {
      var attribute = matchingPatterns[attributeName];
      var attributeValue = getPropertyByPath(hit, attributeName);
      var attributeScore = attribute.score;
      if (Array.isArray(attributeValue)) {
        return [].concat(_toConsumableArray3(acc), [attributeValue.map(function(attributeSubValue) {
          return createOptionalFilter({
            attributeName,
            attributeValue: attributeSubValue,
            attributeScore
          });
        })]);
      }
      if (typeof attributeValue === "string") {
        return [].concat(_toConsumableArray3(acc), [createOptionalFilter({
          attributeName,
          attributeValue,
          attributeScore
        })]);
      }
      true ? _warning(false, "\nThe `matchingPatterns` option returned a value of type ".concat(getObjectType(attributeValue), ' for the "').concat(attributeName, '" key. This value was not sent to Algolia because `optionalFilters` only supports strings and array of strings.\n\nYou can remove the "').concat(attributeName, '" key from the `matchingPatterns` option.\n\nSee https://www.algolia.com/doc/api-reference/api-parameters/optionalFilters/\n            ')) : void 0;
      return acc;
    }, []);
    var searchParameters = _objectSpread12({}, transformSearchParameters(new import_algoliasearch_helper2.default.SearchParameters({
      sumOrFiltersScores: true,
      facetFilters: ["objectID:-".concat(hit.objectID)],
      optionalFilters
    })));
    var makeWidget = connectConfigure_default(renderFn, unmountFn);
    return _objectSpread12(_objectSpread12({}, makeWidget({
      searchParameters
    })), {}, {
      $$type: "ais.configureRelatedItems"
    });
  };
};
var connectConfigureRelatedItems_default = connectConfigureRelatedItems;

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/connectors/dynamic-widgets/connectDynamicWidgets.js
function ownKeys13(e6, r7) {
  var t4 = Object.keys(e6);
  if (Object.getOwnPropertySymbols) {
    var o12 = Object.getOwnPropertySymbols(e6);
    r7 && (o12 = o12.filter(function(r8) {
      return Object.getOwnPropertyDescriptor(e6, r8).enumerable;
    })), t4.push.apply(t4, o12);
  }
  return t4;
}
function _objectSpread13(e6) {
  for (var r7 = 1; r7 < arguments.length; r7++) {
    var t4 = null != arguments[r7] ? arguments[r7] : {};
    r7 % 2 ? ownKeys13(Object(t4), true).forEach(function(r8) {
      _defineProperty13(e6, r8, t4[r8]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e6, Object.getOwnPropertyDescriptors(t4)) : ownKeys13(Object(t4)).forEach(function(r8) {
      Object.defineProperty(e6, r8, Object.getOwnPropertyDescriptor(t4, r8));
    });
  }
  return e6;
}
function _defineProperty13(obj, key, value) {
  key = _toPropertyKey13(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey13(t4) {
  var i6 = _toPrimitive13(t4, "string");
  return "symbol" == _typeof14(i6) ? i6 : String(i6);
}
function _toPrimitive13(t4, r7) {
  if ("object" != _typeof14(t4) || !t4) return t4;
  var e6 = t4[Symbol.toPrimitive];
  if (void 0 !== e6) {
    var i6 = e6.call(t4, r7 || "default");
    if ("object" != _typeof14(i6)) return i6;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r7 ? String : Number)(t4);
}
function _typeof14(o12) {
  "@babel/helpers - typeof";
  return _typeof14 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o13) {
    return typeof o13;
  } : function(o13) {
    return o13 && "function" == typeof Symbol && o13.constructor === Symbol && o13 !== Symbol.prototype ? "symbol" : typeof o13;
  }, _typeof14(o12);
}
var withUsage4 = createDocumentationMessageGenerator({
  name: "dynamic-widgets",
  connector: true
});
var MAX_WILDCARD_FACETS = 20;
var connectDynamicWidgets = function connectDynamicWidgets2(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage4());
  return function(widgetParams) {
    var widgets = widgetParams.widgets, _widgetParams$maxValu = widgetParams.maxValuesPerFacet, maxValuesPerFacet = _widgetParams$maxValu === void 0 ? 20 : _widgetParams$maxValu, _widgetParams$facets = widgetParams.facets, facets = _widgetParams$facets === void 0 ? ["*"] : _widgetParams$facets, _widgetParams$transfo = widgetParams.transformItems, transformItems = _widgetParams$transfo === void 0 ? function(items) {
      return items;
    } : _widgetParams$transfo, fallbackWidget = widgetParams.fallbackWidget;
    if (!(widgets && Array.isArray(widgets) && widgets.every(function(widget) {
      return _typeof14(widget) === "object";
    }))) {
      throw new Error(withUsage4("The `widgets` option expects an array of widgets."));
    }
    if (!Array.isArray(facets)) {
      throw new Error(withUsage4("The `facets` option only accepts an array of facets, you passed ".concat(JSON.stringify(facets))));
    }
    var localWidgets = /* @__PURE__ */ new Map();
    return {
      $$type: "ais.dynamicWidgets",
      init: function init(initOptions) {
        widgets.forEach(function(widget) {
          var attribute = getWidgetAttribute(widget, initOptions);
          localWidgets.set(attribute, {
            widget,
            isMounted: false
          });
        });
        renderFn(_objectSpread13(_objectSpread13({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: initOptions.instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var parent = renderOptions.parent;
        var renderState = this.getWidgetRenderState(renderOptions);
        var widgetsToUnmount = [];
        var widgetsToMount = [];
        if (fallbackWidget) {
          renderState.attributesToRender.forEach(function(attribute) {
            if (!localWidgets.has(attribute)) {
              var widget = fallbackWidget({
                attribute
              });
              localWidgets.set(attribute, {
                widget,
                isMounted: false
              });
            }
          });
        }
        localWidgets.forEach(function(_ref, attribute) {
          var widget = _ref.widget, isMounted = _ref.isMounted;
          var shouldMount = renderState.attributesToRender.indexOf(attribute) > -1;
          if (!isMounted && shouldMount) {
            widgetsToMount.push(widget);
            localWidgets.set(attribute, {
              widget,
              isMounted: true
            });
          } else if (isMounted && !shouldMount) {
            widgetsToUnmount.push(widget);
            localWidgets.set(attribute, {
              widget,
              isMounted: false
            });
          }
        });
        parent.addWidgets(widgetsToMount);
        setTimeout(function() {
          return parent.removeWidgets(widgetsToUnmount);
        }, 0);
        renderFn(_objectSpread13(_objectSpread13({}, renderState), {}, {
          instantSearchInstance: renderOptions.instantSearchInstance
        }), false);
      },
      dispose: function dispose(_ref2) {
        var parent = _ref2.parent;
        var toRemove = [];
        localWidgets.forEach(function(_ref3) {
          var widget = _ref3.widget, isMounted = _ref3.isMounted;
          if (isMounted) {
            toRemove.push(widget);
          }
        });
        parent.removeWidgets(toRemove);
        unmountFn();
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(state) {
        return facets.reduce(function(acc, curr) {
          return acc.addFacet(curr);
        }, state.setQueryParameters({
          maxValuesPerFacet: Math.max(maxValuesPerFacet || 0, state.maxValuesPerFacet || 0)
        }));
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread13(_objectSpread13({}, renderState), {}, {
          dynamicWidgets: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref4) {
        var _results$renderingCon, _results$renderingCon2, _results$renderingCon3, _results$renderingCon4;
        var results = _ref4.results, state = _ref4.state;
        if (!results) {
          return {
            attributesToRender: [],
            widgetParams
          };
        }
        var attributesToRender = transformItems((_results$renderingCon = (_results$renderingCon2 = results.renderingContent) === null || _results$renderingCon2 === void 0 ? void 0 : (_results$renderingCon3 = _results$renderingCon2.facetOrdering) === null || _results$renderingCon3 === void 0 ? void 0 : (_results$renderingCon4 = _results$renderingCon3.facets) === null || _results$renderingCon4 === void 0 ? void 0 : _results$renderingCon4.order) !== null && _results$renderingCon !== void 0 ? _results$renderingCon : [], {
          results
        });
        if (!Array.isArray(attributesToRender)) {
          throw new Error(withUsage4("The `transformItems` option expects a function that returns an Array."));
        }
        true ? _warning(maxValuesPerFacet >= (state.maxValuesPerFacet || 0), "The maxValuesPerFacet set by dynamic widgets (".concat(maxValuesPerFacet, ") is smaller than one of the limits set by a widget (").concat(state.maxValuesPerFacet, "). This causes a mismatch in query parameters and thus an extra network request when that widget is mounted.")) : void 0;
        true ? _warning(attributesToRender.length <= MAX_WILDCARD_FACETS || widgetParams.facets !== void 0, "More than ".concat(MAX_WILDCARD_FACETS, ` facets are requested to be displayed without explicitly setting which facets to retrieve. This could have a performance impact. Set "facets" to [] to do two smaller network requests, or explicitly to ['*'] to avoid this warning.`)) : void 0;
        return {
          attributesToRender,
          widgetParams
        };
      }
    };
  };
};
var connectDynamicWidgets_default = connectDynamicWidgets;

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/connectors/clear-refinements/connectClearRefinements.js
function _typeof15(o12) {
  "@babel/helpers - typeof";
  return _typeof15 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o13) {
    return typeof o13;
  } : function(o13) {
    return o13 && "function" == typeof Symbol && o13.constructor === Symbol && o13 !== Symbol.prototype ? "symbol" : typeof o13;
  }, _typeof15(o12);
}
function _toConsumableArray4(arr) {
  return _arrayWithoutHoles4(arr) || _iterableToArray4(arr) || _unsupportedIterableToArray7(arr) || _nonIterableSpread4();
}
function _nonIterableSpread4() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray7(o12, minLen) {
  if (!o12) return;
  if (typeof o12 === "string") return _arrayLikeToArray7(o12, minLen);
  var n6 = Object.prototype.toString.call(o12).slice(8, -1);
  if (n6 === "Object" && o12.constructor) n6 = o12.constructor.name;
  if (n6 === "Map" || n6 === "Set") return Array.from(o12);
  if (n6 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n6)) return _arrayLikeToArray7(o12, minLen);
}
function _iterableToArray4(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles4(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray7(arr);
}
function _arrayLikeToArray7(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i6 = 0, arr2 = new Array(len); i6 < len; i6++) arr2[i6] = arr[i6];
  return arr2;
}
function ownKeys14(e6, r7) {
  var t4 = Object.keys(e6);
  if (Object.getOwnPropertySymbols) {
    var o12 = Object.getOwnPropertySymbols(e6);
    r7 && (o12 = o12.filter(function(r8) {
      return Object.getOwnPropertyDescriptor(e6, r8).enumerable;
    })), t4.push.apply(t4, o12);
  }
  return t4;
}
function _objectSpread14(e6) {
  for (var r7 = 1; r7 < arguments.length; r7++) {
    var t4 = null != arguments[r7] ? arguments[r7] : {};
    r7 % 2 ? ownKeys14(Object(t4), true).forEach(function(r8) {
      _defineProperty14(e6, r8, t4[r8]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e6, Object.getOwnPropertyDescriptors(t4)) : ownKeys14(Object(t4)).forEach(function(r8) {
      Object.defineProperty(e6, r8, Object.getOwnPropertyDescriptor(t4, r8));
    });
  }
  return e6;
}
function _defineProperty14(obj, key, value) {
  key = _toPropertyKey14(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey14(t4) {
  var i6 = _toPrimitive14(t4, "string");
  return "symbol" == _typeof15(i6) ? i6 : String(i6);
}
function _toPrimitive14(t4, r7) {
  if ("object" != _typeof15(t4) || !t4) return t4;
  var e6 = t4[Symbol.toPrimitive];
  if (void 0 !== e6) {
    var i6 = e6.call(t4, r7 || "default");
    if ("object" != _typeof15(i6)) return i6;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r7 ? String : Number)(t4);
}
var withUsage5 = createDocumentationMessageGenerator({
  name: "clear-refinements",
  connector: true
});
var connectClearRefinements = function connectClearRefinements2(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage5());
  return function(widgetParams) {
    var _ref = widgetParams || {}, _ref$includedAttribut = _ref.includedAttributes, includedAttributes = _ref$includedAttribut === void 0 ? [] : _ref$includedAttribut, _ref$excludedAttribut = _ref.excludedAttributes, excludedAttributes = _ref$excludedAttribut === void 0 ? ["query"] : _ref$excludedAttribut, _ref$transformItems = _ref.transformItems, transformItems = _ref$transformItems === void 0 ? function(items) {
      return items;
    } : _ref$transformItems;
    if (widgetParams && widgetParams.includedAttributes && widgetParams.excludedAttributes) {
      throw new Error(withUsage5("The options `includedAttributes` and `excludedAttributes` cannot be used together."));
    }
    var connectorState = {
      refine: noop,
      createURL: function createURL() {
        return "";
      },
      attributesToClear: []
    };
    var cachedRefine = function cachedRefine2() {
      return connectorState.refine();
    };
    var cachedCreateURL = function cachedCreateURL2() {
      return connectorState.createURL();
    };
    return {
      $$type: "ais.clearRefinements",
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(_objectSpread14(_objectSpread14({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(_objectSpread14(_objectSpread14({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance
        }), false);
      },
      dispose: function dispose() {
        unmountFn();
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread14(_objectSpread14({}, renderState), {}, {
          clearRefinements: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref2) {
        var createURL = _ref2.createURL, scopedResults = _ref2.scopedResults, results = _ref2.results;
        connectorState.attributesToClear = scopedResults.reduce(function(attributesToClear, scopedResult) {
          return attributesToClear.concat(getAttributesToClear({
            scopedResult,
            includedAttributes,
            excludedAttributes,
            transformItems,
            results
          }));
        }, []);
        connectorState.refine = function() {
          connectorState.attributesToClear.forEach(function(_ref3) {
            var indexHelper = _ref3.helper, items = _ref3.items;
            indexHelper.setState(clearRefinements({
              helper: indexHelper,
              attributesToClear: items
            })).search();
          });
        };
        connectorState.createURL = function() {
          return createURL(mergeSearchParameters.apply(void 0, _toConsumableArray4(connectorState.attributesToClear.map(function(_ref4) {
            var indexHelper = _ref4.helper, items = _ref4.items;
            return clearRefinements({
              helper: indexHelper,
              attributesToClear: items
            });
          }))));
        };
        var canRefine = connectorState.attributesToClear.some(function(attributeToClear) {
          return attributeToClear.items.length > 0;
        });
        return {
          canRefine,
          hasRefinements: canRefine,
          refine: cachedRefine,
          createURL: cachedCreateURL,
          widgetParams
        };
      }
    };
  };
};
function getAttributesToClear(_ref5) {
  var scopedResult = _ref5.scopedResult, includedAttributes = _ref5.includedAttributes, excludedAttributes = _ref5.excludedAttributes, transformItems = _ref5.transformItems, results = _ref5.results;
  var includesQuery = includedAttributes.indexOf("query") !== -1 || excludedAttributes.indexOf("query") === -1;
  return {
    helper: scopedResult.helper,
    items: transformItems(uniq(getRefinements(scopedResult.results, scopedResult.helper.state, includesQuery).map(function(refinement) {
      return refinement.attribute;
    }).filter(function(attribute) {
      return (
        // If the array is empty (default case), we keep all the attributes
        includedAttributes.length === 0 || // Otherwise, only add the specified attributes
        includedAttributes.indexOf(attribute) !== -1
      );
    }).filter(function(attribute) {
      return (
        // If the query is included, we ignore the default `excludedAttributes = ['query']`
        attribute === "query" && includesQuery || // Otherwise, ignore the excluded attributes
        excludedAttributes.indexOf(attribute) === -1
      );
    })), {
      results
    })
  };
}
var connectClearRefinements_default = connectClearRefinements;

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/connectors/current-refinements/connectCurrentRefinements.js
function _typeof16(o12) {
  "@babel/helpers - typeof";
  return _typeof16 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o13) {
    return typeof o13;
  } : function(o13) {
    return o13 && "function" == typeof Symbol && o13.constructor === Symbol && o13 !== Symbol.prototype ? "symbol" : typeof o13;
  }, _typeof16(o12);
}
function _toConsumableArray5(arr) {
  return _arrayWithoutHoles5(arr) || _iterableToArray5(arr) || _unsupportedIterableToArray8(arr) || _nonIterableSpread5();
}
function _nonIterableSpread5() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray8(o12, minLen) {
  if (!o12) return;
  if (typeof o12 === "string") return _arrayLikeToArray8(o12, minLen);
  var n6 = Object.prototype.toString.call(o12).slice(8, -1);
  if (n6 === "Object" && o12.constructor) n6 = o12.constructor.name;
  if (n6 === "Map" || n6 === "Set") return Array.from(o12);
  if (n6 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n6)) return _arrayLikeToArray8(o12, minLen);
}
function _iterableToArray5(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles5(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray8(arr);
}
function _arrayLikeToArray8(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i6 = 0, arr2 = new Array(len); i6 < len; i6++) arr2[i6] = arr[i6];
  return arr2;
}
function ownKeys15(e6, r7) {
  var t4 = Object.keys(e6);
  if (Object.getOwnPropertySymbols) {
    var o12 = Object.getOwnPropertySymbols(e6);
    r7 && (o12 = o12.filter(function(r8) {
      return Object.getOwnPropertyDescriptor(e6, r8).enumerable;
    })), t4.push.apply(t4, o12);
  }
  return t4;
}
function _objectSpread15(e6) {
  for (var r7 = 1; r7 < arguments.length; r7++) {
    var t4 = null != arguments[r7] ? arguments[r7] : {};
    r7 % 2 ? ownKeys15(Object(t4), true).forEach(function(r8) {
      _defineProperty15(e6, r8, t4[r8]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e6, Object.getOwnPropertyDescriptors(t4)) : ownKeys15(Object(t4)).forEach(function(r8) {
      Object.defineProperty(e6, r8, Object.getOwnPropertyDescriptor(t4, r8));
    });
  }
  return e6;
}
function _defineProperty15(obj, key, value) {
  key = _toPropertyKey15(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey15(t4) {
  var i6 = _toPrimitive15(t4, "string");
  return "symbol" == _typeof16(i6) ? i6 : String(i6);
}
function _toPrimitive15(t4, r7) {
  if ("object" != _typeof16(t4) || !t4) return t4;
  var e6 = t4[Symbol.toPrimitive];
  if (void 0 !== e6) {
    var i6 = e6.call(t4, r7 || "default");
    if ("object" != _typeof16(i6)) return i6;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r7 ? String : Number)(t4);
}
var withUsage6 = createDocumentationMessageGenerator({
  name: "current-refinements",
  connector: true
});
var connectCurrentRefinements = function connectCurrentRefinements2(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage6());
  return function(widgetParams) {
    if ((widgetParams || {}).includedAttributes && (widgetParams || {}).excludedAttributes) {
      throw new Error(withUsage6("The options `includedAttributes` and `excludedAttributes` cannot be used together."));
    }
    var _ref = widgetParams || {}, includedAttributes = _ref.includedAttributes, _ref$excludedAttribut = _ref.excludedAttributes, excludedAttributes = _ref$excludedAttribut === void 0 ? ["query"] : _ref$excludedAttribut, _ref$transformItems = _ref.transformItems, transformItems = _ref$transformItems === void 0 ? function(items) {
      return items;
    } : _ref$transformItems;
    return {
      $$type: "ais.currentRefinements",
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(_objectSpread15(_objectSpread15({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(_objectSpread15(_objectSpread15({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance
        }), false);
      },
      dispose: function dispose() {
        unmountFn();
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread15(_objectSpread15({}, renderState), {}, {
          currentRefinements: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref2) {
        var results = _ref2.results, scopedResults = _ref2.scopedResults, _createURL = _ref2.createURL, helper = _ref2.helper;
        function getItems() {
          if (!results) {
            return transformItems(getRefinementsItems({
              results: null,
              helper,
              indexId: helper.state.index,
              includedAttributes,
              excludedAttributes
            }), {
              results
            });
          }
          return scopedResults.reduce(function(accResults, scopedResult) {
            return accResults.concat(transformItems(getRefinementsItems({
              results: scopedResult.results,
              helper: scopedResult.helper,
              indexId: scopedResult.indexId,
              includedAttributes,
              excludedAttributes
            }), {
              results
            }));
          }, []);
        }
        var items = getItems();
        return {
          items,
          canRefine: items.length > 0,
          refine: function refine(refinement) {
            return clearRefinement(helper, refinement);
          },
          createURL: function createURL(refinement) {
            return _createURL(clearRefinementFromState(helper.state, refinement));
          },
          widgetParams
        };
      }
    };
  };
};
function getRefinementsItems(_ref3) {
  var results = _ref3.results, helper = _ref3.helper, indexId = _ref3.indexId, includedAttributes = _ref3.includedAttributes, excludedAttributes = _ref3.excludedAttributes;
  var includesQuery = (includedAttributes || []).indexOf("query") !== -1 || (excludedAttributes || []).indexOf("query") === -1;
  var filterFunction = includedAttributes ? function(item) {
    return includedAttributes.indexOf(item.attribute) !== -1;
  } : function(item) {
    return excludedAttributes.indexOf(item.attribute) === -1;
  };
  var items = getRefinements(results, helper.state, includesQuery).map(normalizeRefinement).filter(filterFunction);
  return items.reduce(function(allItems, currentItem) {
    return [].concat(_toConsumableArray5(allItems.filter(function(item) {
      return item.attribute !== currentItem.attribute;
    })), [{
      indexName: helper.state.index,
      indexId,
      attribute: currentItem.attribute,
      label: currentItem.attribute,
      refinements: items.filter(function(result) {
        return result.attribute === currentItem.attribute;
      }).sort(function(a6, b3) {
        return a6.type === "numeric" ? a6.value - b3.value : 0;
      }),
      refine: function refine(refinement) {
        return clearRefinement(helper, refinement);
      }
    }]);
  }, []);
}
function clearRefinementFromState(state, refinement) {
  state = state.resetPage();
  switch (refinement.type) {
    case "facet":
      return state.removeFacetRefinement(refinement.attribute, String(refinement.value));
    case "disjunctive":
      return state.removeDisjunctiveFacetRefinement(refinement.attribute, String(refinement.value));
    case "hierarchical":
      return state.removeHierarchicalFacetRefinement(refinement.attribute);
    case "exclude":
      return state.removeExcludeRefinement(refinement.attribute, String(refinement.value));
    case "numeric":
      return state.removeNumericRefinement(refinement.attribute, refinement.operator, String(refinement.value));
    case "tag":
      return state.removeTagRefinement(String(refinement.value));
    case "query":
      return state.setQueryParameter("query", "");
    default:
      true ? _warning(false, 'The refinement type "'.concat(refinement.type, '" does not exist and cannot be cleared from the current refinements.')) : void 0;
      return state;
  }
}
function clearRefinement(helper, refinement) {
  helper.setState(clearRefinementFromState(helper.state, refinement)).search();
}
function getOperatorSymbol(operator) {
  switch (operator) {
    case ">=":
      return "≥";
    case "<=":
      return "≤";
    default:
      return operator;
  }
}
function normalizeRefinement(refinement) {
  var value = getValue(refinement);
  var label = refinement.operator ? "".concat(getOperatorSymbol(refinement.operator), " ").concat(refinement.name) : refinement.name;
  var normalizedRefinement = {
    attribute: refinement.attribute,
    type: refinement.type,
    value,
    label
  };
  if (refinement.operator !== void 0) {
    normalizedRefinement.operator = refinement.operator;
  }
  if (refinement.count !== void 0) {
    normalizedRefinement.count = refinement.count;
  }
  if (refinement.exhaustive !== void 0) {
    normalizedRefinement.exhaustive = refinement.exhaustive;
  }
  return normalizedRefinement;
}
function getValue(refinement) {
  if (refinement.type === "numeric") {
    return Number(refinement.name);
  }
  if ("escapedValue" in refinement) {
    return refinement.escapedValue;
  }
  return refinement.name;
}
var connectCurrentRefinements_default = connectCurrentRefinements;

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/connectors/hierarchical-menu/connectHierarchicalMenu.js
function _typeof17(o12) {
  "@babel/helpers - typeof";
  return _typeof17 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o13) {
    return typeof o13;
  } : function(o13) {
    return o13 && "function" == typeof Symbol && o13.constructor === Symbol && o13 !== Symbol.prototype ? "symbol" : typeof o13;
  }, _typeof17(o12);
}
var _excluded2 = ["name", "escapedValue", "data", "path"];
function ownKeys16(e6, r7) {
  var t4 = Object.keys(e6);
  if (Object.getOwnPropertySymbols) {
    var o12 = Object.getOwnPropertySymbols(e6);
    r7 && (o12 = o12.filter(function(r8) {
      return Object.getOwnPropertyDescriptor(e6, r8).enumerable;
    })), t4.push.apply(t4, o12);
  }
  return t4;
}
function _objectSpread16(e6) {
  for (var r7 = 1; r7 < arguments.length; r7++) {
    var t4 = null != arguments[r7] ? arguments[r7] : {};
    r7 % 2 ? ownKeys16(Object(t4), true).forEach(function(r8) {
      _defineProperty16(e6, r8, t4[r8]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e6, Object.getOwnPropertyDescriptors(t4)) : ownKeys16(Object(t4)).forEach(function(r8) {
      Object.defineProperty(e6, r8, Object.getOwnPropertyDescriptor(t4, r8));
    });
  }
  return e6;
}
function _defineProperty16(obj, key, value) {
  key = _toPropertyKey16(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey16(t4) {
  var i6 = _toPrimitive16(t4, "string");
  return "symbol" == _typeof17(i6) ? i6 : String(i6);
}
function _toPrimitive16(t4, r7) {
  if ("object" != _typeof17(t4) || !t4) return t4;
  var e6 = t4[Symbol.toPrimitive];
  if (void 0 !== e6) {
    var i6 = e6.call(t4, r7 || "default");
    if ("object" != _typeof17(i6)) return i6;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r7 ? String : Number)(t4);
}
function _objectWithoutProperties2(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose2(source, excluded);
  var key, i6;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i6 = 0; i6 < sourceSymbolKeys.length; i6++) {
      key = sourceSymbolKeys[i6];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose2(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i6;
  for (i6 = 0; i6 < sourceKeys.length; i6++) {
    key = sourceKeys[i6];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function _slicedToArray5(arr, i6) {
  return _arrayWithHoles5(arr) || _iterableToArrayLimit5(arr, i6) || _unsupportedIterableToArray9(arr, i6) || _nonIterableRest5();
}
function _nonIterableRest5() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray9(o12, minLen) {
  if (!o12) return;
  if (typeof o12 === "string") return _arrayLikeToArray9(o12, minLen);
  var n6 = Object.prototype.toString.call(o12).slice(8, -1);
  if (n6 === "Object" && o12.constructor) n6 = o12.constructor.name;
  if (n6 === "Map" || n6 === "Set") return Array.from(o12);
  if (n6 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n6)) return _arrayLikeToArray9(o12, minLen);
}
function _arrayLikeToArray9(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i6 = 0, arr2 = new Array(len); i6 < len; i6++) arr2[i6] = arr[i6];
  return arr2;
}
function _iterableToArrayLimit5(r7, l4) {
  var t4 = null == r7 ? null : "undefined" != typeof Symbol && r7[Symbol.iterator] || r7["@@iterator"];
  if (null != t4) {
    var e6, n6, i6, u5, a6 = [], f12 = true, o12 = false;
    try {
      if (i6 = (t4 = t4.call(r7)).next, 0 === l4) {
        if (Object(t4) !== t4) return;
        f12 = false;
      } else for (; !(f12 = (e6 = i6.call(t4)).done) && (a6.push(e6.value), a6.length !== l4); f12 = true) ;
    } catch (r8) {
      o12 = true, n6 = r8;
    } finally {
      try {
        if (!f12 && null != t4.return && (u5 = t4.return(), Object(u5) !== u5)) return;
      } finally {
        if (o12) throw n6;
      }
    }
    return a6;
  }
}
function _arrayWithHoles5(arr) {
  if (Array.isArray(arr)) return arr;
}
var withUsage7 = createDocumentationMessageGenerator({
  name: "hierarchical-menu",
  connector: true
});
var DEFAULT_SORT = ["name:asc"];
var connectHierarchicalMenu = function connectHierarchicalMenu2(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage7());
  return function(widgetParams) {
    var _ref = widgetParams || {}, attributes = _ref.attributes, _ref$separator = _ref.separator, separator = _ref$separator === void 0 ? " > " : _ref$separator, _ref$rootPath = _ref.rootPath, rootPath = _ref$rootPath === void 0 ? null : _ref$rootPath, _ref$showParentLevel = _ref.showParentLevel, showParentLevel = _ref$showParentLevel === void 0 ? true : _ref$showParentLevel, _ref$limit = _ref.limit, limit = _ref$limit === void 0 ? 10 : _ref$limit, _ref$showMore = _ref.showMore, showMore = _ref$showMore === void 0 ? false : _ref$showMore, _ref$showMoreLimit = _ref.showMoreLimit, showMoreLimit = _ref$showMoreLimit === void 0 ? 20 : _ref$showMoreLimit, _ref$sortBy = _ref.sortBy, sortBy = _ref$sortBy === void 0 ? DEFAULT_SORT : _ref$sortBy, _ref$transformItems = _ref.transformItems, transformItems = _ref$transformItems === void 0 ? function(items) {
      return items;
    } : _ref$transformItems;
    if (!attributes || !Array.isArray(attributes) || attributes.length === 0) {
      throw new Error(withUsage7("The `attributes` option expects an array of strings."));
    }
    if (showMore === true && showMoreLimit <= limit) {
      throw new Error(withUsage7("The `showMoreLimit` option must be greater than `limit`."));
    }
    var _attributes = _slicedToArray5(attributes, 1), hierarchicalFacetName = _attributes[0];
    var sendEvent;
    var toggleShowMore = function toggleShowMore2() {
    };
    function cachedToggleShowMore() {
      toggleShowMore();
    }
    var _refine;
    var isShowingMore = false;
    function createToggleShowMore(renderOptions, widget) {
      return function() {
        isShowingMore = !isShowingMore;
        widget.render(renderOptions);
      };
    }
    function getLimit() {
      return isShowingMore ? showMoreLimit : limit;
    }
    function _prepareFacetValues(facetValues) {
      return facetValues.slice(0, getLimit()).map(function(_ref2) {
        var label = _ref2.name, value = _ref2.escapedValue, data = _ref2.data, path = _ref2.path, subValue = _objectWithoutProperties2(_ref2, _excluded2);
        var item = _objectSpread16(_objectSpread16({}, subValue), {}, {
          value,
          label,
          data: null
        });
        if (Array.isArray(data)) {
          item.data = _prepareFacetValues(data);
        }
        return item;
      });
    }
    return {
      $$type: "ais.hierarchicalMenu",
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(_objectSpread16(_objectSpread16({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        toggleShowMore = createToggleShowMore(renderOptions, this);
        renderFn(_objectSpread16(_objectSpread16({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance
        }), false);
      },
      dispose: function dispose(_ref3) {
        var state = _ref3.state;
        unmountFn();
        return state.removeHierarchicalFacet(hierarchicalFacetName).setQueryParameter("maxValuesPerFacet", void 0);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread16(_objectSpread16({}, renderState), {}, {
          hierarchicalMenu: _objectSpread16(_objectSpread16({}, renderState.hierarchicalMenu), {}, _defineProperty16({}, hierarchicalFacetName, this.getWidgetRenderState(renderOptions)))
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref4) {
        var _this = this;
        var results = _ref4.results, state = _ref4.state, createURL = _ref4.createURL, instantSearchInstance = _ref4.instantSearchInstance, helper = _ref4.helper;
        var items = [];
        var canToggleShowMore = false;
        var _createURL = function _createURL2(facetValue) {
          return createURL(function(uiState) {
            return _this.getWidgetUiState(uiState, {
              searchParameters: state.resetPage().toggleFacetRefinement(hierarchicalFacetName, facetValue),
              helper
            });
          });
        };
        if (!sendEvent) {
          sendEvent = createSendEventForFacet({
            instantSearchInstance,
            helper,
            attribute: function attribute(facetValue) {
              var index3 = facetValue.split(separator).length - 1;
              return attributes[index3];
            },
            widgetType: this.$$type
          });
        }
        if (!_refine) {
          _refine = function _refine2(facetValue) {
            sendEvent("click:internal", facetValue);
            helper.toggleFacetRefinement(hierarchicalFacetName, facetValue).search();
          };
        }
        if (results) {
          var facetValues = results.getFacetValues(hierarchicalFacetName, {
            sortBy,
            facetOrdering: sortBy === DEFAULT_SORT
          });
          var facetItems = facetValues && !Array.isArray(facetValues) && facetValues.data ? facetValues.data : [];
          var hasExhaustiveItems = (state.maxValuesPerFacet || 0) > getLimit() ? facetItems.length <= getLimit() : facetItems.length < getLimit();
          canToggleShowMore = showMore && (isShowingMore || !hasExhaustiveItems);
          items = transformItems(_prepareFacetValues(facetItems), {
            results
          });
        }
        return {
          items,
          refine: _refine,
          canRefine: items.length > 0,
          createURL: _createURL,
          sendEvent,
          widgetParams,
          isShowingMore,
          toggleShowMore: cachedToggleShowMore,
          canToggleShowMore
        };
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref5) {
        var searchParameters = _ref5.searchParameters;
        var path = searchParameters.getHierarchicalFacetBreadcrumb(hierarchicalFacetName);
        return removeEmptyRefinementsFromUiState(_objectSpread16(_objectSpread16({}, uiState), {}, {
          hierarchicalMenu: _objectSpread16(_objectSpread16({}, uiState.hierarchicalMenu), {}, _defineProperty16({}, hierarchicalFacetName, path))
        }), hierarchicalFacetName);
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref6) {
        var uiState = _ref6.uiState;
        var values = uiState.hierarchicalMenu && uiState.hierarchicalMenu[hierarchicalFacetName];
        if (searchParameters.isConjunctiveFacet(hierarchicalFacetName) || searchParameters.isDisjunctiveFacet(hierarchicalFacetName)) {
          true ? _warning(false, 'HierarchicalMenu: Attribute "'.concat(hierarchicalFacetName, '" is already used by another widget applying conjunctive or disjunctive faceting.\nAs this is not supported, please make sure to remove this other widget or this HierarchicalMenu widget will not work at all.')) : void 0;
          return searchParameters;
        }
        if (searchParameters.isHierarchicalFacet(hierarchicalFacetName)) {
          var facet = searchParameters.getHierarchicalFacetByName(hierarchicalFacetName);
          true ? _warning(isEqual(facet.attributes, attributes) && facet.separator === separator && facet.rootPath === rootPath, "Using Breadcrumb and HierarchicalMenu on the same facet with different options overrides the configuration of the HierarchicalMenu.") : void 0;
        }
        var withFacetConfiguration = searchParameters.removeHierarchicalFacet(hierarchicalFacetName).addHierarchicalFacet({
          name: hierarchicalFacetName,
          attributes,
          separator,
          rootPath,
          showParentLevel
        });
        var currentMaxValuesPerFacet = withFacetConfiguration.maxValuesPerFacet || 0;
        var nextMaxValuesPerFacet = Math.max(currentMaxValuesPerFacet, showMore ? showMoreLimit : limit);
        var withMaxValuesPerFacet = withFacetConfiguration.setQueryParameter("maxValuesPerFacet", nextMaxValuesPerFacet);
        if (!values) {
          return withMaxValuesPerFacet.setQueryParameters({
            hierarchicalFacetsRefinements: _objectSpread16(_objectSpread16({}, withMaxValuesPerFacet.hierarchicalFacetsRefinements), {}, _defineProperty16({}, hierarchicalFacetName, []))
          });
        }
        return withMaxValuesPerFacet.addHierarchicalFacetRefinement(hierarchicalFacetName, values.join(separator));
      }
    };
  };
};
function removeEmptyRefinementsFromUiState(indexUiState, attribute) {
  if (!indexUiState.hierarchicalMenu) {
    return indexUiState;
  }
  if (!indexUiState.hierarchicalMenu[attribute] || indexUiState.hierarchicalMenu[attribute].length === 0) {
    delete indexUiState.hierarchicalMenu[attribute];
  }
  if (Object.keys(indexUiState.hierarchicalMenu).length === 0) {
    delete indexUiState.hierarchicalMenu;
  }
  return indexUiState;
}
var connectHierarchicalMenu_default = connectHierarchicalMenu;

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/connectors/hits/connectHits.js
function _typeof18(o12) {
  "@babel/helpers - typeof";
  return _typeof18 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o13) {
    return typeof o13;
  } : function(o13) {
    return o13 && "function" == typeof Symbol && o13.constructor === Symbol && o13 !== Symbol.prototype ? "symbol" : typeof o13;
  }, _typeof18(o12);
}
function ownKeys17(e6, r7) {
  var t4 = Object.keys(e6);
  if (Object.getOwnPropertySymbols) {
    var o12 = Object.getOwnPropertySymbols(e6);
    r7 && (o12 = o12.filter(function(r8) {
      return Object.getOwnPropertyDescriptor(e6, r8).enumerable;
    })), t4.push.apply(t4, o12);
  }
  return t4;
}
function _objectSpread17(e6) {
  for (var r7 = 1; r7 < arguments.length; r7++) {
    var t4 = null != arguments[r7] ? arguments[r7] : {};
    r7 % 2 ? ownKeys17(Object(t4), true).forEach(function(r8) {
      _defineProperty17(e6, r8, t4[r8]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e6, Object.getOwnPropertyDescriptors(t4)) : ownKeys17(Object(t4)).forEach(function(r8) {
      Object.defineProperty(e6, r8, Object.getOwnPropertyDescriptor(t4, r8));
    });
  }
  return e6;
}
function _defineProperty17(obj, key, value) {
  key = _toPropertyKey17(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey17(t4) {
  var i6 = _toPrimitive17(t4, "string");
  return "symbol" == _typeof18(i6) ? i6 : String(i6);
}
function _toPrimitive17(t4, r7) {
  if ("object" != _typeof18(t4) || !t4) return t4;
  var e6 = t4[Symbol.toPrimitive];
  if (void 0 !== e6) {
    var i6 = e6.call(t4, r7 || "default");
    if ("object" != _typeof18(i6)) return i6;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r7 ? String : Number)(t4);
}
var withUsage8 = createDocumentationMessageGenerator({
  name: "hits",
  connector: true
});
var connectHits_default = function connectHits(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage8());
  return function(widgetParams) {
    var _ref = widgetParams || {}, _ref$escapeHTML = _ref.escapeHTML, escapeHTML = _ref$escapeHTML === void 0 ? true : _ref$escapeHTML, _ref$transformItems = _ref.transformItems, transformItems = _ref$transformItems === void 0 ? function(items) {
      return items;
    } : _ref$transformItems;
    var sendEvent;
    var bindEvent;
    return {
      $$type: "ais.hits",
      init: function init(initOptions) {
        renderFn(_objectSpread17(_objectSpread17({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: initOptions.instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var renderState = this.getWidgetRenderState(renderOptions);
        renderFn(_objectSpread17(_objectSpread17({}, renderState), {}, {
          instantSearchInstance: renderOptions.instantSearchInstance
        }), false);
        renderState.sendEvent("view:internal", renderState.items);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread17(_objectSpread17({}, renderState), {}, {
          hits: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref2) {
        var _results$renderingCon, _results$renderingCon2, _results$renderingCon3;
        var results = _ref2.results, helper = _ref2.helper, instantSearchInstance = _ref2.instantSearchInstance;
        if (!sendEvent) {
          sendEvent = createSendEventForHits({
            instantSearchInstance,
            getIndex: function getIndex() {
              return helper.getIndex();
            },
            widgetType: this.$$type
          });
        }
        if (!bindEvent) {
          bindEvent = createBindEventForHits({
            getIndex: function getIndex() {
              return helper.getIndex();
            },
            widgetType: this.$$type,
            instantSearchInstance
          });
        }
        if (!results) {
          return {
            hits: [],
            items: [],
            results: void 0,
            banner: void 0,
            sendEvent,
            bindEvent,
            widgetParams
          };
        }
        if (escapeHTML && results.hits.length > 0) {
          results.hits = escapeHits(results.hits);
        }
        var hitsWithAbsolutePosition = addAbsolutePosition(results.hits, results.page, results.hitsPerPage);
        var hitsWithAbsolutePositionAndQueryID = addQueryID(hitsWithAbsolutePosition, results.queryID);
        var items = transformItems(hitsWithAbsolutePositionAndQueryID, {
          results
        });
        var banner = (_results$renderingCon = results.renderingContent) === null || _results$renderingCon === void 0 ? void 0 : (_results$renderingCon2 = _results$renderingCon.widgets) === null || _results$renderingCon2 === void 0 ? void 0 : (_results$renderingCon3 = _results$renderingCon2.banners) === null || _results$renderingCon3 === void 0 ? void 0 : _results$renderingCon3[0];
        return {
          hits: items,
          items,
          results,
          banner,
          sendEvent,
          bindEvent,
          widgetParams
        };
      },
      dispose: function dispose(_ref3) {
        var state = _ref3.state;
        unmountFn();
        if (!escapeHTML) {
          return state;
        }
        return state.setQueryParameters(Object.keys(TAG_PLACEHOLDER).reduce(function(acc, key) {
          return _objectSpread17(_objectSpread17({}, acc), {}, _defineProperty17({}, key, void 0));
        }, {}));
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(state, _uiState) {
        if (!escapeHTML) {
          return state;
        }
        return state.setQueryParameters(TAG_PLACEHOLDER);
      }
    };
  };
};

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/lib/insights/client.js
function _typeof19(o12) {
  "@babel/helpers - typeof";
  return _typeof19 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o13) {
    return typeof o13;
  } : function(o13) {
    return o13 && "function" == typeof Symbol && o13.constructor === Symbol && o13 !== Symbol.prototype ? "symbol" : typeof o13;
  }, _typeof19(o12);
}
function ownKeys18(e6, r7) {
  var t4 = Object.keys(e6);
  if (Object.getOwnPropertySymbols) {
    var o12 = Object.getOwnPropertySymbols(e6);
    r7 && (o12 = o12.filter(function(r8) {
      return Object.getOwnPropertyDescriptor(e6, r8).enumerable;
    })), t4.push.apply(t4, o12);
  }
  return t4;
}
function _objectSpread18(e6) {
  for (var r7 = 1; r7 < arguments.length; r7++) {
    var t4 = null != arguments[r7] ? arguments[r7] : {};
    r7 % 2 ? ownKeys18(Object(t4), true).forEach(function(r8) {
      _defineProperty18(e6, r8, t4[r8]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e6, Object.getOwnPropertyDescriptors(t4)) : ownKeys18(Object(t4)).forEach(function(r8) {
      Object.defineProperty(e6, r8, Object.getOwnPropertyDescriptor(t4, r8));
    });
  }
  return e6;
}
function _defineProperty18(obj, key, value) {
  key = _toPropertyKey18(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey18(t4) {
  var i6 = _toPrimitive18(t4, "string");
  return "symbol" == _typeof19(i6) ? i6 : String(i6);
}
function _toPrimitive18(t4, r7) {
  if ("object" != _typeof19(t4) || !t4) return t4;
  var e6 = t4[Symbol.toPrimitive];
  if (void 0 !== e6) {
    var i6 = e6.call(t4, r7 || "default");
    if ("object" != _typeof19(i6)) return i6;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r7 ? String : Number)(t4);
}
var getSelectedHits = function getSelectedHits2(hits, selectedObjectIDs) {
  return selectedObjectIDs.map(function(objectID) {
    var hit = find(hits, function(h8) {
      return h8.objectID === objectID;
    });
    if (typeof hit === "undefined") {
      throw new Error('Could not find objectID "'.concat(objectID, '" passed to `clickedObjectIDsAfterSearch` in the returned hits. This is necessary to infer the absolute position and the query ID.'));
    }
    return hit;
  });
};
var getQueryID = function getQueryID2(selectedHits) {
  var queryIDs = uniq(selectedHits.map(function(hit) {
    return hit.__queryID;
  }));
  if (queryIDs.length > 1) {
    throw new Error("Insights currently allows a single `queryID`. The `objectIDs` provided map to multiple `queryID`s.");
  }
  var queryID = queryIDs[0];
  if (typeof queryID !== "string") {
    throw new Error("Could not infer `queryID`. Ensure InstantSearch `clickAnalytics: true` was added with the Configure widget.\n\nSee: https://alg.li/lNiZZ7");
  }
  return queryID;
};
var getPositions = function getPositions2(selectedHits) {
  return selectedHits.map(function(hit) {
    return hit.__position;
  });
};
var inferPayload = function inferPayload2(_ref) {
  var method = _ref.method, results = _ref.results, hits = _ref.hits, objectIDs = _ref.objectIDs;
  var index3 = results.index;
  var selectedHits = getSelectedHits(hits, objectIDs);
  var queryID = getQueryID(selectedHits);
  switch (method) {
    case "clickedObjectIDsAfterSearch": {
      var positions = getPositions(selectedHits);
      return {
        index: index3,
        queryID,
        objectIDs,
        positions
      };
    }
    case "convertedObjectIDsAfterSearch":
      return {
        index: index3,
        queryID,
        objectIDs
      };
    default:
      throw new Error('Unsupported method passed to insights: "'.concat(method, '".'));
  }
};
var wrapInsightsClient = function wrapInsightsClient2(aa, results, hits) {
  return function(method) {
    for (var _len = arguments.length, payloads = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      payloads[_key - 1] = arguments[_key];
    }
    var payload = payloads[0];
    true ? _warning(false, "`insights` function has been deprecated. It is still supported in 4.x releases, but not further. It is replaced by the `insights` middleware.\n\nFor more information, visit https://www.algolia.com/doc/guides/getting-insights-and-analytics/search-analytics/click-through-and-conversions/how-to/send-click-and-conversion-events-with-instantsearch/js/") : void 0;
    if (!aa) {
      var withInstantSearchUsage = createDocumentationMessageGenerator({
        name: "instantsearch"
      });
      throw new Error(withInstantSearchUsage("The `insightsClient` option has not been provided to `instantsearch`."));
    }
    if (!Array.isArray(payload.objectIDs)) {
      throw new TypeError("Expected `objectIDs` to be an array.");
    }
    var inferredPayload = inferPayload({
      method,
      results,
      hits,
      objectIDs: payload.objectIDs
    });
    aa(method, _objectSpread18(_objectSpread18({}, inferredPayload), payload));
  };
};
function withInsights(connector) {
  return function(renderFn, unmountFn) {
    return connector(function(renderOptions, isFirstRender) {
      var results = renderOptions.results, hits = renderOptions.hits, instantSearchInstance = renderOptions.instantSearchInstance;
      if (results && hits && instantSearchInstance) {
        var insights2 = wrapInsightsClient(instantSearchInstance.insightsClient, results, hits);
        return renderFn(_objectSpread18(_objectSpread18({}, renderOptions), {}, {
          insights: insights2
        }), isFirstRender);
      }
      return renderFn(renderOptions, isFirstRender);
    }, unmountFn);
  };
}

// node_modules/.pnpm/preact@10.25.4/node_modules/preact/dist/preact.module.js
var n4;
var l;
var u2;
var t3;
var i;
var r2;
var o2;
var e2;
var f;
var c;
var s2;
var a2;
var h2;
var p = {};
var v = [];
var y = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
var d = Array.isArray;
function w(n6, l4) {
  for (var u5 in l4) n6[u5] = l4[u5];
  return n6;
}
function _(n6) {
  n6 && n6.parentNode && n6.parentNode.removeChild(n6);
}
function m(n6, t4, i6, r7, o12) {
  var e6 = { type: n6, props: t4, key: i6, ref: r7, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: null == o12 ? ++u2 : o12, __i: -1, __u: 0 };
  return null == o12 && null != l.vnode && l.vnode(e6), e6;
}
function k(n6) {
  return n6.children;
}
function x(n6, l4) {
  this.props = n6, this.context = l4;
}
function C(n6, l4) {
  if (null == l4) return n6.__ ? C(n6.__, n6.__i + 1) : null;
  for (var u5; l4 < n6.__k.length; l4++) if (null != (u5 = n6.__k[l4]) && null != u5.__e) return u5.__e;
  return "function" == typeof n6.type ? C(n6) : null;
}
function S(n6) {
  var l4, u5;
  if (null != (n6 = n6.__) && null != n6.__c) {
    for (n6.__e = n6.__c.base = null, l4 = 0; l4 < n6.__k.length; l4++) if (null != (u5 = n6.__k[l4]) && null != u5.__e) {
      n6.__e = n6.__c.base = u5.__e;
      break;
    }
    return S(n6);
  }
}
function M(n6) {
  (!n6.__d && (n6.__d = true) && i.push(n6) && !P.__r++ || r2 !== l.debounceRendering) && ((r2 = l.debounceRendering) || o2)(P);
}
function P() {
  var n6, u5, t4, r7, o12, f12, c14, s5;
  for (i.sort(e2); n6 = i.shift(); ) n6.__d && (u5 = i.length, r7 = void 0, f12 = (o12 = (t4 = n6).__v).__e, c14 = [], s5 = [], t4.__P && ((r7 = w({}, o12)).__v = o12.__v + 1, l.vnode && l.vnode(r7), j(t4.__P, r7, o12, t4.__n, t4.__P.namespaceURI, 32 & o12.__u ? [f12] : null, c14, null == f12 ? C(o12) : f12, !!(32 & o12.__u), s5), r7.__v = o12.__v, r7.__.__k[r7.__i] = r7, z(c14, r7, s5), r7.__e != f12 && S(r7)), i.length > u5 && i.sort(e2));
  P.__r = 0;
}
function $(n6, l4, u5, t4, i6, r7, o12, e6, f12, c14, s5) {
  var a6, h8, y5, d8, w2, _2, g9 = t4 && t4.__k || v, m12 = l4.length;
  for (f12 = I(u5, l4, g9, f12, m12), a6 = 0; a6 < m12; a6++) null != (y5 = u5.__k[a6]) && (h8 = -1 === y5.__i ? p : g9[y5.__i] || p, y5.__i = a6, _2 = j(n6, y5, h8, i6, r7, o12, e6, f12, c14, s5), d8 = y5.__e, y5.ref && h8.ref != y5.ref && (h8.ref && V(h8.ref, null, y5), s5.push(y5.ref, y5.__c || d8, y5)), null == w2 && null != d8 && (w2 = d8), 4 & y5.__u || h8.__k === y5.__k ? f12 = A(y5, f12, n6) : "function" == typeof y5.type && void 0 !== _2 ? f12 = _2 : d8 && (f12 = d8.nextSibling), y5.__u &= -7);
  return u5.__e = w2, f12;
}
function I(n6, l4, u5, t4, i6) {
  var r7, o12, e6, f12, c14, s5 = u5.length, a6 = s5, h8 = 0;
  for (n6.__k = new Array(i6), r7 = 0; r7 < i6; r7++) null != (o12 = l4[r7]) && "boolean" != typeof o12 && "function" != typeof o12 ? (f12 = r7 + h8, (o12 = n6.__k[r7] = "string" == typeof o12 || "number" == typeof o12 || "bigint" == typeof o12 || o12.constructor == String ? m(null, o12, null, null, null) : d(o12) ? m(k, { children: o12 }, null, null, null) : void 0 === o12.constructor && o12.__b > 0 ? m(o12.type, o12.props, o12.key, o12.ref ? o12.ref : null, o12.__v) : o12).__ = n6, o12.__b = n6.__b + 1, e6 = null, -1 !== (c14 = o12.__i = L(o12, u5, f12, a6)) && (a6--, (e6 = u5[c14]) && (e6.__u |= 2)), null == e6 || null === e6.__v ? (-1 == c14 && h8--, "function" != typeof o12.type && (o12.__u |= 4)) : c14 != f12 && (c14 == f12 - 1 ? h8-- : c14 == f12 + 1 ? h8++ : (c14 > f12 ? h8-- : h8++, o12.__u |= 4))) : n6.__k[r7] = null;
  if (a6) for (r7 = 0; r7 < s5; r7++) null != (e6 = u5[r7]) && 0 == (2 & e6.__u) && (e6.__e == t4 && (t4 = C(e6)), q(e6, e6));
  return t4;
}
function A(n6, l4, u5) {
  var t4, i6;
  if ("function" == typeof n6.type) {
    for (t4 = n6.__k, i6 = 0; t4 && i6 < t4.length; i6++) t4[i6] && (t4[i6].__ = n6, l4 = A(t4[i6], l4, u5));
    return l4;
  }
  n6.__e != l4 && (l4 && n6.type && !u5.contains(l4) && (l4 = C(n6)), u5.insertBefore(n6.__e, l4 || null), l4 = n6.__e);
  do {
    l4 = l4 && l4.nextSibling;
  } while (null != l4 && 8 == l4.nodeType);
  return l4;
}
function L(n6, l4, u5, t4) {
  var i6, r7, o12 = n6.key, e6 = n6.type, f12 = l4[u5];
  if (null === f12 || f12 && o12 == f12.key && e6 === f12.type && 0 == (2 & f12.__u)) return u5;
  if (t4 > (null != f12 && 0 == (2 & f12.__u) ? 1 : 0)) for (i6 = u5 - 1, r7 = u5 + 1; i6 >= 0 || r7 < l4.length; ) {
    if (i6 >= 0) {
      if ((f12 = l4[i6]) && 0 == (2 & f12.__u) && o12 == f12.key && e6 === f12.type) return i6;
      i6--;
    }
    if (r7 < l4.length) {
      if ((f12 = l4[r7]) && 0 == (2 & f12.__u) && o12 == f12.key && e6 === f12.type) return r7;
      r7++;
    }
  }
  return -1;
}
function T(n6, l4, u5) {
  "-" == l4[0] ? n6.setProperty(l4, null == u5 ? "" : u5) : n6[l4] = null == u5 ? "" : "number" != typeof u5 || y.test(l4) ? u5 : u5 + "px";
}
function F(n6, l4, u5, t4, i6) {
  var r7;
  n: if ("style" == l4) if ("string" == typeof u5) n6.style.cssText = u5;
  else {
    if ("string" == typeof t4 && (n6.style.cssText = t4 = ""), t4) for (l4 in t4) u5 && l4 in u5 || T(n6.style, l4, "");
    if (u5) for (l4 in u5) t4 && u5[l4] === t4[l4] || T(n6.style, l4, u5[l4]);
  }
  else if ("o" == l4[0] && "n" == l4[1]) r7 = l4 != (l4 = l4.replace(f, "$1")), l4 = l4.toLowerCase() in n6 || "onFocusOut" == l4 || "onFocusIn" == l4 ? l4.toLowerCase().slice(2) : l4.slice(2), n6.l || (n6.l = {}), n6.l[l4 + r7] = u5, u5 ? t4 ? u5.u = t4.u : (u5.u = c, n6.addEventListener(l4, r7 ? a2 : s2, r7)) : n6.removeEventListener(l4, r7 ? a2 : s2, r7);
  else {
    if ("http://www.w3.org/2000/svg" == i6) l4 = l4.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
    else if ("width" != l4 && "height" != l4 && "href" != l4 && "list" != l4 && "form" != l4 && "tabIndex" != l4 && "download" != l4 && "rowSpan" != l4 && "colSpan" != l4 && "role" != l4 && "popover" != l4 && l4 in n6) try {
      n6[l4] = null == u5 ? "" : u5;
      break n;
    } catch (n7) {
    }
    "function" == typeof u5 || (null == u5 || false === u5 && "-" != l4[4] ? n6.removeAttribute(l4) : n6.setAttribute(l4, "popover" == l4 && 1 == u5 ? "" : u5));
  }
}
function O(n6) {
  return function(u5) {
    if (this.l) {
      var t4 = this.l[u5.type + n6];
      if (null == u5.t) u5.t = c++;
      else if (u5.t < t4.u) return;
      return t4(l.event ? l.event(u5) : u5);
    }
  };
}
function j(n6, u5, t4, i6, r7, o12, e6, f12, c14, s5) {
  var a6, h8, p6, v6, y5, g9, m12, b3, C2, S2, M2, P3, I2, A2, H, L3, T2, F2 = u5.type;
  if (void 0 !== u5.constructor) return null;
  128 & t4.__u && (c14 = !!(32 & t4.__u), o12 = [f12 = u5.__e = t4.__e]), (a6 = l.__b) && a6(u5);
  n: if ("function" == typeof F2) try {
    if (b3 = u5.props, C2 = "prototype" in F2 && F2.prototype.render, S2 = (a6 = F2.contextType) && i6[a6.__c], M2 = a6 ? S2 ? S2.props.value : a6.__ : i6, t4.__c ? m12 = (h8 = u5.__c = t4.__c).__ = h8.__E : (C2 ? u5.__c = h8 = new F2(b3, M2) : (u5.__c = h8 = new x(b3, M2), h8.constructor = F2, h8.render = B), S2 && S2.sub(h8), h8.props = b3, h8.state || (h8.state = {}), h8.context = M2, h8.__n = i6, p6 = h8.__d = true, h8.__h = [], h8._sb = []), C2 && null == h8.__s && (h8.__s = h8.state), C2 && null != F2.getDerivedStateFromProps && (h8.__s == h8.state && (h8.__s = w({}, h8.__s)), w(h8.__s, F2.getDerivedStateFromProps(b3, h8.__s))), v6 = h8.props, y5 = h8.state, h8.__v = u5, p6) C2 && null == F2.getDerivedStateFromProps && null != h8.componentWillMount && h8.componentWillMount(), C2 && null != h8.componentDidMount && h8.__h.push(h8.componentDidMount);
    else {
      if (C2 && null == F2.getDerivedStateFromProps && b3 !== v6 && null != h8.componentWillReceiveProps && h8.componentWillReceiveProps(b3, M2), !h8.__e && (null != h8.shouldComponentUpdate && false === h8.shouldComponentUpdate(b3, h8.__s, M2) || u5.__v == t4.__v)) {
        for (u5.__v != t4.__v && (h8.props = b3, h8.state = h8.__s, h8.__d = false), u5.__e = t4.__e, u5.__k = t4.__k, u5.__k.some(function(n7) {
          n7 && (n7.__ = u5);
        }), P3 = 0; P3 < h8._sb.length; P3++) h8.__h.push(h8._sb[P3]);
        h8._sb = [], h8.__h.length && e6.push(h8);
        break n;
      }
      null != h8.componentWillUpdate && h8.componentWillUpdate(b3, h8.__s, M2), C2 && null != h8.componentDidUpdate && h8.__h.push(function() {
        h8.componentDidUpdate(v6, y5, g9);
      });
    }
    if (h8.context = M2, h8.props = b3, h8.__P = n6, h8.__e = false, I2 = l.__r, A2 = 0, C2) {
      for (h8.state = h8.__s, h8.__d = false, I2 && I2(u5), a6 = h8.render(h8.props, h8.state, h8.context), H = 0; H < h8._sb.length; H++) h8.__h.push(h8._sb[H]);
      h8._sb = [];
    } else do {
      h8.__d = false, I2 && I2(u5), a6 = h8.render(h8.props, h8.state, h8.context), h8.state = h8.__s;
    } while (h8.__d && ++A2 < 25);
    h8.state = h8.__s, null != h8.getChildContext && (i6 = w(w({}, i6), h8.getChildContext())), C2 && !p6 && null != h8.getSnapshotBeforeUpdate && (g9 = h8.getSnapshotBeforeUpdate(v6, y5)), f12 = $(n6, d(L3 = null != a6 && a6.type === k && null == a6.key ? a6.props.children : a6) ? L3 : [L3], u5, t4, i6, r7, o12, e6, f12, c14, s5), h8.base = u5.__e, u5.__u &= -161, h8.__h.length && e6.push(h8), m12 && (h8.__E = h8.__ = null);
  } catch (n7) {
    if (u5.__v = null, c14 || null != o12) if (n7.then) {
      for (u5.__u |= c14 ? 160 : 128; f12 && 8 == f12.nodeType && f12.nextSibling; ) f12 = f12.nextSibling;
      o12[o12.indexOf(f12)] = null, u5.__e = f12;
    } else for (T2 = o12.length; T2--; ) _(o12[T2]);
    else u5.__e = t4.__e, u5.__k = t4.__k;
    l.__e(n7, u5, t4);
  }
  else null == o12 && u5.__v == t4.__v ? (u5.__k = t4.__k, u5.__e = t4.__e) : f12 = u5.__e = N(t4.__e, u5, t4, i6, r7, o12, e6, c14, s5);
  return (a6 = l.diffed) && a6(u5), 128 & u5.__u ? void 0 : f12;
}
function z(n6, u5, t4) {
  for (var i6 = 0; i6 < t4.length; i6++) V(t4[i6], t4[++i6], t4[++i6]);
  l.__c && l.__c(u5, n6), n6.some(function(u6) {
    try {
      n6 = u6.__h, u6.__h = [], n6.some(function(n7) {
        n7.call(u6);
      });
    } catch (n7) {
      l.__e(n7, u6.__v);
    }
  });
}
function N(u5, t4, i6, r7, o12, e6, f12, c14, s5) {
  var a6, h8, v6, y5, w2, g9, m12, b3 = i6.props, k5 = t4.props, x3 = t4.type;
  if ("svg" == x3 ? o12 = "http://www.w3.org/2000/svg" : "math" == x3 ? o12 = "http://www.w3.org/1998/Math/MathML" : o12 || (o12 = "http://www.w3.org/1999/xhtml"), null != e6) {
    for (a6 = 0; a6 < e6.length; a6++) if ((w2 = e6[a6]) && "setAttribute" in w2 == !!x3 && (x3 ? w2.localName == x3 : 3 == w2.nodeType)) {
      u5 = w2, e6[a6] = null;
      break;
    }
  }
  if (null == u5) {
    if (null == x3) return document.createTextNode(k5);
    u5 = document.createElementNS(o12, x3, k5.is && k5), c14 && (l.__m && l.__m(t4, e6), c14 = false), e6 = null;
  }
  if (null === x3) b3 === k5 || c14 && u5.data === k5 || (u5.data = k5);
  else {
    if (e6 = e6 && n4.call(u5.childNodes), b3 = i6.props || p, !c14 && null != e6) for (b3 = {}, a6 = 0; a6 < u5.attributes.length; a6++) b3[(w2 = u5.attributes[a6]).name] = w2.value;
    for (a6 in b3) if (w2 = b3[a6], "children" == a6) ;
    else if ("dangerouslySetInnerHTML" == a6) v6 = w2;
    else if (!(a6 in k5)) {
      if ("value" == a6 && "defaultValue" in k5 || "checked" == a6 && "defaultChecked" in k5) continue;
      F(u5, a6, null, w2, o12);
    }
    for (a6 in k5) w2 = k5[a6], "children" == a6 ? y5 = w2 : "dangerouslySetInnerHTML" == a6 ? h8 = w2 : "value" == a6 ? g9 = w2 : "checked" == a6 ? m12 = w2 : c14 && "function" != typeof w2 || b3[a6] === w2 || F(u5, a6, w2, b3[a6], o12);
    if (h8) c14 || v6 && (h8.__html === v6.__html || h8.__html === u5.innerHTML) || (u5.innerHTML = h8.__html), t4.__k = [];
    else if (v6 && (u5.innerHTML = ""), $(u5, d(y5) ? y5 : [y5], t4, i6, r7, "foreignObject" == x3 ? "http://www.w3.org/1999/xhtml" : o12, e6, f12, e6 ? e6[0] : i6.__k && C(i6, 0), c14, s5), null != e6) for (a6 = e6.length; a6--; ) _(e6[a6]);
    c14 || (a6 = "value", "progress" == x3 && null == g9 ? u5.removeAttribute("value") : void 0 !== g9 && (g9 !== u5[a6] || "progress" == x3 && !g9 || "option" == x3 && g9 !== b3[a6]) && F(u5, a6, g9, b3[a6], o12), a6 = "checked", void 0 !== m12 && m12 !== u5[a6] && F(u5, a6, m12, b3[a6], o12));
  }
  return u5;
}
function V(n6, u5, t4) {
  try {
    if ("function" == typeof n6) {
      var i6 = "function" == typeof n6.__u;
      i6 && n6.__u(), i6 && null == u5 || (n6.__u = n6(u5));
    } else n6.current = u5;
  } catch (n7) {
    l.__e(n7, t4);
  }
}
function q(n6, u5, t4) {
  var i6, r7;
  if (l.unmount && l.unmount(n6), (i6 = n6.ref) && (i6.current && i6.current !== n6.__e || V(i6, null, u5)), null != (i6 = n6.__c)) {
    if (i6.componentWillUnmount) try {
      i6.componentWillUnmount();
    } catch (n7) {
      l.__e(n7, u5);
    }
    i6.base = i6.__P = null;
  }
  if (i6 = n6.__k) for (r7 = 0; r7 < i6.length; r7++) i6[r7] && q(i6[r7], u5, t4 || "function" != typeof n6.type);
  t4 || _(n6.__e), n6.__c = n6.__ = n6.__e = void 0;
}
function B(n6, l4, u5) {
  return this.constructor(n6, u5);
}
n4 = v.slice, l = { __e: function(n6, l4, u5, t4) {
  for (var i6, r7, o12; l4 = l4.__; ) if ((i6 = l4.__c) && !i6.__) try {
    if ((r7 = i6.constructor) && null != r7.getDerivedStateFromError && (i6.setState(r7.getDerivedStateFromError(n6)), o12 = i6.__d), null != i6.componentDidCatch && (i6.componentDidCatch(n6, t4 || {}), o12 = i6.__d), o12) return i6.__E = i6;
  } catch (l5) {
    n6 = l5;
  }
  throw n6;
} }, u2 = 0, t3 = function(n6) {
  return null != n6 && null == n6.constructor;
}, x.prototype.setState = function(n6, l4) {
  var u5;
  u5 = null != this.__s && this.__s !== this.state ? this.__s : this.__s = w({}, this.state), "function" == typeof n6 && (n6 = n6(w({}, u5), this.props)), n6 && w(u5, n6), null != n6 && this.__v && (l4 && this._sb.push(l4), M(this));
}, x.prototype.forceUpdate = function(n6) {
  this.__v && (this.__e = true, n6 && this.__h.push(n6), M(this));
}, x.prototype.render = k, i = [], o2 = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, e2 = function(n6, l4) {
  return n6.__v.__b - l4.__v.__b;
}, P.__r = 0, f = /(PointerCapture)$|Capture$/i, c = 0, s2 = O(false), a2 = O(true), h2 = 0;

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/helpers/insights.js
function _typeof20(o12) {
  "@babel/helpers - typeof";
  return _typeof20 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o13) {
    return typeof o13;
  } : function(o13) {
    return o13 && "function" == typeof Symbol && o13.constructor === Symbol && o13 !== Symbol.prototype ? "symbol" : typeof o13;
  }, _typeof20(o12);
}
function writeDataAttributes(_ref) {
  var method = _ref.method, payload = _ref.payload;
  if (_typeof20(payload) !== "object") {
    throw new Error("The insights helper expects the payload to be an object.");
  }
  var serializedPayload;
  try {
    serializedPayload = serializePayload(payload);
  } catch (error) {
    throw new Error("Could not JSON serialize the payload object.");
  }
  return 'data-insights-method="'.concat(method, '" data-insights-payload="').concat(serializedPayload, '"');
}
function insights(method, payload) {
  true ? _warning(false, "`insights` function has been deprecated. It is still supported in 4.x releases, but not further. It is replaced by the `insights` middleware.\n\nFor more information, visit https://www.algolia.com/doc/guides/getting-insights-and-analytics/search-analytics/click-through-and-conversions/how-to/send-click-and-conversion-events-with-instantsearch/js/") : void 0;
  return writeDataAttributes({
    method,
    payload
  });
}

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/connectors/hits/connectHitsWithInsights.js
var connectHitsWithInsights = withInsights(connectHits_default);
var connectHitsWithInsights_default = connectHitsWithInsights;

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/connectors/hits-per-page/connectHitsPerPage.js
function _typeof21(o12) {
  "@babel/helpers - typeof";
  return _typeof21 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o13) {
    return typeof o13;
  } : function(o13) {
    return o13 && "function" == typeof Symbol && o13.constructor === Symbol && o13 !== Symbol.prototype ? "symbol" : typeof o13;
  }, _typeof21(o12);
}
function _toConsumableArray6(arr) {
  return _arrayWithoutHoles6(arr) || _iterableToArray6(arr) || _unsupportedIterableToArray10(arr) || _nonIterableSpread6();
}
function _nonIterableSpread6() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray10(o12, minLen) {
  if (!o12) return;
  if (typeof o12 === "string") return _arrayLikeToArray10(o12, minLen);
  var n6 = Object.prototype.toString.call(o12).slice(8, -1);
  if (n6 === "Object" && o12.constructor) n6 = o12.constructor.name;
  if (n6 === "Map" || n6 === "Set") return Array.from(o12);
  if (n6 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n6)) return _arrayLikeToArray10(o12, minLen);
}
function _iterableToArray6(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles6(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray10(arr);
}
function _arrayLikeToArray10(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i6 = 0, arr2 = new Array(len); i6 < len; i6++) arr2[i6] = arr[i6];
  return arr2;
}
function ownKeys19(e6, r7) {
  var t4 = Object.keys(e6);
  if (Object.getOwnPropertySymbols) {
    var o12 = Object.getOwnPropertySymbols(e6);
    r7 && (o12 = o12.filter(function(r8) {
      return Object.getOwnPropertyDescriptor(e6, r8).enumerable;
    })), t4.push.apply(t4, o12);
  }
  return t4;
}
function _objectSpread19(e6) {
  for (var r7 = 1; r7 < arguments.length; r7++) {
    var t4 = null != arguments[r7] ? arguments[r7] : {};
    r7 % 2 ? ownKeys19(Object(t4), true).forEach(function(r8) {
      _defineProperty19(e6, r8, t4[r8]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e6, Object.getOwnPropertyDescriptors(t4)) : ownKeys19(Object(t4)).forEach(function(r8) {
      Object.defineProperty(e6, r8, Object.getOwnPropertyDescriptor(t4, r8));
    });
  }
  return e6;
}
function _defineProperty19(obj, key, value) {
  key = _toPropertyKey19(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey19(t4) {
  var i6 = _toPrimitive19(t4, "string");
  return "symbol" == _typeof21(i6) ? i6 : String(i6);
}
function _toPrimitive19(t4, r7) {
  if ("object" != _typeof21(t4) || !t4) return t4;
  var e6 = t4[Symbol.toPrimitive];
  if (void 0 !== e6) {
    var i6 = e6.call(t4, r7 || "default");
    if ("object" != _typeof21(i6)) return i6;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r7 ? String : Number)(t4);
}
var withUsage9 = createDocumentationMessageGenerator({
  name: "hits-per-page",
  connector: true
});
var connectHitsPerPage = function connectHitsPerPage2(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage9());
  return function(widgetParams) {
    var _ref = widgetParams || {}, userItems = _ref.items, _ref$transformItems = _ref.transformItems, transformItems = _ref$transformItems === void 0 ? function(items2) {
      return items2;
    } : _ref$transformItems;
    if (!Array.isArray(userItems)) {
      throw new Error(withUsage9("The `items` option expects an array of objects."));
    }
    var items = userItems;
    var defaultItems = items.filter(function(item) {
      return item.default === true;
    });
    if (defaultItems.length === 0) {
      throw new Error(withUsage9("A default value must be specified in `items`."));
    }
    if (defaultItems.length > 1) {
      throw new Error(withUsage9("More than one default value is specified in `items`."));
    }
    var defaultItem = defaultItems[0];
    var normalizeItems = function normalizeItems2(_ref2) {
      var hitsPerPage = _ref2.hitsPerPage;
      return items.map(function(item) {
        return _objectSpread19(_objectSpread19({}, item), {}, {
          isRefined: Number(item.value) === Number(hitsPerPage)
        });
      });
    };
    var connectorState = {
      getRefine: function getRefine(helper) {
        return function(value) {
          return !value && value !== 0 ? helper.setQueryParameter("hitsPerPage", void 0).search() : helper.setQueryParameter("hitsPerPage", value).search();
        };
      },
      createURLFactory: function createURLFactory(_ref3) {
        var state = _ref3.state, createURL = _ref3.createURL, getWidgetUiState = _ref3.getWidgetUiState, helper = _ref3.helper;
        return function(value) {
          return createURL(function(uiState) {
            return getWidgetUiState(uiState, {
              searchParameters: state.resetPage().setQueryParameter("hitsPerPage", !value && value !== 0 ? void 0 : value),
              helper
            });
          });
        };
      }
    };
    return {
      $$type: "ais.hitsPerPage",
      init: function init(initOptions) {
        var state = initOptions.state, instantSearchInstance = initOptions.instantSearchInstance;
        var isCurrentInOptions = items.some(function(item) {
          return Number(state.hitsPerPage) === Number(item.value);
        });
        if (!isCurrentInOptions) {
          true ? _warning(state.hitsPerPage !== void 0, "\n`hitsPerPage` is not defined.\nThe option `hitsPerPage` needs to be set using the `configure` widget.\n\nLearn more: https://www.algolia.com/doc/api-reference/widgets/hits-per-page/js/\n            ") : void 0;
          true ? _warning(false, '\nThe `items` option of `hitsPerPage` does not contain the "hits per page" value coming from the state: '.concat(state.hitsPerPage, ".\n\nYou may want to add another entry to the `items` option with this value.")) : void 0;
          items = [
            // The helper will convert the empty string to `undefined`.
            {
              value: "",
              label: ""
            }
          ].concat(_toConsumableArray6(items));
        }
        renderFn(_objectSpread19(_objectSpread19({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance
        }), true);
      },
      render: function render(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(_objectSpread19(_objectSpread19({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance
        }), false);
      },
      dispose: function dispose(_ref4) {
        var state = _ref4.state;
        unmountFn();
        return state.setQueryParameter("hitsPerPage", void 0);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread19(_objectSpread19({}, renderState), {}, {
          hitsPerPage: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref5) {
        var state = _ref5.state, results = _ref5.results, createURL = _ref5.createURL, helper = _ref5.helper;
        var canRefine = results ? results.nbHits > 0 : false;
        return {
          items: transformItems(normalizeItems(state), {
            results
          }),
          refine: connectorState.getRefine(helper),
          createURL: connectorState.createURLFactory({
            state,
            createURL,
            getWidgetUiState: this.getWidgetUiState,
            helper
          }),
          hasNoResults: !canRefine,
          canRefine,
          widgetParams
        };
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref6) {
        var searchParameters = _ref6.searchParameters;
        var hitsPerPage = searchParameters.hitsPerPage;
        if (hitsPerPage === void 0 || hitsPerPage === defaultItem.value) {
          return uiState;
        }
        return _objectSpread19(_objectSpread19({}, uiState), {}, {
          hitsPerPage
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref7) {
        var uiState = _ref7.uiState;
        return searchParameters.setQueryParameters({
          hitsPerPage: uiState.hitsPerPage || defaultItem.value
        });
      }
    };
  };
};
var connectHitsPerPage_default = connectHitsPerPage;

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/connectors/infinite-hits/connectInfiniteHits.js
function _typeof22(o12) {
  "@babel/helpers - typeof";
  return _typeof22 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o13) {
    return typeof o13;
  } : function(o13) {
    return o13 && "function" == typeof Symbol && o13.constructor === Symbol && o13 !== Symbol.prototype ? "symbol" : typeof o13;
  }, _typeof22(o12);
}
var _excluded3 = ["page"];
var _excluded22 = ["clickAnalytics", "userToken"];
function ownKeys20(e6, r7) {
  var t4 = Object.keys(e6);
  if (Object.getOwnPropertySymbols) {
    var o12 = Object.getOwnPropertySymbols(e6);
    r7 && (o12 = o12.filter(function(r8) {
      return Object.getOwnPropertyDescriptor(e6, r8).enumerable;
    })), t4.push.apply(t4, o12);
  }
  return t4;
}
function _objectSpread20(e6) {
  for (var r7 = 1; r7 < arguments.length; r7++) {
    var t4 = null != arguments[r7] ? arguments[r7] : {};
    r7 % 2 ? ownKeys20(Object(t4), true).forEach(function(r8) {
      _defineProperty20(e6, r8, t4[r8]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e6, Object.getOwnPropertyDescriptors(t4)) : ownKeys20(Object(t4)).forEach(function(r8) {
      Object.defineProperty(e6, r8, Object.getOwnPropertyDescriptor(t4, r8));
    });
  }
  return e6;
}
function _defineProperty20(obj, key, value) {
  key = _toPropertyKey20(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey20(t4) {
  var i6 = _toPrimitive20(t4, "string");
  return "symbol" == _typeof22(i6) ? i6 : String(i6);
}
function _toPrimitive20(t4, r7) {
  if ("object" != _typeof22(t4) || !t4) return t4;
  var e6 = t4[Symbol.toPrimitive];
  if (void 0 !== e6) {
    var i6 = e6.call(t4, r7 || "default");
    if ("object" != _typeof22(i6)) return i6;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r7 ? String : Number)(t4);
}
function _toConsumableArray7(arr) {
  return _arrayWithoutHoles7(arr) || _iterableToArray7(arr) || _unsupportedIterableToArray11(arr) || _nonIterableSpread7();
}
function _nonIterableSpread7() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray11(o12, minLen) {
  if (!o12) return;
  if (typeof o12 === "string") return _arrayLikeToArray11(o12, minLen);
  var n6 = Object.prototype.toString.call(o12).slice(8, -1);
  if (n6 === "Object" && o12.constructor) n6 = o12.constructor.name;
  if (n6 === "Map" || n6 === "Set") return Array.from(o12);
  if (n6 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n6)) return _arrayLikeToArray11(o12, minLen);
}
function _iterableToArray7(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles7(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray11(arr);
}
function _arrayLikeToArray11(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i6 = 0, arr2 = new Array(len); i6 < len; i6++) arr2[i6] = arr[i6];
  return arr2;
}
function _objectWithoutProperties3(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose3(source, excluded);
  var key, i6;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i6 = 0; i6 < sourceSymbolKeys.length; i6++) {
      key = sourceSymbolKeys[i6];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose3(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i6;
  for (i6 = 0; i6 < sourceKeys.length; i6++) {
    key = sourceKeys[i6];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
var withUsage10 = createDocumentationMessageGenerator({
  name: "infinite-hits",
  connector: true
});
function getStateWithoutPage(state) {
  var _ref = state || {}, page = _ref.page, rest = _objectWithoutProperties3(_ref, _excluded3);
  return rest;
}
function normalizeState(state) {
  var _ref2 = state || {}, clickAnalytics = _ref2.clickAnalytics, userToken = _ref2.userToken, rest = _objectWithoutProperties3(_ref2, _excluded22);
  return rest;
}
function getInMemoryCache() {
  var cachedHits = null;
  var cachedState = null;
  return {
    read: function read(_ref3) {
      var state = _ref3.state;
      return isEqual(cachedState, getStateWithoutPage(state)) ? cachedHits : null;
    },
    write: function write(_ref4) {
      var state = _ref4.state, hits = _ref4.hits;
      cachedState = getStateWithoutPage(state);
      cachedHits = hits;
    }
  };
}
function extractHitsFromCachedHits(cachedHits) {
  return Object.keys(cachedHits).map(Number).sort(function(a6, b3) {
    return a6 - b3;
  }).reduce(function(acc, page) {
    return acc.concat(cachedHits[page]);
  }, []);
}
var connectInfiniteHits_default = function connectInfiniteHits(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage10());
  return function(widgetParams) {
    var _ref5 = widgetParams || {}, _ref5$escapeHTML = _ref5.escapeHTML, escapeHTML = _ref5$escapeHTML === void 0 ? true : _ref5$escapeHTML, _ref5$transformItems = _ref5.transformItems, transformItems = _ref5$transformItems === void 0 ? function(items) {
      return items;
    } : _ref5$transformItems, _ref5$cache = _ref5.cache, cache = _ref5$cache === void 0 ? getInMemoryCache() : _ref5$cache;
    var showPrevious;
    var showMore;
    var sendEvent;
    var bindEvent;
    var getFirstReceivedPage = function getFirstReceivedPage2(state, cachedHits) {
      var _state$page = state.page, page = _state$page === void 0 ? 0 : _state$page;
      var pages = Object.keys(cachedHits).map(Number);
      if (pages.length === 0) {
        return page;
      } else {
        return Math.min.apply(Math, [page].concat(_toConsumableArray7(pages)));
      }
    };
    var getLastReceivedPage = function getLastReceivedPage2(state, cachedHits) {
      var _state$page2 = state.page, page = _state$page2 === void 0 ? 0 : _state$page2;
      var pages = Object.keys(cachedHits).map(Number);
      if (pages.length === 0) {
        return page;
      } else {
        return Math.max.apply(Math, [page].concat(_toConsumableArray7(pages)));
      }
    };
    var getShowPrevious = function getShowPrevious2(helper) {
      return function() {
        helper.overrideStateWithoutTriggeringChangeEvent(_objectSpread20(_objectSpread20({}, helper.state), {}, {
          page: getFirstReceivedPage(helper.state, cache.read({
            state: normalizeState(helper.state)
          }) || {}) - 1
        })).searchWithoutTriggeringOnStateChange();
      };
    };
    var getShowMore = function getShowMore2(helper) {
      return function() {
        helper.setPage(getLastReceivedPage(helper.state, cache.read({
          state: normalizeState(helper.state)
        }) || {}) + 1).search();
      };
    };
    return {
      $$type: "ais.infiniteHits",
      init: function init(initOptions) {
        renderFn(_objectSpread20(_objectSpread20({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: initOptions.instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        var widgetRenderState = this.getWidgetRenderState(renderOptions);
        renderFn(_objectSpread20(_objectSpread20({}, widgetRenderState), {}, {
          instantSearchInstance
        }), false);
        sendEvent("view:internal", widgetRenderState.currentPageHits);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread20(_objectSpread20({}, renderState), {}, {
          infiniteHits: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref6) {
        var _results$renderingCon, _results$renderingCon2, _results$renderingCon3;
        var results = _ref6.results, helper = _ref6.helper, parent = _ref6.parent, existingState = _ref6.state, instantSearchInstance = _ref6.instantSearchInstance;
        var isFirstPage;
        var currentPageHits = [];
        var state = parent.getPreviousState() || existingState;
        var cachedHits = cache.read({
          state: normalizeState(state)
        }) || {};
        var banner = results === null || results === void 0 ? void 0 : (_results$renderingCon = results.renderingContent) === null || _results$renderingCon === void 0 ? void 0 : (_results$renderingCon2 = _results$renderingCon.widgets) === null || _results$renderingCon2 === void 0 ? void 0 : (_results$renderingCon3 = _results$renderingCon2.banners) === null || _results$renderingCon3 === void 0 ? void 0 : _results$renderingCon3[0];
        if (!results) {
          showPrevious = getShowPrevious(helper);
          showMore = getShowMore(helper);
          sendEvent = createSendEventForHits({
            instantSearchInstance,
            getIndex: function getIndex() {
              return helper.getIndex();
            },
            widgetType: this.$$type
          });
          bindEvent = createBindEventForHits({
            getIndex: function getIndex() {
              return helper.getIndex();
            },
            widgetType: this.$$type,
            instantSearchInstance
          });
          isFirstPage = state.page === void 0 || getFirstReceivedPage(state, cachedHits) === 0;
        } else {
          var _state$disjunctiveFac, _state$hierarchicalFa;
          var _state$page3 = state.page, _page = _state$page3 === void 0 ? 0 : _state$page3;
          if (escapeHTML && results.hits.length > 0) {
            results.hits = escapeHits(results.hits);
          }
          var hitsWithAbsolutePosition = addAbsolutePosition(results.hits, results.page, results.hitsPerPage);
          var hitsWithAbsolutePositionAndQueryID = addQueryID(hitsWithAbsolutePosition, results.queryID);
          var transformedHits = transformItems(hitsWithAbsolutePositionAndQueryID, {
            results
          });
          var hasDynamicWidgets = false;
          walkIndex(instantSearchInstance.mainIndex, function(indexWidget) {
            if (!hasDynamicWidgets && indexWidget.getWidgets().some(function(_ref7) {
              var $$type5 = _ref7.$$type;
              return $$type5 === "ais.dynamicWidgets";
            })) {
              hasDynamicWidgets = true;
            }
          });
          var hasNoFacets = !((_state$disjunctiveFac = state.disjunctiveFacets) !== null && _state$disjunctiveFac !== void 0 && _state$disjunctiveFac.length) && !(state.facets || []).filter(function(f12) {
            return f12 !== "*";
          }).length && !((_state$hierarchicalFa = state.hierarchicalFacets) !== null && _state$hierarchicalFa !== void 0 && _state$hierarchicalFa.length);
          if (cachedHits[_page] === void 0 && !results.__isArtificial && instantSearchInstance.status === "idle" && !(hasDynamicWidgets && hasNoFacets)) {
            cachedHits[_page] = transformedHits;
            cache.write({
              state: normalizeState(state),
              hits: cachedHits
            });
          }
          currentPageHits = transformedHits;
          isFirstPage = getFirstReceivedPage(state, cachedHits) === 0;
        }
        var items = extractHitsFromCachedHits(cachedHits);
        var isLastPage = results ? results.nbPages <= getLastReceivedPage(state, cachedHits) + 1 : true;
        return {
          hits: items,
          items,
          currentPageHits,
          sendEvent,
          bindEvent,
          banner,
          results: results || void 0,
          showPrevious,
          showMore,
          isFirstPage,
          isLastPage,
          widgetParams
        };
      },
      dispose: function dispose(_ref8) {
        var state = _ref8.state;
        unmountFn();
        var stateWithoutPage = state.setQueryParameter("page", void 0);
        if (!escapeHTML) {
          return stateWithoutPage;
        }
        return stateWithoutPage.setQueryParameters(Object.keys(TAG_PLACEHOLDER).reduce(function(acc, key) {
          return _objectSpread20(_objectSpread20({}, acc), {}, _defineProperty20({}, key, void 0));
        }, {}));
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref9) {
        var searchParameters = _ref9.searchParameters;
        var page = searchParameters.page || 0;
        if (!page) {
          return uiState;
        }
        return _objectSpread20(_objectSpread20({}, uiState), {}, {
          // The page in the UI state is incremented by one
          // to expose the user value (not `0`).
          page: page + 1
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref10) {
        var uiState = _ref10.uiState;
        var widgetSearchParameters = searchParameters;
        if (escapeHTML) {
          widgetSearchParameters = searchParameters.setQueryParameters(TAG_PLACEHOLDER);
        }
        var page = uiState.page ? uiState.page - 1 : 0;
        return widgetSearchParameters.setQueryParameter("page", page);
      }
    };
  };
};

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/connectors/infinite-hits/connectInfiniteHitsWithInsights.js
var connectInfiniteHitsWithInsights = withInsights(connectInfiniteHits_default);
var connectInfiniteHitsWithInsights_default = connectInfiniteHitsWithInsights;

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/connectors/menu/connectMenu.js
var _excluded4 = ["name", "escapedValue", "path"];
function _typeof23(o12) {
  "@babel/helpers - typeof";
  return _typeof23 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o13) {
    return typeof o13;
  } : function(o13) {
    return o13 && "function" == typeof Symbol && o13.constructor === Symbol && o13 !== Symbol.prototype ? "symbol" : typeof o13;
  }, _typeof23(o12);
}
function _objectWithoutProperties4(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose4(source, excluded);
  var key, i6;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i6 = 0; i6 < sourceSymbolKeys.length; i6++) {
      key = sourceSymbolKeys[i6];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose4(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i6;
  for (i6 = 0; i6 < sourceKeys.length; i6++) {
    key = sourceKeys[i6];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function _slicedToArray6(arr, i6) {
  return _arrayWithHoles6(arr) || _iterableToArrayLimit6(arr, i6) || _unsupportedIterableToArray12(arr, i6) || _nonIterableRest6();
}
function _nonIterableRest6() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray12(o12, minLen) {
  if (!o12) return;
  if (typeof o12 === "string") return _arrayLikeToArray12(o12, minLen);
  var n6 = Object.prototype.toString.call(o12).slice(8, -1);
  if (n6 === "Object" && o12.constructor) n6 = o12.constructor.name;
  if (n6 === "Map" || n6 === "Set") return Array.from(o12);
  if (n6 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n6)) return _arrayLikeToArray12(o12, minLen);
}
function _arrayLikeToArray12(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i6 = 0, arr2 = new Array(len); i6 < len; i6++) arr2[i6] = arr[i6];
  return arr2;
}
function _iterableToArrayLimit6(r7, l4) {
  var t4 = null == r7 ? null : "undefined" != typeof Symbol && r7[Symbol.iterator] || r7["@@iterator"];
  if (null != t4) {
    var e6, n6, i6, u5, a6 = [], f12 = true, o12 = false;
    try {
      if (i6 = (t4 = t4.call(r7)).next, 0 === l4) {
        if (Object(t4) !== t4) return;
        f12 = false;
      } else for (; !(f12 = (e6 = i6.call(t4)).done) && (a6.push(e6.value), a6.length !== l4); f12 = true) ;
    } catch (r8) {
      o12 = true, n6 = r8;
    } finally {
      try {
        if (!f12 && null != t4.return && (u5 = t4.return(), Object(u5) !== u5)) return;
      } finally {
        if (o12) throw n6;
      }
    }
    return a6;
  }
}
function _arrayWithHoles6(arr) {
  if (Array.isArray(arr)) return arr;
}
function ownKeys21(e6, r7) {
  var t4 = Object.keys(e6);
  if (Object.getOwnPropertySymbols) {
    var o12 = Object.getOwnPropertySymbols(e6);
    r7 && (o12 = o12.filter(function(r8) {
      return Object.getOwnPropertyDescriptor(e6, r8).enumerable;
    })), t4.push.apply(t4, o12);
  }
  return t4;
}
function _objectSpread21(e6) {
  for (var r7 = 1; r7 < arguments.length; r7++) {
    var t4 = null != arguments[r7] ? arguments[r7] : {};
    r7 % 2 ? ownKeys21(Object(t4), true).forEach(function(r8) {
      _defineProperty21(e6, r8, t4[r8]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e6, Object.getOwnPropertyDescriptors(t4)) : ownKeys21(Object(t4)).forEach(function(r8) {
      Object.defineProperty(e6, r8, Object.getOwnPropertyDescriptor(t4, r8));
    });
  }
  return e6;
}
function _defineProperty21(obj, key, value) {
  key = _toPropertyKey21(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey21(t4) {
  var i6 = _toPrimitive21(t4, "string");
  return "symbol" == _typeof23(i6) ? i6 : String(i6);
}
function _toPrimitive21(t4, r7) {
  if ("object" != _typeof23(t4) || !t4) return t4;
  var e6 = t4[Symbol.toPrimitive];
  if (void 0 !== e6) {
    var i6 = e6.call(t4, r7 || "default");
    if ("object" != _typeof23(i6)) return i6;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r7 ? String : Number)(t4);
}
var withUsage11 = createDocumentationMessageGenerator({
  name: "menu",
  connector: true
});
var DEFAULT_SORT2 = ["isRefined", "name:asc"];
var connectMenu = function connectMenu2(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage11());
  return function(widgetParams) {
    var _ref = widgetParams || {}, attribute = _ref.attribute, _ref$limit = _ref.limit, limit = _ref$limit === void 0 ? 10 : _ref$limit, _ref$showMore = _ref.showMore, showMore = _ref$showMore === void 0 ? false : _ref$showMore, _ref$showMoreLimit = _ref.showMoreLimit, showMoreLimit = _ref$showMoreLimit === void 0 ? 20 : _ref$showMoreLimit, _ref$sortBy = _ref.sortBy, sortBy = _ref$sortBy === void 0 ? DEFAULT_SORT2 : _ref$sortBy, _ref$transformItems = _ref.transformItems, transformItems = _ref$transformItems === void 0 ? function(items) {
      return items;
    } : _ref$transformItems;
    if (!attribute) {
      throw new Error(withUsage11("The `attribute` option is required."));
    }
    if (showMore === true && showMoreLimit <= limit) {
      throw new Error(withUsage11("The `showMoreLimit` option must be greater than `limit`."));
    }
    var sendEvent;
    var _createURL;
    var _refine;
    var isShowingMore = false;
    var toggleShowMore = function toggleShowMore2() {
    };
    function createToggleShowMore(renderOptions, widget) {
      return function() {
        isShowingMore = !isShowingMore;
        widget.render(renderOptions);
      };
    }
    function cachedToggleShowMore() {
      toggleShowMore();
    }
    function getLimit() {
      return isShowingMore ? showMoreLimit : limit;
    }
    return {
      $$type: "ais.menu",
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(_objectSpread21(_objectSpread21({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(_objectSpread21(_objectSpread21({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance
        }), false);
      },
      dispose: function dispose(_ref2) {
        var state = _ref2.state;
        unmountFn();
        return state.removeHierarchicalFacet(attribute).setQueryParameter("maxValuesPerFacet", void 0);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread21(_objectSpread21({}, renderState), {}, {
          menu: _objectSpread21(_objectSpread21({}, renderState.menu), {}, _defineProperty21({}, attribute, this.getWidgetRenderState(renderOptions)))
        });
      },
      getWidgetRenderState: function getWidgetRenderState(renderOptions) {
        var _this = this;
        var results = renderOptions.results, createURL = renderOptions.createURL, instantSearchInstance = renderOptions.instantSearchInstance, helper = renderOptions.helper;
        var items = [];
        var canToggleShowMore = false;
        if (!sendEvent) {
          sendEvent = createSendEventForFacet({
            instantSearchInstance,
            helper,
            attribute,
            widgetType: this.$$type
          });
        }
        if (!_createURL) {
          _createURL = function _createURL2(facetValue) {
            return createURL(function(uiState) {
              return _this.getWidgetUiState(uiState, {
                searchParameters: helper.state.resetPage().toggleFacetRefinement(attribute, facetValue),
                helper
              });
            });
          };
        }
        if (!_refine) {
          _refine = function _refine2(facetValue) {
            var _helper$getHierarchic = helper.getHierarchicalFacetBreadcrumb(attribute), _helper$getHierarchic2 = _slicedToArray6(_helper$getHierarchic, 1), refinedItem = _helper$getHierarchic2[0];
            sendEvent("click:internal", facetValue ? facetValue : refinedItem);
            helper.toggleFacetRefinement(attribute, facetValue ? facetValue : refinedItem).search();
          };
        }
        if (renderOptions.results) {
          toggleShowMore = createToggleShowMore(renderOptions, this);
        }
        if (results) {
          var facetValues = results.getFacetValues(attribute, {
            sortBy,
            facetOrdering: sortBy === DEFAULT_SORT2
          });
          var facetItems = facetValues && !Array.isArray(facetValues) && facetValues.data ? facetValues.data : [];
          canToggleShowMore = showMore && (isShowingMore || facetItems.length > getLimit());
          items = transformItems(facetItems.slice(0, getLimit()).map(function(_ref3) {
            var label = _ref3.name, value = _ref3.escapedValue, path = _ref3.path, item = _objectWithoutProperties4(_ref3, _excluded4);
            return _objectSpread21(_objectSpread21({}, item), {}, {
              label,
              value
            });
          }), {
            results
          });
        }
        return {
          items,
          createURL: _createURL,
          refine: _refine,
          sendEvent,
          canRefine: items.length > 0,
          widgetParams,
          isShowingMore,
          toggleShowMore: cachedToggleShowMore,
          canToggleShowMore
        };
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref4) {
        var searchParameters = _ref4.searchParameters;
        var _searchParameters$get = searchParameters.getHierarchicalFacetBreadcrumb(attribute), _searchParameters$get2 = _slicedToArray6(_searchParameters$get, 1), value = _searchParameters$get2[0];
        return removeEmptyRefinementsFromUiState2(_objectSpread21(_objectSpread21({}, uiState), {}, {
          menu: _objectSpread21(_objectSpread21({}, uiState.menu), {}, _defineProperty21({}, attribute, value))
        }), attribute);
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref5) {
        var uiState = _ref5.uiState;
        var value = uiState.menu && uiState.menu[attribute];
        if (searchParameters.isConjunctiveFacet(attribute) || searchParameters.isDisjunctiveFacet(attribute)) {
          true ? _warning(false, 'Menu: Attribute "'.concat(attribute, '" is already used by another widget applying conjunctive or disjunctive faceting.\nAs this is not supported, please make sure to remove this other widget or this Menu widget will not work at all.')) : void 0;
          return searchParameters;
        }
        var withFacetConfiguration = searchParameters.removeHierarchicalFacet(attribute).addHierarchicalFacet({
          name: attribute,
          attributes: [attribute]
        });
        var currentMaxValuesPerFacet = withFacetConfiguration.maxValuesPerFacet || 0;
        var nextMaxValuesPerFacet = Math.max(currentMaxValuesPerFacet, showMore ? showMoreLimit : limit);
        var withMaxValuesPerFacet = withFacetConfiguration.setQueryParameter("maxValuesPerFacet", nextMaxValuesPerFacet);
        if (!value) {
          return withMaxValuesPerFacet.setQueryParameters({
            hierarchicalFacetsRefinements: _objectSpread21(_objectSpread21({}, withMaxValuesPerFacet.hierarchicalFacetsRefinements), {}, _defineProperty21({}, attribute, []))
          });
        }
        return withMaxValuesPerFacet.addHierarchicalFacetRefinement(attribute, value);
      }
    };
  };
};
function removeEmptyRefinementsFromUiState2(indexUiState, attribute) {
  if (!indexUiState.menu) {
    return indexUiState;
  }
  if (indexUiState.menu[attribute] === void 0) {
    delete indexUiState.menu[attribute];
  }
  if (Object.keys(indexUiState.menu).length === 0) {
    delete indexUiState.menu;
  }
  return indexUiState;
}
var connectMenu_default = connectMenu;

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/connectors/numeric-menu/connectNumericMenu.js
function _typeof24(o12) {
  "@babel/helpers - typeof";
  return _typeof24 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o13) {
    return typeof o13;
  } : function(o13) {
    return o13 && "function" == typeof Symbol && o13.constructor === Symbol && o13 !== Symbol.prototype ? "symbol" : typeof o13;
  }, _typeof24(o12);
}
function _createForOfIteratorHelper(o12, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o12[Symbol.iterator] || o12["@@iterator"];
  if (!it) {
    if (Array.isArray(o12) || (it = _unsupportedIterableToArray13(o12)) || allowArrayLike && o12 && typeof o12.length === "number") {
      if (it) o12 = it;
      var i6 = 0;
      var F2 = function F3() {
      };
      return { s: F2, n: function n6() {
        if (i6 >= o12.length) return { done: true };
        return { done: false, value: o12[i6++] };
      }, e: function e6(_e) {
        throw _e;
      }, f: F2 };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true, didErr = false, err;
  return { s: function s5() {
    it = it.call(o12);
  }, n: function n6() {
    var step = it.next();
    normalCompletion = step.done;
    return step;
  }, e: function e6(_e2) {
    didErr = true;
    err = _e2;
  }, f: function f12() {
    try {
      if (!normalCompletion && it.return != null) it.return();
    } finally {
      if (didErr) throw err;
    }
  } };
}
function _slicedToArray7(arr, i6) {
  return _arrayWithHoles7(arr) || _iterableToArrayLimit7(arr, i6) || _unsupportedIterableToArray13(arr, i6) || _nonIterableRest7();
}
function _nonIterableRest7() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray13(o12, minLen) {
  if (!o12) return;
  if (typeof o12 === "string") return _arrayLikeToArray13(o12, minLen);
  var n6 = Object.prototype.toString.call(o12).slice(8, -1);
  if (n6 === "Object" && o12.constructor) n6 = o12.constructor.name;
  if (n6 === "Map" || n6 === "Set") return Array.from(o12);
  if (n6 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n6)) return _arrayLikeToArray13(o12, minLen);
}
function _arrayLikeToArray13(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i6 = 0, arr2 = new Array(len); i6 < len; i6++) arr2[i6] = arr[i6];
  return arr2;
}
function _iterableToArrayLimit7(r7, l4) {
  var t4 = null == r7 ? null : "undefined" != typeof Symbol && r7[Symbol.iterator] || r7["@@iterator"];
  if (null != t4) {
    var e6, n6, i6, u5, a6 = [], f12 = true, o12 = false;
    try {
      if (i6 = (t4 = t4.call(r7)).next, 0 === l4) {
        if (Object(t4) !== t4) return;
        f12 = false;
      } else for (; !(f12 = (e6 = i6.call(t4)).done) && (a6.push(e6.value), a6.length !== l4); f12 = true) ;
    } catch (r8) {
      o12 = true, n6 = r8;
    } finally {
      try {
        if (!f12 && null != t4.return && (u5 = t4.return(), Object(u5) !== u5)) return;
      } finally {
        if (o12) throw n6;
      }
    }
    return a6;
  }
}
function _arrayWithHoles7(arr) {
  if (Array.isArray(arr)) return arr;
}
function ownKeys22(e6, r7) {
  var t4 = Object.keys(e6);
  if (Object.getOwnPropertySymbols) {
    var o12 = Object.getOwnPropertySymbols(e6);
    r7 && (o12 = o12.filter(function(r8) {
      return Object.getOwnPropertyDescriptor(e6, r8).enumerable;
    })), t4.push.apply(t4, o12);
  }
  return t4;
}
function _objectSpread22(e6) {
  for (var r7 = 1; r7 < arguments.length; r7++) {
    var t4 = null != arguments[r7] ? arguments[r7] : {};
    r7 % 2 ? ownKeys22(Object(t4), true).forEach(function(r8) {
      _defineProperty22(e6, r8, t4[r8]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e6, Object.getOwnPropertyDescriptors(t4)) : ownKeys22(Object(t4)).forEach(function(r8) {
      Object.defineProperty(e6, r8, Object.getOwnPropertyDescriptor(t4, r8));
    });
  }
  return e6;
}
function _defineProperty22(obj, key, value) {
  key = _toPropertyKey22(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey22(t4) {
  var i6 = _toPrimitive22(t4, "string");
  return "symbol" == _typeof24(i6) ? i6 : String(i6);
}
function _toPrimitive22(t4, r7) {
  if ("object" != _typeof24(t4) || !t4) return t4;
  var e6 = t4[Symbol.toPrimitive];
  if (void 0 !== e6) {
    var i6 = e6.call(t4, r7 || "default");
    if ("object" != _typeof24(i6)) return i6;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r7 ? String : Number)(t4);
}
var withUsage12 = createDocumentationMessageGenerator({
  name: "numeric-menu",
  connector: true
});
var $$type = "ais.numericMenu";
var createSendEvent = function createSendEvent2(_ref) {
  var instantSearchInstance = _ref.instantSearchInstance;
  return function() {
    if (arguments.length === 1) {
      instantSearchInstance.sendEventToInsights(arguments.length <= 0 ? void 0 : arguments[0]);
      return;
    }
  };
};
var connectNumericMenu = function connectNumericMenu2(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage12());
  return function(widgetParams) {
    var _ref2 = widgetParams || {}, _ref2$attribute = _ref2.attribute, attribute = _ref2$attribute === void 0 ? "" : _ref2$attribute, _ref2$items = _ref2.items, items = _ref2$items === void 0 ? [] : _ref2$items, _ref2$transformItems = _ref2.transformItems, transformItems = _ref2$transformItems === void 0 ? function(item) {
      return item;
    } : _ref2$transformItems;
    if (attribute === "") {
      throw new Error(withUsage12("The `attribute` option is required."));
    }
    if (!items || items.length === 0) {
      throw new Error(withUsage12("The `items` option expects an array of objects."));
    }
    var prepareItems2 = function prepareItems3(state) {
      return items.map(function(_ref3) {
        var start = _ref3.start, end = _ref3.end, label = _ref3.label;
        return {
          label,
          value: encodeURI(JSON.stringify({
            start,
            end
          })),
          isRefined: isRefined(state, attribute, {
            start,
            end,
            label
          })
        };
      });
    };
    var connectorState = {};
    return {
      $$type,
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(_objectSpread22(_objectSpread22({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(_objectSpread22(_objectSpread22({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance
        }), false);
      },
      dispose: function dispose(_ref4) {
        var state = _ref4.state;
        unmountFn();
        return state.removeNumericRefinement(attribute);
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref5) {
        var searchParameters = _ref5.searchParameters;
        var values = searchParameters.getNumericRefinements(attribute);
        var equal = values["="] && values["="][0];
        if (equal || equal === 0) {
          return _objectSpread22(_objectSpread22({}, uiState), {}, {
            numericMenu: _objectSpread22(_objectSpread22({}, uiState.numericMenu), {}, _defineProperty22({}, attribute, "".concat(values["="])))
          });
        }
        var min = values[">="] && values[">="][0] || "";
        var max = values["<="] && values["<="][0] || "";
        return removeEmptyRefinementsFromUiState3(_objectSpread22(_objectSpread22({}, uiState), {}, {
          numericMenu: _objectSpread22(_objectSpread22({}, uiState.numericMenu), {}, _defineProperty22({}, attribute, "".concat(min, ":").concat(max)))
        }), attribute);
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref6) {
        var uiState = _ref6.uiState;
        var value = uiState.numericMenu && uiState.numericMenu[attribute];
        var withoutRefinements = searchParameters.setQueryParameters({
          numericRefinements: _objectSpread22(_objectSpread22({}, searchParameters.numericRefinements), {}, _defineProperty22({}, attribute, {}))
        });
        if (!value) {
          return withoutRefinements;
        }
        var isExact = value.indexOf(":") === -1;
        if (isExact) {
          return withoutRefinements.addNumericRefinement(attribute, "=", Number(value));
        }
        var _value$split$map = value.split(":").map(parseFloat), _value$split$map2 = _slicedToArray7(_value$split$map, 2), min = _value$split$map2[0], max = _value$split$map2[1];
        var withMinRefinement = isFiniteNumber(min) ? withoutRefinements.addNumericRefinement(attribute, ">=", min) : withoutRefinements;
        var withMaxRefinement = isFiniteNumber(max) ? withMinRefinement.addNumericRefinement(attribute, "<=", max) : withMinRefinement;
        return withMaxRefinement;
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread22(_objectSpread22({}, renderState), {}, {
          numericMenu: _objectSpread22(_objectSpread22({}, renderState.numericMenu), {}, _defineProperty22({}, attribute, this.getWidgetRenderState(renderOptions)))
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref7) {
        var _this = this;
        var results = _ref7.results, state = _ref7.state, instantSearchInstance = _ref7.instantSearchInstance, helper = _ref7.helper, createURL = _ref7.createURL;
        if (!connectorState.refine) {
          connectorState.refine = function(facetValue) {
            var refinedState = getRefinedState(helper.state, attribute, facetValue);
            connectorState.sendEvent("click:internal", facetValue);
            helper.setState(refinedState).search();
          };
        }
        if (!connectorState.createURL) {
          connectorState.createURL = function(newState) {
            return function(facetValue) {
              return createURL(function(uiState) {
                return _this.getWidgetUiState(uiState, {
                  searchParameters: getRefinedState(newState, attribute, facetValue),
                  helper
                });
              });
            };
          };
        }
        if (!connectorState.sendEvent) {
          connectorState.sendEvent = createSendEvent({
            instantSearchInstance
          });
        }
        var hasNoResults = results ? results.nbHits === 0 : true;
        var preparedItems = prepareItems2(state);
        var allIsSelected = true;
        var _iterator = _createForOfIteratorHelper(preparedItems), _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done; ) {
            var item = _step.value;
            if (item.isRefined && decodeURI(item.value) !== "{}") {
              allIsSelected = false;
              break;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        return {
          createURL: connectorState.createURL(state),
          items: transformItems(preparedItems, {
            results
          }),
          hasNoResults,
          canRefine: !(hasNoResults && allIsSelected),
          refine: connectorState.refine,
          sendEvent: connectorState.sendEvent,
          widgetParams
        };
      }
    };
  };
};
function isRefined(state, attribute, option) {
  var currentRefinements = state.getNumericRefinements(attribute);
  if (option.start !== void 0 && option.end !== void 0) {
    if (option.start === option.end) {
      return hasNumericRefinement(currentRefinements, "=", option.start);
    } else {
      return hasNumericRefinement(currentRefinements, ">=", option.start) && hasNumericRefinement(currentRefinements, "<=", option.end);
    }
  }
  if (option.start !== void 0) {
    return hasNumericRefinement(currentRefinements, ">=", option.start);
  }
  if (option.end !== void 0) {
    return hasNumericRefinement(currentRefinements, "<=", option.end);
  }
  if (option.start === void 0 && option.end === void 0) {
    return Object.keys(currentRefinements).every(function(operator) {
      return (currentRefinements[operator] || []).length === 0;
    });
  }
  return false;
}
function getRefinedState(state, attribute, facetValue) {
  var resolvedState = state;
  var refinedOption = JSON.parse(decodeURI(facetValue));
  var currentRefinements = resolvedState.getNumericRefinements(attribute);
  if (refinedOption.start === void 0 && refinedOption.end === void 0) {
    return resolvedState.removeNumericRefinement(attribute);
  }
  if (!isRefined(resolvedState, attribute, refinedOption)) {
    resolvedState = resolvedState.removeNumericRefinement(attribute);
  }
  if (refinedOption.start !== void 0 && refinedOption.end !== void 0) {
    if (refinedOption.start > refinedOption.end) {
      throw new Error("option.start should be > to option.end");
    }
    if (refinedOption.start === refinedOption.end) {
      if (hasNumericRefinement(currentRefinements, "=", refinedOption.start)) {
        resolvedState = resolvedState.removeNumericRefinement(attribute, "=", refinedOption.start);
      } else {
        resolvedState = resolvedState.addNumericRefinement(attribute, "=", refinedOption.start);
      }
      return resolvedState;
    }
  }
  if (refinedOption.start !== void 0) {
    if (hasNumericRefinement(currentRefinements, ">=", refinedOption.start)) {
      resolvedState = resolvedState.removeNumericRefinement(attribute, ">=", refinedOption.start);
    }
    resolvedState = resolvedState.addNumericRefinement(attribute, ">=", refinedOption.start);
  }
  if (refinedOption.end !== void 0) {
    if (hasNumericRefinement(currentRefinements, "<=", refinedOption.end)) {
      resolvedState = resolvedState.removeNumericRefinement(attribute, "<=", refinedOption.end);
    }
    resolvedState = resolvedState.addNumericRefinement(attribute, "<=", refinedOption.end);
  }
  if (typeof resolvedState.page === "number") {
    resolvedState.page = 0;
  }
  return resolvedState;
}
function hasNumericRefinement(currentRefinements, operator, value) {
  return currentRefinements[operator] !== void 0 && currentRefinements[operator].includes(value);
}
function removeEmptyRefinementsFromUiState3(indexUiState, attribute) {
  if (!indexUiState.numericMenu) {
    return indexUiState;
  }
  if (indexUiState.numericMenu[attribute] === ":") {
    delete indexUiState.numericMenu[attribute];
  }
  if (Object.keys(indexUiState.numericMenu).length === 0) {
    delete indexUiState.numericMenu;
  }
  return indexUiState;
}
var connectNumericMenu_default = connectNumericMenu;

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/connectors/pagination/Paginator.js
function _typeof25(o12) {
  "@babel/helpers - typeof";
  return _typeof25 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o13) {
    return typeof o13;
  } : function(o13) {
    return o13 && "function" == typeof Symbol && o13.constructor === Symbol && o13 !== Symbol.prototype ? "symbol" : typeof o13;
  }, _typeof25(o12);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i6 = 0; i6 < props.length; i6++) {
    var descriptor = props[i6];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey23(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _defineProperty23(obj, key, value) {
  key = _toPropertyKey23(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey23(t4) {
  var i6 = _toPrimitive23(t4, "string");
  return "symbol" == _typeof25(i6) ? i6 : String(i6);
}
function _toPrimitive23(t4, r7) {
  if ("object" != _typeof25(t4) || !t4) return t4;
  var e6 = t4[Symbol.toPrimitive];
  if (void 0 !== e6) {
    var i6 = e6.call(t4, r7 || "default");
    if ("object" != _typeof25(i6)) return i6;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r7 ? String : Number)(t4);
}
var Paginator = function() {
  function Paginator2(params) {
    _classCallCheck(this, Paginator2);
    _defineProperty23(this, "currentPage", void 0);
    _defineProperty23(this, "total", void 0);
    _defineProperty23(this, "padding", void 0);
    this.currentPage = params.currentPage;
    this.total = params.total;
    this.padding = params.padding;
  }
  _createClass(Paginator2, [{
    key: "pages",
    value: function pages() {
      var total = this.total, currentPage = this.currentPage, padding = this.padding;
      if (total === 0) return [0];
      var totalDisplayedPages = this.nbPagesDisplayed(padding, total);
      if (totalDisplayedPages === total) {
        return range({
          end: total
        });
      }
      var paddingLeft = this.calculatePaddingLeft(currentPage, padding, total, totalDisplayedPages);
      var paddingRight = totalDisplayedPages - paddingLeft;
      var first = currentPage - paddingLeft;
      var last = currentPage + paddingRight;
      return range({
        start: first,
        end: last
      });
    }
  }, {
    key: "nbPagesDisplayed",
    value: function nbPagesDisplayed(padding, total) {
      return Math.min(2 * padding + 1, total);
    }
  }, {
    key: "calculatePaddingLeft",
    value: function calculatePaddingLeft(current, padding, total, totalDisplayedPages) {
      if (current <= padding) {
        return current;
      }
      if (current >= total - padding) {
        return totalDisplayedPages - (total - current);
      }
      return padding;
    }
  }, {
    key: "isLastPage",
    value: function isLastPage() {
      return this.currentPage >= this.total - 1;
    }
  }, {
    key: "isFirstPage",
    value: function isFirstPage() {
      return this.currentPage <= 0;
    }
  }]);
  return Paginator2;
}();
var Paginator_default = Paginator;

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/connectors/pagination/connectPagination.js
function _typeof26(o12) {
  "@babel/helpers - typeof";
  return _typeof26 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o13) {
    return typeof o13;
  } : function(o13) {
    return o13 && "function" == typeof Symbol && o13.constructor === Symbol && o13 !== Symbol.prototype ? "symbol" : typeof o13;
  }, _typeof26(o12);
}
function ownKeys23(e6, r7) {
  var t4 = Object.keys(e6);
  if (Object.getOwnPropertySymbols) {
    var o12 = Object.getOwnPropertySymbols(e6);
    r7 && (o12 = o12.filter(function(r8) {
      return Object.getOwnPropertyDescriptor(e6, r8).enumerable;
    })), t4.push.apply(t4, o12);
  }
  return t4;
}
function _objectSpread23(e6) {
  for (var r7 = 1; r7 < arguments.length; r7++) {
    var t4 = null != arguments[r7] ? arguments[r7] : {};
    r7 % 2 ? ownKeys23(Object(t4), true).forEach(function(r8) {
      _defineProperty24(e6, r8, t4[r8]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e6, Object.getOwnPropertyDescriptors(t4)) : ownKeys23(Object(t4)).forEach(function(r8) {
      Object.defineProperty(e6, r8, Object.getOwnPropertyDescriptor(t4, r8));
    });
  }
  return e6;
}
function _defineProperty24(obj, key, value) {
  key = _toPropertyKey24(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey24(t4) {
  var i6 = _toPrimitive24(t4, "string");
  return "symbol" == _typeof26(i6) ? i6 : String(i6);
}
function _toPrimitive24(t4, r7) {
  if ("object" != _typeof26(t4) || !t4) return t4;
  var e6 = t4[Symbol.toPrimitive];
  if (void 0 !== e6) {
    var i6 = e6.call(t4, r7 || "default");
    if ("object" != _typeof26(i6)) return i6;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r7 ? String : Number)(t4);
}
var withUsage13 = createDocumentationMessageGenerator({
  name: "pagination",
  connector: true
});
var connectPagination = function connectPagination2(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage13());
  return function(widgetParams) {
    var _ref = widgetParams || {}, totalPages = _ref.totalPages, _ref$padding = _ref.padding, padding = _ref$padding === void 0 ? 3 : _ref$padding;
    var pager = new Paginator_default({
      currentPage: 0,
      total: 0,
      padding
    });
    var connectorState = {};
    function getMaxPage(_ref2) {
      var nbPages = _ref2.nbPages;
      return totalPages !== void 0 ? Math.min(totalPages, nbPages) : nbPages;
    }
    return {
      $$type: "ais.pagination",
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(_objectSpread23(_objectSpread23({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(_objectSpread23(_objectSpread23({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance
        }), false);
      },
      dispose: function dispose(_ref3) {
        var state = _ref3.state;
        unmountFn();
        return state.setQueryParameter("page", void 0);
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref4) {
        var searchParameters = _ref4.searchParameters;
        var page = searchParameters.page || 0;
        if (!page) {
          return uiState;
        }
        return _objectSpread23(_objectSpread23({}, uiState), {}, {
          page: page + 1
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref5) {
        var uiState = _ref5.uiState;
        var page = uiState.page ? uiState.page - 1 : 0;
        return searchParameters.setQueryParameter("page", page);
      },
      getWidgetRenderState: function getWidgetRenderState(_ref6) {
        var results = _ref6.results, helper = _ref6.helper, state = _ref6.state, createURL = _ref6.createURL;
        if (!connectorState.refine) {
          connectorState.refine = function(page2) {
            helper.setPage(page2);
            helper.search();
          };
        }
        if (!connectorState.createURL) {
          connectorState.createURL = function(page2) {
            return createURL(function(uiState) {
              return _objectSpread23(_objectSpread23({}, uiState), {}, {
                page: page2 + 1
              });
            });
          };
        }
        var page = state.page || 0;
        var nbPages = getMaxPage(results || {
          nbPages: 0
        });
        pager.currentPage = page;
        pager.total = nbPages;
        return {
          createURL: connectorState.createURL,
          refine: connectorState.refine,
          canRefine: nbPages > 1,
          currentRefinement: page,
          nbHits: (results === null || results === void 0 ? void 0 : results.nbHits) || 0,
          nbPages,
          pages: results ? pager.pages() : [],
          isFirstPage: pager.isFirstPage(),
          isLastPage: pager.isLastPage(),
          widgetParams
        };
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread23(_objectSpread23({}, renderState), {}, {
          pagination: this.getWidgetRenderState(renderOptions)
        });
      }
    };
  };
};
var connectPagination_default = connectPagination;

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/connectors/range/connectRange.js
function _typeof27(o12) {
  "@babel/helpers - typeof";
  return _typeof27 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o13) {
    return typeof o13;
  } : function(o13) {
    return o13 && "function" == typeof Symbol && o13.constructor === Symbol && o13 !== Symbol.prototype ? "symbol" : typeof o13;
  }, _typeof27(o12);
}
function ownKeys24(e6, r7) {
  var t4 = Object.keys(e6);
  if (Object.getOwnPropertySymbols) {
    var o12 = Object.getOwnPropertySymbols(e6);
    r7 && (o12 = o12.filter(function(r8) {
      return Object.getOwnPropertyDescriptor(e6, r8).enumerable;
    })), t4.push.apply(t4, o12);
  }
  return t4;
}
function _objectSpread24(e6) {
  for (var r7 = 1; r7 < arguments.length; r7++) {
    var t4 = null != arguments[r7] ? arguments[r7] : {};
    r7 % 2 ? ownKeys24(Object(t4), true).forEach(function(r8) {
      _defineProperty25(e6, r8, t4[r8]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e6, Object.getOwnPropertyDescriptors(t4)) : ownKeys24(Object(t4)).forEach(function(r8) {
      Object.defineProperty(e6, r8, Object.getOwnPropertyDescriptor(t4, r8));
    });
  }
  return e6;
}
function _defineProperty25(obj, key, value) {
  key = _toPropertyKey25(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey25(t4) {
  var i6 = _toPrimitive25(t4, "string");
  return "symbol" == _typeof27(i6) ? i6 : String(i6);
}
function _toPrimitive25(t4, r7) {
  if ("object" != _typeof27(t4) || !t4) return t4;
  var e6 = t4[Symbol.toPrimitive];
  if (void 0 !== e6) {
    var i6 = e6.call(t4, r7 || "default");
    if ("object" != _typeof27(i6)) return i6;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r7 ? String : Number)(t4);
}
function _slicedToArray8(arr, i6) {
  return _arrayWithHoles8(arr) || _iterableToArrayLimit8(arr, i6) || _unsupportedIterableToArray14(arr, i6) || _nonIterableRest8();
}
function _nonIterableRest8() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray14(o12, minLen) {
  if (!o12) return;
  if (typeof o12 === "string") return _arrayLikeToArray14(o12, minLen);
  var n6 = Object.prototype.toString.call(o12).slice(8, -1);
  if (n6 === "Object" && o12.constructor) n6 = o12.constructor.name;
  if (n6 === "Map" || n6 === "Set") return Array.from(o12);
  if (n6 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n6)) return _arrayLikeToArray14(o12, minLen);
}
function _arrayLikeToArray14(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i6 = 0, arr2 = new Array(len); i6 < len; i6++) arr2[i6] = arr[i6];
  return arr2;
}
function _iterableToArrayLimit8(r7, l4) {
  var t4 = null == r7 ? null : "undefined" != typeof Symbol && r7[Symbol.iterator] || r7["@@iterator"];
  if (null != t4) {
    var e6, n6, i6, u5, a6 = [], f12 = true, o12 = false;
    try {
      if (i6 = (t4 = t4.call(r7)).next, 0 === l4) {
        if (Object(t4) !== t4) return;
        f12 = false;
      } else for (; !(f12 = (e6 = i6.call(t4)).done) && (a6.push(e6.value), a6.length !== l4); f12 = true) ;
    } catch (r8) {
      o12 = true, n6 = r8;
    } finally {
      try {
        if (!f12 && null != t4.return && (u5 = t4.return(), Object(u5) !== u5)) return;
      } finally {
        if (o12) throw n6;
      }
    }
    return a6;
  }
}
function _arrayWithHoles8(arr) {
  if (Array.isArray(arr)) return arr;
}
var withUsage14 = createDocumentationMessageGenerator({
  name: "range-input",
  connector: true
}, {
  name: "range-slider",
  connector: true
});
var $$type2 = "ais.range";
function toPrecision(_ref) {
  var min = _ref.min, max = _ref.max, precision = _ref.precision;
  var pow = Math.pow(10, precision);
  return {
    min: min ? Math.floor(min * pow) / pow : min,
    max: max ? Math.ceil(max * pow) / pow : max
  };
}
var connectRange = function connectRange2(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage14());
  return function(widgetParams) {
    var _ref2 = widgetParams || {}, _ref2$attribute = _ref2.attribute, attribute = _ref2$attribute === void 0 ? "" : _ref2$attribute, minBound = _ref2.min, maxBound = _ref2.max, _ref2$precision = _ref2.precision, precision = _ref2$precision === void 0 ? 0 : _ref2$precision;
    if (!attribute) {
      throw new Error(withUsage14("The `attribute` option is required."));
    }
    if (isFiniteNumber(minBound) && isFiniteNumber(maxBound) && minBound > maxBound) {
      throw new Error(withUsage14("The `max` option can't be lower than `min`."));
    }
    var formatToNumber = function formatToNumber2(v6) {
      return Number(Number(v6).toFixed(precision));
    };
    var rangeFormatter = {
      from: function from(v6) {
        return v6.toLocaleString();
      },
      to: function to(v6) {
        return formatToNumber(v6).toLocaleString();
      }
    };
    var getRefinedState2 = function getRefinedState3(helper, currentRange, nextMin, nextMax) {
      var resolvedState = helper.state;
      var currentRangeMin = currentRange.min, currentRangeMax = currentRange.max;
      var _ref3 = resolvedState.getNumericRefinement(attribute, ">=") || [], _ref4 = _slicedToArray8(_ref3, 1), min = _ref4[0];
      var _ref5 = resolvedState.getNumericRefinement(attribute, "<=") || [], _ref6 = _slicedToArray8(_ref5, 1), max = _ref6[0];
      var isResetMin = nextMin === void 0 || nextMin === "";
      var isResetMax = nextMax === void 0 || nextMax === "";
      var _toPrecision = toPrecision({
        min: !isResetMin ? parseFloat(nextMin) : void 0,
        max: !isResetMax ? parseFloat(nextMax) : void 0,
        precision
      }), nextMinAsNumber = _toPrecision.min, nextMaxAsNumber = _toPrecision.max;
      var newNextMin;
      if (!isFiniteNumber(minBound) && currentRangeMin === nextMinAsNumber) {
        newNextMin = void 0;
      } else if (isFiniteNumber(minBound) && isResetMin) {
        newNextMin = minBound;
      } else {
        newNextMin = nextMinAsNumber;
      }
      var newNextMax;
      if (!isFiniteNumber(maxBound) && currentRangeMax === nextMaxAsNumber) {
        newNextMax = void 0;
      } else if (isFiniteNumber(maxBound) && isResetMax) {
        newNextMax = maxBound;
      } else {
        newNextMax = nextMaxAsNumber;
      }
      var isResetNewNextMin = newNextMin === void 0;
      var isGreaterThanCurrentRange = isFiniteNumber(currentRangeMin) && currentRangeMin <= newNextMin;
      var isMinValid = isResetNewNextMin || isFiniteNumber(newNextMin) && (!isFiniteNumber(currentRangeMin) || isGreaterThanCurrentRange);
      var isResetNewNextMax = newNextMax === void 0;
      var isLowerThanRange = isFiniteNumber(newNextMax) && currentRangeMax >= newNextMax;
      var isMaxValid = isResetNewNextMax || isFiniteNumber(newNextMax) && (!isFiniteNumber(currentRangeMax) || isLowerThanRange);
      var hasMinChange = min !== newNextMin;
      var hasMaxChange = max !== newNextMax;
      if ((hasMinChange || hasMaxChange) && isMinValid && isMaxValid) {
        resolvedState = resolvedState.removeNumericRefinement(attribute);
        if (isFiniteNumber(newNextMin)) {
          resolvedState = resolvedState.addNumericRefinement(attribute, ">=", newNextMin);
        }
        if (isFiniteNumber(newNextMax)) {
          resolvedState = resolvedState.addNumericRefinement(attribute, "<=", newNextMax);
        }
        return resolvedState.resetPage();
      }
      return null;
    };
    var createSendEvent7 = function createSendEvent8(instantSearchInstance) {
      return function() {
        if (arguments.length === 1) {
          instantSearchInstance.sendEventToInsights(arguments.length <= 0 ? void 0 : arguments[0]);
          return;
        }
      };
    };
    function _getCurrentRange(stats) {
      var min;
      if (isFiniteNumber(minBound)) {
        min = minBound;
      } else if (isFiniteNumber(stats.min)) {
        min = stats.min;
      } else {
        min = 0;
      }
      var max;
      if (isFiniteNumber(maxBound)) {
        max = maxBound;
      } else if (isFiniteNumber(stats.max)) {
        max = stats.max;
      } else {
        max = 0;
      }
      return toPrecision({
        min,
        max,
        precision
      });
    }
    function _getCurrentRefinement(helper) {
      var _ref7 = helper.getNumericRefinement(attribute, ">=") || [], _ref8 = _slicedToArray8(_ref7, 1), minValue = _ref8[0];
      var _ref9 = helper.getNumericRefinement(attribute, "<=") || [], _ref10 = _slicedToArray8(_ref9, 1), maxValue = _ref10[0];
      var min = isFiniteNumber(minValue) ? minValue : -Infinity;
      var max = isFiniteNumber(maxValue) ? maxValue : Infinity;
      return [min, max];
    }
    function _refine(helper, currentRange) {
      return function() {
        var _ref11 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [void 0, void 0], _ref12 = _slicedToArray8(_ref11, 2), nextMin = _ref12[0], nextMax = _ref12[1];
        var refinedState = getRefinedState2(helper, currentRange, nextMin, nextMax);
        if (refinedState) {
          helper.setState(refinedState).search();
        }
      };
    }
    return {
      $$type: $$type2,
      init: function init(initOptions) {
        renderFn(_objectSpread24(_objectSpread24({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: initOptions.instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        renderFn(_objectSpread24(_objectSpread24({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance: renderOptions.instantSearchInstance
        }), false);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread24(_objectSpread24({}, renderState), {}, {
          range: _objectSpread24(_objectSpread24({}, renderState.range), {}, _defineProperty25({}, attribute, this.getWidgetRenderState(renderOptions)))
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref13) {
        var results = _ref13.results, helper = _ref13.helper, instantSearchInstance = _ref13.instantSearchInstance;
        var facetsFromResults = results && results.disjunctiveFacets || [];
        var facet = find(facetsFromResults, function(facetResult) {
          return facetResult.name === attribute;
        });
        var stats = facet && facet.stats || {
          min: void 0,
          max: void 0
        };
        var currentRange = _getCurrentRange(stats);
        var start = _getCurrentRefinement(helper);
        var refine;
        if (!results) {
          refine = _refine(helper, {
            min: void 0,
            max: void 0
          });
        } else {
          refine = _refine(helper, currentRange);
        }
        return {
          refine,
          canRefine: currentRange.min !== currentRange.max,
          format: rangeFormatter,
          range: currentRange,
          sendEvent: createSendEvent7(instantSearchInstance),
          widgetParams: _objectSpread24(_objectSpread24({}, widgetParams), {}, {
            precision
          }),
          start
        };
      },
      dispose: function dispose(_ref14) {
        var state = _ref14.state;
        unmountFn();
        return state.removeDisjunctiveFacet(attribute).removeNumericRefinement(attribute);
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref15) {
        var searchParameters = _ref15.searchParameters;
        var _searchParameters$get = searchParameters.getNumericRefinements(attribute), _searchParameters$get2 = _searchParameters$get[">="], min = _searchParameters$get2 === void 0 ? [] : _searchParameters$get2, _searchParameters$get3 = _searchParameters$get["<="], max = _searchParameters$get3 === void 0 ? [] : _searchParameters$get3;
        if (min.length === 0 && max.length === 0) {
          return uiState;
        }
        return _objectSpread24(_objectSpread24({}, uiState), {}, {
          range: _objectSpread24(_objectSpread24({}, uiState.range), {}, _defineProperty25({}, attribute, "".concat(min, ":").concat(max)))
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref16) {
        var uiState = _ref16.uiState;
        var widgetSearchParameters = searchParameters.addDisjunctiveFacet(attribute).setQueryParameters({
          numericRefinements: _objectSpread24(_objectSpread24({}, searchParameters.numericRefinements), {}, _defineProperty25({}, attribute, {}))
        });
        if (isFiniteNumber(minBound)) {
          widgetSearchParameters = widgetSearchParameters.addNumericRefinement(attribute, ">=", minBound);
        }
        if (isFiniteNumber(maxBound)) {
          widgetSearchParameters = widgetSearchParameters.addNumericRefinement(attribute, "<=", maxBound);
        }
        var value = uiState.range && uiState.range[attribute];
        if (!value || value.indexOf(":") === -1) {
          return widgetSearchParameters;
        }
        var _value$split$map = value.split(":").map(parseFloat), _value$split$map2 = _slicedToArray8(_value$split$map, 2), lowerBound = _value$split$map2[0], upperBound = _value$split$map2[1];
        if (isFiniteNumber(lowerBound) && (!isFiniteNumber(minBound) || minBound < lowerBound)) {
          widgetSearchParameters = widgetSearchParameters.removeNumericRefinement(attribute, ">=");
          widgetSearchParameters = widgetSearchParameters.addNumericRefinement(attribute, ">=", lowerBound);
        }
        if (isFiniteNumber(upperBound) && (!isFiniteNumber(maxBound) || upperBound < maxBound)) {
          widgetSearchParameters = widgetSearchParameters.removeNumericRefinement(attribute, "<=");
          widgetSearchParameters = widgetSearchParameters.addNumericRefinement(attribute, "<=", upperBound);
        }
        return widgetSearchParameters;
      }
    };
  };
};
var connectRange_default = connectRange;

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/connectors/refinement-list/connectRefinementList.js
function _typeof28(o12) {
  "@babel/helpers - typeof";
  return _typeof28 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o13) {
    return typeof o13;
  } : function(o13) {
    return o13 && "function" == typeof Symbol && o13.constructor === Symbol && o13 !== Symbol.prototype ? "symbol" : typeof o13;
  }, _typeof28(o12);
}
var _excluded5 = ["name", "escapedValue"];
var _excluded23 = ["escapedValue", "value"];
function ownKeys25(e6, r7) {
  var t4 = Object.keys(e6);
  if (Object.getOwnPropertySymbols) {
    var o12 = Object.getOwnPropertySymbols(e6);
    r7 && (o12 = o12.filter(function(r8) {
      return Object.getOwnPropertyDescriptor(e6, r8).enumerable;
    })), t4.push.apply(t4, o12);
  }
  return t4;
}
function _objectSpread25(e6) {
  for (var r7 = 1; r7 < arguments.length; r7++) {
    var t4 = null != arguments[r7] ? arguments[r7] : {};
    r7 % 2 ? ownKeys25(Object(t4), true).forEach(function(r8) {
      _defineProperty26(e6, r8, t4[r8]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e6, Object.getOwnPropertyDescriptors(t4)) : ownKeys25(Object(t4)).forEach(function(r8) {
      Object.defineProperty(e6, r8, Object.getOwnPropertyDescriptor(t4, r8));
    });
  }
  return e6;
}
function _defineProperty26(obj, key, value) {
  key = _toPropertyKey26(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey26(t4) {
  var i6 = _toPrimitive26(t4, "string");
  return "symbol" == _typeof28(i6) ? i6 : String(i6);
}
function _toPrimitive26(t4, r7) {
  if ("object" != _typeof28(t4) || !t4) return t4;
  var e6 = t4[Symbol.toPrimitive];
  if (void 0 !== e6) {
    var i6 = e6.call(t4, r7 || "default");
    if ("object" != _typeof28(i6)) return i6;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r7 ? String : Number)(t4);
}
function _objectWithoutProperties5(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose5(source, excluded);
  var key, i6;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i6 = 0; i6 < sourceSymbolKeys.length; i6++) {
      key = sourceSymbolKeys[i6];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose5(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i6;
  for (i6 = 0; i6 < sourceKeys.length; i6++) {
    key = sourceKeys[i6];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
var withUsage15 = createDocumentationMessageGenerator({
  name: "refinement-list",
  connector: true
});
var DEFAULT_SORT3 = ["isRefined", "count:desc", "name:asc"];
var connectRefinementList = function connectRefinementList2(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage15());
  return function(widgetParams) {
    var _ref = widgetParams || {}, attribute = _ref.attribute, _ref$operator = _ref.operator, operator = _ref$operator === void 0 ? "or" : _ref$operator, _ref$limit = _ref.limit, limit = _ref$limit === void 0 ? 10 : _ref$limit, _ref$showMore = _ref.showMore, showMore = _ref$showMore === void 0 ? false : _ref$showMore, _ref$showMoreLimit = _ref.showMoreLimit, showMoreLimit = _ref$showMoreLimit === void 0 ? 20 : _ref$showMoreLimit, _ref$sortBy = _ref.sortBy, sortBy = _ref$sortBy === void 0 ? DEFAULT_SORT3 : _ref$sortBy, _ref$escapeFacetValue = _ref.escapeFacetValues, escapeFacetValues = _ref$escapeFacetValue === void 0 ? true : _ref$escapeFacetValue, _ref$transformItems = _ref.transformItems, transformItems = _ref$transformItems === void 0 ? function(items) {
      return items;
    } : _ref$transformItems;
    if (!attribute) {
      throw new Error(withUsage15("The `attribute` option is required."));
    }
    if (!/^(and|or)$/.test(operator)) {
      throw new Error(withUsage15('The `operator` must one of: `"and"`, `"or"` (got "'.concat(operator, '").')));
    }
    if (showMore === true && showMoreLimit <= limit) {
      throw new Error(withUsage15("`showMoreLimit` should be greater than `limit`."));
    }
    var formatItems = function formatItems2(_ref2) {
      var label = _ref2.name, value = _ref2.escapedValue, item = _objectWithoutProperties5(_ref2, _excluded5);
      return _objectSpread25(_objectSpread25({}, item), {}, {
        value,
        label,
        highlighted: label
      });
    };
    var lastResultsFromMainSearch;
    var lastItemsFromMainSearch = [];
    var hasExhaustiveItems = true;
    var triggerRefine;
    var sendEvent;
    var isShowingMore = false;
    var toggleShowMore = function toggleShowMore2() {
    };
    function cachedToggleShowMore() {
      toggleShowMore();
    }
    function createToggleShowMore(renderOptions, widget) {
      return function() {
        isShowingMore = !isShowingMore;
        widget.render(renderOptions);
      };
    }
    function getLimit() {
      return isShowingMore ? showMoreLimit : limit;
    }
    var searchForFacetValues = function searchForFacetValues2() {
      return function() {
      };
    };
    var createSearchForFacetValues = function createSearchForFacetValues2(helper, widget) {
      return function(renderOptions) {
        return function(query) {
          var instantSearchInstance = renderOptions.instantSearchInstance, searchResults = renderOptions.results;
          if (query === "" && lastItemsFromMainSearch) {
            renderFn(_objectSpread25(_objectSpread25({}, widget.getWidgetRenderState(_objectSpread25(_objectSpread25({}, renderOptions), {}, {
              results: lastResultsFromMainSearch
            }))), {}, {
              instantSearchInstance
            }), false);
          } else {
            var tags = {
              highlightPreTag: escapeFacetValues ? TAG_PLACEHOLDER.highlightPreTag : TAG_REPLACEMENT.highlightPreTag,
              highlightPostTag: escapeFacetValues ? TAG_PLACEHOLDER.highlightPostTag : TAG_REPLACEMENT.highlightPostTag
            };
            helper.searchForFacetValues(
              attribute,
              query,
              // We cap the `maxFacetHits` value to 100 because the Algolia API
              // doesn't support a greater number.
              // See https://www.algolia.com/doc/api-reference/api-parameters/maxFacetHits/
              Math.min(getLimit(), 100),
              tags
            ).then(function(results) {
              var facetValues = escapeFacetValues ? escapeFacets(results.facetHits) : results.facetHits;
              var normalizedFacetValues = transformItems(facetValues.map(function(_ref3) {
                var escapedValue = _ref3.escapedValue, value = _ref3.value, item = _objectWithoutProperties5(_ref3, _excluded23);
                return _objectSpread25(_objectSpread25({}, item), {}, {
                  value: escapedValue,
                  label: value
                });
              }), {
                results: searchResults
              });
              renderFn(_objectSpread25(_objectSpread25({}, widget.getWidgetRenderState(_objectSpread25(_objectSpread25({}, renderOptions), {}, {
                results: lastResultsFromMainSearch
              }))), {}, {
                items: normalizedFacetValues,
                canToggleShowMore: false,
                canRefine: true,
                isFromSearch: true,
                instantSearchInstance
              }), false);
            });
          }
        };
      };
    };
    return {
      $$type: "ais.refinementList",
      init: function init(initOptions) {
        renderFn(_objectSpread25(_objectSpread25({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: initOptions.instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        renderFn(_objectSpread25(_objectSpread25({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance: renderOptions.instantSearchInstance
        }), false);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread25(_objectSpread25({}, renderState), {}, {
          refinementList: _objectSpread25(_objectSpread25({}, renderState.refinementList), {}, _defineProperty26({}, attribute, this.getWidgetRenderState(renderOptions)))
        });
      },
      getWidgetRenderState: function getWidgetRenderState(renderOptions) {
        var _this = this;
        var results = renderOptions.results, state = renderOptions.state, _createURL = renderOptions.createURL, instantSearchInstance = renderOptions.instantSearchInstance, helper = renderOptions.helper;
        var items = [];
        var facetValues = [];
        if (!sendEvent || !triggerRefine || !searchForFacetValues) {
          sendEvent = createSendEventForFacet({
            instantSearchInstance,
            helper,
            attribute,
            widgetType: this.$$type
          });
          triggerRefine = function triggerRefine2(facetValue) {
            sendEvent("click:internal", facetValue);
            helper.toggleFacetRefinement(attribute, facetValue).search();
          };
          searchForFacetValues = createSearchForFacetValues(helper, this);
        }
        if (results) {
          var values = results.getFacetValues(attribute, {
            sortBy,
            facetOrdering: sortBy === DEFAULT_SORT3
          });
          facetValues = values && Array.isArray(values) ? values : [];
          items = transformItems(facetValues.slice(0, getLimit()).map(formatItems), {
            results
          });
          var maxValuesPerFacetConfig = state.maxValuesPerFacet;
          var currentLimit = getLimit();
          hasExhaustiveItems = maxValuesPerFacetConfig > currentLimit ? facetValues.length <= currentLimit : facetValues.length < currentLimit;
          lastResultsFromMainSearch = results;
          lastItemsFromMainSearch = items;
          if (renderOptions.results) {
            toggleShowMore = createToggleShowMore(renderOptions, this);
          }
        }
        var searchFacetValues = searchForFacetValues && searchForFacetValues(renderOptions);
        var canShowLess = isShowingMore && lastItemsFromMainSearch.length > limit;
        var canShowMore = showMore && !hasExhaustiveItems;
        var canToggleShowMore = canShowLess || canShowMore;
        return {
          createURL: function createURL(facetValue) {
            return _createURL(function(uiState) {
              return _this.getWidgetUiState(uiState, {
                searchParameters: state.resetPage().toggleFacetRefinement(attribute, facetValue),
                helper
              });
            });
          },
          items,
          refine: triggerRefine,
          searchForItems: searchFacetValues,
          isFromSearch: false,
          canRefine: items.length > 0,
          widgetParams,
          isShowingMore,
          canToggleShowMore,
          toggleShowMore: cachedToggleShowMore,
          sendEvent,
          hasExhaustiveItems
        };
      },
      dispose: function dispose(_ref4) {
        var state = _ref4.state;
        unmountFn();
        var withoutMaxValuesPerFacet = state.setQueryParameter("maxValuesPerFacet", void 0);
        if (operator === "and") {
          return withoutMaxValuesPerFacet.removeFacet(attribute);
        }
        return withoutMaxValuesPerFacet.removeDisjunctiveFacet(attribute);
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref5) {
        var searchParameters = _ref5.searchParameters;
        var values = operator === "or" ? searchParameters.getDisjunctiveRefinements(attribute) : searchParameters.getConjunctiveRefinements(attribute);
        return removeEmptyRefinementsFromUiState4(_objectSpread25(_objectSpread25({}, uiState), {}, {
          refinementList: _objectSpread25(_objectSpread25({}, uiState.refinementList), {}, _defineProperty26({}, attribute, values))
        }), attribute);
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref6) {
        var uiState = _ref6.uiState;
        var isDisjunctive = operator === "or";
        if (searchParameters.isHierarchicalFacet(attribute)) {
          true ? _warning(false, 'RefinementList: Attribute "'.concat(attribute, '" is already used by another widget applying hierarchical faceting.\nAs this is not supported, please make sure to remove this other widget or this RefinementList widget will not work at all.')) : void 0;
          return searchParameters;
        }
        if (isDisjunctive && searchParameters.isConjunctiveFacet(attribute) || !isDisjunctive && searchParameters.isDisjunctiveFacet(attribute)) {
          true ? _warning(false, 'RefinementList: Attribute "'.concat(attribute, '" is used by another refinement list with a different operator.\nAs this is not supported, please make sure to only use this attribute with one of the two operators.')) : void 0;
          return searchParameters;
        }
        var values = uiState.refinementList && uiState.refinementList[attribute];
        var withFacetConfiguration = isDisjunctive ? searchParameters.addDisjunctiveFacet(attribute).removeDisjunctiveFacetRefinement(attribute) : searchParameters.addFacet(attribute).removeFacetRefinement(attribute);
        var currentMaxValuesPerFacet = withFacetConfiguration.maxValuesPerFacet || 0;
        var nextMaxValuesPerFacet = Math.max(currentMaxValuesPerFacet, showMore ? showMoreLimit : limit);
        var withMaxValuesPerFacet = withFacetConfiguration.setQueryParameter("maxValuesPerFacet", nextMaxValuesPerFacet);
        if (!values) {
          var key = isDisjunctive ? "disjunctiveFacetsRefinements" : "facetsRefinements";
          return withMaxValuesPerFacet.setQueryParameters(_defineProperty26({}, key, _objectSpread25(_objectSpread25({}, withMaxValuesPerFacet[key]), {}, _defineProperty26({}, attribute, []))));
        }
        return values.reduce(function(parameters, value) {
          return isDisjunctive ? parameters.addDisjunctiveFacetRefinement(attribute, value) : parameters.addFacetRefinement(attribute, value);
        }, withMaxValuesPerFacet);
      }
    };
  };
};
function removeEmptyRefinementsFromUiState4(indexUiState, attribute) {
  if (!indexUiState.refinementList) {
    return indexUiState;
  }
  if (!indexUiState.refinementList[attribute] || indexUiState.refinementList[attribute].length === 0) {
    delete indexUiState.refinementList[attribute];
  }
  if (Object.keys(indexUiState.refinementList).length === 0) {
    delete indexUiState.refinementList;
  }
  return indexUiState;
}
var connectRefinementList_default = connectRefinementList;

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/connectors/related-products/connectRelatedProducts.js
var withUsage16 = createDocumentationMessageGenerator({
  name: "related-products",
  connector: true
});

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/connectors/search-box/connectSearchBox.js
function _typeof29(o12) {
  "@babel/helpers - typeof";
  return _typeof29 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o13) {
    return typeof o13;
  } : function(o13) {
    return o13 && "function" == typeof Symbol && o13.constructor === Symbol && o13 !== Symbol.prototype ? "symbol" : typeof o13;
  }, _typeof29(o12);
}
function ownKeys26(e6, r7) {
  var t4 = Object.keys(e6);
  if (Object.getOwnPropertySymbols) {
    var o12 = Object.getOwnPropertySymbols(e6);
    r7 && (o12 = o12.filter(function(r8) {
      return Object.getOwnPropertyDescriptor(e6, r8).enumerable;
    })), t4.push.apply(t4, o12);
  }
  return t4;
}
function _objectSpread26(e6) {
  for (var r7 = 1; r7 < arguments.length; r7++) {
    var t4 = null != arguments[r7] ? arguments[r7] : {};
    r7 % 2 ? ownKeys26(Object(t4), true).forEach(function(r8) {
      _defineProperty27(e6, r8, t4[r8]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e6, Object.getOwnPropertyDescriptors(t4)) : ownKeys26(Object(t4)).forEach(function(r8) {
      Object.defineProperty(e6, r8, Object.getOwnPropertyDescriptor(t4, r8));
    });
  }
  return e6;
}
function _defineProperty27(obj, key, value) {
  key = _toPropertyKey27(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey27(t4) {
  var i6 = _toPrimitive27(t4, "string");
  return "symbol" == _typeof29(i6) ? i6 : String(i6);
}
function _toPrimitive27(t4, r7) {
  if ("object" != _typeof29(t4) || !t4) return t4;
  var e6 = t4[Symbol.toPrimitive];
  if (void 0 !== e6) {
    var i6 = e6.call(t4, r7 || "default");
    if ("object" != _typeof29(i6)) return i6;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r7 ? String : Number)(t4);
}
var withUsage17 = createDocumentationMessageGenerator({
  name: "search-box",
  connector: true
});
var defaultQueryHook = function defaultQueryHook2(query, hook) {
  return hook(query);
};
var connectSearchBox = function connectSearchBox2(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage17());
  return function(widgetParams) {
    var _ref = widgetParams || {}, _ref$queryHook = _ref.queryHook, queryHook = _ref$queryHook === void 0 ? defaultQueryHook : _ref$queryHook;
    var _refine;
    var _clear;
    return {
      $$type: "ais.searchBox",
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(_objectSpread26(_objectSpread26({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(_objectSpread26(_objectSpread26({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance
        }), false);
      },
      dispose: function dispose(_ref2) {
        var state = _ref2.state;
        unmountFn();
        return state.setQueryParameter("query", void 0);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread26(_objectSpread26({}, renderState), {}, {
          searchBox: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref3) {
        var helper = _ref3.helper, instantSearchInstance = _ref3.instantSearchInstance, state = _ref3.state;
        if (!_refine) {
          _refine = function _refine2(query) {
            queryHook(query, function(q2) {
              return helper.setQuery(q2).search();
            });
          };
          _clear = function _clear2() {
            helper.setQuery("").search();
          };
        }
        return {
          query: state.query || "",
          refine: _refine,
          clear: _clear,
          widgetParams,
          isSearchStalled: instantSearchInstance.status === "stalled"
        };
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref4) {
        var searchParameters = _ref4.searchParameters;
        var query = searchParameters.query || "";
        if (query === "" || uiState && uiState.query === query) {
          return uiState;
        }
        return _objectSpread26(_objectSpread26({}, uiState), {}, {
          query
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref5) {
        var uiState = _ref5.uiState;
        return searchParameters.setQueryParameter("query", uiState.query || "");
      }
    };
  };
};
var connectSearchBox_default = connectSearchBox;

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/connectors/sort-by/connectSortBy.js
function _typeof30(o12) {
  "@babel/helpers - typeof";
  return _typeof30 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o13) {
    return typeof o13;
  } : function(o13) {
    return o13 && "function" == typeof Symbol && o13.constructor === Symbol && o13 !== Symbol.prototype ? "symbol" : typeof o13;
  }, _typeof30(o12);
}
function ownKeys27(e6, r7) {
  var t4 = Object.keys(e6);
  if (Object.getOwnPropertySymbols) {
    var o12 = Object.getOwnPropertySymbols(e6);
    r7 && (o12 = o12.filter(function(r8) {
      return Object.getOwnPropertyDescriptor(e6, r8).enumerable;
    })), t4.push.apply(t4, o12);
  }
  return t4;
}
function _objectSpread27(e6) {
  for (var r7 = 1; r7 < arguments.length; r7++) {
    var t4 = null != arguments[r7] ? arguments[r7] : {};
    r7 % 2 ? ownKeys27(Object(t4), true).forEach(function(r8) {
      _defineProperty28(e6, r8, t4[r8]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e6, Object.getOwnPropertyDescriptors(t4)) : ownKeys27(Object(t4)).forEach(function(r8) {
      Object.defineProperty(e6, r8, Object.getOwnPropertyDescriptor(t4, r8));
    });
  }
  return e6;
}
function _defineProperty28(obj, key, value) {
  key = _toPropertyKey28(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey28(t4) {
  var i6 = _toPrimitive28(t4, "string");
  return "symbol" == _typeof30(i6) ? i6 : String(i6);
}
function _toPrimitive28(t4, r7) {
  if ("object" != _typeof30(t4) || !t4) return t4;
  var e6 = t4[Symbol.toPrimitive];
  if (void 0 !== e6) {
    var i6 = e6.call(t4, r7 || "default");
    if ("object" != _typeof30(i6)) return i6;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r7 ? String : Number)(t4);
}
var withUsage18 = createDocumentationMessageGenerator({
  name: "sort-by",
  connector: true
});
var connectSortBy = function connectSortBy2(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage18());
  var connectorState = {};
  return function(widgetParams) {
    var _ref = widgetParams || {}, items = _ref.items, _ref$transformItems = _ref.transformItems, transformItems = _ref$transformItems === void 0 ? function(x3) {
      return x3;
    } : _ref$transformItems;
    if (!Array.isArray(items)) {
      throw new Error(withUsage18("The `items` option expects an array of objects."));
    }
    return {
      $$type: "ais.sortBy",
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        var widgetRenderState = this.getWidgetRenderState(initOptions);
        var currentIndex = widgetRenderState.currentRefinement;
        var isCurrentIndexInItems = find(items, function(item) {
          return item.value === currentIndex;
        });
        true ? _warning(isCurrentIndexInItems !== void 0, 'The index named "'.concat(currentIndex, '" is not listed in the `items` of `sortBy`.')) : void 0;
        renderFn(_objectSpread27(_objectSpread27({}, widgetRenderState), {}, {
          instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(_objectSpread27(_objectSpread27({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance
        }), false);
      },
      dispose: function dispose(_ref2) {
        var state = _ref2.state;
        unmountFn();
        return connectorState.initialIndex ? state.setIndex(connectorState.initialIndex) : state;
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread27(_objectSpread27({}, renderState), {}, {
          sortBy: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref3) {
        var results = _ref3.results, helper = _ref3.helper, state = _ref3.state, parent = _ref3.parent;
        if (!connectorState.initialIndex && parent) {
          connectorState.initialIndex = parent.getIndexName();
        }
        if (!connectorState.setIndex) {
          connectorState.setIndex = function(indexName) {
            helper.setIndex(indexName).search();
          };
        }
        var hasNoResults = results ? results.nbHits === 0 : true;
        return {
          currentRefinement: state.index,
          options: transformItems(items, {
            results
          }),
          refine: connectorState.setIndex,
          hasNoResults,
          canRefine: !hasNoResults && items.length > 0,
          widgetParams
        };
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref4) {
        var searchParameters = _ref4.searchParameters;
        var currentIndex = searchParameters.index;
        return _objectSpread27(_objectSpread27({}, uiState), {}, {
          sortBy: currentIndex !== connectorState.initialIndex ? currentIndex : void 0
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref5) {
        var uiState = _ref5.uiState;
        return searchParameters.setQueryParameter("index", uiState.sortBy || connectorState.initialIndex || searchParameters.index);
      }
    };
  };
};
var connectSortBy_default = connectSortBy;

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/connectors/rating-menu/connectRatingMenu.js
function _typeof31(o12) {
  "@babel/helpers - typeof";
  return _typeof31 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o13) {
    return typeof o13;
  } : function(o13) {
    return o13 && "function" == typeof Symbol && o13.constructor === Symbol && o13 !== Symbol.prototype ? "symbol" : typeof o13;
  }, _typeof31(o12);
}
function _toConsumableArray8(arr) {
  return _arrayWithoutHoles8(arr) || _iterableToArray8(arr) || _unsupportedIterableToArray15(arr) || _nonIterableSpread8();
}
function _nonIterableSpread8() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray8(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles8(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray15(arr);
}
function ownKeys28(e6, r7) {
  var t4 = Object.keys(e6);
  if (Object.getOwnPropertySymbols) {
    var o12 = Object.getOwnPropertySymbols(e6);
    r7 && (o12 = o12.filter(function(r8) {
      return Object.getOwnPropertyDescriptor(e6, r8).enumerable;
    })), t4.push.apply(t4, o12);
  }
  return t4;
}
function _objectSpread28(e6) {
  for (var r7 = 1; r7 < arguments.length; r7++) {
    var t4 = null != arguments[r7] ? arguments[r7] : {};
    r7 % 2 ? ownKeys28(Object(t4), true).forEach(function(r8) {
      _defineProperty29(e6, r8, t4[r8]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e6, Object.getOwnPropertyDescriptors(t4)) : ownKeys28(Object(t4)).forEach(function(r8) {
      Object.defineProperty(e6, r8, Object.getOwnPropertyDescriptor(t4, r8));
    });
  }
  return e6;
}
function _defineProperty29(obj, key, value) {
  key = _toPropertyKey29(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey29(t4) {
  var i6 = _toPrimitive29(t4, "string");
  return "symbol" == _typeof31(i6) ? i6 : String(i6);
}
function _toPrimitive29(t4, r7) {
  if ("object" != _typeof31(t4) || !t4) return t4;
  var e6 = t4[Symbol.toPrimitive];
  if (void 0 !== e6) {
    var i6 = e6.call(t4, r7 || "default");
    if ("object" != _typeof31(i6)) return i6;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r7 ? String : Number)(t4);
}
function _slicedToArray9(arr, i6) {
  return _arrayWithHoles9(arr) || _iterableToArrayLimit9(arr, i6) || _unsupportedIterableToArray15(arr, i6) || _nonIterableRest9();
}
function _nonIterableRest9() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray15(o12, minLen) {
  if (!o12) return;
  if (typeof o12 === "string") return _arrayLikeToArray15(o12, minLen);
  var n6 = Object.prototype.toString.call(o12).slice(8, -1);
  if (n6 === "Object" && o12.constructor) n6 = o12.constructor.name;
  if (n6 === "Map" || n6 === "Set") return Array.from(o12);
  if (n6 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n6)) return _arrayLikeToArray15(o12, minLen);
}
function _arrayLikeToArray15(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i6 = 0, arr2 = new Array(len); i6 < len; i6++) arr2[i6] = arr[i6];
  return arr2;
}
function _iterableToArrayLimit9(r7, l4) {
  var t4 = null == r7 ? null : "undefined" != typeof Symbol && r7[Symbol.iterator] || r7["@@iterator"];
  if (null != t4) {
    var e6, n6, i6, u5, a6 = [], f12 = true, o12 = false;
    try {
      if (i6 = (t4 = t4.call(r7)).next, 0 === l4) {
        if (Object(t4) !== t4) return;
        f12 = false;
      } else for (; !(f12 = (e6 = i6.call(t4)).done) && (a6.push(e6.value), a6.length !== l4); f12 = true) ;
    } catch (r8) {
      o12 = true, n6 = r8;
    } finally {
      try {
        if (!f12 && null != t4.return && (u5 = t4.return(), Object(u5) !== u5)) return;
      } finally {
        if (o12) throw n6;
      }
    }
    return a6;
  }
}
function _arrayWithHoles9(arr) {
  if (Array.isArray(arr)) return arr;
}
var withUsage19 = createDocumentationMessageGenerator({
  name: "rating-menu",
  connector: true
});
var $$type3 = "ais.ratingMenu";
var MAX_VALUES_PER_FACET_API_LIMIT = 1e3;
var STEP = 1;
var createSendEvent3 = function createSendEvent4(_ref) {
  var instantSearchInstance = _ref.instantSearchInstance, helper = _ref.helper, getRefinedStar = _ref.getRefinedStar, attribute = _ref.attribute;
  return function() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    if (args.length === 1) {
      instantSearchInstance.sendEventToInsights(args[0]);
      return;
    }
    var facetValue = args[1], _args$ = args[2], eventName = _args$ === void 0 ? "Filter Applied" : _args$;
    var _args$0$split = args[0].split(":"), _args$0$split2 = _slicedToArray9(_args$0$split, 2), eventType = _args$0$split2[0], eventModifier = _args$0$split2[1];
    if (eventType !== "click") {
      return;
    }
    var isRefined2 = getRefinedStar() === Number(facetValue);
    if (!isRefined2) {
      instantSearchInstance.sendEventToInsights({
        insightsMethod: "clickedFilters",
        widgetType: $$type3,
        eventType,
        eventModifier,
        payload: {
          eventName,
          index: helper.getIndex(),
          filters: ["".concat(attribute, ">=").concat(facetValue)]
        },
        attribute
      });
    }
  };
};
var connectRatingMenu = function connectRatingMenu2(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage19());
  return function(widgetParams) {
    var _ref2 = widgetParams || {}, attribute = _ref2.attribute, _ref2$max = _ref2.max, max = _ref2$max === void 0 ? 5 : _ref2$max;
    var sendEvent;
    if (!attribute) {
      throw new Error(withUsage19("The `attribute` option is required."));
    }
    var _getRefinedStar = function getRefinedStar(state) {
      var _values$;
      var values = state.getNumericRefinements(attribute);
      if (!((_values$ = values[">="]) !== null && _values$ !== void 0 && _values$.length)) {
        return void 0;
      }
      return values[">="][0];
    };
    var getFacetsMaxDecimalPlaces = function getFacetsMaxDecimalPlaces2(facetResults) {
      var maxDecimalPlaces = 0;
      facetResults.forEach(function(facetResult) {
        var _facetResult$name$spl = facetResult.name.split("."), _facetResult$name$spl2 = _slicedToArray9(_facetResult$name$spl, 2), _facetResult$name$spl3 = _facetResult$name$spl2[1], decimal = _facetResult$name$spl3 === void 0 ? "" : _facetResult$name$spl3;
        maxDecimalPlaces = Math.max(maxDecimalPlaces, decimal.length);
      });
      return maxDecimalPlaces;
    };
    var getFacetValuesWarningMessage = function getFacetValuesWarningMessage2(_ref3) {
      var maxDecimalPlaces = _ref3.maxDecimalPlaces, maxFacets = _ref3.maxFacets, maxValuesPerFacet = _ref3.maxValuesPerFacet;
      var maxDecimalPlacesInRange = Math.max(0, Math.floor(Math.log10(MAX_VALUES_PER_FACET_API_LIMIT / max)));
      var maxFacetsInRange = Math.min(MAX_VALUES_PER_FACET_API_LIMIT, Math.pow(10, maxDecimalPlacesInRange) * max);
      var solutions = [];
      if (maxFacets > MAX_VALUES_PER_FACET_API_LIMIT) {
        solutions.push('- Update your records to lower the precision of the values in the "'.concat(attribute, '" attribute (for example: ').concat(5.123456789.toPrecision(maxDecimalPlaces + 1), " to ").concat(5.123456789.toPrecision(maxDecimalPlacesInRange + 1), ")"));
      }
      if (maxValuesPerFacet < maxFacetsInRange) {
        solutions.push("- Increase the maximum number of facet values to ".concat(maxFacetsInRange, ' using the "configure" widget ').concat(createDocumentationLink({
          name: "configure"
        }), ' and the "maxValuesPerFacet" parameter https://www.algolia.com/doc/api-reference/api-parameters/maxValuesPerFacet/'));
      }
      return "The ".concat(attribute, " attribute can have ").concat(maxFacets, " different values (0 to ").concat(max, " with a maximum of ").concat(maxDecimalPlaces, " decimals = ").concat(maxFacets, ") but you retrieved only ").concat(maxValuesPerFacet, " facet values. Therefore the number of results that match the refinements can be incorrect.\n    ").concat(solutions.length ? "To resolve this problem you can:\n".concat(solutions.join("\n")) : "");
    };
    function getRefinedState2(state, facetValue) {
      var isRefined2 = _getRefinedStar(state) === Number(facetValue);
      var emptyState = state.resetPage().removeNumericRefinement(attribute);
      if (!isRefined2) {
        return emptyState.addNumericRefinement(attribute, "<=", max).addNumericRefinement(attribute, ">=", Number(facetValue));
      }
      return emptyState;
    }
    var toggleRefinement = function toggleRefinement2(helper, facetValue) {
      sendEvent("click:internal", facetValue);
      helper.setState(getRefinedState2(helper.state, facetValue)).search();
    };
    var connectorState = {
      toggleRefinementFactory: function toggleRefinementFactory(helper) {
        return toggleRefinement.bind(null, helper);
      },
      createURLFactory: function createURLFactory(_ref4) {
        var state = _ref4.state, createURL = _ref4.createURL, getWidgetUiState = _ref4.getWidgetUiState, helper = _ref4.helper;
        return function(value) {
          return createURL(function(uiState) {
            return getWidgetUiState(uiState, {
              searchParameters: getRefinedState2(state, value),
              helper
            });
          });
        };
      }
    };
    return {
      $$type: $$type3,
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(_objectSpread28(_objectSpread28({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(_objectSpread28(_objectSpread28({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance
        }), false);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread28(_objectSpread28({}, renderState), {}, {
          ratingMenu: _objectSpread28(_objectSpread28({}, renderState.ratingMenu), {}, _defineProperty29({}, attribute, this.getWidgetRenderState(renderOptions)))
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref5) {
        var helper = _ref5.helper, results = _ref5.results, state = _ref5.state, instantSearchInstance = _ref5.instantSearchInstance, createURL = _ref5.createURL;
        var facetValues = [];
        if (!sendEvent) {
          sendEvent = createSendEvent3({
            instantSearchInstance,
            helper,
            getRefinedStar: function getRefinedStar() {
              return _getRefinedStar(helper.state);
            },
            attribute
          });
        }
        var refinementIsApplied = false;
        var totalCount = 0;
        var facetResults = results === null || results === void 0 ? void 0 : results.getFacetValues(attribute, {});
        if (results && facetResults) {
          var maxValuesPerFacet = facetResults.length;
          var maxDecimalPlaces = getFacetsMaxDecimalPlaces(facetResults);
          var maxFacets = Math.pow(10, maxDecimalPlaces) * max;
          true ? _warning(maxFacets <= maxValuesPerFacet || Boolean(results.__isArtificial), getFacetValuesWarningMessage({
            maxDecimalPlaces,
            maxFacets,
            maxValuesPerFacet
          })) : void 0;
          var refinedStar = _getRefinedStar(state);
          var _loop = function _loop2(star2) {
            var isRefined2 = refinedStar === star2;
            refinementIsApplied = refinementIsApplied || isRefined2;
            var count = facetResults.filter(function(f12) {
              return Number(f12.name) >= star2 && Number(f12.name) <= max;
            }).map(function(f12) {
              return f12.count;
            }).reduce(function(sum, current) {
              return sum + current;
            }, 0);
            totalCount += count;
            if (refinedStar && !isRefined2 && count === 0) {
              return "continue";
            }
            var stars = _toConsumableArray8(new Array(Math.floor(max / STEP))).map(function(_v, i6) {
              return i6 * STEP < star2;
            });
            facetValues.push({
              stars,
              name: String(star2),
              label: String(star2),
              value: String(star2),
              count,
              isRefined: isRefined2
            });
          };
          for (var star = STEP; star < max; star += STEP) {
            var _ret = _loop(star);
            if (_ret === "continue") continue;
          }
        }
        facetValues = facetValues.reverse();
        var hasNoResults = results ? results.nbHits === 0 : true;
        return {
          items: facetValues,
          hasNoResults,
          canRefine: (!hasNoResults || refinementIsApplied) && totalCount > 0,
          refine: connectorState.toggleRefinementFactory(helper),
          sendEvent,
          createURL: connectorState.createURLFactory({
            state,
            createURL,
            helper,
            getWidgetUiState: this.getWidgetUiState
          }),
          widgetParams
        };
      },
      dispose: function dispose(_ref6) {
        var state = _ref6.state;
        unmountFn();
        return state.removeNumericRefinement(attribute);
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref7) {
        var searchParameters = _ref7.searchParameters;
        var value = _getRefinedStar(searchParameters);
        return removeEmptyRefinementsFromUiState5(_objectSpread28(_objectSpread28({}, uiState), {}, {
          ratingMenu: _objectSpread28(_objectSpread28({}, uiState.ratingMenu), {}, _defineProperty29({}, attribute, typeof value === "number" ? value : void 0))
        }), attribute);
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref8) {
        var uiState = _ref8.uiState;
        var value = uiState.ratingMenu && uiState.ratingMenu[attribute];
        var withDisjunctiveFacet = searchParameters.addDisjunctiveFacet(attribute).removeNumericRefinement(attribute).removeDisjunctiveFacetRefinement(attribute);
        if (!value) {
          return withDisjunctiveFacet.setQueryParameters({
            numericRefinements: _objectSpread28(_objectSpread28({}, withDisjunctiveFacet.numericRefinements), {}, _defineProperty29({}, attribute, {}))
          });
        }
        return withDisjunctiveFacet.addNumericRefinement(attribute, "<=", max).addNumericRefinement(attribute, ">=", value);
      }
    };
  };
};
function removeEmptyRefinementsFromUiState5(indexUiState, attribute) {
  if (!indexUiState.ratingMenu) {
    return indexUiState;
  }
  if (typeof indexUiState.ratingMenu[attribute] !== "number") {
    delete indexUiState.ratingMenu[attribute];
  }
  if (Object.keys(indexUiState.ratingMenu).length === 0) {
    delete indexUiState.ratingMenu;
  }
  return indexUiState;
}
var connectRatingMenu_default = connectRatingMenu;

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/connectors/stats/connectStats.js
function _typeof32(o12) {
  "@babel/helpers - typeof";
  return _typeof32 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o13) {
    return typeof o13;
  } : function(o13) {
    return o13 && "function" == typeof Symbol && o13.constructor === Symbol && o13 !== Symbol.prototype ? "symbol" : typeof o13;
  }, _typeof32(o12);
}
function ownKeys29(e6, r7) {
  var t4 = Object.keys(e6);
  if (Object.getOwnPropertySymbols) {
    var o12 = Object.getOwnPropertySymbols(e6);
    r7 && (o12 = o12.filter(function(r8) {
      return Object.getOwnPropertyDescriptor(e6, r8).enumerable;
    })), t4.push.apply(t4, o12);
  }
  return t4;
}
function _objectSpread29(e6) {
  for (var r7 = 1; r7 < arguments.length; r7++) {
    var t4 = null != arguments[r7] ? arguments[r7] : {};
    r7 % 2 ? ownKeys29(Object(t4), true).forEach(function(r8) {
      _defineProperty30(e6, r8, t4[r8]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e6, Object.getOwnPropertyDescriptors(t4)) : ownKeys29(Object(t4)).forEach(function(r8) {
      Object.defineProperty(e6, r8, Object.getOwnPropertyDescriptor(t4, r8));
    });
  }
  return e6;
}
function _defineProperty30(obj, key, value) {
  key = _toPropertyKey30(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey30(t4) {
  var i6 = _toPrimitive30(t4, "string");
  return "symbol" == _typeof32(i6) ? i6 : String(i6);
}
function _toPrimitive30(t4, r7) {
  if ("object" != _typeof32(t4) || !t4) return t4;
  var e6 = t4[Symbol.toPrimitive];
  if (void 0 !== e6) {
    var i6 = e6.call(t4, r7 || "default");
    if ("object" != _typeof32(i6)) return i6;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r7 ? String : Number)(t4);
}
var withUsage20 = createDocumentationMessageGenerator({
  name: "stats",
  connector: true
});
var connectStats = function connectStats2(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage20());
  return function(widgetParams) {
    return {
      $$type: "ais.stats",
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(_objectSpread29(_objectSpread29({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(_objectSpread29(_objectSpread29({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance
        }), false);
      },
      dispose: function dispose() {
        unmountFn();
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread29(_objectSpread29({}, renderState), {}, {
          stats: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref) {
        var results = _ref.results, state = _ref.state;
        if (!results) {
          return {
            hitsPerPage: state.hitsPerPage,
            nbHits: 0,
            nbSortedHits: void 0,
            areHitsSorted: false,
            nbPages: 0,
            page: state.page || 0,
            processingTimeMS: -1,
            query: state.query || "",
            widgetParams
          };
        }
        return {
          hitsPerPage: results.hitsPerPage,
          nbHits: results.nbHits,
          nbSortedHits: results.nbSortedHits,
          areHitsSorted: typeof results.appliedRelevancyStrictness !== "undefined" && results.appliedRelevancyStrictness > 0 && results.nbSortedHits !== results.nbHits,
          nbPages: results.nbPages,
          page: results.page,
          processingTimeMS: results.processingTimeMS,
          query: results.query,
          widgetParams
        };
      }
    };
  };
};
var connectStats_default = connectStats;

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/connectors/toggle-refinement/connectToggleRefinement.js
function _typeof33(o12) {
  "@babel/helpers - typeof";
  return _typeof33 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o13) {
    return typeof o13;
  } : function(o13) {
    return o13 && "function" == typeof Symbol && o13.constructor === Symbol && o13 !== Symbol.prototype ? "symbol" : typeof o13;
  }, _typeof33(o12);
}
function ownKeys30(e6, r7) {
  var t4 = Object.keys(e6);
  if (Object.getOwnPropertySymbols) {
    var o12 = Object.getOwnPropertySymbols(e6);
    r7 && (o12 = o12.filter(function(r8) {
      return Object.getOwnPropertyDescriptor(e6, r8).enumerable;
    })), t4.push.apply(t4, o12);
  }
  return t4;
}
function _objectSpread30(e6) {
  for (var r7 = 1; r7 < arguments.length; r7++) {
    var t4 = null != arguments[r7] ? arguments[r7] : {};
    r7 % 2 ? ownKeys30(Object(t4), true).forEach(function(r8) {
      _defineProperty31(e6, r8, t4[r8]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e6, Object.getOwnPropertyDescriptors(t4)) : ownKeys30(Object(t4)).forEach(function(r8) {
      Object.defineProperty(e6, r8, Object.getOwnPropertyDescriptor(t4, r8));
    });
  }
  return e6;
}
function _defineProperty31(obj, key, value) {
  key = _toPropertyKey31(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey31(t4) {
  var i6 = _toPrimitive31(t4, "string");
  return "symbol" == _typeof33(i6) ? i6 : String(i6);
}
function _toPrimitive31(t4, r7) {
  if ("object" != _typeof33(t4) || !t4) return t4;
  var e6 = t4[Symbol.toPrimitive];
  if (void 0 !== e6) {
    var i6 = e6.call(t4, r7 || "default");
    if ("object" != _typeof33(i6)) return i6;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r7 ? String : Number)(t4);
}
function _slicedToArray10(arr, i6) {
  return _arrayWithHoles10(arr) || _iterableToArrayLimit10(arr, i6) || _unsupportedIterableToArray16(arr, i6) || _nonIterableRest10();
}
function _nonIterableRest10() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray16(o12, minLen) {
  if (!o12) return;
  if (typeof o12 === "string") return _arrayLikeToArray16(o12, minLen);
  var n6 = Object.prototype.toString.call(o12).slice(8, -1);
  if (n6 === "Object" && o12.constructor) n6 = o12.constructor.name;
  if (n6 === "Map" || n6 === "Set") return Array.from(o12);
  if (n6 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n6)) return _arrayLikeToArray16(o12, minLen);
}
function _arrayLikeToArray16(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i6 = 0, arr2 = new Array(len); i6 < len; i6++) arr2[i6] = arr[i6];
  return arr2;
}
function _iterableToArrayLimit10(r7, l4) {
  var t4 = null == r7 ? null : "undefined" != typeof Symbol && r7[Symbol.iterator] || r7["@@iterator"];
  if (null != t4) {
    var e6, n6, i6, u5, a6 = [], f12 = true, o12 = false;
    try {
      if (i6 = (t4 = t4.call(r7)).next, 0 === l4) {
        if (Object(t4) !== t4) return;
        f12 = false;
      } else for (; !(f12 = (e6 = i6.call(t4)).done) && (a6.push(e6.value), a6.length !== l4); f12 = true) ;
    } catch (r8) {
      o12 = true, n6 = r8;
    } finally {
      try {
        if (!f12 && null != t4.return && (u5 = t4.return(), Object(u5) !== u5)) return;
      } finally {
        if (o12) throw n6;
      }
    }
    return a6;
  }
}
function _arrayWithHoles10(arr) {
  if (Array.isArray(arr)) return arr;
}
var withUsage21 = createDocumentationMessageGenerator({
  name: "toggle-refinement",
  connector: true
});
var $$type4 = "ais.toggleRefinement";
var createSendEvent5 = function createSendEvent6(_ref) {
  var instantSearchInstance = _ref.instantSearchInstance, helper = _ref.helper, attribute = _ref.attribute, on = _ref.on;
  var sendEventForToggle = function sendEventForToggle2() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    if (args.length === 1) {
      instantSearchInstance.sendEventToInsights(args[0]);
      return;
    }
    var isRefined2 = args[1], _args$ = args[2], eventName = _args$ === void 0 ? "Filter Applied" : _args$;
    var _args$0$split = args[0].split(":"), _args$0$split2 = _slicedToArray10(_args$0$split, 2), eventType = _args$0$split2[0], eventModifier = _args$0$split2[1];
    if (eventType !== "click" || on === void 0) {
      return;
    }
    if (!isRefined2) {
      instantSearchInstance.sendEventToInsights({
        insightsMethod: "clickedFilters",
        widgetType: $$type4,
        eventType,
        eventModifier,
        payload: {
          eventName,
          index: helper.getIndex(),
          filters: on.map(function(value) {
            return "".concat(attribute, ":").concat(value);
          })
        },
        attribute
      });
    }
  };
  return sendEventForToggle;
};
var connectToggleRefinement = function connectToggleRefinement2(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage21());
  return function(widgetParams) {
    var _ref2 = widgetParams || {}, attribute = _ref2.attribute, _ref2$on = _ref2.on, userOn = _ref2$on === void 0 ? true : _ref2$on, userOff = _ref2.off;
    if (!attribute) {
      throw new Error(withUsage21("The `attribute` option is required."));
    }
    var hasAnOffValue = userOff !== void 0;
    var on = toArray(userOn).map(escapeFacetValue);
    var off = hasAnOffValue ? toArray(userOff).map(escapeFacetValue) : void 0;
    var sendEvent;
    var toggleRefinementFactory = function toggleRefinementFactory2(helper) {
      return function() {
        var _ref3 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {
          isRefined: false
        }, isRefined2 = _ref3.isRefined;
        if (!isRefined2) {
          sendEvent("click:internal", isRefined2);
          if (hasAnOffValue) {
            off.forEach(function(v6) {
              return helper.removeDisjunctiveFacetRefinement(attribute, v6);
            });
          }
          on.forEach(function(v6) {
            return helper.addDisjunctiveFacetRefinement(attribute, v6);
          });
        } else {
          on.forEach(function(v6) {
            return helper.removeDisjunctiveFacetRefinement(attribute, v6);
          });
          if (hasAnOffValue) {
            off.forEach(function(v6) {
              return helper.addDisjunctiveFacetRefinement(attribute, v6);
            });
          }
        }
        helper.search();
      };
    };
    var connectorState = {
      createURLFactory: function createURLFactory(isRefined2, _ref4) {
        var state = _ref4.state, createURL = _ref4.createURL, getWidgetUiState = _ref4.getWidgetUiState, helper = _ref4.helper;
        return function() {
          state = state.resetPage();
          var valuesToRemove = isRefined2 ? on : off;
          if (valuesToRemove) {
            valuesToRemove.forEach(function(v6) {
              state = state.removeDisjunctiveFacetRefinement(attribute, v6);
            });
          }
          var valuesToAdd = isRefined2 ? off : on;
          if (valuesToAdd) {
            valuesToAdd.forEach(function(v6) {
              state = state.addDisjunctiveFacetRefinement(attribute, v6);
            });
          }
          return createURL(function(uiState) {
            return getWidgetUiState(uiState, {
              searchParameters: state,
              helper
            });
          });
        };
      }
    };
    return {
      $$type: $$type4,
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(_objectSpread30(_objectSpread30({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(_objectSpread30(_objectSpread30({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance
        }), false);
      },
      dispose: function dispose(_ref5) {
        var state = _ref5.state;
        unmountFn();
        return state.removeDisjunctiveFacet(attribute);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread30(_objectSpread30({}, renderState), {}, {
          toggleRefinement: _objectSpread30(_objectSpread30({}, renderState.toggleRefinement), {}, _defineProperty31({}, attribute, this.getWidgetRenderState(renderOptions)))
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref6) {
        var state = _ref6.state, helper = _ref6.helper, results = _ref6.results, createURL = _ref6.createURL, instantSearchInstance = _ref6.instantSearchInstance;
        var isRefined2 = results ? on.every(function(v6) {
          return state.isDisjunctiveFacetRefined(attribute, v6);
        }) : on.every(function(v6) {
          return state.isDisjunctiveFacetRefined(attribute, v6);
        });
        var onFacetValue = {
          isRefined: isRefined2,
          count: 0
        };
        var offFacetValue = {
          isRefined: hasAnOffValue && !isRefined2,
          count: 0
        };
        if (results) {
          var offValue = toArray(off || false);
          var allFacetValues = results.getFacetValues(attribute, {}) || [];
          var onData = on.map(function(v6) {
            return find(allFacetValues, function(_ref7) {
              var escapedValue = _ref7.escapedValue;
              return escapedValue === escapeFacetValue(String(v6));
            });
          }).filter(function(v6) {
            return v6 !== void 0;
          });
          var offData = hasAnOffValue ? offValue.map(function(v6) {
            return find(allFacetValues, function(_ref8) {
              var escapedValue = _ref8.escapedValue;
              return escapedValue === escapeFacetValue(String(v6));
            });
          }).filter(function(v6) {
            return v6 !== void 0;
          }) : [];
          onFacetValue = {
            isRefined: onData.length ? onData.every(function(v6) {
              return v6.isRefined;
            }) : false,
            count: onData.reduce(function(acc, v6) {
              return acc + v6.count;
            }, 0) || null
          };
          offFacetValue = {
            isRefined: offData.length ? offData.every(function(v6) {
              return v6.isRefined;
            }) : false,
            count: offData.reduce(function(acc, v6) {
              return acc + v6.count;
            }, 0) || allFacetValues.reduce(function(total, _ref9) {
              var count = _ref9.count;
              return total + count;
            }, 0)
          };
        }
        if (!sendEvent) {
          sendEvent = createSendEvent5({
            instantSearchInstance,
            attribute,
            on,
            helper
          });
        }
        var nextRefinement = isRefined2 ? offFacetValue : onFacetValue;
        return {
          value: {
            name: attribute,
            isRefined: isRefined2,
            count: results ? nextRefinement.count : null,
            onFacetValue,
            offFacetValue
          },
          createURL: connectorState.createURLFactory(isRefined2, {
            state,
            createURL,
            helper,
            getWidgetUiState: this.getWidgetUiState
          }),
          sendEvent,
          canRefine: Boolean(results ? nextRefinement.count : null),
          refine: toggleRefinementFactory(helper),
          widgetParams
        };
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref10) {
        var searchParameters = _ref10.searchParameters;
        var isRefined2 = on && on.every(function(v6) {
          return searchParameters.isDisjunctiveFacetRefined(attribute, v6);
        });
        if (!isRefined2) {
          var _uiState$toggle;
          (_uiState$toggle = uiState.toggle) === null || _uiState$toggle === void 0 ? true : delete _uiState$toggle[attribute];
          return uiState;
        }
        return _objectSpread30(_objectSpread30({}, uiState), {}, {
          toggle: _objectSpread30(_objectSpread30({}, uiState.toggle), {}, _defineProperty31({}, attribute, isRefined2))
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref11) {
        var uiState = _ref11.uiState;
        if (searchParameters.isHierarchicalFacet(attribute) || searchParameters.isConjunctiveFacet(attribute)) {
          true ? _warning(false, 'ToggleRefinement: Attribute "'.concat(attribute, '" is already used by another widget of a different type.\nAs this is not supported, please make sure to remove this other widget or this ToggleRefinement widget will not work at all.')) : void 0;
          return searchParameters;
        }
        var withFacetConfiguration = searchParameters.addDisjunctiveFacet(attribute).removeDisjunctiveFacetRefinement(attribute);
        var isRefined2 = Boolean(uiState.toggle && uiState.toggle[attribute]);
        if (isRefined2) {
          if (on) {
            on.forEach(function(v6) {
              withFacetConfiguration = withFacetConfiguration.addDisjunctiveFacetRefinement(attribute, v6);
            });
          }
          return withFacetConfiguration;
        }
        if (hasAnOffValue) {
          if (off) {
            off.forEach(function(v6) {
              withFacetConfiguration = withFacetConfiguration.addDisjunctiveFacetRefinement(attribute, v6);
            });
          }
          return withFacetConfiguration;
        }
        return withFacetConfiguration.setQueryParameters({
          disjunctiveFacetsRefinements: _objectSpread30(_objectSpread30({}, searchParameters.disjunctiveFacetsRefinements), {}, _defineProperty31({}, attribute, []))
        });
      }
    };
  };
};
var connectToggleRefinement_default = connectToggleRefinement;

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/connectors/trending-items/connectTrendingItems.js
var withUsage22 = createDocumentationMessageGenerator({
  name: "trending-items",
  connector: true
});

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/connectors/breadcrumb/connectBreadcrumb.js
function _typeof34(o12) {
  "@babel/helpers - typeof";
  return _typeof34 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o13) {
    return typeof o13;
  } : function(o13) {
    return o13 && "function" == typeof Symbol && o13.constructor === Symbol && o13 !== Symbol.prototype ? "symbol" : typeof o13;
  }, _typeof34(o12);
}
function ownKeys31(e6, r7) {
  var t4 = Object.keys(e6);
  if (Object.getOwnPropertySymbols) {
    var o12 = Object.getOwnPropertySymbols(e6);
    r7 && (o12 = o12.filter(function(r8) {
      return Object.getOwnPropertyDescriptor(e6, r8).enumerable;
    })), t4.push.apply(t4, o12);
  }
  return t4;
}
function _objectSpread31(e6) {
  for (var r7 = 1; r7 < arguments.length; r7++) {
    var t4 = null != arguments[r7] ? arguments[r7] : {};
    r7 % 2 ? ownKeys31(Object(t4), true).forEach(function(r8) {
      _defineProperty32(e6, r8, t4[r8]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e6, Object.getOwnPropertyDescriptors(t4)) : ownKeys31(Object(t4)).forEach(function(r8) {
      Object.defineProperty(e6, r8, Object.getOwnPropertyDescriptor(t4, r8));
    });
  }
  return e6;
}
function _defineProperty32(obj, key, value) {
  key = _toPropertyKey32(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey32(t4) {
  var i6 = _toPrimitive32(t4, "string");
  return "symbol" == _typeof34(i6) ? i6 : String(i6);
}
function _toPrimitive32(t4, r7) {
  if ("object" != _typeof34(t4) || !t4) return t4;
  var e6 = t4[Symbol.toPrimitive];
  if (void 0 !== e6) {
    var i6 = e6.call(t4, r7 || "default");
    if ("object" != _typeof34(i6)) return i6;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r7 ? String : Number)(t4);
}
function _slicedToArray11(arr, i6) {
  return _arrayWithHoles11(arr) || _iterableToArrayLimit11(arr, i6) || _unsupportedIterableToArray17(arr, i6) || _nonIterableRest11();
}
function _nonIterableRest11() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray17(o12, minLen) {
  if (!o12) return;
  if (typeof o12 === "string") return _arrayLikeToArray17(o12, minLen);
  var n6 = Object.prototype.toString.call(o12).slice(8, -1);
  if (n6 === "Object" && o12.constructor) n6 = o12.constructor.name;
  if (n6 === "Map" || n6 === "Set") return Array.from(o12);
  if (n6 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n6)) return _arrayLikeToArray17(o12, minLen);
}
function _arrayLikeToArray17(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i6 = 0, arr2 = new Array(len); i6 < len; i6++) arr2[i6] = arr[i6];
  return arr2;
}
function _iterableToArrayLimit11(r7, l4) {
  var t4 = null == r7 ? null : "undefined" != typeof Symbol && r7[Symbol.iterator] || r7["@@iterator"];
  if (null != t4) {
    var e6, n6, i6, u5, a6 = [], f12 = true, o12 = false;
    try {
      if (i6 = (t4 = t4.call(r7)).next, 0 === l4) {
        if (Object(t4) !== t4) return;
        f12 = false;
      } else for (; !(f12 = (e6 = i6.call(t4)).done) && (a6.push(e6.value), a6.length !== l4); f12 = true) ;
    } catch (r8) {
      o12 = true, n6 = r8;
    } finally {
      try {
        if (!f12 && null != t4.return && (u5 = t4.return(), Object(u5) !== u5)) return;
      } finally {
        if (o12) throw n6;
      }
    }
    return a6;
  }
}
function _arrayWithHoles11(arr) {
  if (Array.isArray(arr)) return arr;
}
var withUsage23 = createDocumentationMessageGenerator({
  name: "breadcrumb",
  connector: true
});
var connectBreadcrumb = function connectBreadcrumb2(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage23());
  var connectorState = {};
  return function(widgetParams) {
    var _ref = widgetParams || {}, attributes = _ref.attributes, _ref$separator = _ref.separator, separator = _ref$separator === void 0 ? " > " : _ref$separator, _ref$rootPath = _ref.rootPath, rootPath = _ref$rootPath === void 0 ? null : _ref$rootPath, _ref$transformItems = _ref.transformItems, transformItems = _ref$transformItems === void 0 ? function(items) {
      return items;
    } : _ref$transformItems;
    if (!attributes || !Array.isArray(attributes) || attributes.length === 0) {
      throw new Error(withUsage23("The `attributes` option expects an array of strings."));
    }
    var _attributes = _slicedToArray11(attributes, 1), hierarchicalFacetName = _attributes[0];
    function getRefinedState2(state, facetValue) {
      if (!facetValue) {
        var breadcrumb = state.getHierarchicalFacetBreadcrumb(hierarchicalFacetName);
        if (breadcrumb.length === 0) {
          return state;
        } else {
          return state.resetPage().toggleFacetRefinement(hierarchicalFacetName, breadcrumb[0]);
        }
      }
      return state.resetPage().toggleFacetRefinement(hierarchicalFacetName, facetValue);
    }
    return {
      $$type: "ais.breadcrumb",
      init: function init(initOptions) {
        renderFn(_objectSpread31(_objectSpread31({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: initOptions.instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        renderFn(_objectSpread31(_objectSpread31({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance: renderOptions.instantSearchInstance
        }), false);
      },
      dispose: function dispose() {
        unmountFn();
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread31(_objectSpread31({}, renderState), {}, {
          breadcrumb: _objectSpread31(_objectSpread31({}, renderState.breadcrumb), {}, _defineProperty32({}, hierarchicalFacetName, this.getWidgetRenderState(renderOptions)))
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref2) {
        var _this = this;
        var helper = _ref2.helper, createURL = _ref2.createURL, results = _ref2.results, state = _ref2.state;
        function getItems() {
          if (!results || state.hierarchicalFacets.length === 0) {
            return [];
          }
          var _state$hierarchicalFa = _slicedToArray11(state.hierarchicalFacets, 1), facetName = _state$hierarchicalFa[0].name;
          var facetValues = results.getFacetValues(facetName, {});
          var facetItems = facetValues && !Array.isArray(facetValues) && facetValues.data ? facetValues.data : [];
          var items2 = transformItems(shiftItemsValues(prepareItems(facetItems)), {
            results
          });
          return items2;
        }
        var items = getItems();
        if (!connectorState.createURL) {
          connectorState.createURL = function(facetValue) {
            return createURL(function(uiState) {
              return _this.getWidgetUiState(uiState, {
                searchParameters: getRefinedState2(helper.state, facetValue),
                helper
              });
            });
          };
        }
        if (!connectorState.refine) {
          connectorState.refine = function(facetValue) {
            helper.setState(getRefinedState2(helper.state, facetValue)).search();
          };
        }
        return {
          canRefine: items.length > 0,
          createURL: connectorState.createURL,
          items,
          refine: connectorState.refine,
          widgetParams
        };
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref3) {
        var searchParameters = _ref3.searchParameters;
        var path = searchParameters.getHierarchicalFacetBreadcrumb(hierarchicalFacetName);
        return removeEmptyRefinementsFromUiState6(_objectSpread31(_objectSpread31({}, uiState), {}, {
          hierarchicalMenu: _objectSpread31(_objectSpread31({}, uiState.hierarchicalMenu), {}, _defineProperty32({}, hierarchicalFacetName, path))
        }), hierarchicalFacetName);
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref4) {
        var uiState = _ref4.uiState;
        var values = uiState.hierarchicalMenu && uiState.hierarchicalMenu[hierarchicalFacetName];
        if (searchParameters.isConjunctiveFacet(hierarchicalFacetName) || searchParameters.isDisjunctiveFacet(hierarchicalFacetName)) {
          true ? _warning(false, 'HierarchicalMenu: Attribute "'.concat(hierarchicalFacetName, '" is already used by another widget applying conjunctive or disjunctive faceting.\nAs this is not supported, please make sure to remove this other widget or this HierarchicalMenu widget will not work at all.')) : void 0;
          return searchParameters;
        }
        if (searchParameters.isHierarchicalFacet(hierarchicalFacetName)) {
          var facet = searchParameters.getHierarchicalFacetByName(hierarchicalFacetName);
          true ? _warning(isEqual(facet.attributes, attributes) && facet.separator === separator && facet.rootPath === rootPath, "Using Breadcrumb and HierarchicalMenu on the same facet with different options overrides the configuration of the HierarchicalMenu.") : void 0;
        }
        var withFacetConfiguration = searchParameters.removeHierarchicalFacet(hierarchicalFacetName).addHierarchicalFacet({
          name: hierarchicalFacetName,
          attributes,
          separator,
          rootPath
        });
        if (!values) {
          return withFacetConfiguration.setQueryParameters({
            hierarchicalFacetsRefinements: _objectSpread31(_objectSpread31({}, withFacetConfiguration.hierarchicalFacetsRefinements), {}, _defineProperty32({}, hierarchicalFacetName, []))
          });
        }
        return withFacetConfiguration.addHierarchicalFacetRefinement(hierarchicalFacetName, values.join(separator));
      }
    };
  };
};
function prepareItems(data) {
  return data.reduce(function(result, currentItem) {
    if (currentItem.isRefined) {
      result.push({
        label: currentItem.name,
        value: currentItem.escapedValue
      });
      if (Array.isArray(currentItem.data)) {
        result = result.concat(prepareItems(currentItem.data));
      }
    }
    return result;
  }, []);
}
function shiftItemsValues(array) {
  return array.map(function(x3, idx) {
    return {
      label: x3.label,
      value: idx + 1 === array.length ? null : array[idx + 1].value
    };
  });
}
function removeEmptyRefinementsFromUiState6(indexUiState, attribute) {
  if (!indexUiState.hierarchicalMenu) {
    return indexUiState;
  }
  if (!indexUiState.hierarchicalMenu[attribute] || !indexUiState.hierarchicalMenu[attribute].length) {
    delete indexUiState.hierarchicalMenu[attribute];
  }
  if (Object.keys(indexUiState.hierarchicalMenu).length === 0) {
    delete indexUiState.hierarchicalMenu;
  }
  return indexUiState;
}
var connectBreadcrumb_default = connectBreadcrumb;

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/connectors/geo-search/connectGeoSearch.js
var withUsage24 = createDocumentationMessageGenerator({
  name: "geo-search",
  connector: true
});

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/connectors/powered-by/connectPoweredBy.js
var withUsage25 = createDocumentationMessageGenerator({
  name: "powered-by",
  connector: true
});

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/connectors/autocomplete/connectAutocomplete.js
function _typeof35(o12) {
  "@babel/helpers - typeof";
  return _typeof35 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o13) {
    return typeof o13;
  } : function(o13) {
    return o13 && "function" == typeof Symbol && o13.constructor === Symbol && o13 !== Symbol.prototype ? "symbol" : typeof o13;
  }, _typeof35(o12);
}
function ownKeys32(e6, r7) {
  var t4 = Object.keys(e6);
  if (Object.getOwnPropertySymbols) {
    var o12 = Object.getOwnPropertySymbols(e6);
    r7 && (o12 = o12.filter(function(r8) {
      return Object.getOwnPropertyDescriptor(e6, r8).enumerable;
    })), t4.push.apply(t4, o12);
  }
  return t4;
}
function _objectSpread32(e6) {
  for (var r7 = 1; r7 < arguments.length; r7++) {
    var t4 = null != arguments[r7] ? arguments[r7] : {};
    r7 % 2 ? ownKeys32(Object(t4), true).forEach(function(r8) {
      _defineProperty33(e6, r8, t4[r8]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e6, Object.getOwnPropertyDescriptors(t4)) : ownKeys32(Object(t4)).forEach(function(r8) {
      Object.defineProperty(e6, r8, Object.getOwnPropertyDescriptor(t4, r8));
    });
  }
  return e6;
}
function _defineProperty33(obj, key, value) {
  key = _toPropertyKey33(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey33(t4) {
  var i6 = _toPrimitive33(t4, "string");
  return "symbol" == _typeof35(i6) ? i6 : String(i6);
}
function _toPrimitive33(t4, r7) {
  if ("object" != _typeof35(t4) || !t4) return t4;
  var e6 = t4[Symbol.toPrimitive];
  if (void 0 !== e6) {
    var i6 = e6.call(t4, r7 || "default");
    if ("object" != _typeof35(i6)) return i6;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r7 ? String : Number)(t4);
}
var withUsage26 = createDocumentationMessageGenerator({
  name: "autocomplete",
  connector: true
});
var connectAutocomplete = function connectAutocomplete2(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage26());
  return function(widgetParams) {
    var _ref = widgetParams || {}, _ref$escapeHTML = _ref.escapeHTML, escapeHTML = _ref$escapeHTML === void 0 ? true : _ref$escapeHTML;
    true ? _warning(!widgetParams.indices, "\nThe option `indices` has been removed from the Autocomplete connector.\n\nThe indices to target are now inferred from the widgets tree.\n".concat(Array.isArray(widgetParams.indices) ? "\nAn alternative would be:\n\nconst autocomplete = connectAutocomplete(renderer);\n\nsearch.addWidgets([\n  ".concat(widgetParams.indices.map(function(_ref2) {
      var value = _ref2.value;
      return "index({ indexName: '".concat(value, "' }),");
    }).join("\n  "), "\n  autocomplete()\n]);\n") : "", "\n      ")) : void 0;
    var connectorState = {};
    return {
      $$type: "ais.autocomplete",
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(_objectSpread32(_objectSpread32({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        var renderState = this.getWidgetRenderState(renderOptions);
        renderState.indices.forEach(function(_ref3) {
          var sendEvent = _ref3.sendEvent, hits = _ref3.hits;
          sendEvent("view:internal", hits);
        });
        renderFn(_objectSpread32(_objectSpread32({}, renderState), {}, {
          instantSearchInstance
        }), false);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread32(_objectSpread32({}, renderState), {}, {
          autocomplete: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref4) {
        var _this = this;
        var helper = _ref4.helper, state = _ref4.state, scopedResults = _ref4.scopedResults, instantSearchInstance = _ref4.instantSearchInstance;
        if (!connectorState.refine) {
          connectorState.refine = function(query) {
            helper.setQuery(query).search();
          };
        }
        var indices = scopedResults.map(function(scopedResult) {
          var _scopedResult$results2, _scopedResult$results3;
          if (scopedResult.results) {
            scopedResult.results.hits = escapeHTML ? escapeHits(scopedResult.results.hits) : scopedResult.results.hits;
          }
          var sendEvent = createSendEventForHits({
            instantSearchInstance,
            getIndex: function getIndex() {
              var _scopedResult$results;
              return ((_scopedResult$results = scopedResult.results) === null || _scopedResult$results === void 0 ? void 0 : _scopedResult$results.index) || "";
            },
            widgetType: _this.$$type
          });
          return {
            indexId: scopedResult.indexId,
            indexName: ((_scopedResult$results2 = scopedResult.results) === null || _scopedResult$results2 === void 0 ? void 0 : _scopedResult$results2.index) || "",
            hits: ((_scopedResult$results3 = scopedResult.results) === null || _scopedResult$results3 === void 0 ? void 0 : _scopedResult$results3.hits) || [],
            results: scopedResult.results || {},
            sendEvent
          };
        });
        return {
          currentRefinement: state.query || "",
          indices,
          refine: connectorState.refine,
          widgetParams
        };
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref5) {
        var searchParameters = _ref5.searchParameters;
        var query = searchParameters.query || "";
        if (query === "" || uiState && uiState.query === query) {
          return uiState;
        }
        return _objectSpread32(_objectSpread32({}, uiState), {}, {
          query
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref6) {
        var uiState = _ref6.uiState;
        var parameters = {
          query: uiState.query || ""
        };
        if (!escapeHTML) {
          return searchParameters.setQueryParameters(parameters);
        }
        return searchParameters.setQueryParameters(_objectSpread32(_objectSpread32({}, parameters), TAG_PLACEHOLDER));
      },
      dispose: function dispose(_ref7) {
        var state = _ref7.state;
        unmountFn();
        var stateWithoutQuery = state.setQueryParameter("query", void 0);
        if (!escapeHTML) {
          return stateWithoutQuery;
        }
        return stateWithoutQuery.setQueryParameters(Object.keys(TAG_PLACEHOLDER).reduce(function(acc, key) {
          return _objectSpread32(_objectSpread32({}, acc), {}, _defineProperty33({}, key, void 0));
        }, {}));
      }
    };
  };
};
var connectAutocomplete_default = connectAutocomplete;

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/connectors/query-rules/connectQueryRules.js
function _typeof36(o12) {
  "@babel/helpers - typeof";
  return _typeof36 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o13) {
    return typeof o13;
  } : function(o13) {
    return o13 && "function" == typeof Symbol && o13.constructor === Symbol && o13 !== Symbol.prototype ? "symbol" : typeof o13;
  }, _typeof36(o12);
}
function ownKeys33(e6, r7) {
  var t4 = Object.keys(e6);
  if (Object.getOwnPropertySymbols) {
    var o12 = Object.getOwnPropertySymbols(e6);
    r7 && (o12 = o12.filter(function(r8) {
      return Object.getOwnPropertyDescriptor(e6, r8).enumerable;
    })), t4.push.apply(t4, o12);
  }
  return t4;
}
function _objectSpread33(e6) {
  for (var r7 = 1; r7 < arguments.length; r7++) {
    var t4 = null != arguments[r7] ? arguments[r7] : {};
    r7 % 2 ? ownKeys33(Object(t4), true).forEach(function(r8) {
      _defineProperty34(e6, r8, t4[r8]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e6, Object.getOwnPropertyDescriptors(t4)) : ownKeys33(Object(t4)).forEach(function(r8) {
      Object.defineProperty(e6, r8, Object.getOwnPropertyDescriptor(t4, r8));
    });
  }
  return e6;
}
function _defineProperty34(obj, key, value) {
  key = _toPropertyKey34(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey34(t4) {
  var i6 = _toPrimitive34(t4, "string");
  return "symbol" == _typeof36(i6) ? i6 : String(i6);
}
function _toPrimitive34(t4, r7) {
  if ("object" != _typeof36(t4) || !t4) return t4;
  var e6 = t4[Symbol.toPrimitive];
  if (void 0 !== e6) {
    var i6 = e6.call(t4, r7 || "default");
    if ("object" != _typeof36(i6)) return i6;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r7 ? String : Number)(t4);
}
function _toConsumableArray9(arr) {
  return _arrayWithoutHoles9(arr) || _iterableToArray9(arr) || _unsupportedIterableToArray18(arr) || _nonIterableSpread9();
}
function _nonIterableSpread9() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray18(o12, minLen) {
  if (!o12) return;
  if (typeof o12 === "string") return _arrayLikeToArray18(o12, minLen);
  var n6 = Object.prototype.toString.call(o12).slice(8, -1);
  if (n6 === "Object" && o12.constructor) n6 = o12.constructor.name;
  if (n6 === "Map" || n6 === "Set") return Array.from(o12);
  if (n6 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n6)) return _arrayLikeToArray18(o12, minLen);
}
function _iterableToArray9(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles9(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray18(arr);
}
function _arrayLikeToArray18(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i6 = 0, arr2 = new Array(len); i6 < len; i6++) arr2[i6] = arr[i6];
  return arr2;
}
var withUsage27 = createDocumentationMessageGenerator({
  name: "query-rules",
  connector: true
});
function hasStateRefinements(state) {
  return [state.disjunctiveFacetsRefinements, state.facetsRefinements, state.hierarchicalFacetsRefinements, state.numericRefinements].some(function(refinement) {
    return Boolean(refinement && Object.keys(refinement).length > 0);
  });
}
function escapeRuleContext(ruleName) {
  return ruleName.replace(/[^a-z0-9-_]+/gi, "_");
}
function getRuleContextsFromTrackedFilters(_ref) {
  var helper = _ref.helper, sharedHelperState = _ref.sharedHelperState, trackedFilters = _ref.trackedFilters;
  var ruleContexts = Object.keys(trackedFilters).reduce(function(facets, facetName) {
    var facetRefinements = getRefinements(helper.lastResults || {}, sharedHelperState, true).filter(function(refinement) {
      return refinement.attribute === facetName;
    }).map(function(refinement) {
      return refinement.numericValue || refinement.name;
    });
    var getTrackedFacetValues = trackedFilters[facetName];
    var trackedFacetValues = getTrackedFacetValues(facetRefinements);
    return [].concat(_toConsumableArray9(facets), _toConsumableArray9(facetRefinements.filter(function(facetRefinement) {
      return trackedFacetValues.includes(facetRefinement);
    }).map(function(facetValue) {
      return escapeRuleContext("ais-".concat(facetName, "-").concat(facetValue));
    })));
  }, []);
  return ruleContexts;
}
function applyRuleContexts(event) {
  var helper = this.helper, initialRuleContexts = this.initialRuleContexts, trackedFilters = this.trackedFilters, transformRuleContexts = this.transformRuleContexts;
  var sharedHelperState = event.state;
  var previousRuleContexts = sharedHelperState.ruleContexts || [];
  var newRuleContexts = getRuleContextsFromTrackedFilters({
    helper,
    sharedHelperState,
    trackedFilters
  });
  var nextRuleContexts = [].concat(_toConsumableArray9(initialRuleContexts), _toConsumableArray9(newRuleContexts));
  true ? _warning(nextRuleContexts.length <= 10, "\nThe maximum number of `ruleContexts` is 10. They have been sliced to that limit.\nConsider using `transformRuleContexts` to minimize the number of rules sent to Algolia.\n") : void 0;
  var ruleContexts = transformRuleContexts(nextRuleContexts).slice(0, 10);
  if (!isEqual(previousRuleContexts, ruleContexts)) {
    helper.overrideStateWithoutTriggeringChangeEvent(_objectSpread33(_objectSpread33({}, sharedHelperState), {}, {
      ruleContexts
    }));
  }
}
var connectQueryRules = function connectQueryRules2(_render) {
  var unmount = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(_render, withUsage27());
  return function(widgetParams) {
    var _ref2 = widgetParams || {}, _ref2$trackedFilters = _ref2.trackedFilters, trackedFilters = _ref2$trackedFilters === void 0 ? {} : _ref2$trackedFilters, _ref2$transformRuleCo = _ref2.transformRuleContexts, transformRuleContexts = _ref2$transformRuleCo === void 0 ? function(rules) {
      return rules;
    } : _ref2$transformRuleCo, _ref2$transformItems = _ref2.transformItems, transformItems = _ref2$transformItems === void 0 ? function(items) {
      return items;
    } : _ref2$transformItems;
    Object.keys(trackedFilters).forEach(function(facetName) {
      if (typeof trackedFilters[facetName] !== "function") {
        throw new Error(withUsage27(`'The "`.concat(facetName, '" filter value in the `trackedFilters` option expects a function.')));
      }
    });
    var hasTrackedFilters = Object.keys(trackedFilters).length > 0;
    var initialRuleContexts = [];
    var onHelperChange;
    return {
      $$type: "ais.queryRules",
      init: function init(initOptions) {
        var helper = initOptions.helper, state = initOptions.state, instantSearchInstance = initOptions.instantSearchInstance;
        initialRuleContexts = state.ruleContexts || [];
        onHelperChange = applyRuleContexts.bind({
          helper,
          initialRuleContexts,
          trackedFilters,
          transformRuleContexts
        });
        if (hasTrackedFilters) {
          if (hasStateRefinements(state) || Boolean(widgetParams.transformRuleContexts)) {
            onHelperChange({
              state
            });
          }
          helper.on("change", onHelperChange);
        }
        _render(_objectSpread33(_objectSpread33({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        _render(_objectSpread33(_objectSpread33({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance
        }), false);
      },
      getWidgetRenderState: function getWidgetRenderState(_ref3) {
        var results = _ref3.results;
        var _ref4 = results || {}, _ref4$userData = _ref4.userData, userData = _ref4$userData === void 0 ? [] : _ref4$userData;
        var items = transformItems(userData, {
          results
        });
        return {
          items,
          widgetParams
        };
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread33(_objectSpread33({}, renderState), {}, {
          queryRules: this.getWidgetRenderState(renderOptions)
        });
      },
      dispose: function dispose(_ref5) {
        var helper = _ref5.helper, state = _ref5.state;
        unmount();
        if (hasTrackedFilters) {
          helper.removeListener("change", onHelperChange);
          return state.setQueryParameter("ruleContexts", initialRuleContexts);
        }
        return state;
      }
    };
  };
};
var connectQueryRules_default = connectQueryRules;

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/lib/voiceSearchHelper/index.js
function _typeof37(o12) {
  "@babel/helpers - typeof";
  return _typeof37 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o13) {
    return typeof o13;
  } : function(o13) {
    return o13 && "function" == typeof Symbol && o13.constructor === Symbol && o13 !== Symbol.prototype ? "symbol" : typeof o13;
  }, _typeof37(o12);
}
function ownKeys34(e6, r7) {
  var t4 = Object.keys(e6);
  if (Object.getOwnPropertySymbols) {
    var o12 = Object.getOwnPropertySymbols(e6);
    r7 && (o12 = o12.filter(function(r8) {
      return Object.getOwnPropertyDescriptor(e6, r8).enumerable;
    })), t4.push.apply(t4, o12);
  }
  return t4;
}
function _objectSpread34(e6) {
  for (var r7 = 1; r7 < arguments.length; r7++) {
    var t4 = null != arguments[r7] ? arguments[r7] : {};
    r7 % 2 ? ownKeys34(Object(t4), true).forEach(function(r8) {
      _defineProperty35(e6, r8, t4[r8]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e6, Object.getOwnPropertyDescriptors(t4)) : ownKeys34(Object(t4)).forEach(function(r8) {
      Object.defineProperty(e6, r8, Object.getOwnPropertyDescriptor(t4, r8));
    });
  }
  return e6;
}
function _defineProperty35(obj, key, value) {
  key = _toPropertyKey35(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey35(t4) {
  var i6 = _toPrimitive35(t4, "string");
  return "symbol" == _typeof37(i6) ? i6 : String(i6);
}
function _toPrimitive35(t4, r7) {
  if ("object" != _typeof37(t4) || !t4) return t4;
  var e6 = t4[Symbol.toPrimitive];
  if (void 0 !== e6) {
    var i6 = e6.call(t4, r7 || "default");
    if ("object" != _typeof37(i6)) return i6;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r7 ? String : Number)(t4);
}
var createVoiceSearchHelper = function createVoiceSearchHelper2(_ref) {
  var searchAsYouSpeak = _ref.searchAsYouSpeak, language = _ref.language, onQueryChange = _ref.onQueryChange, onStateChange = _ref.onStateChange;
  var SpeechRecognitionAPI = window.webkitSpeechRecognition || window.SpeechRecognition;
  var getDefaultState = function getDefaultState2(status) {
    return {
      status,
      transcript: "",
      isSpeechFinal: false,
      errorCode: void 0
    };
  };
  var state = getDefaultState("initial");
  var recognition;
  var isBrowserSupported = function isBrowserSupported2() {
    return Boolean(SpeechRecognitionAPI);
  };
  var isListening = function isListening2() {
    return state.status === "askingPermission" || state.status === "waiting" || state.status === "recognizing";
  };
  var setState = function setState2() {
    var newState = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    state = _objectSpread34(_objectSpread34({}, state), newState);
    onStateChange();
  };
  var getState = function getState2() {
    return state;
  };
  var resetState = function resetState2() {
    var status = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "initial";
    setState(getDefaultState(status));
  };
  var onStart = function onStart2() {
    setState({
      status: "waiting"
    });
  };
  var onError = function onError2(event) {
    setState({
      status: "error",
      errorCode: event.error
    });
  };
  var onResult = function onResult2(event) {
    setState({
      status: "recognizing",
      transcript: event.results[0] && event.results[0][0] && event.results[0][0].transcript || "",
      isSpeechFinal: event.results[0] && event.results[0].isFinal
    });
    if (searchAsYouSpeak && state.transcript) {
      onQueryChange(state.transcript);
    }
  };
  var onEnd = function onEnd2() {
    if (!state.errorCode && state.transcript && !searchAsYouSpeak) {
      onQueryChange(state.transcript);
    }
    if (state.status !== "error") {
      setState({
        status: "finished"
      });
    }
  };
  var startListening = function startListening2() {
    recognition = new SpeechRecognitionAPI();
    if (!recognition) {
      return;
    }
    resetState("askingPermission");
    recognition.interimResults = true;
    if (language) {
      recognition.lang = language;
    }
    recognition.addEventListener("start", onStart);
    recognition.addEventListener("error", onError);
    recognition.addEventListener("result", onResult);
    recognition.addEventListener("end", onEnd);
    recognition.start();
  };
  var dispose = function dispose2() {
    if (!recognition) {
      return;
    }
    recognition.stop();
    recognition.removeEventListener("start", onStart);
    recognition.removeEventListener("error", onError);
    recognition.removeEventListener("result", onResult);
    recognition.removeEventListener("end", onEnd);
    recognition = void 0;
  };
  var stopListening = function stopListening2() {
    dispose();
    resetState("finished");
  };
  return {
    getState,
    isBrowserSupported,
    isListening,
    startListening,
    stopListening,
    dispose
  };
};
var voiceSearchHelper_default = createVoiceSearchHelper;

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/connectors/voice-search/connectVoiceSearch.js
function _typeof38(o12) {
  "@babel/helpers - typeof";
  return _typeof38 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o13) {
    return typeof o13;
  } : function(o13) {
    return o13 && "function" == typeof Symbol && o13.constructor === Symbol && o13 !== Symbol.prototype ? "symbol" : typeof o13;
  }, _typeof38(o12);
}
function ownKeys35(e6, r7) {
  var t4 = Object.keys(e6);
  if (Object.getOwnPropertySymbols) {
    var o12 = Object.getOwnPropertySymbols(e6);
    r7 && (o12 = o12.filter(function(r8) {
      return Object.getOwnPropertyDescriptor(e6, r8).enumerable;
    })), t4.push.apply(t4, o12);
  }
  return t4;
}
function _objectSpread35(e6) {
  for (var r7 = 1; r7 < arguments.length; r7++) {
    var t4 = null != arguments[r7] ? arguments[r7] : {};
    r7 % 2 ? ownKeys35(Object(t4), true).forEach(function(r8) {
      _defineProperty36(e6, r8, t4[r8]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e6, Object.getOwnPropertyDescriptors(t4)) : ownKeys35(Object(t4)).forEach(function(r8) {
      Object.defineProperty(e6, r8, Object.getOwnPropertyDescriptor(t4, r8));
    });
  }
  return e6;
}
function _defineProperty36(obj, key, value) {
  key = _toPropertyKey36(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey36(t4) {
  var i6 = _toPrimitive36(t4, "string");
  return "symbol" == _typeof38(i6) ? i6 : String(i6);
}
function _toPrimitive36(t4, r7) {
  if ("object" != _typeof38(t4) || !t4) return t4;
  var e6 = t4[Symbol.toPrimitive];
  if (void 0 !== e6) {
    var i6 = e6.call(t4, r7 || "default");
    if ("object" != _typeof38(i6)) return i6;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r7 ? String : Number)(t4);
}
var withUsage28 = createDocumentationMessageGenerator({
  name: "voice-search",
  connector: true
});
var connectVoiceSearch = function connectVoiceSearch2(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage28());
  return function(widgetParams) {
    var _widgetParams$searchA = widgetParams.searchAsYouSpeak, searchAsYouSpeak = _widgetParams$searchA === void 0 ? false : _widgetParams$searchA, language = widgetParams.language, additionalQueryParameters = widgetParams.additionalQueryParameters, _widgetParams$createV = widgetParams.createVoiceSearchHelper, createVoiceSearchHelper3 = _widgetParams$createV === void 0 ? voiceSearchHelper_default : _widgetParams$createV;
    return {
      $$type: "ais.voiceSearch",
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(_objectSpread35(_objectSpread35({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(_objectSpread35(_objectSpread35({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance
        }), false);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread35(_objectSpread35({}, renderState), {}, {
          voiceSearch: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(renderOptions) {
        var _this = this;
        var helper = renderOptions.helper, instantSearchInstance = renderOptions.instantSearchInstance;
        if (!this._refine) {
          this._refine = function(query) {
            if (query !== helper.state.query) {
              var queryLanguages = language ? [language.split("-")[0]] : void 0;
              helper.setQueryParameter("queryLanguages", queryLanguages);
              if (typeof additionalQueryParameters === "function") {
                helper.setState(helper.state.setQueryParameters(_objectSpread35({
                  ignorePlurals: true,
                  removeStopWords: true,
                  // @ts-ignore optionalWords is allowed to be a string too
                  optionalWords: query
                }, additionalQueryParameters({
                  query
                }))));
              }
              helper.setQuery(query).search();
            }
          };
        }
        if (!this._voiceSearchHelper) {
          this._voiceSearchHelper = createVoiceSearchHelper3({
            searchAsYouSpeak,
            language,
            onQueryChange: function onQueryChange(query) {
              return _this._refine(query);
            },
            onStateChange: function onStateChange() {
              renderFn(_objectSpread35(_objectSpread35({}, _this.getWidgetRenderState(renderOptions)), {}, {
                instantSearchInstance
              }), false);
            }
          });
        }
        var _voiceSearchHelper = this._voiceSearchHelper, isBrowserSupported = _voiceSearchHelper.isBrowserSupported, isListening = _voiceSearchHelper.isListening, startListening = _voiceSearchHelper.startListening, stopListening = _voiceSearchHelper.stopListening, getState = _voiceSearchHelper.getState;
        return {
          isBrowserSupported: isBrowserSupported(),
          isListening: isListening(),
          toggleListening: function toggleListening() {
            if (!isBrowserSupported()) {
              return;
            }
            if (isListening()) {
              stopListening();
            } else {
              startListening();
            }
          },
          voiceListeningState: getState(),
          widgetParams
        };
      },
      dispose: function dispose(_ref) {
        var state = _ref.state;
        this._voiceSearchHelper.dispose();
        unmountFn();
        var newState = state;
        if (typeof additionalQueryParameters === "function") {
          var additional = additionalQueryParameters({
            query: ""
          });
          var toReset = additional ? Object.keys(additional).reduce(function(acc, current) {
            acc[current] = void 0;
            return acc;
          }, {}) : {};
          newState = state.setQueryParameters(_objectSpread35({
            // @ts-ignore (queryLanguages is not added to algoliasearch v3)
            queryLanguages: void 0,
            ignorePlurals: void 0,
            removeStopWords: void 0,
            optionalWords: void 0
          }, toReset));
        }
        return newState.setQueryParameter("query", void 0);
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref2) {
        var searchParameters = _ref2.searchParameters;
        var query = searchParameters.query || "";
        if (!query) {
          return uiState;
        }
        return _objectSpread35(_objectSpread35({}, uiState), {}, {
          query
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref3) {
        var uiState = _ref3.uiState;
        return searchParameters.setQueryParameter("query", uiState.query || "");
      }
    };
  };
};
var connectVoiceSearch_default = connectVoiceSearch;

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/connectors/relevant-sort/connectRelevantSort.js
function _typeof39(o12) {
  "@babel/helpers - typeof";
  return _typeof39 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o13) {
    return typeof o13;
  } : function(o13) {
    return o13 && "function" == typeof Symbol && o13.constructor === Symbol && o13 !== Symbol.prototype ? "symbol" : typeof o13;
  }, _typeof39(o12);
}
function ownKeys36(e6, r7) {
  var t4 = Object.keys(e6);
  if (Object.getOwnPropertySymbols) {
    var o12 = Object.getOwnPropertySymbols(e6);
    r7 && (o12 = o12.filter(function(r8) {
      return Object.getOwnPropertyDescriptor(e6, r8).enumerable;
    })), t4.push.apply(t4, o12);
  }
  return t4;
}
function _objectSpread36(e6) {
  for (var r7 = 1; r7 < arguments.length; r7++) {
    var t4 = null != arguments[r7] ? arguments[r7] : {};
    r7 % 2 ? ownKeys36(Object(t4), true).forEach(function(r8) {
      _defineProperty37(e6, r8, t4[r8]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e6, Object.getOwnPropertyDescriptors(t4)) : ownKeys36(Object(t4)).forEach(function(r8) {
      Object.defineProperty(e6, r8, Object.getOwnPropertyDescriptor(t4, r8));
    });
  }
  return e6;
}
function _defineProperty37(obj, key, value) {
  key = _toPropertyKey37(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey37(t4) {
  var i6 = _toPrimitive37(t4, "string");
  return "symbol" == _typeof39(i6) ? i6 : String(i6);
}
function _toPrimitive37(t4, r7) {
  if ("object" != _typeof39(t4) || !t4) return t4;
  var e6 = t4[Symbol.toPrimitive];
  if (void 0 !== e6) {
    var i6 = e6.call(t4, r7 || "default");
    if ("object" != _typeof39(i6)) return i6;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r7 ? String : Number)(t4);
}
var connectRelevantSort = function connectRelevantSort2() {
  var renderFn = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : noop;
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  return function(widgetParams) {
    var connectorState = {};
    return {
      $$type: "ais.relevantSort",
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(_objectSpread36(_objectSpread36({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(_objectSpread36(_objectSpread36({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance
        }), false);
      },
      dispose: function dispose(_ref) {
        var state = _ref.state;
        unmountFn();
        return state.setQueryParameter("relevancyStrictness", void 0);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread36(_objectSpread36({}, renderState), {}, {
          relevantSort: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref2) {
        var results = _ref2.results, helper = _ref2.helper;
        if (!connectorState.refine) {
          connectorState.refine = function(relevancyStrictness) {
            helper.setQueryParameter("relevancyStrictness", relevancyStrictness).search();
          };
        }
        var _ref3 = results || {}, appliedRelevancyStrictness = _ref3.appliedRelevancyStrictness;
        var isVirtualReplica = appliedRelevancyStrictness !== void 0;
        return {
          isRelevantSorted: typeof appliedRelevancyStrictness !== "undefined" && appliedRelevancyStrictness > 0,
          isVirtualReplica,
          canRefine: isVirtualReplica,
          refine: connectorState.refine,
          widgetParams
        };
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(state, _ref4) {
        var _uiState$relevantSort;
        var uiState = _ref4.uiState;
        return state.setQueryParameter("relevancyStrictness", (_uiState$relevantSort = uiState.relevantSort) !== null && _uiState$relevantSort !== void 0 ? _uiState$relevantSort : state.relevancyStrictness);
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref5) {
        var searchParameters = _ref5.searchParameters;
        return _objectSpread36(_objectSpread36({}, uiState), {}, {
          relevantSort: searchParameters.relevancyStrictness || uiState.relevantSort
        });
      }
    };
  };
};
var connectRelevantSort_default = connectRelevantSort;

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/connectors/frequently-bought-together/connectFrequentlyBoughtTogether.js
var withUsage29 = createDocumentationMessageGenerator({
  name: "frequently-bought-together",
  connector: true
});

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/connectors/looking-similar/connectLookingSimilar.js
var withUsage30 = createDocumentationMessageGenerator({
  name: "looking-similar",
  connector: true
});

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/connectors/index.js
var EXPERIMENTAL_connectAnswers = deprecate(connectAnswers_default, "answers is no longer supported");
var EXPERIMENTAL_connectConfigureRelatedItems = deprecate(connectConfigureRelatedItems_default, "EXPERIMENTAL_connectConfigureRelatedItems is deprecated and will be removed in a next minor version of InstantSearch. Please use connectRelatedItems instead.");
var EXPERIMENTAL_connectDynamicWidgets = deprecate(connectDynamicWidgets_default, "use connectDynamicWidgets");

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/Autocomplete.vue_vue&type=script&lang.js
var Autocomplete_vue_vue_type_script_lang_default = { name: "AisAutocomplete", mixins: [n3({ connector: connectAutocomplete_default }, { $$widgetType: "ais.autocomplete" }), t({ name: "Autocomplete" })], props: { escapeHTML: { type: Boolean, required: false, default: true } }, computed: { widgetParams: function() {
  return { escapeHTML: this.escapeHTML };
} } };

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/Autocomplete.vue_vue&type=template&id=52a2a414&lang.js
init_vue_runtime_esm_bundler();
var a3 = createBaseVNode("p", null, " This widget doesn't render anything without a filled in default slot. ", -1);
var d2 = createBaseVNode("p", null, "query, function to refine and results are provided.", -1);
var f2 = createBaseVNode("pre", null, "refine: Function", -1);
var c2 = createBaseVNode("summary", null, [createBaseVNode("code", null, "indices"), createTextVNode(":")], -1);
function o3(s5, o12, m12, p6, v6, y5) {
  return s5.state ? (openBlock(), createElementBlock("div", { key: 0, class: normalizeClass(s5.suit()) }, [renderSlot(s5.$slots, "default", { refine: s5.state.refine, currentRefinement: s5.state.currentRefinement, indices: s5.state.indices }, function() {
    return [a3, d2, f2, createBaseVNode("pre", null, 'currentRefinement: "' + toDisplayString(s5.state.currentRefinement) + '"', 1), createBaseVNode("details", null, [c2, createBaseVNode("pre", null, toDisplayString(s5.state.indices), 1)])];
  })], 2)) : createCommentVNode("", true);
}

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/Autocomplete.vue.js
Autocomplete_vue_vue_type_script_lang_default.render = o3;
var Autocomplete_vue_default = Autocomplete_vue_vue_type_script_lang_default;

// node_modules/.pnpm/mitt@2.1.0/node_modules/mitt/dist/mitt.es.js
function mitt_es_default(n6) {
  return { all: n6 = n6 || /* @__PURE__ */ new Map(), on: function(t4, e6) {
    var i6 = n6.get(t4);
    i6 && i6.push(e6) || n6.set(t4, [e6]);
  }, off: function(t4, e6) {
    var i6 = n6.get(t4);
    i6 && i6.splice(i6.indexOf(e6) >>> 0, 1);
  }, emit: function(t4, e6) {
    (n6.get(t4) || []).slice().map(function(n7) {
      n7(e6);
    }), (n6.get("*") || []).slice().map(function(n7) {
      n7(t4, e6);
    });
  } };
}

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/mixins/panel.js
var i2 = function() {
  var e6;
  return (e6 = { props: { emitter: { type: Object, required: false, default: function() {
    return mitt_es_default();
  } } }, provide: function() {
    var t4;
    return (t4 = {}).instantSearchPanelEmitter = this.emitter, t4;
  }, data: function() {
    return { canRefine: true };
  }, created: function() {
    var t4 = this;
    this.emitter.on("PANEL_CHANGE_EVENT", function(e7) {
      t4.updateCanRefine(e7);
    });
  } }).beforeUnmount = function() {
    this.emitter.all.clear();
  }, e6.methods = { updateCanRefine: function(t4) {
    this.canRefine = t4;
  } }, e6;
};
var r3 = function(t4) {
  void 0 === t4 && (t4 = {});
  var e6 = t4.mapStateToCanRefine;
  return void 0 === e6 && (e6 = function(t5) {
    return Boolean(t5.canRefine);
  }), { inject: { emitter: { from: "instantSearchPanelEmitter", default: function() {
    return { emit: function() {
    } };
  } } }, data: function() {
    return { state: null, hasAlreadyEmitted: false };
  }, watch: { state: { immediate: true, handler: function(t5, n6) {
    if (t5) {
      var i6 = e6(n6 || {}), r7 = e6(t5);
      this.hasAlreadyEmitted && i6 === r7 || (this.emitter.emit("PANEL_CHANGE_EVENT", r7), this.hasAlreadyEmitted = true);
    }
  } } } };
};

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/Breadcrumb.vue_vue&type=script&lang.js
var Breadcrumb_vue_vue_type_script_lang_default = { name: "AisBreadcrumb", mixins: [n3({ connector: connectBreadcrumb_default }, { $$widgetType: "ais.breadcrumb" }), r3(), t({ name: "Breadcrumb" })], props: { attributes: { type: Array, required: true }, separator: { type: String, default: void 0 }, rootPath: { type: String, default: void 0 }, transformItems: { type: Function, default: void 0 } }, computed: { widgetParams: function() {
  return { attributes: this.attributes, separator: this.separator, rootPath: this.rootPath, transformItems: this.transformItems };
} }, methods: { isLastItem: function(t4) {
  return this.state.items.length - 1 === t4;
} } };

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/Breadcrumb.vue_vue&type=template&id=0d1fdc52&lang.js
init_vue_runtime_esm_bundler();
var f3 = ["href"];
var m2 = ["href"];
var k2 = ["href", "onClick"];
function h3(h8, L3, R, p6, v6, d8) {
  return h8.state ? (openBlock(), createElementBlock("div", { key: 0, class: normalizeClass([h8.suit(), !h8.state.canRefine && h8.suit("", "noRefinement")]) }, [renderSlot(h8.$slots, "default", { items: h8.state.items, canRefine: h8.state.canRefine, refine: h8.state.refine, createURL: h8.state.createURL }, function() {
    return [createBaseVNode("ul", { class: normalizeClass(h8.suit("list")) }, [createBaseVNode("li", { class: normalizeClass([h8.suit("item"), !h8.state.items.length && h8.suit("item", "selected")]) }, [Boolean(h8.state.items.length) ? (openBlock(), createElementBlock("a", { key: 0, href: h8.state.createURL(), class: normalizeClass(h8.suit("link")), onClick: L3[0] || (L3[0] = withModifiers(function(e6) {
      return h8.state.refine();
    }, ["exact", "left", "prevent"])) }, [renderSlot(h8.$slots, "rootLabel", {}, function() {
      return [createTextVNode("Home")];
    })], 10, f3)) : (openBlock(), createElementBlock("a", { key: 1, href: h8.state.createURL(null), class: normalizeClass(h8.suit("link")), onClick: L3[1] || (L3[1] = withModifiers(function(e6) {
      return h8.state.refine(null);
    }, ["exact", "left", "prevent"])) }, [renderSlot(h8.$slots, "rootLabel", {}, function() {
      return [createTextVNode("Home")];
    })], 10, m2))], 2), (openBlock(true), createElementBlock(Fragment, null, renderList(h8.state.items, function(u5, o12) {
      return openBlock(), createElementBlock("li", { key: u5.label, class: normalizeClass([h8.suit("item"), d8.isLastItem(o12) && h8.suit("item", "selected")]) }, [createBaseVNode("span", { class: normalizeClass(h8.suit("separator")), "aria-hidden": "true" }, [renderSlot(h8.$slots, "separator", {}, function() {
        return [createTextVNode(">")];
      })], 2), d8.isLastItem(o12) ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [createTextVNode(toDisplayString(u5.label), 1)], 64)) : (openBlock(), createElementBlock("a", { key: 0, href: h8.state.createURL(u5.value), class: normalizeClass(h8.suit("link")), onClick: withModifiers(function(e6) {
        return h8.state.refine(u5.value);
      }, ["exact", "left", "prevent"]) }, toDisplayString(u5.label), 11, k2))], 2);
    }), 128))], 2)];
  })], 2)) : createCommentVNode("", true);
}

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/Breadcrumb.vue.js
Breadcrumb_vue_vue_type_script_lang_default.render = h3;
var Breadcrumb_vue_default = Breadcrumb_vue_vue_type_script_lang_default;

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/ClearRefinements.vue_vue&type=script&lang.js
var ClearRefinements_vue_vue_type_script_lang_default = { name: "AisClearRefinements", mixins: [n3({ connector: connectClearRefinements_default }, { $$widgetType: "ais.clearRefinements" }), r3(), t({ name: "ClearRefinements" })], props: { excludedAttributes: { type: Array, default: void 0 }, includedAttributes: { type: Array, default: void 0 }, transformItems: { type: Function, default: void 0 } }, computed: { widgetParams: function() {
  return { includedAttributes: this.includedAttributes, excludedAttributes: this.excludedAttributes, transformItems: this.transformItems };
}, canRefine: function() {
  return this.state.hasRefinements;
} } };

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/ClearRefinements.vue_vue&type=template&id=41d81b11&lang.js
init_vue_runtime_esm_bundler();
var u3 = ["disabled"];
function o4(o12, c14, l4, d8, b3, p6) {
  return o12.state ? (openBlock(), createElementBlock("div", { key: 0, class: normalizeClass(o12.suit()) }, [renderSlot(o12.$slots, "default", { canRefine: p6.canRefine, refine: o12.state.refine, createURL: o12.state.createURL }, function() {
    return [createBaseVNode("button", { type: "reset", class: normalizeClass([o12.suit("button"), !p6.canRefine && o12.suit("button", "disabled")]), disabled: !p6.canRefine, onClick: c14[0] || (c14[0] = withModifiers(function() {
      for (var e6, t4 = [], n6 = arguments.length; n6--; ) t4[n6] = arguments[n6];
      return o12.state.refine && (e6 = o12.state).refine.apply(e6, t4);
    }, ["prevent"])) }, [renderSlot(o12.$slots, "resetLabel", {}, function() {
      return [createTextVNode(" Clear refinements ")];
    })], 10, u3)];
  })], 2)) : createCommentVNode("", true);
}

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/ClearRefinements.vue.js
ClearRefinements_vue_vue_type_script_lang_default.render = o4;
var ClearRefinements_vue_default = ClearRefinements_vue_vue_type_script_lang_default;

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/Configure.js
var Configure_default = { inheritAttrs: false, name: "AisConfigure", mixins: [t({ name: "Configure" }), n3({ connector: connectConfigure_default }, { $$widgetType: "ais.configure" })], computed: { widgetParams: function() {
  return { searchParameters: Object.assign({}, this.$attrs) };
} }, render: n(function(t4) {
  var e6 = this.$slots.default;
  return this.state && e6 ? t4("div", { class: this.suit() }, [e6({ refine: this.state.refine, searchParameters: this.state.widgetParams.searchParameters })]) : null;
}) };

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/ConfigureRelatedItems.js
var ConfigureRelatedItems_default = { inheritAttrs: false, name: "AisExperimentalConfigureRelatedItems", mixins: [n3({ connector: EXPERIMENTAL_connectConfigureRelatedItems }, { $$widgetType: "ais.configureRelatedItems" })], props: { hit: { type: Object, required: true }, matchingPatterns: { type: Object, required: true }, transformSearchParameters: { type: Function, required: false } }, computed: { widgetParams: function() {
  return { hit: this.hit, matchingPatterns: this.matchingPatterns, transformSearchParameters: this.transformSearchParameters };
} }, render: function() {
  return null;
} };

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/CurrentRefinements.vue_vue&type=script&lang.js
var CurrentRefinements_vue_vue_type_script_lang_default = { name: "AisCurrentRefinements", mixins: [t({ name: "CurrentRefinements" }), n3({ connector: connectCurrentRefinements_default }, { $$widgetType: "ais.currentRefinements" }), r3()], props: { includedAttributes: { type: Array, default: void 0 }, excludedAttributes: { type: Array, default: void 0 }, transformItems: { type: Function, default: void 0 } }, computed: { noRefinement: function() {
  return this.state && 0 === this.state.items.length;
}, widgetParams: function() {
  return { includedAttributes: this.includedAttributes, excludedAttributes: this.excludedAttributes, transformItems: this.transformItems };
} }, methods: { createItemKey: function(t4) {
  var e6 = t4.attribute, i6 = t4.value;
  return [e6, t4.type, i6, t4.operator].join(":");
}, capitalize: function(t4) {
  return t4 ? t4.toString().charAt(0).toLocaleUpperCase() + t4.toString().slice(1) : "";
} } };

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/CurrentRefinements.vue_vue&type=template&id=5584328f&lang.js
init_vue_runtime_esm_bundler();
var o5 = { key: 0 };
var m3 = ["onClick"];
function y2(y5, b3, R, k5, p6, L3) {
  return y5.state ? (openBlock(), createElementBlock("div", { key: 0, class: normalizeClass([y5.suit(), L3.noRefinement && y5.suit("", "noRefinement")]) }, [renderSlot(y5.$slots, "default", { refine: y5.state.refine, items: y5.state.items, createURL: y5.state.createURL }, function() {
    return [createBaseVNode("ul", { class: normalizeClass(y5.suit("list")) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(y5.state.items, function(f12) {
      return openBlock(), createElementBlock("li", { key: f12.attribute, class: normalizeClass(y5.suit("item")) }, [renderSlot(y5.$slots, "item", { refine: f12.refine, item: f12, createURL: y5.state.createURL }, function() {
        return [createBaseVNode("span", { class: normalizeClass(y5.suit("label")) }, toDisplayString(L3.capitalize(f12.label)) + ": ", 3), (openBlock(true), createElementBlock(Fragment, null, renderList(f12.refinements, function(a6) {
          return openBlock(), createElementBlock("span", { key: L3.createItemKey(a6), class: normalizeClass(y5.suit("category")) }, [renderSlot(y5.$slots, "refinement", { refine: f12.refine, refinement: a6, createURL: y5.state.createURL }, function() {
            return [createBaseVNode("span", { class: normalizeClass(y5.suit("categoryLabel")) }, ["query" === a6.attribute ? (openBlock(), createElementBlock("q", o5, toDisplayString(a6.label), 1)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [createTextVNode(toDisplayString(a6.label), 1)], 64))], 2), createBaseVNode("button", { class: normalizeClass(y5.suit("delete")), type: "button", onClick: withModifiers(function(e6) {
              return f12.refine(a6);
            }, ["left", "exact"]) }, " ✕ ", 10, m3)];
          })], 2);
        }), 128))];
      })], 2);
    }), 128))], 2)];
  })], 2)) : createCommentVNode("", true);
}

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/CurrentRefinements.vue.js
CurrentRefinements_vue_vue_type_script_lang_default.render = y2;
var CurrentRefinements_vue_default = CurrentRefinements_vue_vue_type_script_lang_default;

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/HierarchicalMenuList.vue_vue&type=script&lang.js
var HierarchicalMenuList_vue_vue_type_script_lang_default = { name: "HierarchicalMenuList", props: { items: { type: Array, required: true }, level: { type: Number, required: true }, refine: { type: Function, required: true }, createURL: { type: Function, required: true }, suit: { type: Function, required: true } } };

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/HierarchicalMenuList.vue_vue&type=template&id=34a24b26&lang.js
init_vue_runtime_esm_bundler();
var v2 = ["href", "onClick"];
function m4(m12, o12, d8, h8, k5, p6) {
  var R = resolveComponent("hierarchical-menu-list", true);
  return d8.items.length > 0 ? (openBlock(), createElementBlock("ul", { key: 0, class: normalizeClass([d8.suit("list"), d8.level > 0 && d8.suit("list", "child"), d8.suit("list", "lvl" + d8.level)]) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(d8.items, function(e6) {
    return openBlock(), createElementBlock("li", { key: e6.value, class: normalizeClass([d8.suit("item"), e6.isRefined && d8.suit("item", "selected"), e6.data && e6.data.length > 0 && d8.suit("item", "parent")]) }, [createBaseVNode("a", { href: d8.createURL(e6.value), class: normalizeClass([d8.suit("link"), e6.isRefined && d8.suit("link", "selected")]), onClick: withModifiers(function(t4) {
      return d8.refine(e6.value);
    }, ["exact", "left", "prevent"]) }, [createBaseVNode("span", { class: normalizeClass(d8.suit("label")) }, toDisplayString(e6.label), 3), createBaseVNode("span", { class: normalizeClass(d8.suit("count")) }, toDisplayString(e6.count), 3)], 10, v2), e6.data ? (openBlock(), createBlock(R, { key: 0, items: e6.data, level: d8.level + 1, refine: d8.refine, createURL: d8.createURL, suit: d8.suit }, null, 8, ["items", "level", "refine", "createURL", "suit"])) : createCommentVNode("", true)], 2);
  }), 128))], 2)) : createCommentVNode("", true);
}

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/HierarchicalMenuList.vue.js
HierarchicalMenuList_vue_vue_type_script_lang_default.render = m4;
var HierarchicalMenuList_vue_default = HierarchicalMenuList_vue_vue_type_script_lang_default;

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/HierarchicalMenu.vue_vue&type=script&lang.js
var HierarchicalMenu_vue_vue_type_script_lang_default = { name: "AisHierarchicalMenu", mixins: [t({ name: "HierarchicalMenu" }), n3({ connector: connectHierarchicalMenu_default }, { $$widgetType: "ais.hierarchicalMenu" }), r3()], components: { HierarchicalMenuList: HierarchicalMenuList_vue_default }, props: { attributes: { type: Array, required: true }, limit: { type: Number, default: void 0 }, showMoreLimit: { type: Number, default: void 0 }, showMore: { type: Boolean, default: false }, sortBy: { type: [Array, Function], default: void 0 }, separator: { type: String, default: void 0 }, rootPath: { type: String, default: void 0 }, showParentLevel: { type: Boolean, default: void 0 }, transformItems: { type: Function, default: void 0 } }, computed: { widgetParams: function() {
  return { attributes: this.attributes, limit: this.limit, showMore: this.showMore, showMoreLimit: this.showMoreLimit, separator: this.separator, rootPath: this.rootPath, showParentLevel: this.showParentLevel, sortBy: this.sortBy, transformItems: this.transformItems };
} } };

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/HierarchicalMenu.vue_vue&type=template&id=15099ac6&lang.js
init_vue_runtime_esm_bundler();
var h4 = ["disabled"];
function c3(c14, u5, w2, M2, f12, S2) {
  var d8 = resolveComponent("hierarchical-menu-list");
  return c14.state ? (openBlock(), createElementBlock("div", { key: 0, class: normalizeClass([c14.suit(), !c14.state.canRefine && c14.suit("", "noRefinement")]) }, [renderSlot(c14.$slots, "default", { items: c14.state.items, canRefine: c14.state.canRefine, canToggleShowMore: c14.state.canToggleShowMore, isShowingMore: c14.state.isShowingMore, refine: c14.state.refine, createURL: c14.state.createURL, toggleShowMore: c14.state.toggleShowMore, sendEvent: c14.state.sendEvent }, function() {
    return [createVNode(d8, { items: c14.state.items, level: 0, refine: c14.state.refine, createURL: c14.state.createURL, suit: c14.suit }, null, 8, ["items", "refine", "createURL", "suit"]), w2.showMore ? (openBlock(), createElementBlock("button", { key: 0, class: normalizeClass([c14.suit("showMore"), !c14.state.canToggleShowMore && c14.suit("showMore", "disabled")]), disabled: !c14.state.canToggleShowMore, onClick: u5[0] || (u5[0] = withModifiers(function() {
      for (var e6, t4 = [], o12 = arguments.length; o12--; ) t4[o12] = arguments[o12];
      return c14.state.toggleShowMore && (e6 = c14.state).toggleShowMore.apply(e6, t4);
    }, ["prevent"])) }, [renderSlot(c14.$slots, "showMoreLabel", { isShowingMore: c14.state.isShowingMore }, function() {
      return [createTextVNode(toDisplayString(c14.state.isShowingMore ? "Show less" : "Show more"), 1)];
    })], 10, h4)) : createCommentVNode("", true)];
  })], 2)) : createCommentVNode("", true);
}

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/HierarchicalMenu.vue.js
HierarchicalMenu_vue_vue_type_script_lang_default.render = c3;
var HierarchicalMenu_vue_default = HierarchicalMenu_vue_vue_type_script_lang_default;

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/Highlighter.js
init_vue_runtime_esm_bundler();

// node_modules/.pnpm/@babel+runtime@7.26.0/node_modules/@babel/runtime/helpers/esm/extends.js
function _extends2() {
  return _extends2 = Object.assign ? Object.assign.bind() : function(n6) {
    for (var e6 = 1; e6 < arguments.length; e6++) {
      var t4 = arguments[e6];
      for (var r7 in t4) ({}).hasOwnProperty.call(t4, r7) && (n6[r7] = t4[r7]);
    }
    return n6;
  }, _extends2.apply(null, arguments);
}

// node_modules/.pnpm/@babel+runtime@7.26.0/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
function _objectWithoutPropertiesLoose6(r7, e6) {
  if (null == r7) return {};
  var t4 = {};
  for (var n6 in r7) if ({}.hasOwnProperty.call(r7, n6)) {
    if (e6.includes(n6)) continue;
    t4[n6] = r7[n6];
  }
  return t4;
}

// node_modules/.pnpm/@babel+runtime@7.26.0/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js
function _objectWithoutProperties6(e6, t4) {
  if (null == e6) return {};
  var o12, r7, i6 = _objectWithoutPropertiesLoose6(e6, t4);
  if (Object.getOwnPropertySymbols) {
    var s5 = Object.getOwnPropertySymbols(e6);
    for (r7 = 0; r7 < s5.length; r7++) o12 = s5[r7], t4.includes(o12) || {}.propertyIsEnumerable.call(e6, o12) && (i6[o12] = e6[o12]);
  }
  return i6;
}

// node_modules/.pnpm/instantsearch-ui-components@0.11.0/node_modules/instantsearch-ui-components/dist/es/lib/cx.js
function cx() {
  for (var _len = arguments.length, classNames = new Array(_len), _key = 0; _key < _len; _key++) {
    classNames[_key] = arguments[_key];
  }
  return classNames.reduce(function(acc, className) {
    if (Array.isArray(className)) {
      return acc.concat(className);
    }
    return acc.concat([className]);
  }, []).filter(Boolean).join(" ");
}

// node_modules/.pnpm/instantsearch-ui-components@0.11.0/node_modules/instantsearch-ui-components/dist/es/components/Highlight.js
var _excluded6 = ["parts", "highlightedTagName", "nonHighlightedTagName", "separator", "className", "classNames"];
function createHighlightPartComponent(_ref) {
  var createElement = _ref.createElement;
  return function HighlightPart(_ref2) {
    var classNames = _ref2.classNames, children = _ref2.children, highlightedTagName = _ref2.highlightedTagName, isHighlighted = _ref2.isHighlighted, nonHighlightedTagName = _ref2.nonHighlightedTagName;
    var TagName = isHighlighted ? highlightedTagName : nonHighlightedTagName;
    return createElement(TagName, {
      className: isHighlighted ? classNames.highlighted : classNames.nonHighlighted
    }, children);
  };
}
function createHighlightComponent(_ref3) {
  var createElement = _ref3.createElement, Fragment2 = _ref3.Fragment;
  var HighlightPart = createHighlightPartComponent({
    createElement,
    Fragment: Fragment2
  });
  return function Highlight(userProps) {
    var parts = userProps.parts, _userProps$highlighte = userProps.highlightedTagName, highlightedTagName = _userProps$highlighte === void 0 ? "mark" : _userProps$highlighte, _userProps$nonHighlig = userProps.nonHighlightedTagName, nonHighlightedTagName = _userProps$nonHighlig === void 0 ? "span" : _userProps$nonHighlig, _userProps$separator = userProps.separator, separator = _userProps$separator === void 0 ? ", " : _userProps$separator, className = userProps.className, _userProps$classNames = userProps.classNames, classNames = _userProps$classNames === void 0 ? {} : _userProps$classNames, props = _objectWithoutProperties6(userProps, _excluded6);
    return createElement("span", _extends2({}, props, {
      className: cx(classNames.root, className)
    }), parts.map(function(part, partIndex) {
      var isLastPart = partIndex === parts.length - 1;
      return createElement(Fragment2, {
        key: partIndex
      }, part.map(function(subPart, subPartIndex) {
        return createElement(HighlightPart, {
          key: subPartIndex,
          classNames,
          highlightedTagName,
          nonHighlightedTagName,
          isHighlighted: subPart.isHighlighted
        }, subPart.value);
      }), !isLastPart && createElement("span", {
        className: classNames.separator
      }, separator));
    }));
  };
}

// node_modules/.pnpm/instantsearch-ui-components@0.11.0/node_modules/instantsearch-ui-components/dist/es/components/Hits.js
var _excluded7 = ["classNames", "hits", "itemComponent", "sendEvent", "emptyComponent", "banner", "bannerComponent"];
function createDefaultBannerComponent(_ref) {
  var createElement = _ref.createElement;
  return function DefaultBanner(_ref2) {
    var classNames = _ref2.classNames, banner = _ref2.banner;
    if (!banner.image.urls[0].url) {
      return null;
    }
    return createElement("aside", {
      className: cx("ais-Hits-banner", classNames.bannerRoot)
    }, banner.link ? createElement("a", {
      className: cx("ais-Hits-banner-link", classNames.bannerLink),
      href: banner.link.url,
      target: banner.link.target
    }, createElement("img", {
      className: cx("ais-Hits-banner-image", classNames.bannerImage),
      src: banner.image.urls[0].url,
      alt: banner.image.title
    })) : createElement("img", {
      className: cx("ais-Hits-banner-image", classNames.bannerImage),
      src: banner.image.urls[0].url,
      alt: banner.image.title
    }));
  };
}
function createHitsComponent(_ref3) {
  var createElement = _ref3.createElement, Fragment2 = _ref3.Fragment;
  var DefaultBannerComponent = createDefaultBannerComponent({
    createElement,
    Fragment: Fragment2
  });
  return function Hits(userProps) {
    var _userProps$classNames = userProps.classNames, classNames = _userProps$classNames === void 0 ? {} : _userProps$classNames, hits = userProps.hits, ItemComponent = userProps.itemComponent, sendEvent = userProps.sendEvent, EmptyComponent = userProps.emptyComponent, banner = userProps.banner, BannerComponent = userProps.bannerComponent, props = _objectWithoutProperties6(userProps, _excluded7);
    return createElement("div", _extends2({}, props, {
      className: cx("ais-Hits", classNames.root, hits.length === 0 && cx("ais-Hits--empty", classNames.emptyRoot), props.className)
    }), banner && (BannerComponent ? createElement(BannerComponent, {
      className: cx("ais-Hits-banner", classNames.bannerRoot),
      banner
    }) : createElement(DefaultBannerComponent, {
      classNames,
      banner
    })), hits.length === 0 && EmptyComponent ? createElement(EmptyComponent, null) : createElement("ol", {
      className: cx("ais-Hits-list", classNames.list)
    }, hits.map(function(hit, index3) {
      return createElement(ItemComponent, {
        key: hit.objectID,
        hit,
        index: index3,
        className: cx("ais-Hits-item", classNames.item),
        onClick: function onClick() {
          sendEvent("click:internal", hit, "Hit Clicked");
        },
        onAuxClick: function onAuxClick() {
          sendEvent("click:internal", hit, "Hit Clicked");
        }
      });
    })));
  };
}

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/util/pragma.js
init_vue_runtime_esm_bundler();
init_vue_runtime_esm_bundler();
var e3 = function(e6, n6, i6) {
  if (!i6) return h(e6, n6);
  if (e6 === Fragment) return h(e6, Array.isArray(i6) ? i6 : [i6]);
  var f12 = "string" == typeof i6 ? { default: function() {
    return i6;
  } } : i6, o12 = "string" == typeof e6 ? n6 : Object.assign(n6, { children: i6 });
  return h(e6, o12, f12);
};

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/Highlighter.js
var g2 = createHighlightComponent({ createElement: e3, Fragment });
var Highlighter_default = { name: "AisHighlighter", props: { hit: { type: Object, required: true }, attribute: { type: String, required: true }, highlightedTagName: { type: String, default: "mark" }, suit: { type: Function, required: true }, highlightProperty: { type: String, required: true }, preTag: { type: String, required: true }, postTag: { type: String, required: true } }, render: function() {
  var i6 = getPropertyByPath(this.hit[this.highlightProperty], this.attribute) || [], n6 = (Array.isArray(i6) ? i6 : [i6]).map(function(t4) {
    return getHighlightedParts(unescape2(t4.value || "")).map(function(t5) {
      var i7 = t5.value;
      return { value: " " === i7 ? "  " : i7, isHighlighted: t5.isHighlighted };
    });
  });
  return e3(g2, { classNames: { root: this.suit(), highlighted: this.suit("highlighted") }, highlightedTagName: this.highlightedTagName, nonHighlightedTagName: Fragment, parts: n6 });
} };

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/Highlight.vue_vue&type=script&lang.js
var Highlight_vue_vue_type_script_lang_default = { name: "AisHighlight", mixins: [t({ name: "Highlight" })], components: { AisHighlighter: Highlighter_default }, props: { hit: { type: Object, required: true }, attribute: { type: String, required: true }, highlightedTagName: { type: String, default: "mark" } } };

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/Highlight.vue_vue&type=template&id=214ecb36&lang.js
init_vue_runtime_esm_bundler();
function g3(g9, e6, a6, r7, u5, l4) {
  var m12 = resolveComponent("ais-highlighter");
  return openBlock(), createBlock(m12, { hit: a6.hit, attribute: a6.attribute, "highlighted-tag-name": a6.highlightedTagName, suit: g9.suit, "highlight-property": "_highlightResult", "pre-tag": "<mark>", "post-tag": "</mark>" }, null, 8, ["hit", "attribute", "highlighted-tag-name", "suit"]);
}

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/Highlight.vue.js
Highlight_vue_vue_type_script_lang_default.render = g3;
var Highlight_vue_default = Highlight_vue_vue_type_script_lang_default;

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/Hits.js
var Hits_default = { name: "AisHits", mixins: [n3({ connector: connectHitsWithInsights_default }, { $$widgetType: "ais.hits" }), t({ name: "Hits" })], props: { showBanner: { type: Boolean, default: true }, escapeHTML: { type: Boolean, default: true }, transformItems: { type: Function, default: void 0 } }, computed: { widgetParams: function() {
  return { showBanner: this.showBanner, escapeHTML: this.escapeHTML, transformItems: this.transformItems };
} }, render: n(function(t4) {
  var s5 = this;
  if (!this.state) return null;
  var i6 = u(this, "default"), n6 = u(this, "item"), r7 = u(this, "banner");
  return n6 || r7 || !i6 ? t4(createHitsComponent({ createElement: t4 }), { hits: this.state.items, itemComponent: function(e6) {
    var i7 = e6.hit, a6 = e6.index, r8 = e6.onClick, o12 = e6.onAuxClick, m12 = (e6.key, function(t5, s6) {
      var e7 = {};
      for (var i8 in t5) Object.prototype.hasOwnProperty.call(t5, i8) && -1 === s6.indexOf(i8) && (e7[i8] = t5[i8]);
      return e7;
    }(e6, ["hit", "index", "onClick", "onAuxClick", "key"]));
    return t4("li", { key: i7.objectID, attrs: m12, on: { click: r8, auxclick: o12 } }, [n6 && n6({ item: i7, index: a6, insights: s5.state.insights, sendEvent: s5.state.sendEvent }) || "objectID: " + i7.objectID + ", index: " + a6]);
  }, banner: this.showBanner ? this.state.banner : void 0, bannerComponent: r7, sendEvent: this.state.sendEvent, classNames: this.classNames && { root: this.classNames["ais-Hits"], list: this.classNames["ais-Hits-list"], item: this.classNames["ais-Hits-item"], bannerRoot: this.classNames["ais-Hits-banner"], bannerImage: this.classNames["ais-Hits-banner-image"], bannerLink: this.classNames["ais-Hits-banner-link"] } }) : t4("div", { attrs: { class: this.suit() } }, [i6({ banner: this.state.banner, items: this.state.items, insights: this.state.insights, sendEvent: this.state.sendEvent })]);
}) };

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/HitsPerPage.vue_vue&type=script&lang.js
var HitsPerPage_vue_vue_type_script_lang_default = { name: "AisHitsPerPage", mixins: [t({ name: "HitsPerPage" }), n3({ connector: connectHitsPerPage_default }, { $$widgetType: "ais.hitsPerPage" }), r3()], props: { items: { type: Array, required: true }, transformItems: { type: Function, default: void 0 } }, computed: { widgetParams: function() {
  return { items: this.items, transformItems: this.transformItems };
} } };

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/HitsPerPage.vue_vue&type=template&id=5d43db9c&lang.js
init_vue_runtime_esm_bundler();
var c4 = ["value", "selected"];
function o6(o12, f12, v6, R, m12, d8) {
  return o12.state ? (openBlock(), createElementBlock("div", { key: 0, class: normalizeClass(o12.suit()) }, [renderSlot(o12.$slots, "default", { items: o12.state.items, refine: o12.state.refine, hasNoResults: o12.state.hasNoResults, canRefine: o12.state.canRefine, createURL: o12.state.createURL }, function() {
    return [createBaseVNode("select", { class: normalizeClass(o12.suit("select")), onChange: f12[0] || (f12[0] = function(e6) {
      return o12.state.refine(Number(e6.currentTarget.value));
    }) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(o12.state.items, function(a6) {
      return openBlock(), createElementBlock("option", { key: a6.value, class: normalizeClass(o12.suit("option")), value: a6.value, selected: a6.isRefined }, toDisplayString(a6.label), 11, c4);
    }), 128))], 34)];
  })], 2)) : createCommentVNode("", true);
}

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/HitsPerPage.vue.js
HitsPerPage_vue_vue_type_script_lang_default.render = o6;
var HitsPerPage_vue_default = HitsPerPage_vue_vue_type_script_lang_default;

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/widgets/index/index.js
var import_algoliasearch_helper3 = __toESM(require_algoliasearch_helper2());
function _typeof41(o12) {
  "@babel/helpers - typeof";
  return _typeof41 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o13) {
    return typeof o13;
  } : function(o13) {
    return o13 && "function" == typeof Symbol && o13.constructor === Symbol && o13 !== Symbol.prototype ? "symbol" : typeof o13;
  }, _typeof41(o12);
}
var _excluded8 = ["initialSearchParameters"];
var _excluded24 = ["initialRecommendParameters"];
function ownKeys37(e6, r7) {
  var t4 = Object.keys(e6);
  if (Object.getOwnPropertySymbols) {
    var o12 = Object.getOwnPropertySymbols(e6);
    r7 && (o12 = o12.filter(function(r8) {
      return Object.getOwnPropertyDescriptor(e6, r8).enumerable;
    })), t4.push.apply(t4, o12);
  }
  return t4;
}
function _objectSpread37(e6) {
  for (var r7 = 1; r7 < arguments.length; r7++) {
    var t4 = null != arguments[r7] ? arguments[r7] : {};
    r7 % 2 ? ownKeys37(Object(t4), true).forEach(function(r8) {
      _defineProperty39(e6, r8, t4[r8]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e6, Object.getOwnPropertyDescriptors(t4)) : ownKeys37(Object(t4)).forEach(function(r8) {
      Object.defineProperty(e6, r8, Object.getOwnPropertyDescriptor(t4, r8));
    });
  }
  return e6;
}
function _defineProperty39(obj, key, value) {
  key = _toPropertyKey38(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey38(t4) {
  var i6 = _toPrimitive38(t4, "string");
  return "symbol" == _typeof41(i6) ? i6 : String(i6);
}
function _toPrimitive38(t4, r7) {
  if ("object" != _typeof41(t4) || !t4) return t4;
  var e6 = t4[Symbol.toPrimitive];
  if (void 0 !== e6) {
    var i6 = e6.call(t4, r7 || "default");
    if ("object" != _typeof41(i6)) return i6;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r7 ? String : Number)(t4);
}
function _toConsumableArray10(arr) {
  return _arrayWithoutHoles10(arr) || _iterableToArray10(arr) || _unsupportedIterableToArray19(arr) || _nonIterableSpread10();
}
function _nonIterableSpread10() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray19(o12, minLen) {
  if (!o12) return;
  if (typeof o12 === "string") return _arrayLikeToArray19(o12, minLen);
  var n6 = Object.prototype.toString.call(o12).slice(8, -1);
  if (n6 === "Object" && o12.constructor) n6 = o12.constructor.name;
  if (n6 === "Map" || n6 === "Set") return Array.from(o12);
  if (n6 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n6)) return _arrayLikeToArray19(o12, minLen);
}
function _iterableToArray10(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles10(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray19(arr);
}
function _arrayLikeToArray19(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i6 = 0, arr2 = new Array(len); i6 < len; i6++) arr2[i6] = arr[i6];
  return arr2;
}
function _objectWithoutProperties7(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose7(source, excluded);
  var key, i6;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i6 = 0; i6 < sourceSymbolKeys.length; i6++) {
      key = sourceSymbolKeys[i6];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose7(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i6;
  for (i6 = 0; i6 < sourceKeys.length; i6++) {
    key = sourceKeys[i6];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
var withUsage31 = createDocumentationMessageGenerator({
  name: "index-widget"
});
function privateHelperSetState(helper, _ref) {
  var state = _ref.state, recommendState = _ref.recommendState, isPageReset = _ref.isPageReset, _uiState = _ref._uiState;
  if (state !== helper.state) {
    helper.state = state;
    helper.emit("change", {
      state: helper.state,
      results: helper.lastResults,
      isPageReset,
      _uiState
    });
  }
  if (recommendState !== helper.recommendState) {
    helper.recommendState = recommendState;
  }
}
function getLocalWidgetsUiState(widgets, widgetStateOptions) {
  var initialUiState = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  return widgets.reduce(function(uiState, widget) {
    if (isIndexWidget(widget)) {
      return uiState;
    }
    if (!widget.getWidgetUiState && !widget.getWidgetState) {
      return uiState;
    }
    if (widget.getWidgetUiState) {
      return widget.getWidgetUiState(uiState, widgetStateOptions);
    }
    return widget.getWidgetState(uiState, widgetStateOptions);
  }, initialUiState);
}
function getLocalWidgetsSearchParameters(widgets, widgetSearchParametersOptions) {
  var initialSearchParameters = widgetSearchParametersOptions.initialSearchParameters, rest = _objectWithoutProperties7(widgetSearchParametersOptions, _excluded8);
  return widgets.reduce(function(state, widget) {
    if (!widget.getWidgetSearchParameters || isIndexWidget(widget)) {
      return state;
    }
    if (widget.dependsOn === "search" && widget.getWidgetParameters) {
      return widget.getWidgetParameters(state, rest);
    }
    return widget.getWidgetSearchParameters(state, rest);
  }, initialSearchParameters);
}
function getLocalWidgetsRecommendParameters(widgets, widgetRecommendParametersOptions) {
  var initialRecommendParameters = widgetRecommendParametersOptions.initialRecommendParameters, rest = _objectWithoutProperties7(widgetRecommendParametersOptions, _excluded24);
  return widgets.reduce(function(state, widget) {
    if (!isIndexWidget(widget) && widget.dependsOn === "recommend" && widget.getWidgetParameters) {
      return widget.getWidgetParameters(state, rest);
    }
    return state;
  }, initialRecommendParameters);
}
function resetPageFromWidgets(widgets) {
  var indexWidgets = widgets.filter(isIndexWidget);
  if (indexWidgets.length === 0) {
    return;
  }
  indexWidgets.forEach(function(widget) {
    var widgetHelper = widget.getHelper();
    privateHelperSetState(widgetHelper, {
      state: widgetHelper.state.resetPage(),
      recommendState: widgetHelper.recommendState,
      isPageReset: true
    });
    resetPageFromWidgets(widget.getWidgets());
  });
}
function resolveScopedResultsFromWidgets(widgets) {
  var indexWidgets = widgets.filter(isIndexWidget);
  return indexWidgets.reduce(function(scopedResults, current) {
    return scopedResults.concat.apply(scopedResults, [{
      indexId: current.getIndexId(),
      results: current.getResults(),
      helper: current.getHelper()
    }].concat(_toConsumableArray10(resolveScopedResultsFromWidgets(current.getWidgets()))));
  }, []);
}
var index = function index2(widgetParams) {
  if (widgetParams === void 0 || widgetParams.indexName === void 0) {
    throw new Error(withUsage31("The `indexName` option is required."));
  }
  var indexName = widgetParams.indexName, _widgetParams$indexId = widgetParams.indexId, indexId = _widgetParams$indexId === void 0 ? indexName : _widgetParams$indexId;
  var localWidgets = [];
  var localUiState = {};
  var localInstantSearchInstance = null;
  var localParent = null;
  var helper = null;
  var derivedHelper = null;
  var lastValidSearchParameters = null;
  var hasRecommendWidget = false;
  var hasSearchWidget = false;
  return {
    $$type: "ais.index",
    $$widgetType: "ais.index",
    getIndexName: function getIndexName() {
      return indexName;
    },
    getIndexId: function getIndexId() {
      return indexId;
    },
    getHelper: function getHelper() {
      return helper;
    },
    getResults: function getResults() {
      var _derivedHelper;
      if (!((_derivedHelper = derivedHelper) !== null && _derivedHelper !== void 0 && _derivedHelper.lastResults)) return null;
      derivedHelper.lastResults._state = helper.state;
      return derivedHelper.lastResults;
    },
    getResultsForWidget: function getResultsForWidget(widget) {
      var _helper;
      if (widget.dependsOn !== "recommend" || isIndexWidget(widget) || widget.$$id === void 0) {
        return this.getResults();
      }
      if (!((_helper = helper) !== null && _helper !== void 0 && _helper.lastRecommendResults)) {
        return null;
      }
      return helper.lastRecommendResults[widget.$$id];
    },
    getPreviousState: function getPreviousState() {
      return lastValidSearchParameters;
    },
    getScopedResults: function getScopedResults() {
      var widgetParent = this.getParent();
      var widgetSiblings;
      if (widgetParent) {
        widgetSiblings = widgetParent.getWidgets();
      } else if (indexName.length === 0) {
        widgetSiblings = this.getWidgets();
      } else {
        widgetSiblings = [this];
      }
      return resolveScopedResultsFromWidgets(widgetSiblings);
    },
    getParent: function getParent() {
      return localParent;
    },
    createURL: function createURL(nextState) {
      if (typeof nextState === "function") {
        return localInstantSearchInstance._createURL(_defineProperty39({}, indexId, nextState(localUiState)));
      }
      return localInstantSearchInstance._createURL(_defineProperty39({}, indexId, getLocalWidgetsUiState(localWidgets, {
        searchParameters: nextState,
        helper
      })));
    },
    getWidgets: function getWidgets() {
      return localWidgets;
    },
    addWidgets: function addWidgets(widgets) {
      var _this = this;
      if (!Array.isArray(widgets)) {
        throw new Error(withUsage31("The `addWidgets` method expects an array of widgets."));
      }
      if (widgets.some(function(widget) {
        return typeof widget.init !== "function" && typeof widget.render !== "function";
      })) {
        throw new Error(withUsage31("The widget definition expects a `render` and/or an `init` method."));
      }
      widgets.forEach(function(widget) {
        if (isIndexWidget(widget)) {
          return;
        }
        if (localInstantSearchInstance && widget.dependsOn === "recommend") {
          localInstantSearchInstance._hasRecommendWidget = true;
        } else if (localInstantSearchInstance) {
          localInstantSearchInstance._hasSearchWidget = true;
        } else if (widget.dependsOn === "recommend") {
          hasRecommendWidget = true;
        } else {
          hasSearchWidget = true;
        }
        addWidgetId(widget);
      });
      localWidgets = localWidgets.concat(widgets);
      if (localInstantSearchInstance && Boolean(widgets.length)) {
        privateHelperSetState(helper, {
          state: getLocalWidgetsSearchParameters(localWidgets, {
            uiState: localUiState,
            initialSearchParameters: helper.state
          }),
          recommendState: getLocalWidgetsRecommendParameters(localWidgets, {
            uiState: localUiState,
            initialRecommendParameters: helper.recommendState
          }),
          _uiState: localUiState
        });
        widgets.forEach(function(widget) {
          if (widget.getRenderState) {
            var renderState = widget.getRenderState(localInstantSearchInstance.renderState[_this.getIndexId()] || {}, createInitArgs(localInstantSearchInstance, _this, localInstantSearchInstance._initialUiState));
            storeRenderState({
              renderState,
              instantSearchInstance: localInstantSearchInstance,
              parent: _this
            });
          }
        });
        widgets.forEach(function(widget) {
          if (widget.init) {
            widget.init(createInitArgs(localInstantSearchInstance, _this, localInstantSearchInstance._initialUiState));
          }
        });
        localInstantSearchInstance.scheduleSearch();
      }
      return this;
    },
    removeWidgets: function removeWidgets(widgets) {
      var _this2 = this;
      if (!Array.isArray(widgets)) {
        throw new Error(withUsage31("The `removeWidgets` method expects an array of widgets."));
      }
      if (widgets.some(function(widget) {
        return typeof widget.dispose !== "function";
      })) {
        throw new Error(withUsage31("The widget definition expects a `dispose` method."));
      }
      localWidgets = localWidgets.filter(function(widget) {
        return widgets.indexOf(widget) === -1;
      });
      localWidgets.forEach(function(widget) {
        if (isIndexWidget(widget)) {
          return;
        }
        if (localInstantSearchInstance && widget.dependsOn === "recommend") {
          localInstantSearchInstance._hasRecommendWidget = true;
        } else if (localInstantSearchInstance) {
          localInstantSearchInstance._hasSearchWidget = true;
        } else if (widget.dependsOn === "recommend") {
          hasRecommendWidget = true;
        } else {
          hasSearchWidget = true;
        }
      });
      if (localInstantSearchInstance && Boolean(widgets.length)) {
        var _widgets$reduce = widgets.reduce(function(states, widget) {
          var next = widget.dispose({
            helper,
            state: states.cleanedSearchState,
            recommendState: states.cleanedRecommendState,
            parent: _this2
          });
          if (next instanceof import_algoliasearch_helper3.default.RecommendParameters) {
            states.cleanedRecommendState = next;
          } else if (next) {
            states.cleanedSearchState = next;
          }
          return states;
        }, {
          cleanedSearchState: helper.state,
          cleanedRecommendState: helper.recommendState
        }), cleanedSearchState = _widgets$reduce.cleanedSearchState, cleanedRecommendState = _widgets$reduce.cleanedRecommendState;
        var newState = localInstantSearchInstance.future.preserveSharedStateOnUnmount ? getLocalWidgetsSearchParameters(localWidgets, {
          uiState: localUiState,
          initialSearchParameters: new import_algoliasearch_helper3.default.SearchParameters({
            index: this.getIndexName()
          })
        }) : getLocalWidgetsSearchParameters(localWidgets, {
          uiState: getLocalWidgetsUiState(localWidgets, {
            searchParameters: cleanedSearchState,
            helper
          }),
          initialSearchParameters: cleanedSearchState
        });
        localUiState = getLocalWidgetsUiState(localWidgets, {
          searchParameters: newState,
          helper
        });
        helper.setState(newState);
        helper.recommendState = cleanedRecommendState;
        if (localWidgets.length) {
          localInstantSearchInstance.scheduleSearch();
        }
      }
      return this;
    },
    init: function init(_ref2) {
      var _this3 = this, _instantSearchInstanc;
      var instantSearchInstance = _ref2.instantSearchInstance, parent = _ref2.parent, uiState = _ref2.uiState;
      if (helper !== null) {
        return;
      }
      localInstantSearchInstance = instantSearchInstance;
      localParent = parent;
      localUiState = uiState[indexId] || {};
      var mainHelper = instantSearchInstance.mainHelper;
      var parameters = getLocalWidgetsSearchParameters(localWidgets, {
        uiState: localUiState,
        initialSearchParameters: new import_algoliasearch_helper3.default.SearchParameters({
          index: indexName
        })
      });
      var recommendParameters = getLocalWidgetsRecommendParameters(localWidgets, {
        uiState: localUiState,
        initialRecommendParameters: new import_algoliasearch_helper3.default.RecommendParameters()
      });
      helper = (0, import_algoliasearch_helper3.default)({}, parameters.index, parameters);
      helper.recommendState = recommendParameters;
      helper.search = function() {
        if (instantSearchInstance.onStateChange) {
          instantSearchInstance.onStateChange({
            uiState: instantSearchInstance.mainIndex.getWidgetUiState({}),
            setUiState: function setUiState(nextState) {
              return instantSearchInstance.setUiState(nextState, false);
            }
          });
          return mainHelper;
        }
        return mainHelper.search();
      };
      helper.searchWithoutTriggeringOnStateChange = function() {
        return mainHelper.search();
      };
      helper.searchForFacetValues = function(facetName, facetValue, maxFacetHits, userState) {
        var state = helper.state.setQueryParameters(userState);
        return mainHelper.searchForFacetValues(facetName, facetValue, maxFacetHits, state);
      };
      derivedHelper = mainHelper.derive(function() {
        return mergeSearchParameters.apply(void 0, [mainHelper.state].concat(_toConsumableArray10(resolveSearchParameters(_this3))));
      }, function() {
        return _this3.getHelper().recommendState;
      });
      var indexInitialResults = (_instantSearchInstanc = instantSearchInstance._initialResults) === null || _instantSearchInstanc === void 0 ? void 0 : _instantSearchInstanc[this.getIndexId()];
      if (indexInitialResults !== null && indexInitialResults !== void 0 && indexInitialResults.results) {
        var results = new import_algoliasearch_helper3.default.SearchResults(new import_algoliasearch_helper3.default.SearchParameters(indexInitialResults.state), indexInitialResults.results);
        derivedHelper.lastResults = results;
        helper.lastResults = results;
      }
      if (indexInitialResults !== null && indexInitialResults !== void 0 && indexInitialResults.recommendResults) {
        var recommendResults = new import_algoliasearch_helper3.default.RecommendResults(new import_algoliasearch_helper3.default.RecommendParameters({
          params: indexInitialResults.recommendResults.params
        }), indexInitialResults.recommendResults.results);
        derivedHelper.lastRecommendResults = recommendResults;
        helper.lastRecommendResults = recommendResults;
      }
      helper.on("change", function(_ref3) {
        var isPageReset = _ref3.isPageReset;
        if (isPageReset) {
          resetPageFromWidgets(localWidgets);
        }
      });
      derivedHelper.on("search", function() {
        instantSearchInstance.scheduleStalledRender();
        if (true) {
          checkIndexUiState({
            index: _this3,
            indexUiState: localUiState
          });
        }
      });
      derivedHelper.on("result", function(_ref4) {
        var results2 = _ref4.results;
        instantSearchInstance.scheduleRender();
        helper.lastResults = results2;
        lastValidSearchParameters = results2 === null || results2 === void 0 ? void 0 : results2._state;
      });
      derivedHelper.on("recommend:result", function(_ref5) {
        var recommend = _ref5.recommend;
        instantSearchInstance.scheduleRender();
        helper.lastRecommendResults = recommend.results;
      });
      localWidgets.forEach(function(widget) {
        if (widget.getRenderState) {
          var renderState = widget.getRenderState(instantSearchInstance.renderState[_this3.getIndexId()] || {}, createInitArgs(instantSearchInstance, _this3, uiState));
          storeRenderState({
            renderState,
            instantSearchInstance,
            parent: _this3
          });
        }
      });
      localWidgets.forEach(function(widget) {
        true ? _warning(
          // if it has NO getWidgetState or if it has getWidgetUiState, we don't warn
          // aka we warn if there's _only_ getWidgetState
          !widget.getWidgetState || Boolean(widget.getWidgetUiState),
          "The `getWidgetState` method is renamed `getWidgetUiState` and will no longer exist under that name in InstantSearch.js 5.x. Please use `getWidgetUiState` instead."
        ) : void 0;
        if (widget.init) {
          widget.init(createInitArgs(instantSearchInstance, _this3, uiState));
        }
      });
      helper.on("change", function(event) {
        var state = event.state;
        var _uiState = event._uiState;
        localUiState = getLocalWidgetsUiState(localWidgets, {
          searchParameters: state,
          helper
        }, _uiState || {});
        if (!instantSearchInstance.onStateChange) {
          instantSearchInstance.onInternalStateChange();
        }
      });
      if (indexInitialResults) {
        instantSearchInstance.scheduleRender();
      }
      if (hasRecommendWidget) {
        instantSearchInstance._hasRecommendWidget = true;
      }
      if (hasSearchWidget) {
        instantSearchInstance._hasSearchWidget = true;
      }
    },
    render: function render(_ref6) {
      var _derivedHelper2, _this4 = this;
      var instantSearchInstance = _ref6.instantSearchInstance;
      if (instantSearchInstance.status === "error" && !instantSearchInstance.mainHelper.hasPendingRequests() && lastValidSearchParameters) {
        helper.setState(lastValidSearchParameters);
      }
      var widgetsToRender = this.getResults() || (_derivedHelper2 = derivedHelper) !== null && _derivedHelper2 !== void 0 && _derivedHelper2.lastRecommendResults ? localWidgets : localWidgets.filter(isIndexWidget);
      widgetsToRender = widgetsToRender.filter(function(widget) {
        if (!widget.shouldRender) {
          return true;
        }
        return widget.shouldRender({
          instantSearchInstance
        });
      });
      widgetsToRender.forEach(function(widget) {
        if (widget.getRenderState) {
          var renderState = widget.getRenderState(instantSearchInstance.renderState[_this4.getIndexId()] || {}, createRenderArgs(instantSearchInstance, _this4, widget));
          storeRenderState({
            renderState,
            instantSearchInstance,
            parent: _this4
          });
        }
      });
      widgetsToRender.forEach(function(widget) {
        if (widget.render) {
          widget.render(createRenderArgs(instantSearchInstance, _this4, widget));
        }
      });
    },
    dispose: function dispose() {
      var _this5 = this, _helper2, _derivedHelper3;
      localWidgets.forEach(function(widget) {
        if (widget.dispose && helper) {
          widget.dispose({
            helper,
            state: helper.state,
            recommendState: helper.recommendState,
            parent: _this5
          });
        }
      });
      localInstantSearchInstance = null;
      localParent = null;
      (_helper2 = helper) === null || _helper2 === void 0 ? void 0 : _helper2.removeAllListeners();
      helper = null;
      (_derivedHelper3 = derivedHelper) === null || _derivedHelper3 === void 0 ? void 0 : _derivedHelper3.detach();
      derivedHelper = null;
    },
    getWidgetUiState: function getWidgetUiState(uiState) {
      return localWidgets.filter(isIndexWidget).reduce(function(previousUiState, innerIndex) {
        return innerIndex.getWidgetUiState(previousUiState);
      }, _objectSpread37(_objectSpread37({}, uiState), {}, _defineProperty39({}, indexId, _objectSpread37(_objectSpread37({}, uiState[indexId]), localUiState))));
    },
    getWidgetState: function getWidgetState(uiState) {
      true ? _warning(false, "The `getWidgetState` method is renamed `getWidgetUiState` and will no longer exist under that name in InstantSearch.js 5.x. Please use `getWidgetUiState` instead.") : void 0;
      return this.getWidgetUiState(uiState);
    },
    getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref7) {
      var uiState = _ref7.uiState;
      return getLocalWidgetsSearchParameters(localWidgets, {
        uiState,
        initialSearchParameters: searchParameters
      });
    },
    refreshUiState: function refreshUiState() {
      localUiState = getLocalWidgetsUiState(localWidgets, {
        searchParameters: this.getHelper().state,
        helper: this.getHelper()
      }, localUiState);
    },
    setIndexUiState: function setIndexUiState(indexUiState) {
      var nextIndexUiState = typeof indexUiState === "function" ? indexUiState(localUiState) : indexUiState;
      localInstantSearchInstance.setUiState(function(state) {
        return _objectSpread37(_objectSpread37({}, state), {}, _defineProperty39({}, indexId, nextIndexUiState));
      });
    }
  };
};
var index_default = index;
function storeRenderState(_ref8) {
  var renderState = _ref8.renderState, instantSearchInstance = _ref8.instantSearchInstance, parent = _ref8.parent;
  var parentIndexName = parent ? parent.getIndexId() : instantSearchInstance.mainIndex.getIndexId();
  instantSearchInstance.renderState = _objectSpread37(_objectSpread37({}, instantSearchInstance.renderState), {}, _defineProperty39({}, parentIndexName, _objectSpread37(_objectSpread37({}, instantSearchInstance.renderState[parentIndexName]), renderState)));
}

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/Index.js
var Index_default = { name: "AisIndex", mixins: [t({ name: "Index" }), n3({ connector: function() {
  return index_default;
} }, { $$widgetType: "ais.index" })], provide: function() {
  var e6 = this;
  return { $_ais_getParentIndex: function() {
    return e6.widget;
  } };
}, props: { indexName: { type: String, required: true }, indexId: { type: String, required: false } }, render: n(function(e6) {
  return e6("div", {}, s(this));
}), computed: { widgetParams: function() {
  return { indexName: this.indexName, indexId: this.indexId };
} } };

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/lib/suit.js
var NAMESPACE = "ais";
var component = function component2(componentName) {
  return function() {
    var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, descendantName = _ref.descendantName, modifierName = _ref.modifierName;
    var descendent = descendantName ? "-".concat(descendantName) : "";
    var modifier = modifierName ? "--".concat(modifierName) : "";
    return "".concat(NAMESPACE, "-").concat(componentName).concat(descendent).concat(modifier);
  };
};

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/helpers/highlight.js
var suit = component("Highlight");
function highlight(_ref) {
  var attribute = _ref.attribute, _ref$highlightedTagNa = _ref.highlightedTagName, highlightedTagName = _ref$highlightedTagNa === void 0 ? "mark" : _ref$highlightedTagNa, hit = _ref.hit, _ref$cssClasses = _ref.cssClasses, cssClasses = _ref$cssClasses === void 0 ? {} : _ref$cssClasses;
  true ? _warning(false, "`instantsearch.highlight` function has been deprecated. It is still supported in 4.x releases, but not further. It is replaced by the `Highlight` component.\n\nFor more information, visit https://www.algolia.com/doc/guides/building-search-ui/upgrade-guides/js/?client=html+tagged+templates#upgrade-templates") : void 0;
  var highlightAttributeResult = getPropertyByPath(hit._highlightResult, attribute);
  true ? _warning(highlightAttributeResult, 'Could not enable highlight for "'.concat(attribute, '", will display an empty string.\nPlease check whether this attribute exists and is either searchable or specified in `attributesToHighlight`.\n\nSee: https://alg.li/highlighting\n')) : void 0;
  var _ref2 = highlightAttributeResult || {}, _ref2$value = _ref2.value, attributeValue = _ref2$value === void 0 ? "" : _ref2$value;
  var className = suit({
    descendantName: "highlighted"
  }) + (cssClasses.highlighted ? " ".concat(cssClasses.highlighted) : "");
  return attributeValue.replace(new RegExp(TAG_REPLACEMENT.highlightPreTag, "g"), "<".concat(highlightedTagName, ' class="').concat(className, '">')).replace(new RegExp(TAG_REPLACEMENT.highlightPostTag, "g"), "</".concat(highlightedTagName, ">"));
}

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/helpers/reverseHighlight.js
var suit2 = component("ReverseHighlight");
function reverseHighlight(_ref) {
  var attribute = _ref.attribute, _ref$highlightedTagNa = _ref.highlightedTagName, highlightedTagName = _ref$highlightedTagNa === void 0 ? "mark" : _ref$highlightedTagNa, hit = _ref.hit, _ref$cssClasses = _ref.cssClasses, cssClasses = _ref$cssClasses === void 0 ? {} : _ref$cssClasses;
  true ? _warning(false, "`instantsearch.reverseHighlight` function has been deprecated. It is still supported in 4.x releases, but not further. It is replaced by the `ReverseHighlight` component.\n\nFor more information, visit https://www.algolia.com/doc/guides/building-search-ui/upgrade-guides/js/?client=html+tagged+templates#upgrade-templates") : void 0;
  var highlightAttributeResult = getPropertyByPath(hit._highlightResult, attribute);
  true ? _warning(highlightAttributeResult, 'Could not enable reverse highlight for "'.concat(attribute, '", will display an empty string.\nPlease check whether this attribute exists and is either searchable or specified in `attributesToHighlight`.\n\nSee: https://alg.li/highlighting\n')) : void 0;
  var _ref2 = highlightAttributeResult || {}, _ref2$value = _ref2.value, attributeValue = _ref2$value === void 0 ? "" : _ref2$value;
  var className = suit2({
    descendantName: "highlighted"
  }) + (cssClasses.highlighted ? " ".concat(cssClasses.highlighted) : "");
  var reverseHighlightedValue = concatHighlightedParts(reverseHighlightedParts(getHighlightedParts(attributeValue)));
  return reverseHighlightedValue.replace(new RegExp(TAG_REPLACEMENT.highlightPreTag, "g"), "<".concat(highlightedTagName, ' class="').concat(className, '">')).replace(new RegExp(TAG_REPLACEMENT.highlightPostTag, "g"), "</".concat(highlightedTagName, ">"));
}

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/helpers/snippet.js
var suit3 = component("Snippet");
function snippet(_ref) {
  var attribute = _ref.attribute, _ref$highlightedTagNa = _ref.highlightedTagName, highlightedTagName = _ref$highlightedTagNa === void 0 ? "mark" : _ref$highlightedTagNa, hit = _ref.hit, _ref$cssClasses = _ref.cssClasses, cssClasses = _ref$cssClasses === void 0 ? {} : _ref$cssClasses;
  true ? _warning(false, "`instantsearch.snippet` function has been deprecated. It is still supported in 4.x releases, but not further. It is replaced by the `Snippet` component.\n\nFor more information, visit https://www.algolia.com/doc/guides/building-search-ui/upgrade-guides/js/?client=html+tagged+templates#upgrade-templates") : void 0;
  var snippetAttributeResult = getPropertyByPath(hit._snippetResult, attribute);
  true ? _warning(snippetAttributeResult, 'Could not enable snippet for "'.concat(attribute, '", will display an empty string.\nPlease check whether this attribute exists and is specified in `attributesToSnippet`.\n\nSee: https://alg.li/highlighting\n')) : void 0;
  var _ref2 = snippetAttributeResult || {}, _ref2$value = _ref2.value, attributeValue = _ref2$value === void 0 ? "" : _ref2$value;
  var className = suit3({
    descendantName: "highlighted"
  }) + (cssClasses.highlighted ? " ".concat(cssClasses.highlighted) : "");
  return attributeValue.replace(new RegExp(TAG_REPLACEMENT.highlightPreTag, "g"), "<".concat(highlightedTagName, ' class="').concat(className, '">')).replace(new RegExp(TAG_REPLACEMENT.highlightPostTag, "g"), "</".concat(highlightedTagName, ">"));
}

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/helpers/reverseSnippet.js
var suit4 = component("ReverseSnippet");
function reverseSnippet(_ref) {
  var attribute = _ref.attribute, _ref$highlightedTagNa = _ref.highlightedTagName, highlightedTagName = _ref$highlightedTagNa === void 0 ? "mark" : _ref$highlightedTagNa, hit = _ref.hit, _ref$cssClasses = _ref.cssClasses, cssClasses = _ref$cssClasses === void 0 ? {} : _ref$cssClasses;
  true ? _warning(false, "`instantsearch.reverseSnippet` function has been deprecated. It is still supported in 4.x releases, but not further. It is replaced by the `ReverseSnippet` component.\n\nFor more information, visit https://www.algolia.com/doc/guides/building-search-ui/upgrade-guides/js/?client=html+tagged+templates#upgrade-templates") : void 0;
  var snippetAttributeResult = getPropertyByPath(hit._snippetResult, attribute);
  true ? _warning(snippetAttributeResult, 'Could not enable reverse snippet for "'.concat(attribute, '", will display an empty string.\nPlease check whether this attribute exists and is specified in `attributesToSnippet`.\n\nSee: https://alg.li/highlighting\n')) : void 0;
  var _ref2 = snippetAttributeResult || {}, _ref2$value = _ref2.value, attributeValue = _ref2$value === void 0 ? "" : _ref2$value;
  var className = suit4({
    descendantName: "highlighted"
  }) + (cssClasses.highlighted ? " ".concat(cssClasses.highlighted) : "");
  var reverseHighlightedValue = concatHighlightedParts(reverseHighlightedParts(getHighlightedParts(attributeValue)));
  return reverseHighlightedValue.replace(new RegExp(TAG_REPLACEMENT.highlightPreTag, "g"), "<".concat(highlightedTagName, ' class="').concat(className, '">')).replace(new RegExp(TAG_REPLACEMENT.highlightPostTag, "g"), "</".concat(highlightedTagName, ">"));
}

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/helpers/get-insights-anonymous-user-token.js
function _typeof42(o12) {
  "@babel/helpers - typeof";
  return _typeof42 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o13) {
    return typeof o13;
  } : function(o13) {
    return o13 && "function" == typeof Symbol && o13.constructor === Symbol && o13 !== Symbol.prototype ? "symbol" : typeof o13;
  }, _typeof42(o12);
}
var ANONYMOUS_TOKEN_COOKIE_KEY = "_ALGOLIA";
function getCookie(name) {
  if ((typeof document === "undefined" ? "undefined" : _typeof42(document)) !== "object" || typeof document.cookie !== "string") {
    return void 0;
  }
  var prefix = "".concat(name, "=");
  var cookies = document.cookie.split(";");
  for (var i6 = 0; i6 < cookies.length; i6++) {
    var cookie = cookies[i6];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(prefix) === 0) {
      return cookie.substring(prefix.length, cookie.length);
    }
  }
  return void 0;
}
function getInsightsAnonymousUserTokenInternal() {
  return getCookie(ANONYMOUS_TOKEN_COOKIE_KEY);
}
function getInsightsAnonymousUserToken() {
  true ? _warning(false, "`getInsightsAnonymousUserToken` function has been deprecated. It is still supported in 4.x releases, but not further. It is replaced by the `insights` middleware.\n\nFor more information, visit https://www.algolia.com/doc/guides/getting-insights-and-analytics/search-analytics/click-through-and-conversions/how-to/send-click-and-conversion-events-with-instantsearch/js/") : void 0;
  return getInsightsAnonymousUserTokenInternal();
}

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/lib/infiniteHitsCache/sessionStorage.js
var _excluded9 = ["page"];
function _objectWithoutProperties8(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose8(source, excluded);
  var key, i6;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i6 = 0; i6 < sourceSymbolKeys.length; i6++) {
      key = sourceSymbolKeys[i6];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose8(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i6;
  for (i6 = 0; i6 < sourceKeys.length; i6++) {
    key = sourceKeys[i6];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function getStateWithoutPage2(state) {
  var _ref = state || {}, page = _ref.page, rest = _objectWithoutProperties8(_ref, _excluded9);
  return rest;
}
function createInfiniteHitsSessionStorageCache() {
  var _ref2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, key = _ref2.key;
  var KEY = ["ais.infiniteHits", key].filter(Boolean).join(":");
  return {
    read: function read(_ref3) {
      var state = _ref3.state;
      var sessionStorage = safelyRunOnBrowser(function(_ref4) {
        var window2 = _ref4.window;
        return window2.sessionStorage;
      });
      if (!sessionStorage) {
        return null;
      }
      try {
        var cache = JSON.parse(
          // @ts-expect-error JSON.parse() requires a string, but it actually accepts null, too.
          sessionStorage.getItem(KEY)
        );
        return cache && isEqual(cache.state, getStateWithoutPage2(state)) ? cache.hits : null;
      } catch (error) {
        if (error instanceof SyntaxError) {
          try {
            sessionStorage.removeItem(KEY);
          } catch (err) {
          }
        }
        return null;
      }
    },
    write: function write(_ref5) {
      var state = _ref5.state, hits = _ref5.hits;
      var sessionStorage = safelyRunOnBrowser(function(_ref6) {
        var window2 = _ref6.window;
        return window2.sessionStorage;
      });
      if (!sessionStorage) {
        return;
      }
      try {
        sessionStorage.setItem(KEY, JSON.stringify({
          state: getStateWithoutPage2(state),
          hits
        }));
      } catch (error) {
      }
    }
  };
}

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/lib/InstantSearch.js
var import_events = __toESM(require_events(), 1);
var import_algoliasearch_helper4 = __toESM(require_algoliasearch_helper2(), 1);

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/lib/utils/uuid.js
function createUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c14) {
    var r7 = Math.random() * 16 | 0;
    var v6 = c14 === "x" ? r7 : r7 & 3 | 8;
    return v6.toString(16);
  });
}

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/middlewares/createInsightsMiddleware.js
function _typeof43(o12) {
  "@babel/helpers - typeof";
  return _typeof43 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o13) {
    return typeof o13;
  } : function(o13) {
    return o13 && "function" == typeof Symbol && o13.constructor === Symbol && o13 !== Symbol.prototype ? "symbol" : typeof o13;
  }, _typeof43(o12);
}
function ownKeys38(e6, r7) {
  var t4 = Object.keys(e6);
  if (Object.getOwnPropertySymbols) {
    var o12 = Object.getOwnPropertySymbols(e6);
    r7 && (o12 = o12.filter(function(r8) {
      return Object.getOwnPropertyDescriptor(e6, r8).enumerable;
    })), t4.push.apply(t4, o12);
  }
  return t4;
}
function _objectSpread38(e6) {
  for (var r7 = 1; r7 < arguments.length; r7++) {
    var t4 = null != arguments[r7] ? arguments[r7] : {};
    r7 % 2 ? ownKeys38(Object(t4), true).forEach(function(r8) {
      _defineProperty40(e6, r8, t4[r8]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e6, Object.getOwnPropertyDescriptors(t4)) : ownKeys38(Object(t4)).forEach(function(r8) {
      Object.defineProperty(e6, r8, Object.getOwnPropertyDescriptor(t4, r8));
    });
  }
  return e6;
}
function _defineProperty40(obj, key, value) {
  key = _toPropertyKey39(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey39(t4) {
  var i6 = _toPrimitive39(t4, "string");
  return "symbol" == _typeof43(i6) ? i6 : String(i6);
}
function _toPrimitive39(t4, r7) {
  if ("object" != _typeof43(t4) || !t4) return t4;
  var e6 = t4[Symbol.toPrimitive];
  if (void 0 !== e6) {
    var i6 = e6.call(t4, r7 || "default");
    if ("object" != _typeof43(i6)) return i6;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r7 ? String : Number)(t4);
}
function _slicedToArray12(arr, i6) {
  return _arrayWithHoles12(arr) || _iterableToArrayLimit12(arr, i6) || _unsupportedIterableToArray20(arr, i6) || _nonIterableRest12();
}
function _nonIterableRest12() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArrayLimit12(r7, l4) {
  var t4 = null == r7 ? null : "undefined" != typeof Symbol && r7[Symbol.iterator] || r7["@@iterator"];
  if (null != t4) {
    var e6, n6, i6, u5, a6 = [], f12 = true, o12 = false;
    try {
      if (i6 = (t4 = t4.call(r7)).next, 0 === l4) {
        if (Object(t4) !== t4) return;
        f12 = false;
      } else for (; !(f12 = (e6 = i6.call(t4)).done) && (a6.push(e6.value), a6.length !== l4); f12 = true) ;
    } catch (r8) {
      o12 = true, n6 = r8;
    } finally {
      try {
        if (!f12 && null != t4.return && (u5 = t4.return(), Object(u5) !== u5)) return;
      } finally {
        if (o12) throw n6;
      }
    }
    return a6;
  }
}
function _arrayWithHoles12(arr) {
  if (Array.isArray(arr)) return arr;
}
function _toConsumableArray11(arr) {
  return _arrayWithoutHoles11(arr) || _iterableToArray11(arr) || _unsupportedIterableToArray20(arr) || _nonIterableSpread11();
}
function _nonIterableSpread11() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray20(o12, minLen) {
  if (!o12) return;
  if (typeof o12 === "string") return _arrayLikeToArray20(o12, minLen);
  var n6 = Object.prototype.toString.call(o12).slice(8, -1);
  if (n6 === "Object" && o12.constructor) n6 = o12.constructor.name;
  if (n6 === "Map" || n6 === "Set") return Array.from(o12);
  if (n6 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n6)) return _arrayLikeToArray20(o12, minLen);
}
function _iterableToArray11(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles11(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray20(arr);
}
function _arrayLikeToArray20(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i6 = 0, arr2 = new Array(len); i6 < len; i6++) arr2[i6] = arr[i6];
  return arr2;
}
var ALGOLIA_INSIGHTS_VERSION = "2.17.2";
var ALGOLIA_INSIGHTS_SRC = "https://cdn.jsdelivr.net/npm/search-insights@".concat(ALGOLIA_INSIGHTS_VERSION, "/dist/search-insights.min.js");
function createInsightsMiddleware() {
  var props = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  var _insightsClient = props.insightsClient, insightsInitParams = props.insightsInitParams, onEvent = props.onEvent, _props$$$internal = props.$$internal, $$internal = _props$$$internal === void 0 ? false : _props$$$internal, _props$$$automatic = props.$$automatic, $$automatic = _props$$$automatic === void 0 ? false : _props$$$automatic;
  var potentialInsightsClient = _insightsClient;
  if (!_insightsClient && _insightsClient !== null) {
    safelyRunOnBrowser(function(_ref) {
      var window2 = _ref.window;
      var pointer = window2.AlgoliaAnalyticsObject || "aa";
      if (typeof pointer === "string") {
        potentialInsightsClient = window2[pointer];
      }
      if (!potentialInsightsClient) {
        window2.AlgoliaAnalyticsObject = pointer;
        if (!window2[pointer]) {
          window2[pointer] = function() {
            if (!window2[pointer].queue) {
              window2[pointer].queue = [];
            }
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }
            window2[pointer].queue.push(args);
          };
          window2[pointer].version = ALGOLIA_INSIGHTS_VERSION;
          window2[pointer].shouldAddScript = true;
        }
        potentialInsightsClient = window2[pointer];
      }
    });
  }
  var insightsClient = potentialInsightsClient || noop;
  return function(_ref2) {
    var instantSearchInstance = _ref2.instantSearchInstance;
    var existingInsightsMiddlewares = instantSearchInstance.middleware.filter(function(m12) {
      return m12.instance.$$type === "ais.insights" && m12.instance.$$internal;
    }).map(function(m12) {
      return m12.creator;
    });
    instantSearchInstance.unuse.apply(instantSearchInstance, _toConsumableArray11(existingInsightsMiddlewares));
    var _getAppIdAndApiKey = getAppIdAndApiKey(instantSearchInstance.client), _getAppIdAndApiKey2 = _slicedToArray12(_getAppIdAndApiKey, 2), appId = _getAppIdAndApiKey2[0], apiKey = _getAppIdAndApiKey2[1];
    true ? _warning(Boolean(appId && apiKey), "could not extract Algolia credentials from searchClient in insights middleware.") : void 0;
    var queuedInitParams = void 0;
    var queuedUserToken = void 0;
    var userTokenBeforeInit = void 0;
    var queue = insightsClient.queue;
    if (Array.isArray(queue)) {
      var _map = ["setUserToken", "init"].map(function(key) {
        var _ref3 = find(queue.slice().reverse(), function(_ref5) {
          var _ref6 = _slicedToArray12(_ref5, 1), method = _ref6[0];
          return method === key;
        }) || [], _ref4 = _slicedToArray12(_ref3, 2), value = _ref4[1];
        return value;
      });
      var _map2 = _slicedToArray12(_map, 2);
      queuedUserToken = _map2[0];
      queuedInitParams = _map2[1];
    }
    insightsClient("getUserToken", null, function(_error, userToken) {
      userTokenBeforeInit = normalizeUserToken(userToken);
    });
    if (insightsInitParams || !isModernInsightsClient(insightsClient)) {
      insightsClient("init", _objectSpread38({
        appId,
        apiKey,
        partial: true
      }, insightsInitParams));
    }
    var initialParameters;
    var helper;
    return {
      $$type: "ais.insights",
      $$internal,
      $$automatic,
      onStateChange: function onStateChange() {
      },
      subscribe: function subscribe() {
        if (!insightsClient.shouldAddScript) return;
        var errorMessage = "[insights middleware]: could not load search-insights.js. Please load it manually following https://alg.li/insights-init";
        try {
          var script = document.createElement("script");
          script.async = true;
          script.src = ALGOLIA_INSIGHTS_SRC;
          script.onerror = function() {
            instantSearchInstance.emit("error", new Error(errorMessage));
          };
          document.body.appendChild(script);
          insightsClient.shouldAddScript = false;
        } catch (cause) {
          insightsClient.shouldAddScript = false;
          instantSearchInstance.emit("error", new Error(errorMessage));
        }
      },
      started: function started() {
        insightsClient("addAlgoliaAgent", "insights-middleware");
        helper = instantSearchInstance.mainHelper;
        var queueAtStart = insightsClient.queue;
        if (Array.isArray(queueAtStart)) {
          var _map3 = ["setUserToken", "init"].map(function(key) {
            var _ref7 = find(queueAtStart.slice().reverse(), function(_ref9) {
              var _ref10 = _slicedToArray12(_ref9, 1), method = _ref10[0];
              return method === key;
            }) || [], _ref8 = _slicedToArray12(_ref7, 2), value = _ref8[1];
            return value;
          });
          var _map4 = _slicedToArray12(_map3, 2);
          queuedUserToken = _map4[0];
          queuedInitParams = _map4[1];
        }
        initialParameters = getInitialParameters(instantSearchInstance);
        if (!$$automatic) {
          helper.overrideStateWithoutTriggeringChangeEvent(_objectSpread38(_objectSpread38({}, helper.state), {}, {
            clickAnalytics: true
          }));
        }
        if (!$$internal) {
          instantSearchInstance.scheduleSearch();
        }
        var setUserTokenToSearch = function setUserTokenToSearch2(userToken) {
          var immediate = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
          var normalizedUserToken = normalizeUserToken(userToken);
          if (!normalizedUserToken) {
            return;
          }
          var existingToken = helper.state.userToken;
          function applyToken() {
            helper.overrideStateWithoutTriggeringChangeEvent(_objectSpread38(_objectSpread38({}, helper.state), {}, {
              userToken: normalizedUserToken
            }));
            if (existingToken && existingToken !== userToken) {
              instantSearchInstance.scheduleSearch();
            }
          }
          if (!immediate) {
            setTimeout(applyToken, 0);
          } else {
            applyToken();
          }
        };
        function setUserToken(token2) {
          setUserTokenToSearch(token2, true);
          insightsClient("setUserToken", token2);
        }
        var anonymousUserToken = void 0;
        var anonymousTokenFromInsights = getInsightsAnonymousUserTokenInternal();
        if (anonymousTokenFromInsights) {
          anonymousUserToken = anonymousTokenFromInsights;
        } else {
          var token = "anonymous-".concat(createUUID());
          anonymousUserToken = token;
        }
        var userTokenFromInit;
        var tokenFromSearchParameters = initialParameters.userToken;
        if (insightsInitParams !== null && insightsInitParams !== void 0 && insightsInitParams.userToken) {
          userTokenFromInit = insightsInitParams.userToken;
        }
        if (userTokenFromInit) {
          setUserToken(userTokenFromInit);
        } else if (tokenFromSearchParameters) {
          setUserToken(tokenFromSearchParameters);
        } else if (userTokenBeforeInit) {
          setUserToken(userTokenBeforeInit);
        } else if (queuedUserToken) {
          setUserToken(queuedUserToken);
        } else if (anonymousUserToken) {
          var _queuedInitParams;
          setUserToken(anonymousUserToken);
          if (insightsInitParams !== null && insightsInitParams !== void 0 && insightsInitParams.useCookie || (_queuedInitParams = queuedInitParams) !== null && _queuedInitParams !== void 0 && _queuedInitParams.useCookie) {
            var _queuedInitParams2;
            saveTokenAsCookie(anonymousUserToken, (insightsInitParams === null || insightsInitParams === void 0 ? void 0 : insightsInitParams.cookieDuration) || ((_queuedInitParams2 = queuedInitParams) === null || _queuedInitParams2 === void 0 ? void 0 : _queuedInitParams2.cookieDuration));
          }
        }
        insightsClient("onUserTokenChange", function(token2) {
          return setUserTokenToSearch(token2, true);
        }, {
          immediate: true
        });
        var insightsClientWithLocalCredentials = insightsClient;
        if (isModernInsightsClient(insightsClient)) {
          insightsClientWithLocalCredentials = function insightsClientWithLocalCredentials2(method, payload) {
            var extraParams = {
              headers: {
                "X-Algolia-Application-Id": appId,
                "X-Algolia-API-Key": apiKey
              }
            };
            return insightsClient(method, payload, extraParams);
          };
        }
        var viewedObjectIDs = /* @__PURE__ */ new Set();
        var lastQueryId;
        instantSearchInstance.mainHelper.derivedHelpers[0].on("result", function(_ref11) {
          var results = _ref11.results;
          if (results && (!results.queryID || results.queryID !== lastQueryId)) {
            lastQueryId = results.queryID;
            viewedObjectIDs.clear();
          }
        });
        instantSearchInstance.sendEventToInsights = function(event) {
          if (onEvent) {
            onEvent(event, insightsClientWithLocalCredentials);
          } else if (event.insightsMethod) {
            if (event.insightsMethod === "viewedObjectIDs") {
              var _payload = event.payload;
              var difference = _payload.objectIDs.filter(function(objectID) {
                return !viewedObjectIDs.has(objectID);
              });
              if (difference.length === 0) {
                return;
              }
              difference.forEach(function(objectID) {
                return viewedObjectIDs.add(objectID);
              });
              _payload.objectIDs = difference;
            }
            event.payload.algoliaSource = ["instantsearch"];
            if ($$automatic) {
              event.payload.algoliaSource.push("instantsearch-automatic");
            }
            if (event.eventModifier === "internal") {
              event.payload.algoliaSource.push("instantsearch-internal");
            }
            insightsClientWithLocalCredentials(event.insightsMethod, event.payload);
            true ? _warning(Boolean(helper.state.userToken), "\nCannot send event to Algolia Insights because `userToken` is not set.\n\nSee documentation: https://www.algolia.com/doc/guides/building-search-ui/going-further/send-insights-events/js/#setting-the-usertoken\n") : void 0;
          } else {
            true ? _warning(false, "Cannot send event to Algolia Insights because `insightsMethod` option is missing.") : void 0;
          }
        };
      },
      unsubscribe: function unsubscribe() {
        insightsClient("onUserTokenChange", void 0);
        instantSearchInstance.sendEventToInsights = noop;
        if (helper && initialParameters) {
          helper.overrideStateWithoutTriggeringChangeEvent(_objectSpread38(_objectSpread38({}, helper.state), initialParameters));
          instantSearchInstance.scheduleSearch();
        }
      }
    };
  };
}
function getInitialParameters(instantSearchInstance) {
  var _instantSearchInstanc, _instantSearchInstanc2;
  var stateFromInitialResults = ((_instantSearchInstanc = instantSearchInstance._initialResults) === null || _instantSearchInstanc === void 0 ? void 0 : (_instantSearchInstanc2 = _instantSearchInstanc[instantSearchInstance.indexName]) === null || _instantSearchInstanc2 === void 0 ? void 0 : _instantSearchInstanc2.state) || {};
  var stateFromHelper = instantSearchInstance.mainHelper.state;
  return {
    userToken: stateFromInitialResults.userToken || stateFromHelper.userToken,
    clickAnalytics: stateFromInitialResults.clickAnalytics || stateFromHelper.clickAnalytics
  };
}
function saveTokenAsCookie(token, cookieDuration) {
  var MONTH = 30 * 24 * 60 * 60 * 1e3;
  var d8 = /* @__PURE__ */ new Date();
  d8.setTime(d8.getTime() + (cookieDuration || MONTH * 6));
  var expires = "expires=".concat(d8.toUTCString());
  document.cookie = "_ALGOLIA=".concat(token, ";").concat(expires, ";path=/");
}
function isModernInsightsClient(client) {
  var _split$map = (client.version || "").split(".").map(Number), _split$map2 = _slicedToArray12(_split$map, 2), major = _split$map2[0], minor = _split$map2[1];
  var v32 = major >= 3;
  var v2_6 = major === 2 && minor >= 6;
  var v1_10 = major === 1 && minor >= 10;
  return v32 || v2_6 || v1_10;
}
function normalizeUserToken(userToken) {
  if (!userToken) {
    return void 0;
  }
  return typeof userToken === "number" ? userToken.toString() : userToken;
}

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/middlewares/createMetadataMiddleware.js
function extractWidgetPayload(widgets, instantSearchInstance, payload) {
  var initOptions = createInitArgs(instantSearchInstance, instantSearchInstance.mainIndex, instantSearchInstance._initialUiState);
  widgets.forEach(function(widget) {
    var widgetParams = {};
    if (widget.getWidgetRenderState) {
      var renderState = widget.getWidgetRenderState(initOptions);
      if (renderState && renderState.widgetParams) {
        widgetParams = renderState.widgetParams;
      }
    }
    var params = Object.keys(widgetParams).filter(function(key) {
      return widgetParams[key] !== void 0;
    });
    payload.widgets.push({
      type: widget.$$type,
      widgetType: widget.$$widgetType,
      params
    });
    if (widget.$$type === "ais.index") {
      extractWidgetPayload(widget.getWidgets(), instantSearchInstance, payload);
    }
  });
}
function isMetadataEnabled() {
  return safelyRunOnBrowser(function(_ref) {
    var _window$navigator, _window$navigator$use;
    var window2 = _ref.window;
    return ((_window$navigator = window2.navigator) === null || _window$navigator === void 0 ? void 0 : (_window$navigator$use = _window$navigator.userAgent) === null || _window$navigator$use === void 0 ? void 0 : _window$navigator$use.indexOf("Algolia Crawler")) > -1;
  }, {
    fallback: function fallback() {
      return false;
    }
  });
}
function createMetadataMiddleware() {
  var _ref2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, _ref2$$$internal = _ref2.$$internal, $$internal = _ref2$$$internal === void 0 ? false : _ref2$$$internal;
  return function(_ref3) {
    var instantSearchInstance = _ref3.instantSearchInstance;
    var payload = {
      widgets: []
    };
    var payloadContainer = document.createElement("meta");
    var refNode = document.querySelector("head");
    payloadContainer.name = "instantsearch:widgets";
    return {
      $$type: "ais.metadata",
      $$internal,
      onStateChange: function onStateChange() {
      },
      subscribe: function subscribe() {
        setTimeout(function() {
          var client = instantSearchInstance.client;
          payload.ua = client.transporter && client.transporter.userAgent ? client.transporter.userAgent.value : client._ua;
          extractWidgetPayload(instantSearchInstance.mainIndex.getWidgets(), instantSearchInstance, payload);
          instantSearchInstance.middleware.forEach(function(middleware) {
            return payload.widgets.push({
              middleware: true,
              type: middleware.instance.$$type,
              internal: middleware.instance.$$internal
            });
          });
          payloadContainer.content = JSON.stringify(payload);
          refNode.appendChild(payloadContainer);
        }, 0);
      },
      started: function started() {
      },
      unsubscribe: function unsubscribe() {
        payloadContainer.remove();
      }
    };
  };
}

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/lib/routers/history.js
var import_qs = __toESM(require_lib(), 1);
function _typeof44(o12) {
  "@babel/helpers - typeof";
  return _typeof44 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o13) {
    return typeof o13;
  } : function(o13) {
    return o13 && "function" == typeof Symbol && o13.constructor === Symbol && o13 !== Symbol.prototype ? "symbol" : typeof o13;
  }, _typeof44(o12);
}
function _classCallCheck2(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties2(target, props) {
  for (var i6 = 0; i6 < props.length; i6++) {
    var descriptor = props[i6];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey40(descriptor.key), descriptor);
  }
}
function _createClass2(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties2(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties2(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _defineProperty41(obj, key, value) {
  key = _toPropertyKey40(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey40(t4) {
  var i6 = _toPrimitive40(t4, "string");
  return "symbol" == _typeof44(i6) ? i6 : String(i6);
}
function _toPrimitive40(t4, r7) {
  if ("object" != _typeof44(t4) || !t4) return t4;
  var e6 = t4[Symbol.toPrimitive];
  if (void 0 !== e6) {
    var i6 = e6.call(t4, r7 || "default");
    if ("object" != _typeof44(i6)) return i6;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r7 ? String : Number)(t4);
}
var setWindowTitle = function setWindowTitle2(title) {
  if (title) {
    window.document.title = title;
  }
};
var BrowserHistory = function() {
  function BrowserHistory2(_ref) {
    var _this = this;
    var windowTitle = _ref.windowTitle, _ref$writeDelay = _ref.writeDelay, writeDelay = _ref$writeDelay === void 0 ? 400 : _ref$writeDelay, createURL = _ref.createURL, parseURL = _ref.parseURL, getLocation = _ref.getLocation, start = _ref.start, dispose = _ref.dispose, push = _ref.push, cleanUrlOnDispose = _ref.cleanUrlOnDispose;
    _classCallCheck2(this, BrowserHistory2);
    _defineProperty41(this, "$$type", "ais.browser");
    _defineProperty41(this, "windowTitle", void 0);
    _defineProperty41(this, "writeDelay", void 0);
    _defineProperty41(this, "_createURL", void 0);
    _defineProperty41(this, "parseURL", void 0);
    _defineProperty41(this, "getLocation", void 0);
    _defineProperty41(this, "writeTimer", void 0);
    _defineProperty41(this, "_onPopState", void 0);
    _defineProperty41(this, "inPopState", false);
    _defineProperty41(this, "isDisposed", false);
    _defineProperty41(this, "latestAcknowledgedHistory", 0);
    _defineProperty41(this, "_start", void 0);
    _defineProperty41(this, "_dispose", void 0);
    _defineProperty41(this, "_push", void 0);
    _defineProperty41(this, "_cleanUrlOnDispose", void 0);
    this.windowTitle = windowTitle;
    this.writeTimer = void 0;
    this.writeDelay = writeDelay;
    this._createURL = createURL;
    this.parseURL = parseURL;
    this.getLocation = getLocation;
    this._start = start;
    this._dispose = dispose;
    this._push = push;
    this._cleanUrlOnDispose = typeof cleanUrlOnDispose === "undefined" ? true : cleanUrlOnDispose;
    if (typeof cleanUrlOnDispose === "undefined") {
      console.info("Starting from the next major version, InstantSearch will not clean up the URL from active refinements when it is disposed.\n\nWe recommend setting `cleanUrlOnDispose` to false to adopt this change today.\nTo stay with the current behaviour and remove this warning, set the option to true.\n\nSee documentation: ".concat(createDocumentationLink({
        name: "history-router"
      }), "#widget-param-cleanurlondispose"));
    }
    safelyRunOnBrowser(function(_ref2) {
      var window2 = _ref2.window;
      var title = _this.windowTitle && _this.windowTitle(_this.read());
      setWindowTitle(title);
      _this.latestAcknowledgedHistory = window2.history.length;
    });
  }
  _createClass2(BrowserHistory2, [{
    key: "read",
    value: function read() {
      return this.parseURL({
        qsModule: import_qs.default,
        location: this.getLocation()
      });
    }
    /**
     * Pushes a search state into the URL.
     */
  }, {
    key: "write",
    value: function write(routeState) {
      var _this2 = this;
      safelyRunOnBrowser(function(_ref3) {
        var window2 = _ref3.window;
        var url = _this2.createURL(routeState);
        var title = _this2.windowTitle && _this2.windowTitle(routeState);
        if (_this2.writeTimer) {
          clearTimeout(_this2.writeTimer);
        }
        _this2.writeTimer = setTimeout(function() {
          setWindowTitle(title);
          if (_this2.shouldWrite(url)) {
            if (_this2._push) {
              _this2._push(url);
            } else {
              window2.history.pushState(routeState, title || "", url);
            }
            _this2.latestAcknowledgedHistory = window2.history.length;
          }
          _this2.inPopState = false;
          _this2.writeTimer = void 0;
        }, _this2.writeDelay);
      });
    }
    /**
     * Sets a callback on the `onpopstate` event of the history API of the current page.
     * It enables the URL sync to keep track of the changes.
     */
  }, {
    key: "onUpdate",
    value: function onUpdate(callback) {
      var _this3 = this;
      if (this._start) {
        this._start(function() {
          callback(_this3.read());
        });
      }
      this._onPopState = function() {
        if (_this3.writeTimer) {
          clearTimeout(_this3.writeTimer);
          _this3.writeTimer = void 0;
        }
        _this3.inPopState = true;
        callback(_this3.read());
      };
      safelyRunOnBrowser(function(_ref4) {
        var window2 = _ref4.window;
        window2.addEventListener("popstate", _this3._onPopState);
      });
    }
    /**
     * Creates a complete URL from a given syncable UI state.
     *
     * It always generates the full URL, not a relative one.
     * This allows to handle cases like using a <base href>.
     * See: https://github.com/algolia/instantsearch/issues/790
     */
  }, {
    key: "createURL",
    value: function createURL(routeState) {
      var url = this._createURL({
        qsModule: import_qs.default,
        routeState,
        location: this.getLocation()
      });
      if (true) {
        try {
          new URL(url);
        } catch (e6) {
          true ? _warning(false, "The URL returned by the `createURL` function is invalid.\nPlease make sure it returns an absolute URL to avoid issues, e.g: `https://algolia.com/search?query=iphone`.") : void 0;
        }
      }
      return url;
    }
    /**
     * Removes the event listener and cleans up the URL.
     */
  }, {
    key: "dispose",
    value: function dispose() {
      var _this4 = this;
      if (this._dispose) {
        this._dispose();
      }
      this.isDisposed = true;
      safelyRunOnBrowser(function(_ref5) {
        var window2 = _ref5.window;
        if (_this4._onPopState) {
          window2.removeEventListener("popstate", _this4._onPopState);
        }
      });
      if (this.writeTimer) {
        clearTimeout(this.writeTimer);
      }
      if (this._cleanUrlOnDispose) {
        this.write({});
      }
    }
  }, {
    key: "start",
    value: function start() {
      this.isDisposed = false;
    }
  }, {
    key: "shouldWrite",
    value: function shouldWrite(url) {
      var _this5 = this;
      return safelyRunOnBrowser(function(_ref6) {
        var window2 = _ref6.window;
        if (_this5.isDisposed && !_this5._cleanUrlOnDispose) {
          return false;
        }
        var lastPushWasByISAfterDispose = !(_this5.isDisposed && _this5.latestAcknowledgedHistory !== window2.history.length);
        return (
          // When the last state change was through popstate, the IS.js state changes,
          // but that should not write the URL.
          !_this5.inPopState && // When the previous pushState after dispose was by IS.js, we want to write the URL.
          lastPushWasByISAfterDispose && // When the URL is the same as the current one, we do not want to write it.
          url !== window2.location.href
        );
      });
    }
  }]);
  return BrowserHistory2;
}();
function historyRouter() {
  var _ref7 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, _ref7$createURL = _ref7.createURL, createURL = _ref7$createURL === void 0 ? function(_ref8) {
    var qsModule = _ref8.qsModule, routeState = _ref8.routeState, location2 = _ref8.location;
    var protocol = location2.protocol, hostname = location2.hostname, _location$port = location2.port, port = _location$port === void 0 ? "" : _location$port, pathname = location2.pathname, hash = location2.hash;
    var queryString = qsModule.stringify(routeState);
    var portWithPrefix = port === "" ? "" : ":".concat(port);
    if (!queryString) {
      return "".concat(protocol, "//").concat(hostname).concat(portWithPrefix).concat(pathname).concat(hash);
    }
    return "".concat(protocol, "//").concat(hostname).concat(portWithPrefix).concat(pathname, "?").concat(queryString).concat(hash);
  } : _ref7$createURL, _ref7$parseURL = _ref7.parseURL, parseURL = _ref7$parseURL === void 0 ? function(_ref9) {
    var qsModule = _ref9.qsModule, location2 = _ref9.location;
    return qsModule.parse(location2.search.slice(1), {
      arrayLimit: 99
    });
  } : _ref7$parseURL, _ref7$writeDelay = _ref7.writeDelay, writeDelay = _ref7$writeDelay === void 0 ? 400 : _ref7$writeDelay, windowTitle = _ref7.windowTitle, _ref7$getLocation = _ref7.getLocation, getLocation = _ref7$getLocation === void 0 ? function() {
    return safelyRunOnBrowser(function(_ref10) {
      var window2 = _ref10.window;
      return window2.location;
    }, {
      fallback: function fallback() {
        throw new Error("You need to provide `getLocation` to the `history` router in environments where `window` does not exist.");
      }
    });
  } : _ref7$getLocation, start = _ref7.start, dispose = _ref7.dispose, push = _ref7.push, cleanUrlOnDispose = _ref7.cleanUrlOnDispose;
  return new BrowserHistory({
    createURL,
    parseURL,
    writeDelay,
    windowTitle,
    getLocation,
    start,
    dispose,
    push,
    cleanUrlOnDispose
  });
}

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/lib/stateMappings/simple.js
function _typeof45(o12) {
  "@babel/helpers - typeof";
  return _typeof45 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o13) {
    return typeof o13;
  } : function(o13) {
    return o13 && "function" == typeof Symbol && o13.constructor === Symbol && o13 !== Symbol.prototype ? "symbol" : typeof o13;
  }, _typeof45(o12);
}
var _excluded10 = ["configure"];
function ownKeys39(e6, r7) {
  var t4 = Object.keys(e6);
  if (Object.getOwnPropertySymbols) {
    var o12 = Object.getOwnPropertySymbols(e6);
    r7 && (o12 = o12.filter(function(r8) {
      return Object.getOwnPropertyDescriptor(e6, r8).enumerable;
    })), t4.push.apply(t4, o12);
  }
  return t4;
}
function _objectSpread39(e6) {
  for (var r7 = 1; r7 < arguments.length; r7++) {
    var t4 = null != arguments[r7] ? arguments[r7] : {};
    r7 % 2 ? ownKeys39(Object(t4), true).forEach(function(r8) {
      _defineProperty42(e6, r8, t4[r8]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e6, Object.getOwnPropertyDescriptors(t4)) : ownKeys39(Object(t4)).forEach(function(r8) {
      Object.defineProperty(e6, r8, Object.getOwnPropertyDescriptor(t4, r8));
    });
  }
  return e6;
}
function _defineProperty42(obj, key, value) {
  key = _toPropertyKey41(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey41(t4) {
  var i6 = _toPrimitive41(t4, "string");
  return "symbol" == _typeof45(i6) ? i6 : String(i6);
}
function _toPrimitive41(t4, r7) {
  if ("object" != _typeof45(t4) || !t4) return t4;
  var e6 = t4[Symbol.toPrimitive];
  if (void 0 !== e6) {
    var i6 = e6.call(t4, r7 || "default");
    if ("object" != _typeof45(i6)) return i6;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r7 ? String : Number)(t4);
}
function _objectWithoutProperties9(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose9(source, excluded);
  var key, i6;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i6 = 0; i6 < sourceSymbolKeys.length; i6++) {
      key = sourceSymbolKeys[i6];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose9(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i6;
  for (i6 = 0; i6 < sourceKeys.length; i6++) {
    key = sourceKeys[i6];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function getIndexStateWithoutConfigure(uiState) {
  var configure = uiState.configure, trackedUiState = _objectWithoutProperties9(uiState, _excluded10);
  return trackedUiState;
}
function simpleStateMapping() {
  return {
    $$type: "ais.simple",
    stateToRoute: function stateToRoute(uiState) {
      return Object.keys(uiState).reduce(function(state, indexId) {
        return _objectSpread39(_objectSpread39({}, state), {}, _defineProperty42({}, indexId, getIndexStateWithoutConfigure(uiState[indexId])));
      }, {});
    },
    routeToState: function routeToState() {
      var routeState = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      return Object.keys(routeState).reduce(function(state, indexId) {
        return _objectSpread39(_objectSpread39({}, state), {}, _defineProperty42({}, indexId, getIndexStateWithoutConfigure(routeState[indexId])));
      }, {});
    }
  };
}

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/middlewares/createRouterMiddleware.js
function _typeof46(o12) {
  "@babel/helpers - typeof";
  return _typeof46 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o13) {
    return typeof o13;
  } : function(o13) {
    return o13 && "function" == typeof Symbol && o13.constructor === Symbol && o13 !== Symbol.prototype ? "symbol" : typeof o13;
  }, _typeof46(o12);
}
function ownKeys40(e6, r7) {
  var t4 = Object.keys(e6);
  if (Object.getOwnPropertySymbols) {
    var o12 = Object.getOwnPropertySymbols(e6);
    r7 && (o12 = o12.filter(function(r8) {
      return Object.getOwnPropertyDescriptor(e6, r8).enumerable;
    })), t4.push.apply(t4, o12);
  }
  return t4;
}
function _objectSpread40(e6) {
  for (var r7 = 1; r7 < arguments.length; r7++) {
    var t4 = null != arguments[r7] ? arguments[r7] : {};
    r7 % 2 ? ownKeys40(Object(t4), true).forEach(function(r8) {
      _defineProperty43(e6, r8, t4[r8]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e6, Object.getOwnPropertyDescriptors(t4)) : ownKeys40(Object(t4)).forEach(function(r8) {
      Object.defineProperty(e6, r8, Object.getOwnPropertyDescriptor(t4, r8));
    });
  }
  return e6;
}
function _defineProperty43(obj, key, value) {
  key = _toPropertyKey42(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey42(t4) {
  var i6 = _toPrimitive42(t4, "string");
  return "symbol" == _typeof46(i6) ? i6 : String(i6);
}
function _toPrimitive42(t4, r7) {
  if ("object" != _typeof46(t4) || !t4) return t4;
  var e6 = t4[Symbol.toPrimitive];
  if (void 0 !== e6) {
    var i6 = e6.call(t4, r7 || "default");
    if ("object" != _typeof46(i6)) return i6;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r7 ? String : Number)(t4);
}
var createRouterMiddleware = function createRouterMiddleware2() {
  var props = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  var _props$router = props.router, router = _props$router === void 0 ? historyRouter() : _props$router, _props$stateMapping = props.stateMapping, stateMapping = _props$stateMapping === void 0 ? simpleStateMapping() : _props$stateMapping, _props$$$internal = props.$$internal, $$internal = _props$$$internal === void 0 ? false : _props$$$internal;
  return function(_ref) {
    var instantSearchInstance = _ref.instantSearchInstance;
    function topLevelCreateURL(nextState) {
      var previousUiState = (
        // If only the mainIndex is initialized, we don't yet know what other
        // index widgets are used. Therefore we fall back to the initialUiState.
        // We can't indiscriminately use the initialUiState because then we
        // reintroduce state that was changed by the user.
        // When there are no widgets, we are sure the user can't yet have made
        // any changes.
        instantSearchInstance.mainIndex.getWidgets().length === 0 ? instantSearchInstance._initialUiState : instantSearchInstance.mainIndex.getWidgetUiState({})
      );
      var uiState = Object.keys(nextState).reduce(function(acc, indexId) {
        return _objectSpread40(_objectSpread40({}, acc), {}, _defineProperty43({}, indexId, nextState[indexId]));
      }, previousUiState);
      var route = stateMapping.stateToRoute(uiState);
      return router.createURL(route);
    }
    instantSearchInstance._createURL = topLevelCreateURL;
    var lastRouteState = void 0;
    var initialUiState = instantSearchInstance._initialUiState;
    return {
      $$type: "ais.router({router:".concat(router.$$type || "__unknown__", ", stateMapping:").concat(stateMapping.$$type || "__unknown__", "})"),
      $$internal,
      onStateChange: function onStateChange(_ref2) {
        var uiState = _ref2.uiState;
        var routeState = stateMapping.stateToRoute(uiState);
        if (lastRouteState === void 0 || !isEqual(lastRouteState, routeState)) {
          router.write(routeState);
          lastRouteState = routeState;
        }
      },
      subscribe: function subscribe() {
        true ? _warning(Object.keys(initialUiState).length === 0, "Using `initialUiState` together with routing is not recommended. The `initialUiState` will be overwritten by the URL parameters.") : void 0;
        instantSearchInstance._initialUiState = _objectSpread40(_objectSpread40({}, initialUiState), stateMapping.routeToState(router.read()));
        router.onUpdate(function(route) {
          if (instantSearchInstance.mainIndex.getWidgets().length > 0) {
            instantSearchInstance.setUiState(stateMapping.routeToState(route));
          }
        });
      },
      started: function started() {
        var _router$start;
        (_router$start = router.start) === null || _router$start === void 0 ? void 0 : _router$start.call(router);
      },
      unsubscribe: function unsubscribe() {
        router.dispose();
      }
    };
  };
};

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/lib/formatNumber.js
function formatNumber(value, numberLocale) {
  return value.toLocaleString(numberLocale);
}

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/lib/createHelpers.js
function _typeof47(o12) {
  "@babel/helpers - typeof";
  return _typeof47 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o13) {
    return typeof o13;
  } : function(o13) {
    return o13 && "function" == typeof Symbol && o13.constructor === Symbol && o13 !== Symbol.prototype ? "symbol" : typeof o13;
  }, _typeof47(o12);
}
function ownKeys41(e6, r7) {
  var t4 = Object.keys(e6);
  if (Object.getOwnPropertySymbols) {
    var o12 = Object.getOwnPropertySymbols(e6);
    r7 && (o12 = o12.filter(function(r8) {
      return Object.getOwnPropertyDescriptor(e6, r8).enumerable;
    })), t4.push.apply(t4, o12);
  }
  return t4;
}
function _objectSpread41(e6) {
  for (var r7 = 1; r7 < arguments.length; r7++) {
    var t4 = null != arguments[r7] ? arguments[r7] : {};
    r7 % 2 ? ownKeys41(Object(t4), true).forEach(function(r8) {
      _defineProperty44(e6, r8, t4[r8]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e6, Object.getOwnPropertyDescriptors(t4)) : ownKeys41(Object(t4)).forEach(function(r8) {
      Object.defineProperty(e6, r8, Object.getOwnPropertyDescriptor(t4, r8));
    });
  }
  return e6;
}
function _defineProperty44(obj, key, value) {
  key = _toPropertyKey43(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey43(t4) {
  var i6 = _toPrimitive43(t4, "string");
  return "symbol" == _typeof47(i6) ? i6 : String(i6);
}
function _toPrimitive43(t4, r7) {
  if ("object" != _typeof47(t4) || !t4) return t4;
  var e6 = t4[Symbol.toPrimitive];
  if (void 0 !== e6) {
    var i6 = e6.call(t4, r7 || "default");
    if ("object" != _typeof47(i6)) return i6;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r7 ? String : Number)(t4);
}
function hoganHelpers(_ref) {
  var numberLocale = _ref.numberLocale;
  return {
    formatNumber: function formatNumber2(value, render) {
      return formatNumber(Number(render(value)), numberLocale);
    },
    highlight: function highlight2(options, render) {
      try {
        var highlightOptions = JSON.parse(options);
        return render(highlight(_objectSpread41(_objectSpread41({}, highlightOptions), {}, {
          hit: this
        })));
      } catch (error) {
        throw new Error('\nThe highlight helper expects a JSON object of the format:\n{ "attribute": "name", "highlightedTagName": "mark" }');
      }
    },
    reverseHighlight: function reverseHighlight2(options, render) {
      try {
        var reverseHighlightOptions = JSON.parse(options);
        return render(reverseHighlight(_objectSpread41(_objectSpread41({}, reverseHighlightOptions), {}, {
          hit: this
        })));
      } catch (error) {
        throw new Error('\n  The reverseHighlight helper expects a JSON object of the format:\n  { "attribute": "name", "highlightedTagName": "mark" }');
      }
    },
    snippet: function snippet2(options, render) {
      try {
        var snippetOptions = JSON.parse(options);
        return render(snippet(_objectSpread41(_objectSpread41({}, snippetOptions), {}, {
          hit: this
        })));
      } catch (error) {
        throw new Error('\nThe snippet helper expects a JSON object of the format:\n{ "attribute": "name", "highlightedTagName": "mark" }');
      }
    },
    reverseSnippet: function reverseSnippet2(options, render) {
      try {
        var reverseSnippetOptions = JSON.parse(options);
        return render(reverseSnippet(_objectSpread41(_objectSpread41({}, reverseSnippetOptions), {}, {
          hit: this
        })));
      } catch (error) {
        throw new Error('\n  The reverseSnippet helper expects a JSON object of the format:\n  { "attribute": "name", "highlightedTagName": "mark" }');
      }
    },
    insights: function insights2(options, render) {
      try {
        var _JSON$parse = JSON.parse(options), method = _JSON$parse.method, payload = _JSON$parse.payload;
        return render(insights(method, _objectSpread41({
          objectIDs: [this.objectID]
        }, payload)));
      } catch (error) {
        throw new Error('\nThe insights helper expects a JSON object of the format:\n{ "method": "method-name", "payload": { "eventName": "name of the event" } }');
      }
    }
  };
}

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/lib/version.js
var version_default = "4.77.0";

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/lib/InstantSearch.js
function _typeof48(o12) {
  "@babel/helpers - typeof";
  return _typeof48 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o13) {
    return typeof o13;
  } : function(o13) {
    return o13 && "function" == typeof Symbol && o13.constructor === Symbol && o13 !== Symbol.prototype ? "symbol" : typeof o13;
  }, _typeof48(o12);
}
function ownKeys42(e6, r7) {
  var t4 = Object.keys(e6);
  if (Object.getOwnPropertySymbols) {
    var o12 = Object.getOwnPropertySymbols(e6);
    r7 && (o12 = o12.filter(function(r8) {
      return Object.getOwnPropertyDescriptor(e6, r8).enumerable;
    })), t4.push.apply(t4, o12);
  }
  return t4;
}
function _objectSpread42(e6) {
  for (var r7 = 1; r7 < arguments.length; r7++) {
    var t4 = null != arguments[r7] ? arguments[r7] : {};
    r7 % 2 ? ownKeys42(Object(t4), true).forEach(function(r8) {
      _defineProperty45(e6, r8, t4[r8]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e6, Object.getOwnPropertyDescriptors(t4)) : ownKeys42(Object(t4)).forEach(function(r8) {
      Object.defineProperty(e6, r8, Object.getOwnPropertyDescriptor(t4, r8));
    });
  }
  return e6;
}
function _classCallCheck3(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties3(target, props) {
  for (var i6 = 0; i6 < props.length; i6++) {
    var descriptor = props[i6];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey44(descriptor.key), descriptor);
  }
}
function _createClass3(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties3(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties3(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  Object.defineProperty(subClass, "prototype", { writable: false });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o12, p6) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o13, p7) {
    o13.__proto__ = p7;
    return o13;
  };
  return _setPrototypeOf(o12, p6);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof48(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e6) {
    return false;
  }
}
function _getPrototypeOf(o12) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o13) {
    return o13.__proto__ || Object.getPrototypeOf(o13);
  };
  return _getPrototypeOf(o12);
}
function _defineProperty45(obj, key, value) {
  key = _toPropertyKey44(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey44(t4) {
  var i6 = _toPrimitive44(t4, "string");
  return "symbol" == _typeof48(i6) ? i6 : String(i6);
}
function _toPrimitive44(t4, r7) {
  if ("object" != _typeof48(t4) || !t4) return t4;
  var e6 = t4[Symbol.toPrimitive];
  if (void 0 !== e6) {
    var i6 = e6.call(t4, r7 || "default");
    if ("object" != _typeof48(i6)) return i6;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r7 ? String : Number)(t4);
}
var withUsage32 = createDocumentationMessageGenerator({
  name: "instantsearch"
});
function defaultCreateURL() {
  return "#";
}
var INSTANTSEARCH_FUTURE_DEFAULTS = {
  preserveSharedStateOnUnmount: false,
  persistHierarchicalRootCount: false
};
var InstantSearch = function(_EventEmitter) {
  _inherits(InstantSearch2, _EventEmitter);
  var _super = _createSuper(InstantSearch2);
  function InstantSearch2(options) {
    var _options$future2;
    var _this;
    _classCallCheck3(this, InstantSearch2);
    _this = _super.call(this);
    _defineProperty45(_assertThisInitialized(_this), "client", void 0);
    _defineProperty45(_assertThisInitialized(_this), "indexName", void 0);
    _defineProperty45(_assertThisInitialized(_this), "compositionID", void 0);
    _defineProperty45(_assertThisInitialized(_this), "insightsClient", void 0);
    _defineProperty45(_assertThisInitialized(_this), "onStateChange", null);
    _defineProperty45(_assertThisInitialized(_this), "future", void 0);
    _defineProperty45(_assertThisInitialized(_this), "helper", void 0);
    _defineProperty45(_assertThisInitialized(_this), "mainHelper", void 0);
    _defineProperty45(_assertThisInitialized(_this), "mainIndex", void 0);
    _defineProperty45(_assertThisInitialized(_this), "started", void 0);
    _defineProperty45(_assertThisInitialized(_this), "templatesConfig", void 0);
    _defineProperty45(_assertThisInitialized(_this), "renderState", {});
    _defineProperty45(_assertThisInitialized(_this), "_stalledSearchDelay", void 0);
    _defineProperty45(_assertThisInitialized(_this), "_searchStalledTimer", void 0);
    _defineProperty45(_assertThisInitialized(_this), "_initialUiState", void 0);
    _defineProperty45(_assertThisInitialized(_this), "_initialResults", void 0);
    _defineProperty45(_assertThisInitialized(_this), "_createURL", void 0);
    _defineProperty45(_assertThisInitialized(_this), "_searchFunction", void 0);
    _defineProperty45(_assertThisInitialized(_this), "_mainHelperSearch", void 0);
    _defineProperty45(_assertThisInitialized(_this), "_hasSearchWidget", false);
    _defineProperty45(_assertThisInitialized(_this), "_hasRecommendWidget", false);
    _defineProperty45(_assertThisInitialized(_this), "_insights", void 0);
    _defineProperty45(_assertThisInitialized(_this), "middleware", []);
    _defineProperty45(_assertThisInitialized(_this), "sendEventToInsights", void 0);
    _defineProperty45(_assertThisInitialized(_this), "status", "idle");
    _defineProperty45(_assertThisInitialized(_this), "error", void 0);
    _defineProperty45(_assertThisInitialized(_this), "scheduleSearch", defer(function() {
      if (_this.started) {
        _this.mainHelper.search();
      }
    }));
    _defineProperty45(_assertThisInitialized(_this), "scheduleRender", defer(function() {
      var _this$mainHelper;
      var shouldResetStatus = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
      if (!((_this$mainHelper = _this.mainHelper) !== null && _this$mainHelper !== void 0 && _this$mainHelper.hasPendingRequests())) {
        clearTimeout(_this._searchStalledTimer);
        _this._searchStalledTimer = null;
        if (shouldResetStatus) {
          _this.status = "idle";
          _this.error = void 0;
        }
      }
      _this.mainIndex.render({
        instantSearchInstance: _assertThisInitialized(_this)
      });
      _this.emit("render");
    }));
    _defineProperty45(_assertThisInitialized(_this), "onInternalStateChange", defer(function() {
      var nextUiState = _this.mainIndex.getWidgetUiState({});
      _this.middleware.forEach(function(_ref) {
        var instance = _ref.instance;
        instance.onStateChange({
          uiState: nextUiState
        });
      });
    }));
    _this.setMaxListeners(100);
    var _options$indexName = options.indexName, indexName = _options$indexName === void 0 ? "" : _options$indexName, compositionID = options.compositionID, numberLocale = options.numberLocale, _options$initialUiSta = options.initialUiState, initialUiState = _options$initialUiSta === void 0 ? {} : _options$initialUiSta, _options$routing = options.routing, routing = _options$routing === void 0 ? null : _options$routing, _options$insights = options.insights, insights2 = _options$insights === void 0 ? void 0 : _options$insights, searchFunction = options.searchFunction, _options$stalledSearc = options.stalledSearchDelay, stalledSearchDelay = _options$stalledSearc === void 0 ? 200 : _options$stalledSearc, _options$searchClient = options.searchClient, searchClient = _options$searchClient === void 0 ? null : _options$searchClient, _options$insightsClie = options.insightsClient, insightsClient = _options$insightsClie === void 0 ? null : _options$insightsClie, _options$onStateChang = options.onStateChange, onStateChange = _options$onStateChang === void 0 ? null : _options$onStateChang, _options$future = options.future, future = _options$future === void 0 ? _objectSpread42(_objectSpread42({}, INSTANTSEARCH_FUTURE_DEFAULTS), options.future || {}) : _options$future;
    if (searchClient === null) {
      throw new Error(withUsage32("The `searchClient` option is required."));
    }
    if (typeof searchClient.search !== "function") {
      throw new Error("The `searchClient` must implement a `search` method.\n\nSee: https://www.algolia.com/doc/guides/building-search-ui/going-further/backend-search/in-depth/backend-instantsearch/js/");
    }
    if (typeof searchClient.addAlgoliaAgent === "function") {
      searchClient.addAlgoliaAgent("instantsearch.js (".concat(version_default, ")"));
    }
    true ? _warning(insightsClient === null, "`insightsClient` property has been deprecated. It is still supported in 4.x releases, but not further. It is replaced by the `insights` middleware.\n\nFor more information, visit https://www.algolia.com/doc/guides/getting-insights-and-analytics/search-analytics/click-through-and-conversions/how-to/send-click-and-conversion-events-with-instantsearch/js/") : void 0;
    if (insightsClient && typeof insightsClient !== "function") {
      throw new Error(withUsage32("The `insightsClient` option should be a function."));
    }
    true ? _warning(!options.searchParameters, "The `searchParameters` option is deprecated and will not be supported in InstantSearch.js 4.x.\n\nYou can replace it with the `configure` widget:\n\n```\nsearch.addWidgets([\n  configure(".concat(JSON.stringify(options.searchParameters, null, 2), ")\n]);\n```\n\nSee ").concat(createDocumentationLink({
      name: "configure"
    }))) : void 0;
    if (((_options$future2 = options.future) === null || _options$future2 === void 0 ? void 0 : _options$future2.preserveSharedStateOnUnmount) === void 0) {
      console.info("Starting from the next major version, InstantSearch will change how widgets state is preserved when they are removed. InstantSearch will keep the state of unmounted widgets to be usable by other widgets with the same attribute.\n\nWe recommend setting `future.preserveSharedStateOnUnmount` to true to adopt this change today.\nTo stay with the current behaviour and remove this warning, set the option to false.\n\nSee documentation: ".concat(createDocumentationLink({
        name: "instantsearch"
      }), "#widget-param-future\n          "));
    }
    _this.client = searchClient;
    _this.future = future;
    _this.insightsClient = insightsClient;
    _this.indexName = indexName;
    _this.compositionID = compositionID;
    _this.helper = null;
    _this.mainHelper = null;
    _this.mainIndex = index_default({
      // we use an index widget to render compositions
      // this only works because there's only one composition index allow for now
      indexName: _this.compositionID || _this.indexName
    });
    _this.onStateChange = onStateChange;
    _this.started = false;
    _this.templatesConfig = {
      helpers: hoganHelpers({
        numberLocale
      }),
      compileOptions: {}
    };
    _this._stalledSearchDelay = stalledSearchDelay;
    _this._searchStalledTimer = null;
    _this._createURL = defaultCreateURL;
    _this._initialUiState = initialUiState;
    _this._initialResults = null;
    _this._insights = insights2;
    if (searchFunction) {
      true ? _warning(false, "The `searchFunction` option is deprecated. Use `onStateChange` instead.") : void 0;
      _this._searchFunction = searchFunction;
    }
    _this.sendEventToInsights = noop;
    if (routing) {
      var routerOptions = typeof routing === "boolean" ? {} : routing;
      routerOptions.$$internal = true;
      _this.use(createRouterMiddleware(routerOptions));
    }
    if (insights2) {
      var insightsOptions = typeof insights2 === "boolean" ? {} : insights2;
      insightsOptions.$$internal = true;
      _this.use(createInsightsMiddleware(insightsOptions));
    }
    if (isMetadataEnabled()) {
      _this.use(createMetadataMiddleware({
        $$internal: true
      }));
    }
    return _this;
  }
  _createClass3(InstantSearch2, [{
    key: "_isSearchStalled",
    get: (
      /**
       * @deprecated use `status === 'stalled'` instead
       */
      function get4() {
        true ? _warning(false, '`InstantSearch._isSearchStalled` is deprecated and will be removed in InstantSearch.js 5.0.\n\nUse `InstantSearch.status === "stalled"` instead.') : void 0;
        return this.status === "stalled";
      }
    )
  }, {
    key: "use",
    value: function use() {
      var _this2 = this;
      for (var _len = arguments.length, middleware = new Array(_len), _key = 0; _key < _len; _key++) {
        middleware[_key] = arguments[_key];
      }
      var newMiddlewareList = middleware.map(function(fn) {
        var newMiddleware = _objectSpread42({
          $$type: "__unknown__",
          $$internal: false,
          subscribe: noop,
          started: noop,
          unsubscribe: noop,
          onStateChange: noop
        }, fn({
          instantSearchInstance: _this2
        }));
        _this2.middleware.push({
          creator: fn,
          instance: newMiddleware
        });
        return newMiddleware;
      });
      if (this.started) {
        newMiddlewareList.forEach(function(m12) {
          m12.subscribe();
          m12.started();
        });
      }
      return this;
    }
    /**
     * Removes a middleware from the InstantSearch lifecycle.
     */
  }, {
    key: "unuse",
    value: function unuse() {
      for (var _len2 = arguments.length, middlewareToUnuse = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        middlewareToUnuse[_key2] = arguments[_key2];
      }
      this.middleware.filter(function(m12) {
        return middlewareToUnuse.includes(m12.creator);
      }).forEach(function(m12) {
        return m12.instance.unsubscribe();
      });
      this.middleware = this.middleware.filter(function(m12) {
        return !middlewareToUnuse.includes(m12.creator);
      });
      return this;
    }
    // @major we shipped with EXPERIMENTAL_use, but have changed that to just `use` now
  }, {
    key: "EXPERIMENTAL_use",
    value: function EXPERIMENTAL_use() {
      true ? _warning(false, "The middleware API is now considered stable, so we recommend replacing `EXPERIMENTAL_use` with `use` before upgrading to the next major version.") : void 0;
      return this.use.apply(this, arguments);
    }
    /**
     * Adds a widget to the search instance.
     * A widget can be added either before or after InstantSearch has started.
     * @param widget The widget to add to InstantSearch.
     *
     * @deprecated This method will still be supported in 4.x releases, but not further. It is replaced by `addWidgets([widget])`.
     */
  }, {
    key: "addWidget",
    value: function addWidget(widget) {
      true ? _warning(false, "addWidget will still be supported in 4.x releases, but not further. It is replaced by `addWidgets([widget])`") : void 0;
      return this.addWidgets([widget]);
    }
    /**
     * Adds multiple widgets to the search instance.
     * Widgets can be added either before or after InstantSearch has started.
     * @param widgets The array of widgets to add to InstantSearch.
     */
  }, {
    key: "addWidgets",
    value: function addWidgets(widgets) {
      if (!Array.isArray(widgets)) {
        throw new Error(withUsage32("The `addWidgets` method expects an array of widgets. Please use `addWidget`."));
      }
      if (widgets.some(function(widget) {
        return typeof widget.init !== "function" && typeof widget.render !== "function";
      })) {
        throw new Error(withUsage32("The widget definition expects a `render` and/or an `init` method."));
      }
      if (this.compositionID && widgets.some(isIndexWidget)) {
        throw new Error(withUsage32("The `index` widget cannot be used with a composition-based InstantSearch implementation."));
      }
      this.mainIndex.addWidgets(widgets);
      return this;
    }
    /**
     * Removes a widget from the search instance.
     * @deprecated This method will still be supported in 4.x releases, but not further. It is replaced by `removeWidgets([widget])`
     * @param widget The widget instance to remove from InstantSearch.
     *
     * The widget must implement a `dispose()` method to clear its state.
     */
  }, {
    key: "removeWidget",
    value: function removeWidget(widget) {
      true ? _warning(false, "removeWidget will still be supported in 4.x releases, but not further. It is replaced by `removeWidgets([widget])`") : void 0;
      return this.removeWidgets([widget]);
    }
    /**
     * Removes multiple widgets from the search instance.
     * @param widgets Array of widgets instances to remove from InstantSearch.
     *
     * The widgets must implement a `dispose()` method to clear their states.
     */
  }, {
    key: "removeWidgets",
    value: function removeWidgets(widgets) {
      if (!Array.isArray(widgets)) {
        throw new Error(withUsage32("The `removeWidgets` method expects an array of widgets. Please use `removeWidget`."));
      }
      if (widgets.some(function(widget) {
        return typeof widget.dispose !== "function";
      })) {
        throw new Error(withUsage32("The widget definition expects a `dispose` method."));
      }
      this.mainIndex.removeWidgets(widgets);
      return this;
    }
    /**
     * Ends the initialization of InstantSearch.js and triggers the
     * first search.
     */
  }, {
    key: "start",
    value: function start() {
      var _this3 = this;
      if (this.started) {
        throw new Error(withUsage32("The `start` method has already been called once."));
      }
      var mainHelper = this.mainHelper || (0, import_algoliasearch_helper4.default)(this.client, this.indexName, void 0, {
        persistHierarchicalRootCount: this.future.persistHierarchicalRootCount
      });
      if (this.compositionID) {
        mainHelper.searchForFacetValues = mainHelper.searchForCompositionFacetValues.bind(mainHelper);
      }
      mainHelper.search = function() {
        _this3.status = "loading";
        _this3.scheduleRender(false);
        true ? _warning(Boolean(_this3.indexName) || Boolean(_this3.compositionID) || _this3.mainIndex.getWidgets().some(isIndexWidget), "No indexName provided, nor an explicit index widget in the widgets tree. This is required to be able to display results.") : void 0;
        if (_this3._hasSearchWidget) {
          if (_this3.compositionID) {
            mainHelper.searchWithComposition();
          } else {
            mainHelper.searchOnlyWithDerivedHelpers();
          }
        }
        if (_this3._hasRecommendWidget) {
          mainHelper.recommend();
        }
        return mainHelper;
      };
      if (this._searchFunction) {
        var fakeClient = {
          search: function search() {
            return new Promise(noop);
          }
        };
        this._mainHelperSearch = mainHelper.search.bind(mainHelper);
        mainHelper.search = function() {
          var mainIndexHelper = _this3.mainIndex.getHelper();
          var searchFunctionHelper = (0, import_algoliasearch_helper4.default)(fakeClient, mainIndexHelper.state.index, mainIndexHelper.state);
          searchFunctionHelper.once("search", function(_ref2) {
            var state = _ref2.state;
            mainIndexHelper.overrideStateWithoutTriggeringChangeEvent(state);
            _this3._mainHelperSearch();
          });
          searchFunctionHelper.on("change", function(_ref3) {
            var state = _ref3.state;
            mainIndexHelper.setState(state);
          });
          _this3._searchFunction(searchFunctionHelper);
          return mainHelper;
        };
      }
      mainHelper.on("error", function(_ref4) {
        var error = _ref4.error;
        if (!(error instanceof Error)) {
          var err = error;
          error = Object.keys(err).reduce(function(acc, key) {
            acc[key] = err[key];
            return acc;
          }, new Error(err.message));
        }
        error.error = error;
        _this3.error = error;
        _this3.status = "error";
        _this3.scheduleRender(false);
        _this3.emit("error", error);
      });
      this.mainHelper = mainHelper;
      this.middleware.forEach(function(_ref5) {
        var instance = _ref5.instance;
        instance.subscribe();
      });
      this.mainIndex.init({
        instantSearchInstance: this,
        parent: null,
        uiState: this._initialUiState
      });
      if (this._initialResults) {
        hydrateSearchClient(this.client, this._initialResults);
        hydrateRecommendCache(this.mainHelper, this._initialResults);
        var originalScheduleSearch = this.scheduleSearch;
        this.scheduleSearch = defer(noop);
        defer(function() {
          _this3.scheduleSearch = originalScheduleSearch;
        })();
      } else if (this.mainIndex.getWidgets().length > 0) {
        this.scheduleSearch();
      }
      this.helper = this.mainIndex.getHelper();
      this.started = true;
      this.middleware.forEach(function(_ref6) {
        var instance = _ref6.instance;
        instance.started();
      });
      if (typeof this._insights === "undefined") {
        mainHelper.derivedHelpers[0].once("result", function() {
          var hasAutomaticInsights = _this3.mainIndex.getScopedResults().some(function(_ref7) {
            var results = _ref7.results;
            return results === null || results === void 0 ? void 0 : results._automaticInsights;
          });
          if (hasAutomaticInsights) {
            _this3.use(createInsightsMiddleware({
              $$internal: true,
              $$automatic: true
            }));
          }
        });
      }
    }
    /**
     * Removes all widgets without triggering a search afterwards.
     * @return {undefined} This method does not return anything
     */
  }, {
    key: "dispose",
    value: function dispose() {
      var _this$mainHelper2;
      this.scheduleSearch.cancel();
      this.scheduleRender.cancel();
      clearTimeout(this._searchStalledTimer);
      this.removeWidgets(this.mainIndex.getWidgets());
      this.mainIndex.dispose();
      this.started = false;
      this.removeAllListeners();
      (_this$mainHelper2 = this.mainHelper) === null || _this$mainHelper2 === void 0 ? void 0 : _this$mainHelper2.removeAllListeners();
      this.mainHelper = null;
      this.helper = null;
      this.middleware.forEach(function(_ref8) {
        var instance = _ref8.instance;
        instance.unsubscribe();
      });
    }
  }, {
    key: "scheduleStalledRender",
    value: function scheduleStalledRender() {
      var _this4 = this;
      if (!this._searchStalledTimer) {
        this._searchStalledTimer = setTimeout(function() {
          _this4.status = "stalled";
          _this4.scheduleRender();
        }, this._stalledSearchDelay);
      }
    }
    /**
     * Set the UI state and trigger a search.
     * @param uiState The next UI state or a function computing it from the current state
     * @param callOnStateChange private parameter used to know if the method is called from a state change
     */
  }, {
    key: "setUiState",
    value: function setUiState(uiState) {
      var _this5 = this;
      var callOnStateChange = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
      if (!this.mainHelper) {
        throw new Error(withUsage32("The `start` method needs to be called before `setUiState`."));
      }
      this.mainIndex.refreshUiState();
      var nextUiState = typeof uiState === "function" ? uiState(this.mainIndex.getWidgetUiState({})) : uiState;
      if (this.onStateChange && callOnStateChange) {
        this.onStateChange({
          uiState: nextUiState,
          setUiState: function setUiState2(finalUiState) {
            setIndexHelperState(typeof finalUiState === "function" ? finalUiState(nextUiState) : finalUiState, _this5.mainIndex);
            _this5.scheduleSearch();
            _this5.onInternalStateChange();
          }
        });
      } else {
        setIndexHelperState(nextUiState, this.mainIndex);
        this.scheduleSearch();
        this.onInternalStateChange();
      }
    }
  }, {
    key: "getUiState",
    value: function getUiState() {
      if (this.started) {
        this.mainIndex.refreshUiState();
      }
      return this.mainIndex.getWidgetUiState({});
    }
  }, {
    key: "createURL",
    value: function createURL() {
      var nextState = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      if (!this.started) {
        throw new Error(withUsage32("The `start` method needs to be called before `createURL`."));
      }
      return this._createURL(nextState);
    }
  }, {
    key: "refresh",
    value: function refresh() {
      if (!this.mainHelper) {
        throw new Error(withUsage32("The `start` method needs to be called before `refresh`."));
      }
      this.mainHelper.clearCache().search();
    }
  }]);
  return InstantSearch2;
}(import_events.default);
var InstantSearch_default = InstantSearch;

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/index.js
var instantsearch = function instantsearch2(options) {
  return new InstantSearch_default(options);
};
instantsearch.version = version_default;
instantsearch.createInfiniteHitsSessionStorageCache = deprecate(createInfiniteHitsSessionStorageCache, "import { createInfiniteHitsSessionStorageCache } from 'instantsearch.js/es/lib/infiniteHitsCache'");
instantsearch.highlight = deprecate(highlight, "import { highlight } from 'instantsearch.js/es/helpers'");
instantsearch.reverseHighlight = deprecate(reverseHighlight, "import { reverseHighlight } from 'instantsearch.js/es/helpers'");
instantsearch.snippet = deprecate(snippet, "import { snippet } from 'instantsearch.js/es/helpers'");
instantsearch.reverseSnippet = deprecate(reverseSnippet, "import { reverseSnippet } from 'instantsearch.js/es/helpers'");
instantsearch.insights = insights;
instantsearch.getInsightsAnonymousUserToken = getInsightsAnonymousUserToken;
Object.defineProperty(instantsearch, "widgets", {
  get: function get() {
    throw new ReferenceError(`"instantsearch.widgets" are not available from the ES build.

To import the widgets:

import { searchBox } from 'instantsearch.js/es/widgets'`);
  }
});
Object.defineProperty(instantsearch, "connectors", {
  get: function get2() {
    throw new ReferenceError(`"instantsearch.connectors" are not available from the ES build.

To import the connectors:

import { connectSearchBox } from 'instantsearch.js/es/connectors'`);
  }
});
Object.defineProperty(instantsearch, "templates", {
  get: function get3() {
    throw new ReferenceError(`"instantsearch.templates" are not available from the ES build.

To import the templates:

import { carousel } from 'instantsearch.js/es/templates'`);
  }
});
var es_default = instantsearch;

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/util/createInstantSearchComponent.js
init_vue_runtime_esm_bundler();

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/package.json.js
var r4 = "4.20.1";

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/util/createInstantSearchComponent.js
var r5 = function(r7) {
  var c14;
  return e(((c14 = { mixins: [t({ name: "InstantSearch" })], provide: function() {
    return { $_ais_instantSearchInstance: this.instantSearchInstance };
  }, watch: { searchClient: function(n6) {
    a(false), this.instantSearchInstance.helper.setClient(n6).search();
  }, indexName: function(n6) {
    this.instantSearchInstance.helper.setIndex(n6 || "").search();
  }, compositionID: function(n6) {
    this.instantSearchInstance.helper.setIndex(n6 || "").search();
  }, stalledSearchDelay: function(n6) {
    this.instantSearchInstance._stalledSearchDelay = n6;
  }, routing: function() {
    throw new Error("routing configuration can not be changed dynamically at this point.\n\nPlease open a new issue: https://github.com/algolia/instantsearch/discussions/new?category=ideas&labels=triage%2cLibrary%3A+Vue+InstantSearch&title=Feature%20request%3A%20dynamic%20props");
  }, onStateChange: function() {
    throw new Error("onStateChange configuration can not be changed dynamically at this point.\n\nPlease open a new issue: https://github.com/algolia/instantsearch/discussions/new?category=ideas&labels=triage%2cLibrary%3A+Vue+InstantSearch&title=Feature%20request%3A%20dynamic%20props");
  }, searchFunction: function(n6) {
    this.instantSearchInstance._searchFunction = n6;
  }, middlewares: { immediate: true, handler: function(n6, t4) {
    var e6 = this;
    (t4 || []).filter(function(t5) {
      return -1 === (n6 || []).indexOf(t5);
    }).forEach(function(n7) {
      e6.instantSearchInstance.unuse(n7);
    }), (n6 || []).filter(function(n7) {
      return -1 === (t4 || []).indexOf(n7);
    }).forEach(function(n7) {
      e6.instantSearchInstance.use(n7);
    });
  } }, future: function(n6) {
    this.instantSearchInstance.future = Object.assign(INSTANTSEARCH_FUTURE_DEFAULTS, n6);
  } }, created: function() {
    var n6 = this.instantSearchInstance.client;
    "function" == typeof n6.addAlgoliaAgent && (n6.addAlgoliaAgent("Vue (" + version + ")"), n6.addAlgoliaAgent("Vue InstantSearch (" + r4 + ")"));
  }, mounted: function() {
    var n6 = this;
    this.$nextTick(function() {
      n6.instantSearchInstance.started || n6.instantSearchInstance.start();
    });
  } }).beforeUnmount = function() {
    this.instantSearchInstance.started && this.instantSearchInstance.dispose(), this.instantSearchInstance.__initialSearchResults = void 0;
  }, c14), r7);
};

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/InstantSearch.js
var r6 = "Vue InstantSearch: You used the prop api-key or app-id.\nThese have been replaced by search-client.\n\nSee more info here: https://www.algolia.com/doc/api-reference/widgets/instantsearch/vue/#widget-param-search-client";
var InstantSearch_default2 = r5({ name: "AisInstantSearch", props: { searchClient: { type: Object, required: true }, insightsClient: { type: Function, default: void 0 }, indexName: { type: String, required: false }, compositionID: { type: String, required: false }, routing: { default: void 0, validator: function(t4) {
  return !("boolean" == typeof t4 || !t4.router && !t4.stateMapping) || (a("The `routing` option expects an object with `router` and/or `stateMapping`.\n\nSee https://www.algolia.com/doc/api-reference/widgets/instantsearch/vue/#widget-param-routing"), false);
} }, insights: { default: void 0, validator: function(t4) {
  return void 0 === t4 || "boolean" == typeof t4 || "object" == typeof t4;
} }, stalledSearchDelay: { type: Number, default: void 0 }, searchFunction: { type: Function, default: void 0 }, onStateChange: { type: Function, default: void 0 }, initialUiState: { type: Object, default: void 0 }, apiKey: { type: String, default: void 0, validator: function(t4) {
  return t4 && a(r6), false;
} }, appId: { type: String, default: void 0, validator: function(t4) {
  return t4 && a(r6), false;
} }, middlewares: { type: Array, default: null }, future: { type: Object, default: void 0 } }, data: function() {
  return { instantSearchInstance: es_default({ searchClient: this.searchClient, insightsClient: this.insightsClient, insights: this.insights, indexName: this.indexName, compositionID: this.compositionID, routing: this.routing, stalledSearchDelay: this.stalledSearchDelay, searchFunction: this.searchFunction, onStateChange: this.onStateChange, initialUiState: this.initialUiState, future: this.future }) };
}, render: n(function(t4) {
  var i6;
  return t4("div", { class: (i6 = {}, i6[this.suit()] = true, i6[this.suit("", "ssr")] = false, i6) }, s(this));
}) });

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/InstantSearchSsr.js
var InstantSearchSsr_default = r5({ name: "AisInstantSearchSsr", inject: { $_ais_ssrInstantSearchInstance: { default: function() {
  throw new Error("`createServerRootMixin` is required when using SSR.");
} } }, data: function() {
  return { instantSearchInstance: this.$_ais_ssrInstantSearchInstance };
}, render: n(function(t4) {
  var e6;
  return t4("div", { class: (e6 = {}, e6[this.suit()] = true, e6[this.suit("", "ssr")] = true, e6) }, s(this));
}) });

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/InfiniteHits.vue_vue&type=script&lang.js
var InfiniteHits_vue_vue_type_script_lang_default = { name: "AisInfiniteHits", mixins: [n3({ connector: connectInfiniteHitsWithInsights_default }, { $$widgetType: "ais.infiniteHits" }), t({ name: "InfiniteHits" })], props: { showBanner: { type: Boolean, default: true }, showPrevious: { type: Boolean, default: false }, escapeHTML: { type: Boolean, default: true }, transformItems: { type: Function, default: void 0 }, cache: { type: Object, default: void 0 } }, computed: { widgetParams: function() {
  return { showBanner: this.showBanner, showPrevious: this.showPrevious, escapeHTML: this.escapeHTML, transformItems: this.transformItems, cache: this.cache };
} }, methods: { refinePrevious: function() {
  this.state.showPrevious();
}, refineNext: function() {
  this.state.showMore();
} } };

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/InfiniteHits.vue_vue&type=template&id=31c7998c&lang.js
init_vue_runtime_esm_bundler();
var c5 = ["disabled"];
var d3 = ["href", "target"];
var g4 = ["src", "alt"];
var b = ["src", "alt"];
var f4 = ["onClick", "onAuxclick"];
var k3 = ["disabled"];
function v3(v6, P3, m12, x3, h8, p6) {
  return v6.state ? (openBlock(), createElementBlock("div", { key: 0, class: normalizeClass(v6.suit()) }, [m12.showPrevious ? renderSlot(v6.$slots, "loadPrevious", { key: 0, refinePrevious: p6.refinePrevious, page: v6.state.results.page, isFirstPage: v6.state.isFirstPage }, function() {
    return [createBaseVNode("button", { class: normalizeClass([v6.suit("loadPrevious"), v6.state.isFirstPage && v6.suit("loadPrevious", "disabled")]), disabled: v6.state.isFirstPage, onClick: P3[0] || (P3[0] = function(e6) {
      return p6.refinePrevious();
    }) }, " Show previous results ", 10, c5)];
  }) : createCommentVNode("", true), renderSlot(v6.$slots, "default", { items: v6.state.items, results: v6.state.results, banner: v6.state.banner, isLastPage: v6.state.isLastPage, refinePrevious: p6.refinePrevious, refineNext: p6.refineNext, refine: p6.refineNext, insights: v6.state.insights, sendEvent: v6.state.sendEvent }, function() {
    return [m12.showBanner && v6.state.banner && v6.state.banner.image.urls[0].url ? renderSlot(v6.$slots, "banner", { key: 0, banner: v6.state.banner }, function() {
      return [createBaseVNode("aside", { class: normalizeClass(v6.suit("banner")) }, [v6.state.banner.link ? (openBlock(), createElementBlock("a", { key: 0, href: v6.state.banner.link.url, target: v6.state.banner.link.target, class: normalizeClass(v6.suit("banner-link")) }, [createBaseVNode("img", { src: v6.state.banner.image.urls[0].url, alt: v6.state.banner.image.title, class: normalizeClass(v6.suit("banner-image")) }, null, 10, g4)], 10, d3)) : (openBlock(), createElementBlock("img", { key: 1, src: v6.state.banner.image.urls[0].url, alt: v6.state.banner.image.title, class: normalizeClass(v6.suit("banner-image")) }, null, 10, b))], 2)];
    }) : createCommentVNode("", true), createBaseVNode("ol", { class: normalizeClass(v6.suit("list")) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(v6.state.items, function(i6, a6) {
      return openBlock(), createElementBlock("li", { class: normalizeClass(v6.suit("item")), key: i6.objectID, onClick: function(e6) {
        return v6.state.sendEvent("click:internal", i6, "Hit Clicked");
      }, onAuxclick: function(e6) {
        return v6.state.sendEvent("click:internal", i6, "Hit Clicked");
      } }, [renderSlot(v6.$slots, "item", { item: i6, index: a6, insights: v6.state.insights, sendEvent: v6.state.sendEvent }, function() {
        return [createTextVNode(" objectID: " + toDisplayString(i6.objectID) + ", index: " + toDisplayString(a6), 1)];
      })], 42, f4);
    }), 128))], 2), renderSlot(v6.$slots, "loadMore", { refineNext: p6.refineNext, refine: p6.refineNext, page: v6.state.results.page, isLastPage: v6.state.isLastPage }, function() {
      return [createBaseVNode("button", { class: normalizeClass([v6.suit("loadMore"), v6.state.isLastPage && v6.suit("loadMore", "disabled")]), disabled: v6.state.isLastPage, onClick: P3[1] || (P3[1] = function(e6) {
        return p6.refineNext();
      }) }, " Show more results ", 10, k3)];
    })];
  })], 2)) : createCommentVNode("", true);
}

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/InfiniteHits.vue.js
InfiniteHits_vue_vue_type_script_lang_default.render = v3;
var InfiniteHits_vue_default = InfiniteHits_vue_vue_type_script_lang_default;

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/Menu.vue_vue&type=script&lang.js
var Menu_vue_vue_type_script_lang_default = { name: "AisMenu", mixins: [t({ name: "Menu" }), n3({ connector: connectMenu_default }, { $$widgetType: "ais.menu" }), r3()], props: { attribute: { type: String, required: true }, limit: { type: Number, default: void 0 }, showMoreLimit: { type: Number, default: void 0 }, showMore: { type: Boolean, default: false }, sortBy: { type: [Array, Function], default: void 0 }, transformItems: { type: Function, default: void 0 } }, computed: { widgetParams: function() {
  return { attribute: this.attribute, limit: this.limit, showMore: this.showMore, showMoreLimit: this.showMoreLimit, sortBy: this.sortBy, transformItems: this.transformItems };
}, showShowMoreButton: function() {
  return this.state.canRefine && this.showMore;
} } };

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/Menu.vue_vue&type=template&id=22c74852&lang.js
init_vue_runtime_esm_bundler();
var h5 = ["href", "onClick"];
var g5 = ["disabled"];
function f5(f12, w2, M2, S2, d8, v6) {
  return f12.state ? (openBlock(), createElementBlock("div", { key: 0, class: normalizeClass([f12.suit(), !f12.state.canRefine && f12.suit("", "noRefinement")]) }, [renderSlot(f12.$slots, "default", { items: f12.state.items, canRefine: f12.state.canRefine, canToggleShowMore: f12.state.canToggleShowMore, isShowingMore: f12.state.isShowingMore, refine: f12.state.refine, createURL: f12.state.createURL, toggleShowMore: f12.state.toggleShowMore, sendEvent: f12.state.sendEvent }, function() {
    return [createBaseVNode("ul", { class: normalizeClass(f12.suit("list")) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(f12.state.items, function(o12) {
      return openBlock(), createElementBlock("li", { key: o12.value, class: normalizeClass([f12.suit("item"), o12.isRefined && f12.suit("item", "selected")]) }, [createBaseVNode("a", { href: f12.state.createURL(o12.value), class: normalizeClass(f12.suit("link")), onClick: withModifiers(function(e6) {
        return f12.state.refine(o12.value);
      }, ["exact", "left", "prevent"]) }, [createBaseVNode("span", { class: normalizeClass(f12.suit("label")) }, toDisplayString(o12.label), 3), createBaseVNode("span", { class: normalizeClass(f12.suit("count")) }, toDisplayString(o12.count), 3)], 10, h5)], 2);
    }), 128))], 2), v6.showShowMoreButton ? (openBlock(), createElementBlock("button", { key: 0, class: normalizeClass([f12.suit("showMore"), !f12.state.canToggleShowMore && f12.suit("showMore", "disabled")]), disabled: !f12.state.canToggleShowMore, onClick: w2[0] || (w2[0] = withModifiers(function() {
      for (var e6, t4 = [], s5 = arguments.length; s5--; ) t4[s5] = arguments[s5];
      return f12.state.toggleShowMore && (e6 = f12.state).toggleShowMore.apply(e6, t4);
    }, ["prevent"])) }, [renderSlot(f12.$slots, "showMoreLabel", { isShowingMore: f12.state.isShowingMore }, function() {
      return [createTextVNode(toDisplayString(f12.state.isShowingMore ? "Show less" : "Show more"), 1)];
    })], 10, g5)) : createCommentVNode("", true)];
  })], 2)) : createCommentVNode("", true);
}

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/Menu.vue.js
Menu_vue_vue_type_script_lang_default.render = f5;
var Menu_vue_default = Menu_vue_vue_type_script_lang_default;

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/MenuSelect.vue_vue&type=script&lang.js
var MenuSelect_vue_vue_type_script_lang_default = { name: "AisMenuSelect", mixins: [t({ name: "MenuSelect" }), n3({ connector: connectMenu_default }, { $$widgetType: "ais.menuSelect" }), r3()], props: { attribute: { type: String, required: true }, limit: { type: Number, default: 10 }, sortBy: { type: [Array, Function], default: void 0 }, transformItems: { type: Function, default: function(t4) {
  return t4;
} } }, computed: { widgetParams: function() {
  return { attribute: this.attribute, limit: this.limit, sortBy: this.sortBy, transformItems: this.transformItems };
} }, methods: { refine: function(t4) {
  this.state.refine(t4);
} } };

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/MenuSelect.vue_vue&type=template&id=11a03a77&lang.js
init_vue_runtime_esm_bundler();
var c6 = ["value", "selected"];
function f6(f12, v6, d8, m12, p6, R) {
  return f12.state ? (openBlock(), createElementBlock("div", { key: 0, class: normalizeClass([f12.suit(), !f12.state.canRefine && f12.suit("", "noRefinement")]) }, [renderSlot(f12.$slots, "default", { items: f12.state.items, canRefine: f12.state.canRefine, refine: R.refine, createURL: f12.state.createURL, sendEvent: f12.state.sendEvent }, function() {
    return [createBaseVNode("select", { class: normalizeClass(f12.suit("select")), onChange: v6[0] || (v6[0] = function(e6) {
      return R.refine(e6.currentTarget.value);
    }) }, [createBaseVNode("option", { class: normalizeClass(f12.suit("option")), value: "" }, [renderSlot(f12.$slots, "defaultOption", {}, function() {
      return [createTextVNode(" See all ")];
    })], 2), (openBlock(true), createElementBlock(Fragment, null, renderList(f12.state.items, function(i6) {
      return openBlock(), createElementBlock("option", { key: i6.value, class: normalizeClass(f12.suit("option")), value: i6.value, selected: i6.isRefined }, [renderSlot(f12.$slots, "item", { item: i6 }, function() {
        return [createTextVNode(toDisplayString(i6.label) + " (" + toDisplayString(i6.count) + ") ", 1)];
      })], 10, c6);
    }), 128))], 34)];
  })], 2)) : createCommentVNode("", true);
}

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/MenuSelect.vue.js
MenuSelect_vue_vue_type_script_lang_default.render = f6;
var MenuSelect_vue_default = MenuSelect_vue_vue_type_script_lang_default;

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/NumericMenu.vue_vue&type=script&lang.js
var NumericMenu_vue_vue_type_script_lang_default = { name: "AisNumericMenu", mixins: [n3({ connector: connectNumericMenu_default }, { $$widgetType: "ais.numericMenu" }), t({ name: "NumericMenu" }), r3()], props: { attribute: { type: String, required: true }, items: { type: Array, required: true }, transformItems: { type: Function, default: void 0 } }, computed: { widgetParams: function() {
  return { attribute: this.attribute, transformItems: this.transformItems, items: this.items };
} } };

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/NumericMenu.vue_vue&type=template&id=583b28d4&lang.js
init_vue_runtime_esm_bundler();
var c7 = ["name", "value", "checked"];
function f7(f12, o12, d8, m12, v6, R) {
  return f12.state ? (openBlock(), createElementBlock("div", { key: 0, class: normalizeClass([f12.suit(), !f12.state.canRefine && f12.suit("", "noRefinement")]) }, [renderSlot(f12.$slots, "default", { items: f12.state.items, canRefine: f12.state.canRefine, refine: f12.state.refine, createURL: f12.state.createURL, sendEvent: f12.state.sendEvent }, function() {
    return [createBaseVNode("ul", { class: normalizeClass([f12.suit("list")]) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(f12.state.items, function(a6) {
      return openBlock(), createElementBlock("li", { key: a6.label, class: normalizeClass([f12.suit("item"), a6.isRefined && f12.suit("item", "selected")]) }, [createBaseVNode("label", { class: normalizeClass(f12.suit("label")) }, [createBaseVNode("input", { type: "radio", class: normalizeClass(f12.suit("radio")), name: d8.attribute, value: a6.value, checked: a6.isRefined, onChange: o12[0] || (o12[0] = function(e6) {
        return f12.state.refine(e6.target.value);
      }) }, null, 42, c7), createBaseVNode("span", { class: normalizeClass(f12.suit("labelText")) }, toDisplayString(a6.label), 3)], 2)], 2);
    }), 128))], 2)];
  })], 2)) : createCommentVNode("", true);
}

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/NumericMenu.vue.js
NumericMenu_vue_vue_type_script_lang_default.render = f7;
var NumericMenu_vue_default = NumericMenu_vue_vue_type_script_lang_default;

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/Pagination.vue_vue&type=script&lang.js
var Pagination_vue_vue_type_script_lang_default = { name: "AisPagination", mixins: [t({ name: "Pagination" }), n3({ connector: connectPagination_default }, { $$widgetType: "ais.pagination" }), r3()], props: { padding: { type: Number, default: void 0, validator: function(t4) {
  return t4 > 0;
} }, totalPages: { type: Number, default: void 0, validator: function(t4) {
  return t4 > 0;
} }, showFirst: { type: Boolean, default: true }, showLast: { type: Boolean, default: true }, showNext: { type: Boolean, default: true }, showPrevious: { type: Boolean, default: true } }, computed: { widgetParams: function() {
  return { padding: this.padding, totalPages: this.totalPages };
} }, emits: ["page-change"], methods: { refine: function(t4) {
  var e6 = Math.min(Math.max(t4, 0), this.state.nbPages - 1);
  this.state.refine(e6), this.$emit("page-change", e6);
} } };

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/Pagination.vue_vue&type=template&id=5b708f87&lang.js
init_vue_runtime_esm_bundler();
var f8 = ["href"];
var g6 = ["href"];
var P2 = ["href", "aria-label", "onClick"];
var o7 = ["href"];
var L2 = ["aria-label", "href"];
var m5 = ["aria-label"];
function k4(k5, R, b3, p6, U, v6) {
  var F2;
  return k5.state ? (openBlock(), createElementBlock("div", { key: 0, class: normalizeClass((F2 = {}, F2[k5.suit()] = true, F2[k5.suit("", "noRefinement")] = k5.state.nbPages <= 1, F2)) }, [renderSlot(k5.$slots, "default", { refine: v6.refine, createURL: k5.state.createURL, currentRefinement: k5.state.currentRefinement, nbHits: k5.state.nbHits, nbPages: k5.state.nbPages, pages: k5.state.pages, isFirstPage: k5.state.isFirstPage, isLastPage: k5.state.isLastPage }, function() {
    var p7, U2, F3, h8;
    return [createBaseVNode("ul", { class: normalizeClass(k5.suit("list")) }, [b3.showFirst ? (openBlock(), createElementBlock("li", { key: 0, class: normalizeClass((p7 = {}, p7[k5.suit("item")] = true, p7[k5.suit("item", "disabled")] = k5.state.isFirstPage, p7[k5.suit("item", "firstPage")] = true, p7)) }, [renderSlot(k5.$slots, "first", { createURL: function() {
      return k5.state.createURL(0);
    }, isFirstPage: k5.state.isFirstPage, refine: function() {
      return v6.refine(0);
    } }, function() {
      return [k5.state.isFirstPage ? (openBlock(), createElementBlock("span", { key: 1, class: normalizeClass(k5.suit("link")), "aria-label": "First Page" }, "‹‹", 2)) : (openBlock(), createElementBlock("a", { key: 0, class: normalizeClass(k5.suit("link")), "aria-label": "First Page", href: k5.state.createURL(0), onClick: R[0] || (R[0] = withModifiers(function(e6) {
        return v6.refine(0);
      }, ["exact", "left", "prevent"])) }, "‹‹", 10, f8))];
    })], 2)) : createCommentVNode("", true), b3.showPrevious ? (openBlock(), createElementBlock("li", { key: 1, class: normalizeClass((U2 = {}, U2[k5.suit("item")] = true, U2[k5.suit("item", "disabled")] = k5.state.isFirstPage, U2[k5.suit("item", "previousPage")] = true, U2)) }, [renderSlot(k5.$slots, "previous", { createURL: function() {
      return k5.state.createURL(k5.state.currentRefinement - 1);
    }, isFirstPage: k5.state.isFirstPage, refine: function() {
      return v6.refine(k5.state.currentRefinement - 1);
    } }, function() {
      return [k5.state.isFirstPage ? (openBlock(), createElementBlock("span", { key: 1, class: normalizeClass(k5.suit("link")), "aria-label": "Previous Page" }, "‹", 2)) : (openBlock(), createElementBlock("a", { key: 0, class: normalizeClass(k5.suit("link")), "aria-label": "Previous Page", href: k5.state.createURL(k5.state.currentRefinement - 1), onClick: R[1] || (R[1] = withModifiers(function(e6) {
        return v6.refine(k5.state.currentRefinement - 1);
      }, ["exact", "left", "prevent"])) }, "‹", 10, g6))];
    })], 2)) : createCommentVNode("", true), (openBlock(true), createElementBlock(Fragment, null, renderList(k5.state.pages, function(r7) {
      var u5;
      return openBlock(), createElementBlock("li", { class: normalizeClass((u5 = {}, u5[k5.suit("item")] = true, u5[k5.suit("item", "page")] = true, u5[k5.suit("item", "selected")] = k5.state.currentRefinement === r7, u5)), key: r7 }, [renderSlot(k5.$slots, "item", { page: r7, createURL: function() {
        return k5.state.createURL(r7);
      }, isFirstPage: k5.state.isFirstPage, isLastPage: k5.state.isLastPage, refine: function() {
        return v6.refine(r7);
      } }, function() {
        return [createBaseVNode("a", { class: normalizeClass(k5.suit("link")), href: k5.state.createURL(r7), "aria-label": "Page " + (r7 + 1), onClick: withModifiers(function(e6) {
          return v6.refine(r7);
        }, ["exact", "left", "prevent"]) }, toDisplayString(r7 + 1), 11, P2)];
      })], 2);
    }), 128)), b3.showNext ? (openBlock(), createElementBlock("li", { key: 2, class: normalizeClass((F3 = {}, F3[k5.suit("item")] = true, F3[k5.suit("item", "disabled")] = k5.state.isLastPage, F3[k5.suit("item", "nextPage")] = true, F3)) }, [renderSlot(k5.$slots, "next", { createURL: function() {
      return k5.state.createURL(k5.state.currentRefinement + 1);
    }, isLastPage: k5.state.isLastPage, refine: function() {
      return v6.refine(k5.state.currentRefinement + 1);
    } }, function() {
      return [k5.state.isLastPage ? (openBlock(), createElementBlock("span", { key: 1, class: normalizeClass(k5.suit("link")), "aria-label": "Next Page" }, "›", 2)) : (openBlock(), createElementBlock("a", { key: 0, class: normalizeClass(k5.suit("link")), "aria-label": "Next Page", href: k5.state.createURL(k5.state.currentRefinement + 1), onClick: R[2] || (R[2] = withModifiers(function(e6) {
        return v6.refine(k5.state.currentRefinement + 1);
      }, ["exact", "left", "prevent"])) }, "›", 10, o7))];
    })], 2)) : createCommentVNode("", true), b3.showLast ? (openBlock(), createElementBlock("li", { key: 3, class: normalizeClass((h8 = {}, h8[k5.suit("item")] = true, h8[k5.suit("item", "disabled")] = k5.state.isLastPage, h8[k5.suit("item", "lastPage")] = true, h8)) }, [renderSlot(k5.$slots, "last", { createURL: function() {
      return k5.state.createURL(k5.state.nbPages - 1);
    }, isLastPage: k5.state.isLastPage, refine: function() {
      return v6.refine(k5.state.nbPages - 1);
    } }, function() {
      return [k5.state.isLastPage ? (openBlock(), createElementBlock("span", { key: 1, class: normalizeClass(k5.suit("link")), "aria-label": "Last Page, Page " + k5.state.nbPages }, " ›› ", 10, m5)) : (openBlock(), createElementBlock("a", { key: 0, class: normalizeClass(k5.suit("link")), "aria-label": "Last Page, Page " + k5.state.nbPages, href: k5.state.createURL(k5.state.nbPages - 1), onClick: R[3] || (R[3] = withModifiers(function(e6) {
        return v6.refine(k5.state.nbPages - 1);
      }, ["exact", "left", "prevent"])) }, "››", 10, L2))];
    })], 2)) : createCommentVNode("", true)], 2)];
  })], 2)) : createCommentVNode("", true);
}

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/Pagination.vue.js
Pagination_vue_vue_type_script_lang_default.render = k4;
var Pagination_vue_default = Pagination_vue_vue_type_script_lang_default;

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/Panel.vue_vue&type=script&lang.js
var Panel_vue_vue_type_script_lang_default = { name: "AisPanel", mixins: [t({ name: "Panel" }), i2()], methods: { getSlot: function(i6) {
  return this.$slots[i6];
} } };

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/Panel.vue_vue&type=template&id=7fcc1827&lang.js
init_vue_runtime_esm_bundler();
function a4(a6, f12, r7, l4, c14, d8) {
  return openBlock(), createElementBlock("div", { class: normalizeClass([a6.suit(), !a6.canRefine && a6.suit("", "noRefinement")]) }, [d8.getSlot("header") ? (openBlock(), createElementBlock("div", { key: 0, class: normalizeClass(a6.suit("header")) }, [renderSlot(a6.$slots, "header", { hasRefinements: a6.canRefine })], 2)) : createCommentVNode("", true), createBaseVNode("div", { class: normalizeClass(a6.suit("body")) }, [renderSlot(a6.$slots, "default", { hasRefinements: a6.canRefine })], 2), d8.getSlot("footer") ? (openBlock(), createElementBlock("div", { key: 1, class: normalizeClass(a6.suit("footer")) }, [renderSlot(a6.$slots, "footer", { hasRefinements: a6.canRefine })], 2)) : createCommentVNode("", true)], 2);
}

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/Panel.vue.js
Panel_vue_vue_type_script_lang_default.render = a4;
var Panel_vue_default = Panel_vue_vue_type_script_lang_default;

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/PoweredBy.vue_vue&type=script&lang.js
var PoweredBy_vue_vue_type_script_lang_default = { name: "AisPoweredBy", mixins: [t({ name: "PoweredBy" })], props: { theme: { default: "light", validator: function(t4) {
  return -1 !== ["light", "dark"].indexOf(t4);
} } }, computed: { algoliaUrl: function() {
  return "https://www.algolia.com/?utm_source=vue-instantsearch&utm_medium=website&utm_content=" + (location ? location.hostname : "") + "&utm_campaign=poweredby";
} } };

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/PoweredBy.vue_vue&type=template&id=1cd6879e&lang.js
init_vue_runtime_esm_bundler();
var v4 = ["href"];
var m6 = ["fill"];
var s3 = ["fill"];
function e4(e6, t4, i6, r7, z2, o12) {
  return openBlock(), createElementBlock("div", { class: normalizeClass([e6.suit(), e6.suit("", i6.theme)]) }, [createBaseVNode("a", { class: normalizeClass(e6.suit("link")), href: o12.algoliaUrl, target: "_blank", rel: "noopener", "aria-label": "search by Algolia" }, [(openBlock(), createElementBlock("svg", { style: { height: "1.2em", width: "auto" }, class: normalizeClass([e6.suit("logo"), e6.suit("", i6.theme)]), viewBox: "0 0 572 64" }, [createBaseVNode("path", { fill: "dark" === i6.theme ? "#FFF" : "#36395A", d: "M16 48.3c-3.4 0-6.3-.6-8.7-1.7A12.4 12.4 0 0 1 1.9 42C.6 40 0 38 0 35.4h6.5a6.7 6.7 0 0 0 3.9 6c1.4.7 3.3 1.1 5.6 1.1 2.2 0 4-.3 5.4-1a7 7 0 0 0 3-2.4 6 6 0 0 0 1-3.4c0-1.5-.6-2.8-1.9-3.7-1.3-1-3.3-1.6-5.9-1.8l-4-.4c-3.7-.3-6.6-1.4-8.8-3.4a10 10 0 0 1-3.3-7.9c0-2.4.6-4.6 1.8-6.4a12 12 0 0 1 5-4.3c2.2-1 4.7-1.6 7.5-1.6s5.5.5 7.6 1.6a12 12 0 0 1 5 4.4c1.2 1.8 1.8 4 1.8 6.7h-6.5a6.4 6.4 0 0 0-3.5-5.9c-1-.6-2.6-1-4.4-1s-3.2.3-4.4 1c-1.1.6-2 1.4-2.6 2.4-.5 1-.8 2-.8 3.1a5 5 0 0 0 1.5 3.6c1 1 2.6 1.7 4.7 1.9l4 .3c2.8.2 5.2.8 7.2 1.8 2.1 1 3.7 2.2 4.9 3.8a9.7 9.7 0 0 1 1.7 5.8c0 2.5-.7 4.7-2 6.6a13 13 0 0 1-5.6 4.4c-2.4 1-5.2 1.6-8.4 1.6Zm35.6 0c-2.6 0-4.8-.4-6.7-1.3a13 13 0 0 1-4.7-3.5 17.1 17.1 0 0 1-3.6-10.4v-1c0-2 .3-3.8 1-5.6a13 13 0 0 1 7.3-8.3 15 15 0 0 1 6.3-1.4A13.2 13.2 0 0 1 64 24.3c1 2.2 1.6 4.6 1.6 7.2V34H39.4v-4.3h21.8l-1.8 2.2c0-2-.3-3.7-.9-5.1a7.3 7.3 0 0 0-2.7-3.4c-1.2-.7-2.7-1.1-4.6-1.1s-3.4.4-4.7 1.3a8 8 0 0 0-2.9 3.6c-.6 1.5-.9 3.3-.9 5.4 0 2 .3 3.7 1 5.3a7.9 7.9 0 0 0 2.8 3.7c1.3.8 3 1.3 5 1.3s3.8-.5 5.1-1.3c1.3-1 2.1-2 2.4-3.2h6a11.8 11.8 0 0 1-7 8.7 16 16 0 0 1-6.4 1.2ZM80 48c-2.2 0-4-.3-5.7-1a8.4 8.4 0 0 1-3.7-3.3 9.7 9.7 0 0 1-1.3-5.2c0-2 .5-3.8 1.5-5.2a9 9 0 0 1 4.3-3.1c1.8-.7 4-1 6.7-1H89v4.1h-7.5c-2 0-3.4.5-4.4 1.4-1 1-1.6 2.1-1.6 3.6s.5 2.7 1.6 3.6c1 1 2.5 1.4 4.4 1.4 1.1 0 2.2-.2 3.2-.7 1-.4 1.9-1 2.6-2 .6-1 1-2.4 1-4.2l1.7 2.1c-.2 2-.7 3.8-1.5 5.2a9 9 0 0 1-3.4 3.3 12 12 0 0 1-5.3 1Zm9.5-.7v-8.8h-1v-10c0-1.8-.5-3.2-1.4-4.1-1-1-2.4-1.4-4.2-1.4a142.9 142.9 0 0 0-10.2.4v-5.6a74.8 74.8 0 0 1 8.6-.4c3 0 5.5.4 7.5 1.2s3.4 2 4.4 3.6c1 1.7 1.4 4 1.4 6.7v18.4h-5Zm12.9 0V17.8h5v12.3h-.2c0-4.2 1-7.4 2.8-9.5a11 11 0 0 1 8.3-3.1h1v5.6h-2a9 9 0 0 0-6.3 2.2c-1.5 1.5-2.2 3.6-2.2 6.4v15.6h-6.4Zm34.4 1a15 15 0 0 1-6.6-1.3c-1.9-.9-3.4-2-4.7-3.5a15.5 15.5 0 0 1-2.7-5c-.6-1.7-1-3.6-1-5.4v-1c0-2 .4-3.8 1-5.6a15 15 0 0 1 2.8-4.9c1.3-1.5 2.8-2.6 4.6-3.5a16.4 16.4 0 0 1 13.3.2c2 1 3.5 2.3 4.8 4a12 12 0 0 1 2 6H144c-.2-1.6-1-3-2.2-4.1a7.5 7.5 0 0 0-5.2-1.7 8 8 0 0 0-4.7 1.3 8 8 0 0 0-2.8 3.6 13.8 13.8 0 0 0 0 10.3c.6 1.5 1.5 2.7 2.8 3.6s2.8 1.3 4.8 1.3c1.5 0 2.7-.2 3.8-.8a7 7 0 0 0 2.6-2c.7-1 1-2 1.2-3.2h6.2a11 11 0 0 1-2 6.2 15.1 15.1 0 0 1-11.8 5.5Zm19.7-1v-40h6.4V31h-1.3c0-3 .4-5.5 1.1-7.6a9.7 9.7 0 0 1 3.5-4.8A9.9 9.9 0 0 1 172 17h.3c3.5 0 6 1.1 7.9 3.5 1.7 2.3 2.6 5.7 2.6 10v16.8h-6.4V29.6c0-2.1-.6-3.8-1.8-5a6.4 6.4 0 0 0-4.8-1.8c-2 0-3.7.7-5 2a7.8 7.8 0 0 0-1.9 5.5v17h-6.4Zm63.8 1a12.2 12.2 0 0 1-10.9-6.2 19 19 0 0 1-1.8-7.3h1.4v12.5h-5.1v-40h6.4v19.8l-2 3.5c.2-3.1.8-5.7 1.9-7.7a11 11 0 0 1 4.4-4.5c1.8-1 3.9-1.5 6.1-1.5a13.4 13.4 0 0 1 12.8 9.1c.7 1.9 1 3.8 1 6v1c0 2.2-.3 4.1-1 6a13.6 13.6 0 0 1-13.2 9.4Zm-1.2-5.5a8.4 8.4 0 0 0 7.9-5c.7-1.5 1.1-3.3 1.1-5.3s-.4-3.8-1.1-5.3a8.7 8.7 0 0 0-3.2-3.6 9.6 9.6 0 0 0-9.2-.2 8.5 8.5 0 0 0-3.3 3.2c-.8 1.4-1.3 3-1.3 5v2.3a9 9 0 0 0 1.3 4.8 9 9 0 0 0 3.4 3c1.4.7 2.8 1 4.4 1Zm27.3 3.9-10-28.9h6.5l9.5 28.9h-6Zm-7.5 12.2v-5.7h4.9c1 0 2-.1 2.9-.4a4 4 0 0 0 2-1.4c.4-.7.9-1.6 1.2-2.7l8.6-30.9h6.2l-9.3 32.4a14 14 0 0 1-2.5 5 8.9 8.9 0 0 1-4 2.8c-1.5.6-3.4.9-5.6.9h-4.4Zm9-12.2v-5.2h6.4v5.2H248Z" }, null, 8, m6), createBaseVNode("path", { fill: "dark" === i6.theme ? "#FFF" : "#003DFF", d: "M534.4 9.1H528a.8.8 0 0 1-.7-.7V1.8c0-.4.2-.7.6-.8l6.5-1c.4 0 .8.2.9.6v7.8c0 .4-.4.7-.8.7zM428 35.2V.8c0-.5-.3-.8-.7-.8h-.2l-6.4 1c-.4 0-.7.4-.7.8v35c0 1.6 0 11.8 12.3 12.2.5 0 .8-.4.8-.8V43c0-.4-.3-.7-.6-.8-4.5-.5-4.5-6-4.5-7zm106.5-21.8H528c-.4 0-.7.4-.7.8v34c0 .4.3.8.7.8h6.5c.4 0 .8-.4.8-.8v-34c0-.5-.4-.8-.8-.8zm-17.7 21.8V.8c0-.5-.3-.8-.8-.8l-6.5 1c-.4 0-.7.4-.7.8v35c0 1.6 0 11.8 12.3 12.2.4 0 .8-.4.8-.8V43c0-.4-.3-.7-.7-.8-4.4-.5-4.4-6-4.4-7zm-22.2-20.6a16.5 16.5 0 0 1 8.6 9.3c.8 2.2 1.3 4.8 1.3 7.5a19.4 19.4 0 0 1-4.6 12.6 14.8 14.8 0 0 1-5.2 3.6c-2 .9-5.2 1.4-6.8 1.4a21 21 0 0 1-6.7-1.4 15.4 15.4 0 0 1-8.6-9.3 21.3 21.3 0 0 1 0-14.4 15.2 15.2 0 0 1 8.6-9.3c2-.8 4.3-1.2 6.7-1.2s4.6.4 6.7 1.2zm-6.7 27.6c2.7 0 4.7-1 6.2-3s2.2-4.3 2.2-7.8-.7-6.3-2.2-8.3-3.5-3-6.2-3-4.7 1-6.1 3c-1.5 2-2.2 4.8-2.2 8.3s.7 5.8 2.2 7.8 3.5 3 6.2 3zm-88.8-28.8c-6.2 0-11.7 3.3-14.8 8.2a18.6 18.6 0 0 0 4.8 25.2c1.8 1.2 4 1.8 6.2 1.7s.1 0 .1 0h.9c4.2-.7 8-4 9.1-8.1v7.4c0 .4.3.7.8.7h6.4a.7.7 0 0 0 .7-.7V14.2c0-.5-.3-.8-.7-.8h-13.5zm6.3 26.5a9.8 9.8 0 0 1-5.7 2h-.5a10 10 0 0 1-9.2-14c1.4-3.7 5-6.3 9-6.3h6.4v18.3zm152.3-26.5h13.5c.5 0 .8.3.8.7v33.7c0 .4-.3.7-.8.7h-6.4a.7.7 0 0 1-.8-.7v-7.4c-1.2 4-4.8 7.4-9 8h-.1a4.2 4.2 0 0 1-.5.1h-.9a10.3 10.3 0 0 1-7-2.6c-4-3.3-6.5-8.4-6.5-14.2 0-3.7 1-7.2 3-10 3-5 8.5-8.3 14.7-8.3zm.6 28.4c2.2-.1 4.2-.6 5.7-2V21.7h-6.3a9.8 9.8 0 0 0-9 6.4 10.2 10.2 0 0 0 9.1 13.9h.5zM452.8 13.4c-6.2 0-11.7 3.3-14.8 8.2a18.5 18.5 0 0 0 3.6 24.3 10.4 10.4 0 0 0 13 .6c2.2-1.5 3.8-3.7 4.5-6.1v7.8c0 2.8-.8 5-2.2 6.3-1.5 1.5-4 2.2-7.5 2.2l-6-.3c-.3 0-.7.2-.8.5l-1.6 5.5c-.1.4.1.8.5 1h.1c2.8.4 5.5.6 7 .6 6.3 0 11-1.4 14-4.1 2.7-2.5 4.2-6.3 4.5-11.4V14.2c0-.5-.4-.8-.8-.8h-13.5zm6.3 8.2v18.3a9.6 9.6 0 0 1-5.6 2h-1a10.3 10.3 0 0 1-8.8-14c1.4-3.7 5-6.3 9-6.3h6.4zM291 31.5A32 32 0 0 1 322.8 0h30.8c.6 0 1.2.5 1.2 1.2v61.5c0 1.1-1.3 1.7-2.2 1l-19.2-17a18 18 0 0 1-11 3.4 18.1 18.1 0 1 1 18.2-14.8c-.1.4-.5.7-.9.6-.1 0-.3 0-.4-.2l-3.8-3.4c-.4-.3-.6-.8-.7-1.4a12 12 0 1 0-2.4 8.3c.4-.4 1-.5 1.6-.2l14.7 13.1v-46H323a26 26 0 1 0 10 49.7c.8-.4 1.6-.2 2.3.3l3 2.7c.3.2.3.7 0 1l-.2.2a32 32 0 0 1-47.2-28.6z" }, null, 8, s3)], 2))], 10, v4)], 2);
}

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/PoweredBy.vue.js
PoweredBy_vue_vue_type_script_lang_default.render = e4;
var PoweredBy_vue_default = PoweredBy_vue_vue_type_script_lang_default;

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/QueryRuleContext.js
var QueryRuleContext_default = { name: "AisQueryRuleContext", mixins: [t({ name: "QueryRuleContext" }), n3({ connector: connectQueryRules_default }, { $$widgetType: "ais.queryRuleContext" })], props: { trackedFilters: { type: Object, required: true }, transformRuleContexts: { type: Function, required: false, default: void 0 } }, computed: { widgetParams: function() {
  return { trackedFilters: this.trackedFilters, transformRuleContexts: this.transformRuleContexts };
} }, render: function() {
  return null;
} };

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/QueryRuleCustomData.vue_vue&type=script&lang.js
var QueryRuleCustomData_vue_vue_type_script_lang_default = { name: "AisQueryRuleCustomData", mixins: [t({ name: "QueryRuleCustomData" }), n3({ connector: connectQueryRules_default }, { $$widgetType: "ais.queryRuleCustomData" })], props: { transformItems: { type: Function, required: false, default: void 0 } }, computed: { widgetParams: function() {
  return { transformItems: this.transformItems };
} } };

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/QueryRuleCustomData.vue_vue&type=template&id=1e550962&lang.js
init_vue_runtime_esm_bundler();
function m7(m12, f12, a6, c14, d8, p6) {
  return m12.state ? (openBlock(), createElementBlock("div", { key: 0, class: normalizeClass(m12.suit()) }, [renderSlot(m12.$slots, "default", { items: m12.state.items }, function() {
    return [(openBlock(true), createElementBlock(Fragment, null, renderList(m12.state.items, function(n6, s5) {
      return openBlock(), createElementBlock("div", { key: s5 }, [renderSlot(m12.$slots, "item", { item: n6 }, function() {
        return [createBaseVNode("pre", null, toDisplayString(n6), 1)];
      })]);
    }), 128))];
  })], 2)) : createCommentVNode("", true);
}

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/QueryRuleCustomData.vue.js
QueryRuleCustomData_vue_vue_type_script_lang_default.render = m7;
var QueryRuleCustomData_vue_default = QueryRuleCustomData_vue_vue_type_script_lang_default;

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/RangeInput.vue_vue&type=script&lang.js
var RangeInput_vue_vue_type_script_lang_default = { name: "AisRangeInput", mixins: [t({ name: "RangeInput" }), n3({ connector: connectRange_default }, { $$widgetType: "ais.rangeInput" }), r3()], props: { attribute: { type: String, required: true }, min: { type: Number, required: false, default: void 0 }, max: { type: Number, required: false, default: void 0 }, precision: { type: Number, required: false, default: 0 } }, data: function() {
  return { minInput: void 0, maxInput: void 0 };
}, updated: function() {
  this.minInput = void 0, this.maxInput = void 0;
}, computed: { widgetParams: function() {
  return { attribute: this.attribute, min: this.min, max: this.max, precision: this.precision };
}, step: function() {
  return 1 / Math.pow(10, this.precision);
}, values: function() {
  var t4 = this.state.start, i6 = t4[0], e6 = t4[1], n6 = this.state.range, r7 = n6.min, s5 = n6.max;
  return { min: i6 !== -1 / 0 && i6 !== r7 ? i6 : void 0, max: e6 !== 1 / 0 && e6 !== s5 ? e6 : void 0 };
} }, methods: { pick: function(t4, i6) {
  return null != t4 ? t4 : i6;
}, refine: function(t4) {
  var i6 = t4.min, e6 = t4.max;
  this.state.refine([i6, e6]);
} } };

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/RangeInput.vue_vue&type=template&id=3e30e816&lang.js
init_vue_runtime_esm_bundler();
var l2 = ["step", "min", "max", "placeholder", "value"];
var m8 = ["step", "min", "max", "placeholder", "value"];
function p2(p6, o12, c14, f12, v6, x3) {
  return p6.state ? (openBlock(), createElementBlock("div", { key: 0, class: normalizeClass([p6.suit(), !p6.state.canRefine && p6.suit("", "noRefinement")]) }, [renderSlot(p6.$slots, "default", { currentRefinement: x3.values, refine: x3.refine, canRefine: p6.state.canRefine, range: p6.state.range, sendEvent: p6.state.sendEvent }, function() {
    return [createBaseVNode("form", { class: normalizeClass(p6.suit("form")), onSubmit: o12[2] || (o12[2] = withModifiers(function(e6) {
      return x3.refine({ min: x3.pick(v6.minInput, x3.values.min), max: x3.pick(v6.maxInput, x3.values.max) });
    }, ["prevent"])) }, [createBaseVNode("label", { class: normalizeClass(p6.suit("label")) }, [renderSlot(p6.$slots, "minLabel"), createBaseVNode("input", { type: "number", class: normalizeClass([p6.suit("input"), p6.suit("input", "min")]), step: x3.step, min: p6.state.range.min, max: p6.state.range.max, placeholder: p6.state.range.min, value: x3.values.min, onChange: o12[0] || (o12[0] = function(e6) {
      return v6.minInput = e6.currentTarget.value;
    }) }, null, 42, l2)], 2), createBaseVNode("span", { class: normalizeClass(p6.suit("separator")) }, [renderSlot(p6.$slots, "separator", {}, function() {
      return [createTextVNode("to")];
    })], 2), createBaseVNode("label", { class: normalizeClass(p6.suit("label")) }, [renderSlot(p6.$slots, "maxLabel"), createBaseVNode("input", { class: normalizeClass([p6.suit("input"), p6.suit("input", "max")]), type: "number", step: x3.step, min: p6.state.range.min, max: p6.state.range.max, placeholder: p6.state.range.max, value: x3.values.max, onChange: o12[1] || (o12[1] = function(e6) {
      return v6.maxInput = e6.currentTarget.value;
    }) }, null, 42, m8)], 2), createBaseVNode("button", { class: normalizeClass(p6.suit("submit")), type: "submit" }, [renderSlot(p6.$slots, "submitLabel", {}, function() {
      return [createTextVNode(" Go ")];
    })], 2)], 34)];
  })], 2)) : createCommentVNode("", true);
}

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/RangeInput.vue.js
RangeInput_vue_vue_type_script_lang_default.render = p2;
var RangeInput_vue_default = RangeInput_vue_vue_type_script_lang_default;

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/RatingMenu.vue_vue&type=script&lang.js
var RatingMenu_vue_vue_type_script_lang_default = { name: "AisRatingMenu", mixins: [t({ name: "RatingMenu" }), n3({ connector: connectRatingMenu_default }, { $$widgetType: "ais.ratingMenu" }), r3()], props: { attribute: { type: String, required: true }, max: { type: Number, default: void 0 } }, computed: { widgetParams: function() {
  return { attribute: this.attribute, max: this.max };
} } };

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/RatingMenu.vue_vue&type=template&id=d26f07d0&lang.js
init_vue_runtime_esm_bundler();
var d4 = { style: { display: "none" } };
var f9 = [createBaseVNode("symbol", { id: "ais-RatingMenu-starSymbol", viewBox: "0 0 24 24" }, [createBaseVNode("path", { d: "M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" })], -1), createBaseVNode("symbol", { id: "ais-RatingMenu-starEmptySymbol", viewBox: "0 0 24 24" }, [createBaseVNode("path", { d: "M12 6.76l1.379 4.246h4.465l-3.612 2.625 1.379 4.246-3.611-2.625-3.612 2.625 1.379-4.246-3.612-2.625h4.465l1.38-4.246zm0-6.472l-2.833 8.718h-9.167l7.416 5.389-2.833 8.718 7.417-5.388 7.416 5.388-2.833-8.718 7.417-5.389h-9.167l-2.833-8.718z" })], -1)];
var h6 = ["href", "aria-label", "onClick"];
var m9 = [createBaseVNode("use", { "xlink:href": "#ais-RatingMenu-starSymbol" }, null, -1)];
var y3 = [createBaseVNode("use", { "xlink:href": "#ais-RatingMenu-starEmptySymbol" }, null, -1)];
function p3(p6, v6, R, b3, g9, k5) {
  return p6.state ? (openBlock(), createElementBlock("div", { key: 0, class: normalizeClass(p6.suit()) }, [renderSlot(p6.$slots, "default", { items: p6.state.items, refine: p6.state.refine, createURL: p6.state.createURL, sendEvent: p6.state.sendEvent, canRefine: p6.state.canRefine }, function() {
    return [(openBlock(), createElementBlock("svg", d4, f9)), createBaseVNode("ul", { class: normalizeClass(p6.suit("list")) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(p6.state.items, function(o12, d8) {
      return openBlock(), createElementBlock("li", { key: d8, class: normalizeClass([p6.suit("item"), o12.isRefined && p6.suit("item", "selected")]) }, [createBaseVNode("div", null, [createBaseVNode("a", { href: p6.state.createURL(o12.value), "aria-label": o12.value + " & up", class: normalizeClass(p6.suit("link")), onClick: withModifiers(function(t4) {
        return p6.state.refine(o12.value);
      }, ["exact", "left", "prevent"]) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(o12.stars, function(a6, i6) {
        return openBlock(), createElementBlock(Fragment, null, [a6 ? (openBlock(), createElementBlock("svg", { "aria-hidden": "true", width: "24", height: "24", class: normalizeClass([p6.suit("starIcon"), p6.suit("starIcon--full")]), key: i6 + "-full" }, m9, 2)) : (openBlock(), createElementBlock("svg", { class: normalizeClass([p6.suit("starIcon"), p6.suit("starIcon--empty")]), "aria-hidden": "true", width: "24", height: "24", key: i6 + "-empty" }, y3, 2))], 64);
      }), 256)), createBaseVNode("span", { class: normalizeClass(p6.suit("label")), "aria-hidden": "true" }, [renderSlot(p6.$slots, "andUp", {}, function() {
        return [createTextVNode("& Up")];
      })], 2), createBaseVNode("span", { class: normalizeClass(p6.suit("count")) }, toDisplayString(o12.count), 3)], 10, h6)])], 2);
    }), 128))], 2)];
  })], 2)) : createCommentVNode("", true);
}

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/RatingMenu.vue.js
RatingMenu_vue_vue_type_script_lang_default.render = p3;
var RatingMenu_vue_default = RatingMenu_vue_vue_type_script_lang_default;

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/SearchInput.vue_vue&type=script&lang.js
var SearchInput_vue_vue_type_script_lang_default = { name: "SearchInput", mixins: [t({ name: "SearchBox" })], props: { placeholder: { type: String, default: "Search here…" }, autofocus: { type: Boolean, default: false }, showLoadingIndicator: { type: Boolean, default: false }, shouldShowLoadingIndicator: { type: Boolean, default: false }, ignoreCompositionEvents: { type: Boolean, default: false }, submitTitle: { type: String, default: "Search" }, resetTitle: { type: String, default: "Clear" }, value: { type: String, required: false, default: void 0 }, modelValue: { type: String, required: false, default: void 0 } }, emits: ["input", "update:modelValue", "blur", "focus", "reset"], data: function() {
  return { query: "" };
}, methods: { isFocused: function() {
  return document.activeElement === this.$refs.input;
}, onInput: function(e6) {
  this.ignoreCompositionEvents && e6.isComposing || (this.$emit("input", e6.target.value), this.$emit("update:modelValue", e6.target.value));
}, onFormSubmit: function() {
  this.$refs.input.blur();
}, onFormReset: function() {
  this.$emit("input", ""), this.$emit("update:modelValue", ""), this.$emit("reset");
} } };

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/SearchInput.vue_vue&type=template&id=79e30e4e&lang.js
init_vue_runtime_esm_bundler();
var u4 = ["placeholder", "autofocus", "value"];
var s4 = ["title", "hidden"];
var c8 = [createBaseVNode("path", { d: "M26.804 29.01c-2.832 2.34-6.465 3.746-10.426 3.746C7.333 32.756 0 25.424 0 16.378 0 7.333 7.333 0 16.378 0c9.046 0 16.378 7.333 16.378 16.378 0 3.96-1.406 7.594-3.746 10.426l10.534 10.534c.607.607.61 1.59-.004 2.202-.61.61-1.597.61-2.202.004L26.804 29.01zm-10.426.627c7.323 0 13.26-5.936 13.26-13.26 0-7.32-5.937-13.257-13.26-13.257C9.056 3.12 3.12 9.056 3.12 16.378c0 7.323 5.936 13.26 13.258 13.26z" }, null, -1)];
var d5 = ["title", "hidden"];
var h7 = [createBaseVNode("path", { d: "M8.114 10L.944 2.83 0 1.885 1.886 0l.943.943L10 8.113l7.17-7.17.944-.943L20 1.886l-.943.943-7.17 7.17 7.17 7.17.943.944L18.114 20l-.943-.943-7.17-7.17-7.17 7.17-.944.943L0 18.114l.943-.943L8.113 10z" }, null, -1)];
var f10 = ["hidden"];
var m10 = ["aria-hidden"];
var p4 = [createStaticVNode('<g fill="none" fill-rule="evenodd"><g transform="translate(1 1)" stroke-width="2"><circle stroke-opacity=".5" cx="18" cy="18" r="18"></circle><path d="M36 18c0-9.94-8.06-18-18-18"><animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite"></animateTransform></path></g></g>', 1)];
function g7(l4, g9, v6, b3, w2, I2) {
  return openBlock(), createElementBlock("form", { action: "", role: "search", novalidate: "", class: normalizeClass(l4.suit("form")), onSubmit: g9[4] || (g9[4] = withModifiers(function() {
    for (var t4 = [], o12 = arguments.length; o12--; ) t4[o12] = arguments[o12];
    return I2.onFormSubmit && I2.onFormSubmit.apply(I2, t4);
  }, ["prevent"])), onReset: g9[5] || (g9[5] = withModifiers(function() {
    for (var t4 = [], o12 = arguments.length; o12--; ) t4[o12] = arguments[o12];
    return I2.onFormReset && I2.onFormReset.apply(I2, t4);
  }, ["prevent"])) }, [createBaseVNode("input", { type: "search", autocorrect: "off", autocapitalize: "off", autocomplete: "off", spellcheck: "false", maxlength: "512", "aria-label": "Search", placeholder: v6.placeholder, autofocus: v6.autofocus, class: normalizeClass(l4.suit("input")), value: v6.value || v6.modelValue, onFocus: g9[0] || (g9[0] = function(t4) {
    return l4.$emit("focus", t4);
  }), onBlur: g9[1] || (g9[1] = function(t4) {
    return l4.$emit("blur", t4);
  }), onInput: g9[2] || (g9[2] = function(t4) {
    return I2.onInput(t4);
  }), onCompositionend: g9[3] || (g9[3] = function(t4) {
    return I2.onInput(t4);
  }), ref: "input" }, null, 42, u4), createBaseVNode("button", { type: "submit", title: v6.submitTitle, class: normalizeClass(l4.suit("submit")), hidden: v6.showLoadingIndicator && v6.shouldShowLoadingIndicator }, [renderSlot(l4.$slots, "submit-icon", {}, function() {
    return [(openBlock(), createElementBlock("svg", { "aria-hidden": "true", width: "10", height: "10", viewBox: "0 0 40 40", class: normalizeClass(l4.suit("submitIcon")) }, c8, 2))];
  })], 10, s4), createBaseVNode("button", { type: "reset", title: v6.resetTitle, class: normalizeClass(l4.suit("reset")), hidden: !v6.value && !v6.modelValue || v6.showLoadingIndicator && v6.shouldShowLoadingIndicator }, [renderSlot(l4.$slots, "reset-icon", {}, function() {
    return [(openBlock(), createElementBlock("svg", { "aria-hidden": "true", height: "10", viewBox: "0 0 20 20", class: normalizeClass(l4.suit("resetIcon")), width: "10" }, h7, 2))];
  })], 10, d5), v6.showLoadingIndicator ? (openBlock(), createElementBlock("span", { key: 0, hidden: !v6.shouldShowLoadingIndicator, class: normalizeClass(l4.suit("loadingIndicator")) }, [renderSlot(l4.$slots, "loading-indicator", {}, function() {
    return [(openBlock(), createElementBlock("svg", { "aria-hidden": !v6.shouldShowLoadingIndicator, "aria-label": "Results are loading", width: "16", height: "16", stroke: "#444", viewBox: "0 0 38 38", class: normalizeClass(l4.suit("loadingIcon")) }, p4, 10, m10))];
  })], 10, f10)) : createCommentVNode("", true)], 34);
}

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/SearchInput.vue.js
SearchInput_vue_vue_type_script_lang_default.render = g7;
var SearchInput_vue_default = SearchInput_vue_vue_type_script_lang_default;

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/RefinementList.vue_vue&type=script&lang.js
var a5 = function() {
};
var RefinementList_vue_vue_type_script_lang_default = { name: "AisRefinementList", components: { SearchInput: SearchInput_vue_default, AisHighlight: Highlight_vue_default }, mixins: [t({ name: "RefinementList" }), n3({ connector: connectRefinementList_default }, { $$widgetType: "ais.refinementList" }), r3()], props: { attribute: { type: String, required: true }, searchable: { type: Boolean, default: void 0 }, searchablePlaceholder: { type: String, required: false, default: "Search here…" }, operator: { default: "or", validator: function(e6) {
  return "and" === e6 || "or" === e6;
}, required: false }, limit: { type: Number, required: false, default: void 0 }, showMoreLimit: { type: Number, required: false, default: void 0 }, showMore: { type: Boolean, required: false, default: false }, sortBy: { type: [Array, Function], required: false, default: void 0 }, transformItems: { type: Function, required: false, default: void 0 } }, data: function() {
  return { searchForFacetValuesQuery: "" };
}, computed: { searchForFacetValues: { get: function() {
  return this.searchForFacetValuesQuery;
}, set: function(e6) {
  this.state.searchForItems(e6), this.searchForFacetValuesQuery = e6;
} }, toggleShowMore: function() {
  return this.state.toggleShowMore || a5;
}, items: function() {
  return this.state.items.map(function(e6) {
    return Object.assign({}, e6, { _highlightResult: { item: { value: e6.highlighted } } });
  });
}, widgetParams: function() {
  return { attribute: this.attribute, operator: this.operator, limit: this.limit, showMore: this.showMore, showMoreLimit: this.showMoreLimit, sortBy: this.sortBy, escapeFacetValues: true, transformItems: this.transformItems };
} }, methods: { refine: function(e6) {
  this.state.refine(e6), this.searchForFacetValuesQuery = "";
} } };

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/RefinementList.vue_vue&type=template&id=e39e9d16&lang.js
init_vue_runtime_esm_bundler();
var g8 = ["value", "checked", "onChange"];
var m11 = ["disabled"];
function d6(d8, f12, w2, M2, S2, b3) {
  var v6 = resolveComponent("search-input"), F2 = resolveComponent("ais-highlight");
  return d8.state ? (openBlock(), createElementBlock("div", { key: 0, class: normalizeClass([d8.suit(), 0 === b3.items.length && d8.suit("", "noRefinement")]) }, [renderSlot(d8.$slots, "default", { items: b3.items, refine: b3.refine, searchForItems: d8.state.searchForItems, searchForItemsQuery: S2.searchForFacetValuesQuery, toggleShowMore: b3.toggleShowMore, canToggleShowMore: d8.state.canToggleShowMore, isShowingMore: d8.state.isShowingMore, createURL: d8.state.createURL, isFromSearch: d8.state.isFromSearch, canRefine: d8.state.canRefine, sendEvent: d8.state.sendEvent }, function() {
    var e6;
    return [w2.searchable ? (openBlock(), createElementBlock("div", { key: 0, class: normalizeClass(d8.suit("searchBox")) }, [createVNode(v6, { modelValue: b3.searchForFacetValues, "onUpdate:modelValue": f12[0] || (f12[0] = function(e7) {
      return b3.searchForFacetValues = e7;
    }), "show-loading-indicator": true, placeholder: w2.searchablePlaceholder, "class-names": d8.classNames }, null, 8, ["modelValue", "placeholder", "class-names"])], 2)) : createCommentVNode("", true), d8.state.isFromSearch && 0 === b3.items.length ? renderSlot(d8.$slots, "noResults", { key: 1, query: b3.searchForFacetValues }, function() {
      return [createBaseVNode("div", { class: normalizeClass(d8.suit("noResults")) }, "No results.", 2)];
    }) : createCommentVNode("", true), b3.items.length > 0 ? (openBlock(), createElementBlock("ul", { key: 2, class: normalizeClass(d8.suit("list")) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(b3.items, function(e7) {
      return openBlock(), createElementBlock("li", { class: normalizeClass([d8.suit("item"), e7.isRefined && d8.suit("item", "selected")]), key: e7.value }, [renderSlot(d8.$slots, "item", { item: e7, refine: b3.refine, createURL: d8.state.createURL }, function() {
        return [createBaseVNode("label", { class: normalizeClass(d8.suit("label")) }, [createBaseVNode("input", { class: normalizeClass(d8.suit("checkbox")), type: "checkbox", value: e7.value, checked: e7.isRefined, onChange: function(s5) {
          return b3.refine(e7.value);
        } }, null, 42, g8), w2.searchable ? (openBlock(), createElementBlock("span", { key: 0, class: normalizeClass(d8.suit("labelText")) }, [createVNode(F2, { attribute: "item", hit: e7 }, null, 8, ["hit"])], 2)) : (openBlock(), createElementBlock("span", { key: 1, class: normalizeClass(d8.suit("labelText")) }, toDisplayString(e7.label), 3)), createBaseVNode("span", { class: normalizeClass(d8.suit("count")) }, toDisplayString(e7.count), 3)], 2)];
      })], 2);
    }), 128))], 2)) : createCommentVNode("", true), w2.showMore ? (openBlock(), createElementBlock("button", { key: 3, class: normalizeClass([d8.suit("showMore"), (e6 = {}, e6[d8.suit("showMore", "disabled")] = !d8.state.canToggleShowMore, e6)]), onClick: f12[1] || (f12[1] = function() {
      for (var e7 = [], s5 = arguments.length; s5--; ) e7[s5] = arguments[s5];
      return b3.toggleShowMore && b3.toggleShowMore.apply(b3, e7);
    }), disabled: !d8.state.canToggleShowMore }, [renderSlot(d8.$slots, "showMoreLabel", { isShowingMore: d8.state.isShowingMore }, function() {
      return [createTextVNode(" Show " + toDisplayString(d8.state.isShowingMore ? "less" : "more"), 1)];
    })], 10, m11)) : createCommentVNode("", true)];
  })], 2)) : createCommentVNode("", true);
}

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/RefinementList.vue.js
RefinementList_vue_vue_type_script_lang_default.render = d6;
var RefinementList_vue_default = RefinementList_vue_vue_type_script_lang_default;

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/StateResults.vue_vue&type=script&lang.js
var n5;
var StateResults_vue_vue_type_script_lang_default = ((n5 = { name: "AisStateResults", mixins: [n3({ connector: true }), t({ name: "StateResults" })], props: { catchError: { type: Boolean, default: false } }, data: function() {
  var t4 = this;
  return { renderFn: function() {
    var e6 = t4.instantSearchInstance, r7 = e6.status, n6 = e6.error, s5 = t4.getParentIndex().getResults(), i6 = t4.getParentIndex().getHelper(), a6 = i6 ? i6.state : null;
    t4.state = { results: s5, state: a6, status: r7, error: n6 };
  } };
}, created: function() {
  this.instantSearchInstance.addListener("render", this.renderFn), this.renderFn();
} }).beforeUnmount = function() {
  this.widget && (this.instantSearchInstance.removeListener("render", this.renderFn), this.errorFn && this.instantSearchInstance.removeListener("error", this.errorFn));
}, n5.watch = { catchError: { immediate: true, handler: function(t4) {
  t4 ? (this.errorFn = function() {
  }, this.instantSearchInstance.addListener("error", this.errorFn)) : this.errorFn && (this.instantSearchInstance.removeListener("error", this.errorFn), this.errorFn = void 0);
} } }, n5.computed = { stateResults: function() {
  var t4 = this.state, r7 = t4.results, n6 = t4.state, s5 = t4.status, i6 = t4.error;
  return e({}, r7, { results: r7, state: n6, status: s5, error: i6 });
} }, n5);

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/StateResults.vue_vue&type=template&id=f5047700&lang.js
init_vue_runtime_esm_bundler();
var i3 = createBaseVNode("p", null, " Use this component to have a different layout based on a certain state. ", -1);
var c9 = createBaseVNode("p", null, "Fill in the slot, and get access to the following things:", -1);
function p5(p6, f12, d8, h8, v6, y5) {
  return p6.state && p6.state.state && p6.state.results ? (openBlock(), createElementBlock("div", { key: 0, class: normalizeClass(p6.suit()) }, [renderSlot(p6.$slots, "default", normalizeProps(guardReactiveProps(y5.stateResults)), function() {
    return [i3, c9, createBaseVNode("pre", null, "results: " + toDisplayString(Object.keys(p6.state.results)), 1), createBaseVNode("pre", null, "state: " + toDisplayString(Object.keys(p6.state.state)), 1), createBaseVNode("pre", null, "status: " + toDisplayString(p6.state.status), 1), createBaseVNode("pre", null, "error: " + toDisplayString(p6.state.error), 1)];
  })], 2)) : createCommentVNode("", true);
}

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/StateResults.vue.js
StateResults_vue_vue_type_script_lang_default.render = p5;
var StateResults_vue_default = StateResults_vue_vue_type_script_lang_default;

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/SearchBox.vue_vue&type=script&lang.js
var SearchBox_vue_vue_type_script_lang_default = { name: "AisSearchBox", mixins: [n3({ connector: connectSearchBox_default }, { $$widgetType: "ais.searchBox" }), t({ name: "SearchBox" })], components: { SearchInput: SearchInput_vue_default }, props: { placeholder: { type: String, default: "" }, autofocus: { type: Boolean, default: false }, showLoadingIndicator: { type: Boolean, default: true }, ignoreCompositionEvents: { type: Boolean, default: false }, submitTitle: { type: String, default: "Submit the search query" }, resetTitle: { type: String, default: "Clear the search query" }, value: { type: String, default: void 0 }, modelValue: { type: String, default: void 0 }, queryHook: { type: Function, default: void 0 } }, data: function() {
  return { localValue: "", isVue2: o, isVue3: r };
}, computed: { widgetParams: function() {
  return { queryHook: this.queryHook };
}, isControlled: function() {
  return void 0 !== this.value || void 0 !== this.modelValue;
}, model: function() {
  return this.value || this.modelValue;
}, currentRefinement: { get: function() {
  this.isControlled && this.model !== this.localValue && (this.localValue = this.model, this.$emit("input", this.model), this.$emit("update:modelValue", this.model), this.state.refine(this.model));
  var e6 = this.$refs.searchInput;
  return e6 && e6.isFocused() ? this.localValue : this.model || this.state.query || "";
}, set: function(e6) {
  this.localValue = e6, this.state.refine(e6), this.isControlled && (this.$emit("input", e6), this.$emit("update:modelValue", e6));
} } } };

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/SearchBox.vue_vue&type=template&id=b43316e4&lang.js
init_vue_runtime_esm_bundler();
function l3(l4, c14, d8, m12, f12, h8) {
  var g9 = resolveComponent("search-input");
  return l4.state ? (openBlock(), createElementBlock("div", { key: 0, class: normalizeClass(l4.suit()) }, [renderSlot(l4.$slots, "default", { currentRefinement: h8.currentRefinement, isSearchStalled: l4.state.isSearchStalled, refine: l4.state.refine }, function() {
    return [createVNode(g9, { onFocus: c14[0] || (c14[0] = function(e6) {
      return l4.$emit("focus", e6);
    }), onBlur: c14[1] || (c14[1] = function(e6) {
      return l4.$emit("blur", e6);
    }), onReset: c14[2] || (c14[2] = function(e6) {
      return l4.$emit("reset");
    }), placeholder: d8.placeholder, autofocus: d8.autofocus, "show-loading-indicator": d8.showLoadingIndicator, "should-show-loading-indicator": l4.state.isSearchStalled, "ignore-composition-events": d8.ignoreCompositionEvents, "submit-title": d8.submitTitle, "reset-title": d8.resetTitle, "class-names": l4.classNames, modelValue: h8.currentRefinement, "onUpdate:modelValue": c14[3] || (c14[3] = function(e6) {
      return h8.currentRefinement = e6;
    }), ref: "searchInput" }, createSlots({ default: withCtx(function() {
      return [f12.isVue2 ? renderSlot(l4.$slots, "loading-indicator", { key: 0, slot: "loading-indicator" }) : createCommentVNode("", true), f12.isVue2 ? renderSlot(l4.$slots, "submit-icon", { key: 1, slot: "submit-icon" }) : createCommentVNode("", true), f12.isVue2 ? renderSlot(l4.$slots, "reset-icon", { key: 2, slot: "reset-icon" }) : createCommentVNode("", true)];
    }), _: 2 }, [f12.isVue3 ? { name: "loading-indicator", fn: withCtx(function() {
      return [renderSlot(l4.$slots, "loading-indicator")];
    }), key: "0" } : void 0, f12.isVue3 ? { name: "submit-icon", fn: withCtx(function() {
      return [renderSlot(l4.$slots, "submit-icon")];
    }), key: "1" } : void 0, f12.isVue3 ? { name: "reset-icon", fn: withCtx(function() {
      return [renderSlot(l4.$slots, "reset-icon")];
    }), key: "2" } : void 0]), 1032, ["placeholder", "autofocus", "show-loading-indicator", "should-show-loading-indicator", "ignore-composition-events", "submit-title", "reset-title", "class-names", "modelValue"])];
  })], 2)) : createCommentVNode("", true);
}

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/SearchBox.vue.js
SearchBox_vue_vue_type_script_lang_default.render = l3;
var SearchBox_vue_default = SearchBox_vue_vue_type_script_lang_default;

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/Snippet.vue_vue&type=script&lang.js
var Snippet_vue_vue_type_script_lang_default = { name: "AisSnippet", mixins: [t({ name: "Snippet" })], components: { AisHighlighter: Highlighter_default }, props: { hit: { type: Object, required: true }, attribute: { type: String, required: true }, highlightedTagName: { type: String, default: "mark" } } };

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/Snippet.vue_vue&type=template&id=edc35952&lang.js
init_vue_runtime_esm_bundler();
function e5(e6, a6, g9, r7, u5, l4) {
  var p6 = resolveComponent("ais-highlighter");
  return openBlock(), createBlock(p6, { hit: g9.hit, attribute: g9.attribute, "highlighted-tag-name": g9.highlightedTagName, suit: e6.suit, "highlight-property": "_snippetResult", "pre-tag": "<mark>", "post-tag": "</mark>" }, null, 8, ["hit", "attribute", "highlighted-tag-name", "suit"]);
}

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/Snippet.vue.js
Snippet_vue_vue_type_script_lang_default.render = e5;
var Snippet_vue_default = Snippet_vue_vue_type_script_lang_default;

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/SortBy.vue_vue&type=script&lang.js
var SortBy_vue_vue_type_script_lang_default = { name: "AisSortBy", mixins: [t({ name: "SortBy" }), n3({ connector: connectSortBy_default }, { $$widgetType: "ais.sortBy" }), r3()], props: { items: { type: Array, required: true }, transformItems: { type: Function, default: void 0 } }, computed: { widgetParams: function() {
  return { items: this.items, transformItems: this.transformItems };
} } };

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/SortBy.vue_vue&type=template&id=78751313&lang.js
init_vue_runtime_esm_bundler();
var o8 = ["value", "selected"];
function c10(c14, f12, v6, R, m12, p6) {
  return c14.state ? (openBlock(), createElementBlock("div", { key: 0, class: normalizeClass(c14.suit()) }, [renderSlot(c14.$slots, "default", { items: c14.state.options, hasNoResults: c14.state.hasNoResults, refine: c14.state.refine, currentRefinement: c14.state.currentRefinement, canRefine: c14.state.canRefine }, function() {
    return [createBaseVNode("select", { class: normalizeClass(c14.suit("select")), onChange: f12[0] || (f12[0] = function(e6) {
      return c14.state.refine(e6.currentTarget.value);
    }), "aria-label": "Sort results by" }, [(openBlock(true), createElementBlock(Fragment, null, renderList(c14.state.options, function(s5) {
      return openBlock(), createElementBlock("option", { key: s5.value, class: normalizeClass(c14.suit("option")), value: s5.value, selected: s5.value === c14.state.currentRefinement }, toDisplayString(s5.label), 11, o8);
    }), 128))], 34)];
  })], 2)) : createCommentVNode("", true);
}

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/SortBy.vue.js
SortBy_vue_vue_type_script_lang_default.render = c10;
var SortBy_vue_default = SortBy_vue_vue_type_script_lang_default;

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/Stats.vue_vue&type=script&lang.js
var Stats_vue_vue_type_script_lang_default = { name: "AisStats", mixins: [n3({ connector: connectStats_default }, { $$widgetType: "ais.stats" }), t({ name: "Stats" })], computed: { sortedResultsSentence: function() {
  var t4 = this.state, e6 = t4.nbHits, s5 = t4.nbSortedHits, r7 = "sorted out of " + e6.toLocaleString();
  return 0 === s5 ? "No relevant results " + r7 : 1 === s5 ? "1 relevant result " + r7 : s5 > 1 ? (s5 || 0).toLocaleString() + " relevant results " + r7 : "";
}, resultsSentence: function() {
  var t4 = this.state.nbHits;
  return 0 === t4 ? "No results" : 1 === t4 ? "1 result" : t4 > 1 ? t4.toLocaleString() + " results" : "";
}, widgetParams: function() {
  return {};
} } };

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/Stats.vue_vue&type=template&id=67854642&lang.js
init_vue_runtime_esm_bundler();
function c11(c14, S2, d8, f12, p6, m12) {
  return c14.state ? (openBlock(), createElementBlock("div", { key: 0, class: normalizeClass(c14.suit()) }, [renderSlot(c14.$slots, "default", mergeProps(c14.state, { results: c14.state.instantSearchInstance.helper.lastResults }), function() {
    return [createBaseVNode("span", { class: normalizeClass(c14.suit("text")) }, [c14.state.areHitsSorted ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createTextVNode(toDisplayString(m12.sortedResultsSentence), 1)], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [createTextVNode(toDisplayString(m12.resultsSentence), 1)], 64)), createTextVNode(" found in " + toDisplayString(c14.state.processingTimeMS.toLocaleString()) + "ms", 1)], 2)];
  })], 2)) : createCommentVNode("", true);
}

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/Stats.vue.js
Stats_vue_vue_type_script_lang_default.render = c11;
var Stats_vue_default = Stats_vue_vue_type_script_lang_default;

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/ToggleRefinement.vue_vue&type=script&lang.js
var ToggleRefinement_vue_vue_type_script_lang_default = { name: "AisToggleRefinement", mixins: [t({ name: "ToggleRefinement" }), n3({ connector: connectToggleRefinement_default }, { $$widgetType: "ais.toggleRefinement" }), r3()], props: { attribute: { type: String, required: true }, on: { type: [String, Number, Boolean, Array], required: false, default: true }, off: { type: [String, Number, Boolean, Array], required: false, default: void 0 }, label: { type: String, default: void 0 } }, computed: { widgetParams: function() {
  return { attribute: this.attribute, on: this.on, off: this.off };
} } };

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/ToggleRefinement.vue_vue&type=template&id=fc27238e&lang.js
init_vue_runtime_esm_bundler();
var c12 = ["name", "value", "checked"];
function i4(i6, o12, r7, v6, f12, d8) {
  return i6.state ? (openBlock(), createElementBlock("div", { key: 0, class: normalizeClass([i6.suit(), !i6.state.canRefine && i6.suit("", "noRefinement")]) }, [renderSlot(i6.$slots, "default", { value: i6.state.value, canRefine: i6.state.canRefine, refine: i6.state.refine, createURL: i6.state.createURL, sendEvent: i6.state.sendEvent }, function() {
    return [createBaseVNode("label", { class: normalizeClass(i6.suit("label")) }, [createBaseVNode("input", { class: normalizeClass(i6.suit("checkbox")), type: "checkbox", name: i6.state.value.name, value: r7.on, checked: i6.state.value.isRefined, onChange: o12[0] || (o12[0] = function(e6) {
      return i6.state.refine(i6.state.value);
    }) }, null, 42, c12), createBaseVNode("span", { class: normalizeClass(i6.suit("labelText")) }, toDisplayString(r7.label || i6.state.value.name), 3), null !== i6.state.value.count ? (openBlock(), createElementBlock("span", { key: 0, class: normalizeClass(i6.suit("count")) }, toDisplayString(i6.state.value.count.toLocaleString()), 3)) : createCommentVNode("", true)], 2)];
  })], 2)) : createCommentVNode("", true);
}

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/ToggleRefinement.vue.js
ToggleRefinement_vue_vue_type_script_lang_default.render = i4;
var ToggleRefinement_vue_default = ToggleRefinement_vue_vue_type_script_lang_default;

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/VoiceSearch.vue_vue&type=script&lang.js
var VoiceSearch_vue_vue_type_script_lang_default = { name: "AisVoiceSearch", mixins: [n3({ connector: connectVoiceSearch_default }, { $$widgetType: "ais.voiceSearch" }), t({ name: "VoiceSearch" })], props: { searchAsYouSpeak: { type: Boolean, required: false, default: void 0 }, language: { type: String, default: void 0 }, additionalQueryParameters: { type: Object, default: void 0 }, buttonTitle: { type: String, required: false, default: "Search by voice" }, disabledButtonTitle: { type: String, required: false, default: "Search by voice (not supported on this browser)" } }, data: function() {
  return { buttonSvgAttrs: { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" } };
}, computed: { widgetParams: function() {
  return { searchAsYouSpeak: this.searchAsYouSpeak, language: this.language, additionalQueryParameters: this.additionalQueryParameters };
}, errorNotAllowed: function() {
  return "error" === this.state.voiceListeningState.status && "not-allowed" === this.state.voiceListeningState.errorCode;
}, rootSlotProps: function() {
  return { isBrowserSupported: this.state.isBrowserSupported, isListening: this.state.isListening, toggleListening: this.state.toggleListening, voiceListeningState: this.state.voiceListeningState };
}, innerSlotProps: function() {
  return { status: this.state.voiceListeningState.status, errorCode: this.state.voiceListeningState.errorCode, isListening: this.state.isListening, transcript: this.state.voiceListeningState.transcript, isSpeechFinal: this.state.voiceListeningState.isSpeechFinal, isBrowserSupported: this.state.isBrowserSupported };
} }, methods: { handleClick: function(t4) {
  t4.currentTarget.blur(), this.state.toggleListening();
} } };

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/VoiceSearch.vue_vue&type=template&id=c25adbd0&lang.js
init_vue_runtime_esm_bundler();
var d7 = ["title", "disabled"];
var v5 = [createStaticVNode('<line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line>', 5)];
var y4 = ["fill"];
var c13 = createBaseVNode("path", { d: "M19 10v2a7 7 0 0 1-14 0v-2" }, null, -1);
var x2 = createBaseVNode("line", { x1: "12", y1: "19", x2: "12", y2: "23" }, null, -1);
var b2 = createBaseVNode("line", { x1: "8", y1: "23", x2: "16", y2: "23" }, null, -1);
function f11(p6, f12, h8, S2, g9, k5) {
  return p6.state ? (openBlock(), createElementBlock("div", { key: 0, class: normalizeClass(p6.suit()) }, [renderSlot(p6.$slots, "default", normalizeProps(guardReactiveProps(k5.rootSlotProps)), function() {
    return [createBaseVNode("button", { type: "button", class: normalizeClass(p6.suit("button")), title: p6.state.isBrowserSupported ? h8.buttonTitle : h8.disabledButtonTitle, disabled: !p6.state.isBrowserSupported, onClick: f12[0] || (f12[0] = function() {
      for (var t4 = [], n6 = arguments.length; n6--; ) t4[n6] = arguments[n6];
      return k5.handleClick && k5.handleClick.apply(k5, t4);
    }) }, [renderSlot(p6.$slots, "buttonText", normalizeProps(guardReactiveProps(k5.innerSlotProps)), function() {
      return [k5.errorNotAllowed ? (openBlock(), createElementBlock("svg", normalizeProps(mergeProps({ key: 0 }, g9.buttonSvgAttrs)), v5, 16)) : (openBlock(), createElementBlock("svg", normalizeProps(mergeProps({ key: 1 }, g9.buttonSvgAttrs)), [createBaseVNode("path", { d: "M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z", fill: p6.state.isListening ? "currentColor" : "none" }, null, 8, y4), c13, x2, b2], 16))];
    })], 10, d7), createBaseVNode("div", { class: normalizeClass(p6.suit("status")) }, [renderSlot(p6.$slots, "status", normalizeProps(guardReactiveProps(k5.innerSlotProps)), function() {
      return [createBaseVNode("p", null, toDisplayString(p6.state.voiceListeningState.transcript), 1)];
    })], 2)];
  })], 2)) : createCommentVNode("", true);
}

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/VoiceSearch.vue.js
VoiceSearch_vue_vue_type_script_lang_default.render = f11;
var VoiceSearch_vue_default = VoiceSearch_vue_vue_type_script_lang_default;

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/RelevantSort.vue_vue&type=script&lang.js
var RelevantSort_vue_vue_type_script_lang_default = { name: "AisRelevantSort", mixins: [t({ name: "RelevantSort" }), n3({ connector: connectRelevantSort_default }, { $$widgetType: "ais.relevantSort" })], methods: { refine: function() {
  this.state.isRelevantSorted ? this.state.refine(0) : this.state.refine(void 0);
} } };

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/RelevantSort.vue_vue&type=template&id=d83cf556&lang.js
init_vue_runtime_esm_bundler();
function o9(o12, u5, v6, d8, c14, f12) {
  return o12.state && o12.state.isVirtualReplica ? (openBlock(), createElementBlock("div", { key: 0, class: normalizeClass(o12.suit()) }, [renderSlot(o12.$slots, "default", { isRelevantSorted: o12.state.isRelevantSorted, refine: o12.state.refine }, function() {
    return [createBaseVNode("div", { class: normalizeClass(o12.suit("text")) }, [renderSlot(o12.$slots, "text", { isRelevantSorted: o12.state.isRelevantSorted })], 2), createBaseVNode("button", { type: "button", class: normalizeClass(o12.suit("button")), onClick: u5[0] || (u5[0] = function(t4) {
      return f12.refine();
    }) }, [renderSlot(o12.$slots, "button", { isRelevantSorted: o12.state.isRelevantSorted }, function() {
      return [createTextVNode(toDisplayString(o12.state.isRelevantSorted ? "See all results" : "See relevant results"), 1)];
    })], 2)];
  })], 2)) : createCommentVNode("", true);
}

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/RelevantSort.vue.js
RelevantSort_vue_vue_type_script_lang_default.render = o9;
var RelevantSort_vue_default = RelevantSort_vue_vue_type_script_lang_default;

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/DynamicWidgets.js
var DynamicWidgets_default = { name: "AisDynamicWidgets", mixins: [n3({ connector: connectDynamicWidgets_default }, { $$widgetType: "ais.dynamicWidgets" }), t({ name: "DynamicWidgets" })], props: { transformItems: { type: Function, default: void 0 }, facets: { type: Array, default: void 0 }, maxValuesPerFacet: { type: Number, default: void 0 } }, render: n(function(t4) {
  var i6 = this, s5 = /* @__PURE__ */ new Map();
  if ((s(this) || []).forEach(function(e6) {
    var r7 = function t5(e7) {
      var i7, r8 = e7.props;
      if (r8) {
        if (r8.attribute) return r8.attribute;
        if (Array.isArray(r8.attributes)) return r8.attributes[0];
      }
      if (i7 = e7.children && e7.children.default && e7.children.default(), Array.isArray(i7)) return i7.reduce(function(e8, i8) {
        return e8 || t5(i8);
      }, void 0);
    }(e6);
    r7 && s5.set(r7, t4("div", { key: r7, class: [i6.suit("widget")] }, [e6]));
  }), !this.state) {
    var a6 = [];
    return s5.forEach(function(t5) {
      return a6.push(t5);
    }), t4("div", e({ class: [this.suit()] }, { attrs: { hidden: true } }), a6);
  }
  return t4("div", { class: [this.suit()] }, this.state.attributesToRender.map(function(t5) {
    return s5.get(t5);
  }));
}), computed: { widgetParams: function() {
  return { transformItems: this.transformItems, facets: this.facets, maxValuesPerFacet: this.maxValuesPerFacet, widgets: [] };
} } };

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/components/ExperimentalDynamicWidgets.js
var ExperimentalDynamicWidgets_default = Object.assign({}, DynamicWidgets_default, { name: "AisExperimentalDynamicWidgets", mounted: function() {
  a("Use AisDynamicWidgets instead of AisExperimentalDynamicWidgets.");
} });

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/widgets.js
var widgets_exports = {};
__export(widgets_exports, {
  AisAutocomplete: () => Autocomplete_vue_default,
  AisBreadcrumb: () => Breadcrumb_vue_default,
  AisClearRefinements: () => ClearRefinements_vue_default,
  AisConfigure: () => Configure_default,
  AisCurrentRefinements: () => CurrentRefinements_vue_default,
  AisDynamicWidgets: () => DynamicWidgets_default,
  AisExperimentalConfigureRelatedItems: () => ConfigureRelatedItems_default,
  AisExperimentalDynamicWidgets: () => ExperimentalDynamicWidgets_default,
  AisHierarchicalMenu: () => HierarchicalMenu_vue_default,
  AisHighlight: () => Highlight_vue_default,
  AisHits: () => Hits_default,
  AisHitsPerPage: () => HitsPerPage_vue_default,
  AisIndex: () => Index_default,
  AisInfiniteHits: () => InfiniteHits_vue_default,
  AisInstantSearch: () => InstantSearch_default2,
  AisInstantSearchSsr: () => InstantSearchSsr_default,
  AisMenu: () => Menu_vue_default,
  AisMenuSelect: () => MenuSelect_vue_default,
  AisNumericMenu: () => NumericMenu_vue_default,
  AisPagination: () => Pagination_vue_default,
  AisPanel: () => Panel_vue_default,
  AisPoweredBy: () => PoweredBy_vue_default,
  AisQueryRuleContext: () => QueryRuleContext_default,
  AisQueryRuleCustomData: () => QueryRuleCustomData_vue_default,
  AisRangeInput: () => RangeInput_vue_default,
  AisRatingMenu: () => RatingMenu_vue_default,
  AisRefinementList: () => RefinementList_vue_default,
  AisRelevantSort: () => RelevantSort_vue_default,
  AisSearchBox: () => SearchBox_vue_default,
  AisSnippet: () => Snippet_vue_default,
  AisSortBy: () => SortBy_vue_default,
  AisStateResults: () => StateResults_vue_default,
  AisStats: () => Stats_vue_default,
  AisToggleRefinement: () => ToggleRefinement_vue_default,
  AisVoiceSearch: () => VoiceSearch_vue_default
});

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/plugin.js
var o10 = { install: function(o12) {
  Object.keys(widgets_exports).forEach(function(t4) {
    o12.component(widgets_exports[t4].name, widgets_exports[t4]);
  });
} };

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/util/createServerRootMixin.js
init_vue_runtime_esm_bundler();

// node_modules/.pnpm/instantsearch.js@4.77.0_algoliasearch@5.19.0/node_modules/instantsearch.js/es/lib/server.js
function _typeof49(o12) {
  "@babel/helpers - typeof";
  return _typeof49 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o13) {
    return typeof o13;
  } : function(o13) {
    return o13 && "function" == typeof Symbol && o13.constructor === Symbol && o13 !== Symbol.prototype ? "symbol" : typeof o13;
  }, _typeof49(o12);
}
function ownKeys43(e6, r7) {
  var t4 = Object.keys(e6);
  if (Object.getOwnPropertySymbols) {
    var o12 = Object.getOwnPropertySymbols(e6);
    r7 && (o12 = o12.filter(function(r8) {
      return Object.getOwnPropertyDescriptor(e6, r8).enumerable;
    })), t4.push.apply(t4, o12);
  }
  return t4;
}
function _objectSpread43(e6) {
  for (var r7 = 1; r7 < arguments.length; r7++) {
    var t4 = null != arguments[r7] ? arguments[r7] : {};
    r7 % 2 ? ownKeys43(Object(t4), true).forEach(function(r8) {
      _defineProperty46(e6, r8, t4[r8]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e6, Object.getOwnPropertyDescriptors(t4)) : ownKeys43(Object(t4)).forEach(function(r8) {
      Object.defineProperty(e6, r8, Object.getOwnPropertyDescriptor(t4, r8));
    });
  }
  return e6;
}
function _defineProperty46(obj, key, value) {
  key = _toPropertyKey45(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey45(t4) {
  var i6 = _toPrimitive45(t4, "string");
  return "symbol" == _typeof49(i6) ? i6 : String(i6);
}
function _toPrimitive45(t4, r7) {
  if ("object" != _typeof49(t4) || !t4) return t4;
  var e6 = t4[Symbol.toPrimitive];
  if (void 0 !== e6) {
    var i6 = e6.call(t4, r7 || "default");
    if ("object" != _typeof49(i6)) return i6;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r7 ? String : Number)(t4);
}
function waitForResults(search) {
  var skipRecommend = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
  var helper = search.mainHelper;
  var requestParamsList;
  var client = helper.getClient();
  if (search.compositionID) {
    helper.setClient(_objectSpread43(_objectSpread43({}, client), {}, {
      search: function search2(query) {
        requestParamsList = [query.requestBody.params];
        return client.search(query);
      }
    }));
  } else {
    helper.setClient(_objectSpread43(_objectSpread43({}, client), {}, {
      search: function search2(queries) {
        requestParamsList = queries.map(function(_ref) {
          var params = _ref.params;
          return params;
        });
        return client.search(queries);
      }
    }));
  }
  if (search._hasSearchWidget) {
    if (search.compositionID) {
      helper.searchWithComposition();
    } else {
      helper.searchOnlyWithDerivedHelpers();
    }
  }
  !skipRecommend && search._hasRecommendWidget && helper.recommend();
  return new Promise(function(resolve, reject) {
    var searchResultsReceived = !search._hasSearchWidget;
    var recommendResultsReceived = !search._hasRecommendWidget || skipRecommend;
    helper.derivedHelpers[0].on("result", function() {
      searchResultsReceived = true;
      if (recommendResultsReceived) {
        resolve(requestParamsList);
      }
    });
    helper.derivedHelpers[0].on("recommend:result", function() {
      recommendResultsReceived = true;
      if (searchResultsReceived) {
        resolve(requestParamsList);
      }
    });
    helper.on("error", function(error) {
      reject(error);
    });
    search.on("error", function(error) {
      reject(error);
    });
    helper.derivedHelpers.forEach(function(derivedHelper) {
      return derivedHelper.on("error", function(error) {
        reject(error);
      });
    });
  });
}
function getInitialResults(rootIndex, requestParamsList) {
  var initialResults = {};
  var requestParamsIndex = 0;
  walkIndex(rootIndex, function(widget) {
    var _widget$getHelper;
    var searchResults = widget.getResults();
    var recommendResults = (_widget$getHelper = widget.getHelper()) === null || _widget$getHelper === void 0 ? void 0 : _widget$getHelper.lastRecommendResults;
    if (searchResults || recommendResults) {
      var _searchResults$_rawRe, _requestParams$, _requestParams$2;
      var resultsCount = (searchResults === null || searchResults === void 0 ? void 0 : (_searchResults$_rawRe = searchResults._rawResults) === null || _searchResults$_rawRe === void 0 ? void 0 : _searchResults$_rawRe.length) || 0;
      var requestParams = resultsCount ? requestParamsList === null || requestParamsList === void 0 ? void 0 : requestParamsList.slice(requestParamsIndex, requestParamsIndex + resultsCount) : [];
      requestParamsIndex += resultsCount;
      initialResults[widget.getIndexId()] = _objectSpread43(_objectSpread43(_objectSpread43({}, searchResults && {
        state: _objectSpread43(_objectSpread43({}, searchResults._state), {}, {
          clickAnalytics: requestParams === null || requestParams === void 0 ? void 0 : (_requestParams$ = requestParams[0]) === null || _requestParams$ === void 0 ? void 0 : _requestParams$.clickAnalytics,
          userToken: requestParams === null || requestParams === void 0 ? void 0 : (_requestParams$2 = requestParams[0]) === null || _requestParams$2 === void 0 ? void 0 : _requestParams$2.userToken
        }),
        results: searchResults._rawResults
      }), recommendResults && {
        recommendResults: {
          // We have to stringify + parse because of some explicitly undefined values.
          params: JSON.parse(JSON.stringify(recommendResults._state.params)),
          results: recommendResults._rawResults
        }
      }), requestParams && {
        requestParams
      });
    }
  });
  if (Object.keys(initialResults).length === 0) {
    throw new Error("The root index does not have any results. Make sure you have at least one widget that provides results.");
  }
  return initialResults;
}

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/src/util/createServerRootMixin.js
function o11(e6, r7) {
  void 0 === r7 && (r7 = {});
  var n6 = r7.mixins;
  void 0 === n6 && (n6 = []);
  var s5, o12 = { serverPrefetch: void 0, fetch: void 0, _base: void 0, name: "ais-ssr-root-component" }, i6 = Object.assign({}, e6.$options, o12);
  return i6.mixins = n6.concat(i6.mixins || []), s5 = createSSRApp(i6), e6.$router && s5.use(e6.$router), e6.$store && s5.use(e6.$store), e6.$i18n && s5.use(e6.$i18n), s5.$slots = e6.$slots, s5.$root = e6.$root, s5;
}
function i5(t4) {
  void 0 === t4 && (t4 = {});
  var i6 = t4.$cloneComponent;
  void 0 === i6 && (i6 = o11);
  var a6 = function(t5, o12) {
    var i7, a7 = es_default(t5);
    return a7.findResultsState = function(t6) {
      var e6, r7, u5 = t6.component, c14 = t6.renderToString;
      if (!c14) throw new Error("findResultsState requires `renderToString: (component) => Promise<string>` in the first argument.");
      return Promise.resolve().then(function() {
        e6 = o12(u5, { mixins: [{ beforeCreate: function() {
          var t7 = Object.getOwnPropertyDescriptor(u5, "$nuxt"), e7 = !!t7 && (t7.writable || t7.set);
          u5.$nuxt && e7 && (this.$nuxt = u5.$nuxt);
        }, created: function() {
          (r7 = this.instantsearch).start(), r7.started = false;
        } }] });
      }).then(function() {
        return c14(e6);
      }).then(function() {
        return waitForResults(r7);
      }).then(function(t7) {
        return i7 = getInitialResults(r7.mainIndex, t7), a7.hydrate(i7), a7.getState();
      });
    }, a7.getState = function() {
      if (!i7) throw new Error("You need to wait for findResultsState to finish");
      return i7;
    }, a7.__forceRender = function(t6, e6) {
      var r7 = e6.getResults();
      if (null !== r7) {
        var n6 = r7._state, s5 = e6.getHelper();
        s5.state = n6, t6.render({ helper: s5, results: r7, scopedResults: e6.getScopedResults(), parent: e6, state: n6, templatesConfig: {}, createURL: e6.createURL, instantSearchInstance: a7, searchMetadata: { isSearchStalled: false } });
      }
    }, a7.hydrate = function(t6) {
      t6 ? (a7._initialResults = t6, a7.start(), a7.started = false) : a("The result of `findResultsState()` needs to be passed to `hydrate()`.");
    }, a7;
  }(t4, i6);
  return { provide: function() {
    return { $_ais_ssrInstantSearchInstance: this.instantsearch };
  }, data: function() {
    return { instantsearch: a6 };
  } };
}

// node_modules/.pnpm/vue-instantsearch@4.20.1_@vue+server-renderer@3.5.13_vue@3.5.13_typescript@4.9.5___algoliasea_bj3623diejitb2xhonptvx632y/node_modules/vue-instantsearch/vue3/es/index.js
var es_default2 = o10;
export {
  Autocomplete_vue_default as AisAutocomplete,
  Breadcrumb_vue_default as AisBreadcrumb,
  ClearRefinements_vue_default as AisClearRefinements,
  Configure_default as AisConfigure,
  CurrentRefinements_vue_default as AisCurrentRefinements,
  DynamicWidgets_default as AisDynamicWidgets,
  ConfigureRelatedItems_default as AisExperimentalConfigureRelatedItems,
  ExperimentalDynamicWidgets_default as AisExperimentalDynamicWidgets,
  HierarchicalMenu_vue_default as AisHierarchicalMenu,
  Highlight_vue_default as AisHighlight,
  Hits_default as AisHits,
  HitsPerPage_vue_default as AisHitsPerPage,
  Index_default as AisIndex,
  InfiniteHits_vue_default as AisInfiniteHits,
  InstantSearch_default2 as AisInstantSearch,
  InstantSearchSsr_default as AisInstantSearchSsr,
  Menu_vue_default as AisMenu,
  MenuSelect_vue_default as AisMenuSelect,
  NumericMenu_vue_default as AisNumericMenu,
  Pagination_vue_default as AisPagination,
  Panel_vue_default as AisPanel,
  PoweredBy_vue_default as AisPoweredBy,
  QueryRuleContext_default as AisQueryRuleContext,
  QueryRuleCustomData_vue_default as AisQueryRuleCustomData,
  RangeInput_vue_default as AisRangeInput,
  RatingMenu_vue_default as AisRatingMenu,
  RefinementList_vue_default as AisRefinementList,
  RelevantSort_vue_default as AisRelevantSort,
  SearchBox_vue_default as AisSearchBox,
  Snippet_vue_default as AisSnippet,
  SortBy_vue_default as AisSortBy,
  StateResults_vue_default as AisStateResults,
  Stats_vue_default as AisStats,
  ToggleRefinement_vue_default as AisToggleRefinement,
  VoiceSearch_vue_default as AisVoiceSearch,
  i5 as createServerRootMixin,
  t as createSuitMixin,
  n3 as createWidgetMixin,
  es_default2 as default
};
//# sourceMappingURL=vue-instantsearch_vue3_es.js.map
