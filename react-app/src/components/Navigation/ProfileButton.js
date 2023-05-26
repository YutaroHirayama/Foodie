import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useHistory, NavLink } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory();

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

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push('');
  };

  const handleProfile = (e) => {
    e.preventDefault();
    history.push('/profile');
    setShowMenu(false)
  }

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>

      <i onClick={openMenu} className="fas fa-user-circle profile-button" />

      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li className='dropdown-item'>Welcome {user.username}!</li>
            <li className='dropdown-item'>{user.email}</li>
            <button
              className='dropdown-item dropdown-button'
              onClick={handleProfile}
              >
                <i className="fa-regular fa-circle-user icon dropdown-profile-link"/>Profile
              </button>
            <button className='dropdown-item dropdown-button' onClick={handleLogout}>Log Out</button>

          </>
        ) : (
          <>
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
