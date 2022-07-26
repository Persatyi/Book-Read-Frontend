import AddBook from "components/AddBook";
import ModalWrapper from "components/ModalWrapper";
import PropTypes from "prop-types";
// import s from "./ModalBookEdit.module.scss";

const ModalBookEdit = ({ open, onClose, book = {} }) => {
  return (
    <ModalWrapper open={open} onClose={onClose} size="large">
      <AddBook book={book} />
    </ModalWrapper>
  );
};
ModalBookEdit.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  book: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    year: PropTypes.number,
    pages: PropTypes.number,
    status: PropTypes.string,
  }),
};

export default ModalBookEdit;
