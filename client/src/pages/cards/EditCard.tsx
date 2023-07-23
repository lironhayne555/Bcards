import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Avatar } from '@mui/material';
import FormLayout from '../../components/FormLayout';
function EditCard() {

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
    return (   <FormLayout>  <form>
              <div className="avatar-container">
            <Avatar   sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          </div>
          <Typography align="center" component="h1" variant="h5" >
            Edit CARD
          </Typography>
            <Grid container direction="column" className='mt-4'>
              <Grid container xs={12} spacing={2} >
              <Grid item xs={6}>
                <TextField
                  autoComplete="Title"
                  name="title"
                  required
                  fullWidth
                  id="title"
                  label="title"
                  onChange={(e)=> setTitle(e.target.value)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="subTitle"
                  label="subTitle"
                  name="subTitle"
                  autoComplete="SubTitle"
                  onChange={(e)=> setSubTitle(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="description"
                  label="description"
                  name="description"
                  autoComplete="Description"
                  onChange={(e)=> setDescription(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="Phone"
                  name="phone"
                  autoComplete="Phone"
                  onChange={(e)=> setPhone(e.target.value)}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  onChange={(e)=> setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
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
                  required
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
                  required
                  fullWidth
                  name="country"
                  label="Country"
                  type="country"
                  id="country"
                  autoComplete="country"
                  onChange={(e)=> setCountry(e.target.value)}
                />
              </Grid>
               
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="street"
                  label="Street"
                  type="street"
                  id="street"
                  autoComplete="street"
                  onChange={(e)=> setStreet(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="city"
                  label="City"
                  name="city"
                  autoComplete="city"
                  onChange={(e)=> setCity(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="houseNumber"
                  label="House Number"
                  type="houseNumber"
                  id="houseNumber"
                  autoComplete="house-Number"
                  onChange={(e)=> setHouseNumber(e.target.value)}
                />
              </Grid>
             
              <Grid item xs={6}>
                <TextField
                  required
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

export default EditCard;