import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import Lightbox from 'react-image-lightbox';

import 'react-image-lightbox/style.css';

import './ManageSpecity.scss';
import MarkdownIt from 'markdown-it';
import { saveSpecialtyInfor } from '../../../services/userService';
import MdEditor from 'react-markdown-editor-lite';

import { CRUD_ACTIONS, LANGUAGES, CommonUtils } from '../../../utils';
import { toast } from 'react-toastify';
import ListSpecialty from './ListSpecialty';


const mdParser = new MarkdownIt(/* Markdown-it options */);



class ManageSpecity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previewImgUrl: '',
            image: '',
            isOpen: false,
            name: '',
            address: '',
            descriptionHtml: '',
            descriptionMarkDown: '',
            id: '',
            action: CRUD_ACTIONS.CREATE,

        };
        // this.listenEmitter();

    }


    async componentDidMount() {
        this.props.getRequiredSpecialtyInfor();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.specialtyArr !== this.props.specialtyArr) {
            this.setState({
                previewImgUrl: '',
                image: '',
                isOpen: false,
                action: CRUD_ACTIONS.CREATE,
                nameDes: '',
                description: '',

            })
        }

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

        }, () => { console.log('check state clinic', this.state) })
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
    handleEditUserFromProps = (data) => {
        if (data) {
            this.setState({
                id: data.id,
                name: data.name,
                descriptionMarkDown: data.descriptionMarkDown,
                previewImgUrl: data.image,
                image: data.image,
                action: CRUD_ACTIONS.EDIT,
                descriptionHtml: data.descriptionHtml,

            })
        }

    }
    render() {
        console.log('check image ', this.props.specialtyArr);
        return (
            <div className='manage-specialty-container'>
                <div className='specialty-title'>
                    <FormattedMessage id="menu.specialty.title-specialty" />
                </div>
                <div className='add-new-specialty row'>
                    <div className='col-6 form-group'>
                        <label>Name Clinic </label>
                        <input
                            value={this.state.name}
                            onChange={(event) => this.handleOnchange(event, 'name')}
                            className='form-control' type='text'>

                        </input>
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



                    <div className='manage-specialty-editor col-12'>
                        <MdEditor style={{ height: '300px' }} renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkDown}


                        />
                    </div>
                    <div className='col-12 my-4' >
                        <button

                            onClick={() => this.handleSaveNewSpecialty()}
                            className='btn-save-specialty'
                        >
                            {this.state.action === CRUD_ACTIONS.CREATE ? <FormattedMessage id="manage-user.save" /> : <FormattedMessage id="manage-user.edit" />}

                        </button>

                    </div>
                </div>

                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgUrl}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
                <ListSpecialty
                    handleEditUserFromProps={this.handleEditUserFromProps}
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecity);
