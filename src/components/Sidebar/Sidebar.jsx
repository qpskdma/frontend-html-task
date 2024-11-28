import { useState } from "react";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../assets/logo.png";
import PropTypes from "prop-types";
import styled from "styled-components";
import { lightTheme, darkTheme } from "./themes";

const routes = [
  { title: "Home", icon: "fas-solid fa-house", path: "/" },
  { title: "Sales", icon: "chart-line", path: "/sales" },
  { title: "Costs", icon: "chart-column", path: "/costs" },
  { title: "Payments", icon: "wallet", path: "/payments" },
  { title: "Finances", icon: "chart-pie", path: "/finances" },
  { title: "Messages", icon: "envelope", path: "/messages" },
];

const bottomRoutes = [
  { title: "Settings", icon: "sliders", path: "/settings" },
  { title: "Support", icon: "phone-volume", path: "/support" },
];

const SidebarContainer = styled.div`
  color: ${(props) => props.theme.textColor};
  width: 250px;
  height: 100vh;
  display: grid;
  grid-template-rows: 15vh 65vh 20vh;
  box-sizing: border-box;
  position: fixed;
  left: 0;
  top: 0;
  padding: 25px;
  overflow: hidden;
  background-color: ${(props) => props.theme.background};
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  border-radius: 0 15px 15px 0;
  transform: ${(props) =>
    props.isopen ? "translateX(0)" : "translateX(-200px)"};
  transition: all 0.2s;
  &::before {
    content: "";
    position: absolute;
    width: 250px;
    height: 99vh;
    top: 0.17vh;
    left: -6px;
    border: 3px solid ${(props) => props.theme.textColor};
    border-radius: 0 15px 15px 0;
    z-index: -1;
  }
`;

const SidebarLogo = styled.h1`
  color: ${(props) => props.theme.logoColor};
  position: relative;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  gap: 15px;
  padding-bottom: 30px;
  font-size: 1.5em;
  transform: ${(props) =>
    props.isopen ? "translateX(0)" : "translateX(180px)"};
  transition: all 0.25s;
`;

const SidebarItems = styled.div`
  > * {
    width: ${(props) => (props.isopen ? "auto" : "20px")};
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 15px;
    &:hover {
      cursor: pointer;
      color: ${(props) => props.theme.hoverTextColor};
      background-color: ${(props) => props.theme.hoverBackground};
    }
    transform: ${(props) =>
      props.isopen ? "translateX(0)" : "translateX(180px)"};
    transition: all 0.25s;
  }
`;

const SidebarItem = styled.a`
  color: ${(props) =>
    props.isactive ? props.theme.activeTextColor : props.theme.textColor};

  background-color: ${(props) =>
    props.isactive
      ? props.theme.activeBackgroundColor
      : props.theme.background};
  &:hover {
    cursor: pointer;
    color: ${(props) =>
      props.isactive
        ? props.theme.activeTextColor
        : props.theme.hoverTextColor};
    background-color: ${(props) =>
      props.isactive
        ? props.theme.activeBackgroundColor
        : props.theme.hoverBackground};
  }
`;

const SidebarCloseBtn = styled.button`
  color: ${(props) => props.theme.textColor};
  position: absolute;
  width: 32px;
  height: 32px;
  left: 230px;
  top: 48px;
  border: 0;
  border-radius: 50%;
  background-color: ${(props) =>
    props.isopen
      ? props.theme.btnActiveBackground
      : props.theme.btnDefaultBackground};
  &:hover {
    cursor: pointer;
  }
  transform: ${(props) =>
    props.isopen ? "translateX(0)" : "translateX(-175px)"};
  transition: all 0.25s;
`;

const Sidebar = (props) => {
  const { color } = props;
  const currentTheme = color === "light" ? lightTheme : darkTheme;

  const [isOpened, setIsOpened] = useState(undefined);
  const [activeRoute, setActiveRoute] = useState(routes[0].path);

  const containerClassnames = classnames("sidebar", { opened: isOpened });

  const goToRoute = (path) => {
    console.log(`going to "${path}"`);
    setActiveRoute(path);
  };

  const toggleSidebar = () => {
    setIsOpened((v) => !v);
  };

  return (
    <>
      <SidebarContainer theme={currentTheme} isopen={isOpened}>
        <SidebarLogo theme={currentTheme} isopen={isOpened}>
          <img
            src={logo}
            alt="TensorFlow logo"
            width={"32px"}
            height={"32px"}
          />
          <span>TensorFlow</span>
        </SidebarLogo>
        <SidebarItems theme={currentTheme} isopen={isOpened}>
          {routes.map((route) => (
            <SidebarItem
              theme={currentTheme}
              isactive={activeRoute == route.path ? true : undefined}
              key={route.title}
              onClick={() => {
                goToRoute(route.path);
              }}
            >
              <FontAwesomeIcon icon={route.icon} />
              <span>{route.title}</span>
            </SidebarItem>
          ))}
        </SidebarItems>
        <SidebarItems theme={currentTheme} isopen={isOpened}>
          {bottomRoutes.map((route) => (
            <SidebarItem
              theme={currentTheme}
              isactive={activeRoute == route.path ? true : undefined}
              key={route.title}
              onClick={() => {
                goToRoute(route.path);
              }}
            >
              <FontAwesomeIcon icon={route.icon} />
              <span>{route.title}</span>
            </SidebarItem>
          ))}
        </SidebarItems>
      </SidebarContainer>
      <SidebarCloseBtn
        theme={currentTheme}
        isopen={isOpened}
        onClick={toggleSidebar}
      >
        <FontAwesomeIcon icon={isOpened ? "angle-left" : "angle-right"} />
      </SidebarCloseBtn>
    </>
  );
};

Sidebar.propTypes = {
  color: PropTypes.string,
};

export default Sidebar;
