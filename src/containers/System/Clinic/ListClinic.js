import React, { Component } from 'react';
import './LisClinic.scss';

import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import { emitter } from '../../../utils/emitter';

import { Alert } from 'reactstrap';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { handleDeleteClinic } from '../../../services/userService';
// import style manually






class ListClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {

            listClinic: [],
        };
        // this.listenEmitter();

    }


    async componentDidMount() {
        this.props.getRequiredClinicInfor();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.clinicArr !== prevProps.clinicArr) {
            this.setState({
                listClinic: this.props.clinicArr
            })
        }
    }
    handleDelete = async (item) => {
        console.log('check iemt', item)
        await handleDeleteClinic(item)
    }


    handleEditSpecialty = (data) => {
        console.log(data)
        this.props.handleEditUserFromProps(data)
    }

    render() {
        console.log('check clin arr', this.props.clinicArr);
        let { listClinic } = this.state;
        return (
            <React.Fragment>



                <div className="users-table mt-3  mx-4 mb-5"  >
                    <table id="TableManageUser">
                        <tbody>
                            <tr>
                                <th>#</th>
                                <th>Ten</th>
                                <th>Dia CHi</th>
                                <th>Action</th>

                            </tr>
                            {listClinic && listClinic.map((item, index) => {
                                return (
                                    <tr key={index.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.address}</td>
                                        <td>  <button className='btn-edit' onClick={() => { this.handleEditSpecialty(item) }} ><i className='fas fa-pencil-alt'></i>
                                        </button>
                                            <button onClick={() => { this.handleDelete(item) }} className='btn-delete'><i className='fas fa-trash-alt' ></i>
                                            </button>


                                        </td>
                                    </tr>)
                            })
                            }
                            <div>

                                <button
                                    className='btn-hidden'

                                    onClick={() => this.props.showList(false)}
                                >Hide List</button>
                            </div>










                        </tbody>
                    </table>


                </div>



            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        clinicArr: state.admin.clinicArr
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getRequiredClinicInfor: () => dispatch(actions.getRequiredClinicInfor())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListClinic);
