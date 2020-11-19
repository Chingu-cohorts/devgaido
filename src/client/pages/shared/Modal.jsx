import React from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';
const { toggleModal } = actions;

const messages = [
  'Next stop Mars!!',
  'You are a star, you are a star, you are a super-star!!',
  'Uuuh you are just warming up!!',
  'Now this is what I call madskillz!!',
  'You are so H-O-T!!',
  'Are you Dan Abramov??',
  'Google I am coming!!',
  'Kim is that you training??',
  'Next stop Hackathon!!'
]

const getRandomMessage = () => messages[Math.floor(Math.random() * messages.length)];

const Modal = () => (
  <div className="modal" >
    <div className="modal-container">
      <p style={{fontSize:20, color:'red'}}> { getRandomMessage() }</p>
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
