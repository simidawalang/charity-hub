import React from "react";
import Link from "next/link";
import { Menu } from "semantic-ui-react";

const Header = () => {
  return (
    <nav>
      <Link href="/">
        <h1 className="nav-brand">CharityHub</h1>
      </Link>
      <ul className="nav-list">
        <li className="nav-item">
          <Link href="/">
            <Menu.Item>Charities</Menu.Item>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/campaigns/new">+</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
