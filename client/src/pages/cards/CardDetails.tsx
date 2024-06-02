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
import { getUserDetails } from "../../services/ApiServices";
//import "../../css/CardDetails.css";
function CardDetails() {
  const { _id } = useParams();
  const [cardForm, setCardForm] = useState<FullCard | null>(null);
  const { user } = useAuth();
  const [userId, setUserId] = useState(user?._id);
  const defaultImageUrl = "http://localhost:8080/images/default_image.jpg";
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  useEffect(() => {
    if (!_id) return;
    const fetchCardDetails = async () => {
      try {
        const json = await getCardById(_id);
        if (user?._id) {
          delete json.__v;
          let cardsWithUserDetails: FullCard;
          if (user._id === json.userId) {
            cardsWithUserDetails = {
              ...json,
              user: {
                email: user.email,
                phone: user.phone,
                country: user.country,
                city: user.city,
                street: user.street,
                houseNumber: user.houseNumber,
                zip: user.zip,
              },
            };
          } else {
            const userCard = await getUserDetails(json.userId);
            cardsWithUserDetails = {
              ...json,
              user: {
                email: userCard.email,
                phone: userCard.phone,
                country: userCard.country,
                city: userCard.city,
                street: userCard.street,
                houseNumber: userCard.houseNumber,
                zip: userCard.zip,
              },
            };
          }
          setCardForm(cardsWithUserDetails);
        }
      } catch (error) {
        console.error("Error fetching card details:", error);
      }
    };
    fetchCardDetails();
  }, [_id, user]);
  if (!cardForm) {
    return <div>Loading...</div>; // or some loading spinner
  }

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 10, mb: 10 }}>
      <CssBaseline />
      <Card
        sx={{
          width: "100%",
          maxWidth: 400,
          margin: "0 auto",
        }}
      >
        {cardForm.imageUrl ? (
          <CardMedia
            className="cardMedia"
            component="img"
            height="300"
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
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid
              item
              container
              xs={12}
              spacing={0}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
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
