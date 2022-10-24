import { createContext, useState, useContext, useEffect } from "react";
import { setToken, getAccessToken, logout } from "../store/AccessTokenStore";
import { verifyJWT } from "../helpers/jwtHelper";
import { getCurrentUser } from "../services/Auth.services";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [isAuthFetched, setIsAuthFetched] = useState(false);

  const login = (token) => {
    setToken(token);
    getUser();
  };

  const getUser = () => {
    getCurrentUser()
    .then((user) => {
      setCurrentUser(user);
      setIsAuthFetched(true);
    });
  };

  useEffect(() => {
    if (getAccessToken()) {
      if (!verifyJWT(getAccessToken())) {
        logout();
      } else {
        getUser();
      }
    } 
  }, []);

  const value = {
    currentUser,
    login,
    getUser,
    isAuthFetched
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
