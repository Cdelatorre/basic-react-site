import { useState } from "react";
import Button from "../../components/button/button";
import Input from "../../components/input/input";

const Login = ({ onSubmit }) => {
  const [user, setUser] = useState({ email: '', password: '', username: '' })
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const errors = {}

    if (!user.email) {
      errors.email = 'Email is required'
    }

    if (!user.username) {
      errors.username = 'Username is required'
    }

    if (!user.password) {
      errors.password = 'Password is required'
    }

    return errors
  }

  const handleOnSubmit = (ev) => {
    ev.preventDefault() // esto es por que por defecto el form de html trata de hacer un get, nosotros no queremos eso, asi que prevenimos esta acción por defecto

    const validationErrors = validateForm()
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length) return

    onSubmit()
  }

  const handleOnChange = (ev) => {
    const value = ev.target.value;
    const name = ev.target.name;

    setUser((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  return (
    <form >
      <div className="mb-3">
        <Input
          placeholder="Enter email"
          textLabel="Email address"
          value={user.email}
          name="email"
          onChange={handleOnChange}
          type="email"
          error={errors.email}
        />
      </div>
      <div className="mb-3">
        <Input
          placeholder="Enter username"
          textLabel="Username"
          value={user.username}
          name="username"
          onChange={handleOnChange}
          type="text"
          error={errors.username}
        />
      </div>
      <div className="mb-3">
        <Input
          placeholder="Enter password"
          textLabel="Password"
          value={user.password}
          name="password"
          onChange={handleOnChange}
          type="password"
          error={errors.password}
        />
      </div>
      <Button action={handleOnSubmit} role="submit" type="dark">
        Submit
      </Button>
    </form>
  );
};

export default Login;
