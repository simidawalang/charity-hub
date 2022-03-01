import React from "react";
import Link from "next/link";
import { Menu } from "semantic-ui-react";

const Header = () => {
  return (
    <Menu style={{ marginTop: "10px" }}>
      <Menu.Item> CrowdCoin </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item>
          <Link href="/campaigns/new"> Campaigns</Link>
        </Menu.Item>
        <Menu.Item> + </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default Header;
