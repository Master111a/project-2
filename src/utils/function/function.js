export function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

export function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort(array, comparator) {
    const stabilizedThis = array?.map((el, index) => [el, index]);
    stabilizedThis?.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis?.map((el) => el[0]);
}

export function ReaderFile(file) {
    let image;
    const reader = new FileReader();
    reader.onload = (e) => {
        image = e.target.result;
    };
    reader.readAsDataURL(file);
    return image;
}

export const convertFormData = (data) => {
    const formData = new FormData();
    for (const key in data) {
        if (key === "image" && typeof data[key] === "string") {
            continue;
        }
        formData.append(key, data[key]);
    }
    return formData;
};
