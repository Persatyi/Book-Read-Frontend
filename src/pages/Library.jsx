import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isAuth } from "redux/auth";
import { useBooksQuery } from "redux/api/bookAPI";
import { useToggle, useWindowSize } from "hooks";
import BookListLibrary from "components/BookListLibrary";
import Container from "components/Container/Container";
import MoreBtn from "components/MoreBtn/MoreBtn";
import BackBtn from "components/BackBtn/BackBtn";
import LibraryEmpty from "components/LibraryEmpty";
import AddBook from "components/AddBook";

export default function LibraryPage() {
  const auth = useSelector(isAuth);
  const { data = [], isLoading } = useBooksQuery(null, { skip: !auth });
  const size = useWindowSize();
  const [plus, togglePlus] = useToggle();
  const [openPlaceholder, setOpenPlaceholder] = useState(false);
  useEffect(() => {
    if (!data.length) {
      setOpenPlaceholder(true);
    } else setOpenPlaceholder(false);
  }, [data.length]);
  if (isLoading) return <div>Loading...</div>;
  return (
    <Container>
      {size.width < 768 && (
        <>
          {plus && (
            <>
              <MoreBtn onClick={togglePlus} />
              <BookListLibrary />
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
          <BookListLibrary/>
          <LibraryEmpty
            open={openPlaceholder}
            onClose={() => setOpenPlaceholder(false)}
          />
        </>
      )}
    </Container>
  );
}
