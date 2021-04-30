import React from 'react';
import PropTypes from 'prop-types';

function Keg(props) {
  return (
    <>
      <div onClick={() => props.whenKegClicked(props.id)}>
        <hr/>
        <h3>{props.name}</h3>
        <h4>{props.brand}</h4>
        <p>Price: ${props.price}</p>
        <p>ABV: {props.alcoholContent}%</p>
      </div>
    </>
  );
}

Keg.propTypes = {
  name: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  price: PropTypes.string,
  alcoholContent: PropTypes.string,
  id: PropTypes.string,
  whenKegClicked: PropTypes.func
};

export default Keg;
