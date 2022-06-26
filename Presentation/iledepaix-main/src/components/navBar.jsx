import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import pagesConfig from "./pagesConfig";
import isConnectContext from "../services/isConnect.context";

const NavBar = ({ title, children, currentPage }) => {
  const { isConnect } = useContext(isConnectContext);
  const image =
    "https://www.telesambre.be/sites/telesambre.easydev.be/files/articles/IDP_LOGO_POS-24-CMYK_0.jpg";

  return (
    <div>
      <header className="flex p-4 bg-[#efdddc]">
        <nav className="flex justify-around font-bold w-full">
          <div className="flex items-center">
            <a href="/">
              <img
                src={image}
                alt="ile de paix"
                className="w-26 h-24 rounded-3xl"
              />
            </a>
            {isConnect}
            <ul className="flex text-xl m-4 items-center ">
              {pagesConfig.map((page) => (
                <li
                  className="m-2 text-[#b27d71] duration-200 hover:text-black"
                  key={page.id}
                >
                  <NavLink to="/Page">{page.name}</NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <ul className="flex text-xl m-4 items-center">
              <li className="m-2 py-2 px-6 bg-[#b27d71] text-white rounded-3xl hover:border hover:bg-[#efdddc] border-[#b27d71] hover:text-[#b27d71]">
                <a href="/">Faire un don</a>
              </li>
              <li className="m-2 text-[#b27d71] duration:200 hover:text-black">
                {isConnect ? (
                  <NavLink to="/logout">Déconnexion</NavLink>
                ) : (
                  <NavLink to="/ConnectForm">Connexion</NavLink>
                )}
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <main className="mx-auto">{children}</main>
    </div>
  );
};

export default NavBar;
