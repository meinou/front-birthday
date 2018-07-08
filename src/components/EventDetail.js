import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import "./EventDetail.css";
import rehiveService from "../services/rehiveService";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

class EventDetail extends Component {
  constructor() {
    super();
    this.state = {};
    this.getDetails = this.getDetails.bind(this);
    this.fund = this.fund.bind(this);
  }

  componentDidMount() {
    this.getDetails();
  }

  getDetails() {}
  fund() {
    const fund = {
      amount: 500,
      recipient: "mskozlovskaya@gmail.com",
      currency: "USD"
    };
    rehiveService
      .fund(fund)
      .then(resp => {})
      .catch(console.error);
  }

  render() {
    const { classes, event, close } = this.props;
    console.log(event);
    return (
      <div className="event">
        <button onClick={() => close()}>Close</button>
        <Paper className={classes.root} elevation={1}>
          <Typography variant="headline" component="h3">
            {event.title}
          </Typography>
          <Typography component="p">{event.description}</Typography>
          <Typography component="p">
            {event.creator ? event.creator.firstName : ""}
          </Typography>
          <Typography component="p">
            Total amount donated: {event.totalGiven}
          </Typography>
          <button onClick={() => this.fund()}>I want to fund!</button>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(EventDetail);
