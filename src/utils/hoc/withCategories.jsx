/* eslint-disable react/display-name */

import { useEffect, useState } from "react";
import { convertData } from "../function/function";
import { getAPI } from "../services";
import ROUTER_API from "../services/routers";
const withCategories = (Component) => {
    return (props) => {
        const [categoryList, setCategoryList] = useState([]);
        useEffect(() => {
            getAPI([
                ROUTER_API.materialCategory,
                {
                    params: {
                        limit: 100,
                        offset: 0,
                    },
                },
            ])
                .then((res) => {
                    if (res?.status === 200) {
                        setCategoryList(convertData(res?.data?.results));
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }, []);
        return <Component {...props} categoryList={categoryList} />;
    };
};
export default withCategories;
