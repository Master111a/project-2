// ----------------------------------------------------------------------

import { InputValue } from "@/_types/input";
export const isIntegerNumber = (item: InputValue) =>
    Number.isInteger(Number(item));

export const validateNumber = (value: InputValue) => {
    const num = Number(value);
    if (Number.isNaN(num) || !Number.isInteger(num) || num <= 0) {
        return 1;
    }
    return num;
};
