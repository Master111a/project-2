import {
    Avatar,
    LinearProgress,
    linearProgressClasses,
    List,
    ListItemButton,
    Select,
    styled,
    TableCell,
    TableSortLabel,
} from "@mui/material";
import { forwardRef } from "react";

export const StyledSelect = styled((props) => <Select {...props} />)(
    ({ theme }) => ({
        "& .MuiSelect-select": {
            padding: "3px 6px 3px 12px",
            border: "1px solid #CBD5E1",
        },
    })
);
export const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 16,
    borderRadius: 999,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: [
            theme.palette.mode === "light" ? "#E2E8F0" : "#CBD5E1",
        ],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 999,
        backgroundColor: theme.palette.mode === "light" ? "#22C55E" : "#308fe8",
    },
}));
export const StyledList = styled((props) => <List {...props} />)(
    ({ theme }) => ({
        width: "100%",
        display: "flex",
        flexDirection: "column",
        columnGap: "10px",
        paddingTop: 0,
        paddingBottom: 0,
    })
);

export const StyledListItemButton = styled((props) => (
    <ListItemButton {...props} />
))(({ theme }) => ({
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

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
}));

export const StyledTableSortLabel = styled(TableSortLabel)(({ theme }) => ({
    "&.MuiTableSortLabel-root": {
        color: "#64748B",
        fontWeight: 800,
        fontSize: 12,
    },
    "&.MuiTableSortLabel-active": {
        color: "#64748B",
    },
    "& .MuiTableSortLabel-icon": {
        color: "#64748B !important",
    },
}));
export const StyledTableCellHead = styled(TableCell)(({ theme }) => ({}));
export const StyledAvatar = styled(Avatar)(({ theme }) => ({}));
export const CustomSelect = styled(
    forwardRef(function CustomSelect(props, ref) {
        return <Select {...props} ref={ref} />;
    })
)(({ theme }) => ({
    width: "100%",
    maxWidth: "350px",
    border: "1px solid #d1d5db",
    "& .MuiSelect-select": {
        padding: "8px 12px 8px 12px",
    },
}));
