import PropTypes from "prop-types";
import * as React from "react";
import { connect } from "react-redux";
import { hashHistory, IndexRoute, Route, Router } from "react-router";
import history from "../history";
import localize from "../i18n/localize";
import AboutWindow from "./About/AboutWindow";
import CertWindow from "./CertWindow";
import EncryptWindow from "./EncryptWindow";
import HelpWindow from "./HelpWindow";
import LicenseWindow from "./License/LicenseWindow";
import MainWindow from "./MainWindow";
import MenuBar from "./MenuBar";
import SignatureWindow from "./SignatureWindow";

interface IAppProps {
  locale: string;
}

class App extends React.Component<IAppProps, {}> {
  static childContextTypes = {
    locale: PropTypes.string,
    localize: PropTypes.func,
  };

  getChildContext() {
    const { locale } = this.props;
    return {
      locale,
      localize,
    };
  }

  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={MenuBar}>
          <IndexRoute component={MainWindow} />
          <Route path="/sign" component={SignatureWindow} />
          <Route path="/encrypt" component={EncryptWindow} />
          <Route path="/certificate" component={CertWindow} />
          <Route path="/license" component={LicenseWindow} />
          <Route path="/about" component={AboutWindow} />
          <Route path="/help" component={HelpWindow} />
        </Route>
      </Router>
    );
  }
}

export default connect((state) => ({
  locale: state.settings.locale,
}))(App);
