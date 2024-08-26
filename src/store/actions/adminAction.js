import actionTypes from './actionTypes';
import { handleGetDetailClinicById, getAllClinic, getAllCodeService, postInforDoctor, fetchSpecialtyInfor, getAllSpecialty, createNewUserService, getAllUsers, handleDeleteUserService, EditUserService, getTopDoctor, detailUserService, getAllDoctor } from '../../services/userService';
import { toast } from "react-toastify";

//GENDER
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START });
            let res = await getAllCodeService('GENDER')
            if (res && res.errorCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
                // console.log('check redux success', getState)

            }
            else {
                dispatch(fetchGenderFail())
            }
        } catch (e) {
            dispatch(fetchGenderFail())

            console.log('', e)

        }
    }

}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFail = () => ({
    type: actionTypes.FETCH_GENDER_FAIL
})
//POSTIONS
export const fetchPostionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('POSITION')
            if (res && res.errorCode === 0) {
                console.log('check postion data', res.data)
                dispatch(fetchPositionSuccess(res.data))
                // console.log('check redux success', getState)

            }
            else {
                dispatch(fetchPositionFail())
            }
        } catch (e) {
            dispatch(fetchPositionFail())

            console.log('', e)

        }
    }

}
export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})
export const fetchPositionFail = () => ({
    type: actionTypes.FETCH_POSITION_FAIL
})
// ROLE
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('ROLE')
            console.log('check id role laex :', res.data)


            if (res.errorCode === 0 && res) {
                console.log('athe le dep trai ne')
                dispatch(fetchRoleSuccess(res.data))

            }
            else {

                dispatch(fetchRoleFail())
            }
        } catch (e) {
            dispatch(fetchRoleFail())

            console.log('', e)

        }
    }

}
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})
export const fetchRoleFail = () => ({
    type: actionTypes.FETCH_ROLE_FAIL
})
// CRUD REDUX

// CREATE NEW USERS
export const createUserStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data)
            console.log('check user response', res.user)
            if (res.user && res.user.errorCode === 0) {



                dispatch(createUserSuccess())
                toast.success("CREATE NEW USER SUCCESSFUL! :))Ỏ HI HI");
                dispatch(fetchAllUserStart())
                // console.log('check redux success', getState)

            }
            else {
                dispatch(createUserFail())
            }
        } catch (e) {
            dispatch(createUserFail())

            console.log('', e)

        }
    }

}
export const createUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})
export const createUserFail = () => ({
    type: actionTypes.CREATE_USER_FAIL
});


export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            let res1 = await getTopDoctor(2)
            let res = await getAllUsers('ALL')
            console.log('check id role laex :', res)


            if (res.errorCode === 0 && res) {
                dispatch(fetchAllUserSuccess(res.users))

            }
            else {

                dispatch(fetchAllUserFail())
            }
        } catch (e) {
            dispatch(fetchAllUserFail())

            console.log('', e)

        }
    }

}

export const fetchAllUserSuccess = (users) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    data: users
})
export const fetchAllUserFail = () => ({
    type: actionTypes.FETCH_ALL_USER_FAIL
})

export const deleteUserSuccess = (users) => ({

    type: actionTypes.HANDLE_DELETE_USER_SUCCESS,
    data: users
})
export const deleteAllUserFail = () => ({
    type: actionTypes.HANDLE_DELETE_USER_FAIL
})
export const deleteUserStart = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await handleDeleteUserService(id)


            if (res.errorCode === 0 && res) {
                dispatch(deleteUserSuccess())
                toast.success("DELETE USER SUCCESSFUL! :))Ỏ HI HI");

                dispatch(fetchAllUserStart())

            }
            else {

                dispatch(deleteAllUserFail())
            }
        } catch (e) {
            dispatch(deleteAllUserFail())
            toast.success("DELETE USER FAILED! :))Ỏ HI HI");


            console.log('', e)

        }
    }

}

export const editUserStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await EditUserService(data)
            if (res && res.errorCode === 0) {



                dispatch(editUserSuccess())
                toast.success("EDIT USER SUCCESSFUL! :))Ỏ HI HI");
                dispatch(fetchAllUserStart())
                // console.log('check redux success', getState)

            }
            else {
                dispatch(editUserFail())
                toast.success("EDIT USER FAILED! :))Ỏ HI HI");

            }
        } catch (e) {
            dispatch(editUserFail())
            toast.fail("EDIT USER FAILED! :))Ỏ HI HI");

            console.log('', e)

        }
    }

}
export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})
export const editUserFail = () => ({
    type: actionTypes.EDIT_USER_FAIL
});

