import React from 'react';
import { useParams } from 'react-router-dom';
import { activateAccount } from '../services/Auth.services';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from './../contexts/AuthContext';
import { useLocation } from 'react-router-dom';

export default function LoadingScreen() {
    const { token } = useParams()
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useContext(AuthContext);

    useEffect(() => {
      if (token) {
        activateAccount(token)
          .then((res) => {
            if (res.status === 202) {
              navigate("/");
            }
            navigate("/login");
          })
          .catch(navigate("/login"));
      } else {
        const accessToken = Object.fromEntries(new URLSearchParams(location.search));
        login(accessToken.callbackToken);
        navigate("/", { replace: true });
      }
    }, [token, navigate, location.search, login])

  return (
    <div>Loading...</div>
  )
}
