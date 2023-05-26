import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  };

  const loginDemoUser = (user) => {
    dispatch(login(user, "password"));
    closeModal();
  };

  return (
    <div className='login-modal'>
      <h1>Log In</h1>
      <form className='login-form' onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li className='form-errors' key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder='Email'
          />
        </label>
        <label>
          <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder='Password'
          />
        </label>
        <div className='form-modal-buttons'>
          <button
            className='form-modal-button login foodie-big-button'
            type="submit">Log In
          </button>
          <button
            className="form-modal-button demo foodie-big-button"
            onClick={() => loginDemoUser("demo@aa.io")}
            >Demo User
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
