import { useState, useEffect } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  useEffect(() => {
    const errors = {}
    if (email.length > 255) errors.email = "Invalid Email"
    if (password.length > 255) errors.password = "Invalid Password"

    setErrors(errors)
  },[email, password])

  const loginDemo = (e) => {
    e.preventDefault();
    dispatch(thunkLogin({ email: "demo@aa.io", password: "password" }));
    navigate("/");
    closeModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  if (sessionUser) return <Navigate to="/" replace={true} />;

  return (
    <div className="landing-page-container">
    <h1>Log In</h1>
    {errors.length > 0 &&
      errors.map((message) => <p key={message}>{message}</p>)}
    <form id="login-form" onSubmit={handleSubmit}>
      <div className="input-box">
        <label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
            />
          <span className="floating-label">
            <p>Email</p>
            </span>
        </label>
      </div>
      <div className="form-errors-login">{errors.email && <p>{errors.email}</p>}</div>
      <div className="input-box">
        <label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
            />
            <span className="floating-label">
              <p>Password</p>
            </span>
        </label>
      </div>
      <div className="form-errors-login">{errors.password && <p>{errors.password}</p>}</div>
      <button type="submit">Log In</button>
      <button className="modal-button" id="demo-user" onClick={loginDemo}>
        Demo User
      </button>
    </form>
  </div>
  );
}

export default LoginFormModal;
