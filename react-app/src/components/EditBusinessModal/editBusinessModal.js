import "./editBusinessModal.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editBusinessThunk } from "../../store/business";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { deleteBusinessImageThunk } from "../../store/session";

const EditBusinessModal = ({business}) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory();

  const [name, setName] = useState(business.name);
  const [phoneNumber, setPhoneNumber] = useState(business.phoneNumber);
  const [address, setAddress] = useState(business.address);
  const [city, setCity] = useState(business.city);
  const [state, setState] = useState(business.state);
  const [zipcode, setZipcode] = useState(business.zipcode);
  const [lat, setLat] = useState(business.lat);
  const [lng, setLng] = useState(business.lng);
  const [price, setPrice] = useState(business.price);
  // const [hours, setHours] = useState(business.hours);
  const [description, setDescription] = useState(business.description);
  const [category, setCategory] = useState(business.category);
  const [website, setWebsite] = useState(business.website);
  const [image1, setImage1] = useState(business.businessImages[0]);
  const [image2, setImage2] = useState(business.businessImages[1]);
  const [image3, setImage3] = useState(business.businessImages[2]);

  const [errors, setErrors] = useState([]);

  const formSubmit = async (e) => {
    e.preventDefault();

    const formData = await new FormData();
    console.log('TYPE OF IMAGE 1', typeof(image1), image1)
    formData.append('name', name);
    formData.append('phoneNumber', phoneNumber);
    formData.append('address', address);
    formData.append('city', city);
    formData.append('state', state);
    formData.append('zipcode', zipcode);
    formData.append('lat', lat);
    formData.append('lng', lng);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('website', website);
    formData.append('image1', image1);
    formData.append('image2', image2);
    formData.append('image3', image3);

    const res = await dispatch(editBusinessThunk(formData, business.id))
    if(res?.errors) {
      setErrors(res.errors)
    } else {
      closeModal()
      history.push(`/business/${res}`)
    }
  }

  const deleteImage = async (e, image) => {
    e.preventDefault();
    const res = await dispatch(deleteBusinessImageThunk(business.id, image))
    if(res?.errors) {
      setErrors(res.errors)
    }
  }

  return (
    <div className='business-modal'>
      <form className='business-form' onSubmit={formSubmit}>
      <div className='form-title'>Update Business</div>
        <ul>
          {errors.map((error, idx) => (
            <li className='form-errors' key={idx}>{error}</li>
          ))}
        </ul>

        <div className='business-details'>
          <div className='business-name'>
            <label> Name
              <input
                className='business-details-input'
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder='Name of Business'
                />
            </label>
          </div>

          <div className='business-phone-number'>
            <label> Phone Number
              <input
                className='business-details-input'
                type='text'
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                placeholder='Business Phone Number'
                />
            </label>
          </div>

          <div className='business-address'>
            <label> Address
              <input
                className='business-details-input'
                type='text'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                placeholder='Street Address'
                />
            </label>
          </div>

          <div className='business-city'>
            <label>
              <input
                className='business-details-input'
                type='text'
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                placeholder='City'
                />
            </label>
          </div>

          <div className='business-state'>
            <label>
              <input
                className='business-details-input'
                type='text'
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
                placeholder='State'
                />
            </label>
          </div>

          <div className='business-zipcode'>
            <label>
              <input
                className='business-details-input'
                type='text'
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
                required
                placeholder='Zipcode'
                />
            </label>
          </div>

          <div className='business-lat'>
            <label>
              <input
                className='business-details-input'
                type='number'
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                required
                placeholder='Latitude'
                />
            </label>
          </div>

          <div className='business-lng'>
            <label>
              <input
                className='business-details-input'
                type='number'
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                required
                placeholder='Longitude'
                />
            </label>
          </div>

          <div className='business-website'>
            <label> Website (Optional)
              <input
                className='business-details-input'
                type='text'
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder='Website'
                />
            </label>
          </div>

          <div className='business-category'>
            <label>
              Your Business Category (ex: Bars Burgers American) (Optional)
              <input
                className='business-details-input'
                type='text'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder='Categories'
                />
            </label>
          </div>

          <div className='business-price'>
            <label>
              Select a price range per person:
              <select className='business-details-input' value={price} onChange={(e) => setPrice(e.target.value)}>
                <option value="$">$   (~$10)</option>
                <option value="$$">$$   ($10 - $30)</option>
                <option value="$$$">$$$   ($30 - $60)</option>
                <option value="$$$$">$$$$   ($60+)</option>
              </select>
            </label>
          </div>
        </div>
        <div className='business-description-container'>
          <div className='business-description'>
            <label>
              Description of your Business (Optional)
              <textarea
                className='business-details-input description-input'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder='About the Business'
                />
            </label>
          </div>
        </div>
        <div className='business-images-container'>
          <label>Upload images for your business below (Optional)</label>
            <div className='business-image-input-container'>
              {image1 && image1.type !== 'image/jpeg' && (
                <div className='business-image-loaded-container'>
                  <img className='business-image-loaded' src={image1}/>
                  <button
                    className='business-image-loaded-button'
                    type='button'
                    value={image1}
                    onClick={(e) => deleteImage(e.target.value)}>
                      <i className="fa-regular fa-trash-can"/>
                  </button>
                </div>
                // <input
                // className='business-image-input'
                // type='text'
                // value={image1}
                // onChange={(e) => setImage1(e.target.value)}
                // placeholder='Main Image Url'
                // />
              )}
              {(!image1 || image1.type === 'image/jpeg') && (
                <input
                className='business-image-input'
                type='file'
                accept='image/*'
                onChange={(e) => setImage1(e.target.files[0])}
                placeholder='Main Image Url'
                />
              )}
              {image2 && (
                <input
                className='business-image-input'
                type='text'
                value={image2}
                onChange={(e) => setImage2(e.target.value)}
                placeholder='Url'
                />
              )}
              {!image2 && (
                <input
                className='business-image-input'
                type='file'
                accept='image/*'
                onChange={(e) => setImage2(e.target.files[0])}
                placeholder='Url'
                />
              )}
              {image3 && (
                <input
                className='business-image-input'
                type='text'
                value={image3}
                onChange={(e) => setImage3(e.target.value)}
                placeholder='Url'
                />
              )}
              {!image3 && (
                <input
                className='business-image-input'
                type='file'
                accept='image/*'
                onChange={(e) => setImage3(e.target.files[0])}
                placeholder='Url'
                />
              )}
            </div>
        </div>
        <div className="business-submit">
            <button className="business-submit-button">Update</button>
        </div>
      </form>
    </div>
  )
}

export default EditBusinessModal
