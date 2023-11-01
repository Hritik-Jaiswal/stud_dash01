import { Sidebar, Navbar } from "../../components";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";

import "./update.scss";
import { useLocation, useNavigate } from "react-router-dom";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [student, setStudent] = useState({
    first_name: "",
    surname: "",
    class: "",
    age: "",
    gender: "",
    image: "",
    email: "",
  });

  const navigate = useNavigate();
  const location = useLocation()

  const studID = location.pathname.split('/')[3]
  console.log(studID, "this one")

  const handleChange = (e) => {
    setStudent((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async e => {
    e.preventDefault()
    try {
      const response = await axios.put('http://localhost:5000/students/' + studID, student)
      console.log(response.data) // Log the server response
      navigate('/students')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
              {/* Form */}
              <div className="formInput">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  onChange={handleChange}
                  placeholder="First Name"
                />
              </div>
              <div className="formInput">
                <label htmlFor="class">Class</label>
                <input
                  type="number"
                  name="class"
                  onChange={handleChange}
                  placeholder="Class"
                />
              </div>
              <div className="formInput">
                <label htmlFor="lastName">Surname</label>
                <input
                  type="text"
                  name="lastName"
                  onChange={handleChange}
                  placeholder="Last Name"
                />
              </div>
              <div className="formInput">
                <label htmlFor="age">Age</label>
                <input
                  type="number"
                  name="age"
                  onChange={handleChange}
                  placeholder="your age"
                />
              </div>
              {/* <div className="formInput">
                <label htmlFor="gender">Gender</label>
                <input
                  type="text"
                  name="gender"
                  onChange={handleChange}
                  placeholder="Male/Female"
                />
              </div> */}
              {/* <div className="formInput">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="abcd@someting.com"
                />
              </div> */}
              <button className="form-btn" onClick={handleClick}>Add</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
