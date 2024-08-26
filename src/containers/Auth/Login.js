import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHippo, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { connect } from 'react-redux';
import { push } from "connected-react-router";
// import * as actions from "../store/actions";
import * as actions from "../../store/actions";
// import '@fortawesome/fontawesome-free/css/all.min.css';
import './Login.scss';
import { FormattedMessage } from 'react-intl';
// import { handleLoginApi } from '../../services/userService';
import { handleLoginApi } from '../../services/userService';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            passWord: '',
            iShowPassword: false,
            errorMess: ''
        };
    }

    handleOnChangeUserName = (event) => {
        this.setState({ userName: event.target.value });
        console.log(event.target.value);
    };
    handleOnChangePassword = (event) => {
        this.setState({ passWord: event.target.value });
        console.log(event.target.value);
    };
    handleLogin = async () => {
        this.setState({
            errorMess: ''
        })

        try {
            let data = await handleLoginApi(this.state.userName, this.state.passWord)
            if (data && data.errorCode !== 0) {
                this.setState({
                    errorMess: data.errorMess


                })

            }
            if (data && data.errorCode === 0) {
                this.props.userLoginSuccess(data)
                console.log('login success!')
            }
        } catch (error) {
            if (error.response) {
                console.log('alex', error.response)

                if (error.response.data) {
                    this.setState({
                        errorMess: error.response.data.errorMess
                    })
                }
            }
        }
    }
    handleShowHidePassword = () => {
        this.setState({
            iShowPassword: !this.state.iShowPassword
        })
    };
    handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.keyCode === 13) {
            this.handleLogin()
        }
    }
    render() {
        //JSX

        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content'>
                        <div className='col-12  text-login' >LOGIN</div>
                        <div className='col-12 form-group login-input'>
                            <label>UserName</label>
                            <input type='text ' className='form-control' placeholder='Enter your userName'
                                onChange={(event) => this.handleOnChangeUserName(event)} value={this.state.userName}

                                onKeyDown={(event) => this.handleKeyDown(event)}

                            ></input>
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password</label>
                            <div className='custom-input-password'>
                                <input type={this.state.iShowPassword ? 'text' : 'password'}
                                    onChange={(event) => this.handleOnChangePassword(event)}
                                    value={this.state.passWord} className='form-control' placeholder='Enter your password'
                                    onKeyDown={(event) => this.handleKeyDown(event)}
                                ></input>

                                <span onClick={() => this.handleShowHidePassword()}>
                                    {this.state.iShowPassword ? <i class="fas fa-eye-slash eie" ></i> : <i className="fas fa-eye eie"></i>}
                                    {/* <i className="fas fa-eye eie"></i> */}
                                </span>

                            </div>

                        </div>
                        <div className='col-12' style={{ color: 'red' }}>
                            {this.state.errorMess}
                        </div>
                        <div className='col-12'>
                            <button onClick={() => this.handleLogin()} className='btn-login'>Login</button>
                        </div>


                        <div className='col-12 forgot-password'>
                            <span>Forgot your password?</span>
                        </div>
                        <div className='col-12 text-center'>
                            <span >Or Login with:</span>
                        </div>
                        <div className='col-12 social-login'>
                            <i className="fab fa-google-plus google"></i>
                            <i className="fab fa-facebook facebook"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
