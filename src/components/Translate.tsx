import * as React from "react";
import { useTranslation } from "react-i18next";

interface TranslateProps {
  text: string;
}

export function Translate({ text }: TranslateProps) {
  const { t } = useTranslation();
  return <>{t(text)}</>;
}

export const TranslateSVG: React.FC<TranslateProps> = function (props) {
  const { text } = props;
  const { t } = useTranslation();
  return t(text);
};

interface TranslateInputProps {
  text1: string;
  asset: string;
  text2: string;
}

export function TranslateInput({ text1, asset, text2 }: TranslateInputProps) {
  const { t } = useTranslation();
  const line = `${t(text1)} ${asset} ${t(text2)}`;
  return (
    <span>{line}</span>
    // line
  );
}

// export function TranslateInput(t?: any, i18n?: any ) {
//   return t('Transfer.Enter')
// }

// export default withTranslation()(TranslateInput)
