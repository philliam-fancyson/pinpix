import { useDispatch} from "react-redux";
import { useEffect, useState } from "react";
import * as sessionActions from "../../redux/session";

// ! May not be needed?
function Sidebar() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     dispatch(sessionActions.thunkAuthenticate()).then(() => setIsLoaded(true));
//   }, [dispatch]);


//   if (!isLoaded) return <h1>Loading</h1>;
  return (
    <nav id="sidebar">
    </nav>
  );
}

export default Sidebar;
