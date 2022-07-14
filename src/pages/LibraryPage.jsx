import React, {useState} from 'react'
import { useSelector, useDispatch} from 'react-redux';
import useWindowSize from 'hooks/use-winsow-size';
import Library from "components/Library/Library"
import LibraryModal from 'components/LibraryModal/LibraryModal';
import globalSelectors from '../redux/global/global-selectors';
import { toggleModal } from 'redux/global/global-slice';
import Plus from 'assets/images/library/Plus';
import Back from '../assets/images/library/Back';

export default function LibraryPage() {
  const [openLibrary, setOpenLibrary] = useState(false);
  const [plus, setPlus] = useState(true);
  const dispatch = useDispatch();
  const size = useWindowSize();
  const modalOpen = useSelector(globalSelectors.getIsModal)
  const isOpenModal = () => {
    dispatch(toggleModal())
  }
  const isLibraryToggle = () => {
    setOpenLibrary(!openLibrary)
    setPlus(!plus)
  }
  return (
    <>
      {size.width < 768 && (
        <>
          {plus && <Plus onClick={isLibraryToggle} />}
          {openLibrary && (
            <>
              <Back onClick={isLibraryToggle} />
              <Library />
            </>
          )}
      </>
      )}
      {size.width > 768 && (
        <>
        <Library />
        </>
      )}
      {modalOpen && <LibraryModal />}
    </>
  )
};

