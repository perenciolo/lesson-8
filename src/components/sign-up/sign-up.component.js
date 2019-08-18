import React, { Component } from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './sign-up.styles.scss';
import { signUpStart } from '../../redux/User/user.actions';

const INITIAL_STATE = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
};

class signUp extends Component {
  constructor() {
    super();

    this.state = INITIAL_STATE;
  }

  handleSubmit = async event => {
    event.preventDefault();
    const { signUpStart } = this.props;
    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("passwords don't match");
      throw new Error("passwords don't match");
    }

    // Call action.
    signUpStart({ displayName, email, password, confirmPassword });
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <div className="sign-up">
        <h2 className="title">I do not have a account</h2>
        <span>Sign up with your email and password</span>
        <form onSubmit={this.handleSubmit} className="sign-up-form">
          <FormInput
            type="text"
            onChange={this.handleChange}
            name="displayName"
            value={displayName}
            label="Name"
            required
          />
          <FormInput
            type="email"
            onChange={this.handleChange}
            name="email"
            value={email}
            label="Email"
            required
          />
          <FormInput
            type="password"
            onChange={this.handleChange}
            name="password"
            value={password}
            label="Password"
            required
          />
          <FormInput
            type="password"
            onChange={this.handleChange}
            name="confirmPassword"
            value={confirmPassword}
            label="Confirm Password"
            required
          />
          <CustomButton type="submit">Sign Up</CustomButton>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  signUpStart: payload => dispatch(signUpStart(payload))
});

export default connect(
  null,
  mapDispatchToProps
)(signUp);
