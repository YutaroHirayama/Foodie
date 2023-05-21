// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const DELETE_BUSINESS = 'business/DELETE_BUSINESS';

const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

export const deleteBusinessAction = (businessId) => ({
  type: DELETE_BUSINESS,
  businessId
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

export const signUp = (username, email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username,
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

export const deleteBusinessThunk = (businessId) => async (dispatch) => {
  const res = await fetch(`/api/business/${businessId}`, {method: 'DELETE'})

  if(res.ok) {
    const deletedBusiness = res.json();
    dispatch(deleteBusinessAction(deletedBusiness.id));
  } else {
    const errors = await res.json();
    return errors;
  }
}

const initialState = { user: null };

export default function reducer(state = initialState, action) {
	let newState = {}
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };
		case DELETE_BUSINESS: {
			newState = { ...state, user: {...state.user, businessesOwned: {...state.user.businessesOwned}}}

			newState.user.businessesOwned.filter(business => business.id != action.businessId)
			return newState
		}
		default:
			return state;
	}
}
