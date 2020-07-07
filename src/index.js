import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles';

import App from './app'
import SignIn from './components/Auth/SignIn'
import SignUp from './components/Auth/SignUp'

import { Provider } from 'react-redux'
import {store} from './store'

import {theme} from './theme'

// Log the initial state
// console.log(store.getState())
// const unsubscribe = store.subscribe(() => console.log(store.getState()))

ReactDOM.render(

  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>

        <Switch>
          <Route path="/signin" exact component={SignIn} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/" exact component={App} />
          

          {/* Catch Error 404 */}
          <Route component={NoMatch} />
        </Switch>

      </BrowserRouter>
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