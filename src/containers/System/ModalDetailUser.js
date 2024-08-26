import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import './ModalDetailUser.scss';
import { emitter } from '../../utils/emitter';
import _ from 'lodash'
class ModalDetailUser extends Component {
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
        let user = this.props.detailUser
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




    render() {
        console.log('check did prop mout', this.props.detailUser)
        console.log('check state ,', this.state.phoneNumber)
        return (

            <Modal isOpen={this.props.isOpen} toggle={() => { this.toggle() }} className={'alexClassName'}>
                <ModalHeader toggle={() => { this.toggle() }} >
                    <i className="fa-solid fa-plus"></i>  Detail User Users
                </ModalHeader>
                <ModalBody>

                    <div className="row mb-4">
                        <div className="col">
                            <div data-mdb-input-init classNamena="form-outline">
                                <label className="form-label" for="form3Example1">
                                    <i classNameName="fa-solid fa-plus"></i> Email</label>
                                <input name='email'
                                    disabled // Can't not target
                                    value={this.state.email}

                                    type="text" id="form3Example1" className="form-control" />

                            </div>
                        </div>
                        <div className="col">
                            <div data-mdb-input-init className="form-outline">
                                <label className="form-label"
                                    for="form3Example1"><i classNameName="fa-solid fa-plus"></i> First name</label>
                                <input disabled
                                    value={this.state.firstName}

                                    name='firstName' type="text" id="form3Example1" className="form-control" />

                            </div>
                        </div>
                        <div className="col">
                            <div data-mdb-input-init className="form-outline">
                                <label className="form-label" for="form3Example2">Last name</label>
                                <input disabled
                                    value={this.state.lastName}

                                    name='lastName'

                                    type="text" id="form3Example2" className="form-control" />

                            </div>
                        </div>
                    </div>
                    <div className='col'
                    >
                        <div data-mdb-input-init className="form-outline mb-4">
                            <label className="form-label" for="form3Example3"> Password</label>
                            <input
                                disabled
                                value={this.state.password}

                                name='password' type="password" id="form3Example3" className="form-control" />

                        </div>

                    </div>
                    <div className='col'
                    >
                        <div data-mdb-input-init className="form-outline mb-4">
                            <label className="form-label" for="form3Example3"> Address</label>
                            <input disabled
                                value={this.state.address}

                                name='address' type="address" id="form3Example3" className="form-control" />

                        </div>

                    </div>





                    <div data-mdb-input-init className="form-outline mb-4">
                        <label className="form-label" for="form3Example4">phone Number</label>
                        <input disabled
                            value={this.state.phoneNumber}

                            type="phoneNumber" id="form3Example4" className="form-control" />

                    </div>
                    <div className="form-outline mb-4">
                        <label>My IMG</label>



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

export default connect(mapStateToProps, mapDispatchToProps)(ModalDetailUser);
