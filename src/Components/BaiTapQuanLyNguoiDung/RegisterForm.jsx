import React, { Component, createRef } from 'react';

import { connect } from 'react-redux';
import { addUserAction, updateUserAction } from '../../Store/actions/user';

const DEFAULT_VALUES = {
  id: '',
  maSV: '',
  fullName: '',
  email: '',
  phoneNumber: '',

};

class RegisterForm extends Component {
  state = {
    values: DEFAULT_VALUES,
    errors: {
      id: '',
      maSV: '',
      fullName: '',
      email: '',
      phoneNumber: '',

    },
  };

  formRef = createRef();

  static getDerivedStateFromProps(nextProps, currentState) {
    if (
      nextProps.selectedUser &&
      currentState.values.id !== nextProps.selectedUser.id
    ) {
      currentState.values = nextProps.selectedUser;
    }

    return currentState;
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      values: {
        ...this.state.values,
        [name]: value,
      },
    });

  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (!event.target.checkValidity()) {
      return;
    }

    if (this.props.selectedUser) {
      this.props.dispatch(updateUserAction(this.state.values));
    } else {
      this.props.dispatch(addUserAction(this.state.values));
    }

    this.setState(
      {
        values: DEFAULT_VALUES,
      },
      () => {
        this.forceUpdate();
      }
    );
  };

  handleBlur = (event) => {
    const {
      name,
      title,
      minLength,
      maxLength,
      //   validationMessage,
      validity: { valueMissing, patternMismatch, tooLong, tooShort}
    } = event.target;

    let message = '';

    if (patternMismatch) {
      message = `${title} không đúng định dạng`;
    }
  

    if (tooShort || tooLong) {
      message = `${title} from ${minLength} - ${maxLength} characters.`;
    }

    if (valueMissing) {
      message = `Vui lòng nhập ${title}`;
    }

    this.setState({
      errors: {
        ...this.state.errors,
        [name]: message,
      },
    });
  };

  render() {
    const { maSV, fullName, email, phoneNumber} =
      this.state.values || {};

    return (
      <div className="card p-0">
        <div className="card-header bg-dark text-white font-weight-bold">
          THÔNG TIN SINH VIÊN
        </div>
        <div className="card-body">
          <form ref={this.formRef} noValidate onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label>Mã SV</label>
                  <input
                    title=" Mã sinh viên"
                    required
                    type="text"
                    name="maSV"
                    value={maSV}
                    pattern="^[0-9]+$"
                    className="form-control"
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                  />
                  {this.state.errors.maSV && (
                    <span className="text-danger">
                      {this.state.errors.maSV}
                    </span>
                  )}
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Họ tên</label>
                  <input
                    title="Họ tên"
                    required
                    minLength={4}
                    maxLength={12}
                    name="fullName"
                    value={fullName}
                    pattern={
                      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
                      "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
                      "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"
                    }
                    type="text"
                    className="form-control"
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                  />
                  {this.state.errors.fullName && (
                    <span className="text-danger">
                      {this.state.errors.fullName}
                    </span>
                  )}
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Số điện thoại</label>
                  <input
                    required
                    value={phoneNumber}
                    title="Số điện thoại"
                    name="phoneNumber"
                    pattern="^[0-9]+$"
                    type="text"
                    className="form-control"
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                  />
                  {this.state.errors.phoneNumber && (
                    <span className="text-danger">
                      {this.state.errors.phoneNumber}
                    </span>
                  )}
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    required
                    name="email"
                    title="Email"
                    value={email}
                    type="text"
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.]{1}[a-zA-Z]{2,}$"
                    className="form-control"
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                  />
                  {this.state.errors.email && (
                    <span className="text-danger">
                      {this.state.errors.email}
                    </span>
                  )}
                </div>
              </div>
              
            </div>
            <button
              disabled={!this.formRef.current?.checkValidity()}
              className="btn btn-success mr-2"
            >
              Thêm sinh viên
            </button>
            
          </form>
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

export default connect(mapStateToProps)(RegisterForm);
