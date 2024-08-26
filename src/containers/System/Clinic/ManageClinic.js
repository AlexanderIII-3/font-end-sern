import './ManageClinic.scss';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import Lightbox from 'react-image-lightbox';

import 'react-image-lightbox/style.css';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';

import { CRUD_ACTIONS, LANGUAGES, CommonUtils } from '../../../utils';
import { toast } from 'react-toastify';
import { createNewClinic } from '../../../services/userService';

import ListClinic from './ListClinic';
const mdParser = new MarkdownIt(/* Markdown-it options */);



class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previewImgUrl: '',
            image: '',
            isOpen: false,
            name: '',
            descriptionHtml: '',
            descriptionMarkDown: '',
            id: '',
            action: CRUD_ACTIONS.CREATE,
            isOpenList: false,

        };
        // this.listenEmitter();

    }


    async componentDidMount() {
    }
    componentDidUpdate(prevProps, prevState, snapshot) {


    }
    handleOnchangeImage = async (event) => {
        console.log('check image', event.target)
        let data = event.target.files;
        let file = data[0];
        if (file) {

            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgUrl: objectUrl,
                image: base64,
            })
        }

    }
    handleOnchange = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState,

        }, () => { console.log('name', this.state) })
    };
    openPreviewImg = () => {
        if (!this.state.previewImgUrl) return;
        this.setState({
            isOpen: true
        })
    };

    handleEditorChange = ({ html, text }) => {
        console.log('handleEditorChange', html, text);
        this.setState({
            descriptionMarkDown: text,
            descriptionHtml: html
        })
    }
    handleCreateNewClinic = async () => {

        if (this.state.action === CRUD_ACTIONS.CREATE) {
            let data = await createNewClinic({
                name: this.state.name,
                address: this.state.address,
                descriptionHtml: this.state.descriptionHtml,
                descriptionMarkDown: this.state.descriptionMarkDown,
                image: this.state.image,
                action: CRUD_ACTIONS.CREATE

            })
            if (data && data.errorCode === 0) {
                toast.success('Create New Clinic Success!')
                this.setState({
                    name: '',
                    address: '',
                    descriptionHtml: '',
                    descriptionMarkDown: '',
                    image: '',
                    previewImgUrl: '',
                    action: CRUD_ACTIONS.CREATE

                })
            } else {
                toast.error('Create New Clinic faled!')

            }
        }
        if (this.state.action === CRUD_ACTIONS.EDIT) {
            let data = await createNewClinic({
                name: this.state.name,
                address: this.state.address,
                descriptionHtml: this.state.descriptionHtml,
                descriptionMarkDown: this.state.descriptionMarkDown,
                image: this.state.image,
                action: CRUD_ACTIONS.EDIT
            })
            if (data && data.errorCode === 0) {
                toast.success('Edit Clinic Success!')
                this.setState({
                    name: '',
                    address: '',
                    descriptionHtml: '',
                    descriptionMarkDown: '',
                    image: '',
                    previewImgUrl: '',
                    action: CRUD_ACTIONS.CREATE

                })
            } else {
                toast.error('Edit  Clinic faled!')

            }
        }

    }
    handleEditUserFromProps = (data) => {
        console.log('check ddata', data)
        if (data) {
            this.setState({
                id: data.id,
                name: data.name,
                descriptionMarkDown: data.descriptionMarkDown,
                previewImgUrl: data.image,
                image: data.image,
                action: CRUD_ACTIONS.EDIT,
                address: data.address,
                descriptionHtml: data.descriptionHtml,

            })
        }

    };
    showList = (stus) => {
        this.setState({
            isOpenList: stus
        })
    };

    render() {
        console.log('check image ', this.props.specialtyArr);
        return (
            <div className='manage-specialty-container'>
                <div className='specialty-title'>
                    <FormattedMessage id="menu.clinic.title-clinic" />
                </div>
                <div className='add-new-specialty row'>
                    <div className='col-6 form-group'>
                        <label>Name Specialty </label>
                        <input
                            value={this.state.name}
                            onChange={(event) => this.handleOnchange(event, 'name')}
                            className='form-control' type='text'></input>
                    </div>
                    <div className='col-6 form-group'>
                        <label>Image Specialty </label>

                        <div className='preview-img-container'>
                            <input
                                onChange={(event) => this.handleOnchangeImage(event)}
                                id='previewImg' type='file' hidden />
                            <label className='label-upload' htmlFor='previewImg'>
                                Tải Ảnh <i className='fas fa-upload'></i>
                            </label>
                            <div className='preview-image'

                                style={{ backgroundImage: `url(${this.state.previewImgUrl})` }}
                                onClick={() => this.openPreviewImg()} >  </div>
                        </div>
                    </div>
                    <div className='col-6 form-group'>
                        <label>Address Clinic </label>
                        <input
                            value={this.state.address}
                            onChange={(event) => this.handleOnchange(event, 'address')}
                            className='form-control' type='text'>

                        </input>
                    </div>
                    <div className='manage-specialty-editor col-12'>
                        <MdEditor style={{ height: '300px' }} renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkDown}


                        />
                    </div>
                    <div className='col-12 my-4' >
                        <button
                            onClick={() => this.handleCreateNewClinic()}
                            className='btn-save-specialty'
                        >
                            {this.state.action === CRUD_ACTIONS.CREATE ? <FormattedMessage id="manage-user.save" /> : <FormattedMessage id="manage-user.edit" />}

                        </button>

                    </div>

                    <div className='col-12 my-6'>
                        {this.state.isOpenList === false &&
                            <button
                                className='btn-save-specialty'
                                onClick={() => this.showList(true)}>Show List Clinic</button>
                        }
                    </div>
                </div>

                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgUrl}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
                {this.state.isOpenList === true && <ListClinic
                    showList={this.showList}

                    handleEditUserFromProps={this.handleEditUserFromProps}

                />}

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        specialtyArr: state.admin.specialtyArr

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getRequiredSpecialtyInfor: () => dispatch(actions.getRequiredSpecialtyInfor())

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
