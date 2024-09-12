import { ListItemButton, ListItemButtonProps } from "@mui/material";
import { styled } from "@mui/material/styles";

const ItemButton = styled((props: ListItemButtonProps) => (
    <ListItemButton {...props} />
))(({}) => ({
    padding: "4px 8px 4px 40px",
    display: "flex",
    fontSize: 14,
    "& .MuiTypography-root": {
        fontFamily: "Nunito Sans",
    },
    "&.active .MuiTypography-root": {
        color: "#0EA5E9",
        fontWeight: 800,
    },
}));

export default ItemButton;
