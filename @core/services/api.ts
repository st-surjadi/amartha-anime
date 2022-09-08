import axios from "axios";
import { buildMemoryStorage, defaultHeaderInterpreter, defaultKeyGenerator, setupCache } from 'axios-cache-interceptor';

export const apiService = setupCache(
  axios.create({
    baseURL: 'https://api.jikan.moe/v4/',
    timeout: 20000
  }),

  {
    // The storage to save the cache data. There are more available by default.
    //
    // https://axios-cache-interceptor.js.org/#/pages/storages
    storage: buildMemoryStorage(),

    // The mechanism to generate a unique key for each request.
    //
    // https://axios-cache-interceptor.js.org/#/pages/request-id
    generateKey: defaultKeyGenerator,

    // The mechanism to interpret headers (when cache.interpretHeader is true).
    //
    // https://axios-cache-interceptor.js.org/#/pages/global-configuration?id=headerinterpreter
    headerInterpreter: defaultHeaderInterpreter,

    // The function that will receive debug information.
    // NOTE: For this to work, you need to enable development mode.
    //
    // https://axios-cache-interceptor.js.org/#/pages/development-mode
    // https://axios-cache-interceptor.js.org/#/pages/global-configuration?id=debug
    debug: undefined,

    // A predicate object that will be used in each request to determine if the request can
    // be cached or not.
    //
    // https://axios-cache-interceptor.js.org/#/pages/per-request-configuration?id=cachecachepredicate
    cachePredicate: {
      statusCheck: (status) => status >= 200 && status < 400
    },
  }

) 