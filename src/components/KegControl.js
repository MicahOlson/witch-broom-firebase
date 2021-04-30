import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import EditKegForm from './EditKegForm';
import KegDetail from './KegDetail';
import KegList from './KegList';
import NewKegForm from './NewKegForm';

class KegControl extends React.Component {
  handleClick = () => {
    const { dispatch } = this.props;
    if (this.props.selectedKeg != null) {
      const setEditAction = {
        type: 'SET_EDITING',
        editing: false
      };
      dispatch(setEditAction);
      const nullSelectedAction = {
        type: 'NULL_SELECTED'
      };
      dispatch(nullSelectedAction);
    } else {
      const toggleFormAction = {
        type: 'TOGGLE_FORM'
      };
      dispatch(toggleFormAction);
    }
  };

  handleAddingNewKegToList = (newKeg) => {
    const { dispatch } = this.props;
    const { name, brand, price, alcoholContent, pintCount, id } = newKeg;
    const addKegAction = {
      type: 'ADD_KEG',
      name: name,
      brand: brand,
      price: price,
      alcoholContent: alcoholContent,
      pintCount: pintCount,
      id: id
    };
    dispatch(addKegAction);
    const toggleFormAction = {
      type: 'TOGGLE_FORM'
    };
    dispatch(toggleFormAction);
  };

  handleChangingSelectedKeg = (id) => {
    const selectedKeg = this.props.mainKegList[id];
    const { dispatch } = this.props;
    const { name, brand, price, alcoholContent, pintCount } = selectedKeg;
    const setSelectedAction = {
      type: 'SET_SELECTED',
      name: name,
      brand: brand,
      price: price,
      alcoholContent: alcoholContent,
      pintCount: pintCount,
      id: id
    };
    dispatch(setSelectedAction);
  };

  handleDeletingKeg = (id) => {
    const { dispatch } = this.props;
    const deleteKegAction = {
      type: 'DELETE_KEG',
      id: id
    };
    dispatch(deleteKegAction);
    const nullSelectedAction = {
      type: 'NULL_SELECTED'
    };
    dispatch(nullSelectedAction);
  };

  handleEditClick = () => {
    const { dispatch } = this.props;
    const action = {
      type: 'SET_EDITING',
      editing: true
    };
    dispatch(action);
  };

  handleEditingKegInList = (kegToEdit) => {
    const { dispatch } = this.props;
    const { name, brand, price, alcoholContent, pintCount, id } = kegToEdit;
    const addKegAction = {
      type: 'ADD_KEG',
      name: name,
      brand: brand,
      price: price,
      alcoholContent: alcoholContent,
      pintCount: pintCount,
      id: id
    };
    dispatch(addKegAction);
    const setEditAction = {
      type: 'SET_EDITING',
      editing: false
    };
    dispatch(setEditAction);
    const nullSelectedAction = {
      type: 'NULL_SELECTED'
    };
    dispatch(nullSelectedAction);
  };

  handleServeClick = () => {
    const selectedKeg = this.props.selectedKeg;
    const { dispatch } = this.props;
    const { name, brand, price, alcoholContent, pintCount, id } = selectedKeg;
    const addKegAction = {
      type: 'ADD_KEG',
      name: name,
      brand: brand,
      price: price,
      alcoholContent: alcoholContent,
      pintCount: pintCount-1,
      id: id
    };
    dispatch(addKegAction);
    const setSelectedAction = {
      type: 'SET_SELECTED',
      name: name,
      brand: brand,
      price: price,
      alcoholContent: alcoholContent,
      pintCount: pintCount-1,
      id: id
    };
    dispatch(setSelectedAction);
  };

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
