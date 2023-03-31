import { Component } from 'react';
import { Overlay, ModalStyled } from './Modal.styled';
import PropTypes from 'prop-types';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClick(e);
    }
  };

  render() {
    const { imageUrl, onClick } = this.props;
    return (
      <Overlay onClick={onClick}>
        <ModalStyled>
          <img src={imageUrl} alt="" />
        </ModalStyled>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  onClick: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
}