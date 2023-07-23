import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Avatar } from '@mui/material';
import FormLayout from '../../components/FormLayout';
import AddIcon from '@mui/icons-material/Add';
import { SubmitHandler, useForm } from 'react-hook-form';
import { addCards } from '../../services/ApiServices';

export interface Card {
    _id?: string;
    title?: string;
    subtitle?:string;
    description: string;
    phone?: string;
    email?:string;
    web?: string;
    imageUrl?: string;
    imageAlt?: string;
    state?: string;
    country?: string;
    city?: string;
    street?: string;
    houseNumber?: number | string;
    zip?: string;
    
}

function AddCard() {
    const { register, handleSubmit, formState: { errors }, formState } = useForm<Card>();
    const [title, setTitle] = useState('');
    const [subtitle, setSubTitle] = useState('');
    const [description, setDescription] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [web, setWeb] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [imageAlt, setimageAlt] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [zip, setZip] = useState('');
    const navigate = useNavigate();
    const onSubmit: SubmitHandler<Card> = (data) => addCard();



     function addCard () {
     addCards({
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
              city,
              street,
              houseNumber,
              zip
        }).then((card) => {
            console.log(card);
            
                navigate('/cards')
            })
    }
    return (    <FormLayout>  <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="avatar-container">
            <Avatar   sx={{ m: 1, bgcolor: 'primary.main' }}>
            <AddIcon />
          </Avatar>
          </div>
          <Typography align="center" component="h1" variant="h5" >
            CREATE CARD
          </Typography>
            <Grid item container direction="column" className='mt-4'>
              <Grid item container xs={12} spacing={2} >
              <Grid item xs={6}>
                <TextField
                   {...register('title',{ minLength:{value:2, message:"first name length must be at least 2 characters long"},
                  required: "title must be require"})}
                  autoComplete="Title"
                  name="title"
                  required
                  fullWidth
                  id="title"
                  label="title"
                  onChange={(e)=> setTitle(e.target.value)}
                  autoFocus
                  error={Boolean(errors.title)}
                  helperText={errors.title?.message}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                   {...register('subtitle',{ minLength:{value:2, message:"subtitle length must be at least 2 characters long"},
                  required: "subtitle must be require"})}
                  fullWidth
                  required
                  id="subTitle"
                  label="subTitle"
                  name="subtitle"
                  autoComplete="SubTitle"
                  onChange={(e)=> setSubTitle(e.target.value)}
                  error={Boolean(errors.subtitle)}
                  helperText={errors.subtitle?.message}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  {...register('description',{ minLength:{value:2, message:"description length must be at least 2 characters long"},
                  required: "description must be require"})}
                  required
                  fullWidth
                  id="description"
                  label="description"
                  name="description"
                  autoComplete="Description"
                  onChange={(e)=> setDescription(e.target.value)}
                  error={Boolean(errors.description)}
                  helperText={errors.description?.message}
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
              <Grid item md={6}>
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
                  fullWidth
                  name="web"
                  label="web"
                  type="web"
                  id="web"
                  autoComplete="Website"
                  onChange={(e)=> setWeb(e.target.value)}
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
                  required
                  fullWidth
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
            </Grid>
            </Grid>
            </form> </FormLayout>);
}

export default AddCard;