
import * as React from 'react';

export interface ModalProps {
    children?: React.ReactChild;
    title: string;
    onClose: Function;
}

export const Modal = (props: ModalProps) => {
    return <div className="modal">
        <div className="modal__background"></div>
        <div className="modal__content">
            <div className="modal__close"><span onClick={() => props.onClose()}>X</span></div>
            <div className="modal__title">
                <h3>{props.title}</h3>
            </div>
            <div className="modal__inner-content">
                {props.children}
            </div>
        </div>
    </div>
}

export default Modal;
