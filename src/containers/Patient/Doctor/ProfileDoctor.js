import './ProfileDoctor.scss';
import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils';

import { FormattedMessage } from 'react-intl';
import { getProfileInforDoctor } from '../../../services/userService';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import moment from 'moment';
import { Link } from 'react-router-dom';
class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {},

        };
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.doctorId !== prevProps.doctorId) {
            this.getProfileInfor(this.props.doctorId)
        }

    }
    async componentDidMount() {
        let id = this.props.doctorId
        let data = await this.getProfileInfor(id);
        this.setState({
            dataProfile: data
        })
    }
    getProfileInfor = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileInforDoctor(id);
            if (res && res.errorCode === 0) {
                result = res.data;
            }
        }
        return result;
    };
    renderTimeBooking = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {

            let date = language === LANGUAGES.VI ?

                moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                :
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY');



            return (
                <>
                    <div>

                        {language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn}
                        - {date}</div>
                    <div><FormattedMessage id='patient.booking.free' /></div>
                </>
            )
        }
    };

    render() {
        let dataProfile = this.state.dataProfile;
        let nameVi = '', nameEn = '';
        let locationEn = '', locationVi = '';
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;


        }
        if (dataProfile && dataProfile.Doctor_Infor) {
            locationEn = `${dataProfile.Doctor_Infor.provinceTypeData.valueEn} `;
            locationVi = `${dataProfile.Doctor_Infor.provinceTypeData.valueVi} `;

        }

        let { locationDoctorBusiness, dataDetailSpecialty, isShowDesciptionDoctor, doctorId, dataTime, language, isShowPrice, isShowLinkDoctor } = this.props;
        console.log('checking locationDoctorBusiness', locationEn)
        console.log('checking locationDoctorBusiness state', this.state)
        return (

            <div className='profile-doctor-container' >
                <div className='intro-doctor'>
                    <div className='content-left'
                        style={{ backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})` }}>

                    </div>

                    <div className='content-right'>
                        <div className='up'>
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                        </div>
                        <div className='down'>
                            {isShowDesciptionDoctor === true ?


                                <>
                                    {dataProfile && dataProfile.MarkDown
                                        && dataProfile.MarkDown.description
                                        &&
                                        <span>
                                            {dataProfile.MarkDown.description}
                                        </span>
                                    }

                                </>
                                : <>
                                    {this.renderTimeBooking(dataTime)}
                                </>
                            }

                            <div className='location-doctor'>
                                <i className="fas fa-map-marker-alt"></i>{language === LANGUAGES.VI ? `${locationVi}` : locationEn}


                            </div>
                        </div>
                    </div>

                </div>
                {
                    isShowLinkDoctor === true &&
                    <div className='view-detail-doctor'>
                        <Link to={`/detail-doctor/${doctorId}`} >
                            Xem Thêm
                        </Link>
                    </div>
                }
                {
                    isShowPrice === true &&
                    <div className='price'>
                        {language === LANGUAGES.VI ? 'Giá Khám: ' : 'Price: '}
                        {dataProfile && dataProfile.Doctor_Infor && language ===
                            LANGUAGES.VI ?

                            <NumberFormat
                                value={dataProfile.Doctor_Infor.priceTypeData.valueVi}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={' VND'} />
                            : ''

                        }
                        {dataProfile && dataProfile.Doctor_Infor && language ===
                            LANGUAGES.EN ?
                            <NumberFormat
                                value={dataProfile.Doctor_Infor.priceTypeData.valueEn}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={' $'} /> : ''

                        }
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {

        language: state.app.language,


    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
