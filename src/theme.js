// App theme. Material-UI
import { createMuiTheme } from '@material-ui/core/styles';
import { yellow } from '@material-ui/core/colors'


// Font awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faHome, faSearch, faList, faEnvelope, 
        faArrowLeft, faArrowRight, faArrowDown, 
        faArrowUp, faSpinner,faUserCheck, faUserSlash } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faHome, faSearch, faList, 
            faEnvelope, faArrowLeft, faArrowRight, faArrowDown, 
            faArrowUp, faSpinner,faUserCheck, faUserSlash)


// configure app theme for material ui
export const theme = createMuiTheme({
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