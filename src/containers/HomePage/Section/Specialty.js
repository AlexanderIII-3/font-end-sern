import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import { LANGUAGES } from '../../../utils';
import { lang } from 'moment';
import *as actions from '../../../store/actions'
import './Specialty.scss';
import { handleGetDetailSpecialtyById } from '../../../services/userService';

import { withRouter } from 'react-router';


class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrSpecialty: []
        };
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.arrSpecialty !== this.props.arrSpecialty) {
            this.setState({
                arrSpecialty: this.props.arrSpecialty
            })
        }
    }
    async componentDidMount() {
        let res = await this.props.allSpecialty();
        if (res && res.errorCode === 0) {
            this.setState({
                arrSpecialty: res.data ? res.data : []

            })
        }
    }
    handleViewDetailSpecialty = async (data) => {
        console.log('check eami specialty', data)


        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${data.id}`);

        }
    };
    render() {
        console.log('check specialty', this.state)
        let language = this.props.language;
        let allSpecialty = this.state.arrSpecialty;
        return (
            <div className='section-share section-specialty'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'> {language === LANGUAGES.VI ? <FormattedMessage id="home-page.popular-specialties" />
                            : <FormattedMessage id="home-page.popular-specialties" />
                        }</span>
                        <button className='btn-section'> {language === LANGUAGES.VI ? <FormattedMessage id="home-page.more-Info" /> :
                            <FormattedMessage id="home-page.More-Info" />
                        }  </button>

                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.setting}>

                            {allSpecialty && allSpecialty.length > 0 &&
                                allSpecialty.map((item, index) => {
                                    if (index === 0) {
                                        console.log(item)
                                    }

                                    let name = item.name;
                                    let image = item.image;
                                    return (
                                        <div className='section-customize specialty-child'
                                            key={index}
                                            onClick={() => this.handleViewDetailSpecialty(item)}
                                        >
                                            <div

                                                className='bg-imge section-specialty'

                                                style={{ backgroundImage: `url(${image})` }}
                                            />
                                            <div className='content-specialty'> {name}</div>
                                        </div>
                                    )
                                })
                            }


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
        arrSpecialty: state.admin.specialtyArr,


    };
};

const mapDispatchToProps = dispatch => {
    return {
        allSpecialty: () => dispatch(actions.getRequiredSpecialtyInfor())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
