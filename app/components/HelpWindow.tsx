import PropTypes from "prop-types";
import * as React from "react";

const webviewStyle = { width: 100 + "%" };

class HelpWindow extends React.Component<any, any> {
  static contextTypes = {
    locale: PropTypes.string,
    localize: PropTypes.func,
  };

  render() {
    const { locale } = this.context;
    const path = `help/${locale}.html`;

    return (
      <div className="tmain">
        <div className="content">
          <webview src={path} style={webviewStyle}></webview>
        </div>
      </div>
    );
  }
}

export default HelpWindow;
