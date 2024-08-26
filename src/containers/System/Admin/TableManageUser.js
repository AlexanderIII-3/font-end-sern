import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import { emitter } from '../../../utils/emitter';

import './tableManageUser.scss';
import { Alert } from 'reactstrap';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import DetailDoctor from './DetailDoctor'


// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}

class TableManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userArr: [],
            isOpen: false,
            id: '',
        };
        // this.listenEmitter();

    }


    componentDidMount() {
        this.props.getAllUserStart();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.userRedux !== this.props.userRedux) {
            this.setState({
                userArr: this.props.userRedux
            })
        }
    }
    handleDelete = (user) => {
        this.props.handleDeleteUserStart(user.id)
    }


    handleEditUser = (user) => {
        this.props.handleEditUserFromProps(user)
    }
    handleDetail = (user) => {

        this.setState({
            isOpen: true,
        })
        this.props.detailUserStart(user.id)
    }
    render() {
        let userArr = this.state.userArr
        let isOpen = this.state.isOpen
        return (
            <React.Fragment>



                <div className="users-table mt-3  mx-4 mb-5"  >
                    <table id="TableManageUser">
                        <tbody>
                            <tr>
                                <th>#</th>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Phone Number</th>
                                <th>Address</th>
                                <th>Active</th>
                            </tr>

                            {userArr && userArr.map((item, index) => {
                                return (
                                    <tr key={index.id}>
                                        <td>{item.id}</td>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.phoneNumber}</td>
                                        <td>{item.address}</td>
                                        <td>  <button className='btn-edit' onClick={() => { this.handleEditUser(item) }} ><i className='fas fa-pencil-alt'></i>
                                        </button>
                                            <button onClick={() => { this.handleDelete(item) }} className='btn-delete'><i className='fas fa-trash-alt' ></i>
                                            </button>
                                            <button onClick={() => { this.handleDetail(item) }}
                                                className='btn-detail'>

                                                <i className='fas fa-address-card'></i>


                                            </button>

                                        </td>
                                    </tr>)
                            })
                            }







                        </tbody>
                    </table>
                    {/* <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} /> */}


                </div>

                {isOpen === true && <DetailDoctor />}


            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        userRedux: state.admin.userArr
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllUserStart: () => dispatch(actions.fetchAllUserStart()),
        handleDeleteUserStart: (id) => dispatch(actions.deleteUserStart(id)),
        detailUserStart: (id) => dispatch(actions.detailUserStart(id))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
