import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
import _ from 'lodash'
class ModalEditUser extends Component {
    constructor(props) {

        super(props);
        this.state = {
            id: '',
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            address: '',
            phoneNumber: '',
        };
        this.listenEmitter();
    }
    listenEmitter = (data) => {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: '',
                firstName: '',
                lastName: '',
                address: '',
                password: '',
                phoneNumber: ''
            })
        })
    }

    componentDidMount() {
        let user = this.props.currentUser
        console.log('didmour', user)
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'harcode',
                lastName: user.lastName,
                firstName: user.firstName,

                address: user.address,
                phoneNumber: user.phoneNumber
            })
        }
    }


    toggle = () => {
        this.props.closeModal();
    };
    handleChangesInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        }, () => {
            console.log('check State: ', this.state);
        });
    };
    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address', 'phoneNumber'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter:  ' + arrInput[i]);
                break;
            }

        }

        return isValid;

    };
    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            this.props.handleEditUser(this.state)
        }
    };

    render() {
        console.log('check did mout', this.props.currentUser)
        return (

            <Modal isOpen={this.props.isOpen} toggle={() => { this.toggle() }} className={'alexClassName'}>
                <ModalHeader toggle={() => { this.toggle() }} >
                    <i className="fa-solid fa-plus"></i>  Edit Users
                </ModalHeader>
                <ModalBody>
                    <div class="row mb-4">
                        <div class="col">
                            <div data-mdb-input-init class="form-outline">
                                <label class="form-label" for="form3Example1">
                                    <i className="fa-solid fa-plus"></i> Email</label>
                                <input name='email'
                                    disabled // Can't not target
                                    value={this.state.email}
                                    onChange={(event) => { this.handleChangesInput(event, "email") }}
                                    type="text" id="form3Example1" class="form-control" />

                            </div>
                        </div>
                        <div class="col">
                            <div data-mdb-input-init class="form-outline">
                                <label class="form-label"
                                    for="form3Example1"><i className="fa-solid fa-plus"></i> First name</label>
                                <input
                                    value={this.state.firstName}
                                    onChange={(event) => { this.handleChangesInput(event, "firstName") }}
                                    name='firstName' type="text" id="form3Example1" class="form-control" />

                            </div>
                        </div>
                        <div class="col">
                            <div data-mdb-input-init class="form-outline">
                                <label class="form-label" for="form3Example2">Last name</label>
                                <input
                                    value={this.state.lastName}

                                    name='lastName'
                                    onChange={(event) => { this.handleChangesInput(event, "lastName") }}
                                    type="text" id="form3Example2" class="form-control" />

                            </div>
                        </div>
                    </div>
                    <div class='col'
                    >
                        <div data-mdb-input-init class="form-outline mb-4">
                            <label class="form-label" for="form3Example3"> Password</label>
                            <input
                                disabled
                                value={this.state.password}
                                onChange={(event) => { this.handleChangesInput(event, "password") }}
                                name='password' type="password" id="form3Example3" class="form-control" />

                        </div>

                    </div>
                    <div class='col'
                    >
                        <div data-mdb-input-init class="form-outline mb-4">
                            <label class="form-label" for="form3Example3"> Address</label>
                            <input
                                value={this.state.address}
                                onChange={(event) => { this.handleChangesInput(event, "address") }}
                                name='address' type="address" id="form3Example3" class="form-control" />

                        </div>

                    </div>





                    <div data-mdb-input-init class="form-outline mb-4">
                        <label class="form-label" for="form3Example4">phone Number</label>
                        <input
                            value={this.state.phoneNumber}
                            onChange={(event) => { this.handleChangesInput(event, "phoneNumber") }}
                            type="phoneNumber" id="form3Example4" class="form-control" />

                    </div>

                </ModalBody>
                <ModalFooter>
                    <Button color='primary px-2' onClick={() => { this.handleSaveUser() }}  >Save Changes</Button>
                    <Button color='secondary' onClick={() => { this.toggle() }}> Cancel</Button>
                </ModalFooter>
            </Modal>

        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
