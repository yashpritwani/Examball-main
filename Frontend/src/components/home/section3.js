import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import '../../assets/css/ArticlesHome.css'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link,Redirect } from "react-router-dom";
import axios from 'axios'
import {API} from '../../backend'
import CourseCard from '../shared/Cards'
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        boxShadow: 'none',
        background: 'transparent',
        [theme.breakpoints.down('sm')]: {
            textAlign: "center",
            justifyContent:'center'
          },
          [theme.breakpoints.down('xs')]: {
            textAlign: "center",
            justifyContent:'center'
          },
          [theme.breakpoints.up('md')]: {
            textAlign: "center",
          }
    },
    button:{
        justifyContent:'center'
    },
    
}));
const performRedirect = () => {
  
      return <Redirect to="/login" />;
  
};




export default function HomeTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [courses,setCourses] = React.useState([])
    const [loading,setLoading] = React.useState(true)
    const skeletonData = [{},{},{},{}]

    React.useEffect(() => {
      axios.get(`${API}/courses`)
        .then(results => {
            setCourses(results.data.courses)
            setLoading(false)
        })
    }, []); // <-- Have to pass in [] here!

    return (
        <div className={classes.root}>
          <Container fixed >
       {/* <Typography component="h4" variant="h4" style={
                                            {
                                                textAlign:'center',
                                                margin:'2px'
                                            }
                                        }>
                                         <span style={
                                            {
                                                color:"#208A2B"
                                            }
                                        }>Explore Our Courses</span>
          </Typography> */}
          <br></br>
          <Typography component="h2" variant="h3" align="center" gutterBottom>
          Explore Our Courses
        </Typography>
        {/* <Typography component="h3" variant="h4" align="center" gutterBottom>
          <span style={
            {
                color:"white"
            }
        }>Explore Our Courses</span>
        </Typography> */}
       
        {
            loading ? ( 
                <Grid container spacing={3} >
                   {  skeletonData.map(obj=>{
                         return (
                            <Grid item xs={12} sm={6} md={3} lg={3} >
                            <Skeleton variant="circle" width={60} height={60} />
                            <Skeleton variant="text"width={290} height={60} />
                            <Skeleton variant="rect" width={290} height={118} />
                            <Skeleton variant="rect" width={290} height={118} />

                            </Grid>
                         )
                     })}
                   
      </Grid>
                      
                      
                    
            ) :(<React.Fragment>
                   <Grid container  spacing={3} >
      {courses.map(course=>{
        return (
          <Grid item xs={12} sm={6} md={3} lg={3} >
     
                            <CourseCard courseName={course.name} coursePrice={course.price} courseDesc={course.description} courseRating={4} courseId={course._id} />

 
            </Grid>
        );
    }
      
      )}
  </Grid>
 
  <Box textAlign='center'>
  <Link to="all-courses" style={{textDecoration:'none'}}><Button variant="contained" color="secondary" style={
                                            {
                                                textAlign:'center',
                                                margin:'2px',
                                                color:'#0d1117'
                                            }} >Browse More</Button></Link>
</Box>
            </React.Fragment>)
        }
   
 
 
<br></br>
  </Container>
        </div>
    );
}
