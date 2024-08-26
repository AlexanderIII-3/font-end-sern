import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import HomeHeader from '../../HomePage/HomeHeader';
import Home from '../../../routes/Home';
import './DetailDoctor.scss'
import { getDetailInforDoctor } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import DoctorSchedule from './DoctorSchedule';
import DoctorExtraInfor from './DoctorExtraInfor';
import LikeAndShare from '../SocialPlungin/LikeAndShare';
import Comment from '../SocialPlungin/Comment';
class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: [],
            currentDoctorId: -1
        };
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.detailDoctor && this.state.detailDoctor) {
            this.setState({ detailDoctor: this.state.detailDoctor });
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            this.setState({
                currentDoctorId: id
            })
            let res = await getDetailInforDoctor(id);
            if (res && res.errorCode === 0) {
                this.setState({
                    detailDoctor: res.data,
                })
            }
        }
    }
    render() {
        let { detailDoctor } = this.state
        let language = this.props.language
        let nameVi = '', nameEn = '';
        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
            nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;

        }
        let currentURL = +process.env.REACT_APP_IS_LOCALHOST === 1 ?
            'https://eric-restaurant-bot-tv.herokuapp.com' : window.location.href;
        return (
            < >
                <HomeHeader />

                <div className='doctor-detail-container'>
                    <div className='intro-doctor'>
                        <div className='content-left'
                            style={{ backgroundImage: `url(${detailDoctor && detailDoctor.image ? detailDoctor.image : ''})` }}>

                        </div>
                        <div className='content-right'>
                            <div className='up'>
                                {language === LANGUAGES.VI ? nameVi : nameEn}
                            </div>
                            <div className='down'>
                                {detailDoctor && detailDoctor.MarkDown && detailDoctor.MarkDown.description
                                    &&
                                    <span>{detailDoctor.MarkDown.description} </span>
                                }
                                <div className='like-share-plugin'>

                                    <LikeAndShare
                                        dataHref={currentURL}
                                    ></LikeAndShare>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='schedule-doctor'>
                        <div className='content-left'>
                            <DoctorSchedule
                                doctorId={this.state.currentDoctorId}
                            /> </div>
                        <div className='content-right'>
                            <DoctorExtraInfor
                                doctorId={this.state.currentDoctorId} />
                        </div>
                    </div>
                    <div className='detail-infor-doctor'>
                        {detailDoctor && detailDoctor.MarkDown && detailDoctor.MarkDown.contentHtml
                            //html to convert to  string
                            && <div dangerouslySetInnerHTML={{ __html: detailDoctor.MarkDown.contentHtml }}>

                            </div>
                        }
                    </div>
                    <div className='comment-doctor'>
                        <Comment
                            dataHref={currentURL}
                            width={'100%'}
                        ></Comment>
                    </div>
                </div>

            </>

        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        language: state.app.language,


    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
