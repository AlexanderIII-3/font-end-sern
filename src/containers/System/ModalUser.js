import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
class ModalUser extends Component {
    constructor(props) {

        super(props);
        this.state = {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            address: '',
            phoneNumber: ''

        };
        this.listenEmitter();
    }
    listenEmitter = () => {
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
    checkValideInput = () => {
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
    handleAddUser = () => {
        let isValid = this.checkValideInput();
        if (isValid === true) {
            this.props.createNewUser(this.state)
        }
    };
    render() {
        return (

            <Modal isOpen={this.props.isOpen} toggle={() => { this.toggle() }} className={'alexClassName'}>
                <ModalHeader toggle={() => { this.toggle() }} >
                    <i className="fa-solid fa-plus"></i>   Add New Users
                </ModalHeader>
                <ModalBody>
                    <div class="row mb-4">
                        <div class="col">
                            <div data-mdb-input-init class="form-outline">
                                <label class="form-label" for="form3Example1">
                                    <i className="fa-solid fa-plus"></i> Email</label>
                                <input name='email'
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
                    <Button color='primary px-2' onClick={() => { this.handleAddUser() }}  >Add New</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
