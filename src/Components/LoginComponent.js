import React, { Component } from "react";
import { Button, Label, Col, Row, input } from "reactstrap";

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleLogin = () => {
    alert("Login successful");
    //POST REQUEST TO BACKEND
    //AFTER THAT
    this.props.history.push("/home");
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col col-md-9">
            <form>
              <Row className="form-group">
                <Label md={2}>Email id</Label>
                <Col md={10}>
                  <input
                    type="email"
                    required
                    className="form-control"
                    placeholder="email id"
                    onChange={(e) => this.setState({ email: e.target.value })}
                    value={this.state.email}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label md={2}>Password</Label>
                <Col md={10}>
                  <input
                    placeholder="Password"
                    type="password"
                    required
                    onChange={(e) => {
                      this.setState({ password: e.target.value });
                    }}
                    value={this.state.password}
                    className="form-control"
                  />
                </Col>
              </Row>
              <div className="form-button">
                <Button
                  type="submit"
                  onClick={() => this.handleLogin()}
                  style={{ backgroundColor: "#512DA8" }}
                >
                  Login
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginComponent;
