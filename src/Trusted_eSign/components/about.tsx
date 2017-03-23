"use strict";

import * as React from "react";
import { MainToolBar } from "./components";
import { lang, LangApp } from "../module/global_app";
declare let $: any;

export class AboutWindow extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = ({
            username: { text: "", error: "" },
            email: { text: "", error: "" },
            message: { text: "", error: "" }
        })
        this.change = this.change.bind(this);
    }
    componentDidMount() {
        lang.on(LangApp.SETTINGS, this.change);
    }
    componentWillUnmount() {
        lang.removeListener(LangApp.SETTINGS, this.change);
    }
    change() {
        this.setState({});
    }
    send(): void {
        $.ajax({
            url: "https://net.trusted.ru/trustedapp/app/feedback",
            "method": "POST",
            "data": {
                "username": this.state.username.text,
                "email": this.state.email.text,
                "message": this.state.message.text,
            },
            "success": function (): void {
                $(".toast-message_send").remove();
                Materialize.toast(lang.get_resource.About.message_send, 2000, "toast-message_send");
            },
            "error": function (): void {
                $(".toast-error_message_send").remove();
                Materialize.toast(lang.get_resource.About.error_message_send, 2000, "toast-error_message_send");
            }
        });
    }
    setUserName(user: string) {
        this.setState({ username: { text: user, error: "" } });
    }
    setEmail(email: string) {
        this.setState({ email: { text: email, error: "" } });
    }
    setMessage(mes: string) {
        this.setState({ message: { text: mes, error: "" } });
    }
    validDatas() {
        let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (this.state.username.text.length === 0) {
            this.state.username.error = lang.get_resource.Settings.field_empty;
            this.setState({ username: { text: this.state.username.text, error: lang.get_resource.Settings.field_empty } });
        }
        if (this.state.email.text.length === 0) {
            this.state.email.error = lang.get_resource.Settings.field_empty;
            this.setState({ email: { text: this.state.email.text, error: lang.get_resource.Settings.field_empty } });
        } else if (reg.test(this.state.email.text) === false) {
            this.state.email.error = lang.get_resource.Settings.email_error;
            this.setState({ email: { text: this.state.email.text, error: lang.get_resource.Settings.email_error } });
        }
        if (this.state.message.text.length === 0) {
            this.state.message.error = lang.get_resource.Settings.field_empty;
            this.setState({ message: { text: this.state.message.text, error: lang.get_resource.Settings.field_empty } });
        }
        if (this.state.email.error.length === 0 && this.state.message.error.length === 0 && this.state.username.error.length === 0) {
            this.send();
        }
    }
    render(): any {
        let self = this;
        let error_user = "";
        let error_email = "";
        let error_message = "";
        if (this.state.username.error.length === 0) {
            error_user = "not-active";
        }
        if (this.state.email.error.length === 0) {
            error_email = "not-active";
        }
        if (this.state.message.error.length === 0) {
            error_message = "not-active";
        }
        return (
            <div className="main">
                <div className="about">
                    <div className="row">
                        <div className="content">
                            <div className="geo">
                                <div className="geo-icon"></div>
                            </div>
                        </div>
                    </div>
                    <div className="feedback">
                        <div className="formfeedback">
                            <div className="row">
                                <div className="col s12 m6">
                                    <div className="card infoapp">
                                        <div className="card-content gray-text">
                                            <span className="card-title">{lang.get_resource.About.product_NAME}</span>
                                            <span className="card-infos">
                                                <p>{lang.get_resource.About.version}</p>
                                            </span>
                                        </div>
                                        <div className="card-content gray-text">
                                            <span className="card-title">{lang.get_resource.About.FeedBack}</span>
                                            <form onSubmit={this.validDatas.bind(this)} className="col s12">
                                                <div className="row form">
                                                    <div className="input-field col s12">
                                                        <input ref="username" id="username" type="text" onChange={function (evt: any) { self.setUserName(evt.target.value) } }></input>
                                                        <label htmlFor="username">{lang.get_resource.About.username}</label>
                                                    </div>
                                                    <div className={"about-error-info " + error_user}>
                                                        <i className="material-icons icon-error">warning</i>
                                                        <div className="error-text about-text">{this.state.username.error}</div>
                                                    </div>
                                                </div>
                                                <div className="row form">
                                                    <div className="input-field col s12">
                                                        <input ref="email" id="email" type="email" onChange={function (evt: any) { self.setEmail(evt.target.value) } }></input>
                                                        <label htmlFor="email" >{lang.get_resource.About.email}</label>
                                                    </div>
                                                    <div className={"about-error-info " + error_email}>
                                                        <i className="material-icons icon-error">warning</i>
                                                        <div className="error-text about-text">{this.state.email.error}</div>
                                                    </div>
                                                </div>
                                                <div className="row form message">
                                                    <div className="input-field col s12 mes-textarea">
                                                        <textarea ref="message" id="message" className="materialize-textarea" onChange={function (evt: any) { self.setMessage(evt.target.value) } }></textarea>
                                                        <label htmlFor="message">{lang.get_resource.About.message}</label>
                                                    </div>
                                                    <div className={"about-error-info " + error_message}>
                                                        <i className="material-icons icon-error">warning</i>
                                                        <div className="error-text about-text">{this.state.message.error}</div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="card-action">
                                            <a onClick={this.validDatas.bind(this)}>{lang.get_resource.About.send}</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col s12 m6">
                                    <div className="card contact">
                                        <div className="card-content white-text">
                                            <div className="row">
                                                <span className="card-title">{lang.get_resource.About.Contacts}</span>
                                            </div>
                                            <div className="row">
                                                <div className="contact-icon"><i className="geo_contact_icon"></i></div>
                                                <h6 className="contact-title">{lang.get_resource.About.address}</h6>
                                            </div>
                                            <div className="row">
                                                <div className="contact-icon"><i className="address_contact_icon"></i></div>
                                                <h6 className="contact-title">{lang.get_resource.About.phone.number_one}<br />{lang.get_resource.About.phone.number_two}<br />
                                                    {lang.get_resource.About.phone.number_three}
                                                </h6>
                                            </div>
                                            <div className="row">
                                                <div className="contact-icon"><i className="mail_contact_icon"></i></div>
                                                <h6 className="contact-title">{lang.get_resource.About.info}</h6>
                                            </div>
                                        </div>
                                        <div className="card-action">
                                            <a href="#">This is a link</a>
                                        </div>
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