import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../AppContext";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  CssBaseline,
  Grid,
  Typography,
} from "@mui/material";
import { Image, Phone } from "@mui/icons-material";
import { getCardById } from "../../services/CardServices";
import { FullCard } from "../../components/RecipeReviewCard";
//import "../../css/CardDetails.css";
function CardDetails() {
  const { _id } = useParams();
  const [cardForm, setCardForm] = useState({} as FullCard);
  const { user } = useAuth();
  const [userId, setUserId] = useState(user?._id);
  const defaultImageUrl = "http://localhost:8080/images/default_image.jpg";
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  useEffect(() => {
    if (!_id) return;
    getCardById(_id).then((json) => {
      if (user?._id) {
        delete json.__v;

        setCardForm({ ...json, userId: user?._id });
      }
    });
  }, [user]);

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <CssBaseline />
      <Card className="cardContainer" sx={{ maxWidth: 300 }}>
        {cardForm.imageUrl ? (
          <CardMedia
            className="cardMedia"
            component="img"
            height="150"
            src={cardForm.imageUrl}
          />
        ) : (
          <CardMedia
            className="cardMedia"
            component="img"
            height="300"
            src={defaultImageUrl}
            alt="Default Image"
          />
        )}

        <CardContent className="cardContainer">
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="title"
          >
            {cardForm.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            className="subtitle"
          >
            {cardForm.subtitle}
          </Typography>
          <br></br>
          <Typography component="div" className="description">
            Description: {cardForm.description}
          </Typography>
          <Typography component="div" className="address">
            Address: {cardForm.user.country} ,{cardForm.user.city},{" "}
            {cardForm.user.street} ,{cardForm.user.houseNumber},{" "}
            {cardForm.user.zip}
          </Typography>
          <Typography component="div" className="contactInfo">
            Phone: {cardForm.user.phone}
          </Typography>
          <Typography component="div" className="contactInfo">
            Email: {cardForm.user.email}
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
              <Grid>
                <Button
                  onClick={() => handleGoBack()}
                  className="backButton"
                  size="small"
                >
                  BACK
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Container>
  );
}
export default CardDetails;
