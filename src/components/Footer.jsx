import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.div`
  width: 100%;
  padding-top: 16px;
  padding-bottom: 16px;
  position: fixed;
  bottom: 0;
  text-align: center;
  background-color: rgb(0, 97, 233);
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <div style={{ color: "#f0f8ff" }}>support@supervisas.com</div>
      <div style={{ color: "#f0f8ff" }}>
        Copyright © 2021 SuperVisas, all rights reserved.
      </div>
    </FooterWrapper>
  );
};

export default Footer;
