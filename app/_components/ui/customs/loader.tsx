import globalConfig from "@/_config";
import { Box } from "@mui/material";
import Image from "next/image";

export default function Loader() {
    return (
        <Box className="w-full max-w-[25%] rounded-lg overflow-hidden">
            <Image
                className="w-full aspect-square object-cover object-center"
                src={`${globalConfig.assetUrl}/images/loading2.gif`}
                alt="loading..."
                width={300}
                height={300}
            />
        </Box>
    );
}
