import { Button, FormGroup, InputGroup, TextArea } from '@blueprintjs/core';
import * as React from 'react';
import { connect } from 'react-redux';
import { postFormData } from '../actions/actionCreators';
import FormToaster from './Toaster';

interface FormState {
  [key: string]: any;
  name: string;
  email: string;
  message: string;
  nameValid: boolean;
  emailValid: boolean;
  messageValid: boolean;
}

interface FormProps {
  postFormData: (data: any) => void;
}

const mapStateToProps = (store: any) => {
  return store;
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    postFormData: (data: any) => dispatch(postFormData(data))
  };
};

export function validEmail(email: string) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

class Form extends React.Component<FormProps, FormState> {
  constructor(props: any) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: '',
      nameValid: true,
      emailValid: true,
      messageValid: true
    };
  }

  public handleInput = (e: any) => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };

  public handleSubmit = (e: any) => {
    e.preventDefault();
    this.handleErrors();
  };

  public handleErrors() {
    const { name, email, message } = this.state;
    const errors = {
      name: false,
      email: false,
      message: false
    };
    if (name.trim().length === 0) {
      errors.name = true;
    }
    if (!validEmail(email)) {
      errors.email = true;
    }
    if (message.trim().length === 0) {
      errors.message = true;
    }
    this.setState(
      {
        nameValid: !errors.name,
        emailValid: !errors.email,
        messageValid: !errors.message
      },
      () => {
        const hasErrors =
          Object.keys(errors).filter(key => errors[key] === true).length > 0;
        if (!hasErrors) {
          this.props.postFormData({ name, email, message });
          this.resetForm();
          this.showToaster();
        }
      }
    );
  }

  public resetForm = () => {
    this.setState({
      name: '',
      email: '',
      message: ''
    });
  };

  public showToaster = () => {
    FormToaster.show({
      message: `Thanks for your message. We'll get back to you as soon as we can.`,
      intent: 'success',
      timeout: 7500
    });
  };

  public render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup label="Name" labelFor="name">
          <InputGroup
            id="name"
            placeholder="Name"
            value={this.state.name}
            onChange={this.handleInput}
            autoFocus={true}
          />
          {!this.state.nameValid && (
            <div className="error">Please enter your name</div>
          )}
        </FormGroup>
        <FormGroup label="Email" labelFor="email">
          <InputGroup
            id="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleInput}
          />
          {!this.state.emailValid && (
            <div className="error">Please enter a valid email</div>
          )}
        </FormGroup>
        <FormGroup label="Message" labelFor="message">
          <TextArea
            id="message"
            placeholder="Message"
            value={this.state.message}
            onChange={this.handleInput}
          />
          {!this.state.messageValid && (
            <div className="error">Please enter a message</div>
          )}
        </FormGroup>
        <Button intent="primary" type="submit">
          Submit
        </Button>
      </form>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);
