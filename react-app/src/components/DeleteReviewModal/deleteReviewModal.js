import "./deleteReviewModal.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteReviewThunk } from "../../store/session";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { getOneBusinessThunk } from "../../store/business";

const DeleteReviewModal = ({review}) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [errors, setErrors] = useState([]);
  const history = useHistory();


  const deleteReview = async (e) => {
    e.preventDefault();

    const res = await dispatch(deleteReviewThunk(review.id))
    dispatch(getOneBusinessThunk(review.businessId))
    if(res?.errors) {
      setErrors(res.errors)
    } else {

      closeModal()
    }
  }

  return (
    <div className='delete-modal'>
    <h2>Confirm Delete</h2>
    <h4 className='delete-modal-confirm'>Are you sure you want to delete this review?</h4>
    <button className='delete-button-yes' onClick={deleteReview}>Yes (Delete Review)</button>
    <button className='delete-button-no' onClick={closeModal}>No (Keep Review)</button>
  </div>
  )
}

export default DeleteReviewModal;
