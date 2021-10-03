import React,{useCallback} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { Link,useParams } from "react-router-dom";
import Divider from '@material-ui/core/Divider';
import {isAutheticated } from "../../auth/helper/index";
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import clsx from 'clsx';
import axios from 'axios'
import {API} from '../../backend'
import history from "../../history";
import CircularProgress from '@material-ui/core/CircularProgress';
import CountdownTimer from "react-component-countdown-timer";
import { Beforeunload } from 'react-beforeunload';

import timerCss from "./timer.css";
const user = isAutheticated();



const currentTab = (history, path) => {
    if (history.location.pathname === path) {
      return { color: "black" };
    } else {
      return { color: "#FFFFFF" };
    }
  };
  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
 

const drawerWidth = 240;
  
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexGrow: 1,
        },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: 'none',
    },
    title: {
      flexGrow: 1,
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    table: {
      minWidth: 300,
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(1),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
      margin: theme.spacing(2),
    },
    fixedHeight: {
      height: 240,
    },
    examHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 8px',
        ...theme.mixins.toolbar,
      },
      paperExam: {
        padding: theme.spacing(0),
        margin: theme.spacing(0.5),
      },
      backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
      },
  }));

  class SimpleCountdownTimer extends React.Component {
    endFunction(){

    }
    render() {
      return (
        <CountdownTimer count={this.props.test*60} border noPoints showTitle size={12} hideDay size={30} color="#fff" backgroundColor="#208A2B" onEnd={this.props.submitResult}/>

      );
    }
  }
export default function ExamScreen(props){
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [questionsArray,setQuestionsArray]= React.useState([])
    const [test,setTest] = React.useState([])
    const [loading ,setLoading] = React.useState(true)
    const [testObj,setTestObj] = React.useState({})
    const [testDetail,setTestDetail] = React.useState({})
    window.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
    window.addEventListener('onkeydown', function(e) {
      if(e.keyCode == 123) {
        e.preventDefault();

      return false;
      }
      if(e.ctrlKey && e.keyCode == 'E'.charCodeAt(0)){
        e.preventDefault();

      return false;
      }
      if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)){
        e.preventDefault();

      return false;
      }
      if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)){
        e.preventDefault();

      return false;
      }
      if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)){
        e.preventDefault();

      return false;
      }
      if(e.ctrlKey && e.keyCode == 'S'.charCodeAt(0)){
        e.preventDefault();

      return false;
      }
      if(e.ctrlKey && e.keyCode == 'H'.charCodeAt(0)){
        e.preventDefault();

      return false;
      }
      if(e.ctrlKey && e.keyCode == 'A'.charCodeAt(0)){
        e.preventDefault();

      return false;
      }
      if(e.ctrlKey && e.keyCode == 'E'.charCodeAt(0)){
              e.preventDefault();

      return false;
      }
      });
      
   
     
   // console.log("🚀 ~ file: ExamScreen.js ~ line 2960 ~ ExamScreen ~ loading", loading)
    const {id }= useParams()
    const testId = id
    const loadingMessage = () => {
      return (
        loading && (
          <CircularProgress />
        )
      );
    };
    React.useEffect(() => {
     // console.log("Hey")
      
      axios.get(`${API}/questions/${testId}`,
      {
        headers: {
        "Authorization": `Bearer ${user.token}` ,
        "Role":"Student"
      }
        
    })
        .then(results => setQuestionsArray(results.data.questions))
        axios.get(`${API}/tests/${testId}`,
      {
        headers: {
        "Authorization": `Bearer ${user.token}` ,
        "Role":"Student"
      }
        
    })
        .then(results => {
          setTest(results.data.tests)
          setLoading(false)
        })
        const apiUrl = `${API}/getTestInfo/${testId}`
        axios.get(apiUrl,
        {
          headers: {
          "Authorization": `Bearer ${user.token}` ,
          "Role":"Student"
        }
          
      })
          .then(results => {
          //  console.log(results.data.test.question.length)
            setTestDetail(results.data.test)
            setLoading(false)

          }).catch(err=>console.log(err))
        setTestObj(JSON.parse(localStorage.getItem('testObj')))

    }, []); // <-- Have to pass in [] here!
    const handleDrawerOpen = () => {
      setOpen(true);
    };
    const handleDrawerClose = () => {
      setOpen(false);
    };
    var localAnsCollection = JSON.parse(localStorage.getItem(`${testId}`))

    
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  
    
    //console.log("🚀 ~ file: ExamScreen.js ~ line 2952 ~ ExamScreen ~ questionsArray", questionsArray)
    return (
      

    <div className={classes.root}>
      {/* <SideBarNavBar /> */}
             <main className={classes.content}>
         {/* <div className={classes.appBarSpacer} />
         {
           //Exam Name
         } */}
         <Paper elevation={2} className={classes.paper}>
         <Typography component="h5" variant="h4" align="center" color="textPrimary" gutterBottom>
          {testDetail.name}
         </Typography>
         </Paper>
         {
           loading ? (
            <div style={{textAlign:"center"}}>
            <CircularProgress />
      
             </div>
          
           ):(
           testDetail!={} && questionsArray.length !=0 && <Quiz questionsArray={questionsArray} classes={classes}  testDetail={testDetail} testId={testId} test={testObj}/>

           )
         }
         
        
          
 
          
      
       </main>
     </div>
  
     )
    
}

