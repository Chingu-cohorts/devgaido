import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

const { toggleModal, } = actions;

const Modal = () => (
  <div className="modal" style={{ position: `fixed`, backgroundColor: 'rgba(0,0,0,0.8)', top: 0, left: 0, height:'100%', width: '100%', display:'flex' }}>
    <div className="modal-container" 
    style={{ backgroundColor:'#fff',border:'1px solid #000', width:'50vw', maxWidth:'400px', margin: 'auto', padding:20,  borderRadius:5 }}>
      <p> I love all cats</p>
      <button onClick={() => toggleModal()}>Close Modal</button>
    </div>
  </div>
);
 
export default connect()(Modal);
