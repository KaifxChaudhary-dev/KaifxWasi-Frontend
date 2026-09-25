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
            url: "https://backend-01-8e2af1923096.herokuapp.com",
            enabled: true
        },
        {
            id: 2,
            name: "Backend Server 02",
            url: "https://backend-02-8ccd7952e737.herokuapp.com",
            enabled: true
        },
        {
            id: 3,
            name: "Backend Server 03",
            url: "https://backend-03-f0f0139e6d47.herokuapp.com",
            enabled: true
        },
        {
            id: 4,
            name: "Backend Server 04",
            url: "https://backend-4-642dd6477ab0.herokuapp.com",
            enabled: true
        },
        {
            id: 5,
            name: "Backend Server 05",
            url: "https://backend-05-6bdc2241a0a6.herokuapp.com",
            enabled: true
        },
        {
            id: 6,
            name: "Backend Server 06",
            url: "https://backend-06-85b898dc7fec.herokuapp.com",
            enabled: true
        },
        {
            id: 7,
            name: "Backend Server 07",
            url: "https://special-mini-bot-ff4a6ed847ff.herokuapp.com",
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
