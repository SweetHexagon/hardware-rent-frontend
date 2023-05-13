import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import { withRouter } from '../common/with-router';
import {Alert, Button} from "react-bootstrap";

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      error: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      errorMessage: undefined,
    });


      AuthService.login(this.state.username, this.state.password).then(
        () => {
          this.props.router.navigate("/profile");
          window.location.reload();
        },
        error => {
          const status = error.response.status;
          let resMessage = "";
            if(status === 401){
              resMessage = "invalid user";
            }else{
              resMessage = "error";
            }

          this.setState({
            errorMessage: resMessage
          });
        }
      );

  }

  render() {
    const { errorMessage } = this.state;

    return (

      <div className="col-md-12 d-flex justify-content-center align-items-center ">
        <div className="card card-container bg-light p-3 align-items-center" >
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="card-img-top rounded-circle mb-2 w-50"
          />

          <Form
            onSubmit={this.handleLogin}
            ref={c => {
              this.form = c;
            }}
          >
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control type="text"
                            placeholder="Enter username"
                            onChange={this.onChangeUsername}
                            required/>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password"
                            placeholder="Enter password"
                            onChange={this.onChangePassword}
                            required/>
            </Form.Group>
            <Button className="w-100 mb-2" variant="primary" type="submit">
              Submit
            </Button>
            {errorMessage && (<Alert variant="danger" className="text-center">{errorMessage}</Alert>)}
          </Form>

        </div>
      </div>
    );
  }
}

export default withRouter(Login);