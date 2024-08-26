import './DetailSpecialty.scss'
import React, { Component } from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import _ from 'lodash';
import { handleGetDetailSpecialtyById, getAllCodeService } from '../../../services/userService';

class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailSpecialty: {},
            listprovince: [],
            slectedprovince: '',
            locationDoctorBusiness: '',
        };
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {


    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;

            let res = await handleGetDetailSpecialtyById({
                id: id,
                location: 'ALL'
            });
            // find doctor by location
            let resProvince = await getAllCodeService('PROVINCE');

            if (res && res.errorCode === 0 && resProvince.errorCode === 0) {
                let data = res.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(data)) {
                    let arr = data.doctorSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId);
                        })

                    }
                }
                let dataProvince = resProvince.data;
                let result = [];
                if (dataProvince && dataProvince.length > 0) {
                    dataProvince.unshift({

                        createAt: null,
                        keyMap: "ALL",
                        type: "PROVINCE",
                        valueEn: "All",
                        valueVI: "Toàn quốc",



                    })
                    result = dataProvince
                }
                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                    listprovince: result ? result : [],
                    // arrDoctorId: res.data.doctorSpecialty
                })
            }
        }

    }
    handleFindDoctorByLocation = async (event) => {
        console.log('check event province', event.target.value)
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let location = event.target.value

            let res = await handleGetDetailSpecialtyById({
                id: id,
                location: location
            });
            // find doctor by location exact

            if (res && res.errorCode === 0) {
                let data = res.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(data)) {
                    let arr = data.doctorSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId);
                        })

                    }
                }
                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                    locationDoctorBusiness: location
                }, () => {
                    console.log('check state ment', this.state)
                })
            }
        }



    }


    render() {
        let { language } = this.props;
        let { arrDoctorId, dataDetailSpecialty, listprovince, slectedprovince } = this.state;

        return (
            <div className='detail-specialty-container'>
                <HomeHeader></HomeHeader>
                <div className='detail-specialty-body'>
                    <div className='description-specialty'>
                        {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty)

                            && <div dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHtml }}></div>
                        }
                    </div>
                    <div className='search-doctor-location'>
                        <select onChange={(event) => this.handleFindDoctorByLocation(event)} >
                            {listprovince && listprovince.length > 0
                                &&
                                listprovince.map((item, index) => {
                                    return (
                                        <option key={index}
                                            value={item.keyMap}
                                            className='otp-location'>
                                            {language === LANGUAGES.VI ? item.valueVI : item.valueEn}
                                        </option>
                                    )
                                })
                            }

                        </select>
                    </div>

                    {arrDoctorId && arrDoctorId.length > 0 &&
                        arrDoctorId.map((item, index) => {
                            return (

                                <div className='each-doctor' key={index}>
                                    <div className='dt-content-left'>
                                        <div>
                                            <ProfileDoctor
                                                isShowDesciptionDoctor={true}
                                                doctorId={item}
                                                isShowLinkDoctor={true}
                                                isShowPrice={false}
                                                dataDetailSpecialty={this.state.dataDetailSpecialty}
                                                locationDoctorBusiness={this.state.locationDoctorBusiness}

                                            />
                                        </div>

                                    </div>
                                    <div className='dt-content-right'>
                                        <div className='doctor-schedule'>
                                            <DoctorSchedule
                                                doctorId={item}

                                            />
                                        </div>

                                        <div className='doctor-extra-infor'>
                                            <DoctorExtraInfor

                                                doctorId={item}
                                            />

                                        </div>


                                    </div>
                                </div>

                            )
                        })
                    }
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
