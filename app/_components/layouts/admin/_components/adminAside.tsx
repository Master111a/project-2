"use client";

import { ListItemButton, ListStyled } from "@/_components/ui/list";
import { ROUTER } from "@/_routers";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Collapse } from "@mui/material";
import Box from "@mui/material/Box";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HiOutlineCollection } from "react-icons/hi";
import { RxDashboard } from "react-icons/rx";

const dashboardList = [
    { href: ROUTER.adminMain, title: "Main" },
    { href: ROUTER.adminMain, title: "Users" },
];
const resourcesList = [
    { href: ROUTER.adminMaterial, title: "Main" },
    { href: ROUTER.adminMaterialCategory, title: "Categories" },
];
export default function AdminAside() {
    const pathname = usePathname();
    const [open, setOpen] = useState<boolean>(false);
    const [open2, setOpen2] = useState<boolean>(false);
    const handleClick = () => {
        setOpen(!open);
    };
    const handleClick2 = () => {
        setOpen2(!open2);
    };

    useEffect(() => {
        if (dashboardList.some((x) => pathname.startsWith(x.href))) {
            setOpen(true);
            return;
        }
        if (resourcesList.some((x) => pathname.startsWith(x.href))) {
            setOpen2(true);
            return;
        }
    }, [pathname]);
    return (
        <Box className="flex flex-col py-5 px-3 bg-background">
            <ListStyled className="text-gray500" component="nav">
                <ListItemButton
                    onClick={() => handleClick()}
                    className="flex items-center gap-x-2">
                    <RxDashboard className="text-gray500 text-24 absolute left-2" />
                    <ListItemText
                        primary="Dashboard"
                        sx={{
                            "& .MuiListItemText-primary": {
                                fontWeight: 600,
                            },
                        }}
                    />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <ListStyled component="ul" disablePadding>
                        {dashboardList?.map((item, index) => (
                            <Box component="li" key={index}>
                                <Link
                                    href={item?.href}
                                    // className={({ isActive }) =>
                                    //     isActive
                                    //         ? "text-primary  font-extrabold block w-full"
                                    //         : "font-normal block w-full"
                                    // }
                                >
                                    <ListItemButton>
                                        <span className="flex 1 my-1 text-base">
                                            {item?.title}
                                        </span>
                                    </ListItemButton>
                                </Link>
                            </Box>
                        ))}
                    </ListStyled>
                </Collapse>
                <ListItemButton
                    onClick={() => handleClick2()}
                    className="flex items-center gap-x-2 relative pl-10">
                    <HiOutlineCollection className="text-24 text-gray500 absolute left-2" />
                    <ListItemText
                        primary="Material"
                        sx={{
                            "& .MuiListItemText-primary": {
                                fontWeight: 600,
                            },
                        }}
                    />
                    {open2 ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open2} timeout="auto" unmountOnExit>
                    <ListStyled component="ul" disablePadding>
                        {resourcesList.map((item, index) => (
                            <li key={index}>
                                <Link
                                    href={item.href}
                                    className={
                                        pathname.startsWith(item.href)
                                            ? "text-primary font-semibold block w-full"
                                            : "font-normal block w-full"
                                    }>
                                    <ListItemButton>
                                        <span className="flex 1 my-1 text-base">
                                            {item?.title}
                                        </span>
                                    </ListItemButton>
                                </Link>
                            </li>
                        ))}
                    </ListStyled>
                </Collapse>
            </ListStyled>
        </Box>
    );
}
