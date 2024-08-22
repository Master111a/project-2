import { useCallback, useState } from "react";

function useSelected() {
    const [selectedList, setSelectedList] = useState([]);

    const toggleSelection = useCallback((id) => {
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
        (id) => selectedList.includes(id),
        [selectedList]
    );

    return [
        selectedList,
        setSelectedList,
        toggleSelection,
        isSelected,
        resetSelectedList,
    ];
}

export default useSelected;
