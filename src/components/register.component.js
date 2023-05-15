import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import { withRouter } from '../common/with-router';
import {Alert, Button} from "react-bootstrap";

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      successful: false,
      errorMessage: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      errorMessage: undefined
    });

      AuthService.register(
        this.state.username,
        this.state.email,
        this.state.password
      ).then(
        () => {
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
    const {errorMessage} = this.state
    return (
      <div className="col-md-12 d-flex justify-content-center align-items-center ">
        <div className="card card-container bg-light p-3 align-items-center" >
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="card-img-top rounded-circle mb-2 w-50"
          />
          <Form
            onSubmit={this.handleRegister}
          >
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control type="text"
                            placeholder="Enter username"
                            onChange={this.onChangeUsername}
                            required/>
            </Form.Group>
            <Form.Group>
              <Form.Label>E-mail</Form.Label>
              <Form.Control type="email"
                            placeholder="Enter e-mail"
                            onChange={this.onChangeEmail}
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
export default withRouter(Register);