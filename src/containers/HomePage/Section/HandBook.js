import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import { LANGUAGES } from '../../../utils';




class HandBook extends Component {

    render() {
        let language = this.props.language

        return (
            <div className='section-share section-handbook'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'> {language === LANGUAGES.VI ? <FormattedMessage id="home-page.handbook" />
                            : <FormattedMessage id="home-page.handbook" />}</span>
                        <button className='btn-section'>{language === LANGUAGES.VI ? <FormattedMessage id="home-page.more-Info" /> :
                            <FormattedMessage id="home-page.More-Info" />} </button>

                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.setting}>
                            <div className='section-customize'>
                                <div className='bg-imge section-handbook' />
                                <div> Top 5 địa chỉ chữa ung thư da </div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-imge section-handbook' />

                                <div> Cẩm nang</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-imge section-handbook' />
                            </div>
                            <div className='section-customize'>
                                <div className='bg-imge section-handbook' />
                            </div>
                            <div className='section-customize'>
                                <div className='bg-imge section-handbook' />
                            </div>
                            <div className='section-customize'>
                                <div className='bg-imge section-handbook' />
                            </div>
                        </Slider>
                    </div>

                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
