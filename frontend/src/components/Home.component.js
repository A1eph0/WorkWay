import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Jumbotron } from 'react-bootstrap'

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
      backgroundImage: 'url(http://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80)',
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

export default function Home() {
  const classes = useStyles();

  return (
    <Grid container component="main" className="classes,root" style={{height:"100vh"}}>
    <Grid item xs={false} sm={4} md={7} className={classes.image} />
    <Grid item xs={12} sm={10} md={5} component={Paper} elevation={6}>
      <CssBaseline />
        <div className={classes.paper} style={{height:"0%"}}>
            
        </div>
        <div className={classes.paper} style={{height:"10%"}}>
            <h5>Are you still looking for the perfect Job?
            <br/> 
            <b>No issues! </b></h5> 
        </div>
        <Jumbotron fluid>
            <Container>
                <Container>
                    <Container>
                        <h2> Find your dream job with</h2>
                        <h1 style={{color: "#1c89bb"}}>Work-Way</h1>
                    </Container>
                </Container>
            </Container>
        </Jumbotron>
        {/* <div className={classes.paper} style={{height:"30%"}}>
            <h2> Find your dream job with</h2>
            <h1 style={{color: "#1c89bb", display: "inline"}}>Work-Way</h1>
        </div> */}
        <div className={classes.paper} style={{height:"10%"}}>
            
        </div>
        <Box mt={5}>
            <Copyright />
        </Box>
        <div className={classes.paper} style={{height:"10%"}}>
            
        </div>
      </Grid>
    </Grid>
  );
}