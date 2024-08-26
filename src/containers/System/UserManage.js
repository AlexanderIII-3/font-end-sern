import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createNewUserService, handleDeleteUserService, EditUserService } from '../../services/userService';
import ModalUser from './ModalUser';
import { emitter } from '../../utils/emitter';
import ModalEditUser from './ModalEditUser';
import ModalDetailUser from './ModalDetailUser';
class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userArr: [],
            isOpenModal: false,
            isOpenEditModal: false,
            isOpenModalDetail: false,
            userEdit: {},
            detailUser: {},
        };
    }

    async componentDidMount() {
        await this.handleGetAllUserFromReact()

    }
    handleGetAllUserFromReact = async () => {

        let respone = await getAllUsers("ALL");
        if (respone && respone.errorCode === 0) {
            this.setState({
                userArr: respone.users
            });
        }
    }

    // Modal
    handleAddNewUser = () => {
        this.setState({
            isOpenModal: true
        })

    }

    closeModal = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal
        })
    }
    closeEditModal = () => {
        this.setState({
            isOpenEditModal: !this.state.isOpenEditModal
        })
    }
    closeDetailModal = () => {
        this.setState({
            isOpenModalDetail: !this.state.isOpenModalDetail
        })
    }
    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data)
            if (response.user && response.user.errorCode !== 0) {
                alert(response.user.errorMess)
            } else {
                await this.handleGetAllUserFromReact();
                this.setState({
                    isOpenModal: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }

        } catch (error) {
            console.log(error)
        }
    }



    handleEditUser = async (user) => {
        console.log('check', user)
        try {
            this.setState({
                isOpenEditModal: !this.state.isOpenEditModal,
                userEdit: user

            });
        } catch (error) {

        }

    }
    doEditUser = async (user) => {

        let respone = await EditUserService(user);
        if (respone && respone.errorCode === 0) {
            await this.handleGetAllUserFromReact()
            this.setState({
                isOpenEditModal: !this.state.isOpenEditModal,

            });
        } else {
            alert(respone.errorMess)
        }
    };

    handleDelete = async (data) => {
        try {

            let res = await handleDeleteUserService(data)
            if (res && res.errorCode === 0) {
                await this.handleGetAllUserFromReact();


            } else {
                alert(res.errorMess)
            }



        } catch (error) {
            console.log(error)
        }


    }
    takeDetailUser = (user) => {
        console.log('check detail', user)
        try {
            this.setState({
                isOpenModalDetail: !this.state.isOpenModalDetail,
                detailUser: user

            });
        } catch (error) {

        }
    }

    /** Life cicle of react 
     * 1. Run the constructor -> init state
     * 2. Did mount (set state)
     * 3. render
     */

    render() {
        let arrUser = this.state.userArr
        return (

            <div className="users-container">
                <ModalUser
                    closeModal={this.closeModal}
                    isOpen={this.state.isOpenModal}
                    createNewUser={this.createNewUser}
                />
                {this.state.isOpenEditModal &&
                    < ModalEditUser
                        isOpen={this.state.isOpenEditModal}

                        closeModal={this.closeEditModal}
                        currentUser={this.state.userEdit}
                        handleEditUser={this.doEditUser}

                    />
                }
                <ModalDetailUser

                    isOpen={this.state.isOpenModalDetail}
                    closeModal={this.closeDetailModal}
                    detailUser={this.state.detailUser}
                />



                <div className="title text-center">Manage User from Alex</div>
                <div className='mx-4' >
                    <button
                        onClick={() => this.handleAddNewUser()}
                        className='btn btn-primary px-3'> <i className="far fa-plus"></i>Add New User</button> </div>
                <div className="users-table mt-3  mx-4">
                    <table id="customers">
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
                            {arrUser && arrUser.map((item, index) => {
                                return (

                                    <tr key={index.id}>
                                        <td>{item.id}</td>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.phoneNumber}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='btn-edit' onClick={() => { this.handleEditUser(item) }} ><i className='fas fa-pencil-alt'></i>
                                            </button>
                                            <button onClick={() => { this.handleDelete(item) }} className='btn-delete'><i className='fas fa-trash-alt' ></i></button>
                                            <button onClick={() => { this.takeDetailUser(item) }} className='btn-detail' >Detail</button>
                                        </td>
                                    </tr>


                                )
                            })
                            }


                        </tbody>
                    </table>

                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
