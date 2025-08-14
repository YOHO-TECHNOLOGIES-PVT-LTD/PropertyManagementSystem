const generateEndPoints = () => {
    return{
        auth: {
            register: "/api/auth/register",
            login: "/api/auth/login",
            getProfile: "/api/auth/me",
            updateProfile: "/api/auth/update",
            updatePassword: "/api/auth/change-pass",
            activity:"/api/activity/all"
        },
        property: {
            create: "/api/property/create",
            getAll: "/api/property/",
            get: "/api/property/:uuid",
            update: "/api/property/",
            delete: "/api/property/",
            getProperty: "/api/property/get"
        },
        unit: {
            create: "/api/unit/create",
            getAll: "/api/unit/",
            get: "/api/unit/:uuid",
            getbyId:"/api/unit/get/",
            update:"/api/unit/",
        },
        tenant: {
            create: "/api/tenant/create",
            getAll: "/api/tenant/",
            get: "/api/tenant/:uuid",
            update: "/api/tenant/:uuid",
            delete: "/api/tenant/:uuid",

        },
        rent: {
            getAll: "/api/rent/",
            get: "/api/rent/:uuid",
            update: "/api/rent/",
            download: "api/rent/download/pdf/",
            delete: "api/rent/delete/"
        },
        lease: {
            getAll: "/api/lease/",
            get: "/api/lease/:uuid",
            update: "/api/lease/:uuid",
        },
        land: {
            create: "/api/land/create",
            getAll: "/api/land/",
            get: "/api/land/:uuid",
            update: "/api/land/:uuid",
            delete: "/api/land/:uuid",
        },
        maintenance: {
            create: "/api/maintenance/create",
            getAll: "/api/maintenance/getAll",
            get: "/api/maintenance/get/:uuid",
            update: "/api/maintenance/update/:uuid",
            delete: "/api/maintenance/delete/:uuid"
        },
        DashBoard: {
            get: "/api/dashboard/report"
        },
        Notification:{
            getAll:"/api/notification/",
            delete:"/api/notification/",
            update:"/api/notification/",
        }
    }
}

export const HTTP_END_POINTS = generateEndPoints();
