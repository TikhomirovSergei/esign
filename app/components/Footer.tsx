import PropTypes from "prop-types";
import * as React from "react";

class Footer extends React.PureComponent {
  static contextTypes = {
    locale: PropTypes.string,
    localize: PropTypes.func,
  };

  shouldComponentUpdate(nextProps: {}, nextState: {}, nextContext: { locale: string }) {
    return (this.context.locale !== nextContext.locale) ? true : false;
  }

  render() {
    const { localize, locale } = this.context;

    return (
      <div>
        <div className="page-footer mainfooter">
          <div className="footer-copyright">
            <div className="row">
              <div className="col s1">
                <i className="ctlogo" />
              </div>
              <div className="col s11">
                <div className="copyright">
                  <div className="white-text text-lighten-3">
                    {localize("About.company_name", locale)}<br />{localize("About.copyright", locale)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
