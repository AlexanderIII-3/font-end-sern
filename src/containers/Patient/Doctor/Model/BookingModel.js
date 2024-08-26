import './BookingModel.scss'
import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './BookingModel.scss';
import { Modal } from 'reactstrap';
import * as actions from "../../../../store/actions";
import Select from 'react-select';

import ProfileDoctor from '../ProfileDoctor';
import _, { times } from 'lodash';
import { LANGUAGES } from '../../../../utils';
import DatePicker from '../../../../components/Input/DatePicker';
import { postPatentAppointment } from '../../../../services/userService';
import { toast } from 'react-toastify';
import moment from 'moment';
import LoadingOverlay from 'react-loading-overlay';

class BookingModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            reason: '',
            gender: '',
            doctorId: '',
            address: '',
            birthDay: '',
            selectedGender: '',
            doctorId: '',
            timeType: '',
            isShowLoading: false
        };
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {

            let arrGenders = this.props.genderRedux

            this.setState({
                gender: this.buildDataGender(arrGenders),

            })
        }
        if (prevProps.language !== this.props.language) {
            let arrGenders = this.props.genderRedux

            this.setState({
                gender: this.buildDataGender(arrGenders),

            })
        }
        if (prevProps.dataScheduleModal !== this.props.dataScheduleModal) {
            if (this.props.dataScheduleModal && !_.isEmpty(this.props.dataScheduleModal)) {
                let doctorId = this.props.dataScheduleModal.doctorId
                this.setState({
                    doctorId: doctorId,
                    timeType: this.props.dataScheduleModal.timeType
                })
            }
        }

    }
    buildDataGender = (data) => {
        let result = [];
        let language = this.props.language;
        if (data && data.length > 0) {
            data.map(item => {
                let object = {};
                object.label = language === LANGUAGES.VI ? item.valueVI : item.valueEn;
                object.value = item.keyMap;
                result.push(object);
            })

            return result;


        }
    }
    handleChange = selectedGender => {
        this.setState({ selectedGender })
    };
    async componentDidMount() {
        this.props.getGenderStart();


    }
    // setPriceDoctor = (data) => {
    //     if (this.props.language === LANGUAGES.VI) {
    //         data.priceTypeData.value.Vi
    //     }
    // };


    handleOnchange = (event, id) => {

        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState,
        });
    }
    handleChangeDatePicker = (date) => {
        this.setState({
            birthDay: date[0]
        });
    }
    handleConfirmBooking = async () => {
        this.setState({
            isShowLoading: true
        });
        let doctorName = this.buildDoctorName(this.props.dataScheduleModal)
        let date = new Date(this.state.birthDay).getTime();

        let timeString = this.buildTimeBooking(this.props.dataScheduleModal)
        let res = await postPatentAppointment({
            fullName: this.state.fullName,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
            reason: this.state.reason,
            date: this.props.dataScheduleModal.date,
            birthDay: date,
            selectedGender: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            gender: this.state.gender,
            address: this.state.address,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName
        })
        this.setState({
            isShowLoading: false
        });
        if (res && res.errorCode === 0) {
            toast.success("Booking successful!");
            this.props.isCloseModal();
            this.setState({
                fullName: '',
                email: '',
                phoneNumber: '',
                reason: '',
                birthDay: '',
                selectedGender: '',
                doctorId: '',
                gender: '',
                address: '',
            })
        } else {
            toast.error("Booking failed!");
        }
    };


    buildTimeBooking = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn

            let date = language === LANGUAGES.VI ?

                moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                :
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY');



            return (
                `${time} -${date}`
            )
        }
        return ''
    };
    buildDoctorName = (dataName) => {
        console.log('check dataName', dataName.doctorData)
        let { language } = this.props;
        if (dataName && !_.isEmpty(dataName)) {
            let name = language === LANGUAGES.VI ?
                `${dataName.doctorData.lastName} ${dataName.doctorData.firstName}` :
                `${dataName.doctorData.firstName} ${dataName.doctorData.lastName}`




            return name;


        }
        return ''
    };
    render() {

        let { dataScheduleModal, isOpenModal, isCloseModal } = this.props;
        let doctorId = '';
        if (dataScheduleModal && !_.isEmpty(dataScheduleModal)) {
            doctorId = dataScheduleModal.doctorId
        }
        return (
            <LoadingOverlay
                active={this.state.isShowLoading}
                spinner
                text='Loading...'
            >
                <Modal

                    isOpen={isOpenModal}
                    className={'booking-modal-container'}
                    size='lg'
                    centered
                >
                    <div className='booking-modal-content'>
                        <div className='booking-modal-header'>
                            <span className='left'><FormattedMessage id='patient.booking.title' />

                            </span>
                            <span
                                onClick={isCloseModal}
                                className='right'><i className='fas fa-times'></i>
                            </span>
                        </div>
                        <div className='booking-modal-body'>
                            {/* {JSON.stringify(dataScheduleModal)} */}
                            <div className='doctor-infor'>
                                <ProfileDoctor
                                    isShowDesciptionDoctor={false}
                                    doctorId={doctorId}
                                    dataTime={dataScheduleModal}
                                    isShowLinkDoctor={false}
                                    isShowPrice={true}
                                />
                            </div>

                            <div className='row'>
                                <div className='col-6 form-group' >
                                    <label><FormattedMessage id='patient.booking.full-name' /></label>
                                    <input className='form-control'
                                        value={this.state.fullName}
                                        onChange={(event) => this.handleOnchange(event, 'fullName')}
                                    ></input>
                                </div>
                                <div className='col-6 form-group' >
                                    <label><FormattedMessage id='patient.booking.Phone-Number' /></label>
                                    <input
                                        value={this.state.phoneNumber}
                                        onChange={(event) => this.handleOnchange(event, 'phoneNumber')}
                                        className='form-control'></input>
                                </div>
                                <div className='col-6 form-group' >
                                    <label><FormattedMessage id='patient.booking.email' /></label>
                                    <input
                                        type='email'
                                        value={this.state.email}
                                        onChange={(event) => this.handleOnchange(event, 'email')}
                                        className='form-control'></input>
                                </div>
                                <div className='col-6 form-group' >
                                    <label><FormattedMessage id='patient.booking.address' /></label>
                                    <input
                                        value={this.state.address}
                                        onChange={(event) => this.handleOnchange(event, 'address')}
                                        className='form-control'></input>
                                </div>
                                <div className='col-12 form-group' >
                                    <label><FormattedMessage id='patient.booking.reason' /></label>
                                    <input
                                        value={this.state.reason}
                                        onChange={(event) => this.handleOnchange(event, 'reason')}
                                        className='form-control'></input>
                                </div>

                                <div className='col-6 form-group' >
                                    <label><FormattedMessage id='patient.booking.Birthday' /></label>
                                    <DatePicker
                                        className="form-control"
                                        onChange={this.handleChangeDatePicker}
                                        value={this.state.birthDay}
                                    />
                                </div>
                                <div className='col-6 form-group' >
                                    <label><FormattedMessage id='patient.booking.gender' /></label>
                                    <Select
                                        value={this.state.selectedGender}
                                        onChange={this.handleChange}
                                        options={this.state.gender}
                                    />


                                </div>

                            </div>
                        </div>
                        <div className='booking-modal-footer'>
                            <button
                                onClick={() => this.handleConfirmBooking()}
                                className='btn-booking-confirm'><FormattedMessage id='patient.booking.confirm' /></button>
                            <button onClick={isCloseModal} className='btn-booking-cancel'><FormattedMessage id='patient.booking.cancel' /></button>
                        </div>
                    </div>
                </Modal>
            </LoadingOverlay>
        );
    }
}

const mapStateToProps = state => {
    return {

        language: state.app.language,
        genderRedux: state.admin.genders,



    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModel);
