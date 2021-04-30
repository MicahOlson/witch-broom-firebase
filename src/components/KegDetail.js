import React from 'react';
import PropTypes from 'prop-types';

function KegDetail(props) {
  const { keg, onClickingDelete } = props;
  
  function remainingPints() {
    if (keg.pintCount < 1) {
      return "Out of stock!"
    } else if (keg.pintCount < 10) {
      let suffix = "s";
      if (keg.pintCount === 1) {suffix = "" };
      return `Only ${keg.pintCount} pint${suffix} left. Drink one while you can and order another keg!`
    } else {
      return keg.pintCount
    }
  }

  return (
    <>
      <h1>Keg Detail</h1>
      <h3>{keg.name}</h3>
      <h4>{keg.brand}</h4>
      <p>Price: ${keg.price}</p>
      <p>ABV: {keg.alcoholContent}%</p>
      <p>Remaining Pints: {remainingPints()}</p>
      <button onClick={props.onClickingServe}>Serve</button>
      <button onClick={props.onClickingEdit}>Update Details</button>
      <button onClick={() => onClickingDelete(keg.id)}>Remove Keg</button>
      <hr/>
    </>
  );
}

KegDetail.propTypes = {
  keg: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func,
  onClickingServe: PropTypes.func
};

export default KegDetail;
