import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import { thunkSignup } from "../../redux/session";
import "./SignupFormModal.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const { closeModal } = useModal();

  if (sessionUser) closeModal();

  useEffect(() => {
    const errors = {};
    const emailValidate = email.split('@')
    if (!firstName.length) errors.firstName = "First name is required"
    if (firstName.length < 2) errors.firstName = "Must be 2 or more characters"
    if (firstName.length > 40) errors.firstName = "First Name is too long!"
    if (!lastName.length) errors.lastName = "Last name is required"
    if (lastName.length < 2) errors.lastName = "Must be 2 or more characters"
    if (lastName.length > 40) errors.lastName = "Last Name is too long!"
    if (!email.length) errors.email = "Email is required"
    if (email.length < 3) errors.email = "Must be greater than 3"
    if (email.length > 255) errors.email = "Email is too long!"
    if (emailValidate.length < 2) errors.email = "Must be a valid email"
    if (!username.length) errors.username = "Username name is required"
    if (username.length < 5) errors.username = "Must be 5 or more characters"
    if (password.length < 8) errors.password = "Password must be at least 8 or more characters"
    if (password.length > 255) errors.password = "Password is too long!"
    if (password !== confirmPassword) errors.password = "Confirm Password field must be the same as the Password field"


    setErrors(errors)
}, [firstName, lastName, email, username, password, confirmPassword])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true)
    // if (password !== confirmPassword) {
    //   return setErrors({
    //     confirmPassword:
    //       "Confirm Password field must be the same as the Password field",
    //   });
    // }
    if (Object.values(errors).length) return;

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        first_name: firstName,
        last_name: lastName,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");
      closeModal();

    }
  };

  return (
    <div className="signup-page-modal">
      <h1>Sign Up</h1>
      {errors.server && <p>{errors.server}</p>}
      <form id="signup-form-modal" onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <div className="form-errors-modal">
          {hasSubmitted && errors.email && <p>{errors.email}</p>}
        </div>
          <label>
            First Name
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              />
          </label>
          <div className="form-errors-modal">
            {hasSubmitted && errors.firstName && <p>{errors.firstName}</p>}
          </div>
          <label>
            Last Name
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              />
          </label>
          <div className="form-errors-modal">
            {hasSubmitted && errors.lastName && <p>{errors.lastName}</p>}
          </div>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <div className="form-errors-modal">
          {hasSubmitted && errors.username && <p>{errors.username}</p>}
        </div>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              />
          </label>
          <label>
            Confirm Password
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              />
          </label>
          <div className="form-errors-modal">
            {hasSubmitted && errors.password && <p>{errors.password}</p>}
            {hasSubmitted && errors.confirmPassword && <p>{errors.confirmPassword}</p>}
          </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
