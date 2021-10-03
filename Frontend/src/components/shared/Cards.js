import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import { Link, withRouter,Redirect } from "react-router-dom";


const useStyles = makeStyles((theme) =>({
  root: {
    maxWidth: 345
  },
  media: {
    height: 140,
  },
  cardRoot:{
    display: 'flex',
    flexDirection: 'column',
    '& > * + *': {
      marginTop: theme.spacing(1),
  }
},
button: {
  [theme.breakpoints.down('sm')]: {
    margin: theme.spacing(0.5),
    width:'100%'
  },
  [theme.breakpoints.between('sm','md')]: {
    marginRight: theme.spacing(2),
  flexGrow: 0.5,
  width:'100%'
  
  
  },
  [theme.breakpoints.between('md','lg')]: {
    marginRight: theme.spacing(2),
  flexGrow: 0.5,
  width:'100%'

 },
  [theme.breakpoints.up('lg')]: {
    marginRight: theme.spacing(2),
    flexGrow: 0.5,
    width:'100%'
   
 }
  
},
}));

export default function CourseCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root} key={props.courseId}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://source.unsplash.com/random"
          title="Card Image"
        />
        <CardContent>
        {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
          Time
        </Typography> */}
          <Typography gutterBottom variant="h5" component="h2">
            {props.courseName}
          </Typography>
          <Typography variant="body2"  component="p">
            {props.courseDesc}
          </Typography>
          <br />
          <Grid container >
          <Grid
  container
  direction="row"
  justify="space-between"
  alignItems="center"
>
{/* <div className={classes.RatingRoot}>
      <Rating name="size-medium"  defaultValue={props.courseRating} readOnly />
    </div> */}
</Grid>
<Grid
  container
  direction="row"
  justify="space-between"
  alignItems="center"
>
<Typography gutterBottom variant="h5" component="h2">
          Rs. {props.coursePrice}
          </Typography>
</Grid>
          </Grid>
        
          
        </CardContent>
      
      </CardActionArea>
      <CardActions>
<Grid container>
{/* <Link to={`courses/${props.courseId}`} style={{textDecoration:'none'}}>
                    <Button variant="outlined" fullWidth size='large' color="primary"  >View Details</Button></Link> */}

<Button variant="contained" component={Link} fullWidth to={`courses/${props.courseId}`} color="primary" style={{textDecoration:'none',color:'white'}} >View Details</Button>
</Grid>

      </CardActions>
    </Card>
  );
}