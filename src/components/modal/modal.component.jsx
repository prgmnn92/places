import React from "react";
import { connect } from "react-redux";
import { Button, TextField } from "@material-ui/core";

import { createEvent, closeModal } from "../../redux/actions";

import "./modal.styles.scss";
import Backdrop from "../backdrop/backdrop.component";

class Modal extends React.Component {
  state = {
    title: "",
    text: ""
  };
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.isModalOpen !== this.props.isModalOpen ||
      nextProps.children !== this.props.children
    );
  }

  render() {
    const { isModalOpen, createEvent, closeModal } = this.props;
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
          <form className noValidate autoComplete="off">
            <TextField
              className="margin"
              id="filled-basic"
              label="Eventname"
              variant="filled"
              onChange={e => this.setState({ title: e.target.value })}
            />
            <TextField
              className="margin"
              id="filled-multiline-static"
              label="Description"
              multiline
              rows="6"
              variant="filled"
              onChange={e => this.setState({ text: e.target.value })}
            />
            <Button
              onClick={() => {
                createEvent(this.state);
                closeModal();
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
  isModalOpen: state.isModalOpen
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal()),
  createEvent: event => dispatch(createEvent(event))
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
