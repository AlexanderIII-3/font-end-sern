import axios from "../axios";
const handleLoginApi = (email, password) => {
    return axios.post(`/api/login`, { email, password }); // to connect api in backend
}// take value from client to backend server
const getAllUsers = (inputId) => {
    return axios.get(`/api/getAllUser-crud?id=${inputId}`); // to connect api in backend
}
const deletUser = (inputId) => {
    return axios.delete(`/api/deleteUser-crud?id=${inputId}`); // to connect api in
}
const createNewUserService = (data) => {

    return axios.post(`/api/create-new-user`, data);
}
const handleDeleteUserService = (InputId) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: InputId
        }
    });
};
const EditUserService = (user) => {
    console.log('check user form server', user)
    return axios.put('/api/edit-user', user



    );
};
const getAllCodeService = (inPutData) => {
    return axios.get(`/api/allcodes?type=${inPutData}`)
}
const getTopDoctor = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}
const detailUserService = (userId) => {
    console.log('check id form service', userId)
    return axios.get(`/api/detail-user?id=${userId}`

    )
}
const getAllDoctor = () => {
    return axios.get(`/api/get-all-doctor`)
}
const postInforDoctor = (data) => {
    return axios.post(`/api/save-infor-doctor`, data)
}
const getDetailInforDoctor = (id) => {
    return axios.get(`/api/get-details-doctor?id=${id}`)

}
const bulkCreateSchedule = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data

    )

}
const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}
const getMoreInforDoctor = (doctorId) => {
    return axios.get(`/api/get-more-infor-doctor?doctorId=${doctorId}`)
}
const getProfileInforDoctor = (doctorId) => {
    return axios.get(`/api/get-profile-infor-doctor?id=${doctorId}`)
}
const postPatentAppointment = (data) => {
    return axios.post(`/api/patient-booking-appointment`, data)
}
const postVerifyBookingAppointment = (data) => {
    return axios.post(`/api/verify-booking-appointment`, data)
}


const saveSpecialtyInfor = (data) => {
    console.log('check data to send 2', data)
    return axios.post('/api/specialty-save-infor', data)
}
const fetchSpecialtyInfor = () => {
    return axios.get(`/api/fetch-specialty-infor`);

}
const handleDeleteSpecialy = (id) => {
    return axios.post(`/api/handle-delete-specialty?id=${id}`)
}
const handleGetDetailSpecialtyById = (data) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`)
}
const createNewClinic = (data) => {
    return axios.post(`/api/create-new-clinic`, data)
}
const getAllClinic = () => {
    return axios.get(`/api/get-all-clinic`)
}
const handleDeleteClinic = (data) => {
    return axios.post(`/api/delete-clinic`, data)
}
const handleGetDetailClinicById = (data) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`)
}
const getAllPatientForDoctor = (data) => {
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`)
}
const sendRemedy = (data) => {
    return axios.post(`/api/sending-remedy`, data)
}
export {
    handleLoginApi, getAllUsers, deletUser, createNewUserService, handleDeleteUserService,
    EditUserService, getAllCodeService, getTopDoctor, detailUserService, getAllDoctor, postInforDoctor,
    getDetailInforDoctor, bulkCreateSchedule,
    getScheduleDoctorByDate, getMoreInforDoctor,
    getProfileInforDoctor, postPatentAppointment,
    saveSpecialtyInfor, fetchSpecialtyInfor,
    handleDeleteSpecialy, postVerifyBookingAppointment,
    handleGetDetailSpecialtyById, createNewClinic,
    getAllClinic, handleDeleteClinic, handleGetDetailClinicById,
    getAllPatientForDoctor, sendRemedy
}
