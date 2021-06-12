import React, { useState } from "react";
import { StyledForm } from "./Register";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useHistory } from "react-router-dom";

// Login form:
const Login = () => {
  // request field:
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  // login is successfull if the sever returns the authentication key
  const onLoginClicked = async () => {
    try {
      const url = `${BASE_URL}/auth/login/`;
      const request = { username, email, password };
      const response = await axios.post(url, request);

      if (response.data.key) {
        localStorage.setItem("key", response.data.key);
        history.push("/question_lists");
      }
    } catch (err) {
      message.error("Server error, please try again later :(");
    }
  };

  return (
    <StyledForm name="basic" initialValues={{ remember: true }}>
      <Form.Item
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username:"
        />
      </Form.Item>

      <Form.Item
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email:"
        />
      </Form.Item>

      <Form.Item
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password:"
        />
      </Form.Item>

      <Form.Item>
        <Button
          style={{ width: 360 }}
          type="primary"
          htmlType="submit"
          onClick={onLoginClicked}
        >
          Login
        </Button>
      </Form.Item>
    </StyledForm>
  );
};

export default Login;
