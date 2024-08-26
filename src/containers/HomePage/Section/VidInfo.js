import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";



class VidInfo extends Component {

    render() {

        return (
            <div className='section-share section-vidinfo'>
                <div className='section-vidinfo-header'>
                    Truyền thông nói về gì Alex XanderIII!
                </div>
                <div className='section-vidinfo-content'>
                    <div className='content-left'>

                        <iframe width="100%" height="400px" src="https://www.youtube.com/embed/Kl2XtkZ2Vfs?list=RDKl2XtkZ2Vfs"
                            title="ALEX - Phong Cách | VIDEO MUSIC (FOR CHILL))"
                            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    </div>
                    <div className='content-right'>
                        <p> I'am Alex XanderIII!</p>
                    </div>

                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VidInfo);
