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
import { Card } from "../../components/RecipeReviewCard";
import "../../css/AddCard.css";
import { addCards } from "../../services/CardServices";

function AddCard() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Card>();
  const { user } = useAuth();
  const [isImageValid, setIsImageValid] = useState(false);
  const [cardForm, setCardForm] = useState({} as Card);
  const formData = new FormData();
  const navigate = useNavigate();
  const defaultImageUrl = "http://localhost:8080/images/default_image.jpg";
  const cancelFunction = () => {
    navigate("/myCards");
  };

  useEffect(() => {
    if (user?._id) setCardForm({ ...cardForm, userId: user?._id });
  }, [user]);
  const handleFileChange = (e: any) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);

      setCardForm({
        ...cardForm,
        imageUrl: imageUrl,
      });
    }
  };
  const removeBlob = (imageUrl: string) => {
    return imageUrl.substring(5);
  };
  const onSubmit = async () => {
    if (user?._id) {
      cardForm.userId = user?._id;
    }
    if (!isImageValid) cardForm.imageUrl = defaultImageUrl;

    await addCards(cardForm);
    navigate("/myCards");
  };

  const onInput = async (element: any) => {
    let isValid: any = true;
    if (element.name === "imageUrl") {
      isValid = checkImageUrl(element.value).then((isValid) => {
        setIsImageValid(!!isValid);
      });
    }

    setCardForm({ ...cardForm, [element.name]: element.value });
  };
  // const handleErrorImag =(e: Event) =>{
  // e.target.style.display = "none";
  // }
  const checkImageUrl = async (url: string) => {
    return new Promise((resolve) => {
      const img = document.createElement("img");
      img.src = url;
      img.onerror = () => {
        cardForm.imageUrl = defaultImageUrl;
        resolve(false);
      };
      img.onload = () => {
        resolve(true);
      };
    });
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
                  id="subtitle"
                  label="subtitle"
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
              <Grid item xs={12}>
                <TextField
                  onInput={(e) => onInput(e.target)}
                  label={cardForm.imageUrl ? "" : "Image URL"}
                  fullWidth
                  name="imageUrl"
                  value={cardForm.imageUrl || ""}
                  error={Boolean(errors.imageUrl)}
                />
                <Typography>
                  {!isImageValid && cardForm.imageUrl && "Image is not valid"}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                {cardForm.imageUrl && isImageValid ? (
                  <img src={cardForm.imageUrl} style={{ maxWidth: "100%" }} />
                ) : (
                  ""
                )}
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
        </form>{" "}
      </FormLayout>{" "}
    </Container>
  );
}

export default AddCard;
