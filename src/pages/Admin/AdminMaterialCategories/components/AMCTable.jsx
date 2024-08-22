/* eslint-disable react/prop-types */
import {
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
    DeleteDialog,
    ExhancedTableHead,
    ModalView,
} from "_components";
import EnhancedTableToolbar from "_components/EnhancedTableToolbar";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteManyMaterialCategoryAPI } from "utils/services/admin.api";
import { setGetMC } from "utils/store/admin.slice";
import AMCView from "./AMCView";

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
    if (type === "per_quantity") return 1;
    else if (type === "per_metter") return 2;
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

export default function AMCTable({
    categoryList,
    count,
    page,
    rowsPerPage,
    selectedList,
    setSelectedList,
    toggleSelection,
    isSelected,
    resetSelectedList,
}) {
    const dispatch = useDispatch();
    const getMC = useSelector((state) => state.admin.getMC);

    const [openView, setOpenView] = useState(false);
    const [itemView, setItemView] = useState(null);

    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("id");

    const navigate = useNavigate();

    const rows = categoryList?.map((item, index) =>
        createData(
            item?.id,
            index + 1 + (page < 2 ? 0 : page - 1) * rowsPerPage,
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

    // select

    const handleSelectAllClick = (e) => {
        if (e.target.checked) {
            const newSelected = rows?.map((n) => n.id);
            setSelectedList(newSelected);
            return;
        }
        resetSelectedList();
    };

    // Deleted
    const defaultDataDel = {
        open: false,
    };
    const [dataDelete, setDataDelete] = useState(defaultDataDel);

    const handleDelete = async () => {
        try {
            await deleteManyMaterialCategoryAPI(selectedList);
            setDataDelete(defaultDataDel);
            dispatch(setGetMC(!getMC));
            toast.success("Delete Success!");
            resetSelectedList();
        } catch (error) {
            toast.error("Delete Fail!");
        }
    };

    return (
        <div className="w-full bg-white rounded-lg shadow-sm">
            <EnhancedTableToolbar
                selected={selectedList}
                rowCount={rows?.length}
                onSelectAllClick={handleSelectAllClick}
                onDeleteMany={() =>
                    setDataDelete({
                        open: true,
                    })
                }
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
                                    onClick={() => toggleSelection(row?.id)}
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
                                        <img
                                            alt="image"
                                            src={row?.image}
                                            className="aspect-video w-full max-w-32 rounded-md object-cover object-center"
                                        />
                                    </TableCell>
                                    <TableCell align="left">
                                        <span className="text-base font-semibold text-gray500 line-clamp-1">
                                            {row?.name}
                                        </span>
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        className="text-gray500">
                                        {getType(row?.price_type) === 1 ? (
                                            <span className="text-sm text-green-600 px-3 py-1 rounded-md bg-green-300/50 font-semibold">
                                                Quantity
                                            </span>
                                        ) : (
                                            <span className="text-sm text-yellow-600 px-3 py-1 rounded-md bg-yellow-300/50 font-semibold">
                                                Metter
                                            </span>
                                        )}
                                    </TableCell>

                                    <TableCell
                                        align="right"
                                        onClick={(e) => e.stopPropagation()}>
                                        <ActionRowTable
                                            eyeClick={() => {
                                                setOpenView(true),
                                                    setItemView(row);
                                                setSelectedList([row?.id]);
                                            }}
                                            pencilClick={() =>
                                                navigate(row?.id)
                                            }
                                            trashClick={() => {
                                                setSelectedList([row?.id]);
                                                setDataDelete({
                                                    open: true,
                                                });
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <CustomTablePagination count={count} />
            <DeleteDialog
                open={dataDelete.open}
                handleCancel={() => {
                    setDataDelete(defaultDataDel), resetSelectedList();
                }}
                handleDelete={handleDelete}
            />
            <ModalView
                open={openView}
                setOpen={() => {
                    setOpenView(false), resetSelectedList();
                }}>
                <AMCView item={itemView} />
            </ModalView>
        </div>
    );
}
