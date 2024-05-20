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
import { ChangeEvent, useEffect, useState } from 'react';
import { Avatar } from '@mui/material';
import FormLayout from '../../components/FormLayout';
import AddIcon from '@mui/icons-material/Add';
import { SubmitHandler, useForm } from 'react-hook-form';
import { addCards, getCards } from '../../services/CardServices';
import { Card } from '../../components/RecipeReviewCard';
import { useAuth } from '../../AppContext';
import { useCardsContext } from '../../CardContext';
import { toast } from 'react-toastify';


function AddCard() {
    const {onAdd} = useCardsContext(); 
    const { register, handleSubmit, formState: { errors }, formState } = useForm<Card>();
    const [title, setTitle] = useState('');
    const [subtitle, setSubTitle] = useState('');
    const [description, setDescription] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [web, setWeb] = useState('');
    const [imageUrl, setImageUrl] = useState("");
    //const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [imageAlt, setimageAlt] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [zip, setZip] = useState('');
    const {user} = useAuth();
    const [userId, setUserId] =useState(user?._id)
    const formData = new FormData();
    const navigate = useNavigate();
    const onSubmit: SubmitHandler<Card> = (data) => addCard();
    const cancelFunction = () => {
     navigate('/myCards');
    }
    const handleFileChange =(e : any)=>{
if(e.target.files.length){
    setImageUrl(e.target.files[0])
}
}

     function addCard () {
    formData.append("image", imageUrl)

    formData.append("title", title)
    formData.append("subtitle", subtitle)
    formData.append("description", description)
    formData.append("phone", phone)
    formData.append("email", email)
    formData.append("web", web)
    formData.append("imageAlt", imageAlt)
    formData.append("state", state)
    formData.append("country", country)
    formData.append("city", city)
    formData.append("street", street)
    formData.append("houseNumber", houseNumber)
    formData.append("zip", zip) 
    if(userId)
      formData.append("userId", userId)
     addCards(formData).then((card) => {
                
                console.log(card);
if(!card)
{
                onAdd();
                toast.success("Card has been added");
                navigate('/myCards');
}
else{ 
}               
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
                   {...register('title',{ minLength:{value:2, message:"title length must be at least 2 characters long"}, maxLength:{value:256, message:"title length must be maxium 256 characters long"},
                  required: "title must be require"})}
                  InputProps={{ inputProps: { min:2, max:256 } }}
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
                   {...register('subtitle',{ minLength:{value:2, message:"subtitle length must be at least 2 characters long"}, maxLength:{value:256, message:"subtitle length must be maxium 256 characters long"},
                  required: "subtitle must be require"})}
                  InputProps={{ inputProps: { min:2, max:256 } }}
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
                  {...register('description',{ minLength:{value:2, message:"description length must be at least 2 characters long"},maxLength: {value:1024, message:"description length must be maxium 1024 characters long"},
                  required: "description must be require"})}
                  required
                  InputProps={{ inputProps: { min:2, max:1024 } }}
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
                  //InputProps={{ inputProps: { min:6, max:256 } }}
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
                  {...register('email',{ pattern:{value:/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/, message:"user mail must be a valid mail"},
                  required: "email must be require"})}
                  required
                  InputProps={{ inputProps: { min:6, max:256 } }}
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
                  {...register('web',{ minLength:{value:2, message:"web length must be at least 2 characters long"},maxLength:{value:1024, message:"web length must be maxium 1024 long"}})}
                  fullWidth
                  name="web"
                  InputProps={{ inputProps: { min:2, max:1024 } }}
                  label="web"
                  type="web"
                  id="web"
                  autoComplete="Website"
                  onChange={(e)=> setWeb(e.target.value)}
                   error={Boolean(errors.web)}
                  helperText={errors.web?.message}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  autoComplete="image-url"
                  name="imageUrl"
                  fullWidth
                  id="imageUrl"
                  onChange={handleFileChange}
                  type='file'
                  inputProps={{accept:'image/*'}}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                   {...register('imageAlt',{ minLength:{value:6, message:"Image alt length must be at least 6 characters long"},maxLength:{value:1024, message:"Image Alt length must be maxium 1024 long"}})}
                  fullWidth
                  name="imageAlt"
                  label="Image Alt"
                  type="imageAlt"
                  id="imageAlt"
                  autoComplete="image-Alt"
                  onChange={(e)=> setimageAlt(e.target.value)}
                  InputProps={{ inputProps: { min:6, max:1024 } }}
                   error={Boolean(errors.imageAlt)}
                  helperText={errors.imageAlt?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                   {...register('state',{ minLength:{value:2, message:"state length must be at least 2 characters long"},maxLength:{value:256, message:"state length must be maxium 256 long"}})}
                  fullWidth
                  id="state"
                  label="State"
                  name="state"
                  autoComplete="state"
                  onChange={(e)=> setState(e.target.value)}
                  InputProps={{ inputProps: { min:2, max:256 } }}
                   error={Boolean(errors.state)}
                  helperText={errors.state?.message}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  {...register('country',{ minLength:{value:2, message:"country length must be at least 2 characters long"},maxLength:{value:256, message:"country length must be maxium 256 long"},
                  required: "country must be require"})}
                  required
                  fullWidth
                  name="country"
                  label="Country"
                  InputProps={{ inputProps: { min:2, max:256 } }}
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
                  {...register('street',{ minLength:{value:2, message:"street length must be at least 2 characters long"},maxLength:{value:256, message:"street length must be maxium 256 long"},
                  required: "street must be require"})}
                  required
                  InputProps={{ inputProps: { min:2, max:256 } }}
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
                  {...register('city',{ minLength:{value:2, message:"city length must be at least 2 characters long"},maxLength:{value:256, message:"city length must be maxium 256 long"},
                  required: "city must be require"})}
                  required
                  fullWidth
                  id="city"
                  label="City"
                  name="city"
                  InputProps={{ inputProps: { min:2, max:256 } }}
                  autoComplete="city"
                  onChange={(e)=> setCity(e.target.value)}
                  error={Boolean(errors.city)}
                  helperText={errors.city?.message}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  {...register('houseNumber',{ pattern:{value:/[0-9]{1,3}/, message:"house number must be a number with max 3 digits"},
                  required: "house number must be require"})}
                  fullWidth
                  InputProps={{ inputProps: { max: 3 } }}
                  name="houseNumber"
                  label="House Number"
                  type="houseNumber"
                  id="houseNumber"
                  autoComplete="house-Number"
                  onChange={(e)=> setHouseNumber(e.target.value)}
                  error={Boolean(errors.houseNumber)}
                 //  error={ houseNumber.length===0}}
                  helperText={errors.houseNumber?.message}
                />
              </Grid>
             
              <Grid item xs={6}>
                <TextField
                  {...register('zip',{ minLength:{value:5, message:"city length must be at least 5 characters long"},maxLength:{value:50, message:"zip length must be maxium 50 long"}})}
                  fullWidth
                  name="zip"
                  label="Zip"
                  type="zip"
                  id="zip"
                  autoComplete="zip"
                  onChange={(e)=> setZip(e.target.value)}
                  InputProps={{ inputProps: { min:5, max:50 } }}
                   error={Boolean(errors.zip)}
                  helperText={errors.zip?.message}
                />
              </Grid>
              <Grid item xs={12}>
                  <Button
                     fullWidth
                     variant="outlined"
                    color="error"
                    onClick={()=>cancelFunction()}
                     >
                    
                     CANCEL
                    </Button>
              </Grid>
              {/* <Grid item xs={6}>
                  <Button
                    fullWidth
                    
                     variant="outlined"
                     >
                     <AutorenewIcon></AutorenewIcon>
                    </Button>
              </Grid> */}
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