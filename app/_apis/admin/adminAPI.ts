import { MaterialCategoryList } from "@/_apis/admin/adminType";
import { ROUTER_API } from "@/_routers";
import { getAPI } from "@/_utils/axios";
import { AxiosRequestConfig } from "axios";

export const getCategorylist = async (
    config: AxiosRequestConfig
): Promise<MaterialCategoryList> =>
    getAPI([ROUTER_API.materialCategory, config]);
