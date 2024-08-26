import './DefaultClass.scss'
import React, { Component } from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
class DefaultClass extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {


    }
    async componentDidMount() {
        let res = await getMoreInforDoctor(this.props.doctorId)
        this.setState({
            doctorInfor: res.data
        })

    }


    render() {

        return (
            <div > holo</div>
        );
    }
}

const mapStateToProps = state => {
    return {

        language: state.app.language,


    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
