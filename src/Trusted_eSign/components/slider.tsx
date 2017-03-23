import * as React from "react";
import * as ReactDOM from "react-dom";
import { lang, video_app, VideoApp, get_Certificates } from "../module/global_app";
import Video from "react-html5video";
import { Link } from "react-router";
import { MainWindowOperations, MainWindow } from "./main_window";
import { BlockNotElements, CertInfo } from "./certificate";
declare let $: any;

interface ISliderProps {
    router: any;
}
export class Slider extends React.Component<ISliderProps, any> {
    constructor(props: ISliderProps) {
        super(props);
        this.state = ({ slider: true });
    }
    componentDidMount() {
        $(".slider").slider({ interval: 100000000 });
        $(".slider").slider("pause");
    }
    prevSlide() {
        $(".slider").slider("prev");
        this.setState({ slider: !this.state.slider });
    }
    nextSlide() {
        $(".slider").slider("next");
        this.setState({ slider: !this.state.slider });
    }
    render() {
        let self = this;
        let slider = "slider-white";
        let btn = "slider-btn-white";
        if (this.state.slider) {
            btn = "slider-btn-red";
            slider = "slider-red";
        }
        return (
            <div className="slider-content">
                {
                    // <div className={slider + " slider fullscreen"}>
                    //     <ul className="slides">
                    //         <li>
                    //             <MainSlide/>
                    //         </li>
                    //         <li>
                    //             <VideoSlide/>
                    //         </li>}
                    //     </ul>
                    //     <a className="waves-effect slider-btn-prev" onClick={this.prevSlide.bind(this) }>
                    //         <i className={"material-icons " + btn}>keyboard_arrow_left</i>
                    //     </a>
                    //     <a className="waves-effect slider-btn-next"  onClick={this.nextSlide.bind(this) }>
                    //         <i className={"material-icons " + btn}>keyboard_arrow_right</i>
                    //     </a>
                    //     <div className="enabled-indicators"/>
                    // </div>
                    <MainSlide />
                }
            </div>
        );
    }
}
export class RegLogin extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }
    render() {
        return (
            <div className="reg-slide">
                <div className="fon-opacity">
                    <RegBack text={lang.get_resource.Кegistration.LoginAndPass} />
                    <div className="login-content">
                        <div className="login-field">
                            <i className="material-icons prefix login-icon">person</i>
                            <input placeholder={lang.get_resource.Кegistration.login} id="login" type="text" />
                        </div>
                        <div className="pass-field">
                            <i className="password-icon prefix" />
                            <input placeholder={lang.get_resource.Settings.password} id="password" type="password" />
                        </div>
                        <div className="reg-buttons">
                            <a className="enter-with-cert waves-effect btn-large">{lang.get_resource.Кegistration.enter}</a>
                            <a className="enter-with-cert waves-effect btn-large">{lang.get_resource.Кegistration.sign_up}</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export class RegSocial extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }
    render() {
        return (
            <div className="reg-slide">
                <div className="fon-opacity">
                    <RegBack text={lang.get_resource.Кegistration.Social} />
                    <div className="social-icons">
                        <div className="social-border">
                            <i className="facebook around-border"></i>
                        </div>
                        <div className="social-border">
                            <i className="twitter around-border twit-size"></i>
                        </div>
                        <div className="social-border">
                            <i className="vk around-border vk-size"></i>
                        </div>
                    </div>
                    <div className="social-icons down-social-icons">
                        <div className="social-border">
                            <i className="google around-border google-size"></i>
                        </div>
                        <div className="social-border">
                            <i className="mail around-border mail-size"></i>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export class RegCert extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        let certs = get_Certificates("certificates");
        if (!certs) {
            certs = [];
        }
        this.state = ({ certs: certs, cert_info: null });
    }
    activeCert(event: any, cert: any) {
        let certificates = this.state.certs;
        for (let i = 0; i < certificates.length; i++) {
            certificates[i].active = false;
        }
        certificates[cert.key].active = true;
        this.setState({ certs: certificates, cert_info: certificates[cert.key] });
    }
    render() {
        let self = this;
        let name = this.state.certs.length > 0 ? "not-active" : "active";
        let view = this.state.certs.length > 0 ? "" : "not-active";
        let info: any = null;
        let block = "active";
        let disabled = "disabled";
        if (this.state.cert_info) {
            info = <CertInfo name={this.state.cert_info.name}
                issuerName={this.state.cert_info.issuerName}
                organization={this.state.cert_info.organization}
                validityDate={this.state.cert_info.validityDate}
                algSign={this.state.cert_info.algSign}
                privateKey={this.state.cert_info.privateKey}
                classForReg={["text-white", "text-gray"]} />;
            block = "not-active";
            disabled = "";
        }
        return (
            <div className="reg-slide">
                <div className="fon-opacity">
                    <RegBack text={lang.get_resource.Кegistration.Cert} />
                    <div className="reg-cert-content">
                        <div className="reg-cert-list">
                            <div className={"reg-cert-collection collection " + view}>
                                {this.state.certs.map(function (l: any, i: number) {
                                    let status: string;
                                    if (l.status) {
                                        status = "cert-ok";
                                    }
                                    else {
                                        status = "cert-error";
                                    }
                                    return <RegCertCollectionList
                                        name={l.name}
                                        issuerName={l.issuerName}
                                        status={status}
                                        index={l.key}
                                        chooseCert={function (event: any) { self.activeCert(event, l); } }
                                        cert_key={l.privateKey}
                                        active_cert={l.active}
                                        key={i}
                                        organization={l.organization} />;
                                })}
                            </div>
                            <div className={"block " + name}>
                                <BlockNotElements name={name} title={lang.get_resource.Certificate.cert_not_found} />
                            </div>
                        </div>
                        <div className="reg-cert-info-content">
                            <div className="reg-cert-info">
                                {info}
                                <BlockNotElements name={block} title={lang.get_resource.Certificate.cert_not_select} />
                            </div>
                            <a className={"enter-with-cert waves-effect btn-large " + disabled}>Войти</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
interface IRegCertCollectionListProps {
    name: string;
    issuerName: string;
    status: string;
    index: number;
    cert_key: boolean;
    chooseCert: (event: any) => void;
    active_cert: boolean;
    organization: string;
}
class RegCertCollectionList extends React.Component<IRegCertCollectionListProps, any> {
    constructor(props: IRegCertCollectionListProps) {
        super(props);
    }
    render() {
        let self = this;
        let cert_key_menu: any = null;
        let active = ""
        if (this.props.active_cert) {
            active = "active";
        }
        return (
            <div className={"collection-item avatar reg-certs-collection " + active} onClick={this.props.chooseCert.bind(this)}>
                <div className="r-iconbox-link">
                    <div className="r-iconbox-cert-icon"><i className={this.props.status}></i></div>
                    <p className="reg-collection-title">{this.props.name}</p>
                    <p className="reg-collection-info">{this.props.organization}</p>
                    <p className="reg-collection-info">{this.props.issuerName}</p>
                </div>
            </div>
        );
    }
}
interface IRegBackProps {
    text: string;
}
class RegBack extends React.Component<IRegBackProps, any> {
    constructor(props: IRegBackProps) {
        super(props);
    }
    render() {
        return (
            <div className="reg-back">
                <Link to="/reg_select" className="waves-effect reg-back-icon">
                    <i className="reg-back-btn" />
                </Link>
                <div className="reg-back-text">{this.props.text}</div>
            </div>
        );
    }
}
export class RegSlide extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }
    render() {
        return (
            <div className="reg-slide">
                <div className="fon-opacity">
                    <div className="reg-slide-text">{lang.get_resource.Кegistration.choose_reg}</div>
                    <Link to="/reg_login">
                        <div className="diamond reg-login-diamond waves-effect">
                            <div className="external-diamond">
                                <i className="login-password-icon diam-icon login-password-diam" />
                                <div className="diamond-text">lang.get_resource.Кegistration.RLoginAndPass</div>
                            </div>
                        </div>
                    </Link>
                    <Link to="/reg_social">
                        <div className="diamond reg-social-diamond waves-effect">
                            <div className="external-diamond">
                                <i className="socials-icon diam-icon" />
                                <div className="diamond-text">lang.get_resource.Кegistration.RSocial</div>
                            </div>
                        </div>
                    </Link>
                    <Link to="/reg_cert">
                        <div className="diamond reg-cert-diamond waves-effect">
                            <div className="external-diamond">
                                <i className="cert-icon diam-icon" />
                                <div className="diamond-text diamond-text-bottom">lang.get_resource.Кegistration.RCert</div>
                            </div>
                        </div>
                    </Link>
                    <Link to="/">
                        <div className="diamond exit-diamond waves-effect">
                            <div className="external-diamond">
                                <i className="return-icon diam-icon" />
                                <div className="diamond-text diamond-text-bottom">lang.get_resource.Common.Back</div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        );
    }
}

export class MainSlide extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }
    render() {
        return (
            <div>
                <div className="header image">
                    <div className="row">
                        <div className="col s4">
                            <i className="logo"></i>
                        </div>
                        <div className="col s8">
                            <div className="white-text cryptobanner">
                                <p>{lang.get_resource.About.info_about_product}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="maincontent">
                    <div className="appfunction">
                        <div className="row">
                            <MainWindowOperations info={lang.get_resource.About.info_about_sign} title_pre={lang.get_resource.Settings.Digital} title_post={lang.get_resource.Sign.Signature} operation="sign" />
                            <MainWindowOperations info={lang.get_resource.About.info_about_encrypt} title_pre={lang.get_resource.Encrypt.Encryption} title_post={lang.get_resource.Settings.Datas} operation="encrypt" />
                            <MainWindowOperations info={lang.get_resource.About.info_about_certificate} title_pre={lang.get_resource.Settings.Control} title_post={lang.get_resource.Certificate.FCertificates} operation="certificate" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

interface IVideoSlideState {
    active?: string;
}
class VideoSlide extends React.Component<any, IVideoSlideState> {
    constructor(props: any) {
        super(props);
        this.state = ({ active: "" });
        this.videoChange = this.videoChange.bind(this);
    }
    componentDidMount() {
        video_app.on(VideoApp.SETTINGS, this.videoChange);
        if (video_app.get_video_source.length > 0) {
            this.setState({ active: "active" }, this.load.bind(this));
        }
    }
    componentWillUnmount() {
        video_app.removeListener(VideoApp.SETTINGS, this.videoChange);
    }
    videoChange() {
        this.setState({});
    }
    playVideo(src: string, caption: string) {
        video_app.set_video_caption = caption;
        video_app.set_video_source = src;
        video_app.set_video_time = 0;
        this.setState({ active: "active" }, this.load.bind(this));
    }
    load() {
        ReactDOM.findDOMNode(this.refs["video-player"]).getElementsByTagName("video")[0].load();
    }
    closeVideo() {
        video_app.set_video_caption = "";
        video_app.set_video_source = "";
        video_app.set_video_time = 0;
        this.setState({ active: "" });
    }
    getCurrentTime() {
        video_app.set_video_time = ReactDOM.findDOMNode(this.refs["video-player"]).getElementsByTagName("video")[0].currentTime;
    }
    setCurrentTime() {
        ReactDOM.findDOMNode(this.refs["video-player"]).getElementsByTagName("video")[0].currentTime = video_app.get_video_time;
    }
    render() {
        let self = this;
        return (
            <div className="video-content">
                <div style={{ color: "white" }}>{lang.get_resource.Help.Work_App}</div>
                <div className={"video-player " + this.state.active}>
                    <div className="player-info">
                        <a className="waves-effect video-info-icon">
                            <i className="material-icons close-video-btn">theaters</i>
                        </a>
                        <span>{video_app.get_video_caption}</span>
                        <a className="waves-effect close-video" onClick={this.closeVideo.bind(this)}>
                            <i className="material-icons close-video-btn">close</i>
                        </a>
                    </div>
                    <Video width="720" height="420" ref={"video-player"} onLoadedData={this.setCurrentTime.bind(this)}
                        onTimeUpdate={this.getCurrentTime.bind(this)}
                        onPause={this.getCurrentTime.bind(this)}
                        copyKeys={{ sourceError: lang.get_resource.Help.video_failed }} controls>
                        <source src={video_app.get_video_source} />
                    </Video>
                </div>
                <div className="video-column">
                    <VideoContent source={lang.get_resource.Help.video[0].src}
                        viewVideo={function () { self.playVideo(lang.get_resource.Help.video[0].src, lang.get_resource.Help.video[0].title); } }
                        text={lang.get_resource.Help.video[0].title}
                        id="video1" />
                    <VideoContent source={lang.get_resource.Help.video[1].src}
                        viewVideo={function () { self.playVideo(lang.get_resource.Help.video[1].src, lang.get_resource.Help.video[1].title); } }
                        text={lang.get_resource.Help.video[1].title}
                        id="video2" />
                    <VideoContent source={lang.get_resource.Help.video[2].src}
                        viewVideo={function () { self.playVideo(lang.get_resource.Help.video[2].src, lang.get_resource.Help.video[2].title); } }
                        text={lang.get_resource.Help.video[2].title}
                        id="video3" />
                </div>
                <div className="video-column">
                    <VideoContent source={lang.get_resource.Help.video[3].src}
                        viewVideo={function () { self.playVideo(lang.get_resource.Help.video[3].src, lang.get_resource.Help.video[3].title); } }
                        text={lang.get_resource.Help.video[3].title}
                        id="video4" />
                    <VideoContent source={lang.get_resource.Help.video[4].src}
                        viewVideo={function () { self.playVideo(lang.get_resource.Help.video[4].src, lang.get_resource.Help.video[4].title); } }
                        text={lang.get_resource.Help.video[4].title}
                        id="video5" />
                    <VideoContent source={lang.get_resource.Help.video[5].src}
                        viewVideo={function () { self.playVideo(lang.get_resource.Help.video[5].src, lang.get_resource.Help.video[5].title); } }
                        text={lang.get_resource.Help.video[5].title}
                        id="video6" />
                </div>
            </div>
        );
    }
}
interface IVideoContentProps {
    source: string;
    text: string;
    id: string;
    viewVideo: (src: string, text: string) => void;
}
interface IVideoContentState {
    duraction: number;
}
class VideoContent extends React.Component<IVideoContentProps, IVideoContentState> {
    constructor(props: IVideoContentProps) {
        super(props);
        this.state = ({ duraction: 0 });
    }
    loadedData() {
        this.setState({ duraction: parseInt(ReactDOM.findDOMNode(this.refs[this.props.id]).getElementsByTagName("video")[0].duration.toString()) });
    }
    render() {
        return (
            <div className="video-item">
                <a className="waves-effect play-video" onClick={this.props.viewVideo}>
                    <i className="material-icons play-btn">play_circle_outline</i>
                </a>
                <div className="video-info">
                    <a className="waves-effect video-info-view">
                        <i className="material-icons view-icon">movie</i>
                    </a>
                    <div className="video-info-text">{this.props.text}<br /><i>{this.state.duraction + " сек."}</i></div>
                </div>
                <Video width="230" height="200" ref={this.props.id} onLoadedData={this.loadedData.bind(this)}>
                    <source src={this.props.source} />
                </Video>
            </div>
        );
    }
}
export class MainSlideUnReg extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }
    render() {
        return (
            <div className="header image">
                <div className="white-text cryptobanner">
                    <div>Программное средство для работы с электронной подписью и шифрованием</div>
                    <div className="info-main">
                        <div className="info-texts">
                            <p>Клиентское приложение сервиса TRUSTED NET</p>
                            <p>Коммуникации при организации документооборота</p>
                            <p>Личное информационное пространство</p>
                            <p>Многоплатформенная реализация</p>
                        </div>
                        <div className="enter-service main-entered-service">
                            <Link to="/reg_select" className="enter-service-but waves-effect waves-light btn-large">{lang.get_resource.Кegistration.enter_service}</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
class MainSlideReg extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }
    render() {
        return (
            <div className="header image">
                <div className="row">
                    <div className="col s4">
                        <i className="logo"></i>
                    </div>
                    <div className="col s8">
                        <div className="white-text cryptobanner">
                            <p>{lang.get_resource.About.info_about_product}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
class FunctSlideReg extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }
    render() {
        return (
            <div className="slides-content">
                <div className="maincontent">
                    <div className="appfunction">
                        <div className="row func-items">
                            <div className="func-text">НЕСКОЛЬКО ПОЛЕЗНЫХ ФУНКЦИИ ПРИЛОЖЕНИЯ</div>
                            <MainWindowOperations info={lang.get_resource.About.info_about_sign} title_pre={lang.get_resource.Settings.Digital} title_post={lang.get_resource.Sign.Signature} operation="sign" />
                            <MainWindowOperations info={lang.get_resource.About.info_about_encrypt} title_pre={lang.get_resource.Encrypt.Encryption} title_post={lang.get_resource.Settings.Datas} operation="encrypt" />
                            <MainWindowOperations info={lang.get_resource.About.info_about_certificate} title_pre={lang.get_resource.Settings.Control} title_post={lang.get_resource.Certificate.FCertificates} operation="certificate" />
                        </div>
                    </div>
                </div>
                <div className="maincontent">
                    <div className="appfunction">
                        <div className="row func-items">
                            <MainWindowOperations info={lang.get_resource.About.info_about_sign} title_pre={lang.get_resource.Settings.Digital} title_post={lang.get_resource.Sign.Signature} operation="sign" />
                            <MainWindowOperations info={lang.get_resource.About.info_about_encrypt} title_pre={lang.get_resource.Encrypt.Encryption} title_post={lang.get_resource.Settings.Datas} operation="encrypt" />
                            <MainWindowOperations info={lang.get_resource.About.info_about_certificate} title_pre={lang.get_resource.Settings.Control} title_post={lang.get_resource.Certificate.FCertificates} operation="certificate" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
class FunctSlideUnReg extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }
    render() {
        return (
            <div className="slides-content">
                <div className="maincontent">
                    <div className="appfunction">
                        <div className="row func-items">
                            <div className="func-text">{lang.get_resource.Кegistration.App_Functions}</div>
                            <MainWindowOperations info={lang.get_resource.About.info_about_sign} title_pre={lang.get_resource.Settings.Digital} title_post={lang.get_resource.Sign.Signature} operation="sign" />
                            <MainWindowOperations info={lang.get_resource.About.info_about_encrypt} title_pre={lang.get_resource.Encrypt.Encryption} title_post={lang.get_resource.Settings.Datas} operation="encrypt" />
                            <MainWindowOperations info={lang.get_resource.About.info_about_certificate} title_pre={lang.get_resource.Settings.Control} title_post={lang.get_resource.Certificate.FCertificates} operation="certificate" />
                        </div>
                    </div>
                </div>
                <div className="maincontent">
                    <div className="appfunction">
                        <div className="row func-items">
                            <div className="func-text">{lang.get_resource.Кegistration.Empowerment}</div>
                            <MainWindowOperations info={lang.get_resource.About.info_about_sign} title_pre={lang.get_resource.Settings.Digital} title_post={lang.get_resource.Sign.Signature} operation="sign" />
                            <MainWindowOperations info={lang.get_resource.About.info_about_encrypt} title_pre={lang.get_resource.Encrypt.Encryption} title_post={lang.get_resource.Settings.Datas} operation="encrypt" />
                            <div className="enter-service"><a className="add-file-but waves-effect waves-light btn-large">{lang.get_resource.Кegistration.enter_service}</a></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}