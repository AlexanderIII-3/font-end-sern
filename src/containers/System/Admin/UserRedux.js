import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import './UserRedux.scss';
import * as actions from "../../../store/actions";
import TableManageUser from './TableManageUser';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { first } from 'lodash';
class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionsArr: [],
            roleArr: [],


            previewImgUrl: '',
            isOpen: false,


            userId: '',
            email: '',
            password: '',
            phoneNumber: '',
            gender: '',
            position: '',
            role: '',
            address: '',
            avatar: '',
            firstName: ' ',
            lastName: '',
            action: ''


        }

    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();

    }
    // MATCH STATE IN REDUX TO REACT
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.roleRedux != this.props.roleRedux) {
            let arrRoles = this.props.roleRedux
            this.setState({

                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : ''
            })
        }
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux

            this.setState({
                genderArr: this.props.genderRedux,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : ''

            })
        }
        if (prevProps.positonRedux !== this.props.positonRedux) {
            let arrPosition = this.props.positonRedux

            this.setState({
                positionsArr: arrPosition,
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : ''

            })
        }
        // reload data 
        if (prevProps.userRedux !== this.props.userRedux) {
            let arrRoles = this.props.roleRedux
            let arrPosition = this.props.positonRedux

            let arrGenders = this.props.genderRedux

            this.setState({
                email: '',
                password: '',
                phoneNumber: '',
                address: '',
                avatar: '',
                firstName: ' ',
                lastName: '',
                previewImgUrl: '',
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
                action: CRUD_ACTIONS.CREATE



            })
        }

    }
    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {

            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgUrl: objectUrl,
                avatar: base64
            })
        }

    }
    openPreviewImg = () => {
        if (!this.state.previewImgUrl) return;
        this.setState({
            isOpen: true
        })
    };
    handleSaveUser = () => {
        let isValid = this.checkValiDateInput();
        if (isValid === false) return;
        let { action } = this.state;

        if (action === CRUD_ACTIONS.CREATE) {
            this.props.getCreateUserStart({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
                address: this.state.address,
                gender: this.state.gender,
                roleId: this.state.role,
                phoneNumber: this.state.phoneNumber,
                positionId: this.state.position,
                avatar: this.state.avatar
            })
        }
        if (action === CRUD_ACTIONS.EDIT) {
            this.props.getEditUserStart({
                id: this.state.userId,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                address: this.state.address,
                gender: this.state.gender,
                roleId: this.state.role,
                phoneNumber: this.state.phoneNumber,
                positionId: this.state.position,
                avatar: this.state.avatar


            })
        }

    }
    checkValiDateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address',];
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('This missing required: ' + arrCheck[i] + '!');
                console.log(arrCheck[i])
                break
            }
        }
        return isValid;



    }
    onChangeInput = (event, id) => {

        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState,
        })
    }
    handleEditUserFromProps = (data) => {
        let imageBase64 = '';
        if (data.image) {
            const imageBuffer = Buffer.from(JSON.stringify(data.image))

            imageBase64 = new Buffer(data.image, 'base64').toString('binary')
        }

        this.setState({
            email: data.email,
            password: 'Hash code',
            phoneNumber: data.phoneNumber,
            address: data.address,
            avatar: '',
            previewImgUrl: imageBase64,
            firstName: data.firstName,
            lastName: data.lastName,
            position: data.positionId,
            gender: data.gender,
            role: data.roleId,
            userId: data.id,

            action: CRUD_ACTIONS.EDIT,



        })
    }
    render() {
        let isLoadingGender = this.props.isLoadingGender
        let genders = this.state.genderArr;
        let positions = this.state.positionsArr;
        let roles = this.state.roleArr;
        let language = this.props.language;
        let { email,
            password,
            phoneNumber,
            gender,
            position,
            role,
            address,
            avatar,
            firstName,
            lastName } = this.state;
        return (
            <div className='user-redux-container'>

                <div className="title" >{this.state.action === CRUD_ACTIONS.EDIT ? <FormattedMessage id="manage-user.update" /> : <FormattedMessage id="manage-user.add" />}       </div>
                <div>{isLoadingGender === true ? 'Loading genders' : ''}</div>
                <div className='user-redux-body'>

                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3' ></div>
                            <div className='col-6'>
                                <label >
                                    Email
                                </label>
                                <input
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                    value={email}
                                    onChange={(event) => { this.onChangeInput(event, 'email') }}
                                    className='form-control' type='email' />


                            </div>
                            <div className='col-6'>
                                <label >
                                    <FormattedMessage id="manage-user.password" />
                                </label>

                                <input
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}

                                    value={password}
                                    onChange={(event) => { this.onChangeInput(event, 'password') }}
                                    className='form-control' type='password' />

                            </div>
                            <div className='col-4'>
                                <label >
                                    <FormattedMessage id="manage-user.fname" />
                                </label>
                                <input
                                    value={firstName}
                                    onChange={(event) => { this.onChangeInput(event, 'firstName') }}
                                    className='form-control' type='text' />

                            </div>
                            <div className='col-4'>
                                <label >
                                    <FormattedMessage id="manage-user.lname" />
                                </label>
                                <input
                                    value={lastName}
                                    onChange={(event) => { this.onChangeInput(event, 'lastName') }}
                                    className='form-control' type='text' />

                            </div>
                            <div className='col-4'>
                                <label >
                                    <FormattedMessage id="manage-user.phoneN" />
                                </label>
                                <input
                                    value={phoneNumber}
                                    onChange={(event) => { this.onChangeInput(event, 'phoneNumber') }}
                                    className='form-control' type='text' />

                            </div>
                            <div className='col-9'>
                                <label >
                                    <FormattedMessage id="manage-user.address" />
                                </label>
                                <input
                                    value={address}
                                    onChange={(event) => { this.onChangeInput(event, 'address') }}
                                    className='form-control' type='text' />

                            </div>
                            <div className='col-3'>
                                <label >
                                    <FormattedMessage id="manage-user.gender" />
                                </label>
                                <select
                                    onChange={(event) => { this.onChangeInput(event, 'gender') }}
                                    class="form-control"
                                    value={gender}>
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) => {

                                            return (
                                                <option key={index} value={item.keyMap}> {language === LANGUAGES.VI ? item.valueVI : item.valueEn}</option>


                                            )



                                        })

                                    }

                                </select>
                            </div>
                            <div className='col-3'>
                                <label >
                                    <FormattedMessage id="manage-user.position" />
                                </label>
                                <select
                                    onChange={(event) => { this.onChangeInput(event, 'position') }}
                                    class="form-control"
                                    value={position}
                                >
                                    {positions && positions.length > 0 &&
                                        positions.map((item, index) => {

                                            return (
                                                <option key={index} value={item.keyMap}> {language === LANGUAGES.VI ? item.valueVI : item.valueEn}</option>


                                            )



                                        })

                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label >
                                    <FormattedMessage id="manage-user.roleId" />
                                </label>
                                <select

                                    onChange={(event) => { this.onChangeInput(event, 'role') }}
                                    class="form-control"
                                    value={role} >
                                    {roles && roles.length > 0 &&
                                        roles.map((item, index) => {
                                            {/* { console.log('check items', item.valueVI) } */ }

                                            {/* { console.log('check index', index) } */ }
                                            return (
                                                <option key={index} value={item.keyMap}> {language === LANGUAGES.VI ? item.valueVI : item.valueEn}</option>


                                            )



                                        })

                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label >
                                    <FormattedMessage id="manage-user.img" />
                                </label>
                                <div className='preview-img-container'>
                                    <input
                                        onChange={(event) => this.handleOnchangeImage(event)}

                                        id='previewImg' type='file' hidden />
                                    <label className='label-upload' htmlFor='previewImg'>Tải Ảnh <i className='fas fa-upload'></i></label>
                                    <div className='preview-image'

                                        style={{ backgroundImage: `url(${this.state.previewImgUrl})` }}
                                        onClick={() => this.openPreviewImg()} >  </div>
                                </div>

                            </div>
                            <div className='col-12 my-3' >
                                <button
                                    onClick={() => this.handleSaveUser()}
                                    className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn btn-primary'}>
                                    {this.state.action === CRUD_ACTIONS.EDIT ? <FormattedMessage id="manage-user.edit" /> :
                                        <FormattedMessage id="manage-user.save" />}</button>

                            </div>
                            <div className='col-12  mt-5'>
                                <TableManageUser
                                    handleEditUserFromProps={this.handleEditUserFromProps}
                                    action={this.state.action}
                                />

                            </div>

                        </div>
                    </div>

                </div>
                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgUrl}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }

            </div>




        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        positonRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        isLoadingGender: state.admin.isLoadingGender,
        userRedux: state.admin.userArr

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPostionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        getCreateUserStart: (data) => dispatch(actions.createUserStart(data)),
        getAllUserStart: () => dispatch(actions.fetchAllUserStart()),
        getEditUserStart: (data) => dispatch(actions.editUserStart(data)),
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
