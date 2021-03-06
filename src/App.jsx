import React from "react";

import { HashRouter, Switch, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Planning from "./pages/Planning.jsx";
import WorkRiskChart from "./pages/WorkRiskChart.jsx";
import Profile from "./pages/Profile.jsx";
import Info from "./pages/Info.jsx";
import DrawerRouterContainer from "./components/DrawerRouterContainer.jsx";
import { AppContext } from "./AppContext";
import { countries } from "./resources/countries";
import {
  IntlProvider,
  load,
  LocalizationProvider,
  loadMessages,
} from "@progress/kendo-react-intl";

import likelySubtags from "cldr-core/supplemental/likelySubtags.json";
import currencyData from "cldr-core/supplemental/currencyData.json";
import weekData from "cldr-core/supplemental/weekData.json";

import frNumbers from "cldr-numbers-full/main/fr/numbers.json";
import frLocalCurrency from "cldr-numbers-full/main/fr/currencies.json";
import frCaGregorian from "cldr-dates-full/main/fr/ca-gregorian.json";
import frDateFields from "cldr-dates-full/main/fr/dateFields.json";

import usNumbers from "cldr-numbers-full/main/en/numbers.json";
import usLocalCurrency from "cldr-numbers-full/main/en/currencies.json";
import usCaGregorian from "cldr-dates-full/main/en/ca-gregorian.json";
import usDateFields from "cldr-dates-full/main/en/dateFields.json";

import esNumbers from "cldr-numbers-full/main/es/numbers.json";
import esLocalCurrency from "cldr-numbers-full/main/es/currencies.json";
import esCaGregorian from "cldr-dates-full/main/es/ca-gregorian.json";
import esDateFields from "cldr-dates-full/main/es/dateFields.json";

import { enMessages } from "./messages/en-US";
import { frMessages } from "./messages/fr";
import { esMessages } from "./messages/es";

import "hammerjs";
//import '@progress/kendo-theme-default/dist/all.css';
import "./App.scss";

load(
  likelySubtags,
  currencyData,
  weekData,
  frNumbers,
  frLocalCurrency,
  frCaGregorian,
  frDateFields,
  usNumbers,
  usLocalCurrency,
  usCaGregorian,
  usDateFields,
  esNumbers,
  esLocalCurrency,
  esCaGregorian,
  esDateFields
);

loadMessages(esMessages, "es");
loadMessages(frMessages, "fr");
loadMessages(enMessages, "en-US");

const App = () => {
  const [contextState, setContextState] = React.useState({
    riskId: 10001,
    localeId: "en-US",
    projectId: 10001,
    firstName: "Peter",
    lastName: "Douglas",
    middleName: "",
    email: "peter.douglas@progress.com",
    phoneNumber: "(+1) 8373-837-93-02",
    avatar: null,
    country: countries[33].name,
    isInPublicDirectory: true,
    biography: "",
    teamId: 1,
  });
  const onProjectChange = React.useCallback(
    (event) => {
      setContextState({ ...contextState, projectId: event.value.projectId });
    },
    [contextState, setContextState]
  );
  const onRiskChange = React.useCallback(
    (event) => {
      setContextState({ ...contextState, riskId: event.value.riskId });
    },
    [contextState, setContextState]
  );
  const onProfileChange = React.useCallback(
    (event) => {
      setContextState({ ...contextState, ...event.dataItem });
    },
    [contextState, setContextState]
  );

  return (
    <div className="App">
      <LocalizationProvider language={contextState.localeId}>
        <IntlProvider locale={contextState.localeId}>
          <AppContext.Provider
            value={{
              ...contextState,
              onProjectChange,
              onProfileChange,
              onRiskChange,
            }}
          >
            <HashRouter>
              <DrawerRouterContainer>
                <Switch>
                  <Route exact={true} path="/" component={WorkRiskChart} />
                  {/* <Route exact={true} path="/planning" component={Planning} />
                                    <Route exact={true} path="/profile" component={WorkRiskChart} /> */}
                  <Route exact={true} path="/info" component={Info} />
                </Switch>
              </DrawerRouterContainer>
            </HashRouter>
          </AppContext.Provider>
        </IntlProvider>
      </LocalizationProvider>
    </div>
  );
};

export default App;