class Quiz extends React.Component {
 
  constructor(props){
    

  super(props);
  this.state = {
    current: 0,
    quiz: props.quiz,
    selectedValue: '0',
    revealed: false,
    questionsArray:props.questionsArray,
    testId:props.testId,
    checkedValues: [],
    answersArray:localStorage.getItem(`${props.testId}`)==null?{}:JSON.parse(localStorage.getItem(`${props.testId}`)),
    answersSelectedArray:{},
    test:props.test,
    endButtonState:true,
    testSubmitted:false
  }
  //localStorage.removeItem('testObj')
  const testObj = JSON.parse(localStorage.getItem('testObj'))

  localStorage.setItem(`${this.state.testId}`,JSON.stringify(this.state.answersArray))
  }

  componentDidMount(){
    if(localStorage.getItem('reload')){
      this.submitResult()
    }
  }
 
  
  handleChange = event => {
    // console.log("HandleChange",event.target.value)
      this.setState({ selectedValue: event.target.value });
    };
  
  moveNext = () => {
    // this.clearBacks();
    //console.log("Checked Values",this.state.checkedValues)
      const newItems = JSON.parse(localStorage.getItem(`${this.state.testId}`))
//console.log("Current State->>>>>>>>",this.state.current)
if(this.state.current+1 < this.state.questionsArray.length){
newItems[`${this.state.current+1}`] = this.state.checkedValues;
//console.log("NewItems",newItems)
localStorage.setItem(`${this.state.testId}`,JSON.stringify(newItems))
this.setState({answersArray:newItems})
this.setState({checkedValues:[]})

this.setState({current: this.state.current+1})

}else if(this.state.current+1 == this.state.questionsArray.length){
this.setState({current: this.state.current+1})
//console.log("Current--dsd--fdsd-->",this.state.current)
const temp = {...newItems}
temp[`${this.state.current+1}`] = this.state.checkedValues;
//console.log("NewItems",temp)
localStorage.setItem(`${this.state.testId}`,JSON.stringify(temp))
this.setState({answersArray:temp})
this.setState({checkedValues:[]})
this.setState({current: this.state.questionsArray.length-this.state.current-1})

}

  
   
   // console.log("MoveNext",JSON.parse(localStorage.getItem(`${this.state.testId}`)))
  
  }
  
