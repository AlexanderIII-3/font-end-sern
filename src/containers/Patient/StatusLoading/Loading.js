import React, { Component } from 'react';
import { connect } from "react-redux";
import './Loading.scss';
class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {


    }
    async componentDidMount() {




    }


    render() {

        return (
            <>
                <h2>How To Create A Loader</h2>

                <div class="loader"></div>

            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
