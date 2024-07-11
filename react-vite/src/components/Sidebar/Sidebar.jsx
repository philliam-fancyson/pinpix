import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as sessionActions from "../../redux/session";

function Sidebar() {


  // function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);


  if (!isLoaded) return <h1>Loading</h1>;
  return (
    <nav id="sidebar">
    </nav>
  );
}

export default Sidebar;
