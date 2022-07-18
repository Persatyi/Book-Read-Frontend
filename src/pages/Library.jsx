import React, { useState } from "react";
import { useToggle, useWindowSize } from "hooks";
import {useBooksQuery} from 'redux/api/bookAPI'
import BookListLibrary from "components/BookListLibrary/BookListLibrary";
import Container from "components/Container/Container";
import MoreBtn from "components/MoreBtn/MoreBtn";
import BackBtn from "components/BackBtn/BackBtn";
import LibraryEmpty from "components/LibraryEmpty";
import AddBook from 'components/AddBook/AddBook';

export default function LibraryPage() {
  const [plus, togglePlus] = useToggle();
  /* TODO: placeholder must be shown only when library is empty */
  const [openPlaceholder, setOpenPlaceholder] = useState(true);
  const size = useWindowSize();
  const { data = []} = useBooksQuery();
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
              {data.length === 0 &&
                <LibraryEmpty
                  open={openPlaceholder}
                  onClose={() => setOpenPlaceholder(false)}
                />
              }
              <AddBook />
                </>
          )}
        </>
      )}
      {size.width >= 768 && (
        <>
          <AddBook />
          {/* TODO: open Resume modal on click */}
          {data.length === 0 ?
            (<LibraryEmpty
              open={openPlaceholder}
              onClose={() => setOpenPlaceholder(false)}
              />
              )
              :
              (<BookListLibrary onClick={() => { }} />)
          }
        </>
      )}
    </Container>
  );
}
