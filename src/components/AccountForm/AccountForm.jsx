import React, { useContext, useState } from 'react';
import AuthContext from '../../contexts/AuthContext';
import { editUserData } from '../../services/MyArea.services';
import './AccountForm.css';

export default function AccountForm() {
  const [mongoErr, setMongoErr] = useState("");
  const [userData, setUserData] = useState("");
  const { currentUser } = useContext(AuthContext);

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
        (err) => err?.response?.data && setMongoErr(err.response.data.errors)
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
              defaultValue={currentUser?.name}
              name="name"
              id="name"
              onChange={handleOnChange}
              className={`form-control ${mongoErr?.name ? "is-invalid" : ""}`}
            ></input>
            {mongoErr?.name && (
              <div className="invalid-feedback">{mongoErr?.name}</div>
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
              className={`form-control ${mongoErr?.image ? "is-invalid" : ""}`}
            ></input>
            {mongoErr?.image && (
              <div className="invalid-feedback">{mongoErr?.image}</div>
            )}
          </div>

          <div>
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              defaultValue={currentUser?.email}
              name="email"
              id="email"
              onChange={handleOnChange}
              className={`form-control ${mongoErr?.email ? "is-invalid" : ""}`}
            ></input>
            {mongoErr?.email && (
              <div className="invalid-feedback">{mongoErr?.email}</div>
            )}
          </div>

          <div>
            <label htmlFor="phoneNumber" className="form-label">
              Phone number
            </label>
            <input
              type="text"
              defaultValue={currentUser?.phoneNumber}
              name="phoneNumber"
              id="phoneNumber"
              onChange={handleOnChange}
              className={`form-control ${
                mongoErr?.phoneNumber ? "is-invalid" : ""
              }`}
            ></input>
            {mongoErr?.phoneNumber && (
              <div className="invalid-feedback">{mongoErr?.phoneNumber}</div>
            )}
          </div>
          <button>EDIT</button>
        </form>
      </div>
    )
  );
}
