export const convertFormData = (data: []) => {
    const formData = new FormData();
    for (const key in data) {
        if (key === "image" && typeof data[key] === "string") {
            continue;
        }
        formData.append(key, data[key]);
    }
    return formData;
};
export const convertData = (data: Array<{ id?: string; name?: string }>) => {
    return data.map((item) => ({
        id: item.id,
        name: item.name,
    }));
};
