import * as React from 'react';
import { useState } from 'react';
import { Page } from '../layouts/logged-in';

const PersonalData = () => {
    return <form>
        <div className="form__group">
            <label>First Name
                <input type="text" name="first-name"/>
            </label>
        </div>
        <div className="form__group">
            <label>Last Name
                <input type="text" name="last-name"/>
            </label>
        </div>
    </form>
}

const changeUsersPassword = () => {

}

const PasswordData = () => {
    const [ oldPassword, setOldPassword ] = useState('');
    const [ newPassword, setNewPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');

    return <form onSubmit={() => changeUsersPassword()}>
        <div className="form__group">
            <label>Old Password
                <input type="text" value={oldPassword} onChange={(evt) => setOldPassword(evt.currentTarget.value)} name="old-password"/>
            </label>
        </div>
        <div className="form__group">
            <label>New Password
                <input type="text" value={newPassword} onChange={(evt) => setNewPassword(evt.currentTarget.value)} name="new-password"/>
            </label>
        </div>
        <div className="form__group">
            <label>Confirm New Password
                <input type="text" value={confirmPassword} onChange={(evt) => setConfirmPassword(evt.currentTarget.value)} name="confirm-new-password"/>
            </label>
        </div>
    </form>
}

const getSettingsComponent = (settingsPage: string): JSX.Element => {
    switch (settingsPage) {
        case 'password':
            return <PasswordData/>
        case 'personal':
            return <PersonalData/>
    }
    return <div></div>;
}

const MyAccount = () => {
    const [ settingsPage, setSettingsPage ] = useState('personal');

    return <Page>
        <h1 className="heading-primary">Your Account</h1>
        <div className="split-form">
            <div className="split-form__controls">
                <ul>
                    <li><a href="#" onClick={() => setSettingsPage('personal')}>Personal</a></li>
                    <li><a href="#" onClick={() => setSettingsPage('password')}>Change Password</a></li>
                </ul>
            </div>
            <div className="split-form__form">
                { getSettingsComponent(settingsPage) }
            </div>
        </div>
    </Page>
}

export default MyAccount;
