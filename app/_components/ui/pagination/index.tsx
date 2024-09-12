"use client";

import useChangeParams from "@/_hook/useChangeParams";
// @mui
import Pagination from "@mui/material/Pagination";

interface IProps {
    count: number;
}
export default function PaginationCustom({ count }: IProps) {
    const { handlePageChange } = useChangeParams();
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        handlePageChange(value.toString());
    };

    return (
        <Pagination
            count={count}
            size="large"
            color="primary"
            hidePrevButton
            hideNextButton
            onChange={handleChange}
        />
    );
}
