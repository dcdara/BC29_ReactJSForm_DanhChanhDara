import React, { Component } from 'react';

import { connect } from 'react-redux';

class UserManagement extends Component {
  state = {
    keyword: '',
    selectedType: 'All',
  };

  renderUserList = () => {
    let data = this.props.userList.filter((ele) => {
      return (
        ele.fullName
          .toLowerCase()
          .trim()
          .indexOf(this.state.keyword.toLowerCase().trim()) !== -1
      );
    });

    if (this.state.selectedType !== 'All') {
      data = data.filter((ele) => ele.type === this.state.selectedType);
    }

    return data.map((ele, idx) => {
      const { id, username, fullName, email, phoneNumber, type } = ele;

      return (
        <tr key={id} className={`${idx % 2 === 0 && 'bg-light'}`}>
          <td>{idx + 1}</td>
          <td>{fullName}</td>
          <td>{email}</td>
          <td>{phoneNumber}</td>
          <td>
            <button
              onClick={() =>
                this.props.dispatch({
                  type: 'SET_SELECTED_USER',
                  payload: ele,
                })
              }
              className="btn btn-info mr-2"
            >
              EDIT
            </button>
            <button
              onClick={() =>
                this.props.dispatch({
                  type: 'DELETE_USER',
                  payload: ele.id,
                })
              }
              className="btn btn-danger"
            >
              DELETE
            </button>
          </td>
        </tr>
      );
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <div className="card p-0 mt-3">
        <div className="card-header font-weight-bold">USER MANAGEMENT</div>
        <div className="row mt-4 px-3 ">
          <div className="col-4">
            <div className="form-group mb-0">
              <input
                onChange={this.handleChange}
                name="keyword"
                type="text"
                placeholder="Search by full name..."
                className="form-control"
              />
            </div>
          </div>
        </div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Mã SV</th>
                <th>Họ tên</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{this.renderUserList()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.userReducer,
  };
};

export default connect(mapStateToProps)(UserManagement);
