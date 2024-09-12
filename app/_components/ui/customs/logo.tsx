import globalConfig from "@/_config";
import { Box } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function Logo() {
    return (
        <Link href={"/"}>
            <Box className="flex justify-start items-center w-full pl-6 py-4 bg-white">
                <Image
                    src={`${globalConfig.assetUrl}/logos/logo.png`}
                    alt="logo"
                    width={131}
                    height={31}
                    className="w-[131px] shrink-0"
                />
            </Box>
        </Link>
    );
}
