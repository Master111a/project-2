import React, { useEffect, useState } from "react";
import { getMaterialListAPI } from "../../../utils/services/admin.api";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import MaterialTable from "./components/MaterialTable";
import MaterialSearch from "./components/MaterialSearch";
import MaterialStats from "./components/MaterialStats";

export default function AdminMaterial() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const pageParams = params.get("page");
    const rowParams = params.get("row");
    const searchParams = params.get("materialName");
    const category = params.get("materialCategory");

    const [data, setData] = useState({
        count: 0,
        materialList: [],
    });
    const getMaterial = useSelector((state) => state.admin.getMaterial);
    const dt = {
        search: searchParams,
        row: Number(rowParams),
        page: Number(pageParams),
        category: category,
    };

    useEffect(() => {
        getMaterialListAPI(dt)
            .then((res) => {
                if (res?.status === 200) {
                    setData({
                        count: res?.data?.count,
                        materialList: res?.data?.results,
                    });
                } else {
                    console.log(res);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [getMaterial, dt.search, dt.row, dt.page, dt.category]);

    return (
        <div className="w-full h-full flex flex-col gap-y-6">
            {/* Stats list */}
            <MaterialStats count={data.count} />
            {/* Search Input */}
            <MaterialSearch />
            {/* Table */}
            <MaterialTable
                materialList={data.materialList}
                count={data.count}
            />
        </div>
    );
}
