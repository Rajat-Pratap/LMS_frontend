import React, { Component } from "react";
import EmployeeService from "../services/EmployeeService";

class EmployeeListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
    };

    this.addEmployee = this.addEmployee.bind(this);
  }

  componentDidMount() {
    EmployeeService.getEmployees().then((res) => {
      this.setState({ employees: res.data });
    });
  }

  addEmployee() {
    this.props.history.push("/add-employee/-1");
  }

  editEmployee = (id) => {
    this.props.history.push("/add-employee/" + id);
  };

  deleteEmployee = (id) => {
    EmployeeService.deleteEmployee(id).then((res) => {
      this.setState({
        employees: this.state.employees.filter(
          (employee) => employee.id !== id
        ),
      });
    });
  };

  viewEmployee = (id) => {
    this.props.history.push("/view-employee/" + id);
  };

  render() {
    return (
      <div className="main container">
        <h2 className="text-center">Employee List</h2>
        <div className="row">
          <button className="btn btn-primary" onClick={this.addEmployee}>
            Add Employee
          </button>
        </div>
        <div className="row">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Employee First Name</th>
                <th>Employee Last Name</th>
                <th>Employee Email Id</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.email}</td>
                  <td>
                    <button
                      className="btn btn-info"
                      onClick={() => this.editEmployee(employee.id)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger"
                      style={{ marginLeft: "10px" }}
                      onClick={() => this.deleteEmployee(employee.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-warning"
                      style={{ marginLeft: "10px" }}
                      onClick={() => this.viewEmployee(employee.id)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default EmployeeListComponent;
