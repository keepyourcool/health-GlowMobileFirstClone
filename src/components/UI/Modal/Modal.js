import React from 'react';
import './Modal.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary'
import Backdrop from '../Backdrop/Backdrop';
const modal = (props) => (
    <Aux>
        <Backdrop show={props.show} clicked={props.modalClosed} />
        {props.show ? <div
            className="modal"
        >
            {props.children}
        </div> : null}
    </Aux>


)
export default modal;