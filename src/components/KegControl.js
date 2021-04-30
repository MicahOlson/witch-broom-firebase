import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import EditKegForm from './EditKegForm';
import KegDetail from './KegDetail';
import KegList from './KegList';
import NewKegForm from './NewKegForm';

class KegControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKeg: null,
    };
  }

  handleClick = () => {
    const { dispatch } = this.props;
    if (this.state.selectedKeg != null) {
      const setEditAction = {
        type: 'SET_EDITING',
        editing: false
      }
      dispatch(setEditAction);
      this.setState({
        selectedKeg: null,
      });
    } else {
      const toggleFormAction = {
        type: 'TOGGLE_FORM'
      }
      dispatch(toggleFormAction);
    }
  }

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
    }
    dispatch(toggleFormAction);
  }

  handleChangingSelectedKeg = (id) => {
    const selectedKeg = this.props.mainKegList[id];
    this.setState({selectedKeg: selectedKeg});
  }

  handleDeletingKeg = (id) => {
    const { dispatch } = this.props;
    const action = {
      type: 'DELETE_KEG',
      id: id
    }
    dispatch(action);
    this.setState({selectedKeg: null});
  }

  handleEditClick = () => {
    const { dispatch } = this.props;
    const action = {
      type: 'SET_EDITING',
      editing: true
    }
    dispatch(action);
  }

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
    }
    dispatch(setEditAction);
    this.setState({
      selectedKeg: null
    });
  }

  handleServeClick = () => {
    const selectedKeg = this.state.selectedKeg;
    const servedKeg = Object.assign({}, selectedKeg, {pintCount: selectedKeg.pintCount-1});
    const { dispatch } = this.props;
    const { name, brand, price, alcoholContent, pintCount, id } = servedKeg;
    const action = {
      type: 'ADD_KEG',
      name: name,
      brand: brand,
      price: price,
      alcoholContent: alcoholContent,
      pintCount: pintCount,
      id: id
    };
    dispatch(action);
    this.setState({
      selectedKeg: servedKeg
    });
  }

  render() {
    let currentlyVisibleState = null;
    let buttonText = null;
    if (this.props.editing) {
      currentlyVisibleState =
        <EditKegForm
          keg={this.state.selectedKeg}
          onEditKeg={this.handleEditingKegInList}
        />
      buttonText = "Return to Keg List"
    } else if (this.state.selectedKeg != null) {
      currentlyVisibleState = 
        <KegDetail
          keg={this.state.selectedKeg}
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
  mainKegList: PropTypes.object
};

const mapStateToProps = state => {
  return {
    editing: state.editing,
    formVisibleOnPage: state.formVisibleOnPage,
    mainKegList: state.mainKegList
  }
};

KegControl = connect(mapStateToProps)(KegControl);

export default KegControl;
