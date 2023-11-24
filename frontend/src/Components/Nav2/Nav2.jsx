import { menuItemsData } from "../../utils/menuItems";
import MenuItems from "../Menuitems/Menuitems";

const Nav2 = () => {
  const depthLevel = 0;
  return (
    <nav className="desktop-nav">
      <ul className="menus">
        {menuItemsData.map((menu, index) => {
          return <MenuItems items={menu} key={index} depthLevel={depthLevel} />;
        })}
      </ul>
    </nav>
  );
};

export default Nav2;
