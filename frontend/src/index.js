import ReactDOM from 'react-dom';
import App from './App';
import './index.css'
import {Provider} from 'react-redux'
import store from './redux/store'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 4000,
  offset: '30px',
  transition: transitions.SCALE
}


const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY)

ReactDOM.render(
  <Provider store={store}>
  
  <Elements stripe = {stripePromise} >
    <AlertProvider template = {AlertTemplate} {...options}>
    <App />
    </AlertProvider>
    </Elements>
  </Provider>,
  document.getElementById('root')
);

