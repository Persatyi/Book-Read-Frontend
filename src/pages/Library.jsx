import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useWindowSize } from "hooks";
import Library from "components/Library/Library";
import LibraryModal from "components/LibraryModal/LibraryModal";
import globalSelectors from "../redux/global/global-selectors";
import { toggleModal } from "redux/global/global-slice";
import spriteSvg from "assets/images/sprite.svg";
import BookList from "components/BookList/BookList";
import Container from "../components/Container/Container";

const moreIcon = {
  width: "52px",
  height: "52px",
  position: "fixed",
  bottom: "12px",
  cursor: "pointer",
  marginLeft: "auto",
  marginRight: "auto",
  left: 0,
  right: 0,
};
const backIcon = {
  marginTop: "24px",
  width: "24px",
  height: "12px",
};

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
    <div
      style={{
        backgroundColor: "var(--secondary-bg-cl)",
        minHeight: "92vh",
      }}
    >
      <Container>
        {size.width < 768 && (
          <>
            {plus && (
              <>
                <svg onClick={isLibraryToggle} style={moreIcon}>
                  <use href={`${spriteSvg}#icon-more`} />
                </svg>
                <BookList onClick={isOpenModal} />
              </>
            )}
            {openLibrary && (
              <>
                <svg onClick={isLibraryToggle} style={backIcon}>
                  <use href={`${spriteSvg}#icon-back`} />
                </svg>
                <Library />
              </>
            )}
          </>
        )}
        {size.width > 768 && (
          <>
            <Library />
            <BookList onClick={isOpenModal} />
          </>
        )}
        {modalOpen && <LibraryModal />}
      </Container>
    </div>
  );
}
