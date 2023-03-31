import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryItemStyled } from 'components/ImageGalleryItem/ImageGalleryItem.styled';
import { ImageGalleryStyled } from './ImageGallery.styled';
import PropTypes from 'prop-types';

export const ImageGallery = ({ pictures, onClick }) => {
  return (
    <ImageGalleryStyled>
      {pictures.map(picture => (
        <ImageGalleryItemStyled key={picture.id}>
          <ImageGalleryItem item={picture} onClick={onClick} />
        </ImageGalleryItemStyled>
      ))}
    </ImageGalleryStyled>
  );
};

ImageGallery.propTypes = {
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
};
