// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const GET_BUSINESSES = 'session/GET_BUSINESSES'
const DELETE_BUSINESS = 'session/DELETE_BUSINESS';
const GET_REVIEWS = 'session/GET_REVIEWS';
const EDIT_REVIEW = 'session/EDIT_REVIEW';
const DELETE_REVIEW = 'session/DELETE_REVIEW';
const GET_BOOKMARKS = 'session/GET_BOOKMARKS';

const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

export const fetchBusinessesAction = (businesses) => ({
	type: GET_BUSINESSES,
	businesses
})

export const deleteBusinessAction = (businessId) => ({
  type: DELETE_BUSINESS,
  businessId
})

export const fetchReviewsAction = (reviews) => ({
	type: GET_REVIEWS,
	reviews
})

export const editReviewAction = (review) => ({
	type: EDIT_REVIEW,
	review
})

export const deleteReviewAction = (reviewId) => ({
	type: DELETE_REVIEW,
	reviewId
})

export const fetchBookmarksAction = (bookmarks) => ({
	type: GET_BOOKMARKS,
	bookmarks
})

export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp = (user) => async (dispatch) => {
			const {firstName, lastName, email, username, profilePic, password} = user
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          firstName,
          lastName,
          profilePic
        }),
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(setUser(data));
        return null;
      } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
          return data.errors;
        }
      } else {
        const data = await response.json();

        return data
      }
    };

export const fetchBusinessesThunk = () => async (dispatch) => {
	const res = await fetch('/api/business/user')

	if(res.ok) {
		const businesses = await res.json();

		dispatch(fetchBusinessesAction(businesses))
	} else {
		const errors = await res.json();
    return errors;
	}
}

export const deleteBusinessThunk = (businessId) => async (dispatch) => {
  const res = await fetch(`/api/business/${businessId}`, {method: 'DELETE'})

  if(res.ok) {
    const deletedBusiness = res.json();
    dispatch(deleteBusinessAction(businessId));
  } else {
    const errors = await res.json();
    return errors;
  }
}

export const fetchReviewsThunk = () => async (dispatch) => {
	const res = await fetch('/api/review/user')

	if(res.ok) {
		const reviews = await res.json();
		dispatch(fetchReviewsAction(reviews))
	} else {
		const errors = await res.json();
    return errors;
	}
}

export const editReviewThunk = (review) => async (dispatch) => {
	const {reviewId, reviewText, rating, image1, image2, image3} = review;

	const res = await fetch(`/api/review/${reviewId}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
			reviewText,
			rating,
			image1,
			image2,
			image3
    })
  });

  if(res.ok) {
    const updatedReview = await res.json();
    dispatch(editReviewAction(updatedReview));
  } else {
    const errors = await res.json();
    return errors;
  };
}

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
	const res = await fetch(`/api/review/${reviewId}`, {method: 'DELETE'})

	if(res.ok) {
    const deletedReview = res.json();
    dispatch(deleteReviewAction(reviewId));
  } else {
    const errors = await res.json();
    return errors;
  }
}

const initialState = { user: null };

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };
		case GET_BUSINESSES: {
			const newState = { ...state, user: {...state.user, businessesOwned: action.businesses}}
			return newState
		}
		case DELETE_BUSINESS: {

			const newState = { ...state, user: {...state.user, businessesOwned: [...state.user.businessesOwned]}}
			const newBusinesses = newState.user.businessesOwned.filter(business => business.id !== action.businessId)
			newState.user.businessesOwned = newBusinesses
			return newState
		};
		case GET_REVIEWS: {
			const newState = { ...state, user: {...state.user, reviews: action.reviews}}
			return newState
		};
		case EDIT_REVIEW: {
			const updatedReviews = state.user.reviews.map(review => {
				if(review.id == action.review.id) {
					return action.review
				} else {
					return review
				}
			})
			const newState = { ...state, user: {...state.user, reviews: updatedReviews}}
			return newState
		}
		case DELETE_REVIEW: {
			const newState = { ...state, user: {...state.user, reviews: [...state.user.reviews]}}
			const newReviews = newState.user.reviews.filter(review => review.id !== action.reviewId)
			newState.user.reviews = newReviews
			return newState
		}
		default:
			return state;
	}
}
