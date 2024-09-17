import { MaterialCategoryList, MaterialList } from "@/_apis/admin/adminType";
import { ROUTER_API } from "@/_routers";
import { MaterialType } from "@/_types/material";
import { getAPI } from "@/_utils/axios";
import { AxiosRequestConfig } from "axios";

export const getCategorylist = async (
    config: AxiosRequestConfig
): Promise<MaterialCategoryList> =>
    getAPI([ROUTER_API.materialCategory, config]);

export const getCategoryById = async (
    id: string,
    config: AxiosRequestConfig
): Promise<MaterialCategoryList> =>
    getAPI([ROUTER_API.materialCategory + "/" + id, config]);

export const getMatetialList = async (
    config: AxiosRequestConfig
): Promise<MaterialList> => getAPI([ROUTER_API.material, config]);

export const getMatetialById = async (
    id: string,
    config: AxiosRequestConfig
): Promise<MaterialType> => getAPI([ROUTER_API.material + "/" + id, config]);
