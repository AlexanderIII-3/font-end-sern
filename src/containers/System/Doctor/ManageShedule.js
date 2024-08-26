import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageShedule.scss'
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from "../../../store/actions";
import { LANGUAGES, dateFormat } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { toast } from "react-toastify";
import _, { result } from 'lodash';
import { bulkCreateSchedule } from '../../../services/userService';


class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctor: [],
            selectedDoctor: {},
            currentDate: '',
            rangeTime: []
        }
    }
    componentDidMount() {
        this.props.fetchAllDoctor();
        this.props.fetchAllScheduleTime();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        let dataSelect = this.buildDataInputSelect(this.props.allDoctor)
        if (prevProps.allDoctor !== this.props.allDoctor) {
            this.setState({
                listDoctor: dataSelect
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctor)
            if (prevProps.allDoctor !== this.props.allDoctor) {
                this.setState({
                    listDoctor: dataSelect
                })
            }

        }
        if (prevProps.dataTime !== this.props.dataTime) {
            let data = this.props.dataTime
            if (data && data.length > 0) {

                // data.map(item => {
                //     item.isSelected = false;
                //     return item;
                // })
                data = data.map(item => ({ ...item, isSelected: false }));
            }
            this.setState({
                rangeTime: data
            })
        }
    }
    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object)
            })

            return result
        }
    };
    handleChange = async selectedDoctor => {
        this.setState({ selectedDoctor });

    };
    handleChangeDetePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }
    handleClickButtonTime = (time) => {
        let { rangeTime } = this.state
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id) item.isSelected = !item.isSelected;
                return item;
            })
            this.setState({
                rangeTime: rangeTime
            })
        }
    }
    handleSaveSchedule = async () => {
        let { rangeTime, selectedDoctor, currentDate } = this.state
        let result = [];
        if (!currentDate) {
            toast.error("Invalid Date!")
            return;
        }
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error("Invalid Slected Doctor!")
            return;


        }

        // let formatDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER)
        // let formatDate = moment(currentDate).unix();
        let formatDate = new Date(currentDate).getTime();
        if (rangeTime && rangeTime.length > 0) {
            let slectedTime = rangeTime.filter(item => item.isSelected === true)
            if (slectedTime && slectedTime.length > 0) {
                slectedTime.map(item => {
                    let object = {};
                    object.doctorId = selectedDoctor.value
                    object.date = formatDate
                    object.timeType = item.keyMap
                    result.push(object)
                })

            } else {
                toast.error("Invalid Slected Time!")
                return;
            }
        }
        let res = await bulkCreateSchedule({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            date: formatDate

        })
        console.log('check ress : ', res)
        if (res && res.errorCode === 0) {
            toast.success("Create New Schedule Success!")

        }
    };
    render() {
        let { rangeTime } = this.state
        let { language } = this.props
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

        return (
            <div className='manage-schedule-container'>
                <div className='m-s-title'>
                    <FormattedMessage id="manage-schedule.title" />
                </div>
                <div className='container'>
                    <div className='row' >
                        <div className='col-6 form-group'>
                            <label> Choose doctor </label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChange}
                                options={this.state.listDoctor}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label> Choose Day </label>
                            <DatePicker
                                className="form-control"
                                onChange={this.handleChangeDetePicker}
                                minDate={yesterday}
                                value={this.state.currentDate}
                            />
                        </div>
                        <div className='col-12 pick-hour-container' >
                            {rangeTime && rangeTime.length > 0 &&
                                rangeTime.map((item, index) => {

                                    return (
                                        <button
                                            onClick={() => this.handleClickButtonTime(item)}
                                            className={item.isSelected === true ? 'btn btn-schedule active' : 'btn btn-schedule '} key={index} >
                                            {language === LANGUAGES.VI ? item.valueVI : item.valueEn
                                            } </button>
                                    )
                                }

                                )}
                        </div>
                        <div className='col-12'>
                            <button
                                onClick={() => this.handleSaveSchedule()}
                                className='btn btn-primary btn-save-schedule' >Save Info</button>
                        </div>
                    </div>
                </div>


            </div>
        );
    }
}

const mapStateToProps = state => {
    return {

        language: state.app.language,

        allDoctor: state.admin.allDoctor,
        dataTime: state.admin.dataTime

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
