import actionTypes from '../actions/actionTypes';
import { toast } from "react-toastify";


const initialState = {
    genders: [],
    roles: [],
    positions: [],
    isLoadingGender: false,
    userArr: [],
    topDoctor: [],
    userDetail: '',
    allDoctor: [],
    dataTime: [],
    allRequiredDoctorInfor: [],
    specialtyArr: [],
    clinicArr: [],
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        //GENDER
        case actionTypes.FETCH_GENDER_START:
            let copyState = { ...state };
            copyState.isLoadingGender = true;
            return {
                ...copyState,

            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data
            state.isLoadingGender = false;



            return {
                ...state,

            }

        case actionTypes.FETCH_GENDER_FAIL:
            state.isLoadingGender = false;
            state.genders = [];
            return {
                ...state,


            }


        // POSITION
        case actionTypes.FETCH_POSITION_SUCCESS:
            let copyPState = { ...state };
            copyPState.positions = action.data


            return {
                ...copyPState,

            }





        case actionTypes.FETCH_POSITION_FAIL:


        //ROLE  

        case actionTypes.FETCH_ROLE_SUCCESS:
            let copyRState = { ...state };
            copyRState.roles = action.data
            console.log('anh the anh dep trai ROLE success', copyRState.roles)


            return {
                ...copyRState,

            }

        case actionTypes.FETCH_ROLE_FAIL:
        // crud redux
        case actionTypes.CREATE_USER_SUCCESS:
            console.log('Create user success', action)
        case actionTypes.CREATE_USER_FAIL:


        case actionTypes.FETCH_ALL_USER_SUCCESS:
            state.userArr = action.data

            return {
                ...state,

            }

        case actionTypes.FETCH_ALL_USER_FAIL:

        case actionTypes.HANDLE_DELETE_USER_SUCCESS:


        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
            state.topDoctor = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_TOP_DOCTORS_FAIL:
            state.topDoctor = [];
            return {
                ...state
            }



        case actionTypes.DETAIL_USER_SUCCESS:
            state.userDetail = action.data;
            return {
                ...state
            }
        case actionTypes.DETAIL_USER_FAIL:
            state.topDoctor = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            state.allDoctor = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_All_DOCTORS_FAIL:
            state.allDoctor = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_ALLCODE_SCHEDULE_TIME_SUCCESS:
            state.dataTime = action.dataTime
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_ALLCODE_SCHEDULE_TIME_FAIL:
            state.dataTime = [];
            return {
                ...state

            }



        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:
            state.allRequiredDoctorInfor = action.data
            return {
                ...state
            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAIL:
            state.allRequiredDoctorInfor = [];
            return {
                ...state
            }

        //specialty
        case actionTypes.FETCH_REQUIRED_SPECIALTY_INFOR_SUCCESS:
            state.specialtyArr = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_REQUIRED_SPECIALTY_INFOR_FAIL:
            state.specialtyArr = [];
            return {
                ...state
            }
        //clinic
        case actionTypes.FETCH_REQUIRED_CLINIC_INFOR_SUCCESS:
            state.clinicArr = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_REQUIRED_CLINIC_INFOR_FAIL:
            state.clinicArr = [];
            return {
                ...state
            }
        default:
            return state;





    }


}

export default appReducer;