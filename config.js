/**
 * =========================================================================
 * KAIF-MD CLUSTER CONFIGURATION (config.js)
 * =========================================================================
 * 
 * Edit your 10 backend server URLs below for Vercel!
 * When you commit/deploy to Vercel, these URLs load automatically in admin.html & index.html.
 */

window.CLUSTER_CONFIG = {
    servers: [
        {
            id: 1,
            name: "Backend Server 01 (Primary)",
            url: "https://backend-1-ccb5dd48ab73.herokuapp.com",
            enabled: true
        },
        {
            id: 2,
            name: "Backend Server 02",
            url: "https://backend-2-dc6996310e09.herokuapp.com",
            enabled: true
        },
        {
            id: 3,
            name: "Backend Server 03",
            url: "https://backend-3-f68113bd5b94.herokuapp.com",
            enabled: true
        },
        {
            id: 4,
            name: "Backend Server 04",
            url: "https://backend-04-346e60235d0b.herokuapp.com",
            enabled: true
        },
        {
            id: 5,
            name: "Backend Server 05",
            url: "https://backend-5-e9b7191cac10.herokuapp.com",
            enabled: true
        },
        {
            id: 6,
            name: "Backend Server 06",
            url: "https://backend-6-b29879b29082.herokuapp.com",
            enabled: true
        },
        {
            id: 7,
            name: "Backend Server 07",
            url: "https://backend-7-948d93d76b4b.herokuapp.com/",
            enabled: true
        },
        {
            id: 8,
            name: "Backend Server 08",
            url: "",
            enabled: true
        },
        {
            id: 9,
            name: "Backend Server 09",
            url: "",
            enabled: true
        },
        {
            id: 10,
            name: "Backend Server 10",
            url: "",
            enabled: true
        }
    ]
};
