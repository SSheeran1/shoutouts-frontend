import "./Header.css";
import { signInWithGoogle, signOut } from "../firebaseConfig";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Header = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="Header">
      <h1>Shout Outs</h1>
      {user ? (
        <div>
          <p>{user.displayName}</p>
          <button onClick={signOut}>Sign out</button>
        </div>
      ) : (
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      )}
    </div>
  );
};

export default Header;
