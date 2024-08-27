import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

const useChangePage = (totalCount) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const pageNumber = Number(searchParams.get("page")) || 1;
    const rowParams = Number(searchParams.get("row"));
    const rowsPerPage = rowParams || 5;

    const isPageNumberValid = !isNaN(pageNumber) && pageNumber > 0;

    const start = (pageNumber < 2 ? 0 : pageNumber - 1) * rowsPerPage + 1;
    const end = Math.min(
        totalCount,
        (pageNumber < 2 ? 1 : pageNumber) * rowsPerPage
    );

    const updateSearchParams = (key, value) => {
        const newSearchParams = new URLSearchParams(searchParams);
        if (value === undefined || value === null || value === "") {
            newSearchParams.delete(key);
        } else {
            newSearchParams.set(key, value);
        }
        setSearchParams(newSearchParams);
    };

    const handlePageChange = (newPage) => {
        if (newPage < 2) {
            updateSearchParams("page", null);
        } else {
            updateSearchParams("page", newPage);
        }
    };

    const handleRowsChange = (newRows) => {
        updateSearchParams("row", newRows);
    };

    const handlePreviousPage = () => {
        if (isPageNumberValid && pageNumber > 1) {
            handlePageChange(pageNumber - 1);
        }
    };

    const handleNextPage = () => {
        if (
            isPageNumberValid &&
            pageNumber < Math.ceil(totalCount / rowsPerPage)
        ) {
            handlePageChange(pageNumber + 1);
        }
    };
    const handleSearchChange = useCallback(
        (key, value) => {
            updateSearchParams("page", null);
            updateSearchParams(key, value);
        },
        [updateSearchParams]
    );

    return {
        pageNumber,
        rowsPerPage,
        start,
        end,
        handlePageChange,
        handlePreviousPage,
        handleNextPage,
        handleRowsChange,
        handleSearchChange,
    };
};

export default useChangePage;
