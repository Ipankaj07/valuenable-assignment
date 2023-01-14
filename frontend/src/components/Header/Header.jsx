import React from "react";
import { Link } from "react-router-dom";

function Header() {
  const [isAuth, setIsAuth] = React.useState({
    isAuth: false,
    name: "",
  });

  React.useEffect(() => {
    const name = localStorage.getItem("name");
    if (name) {
      setIsAuth({
        isAuth: true,
        name,
      });
    }
  }, []);

  return (
    <>
      <div className="flex bg-gray-700 h-16">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <Link to="/">
              <img
                className="h-12 w-12 ml-4"
                src="https://cdn.svgporn.com/logos/nhost-icon.svg"
                alt="logo"
              />
            </Link>
            <Link to="/policy">
              <h1 className="text-2xl ml-4">Insurance</h1>
            </Link>
          </div>

          <div className="flex items-center mr-8 gap-8">
            <Link to="/policy">
              <p className="text-l">Policy Calculator</p>
            </Link>

            <div
              className="flex items-center gap-6"
              style={{ display: isAuth.isAuth ? "none" : "flex" }}
            >
              <Link to="/login">
                <p className="text-l">Login</p>
              </Link>

              <Link to="/register">
                <p className="text-l">Register</p>
              </Link>
            </div>

            <div
              className="flex items-center gap-6"
              style={{ display: isAuth.isAuth ? "flex" : "none" }}
            >
              <p className="text-[1.1rem]">Welcome <span className="ml-[4px]" >{isAuth.name}</span></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
