"use client";

import { getCategorylist } from "@/_apis/admin";
import { convertData } from "@/_utils/convertData";
import { ComponentType, useEffect, useState } from "react";

type IProps = {
    id?: string;
    name?: string;
};
function withCategories<T>(
    Component: ComponentType<T & { categoryList: IProps[] }>
) {
    // eslint-disable-next-line react/display-name
    return (props: T) => {
        const [categoryList, setCategoryList] = useState<IProps[]>([]);

        useEffect(() => {
            getCategorylist({
                params: {
                    limit: 100,
                    offset: 0,
                },
            })
                .then((res) => {
                    const convertedData = convertData(res.results);
                    setCategoryList(convertedData);
                })
                .catch((error) => console.log(error));
        }, []);

        return <Component {...props} categoryList={categoryList} />;
    };
}
export default withCategories;
