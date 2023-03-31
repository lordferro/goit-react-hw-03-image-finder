import { LoadMoreBtnStyled } from "./LoadMoreBtn.styled"
import PropTypes from 'prop-types';

export const LoadMoreBtn = ({ onClick }) => {

    return (<LoadMoreBtnStyled type="button" onClick={onClick}>Load more</LoadMoreBtnStyled>)
}

LoadMoreBtn.propTypes = {
    onClick:PropTypes.func.isRequired,
}