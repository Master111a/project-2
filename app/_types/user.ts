export type User = {
    id?: string;
    email?: string;
    name: string;
    avatar: string;
};
export type UserToken = {
    id?: string;
    access: string;
    refresh: string;
};
