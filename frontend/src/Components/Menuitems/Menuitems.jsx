import { useState } from "react";
import Dropdown from "../Dropdown/Dropdown";

const MenuItems = ({ items, depthLevel }) => {
  const [dropdown, setDropdown] = useState(false);
  const handleClick = () => {
    console.log("click");
    setDropdown((prev) => !prev);
    console.log(dropdown);
  };
  return (
    <li className="menu-items">
      {items.submenu ? (
        <>
          <button
            type="button"
            aria-expanded={dropdown ? "true" : "false"}
            aria-haspopup="button"
            onClick={handleClick}
          >
            {items.title}{" "}
            {depthLevel > 0 ? <span>&raquo;</span> : <span className="arrow" />}
          </button>
          <Dropdown
            submenus={items.submenu}
            dropdown={dropdown}
            depthLevel={depthLevel}
          />
        </>
      ) : (
        <a href={items.url}>{items.title}</a>
      )}
    </li>
  );
};

export default MenuItems;
