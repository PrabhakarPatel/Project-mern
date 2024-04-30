import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
const Auth = () => {
  return (
    <div className="auth">
      <Login />
      <Register />
    </div>
  );
};

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/login", {
        username,
        password,
      });
      console.log(res.data.token);
      setCookies("access_token", res.data.token);
      localStorage.setItem("userID", res.data.userID);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Form
      username={username}
      password={password}
      setPassword={setPassword}
      setUserName={setUserName}
      label="Login"
      onSubmit={onSubmit}
    />
  );
};

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/auth/register", {
        username,
        password,
      });
      alert("succcessfully registered now you can login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Form
      username={username}
      password={password}
      setPassword={setPassword}
      setUserName={setUsername}
      label="Register"
      onSubmit={onSubmit}
    />
  );
};

const Form = ({
  username,
  password,
  setPassword,
  setUserName,
  label,
  onSubmit,
}) => {
  return (
    <div className="auth-conatiner">
      <form onSubmit={onSubmit}>
        <h2> {label}</h2>
        <div className="form-group">
          <label htmlFor="username">UserName: </label>
          <input
            type="text"
            placeholder="Enter your User name"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">{label}</button>
      </form>
    </div>
  );
};

export default Auth;
