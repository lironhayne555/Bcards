import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Avatar, Fab } from "@mui/material";
import FormLayout from "../../components/FormLayout";
import { editCards, getCardById } from "../../services/CardServices";
import EditIcon from "@mui/icons-material/Edit";
import { upload } from "@testing-library/user-event/dist/upload";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AddCardForm, Card } from "../../components/RecipeReviewCard";
import { toast } from "react-toastify";
import { useAuth } from "../../AppContext";
import { log } from "console";
function EditCard() {
  const { _id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    formState,
  } = useForm<Card>();
  const [cardForm, setCardForm] = useState({} as AddCardForm);
  const navigate = useNavigate();
  const { user } = useAuth();
  useEffect(() => {
    if (!_id) return;
    getCardById(_id).then((json) => {
      if (user?._id) {
        setCardForm({ ...json, userId: user?._id });
      }
    });
  }, [user]);

  const cancelFunction = () => {
    navigate("/myCards");
  };
  const handleFileChange = (e: any) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
    }
  };
  const clearImage = () => {
    cardForm.imageFile = null;
    cardForm.imageUrl = "";
  };
  const removeBlob = (imageUrl: string) => {
    return imageUrl.substring(5);
  };
  const onSubmit = async () => 
    await editCards(cardForm);
    navigate("/myCards");
  };

  const onInput = (element: any) => {
    setCardForm({ ...cardForm, [element.name]: element.value });
  };
