import './App.css';
import {useState} from 'react'; 
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import SneakersPage from './pages/SneakersPage/SneakersPage'
import SneakerPage from './pages/SneakerPage/SneakerPage'
import CartPage from './pages/CartPage/CartPage'
import Navbar from './components/Navbar/Navbar'
import Backdrop from './components/Backdrop/Backdrop';
import SideDrawer from './components/SideDrawer/SideDrawer';
import HomePage from './pages/HomePage/HomePage';
import AccountPage from './pages/AccountPage/AccountPage';
import SuccessPage from './pages/SuccessPage/SuccessPage';
import Footer from './components/Footer/Footer';
function App() {

  const [sideToggle, setSideToggle] = useState(false)

  return (
    <Router>
      <Navbar click = {()=> {setSideToggle(true)}}/>
      <SideDrawer show = {sideToggle} click = {() => {setSideToggle(false)}} />
      <Backdrop show = {sideToggle} click = {()=> setSideToggle(false)}/>
      <main>
        <Switch>
          <Route exact path = "/" component = {HomePage} />
          <Route exact path ="/shop/:brand"  component = {SneakersPage}/>
          <Route exact path ="/sneaker/:id" component = {SneakerPage}/>
          <Route exact path ="/cart" component = {CartPage}/>
          <Route exact path = "/account" component = {AccountPage}/>
          <Route path = "/success/:session_id" component = {SuccessPage}/>
        </Switch>
      </main>
      {/* <Footer/> */}
  </Router>
  );
}

export default App;
