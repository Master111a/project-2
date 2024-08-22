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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteMaterialListAPI } from "utils/services/admin.api";
import { setGetMaterial } from "utils/store/admin.slice";
import MaterialView from "./AMView";

const createData = (
    id,
    stt,
    image,
    part_number,
    name,
    type,
    large_title,
    small_title,
    basic_price,
    category,
    supplier
) => {
    return {
        id,
        stt,
        image,
        part_number,
        name,
        type,
        large_title,
        small_title,
        basic_price,
        category,
        supplier,
    };
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
        id: "part_number",
        label: "PART NUMBER",
    },
    {
        id: "name",
        label: "NAME",
    },
    {
        id: "type",
        label: "TYPE",
    },
    {
        id: "large_title",
        label: "LARGE TITLE",
    },
    {
        id: "small_title",
        label: "SMALL TITLE",
    },
    {
        id: "basic_price",
        label: "BASIC PRICE",
    },
    {
        id: "category",
        label: "CATEGORY",
    },
    {
        id: "supplier",
        label: "SUPPLIER",
    },
];

export default function MaterialTable({
    materialList,
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
    const getMaterial = useSelector((state) => state.admin.getMaterial);

    const [openView, setOpenView] = useState(false);
    const [itemView, setItemView] = useState(null);

    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("id");

    const navigate = useNavigate();

    useEffect(() => {
        setOrder("asc");
    }, [orderBy]);

    const rows = materialList?.map((item, index) =>
        createData(
            item?.id,
            index + 1 + page * rowsPerPage,
            item?.image,
            item?.part_number,
            item?.name,
            item?.type,
            item?.large_title,
            item?.small_title,
            item?.basic_price,
            item?.category,
            item?.supplier
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
            await deleteMaterialListAPI(selectedList);
            setDataDelete(defaultDataDel);
            dispatch(setGetMaterial(!getMaterial));
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
                                            className="aspect-video w-20 rounded-md shadow-md"
                                        />
                                    </TableCell>
                                    <TableCell align="left">
                                        <span className="text-sm text-gray500">
                                            {row?.part_number}
                                        </span>
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
                                            {row?.type}
                                        </span>
                                    </TableCell>
                                    <TableCell align="left">
                                        <span className="text-sm text-gray500">
                                            {row?.large_title}
                                        </span>
                                    </TableCell>{" "}
                                    <TableCell align="left">
                                        <span className="text-sm text-gray500">
                                            {row?.small_title}
                                        </span>
                                    </TableCell>
                                    <TableCell align="left">
                                        <span className="text-sm text-gray500">
                                            {row?.basic_price}
                                        </span>
                                    </TableCell>
                                    <TableCell align="left">
                                        <span className="text-sm text-gray500">
                                            {row?.category?.name}
                                        </span>
                                    </TableCell>
                                    <TableCell align="left">
                                        <span className="text-sm text-gray500">
                                            {row?.supplier?.name}
                                        </span>
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
                <MaterialView item={itemView} />
            </ModalView>
        </div>
    );
}
