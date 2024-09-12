import { List, ListProps } from "@mui/material";

const ListStyled = (props: ListProps) => {
    return (
        <List
            {...props}
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                columnGap: "10px",
                paddingTop: 0,
                paddingBottom: 0,
            }}
        />
    );
};

export default ListStyled;
