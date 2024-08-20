import {
    Avatar,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
} from "@mui/material";
import {
    ActionRowTable,
    CustomTablePagination,
    ExhancedTableHead,
} from "_components";
import EnhancedTableToolbar from "_components/EnhancedTableToolbar";
import { useEffect, useState } from "react";
import { HiOutlineCheckCircle, HiOutlineXCircle } from "react-icons/hi";
import ROUTER_API from "utils/services/routers";
import { getAPI } from "../../../../utils/services";
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
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("id");
    const [userList, setUserList] = useState([]);

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

    useEffect(() => {
        getAPI([
            ROUTER_API.material,
            {
                params: {
                    limit: 5,
                    offset: 0,
                },
            },
        ]).then((res) => console.log(res.data.results));
    }, []);

    return (
        <div className="w-full bg-white rounded-lg shadow-sm">
            <EnhancedTableToolbar rowCount={rows.length} />
            <TableContainer>
                <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                    size={"medium"}>
                    <ExhancedTableHead
                        order={order}
                        orderBy={orderBy}
                        headCells={headCells}
                    />
                    <TableBody>
                        {rows?.map((row, index) => {
                            const isItemSelected = isSelected(row.id);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                                <TableRow
                                    hover
                                    onClick={(event) => console.log(row?.id)}
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={row?.id}
                                    sx={{ cursor: "pointer" }}>
                                    <TableCell
                                        padding="checkbox"
                                        sx={{
                                            pl: "12px",
                                        }}>
                                        <Checkbox
                                            color="primary"
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
                    </TableBody>
                </Table>
            </TableContainer>
            <CustomTablePagination count={rows?.length} />
        </div>
    );
}
