import React, { useState } from "react";
import { useSelector } from "react-redux";
import { isAuth } from "redux/auth";
import {useBooksQuery} from 'redux/api/bookAPI'
import { useToggle, useWindowSize } from "hooks";
import BookListLibrary from "components/BookListLibrary";
import Container from "components/Container/Container";
import MoreBtn from "components/MoreBtn/MoreBtn";
import BackBtn from "components/BackBtn/BackBtn";
import LibraryEmpty from "components/LibraryEmpty";
import AddBook from 'components/AddBook';
import { ModalBookReview } from "components/Modals";

export default function LibraryPage() {
  const auth = useSelector(isAuth);
  const { data = []} = useBooksQuery(null, { skip: !auth });
  const size = useWindowSize();
  const open = !data.length
  const [plus, togglePlus] = useToggle();
  /* TODO: placeholder must be shown only when library is empty */
  const [openPlaceholder, setOpenPlaceholder] = useState(true);
  const [openModal, toggleModal] = useToggle();
  return (
    <Container>
      {size.width < 768 && (
        <>
              {plus && (
                <>
                <MoreBtn onClick={togglePlus} />
              {/* TODO: open Resume modal on click */}
              <BookListLibrary onClick={() => { }} />
            </>
              )}
          {!plus && (
                <>
              <BackBtn onClick={togglePlus} />
                <LibraryEmpty
                  open={openPlaceholder}
                  onClose={() => setOpenPlaceholder(false)}
                />
              <AddBook />
                </>
          )}
        </>
      )}
      {size.width >= 768 && (
        <>
            <AddBook />
          {/* TODO: open Resume modal on click */}
          <BookListLibrary onClick={toggleModal} />
          <LibraryEmpty
            open={openPlaceholder}
            onClose={() => setOpenPlaceholder(false)}
          />
      <ModalBookReview open={openModal} onClose={toggleModal} />
        </>
      )}
    </Container>
  );
}
