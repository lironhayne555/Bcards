import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { SubmitHandler, useForm } from "react-hook-form";
import { User } from "./SignUp";
import { useContext, useEffect, useState } from "react";
import FormLayout from "../components/FormLayout";
import { useNavigate } from "react-router-dom";
import * as tokenManager from "./TokenManager";
import { signin } from "../services/ApiServices";
import { log } from "console";
import { useAuth } from "../AppContext";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignIn() {
  const { user, setUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    formState,
  } = useForm<User>();
  const [userForm, setUserForm] = useState({} as User);

  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const onSubmit: SubmitHandler<User> = (data) => login(data);
  const navigate = useNavigate();
  const cancelFunction = () => {
    navigate("/cards");
  };
  const onSubmit = async () => {
    await signin(userForm).then((user: User) => {
      setUser(user);
      tokenManager.setUser(user);
      tokenManager.setToken(user.token);
      navigate("/cards");
    });
  };

  const onInput = (element: any) => {
    setUserForm({ ...userForm, [element.name]: element.value });
  };
  return (
    <FormLayout>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="avatar-container">
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
        </div>
        <Typography align="center" component="h1" variant="h5">
          LOGIN
        </Typography>
        <Grid
          item
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          className="mt-4"
        >
          <Grid item container spacing={2}>
            <Grid item xs={12}>
              <TextField
                {...register("email", {
                  pattern: {
                    value:
                      /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
                    message: "user mail must be a valid mail",
                  },
                  required: "email must be require",
                })}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => onInput(e.target)}
                autoFocus
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("password", {
                  pattern: {
                    value:
                      /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/,
                    message:
                      "user password must be at least 8 characters long and contain an upperCase letter, lowerCase, min 4 numbers and one of the following characters !@#$%^&*",
                  },
                  required: "password must be require",
                })}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={(e) => onInput(e.target)}
                autoComplete="current-password"
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="outlined"
                color="error"
                onClick={() => cancelFunction()}
              >
                CANCEL
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" fullWidth variant="contained">
                SUBMIT
              </Button>
            </Grid>
            <Grid item>
              <Link href="signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </FormLayout>
    //     </Box>
    //   </Container>
    // </ThemeProvider>
  );
}
