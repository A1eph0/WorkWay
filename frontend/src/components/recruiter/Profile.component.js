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
import PersonIcon from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
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
  const [cname, setCname] = useState()
  const [bio, setBio] = useState()
  const [phone, setPhone] = useState()
  const history = useHistory()
  const [open, setOpen] = useState(false)
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const {userData, setUserData } = useContext(UserContext);

  useEffect( () => {
    const callData = (async () => {
      let token = await localStorage.getItem("auth-token")
      const tokenRes = await Axios.post(
          "http://localhost:5000/user/tokenIsValid", null , {headers: {"x-auth-token": token}}
      );
      if (tokenRes.data) {
        const recruiterAll = await Axios.get("http://localhost:5000/user/getall", {
          headers: {"x-auth-token": token}
        });
        setCname(recruiterAll.data.cname)
        setBio(recruiterAll.data.bio)
        setPhone(recruiterAll.data.phone)
      }
    });
    callData()
    console.log(userData)
	}, [])

  const submit = async (e) => {
    e.preventDefault()
    if(bio.split(" ").length >250 || phone<0){
      setOpen(true)
    }
    else{
    const updatedUser = {cname, phone, bio};
    let token = await localStorage.getItem("auth-token")
      const tokenRes = await Axios.post(
          "http://localhost:5000/user/tokenIsValid", null , {headers: {"x-auth-token": token}}
      );
      if (tokenRes.data) {
        console.log(updatedUser)
        await Axios.post("http://localhost:5000/user/update", updatedUser, {
          headers: {"x-auth-token": token}
        }); 
      }
    history.push("/")
  }}

  return (
    <Grid container component="main" className={classes.rooot} style={{height:"100vh"}}> 
    <Grid container className={classes.image} >
      <CssBaseline />
        <Grid item xs={false} sm={1} />
        <Grid item xs={12} sm={10} md={10} component={Paper} elevation={6} square style={{height:"100vh"}}>
            <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <PersonIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Edit Profile
            </Typography>
            <form className={classes.form} onSubmit={submit}>
            <Grid container spacing={2}>
                <h3> • Basic Info</h3>
            </Grid>
            <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="cName"
                label="Company Name"
                defaultValue={cname}
                value={cname}
                onChange={(e) => setCname(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
            
            <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                value={userData?.user?.email}
                InputProps={{
                    readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
            
            <TextField
                variant="outlined"
                required
                fullWidth
                type="number"
                id="phone"
                label="Phone"
                defaultValue={phone}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <br />
            &nbsp;
            <br/>
            <Grid container spacing={2}>
                <h3> • Bio</h3>
            </Grid>
            <Grid item xs={12}>
            
            <TextField
                variant="outlined"
                required
                multiline
                fullWidth
                id="bio"
                label="Tell us more (max 250 words)"
                defaultValue={bio}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                InputLabelProps={{ shrink: true }}
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
          <span style={{color: "white"}}> Save </span>
          </Button>
                    <Box mt={5}>
                        <Copyright />
                    </Box>
                </form>
            </div>
            </Grid>
            <Grid item xs={false} sm={1} md={7}/>
    </Grid>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Please Check Values Entered!
        </Alert>
    </Snackbar>
    </Grid> 
  );
}