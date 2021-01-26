import {useState, useContext, useEffect} from 'react';
import UserContext from "../../context/UserContext";
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
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

 export default  function Dash() {
  const classes = useStyles();
  
  const [jobs, setJobs] = useState([])
  const [rating, setRating] = useState(3)
  const [cjob, setCjob] = useState()
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([])

  const {userData, setUserData } = useContext(UserContext);
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
    let tempApplicant = cjob.applicants.filter(ap => ap.email === userData.user.email)
    tempApplicant = tempApplicant[0]
    tempApplicant.stage+=1
    console.log(tempApplicant)
    let applicants = cjob.applicants.filter(ap => ap.email !== userData.user.email)
    applicants = [...applicants, tempApplicant]
    let nrating=cjob.nrating+1
    let trating=Number(cjob.trating)+Number(rating)
    console.log(applicants)
    const tokenRes = await Axios.post(
        "http://localhost:5000/user/tokenIsValid", null, {headers: {"x-auth-token": token}}
    );
    console.log("applicants")
      if (tokenRes.data) {
      await Axios.post(`http://localhost:5000/job/update/${cjob._id}`, {applicants, nrating, trating}, {
          headers: {"x-auth-token": token}
      });
      if (tokenRes.data) {
        const jobsAll = await Axios.get("http://localhost:5000/job/", {
          headers: {"x-auth-token": token}
        });
        setJobs(jobsAll.data)
      }
    }
  }});



  useEffect( () => {
      const callData = (async () => {
        let token = await localStorage.getItem("auth-token")
        const tokenRes = await Axios.post(
            "http://localhost:5000/user/tokenIsValid", null , {headers: {"x-auth-token": token}}
        );
        if (tokenRes.data) {
          const jobsAll = await Axios.get("http://localhost:5000/job/", {
            headers: {"x-auth-token": token}
          });
          const usersAll = await Axios.get("http://localhost:5000/user/every", {
            headers: {"x-auth-token": token}
          });
          setJobs(jobsAll.data)
          setUsers(usersAll.data)
        }
      });
      callData()
      
      console.log(userData)
  }, [])
  const jobUser = () => jobs?.filter(job => job?.applicants?.filter( ap => ap.email === userData.user.email && ap.stage !== -1).length)
  let newJobs = jobUser()
  console.log("dfsahfasf", newJobs)
  return (
    <Grid container component="main" className={classes.rooot} style={{height:"100vh"}}> 
    <Grid container className={classes.image} >
      <CssBaseline />
        <Grid item xs={false} sm={1} />
        <Grid item xs={12} sm={10} md={10} component={Paper} elevation={6} square style={{height: "100%"}}>
        <div className={classes.paper}>
          <h1>My Applications</h1>
        </div>
            <Grid container spacing={4}>
              {newJobs?.map(job => {
                let appVals = job.applicants.filter(ap => ap.email === userData.user.email)
                appVals=appVals[0]
                const handleClickOpen = () => {
                    setCjob(job);
                    setOpen(true);
                };
                const handleCloseAndSubmit = async () => {
                    await sendData();
                    setOpen(false);
                };
                const handleClose = () => {
                    setOpen(false);
                };
                return (
                  <Grid item xs={6} key={job._id}>
                  <Card>
                    <CardContent>
                    <h4>{job.title}</h4>
                    <Grid container spacing={1}>
                     <Grid item xs={6}>
                        Job Type: {job.jtype}
                     </Grid>
                     <Grid item xs={6}>
                        Company:&nbsp;
                        {
                          users?.filter(user => (user.email === job.remail)).map(  user => {
                            return (
                              <>
                              {user.cname}
                              </>
                            )
                          })
                        }
                     </Grid>
                     <Grid item xs={6}>
                        Salary:  {job.salary}
                     </Grid>
                     <Grid item xs={6}>
                        Skills : |&nbsp;{job.skills.join(" | " )} |
                     </Grid>
                     &nbsp;
                     <br/>
                     <Grid item xs={12} style={{alignItems: "center"}}>
                      <h6>Status:&nbsp;
                      {
                        (appVals.stage < 2) ? (
                          <a style={{
                            color: "white",
                            backgroundColor: '#f1356d',
                            borderRadius: '8px'
                          }}> 
                          &nbsp; Pending &nbsp;
                          </a>
                        ) : (
                          <a style={{
                            color: "white",
                            backgroundColor: '#18de46',
                            borderRadius: '8px'
                          }}> 
                          &nbsp; Accepted &nbsp;
                          </a> 
                        )
                      }
                      </h6>
                     </Grid>
                    </Grid>
                    </CardContent>

                    <CardActions>
                    {
                      (appVals.stage===2) ? 
                      (
                        <Button
                        onClick={() => handleClickOpen()}
                        fullWidth
                        variant="contained"
                        className={classes.submit}
                        color="primary"
                        >
                          <span style={{color: "white"}}> Rate Job</span>
                        </Button>
                      ) : (<></>)
                    }
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">{job.title}</DialogTitle>
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

