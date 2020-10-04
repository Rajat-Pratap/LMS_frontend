import React, { Component } from "react";

class UpdateBooksComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      category: "",
      qty: "",
    };
  }

  componentDidMount() {
    if (this.props.id === -1) return;
    else {
      console.log(this.props.book);
      this.setState({
        name: this.props.book.name,
        category: this.props.book.category,
        qty: this.props.book.qty,
      });
    }
  }

  changeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  saveBook = (event) => {
    event.preventDefault();
    console.log(this.props.id);
    const { name, category, qty } = this.state;
    let book = { name, category, qty };
    if (this.props.id === -1) {
      this.props.postBook(book);
      this.props.history.push("/");
    } else {
      this.props.updateBook(book, this.props.id);
      this.props.history.push("/");
    }
  };

  cancel = () => {
    this.props.history.push("/Searchbook");
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3">
            <h3 className="text-center">Add/Update Book</h3>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label> Name</label>
                  <input
                    placeholder="Name"
                    name="name"
                    className="form-control"
                    value={this.state.name}
                    onChange={this.changeHandler}
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <input
                    placeholder="Category"
                    name="category"
                    className="form-control"
                    value={this.state.category}
                    onChange={this.changeHandler}
                  />
                </div>
                <div className="form-group">
                  <label>Quantity</label>
                  <input
                    placeholder="Quantity"
                    name="qty"
                    className="form-control"
                    value={this.state.qty}
                    onChange={this.changeHandler}
                  />
                </div>
                <button className="btn btn-success" onClick={this.saveBook}>
                  Save
                </button>
                <button
                  className="btn btn-danger"
                  onClick={this.cancel.bind(this)}
                  style={{ marginLeft: "10px" }}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateBooksComponent;
