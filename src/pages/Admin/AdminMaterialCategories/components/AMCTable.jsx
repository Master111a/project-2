import {
    Avatar,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import EnhancedTableToolbar from "../../../../_components/EnhancedTableToolbar";
import {
    ActionRowTable,
    CustomTablePagination,
    DeleteDialog,
    ExhancedTableHead,
} from "../../../../_components";
import { getComparator, stableSort } from "../../../../utils/function/function";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteMaterialCategoryByIdAPI } from "../../../../utils/services/admin.api";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setGetMC } from "../../../../utils/store/admin.slice";

const createData = (id, stt, image, name, price_type) => {
    return {
        id,
        stt,
        image,
        name,
        price_type,
    };
};

const getType = (type) => {
    if (type === "per_quantity") return "Quantity";
    else if (type === "per_metter") return " Metter";
};
const headCells = [
    {
        id: "stt",
        label: "NO",
    },
    {
        id: "image",
        label: "IMAGE",
    },
    {
        id: "name",
        label: "NAME",
    },

    {
        id: "prive_type",
        label: "TYPE",
    },
];

export default function AMCTable({ categoryList, count }) {
    const dispatch = useDispatch();
    const getMC = useSelector((state) => state.admin.getMC);

    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("id");
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        setOrder("asc");
    }, [orderBy]);

    const rows = categoryList?.map((item, index) =>
        createData(
            item?.id,
            index + 1 + page * rowsPerPage,
            item?.image,
            item?.name,
            item?.price_type
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

    const [dataDelete, setDataDelete] = useState({
        open: false,
        id: "",
    });

    const handleDelete = async () => {
        const res = await deleteMaterialCategoryByIdAPI(dataDelete.id);
        if (res?.status === 204) {
            setDataDelete({
                open: false,
                id: "",
            });
            dispatch(setGetMC(!getMC));
            toast.success("Delete Success!");
            setSelected([]);
        } else {
            toast.error("Delete Fail!");
        }
    };
    const visibleRows = useMemo(
        () => stableSort(rows, getComparator(order, orderBy))[(order, orderBy)]
    );
    return (
        <div className="w-full bg-white rounded-lg shadow-sm">
            <EnhancedTableToolbar
                numSelected={selected?.length}
                rowCount={rows?.length}
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
                        {rows?.map((row, index) => {
                            const isItemSelected = isSelected(row?.id);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                                <TableRow
                                    hover
                                    onClick={(event) =>
                                        handleClick(event, row?.id)
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
                                            {row?.stt}
                                        </span>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Avatar alt="image" src={row?.image} />
                                    </TableCell>
                                    <TableCell align="left">
                                        <span className="text-sm text-gray500">
                                            {row?.name}
                                        </span>
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        className="text-gray500">
                                        <span className="text-sm text-gray500">
                                            {getType(row?.price_type)}
                                        </span>
                                    </TableCell>

                                    <TableCell align="right">
                                        <ActionRowTable
                                            pencilClick={() =>
                                                navigate(row?.id)
                                            }
                                            trashClick={() =>
                                                setDataDelete({
                                                    open: true,
                                                    id: row?.id,
                                                })
                                            }
                                        />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <CustomTablePagination
                count={count}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
            />
            <DeleteDialog
                open={dataDelete.open}
                handleCancel={() => setDataDelete({ open: false, id: "" })}
                handleDelete={handleDelete}
            />
        </div>
    );
}
