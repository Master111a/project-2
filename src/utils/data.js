import {
    Avatar1,
    Avatar2,
    Avatar3,
    Avatar4,
    Avatar5,
    Avatar6,
    Avatar7,
} from "../assets";

export const userListData = [
    {
        id: 1,
        name: "Tylor Otwell",
        avatar: Avatar1,
        email: "taylor@nova.laravel.com",
        isAdmin: true,
        twoFA: false,
    },
    {
        id: 2,
        name: "David Hemphill",
        avatar: Avatar2,
        email: "davidlee.hemphill@nova.laravel.com",
        isAdmin: true,
        twoFA: true,
    },
    {
        id: 3,
        name: "Mohamed Said",
        avatar: Avatar3,
        email: "mohamed@nova.laravel.com",
        isAdmin: false,
        twoFA: true,
    },
    {
        id: 4,
        name: "Ian Landsman",
        avatar: Avatar4,
        email: "ian@nova.laravel.com",
        isAdmin: false,
        twoFA: true,
    },
    {
        id: 5,
        name: "Dries Vints",
        avatar: Avatar5,
        email: "dries@nova.laravel.com",
        isAdmin: true,
        twoFA: false,
    },
    {
        id: 6,
        name: "Jess Archer",
        avatar: Avatar6,
        email: "jess@nova.laravel.com",
        isAdmin: true,
        twoFA: false,
    },
    {
        id: 7,
        name: "Mior Zaki",
        avatar: Avatar7,
        email: "mior@nova.laravel.com",
        isAdmin: true,
        twoFA: true,
    },
];
export const dashboardList = [
    { href: "main", title: "Main" },
    { href: "user-insights", title: "User Insights" },
];
export const resourcesList = [
    { href: "address", title: "Addresses" },
    { href: "comments", title: "Comments" },
    { href: "post", title: "Posts" },
    { href: "purchases", title: "Purchases" },
    { href: "roles", title: "Roles" },
    { href: "tags", title: "Tags" },
    { href: "user", title: "Users" },
];
