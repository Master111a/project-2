import { useCallback, useState } from "react";

function useSelected<T = string>() {
    const [selectedList, setSelectedList] = useState<T[]>([]);

    const toggleSelection = useCallback((id: T) => {
        setSelectedList((prevSelectedList) => {
            const selectedIndex = prevSelectedList.indexOf(id);
            if (selectedIndex === -1) {
                return [...prevSelectedList, id];
            } else {
                return prevSelectedList.filter((item) => item !== id);
            }
        });
    }, []);

    const resetSelectedList = useCallback(() => {
        setSelectedList([]);
    }, []);

    const isSelected = useCallback(
        (id: T) => selectedList.includes(id),
        [selectedList]
    );

    return [
        selectedList,
        setSelectedList,
        toggleSelection,
        isSelected,
        resetSelectedList,
    ] as const;
}

export default useSelected;
