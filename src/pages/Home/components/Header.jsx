import {
    DropdownAvatarMenu,
    DropdownNotificationMenu,
    Logo,
} from "../../../_components";
import { AvatarPNG } from "../../../assets";

export default function Header() {
    const item = {
        name: "Digital Creative",
        avatar: AvatarPNG,
    };
    return (
        <div className="flex items-center px-12 py-2 bg-white">
            <Logo />
            <div className="flex ml-auto items-center">
                <DropdownNotificationMenu />
                <DropdownAvatarMenu item={item} />
            </div>
        </div>
    );
}
