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
  const history = useHistory();
  
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
        setEducation(recruiterAll.data.education)
        setSkills(recruiterAll.data.skills)
        setFname(recruiterAll.data.fname)
        setLname(recruiterAll.data.lname)
      }
    });
    callData();
  }, [])
  
  const submit = async (e) => {
    e.preventDefault()
    const updatedUser = {education, fname, lname, skills};
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
  }

  return (
    <Grid container component="main" className={classes.rooot} style={{height:"100vh"}}> 
    <Grid container className={classes.image} >
      <CssBaseline />
        <Grid item xs={false} sm={1} />
        <Grid item xs={12} sm={10} md={10} component={Paper} elevation={6} square>
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
            <Grid item xs={12} sm={6}>
              <TextField
                name="fName"
                variant="outlined"
                required
                fullWidth
                id="fName"
                label="First Name"
                defaultValue={fname}
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lName"
                label="Last Name"
                name="lName"
                defaultValue={lname}
                value={lname}
                onChange={(e) => setLname(e.target.value)}
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
                defaultValue={userData?.user?.email || ''}
                value={userData?.user?.email || ''}
                InputProps={{
                    readOnly: true,
                }}
              />
            </Grid>
            <br />
            &nbsp;
            <br/>
            <Grid container spacing={2}>
                <h3> • Education</h3>
            </Grid>
          &nbsp;
          <Grid container spacing={2}>
              {education?.map(item => {
                return (
                  <Grid item key={JSON.stringify(item)}>
                    <Card>
                      <CardContent>
                        <h5>{item.institute}</h5>
                        {item.syear}-{item.eyear}
                        <IconButton onClick={() => {
                          setEducation(education.filter(ed => (ed !== item) ))
                        }}>
                          <DeleteOutlineIcon />
                        </IconButton>
                      </CardContent>
                    </Card>
                  </Grid>
                )
              })}
          </Grid>
            <Grid item xs={12}>
            
            <TextField
                variant="outlined"
                fullWidth
                id="institute"
                label="Institute"
                onChange={(e) => setInstitute(e.target.value)}
            />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="sYear"
                name="sYear"
                variant="outlined"
                fullWidth
                id="sYear"
                label="Start Year"
                onChange={(e) => setSyear(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                id="eYear"
                label="End Year"
                name="eYear"
                onChange={(e) => setEyear(e.target.value)}
              />
            </Grid>
            <Button
            fullWidth
            variant="contained"
            className={classes.submit}
            color="primary"
            onClick={()=>{
              const item = {institute, syear, eyear}
              if (!education.filter(ed => ed === item).length && institute !== "" && syear != "")
                setEducation([...education, item])
            }}
          >
          <span style={{color: "white"}}> Add Education </span>
          </Button>
          </Grid>
          <br />
          &nbsp;
          <br/>
          <Grid container spacing={2}>
                <h3> • Skills</h3>
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
    </Grid> 
  );
}
