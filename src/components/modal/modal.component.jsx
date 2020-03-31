import React from "react";
import { Button, TextField } from "@material-ui/core";

import "./modal.styles.scss";
import Backdrop from "../backdrop/backdrop.component";

class Modal extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }

  componentWillUpdate() {
    console.log("[Modal] WillUpdate");
  }

  render() {
    return (
      <React.Fragment>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className="Modal"
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0"
          }}
        >
          <form className noValidate autoComplete="off">
            <TextField
              className="margin"
              id="filled-basic"
              label="Eventname"
              variant="filled"
            />
            <TextField
              className="margin"
              id="filled-multiline-static"
              label="Description"
              multiline
              rows="6"
              variant="filled"
            />
            <Button
              onClick={this.props.modalClosed}
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

export default Modal;
