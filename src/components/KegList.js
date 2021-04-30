import React from 'react';
import Keg from './Keg';
import PropTypes from 'prop-types';

function KegList(props) {
  const kegListSorted = props.kegList.sort((a, b) => (a.name > b.name) ? 1 : -1)
  return (
    <>
      {kegListSorted.map((keg) =>
        <Keg 
          whenKegClicked={props.onKegSelection}
          name={keg.name}
          brand={keg.brand}
          price={keg.price}
          alcoholContent={keg.alcoholContent}
          pintCount={keg.pintCount}
          id={keg.id}
          key={keg.id}
        />
      )}
    </>
  );
}

KegList.propTypes = {
  kegList: PropTypes.array,
  onKegSelection: PropTypes.func
};

export default KegList;
