import React, { useRef } from "react";
import { Info, BookOpen, Code, MessageCircle, Twitter } from "react-feather";
import styled from "styled-components";
import { ReactComponent as MenuIcon } from "../assets/menu.svg";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import useToggle from "../hooks/useToggle";
import { useTranslation } from "react-i18next";
import About from "./About";
import ExternalLink from "./ExternalLink";

const StyledMenuIcon = styled(MenuIcon)`
  path {
    stroke: #ffffff;
  }
`;

const StyledMenuButton = styled.button`
  background-color: rgb(36, 36, 36);
  margin: 0;
  padding: 0;
  height: 38px;
  padding: 0 0.5rem;
  border-radius: 8px;
  border: 1px solid rgb(66, 66, 66) !important;
  :hover {
    background-color: rgb(66, 66, 66);
  }
  :focus {
    cursor: pointer;
    outline: none;
  }
  svg {
    margin-top: 2px;
  }
`;

const StyledMenu = styled.div`
  margin-left: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: none;
  text-align: left;
`;

const MenuFlyout = styled.span`
  min-width: 8.125rem;
  background-color: rgb(36, 36, 36);
  border-radius: 8px;
  border: 1px solid rgb(66, 66, 66);
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  position: absolute;
  top: 44px;
  right: 0rem;
  z-index: 100;
`;

const MenuItem = styled(ExternalLink)`
  flex: 1;
  padding: 0.5rem 0.5rem;
  color: #c3c5cb;
  :hover {
    color: #ffffff;
    cursor: pointer;
    text-decoration: none;
  }
  > svg {
    margin-right: 8px;
  }
`;

const AboutItem = styled.span`
  flex: 1;
  padding: 0.5rem 0.5rem;
  color: #c3c5cb;
  :hover {
    color: #ffffff;
    cursor: pointer;
    text-decoration: none;
  }
  > svg {
    margin-right: 8px;
  }
`;

export default function Menu() {
  const node = useRef<HTMLDivElement>();
  const about = useRef<HTMLDivElement>();
  const { t } = useTranslation();
  const [open, toggle] = useToggle(false);
  const [aboutOpen, toggleAbout] = useToggle(false);

  useOnClickOutside(node, open ? toggle : undefined);
  useOnClickOutside(about, aboutOpen ? toggleAbout : undefined);

  return (
    <StyledMenu ref={node as any}>
      <StyledMenuButton onClick={toggle}>
        <StyledMenuIcon />
      </StyledMenuButton>
      {open && (
        <MenuFlyout>
          <AboutItem onClick={toggleAbout} ref={about as any}>
            <Info size={14} />
            {t("Nav.About")}
            {aboutOpen && <About />}
          </AboutItem>
          <MenuItem
            id="link"
            href="https://github.com/elaphantapp/ShadowTokens"
          >
            <BookOpen size={14} />
            {t("Nav.Docs")}
          </MenuItem>
          <MenuItem
            id="link"
            href="https://github.com/elaphantapp/ShadowTokens"
          >
            <Code size={14} />
            {t("Nav.Code")}
          </MenuItem>
          <MenuItem id="link" href="https://t.me/elaphant">
            <MessageCircle size={14} />
            Telegram
          </MenuItem>
          <MenuItem id="link" href="https://twitter.com/ElaphantTeam">
            <Twitter size={14} />
            Twitter
          </MenuItem>
        </MenuFlyout>
      )}
    </StyledMenu>
  );
}
