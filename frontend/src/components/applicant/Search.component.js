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

 export default  function Search() {
  const classes = useStyles();
  
  const [jobs, setJobs] = useState([])
  const [sop, setSop] = useState("")
  const [cjob, setCjob] = useState({"skills": []})
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([])
  const [open2, setOpen2] = useState(false);

  const handleClick2 = () => {
    setOpen2(true);
  };

  const handleClose2 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen2(false);
  };

  const {userData} = useContext(UserContext);


  const sendData = (async () => {
    let token = await localStorage.getItem("auth-token")
    const applicants = [...cjob.applicants, { sop, email: userData.user.email }]
    const tokenRes = await Axios.post(
        "http://localhost:5000/user/tokenIsValid", null, {headers: {"x-auth-token": token}}
    );
    console.log(applicants)
      if (tokenRes.data) {
      await Axios.post(`http://localhost:5000/job/update/${cjob._id}`, {applicants}, {
          headers: {"x-auth-token": token}
      });
      if (tokenRes.data) {
        const jobsAll = await Axios.get("http://localhost:5000/job/", {
          headers: {"x-auth-token": token}
        });
        setJobs(jobsAll.data)
      }
    }
  });

  const filled = jobs?.filter(job => job?.applicants?.filter( ap => ap.email === userData?.user?.email && ap.stage !== -1).length).length
  console.log("Filled:", filled)

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

  return (
    <Grid container component="main" className={classes.rooot} style={{height:"100vh"}}> 
    <Grid container className={classes.image} >
      <CssBaseline />
        <Grid item xs={false} sm={1} />
        <Grid item xs={12} sm={10} md={10} component={Paper} elevation={6} square style={{height: "100%"}}>
        <div className={classes.paper}></div>
            <Grid container spacing={4}>
              {jobs?.map(job => {
                const handleClickOpen = () => {
                    if (filled >= 10){
                        setOpen2(true);
                    }
                    else{
                    setCjob(job);
                    setOpen(true);
                    }
                };
                const handleCloseAndSubmit = async () => {
                    await sendData();
                    setOpen(false);
                    setSop("")
                };
                const handleClose = () => {
                    setOpen(false);
                };
                let value = 0
                if (job.nrating) value = (job.trating/job.nrating)

                return (
                  <Grid item xs={6} key={job._id}>
                  <Card>
                    <CardContent>
                    
                        <Grid container spacing={1}>
                        <Grid item xs={6}>
                        <h4>{job.title}</h4>
                        </Grid>
                        <Grid item xs={6}>
                            Rating : {value} ★
                        </Grid>
                    
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
                        Salary:  $ {job.salary}
                     </Grid>
                     <Grid item xs={6}>
                        Skills : |&nbsp;{job.skills.join(" | " )} |
                     </Grid>
                     <Grid item xs={6}>
                        Maximum Positions: {job.maxpos}
                    </Grid>
                     <Grid item xs={6}>
                        Deadline: { (new Date(job.dod)).toDateString() }
                     </Grid>
                     <Grid item xs={6}>
                        
                     </Grid>
                    </Grid>
                    </CardContent>

                    <CardActions>
                    {
                      (!job.applicants.filter(ap => ap.email === userData.user.email).length) ? 
                      (
                        (job.applicants.filter(ap => ap.stage != -1 && ap.stage<2).length >= job.maxapp) ? 
                        (
                            <Button
                                fullWidth
                                variant="contained"
                                className={classes.submit}
                                color=""
                                >
                                <span style={{color: "red"}}> Full </span>
                            </Button>
                        ) :
                        (
                            <Button
                            onClick={handleClickOpen}
                            fullWidth
                            variant="contained"
                            className={classes.submit}
                            color="primary"
                            >
                            <span style={{color: "white"}}> Apply </span>
                            </Button>
                        )
                        

                      ) : 
                      (
                        <Button
                        fullWidth
                        variant="contained"
                        className={classes.submit}
                        color="secondary"
                        >
                          <span style={{color: "white"}}> Applied </span>
                        </Button>
                      )
                    }
                    <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose2}>
                                <Alert onClose={handleClose2} severity="error">
                                    Application limit exceeded!
                                </Alert>
                    </Snackbar>
                    
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">{cjob.title}</DialogTitle>
                        <DialogContent>
                        <DialogContentText>
                        <Grid container spacing={1}>
                        <Grid item xs={6}>
                            Job Type: {cjob.jtype}
                        </Grid>
                        <Grid item xs={6}>
                            Company:&nbsp;
                            {
                            users?.filter(user => (user.email === cjob.remail)).map(  user => {
                                return (
                                <>
                                {user.cname}
                                </>
                                )
                            })
                            }
                        </Grid>
                        <Grid item xs={6}>
                            Salary:  $ {cjob.salary}
                        </Grid>
                        <Grid item xs={6}>
                            Skills : |&nbsp;{cjob.skills.join(" | " )} |
                        </Grid>
                        <Grid item xs={6}>
                            Maximum Positions: {cjob.maxpos}
                        </Grid>
                        <Grid item xs={6}>
                            Deadline: { (new Date(cjob.dod)).toDateString() }
                        </Grid>
                        </Grid>
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Statement of Purpose"
                            fullWidth
                            onChange={(e) => setSop(e.target.value)}
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
    </Grid> 
  );
}