return (
    <Container component="main" maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <CssBaseline />
      <FormLayout>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="avatar-container">
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <EditIcon />
            </Avatar>
          </div>
          <Typography align="center" component="h1" variant="h5">
            Edit CARD
          </Typography>
          <Grid container direction="column" className="mt-4">
            <Grid item container xs={12} spacing={2}>
              <Grid item xs={6}>
                <TextField
                  {...register("title", {
                    minLength: {
                      value: 2,
                      message:
                        "title length must be at least 2 characters long",
                    },
                    maxLength: {
                      value: 256,
                      message:
                        "title length must be maxium 256 characters long",
                    },
                  })}
                  InputProps={{ inputProps: { min: 2, max: 256 } }}
                  autoComplete="Title"
                  name="title"
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  value={cardForm.title || ""}
                  onChange={(e) => onInput(e.target)}
                  autoFocus
                  error={Boolean(errors.title)}
                  helperText={errors.title ? errors.title.message : ""}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  {...register("subtitle", {
                    minLength: {
                      value: 2,
                      message:
                        "subtitle length must be at least 2 characters long",
                    },
                    maxLength: {
                      value: 256,
                      message:
                        "subtitle length must be maxium 256 characters long",
                    },
                  })}
                  // required: "subtitle must be require"})}
                  fullWidth
                  InputProps={{ inputProps: { min: 2, max: 256 } }}
                  required
                  id="subtitle"
                  value={cardForm.subtitle || ""}
                  name="subTitle"
                  label="SubTitle"
                  autoComplete="SubTitle"
                  onChange={(e) => onInput(e.target)}
                  error={Boolean(errors.subtitle)}
                  helperText={errors.subtitle ? errors.subtitle.message : ""}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  {...register("description", {
                    minLength: {
                      value: 2,
                      message:
                        "description length must be at least 2 characters long",
                    },
                    maxLength: {
                      value: 1024,
                      message:
                        "description length must be maxium 1024 characters long",
                    },
                  })}
                  required
                  fullWidth
                  InputProps={{ inputProps: { min: 2, max: 1024 } }}
                  id="description"
                  value={cardForm.description || ""}
                  name="description"
                  label="Description"
                  autoComplete="Description"
                  onChange={(e) => onInput(e.target)}
                  error={Boolean(errors.description)}
                  helperText={
                    errors.description ? errors.description.message : ""
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  {...register("phone", {
                    pattern: {
                      value:
                        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                      message: "phone must be a valid phone number",
                    },
                  })}
                  required
                  fullWidth
                  id="phone"
                  value={cardForm.phone || ""}
                  name="phone"
                  label="Phone"
                  autoComplete="Phone"
                  onChange={(e) => onInput(e.target)}
                  error={Boolean(errors.phone)}
                  helperText={errors.phone ? errors.phone.message : ""}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  {...register("email", {
                    pattern: {
                      value:
                        /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
                      message: "user mail must be a valid mail",
                    },
                  })}
                  required
                  fullWidth
                  id="email"
                  value={cardForm.email || ""}
                  name="email"
                  label="Email"
                  autoComplete="email"
                  InputProps={{ inputProps: { min: 6, max: 256 } }}
                  onChange={(e) => onInput(e.target)}
                  error={Boolean(errors.email)}
                  helperText={errors.email ? errors.email.message : ""}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  {...register("web", {
                    minLength: {
                      value: 2,
                      message: "web length must be at least 2 characters long",
                    },
                    maxLength: {
                      value: 1024,
                      message: "web length must be maxium 1024 long",
                    },
                  })}
                  fullWidth
                  name="web"
                  label="web"
                  value={cardForm.web || ""}
                  type="web"
                  id="web"
                  InputProps={{ inputProps: { min: 2, max: 1024 } }}
                  autoComplete="Website"
                  onChange={(e) => onInput(e.target)}
                  error={Boolean(errors.web)}
                  helperText={errors.web ? errors.web.message : ""}
                />
              </Grid>

              <Grid item xs={12}>
                <input
                  style={{ display: "none" }}
                  id="upload-photo"
                  name="upload-photo"
                  type="file"
                  onChange={handleFileChange}
                />
                <label htmlFor="upload-photo">
                  <Fab
                    color="primary"
                    size="small"
                    component="span"
                    aria-label="add"
                    variant="extended"
                  >
                    Upload
                  </Fab>
                </label>
                <TextField
                  label={cardForm.imageUrl ? "" : "Image URL"}
                  fullWidth
                  value={cardForm.imageUrl || ""}
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                {cardForm.imageUrl && (
                  <img
                    src={`blob:${cardForm.imageUrl}`}
                    alt="Uploaded"
                    style={{ maxWidth: "100%" }}
                  />
                )}
              </Grid>
              <Grid item xs={12}>
                <Button onClick={clearImage}>Clear Image</Button>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  {...register("imageAlt", {
                    minLength: {
                      value: 6,
                      message:
                        "Image alt length must be at least 6 characters long",
                    },
                    maxLength: {
                      value: 1024,
                      message: "Image Alt length must be maxium 1024 long",
                    },
                  })}
                  name="imageAlt"
                  label="Image Alt"
                  type="imageAlt"
                  id="imageAlt"
                  InputProps={{ inputProps: { min: 6, max: 1024 } }}
                  value={cardForm.imageAlt || ""}
                  autoComplete="image-Alt"
                  onChange={(e) => onInput(e.target)}
                  error={Boolean(errors.imageAlt)}
                  helperText={errors.imageAlt ? errors.imageAlt.message : ""}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  {...register("country", {
                    minLength: {
                      value: 2,
                      message:
                        "country length must be at least 2 characters long",
                    },
                    maxLength: {
                      value: 256,
                      message: "country length must be maxium 256 long",
                    },
                  })}
                  required
                  fullWidth
                  name="country"
                  label="Country"
                  type="country"
                  id="country"
                  InputProps={{ inputProps: { min: 2, max: 256 } }}
                  value={cardForm.country || ""}
                  autoComplete="country"
                  onChange={(e) => onInput(e.target.value)}
                  error={Boolean(errors.country)}
                  helperText={errors.country ? errors.country.message : ""}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  {...register("street", {
                    minLength: {
                      value: 2,
                      message:
                        "street length must be at least 2 characters long",
                    },
                    maxLength: {
                      value: 256,
                      message: "street length must be maxium 256 long",
                    },
                  })}
                  required
                  fullWidth
                  name="street"
                  label="Street"
                  value={cardForm.street || ""}
                  type="street"
                  InputProps={{ inputProps: { min: 2, max: 256 } }}
                  id="street"
                  autoComplete="street"
                  onChange={(e) => onInput(e.target)}
                  error={Boolean(errors.street)}
                  helperText={errors.street ? errors.street.message : ""}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  {...register("city", {
                    minLength: {
                      value: 2,
                      message: "city length must be at least 2 characters long",
                    },
                    maxLength: {
                      value: 256,
                      message: "city length must be maxium 256 long",
                    },
                  })}
                  required
                  fullWidth
                  id="city"
                  label="City"
                  name="city"
                  InputProps={{ inputProps: { min: 2, max: 256 } }}
                  value={cardForm.city || ""}
                  autoComplete="city"
                  onChange={(e) => onInput(e.target)}
                  error={Boolean(errors.city)}
                  helperText={errors.city ? errors.city.message : ""}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  {...register("houseNumber", {
                    pattern: {
                      value: /[0-9]{0,3}/,
                      message:
                        "house number must be a number with max 3 digits",
                    },
                  })}
                  fullWidth
                  value={cardForm.houseNumber || ""}
                  name="houseNumber"
                  label="House Number"
                  type="houseNumber"
                  id="houseNumber"
                  autoComplete="house-Number"
                  onChange={(e) => onInput(e.target)}
                  InputProps={{ inputProps: { max: 3 } }}
                  error={Boolean(errors.houseNumber)}
                  helperText={
                    errors.houseNumber ? errors.houseNumber.message : ""
                  }
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  {...register("zip", {
                    minLength: {
                      value: 5,
                      message: "city length must be at least 5 characters long",
                    },
                    maxLength: {
                      value: 50,
                      message: "zip length must be maxium 50 long",
                    },
                  })}
                  fullWidth
                  name="zip"
                  label="Zip"
                  InputProps={{ inputProps: { min: 5, max: 50 } }}
                  id="zip"
                  value={cardForm.zip || ""}
                  autoComplete="zip"
                  onChange={(e) => onInput(e.target)}
                  error={Boolean(errors.zip)}
                  helperText={errors.zip ? errors.zip.message : ""}
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
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  sx={{ mb: 5 }}
                >
                  SUBMIT
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </FormLayout>
    </Container>
  );
}
export default EditCard;
