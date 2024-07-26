import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { setUser } from "../../utils/store/auth.slice";
import { loginAPI } from "../../utils/services/auth.api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import AcUnitIcon from "@mui/icons-material/AcUnit";
const schema = Yup.object().shape({
    email: Yup.string().required("Trường này là bắt buộc"),
    password: Yup.string().required("Trường này là bắt buộc"),
});
export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [state, setState] = useState({
        loading: false,
        data: {
            email: "",
            password: "",
        },
    });

    useEffect(() => {
        if (!state.loading) return;
        loginAPI(state.data)
            .then((res) => {
                toast.success("Login success! 🦄");
                localStorage.setItem("token", JSON.stringify(res?.data));
                dispatch(setUser(res?.data));
                if (location?.state) {
                    navigate(location?.state);
                } else {
                    navigate("/");
                }
                setState((v) => ({ ...v, loading: true }));
            })
            .catch((er) => {
                toast.error("Login error! 🦄");
                setState((v) => ({ ...v, loading: true }));
            });
    }, [state.loading, state.data]);

    const onSubmit = (data) => {
        setState({
            loading: true,
            data: data,
        });
    };

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
                <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 w-1/4">
                    <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">
                        Welcome to CMS!
                    </h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4 w-full">
                            <div className="flex flex-col gap-y-2">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Email
                                </label>
                                <input
                                    {...register("email")}
                                    type="email"
                                    id="email"
                                    className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="your@email.com"
                                />
                            </div>
                            {errors.email && (
                                <p className="block w-full text-red-500 text-xs">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                        <div className="mb-4">
                            <div className="w-full flex flex-col gap-y-2">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    {...register("password")}
                                    className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Enter your password"
                                />
                            </div>
                            {errors.password && (
                                <p className="block w-full text-red-500 text-xs">
                                    {errors.password.message}
                                </p>
                            )}
                            <a
                                href="#"
                                className="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Forgot Password?
                            </a>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:outline-none"
                                    defaultChecked
                                />
                                <label
                                    htmlFor="remember"
                                    className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                                    Remember me
                                </label>
                            </div>
                            <a
                                href="#"
                                className="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Create Account
                            </a>
                        </div>
                        <Button
                            variant="contained"
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            {state.loading ? (
                                <AcUnitIcon className="animate-spin" />
                            ) : (
                                "Login"
                            )}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
