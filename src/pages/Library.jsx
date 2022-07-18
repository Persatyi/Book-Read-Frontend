import React, { useState } from "react";
import { useToggle, useWindowSize } from "hooks";
import spriteSvg from "assets/images/sprite.svg";
import Library from "components/Library/Library";
import LibraryEmpty from "components/LibraryEmpty";
import BookList from "components/BookList/BookList";
import Container from "components/Container";

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
  const [showsLib, toggleLib] = useToggle();
  const [plus, togglePlus] = useToggle();
  /* TODO: placeholder must be shown only when library is empty */
  const [showsPlaceholder, setShowsPlaceholder] = useState(true);
  const size = useWindowSize();
  const isLibraryToggle = () => {
    toggleLib();
    togglePlus();
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
                {/* TODO: open Resume modal on click */}
                <BookList onClick={() => {}} />
              </>
            )}
            {showsLib && (
              <>
                <svg onClick={isLibraryToggle} style={backIcon}>
                  <use href={`${spriteSvg}#icon-back`} />
                </svg>
                <Library />
              </>
            )}
          </>
        )}
        {size.width >= 768 && (
          <>
            <Library />
            {/* TODO: open Resume modal on click */}
            <BookList onClick={() => {}} />
          </>
        )}
        <LibraryEmpty
          open={showsPlaceholder}
          onClose={() => setShowsPlaceholder(false)}
        />
      </Container>
    </div>
  );
}
