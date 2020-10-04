import React, { Component } from "react";
import CourseDataService from "../services/CourseDataService";

const INTRUCTOR = "in28min";

class ListCoursesComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      message: null,
    };
  }

  componentDidMount() {
    this.refreshCourses();
  }

  refreshCourses = () => {
    CourseDataService.retrieveAllCourses(INTRUCTOR).then((res) => {
      this.setState({ courses: res.data });
    });
  };

  render() {
    return (
      <div className="container">
        <h3>All Courses</h3>
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {this.state.courses.map((course) => (
                <tr key={course.id}>
                  <td>{course.id}</td>
                  <td>{course.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ListCoursesComponent;
