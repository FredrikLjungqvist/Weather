import React, { CSSProperties} from 'react'
import  ReactDOM  from 'react-dom'
import ModalCard from './ModalCard'

const backdropStyle: CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100vh",
  zIndex: 100,
  background: "rgba(0, 0, 0, 0.75)"
}

interface Props {
  onClose: () => void;
}

const ModalBackdrop = (props:Props) => {
  return <div onClick={props.onClose} style={backdropStyle} />;
};

const IconModal = (props:Props) => {

  return (
    <>
    {ReactDOM.createPortal(
      <ModalBackdrop onClose={props.onClose} />,
      document.getElementById('backdrop') as HTMLElement
    )}
      {ReactDOM.createPortal(
        <ModalCard />,
        document.getElementById('modal') as HTMLElement
      )}
    </>
  )
}

export default IconModal
