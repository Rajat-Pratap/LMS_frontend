import React, { Component } from "react";
import { Row, Col, Label, Button } from "reactstrap";
import Header from "./Header";
import { Control, Form, Errors } from "react-redux-form";
import axios from "axios";

const required = (val) => val && val.length;

const validEmail = (val) =>
  /^([a-zA-Z0-9_\.\-]+)@([a-zA-Z0-9\.\-]+)\.([a-zA-Z]{2-5})$/i.test(val);
const createBasicAuthToken = (username, password) => {
  console.log("in then block" + username + password);
  console.log(window.btoa(username + ":" + password));

  return "Basic " + window.btoa(username + ":" + password);
};

class LoginCoponent2 extends Component {
  executeBasicAuthenticationService = (username, password) => {
    console.log(createBasicAuthToken(username, password));

    axios
      .get(`http://localhost:8080/basicauth`, {
        headers: { authorization: createBasicAuthToken(username, password) },
      })
      .then((response) => {
        this.props.registerSuccessfulLogin(username, password, response.data);
        console.log("successful log in");
        this.props.history.push("/");
      })
      .catch((err) => {
        console.log(err);
        this.props.authFailed();
      });
  };

  loginClicked = (values) => {
    console.log(values);
    this.executeBasicAuthenticationService(values.email, values.password);
  };

  render() {
    return (
      <>
        <Header />
        <div className="container">
          <div className="row mt-5">
            <div className="col col-md-9">
              {this.props.authenticationFailed && (
                <p style={{ backgroundColor: "pink" }}>Bad Credentials!</p>
              )}
              <Form
                model="login"
                onSubmit={(values) => this.loginClicked(values)}
              >
                <Row className="form-group">
                  <Label md={2}>Email id</Label>
                  <Col md={10}>
                    <Control.text
                      model=".email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Email ID"
                      validators={{
                        required,
                        // validEmail,
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".email"
                      show="touched"
                      messages={{
                        required: "Required",
                        validEmail: "Invalid Email",
                      }}
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label md={2}>Password</Label>
                  <Col md={10}>
                    <Control.text
                      placeholder="Password"
                      id="password"
                      model=".password"
                      name="password"
                      className="form-control"
                      validators={{
                        required,
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".password"
                      show="touched"
                      messages={{
                        required: "Required",
                      }}
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col md={{ size: 10, offset: 2 }}>
                    <Button type="submit" color="primary">
                      Login
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default LoginCoponent2;
