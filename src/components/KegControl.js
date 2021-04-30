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
      formVisibleOnPage: false,
      selectedKeg: null,
      editing: false
    };
  }

  handleClick = () => {
    if (this.state.selectedKeg != null) {
      this.setState({
        formVisibleOnPage: false,
        selectedKeg: null,
        editing: false
      });
    } else {
      this.setState(prevState => ({
        formVisibleOnPage: !prevState.formVisibleOnPage
      }));
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
    this.setState({formVisibleOnPage: false});
  }

  handleChangingSelectedKeg = (id) => {
    const selectedKeg = this.state.mainKegList.filter(keg => keg.id === id)[0];
    this.setState({selectedKeg: selectedKeg});
  }

  handleDeletingKeg = (id) => {
    const { dispatch } = this.props;
    const action = {
      type: 'DELETE_KEG',
      id: id
    }
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
    // const selectedKeg = this.state.selectedKeg;
    // const servedKeg = Object.assign({}, selectedKeg, {pintCount: selectedKeg.pintCount-1});
    // const editedMainKegList = this.state.mainKegList
    //   .filter(keg => keg.id !== this.state.selectedKeg.id)
    //   .concat(servedKeg);
    const { dispatch } = this.props;
    const { name, brand, price, alcoholContent, pintCount, id } = this.state.selectedKeg;
    const action = {
      type: 'ADD_KEG',
      name: name,
      brand: brand,
      price: price,
      alcoholContent: alcoholContent,
      pintCount: pintCount-1,
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
    } else if (this.state.formVisibleOnPage) {
      currentlyVisibleState = 
        <NewKegForm 
          onNewKegCreation={this.handleAddingNewKegToList}
        />;
      buttonText = "Return to Keg List";
    } else {
      currentlyVisibleState = 
        <KegList 
          kegList={this.state.mainKegList}
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
  mainKegList: PropTypes.object
};

const mapStateToProps = state => {
  return {
    mainKegList: state
  }
};

KegControl = connect(mapStateToProps)(KegControl);

export default KegControl;
