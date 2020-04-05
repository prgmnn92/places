/* eslint-disable no-loop-func */
/* eslint-disable no-undef */
import React from "react";
import { connect } from "react-redux";
import { Button, TextField } from "@material-ui/core";

import { createEvent, closeModal } from "../../redux/actions";

import "./modal.styles.scss";
import Backdrop from "../backdrop/backdrop.component";

class Modal extends React.Component {
  state = {
    title: "",
    text: "",
    endTime: "",
    startTime: ""
  };

  render() {
    const { isModalOpen, createEvent, closeModal, position } = this.props;

    let date = new Date();
    let stringDate =
      date.getFullYear() +
      "-" +
      ("00" + date.getMonth()).slice(-2) +
      "-" +
      ("00" + date.getDay()).slice(-2) +
      "T" +
      ("00" + date.getHours()).slice(-2) +
      ":" +
      ("00" + date.getMinutes()).slice(-2);

    return (
      <React.Fragment>
        <Backdrop />
        <div
          className="Modal"
          style={{
            transform: isModalOpen ? "translateY(0)" : "translateY(-100vh)",
            opacity: isModalOpen ? "1" : "0"
          }}
        >
          <form noValidate autoComplete="off">
            <TextField
              className="margin"
              id="filled-basic"
              label="Eventname"
              variant="filled"
              value={this.state.title}
              onChange={e => this.setState({ title: e.target.value })}
            />
            <TextField
              className="margin"
              id="filled-multiline-static"
              label="Description"
              multiline
              rows="6"
              value={this.state.text}
              variant="filled"
              onChange={e => this.setState({ text: e.target.value })}
            />
            <TextField
              id="datetime-local"
              label="Von"
              type="datetime-local"
              defaultValue={stringDate}
              onChange={e => this.setState({ startTime: e.target.value })}
              className="margin"
              InputLabelProps={{
                shrink: true
              }}
            />
            <TextField
              id="datetime-local"
              label="bis"
              type="datetime-local"
              defaultValue={stringDate}
              onChange={e => this.setState({ endTime: e.target.value })}
              className="margin"
              InputLabelProps={{
                shrink: true
              }}
            />
            <Button
              onClick={() => {
                if (this.state.text.length && this.state.title.length) {
                  createEvent(this.state);

                  let content = `<h1>${this.state.title}</h1><br/><div>${this.state.text}</div>`;
                  let marker = new google.maps.Marker({
                    position: position,
                    map: this.props.mapRef
                  });

                  let infowindow = new google.maps.InfoWindow({
                    content: content,
                    maxWidth: 350
                  });

                  google.maps.event.addListener(marker, "click", () => {
                    infowindow.open(map, marker);
                  });
                  closeModal();
                  this.setState({
                    text: "",
                    title: ""
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

const mapStateToProps = state => ({
  isModalOpen: state.isModalOpen,
  position: state.positionOfActualEvent
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal()),
  createEvent: event => dispatch(createEvent(event))
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