  movePrevious = () => {
  
    this.setState({current: this.state.current-1})
    
  
  }
  handleQuestionChange(e,x){
    
    this.moveNext()
    // console.log("x")
    const newItems = JSON.parse(localStorage.getItem(`${this.state.testId}`))
// console.log("HandleQueChange1",newItems)
    if(newItems[x+1] ){
      // console.log("HandleQueChange2",newItems[x+1])

      this.setState({checkedValues:newItems[x+1]}, function(){
      //  console.log("HandleQueChange3",this.state.checkedValues)
        newItems[x+1] = this.state.checkedValues;
        // console.log("HandleQueChange4",newItems[x+1])

      })
      

      localStorage.setItem(`${this.state.testId}`,JSON.stringify(newItems))

      this.setState({answersArray:newItems})
       this.setState({current: x})
     

    }else{
      newItems[x+1] = this.state.checkedValues;
      this.setState({answersArray:newItems},function(){
       localStorage.setItem(`${this.state.testId}`,JSON.stringify(newItems))
 
       
      })
      this.setState({current: x})
    }
   

  }
  submitResult = ()=>{
    localStorage.removeItem('reload')
    this.setState({testSubmitted:true})
    const getTestSessionId =   localStorage.getItem('testSessionId')

    const answersMarked = JSON.parse(localStorage.getItem(`${this.state.testId}`))

    //console.log("ues",this.state.testId)
      axios.post(`${API}/checkResult/${this.state.testId}`,{
        userId:user.userId,
        answersMarked:answersMarked
      },{
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Authorization":`Bearer ${user.token}`,
          "Role":"Student"
        }
      })
        .then(result => {
          // console.log(result.data.percentage)
         // console.log("🚀 ~ file: ExamScreen.js ~ line 3158 ~ Quiz ~ getTestSessionId", getTestSessionId)
          localStorage.removeItem('testSessionId')
          const apiUrl = `${API}/endTest/${this.state.testId}`
          if(result.data.resultObj==undefined){
            result.data.resultObj = []
          }
    axios.post(apiUrl,{userId:user.userId,
      testSessionId:getTestSessionId,
      totalScore:result.data.totalScore,
      percentage:result.data.percentage,
      resultObj:result.data.resultObj,
      testEndTime:new Date().toISOString()
    },
    {
      headers: {
      "Authorization": `Bearer ${user.token}` ,
      "Role":"Student"
    }
      
  })
      .then(results => {
        //console.log("--------->",results.data)
        if(results.data.endTest){

         history.push( `/user/test/${this.state.testId}/exam/session/${getTestSessionId}/result`);

        }else{
          //We are submitting the data
        }
      }).catch(err=>console.log(err))
        })
        .catch(err=>console.log(err))

