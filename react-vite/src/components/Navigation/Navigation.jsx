import {  useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";

function Navigation() {
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  return (
    <nav id="navbar">
      <div id="navbar-left">
        {/* <NavLink to="/">
        TODO: Logo HERE
        </NavLink> */}
        <NavLink to="/">
        <button className="nav-button">Home</button>
        </NavLink>
        <NavLink to="/about">
        <button className="nav-button">About</button>
        </NavLink>
        {user && (
            <NavLink to="/create">
              <button className="nav-button">Create</button>
            </NavLink>
        )}
      </div>
      <div id="navbar-middle">
        {/* <form>
          <input type="search" />
        </form> */}
      </div>
      <div id="navbar-right">
        {user ? (
            <>
                <NavLink to={`/boards/${user.username}`}>
                  <button className="nav-button">Boards</button>
                </NavLink>
                <ProfileButton />
            </>
          ) : (
            <div className="nav-button-modal">
              <OpenModalButton
                buttonText="Login"
                onButtonClick={closeMenu}
                modalComponent={<LoginFormModal />}
                />
              <OpenModalButton
                buttonText="Sign Up"
                onButtonClick={closeMenu}
                modalComponent={<SignupFormModal />}
                />
            </div>
          )}

        </div>
    </nav>
  );
}

export default Navigation;
