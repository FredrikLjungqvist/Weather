import React, { CSSProperties} from 'react'
import  ReactDOM  from 'react-dom'
import ModalCard from './ModalCard'

const backdropStyle: CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100vh",
  zIndex: 10,
  background: "rgba(0, 0, 0, 0.75)"
}
const ModalBackdrop = () => {
  return <div style={backdropStyle} />;
};

const ErrorModal = () => {

  return (
    <>
    {ReactDOM.createPortal(
      <ModalBackdrop />,
      document.getElementById('backdrop') as HTMLElement
    )}
      {ReactDOM.createPortal(
        <ModalCard />,
        document.getElementById('modal') as HTMLElement
      )}
    </>
  )
}

export default ErrorModal
