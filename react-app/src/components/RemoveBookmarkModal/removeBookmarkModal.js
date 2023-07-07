
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeBookmarkThunk } from "../../store/session";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";

const RemoveBookmarkModal = ({bookmark}) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [errors, setErrors] = useState([]);
  const history = useHistory();


  const removeBookmark = async (e) => {
    e.preventDefault();

    const res = await dispatch(removeBookmarkThunk(bookmark.id))

    if(res?.errors) {
      setErrors(res.errors)
    } else {
      closeModal()
    }
  }

  return (
    <div className='delete-modal'>
    <h2>Confirm Removal</h2>
    <h4 className='delete-modal-confirm'>Are you sure you want to remove this bookmark?</h4>
    <button className='delete-button-yes' onClick={removeBookmark}>Yes (Remove Bookmark)</button>
    <button className='delete-button-no' onClick={closeModal}>No (Keep Bookmark)</button>
  </div>
  )
}

export default RemoveBookmarkModal;
