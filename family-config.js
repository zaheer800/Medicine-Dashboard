// Family Medicine Tracker Configuration Template
// Copy this file as 'family-config.js' and update with your values

const FAMILY_CONFIG = {
    // === GOOGLE CLOUD CREDENTIALS ===
    // Get these from Google Cloud Console
    GOOGLE_CLIENT_ID: 'your_client_id_here.apps.googleusercontent.com',
    GOOGLE_API_KEY: 'your_api_key_here',
    
    // === GOOGLE SHEETS IDs ===
    // Medicine schedule sheet (where medicines and times are listed)
    MEDICINE_SCHEDULE_SHEET_ID: 'your_schedule_sheet_id_here',
    
    // Progress tracking sheet (where taken/missed medicines are recorded)
    PROGRESS_TRACKING_SHEET_ID: 'your_progress_sheet_id_here',
    
    // === FAMILY MEMBERS ===
    // Add all family members who will use the app
    FAMILY_MEMBERS: [
        {
            id: 'primary_caregiver',
            name: 'Primary Caregiver',
            email: 'your_email@gmail.com',
            role: 'admin',
            canEditSchedule: true,
            canViewAllProgress: true,
            canManageFamily: true,
            locationSharing: true
        },
        {
            id: 'spouse',
            name: 'Spouse',
            email: 'spouse_email@gmail.com',
            role: 'caregiver',
            canEditSchedule: false,
            canViewAllProgress: true,
            canManageFamily: false,
            locationSharing: true
        },
        {
            id: 'child1',
            name: 'Child 1',
            email: 'child1_email@gmail.com',
            role: 'patient',
            canEditSchedule: false,
            canViewAllProgress: false,
            canManageFamily: false,
            locationSharing: true // Parent controlled
        },
        {
            id: 'child2',
            name: 'Child 2',
            email: 'child2_email@gmail.com',
            role: 'patient',
            canEditSchedule: false,
            canViewAllProgress: false,
            canManageFamily: false,
            locationSharing: false
        }
    ],
    
    // === FAMILY CALENDAR ===
    // Google Calendar ID for shared family calendar
    FAMILY_CALENDAR_ID: 'primary', // Use 'primary' for default calendar
    // Or create a shared calendar and use its ID:
    // FAMILY_CALENDAR_ID: 'your_family_calendar_id@group.calendar.google.com',
    
    // === LOCATION SETTINGS ===
    LOCATION_CONFIG: {
        // Enable location tracking
        enabled: true,
        
        // Update frequency (in minutes)
        updateFrequency: 15,
        
        // Predefined locations for family
        knownLocations: {
            home: {
                name: 'Home',
                lat: 28.6139, // Replace with your home coordinates
                lng: 77.2090,
                radius: 100 // meters
            },
            work: {
                name: 'Work',
                lat: 28.6129, // Replace with work coordinates
                lng: 77.2295,
                radius: 200
            },
            school: {
                name: 'School',
                lat: 28.6169, // Replace with school coordinates
                lng: 77.2090,
                radius: 150
            },
            hospital: {
                name: 'Hospital',
                lat: 28.6280, // Replace with hospital coordinates
                lng: 77.2065,
                radius: 100
            }
        },
        
        // Geofencing alerts
        alerts: {
            arrivedHome: true,
            leftHome: true,
            arrivedWork: true,
            arrivedSchool: true,
            nearPharmacy: true // Alert when near pharmacy
        }
    },
    
    // === NOTIFICATION SETTINGS ===
    NOTIFICATIONS: {
        // Medicine reminders
        medicineReminders: {
            enabled: true,
            beforeTime: 10, // minutes before medicine time
            reminderSound: true,
            vibration: true
        },
        
        // Family notifications
        familyAlerts: {
            enabled: true,
            missedDose: true, // Alert family when someone misses medicine
            locationUpdates: true, // Alert when family members arrive/leave
            weeklyReport: true // Send weekly adherence report
        },
        
        // Push notification settings
        pushNotifications: {
            morningReminder: '07:00',
            afternoonReminder: '13:00', 
            eveningReminder: '20:00',
            nightReminder: '21:00'
        }
    },
    
    // === PRIVACY SETTINGS ===
    PRIVACY: {
        // Data sharing preferences
        shareProgressWithFamily: true,
        shareLocationWithFamily: true,
        allowFamilyNotifications: true,
        
        // Data retention (in days)
        keepProgressData: 365,
        keepLocationData: 30,
        
        // Export settings
        allowDataExport: true,
        exportFormat: 'csv' // or 'json'
    },
    
    // === APP CUSTOMIZATION ===
    UI_CONFIG: {
        // Theme settings
        theme: 'auto', // 'light', 'dark', or 'auto'
        primaryColor: '#667eea',
        accentColor: '#764ba2',
        
        // Language settings
        language: 'en', // 'en', 'hi', 'es', etc.
        dateFormat: 'DD/MM/YYYY',
        timeFormat: '12h', // '12h' or '24h'
        
        // Display preferences
        showPhotos: true,
        showStatistics: true,
        showFamilyStatus: true,
        compactView: false
    },
    
    // === EMERGENCY CONTACTS ===
    EMERGENCY_CONTACTS: [
        {
            name: 'Family Doctor',
            phone: '+91-9876543210',
            email: 'doctor@hospital.com',
            type: 'primary_doctor'
        },
        {
            name: 'Pharmacy',
            phone: '+91-9876543211', 
            address: '123 Main Street, Your City',
            type: 'pharmacy'
        },
        {
            name: 'Emergency Contact',
            phone: '+91-9876543212',
            email: 'emergency@family.com',
            type: 'emergency'
        }
    ],
    
    // === INTEGRATION SETTINGS ===
    INTEGRATIONS: {
        // Google services
        googleDrive: {
            enabled: true,
            autoBackup: true,
            backupFrequency: 'weekly' // 'daily', 'weekly', 'monthly'
        },
        
        // Third-party services (optional)
        pharmacyAPI: {
            enabled: false,
            provider: '', // e.g., 'CVS', 'Walgreens', etc.
            apiKey: ''
        },
        
        // Health apps integration
        healthApps: {
            googleFit: true,
            appleHealth: false,
            samsung: false
        }
    }
};

