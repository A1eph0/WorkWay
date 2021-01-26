import { useState, useContext, useEffect } from 'react';
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
import { Dropdown } from 'react-bootstrap'


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

export default function Dash() {
  const classes = useStyles();

  const [jobs, setJobs] = useState([])
  const [cjob, setCjob] = useState({ "skills": [], "applicants": [] })
  const [users, setUsers] = useState()
  const [soType, setSoType] = useState('Ascending')
  const [sType, setSType] = useState('Applicant Name')
  const { userData, setUserData } = useContext(UserContext);

  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [open3, setOpen3] = useState(false)
  const [maxpos, setMaxpos] = useState()
  const [maxapp, setMaxapp] = useState()
  const [dod, setDod] = useState()

  const handleClose3 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen3(false);
  };

  const sendData = (async () => {
    let token = await localStorage.getItem("auth-token")
    const tokenRes = await Axios.post(
        "http://localhost:5000/user/tokenIsValid", null, {headers: {"x-auth-token": token}}
    );
      if (tokenRes.data) {
      await Axios.post(`http://localhost:5000/job/update/${cjob._id}`, {maxpos, maxapp, dod}, {
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

  const reject = (async (email) => {
    let token = await localStorage.getItem("auth-token")
    let tempApplicant = cjob?.applicants?.filter(ap => ap.email === email)
    console.log(tempApplicant)
    tempApplicant = tempApplicant[0]
    tempApplicant.stage = -1
    console.log(tempApplicant)
    let applicants = cjob?.applicants.filter(ap => ap.email !== email)
    applicants = [...applicants, tempApplicant]
    console.log(applicants)
    const tokenRes = await Axios.post(
      "http://localhost:5000/user/tokenIsValid", null, { headers: { "x-auth-token": token } }
    );
    let temp = cjob
    temp.applicants=applicants
    if (tokenRes.data) {
      await Axios.post(`http://localhost:5000/job/update/${cjob?._id}`, { applicants }, {
        headers: { "x-auth-token": token }
      });
      if (tokenRes.data) {
        const jobsAll = await Axios.get("http://localhost:5000/job/", {
          headers: { "x-auth-token": token }
        });
        setJobs(jobsAll.data)
        setCjob(temp)
      }
    }
  });

  const shortlist = (async (email) => {
    let token = await localStorage.getItem("auth-token")
    let tempApplicant = cjob?.applicants?.filter(ap => ap.email === email)
    console.log(tempApplicant)
    tempApplicant = tempApplicant[0]
    tempApplicant.stage += 1
    console.log(tempApplicant)
    let applicants = cjob?.applicants.filter(ap => ap.email !== email)
    applicants = [...applicants, tempApplicant]
    console.log(applicants)
    const tokenRes = await Axios.post(
      "http://localhost:5000/user/tokenIsValid", null, { headers: { "x-auth-token": token } }
    );
    let temp = cjob
    temp.applicants=applicants
    if (tokenRes.data) {
      await Axios.post(`http://localhost:5000/job/update/${cjob._id}`, { applicants }, {
        headers: { "x-auth-token": token }
      });
      if (tokenRes.data) {
        const jobsAll = await Axios.get("http://localhost:5000/job/", {
          headers: { "x-auth-token": token }
        });
        setJobs(jobsAll.data)
        setCjob(temp)
      }
    }
  });

  const select = async (email) => {
    let token = await localStorage.getItem("auth-token")
    let tempApplicant = cjob?.applicants.filter(ap => ap.email === email)
    tempApplicant = tempApplicant[0]
    let tempUs = users.filter(u=>u.email===tempApplicant.email)
    tempUs=tempUs[0]
    let fname = tempUs.fname
    let lname = tempUs.lname 
    tempApplicant.stage+=1
    tempApplicant.doa = new Date()
    console.log(tempApplicant)
    let cname = users.filter(u => u.email === userData.user.email)
    cname=cname[0].cname
    let applicants = cjob.applicants.filter(ap => ap.email !== email)
    applicants = [...applicants, tempApplicant]
    const tokenRes = await Axios.post(
        "http://localhost:5000/user/tokenIsValid", null, {headers: {"x-auth-token": token}}
    );
      await jobs.map( async job => {
        let updateApplicants = job.applicants.filter(ap => ap.email !== email)
        console.log("update", updateApplicants)
        if (tokenRes.data) {
          await Axios.post(`http://localhost:5000/job/update/${job._id}`, {applicants : updateApplicants}, {
              headers: {"x-auth-token": token}
          });}
      }
      )
      if (tokenRes.data) {
      await Axios.post(`http://localhost:5000/job/update/${cjob._id}`, {applicants}, {
          headers: {"x-auth-token": token}
      });
      if (tokenRes.data) {
        const jobsAll = await Axios.get("http://localhost:5000/job/", {
          headers: {"x-auth-token": token}
        });
        setJobs(jobsAll.data)
        setCjob(jobs.filter(job => job._id ===cjob._id))
        setCjob(cjob[0])
        if (tokenRes.data) {
          Axios.post("http://localhost:5000/email/send", {email: tempApplicant.email, fname, lname, job: cjob.title, cname},{
            headers: {"x-auth-token": token}
          });}
      }
    }
  }

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
      }
    });
    callData()
    console.log(userData)
  }, [])

  return (
    <Grid container component="main" className={classes.rooot} style={{ height: "100vh" }}>
      <Grid container className={classes.image} >
        <CssBaseline />
        <Grid item xs={false} sm={1} />
        <Grid item xs={12} sm={10} md={10} component={Paper} elevation={6} square style={{ height: "100%" }}>
          <div className={classes.paper}>
            <h1>My Jobs</h1>
          </div>
          <Grid container spacing={4}>
            {jobs?.filter(job => job?.remail === userData?.user?.email).map(job => {
              {/* const sortFunc =  (a, b) => {
                const rc = (j) => {
                  if (j.nrating===0)
                    return 0;
                  else
                    return (j.trating/j.nrating) 
                }
                const aname = a.fname + a.lname
                const bname = b.fname + b.lname

                if (sType === 'Applicant Name'){
                  if (soType==='Ascending'){
                    return (aname < bname)
                  }else{
                    return (bname < aname)
                  }
                }else if (sType ==='Duration'){
                  if (soType==='Ascending'){
                    return (a.duration - b.duration)
                  }else{
                    return (b.duration - a.duration)
                  }
                }else{
                  if (soType==='Ascending'){
                    return (rc(a)-rc(b))
                  }else{
                    return (rc(b)-rc(a))
                  }
                }
              } */}
              
              const handleClickOpen = () => {
                setCjob(job);
                setOpen(true);
              };

              const handleClose = () => {
                setOpen(false);
              };

              const handleClickOpen2 = () => {
                setCjob(job);
                setMaxpos(job.maxpos)
                setMaxapp(job.maxapp)
                setDod(job.dod)
                console.log("dod", job.dod)
                setOpen2(true);
              };

              const handleClose2 = () => {
                setOpen2(false);
              };

              const handleCloseAndSubmit = () => {
                sendData()
                handleClose2()
              }

              let value = 0
              if (job.nrating) value = (job.trating / job.nrating)

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
                          Salary:  $ {job.salary}
                        </Grid>

                        <Grid item xs={6}>
                          Maximum Positions: {job.maxpos}
                        </Grid>
                        <Grid item xs={6}>
                          Maximum Applicants: {job.maxapp}
                        </Grid>
                        <Grid item xs={6}>
                          Skills : |&nbsp;{job.skills.join(" | ")} |
                     </Grid>
                        <Grid item xs={6}>
                          Deadline: {(new Date(job.dod)).toLocaleString()}
                        </Grid>
                        <Grid item xs={6}>

                        </Grid>
                      </Grid>
                    </CardContent>
                    <CardActions>
                      <Button
                        onClick={handleClickOpen}
                        fullWidth
                        variant="contained"
                        className={classes.submit}
                        color="primary"
                      >
                        <span style={{ color: "white" }}> View Applicants </span>
                      </Button>
                      <Button
                        onClick={handleClickOpen2}
                        fullWidth
                        variant="contained"
                        className={classes.submit}
                        color="secondary"
                      >
                        <span style={{ color: "white" }}> Edit </span>
                      </Button>
                      <Dialog fullScreen open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
                        <DialogContent style={{ backgroundColor: "#152963" }}>
                          <DialogContentText>
                            <div className={classes.paper}>
                              <a style={{ color: "white" }}>Job Title:</a> <h1 style={{ color: "white" }}> {cjob?.title}</h1>
                            </div>
                            <Grid container spacing={2}>
                            <Grid item xs={12}>
                            <Card>
                              <CardActions />
                            </Card>
                            </Grid>
                              {
                                cjob?.applicants?.filter(ap => ap.stage != -1 && ap.stage < 2).map(ap => {
                                
                                let applicant = users.filter(user => user.email === ap.email)
                                const forShortlist = () => {
                                  shortlist(applicant.email)
                                }
                                const forReject = () => {
                                  reject(applicant.email)
                                }
                                const forSelect = () => {
                                  if (cjob?.applicants.filter(apl => apl.stage >=2).length >= cjob?.maxpos){
                                    setOpen3(true)
                                  }
                                  else{
                                    select(applicant.email)
                                  }
                                  
                                }
                                applicant = applicant[0]
                                let value = 0
                                if (applicant.nrating) value = (applicant.trating / applicant.nrating)
                                return (
                                  <Grid item xs={6}>
                                    <Card>
                                      <CardContent>
                                        <Grid container xs={12}>
                                          <Grid item xs={6}>
                                            <h4 inline>{applicant.fname} {applicant.lname}</h4>
                                          </Grid>
                                          <Grid item xs={6}>
                                            Rating: {value} ★
                                          </Grid>
                                          <Grid item xs={6}>
                                            Skills : |&nbsp;{applicant.skills.join(" | ")} |
                                          </Grid>
                                          <Grid item xs={6}>
                                            Email : {applicant.email}
                                          </Grid>
                                          <Grid item xs={12}>
                                          Date of application : {(new Date(ap.doa)).toDateString()}
                                          </Grid>
                                          <Grid item xs={12}>
                                            Eduacation : <br /> &nbsp;
                                          <Grid container spacing={2}>
                                              {applicant.education.map(ed => {
                                                let eyear = "Present"
                                                if (ed.eyear != "") eyear = ed.eyear
                                                return (
                                                  <Grid item xs={6}>
                                                    <Card>
                                                      <CardContent>
                                                        <Grid container spacing={2}>
                                                          <Grid item xs={6}>
                                                            <h5>{ed.institute}</h5>
                                                          </Grid>
                                                          <Grid item xs={6}>
                                                            {ed.syear}-{eyear}
                                                          </Grid>
                                                        </Grid>
                                                      </CardContent>
                                                    </Card>
                                                  </Grid>
                                                )
                                              })
                                              }
                                            </Grid>
                                          </Grid>
                                          <Grid item xs={12}>
                                          Statement of purpose : {ap.sop}
                                          </Grid>
                                          
                                        </Grid>
                                      </CardContent>
                                      <CardActions>
                                        {
                                          (ap.stage == 1) ?
                                            (
                                              <Button
                                                onClick={forSelect}
                                                fullWidth
                                                variant="contained"
                                                className={classes.submit}
                                                color="primary"
                                              >
                                                <span style={{ color: "white" }}> Accept </span>
                                              </Button>
                                            ) :
                                            (
                                              <Button
                                                onClick={forShortlist}
                                                fullWidth
                                                variant="contained"
                                                className={classes.submit}
                                                color=""
                                              >
                                                <span style={{ color: "black" }}> Shortlist </span>
                                              </Button>
                                            )}
                                        <Button
                                          onClick={forReject}
                                          fullWidth
                                          variant="contained"
                                          className={classes.submit}
                                          color="secondary"
                                        >
                                          <span style={{ color: "white" }}> Reject </span>
                                        </Button>
                                        <Snackbar open={open3} autoHideDuration={6000} onClose={handleClose3}>
                                          <Alert onClose={handleClose3} severity="error">
                                                    Max positions filled!
                                          </Alert>
                                        </Snackbar>
                                      </CardActions>
                                    </Card>
                                  </Grid>
                                )
                              })
                              }
                            </Grid>

                            <Grid container spacing={2}>

                            </Grid>
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions style={{ backgroundColor: "#5a1563" }}>
                        <Grid container xs={10}>
                          <Grid item xs={3}>
                          <h4 style={{ color: "white", display: "inline"}}>Sort by:</h4>
                          <Dropdown>
                                      <Dropdown.Toggle variant="warning" id="dropdown-basic" size="sm">
                                          <h3 style={{ color: "black", display: "inline"}}>{sType}</h3>
                                      </Dropdown.Toggle>

                                      <Dropdown.Menu>
                                          <Dropdown.Item onClick={()=>{setSType('Applicant Name')}}>&nbsp; Applicant Name &nbsp;</Dropdown.Item>
                                          <Dropdown.Item onClick={()=>{setSType('Date of Application')}}>&nbsp; Date of Application &nbsp;</Dropdown.Item>
                                          <Dropdown.Item onClick={()=>{setSType('Applicant Rating')}}>&nbsp; Applicant Rating &nbsp;</Dropdown.Item>
                                      </Dropdown.Menu>
                              </Dropdown>
                              
                          </Grid>
                          <Grid item xs={3}>
                          <h4 style={{ color: "white", display: "inline"}}>Sort order:</h4>
                          <Dropdown>
                                      <Dropdown.Toggle variant="success" id="dropdown-basic" size="sm">
                                          <h3 style={{ color: "white", display: "inline"}}>{soType}</h3>
                                      </Dropdown.Toggle>

                                      <Dropdown.Menu>
                                          <Dropdown.Item onClick={()=>{setSoType('Ascending')}}>&nbsp; Ascending &nbsp;</Dropdown.Item>
                                          <Dropdown.Item onClick={()=>{setSoType('Descending')}}>&nbsp; Descending &nbsp;</Dropdown.Item>
                                      </Dropdown.Menu>
                              </Dropdown>
                              
                          </Grid>
                          <Grid item xs={3} />
                          <Grid item xs={3}>

                          </Grid>
                        </Grid>
                                
                          <Button onClick={handleClose} color="secondary">
                            <span style={{ color: "red" }}> <h3 style={{
                              color: "white",
                              backgroundColor: 'red',
                              borderRadius: '8px',
                              textTransform: 'capitalize'
                            }}>&nbsp; Close  &nbsp; </h3> </span>
                          </Button>
                        </DialogActions>
                      </Dialog>
                      <Dialog open={open2} onClose={handleClose2} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">{cjob?.title}</DialogTitle>
                        <DialogContent>
                        <DialogContentText>
                        
                        </DialogContentText>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                              <TextField
                                required
                                name="maxapp"
                                variant="outlined"
                                type="number"
                                fullWidth
                                id="maxapp"
                                label="Max Applicants"
                                value={maxapp}
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
                                value={maxpos}
                                name="maxpos"
                                onChange={(e) => setMaxpos(e.target.value)}
                              />
                          </Grid>
                          <Grid item xs={12}>
                          <TextField
                            fullWidth
                            id="date"
                            variant="outlined"
                            label="Deadline"
                            type="datetime-local"
                            className={classes.textField}
                            defaultValue={job.dod.slice(0,10)}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            onChange={(e) => setDod(e.target.value)}
                          />
                          </Grid>
                        </Grid>
                                      
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleCloseAndSubmit} color="primary">
                            Save
                        </Button>
                        <Button onClick={handleClose2} color="primary">
                            Cancel
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
        <Grid item xs={false} sm={1} md={7} />
      </Grid>
    </Grid>
  );
}