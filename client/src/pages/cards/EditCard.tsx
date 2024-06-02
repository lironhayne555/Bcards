import EditIcon from "@mui/icons-material/Edit";
import { Avatar, Fab } from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../AppContext";
import FormLayout from "../../components/FormLayout";
import { Card } from "../../components/RecipeReviewCard";
import { editCards, getCardById } from "../../services/CardServices";
function EditCard() {
  const { _id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Card>();
  const [cardForm, setCardForm] = useState({} as Card);
  const navigate = useNavigate();
  const { user } = useAuth();
  useEffect(() => {
    if (!_id) return;
    getCardById(_id).then((json) => {
      if (user?._id) {
        delete json.__v;

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
      // const imageUrl = URL.createObjectURL(file);
    }
  };
  const clearImage = () => {
    cardForm.imageUrl = "";
  };
  // const removeBlob = (imageUrl: string) => {
  //   return imageUrl.substring(5);
  // };
  const onSubmit = async () => {
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
              <Grid item xs={12}>
                <TextField
                  onInput={(ev) => onInput(ev.target)}
                  name="imageUrl"
                  label={cardForm.imageUrl ? "" : "Image URL"}
                  fullWidth
                  value={cardForm.imageUrl || ""}
                />
              </Grid>
              <Grid item xs={12}>
                {cardForm.imageUrl && (
                  <img
                    src={`${cardForm.imageUrl}`}
                    alt="Uploaded"
                    style={{ maxWidth: "100%" }}
                  />
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
        </form>
      </FormLayout>
    </Container>
  );
}
export default EditCard;
