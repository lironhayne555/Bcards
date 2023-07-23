import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import FormLayout from '../components/FormLayout';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { signup } from '../services/ApiServices';

export interface User {
    _id?: string;
    firstName?: string;
    lastName?:string;
    email: string;
    middleName?: string;
    phone?:string;
    password?: string;
    imageUrl?: string;
    imageAlt?: string;
    state?: string;
    country?: string;
    city?: string;
    street?: string;
    houseNumber?: number | string;
    zip?: string;
    isAdmin?: boolean;
    isBusiness?: boolean;
    token?: string;
    
}

export default function SignUp() {
    const { register, handleSubmit, formState: { errors }, formState } = useForm<User>();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLsatName] = useState('');
    const [email, setEmail] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [imageAlt, setimageAlt] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [zip, setZip] = useState('');
    const [isBusiness, setIsBusiness] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

   const handleCheckChange =()=>{
    setIsBusiness(!isBusiness);
    }
    const onSubmit: SubmitHandler<User> = (data) => signUp();

    function signUp () {
     signup({
              firstName,
              lastName,
              email,
              middleName,
              phone,
              password,
              imageUrl,
              imageAlt,
              state,
              country,
              city,
              street,
              houseNumber,
              zip,
              isAdmin,
              isBusiness
        })
            .then((user) => {
                navigate('/login')
            })
    }
  return (
          <FormLayout>  <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="avatar-container">
            <Avatar   sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          </div>
          <Typography align="center" component="h1" variant="h5" >
            REGISTER
          </Typography>
            <Grid container direction="column" justifyContent="center" alignItems="center" className='mt-4'>
              <Grid item container xs={12} spacing={2} >
              <Grid item xs={6}>
                <TextField
                  {...register('firstName',{ minLength:{value:2, message:"first name length must be at least 2 characters long"},
                  required: "first name must be require"})}
                  required
                  autoComplete="given-name"
                  name="firstName"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  onChange={(e)=> setFirstName(e.target.value)}
                  autoFocus
                  error={Boolean(errors.firstName)}
                  helperText={errors.firstName?.message}
                                  />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="middleName"
                  label="Middle Name"
                  name="middleName"
                  autoComplete="Middle Name"
                  onChange={(e)=> setMiddleName(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  {...register('lastName',{ minLength:{value:2, message:"last name length must be at least 2 characters long"},
                  required: "last name must be require"})}
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(e)=> setLsatName(e.target.value)}
                  error={Boolean(errors.lastName)}
                  helperText={errors.lastName?.message}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  {...register('phone',{ pattern:{value:/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, message:"phone must be a valid phone number"},
                  required: "phone must be require"})}
                  required
                  fullWidth
                  id="phone"
                  label="Phone"
                  name="phone"
                  autoComplete="Phone"
                  onChange={(e)=> setPhone(e.target.value)}
                  error={Boolean(errors.phone)}
                  helperText={errors.phone?.message}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  {...register('email',{ pattern:{value:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message:"user mail must be a valid mail"},
                  required: "email must be require"})}
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  onChange={(e)=> setEmail(e.target.value)}
                  error={Boolean(errors.email)}
                  helperText={errors.email?.message}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
///^(?=(.*?[0-9]){4})(?=.*[a-z])(?=.*[-\#\$\.\%\&\@\!\+\=\<\>\*])(?=.*[A-Z])[0-9a-zA-Z]{1}$/
                  {...register('password',{ pattern:{value:/(?=(.*?[0-9]){4})/,
                  message: "user password must be at least 8 characters long and contain an upperCase letter, lowerCase, min 4 numbers and one of the following characters !@#$%^&*"},
                  required: "password must be require"})}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e)=> setPassword(e.target.value)}
                  error={Boolean(errors.password)}
                  helperText={errors.password?.message}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  autoComplete="image-url"
                  name="imageUrl"
                  fullWidth
                  id="imageUrl"
                  label="Image Url"
                  onChange={(e)=> setImageUrl(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  name="imageAlt"
                  label="Image Alt"
                  type="imageAlt"
                  id="imageAlt"
                  autoComplete="image-Alt"
                  onChange={(e)=> setimageAlt(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="state"
                  label="State"
                  name="state"
                  autoComplete="state"
                  onChange={(e)=> setState(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  {...register('country',{ minLength:{value:2, message:"country length must be at least 2 characters long"},
                  required: "country must be require"})}
                  required
                  fullWidth
                  name="country"
                  label="Country"
                  type="country"
                  id="country"
                  autoComplete="country"
                  onChange={(e)=> setCountry(e.target.value)}
                  error={Boolean(errors.country)}
                  helperText={errors.country?.message}
                />
              </Grid>
               
              <Grid item xs={6}>
                <TextField
                  {...register('street',{ minLength:{value:2, message:"street length must be at least 2 characters long"},
                  required: "street must be require"})}
                  fullWidth
                  required
                  name="street"
                  label="Street"
                  type="street"
                  id="street"
                  autoComplete="street"
                  onChange={(e)=> setStreet(e.target.value)}
                  error={Boolean(errors.street)}
                  helperText={errors.street?.message}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  {...register('city',{ minLength:{value:2, message:"city length must be at least 2 characters long"},
                  required: "city must be require"})}
                  required
                  fullWidth
                  id="city"
                  label="City"
                  name="city"
                  autoComplete="city"
                  onChange={(e)=> setCity(e.target.value)}
                  error={Boolean(errors.city)}
                  helperText={errors.city?.message}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  {...register('houseNumber',{ required: "house number must be require"})}
                  required
                  fullWidth
                  name="houseNumber"
                  label="House Number"
                  type="houseNumber"
                  id="houseNumber"
                  autoComplete="house-Number"
                  onChange={(e)=> setHouseNumber(e.target.value)}
                  error={Boolean(errors.houseNumber)}
                  helperText={errors.houseNumber?.message}
                />
              </Grid>
             
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  name="zip"
                  label="Zip"
                  type="zip"
                  id="zip"
                  autoComplete="zip"
                  onChange={(e)=> setZip(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="Signup as business"
                  onChange={handleCheckChange}
                  
                />

            </Grid>
              <Grid item xs={6}>
                  <Button
                     fullWidth
                     type="submit"
                     variant="outlined"
                    color="error"
                     >
                     CANCEL
                    </Button>
              </Grid>
              <Grid item xs={6}>
                  <Button
                    fullWidth
                     type="submit"
                     variant="outlined"
                     >
                     <AutorenewIcon></AutorenewIcon>
                    </Button>
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
                    <Grid item>
                <Link href="login" variant="body2">
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
            </Grid>
            </form></FormLayout>
          
  );
}