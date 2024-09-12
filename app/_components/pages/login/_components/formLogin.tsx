"use client";

import * as React from "react";

// @mui
import {
  Box,
  Button,
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  TextFieldProps,
  Typography,
  TypographyOwnProps,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

// color
import globalColor from "@/_assets/colors";

// react-hook-form
import { Controller, FieldErrors, useForm } from "react-hook-form";

// Zod
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// type
import { WrongAlertProps } from "@/_components/pages/login/loginType";

const loginSchema = z.object({
  userName: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

// type
type FormProps = {
  showAlert: boolean;
  onFocus: React.Dispatch<React.SetStateAction<boolean>>;
  setCheckWrong: React.Dispatch<React.SetStateAction<boolean>>;
  setWrongAlert: React.Dispatch<React.SetStateAction<WrongAlertProps>>;
};
type LoginProps = z.infer<typeof loginSchema>;

// css
const headerStyle: TypographyOwnProps["sx"] = {
  fontSize: { xs: 24, sm: 30 },
  fontFamily: "'Dancing Script', cursive",
  fontWeight: "bold",
  mb: { xs: "20px", sm: "30px" },
  color: globalColor.login,
};

const inputStyle: TextFieldProps["sx"] = {
  fontSize: { xs: 24, sm: 30 },
  fontFamily: "'Dancing Script', cursive",
  fontWeight: "bold",
  mb: { xs: "6px", sm: "10px" },
  bgcolor: "#ffffff",
  color: globalColor.login,
};

const FormLogin = ({
  showAlert,
  onFocus,
  setCheckWrong,
  setWrongAlert,
}: FormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      userName: "",
      password: "",
    },
  });
  // form
  const [showPassword, setShowPassword] = React.useState(false);
  const passwordRef = React.useRef<HTMLInputElement | null>(null);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onSubmit = (data: LoginProps) => {
    console.log(data);
  };
  const onError = (errors: FieldErrors<LoginProps>) => {
    console.log(errors);
    if (errors.password && passwordRef.current) {
      passwordRef.current.focus();
    }
    setCheckWrong(true);
    setTimeout(() => {
      setCheckWrong(false);
      setWrongAlert({
        showAlert: true,
        message: "",
      });
    }, 500);
  };
  //khi click login lỗi khoảng vài lần thì chỉ mất onfocus mà ko bắt onError
  React.useEffect(() => {
    let ig = false;
    if (!ig) {
      if (errors.password && passwordRef.current) {
        passwordRef.current.focus();
      }
    }
    return () => {
      ig = true;
    };
  }, [errors.password]);
  return (
    <Box
      component="form"
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit, onError)}>
      <Typography variant="h1" sx={headerStyle}>
        Login
      </Typography>

      {/* Username Field */}
      <FormControl variant="filled" sx={{ m: 1, width: "25ch" }}>
        <InputLabel htmlFor="username">Username</InputLabel>
        <Controller
          name="userName"
          control={control}
          render={({ field }) => (
            <FilledInput {...field} id="username" required />
          )}
        />
        {errors.userName && (
          <Typography variant="body2" color="error">
            {errors.userName.message}
          </Typography>
        )}
      </FormControl>
      <FormControl sx={{ m: 1, width: "25ch" }} variant="filled">
        <InputLabel htmlFor="password">Password</InputLabel>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <FilledInput
              {...field}
              id="password"
              required
              inputRef={passwordRef}
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              onFocus={() => onFocus(true)}
              onBlur={() => onFocus(false)}
            />
          )}
        />
        {errors.password && (
          <Typography variant="body2" color="error">
            {errors.password.message}
          </Typography>
        )}
      </FormControl>
      {/* Submit Button */}
      <Button
        variant="contained"
        disabled={showAlert}
        sx={{
          bgcolor: globalColor.login,
          color: "#ffffff",
          border: "1px solid #035809",
          transitionDuration: "300ms",
          boxShadow: "0 50px #035809 inset",
          padding: "4px 30px",
          marginTop: "20px",
          "&:hover": {
            color: globalColor.login,
            bgcolor: "#ffffff",
            boxShadow: `0 0 ${globalColor.login} insset`,
          },
          "&:focus": {
            outline: "none",
          },
        }}
        type="submit">
        Login
      </Button>
    </Box>
  );
};

export default FormLogin;
