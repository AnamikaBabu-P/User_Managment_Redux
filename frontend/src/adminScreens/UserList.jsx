import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useUserDetailsQuery, useDeleteUserMutation } from '../slices/adminApiSlice';
import './UserList.css';
import { toast } from 'react-toastify'

const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deleteUser] = useDeleteUserMutation();
 
  const { data: userData, error, isLoading , refetch } = useUserDetailsQuery();
  const [search, setSearch] = useState('');
  useEffect(() => {
    refetch(); 
  }, [navigate, refetch]);
  const editHandler =async (id)=>{
    try {
     navigate(`/admin/user-data/${id}`)
    } catch (error) {
      console.log(error);
    }
  }

  const createHandler = async (id) => {
    try {
      navigate("/admin/create-user");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandler = async (id) => {
    try {
      const data = await deleteUser(id);
      refetch();
      toast.success("User Deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const filteredUsers = userData?.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) return <div className="text-center">Loading...</div>;

  return (
    <div className="container mt-5">
      <h1 className="text-center text-white mb-4">User List</h1>

      <div className="form-group mb-4">
        <input
          type="text"
          className="form-control search-bar"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
       <div className="form-group mb-4" >
       <button onClick={createHandler} className="create-user-btn">
       Create User
    </button>
       </div>
     
      <table className="table table-striped table-hover table-dark">
        <thead>
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers && filteredUsers.length > 0 ? (
            filteredUsers.map((item) => (
              <tr key={item._id}>
                <td>
                  <div className="img-container">
                    <img
                      src={item.image?.url}
                      alt="User"
                      className="img-fluid"
                    />
                  </div>
                </td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>
                  <button onClick={() => editHandler(item._id)} className="btn btn-primary btn-sm">Edit</button>
                </td>
                <td>
                  <button onClick={()=> deleteHandler(item._id)} className="btn btn-danger btn-sm">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                Users not found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
