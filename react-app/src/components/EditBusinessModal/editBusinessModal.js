import "./editBusinessModal.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editBusinessThunk } from "../../store/business";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";

const EditBusinessModal = ({business}) => {
  const [name, setName] = useState(business.name);
  const [phoneNumber, setPhoneNumber] = useState(business.phoneNumber);
  const [address, setAddress] = useState(business.address);
  const [city, setCity] = useState(business.city);
  const [state, setState] = useState(business.state);
  const [zipcode, setZipcode] = useState(business.zipcode);
  const [lat, setLat] = useState(business.lat);
  const [lng, setLng] = useState(business.lng);
  const [price, setPrice] = useState(business.price);
  const [hours, setHours] = useState(business.hours);
  const [description, setDescription] = useState(business.description);
  const [category, setCategory] = useState(business.category);
  const [website, setWebsite] = useState(business.website)

  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory();

  const formSubmit = async (e) => {
    e.preventDefault();
    const updatedBusiness = {
      id: business.id,
      name,
      phoneNumber,
      address,
      city,
      state,
      zipcode,
      price,
      description,
      category,
      website
    };

    const res = await dispatch(editBusinessThunk(updatedBusiness))
    if(res?.errors) {
      setErrors(res.errors)
    } else {
      closeModal()
      history.push(`/business/${res}`)
    }
  }

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
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder='Name of Business'
                />
            </label>
          </div>

          <div className='create-business-phone-number'>
            <label>
              <input
                className='create-business-details-input'
                type='text'
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                placeholder='Business Phone Number'
                />
            </label>
          </div>

          <div className='create-business-address'>
            <label>
              <input
                className='create-business-details-input'
                type='text'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                placeholder='Street Address'
                />
            </label>
          </div>

          <div className='create-business-city'>
            <label>
              <input
                className='create-business-details-input'
                type='text'
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                placeholder='City'
                />
            </label>
          </div>

          <div className='create-business-state'>
            <label>
              <input
                className='create-business-details-input'
                type='text'
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
                placeholder='State'
                />
            </label>
          </div>

          <div className='create-business-zipcode'>
            <label>
              <input
                className='create-business-details-input'
                type='text'
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
                required
                placeholder='Zipcode'
                />
            </label>
          </div>

          <div className='create-business-website'>
            <label>
              <input
                className='create-business-details-input'
                type='text'
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                required
                placeholder='Website'
                />
            </label>
          </div>

          <div className='create-business-category'>
            <label>
              Your Business Category (ex: Bars Burgers American)
              <input
                className='create-business-details-input'
                type='text'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                placeholder='Categories'
                />
            </label>
          </div>

          <div className='create-business-price'>
            <label>
              Select a price range per person
              <select value={price} onChange={(e) => setPrice(e.target.value)}>
                <option value="$">$   (~$10)</option>
                <option value="$$">$$   ($10 - $30)</option>
                <option value="$$$">$$$   ($30 - $60)</option>
                <option value="$$$$">$$$$   ($60+)</option>
              </select>
            </label>
          </div>
        </div>
        <div classname='create-business-description-container'>
          <div className='create-business-description'>
            <label>
              Description of your Business
              <textarea
                className='create-business-details-input'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder='About the Business'
                />
            </label>
          </div>
        </div>
        <div className="create-business-submit">
            <button className="create-business-submit-button">Create Page</button>
        </div>
      </form>
    </div>
  )
}

export default EditBusinessModal
