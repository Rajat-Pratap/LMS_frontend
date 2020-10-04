import React, { Component } from "react";
import EmployeeService from "../services/EmployeeService";

class EmployeeViewComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      employee: {},
    };
  }

  componentDidMount() {
    EmployeeService.getEmployeeById(this.state.id).then((res) => {
      this.setState({ employee: res.data });
    });
  }

  render() {
    return (
      <div>
        <div className="card col-md-6 offset-md-3">
          <h3 className="text-center">View Employee</h3>
          <div className="card-body">
            <div className="row">
              <h5>Employee First Name:</h5>
              <div style={{ paddingLeft: "40px" }}>
                {this.state.employee.firstName}
              </div>
            </div>

            <div className="row">
              <h5>Employee Last Name:</h5>
              <div style={{ paddingLeft: "40px" }}>
                {this.state.employee.lastName}
              </div>
            </div>

            <div className="row">
              <h5>Employee Email Id:</h5>
              <div style={{ paddingLeft: "40px" }}>
                {this.state.employee.email}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EmployeeViewComponent;
