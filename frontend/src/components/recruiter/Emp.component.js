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
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import PersonIcon from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import IconButton from '@material-ui/core/IconButton';
import Autocomplete from '@material-ui/lab/Autocomplete';


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
  const [ education, setEducation ] = useState([]);
  const [ skills, setSkills ] = useState([]);
  const [fname, setFname] = useState("")
  const [lname, setLname] = useState("")
  const [skill, setSkill] = useState("")
  const [institute, setInstitute] = useState("")
  const [syear, setSyear] = useState("")
  const [eyear, setEyear] = useState("")

  const [jobs, setJobs] = useState([])
  const {userData, setUserData } = useContext(UserContext);

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
          console.log(jobsAll)
          setJobs(jobsAll.data)
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
        <Grid item xs={12} sm={10} md={10} component={Paper} elevation={6} square style={{height: "100vh"}}>
            
        </Grid>
        <Grid item xs={false} sm={1} md={7}/>
    </Grid>
    </Grid> 
  );
}