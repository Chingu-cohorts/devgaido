import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

const { toggleModal } = actions;

const Modal = () => (
  <div className="modal" >
    <div className="modal-container">
      <p> I love all cats</p>
      <div className="rating" style={{fontSize: 32}}>
        <span onClick={() => {
          console.log("5")
        }}>☆</span>
        <span onClick={() => {
          console.log("4")
        }}>☆</span>
        <span>☆</span>
        <span>☆</span>
        <span>☆</span>
      </div>
      <button onClick={() => toggleModal()}>Close Modal</button>
    </div>
  </div>
);
 
export default connect()(Modal);
