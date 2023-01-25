import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";
import DisplayContainer from "./components/DisplayContainer";
import "./main.css";

function Main() {
  return (
    <>
      <Navbar />
      <div id="mainCont">
        <SideBar />
        <DisplayContainer />
      </div>
    </>
  );
}

export default Main;