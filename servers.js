/**
 * KAIF-MD MULTI-BACKEND SERVER CONFIGURATION & AUTO LOAD-BALANCER
 * 
 * Automatically loads URLs from config.js or config.json on every Vercel redeploy!
 */

const DEFAULT_SERVERS = [
    {
        id: 1,
        name: "Backend Server 01 (Primary)",
        url: "https://backend-01-24b5dad12790.herokuapp.com",
        enabled: true
    },
    {
        id: 2,
        name: "Backend Server 02",
        url: "https://backend-02-24b5dad12790.herokuapp.com",
        enabled: true
    },
    {
        id: 3,
        name: "Backend Server 03",
        url: "",
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
];

let runtimeServersCache = null;

/**
 * Get active list of backend servers (prioritizes config.js/config.json over stale localStorage)
 */
function getBackendServers() {
    if (runtimeServersCache && Array.isArray(runtimeServersCache) && runtimeServersCache.length > 0) {
        return runtimeServersCache;
    }

    // 1. Check window.CLUSTER_CONFIG from config.js
    if (typeof window !== 'undefined' && window.CLUSTER_CONFIG && Array.isArray(window.CLUSTER_CONFIG.servers) && window.CLUSTER_CONFIG.servers.length > 0) {
        runtimeServersCache = window.CLUSTER_CONFIG.servers;
        return runtimeServersCache;
    }

    // 2. Check localStorage
    try {
        if (typeof localStorage !== 'undefined') {
            const saved = localStorage.getItem('kaif_backend_servers_v2') || localStorage.getItem('kaif_saved_servers');
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    runtimeServersCache = parsed;
                    return runtimeServersCache;
                }
            }
        }
    } catch (e) {}

    return DEFAULT_SERVERS;
}

/**
 * Save backend servers list to localStorage
 */
function saveBackendServers(servers) {
    runtimeServersCache = servers;
    try {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('kaif_backend_servers_v2', JSON.stringify(servers));
            localStorage.setItem('kaif_saved_servers', JSON.stringify(servers));
        }
    } catch (e) {
        console.error('Error saving servers to storage:', e);
    }
}

/**
 * Fetch and load latest config.json/config.js on startup with cache busting
 */
async function loadConfigOnBoot() {
    try {
        // 1. Check config.js
        if (typeof window !== 'undefined' && window.CLUSTER_CONFIG && Array.isArray(window.CLUSTER_CONFIG.servers)) {
            runtimeServersCache = window.CLUSTER_CONFIG.servers;
            return runtimeServersCache;
        }

        // 2. Fetch config.json
        const res = await fetch('./config.json?t=' + Date.now(), { cache: 'no-store' });
        if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data.servers) && data.servers.length > 0) {
                runtimeServersCache = data.servers;
                return runtimeServersCache;
            }
        }
    } catch (e) {}
    return getBackendServers();
}

/**
 * Clean & normalize URL (removes trailing slashes)
 */
function cleanUrl(url) {
    if (!url || typeof url !== 'string') return '';
    let u = url.trim();
    if (!u.startsWith('http://') && !u.startsWith('https://')) {
        u = 'https://' + u;
    }
    return u.replace(/\/+$/, '');
}

/**
 * Ping and check health of a single backend server
 */
async function checkServerHealth(serverUrl, timeoutMs = 6000) {
    const clean = cleanUrl(serverUrl);
    if (!clean) {
        return {
            url: '',
            isOnline: false,
            error: 'No URL configured',
            activeCount: 0,
            maxSessions: 10,
            freeSlots: 0,
            pingMs: 0
        };
    }

    const start = performance.now();
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
        const response = await fetch(`${clean}/api/status`, {
            method: 'GET',
            headers: { 'Accept': 'application/json' },
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        const latency = Math.round(performance.now() - start);

        if (!response.ok) {
            return {
                url: clean,
                isOnline: false,
                error: `HTTP ${response.status}`,
                activeCount: 0,
                maxSessions: 10,
                freeSlots: 0,
                pingMs: latency
            };
        }

        const data = await response.json();
        const activeCount = typeof data.activeCount === 'number' ? data.activeCount : (Array.isArray(data.activeSessions) ? data.activeSessions.length : 0);
        const maxSessions = typeof data.maxSessions === 'number' ? data.maxSessions : 10;
        const freeSlots = Math.max(0, maxSessions - activeCount);

        return {
            url: clean,
            isOnline: true,
            activeCount,
            maxSessions,
            freeSlots,
            isFull: freeSlots <= 0,
            pingMs: latency,
            uptime: data.uptime || 'Online',
            database: data.database || data.dbConnected || false,
            activeSessions: data.activeSessions || []
        };
    } catch (err) {
        clearTimeout(timeoutId);
        return {
            url: clean,
            isOnline: false,
            error: err.name === 'AbortError' ? 'Connection timed out' : (err.message || 'Offline'),
            activeCount: 0,
            maxSessions: 10,
            freeSlots: 0,
            pingMs: 0
        };
    }
}

/**
 * Scan all configured backend servers and find the best available server with free capacity
 */
async function findBestAvailableServer() {
    await loadConfigOnBoot();
    const servers = getBackendServers().filter(s => s.enabled && s.url && s.url.trim() !== '');

    if (servers.length === 0) {
        const fallbackUrl = (typeof window !== 'undefined' && window.location.origin) ? window.location.origin : 'https://backend-01-24b5dad12790.herokuapp.com';
        return {
            server: { id: 1, name: 'Primary Backend', url: fallbackUrl },
            health: await checkServerHealth(fallbackUrl)
        };
    }

    console.log(`🔍 [LOAD-BALANCER] Scanning ${servers.length} configured backend server(s)...`);

    // Check all servers in parallel
    const checks = await Promise.all(servers.map(async (server) => {
        const health = await checkServerHealth(server.url);
        return { server, health };
    }));

    // Filter to only online servers with available capacity
    const available = checks.filter(c => c.health.isOnline && !c.health.isFull);

    if (available.length === 0) {
        // If all full or offline, check if any online exists
        const online = checks.filter(c => c.health.isOnline);
        if (online.length > 0) {
            online.sort((a, b) => a.health.activeCount - b.health.activeCount);
            console.warn(`⚠️ [LOAD-BALANCER] All servers full, returning least loaded: ${online[0].server.name}`);
            return online[0];
        }
        return checks[0];
    }

    // Sort by most free slots first, then lowest latency
    available.sort((a, b) => {
        if (b.health.freeSlots !== a.health.freeSlots) {
            return b.health.freeSlots - a.health.freeSlots; // Highest free capacity first
        }
        return a.health.pingMs - b.health.pingMs; // Lowest ping second
    });

    console.log(`✅ [LOAD-BALANCER] Selected optimal server: ${available[0].server.name} (${available[0].health.activeCount}/${available[0].health.maxSessions} bots, ${available[0].health.pingMs}ms)`);
    return available[0];
}

// Auto-run on load
if (typeof window !== 'undefined') {
    window.DEFAULT_SERVERS = DEFAULT_SERVERS;
    window.getBackendServers = getBackendServers;
    window.saveBackendServers = saveBackendServers;
    window.checkServerHealth = checkServerHealth;
    window.findBestAvailableServer = findBestAvailableServer;
    window.cleanUrl = cleanUrl;
    window.loadConfigOnBoot = loadConfigOnBoot;
}
