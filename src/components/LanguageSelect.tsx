import React from "react";
import styled from "styled-components";
import { withStyles } from "@material-ui/styles";
import OutsideClickHandler from "react-outside-click-handler";
import PublicIcon from "@material-ui/icons/Public";
import Button from "@material-ui/core/Button";
import i18n from "i18next";

const SUPPORTED_LANGUAGES = ["en", "zh"];

const codeToLang = (code: any) => {
  switch (code) {
    case "en":
      return "English";
    case "zh":
      return "Chinese (Simplified)";
    default:
      return "English";
  }
};

const LanguageSelect = ({ isVisible, store }: any) => {
  const open = store.get("localesOpen");
  if (!isVisible) return null;
  return (
    <div>
      <RoundButton onClick={() => store.set("localesOpen", true)}>
        <PublicIcon color="action" />
      </RoundButton>
      <OutsideClickHandler
        onOutsideClick={() => store.set("localesOpen", false)}
      >
        {open && (
          <Wrapper>
            <Languages>
              {SUPPORTED_LANGUAGES.map((language) => {
                return (
                  <LanguageElement
                    key={language}
                    onClick={() => {
                      i18n.changeLanguage(language);
                      store.set("localesOpen", false);
                    }}
                  >
                    <LanguageImage
                      src={`/images/languages/${language}.svg`}
                    ></LanguageImage>
                    <LanguageText>{codeToLang(language)}</LanguageText>
                  </LanguageElement>
                );
              })}
            </Languages>
          </Wrapper>
        )}
      </OutsideClickHandler>
    </div>
  );
};

const Wrapper = styled.div`
  margin-top: 8px;
  margin-left: 8px;
  margin-right: 8px;
  padding: 8px;
  background-color: rgb(36, 36, 36);
  border: 1px solid rgb(66, 66, 66);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  right: 52px;
  z-index: 100;
`;

const Languages = styled.ul`
  padding: 0;
  margin: 0;
`;

const LanguageElement = styled.li`
  padding: 0 10px;
  display: flex;
  align-items: center;
  border-radius: 8px;
  position: relative;
  &:hover {
    background-color: rgb(60, 60, 60);
    color: #fff;
    cursor: pointer;
    & p {
      color: #fff;
    }
  }
`;

const LanguageImage = styled.img`
  height: 18px;
  margin-right: 16px;
`;

const LanguageText = styled.p`
  color: #c3c5cb;
  font-size: 1rem;
`;

const RoundButton = withStyles({
  root: {
    position: "relative",
    marginLeft: 6,
    height: 38,
    minWidth: 48,
    textTransform: "none",
    border: "1px solid rgb(66,66,66)",
    borderRadius: 8,
    backgroundColor: "rgb(36,36,36)",
    paddingTop: 5,
    paddingBottom: 5,
    "&:hover": {
      backgroundColor: "rgb(66,66,66)",
    },
  },
})(Button);

export default LanguageSelect;
