import { MaterialDataType } from "@/_components/pages/admin-material/adminMaterialType";
import { ActionTable, CustomTablePagination } from "@/_components/ui/customs";
import { ROUTER_API } from "@/_routers";
import { CategoryType, MaterialType, SupplierType } from "@/_types/material";
import { checkPage } from "@/_utils/checkNumber";
import {
    Box,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";

type IProps = {
    materialList: MaterialType[];
    count: number;
    page: number | string;
    rowsPerPage: number | string;
    selectedList: string[];
    setSelectedList: Dispatch<SetStateAction<string[]>>;
    toggleSelection: (id: string) => void;
    isSelected: (id: string) => boolean;
    resetSelectedList: () => void;
};

type ViewType = {
    open: boolean;
    data: MaterialDataType | null;
};

function createData(
    id: string,
    stt: number,
    category: CategoryType,
    supplier: SupplierType,
    image: string,
    part_number: string,
    name: string,
    type: number,
    large_title: string,
    small_title: string,
    basic_price: number
): MaterialDataType {
    return {
        id,
        stt,
        category,
        supplier,
        image,
        part_number,
        name,
        type,
        large_title,
        small_title,
        basic_price,
    };
}

export default function MaterialTable({
    materialList,
    count,
    page,
    rowsPerPage,
    // selectedList,
    setSelectedList,
    toggleSelection,
    isSelected,
}: // resetSelectedList,
IProps) {
    const router = useRouter();
    const rows = materialList?.map((item, index) =>
        createData(
            item.id,
            index + 1 + checkPage(page) * Number(rowsPerPage),
            item.category,
            item.supplier,
            item.image,
            item.part_number,
            item.name,
            item.type,
            item.large_title,
            item.small_title,
            item.basic_price
        )
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [viewState, setViewState] = useState<ViewType>({
        open: false,
        data: null,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [openDelete, setOpenDelete] = useState<boolean>(false);
    return (
        <Box>
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox"></TableCell>
                            <TableCell>NO</TableCell>
                            <TableCell align="left">IMAGE</TableCell>
                            <TableCell align="left">PART NUMBER</TableCell>
                            <TableCell align="left">NAME</TableCell>
                            <TableCell align="left">TYPE</TableCell>
                            <TableCell align="left">LARGE TITLE</TableCell>
                            <TableCell align="left">SMALL TITLE</TableCell>
                            <TableCell align="left">BASIC PRICE</TableCell>
                            <TableCell align="left">CATEGORY</TableCell>
                            <TableCell align="left">SUPPLIER</TableCell>
                            <TableCell align="center">ACTION</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows?.map((row, index) => {
                            const isItemSelected = isSelected(row.id);
                            const labelId = `enhanced-table-checkbox-${index}`;
                            return (
                                <TableRow
                                    hover
                                    onClick={() => toggleSelection(row?.id)}
                                    role="checkbox"
                                    aria-checked={isItemSelected}
                                    tabIndex={-1}
                                    selected={isItemSelected}
                                    sx={{ cursor: "pointer" }}
                                    key={row.id}>
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
                                        {row.stt}
                                    </TableCell>
                                    <TableCell align="left">
                                        <Image
                                            src={row.image || ""}
                                            alt="image"
                                            className="aspect-video w-20 rounded-md shadow-md"
                                            width={80}
                                            height={45}
                                        />
                                    </TableCell>
                                    <TableCell align="left">
                                        {row.part_number}
                                    </TableCell>
                                    <TableCell align="left">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="left">
                                        {row.type}
                                    </TableCell>
                                    <TableCell align="left">
                                        {row.large_title}
                                    </TableCell>
                                    <TableCell align="left">
                                        {row.small_title}
                                    </TableCell>
                                    <TableCell align="left">
                                        {row.basic_price}
                                    </TableCell>
                                    <TableCell align="left">
                                        {row.category.name}
                                    </TableCell>
                                    <TableCell align="left">
                                        {row.supplier.name}
                                    </TableCell>
                                    <TableCell
                                        align="right"
                                        onClick={(e) => e.stopPropagation()}>
                                        <ActionTable
                                            eyeClick={() => {
                                                setViewState({
                                                    open: true,
                                                    data: row,
                                                }),
                                                    setSelectedList([row?.id]);
                                            }}
                                            pencilClick={() =>
                                                router.push(
                                                    ROUTER_API.material +
                                                        "/" +
                                                        row?.id
                                                )
                                            }
                                            trashClick={() => {
                                                setSelectedList([row?.id]);
                                                setOpenDelete(true);
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
        </Box>
    );
}
