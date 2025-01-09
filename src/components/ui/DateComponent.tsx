import React from "react";
import { useTranslation } from "react-i18next";
import { formatDate2 } from "../../utils";

const DateComponent: React.FC = () => {
  const { i18n } = useTranslation(); // Get the current language

  return <p className="text-sm">{formatDate2(new Date(), i18n.language)}</p>;
};

export default DateComponent;
