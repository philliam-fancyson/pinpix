import { useState } from "react";
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

  if (sessionUser) return <Navigate to="/" replace={true} />;

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
          <span className="floating-label">Email</span>
        </label>
      </div>
      {errors.email && <p>{errors.email}</p>}
      <div className="input-box">
        <label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
            />
          <span className="floating-label">Password</span>
        </label>
      </div>
      {errors.password && <p>{errors.password}</p>}
      <button type="submit">Log In</button>
      <button className="modal-button" id="demo-user" onClick={loginDemo}>
        Demo User
      </button>
    </form>
  </div>
  );
}

export default LoginFormModal;
