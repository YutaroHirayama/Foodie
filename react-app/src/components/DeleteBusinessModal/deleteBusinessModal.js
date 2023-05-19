import "./deleteBusinessModal.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteBusinessThunk } from "../../store/session";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";

const DeleteBusinessModal = ({business}) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [errors, setErrors] = useState([]);


  const deleteBusiness = async (e) => {
    e.preventDefault();

    const res = await dispatch(deleteBusinessThunk(business.id))

    if(res?.errors) {
      setErrors(res.errors)
    } else {
      closeModal()
    }
  }
  return (
    <div className='delete-modal'>
    <h2>Confirm Delete</h2>
    <h4 className='delete-modal-confirm'>Are you sure you want to delete this business page?</h4>
    <button id='delete-button-yes' onClick={deleteBusiness}>Yes (Delete Business)</button>
    <button id='delete-button-no' onClick={closeModal}>No (Keep Page)</button>
  </div>
  )
}

export default DeleteBusinessModal;
