import { useSelector } from "react-redux";
import "./Main.css";
import LoginFormPage from "../LoginFormPage";

function Main() {
  const user = useSelector((state) => state.session.user);
  if (!user?.id) return <LoginFormPage />;

  return (
    <>
      <h1>Test H1</h1>
    </>
  );
}

export default Main;
