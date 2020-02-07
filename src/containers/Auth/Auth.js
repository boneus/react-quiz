import React, {Component} from 'react'
import is from 'is_js'
import classes from './Auth.module.css'
import Button from "../../components/UI/Button/Button"
import Input from "../../components/UI/Input/Input"

// function validateEmail(email) {
//   const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   return re.test(String(email).toLowerCase());
// }

class Auth extends Component {

  state = {
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Введите корректный email',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Пароль',
        errorMessage: 'Введите корректный пароль',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6
        }
      }
    }
  }

  loginHandler = () => {

  }

  registerHandler = () => {

  }

  submitHandler = event => {
    event.preventDefault()
  }

  validateControl(value, validation) {
    if (!validation) {
      return true
    }

    let isValid = true

    if (validation.required) {
      isValid = value.trim() !== '' && isValid
    }

    if (validation.email) {
      isValid = is.email(value) && isValid
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid
    }

    return isValid
  }

  onChangeHandler = (event, controlName) => {
    // console.log(`${controlName}: `, event.target.value)

    const formControls = {...this.state.formControls}
    formControls[controlName] = {
      ...formControls[controlName],
      value: event.target.value,
      touched: true,
      valid: this.validateControl(event.target.value, formControls[controlName].validation)
    }

    this.setState({
      formControls
    })
  }

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName]
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={event => this.onChangeHandler(event, controlName)}
        />
      )
    })
  }

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Авторизация</h1>

          <form action="" onSubmit={this.submitHandler} className={classes.AuthForm}>

            {/*<Input label="Email" />*/}

            {/*<Input*/}
            {/*  label="Пароль"*/}
            {/*  errorMessage="TEST"*/}
            {/*/>*/}
            {this.renderInputs()}

            <Button
              type="success"
              onClick={this.loginHandler}
            >
              Войти
            </Button>
            <Button
              type="primary"
              onClick={this.registerHandler}
            >
              Зарегистрироваться
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default Auth