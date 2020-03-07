import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter,HashRouter, Route, Switch} from 'react-router-dom'
import App from './app'
import SignIn from './components/Auth/SignIn'
import SignUp from './components/Auth/SignUp'


// IMPLEMENTING REDUX //
import { Provider } from 'react-redux'
import {store} from './store'


// Font awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faHome, faSearch, faList, faEnvelope, 
        faArrowLeft, faArrowRight, faArrowDown, faArrowUp, faSpinner,faUserCheck, faUserSlash } from '@fortawesome/free-solid-svg-icons'


// App theme. Material-UI
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { yellow } from '@material-ui/core/colors'


// configure font awesome icons
library.add(fab, faHome, faSearch, faList, faEnvelope, faArrowLeft, faArrowRight, faArrowDown, faArrowUp, faSpinner,faUserCheck, faUserSlash)


// configure app theme
const theme = createMuiTheme({
  palette: {
    primary: {main:"#2f4f4f"},
    secondary: yellow,
  },
  typography: {
    subtitle1: {
      fontWeight: 500,
      fontSize:'14px',
      fontFamily:'Roboto, sans-serif',
      color: 'rgba(0,0,0,.87)',
      margin:'0',
      padding:'0'
    },
    subtitle2:{
      fontWeight: 400,
    },
    body2:{
      fontWeight: 400
    }
  }
});



// Log the initial state
// console.log(store.getState())
// const unsubscribe = store.subscribe(() => console.log(store.getState()))
// END IMPLEMENTING REDUX //



ReactDOM.render(

  <Provider store={store}>
    <ThemeProvider theme={theme}>
    <HashRouter>

      <Switch>
        <Route path="/signin" exact component={SignIn} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/" exact component={App} />
        

        {/* Catch Error 404 */}
        <Route component={NoMatch} />
      </Switch>

    </HashRouter>
    </ThemeProvider>
  </Provider>
  ,
  document.getElementById('root')
)


// Error 404 Component
function NoMatch({ location }) {
  return (
    <div>
      <h3>
        Oops, Page not found
      </h3>
    </div>
  );
}