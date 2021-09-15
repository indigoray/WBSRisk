import React from "react";

export const AppContext = React.createContext({
  riskId: 10001,
  projectId: 10001,
  languageId: "en",
  firstName: "",
  lastName: "",
  middleName: "",
  email: "",
  phoneNumber: "",
  avatar: null,
  country: "",
  isInPublicDirectory: false,
  biography: "",
  teamId: null,
  onProjectChange: () => {},
  onProfileChange: () => {},
  onRiskChange: () => {},
});

AppContext.displayName = "AppContext";
