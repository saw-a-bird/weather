import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const Modal = ({ show, onClose, children, title }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <StyledModalOverlay>
      <StyledModal>
        <StyledModalHeader>
          <a href="#" onClick={handleCloseClick}>
            x
          </a>
        </StyledModalHeader>
        {title && <StyledModalTitle>{title}</StyledModalTitle>}
        {children}
      </StyledModal>
    </StyledModalOverlay>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
};


const StyledModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 20px;
  position: absolute;
    right: 18px;
    top: 5px
`;

const StyledModal = styled.div`
position: relative;
  background: #F2F2F2;
  width: 350px;
  height: fit-content;
  border-radius: 15px;
  padding: 20px;
`;
const StyledModalOverlay = styled.div`
  z-index: 100;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: right;
  align-items: right;
`;

export default Modal;