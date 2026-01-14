// Firebase REST API Configuration for Project :D Analytics
// Using Firestore REST API instead of SDK
// No SDK required - Pure HTTP requests

const FIREBASE_PROJECT_ID = "text-ocr-1-599ae";
const FIRESTORE_API_URL = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents`;

// Track Page Visit using REST API
async function trackVisit(data) {
    try {
        const visitData = {
            fields: {
                // Customer Info
                customerName: { stringValue: data.name || 'Unknown' },
                vitaminDLevel: { doubleValue: parseFloat(data.level) || 0 },
                language: { stringValue: data.lang || 'english' },
                
                // Visit Details
                timestamp: { timestampValue: new Date().toISOString() },
                visitDate: { stringValue: new Date().toISOString() },
                
                // Device Info
                deviceType: { stringValue: getDeviceType() },
                userAgent: { stringValue: navigator.userAgent },
                screenWidth: { integerValue: window.innerWidth },
                screenHeight: { integerValue: window.innerHeight },
                
                // URL Info
                pageUrl: { stringValue: window.location.href },
                referrer: { stringValue: document.referrer || 'direct' },
                
                // Session Info
                sessionId: { stringValue: getOrCreateSessionId() },
                
                // Status
                status: { stringValue: getVitaminDStatus(data.level) },
                
                // Tracking
                converted: { booleanValue: false }
            }
        };

        // POST to Firestore REST API
        const response = await fetch(`${FIRESTORE_API_URL}/visits`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(visitData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        const docId = result.name.split('/').pop(); // Extract document ID
        console.log('✅ Visit tracked:', docId);
        
        return docId;
    } catch (error) {
        console.error('❌ Error tracking visit:', error);
        return null;
    }
}

// Track User Actions using REST API
async function trackAction(visitId, actionType, actionData = {}) {
    if (!visitId) return;

    try {
        const actionDoc = {
            fields: {
                action: { stringValue: actionType },
                timestamp: { timestampValue: new Date().toISOString() },
                data: { stringValue: JSON.stringify(actionData) }
            }
        };

        // POST to subcollection
        const response = await fetch(`${FIRESTORE_API_URL}/visits/${visitId}/actions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(actionDoc)
        });

        if (response.ok) {
            console.log(`✅ Action tracked: ${actionType}`);
        }
    } catch (error) {
        console.error('❌ Error tracking action:', error);
    }
}

// Track Conversion (Order) using REST API
async function trackConversion(visitId, conversionData = {}) {
    if (!visitId) return;

    try {
        // 1. Update visit document with conversion status
        const updateData = {
            fields: {
                converted: { booleanValue: true },
                conversionTimestamp: { timestampValue: new Date().toISOString() },
                conversionCustomerName: { stringValue: conversionData.customerName || 'Unknown' },
                conversionVitaminDLevel: { doubleValue: parseFloat(conversionData.vitaminDLevel) || 0 }
            }
        };

        const updateResponse = await fetch(`${FIRESTORE_API_URL}/visits/${visitId}?updateMask.fieldPaths=converted&updateMask.fieldPaths=conversionTimestamp&updateMask.fieldPaths=conversionCustomerName&updateMask.fieldPaths=conversionVitaminDLevel`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
        });

        // 2. Create separate conversion record
        const conversionDoc = {
            fields: {
                visitId: { stringValue: visitId },
                customerName: { stringValue: conversionData.customerName || 'Unknown' },
                vitaminDLevel: { doubleValue: parseFloat(conversionData.vitaminDLevel) || 0 },
                language: { stringValue: conversionData.language || 'english' },
                productName: { stringValue: 'Powerlife Vitamin D3 1000IU' },
                price: { doubleValue: 43 },
                voucherCode: { stringValue: 'VD5OFF' },
                timestamp: { timestampValue: new Date().toISOString() }
            }
        };

        const conversionResponse = await fetch(`${FIRESTORE_API_URL}/conversions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(conversionDoc)
        });

        if (conversionResponse.ok) {
            console.log('✅ Conversion tracked!');
        }
    } catch (error) {
        console.error('❌ Error tracking conversion:', error);
    }
}

// Helper Functions
function getDeviceType() {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "tablet";
    }
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return "mobile";
    }
    return "desktop";
}

function getOrCreateSessionId() {
    let sessionId = sessionStorage.getItem('vitaminD_sessionId');
    if (!sessionId) {
        sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        sessionStorage.setItem('vitaminD_sessionId', sessionId);
    }
    return sessionId;
}

function getVitaminDStatus(level) {
    if (!level) return 'unknown';
    level = parseFloat(level);
    if (level < 10) return 'severe';
    if (level < 20) return 'deficiency';
    if (level < 30) return 'insufficient';
    if (level < 50) return 'sufficient';
    return 'optimal';
}

// No initialization needed for REST API - ready to use immediately
console.log('✅ Firebase REST API tracking ready');
