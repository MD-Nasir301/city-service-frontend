import Link from "next/link";
import React from "react";

const Header = () => {
  const routes = [
    { name: "Home", url: "/" },
    { name: "Public Complain", url: "/public complain" },
    { name: "Services", url: "/services" },
    { name: "About Us", url: "/about-us" },
  ];

  return (
    <header>
        
      <nav>
        {routes.map((route) => (
          <Link key={route.url} href={route.url}>
            {route.name}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
