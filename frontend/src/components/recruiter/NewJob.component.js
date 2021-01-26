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
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CreateIcon from '@material-ui/icons/Create';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import IconButton from '@material-ui/core/IconButton';
import Autocomplete from '@material-ui/lab/Autocomplete';
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
  const [ skills, setSkills ] = useState([]);
  const [title, setTitle] = useState()
  const [skill, setSkill] = useState("")
  const [salary, setSalary] = useState()
  const [maxapp, setMaxapp] = useState()
  const [maxpos, setMaxpos] = useState()
  const [jtype, setJtype] = useState()
  const [duration, setDuration] = useState()
  const [dod, setDod] = useState()
  const history = useHistory();
  const [open, setOpen] = useState(false)
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  
  
  
  const {userData, setUserData } = useContext(UserContext);

  const jobTypes = ["Full-Time","Part-Time", "Work from Home"]
  const durTypes = ["0", "1", "2", "3", "4", "5", "6"]

  const submit = async (e) => {
    e.preventDefault()
    console.log("dod", dod, "New", new Date().toDateString())
    if(Number(salary) < 0 || Number(maxpos) <= 0 || Number(maxapp) <= 0 || Number(maxapp) < Number(maxpos) || dod < new Date().toISOString()){
      setOpen(true)
    }
    else{
    var dop = new Date()
    const newJob = {title, skills, salary, maxapp, maxpos, jtype, duration, dod, dop};
    let token = await localStorage.getItem("auth-token")
      const tokenRes = await Axios.post(
          "http://localhost:5000/user/tokenIsValid", null , {headers: {"x-auth-token": token}}
      );
      if (tokenRes.data) {
        await Axios.post("http://localhost:5000/job/add", newJob, {
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
        <Grid item xs={12} sm={10} md={10} component={Paper} elevation={6} square>
            <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <CreateIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Create Job
            </Typography>
            <form className={classes.form} onSubmit={submit}>
            <Grid container spacing={2}>
                <h3> • Basic Info</h3>
            </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="title"
                variant="outlined"
                required
                fullWidth
                id="title"
                label="Job Title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
              id="jtype"
              options={jobTypes}
              getOptionLabel={(option) => option}
              style={{ width: "100%" }}
              renderInput={(params) => <TextField {...params} required label="Job Type" variant="outlined" />}
              onInputChange={(event, value)=>{
                  setJtype(value)
              }}
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="date"
              variant="outlined"
              label="Deadline"
              type="datetime-local"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setDod(e.target.value)}
            />
            </Grid>
          
          </Grid>
          <br />
          &nbsp;
          <br/>
          <Grid container spacing={2}>
                <h3> • Other Info</h3>
          </Grid>
          &nbsp;
          <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                  name="title"
                  variant="outlined"
                  required
                  type="number"
                  fullWidth
                  id="title"
                  label="Salary"
                  onChange={(e) => setSalary(e.target.value)}
                />
            </Grid>
            <Grid item xs={12}>
                <Autocomplete
                id="jtype"
                options={durTypes}
                getOptionLabel={(option) => option}
                style={{ width: "100%" }}
                renderInput={(params) => <TextField {...params} required label="Duration" variant="outlined" />}
                onInputChange={(event, value)=>{
                  setDuration(value)
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="maxapp"
                  variant="outlined"
                  type="number"
                  fullWidth
                  id="maxapp"
                  label="Max Applicants"
                  onChange={(e) => setMaxapp(e.target.value)}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                  required
                  variant="outlined"
                  type="number"
                  fullWidth
                  id="maxpos"
                  label="Max Positions"
                  name="maxpos"
                  onChange={(e) => setMaxpos(e.target.value)}
                />
            </Grid>
          </Grid>
          <br />
          &nbsp;
          <br/>
          <Grid container spacing={2}>
                <h3> • Required Skills</h3>
          </Grid>
          &nbsp;
          <Grid container spacing={2}>
              {skills?.map(item => {
                return (
                  <Grid item key={item}>
                    <Card>
                      <CardContent>
                        {item}
                        <IconButton onClick={() => {
                          setSkills(skills.filter(sk => sk !== item))
                        }}>
                          <DeleteOutlineIcon />
                        </IconButton>
                      </CardContent>
                    </Card>
                  </Grid>
                )
              })}
          </Grid>
          &nbsp;
          <Grid item xs={12}>
              <Autocomplete
                freeSolo
                name="skill"
                variant="outlined"
                fullWidth
                options={[{title: "Java"}, {title: "C++"}, {title: "Python"},]}
                getOptionLabel={(option) => option.title}
                label="Skill" 
                inputValue={skill|| ''}
                onInputChange={(event, value)=>{
                  setSkill(value)
                }} 
                renderInput={(params) => <TextField {...params} label="Enter new skill" variant="outlined" />}
              />
            </Grid>
          <Grid item xs={12}>
          
            <Button
            fullWidth
            variant="contained"
            className={classes.submit}
            color="primary"
            onClick={()=>{
              if (!skills.filter(sk => sk === skill).length && skill !== "")
                setSkills([...skills, skill])
            }}
          >
          <span style={{color: "white"}}> Add Skills </span>
          </Button>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            color="secondary"
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
