import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import NumberFormat from "react-number-format";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import eventService from "../services/eventService";
import "./EventDetail.css";
import rehiveService from "../services/rehiveService";
import userService from "../services/userService";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  }
});

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      ref={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value
          }
        });
      }}
      thousandSeparator
      prefix="$"
    />
  );
}

class EventDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalGiven: 15,
      recipient: null
    };
    this.submitPayment = this.submitPayment.bind(this);
    this.fund = this.fund.bind(this);
    this.getRecipient = this.getRecipient.bind(this);
  }

  componentDidMount() {
    this.getRecipient();
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  getRecipient() {
    const userId = 0;
    userService.getByID(userId).then(resp => {
      console.log(resp.data);
    });
  }

  fund() {
    const fund = {
      amount: this.state.totalGiven,
      recipient: this.state.recipient
        ? this.state.recipient
        : "mskozlovskaya@gmail.com",
      currency: "USD"
    };

    rehiveService
      .fund(fund)
      .then(resp => {
        console.log(resp.data);
      })
      .catch(console.error);
  }

  submitPayment() {
    const { event } = this.props;
    event.totalGiven =
      parseInt(event.totalGiven, 10) + parseInt(this.state.totalGiven, 10);
    this.props.submitPayment(event);
    this.fund();
  }

  render() {
    const { classes, event } = this.props;
    const { totalGiven } = this.state;
    return (
      <div className="event">
        {/* <button onClick={() => close()}>Close</button> */}
        <Paper className={classes.root} elevation={1}>
          <Typography variant="headline" component="h3">
            {event.title}
          </Typography>
          <Typography component="p">{event.description}</Typography>
          <Typography component="p">
            {event.creator ? event.creator.firstName : ""}
          </Typography>
          <Typography component="p">
            Total amount donated: ${event.totalGiven}
          </Typography>
          <TextField
            className={classes.formControl}
            label="react-number-format"
            value={totalGiven}
            onChange={this.handleChange("totalGiven")}
            id="formatted-numberformat-input"
            InputProps={{
              inputComponent: NumberFormatCustom
            }}
          />
          <Button
            variant="contained"
            className={classes.button}
            onClick={this.submitPayment}
          >
            Donate!
          </Button>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(EventDetail);
