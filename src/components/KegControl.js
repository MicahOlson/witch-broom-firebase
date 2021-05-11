import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isLoaded, withFirestore } from 'react-redux-firebase';
import * as a from './../actions';
import EditKegForm from './EditKegForm';
import KegDetail from './KegDetail';
import KegList from './KegList';
import NewKegForm from './NewKegForm';

class KegControl extends React.Component {
  handleClick = () => {
    const { dispatch } = this.props;
    if (this.props.selectedKeg != null) {
      const setEditAction = a.setEditing(false);
      dispatch(setEditAction);
      const nullSelectedAction = a.nullSelected();
      dispatch(nullSelectedAction);
    } else {
      const toggleFormAction = a.toggleForm();
      dispatch(toggleFormAction);
    }
  };

  handleAddingNewKegToList = (newKeg) => {
    const { dispatch } = this.props;
    const toggleFormAction = a.toggleForm();
    dispatch(toggleFormAction);
  };

  handleChangingSelectedKeg = (id) => {
    this.props.firestore.get({ collection: 'kegs', doc: id })
      .then((keg) => {
        const firestoreKeg = {
          name: keg.get("name"),
          brand: keg.get("brand"),
          price: keg.get("price"),
          alcoholContent: keg.get("alcoholContent"),
          pintCount: keg.get("pintCount"),
          id: keg.id
        }
        const { dispatch } = this.props;
        const setSelectedAction = a.setSelected(firestoreKeg);
        dispatch(setSelectedAction);
      });
  };

  handleDeletingKeg = (id) => {
    this.props.firestore.delete({ collection: 'kegs', doc: id })
    const { dispatch } = this.props;
    const nullSelectedAction = a.nullSelected();
    dispatch(nullSelectedAction);
  };

  handleEditClick = () => {
    const { dispatch } = this.props;
    const action = a.setEditing(true);
    dispatch(action);
  };

  handleEditingKegInList = () => {
    const { dispatch } = this.props;
    const setEditAction = a.setEditing(false);
    dispatch(setEditAction);
    const nullSelectedAction = a.nullSelected();
    dispatch(nullSelectedAction);
  };

  handleServeClick = () => {
    const selectedKeg = this.props.selectedKeg;
    const servedKeg = Object.assign({}, selectedKeg, { pintCount: selectedKeg.pintCount - 1 });
    this.props.firestore.update({ collection: 'kegs', doc: selectedKeg.id }, servedKeg)
    const { dispatch } = this.props;
    const setSelectedAction = a.setSelected(servedKeg);
    dispatch(setSelectedAction);
  };

  render() {
    const auth = this.props.firebase.auth();
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
      if (this.props.editing) {
        currentlyVisibleState =
          <EditKegForm
            keg={this.props.selectedKeg}
            onEditKeg={this.handleEditingKegInList}
          />
        buttonText = "Return to Keg List"
      } else if (this.props.selectedKeg != null) {
        currentlyVisibleState =
          <KegDetail
            keg={this.props.selectedKeg}
            onClickingServe={this.handleServeClick}
            onClickingDelete={this.handleDeletingKeg}
            onClickingEdit={this.handleEditClick}
          />
        buttonText = "Return to Keg List";
      } else if (this.props.formVisibleOnPage) {
        currentlyVisibleState =
          <NewKegForm
            onNewKegCreation={this.handleAddingNewKegToList}
          />;
        buttonText = "Return to Keg List";
      } else {
        currentlyVisibleState =
          <KegList
            onKegSelection={this.handleChangingSelectedKeg}
          />
        buttonText = "Add Keg";
      }
      return (
        <>
          {currentlyVisibleState}
          <button onClick={this.handleClick}>{buttonText}</button>
        </>
      );
    }
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
