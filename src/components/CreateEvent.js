import React, { Component } from 'react';
import eventService from '../services/eventService';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import TimePicker from 'material-ui-pickers/TimePicker';
import DatePicker from 'material-ui-pickers/DatePicker';
import DateTimePicker from 'material-ui-pickers/DateTimePicker';

const defaultNewEvent = {
  title: '',
  description: '',
  ending: '',
};

const styles = theme => ({
  root: {
    overflow: 'hidden',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: 200,
  },
});

class CreateEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      event: Object.assign({}, defaultNewEvent),
      date: new Date(),
    };
    this.postEvent = this.postEvent.bind(this);
  }

  postEvent() {
    const { event } = this.state;
    eventService.addEvent(event);
  }

  inputHandler(property, e) {
    const { event } = this.state;
    event[property] = e.target.value;
    this.setState({ event });
  }

  handleDateChange = date => {
    this.state.event.ending = date;
    this.setState({
      date: date,
      event: this.state.event,
    });
  };

  render() {
    const { id, title, description, ending } = this.state.event;
    const { date } = this.state;
    const { classes } = this.props;

    return (
      <Grid>
        <Grid item xs={12}>
          <Grid container className={classes.root} justify={'center'}>
            <TextField
              id="required"
              value={title}
              onChange={this.inputHandler.bind(this, 'title')}
              className={classes.textField}
              placeholder="Title"
            />
          </Grid>
          <Grid container className={classes.root} justify={'center'}>
            <TextField
              id="required"
              value={description}
              onChange={this.inputHandler.bind(this, 'description')}
              className={classes.textField}
              placeholder="Description"
            />
          </Grid>
          <Grid container className={classes.root} justify={'center'}>
            <DatePicker value={date} minDate={date} onChange={this.handleDateChange} />
          </Grid>
          <Grid container className={classes.root} justify={'center'}>
            <Button
              variant='contained'
              onClick={this.postEvent}
              justify={'flex-end'}
            >
              Create Birthday!
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(CreateEvent);
