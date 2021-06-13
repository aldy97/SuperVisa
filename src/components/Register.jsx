import React, { useState } from "react";
import { useHistory } from "react-router";
import { Form, Input, Button, message } from "antd";
import styled from "styled-components";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { connect } from "react-redux";
import { SWITCH_USER_STATUS } from "../actions/QuestionAction";

export const StyledForm = styled(Form)`
  width: 360px;
  margin-left: auto;
  margin-right: auto;
`;

// Register form
const Register = (props) => {
  const { setIsLogin } = props;

  // request field:
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const history = useHistory();

  const handleRegisterBtnClick = async () => {
    try {
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
        localStorage.setItem("key", response.data.key);
        history.push("/question_lists");
        setIsLogin();
      }
    } catch (err) {
      const errorObject = err.response.data;
      const keys = Object.keys(errorObject);
      for (let i = 0; i < keys.length; i++) {
        message.error(`${keys[i]}: ${errorObject[keys[i]]}`);
      }
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

const mapDispatchToProps = (dispatch) => {
  return {
    setIsLogin() {
      const action = { type: SWITCH_USER_STATUS, isLogin: true };
      dispatch(action);
    },
  };
};

export default connect(null, mapDispatchToProps)(Register);
