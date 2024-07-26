import { Box, TableCell, TableHead, TableRow } from "@mui/material";
import { StyledTableCellHead, StyledTableSortLabel } from "../utils/styled";
import { visuallyHidden } from "@mui/utils";
import { HiOutlineSelector } from "react-icons/hi";

const CustomTableSortLabel = ({ active, direction, children, ...props }) => {
    return (
        <StyledTableSortLabel active={active} direction={direction} {...props}>
            {children}
            {active ? (
                <Box component="span" sx={visuallyHidden}>
                    {direction === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                </Box>
            ) : (
                <HiOutlineSelector />
            )}
        </StyledTableSortLabel>
    );
};
export default function ExhancedTableHead(props) {
    const { order, orderBy, onRequestSort, headCells } = props;
    const createSortHandler = (property) => (e) => {
        onRequestSort(property);
    };
    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox"></TableCell>
                {headCells?.map((headCell) => (
                    <StyledTableCellHead
                        key={headCell?.id}
                        align="left"
                        padding={headCell?.disablePadding ? "none" : "normal"}
                        sortDirection={
                            orderBy === headCell?.id ? order : false
                        }>
                        <CustomTableSortLabel
                            active={orderBy === headCell?.id}
                            direction={order}
                            onClick={createSortHandler(headCell?.id)}>
                            {headCell?.label}
                        </CustomTableSortLabel>
                    </StyledTableCellHead>
                ))}
                <TableCell align="left"></TableCell>
            </TableRow>
        </TableHead>
    );
}
