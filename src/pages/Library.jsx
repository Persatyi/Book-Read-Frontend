import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useWindowSize } from "hooks/useWindowSize";
import AddBook from "components/AddBook/AddBook";
import LibraryModal from "components/LibraryModal/LibraryModal";
import globalSelectors from "../redux/global/global-selectors";
import { toggleModal } from "redux/global/global-slice";
import BookListLibrary from '../components/BookListLibrary/BookListLibrary';
import Container from "../components/Container/Container";
import MoreBtn from "components/MoreBtn/MoreBtn";
import BackBtn from "components/BackBtn/BackBtn";

export default function LibraryPage() {
  const [openLibrary, setOpenLibrary] = useState(false);
  const [plus, setPlus] = useState(true);
  const dispatch = useDispatch();
  const size = useWindowSize();
  const modalOpen = useSelector(globalSelectors.getIsModal);
  const isOpenModal = () => {
    dispatch(toggleModal());
  };
  const isLibraryToggle = () => {
    setOpenLibrary(!openLibrary);
    setPlus(!plus);
  };
  return (
      <Container>
        {size.width < 768 && (
          <>
            {plus && (
            <>
              <MoreBtn onClick={isLibraryToggle} />
                <BookListLibrary onClick={isOpenModal} />
              </>
            )}
            {openLibrary && (
            <>
              <BackBtn onClick={isLibraryToggle} />
                <AddBook />
              </>
            )}
          </>
        )}
        {size.width > 768 && (
          <>
            <AddBook />
            <BookListLibrary onClick={isOpenModal} />
          </>
        )}
        {modalOpen && <LibraryModal />}
      </Container>
  );
}
