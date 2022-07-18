import React, { useState } from "react";
import { useToggle, useWindowSize } from "hooks";
import Library from "components/Library/Library";
import BookListLibrary from "components/BookListLibrary/BookListLibrary";
import Container from "components/Container/Container";
import MoreBtn from "components/MoreBtn/MoreBtn";
import BackBtn from "components/BackBtn/BackBtn";
import LibraryEmpty from "components/LibraryEmpty";
import { ModalBookReview } from "components/Modals";

export default function LibraryPage() {
  const [openLib, toggleLib] = useToggle();
  const [plus, togglePlus] = useToggle();
  /* TODO: placeholder must be shown only when library is empty */
  const [openPlaceholder, setOpenPlaceholder] = useState(true);
  const [openModal, toggleModal] = useToggle();
  const size = useWindowSize();
  const isLibraryToggle = () => {
    toggleLib();
    togglePlus();
  };
  return (
    <Container>
      {size.width < 768 && (
        <>
          {plus && (
            <>
              <MoreBtn onClick={isLibraryToggle} />
              <BookListLibrary onClick={toggleModal} />
            </>
          )}
          {openLib && (
            <>
              <BackBtn onClick={isLibraryToggle} />
              <Library />
            </>
          )}
        </>
      )}
      {size.width >= 768 && (
        <>
          <Library />
          <BookListLibrary onClick={toggleModal} />
        </>
      )}
      <LibraryEmpty
        open={openPlaceholder}
        onClose={() => setOpenPlaceholder(false)}
      />
      {/* TODO: change to open={openModal} before pull request */}
      <ModalBookReview open={openModal} onClose={toggleModal} />
    </Container>
  );
}