export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctor()
            if (res && res.errorCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    data: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAIL,

                })

            }
        } catch (error) {

        }
    }
};
export const detailUserStart = (data) => {
    return async (dispatch, getState) => {
        try {

            let res = await detailUserService(data)
            if (res && res.errorCode === 0) {



                dispatch(detailUserSuccess(res))
                toast.success("GET DETAIL USER SUCCESSFUL! :))Ỏ HI HI");
                dispatch(fetchAllUserStart())
                // console.log('check redux success', getState)

            }
            else {
                dispatch(detailUserFail())
                toast.success("GET DETAIL USER FAILED! :))Ỏ HI HI");

            }
        } catch (e) {
            dispatch(detailUserFail())
            toast.success("GET DETAIL USER FAILED! :))Ỏ HI HI");

            console.log('', e)

        }
    }

}
export const detailUserSuccess = (user) => ({
    type: actionTypes.DETAIL_USER_SUCCESS,
    data: user
})
export const detailUserFail = () => ({
    type: actionTypes.DETAIL_USER_FAIL
});
export const fetchAllDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctor()
            if (res && res.errorCode === 0) {
                dispatch(fetchAllDoctorSuccess(res.data))
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAIL,

                })

            }
        } catch (error) {

        }
    }
};
export const fetchAllDoctorSuccess = (doctor) => ({
    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
    data: doctor



});
export const saveInforDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await postInforDoctor(data)
            if (res && res.errorCode === 0) {
                toast.success("SAVE INFORMATION DOCTOR SUCCESSFUL!");

                dispatch({

                    type: actionTypes.SAVE_DETAIL_DOCTORS_SUCCESS,

                })
            } else {
                toast.error("SAVE INFORMATION DOCTOR FAIL!");

                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTORS_FAIL,

                })

            }
        } catch (error) {
            toast.success("SAVE INFORMATION DOCTOR FAIL!");

            console.log(error)
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTORS_FAIL,

            })
        }
    }
};
export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('TIME')
            if (res && res.errorCode === 0) {
                dispatch({
                    dataTime: res.data,
                    type: actionTypes.FETCH_ALL_ALLCODE_SCHEDULE_TIME_SUCCESS
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_ALLCODE_SCHEDULE_TIME_FAIL,

                })

            }
        } catch (error) {
            dispatch({
                type: actionTypes.FETCH_ALL_ALLCODE_SCHEDULE_TIME_FAIL,

            })
        }
    }
};
export const getRequiredDoctorInfor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START });
            let resPrice = await getAllCodeService('PRICE')
            let resPayment = await getAllCodeService('PAYMENT')
            let resProvince = await getAllCodeService('PROVINCE')
            let resSpecialty = await fetchSpecialtyInfor();
            let resClinic = await getAllClinic();
            if (resPrice && resPrice.errorCode === 0
                && resPayment && resPayment.errorCode === 0
                && resProvince && resProvince.errorCode === 0
                && resSpecialty && resSpecialty.errorCode === 0
                && resClinic && resClinic.errorCode === 0
            ) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data,
                    resClinic: resClinic.data
                }

                dispatch(fetchRequiredDoctorInforSuccess(data))
                // console.log('check redux success', getState)

            }
            else {
                dispatch(fetchRequiredDoctorInforFail())
            }
        } catch (e) {
            dispatch(fetchRequiredDoctorInforFail())

            console.log('', e)

        }
    }

}

export const fetchRequiredDoctorInforSuccess = (data) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data: data
})
export const fetchRequiredDoctorInforFail = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAIL
})

export const getRequiredSpecialtyInfor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_REQUIRED_SPECIALTY_INFOR_SUCCESS });
            let res = await fetchSpecialtyInfor();
            if (res && res.errorCode === 0) {
                let data = res.data;



                dispatch(fetchRequiredSpecialtyInforSuccess(data))

            }
            else {
                dispatch(fetchRequiredSpecialtyInforFail())
            }
        } catch (e) {
            dispatch(fetchRequiredSpecialtyInforFail())

            console.log('', e)

        }
    }
}

export const fetchRequiredSpecialtyInforSuccess = (data) => ({
    type: actionTypes.FETCH_REQUIRED_SPECIALTY_INFOR_SUCCESS,
    data: data
})
export const fetchRequiredSpecialtyInforFail = () => ({
    type: actionTypes.FETCH_REQUIRED_SPECIALTY_INFOR_FAIL
})

// clinic
export const getRequiredClinicInfor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_REQUIRED_CLINIC_INFOR_SUCCESS });
            let res = await getAllClinic();
            if (res && res.errorCode === 0) {
                let data = res.data;



                dispatch(fetchRequiredClinicInforSuccess(data))

            }
            else {
                dispatch(fetchRequiredClinicInforFail())
            }
        } catch (e) {
            dispatch(fetchRequiredClinicInforFail())

            console.log('', e)

        }
    }
}

export const fetchRequiredClinicInforSuccess = (data) => ({
    type: actionTypes.FETCH_REQUIRED_CLINIC_INFOR_SUCCESS,
    data: data
})
export const fetchRequiredClinicInforFail = () => ({
    type: actionTypes.FETCH_REQUIRED_CLINIC_INFOR_FAIL
})