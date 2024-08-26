import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Slider from "react-slick";
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';

import * as actions from "../../../store/actions";

class MedicalFacility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrClinic: []
        };
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.clinicArr !== this.props.clinicArr) {
            this.setState({
                arrClinic: this.props.clinicArr
            })
        }
    }
    async componentDidMount() {
        let res = await this.props.getRequiredClinicInfor();
        if (res && res.errorCode === 0) {
            this.setState({
                arrClinic: res.data ? res.data : []
            })
        }
    }
    handleViewDetailClinic = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${item.id}`);

        }
        console.log('check item clinic', item)
    };
    render() {

        let { arrClinic } = this.state;
        let language = this.props.language
        return (
            <div className='section-share  section-medical-facility'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'> {language === LANGUAGES.VI ? <FormattedMessage id="home-page.medical" />
                            : <FormattedMessage id="home-page.medical" />}</span>
                        <button className='btn-section'> {language === LANGUAGES.VI ? <FormattedMessage id="home-page.more-Info" /> :
                            <FormattedMessage id="home-page.More-Info" />} </button>

                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.setting}>
                            {arrClinic && arrClinic.length > 0 &&

                                arrClinic.map((item, index) => {

                                    if (index === 0) {
                                        console.log(item)
                                    }
                                    let image = item.image;
                                    return (
                                        <div key={index} className='section-customize clinic-child'
                                            onClick={() => this.handleViewDetailClinic(item)}
                                        >

                                            <div className='bg-imge section-medical-facility'
                                                style={{ backgroundImage: `url(${image})` }}
                                            />

                                            <div className='clinic-name'>  {item.name}</div>
                                        </div>
                                    )
                                })


                            }

                        </Slider>
                    </div>

                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        clinicArr: state.admin.clinicArr


    };
};

const mapDispatchToProps = dispatch => {
    return {
        getRequiredClinicInfor: () => dispatch(actions.getRequiredClinicInfor())

    };

};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
