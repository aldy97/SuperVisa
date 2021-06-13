import React from "react";
import { PageHeader } from "antd";
import { useSelector } from "react-redux";
import { Button } from "antd";

const Header = () => {
  const { isLogin } = useSelector((state) => {
    return { isLogin: state.QuestionReducer.isLogin };
  });

  const onLogoutButtonClick = () => {
    localStorage.setItem("key", "");
    window.location.href = "/";
  };

  return (
    <PageHeader
      title={<div>SuperVisas</div>}
      subTitle={
        <span>Making Visa Applications Simple, Affordable, and Fast</span>
      }
      extra={
        isLogin && (
          <Button type="default" onClick={onLogoutButtonClick}>
            Log out
          </Button>
        )
      }
    ></PageHeader>
  );
};

export default Header;
