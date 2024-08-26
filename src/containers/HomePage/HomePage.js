import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import HandBook from './Section/HandBook';
import OutStandingDoctor from './Section/OutStandingDoctor';
import VidInfo from './Section/VidInfo';
import HomeFooter from './HomeFooter';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './HomePage.scss';
class HomePage extends Component {

    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,

        };
        return (
            <div>
                <HomeHeader isShowBanner={true} />
                <Specialty setting={settings} />
                <MedicalFacility
                    setting={settings}
                />
                {/* <div style={{ height: '300px' }}></div> */}
                <OutStandingDoctor setting={settings} />
                <HandBook setting={settings} />
                <VidInfo setting={settings} />
                <HomeFooter />





            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
