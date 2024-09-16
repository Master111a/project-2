import { ROUTER_API } from "@/_routers";
import { User, UserToken } from "@/_types/user";
import { postAPI } from "@/_utils/axios";
import { AxiosRequestConfig } from "axios";

export const loginAPI = async (config: AxiosRequestConfig): Promise<User> =>
    postAPI([ROUTER_API.login, config]);

export const refreshTokenAPI = async (
    config: AxiosRequestConfig
): Promise<UserToken> => postAPI([ROUTER_API.refreshToken, config]);
