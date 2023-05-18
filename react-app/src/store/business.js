



// ACTIONS ------------------------------------------------------------------------

const GET_ALL_BUSINESSES = 'businesses/GET_ALL_BUSINESSES';
const GET_ONE_BUSINESS = 'business/GET_ONE_BUSINESS'
const CREATE_BUSINESS = 'business/CREATE_BUSINESS'


export const getAllBusinessesAction = (businesses) => ({
  type: GET_ALL_BUSINESSES,
  businesses
})

export const getOneBusinessAction = (business) => ({
  type: GET_ONE_BUSINESS,
  business
})

export const createBusinessAction = (business) => ({
  type: CREATE_BUSINESS,
  business
})

// THUNKS -------------------------------------------------------------------------

export const getAllBusinessesThunk = () => async (dispatch) => {
  const res = await fetch(`/api/business`);
  const businesses = await res.json();

  dispatch(getAllBusinessesAction(businesses))
}

export const getOneBusinessThunk = (businessId) => async (dispatch) => {
  const res = await fetch(`/api/business/${businessId}`);

  if(res.ok) {
    const business = await res.json();
    console.log('inside get one business thunk res', business)
    dispatch(getOneBusinessAction(business))
    return business
  } else {
    const errors = await res.json();
    return errors;
  }
}

export const createBusinessThunk = (business) => async (dispatch) => {
  const {name, phoneNumber, address, city, state, zipcode, price, description, category, website} = business
  console.log('business in thunk', business)
  const res = await fetch(`/api/business`,
  {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
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
    })
  })

  if(res.ok) {
    const newBusiness = await res.json();
    dispatch(createBusinessAction(newBusiness))
    return newBusiness.id
  } else {
    const errors = await res.json();
    return errors;
  }
}



// REDUCER ------------------------------------------------------------------------
const initialState = { allBusinesses: {}, currentBusiness: {}}
export default function businessReducer(state = initialState, action) {
  let newState = {};
  switch(action.type) {
    case GET_ALL_BUSINESSES: {
      newState = {allBusinesses: [...action.businesses], currentBusiness: {...state.currentBusiness}}
      return newState;
    };
    case GET_ONE_BUSINESS: {
      newState = { allBusinesses: {...state.allBusinesses}, currentBusiness: action.business}
      console.log('inside new state')
      return newState;
    };
    case CREATE_BUSINESS: {
      newState = { allBusinesses: {...state.allBusinesses, [action.business.id]: action.business}, currentBusiness: {...state.currentBusiness}}
    }
    default:
      return state;
  }
}
