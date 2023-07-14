import React, { useState, useEffect, useRef } from "react";
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import SearchBar from "../SearchBar/searchBar";
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory();
	const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

	return (
		<div className='nav-bar'>
			<div className='home-button'>
				<NavLink exact to="/">foodie <i className="fa-brands fa-yelp home-icon"/></NavLink>
			</div>
			<div className='search-container'>
				<SearchBar/>
			</div>
			<div className='user-button-container'>
				{isLoaded && !sessionUser && (
					<div className='nav-bar-log-in-buttons'>
							<OpenModalButton
								buttonText="Log In"
								onItemClick={closeMenu}
								className='log-in-button'
								modalComponent={<LoginFormModal />}
							/>
							<OpenModalButton
								buttonText="Sign Up"
								onItemClick={closeMenu}
								className='sign-up-button'
								modalComponent={<SignupFormModal />}
							/>
					</div>
				)}
				{isLoaded && sessionUser && (
					<ProfileButton user={sessionUser} />
				)}
			</div>
		</div>
	);
}

export default Navigation;
