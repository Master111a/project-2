"use client";

import { InputValue } from "@/_types/input";
import { validateNumber } from "@/_utils/checkNumber";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const useChangeParams = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const updateSearchParams = useCallback(
        (key: string, value: InputValue) => {
            const params = new URLSearchParams(searchParams.toString());
            if (value === undefined || value === null || value === "") {
                params.delete(key);
            } else {
                params.set(key, value.toString());
            }
            const newPath = `${pathname}?${params.toString()}`;

            router.push(newPath);
        },
        [searchParams, pathname, router]
    );

    const handleSearchChange = useCallback(
        (key: string, value: InputValue) => {
            updateSearchParams("page", null);
            updateSearchParams(key, value);
        },
        [updateSearchParams]
    );

    const handlePageChange = useCallback(
        (value: InputValue) => {
            updateSearchParams("page", validateNumber(value));
        },
        [updateSearchParams]
    );
    const getSearchParams = useCallback(
        (key: string) => searchParams.get(key),
        [searchParams]
    );
    return {
        updateSearchParams,
        handleSearchChange,
        handlePageChange,
        getSearchParams,
    };
};
export default useChangeParams;
