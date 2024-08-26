import './DetailClinic.scss'
import React, { Component } from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { handleGetDetailClinicById } from '../../../services/userService';



import _ from 'lodash';

class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailClinic: {},
        };
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {


    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await handleGetDetailClinicById({
                id: id,
            });

            if (res && res.errorCode === 0) {
                let data = res.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(data)) {
                    let arr = data.doctorClinic;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId);
                        })

                    }
                }
                this.setState({
                    dataDetailClinic: res.data,
                    arrDoctorId: arrDoctorId,
                })

            }

        }

    }







    render() {
        let { language } = this.props;
        let { arrDoctorId, dataDetailClinic } = this.state;

        return (
            <div className='detail-specialty-container'>
                <HomeHeader></HomeHeader>
                <div className='detail-specialty-body'>
                    <div className='description-specialty'>
                        {dataDetailClinic && !_.isEmpty(dataDetailClinic)

                            &&
                            <>
                                <div className='clinic-address'>{dataDetailClinic.name}</div>
                                <div dangerouslySetInnerHTML={{ __html: dataDetailClinic.descriptionHtml }}></div>
                            </>
                        }
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
                                                dataDetailClinic={this.state.dataDetailClinic}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
