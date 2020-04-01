import React from "react";
import { connect } from "react-redux";

import { closeModal } from "../../redux/actions";

import "./backdrop.styles.scss";

const backdrop = ({ closeModal, isModalOpen }) =>
  isModalOpen ? <div className="Backdrop" onClick={closeModal}></div> : null;

const mapStateToProps = state => ({
  isModalOpen: state.isModalOpen
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(backdrop);
