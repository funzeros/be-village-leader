import { Dictionary } from "lodash";

export const requestTimeout = 30000;
export const requestBaseURL = import.meta.env.VITE_BASEURL as string;

export const noAuthMeta = {
  keepAlive: false,
  isAuth: false,
  isRole: false
};
export const hadAuthMeta = {
  keepAlive: false,
  isAuth: true,
  isRole: false
};
export const hadAuthRoleMeta = {
  keepAlive: false,
  isAuth: true,
  isRole: true
};
export const hadAuthMetaFunc = (
  obj: Dictionary<string | number | boolean>
) => ({
  keepAlive: false,
  isAuth: true,
  ...obj
});

export const noAuthMetaFunc = (obj: Dictionary<string | number | boolean>) => ({
  keepAlive: false,
  isAuth: false,
  ...obj
});
