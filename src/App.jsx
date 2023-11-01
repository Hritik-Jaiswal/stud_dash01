import { Home, Login, List, Single, New, Update, Register } from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext, useState, useEffect } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { Profile } from "./components";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:5000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
          setIsLoggedIn(true)
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);



  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={isLoggedIn ? <Home user={user}/> : <Login user={user}/>} />
            <Route path="/user/register" element={<Register />} />
            <Route path="/user/login" element={<Login />} />
            <Route path="students">
              <Route index element={<List />} />
              <Route path="update/:id" element={<Update/>}/>
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="/profile" element={<Profile user={user} />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
