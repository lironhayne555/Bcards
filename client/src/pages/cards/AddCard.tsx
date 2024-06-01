import AddIcon from "@mui/icons-material/Add";
import { Avatar, Container, Fab } from "@mui/material";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AppContext";
import FormLayout from "../../components/FormLayout";
import { AddCardForm, Card } from "../../components/RecipeReviewCard";
import "../../css/AddCard.css";
import { addCards } from "../../services/CardServices";

function AddCard() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Card>();
  const { user } = useAuth();
  const [cardForm, setCardForm] = useState({} as AddCardForm);
  const formData = new FormData();
  const navigate = useNavigate();
  const cancelFunction = () => {
    navigate("/myCards");
  };
  const clearImage = () => {
    cardForm.imageFile = null;
    cardForm.imageUrl = "";
  };

  useEffect(() => {
    if (user?._id) setCardForm({ ...cardForm, userId: user?._id });
  }, [user]);
  const handleFileChange = (e: any) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);

      // setImageFile(file);

      setCardForm({
        ...cardForm,
        imageUrl: removeBlob(imageUrl),
        imageFile: file,
      });

      // setImageUrl(imageUrl);
    } else {
      // Clear imageUrl if no file is selected
      // setImageFile(null);
      // setImageUrl("");
    }
  };
  const removeBlob = (imageUrl: string) => {
    return imageUrl.substring(5);
  };
  const onSubmit = async () => {
    cardForm.email = user?.email ? user.email : "";
    cardForm.phone = user?.phone ? user.phone : "";
    cardForm.country = user?.country ? user.country : "";
    cardForm.city = user?.city ? user.city : "";
    cardForm.street = user?.street ? user.street : "";
    cardForm.houseNumber = user?.houseNumber ? user.houseNumber : "";
    cardForm.zip = user?.zip ? user.zip : "";
    console.log(cardForm);

    await addCards(cardForm);
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
              <AddIcon />
            </Avatar>
          </div>
          <Typography align="center" component="h1" variant="h5">
            CREATE CARD
          </Typography>
          <Grid item container direction="column" className="mt-4">
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
                    required: "title must be require",
                  })}
                  InputProps={{ inputProps: { min: 2, max: 256 } }}
                  autoComplete="Title"
                  name="title"
                  required
                  fullWidth
                  id="title"
                  label="title"
                  onChange={(e) => onInput(e.target)}
                  autoFocus
                  error={Boolean(errors.title)}
                  helperText={errors.title?.message}
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
                    required: "subtitle must be require",
                  })}
                  InputProps={{ inputProps: { min: 2, max: 256 } }}
                  fullWidth
                  required
                  id="subTitle"
                  label="subTitle"
                  name="subtitle"
                  autoComplete="SubTitle"
                  onChange={(e) => onInput(e.target)}
                  error={Boolean(errors.subtitle)}
                  helperText={errors.subtitle?.message}
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
                    required: "description must be require",
                  })}
                  required
                  InputProps={{ inputProps: { min: 2, max: 1024 } }}
                  fullWidth
                  id="description"
                  label="description"
                  name="description"
                  autoComplete="Description"
                  onChange={(e) => onInput(e.target)}
                  error={Boolean(errors.description)}
                  helperText={errors.description?.message}
                />
              </Grid>
              {/* <Grid item xs={6}>
                <TextField
                  {...register("phone", {
                    pattern: {
                      value:
                        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                      message: "phone must be a valid phone number",
                    },
                    required: "phone must be require",
                  })}
                  required
                  fullWidth
                  id="phone"
                  label="Phone"
                  name="phone"
                  autoComplete="Phone"
                  onChange={(e) => onInput(e.target)}
                  error={Boolean(errors.phone)}
                  helperText={errors.phone?.message}
                />
              </Grid>
              <Grid item xs={6}>
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
                  InputProps={{ inputProps: { min: 6, max: 256 } }}
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => onInput(e.target)}
                  error={Boolean(errors.email)}
                  helperText={errors.email?.message}
                />
              </Grid> */}
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
                  InputProps={{ inputProps: { min: 2, max: 1024 } }}
                  label="web"
                  type="web"
                  id="web"
                  autoComplete="Website"
                  onChange={(e) => onInput(e.target)}
                  error={Boolean(errors.web)}
                  helperText={errors.web?.message}
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
                    className="mb-3"
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
                  fullWidth
                  name="imageAlt"
                  label="Image Alt"
                  type="imageAlt"
                  id="imageAlt"
                  autoComplete="image-Alt"
                  onChange={(e) => onInput(e.target)}
                  InputProps={{ inputProps: { min: 6, max: 1024 } }}
                  error={Boolean(errors.imageAlt)}
                  helperText={errors.imageAlt?.message}
                />
              </Grid>
              {/* <Grid item xs={6}>
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
                    required: "country must be require",
                  })}
                  required
                  fullWidth
                  name="country"
                  label="Country"
                  InputProps={{ inputProps: { min: 2, max: 256 } }}
                  type="country"
                  id="country"
                  autoComplete="country"
                  onChange={(e) => onInput(e.target)}
                  error={Boolean(errors.country)}
                  helperText={errors.country?.message}
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
                    required: "street must be require",
                  })}
                  required
                  InputProps={{ inputProps: { min: 2, max: 256 } }}
                  fullWidth
                  name="street"
                  label="Street"
                  type="street"
                  id="street"
                  autoComplete="street"
                  onChange={(e) => onInput(e.target)}
                  error={Boolean(errors.street)}
                  helperText={errors.street?.message}
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
                    required: "city must be require",
                  })}
                  required
                  fullWidth
                  id="city"
                  label="City"
                  name="city"
                  InputProps={{ inputProps: { min: 2, max: 256 } }}
                  autoComplete="city"
                  onChange={(e) => onInput(e.target)}
                  error={Boolean(errors.city)}
                  helperText={errors.city?.message}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  {...register("houseNumber", {
                    pattern: {
                      value: /[0-9]{1,3}/,
                      message:
                        "house number must be a number with max 3 digits",
                    },
                    required: "house number must be require",
                  })}
                  fullWidth
                  required
                  InputProps={{ inputProps: { max: 3 } }}
                  name="houseNumber"
                  label="House Number"
                  type="houseNumber"
                  id="houseNumber"
                  autoComplete="house-Number"
                  onChange={(e) => onInput(e.target)}
                  error={Boolean(errors.houseNumber)}
                  //  error={ houseNumber.length===0}}
                  helperText={errors.houseNumber?.message}
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
                  type="zip"
                  id="zip"
                  autoComplete="zip"
                  onChange={(e) => onInput(e.target)}
                  InputProps={{ inputProps: { min: 5, max: 50 } }}
                  error={Boolean(errors.zip)}
                  helperText={errors.zip?.message}
                />
              </Grid> */}
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
        </form>{" "}
      </FormLayout>{" "}
    </Container>
  );
}

export default AddCard;
