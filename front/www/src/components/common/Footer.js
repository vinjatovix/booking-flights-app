import React from "react";
import { ListDrawer } from "./ListDrawer/ListDrawer";

export const Footer = () => {
  return (
    <footer className="app-footer">
      Code-Vix &copy; 2021
      <ListDrawer
        type="links"
        items={[
          { children: "login", url: "/login" },
          { children: "register", url: "/register" },
          { children: "about", url: "/about" },
        ]}
      />
    </footer>
  );
};
