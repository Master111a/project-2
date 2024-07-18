import React from "react";
import {
    HiOutlineCheckCircle,
    HiOutlineXCircle,
    HiOutlineDownload,
} from "react-icons/hi";
import { AvatarPNG } from "../assets";
import { Avatar } from "@mui/material";
const RowItem = ({ children }) => {
    return (
        <div className="flex border-t border-gray100 w-full">{children}</div>
    );
};
export default function UserDetailItem({ item }) {
    return (
        <div className="py-2 rounded-lg w-full shadow-md px-6 txt-body bg-white">
            <div className="user-detail-item txt-body border-white">
                <div className="w-1/4">Avatar</div>
                <div className="flex flex-col items-start gap-y-3">
                    <Avatar
                        alt="Remy Sharp"
                        src={AvatarPNG}
                        sx={{
                            width: 100,
                            height: 100,
                        }}
                    />
                    <div className="flex items-center gap-x-2">
                        <HiOutlineDownload className="text-base" />
                        <span>Download</span>
                    </div>
                </div>
            </div>
            <div className="user-detail-item txt-body">
                <div className="w-1/4">Name</div>
                <div>Digital Creative</div>
            </div>
            <div className="user-detail-item txt-body">
                <div className="w-1/4">Phone</div>
                <div>+86（21）2027 0599</div>
            </div>
            <div className="user-detail-item txt-body">
                <div className="w-1/4">Language</div>
                <div>English</div>
            </div>
            <div className="user-detail-item txt-body">
                <div className="w-1/4">Admin</div>
                <div>
                    {item?.isAdmin ? (
                        <HiOutlineCheckCircle className="text-24 text-green500" />
                    ) : (
                        <HiOutlineXCircle className="text-24 text-red500" />
                    )}
                </div>
            </div>
            <div className="user-detail-item txt-body">
                <div className="w-1/4">2FA</div>
                <div>
                    {item?.isAdmin ? (
                        <HiOutlineCheckCircle className="text-24 text-green500" />
                    ) : (
                        <HiOutlineXCircle className="text-24 text-red500" />
                    )}
                </div>
            </div>
        </div>
    );
}