        localStorage.removeItem(`${this.state.testId}`)
      
  }
  handleCheck(e,x,type) {
  //  console.log("HandleCheckX",x)
  if(type=="Radio"){
    this.setState({
      checkedValues: [x]})
      const newItemsOne = {...this.state.answersSelectedArray};
      newItemsOne[`${x}`] = this.state.checkedValues;
     this.setState({answersSelectedArray:newItemsOne})
    
  }else{
    this.setState(state => ({
      checkedValues: state.checkedValues.includes(x)
          ? state.checkedValues.filter(c => c !== x)
          : [...state.checkedValues, x]
      }));
      const newItemsOne = {...this.state.answersSelectedArray};
      newItemsOne[`${x}`] = this.state.checkedValues;
     this.setState({answersSelectedArray:newItemsOne})
    
  }
    

}
  clearBacks = () =>{
    var question = this.state.questionsArray[this.state.current]
    for(var i = 0; i < question.Options.length; i++){
        this.refs[i.toString()].style.background = "white";
    }
  }
  
  // revealCorrect = () => {
  // //clear backgrounds
  
  // var question = this.state.questionsArray[this.state.current]
  //   var answer = question['Correct Answer'][0];
  //   this.clearBacks()
  //   if(this.state.selectedValue === answer){
  //   this.refs[answer].style.background = "lightgreen";
  //   }else{
  // this.refs[answer].style.background = "lightgreen";
  // this.refs[this.state.selectedValue].style.background = "lightcoral";
  //   }
  //   this.setState({revealed: true})
  // }
    render(){
      var question = this.state.questionsArray[this.state.current];
      //console.log("🚀 ~ file: ExamScreen.js ~ line 3135 ~ Quiz ~ render ~ question", question)
      var curQuestion = this.state.current + 1;
      var size = this.state.questionsArray.length;
      // var moveRight = this.state.current+1 < this.state.questionsArray.length;
      var moveRight = true;

      var moveLeft = this.state.current == 0;
      this.state.answersArray[curQuestion] = []
     //console.log("Token",user.token)
     

   
    return (
      <Beforeunload onBeforeunload={(event) => {
        event.preventDefault()
        localStorage.setItem('reload',true)
        }}>
          {this.state.testSubmitted ? (
            <Box textAlign="center">
              <br />
              <br />
              <br />
              <br />
          <CircularProgress size={100} />
          </Box>
          ):(
      <React.Fragment>
      
         
      <Paper elevation={0} className={this.props.classes.paper}>
      {
        //Exam Header
      }
      {/* <Paper elevation={1} className={classes.paperExam}>
      {//Exam Header Will Come
      }
      </Paper> */}
      {
        //Exam Question
      }
      <Paper elevation={1} className={this.props.classes.paperExam}>
      <Grid container >
      {
        //Exam Question Part
      }
      <Grid item xs={12} sm={8}>
      <Paper className={this.props.classes.paper} elevation={1}>
        {/* {
        // questionsArray.map((question)=>{
        //  return quiz()

        // })
        <Quiz questionsArray={questionsArray} classes={classes} testId={testId}/>
        } */}
             <Box display="flex" p={1} >
          <Box p={1} flexGrow={1} >
            <Box display="flex"  >
         
            <Box p={1} >
                Questions: {curQuestion} / {size}
            </Box>
            {/* <Box p={1} >
                Time: 40 Mins
            </Box> */}
            </Box>
          </Box>
          {/* <Box p={1} >
          
          <Button variant="contained" color="secondary" >Pause</Button>

          </Box> */}
          <Box p={1} >
              
                  {/* <Link to={`/user/test/${this.props.testId}/exam/result`} style={{textDecoration:'none'}}>
                    <Button variant="contained"  style={
                      {
                          textAlign:'center',
                          margin:'2px',
                          backgroundColor:'#DC143C',
                          color:'white'
                      }} onClick={()=>this.submitResult()}  >End Test</Button></Link> */}
                     
                      <Button variant="contained"  style={
                      {
                          textAlign:'center',
                          margin:'2px',
                          backgroundColor:'#DC143C',
                          color:'white'
                      }} onClick={()=>this.submitResult()}  >End Test</Button>
               
          

          </Box>
        </Box>
        <Divider dark />
        <br />
          <Typography variant="subtitle1" component="h5">
          {/* {question.number}. */}
           <NewlineText classes={this.props.classes} text={question.body} testId={this.state.testId} metaData={question.metaData} number={question.number}/>
          
          </Typography>
          {question.options.map((opt, index)=>{
              var localAnsCollection = JSON.parse(localStorage.getItem(`${this.state.testId}`))
            return (
              <React.Fragment>
              <div key={index} style={{marginTop: "5px"}}   ref={index.toString()}>
              {/* {console.log("Hello Test:",localAnsCollection[this.state.current+1]!=undefined )} */}

             {question.type=="Radio" ? (<Radio
          value={index} key={index.toString()}
           onChange={e => this.handleCheck(e,index.toString(),"Radio")}
           checked={this.state.checkedValues.includes(index.toString())}
            
           />):(<Checkbox
            label={opt} key={index.toString()}
            onChange={e => this.handleCheck(e,index.toString(),"CheckBox")}
            checked={this.state.checkedValues.includes(index.toString())}
            
            />)}
           {opt}
           {/* <br />
           <QuestionCircleRender questionsArray={this.state.questionsArray} /> */}

               {/* {console.log("Hello Test2",index+1)} */}
               
           </div>
            
           </React.Fragment>
          )})}
          
                <br />
  <div className={this.props.classes.footer}>
           {/* <Button onClick={this.revealCorrect} variant="raised" color="secondary">
          Check Answer
        </Button> */}
        {/* {(moveRight)? (<Button onClick={this.moveNext} variant="raised" color="primary" style={{float: "right"}}>
          Save
        </Button>): (<Button onClick={this.moveNext} disabled variant="raised" color="primary" style={{float: "right"}}>
          Save
        </Button>)} */}
  {(this.state.checkedValues.length>0)?(<Button onClick={this.moveNext} variant="raised" color="primary" style={{float: "right"}}>
          Save
        </Button>):(
          <Button onClick={this.moveNext} disabled variant="raised" color="primary" style={{float: "right"}}>
          Save
        </Button>
        )}
        {/* {(moveLeft)? ( <Button onClick={this.movePrevious} disabled variant="raised" color="primary" style={{float: "right", marginRight: "50px"}}>
          Previous
        </Button>): ( <Button onClick={this.movePrevious} variant="raised" color="primary" style={{float: "right", marginRight: "50px"}}>
          Previous
        </Button>)}
         */}
       
              
  </div>
        </Paper>

      </Grid>
      {
        //Exam Question Timer
      }
      <Grid item xs={12} sm={4}>
        <Paper className={this.props.classes.paper} elevation={1}>
        <Box m='auto'  >
{/*          
              <div className="time-wrapper" style={{textAlign:'center'}}>
      <div className="time"> 
      {
        console.log("ddfgdgdgfdgdfgd",this.state.test)
      }
      {
        this.state.test != null ? ( <Countdown date={ Date.parse(this.state.test.testStartTime) +parseInt(this.state.test.testTotalTime)*1000*60}   renderer={renderer} />):(<p>Loading</p>)
      }
     
      
      </div>
      <div>minutes</div>
    </div> */}
    
    {this.props.testDetail==undefined ? (<SimpleCountdownTimer test={0}/>):(<SimpleCountdownTimer test={this.props.testDetail.time} submitResult={this.submitResult}/>)}
          

   
           
            
         
      

          </Box>
          <br />
          <Divider dark />
          <br />
          <Box m='auto' >
          
          {/* <Checkbox
icon={<CircleUnchecked />}
checkedIcon={<CircleChecked />}
/> */}


      {

        this.state.questionsArray.map((opt,index)=>{
          const localAnsCollection1 = JSON.parse(localStorage.getItem(`${this.state.testId}`))

                           index = index+1
                          //  console.log("Index",index)
                          //  console.log("hiefsdcsdc",localAnsCollection1[index])

                          index= index
                      return (
                        //Hi Hello
                        <FormControlLabel
                        control={
                          <Checkbox
                          label={opt} key={index.toString()}
                          checked={localAnsCollection1[index]!=undefined && localAnsCollection1[index].length > 0 ? (true):(false)}
                           icon={<CircleUnchecked />}
                        checkedIcon={<CircleCheckedFilled />}
                        onChange={e => this.handleQuestionChange(e,parseInt(index)-1)}
                          />                        }
                        label={
                            <React.Fragment>
                                {index}
                            </React.Fragment>
                        }
                        labelPlacement="bottom"
                    />
                      
                      
                    
                    )})
      }

          </Box>
        </Paper>
      </Grid>
    </Grid>
      </Paper>
      </Paper>
   
   
        
      </React.Fragment>
      )}
      </Beforeunload>
    );
    }
  }

  // const renderer = ({ hours, minutes, seconds, completed }) => {
 
  //     return <span>{hours}:{minutes}:{seconds}</span>;
 
  // };
  function NewlineText(props) {
    const text = props.text;
    const metaData = props.metaData
    const classes = props.classes

    return text.split('\n').map(str => {
      const tempArray = str.split(/<(.*?)>/)
     // console.log("🚀 ~ file: ExamScreen.js ~ line 3380 ~ returntext.split ~ tempArray ", tempArray )

      if(tempArray.length>1){
        if(tempArray[1][0]=="I"){
          return (<React.Fragment>
            <p>{tempArray[0]}</p>
            <img key={tempArray[1]} src={`http://localhost:5000/images/${props.testId}/${tempArray[1]}.png`} style={{width:"100%",height:"100% "}} alt={tempArray[1]} /> 
   
          </React.Fragment>)
        }else if(tempArray[1][0]=="T"){
          const tableTemp = tempArray[1]
          const tableData = JSON.parse(metaData.tables[tableTemp])
          const keys  = Object.keys(tableData[0])
         // console.log("🚀 ~ file: ExamScreen.js ~ line 3391 ~ returntext.split ~ tempArray[1]", tableTemp)
          return (
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableBody>
                  {
                    tableData.map(obj=>{
                     // console.log("🚀 ~ file: ExamScreen.js ~ line 3404 ~ returntext.split ~ keys", keys)
                      return (
                        <TableRow key={Math.random()}>
                          {
                           
                            keys.map((keysObj,index)=>{
                             // console.log(obj[keysObj],index)

                              if(index==0){
                                return (<TableCell component="th" scope="row">
                {obj[keysObj]}
              </TableCell>)
                              }else{
                                return (<TableCell >{obj[keysObj]}</TableCell>)

                              }

                            })
                          }
                      </TableRow>
                        
                      )
                     
           
                    })
                  }
                </TableBody>
              </Table>
            </TableContainer>
          );
          // return (
          // <React.Fragment>
          //   <p>{tempArray[0]}</p>
          //   <img key={tempArray[1]} src={`http://localhost:5000/images/${props.testId}/${tempArray[1]}.png`} style={{width:"100%",height:"100% "}} alt={tempArray[1]} /> 
   
          // </React.Fragment>)
        }
      
      }
      else{
        return <p>{str}</p>

      }
      // console.log("String",str.split(/<(.*?)>/))
    });
  }