// === VALIDATION FUNCTIONS ===
function validateConfig() {
    const required = [
        'GOOGLE_CLIENT_ID',
        'GOOGLE_API_KEY',
        'MEDICINE_SCHEDULE_SHEET_ID',
        'PROGRESS_TRACKING_SHEET_ID'
    ];
    
    const missing = required.filter(key => !FAMILY_CONFIG[key] || FAMILY_CONFIG[key].includes('your_'));
    
    if (missing.length > 0) {
        console.error('Missing required configuration:', missing);
        return false;
    }
    
    return true;
}

// === FAMILY PERMISSION HELPERS ===
function getFamilyMember(email) {
    return FAMILY_CONFIG.FAMILY_MEMBERS.find(member => member.email === email);
}

function canUserEditSchedule(userEmail) {
    const member = getFamilyMember(userEmail);
    return member?.canEditSchedule || false;
}

function canUserViewAllProgress(userEmail) {
    const member = getFamilyMember(userEmail);
    return member?.canViewAllProgress || false;
}

function isUserAdmin(userEmail) {
    const member = getFamilyMember(userEmail);
    return member?.role === 'admin' || false;
}

// === EXPORT FOR USE IN MAIN APP ===
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FAMILY_CONFIG;
}

// === SETUP INSTRUCTIONS ===
/* 
To use this configuration:

1. Copy this file as 'family-config.js' in your project
2. Update all the 'your_*_here' values with actual data
3. Include it in your HTML file:
   <script src="family-config.js"></script>
4. Update the main CONFIG object to use FAMILY_CONFIG values

Example usage in main app:
const CONFIG = {
    GOOGLE_CLIENT_ID: FAMILY_CONFIG.GOOGLE_CLIENT_ID,
    GOOGLE_API_KEY: FAMILY_CONFIG.GOOGLE_API_KEY,
    SCHEDULE_SHEET_ID: FAMILY_CONFIG.MEDICINE_SCHEDULE_SHEET_ID,
    PROGRESS_SHEET_ID: FAMILY_CONFIG.PROGRESS_TRACKING_SHEET_ID,
    // ... other settings
};
*/