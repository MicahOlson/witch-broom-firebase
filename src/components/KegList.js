import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useFirestoreConnect , isLoaded } from 'react-redux-firebase';
import Keg from './Keg';

function KegList(props) {
  useFirestoreConnect([
    { collection: 'kegs' }
  ]);

  const kegs = useSelector(state => state.firestore.ordered.kegs);

  if (isLoaded(kegs)) {
    return (
      <>
        {kegs.map((keg) => {
          return <Keg
            whenKegClicked={props.onKegSelection}
            name={keg.name}
            brand={keg.brand}
            price={keg.price}
            alcoholContent={keg.alcoholContent}
            pintCount={keg.pintCount}
            id={keg.id}
            key={keg.id}
          />
        })}
      </>
    );
  } else {
    return (
      <>
        <h3>Loading...</h3>
      </>
    )
  }
}

KegList.propTypes = {
  onKegSelection: PropTypes.func
};

export default KegList;
