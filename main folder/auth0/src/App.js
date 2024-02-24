import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const {user, isAuthenticated, logout, loginWithRedirect } = useAuth0();
  console.log(user)
  return (
    <> 
      <div>

      {isAuthenticated ? (
        <div>
        <button
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
        >
          Log Out
        </button>
          <h1>WElcome , {user.email} </h1>
          <p>{user.picture}</p>
          </div>
        ) : (
          <button onClick={() => loginWithRedirect()}>Log In</button>
          
          )}
      </div>
    </>
  );
};

export default LoginButton;
