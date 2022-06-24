import './App.css';
import { Route, Routes } from "react-router-dom";
import Login from './components/users/Login';
import Signup from './components/users/Signup';
import Navbar from './components/Utility/Navbar';
import Home from './components/Utility/Home';
import StudentHome from './components/users/StudentHome';
import { useSelector } from "react-redux";
import { clearLoginStatus } from "./slices/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate ,Navigate} from "react-router-dom";

function App() {
  let { userObj, isError, isLoading, isSuccess, errMsg } = useSelector(
    (state) => state.user
  );
  //get dispathc function
  let dispath = useDispatch();

  //get navigate function
  let navigate = useNavigate();

  //logout user
  const userLogout = () => {
    localStorage.clear();
    dispath(clearLoginStatus());
    navigate("/login");
  }
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path='/StudentHome' element={<StudentHome/>}/>
      </Routes>
    </div>
  );
}

export default App;
