import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Footer from './shared/Footer';
import NavBarTop from '../core/Menu'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CallRoundedIcon from '@material-ui/icons/CallRounded';
import QueryBuilderRoundedIcon from '@material-ui/icons/QueryBuilderRounded';
import Typography from '@material-ui/core/Typography';
import NavBarBottom from './shared/NavBarBottom'
import {API,IMAGE_BASE_URL} from '../backend'
import { signout,isAutheticated } from "../auth/helper/index";
import axios from 'axios'


const user = isAutheticated();

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: theme.spacing(-2)

    },
    paper: {
        padding: theme.spacing(2),
        
        textAlign: 'left'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
        textAlign:'center'
      },
}));


export default function ContactUs() {
    const classes = useStyles();
    const primaryColor = "#208A2B"
    const [name,setName] = React.useState('')
    const [email,setEmail] = React.useState('')
    const [mobile,setMobile] = React.useState('')
    const [country,setCountry] = React.useState('')
    const [address,setAddress] = React.useState('')
    const [body,setBody] = React.useState('')

    function onSubmit(e){
        e.preventDefault()
        const data = {
            name:name,
            email:email,
            mobile:mobile,
            country:country,
            body:body
        }
        
        const apiUrl = `${API}/sendMailFromContactUs`
        axios.post(apiUrl,{data},
        {
          headers: {
          "Authorization": `Bearer ${user.token}` ,
          "Role":"Student"
        }
          
      })
          .then(response =>{
            setName('')
            setEmail('')
            setBody('')
            setMobile('')
            setCountry('')
            //  console.log(response)
             return ''
          })
          .catch(err=>console.log(err))

         
    }
    return (
        <React.Fragment>
            <NavBarTop />
            <div className={
                classes.root
            }>
                <Container fixed>
                    <Grid container
                        spacing={3}>
                        <Grid item
                            xs={false}
                            lg={1}
                        />
                        <Grid item
                           md={12}
                           sm={12}
                           xs={12}
                            lg={5}>


                            <Grid container>
                                <Grid item
                                    xs={10}>
                                    <Paper className={
                                        classes.paper
                                    }
                                        elevation={0}>
                                               <Typography component="h2" variant="h4"><b>
                                               GET IN <span style={
                                            {
                                                color:primaryColor
                                            }
                                        }>TOUCH</span></b>
          </Typography>

                                    </Paper>
                                    <Paper className={
                                        classes.paper
                                    }
                                        elevation={0}>
                                            
                                            <Typography component="h2" variant="h6">

                                            Please press the button below to contact us directly and we will get back to you within a day or else you can drop us an email.
                                            </Typography>

                                            
                                            </Paper>
                                    <Paper className={
                                        classes.paper
                                    }
                                        elevation={0}>
                                             <Typography component="h2" variant="h6">
                                            <span style={
                                            {
                                                color:primaryColor
                                            }
                                        }>Sales Queries</span>
                                        : sales@examball
                                            <br />
                                            <span style={
                                            {
                                                color:primaryColor
                                            }
                                        }>HR Queries</span>
                                            : hello@examball
                                            </Typography>

                                        </Paper>
                                
                                        <Paper className={
                                        classes.paper
                                    }
                                        elevation={0}>
                                        <Typography component="h2" variant="h6">

                                            <Grid container  >
                                                <Grid item xs={1.5}>
                                                <LocationOnIcon fontSize="large" color="primary"/>
                                                </Grid>
                                                <Grid item xs={10}>
                                                On Earth
                                                </Grid>
                                            </Grid>
                                            <Grid container  >
                                                <Grid item xs={1.5}>
                                <CallRoundedIcon fontSize="large" color="primary"/>
                                                </Grid>
                                                <Grid item xs={10}>
                                                Coming Soon
                                                </Grid>
                                            </Grid>
                                            <Grid container  >
                                                <Grid item xs={1.5}>
                                                <QueryBuilderRoundedIcon fontSize="large" color="primary"/>
                                                </Grid>
                                                <Grid item xs={10}>
                                                Available Any Time
                                                </Grid>
                                            </Grid>
                                            </Typography >

                                        </Paper>

                                </Grid>

                            </Grid>

                        </Grid>

                        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={0} square>
        <div className={classes.paper}>
          <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="fullName"
                onChange={(e)=>setName(e.target.value)}
                label="Full Name"
                name="fullName"
                value={name}
                autoComplete="fullname"
                
              />
               <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="mobileNumber"
                onChange={(e)=>setMobile(e.target.value)}
                label="Mobile Number"
                name="mobileNumber"
                autoComplete="mobileNumber"
                value={mobile}
              />
               <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="country"
                onChange={(e)=>setCountry(e.target.value)}
                label="Country"
                name="country"
                autoComplete="country"
                value ={country}
              />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              onChange={(e)=>setEmail(e.target.value)}
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              onChange={(e)=>setBody(e.target.value)}
            value={body}
              fullWidth
              name="textareaContactUs"
              id="textareaContactUs"
  label="Message"
  multiline
              rows={3}
  rowsMax={10}
            />
            {
                /* 
                <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
                */
            }
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={(e)=>onSubmit(e)}
              className={classes.submit}
            >
              Send Your Query
            </Button>
          </form>
        </div>
      </Grid>
                        <Grid item
                            xs={false}
                            lg={1}
                        />

                        
                    </Grid>

                </Container>
            </div>
            <Footer />
            <NavBarBottom />
        </React.Fragment>
    );
}
