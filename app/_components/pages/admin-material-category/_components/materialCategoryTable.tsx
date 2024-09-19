import { MaterialCategoryDataType } from "@/_components/pages/admin-material-category/adminMaterialCategoryType";
import {
    ActionTable,
    CustomTablePagination,
    TextCustom,
} from "@/_components/ui/customs";
import { ROUTER } from "@/_routers";
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
    materiaCategorylList: MaterialCategoryDataType[];
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
    data: MaterialCategoryDataType | null;
};

function createData(
    id: string,
    stt: number,
    image: string,
    name: string,
    price_type: string
): MaterialCategoryDataType {
    return {
        id,
        stt,
        image,
        name,
        price_type,
    };
}

export default function MaterialCategoryTable({
    materiaCategorylList,
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
    const rows = materiaCategorylList?.map((item, index) =>
        createData(
            item.id,
            index + 1 + checkPage(page) * Number(rowsPerPage),
            item.image,
            item.name,
            item.price_type
        )
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [viewState, setViewState] = useState<ViewType>({
        open: false,
        data: null,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [openDelete, setOpenDelete] = useState<boolean>(false);
    const getPriceType = (type: string) => {
        if (type === "per_quantity") return <TextCustom text="Quantity" />;
        else return <TextCustom text="Meter" color="orange" />;
    };
    return (
        <Box>
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox"></TableCell>
                            <TableCell align="center">NO</TableCell>
                            <TableCell align="center">IMAGE</TableCell>
                            <TableCell align="center">NAME</TableCell>
                            <TableCell align="center">PRICE TYPE</TableCell>
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
                                    <TableCell id={labelId} align="center">
                                        {row.stt}
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{
                                            width: "80px",
                                        }}>
                                        <Image
                                            src={row.image || ""}
                                            alt="image"
                                            className="aspect-video w-full min-w-20 rounded-md shadow-md"
                                            width={80}
                                            height={45}
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <Box className="line-clamp-1">
                                            {row.name}
                                        </Box>
                                    </TableCell>
                                    <TableCell align="center">
                                        {getPriceType(row.price_type)}
                                    </TableCell>

                                    <TableCell
                                        align="center"
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
                                                    ROUTER.adminMaterialCategoryDetail +
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
