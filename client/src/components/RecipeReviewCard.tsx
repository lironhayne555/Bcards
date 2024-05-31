import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PhoneIcon from "@mui/icons-material/Phone";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeIcon from "@mui/icons-material/Mode";
import { Button, CardContent, Grid } from "@mui/material";
import { verifyToken } from "../auth/TokenManager";
import { useAuth } from "../AppContext";
import { useLocation } from "react-router-dom";
import { useRecipeReviewCard } from "./useRecipeReviewCard";
import { useEffect } from "react";
import { setFavorites } from "../services/CardServices";
import { User } from "../auth/SignUp";
import { toast } from "react-toastify";
import { useForceUpdate } from "./useForceUpdate";
export interface AddCardForm extends Card {
  userId: string;
  imageFile?: File | null;
}
export interface Card {
  _id?: string;
  title: string;
  subtitle: string;
  description: string;
  phone: string;
  email: string;
  web: string;
  imageUrl?: any;
  imageAlt: string;
  state: string;
  country: string;
  city: string;
  street: string;
  houseNumber: number | string;
  zip: string;
  userId: string | null;
  favorites?: [] | null;
  formData?: FormData | null;
  handleDelete: Function;
  handleUpdate: Function;
  isRedHeart: boolean;
  setIsRedHeart: Function;
  handleSetFavs: Function;
}

// interface CardProps extends Card {
// handleDelete: Function,
// showCruds:boolean
// handleSetFave: Function,
// //isRed: boolean,
// favsStatus:{[key: string]: boolean },
// handleUpdate: Function,
// handleWhatsapp:Function,
// handleShowDetails:Function

// }

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const RecipeReviewCard = ({
  _id,
  title,
  subtitle,
  description,
  phone,
  email,
  web,
  imageUrl,
  imageAlt,
  state,
  country,
  street,
  houseNumber,
  city,
  zip,
  favorites,
  handleDelete,
  handleUpdate,
  handleSetFavs,
}: Card) => {
  const { showCrud, favsStatus, setFavsStatus, onClickPhone, onMoreDetails } =
    useRecipeReviewCard();
  const forceUpdate = useForceUpdate();
  const [expanded, setExpanded] = React.useState(false);
  const { user } = useAuth();
  const [isRedHeart, setIsRedHeart] = React.useState(false);
  //const [isRedHeart, setIsRedHeart] = useState(false);
  const defaultImageUrl = "http://localhost:8080/images/default_image.jpg";
  const locationPathname = useLocation().pathname;
  function showButtonDelete(): boolean {
    if ((user?.isAdmin || showCrud) && locationPathname === "/myCards")
      return true;
    return false;
  }

  function showButtonPhone(): boolean {
    if (!verifyToken() || verifyToken()) return true;
    return false;
  }
  function showButtonFavorit(): boolean {
    if (verifyToken()) return true;
    return false;
  }
  function showButtonUpdate(): boolean {
    if ((user?.isAdmin || showCrud) && locationPathname === "/myCards")
      return true;
    return false;
  }
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  useEffect(() => {
    const ifCardIsFavorite = (userId: string | null | undefined) => {
      favorites?.forEach((id) => {
        if (id === userId) {
          setIsRedHeart(true);
        }
      });
    };
    if (user) {
      ifCardIsFavorite(user._id);
    }
  }, [favorites]);

  return (
    <Card
      sx={{
        maxWidth: 200,
        boxShadow: "0 0 5px 1px rgba(0, 0, 0, 0.1)",
        borderRadius: "20px",
        height: "auto",
        display: "flex",
        flexDirection: "column",
      }}
      className="m-5"
    >
      {imageUrl ? (
        <CardMedia
          component="img"
          height="194"
          src={imageUrl}
          alt={imageAlt ? imageAlt : "Uploaded Image"}
          sx={{ objectFit: "cover", maxHeight: "120px", maxWidth: "100%" }}
        />
      ) : (
        <CardMedia
          component="img"
          height="194"
          src={defaultImageUrl}
          alt="Default Image"
          sx={{ objectFit: "cover", maxHeight: "100%", maxWidth: "100%" }}
        />
      )}

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          {subtitle}
        </Typography>
        <br></br>
        <Typography component="div">Phone: {phone}</Typography>
        <Typography component="div">
          Address: {street} {houseNumber}, {city} ,{country}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <Grid
          item
          container
          direction="row"
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <Grid
            item
            container
            xs={12}
            spacing={0}
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <Grid item xs={1.5}>
              {showButtonDelete() && (
                <IconButton
                  onClick={() => handleDelete(_id ? _id : "")}
                  aria-label="delete"
                >
                  <DeleteIcon></DeleteIcon>
                </IconButton>
              )}
            </Grid>
            <Grid item xs={1.5}>
              {showButtonUpdate() && (
                <IconButton
                  aria-label="update"
                  onClick={() => handleUpdate(_id ? _id : "")}
                >
                  <ModeIcon></ModeIcon>
                </IconButton>
              )}
            </Grid>
            <Grid item xs={5}></Grid>
            <Grid item xs={1.5}>
              {showButtonPhone() && (
                <IconButton
                  onClick={() => onClickPhone(_id ? _id : "")}
                  aria-label="contact us"
                >
                  <PhoneIcon></PhoneIcon>
                </IconButton>
              )}
            </Grid>
            <Grid item xs={1.5}>
              {showButtonFavorit() && (
                <IconButton
                  aria-label="add to favorites"
                  onClick={() => {
                    handleSetFavs(_id ? _id : "");
                  }}
                >
                  <FavoriteIcon style={{ color: isRedHeart ? "red" : "" }} />
                </IconButton>
              )}
            </Grid>
            <Grid>
              <Button
                onClick={() => onMoreDetails(_id ? _id : "")}
                size="small"
              >
                More Details
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};
