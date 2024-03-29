



// ACTIONS ------------------------------------------------------------------------

const GET_ALL_BUSINESSES = 'businesses/GET_ALL_BUSINESSES';
const GET_ONE_BUSINESS = 'business/GET_ONE_BUSINESS';
const CREATE_BUSINESS = 'business/CREATE_BUSINESS';
const EDIT_BUSINESS = 'business/EDIT_BUSINESS';
const CREATE_REVIEW = 'review/CREATE_REVIEW';



export const getAllBusinessesAction = (businesses) => ({
  type: GET_ALL_BUSINESSES,
  businesses
});

export const getOneBusinessAction = (business) => ({
  type: GET_ONE_BUSINESS,
  business
});

export const createBusinessAction = (business) => ({
  type: CREATE_BUSINESS,
  business
});

export const editBusinessAction = (business) => ({
  type: EDIT_BUSINESS,
  business
});

export const createReviewAction = (review) => ({
  type: CREATE_REVIEW,
  review
})



// THUNKS -------------------------------------------------------------------------

export const getAllBusinessesThunk = () => async (dispatch) => {
  const res = await fetch(`/api/business`);
  const businesses = await res.json();

  dispatch(getAllBusinessesAction(businesses))
};

export const getSearchResultsThunk = (keywords) => async (dispatch) => {
  console.log('keywords THUNK ---->', keywords)
  const res = await fetch(`/api/business/search/${keywords}`);
  const businesses = await res.json();

  dispatch(getAllBusinessesAction(businesses))
};

export const getOneBusinessThunk = (businessId) => async (dispatch) => {
  const res = await fetch(`/api/business/${businessId}`);

  if(res.ok) {
    const business = await res.json();

    dispatch(getOneBusinessAction(business))
    return business
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const createBusinessThunk = (business) => async (dispatch) => {
  console.log('BUSINESS------>', ...business)
  const res = await fetch(`/api/business`,
  {
    method: 'POST',
    body: business
  });

  if(res.ok) {
    const newBusiness = await res.json();
    dispatch(createBusinessAction(newBusiness));
    return newBusiness.id
  } else {
    const errors = await res.json();
    return errors;
  };
};

export const editBusinessThunk = (business, businessId) => async (dispatch) => {
  const {id, name, phoneNumber, address, city, state, zipcode, lat, lng, price, description, category, website} = business;
  const res = await fetch(`/api/business/${businessId}`,
  {
    method: 'PUT',
    body: business
  });

  if(res.ok) {
    const updatedBusiness = await res.json();
    dispatch(editBusinessAction(updatedBusiness));
    return updatedBusiness.id
  } else {
    const errors = await res.json();
    return errors;
  }
}


export const createReviewThunk = (review, businessId) => async (dispatch) => {
  const res = await fetch(`/api/review/business/${businessId}`,
  {
    method: 'POST',
    // headers: {
    //   "Content-Type": "application/json",
    // },
    body: review
  })

  if(res.ok) {
    const newReview = await res.json();
    dispatch(createReviewAction(newReview));
  } else {
    const errors = await res.json();
    return errors;
  };
}


// REDUCER ------------------------------------------------------------------------
const initialState = { allBusinesses: {}, currentBusiness: {}}
export default function businessReducer(state = initialState, action) {
  switch(action.type) {
    case GET_ALL_BUSINESSES: {
      const newState = {...state, allBusinesses: [...action.businesses], currentBusiness: {...state.currentBusiness}}
      return newState;
    };
    case GET_ONE_BUSINESS: {
      const newState = { ...state, allBusinesses: {...state.allBusinesses}, currentBusiness: action.business}
      return newState;
    };
    case CREATE_BUSINESS: {
      const newState = { ...state, allBusinesses: {...state.allBusinesses, [action.business.id]: action.business}, currentBusiness: {...state.currentBusiness}}
      return newState;
    };
    case EDIT_BUSINESS: {
      const newState = { ...state, allBusinesses: {...state.allBusinesses, [action.business.id]: action.business}, currentBusiness: action.business}
      return newState;
    };
    case CREATE_REVIEW: {
      const newReviews = [action.review, ...state.currentBusiness.reviews]
      const newState = { ...state, allBusinesses: {...state.allBusinesses}, currentBusiness: {...state.currentBusiness, reviews: newReviews}}
      return newState;
    }
    default:
      return state;
  }
}
