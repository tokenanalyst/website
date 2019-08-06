import React, { useState } from "react";
import Link from "next/link";

const links = [
  { href: "", label: "Exchange Flows" },
  { href: "", label: "Bitcoin" },
  { href: "", label: "Ethereum" }
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`;
  return link;
});

const Nav = () => {
  const [selected, setIsSelected] = useState(0);

  return (
    <div>
      <div className="container">
        {links.map(({ key, href, label }) => (
          <NavItem
            key={key}
            href={href}
            label={label}
            isSelected={selected === key}
            onClick={() => setIsSelected(key)}
          />
        ))}
      </div>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: row;
          text-align: left;
          padding-top: 20px;
          padding-left: 20px;
        }
        @media only screen and (max-width: 600px) {
          .container {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

const NavItem = ({ href, label, isSelected, onClick }) => (
  <div className="container">
    <span className="nav-item" onClick={onClick}>
      {label}
    </span>

    <style jsx>{`
      .container {
        padding-bottom: 10px;
        max-width: 200px;
      }
      .nav-item {
        color: white;
        padding-top: 30px;
        background-color: ${isSelected ? "pink" : "green"};
        padding: 10px;
      }
    `}</style>
  </div>
);

export default Nav;
