import { Image } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ item, onClick }) => {
  return (
    <Image
      onClick={() => {
        onClick(item.largeImageURL);
      }}
      src={item.webformatURL}
      alt={item.tags}
    />
  );
};

ImageGalleryItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  item: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
