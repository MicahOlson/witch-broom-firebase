import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isLoaded, withFirestore } from 'react-redux-firebase';
import * as a from './../actions';
import EditKegForm from './EditKegForm';
import KegDetail from './KegDetail';
import KegList from './KegList';
import NewKegForm from './NewKegForm';

function KegControl(props) {
  const handleClick = () => {
    const { dispatch } = props;
    if (props.selectedKeg != null) {
      const setEditAction = a.setEditing(false);
      dispatch(setEditAction);
      const nullSelectedAction = a.nullSelected();
      dispatch(nullSelectedAction);
    } else {
      const toggleFormAction = a.toggleForm();
      dispatch(toggleFormAction);
    }
  };

  const handleAddingNewKegToList = () => {
    const { dispatch } = props;
    const toggleFormAction = a.toggleForm();
    dispatch(toggleFormAction);
  };

  const handleChangingSelectedKeg = (id) => {
    props.firestore.get({ collection: 'kegs', doc: id })
      .then((keg) => {
        const firestoreKeg = {
          name: keg.get("name"),
          brand: keg.get("brand"),
          price: keg.get("price"),
          alcoholContent: keg.get("alcoholContent"),
          pintCount: keg.get("pintCount"),
          id: keg.id
        }
        const { dispatch } = props;
        const setSelectedAction = a.setSelected(firestoreKeg);
        dispatch(setSelectedAction);
      });
  };

  const handleDeletingKeg = (id) => {
    props.firestore.delete({ collection: 'kegs', doc: id })
    const { dispatch } = props;
    const nullSelectedAction = a.nullSelected();
    dispatch(nullSelectedAction);
  };

  const handleEditClick = () => {
    const { dispatch } = props;
    const action = a.setEditing(true);
    dispatch(action);
  };

  const handleEditingKegInList = () => {
    const { dispatch } = props;
    const setEditAction = a.setEditing(false);
    dispatch(setEditAction);
    const nullSelectedAction = a.nullSelected();
    dispatch(nullSelectedAction);
  };

  const handleServeClick = () => {
    const selectedKeg = props.selectedKeg;
    const servedKeg = Object.assign({}, selectedKeg, { pintCount: selectedKeg.pintCount - 1 });
    props.firestore.update({ collection: 'kegs', doc: selectedKeg.id }, servedKeg)
    const { dispatch } = props;
    const setSelectedAction = a.setSelected(servedKeg);
    dispatch(setSelectedAction);
  };

  const auth = props.firebase.auth();
  if (!isLoaded(auth)) {
    return (
      <>
        <p>Loading...</p>
      </>
    )
  }
  if ((isLoaded(auth)) && (auth.currentUser == null)) {
    return (
      <>
        <p>You must be signed in to access the keg list.</p>
      </>
    )
  }
  if ((isLoaded(auth)) && (auth.currentUser != null)) {
    let currentlyVisibleState = null;
    let buttonText = null;
    if (props.editing) {
      currentlyVisibleState =
        <EditKegForm
          keg={props.selectedKeg}
          onEditKeg={handleEditingKegInList}
        />
      buttonText = "Return to Keg List"
    } else if (props.selectedKeg != null) {
      currentlyVisibleState =
        <KegDetail
          keg={props.selectedKeg}
          onClickingServe={handleServeClick}
          onClickingDelete={handleDeletingKeg}
          onClickingEdit={handleEditClick}
        />
      buttonText = "Return to Keg List";
    } else if (props.formVisibleOnPage) {
      currentlyVisibleState =
        <NewKegForm
          onNewKegCreation={handleAddingNewKegToList}
        />;
      buttonText = "Return to Keg List";
    } else {
      currentlyVisibleState =
        <KegList
          onKegSelection={handleChangingSelectedKeg}
        />
      buttonText = "Add Keg";
    }
    return (
      <>
        {currentlyVisibleState}
        <button onClick={handleClick}>{buttonText}</button>
      </>
    );
  }
}

KegControl.propTypes = {
  editing: PropTypes.bool,
  formVisibleOnPage: PropTypes.bool,
  selectedKeg: PropTypes.object
};

const mapStateToProps = state => {
  return {
    editing: state.editing,
    formVisibleOnPage: state.formVisibleOnPage,
    selectedKeg: state.selectedKeg
  }
};

KegControl = connect(mapStateToProps)(KegControl);

export default withFirestore(KegControl);
