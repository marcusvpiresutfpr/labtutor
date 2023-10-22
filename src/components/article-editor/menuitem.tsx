import React from "react";

type MenuItemProps = {
  icon?: string;
  title?: string;
  isActive?: () => boolean;
  action?: () => void;
};

const MenuItem: React.FunctionComponent<MenuItemProps> = ({ icon, title, action, isActive = null }) => (
  <button
    className={`menu-item${isActive && isActive() ? " is-active" : ""}`}
    onClick={action}
    title={title}>
    <i className={`ri-${icon}`}></i>
  </button>
);

export default MenuItem;
