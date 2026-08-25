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
            url: "https://backend-02-ce708230c56b.herokuapp.com",
            enabled: true
        },
        {
            id: 2,
            name: "Backend Server 02",
            url: "https://backend01-d5936b5321d2.herokuapp.com",
            enabled: true
        },
        {
            id: 3,
            name: "Backend Server 03",
            url: "https://web-production-9f9ad.up.railway.app",
            enabled: true
        },
        {
            id: 4,
            name: "Backend Server 04",
            url: "",
            enabled: true
        },
        {
            id: 5,
            name: "Backend Server 05",
            url: "",
            enabled: true
        },
        {
            id: 6,
            name: "Backend Server 06",
            url: "",
            enabled: true
        },
        {
            id: 7,
            name: "Backend Server 07",
            url: "",
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
