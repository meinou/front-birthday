import React, { Component } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import StellarSdk from 'stellar-sdk';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewProfile: false,
      viewBirthdays: false,
      editProfile: false,
      createBirthday: false,
    };

    this.viewProfile = this.viewProfile.bind(this);
    this.viewBirthdays = this.viewBirthdays.bind(this);
    this.editProfile = this.editProfile.bind(this);
    this.createBirthday = this.createBirthday.bind(this);
  }

  viewProfile() {
    this.setState({
      viewProfile: !this.state.viewProfile,
    });
  }

  viewBirthdays() {
    this.setState({
      viewBirthdays: !this.state.viewBirthdays,
    });
  }

  editProfile() {
    this.setState({
      editProfile: !this.state.editProfile,
    });
  }

  createBirthday() {
    this.setState({
      createBirthday: !this.state.createBirthday,
    });
  }

  render() {
    const {
      viewProfile,
      viewBirthdays,
      editProfile,
      createBirthday,
    } = this.state;
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Header
          viewProfile={this.viewProfile}
          viewBirthdays={this.viewBirthdays}
          editProfile={this.editProfile}
          createBirthday={this.createBirthday}
        />
        <Main
          viewProfile={viewProfile}
          viewBirthdays={viewBirthdays}
          editProfile={editProfile}
          createBirthday={createBirthday}
        />
      </MuiPickersUtilsProvider>
    );
  }
}

export default App;
