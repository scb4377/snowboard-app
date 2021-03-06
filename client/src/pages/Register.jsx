import { useState, useContext, useRef } from "react";
import { register } from "../features/auth/authSlice";
import { CartContext } from "../contexts/CartContext";
import "../css/register.css";

export const Register = () => {
  const { setRegisterShown, setLoginShown } = useContext(CartContext);

  // Set reference to form
  const domNode = useRef();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  // useEffect(() => {
  //   if (isError) {
  //     alert(message)
  //   }

  //   if (isSuccess || user) {

  //   }

  //   reset()
  // }, [user, isError, isSuccess, message])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle click outside form container
  const handleClick = (e) => {
    if (!domNode.current.contains(e.target)) {
      setRegisterShown(false);
    }
  };

  // Handle Sign In Link Click
  const handleSignInClick = () => {
    setRegisterShown(false);
    setLoginShown(true);
  };

  // Handle form submit
  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      alert("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      register(userData);
    }
  };

  // handle register exit button
  const handleExit = () => {
    setRegisterShown(false);
  };

  return (
    <div className="register-container" onClick={handleClick}>
      <div ref={domNode} className="register-form-wrapper">
        <div className="register-exit-btn" onClick={handleExit}>
          X
        </div>
        <section className="register-heading">
          <h1>Register</h1>
          <p>Please create an account</p>
        </section>

        <section className="register-form">
          <form onSubmit={onSubmit}>
            <div className="register-form-group">
              <label htmlFor="name">Name:</label>
              <input
                className="register-form-control"
                type="text"
                id="name"
                name="name"
                value={name}
                placeholder="Enter your name"
                onChange={onChange}
              ></input>
            </div>
            <div className="register-form-group">
              <label htmlFor="email">Email:</label>
              <input
                className="register-form-control"
                type="email"
                id="email"
                name="email"
                value={email}
                placeholder="Enter your email"
                onChange={onChange}
              ></input>
            </div>
            <div className="register-form-group">
              <label htmlFor="password">Password:</label>
              <input
                className="register-form-control"
                type="password"
                id="password"
                name="password"
                value={password}
                placeholder="Enter your password"
                onChange={onChange}
              ></input>
            </div>
            <div className="register-form-group">
              <label htmlFor="password2">Confirm Password:</label>
              <input
                className="register-form-control"
                type="password"
                id="password2"
                name="password2"
                value={password2}
                placeholder="Confirm password"
                onChange={onChange}
              ></input>
            </div>
            <div className="register-form-group">
              <button type="submit" className="register-btn">
                Submit
              </button>
            </div>
            <div className="register-form-group">
              <p>Already Have An Account?</p>
              <p className="sign-in-link" onClick={handleSignInClick}>
                Sign In
              </p>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};
