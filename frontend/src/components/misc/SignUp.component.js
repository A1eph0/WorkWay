import {useState, useContext} from 'react';
import UserContext from "../../context/UserContext";
import { useHistory } from "react-router-dom"
import Axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Dropdown } from 'react-bootstrap'
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
      backgroundImage: 'url(http://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80)',
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
      margin: theme.spacing(8, 4),
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

export default function SignUp() {
  const classes = useStyles();
  const [utype, setUType] = useState("Applicant")
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [cpassword, setCPassword] = useState();
  const [fname, setFname] = useState()
  const [lname, setLname] = useState()
  const [cname, setCname] = useState()
  
  const history = useHistory();

  const {userData, setUserData} = useContext(UserContext);
  const [open, setOpen] = useState(false)
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  

  const submit = async (e) => {
    e.preventDefault();
    try{
    const newUser = {email, password, cpassword, utype, fname, lname, cname};
    await Axios.post(
      "http://localhost:5000/user/signup",
      newUser
    );
    const loginRes = await Axios.post(
      "http://localhost:5000/user/signin",
      {
        email,
        password,
      }
    );
    setUserData({
      token: loginRes.data.token,
      user: loginRes.data.user
    });
    localStorage.setItem("auth-token", loginRes.data.token);
    history.push("/");
    }
    catch (err){
      setOpen(true)
    }
  };


  return (
    <Grid container component="main" className="classes.root" style={{height:"100vh"}}>
    <CssBaseline />
    <Grid item xs={false} sm={4} md={7} className={classes.image} />
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic" size="sm">
                    {utype}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={()=>{setUType('Applicant')}}>Applicant</Dropdown.Item>
                    <Dropdown.Item onClick={()=>{setUType('Recruiter')}}>Recruiter</Dropdown.Item>
                </Dropdown.Menu>
        </Dropdown>
        <form className={classes.form} onSubmit={submit}>
          <Grid container spacing={2}>
            {
              (utype==="Applicant") ? (
                <>
                  <Grid item xs={12} sm={6}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        label="First Name"
                        onChange={(e) => setFname(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        label="Last Name"
                        onChange={(e) => setLname(e.target.value)}
                      />
                    </Grid>
                </>
              ): (
                <>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="cName"
                    label="Company Name"
                    onChange={(e) => setCname(e.target.value)}
                  />
                </Grid>
              </>
              )
            }
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="cpassword"
                label="Confirm Password"
                type="password"
                id="cpassword"
                onChange={(e) => setCPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            color="primary"
          >
          <span style={{color: "white"}}> Sign Up </span>
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
          <Box mt={5}>
            <Copyright />
          </Box>
        </form>
      </div>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Please check entered fields!
        </Alert>
      </Snackbar>
    </Grid>
  );
}