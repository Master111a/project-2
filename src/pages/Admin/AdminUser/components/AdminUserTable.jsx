import {
    Avatar,
    Box,
    Checkbox,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
} from "@mui/material";
import { useMemo, useState } from "react";
import EnhancedTableToolbar from "../../../../_components/EnhancedTableToolbar";
import { visuallyHidden } from "@mui/utils";
import { userList } from "../../../../utils/data";
import { ActionRowTable, CustomTablePagination } from "../../../../_components";
import {
    HiOutlineXCircle,
    HiOutlineCheckCircle,
    HiOutlineChevronDown,
    HiOutlineChevronUp,
    HiOutlineSelector,
} from "react-icons/hi";
import {
    StyledTableCellHead,
    StyledTableSortLabel,
} from "../../../../utils/styled";

function createData(id, avatar, name, email, isAdmin, twoFA) {
    return {
        id,
        avatar,
        name,
        email,
        isAdmin,
        twoFA,
    };
}

const rows = userList?.map((item) =>
    createData(
        item?.id,
        item?.avatar,
        item?.name,
        item?.email,
        item?.isAdmin,
        item?.twoFA
    )
);
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: "id",
        numeric: false,
        disablePadding: true,
        label: "ID",
    },
    {
        id: "avatar",
        numeric: true,
        disablePadding: false,
        label: "AVATAR",
    },
    {
        id: "name",
        numeric: true,
        disablePadding: false,
        label: "NAME",
    },
    {
        id: "email",
        numeric: true,
        disablePadding: false,
        label: "EMAIL",
    },
    {
        id: "isAdmin",
        numeric: true,
        disablePadding: false,
        label: "ADMIN",
    },
    {
        id: "twoFA",
        numeric: true,
        disablePadding: false,
        label: "2FA",
    },
];
const CustomTableSortLabel = ({ active, direction, children, ...props }) => {
    let IconComponent;
    if (active) {
        IconComponent =
            direction === "desc" ? HiOutlineChevronDown : HiOutlineChevronUp;
    } else {
        IconComponent = HiOutlineSelector;
    }
    return (
        <StyledTableSortLabel
            active={active}
            direction={direction}
            IconComponent={IconComponent}
            {...props}>
            {children}
            {active ? (
                <Box component="span" sx={visuallyHidden}>
                    {direction === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                </Box>
            ) : null}
        </StyledTableSortLabel>
    );
};
function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox"></TableCell>
                {headCells.map((headCell) => (
                    <StyledTableCellHead
                        key={headCell.id}
                        align="left"
                        padding={headCell.disablePadding ? "none" : "normal"}
                        sortDirection={orderBy === headCell.id ? order : false}>
                        <CustomTableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : "asc"}
                            onClick={createSortHandler(headCell.id)}>
                            {headCell.label}
                        </CustomTableSortLabel>
                    </StyledTableCellHead>
                ))}
                <TableCell align="left"></TableCell>
            </TableRow>
        </TableHead>
    );
}

export default function AdminUserTable() {
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("name");
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = (e) => {
        if (e.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
            ),
        [order, orderBy, page, rowsPerPage]
    );
    return (
        <div className="w-full bg-white rounded-lg">
            <EnhancedTableToolbar
                numSelected={selected.length}
                rowCount={rows.length}
                onSelectAllClick={handleSelectAllClick}
            />
            <TableContainer>
                <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                    size={"medium"}>
                    <EnhancedTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                    />
                    <TableBody>
                        {visibleRows.map((row, index) => {
                            const isItemSelected = isSelected(row.id);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                                <TableRow
                                    hover
                                    onClick={(event) =>
                                        handleClick(event, row.id)
                                    }
                                    role="checkbox"
                                    aria-checked={isItemSelected}
                                    tabIndex={-1}
                                    key={row.id}
                                    selected={isItemSelected}
                                    sx={{ cursor: "pointer" }}>
                                    <TableCell
                                        padding="checkbox"
                                        sx={{
                                            pl: "12px",
                                        }}>
                                        <Checkbox
                                            color="primary"
                                            checked={isItemSelected}
                                            inputProps={{
                                                "aria-labelledby": labelId,
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell
                                        component="th"
                                        id={labelId}
                                        scope="row"
                                        padding="none"
                                        align="left">
                                        <span className="text-primary font-extrabold">
                                            {row.id}
                                        </span>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Avatar alt="avatar" src={row.avatar} />
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        className="text-gray500">
                                        <span className="text-sm text-gray500">
                                            {row.name}
                                        </span>
                                    </TableCell>
                                    <TableCell align="left">
                                        <span className="text-sm text-gray500">
                                            {row.email}
                                        </span>
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.isAdmin ? (
                                            <HiOutlineCheckCircle className="text-24 text-green500" />
                                        ) : (
                                            <HiOutlineXCircle className="text-24 text-red500" />
                                        )}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.twoFA ? (
                                            <HiOutlineCheckCircle className="text-24 text-green500" />
                                        ) : (
                                            <HiOutlineXCircle className="text-24 text-red500" />
                                        )}
                                    </TableCell>
                                    <TableCell align="right">
                                        <ActionRowTable />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                        {emptyRows > 0 && (
                            <TableRow
                                style={{
                                    height: 53 * emptyRows,
                                }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <CustomTablePagination
                count={rows.length}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
            />
        </div>
    );
}
