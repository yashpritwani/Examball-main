import React from 'react';
import FeaturedCourseContainer from '../courses/featuredCourseContainer'
import NavBarTop from '../../core/Menu'
import Footer from '../shared/Footer';
import NavBarBottom from '../shared/NavBarBottom';
import TestList from '../../user/testList'
import axios from 'axios'
import {API} from '../../backend'
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';
import {useParams} from 'react-router-dom'

  
export default function SpecficCourse(props) {
    const courseParam = props.match.params.course
    const [course,setCourse] = React.useState([])
    const [test,setTest] = React.useState([])
    const [loading,setLoading] = React.useState(true)
    const  {courseId} = useParams()
    const skeletonData = [{},{},{},{}]
    React.useEffect(() => {
        axios.get(`${API}/getCourseInfo/${courseId}`)
        .then(results => setCourse(results.data.course))
      axios.get(`${API}/tests/${courseId}`)
        .then(results => {
            setTest(results.data.tests)
            setLoading(false)
        })
    }, []); // <-- Have to pass in [] here!
    return (
        <React.Fragment>
            <NavBarTop />
            <FeaturedCourseContainer courseData={course}/>
            {
            loading ? ( 
                <Grid container spacing={3} >
                   
                             <React.Fragment>
                             <Grid item xs={2} sm={2} md={2} lg={2}></Grid>
                            <Grid item xs={8} sm={8} md={8} lg={8} >
                           
                            <Skeleton variant="text"width={"100%"} height={60} />
                          
                            <Skeleton variant="rect" width={"50%"} height={60} />
                            <Skeleton variant="text"width={"100%"} height={60} />

                            </Grid>
                         <Grid item xs={2} sm={2} md={2} lg={2}></Grid>
                         </React.Fragment>
                         )
                     
                   
      </Grid>
                      
                      
                    
            ) :(<React.Fragment>
                {test.length==0 ? (<React.Fragment>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                   
                </React.Fragment>):(
                    <TestList courseData={course} testData={test}/>
                )}
                 
            </React.Fragment>)
}
            <NavBarBottom />
            <Footer />
        </React.Fragment>
    )
}