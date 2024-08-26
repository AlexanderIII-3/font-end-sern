import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import { emitter } from '../../../utils/emitter';

import { Alert } from 'reactstrap';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { handleDeleteSpecialy } from '../../../services/userService';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import { toast } from 'react-toastify';






class TableManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userArr: [],
            isOpen: false,
            id: '',
            listSpecialty: [],
        };
        // this.listenEmitter();

    }


    componentDidMount() {
        this.props.getRequiredSpecialtyInfor()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.specialtyArr !== prevProps.specialtyArr) {
            this.setState({
                listSpecialty: this.props.specialtyArr
            })
        }
    }
    handleDelete = async (item) => {
        console.log('check iemt', item)
        let data = await handleDeleteSpecialy(item.id)
        if (data && data.errorCode === 0) {
            toast.success('Delete Specialty Successful!')
        } else {
            toast.fail('Delete Specialty Failed!')

        }

    }


    handleEditClinic = (data) => {
        console.log(data)
        this.props.handleEditUserFromProps(data)
    }

    render() {
        let { listSpecialty } = this.state;
        return (
            <React.Fragment>



                <div className="users-table mt-3  mx-4 mb-5"  >
                    <table id="TableManageUser">
                        <tbody>
                            <tr>
                                <th>#</th>
                                <th>Ten</th>

                                <th>Action</th>

                            </tr>
                            {listSpecialty && listSpecialty.map((item, index) => {
                                return (
                                    <tr key={index.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>  <button className='btn-edit' onClick={() => { this.handleEditClinic(item) }} ><i className='fas fa-pencil-alt'></i>
                                        </button>
                                            <button onClick={() => { this.handleDelete(item) }} className='btn-delete'><i className='fas fa-trash-alt' ></i>
                                            </button>


                                        </td>
                                    </tr>)
                            })
                            }










                        </tbody>
                    </table>


                </div>



            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        specialtyArr: state.admin.specialtyArr
    };
};

const mapDispatchToProps = dispatch => {
    return {

        getRequiredSpecialtyInfor: () => dispatch(actions.getRequiredSpecialtyInfor())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
