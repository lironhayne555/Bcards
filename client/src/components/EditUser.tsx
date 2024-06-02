import {
  Avatar,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import FormLayout from "./FormLayout";
import {
  FieldError,
  SubmitHandler,
  UseFormRegister,
  useForm,
} from "react-hook-form";
import { User } from "../auth/SignUp";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { editUserFunction } from "../services/ApiServices";
interface Props {
  _id?: string;
  firstName?: string;
  setFirstName: Function;
  lastName: string;
  setLastName: Function;
  middleName: string;
  setMiddleName: Function;
  email: string;
  setEmail: Function;
  phone: string;
  setPhone: Function;
  country: string;
  setCountry: Function;
  city: string;
  setCity: Function;
  street: string;
  setStreet: Function;
  houseNumber: number | string;
  setHouseNumber: Function;
  zip: string;
  setZip: Function;
  isBusiness: boolean;
  setIsBusiness: Function;
  onCloseModal: Function;
}
function EditUser({
  _id,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  middleName,
  setMiddleName,
  email,
  setEmail,
  phone,
  setPhone,
  country,
  setCountry,
  city,
  setCity,
  street,
  setStreet,
  houseNumber,
  setHouseNumber,
  zip,
  setZip,
  isBusiness,
  setIsBusiness,
  onCloseModal,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    formState,
  } = useForm<User>();
  const onSubmit: SubmitHandler<User> = (data) => {
    functionEdit(_id, data);
    onCloseModal();
  };

  const navigate = useNavigate();
  const handleCheckChange = () => {
    setIsBusiness(!isBusiness);
  };

  function functionEdit(_id: any, user: User) {
    user.isBusiness = isBusiness;

    editUserFunction(_id, user)
      .then((res) => {})
      .catch((error) => {
        console.error("Error editing user:", error);
      });
  }
  return (
    <Container component="main" maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <CssBaseline />
      <FormLayout>
        {" "}
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className="avatar-container">
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <EditIcon />
            </Avatar>
          </div>
          <Typography align="center" component="h1" variant="h5">
            Edit User
          </Typography>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            className="mt-4"
          >
            <Grid item container xs={12} spacing={2}>
              <Grid item xs={6}>
                <TextField
                  {...register("firstName", {
                    minLength: {
                      value: 2,
                      message:
                        "first name length must be at least 2 characters long",
                    },
                    maxLength: {
                      value: 256,
                      message:
                        "first name length must be maxium 256 characters long",
                    },
                    required: "first name must be require",
                  })}
                  required
                  autoComplete="given-name"
                  name="firstName"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                  autoFocus
                  value={firstName}
                  style={{
                    width: "100%",
                    marginBottom: "1rem",
                    fontSize: "1.2rem",
                  }}
                  error={Boolean(errors.firstName)}
                  helperText={errors.firstName?.message}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  {...register("middleName", {
                    minLength: {
                      value: 6,
                      message:
                        "middle name length must be at least 6 characters long",
                    },
                    maxLength: {
                      value: 256,
                      message:
                        "middle name length must be maxium 256 characters long",
                    },
                  })}
                  fullWidth
                  id="middleName"
                  label="Middle Name"
                  value={middleName}
                  name="middleName"
                  autoComplete="Middle Name"
                  onChange={(e) => setMiddleName(e.target.value)}
                  error={Boolean(errors.middleName)}
                  helperText={errors.middleName?.message}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  {...register("lastName", {
                    minLength: {
                      value: 2,
                      message:
                        "last name length must be at least 2 characters long",
                    },
                    maxLength: {
                      value: 256,
                      message:
                        "last name length must be maxium 256 characters long",
                    },
                    required: "last name must be require",
                  })}
                  required
                  fullWidth
                  value={lastName}
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(e) => setLastName(e.target.value)}
                  error={Boolean(errors.lastName)}
                  helperText={errors.lastName?.message}
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
                    required: "phone must be require",
                  })}
                  required
                  fullWidth
                  value={phone}
                  id="phone"
                  label="Phone"
                  name="phone"
                  autoComplete="Phone"
                  onChange={(e) => setPhone(e.target.value)}
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
                  fullWidth
                  value={email}
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  error={Boolean(errors.email)}
                  helperText={errors.email?.message}
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
                    required: "country must be require",
                  })}
                  required
                  fullWidth
                  name="country"
                  label="Country"
                  type="country"
                  id="country"
                  autoComplete="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
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
                  fullWidth
                  required
                  name="street"
                  label="Street"
                  type="street"
                  id="street"
                  value={street}
                  autoComplete="street"
                  onChange={(e) => setStreet(e.target.value)}
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
                  autoComplete="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  error={Boolean(errors.city)}
                  helperText={errors.city?.message}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  {...register("houseNumber", {
                    required: "house number must be require",
                  })}
                  required
                  fullWidth
                  name="houseNumber"
                  label="House Number"
                  type="houseNumber"
                  id="houseNumber"
                  autoComplete="house-Number"
                  onChange={(e) => setHouseNumber(e.target.value)}
                  error={Boolean(errors.houseNumber)}
                  helperText={errors.houseNumber?.message}
                  value={houseNumber}
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
                  onChange={(e) => setZip(e.target.value)}
                  error={Boolean(errors.zip)}
                  helperText={errors.zip?.message}
                  value={zip}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isBusiness}
                      onChange={handleCheckChange}
                      color="primary"
                    />
                  }
                  label="A business user"
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  SUBMIT
                </Button>
              </Grid>
              <Grid item></Grid>
            </Grid>
          </Grid>
        </form>
      </FormLayout>
    </Container>
  );
}

export default EditUser;
