import './DoctorExtraInfor.scss'
import React, { Component } from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { getMoreInforDoctor } from '../../../services/userService'
import NumberFormat from 'react-number-format';
class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowMoreInfor: false,
            doctorInfor: {}
        };
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.doctorId !== this.props.doctorId) {
            let res = await getMoreInforDoctor(this.props.doctorId)
            if (res && res.errorCode === 0) {
                this.setState({
                    doctorInfor: res.data
                })
            }

        }

    }
    async componentDidMount() {
        let res = await getMoreInforDoctor(this.props.doctorId)
        this.setState({
            doctorInfor: res.data
        })

    }
    showHideDetailInfor = (status) => {
        this.setState({
            isShowMoreInfor: status
        })
    }

    render() {
        let { isShowMoreInfor, doctorInfor } = this.state
        let { language } = this.props
        return (
            <div className='doctor-infor-container'>
                <div className='content-up'>
                    <div className='text-address'><FormattedMessage id="patient.extra-infor-doctor.text-address" /></div>
                    <div className='name-clinic'>
                        {doctorInfor && doctorInfor.nameClinic ? doctorInfor.nameClinic : ''}
                    </div>
                    <div className='address-clinic'>{doctorInfor && doctorInfor.addressClinic ? doctorInfor.addressClinic : ''}</div>



                </div>
                <hr></hr>

                <div className='content-down'>

                    {isShowMoreInfor === false &&
                        <div className='short-infor' >
                            <FormattedMessage id="patient.extra-infor-doctor.price" />:
                            {doctorInfor && doctorInfor.priceTypeData && language === LANGUAGES.VI
                                &&
                                <NumberFormat
                                    value={doctorInfor.priceTypeData.valueVi}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'VND'} />
                            }
                            {doctorInfor && doctorInfor.priceTypeData && language === LANGUAGES.EN
                                &&
                                <NumberFormat
                                    className='currency'
                                    value={doctorInfor.priceTypeData.valueEn}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'$'} />
                            }
                            <span className='detail'
                                onClick={() => this.showHideDetailInfor(true)}>  <FormattedMessage id="patient.extra-infor-doctor.detail" />

                            </span>
                        </div>}
                    {isShowMoreInfor === true &&
                        <>
                            <div className='title-price'><FormattedMessage id="patient.extra-infor-doctor.price" /> </div>
                            <div className='table-price'>
                                <div className='price'>
                                    <span className='left'><FormattedMessage id="patient.extra-infor-doctor.price" /></span>
                                    <span className='right'>
                                        {doctorInfor && doctorInfor.priceTypeData && language === LANGUAGES.VI
                                            &&
                                            <NumberFormat
                                                value={doctorInfor.priceTypeData.valueVi}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'VND'} />
                                        }
                                        {doctorInfor && doctorInfor.priceTypeData && language === LANGUAGES.EN
                                            &&
                                            <NumberFormat
                                                className='currency'
                                                value={doctorInfor.priceTypeData.valueEn}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'$'} />
                                        }
                                    </span>
                                </div>
                                <div className='note'>
                                    {doctorInfor && doctorInfor.note ? doctorInfor.note : ''}
                                </div>
                            </div>
                            <div className='payment'>
                                <FormattedMessage id="patient.extra-infor-doctor.payment" />
                                {doctorInfor && doctorInfor.paymentTypeData && language === LANGUAGES.VI ?

                                    doctorInfor.paymentTypeData.valueVi : ''}
                                {doctorInfor && doctorInfor.paymentTypeData && language === LANGUAGES.EN ?

                                    doctorInfor.paymentTypeData.valueEn : ''}

                            </div>
                            <div className='hide-price' >
                                <span onClick={() => this.showHideDetailInfor(false)}><FormattedMessage id="patient.extra-infor-doctor.hide-detail" /></span>
                            </div>
                        </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
