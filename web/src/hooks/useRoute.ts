import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { isString } from "lodash";

export const useGDetailRoute = () => {
  const route = useRoute();
  const id = computed<number>(() => {
    return +route.params.id;
  });
  const method = computed<string>(() => {
    return route.params.method + "";
  });
  return {
    id,
    method
  };
};
/**
 * currentPath (computed)
 * changeRoutePath (不改变query跳转)
 * pushRoutePath (通用跳转)
 * replaceRoutePath (通用replace)
 * mergeParams (合并params)
 */
export const useGRoute = () => {
  // hook
  const route = useRoute();
  const router = useRouter();
  // computed
  const currentParams = computed(() => {
    return route.params;
  });
  const currentPath = computed(() => {
    return route.path;
  });
  const currentQuery = computed(() => {
    return route.query;
  });
  const currentHash = computed(() => {
    return route.hash;
  });

  // method
  const changeRoutePath = (path: string) => {
    router.push({
      path,
      query: route.query
    });
  };
  const pushRouteFullpath = (fullpath: string) => {
    router.push(fullpath);
  };
  const pushRouteParams = (params: GObj) => {
    router.push({
      params
    });
  };
  const pushRoutePath = (path: string) => {
    router.push({
      path
    });
  };
  const replaceRoutePath = (path: string) => {
    router.replace({
      path
    });
  };
  const replaceRouteParams = (params: GObj) => {
    router.replace({
      params
    });
  };
  const replaceRouteHash = (hash: string) => {
    router.replace({
      hash: `#${hash}`
    });
  };
  const replaceRouteQuery = (query: GObj) => {
    router.replace({
      query
    });
  };
  const mergeParams = (params: GObj) => {
    router.replace({
      params: {
        ...route.params,
        ...params
      }
    });
  };
  const mergeQuery = (query: GObj) => {
    router.replace({
      query: {
        ...route.query,
        ...query
      }
    });
  };
  const queryValidBoolean = (q: string) => {
    const stringToBoolean = (bString: string): boolean => {
      if (isString(bString)) {
        return JSON.parse(bString.toLowerCase());
      } else {
        return false;
      }
    };
    return stringToBoolean(currentQuery.value[q] as string);
  };
  const queryTrueSelectFunction = (queryFuncMap: GObj) => {
    for (const key in queryFuncMap) {
      if (
        Object.prototype.hasOwnProperty.call(queryFuncMap, key) &&
        queryValidBoolean(key)
      ) {
        const runFunction = queryFuncMap[key];
        runFunction();
      }
    }
    // if (stringToBoolean(currentQuery.value.invite as string)) {
    //   // console.log("invite");
    //   handle邀请设置();
    // }
    // if (stringToBoolean(currentQuery.value.addadmin as string)) {
    //   // console.log("addadmin");
    //   handle组织管理员();
    // }
  };
  const pushGoBack = () => {
    router.go(-1);
  };
  return {
    // use
    route,
    router,
    // computed
    currentParams,
    currentPath,
    currentQuery,
    currentHash,
    // method
    changeRoutePath,
    pushRouteParams,
    pushRouteFullpath,
    pushRoutePath,
    replaceRoutePath,
    replaceRouteParams,
    replaceRouteHash,
    replaceRouteQuery,
    mergeParams,
    mergeQuery,
    queryValidBoolean,
    queryTrueSelectFunction,
    pushGoBack
  };
};
