import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss'
import Select from 'react-select';
import localization from 'moment/locale/vi'
import { LANGUAGES } from '../../../utils';
import moment, { lang } from 'moment';
import { getScheduleDoctorByDate } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import BookingModel from './Model/BookingModel';
class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvailableTime: [],
            isOpenModal: false,
            dataScheduleModal: {}
        };
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
            let allDays = this.getArrDays(this.props.language)
            this.setState({
                allDays: allDays
            })
        }
        if (prevProps.doctorId !== this.props.doctorId) {
            let allDays = this.getArrDays(this.props.language)
            let res = await getScheduleDoctorByDate(this.props.doctorId, allDays[0].value);
            this.setState({
                allAvailableTime: res.data ? res.data : []
            });

        }

    }
    async componentDidMount() {
        let { language } = this.props;
        let allDays = this.getArrDays(language);
        if (this.props.doctorId) {
            let allDays = this.getArrDays(this.props.language)
            let res = await getScheduleDoctorByDate(this.props.doctorId, allDays[0].value);
            this.setState({
                allAvailableTime: res.data ? res.data : []
            })

        }
        this.setState({
            allDays: allDays,
        })


    }
    getArrDays = (language) => {
        let allDays = [];

        for (let i = 0; i < 7; i++) {
            let object = {};

            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date()).add(i, 'days').format('DD/MM');
                    let today = `Hôm nay - ${ddMM}`
                    object.lable = today;

                } else {
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    object.lable = labelVi
                }



            } else {
                if (i === 0) {
                    let ddMM2 = moment(new Date()).format('DD/MM');
                    let today = `Today - ${ddMM2}`
                    object.lable = today;

                } else {
                    object.lable = moment(new Date()).add(i, 'days').locale('en').format('ddd -DD/MM')

                }
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();

            allDays.push(object);
        }
        return allDays


    }
    handleOnchangeSelect = async (event) => {
        if (this.props.doctorId && this.props.doctorId !== -1) {
            let date = event.target.value;
            let res = await getScheduleDoctorByDate(this.props.doctorId, date);
            if (res && res.errorCode === 0) {
                this.setState({
                    allAvailableTime: res.data ? res.data : [],
                })
            }
        }
    };
    handleClickScheduleTime = (time) => {
        this.setState({
            isOpenModal: true,
            dataScheduleModal: time
        })
    };
    isCloseModal = () => {
        this.setState({
            isOpenModal: false
        })
    }
    render() {
        let { language } = this.props
        let { allDays, allAvailableTime } = this.state
        return (
            <>

                <div className='doctor-schedule-container'>
                    <div className='all-schedule'>
                        <select onChange={(event) => this.handleOnchangeSelect(event)}>
                            {allDays && allDays.length > 0 &&
                                allDays.map((item, index) => {
                                    return (
                                        <option value={item.value} key={index}>{item.lable}</option>

                                    )
                                })
                            }

                        </select>
                    </div>
                    <div className='all-available-time'>
                        <div className='text-calendar'>
                            <i className="fa fa-calendar">
                                <span ><FormattedMessage id="patient.detail-doctor.schedule" /></span></i>

                        </div>
                        <div className='time-content'>
                            {allAvailableTime && allAvailableTime.length > 0 ?
                                <>
                                    <div className='time-content-btns'>
                                        {allAvailableTime.map((item, index) => {
                                            let time = language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn
                                            return (
                                                <button key={index}
                                                    className={language === LANGUAGES.VI ? 'btn-vi' : 'btn-en'}
                                                    onClick={() => this.handleClickScheduleTime(item)}
                                                >
                                                    {time}

                                                </button>

                                            )
                                        })}
                                    </div>

                                    <div className='book-free'>
                                        <span><FormattedMessage id="patient.detail-doctor.choose" /><i className='far fa-hand-point-up'></i> <FormattedMessage id="patient.detail-doctor.book-free" /></span>
                                    </div>
                                </>
                                : <div className='Notification'><FormattedMessage id="patient.detail-doctor.no-schedule" /></div>
                            }

                        </div>
                    </div>
                </div>
                <BookingModel
                    isCloseModal={this.isCloseModal}
                    isOpenModal={this.state.isOpenModal}
                    dataScheduleModal={this.state.dataScheduleModal}
                />
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
