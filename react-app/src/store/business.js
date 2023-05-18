



// ACTIONS ------------------------------------------------------------------------

const GET_ALL_BUSINESSES = 'businesses/GET_ALL_BUSINESSES';
const GET_ONE_BUSINESS = 'business/GET_ONE_BUSINESS'


export const getAllBusinessesAction = (businesses) => ({
  type: GET_ALL_BUSINESSES,
  businesses
})

export const getOneBusinessAction = (business) => ({
  type: GET_ONE_BUSINESS,
  business
})

// THUNKS -------------------------------------------------------------------------

export const getAllBusinessesThunk = () => async (dispatch) => {
  const res = await fetch(`/api/businesses`);
  const businesses = await res.json();

  dispatch(getAllBusinessesAction(businesses))
}

export const getOneBusinessThunk = (businessId) => async (dispatch) => {
  const res = await fetch(`/api/businesses/${businessId}`);

  if(res.ok) {
    const business = await res.json();

    dispatch(getOneBusinessAction(business))
    return business
  } else {
    const errors = await res.json();
    return errors;
  }
}

// export const createBusinessThunk = ()

// REDUCER ------------------------------------------------------------------------
const initialState = { allBusinesses: {}, currentBusiness: {}}
export default function businessReducer(state = initialState, action) {
  let newState = {};
  switch(action.type) {
    case GET_ALL_BUSINESSES: {
      action.businesses.forEach((business) => {(newState.allBusinesses[business.id] = business)});
      return newState;
    }
    case GET_ONE_BUSINESS: {
      newState = { allBusinesses: {...state.allBusinesses}, currentBusiness: action.business}
      return newState;
    }
    default:
      return state;
  }
}
