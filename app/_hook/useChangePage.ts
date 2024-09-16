"use client";
import useChangeParams from "@/_hook/useChangeParams";
import { InputValue } from "@/_types/input";
import { validateNumber } from "@/_utils/checkNumber";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

const useChangePage = (totalCount: number) => {
    const { updateSearchParams } = useChangeParams();
    const searchParams = useSearchParams();
    const pageNumber = Number(searchParams.get("page")) || 1;
    const rowsPerPage = Number(searchParams.get("row")) || 5;

    const isPageNumberValid = !isNaN(pageNumber) && pageNumber > 0;

    const start = (pageNumber < 2 ? 0 : pageNumber - 1) * rowsPerPage + 1;
    const end = Math.min(
        totalCount,
        (pageNumber < 2 ? 1 : pageNumber) * rowsPerPage
    );

    const handlePageChange = useCallback(
        (newPage: InputValue) => {
            const page = validateNumber(newPage);
            if (page < 2) {
                updateSearchParams("page", null);
            } else {
                updateSearchParams("page", page);
            }
        },
        [updateSearchParams]
    );

    const handleRowsChange = useCallback(
        (newRows: number) => {
            updateSearchParams("row", newRows);
        },
        [updateSearchParams]
    );

    const handlePreviousPage = useCallback(() => {
        if (isPageNumberValid && pageNumber > 1) {
            handlePageChange(pageNumber - 1);
        }
    }, [isPageNumberValid, pageNumber, handlePageChange]);

    const handleNextPage = useCallback(() => {
        if (
            isPageNumberValid &&
            pageNumber < Math.ceil(totalCount / rowsPerPage)
        ) {
            handlePageChange(pageNumber + 1);
        }
    }, [
        isPageNumberValid,
        pageNumber,
        rowsPerPage,
        totalCount,
        handlePageChange,
    ]);

    return {
        pageNumber,
        rowsPerPage,
        start,
        end,
        handlePageChange,
        handlePreviousPage,
        handleNextPage,
        handleRowsChange,
    };
};

export default useChangePage;
