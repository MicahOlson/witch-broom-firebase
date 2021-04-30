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
      editing: false
    };
  }

  handleClick = () => {
    if (this.state.selectedKeg != null) {
      this.setState({
        selectedKeg: null,
        editing: false
      });
    } else {

    }
  }

  handleAddingNewKegToList = (newKeg) => {
    const { dispatch } = this.props;
    const { name, brand, price, alcoholContent, pintCount, id } = newKeg;
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
    this.setState({editing: true});
  }

  handleEditingKegInList = (kegToEdit) => {
    const { dispatch } = this.props;
    const { name, brand, price, alcoholContent, pintCount, id } = kegToEdit;
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
      editing: false,
      selectedKeg: null
    });
  }

  handleServeClick = () => {
    const selectedKeg = this.state.selectedKeg;
    const servedKeg = Object.assign({}, selectedKeg, {pintCount: selectedKeg.pintCount-1});
    // const editedMainKegList = this.state.mainKegList
    //   .filter(keg => keg.id !== this.state.selectedKeg.id)
    //   .concat(servedKeg);
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
      // mainKegList: editedMainKegList,
      selectedKeg: servedKeg
    });
  }

  render() {
    let currentlyVisibleState = null;
    let buttonText = null;
    if (this.state.editing) {
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
  mainKegList: PropTypes.object,
  formVisibleOnPage: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    mainKegList: state.mainKegList,
    formVisibleOnPage: state.formVisibleOnPage
  }
};

KegControl = connect(mapStateToProps)(KegControl);

export default KegControl;
