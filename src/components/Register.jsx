import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import styled from "styled-components";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

export const StyledForm = styled(Form)`
  width: 360px;
  margin-left: auto;
  margin-right: auto;
`;

// Register form
const Register = () => {
  // once registration is successful, directs to questions pages
  const [isRegistered, setIsRegistered] = useState(false);

  // request field:
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const handleRegisterBtnClick = async () => {
    const url = `${BASE_URL}/auth/registration/`;
    const request = {
      username,
      email,
      password1,
      password2,
    };
    const response = await axios.post(url, request);

    // registration is successful if the sever returns the authentication key
    if (response.data.key) {
      setIsRegistered(true);
      localStorage.setItem("key", response.data.key);
    } else {
      message.error("Failed, please try again");
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword1Change = (e) => {
    setPassword1(e.target.value);
  };

  const handlePassword2Change = (e) => {
    setPassword2(e.target.value);
  };

  return (
    <StyledForm name="basic" initialValues={{ remember: true }}>
      <Form.Item
        rules={[{ required: true, message: "Please input your name!" }]}
      >
        <Input onChange={handleUsernameChange} placeholder="Username:" />
      </Form.Item>

      <Form.Item
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input onChange={handleEmailChange} placeholder="Email:" />
      </Form.Item>

      <Form.Item
        rules={[{ required: true, message: "Please enter your password!" }]}
      >
        <Input.Password
          onChange={handlePassword1Change}
          placeholder="Password:"
        />
      </Form.Item>

      <Form.Item
        rules={[{ required: true, message: "Please enter your password!" }]}
      >
        <Input.Password
          onChange={handlePassword2Change}
          placeholder="Confirm password:"
        />
      </Form.Item>

      <Form.Item>
        <Button
          style={{ width: 360 }}
          type="primary"
          htmlType="submit"
          onClick={handleRegisterBtnClick}
        >
          Register
        </Button>
      </Form.Item>
    </StyledForm>
  );
};

export default Register;
