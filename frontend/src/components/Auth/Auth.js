import './Auth.css'
import fLogo from '../../assets/auth/f-logo.png'
import gLogo from '../../assets/auth/g-logo.png'
const Auth = () => {

    return (
        <div className = "authpage">
            <div className = "auth_container">
              <form action = {`/auth/google`} >
                <button className = "sign_in_button" style ={{background: 'rgb(66,133,244)'}} type ="submit">
                  <img  className = "google_logo"  src = {gLogo} alt = "google button"/>
                  <div className = "sign_in_container">
                    <p className = "sign_in_text">Sign In</p>
                  </div>
                </button>
              </form>
              <form action = {`/auth/facebook`}>
                <button className = "sign_in_button" type = "submit">
                  <img className ="facebook_logo" src = {fLogo} alt = "facebook login button"/>
                  <div className = "sign_in_container">
                    <p className = "sign_in_text">Sign In</p>
                  </div>
                </button>
              </form>
            </div>
        </div>
    )
}

export default Auth
