import { useState } from "react";
function useSelected() {
    const [selectedList, setSelectedList] = useState([]);

    const toggleSelection = (id) => {
        setSelectedList((prevSelectedList) => {
            const selectedIndex = prevSelectedList.indexOf(id);
            if (selectedIndex === -1) {
                return [...prevSelectedList, id];
            } else {
                return prevSelectedList.filter((item) => item !== id);
            }
        });
    };

    const isSelected = (id) => selectedList.includes(id);
    const resetSelectedList = () => setSelectedList([]);

    return [
        selectedList,
        setSelectedList,
        toggleSelection,
        isSelected,
        resetSelectedList,
    ];
}

export default useSelected;
