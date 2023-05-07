import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import FaqList from "./faqs/FaqList";
import FaqForm from "./faqs/FaqForm";
import LinkList from "./links/LinkList";
import LinkForm from "./links/LinkForm";
import OfferList from "./offers/OfferList";
import StarReviewList from "./starreviews/StarReviewList";
import $ from 'jquery';
//import CookieDisplay from "./CookieDisplay";
import CookieConsent from "react-cookie-consent";
import { updateCookieAcceptance } from '../actions';
import { fetchCookieValue } from '../actions';






class Landing extends Component {
    componentDidMount() {
        this.props.fetchCookieValue();

    }


    handleClose(e) {

        $(".actionsign").slideToggle();

    }
    renderFaqForm() {
        if (this.props.auth && this.props.auth.type === "admin") {
            return (

                <FaqForm />

            );


        }

    }
    renderLinkForm() {
        if (this.props.auth && this.props.auth.type === "admin") {
            return (

                <LinkForm />

            );

        }

    }
    handleAccept = () => {
        updateCookieAcceptance(true);
        this.props.fetchCookieValue();
        // this.renderButton()
    };

    handleDecline = () => {
        updateCookieAcceptance(false);
        $(".actionsign").hide();
        $(".actionbook").hide();
    };

    renderButton() {
        if (this.props.auth) {
            return (

                <Link to="/profile" className="">
                    <button className="actionbook" >become a member today</button>
                </Link>

            );


        } else {
            return (
                <span className="actionsign button" >
                    Sign in and get your membership today!<br />
                    <span className="closeWindow" onClick={this.handleClose}>x</span>
                    <a href="/auth/google" ><img alt="google sign in" loading="eager" title="sign in with google" src="/btn_google_signin_dark_normal_web.png" /></a>
                </span>
            );

        }

    }
    render() {
        const { cookie } = this.props;
         // Get the browser locale
    const browserLocale = navigator.language || navigator.userLanguage;

    // Extract the country code from the locale
    const countryCode = browserLocale.split('-')[1];
        return (
            <div className="page" >

                <div className="navigation-container">
                    <a className="nav-link" href="#"></a>
                    <a className="nav-link" href="#"></a>
                    <a className="nav-link" href="#"></a>
                    <a className="nav-link" href="#"></a>
                    <a className="nav-link" href="#"></a>
                    <a className="nav-link" href="#"></a>
                </div>

                <h1>
                    Isabelle's dance Oasis
                </h1>
                <h2>
                    A story of passions, friendships and emotions
                </h2>
                <p className="disclaimerp">
                Disclaimer: Please note that the information provided on this dance website is intended for educational and entertainment purposes only. It is important to consult with a physician before beginning any new exercise program, especially if you have any pre-existing medical conditions or injuries. The creators of this website and its content cannot be held responsible for any injuries or damages that may result from the use of this information. Always exercise caution and listen to your body when attempting any new dance routines or movements.</p>
                <div className="col">
                    <h2></h2>


                    <p className="itemp">
                        </p>


                    <img className="imgright" src="" alt="" loading="lazy" title="" ></img>

                    <p className="itemp">
                       </p>
                    <div>
                    <h2></h2>
                    
                    
                    </div>
                    


                    <span id="" ></span>

                   


                  
                    
                    <br />
                </div>
                <fieldset>
                    <legend><h2> Reviews </h2></legend>

                    <span id="reviews" >

                    </span>
                    <StarReviewList />
                    {(this.props.auth && this.props.auth.numberOfReadings > 0) &&
                        <Link to="/readings" className="">
                            <button className="actionupload" >leave a review on your profile</button>
                        </Link>}


                </fieldset>
                <fieldset>
                    <legend><h2> Frequently Asked Questions </h2></legend>

                    <span id="faq" >

                    </span>
                    <FaqList />
                    {this.renderFaqForm()}


                </fieldset>


                <fieldset>
                    <legend><h2> Offer </h2></legend>

                    <span id="offer" >

                    </span>
                    <OfferList />


                </fieldset>

                <fieldset>
                    <legend><h2> Links </h2></legend>

                    <span id="links" >

                    </span>

                    <LinkList />
                    {this.renderLinkForm()}


                </fieldset>

                <fieldset>
                    <legend><h2> Contact </h2></legend>

                    <div id="contact" >
                    <img className ="me"  src="/me.png" alt="isabelle bidou" loading="lazy" title="Isabelle Bidou"></img>
                        <p className="itemp">My name is Isabelle Bidou. If you have questions, feel free to contact me. <a href="mailto:isa.bidou@gmail.com?subject=iridology information">isa.bidou@gmail.com</a></p>

                    </div>

                </fieldset>
                {(cookie === true || cookie === '' || cookie === null) && <span>{this.renderButton()}</span>}
                <div >

                </div>
                <CookieConsent
                    location="bottom"
                    buttonText="ok"
                    cookieName="iridologyCookieConsent"
                    style={{ background: "#2B373B" }}
                    buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
                    expires={150}
                    enableDeclineButton
                    onDecline={() => {

                        this.handleDecline()
                    }}
                    onAccept={() => {
                        this.handleAccept()

                    }}
                    overlay
                >
                    This website uses cookies for authentication with google OAuth and payment with Stripe, to enhance the user experience.{" "}
                    If you consent to using cookies you can authentify with your google credentials and order a reading online. Alternatively you can send me an email or book a reading via fiverr.
                    <br />
                    {(countryCode !== 'FR' || countryCode !== 'fr') &&
                        <span className="item">
                            <Link key={'legalnoticelink'}
                                to={'/legalnotice'}
                            >
                                Legal Notice
                            </Link>
                        </span>}
                    {(countryCode === 'FR' || countryCode === 'fr') &&
                        <span className="item">
                            <Link key={'mentionslegaleslink'}
                                to={'/mentionslegales'}
                            >
                                Mentions legales
                            </Link>
                        </span>}

                    {" "}

                </CookieConsent>
            </div>
        );
    }

}
function mapStateToProps({ auth, cookie }) {

    return { auth, cookie }

};

export default connect(mapStateToProps, { fetchCookieValue })(Landing);