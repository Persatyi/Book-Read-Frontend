import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useToggle, useWindowSize } from "hooks";
import Library from "components/Library/Library";
import LibraryModal from "components/LibraryModal/LibraryModal";
import globalSelectors from "../redux/global/global-selectors";
import { toggleModal } from "redux/global/global-slice";
import BookListLibrary from 'components/BookListLibrary/BookListLibrary';
import Container from "components/Container/Container";
import MoreBtn from "components/MoreBtn/MoreBtn";
import BackBtn from "components/BackBtn/BackBtn";

export default function LibraryPage() {
  const [openLib, toggleLib] = useToggle();
  const [plus, togglePlus] = useToggle();
  /* TODO: placeholder must be shown only when library is empty */
  const [openPlaceholder, setOpenPlaceholder] = useState(true);
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
              {/* TODO: open Resume modal on click */}
                <BookListLibrary onClick={() => {}} />
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
            {/* TODO: open Resume modal on click */}
            <BookListLibrary onClick={() => {}} />
          </>
        )}
        <LibraryEmpty
          open={openPlaceholder}
          onClose={() => setOpenPlaceholder(false)}
        />
      </Container>
    </div>
  );
}
