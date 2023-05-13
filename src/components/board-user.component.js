import React, { Component } from "react";

import CategoryService from "../services/categories.service";
import Form from 'react-bootstrap/Form';
import {Alert, Button} from "react-bootstrap";
import AuthService from "../services/auth.service";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);



    this.state = {
      content: "",
      errorMessage: undefined
    };
  }
  handleSubmit(e) {
    e.preventDefault();

    this.setState({
      errorMessage: undefined
    });

  }


  render() {
    const { content, errorMessage } = this.state;
    return (
      <div className="container">

      </div>
    );
  }
}