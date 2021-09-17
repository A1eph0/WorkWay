import {useState, useContext, useEffect} from 'react';
import UserContext from "../../context/UserContext";
import { useHistory } from "react-router-dom"
import Axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { Dropdown } from 'react-bootstrap'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
        Work-Way
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 40),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

 export default  function Profile() {
  const classes = useStyles();
  const [users, setUsers] = useState()
  const [list, setList] = useState([])
  const [soType, setSoType] = useState('Ascending')
  const [sType, setSType] = useState('Name')
  const [rating, setRating] = useState(3)
  const [open, setOpen] = useState(false);
  const [citem, setCitem] = useState()

  const [jobs, setJobs] = useState([])
  const {userData, setUserData } = useContext(UserContext);
  const [dataYet, setDataYet] = useState(false)
  const [open2, setOpen2] = useState(false)
  const handleClose2 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen2(false);
  };

  const sendData = (async () => {
    if(Number(rating)<0 || Number(rating)>5){
      setOpen2(true)
    }
    else{
    let token = await localStorage.getItem("auth-token")
    let tempApplicant = citem.job?.applicants?.filter(ap => ap.email === citem.emp.email)
    tempApplicant=tempApplicant[0]
    tempApplicant.rated = true
    console.log(tempApplicant)
    let applicants = citem.job.applicants.filter(ap => ap.email !== citem.emp.email)
    applicants = [...applicants, tempApplicant]
    console.log(applicants)
    let nrating = citem.emp.nrating + 1;
    let trating = Number(citem.emp.trating) + Number(rating);
    let email = citem.emp.email
    let content = {nrating, trating}
    console.log("content", content, "applicants", applicants, "email", email)
    const tokenRes = await Axios.post(
      "http://localhost:5000/user/tokenIsValid", null, { headers: { "x-auth-token": token } }
    );
    if (tokenRes.data) {
      await Axios.post(`http://localhost:5000/job/update/${citem.job._id}`, { applicants }, {
        headers: { "x-auth-token": token }
      });
      await Axios.post(`http://localhost:5000/user/updater/${citem.emp.email}`, {nrating, trating }, {
        headers: { "x-auth-token": token }
      });
      setRating(3)
      setDataYet(false)
    }
  }});

  const sortFunc =  (a, b) => {
    console.log("inside")

    const rc = (j) => {
      if (j.nrating===0)
        return 0;
      else
        return (j.trating/j.nrating) 
    }

    if (sType === 'Name'){
      if (soType==='Ascending'){
        return (((a.emp.fname+a.emp.lname) > (b.emp.fname+b.emp.lname)) ? (1) : (-1))
      }else{
        return (((a.emp.fname+a.emp.lname) < (b.emp.fname+b.emp.lname)) ? (1) : (-1))
      }
    }else if (sType ==='Job Title'){
      if (soType==='Ascending'){
        console.log(a.job.title > b.job.title)
        return (((a.job.title > b.job.title)) ? (1) : (-1))
      }else{
        console.log(a.job.title < b.job.title)
        return (((a.job.title < b.job.title)) ? (1) : (-1))
      }
    }else if (sType ==='Date of Joining'){
      if (soType==='Ascending'){
        return (((a.doj > b.doj)) ? (1) : (-1))
      }else{
        return (((a.doj < b.doj)) ? (1) : (-1))
      }
    }else{
      if (soType==='Ascending'){
        return (rc(a.emp)-rc(b.emp))
      }else{
        return (rc(b.emp)-rc(a.emp))
      }
    }
  }

  let foo = list
  foo.sort(sortFunc)
  console.log(foo)
  

  useEffect(() => {
    const callData = (async () => {
      let token = await localStorage.getItem("auth-token")
      const tokenRes = await Axios.post(
        "http://localhost:5000/user/tokenIsValid", null, { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const jobsAll = await Axios.get("http://localhost:5000/job/", {
          headers: { "x-auth-token": token }
        });
        const usersAll = await Axios.get("http://localhost:5000/user/every", {
          headers: { "x-auth-token": token }
        });
        setJobs(jobsAll.data)
        setUsers(usersAll.data)
        setDataYet(true)
        console.log("callData")
      }
  });
  const makeList = (async () => {
    let temp = []
    const jobsFilter=jobs.filter(jb=>jb.remail == userData?.user.email)
    jobsFilter.map(jb => {
      const appFilter=jb.applicants.filter(ap=>ap.stage > 1)
      appFilter.map(ap=>{
        let cUser = users.filter(u => u.email === ap.email)
        cUser=cUser[0]
        let empl = {job: jb, emp: cUser, rated: ap.rated, doj: ap.doa}
        temp = [...temp, empl]
      })
    })
    console.log("makeList", temp)
    setList(temp)
  })
    
  if (!dataYet){
    callData()
  }else{
    makeList()
  }
    
    console.log(userData)
  }, [dataYet])

  return (
    <Grid container component="main" className={classes.rooot} style={{height:"100vh"}}> 
    <Grid container className={classes.image} >
      <CssBaseline />
        <Grid item xs={false} sm={1} />
        <Grid item xs={12} sm={10} md={10} component={Paper} elevation={6} square style={{height: "100vh"}}>
        <div className={classes.paper}>
          <h1>My Employees</h1>
        </div>
        <Grid container spacing={4} >
            <Grid item xs={12}>
            <Card>
                <CardActions style={{ backgroundColor: "#5a1563" }}>
                </CardActions>
            </Card>
            <Grid container xs={12} style={{ backgroundColor: "#5a1563" }}>
              <Grid item xs={3}>
              <Grid container>
              <Grid item xs={3}/>
              <Grid item xs={9}>
              <h5 style={{ color: "white", display: "inline"}}>Sort by:</h5>
              <Dropdown>
                          <Dropdown.Toggle variant="warning" id="dropdown-basic" size="sm">
                              <h4 style={{ color: "black", display: "inline"}}>{sType}</h4>
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                              <Dropdown.Item onClick={()=>{setSType('Name'); }}>&nbsp; Name &nbsp;</Dropdown.Item>
                              <Dropdown.Item onClick={()=>{setSType('Job Title');}}>&nbsp; Job Title &nbsp;</Dropdown.Item>
                              <Dropdown.Item onClick={()=>{setSType('Date of Joining');}}>&nbsp; Date of Joining &nbsp;</Dropdown.Item>
                              <Dropdown.Item onClick={()=>{setSType('Employee Rating');}}>&nbsp; Employee Rating &nbsp;</Dropdown.Item>
                          </Dropdown.Menu>
                </Dropdown>
              </Grid>
              </Grid>
              </Grid>
              <Grid item xs={1}>
              <h5 style={{ color: "white", display: "inline"}}>Sort order:</h5>
              <Dropdown>
                          <Dropdown.Toggle variant="success" id="dropdown-basic" size="sm">
                              <h4 style={{ color: "white", display: "inline"}}>{soType}</h4>
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                              <Dropdown.Item onClick={()=>{setSoType('Ascending');}}>&nbsp; Ascending &nbsp;</Dropdown.Item>
                              <Dropdown.Item onClick={()=>{setSoType('Descending');}}>&nbsp; Descending &nbsp;</Dropdown.Item>
                          </Dropdown.Menu>
                  </Dropdown>
                  
              </Grid>
            </Grid>
            <Card>
                <CardActions style={{ backgroundColor: "#5a1563" }}>
                </CardActions>
            </Card>
            </Grid>
            <Grid item xs={12}>
            <Grid container spacing={4}>
              {foo?.map(item => {
                const handleClickOpen = () => {
                    setCitem(item);
                    setOpen(true);
                };
                const handleCloseAndSubmit = async () => {
                    await sendData();
                    setOpen(false);
                };
                const handleClose = () => {
                    setOpen(false);
                    setRating(3);
                };
                let value = 0
                if (item.emp.nrating) value=(item.emp.trating/item.emp.nrating)
                return (
                  <Grid item xs={6} key={JSON.stringify(item)}>
                  <Card>
                    <CardContent>
                    
                    <Grid container spacing={1}>
                    <Grid item xs={6}>
                    <h4>{item.emp.fname} {item.emp.lname}</h4>
                    </Grid>
                    <Grid item xs={6}>
                            Rating : {value} ★
                    </Grid>
                    <Grid item xs={6}>
                      Job Title: {item?.job?.title}
                    </Grid>
                     <Grid item xs={6}>
                        Job Type: {item.job.jtype}
                     </Grid>
                     <Grid item xs={6}>
                        Salary: $ {item?.job?.salary}
                     </Grid>
                     <Grid item xs={6}>
                        Skills : |&nbsp;{item.emp?.skills?.join(" | " )} |
                     </Grid>
                     <Grid item xs={12}>
                        Date of Joining : {new Date(item.doj).toDateString()}
                     </Grid>
                    </Grid>
                    </CardContent>
                    <CardActions>
                    {
                      (item.rated===false) ? 
                      (
                        <Button
                        onClick={() => handleClickOpen()}
                        fullWidth
                        variant="contained"
                        className={classes.submit}
                        color="primary"
                        >
                          <span style={{color: "white"}}> Rate Employee</span>
                        </Button>
                      ) : (<></>)
                    }
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">{citem?.emp.fname} {citem?.emp.lname}</DialogTitle>
                        <DialogContent>
                        <DialogContentText>
                          <h6>Rate your job!</h6>
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            type="number"
                            label="Rating (Out of 5 ★)"
                            fullWidth
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                        />
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleCloseAndSubmit} color="primary">
                            Submit
                        </Button>
                        </DialogActions>
                    </Dialog>
                    </CardActions>
                  </Card>
                  </Grid>
                )
              })}
            </Grid>
            </Grid>
            </Grid>
        <Box mt={5}>
              <Copyright />
          </Box>
        </Grid>
        <Grid item xs={false} sm={1} md={7}/>
    </Grid>
    <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose2}>
        <Alert onClose={handleClose2} severity="error">
          Please Check Values Entered!
        </Alert>
      </Snackbar>
    </Grid> 
  );
}