import React, { useContext, useState } from 'react';
import AuthContext from '../../contexts/AuthContext';
import { editUserData } from '../../services/MyArea.services';
import './AccountForm.css';
import { useEffect } from 'react';

export default function AccountForm() {
  const [mongoErr, setMongoErr] = useState("");
  const [userData, setUserData] = useState({});
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser){
      setUserData({ name: currentUser.name, phoneNumber: currentUser.phoneNumber })
    }

  }, [currentUser])

  const handleOnChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setUserData({ ...userData, [name]: files[0] });
    } else {
      setUserData({ ...userData, [name]: value });
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    for (let data in userData) {
      formData.append(data, userData[data]);
    }

    editUserData(currentUser.id, formData)
      .then((res) => {
        window.location.reload()
      })
      .catch(
        (err) => {
          err?.response?.data.message && setMongoErr(err.response.data.message)}
      );
  };

  return (
    currentUser && (
      <div className="user-data-container">
        <form onSubmit={handleOnSubmit}>
          <div>
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              defaultValue={userData.name}
              name="name"
              id="name"
              onChange={handleOnChange}
              className={`form-control ${
                mongoErr === "Name is required." ? "is-invalid" : ""
              }`}
            ></input>
            {mongoErr === "Name is required." && (
              <div className="invalid-feedback">{mongoErr}</div>
            )}
          </div>

          <div>
            <label htmlFor="image" className="form-label">
              Image
            </label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={handleOnChange}
              className="form-control"
            ></input>
          </div>

          <div>
            <label htmlFor="phoneNumber" className="form-label">
              Phone number
            </label>
            <input
              type="text"
              defaultValue={userData.phoneNumber}
              name="phoneNumber"
              id="phoneNumber"
              onChange={handleOnChange}
              className="form-control"
            ></input>
          </div>
          <button>EDIT</button>
        </form>
      </div>
    )
  );
}
