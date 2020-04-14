/* eslint-disable no-loop-func */
/* eslint-disable no-undef */
import React from "react";
import { connect } from "react-redux";
import { Button, TextField } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import { createEvent, closeModal } from "../../redux/actions";

import "./modal.styles.scss";
import Backdrop from "../backdrop/backdrop.component";

class Modal extends React.Component {
  state = {
    title: "",
    text: "",
    endTime: "",
    startTime: "",
    date: "",
  };
  componentDidMount() {
    let date = new Date();

    this.setState({
      startTime: date,
      endTime: date,
      date: date,
    });
  }

  render() {
    const { isModalOpen, createEvent, closeModal, position } = this.props;

    return (
      <React.Fragment>
        <Backdrop />
        <div
          className="Modal"
          style={{
            transform: isModalOpen ? "translateY(0)" : "translateY(-100vh)",
            opacity: isModalOpen ? "1" : "0",
          }}
        >
          <form noValidate autoComplete="off">
            <TextField
              className="margin"
              id="filled-basic"
              label="Eventname"
              variant="filled"
              value={this.state.title}
              onChange={(e) => this.setState({ title: e.target.value })}
            />
            <TextField
              className="margin"
              id="filled-multiline-static"
              label="Description"
              multiline
              rows="6"
              value={this.state.text}
              variant="filled"
              onChange={(e) => this.setState({ text: e.target.value })}
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Date picker dialog"
                format="MM/dd/yyyy"
                value={this.state.date}
                onChange={(value) => this.setState({ date: value })}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="start at"
                value={this.state.startTime}
                onChange={(value) => this.setState({ startTime: value })}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="end at"
                value={this.state.endTime}
                onChange={(value) => this.setState({ endTime: value })}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
            </MuiPickersUtilsProvider>

            <Button
              onClick={() => {
                if (this.state.text.length && this.state.title.length) {
                  createEvent(this.state);

                  let content = `<h1>${this.state.title}</h1><br/><div>${this.state.text}</div>`;
                  let marker = new google.maps.Marker({
                    position: position,
                    map: this.props.mapRef,
                  });

                  let infowindow = new google.maps.InfoWindow({
                    content: content,
                    maxWidth: 350,
                  });

                  google.maps.event.addListener(marker, "click", () => {
                    infowindow.open(map, marker);
                  });
                  closeModal();
                  this.setState({
                    text: "",
                    title: "",
                  });
                } else {
                  alert("Please fill your event with informations...");
                }
              }}
              className="margin modal-button"
              variant="contained"
              color="primary"
            >
              Create
            </Button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  isModalOpen: state.isModalOpen,
  position: state.positionOfActualEvent,
});

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(closeModal()),
  createEvent: (event) => dispatch(createEvent(event)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
