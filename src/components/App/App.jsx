import axios from 'axios';
import { AppStyled } from 'components/App/App.styled';
import { Component } from 'react';
import '../../index.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SearchBar } from 'components/SearchBar/SearchBar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { LoadMoreBtn } from 'components/LoadMoreBtn/LoadMoreBtn';
import { Dna } from 'react-loader-spinner';
import { Modal } from 'components/Modal/Modal';

const API_KEY = '33613325-290fbadf3efc3d533d0ce9ce0';

export class App extends Component {
  state = {
    pictures: [],
    page: 1,
    query: '',
    isVisible: false,
    showModal: false,
    imageUrl: '',
  };

  async componentDidUpdate(prevProp, prevState) {
    console.log('1');
    const { query, page } = this.state;
    if (prevState.query !== this.state.query) {
      const {
        data: { hits },
      } = await axios.get(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
      this.setState({ pictures: hits, isVisible: false });
    } else if (prevState.page !== this.state.page) {
      const {
        data: { hits },
      } = await axios.get(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
      this.setState(prevStateAdd => ({
        isVisible: false,
        pictures: [...prevStateAdd.pictures, ...hits],
      }));
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    if (e.target.elements[1].value === '') {
      toast.warn('Please type you request!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      this.setState({
        isVisible: false,
      });
    } else if (this.state.query === e.target.elements[1].value) {
      toast.warn("you should know, that you typed the same query :)")
      this.render();
    } else {
      this.setState({
        isVisible: true,
        pictures: [],
        page: 1,
        query: e.target.elements[1].value,
      });
    }
  };

  handleLoadMoreBtn = () => {
    this.setState(prevState => ({ isVisible: true, page: prevState.page + 1 }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  handlePictureClick = imageUrl => {
    this.setState({ imageUrl: imageUrl });
    this.toggleModal();
  };

  handlerModalClick = e => {
    if (e.target.tagName !== 'IMG' || e.key === 'Escape') {
      this.toggleModal();
    }
  };

  render() {
    const { pictures, isVisible, showModal, imageUrl } = this.state;
    return (
      <AppStyled>
        <SearchBar onSubmit={this.handleSubmit} />
        <Dna
          visible={isVisible}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{ justifySelf: 'center' }}
          wrapperClass="dna-wrapper"
        />
        {pictures.length !== 0 && (
          <ImageGallery
            pictures={pictures}
            onClick={this.handlePictureClick}
            component="ul"
          />
        )}
        {pictures.length !== 0 &&
          (isVisible ? (
            <Dna
              visible={isVisible}
              height="60"
              width="60"
              ariaLabel="dna-loading"
              wrapperStyle={{ justifySelf: 'center' }}
              wrapperClass="dna-wrapper"
            />
          ) : (
            <LoadMoreBtn onClick={this.handleLoadMoreBtn} />
          ))}
        {showModal && (
          <Modal imageUrl={imageUrl} onClick={this.handlerModalClick} />
        )}
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </AppStyled>
    );
  }
}
