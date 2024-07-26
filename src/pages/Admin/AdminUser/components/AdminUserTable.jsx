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
    TableRow,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import EnhancedTableToolbar from "../../../../_components/EnhancedTableToolbar";
import { visuallyHidden } from "@mui/utils";
import { userListData } from "../../../../utils/data";
import {
    ActionRowTable,
    CustomTablePagination,
    ExhancedTableHead,
} from "../../../../_components";
import {
    HiOutlineXCircle,
    HiOutlineCheckCircle,
    HiOutlineSelector,
} from "react-icons/hi";
import {
    StyledTableCellHead,
    StyledTableSortLabel,
} from "../../../../utils/styled";
import { getUserListAPI } from "../../../../utils/services/admin.api";
import { getComparator, stableSort } from "../../../../utils/function/function";
import { useLocation } from "react-router-dom";

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

const headCells = [
    {
        id: "id",
        label: "ID",
    },
    {
        id: "avatar",
        label: "AVATAR",
    },
    {
        id: "name",
        label: "NAME",
    },
    {
        id: "email",
        label: "EMAIL",
    },
    {
        id: "isAdmin",
        label: "ADMIN",
    },
    {
        id: "twoFA",
        label: "2FA",
    },
];
export default function AdminUserTable() {
    const location = useLocation();
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("id");
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const params = new URLSearchParams(location.search);
    const pageParams = params.get("page");
    const rowParams = params.get("row");
    const searchParams = params.get("search");
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        getUserList(pageParams, rowParams, searchParams);
    }, [pageParams, rowParams, searchParams]);
    useEffect(() => {
        setOrder("asc");
    }, [orderBy]);
    const getUserList = async (page, row, search) => {
        const res = await getUserListAPI(page, row, search);
        if (res?.status === 200) {
            setUserList(userListData);
        } else {
            console.log("thanh cong");
        }
    };
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
    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };
    const handleSelectAllClick = (e) => {
        if (e.target.checked) {
            const newSelected = rows?.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
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
        () => stableSort(rows, getComparator(order, orderBy))[(order, orderBy)]
    );

    return (
        <div className="w-full bg-white rounded-lg shadow-sm">
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
                    <ExhancedTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        headCells={headCells}
                    />
                    <TableBody>
                        {visibleRows?.map((row, index) => {
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
                                    key={row?.id}
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
                                    <TableCell id={labelId} align="left">
                                        <span className="text-primary font-extrabold">
                                            {row?.id}
                                        </span>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Avatar
                                            alt="avatar"
                                            src={row?.avatar}
                                        />
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        className="text-gray500">
                                        <span className="text-sm text-gray500">
                                            {row?.name}
                                        </span>
                                    </TableCell>
                                    <TableCell align="left">
                                        <span className="text-sm text-gray500">
                                            {row?.email}
                                        </span>
                                    </TableCell>
                                    <TableCell align="center">
                                        {row?.isAdmin ? (
                                            <HiOutlineCheckCircle className="text-24 text-green500" />
                                        ) : (
                                            <HiOutlineXCircle className="text-24 text-red500" />
                                        )}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row?.twoFA ? (
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
                count={rows?.length}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
            />
        </div>
    );
}
