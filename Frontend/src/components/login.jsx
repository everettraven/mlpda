import React from 'react';
import { Route, Link, BrowserRouter as Router, Redirect } from 'react-router-dom';
import '../main.css';
import Axios from 'axios';
class Login extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      loggedIn: false
    }
  }

  //Handle the login by passing the information to our authorization API endpoint
  LoginSubmit = (e) => {
    e.preventDefault();
    let username = document.getElementById("email").value;
    let password = document.getElementById("pass").value;

    let url = "http://127.0.0.1:8000/api/v1/auth/";

    Axios.post(url, {'username':username, 'password':password, 'crossdomain': true})
      .then(res => {
        document.cookie = 'auth_token=' + res.data['token'];
        this.setState({loggedIn: true});
      });

  }
  render() {
    if(this.state.loggedIn){
      return <Redirect to="/"/>
    }
    return(
<div>



<div className="message-us-section">
  <p className="message-us-header">Login</p>
  <form className="message-us-form">
    <label htmlFor="email">Email</label>
    <input type="text" className="email-input" id="email" name="email"/>
    <label htmlFor="password">Password</label>
    <input type="password" className="password-input" id="pass" name="password"/>
    <input className="message-send-btn" type="submit" value="Submit" onClick={this.LoginSubmit}/>
  </form>
</div>


  <Link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"/>
  <Link rel="stylesheet" href="main.css"/>
</div>
    )
  }
}
export default Login
