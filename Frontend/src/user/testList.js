import React from 'react';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { Link,Redirect,useParams } from "react-router-dom";
import {API} from '../backend'
import {isAutheticated } from "../auth/helper";
import axios from 'axios'
const user  = isAutheticated();
const performRedirect = () => {
    
      if (user && user.role === 'admin') {
        return <Redirect to="/admin/dashboard" />;
      } else if (user && user.role === 'Student'){
        return <Redirect to="/user/dashboard" />;
      }else{
        return <Redirect to="/signin" />;
      }
    
  };
export default function TestList(props){
  const [userDetails,setUserDetails] = React.useState({});
  const [enrolled,setEnrolled] = React.useState(false)
  const {courseId} = useParams()
React.useEffect( () => {
  const apiUrl = `${API}/fetchUserDetails/${user.userId}`
  axios.get(apiUrl,
  {
    headers: {
    "Authorization": `Bearer ${user.token}` ,
    "Role":"Student"
  }
    
})
    .then(results => {
      setUserDetails(results.data.user)
      if(results.data.user.enrolledCourses.includes(courseId)){
        setEnrolled(true)
      }
    })

}, []);

  const testList = props.testData
  // console.log("🚀 ~ file: testList.js ~ line 27 ~ TestList ~ testList", testList)
    return (
        <React.Fragment>
            <Container fluid maxWidth="md">
            <br></br>
          {/* <Typography component="h3" variant="h4" align="center" color="textPrimary" gutterBottom>
          Explore Our Test
        </Typography> */}
        <br></br>
        {
            testList.map(test=>{
               
               return (
                   <React.Fragment>
                <Paper elevation={3} >
                <Box display="flex" p={1} >
            <Box p={1} flexGrow={1} >
              {test.name}
              <Box display="flex"  >
              <Box p={1} >
                  Questions: {test.question.length}
              </Box>
              <Box p={1} >
                  Time: 40 Mins
              </Box>
              </Box>
            </Box>
            <Box p={1} >
            
            {/* <Button color="primary" >Not Completed</Button> */}

            </Box>
            <Box p={1} >
                {/* {test.type==0 ?
                 (
                    <Link to={`/user/test/${test._id}`} style={{textDecoration:'none'}}><Button  variant="contained" color="secondary" style={
                        {
                            textAlign:'center',
                            margin:'2px'
                        }} >Free</Button></Link>
                 
                 ) 
                 : (
                    <Link to={`/user/test/${test._id}`} style={{textDecoration:'none'}}><Button variant="contained" color="primary" style={
                        {
                            textAlign:'center',
                            margin:'2px'
                        }} >Access Now</Button></Link>
                 )
                 }
             */}
{enrolled ?
                 (
                  <Link to={`/user/test/${test._id}`} style={{textDecoration:'none'}}><Button variant="contained" color="primary" style={
                    {
                        textAlign:'center',
                        margin:'2px'
                    }} >Access Now</Button></Link>
                 
                 ) 
                 : (
                  <Button variant="contained" color="primary" disabled style={
                    {
                        textAlign:'center',
                        margin:'2px'
                    }} >Access Now</Button>
                 )
                 }
            
            </Box>
          </Box>
               
                
                </Paper>
                
                <br></br>
                </React.Fragment>
               )
            })
        }
           
            
            </Container>
           
        </React.Fragment>
    )
}