import './ManagePatient.scss'
import React, { Component } from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import DatePicker from '../../../components/Input/DatePicker';
import { getAllPatientForDoctor, sendRemedy } from '../../../services/userService';
import moment from 'moment';
import RemedyModel from './RemedyModel';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            // remedy
            isOpenRemedyModel: false,
            dataModal: {},
            emailPatient: '',
            image: '',
            isShowLoading: false
        };
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {


    }
    async componentDidMount() {

        this.getDataPatient();

    }
    handleChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, async () => {


            await this.getDataPatient()
        });
    }
    getDataPatient = async () => {

        let { user } = this.props.user;
        let { currentDate } = this.state;
        let formatedDate = new Date(currentDate).getTime();
        let res = await getAllPatientForDoctor({
            doctorId: user.id,
            date: formatedDate
        });
        if (res && res.errorCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }
    }
    handleConfirmBooking = (item) => {
        console.log('check iem name', item)
        let data = {

            doctorId: item.doctorId,
            patientId: item.patienId,

            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName,
        }
        this.setState({
            isOpenRemedyModel: true,
            dataModal: data
        })

    };
    closeRemedyModal = () => {
        this.setState({
            isOpenRemedyModel: false,
            dataModal: {}

        })
    };
    sendRemedy = async (data) => {
        this.setState({
            isShowLoading: true,
        })
        let { dataModal } = this.state
        let res = await sendRemedy({
            email: data.email,
            image: data.imageBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.patientName

        })
        if (res && res.errorCode === 0) {
            this.setState({
                isShowLoading: false,
            })
            toast.success("Send Remedy Success!")
            await this.getDataPatient();
            this.closeRemedyModal();

        } else {
            toast.error("Send Remedy Error!")
        }
    };
    handleRemedy = () => {

    };
    render() {
        let { dataPatient, dataModal, isOpenRemedyModel } = this.state;
        let language = this.props.language;

        return (

            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text='Loading...'
                >
                    <div className='manage-patient-container' >
                        <div className='m-p-title'>
                            Quản Lý Bệnh Nhân Khám Bệnh
                        </div>
                        <div className='manage-patient-body row'>
                            <div className='col-6 form-group'>

                                <label>Chọn Ngày Khám</label>
                                <DatePicker
                                    className="form-control"
                                    onChange={this.handleChangeDatePicker}
                                    value={this.state.currentDate}
                                />                    </div>
                            <div className='col-12 table-manage-patient'>
                                <table style={{ width: '100%' }}>
                                    <tbody>
                                        <tr>
                                            <th>STT</th>
                                            <th>Thời Gian</th>
                                            <th>Họ Và Tên</th>
                                            <th>Địa Chỉ</th>
                                            <th>Giới Tính</th>
                                            <th>Action</th>
                                        </tr>
                                        {dataPatient && dataPatient.length > 0 ?

                                            dataPatient.map((item, index) => {
                                                let gender = language === LANGUAGES.VI ? item.patientData.genderData.valueVi : item.patientData.genderData.valueEn
                                                let time = language === LANGUAGES.VI ? item.timeBookingData.valueVi
                                                    : item.timeBookingData.valueEn

                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{time}</td>
                                                        <td>{item.patientData.firstName}</td>
                                                        <td>{item.patientData.address}</td>
                                                        <td>{gender}</td>
                                                        <td>

                                                            <button className='mp-btn-confirm'
                                                                onClick={() => this.handleConfirmBooking(item)}
                                                            >Xác Nhận</button>
                                                            <button
                                                                onCanPlay={() => this.handleRemedy()}
                                                                className='mp-btn-remedy'>Gửi Hoá Đơn</button>
                                                        </td>
                                                    </tr>
                                                )


                                            })
                                            :
                                            <tr>

                                                <td colSpan={'6'} style={{ textAlign: 'center', color: 'red' }}> No schedule data!</td>
                                            </tr>
                                        }

                                    </tbody>


                                </table>
                            </div>
                        </div>
                    </div>
                    <RemedyModel
                        dataModal={dataModal}
                        isOpen={isOpenRemedyModel}
                        closeRemedyModal={this.closeRemedyModal}
                        sendRemedy={this.sendRemedy}
                    />

                </LoadingOverlay>


            </>
        );
    }
}

const mapStateToProps = state => {
    return {

        language: state.app.language,
        user: state.user.userInfo,


    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
