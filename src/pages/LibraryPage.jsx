import React from 'react';
import Library from "components/Library/Library"
import LibraryModal from 'components/LibraryModal/LibraryModal';
import { useSelector, useDispatch} from 'react-redux';
import globalSelectors from '../redux/global/global-selectors';
import { toggleModal } from 'redux/global/global-slice';

export default function LibraryPage() {
  const modalOpen = useSelector(globalSelectors.getIsModal)
  const dispatch = useDispatch();
  const isOpenModal = () => {
    dispatch(toggleModal())
  }
  return (
    <>
      <Library />
      {modalOpen && <LibraryModal />}
    </>
  )
};

