import React, {useState, useRef, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Snackbar from '../../components/Snackbar';
import {Redirect} from 'react-router-dom';

import {updateSnackbarData, setAuthToken, refreshTokenAtIntervals,authCheckStateAsync} from '../../store/actions';

const axios = require('axios').default;

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      estateman &nbsp;
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  validation:{
    color:'red',
    display:'inline-block',
    marginTop:0
  }
}));



export default function SignIn() {
  const tokenExpiryTime = useSelector(state=>state.tokenExpiryTime)
  const refreshTokenTimeInterval = useSelector(state=>state.refreshTokenTimeInterval)
  const authToken = useSelector(state=>state.authToken)
  const dispatch = useDispatch();
  const classes = useStyles();
  const urls = useSelector(state => state.urls);
  let [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameValidation, setUsernameValidation] = useState({status:true, msg:''});
  const [passwordValidation, setPasswordValidation] = useState({status:true, msg:''});
  const isMounted = useRef(null);


  useEffect(() => {
    // executed when component mounted
    isMounted.current = true;

    dispatch(authCheckStateAsync())  

    return () => {
      // executed when unmount
      isMounted.current = false;
    }
  }, []);


  const handleUsernameChange = event => {
    setUsername(event.target.value);
  }

  const handleUsernameValidate = event => {
    if (event.target.value === ""){
      setUsernameValidation({status:true, msg:'Username is required'});
    }else{
      setUsernameValidation({status:false, msg:''});
    }
  }

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  }

  const handlePasswordValidate = event=>{
    if (event.target.value === ""){
      setPasswordValidation({status:true, msg:'Password is required'});
    }else{
      setPasswordValidation({status:false, msg:''});
    }
  }


  const submitForm = (event)=> {
    event.preventDefault();

    

    // check form validation
    if (username !== "" && password !== "") {
      setIsFormSubmitting(true);
       
      let formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
  
      axios.post(urls.authURL, formData, {withCredentials: true})
      .then(function (response) {
          
        if(response.status === 200 && response.data.token.split(".").length === 3){
          
          const token = response.data.token;

          //store the token in localstorage
          localStorage.setItem('token', token);

          const expirationDate = new Date(new Date().getTime() + tokenExpiryTime);
          localStorage.setItem('expirationDate', expirationDate);

          dispatch(setAuthToken(token));
          dispatch(refreshTokenAtIntervals(token, urls.refreshTokenURL,tokenExpiryTime, refreshTokenTimeInterval));

        }else{
           console.log("A problem occured refreshing token");
           console.log(response);
        }
  
      })
      .catch(function (error) {
        console.log(error);
        dispatch(updateSnackbarData({ message: 'Invalid username or password', openStatus: true }));
      })
      .finally(function () {
        // always executed

        if (isMounted.current) {
          setIsFormSubmitting(false);
        }
      }); 


    }else{
      dispatch(updateSnackbarData({ message: 'Form is not complete', openStatus: true }));
    }

  }


  let authRedirect = null;
  if(authToken!==""){
    authRedirect = <Redirect to="/"/>
  }


  return (
          <Container component="main" maxWidth="xs">

            {authRedirect}

              <CssBaseline />
              <div className={classes.paper}>
                <br/>

                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon  />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <form className={classes.form} noValidate>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    // autoFocus
                    onChange={handleUsernameChange}
                    onBlur={handleUsernameValidate}
                    value={username}
                  />
                  { usernameValidation.status && <span className={classes.validation}>{usernameValidation.msg}</span>}

                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange = {handlePasswordChange}
                    onBlur={handlePasswordValidate}
                    value={password}
                  />
                  { passwordValidation.status && <span className={classes.validation}>{passwordValidation.msg}</span>}

                  <br/>
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={submitForm}
                  >
                    Sign In

                    {isFormSubmitting &&
                        <FontAwesomeIcon className="fa-spin" icon="spinner" />
                    }

                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="/signup" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              </div>
              <Box mt={8}>
                <Copyright />
              </Box>

              <Snackbar />
          </Container>
  );
}