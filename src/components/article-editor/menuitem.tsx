import React from "react";

type MenuItemProps = {
  icon?: string;
  title?: string;
  isActive?: () => boolean;
  action?: () => void;
};

const MenuItem: React.FunctionComponent<MenuItemProps> = ({ icon, title, action, isActive = null }) => (
  <li
    onClick={action}
    title={title}>
    <i className={`${isActive && isActive() ? "active" : ""} ri-${icon}`}></i>
  </li>
);

export default MenuItem;
