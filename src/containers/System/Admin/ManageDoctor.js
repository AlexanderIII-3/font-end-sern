import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";

import './ManageDoctor.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';

import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import { getDetailInforDoctor } from '../../../services/userService';
import { Label } from 'reactstrap';

// const options = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' },
// ];

const mdParser = new MarkdownIt(/* Markdown-it options */);



class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //save to markdown table
            contentMarkDown: '',
            contentHtml: '',
            selectedDoctor: '',
            description: '',
            listDoctor: [],
            checkData: false,

            //save infor doctor_infor
            listPrice: [],
            listPayment: [],
            listProvinces: [],
            listClinic: [],
            listSpecialty: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            nameClinic: '',
            addressClinic: '',
            selectedClinic: '',
            selectedSpecialty: '',
            note: '',
            clinicId: '',
            specialtyId: '',

        };
        // this.listenEmitter();

    }


    componentDidMount() {
        this.props.fetchAllDoctor();
        this.props.getRequiredDoctorInfor()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        let dataSelect = this.buildDataInputSelect(this.props.allDoctor, "USER")
        if (prevProps.allDoctor !== this.props.allDoctor) {
            this.setState({
                listDoctor: dataSelect
            })
        }

        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
            let { resPrice, resPayment, resProvince, resSpecialty, resClinic } = this.props.allRequiredDoctorInfor
            let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE")
            let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT")
            let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY')
            let dataSelectProvinces = this.buildDataInputSelect(resProvince, "PROVINCE");
            let dataSelectClinic = this.buildDataInputSelect(resClinic, 'CLINIC');
            this.setState({

                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvinces: dataSelectProvinces,
                listSpecialty: dataSelectSpecialty,
                listClinic: dataSelectClinic
            });
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctor, "USER")
            let { resPrice, resPayment, resProvince } = this.props.allRequiredDoctorInfor

            let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE")
            let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT")
            let dataSelectProvinces = this.buildDataInputSelect(resProvince, "PROVINCE")
            if (prevProps.allDoctor !== this.props.allDoctor) {
                this.setState({
                    listDoctor: dataSelect,
                    listPrice: dataSelectPrice,
                    listPayment: dataSelectPayment,
                    listProvinces: dataSelectProvinces,
                })
            }
        }
    }

    handleEditorChange = ({ html, text }) => {
        console.log('handleEditorChange', html, text);
        this.setState({
            contentMarkDown: text,
            contentHtml: html
        })
    }
    handleSaveContent = () => {
        let { checkData } = this.state;
        this.props.saveInforDoctor({
            // save detail doctor
            contentHtml: this.state.contentHtml,
            contentMarkDown: this.state.contentMarkDown,
            description: this.state.description,
            id: this.state.selectedDoctor.value,

            action: checkData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            //save infor doctor
            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
            clinicId: this.state.selectedClinic.value,
            specialtyId: this.state.selectedSpecialty.value
        })


    }
    handleChange = async selectedDoctor => {
        this.setState({ selectedDoctor });
        let res = await getDetailInforDoctor(selectedDoctor.value)
        if (res && res.errorCode === 0 && res.data && res.data.MarkDown) {
            let markDown = res.data.MarkDown;
            let addressClinic = '', nameClinic = '', note = '',
                priceId = '', paymentId = '', provinceId = '', specialtyId = '',
                selectedPrice = '', selectedPayment = '', selectedProvince = '', selectedSpecialty = '', clinicId = '', selectedClinic = ''



            if (res.data.Doctor_Infor) {
                let doctorInfor = res.data.Doctor_Infor
                addressClinic = doctorInfor.addressClinic;
                nameClinic = doctorInfor.nameClinic;
                note = doctorInfor.note;
                paymentId = doctorInfor.paymentId;
                priceId = doctorInfor.priceId;
                provinceId = doctorInfor.provinceId;
                specialtyId = doctorInfor.specialtyId;
                clinicId = doctorInfor.clinicId;
                selectedPayment = this.state.listPayment.find(item => {
                    return item && item.value === paymentId
                })

                selectedPrice = this.state.listPrice.find(item => {
                    return item && item.value === priceId
                })
                selectedProvince = this.state.listProvinces.find(item => {
                    return item && item.value === provinceId
                })
                selectedSpecialty = this.state.listSpecialty.find(item => {
                    return item && item.value === specialtyId
                })
                selectedClinic = this.state.listClinic.find(item => {
                    return item && item.value === clinicId
                })



            }

            this.setState({
                contentHtml: markDown.contentHtml,
                contentMarkDown: markDown.contenMarkdown,
                description: markDown.description,
                checkData: true,
                // doctor infor

                nameClinic: nameClinic,
                addressClinic: addressClinic,
                note: note,
                selectedPrice: selectedPrice,
                selectedPayment: selectedPayment,
                selectedProvince: selectedProvince,
                selectedSpecialty: selectedSpecialty,
                selectedClinic: selectedClinic

            });

        } else {
            this.setState({
                contentHtml: '',
                contentMarkDown: '',
                description: '',
                checkData: false,
                nameClinic: '',
                addressClinic: '',
                note: '',
                selectedPrice: '',
                selectedPayment: '',
                selectedProvince: '',
                selectedSpecialty: '',
                selectedClinic: '',
            });
        }
    };
    handleChangeSlectDoctorInfor = async (selectedOption, name) => {
        let stateName = name.name;
        let copyState = { ...this.state };
        copyState[stateName] = selectedOption;
        this.setState({
            ...copyState,
        });

    }
    handleChangeText = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        }, () => {
            console.log('check copy state', this.state)
        })
    };
    buildDataInputSelect = (inputData, type) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            if (type === "USER") {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.lastName} ${item.firstName}`;
                    let labelEn = `${item.firstName} ${item.lastName}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object)
                })
            }
            if (type === "PRICE") {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVI} vnđ`;
                    let labelEn = `${item.valueEn} USD`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object)
                })
            }
            if (type === "PAYMENT") {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = item.valueVI;
                    let labelEn = item.valueEn;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object)
                })
            }
            if (type === "PROVINCE") {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = item.valueVI;
                    let labelEn = item.valueEn;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object)
                })
            }
            if (type === 'SPECIALTY') {
                inputData.map((item, index) => {
                    let object = {};

                    object.label = item.name;
                    object.value = item.id;
                    result.push(object)
                })
            }
            if (type === 'CLINIC') {
                inputData.map((item, index) => {
                    let object = {};

                    object.label = item.name;
                    object.value = item.id;
                    result.push(object)
                })
            }

            return result
        }
    };

    render() {
        console.log('check laex state', this.state)
        let { listSpecialty } = this.state;
        return (
            <div className='manage-doctor-container'>



                <div className="manage-doctor-title"  ><FormattedMessage id="admin.title" /></div>


                <div className='more-infor'>
                    <div className='content-left form-group'>

                        <label className=''><FormattedMessage id="admin.choose-doctor" /></label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChange}
                            options={this.state.listDoctor}
                            placeholder={'Choose a doctor'}
                        />

                    </div>
                    <div className='content-right'>
                        <label><FormattedMessage id="admin.intro-infor" /></label>
                        <textarea
                            onChange={(event) => this.handleChangeText(event, 'description')}
                            className='form-control'

                            value={this.state.description}
                        >

                        </textarea>
                    </div>



                </div>
                <div className='more-infor-extra row'>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.choose-price" /></label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSlectDoctorInfor}
                            options={this.state.listPrice}
                            placeholder={'Choose Price'}
                            name='selectedPrice'
                        />


                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.choose-payment" /></label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSlectDoctorInfor}
                            options={this.state.listPayment}
                            placeholder={'Choose method payment'}
                            name='selectedPayment'
                        />

                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.choose-village" /></label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSlectDoctorInfor}
                            options={this.state.listProvinces}
                            placeholder={'Choose province'}
                            name='selectedProvince'
                        />


                    </div>


                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.choose-clinic" /></label>
                        <input
                            onChange={(event) => this.handleChangeText(event, 'nameClinic')}
                            value={this.state.nameClinic}

                            className='form-control'></input>

                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.choose-clinic-address" /></label>
                        <input
                            onChange={(event) => this.handleChangeText(event, 'addressClinic')}
                            value={this.state.addressClinic}
                            className='form-control'></input>
                    </div>
                    <div className='col-4 form-group'>
                        <label> <FormattedMessage id="admin.note" /></label>
                        <input
                            onChange={(event) => this.handleChangeText(event, 'note')}
                            value={this.state.note}
                            className='form-control'></input>

                    </div>

                </div>



                <div className='row'>
                    <div className='col-4 form-group'>
                        <label>Chọn Chuyên Khoa</label>
                        <Select
                            value={this.state.selectedSpecialty}
                            onChange={this.handleChangeSlectDoctorInfor}
                            options={this.state.listSpecialty}
                            name='selectedSpecialty'
                            placeholder={'Choose a specialty'}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Chọn Phòng Khám</label>
                        <Select
                            value={this.state.selectedClinic}
                            onChange={this.handleChangeSlectDoctorInfor}
                            options={this.state.listClinic}
                            name='selectedClinic'
                            placeholder={'Choose a specialty'}
                        />                    </div>
                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkDown}


                    />
                </div>

                <button
                    onClick={() => this.handleSaveContent()}
                    className={this.state.checkData === true ? 'save-content-doctor' : 'create-content-doctor'}>
                    {this.state.checkData === true ?
                        <FormattedMessage id="admin.add" />
                        :
                        <FormattedMessage id="admin.save" />}</button>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,

        allDoctor: state.admin.allDoctor,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        saveInforDoctor: (data) => dispatch(actions.saveInforDoctor(data)),
        getRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
