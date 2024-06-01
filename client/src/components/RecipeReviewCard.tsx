import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeIcon from "@mui/icons-material/Mode";
import PhoneIcon from "@mui/icons-material/Phone";
import { Button, CardContent, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../AppContext";
import { verifyToken } from "../auth/TokenManager";
import { useForceUpdate } from "./useForceUpdate";
import { getCardById } from "../services/CardServices";
export interface AddCardForm extends Card {
  userId: string;
  imageFile?: File | null;
}
export interface Card {
  __v?: number;
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
  formData?: FormData | null;
  handleDelete: Function;
  handleUpdate: Function;
  isRedHeart: boolean;
  setIsRedHeart: Function;
  handleSetFavs: Function;
}

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

interface RecipeReviewCardProps {
  card: Card;
  isFav?: boolean;
  handleUpdate: Function;
  handleDelete: Function;
  handleSetFavs: Function;
}

export const RecipeReviewCard = ({
  card,
  isFav,
  handleDelete,
  handleSetFavs,
  handleUpdate,
}: RecipeReviewCardProps) => {
  const navigate = useNavigate();
  const forceUpdate = useForceUpdate();
  const [expanded, setExpanded] = React.useState(false);
  const { user } = useAuth();
  //const [isRedHeart, setIsRedHeart] = useState(false);
  const defaultImageUrl = "http://localhost:8080/images/default_image.jpg";
  const locationPathname = useLocation().pathname;
  function showButtonDelete(): boolean {
    if (locationPathname === "/myCards") {
      if (user?._id === card.userId || user?.isAdmin) return true;
    }
    return false;
  }
  function onClickPhone(_id: string) {
    console.log("go to whatsapp");
  }

  function onMoreDetails(_id: string) {
    getCardById(_id).then((json) => {
      navigate(`/cardDetails/${_id}`);
    });
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
    if (locationPathname === "/myCards") {
      if (user?._id === card.userId || user?.isAdmin) return true;
    }
    return false;
  }
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
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
      {card.imageUrl ? (
        <CardMedia
          component="img"
          height="194"
          src={card.imageUrl}
          alt={card.imageAlt ? card.imageAlt : "Uploaded Image"}
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
          {card.title}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          {card.subtitle}
        </Typography>
        <br></br>
        <Typography component="div">Phone: {card.phone}</Typography>
        <Typography component="div">
          Address: {card.street} {card.houseNumber}, {card.city} ,{card.country}
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
                  onClick={() => handleDelete(card._id ? card._id : "")}
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
                  onClick={() => handleUpdate(card._id ? card._id : "")}
                >
                  <ModeIcon></ModeIcon>
                </IconButton>
              )}
            </Grid>
            <Grid item xs={5}></Grid>
            <Grid item xs={1.5}>
              {showButtonPhone() && (
                <IconButton
                  onClick={() => onClickPhone(card._id ? card._id : "")}
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
                    handleSetFavs(card._id ? card._id : "");
                  }}
                >
                  <FavoriteIcon style={{ color: isFav ? "red" : "" }} />
                </IconButton>
              )}
            </Grid>
            <Grid>
              <Button
                onClick={() => onMoreDetails(card._id ? card._id : "")}
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
