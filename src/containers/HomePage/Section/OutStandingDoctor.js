import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import Slider from "react-slick";
import *as actions from '../../../store/actions'
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';


class OutStandingDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctor: []
        };
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorRedux !== this.props.topDoctorRedux) {
            this.setState({
                arrDoctor: this.props.topDoctorRedux
            })
        }
    }
    componentDidMount() {
        this.props.loadTopDoctors();
    }
    handleViewDetailDoctor = (doctor) => {
        if (this.props.history) {
            this.props.history.push(`/detail-doctor/${doctor.id}`);

        }
    };
    render() {
        let language = this.props.language
        console.log('check prop doctor', this.props.topDoctorRedux)
        let arrDoctor = this.state.arrDoctor;
        return (
            <div className='section-share  section-outstanding-doctor' >
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'> {language === LANGUAGES.VI ? <FormattedMessage id="home-page.outstanding-Doctor" /> :
                            <FormattedMessage id="home-page.Outstanding-Doctor" />
                        }</span>
                        <button className='btn-section'>{language === LANGUAGES.VI ? <FormattedMessage id="home-page.more-Info" /> :
                            <FormattedMessage id="home-page.More-Info" />
                        }  </button>

                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.setting}>

                            {arrDoctor && arrDoctor.length > 0 &&
                                arrDoctor.map((item, index) => {
                                    if (index === 0) {
                                        console.log(item)
                                    }
                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary')
                                    }
                                    let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                                    let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                                    return (
                                        <div key={index} className='section-customize'
                                            onClick={() => this.handleViewDetailDoctor(item)}>
                                            <div className='boder-customize'>
                                                <div className='outer-bg'>

                                                    <div className='bg-imge  section-outstanding-doctor'
                                                        style={{ backgroundImage: `url(${imageBase64})` }}
                                                    />




                                                </div>
                                                <div className=' position text-center' >

                                                    <div> {language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                                    <div> Nội khoa y học </div>
                                                </div>
                                            </div>

                                        </div>
                                    )
                                })}
                        </Slider>
                    </div>

                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,

        isLoggedIn: state.user.isLoggedIn,
        topDoctorRedux: state.admin.topDoctor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctor())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
