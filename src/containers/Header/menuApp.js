export const adminMenu = [
    { //quản lý người dùng 
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.admin.crud', link: '/system/user-manage'

            },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux'

            },
            {
                name: 'menu.admin.manage-doctor', link: '/system/manage-doctor'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                // ]
            },
            // {
            //     name: 'menu.admin.manage-admin', link: '/system/user-admin'

            // },
            // quản lý kế hoạch khám bệnh của bác sĩ

            {
                name: 'menu.doctor.manage-shedule', link: '/doctor/manage-schedule'

            },



        ]
    },
    { //quản lý phòng khám
        name: 'menu.admin.clinic',
        menus: [
            {
                name: 'menu.clinic.manage-clinic', link: '/system/manage-clinic'

            },


        ]
    },

    { //quản lý chuyên khoa
        name: 'menu.admin.specialty',
        menus: [
            {
                name: 'menu.specialty.manage-specialty', link: '/system/manage-specialty'

            },


        ]
    },
    { //quản lý cẩm nang
        name: 'menu.admin.handbook',
        menus: [
            {
                name: 'menu.admin.manage-handbook', link: '/system/user-manage'

            },


        ]
    },
];
export const doctorMenu = [
    {
        name: 'menu.admin.manage-user',
        menus: [
            // quản lý kế hoạch khám bệnh của bác sĩ

            {
                name: 'menu.doctor.manage-shedule', link: '/doctor/manage-schedule'

            },

            {
                name: 'menu.doctor.manage-patient', link: '/doctor/manage-patient'

            },



        ]
    }
];