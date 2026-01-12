import React, { useState } from 'react';
import "./PA_settings.css"

const PA_setting = () => {
    // State management for all toggles
    const [settings, setSettings] = useState({
        emailNotifications: true,
        smsAlerts: true,
        twoFactor: false,
        newPatientAlerts: true,
        doctorAssignment: true,
        prescriptionAlerts: true,
        autoPrint: false,
        includeLogo: true,
        printQueue: false,
        autoBackup: true,
        encryption: true,
        cloudSync: true
    });

    // Toggle Handler function
    const handleToggle = (settingName) => {
        setSettings(prev => ({
            ...prev,
            [settingName]: !prev[settingName]
        }));
    };

    return (
        
        <div className="section" id="settingsSection" style={{ display: 'block' }}>
            <div className="section-header">
                <h2 className="section-title">Settings</h2>
            </div>

            <div className="settings-grid">
                {/* Account Settings */}
                <div className="setting-card">
                    <h3><i className="fas fa-user-cog"></i> Account Settings</h3>
                    <div className="setting-option">
                        <span>Email Notifications</span>
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                checked={settings.emailNotifications}
                                onChange={() => handleToggle('emailNotifications')}
                            />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                    <div className="setting-option">
                        <span>SMS Alerts</span>
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                checked={settings.smsAlerts}
                                onChange={() => handleToggle('smsAlerts')}
                            />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                    <div className="setting-option">
                        <span>Two-Factor Authentication</span>
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                checked={settings.twoFactor}
                                onChange={() => handleToggle('twoFactor')}
                            />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                </div>

                {/* Notification Settings */}
                <div className="setting-card">
                    <h3><i className="fas fa-bell"></i> Notification Settings</h3>
                    <div className="setting-option">
                        <span>New Patient Alerts</span>
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                checked={settings.newPatientAlerts}
                                onChange={() => handleToggle('newPatientAlerts')}
                            />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                    <div className="setting-option">
                        <span>Doctor Assignment Alerts</span>
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                checked={settings.doctorAssignment}
                                onChange={() => handleToggle('doctorAssignment')}
                            />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                    <div className="setting-option">
                        <span>Prescription Ready Alerts</span>
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                checked={settings.prescriptionAlerts}
                                onChange={() => handleToggle('prescriptionAlerts')}
                            />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                </div>

                {/* Print Settings */}
                <div className="setting-card">
                    <h3><i className="fas fa-print"></i> Print Settings</h3>
                    <div className="setting-option">
                        <span>Auto Print Prescriptions</span>
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                checked={settings.autoPrint}
                                onChange={() => handleToggle('autoPrint')}
                            />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                    <div className="setting-option">
                        <span>Include Logo on Print</span>
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                checked={settings.includeLogo}
                                onChange={() => handleToggle('includeLogo')}
                            />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                    <div className="setting-option">
                        <span>Print Queue Summary</span>
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                checked={settings.printQueue}
                                onChange={() => handleToggle('printQueue')}
                            />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                </div>

                {/* Data Management */}
                <div className="setting-card">
                    <h3><i className="fas fa-database"></i> Data Management</h3>
                    <div className="setting-option">
                        <span>Auto Backup Records</span>
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                checked={settings.autoBackup}
                                onChange={() => handleToggle('autoBackup')}
                            />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                    <div className="setting-option">
                        <span>Data Encryption</span>
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                checked={settings.encryption}
                                onChange={() => handleToggle('encryption')}
                            />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                    <div className="setting-option">
                        <span>Cloud Sync</span>
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                checked={settings.cloudSync}
                                onChange={() => handleToggle('cloudSync')}
                            />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                </div>
            </div>

            {/* Security Buttons Section */}
            <div className="setting-card" style={{ marginTop: "30px" }}>
                <h3><i className="fas fa-shield-alt"></i> Security</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginTop: '15px' }}>
                    <button className="btn btn-outline">
                        <i className="fas fa-key"></i> Change Password
                    </button>
                    <button className="btn btn-outline">
                        <i className="fas fa-history"></i> View Login History
                    </button>
                    <button className="btn btn-outline">
                        <i className="fas fa-user-shield"></i> Privacy Settings
                    </button>
                </div>
            </div>
        </div>
    )
}
export default PA_setting;