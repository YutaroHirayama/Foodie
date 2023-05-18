import "./createBusinessModal.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createChannelThunk } from "../../store/session";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";

const CreateBusinessModal = ({user}) => {
  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");
  const [users, setUsers] = useState([]);
  const [channelUsers, setChannelUsers] = useState([]);
  const [errors, setErrors] = useState([])
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory();


  return (
    <div className='create-business-modal'>
      <form onSubmit={formSubmit}>
        <h3>Create a New Business Page</h3>
        <ul>
          {errors.map((error, idx) => (
            <li className='form-errors' key={idx}>{error}</li>
          ))}
        </ul>
        <div className='create-business-details'>
          <div className='create-business-name'>
            <label>
              <input
                className='create-business-details-input'
                type='text'
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                required
                placeholder='Name of Business'
                />
            </label>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreateBusinessModal
