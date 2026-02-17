import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div style={{ padding: "20px", background: "#eee" }}>
      <Link to="/">Home</Link> | 
      <Link to="/register"> Register</Link>
    </div>
  );
};

export default Navbar;
