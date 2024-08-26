import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import logo from '../../assets/logo.png'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import { changeLanguageApp } from '../../store/actions'
import { withRouter } from 'react-router';


class HomeHeader extends Component {
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    };
    returnHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`);

        }
    }

    render() {

        let language = this.props.language;
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className='fas fa-align-justify'></i>
                            {/* <img src={logo} /> */}
                            <div className='header-logo' onClick={() => this.returnHome()}>


                            </div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b> <FormattedMessage
                                    id="home-header.speciality" />    </b> </div>
                                <div className='sub-title'> <FormattedMessage
                                    id="home-header.searchdoctor" /> </div>
                            </div>
                            <div className='child-content'>
                                <div><b> <FormattedMessage
                                    id="home-header.HealthFacilities" /></b> </div>
                                <div className='sub-title'><FormattedMessage
                                    id="home-header.ChooseAHospitalOrClinic" /></div>

                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage
                                    id="home-header.Doctor" /> </b> </div>
                                <div className='sub-title'><FormattedMessage
                                    id="home-header.GoodDoctor" /></div>
                            </div>



                            <div className='child-content'>
                                <div><b> <FormattedMessage
                                    id="home-header.Re-examination" /></b> </div>
                                <div className='sub-title'> <FormattedMessage
                                    id="home-header.GeneralHealth" /></div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'><i className='fas fa-question-circle'></i>

                                <FormattedMessage
                                    id="home-header.Support" /></div>
                            <div className={language === LANGUAGES.VI ? 'language-vi active ' : 'language-vi'}  ><span onClick={() => this.changeLanguage(LANGUAGES.VI)} >VN</span> </div>
                            <div className={language === LANGUAGES.EN ? 'language-en active ' : 'language-en'} ><span onClick={() => this.changeLanguage(LANGUAGES.EN)}> EN</span></div>
                        </div>

                    </div>
                </div>
                {this.props.isShowBanner === true &&
                    <div className='home-banner-container'>
                        <div className='content-up'>
                            <div className='title1'><FormattedMessage
                                id="banner.title1" /></div>
                            <div className='title2'><FormattedMessage
                                id="banner.title2" /></div>
                            <div className='search'>

                                <i className='fas fa-search'></i>
                                <input type='text' placeholder='Tìm chuyên khoa khám bệnh ' />

                            </div>
                        </div>
                        <div className='content-down'>
                            <div className='option'>
                                <div className='option-child'>
                                    <div className='icon-child'><i className='far fa-hospital'></i>
                                    </div>
                                    <div className='text-child'><FormattedMessage
                                        id="banner.child1" /></div>

                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className='fas fa-mobile-alt'></i>

                                    </div>
                                    <div className='text-child'><FormattedMessage
                                        id="banner.child2" /></div>

                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className='fas fa-procedures'></i>

                                    </div>
                                    <div className='text-child'><FormattedMessage
                                        id="banner.child3" /></div>

                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className='fas fa-flask'></i>
                                    </div>
                                    <div className='text-child'><FormattedMessage
                                        id="banner.child4" /> </div>

                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className='fas fa-user-md'></i>

                                    </div>
                                    <div className='text-child'><FormattedMessage
                                        id="banner.child5" /></div>

                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i class="fas fa-tooth"></i>

                                    </div>
                                    <div className='text-child'><FormattedMessage
                                        id="banner.child6" /></div>

                                </div>
                            </div>
                        </div>

                    </div>
                }
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
