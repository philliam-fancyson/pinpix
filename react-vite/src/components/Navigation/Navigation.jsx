import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  const user = useSelector((state) => state.session.user);
  return (
    <nav id="navbar">
      <div id="navbar-left">
        <NavLink to="/">
        {/* TODO: Logo HERE */}
          <h3>PinPix</h3>
        </NavLink>
        <NavLink to="/">
        <button>Home</button>
        </NavLink>
        <NavLink to="/">
          <button>About</button>
        </NavLink>
        {user && (
            <NavLink to="/">
              <button>Create</button>
            </NavLink>
        )}
      </div>
      <div id="navbar-middle">
        <form>
          <input type="search" />
        </form>
      </div>
      <div id="navbar-right">
        {user && (
              <NavLink to="/">
                <button>Collection</button>
              </NavLink>
          )}
        {<ProfileButton />}
        </div>
    </nav>
  );
}

export default Navigation;
