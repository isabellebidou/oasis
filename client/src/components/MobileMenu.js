
import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
//import Payments from "./Payments";
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import { AiOutlineLogout } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineHome } from "react-icons/ai";
import { AiFillVideoCamera} from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import $ from 'jquery';




class MobileMenu extends Component {

    navClick() {
        $("#mobilemenu").slideToggle();
    }

    renderMobileMenu() {
        const currentlyOnProfile = this.props.location.pathname === '/profile' ? true : false;
        //const otherRoute = currentlyOnProfile ? '/' : '/readings';
        //const otherRouteName = currentlyOnProfile ? 'home' : 'profile';
        const ready = this.props.auth && this.props.userdata.length > 0 && this.props.videos.length >= 1 && currentlyOnProfile ? true : false;
        const isAdmin = this.props.auth && this.props.auth.type === 'admin';
        const isHome = this.props.location.pathname === '/' ? true : false;
        const isMember = this.props.auth && this.props.auth.type === 'member';


        return (
            <ul id="mobilemenuul">



                {isMember || isAdmin && 
                    <li><Link key={444}
                        to={'/videos'}
                        className="mobilemenuli button"
                    >
                        <AiFillVideoCamera
                            style={{ color: "#7f5f87" }}
                            key={'AiFillVideoCamera'}
                        />
                    </Link></li>}
                {!this.props.auth &&
                    <a href="/auth/google"><img src="/btn_google_signin_dark_normal_web.png" alt="sign in with google" /></a>
                }
                {(this.props.auth && isAdmin) &&
                    <li><Link key={6} to="/users" className="mobilemenuli button" >
                        <FaUsers
                            style={{ color: "#7f5f87" }}
                            key={'FaUsers'}

                        />
                    </Link></li>}
                {(ready && currentlyOnProfile) &&
                    <li><Link key={6} to="/feedback/new" className="mobilemenuli button" >
                        order a feedback
                    </Link></li>}
                {isHome === false &&
                    <li><Link key={3}
                        to={'/'}
                        className="mobilemenuli button"
                    >
                        <AiOutlineHome
                            style={{ color: "#7f5f87" }}
                            key={'AiOutlineHome'}
                        />
                    </Link></li>}

                {(this.props.auth && currentlyOnProfile === false) &&
                    <li>

                        <a key={4} className="mobilemenuli button" href="/profile"><AiOutlineUser
                            style={{ color: "#7f5f87" }}
                            key={'AiOutlineUser'}
                        /></a>

                    </li>}
                {this.props.auth &&
                    <li>
                        <a key={4} className="mobilemenuli button" href="/api/logout"><AiOutlineLogout
                            style={{ color: "#7f5f87" }}
                            key={'AiOutlineMenu'}
                        /></a>
                    </li>}


            </ul>
        )
    }

    render() {
        return (
            <div>
                <div data-role="navbar" id="mobilemenu" onClick={this.navClick}>

                    {this.renderMobileMenu()}

                </div>
            </div>
        );
    }

}
function mapStateToProps({ auth, videos, userdata }) {
    return { auth, videos, userdata };
}

export default withRouter(connect(mapStateToProps)(MobileMenu));

