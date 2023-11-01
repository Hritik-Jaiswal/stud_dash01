import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios'

const Datatable = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchAllStud = async () => {
      try {
        const res = await axios.get("http://localhost:5000/students");
        console.log(res.data);
        setStudents(res.data);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllStud();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:5000/students/" + id);
      console.log(id)
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  console.log(students)
  
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={"/students/update/" + params.row.id} style={{ textDecoration: "none" }}>
              <div className="viewButton">Update</div>
            </Link>
            <div
              className="deleteButton"
              onClick={()=>{handleDelete(params.row.id)}}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to="/students/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={students}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
