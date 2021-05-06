import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
    const selectedKeg = this.props.mainKegList[id];
    const { dispatch } = this.props;
    const setSelectedAction = a.setSelected(selectedKeg);
    dispatch(setSelectedAction);
  };

  handleDeletingKeg = (id) => {
    const { dispatch } = this.props;
    const deleteKegAction = a.deleteKeg(id);
    dispatch(deleteKegAction);
    const nullSelectedAction = a.nullSelected();
    dispatch(nullSelectedAction);
  };

  handleEditClick = () => {
    const { dispatch } = this.props;
    const action = a.setEditing(true);
    dispatch(action);
  };

  // handleEditingKegInList = (kegToEdit) => {
  //   const { dispatch } = this.props;
  //   const addKegAction = a.addKeg(kegToEdit);
  //   dispatch(addKegAction);
  //   const setEditAction = a.setEditing(false);
  //   dispatch(setEditAction);
  //   const nullSelectedAction = a.nullSelected();
  //   dispatch(nullSelectedAction);
  // };

  // handleServeClick = () => {
  //   const selectedKeg = this.props.selectedKeg;
  //   const servedKeg = Object.assign({}, selectedKeg, {pintCount: selectedKeg.pintCount-1});
  //   const { dispatch } = this.props;
  //   const addKegAction = a.addKeg(servedKeg);
  //   dispatch(addKegAction);
  //   const setSelectedAction = a.setSelected(servedKeg);
  //   dispatch(setSelectedAction);
  // };

  render() {
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
          kegList={this.props.mainKegList}
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

KegControl.propTypes = {
  editing: PropTypes.bool,
  formVisibleOnPage: PropTypes.bool,
  mainKegList: PropTypes.object,
  selectedKeg: PropTypes.object
};

const mapStateToProps = state => {
  return {
    editing: state.editing,
    formVisibleOnPage: state.formVisibleOnPage,
    mainKegList: state.mainKegList,
    selectedKeg: state.selectedKeg
  }
};

KegControl = connect(mapStateToProps)(KegControl);

export default KegControl;
