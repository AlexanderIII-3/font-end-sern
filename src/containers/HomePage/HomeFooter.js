import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import { LANGUAGES } from '../../utils';




class VidInfo extends Component {

    render() {
        let language = this.props.language
        return (
            <div className='home-footer'>
                <p>&copy; 2024 Alex Xander III. <a target='blank' href='https://www.facebook.com/profile.php?id=100029144525788'>{language === LANGUAGES.VI ? <FormattedMessage id="home-page.footer" /> :
                    <FormattedMessage id="home-page.footer" />
                }</a></p>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VidInfo);
