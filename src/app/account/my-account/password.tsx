import * as React from 'react';
import Form from '../../components/form';
import { __ } from '../../utils/lang';
import { Auth } from '../../utils/user';

const { useState } = React;

const Password = () => {
    const [ oldPassword, setOldPassword ] = useState<string>('');
    const [ newPassword, setNewPassword ] = useState<string>('');
    const [ confirmNewPassword, setConfirmNewPassword ] = useState<string>('');
    const [ stateErrors, setStateErrors ] = useState<string[]>([]);
    const localErrors: string[] = [];

    const changePassword = async () => {
        const user = Auth.currentUser();
        try {
            await Auth.authenticate(user.email, oldPassword);
        } catch (err) {
            setStateErrors([
                __('Old password is not correct')
            ]);
        }
        user.updatePassword(newPassword);
    }

    if (newPassword !== '' && confirmNewPassword !== '' && newPassword !== confirmNewPassword) {
        localErrors.push(__('New and confirm new passwords do not match'));
    }

    const errors: string[] = [
        ...stateErrors,
        ...localErrors
    ];

    return <>
        <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Password</h3>
                <p className="mt-1 text-sm text-gray-600">
                    Change your password for Veggie Grow.
                </p>
            </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
            <Form onSubmit={changePassword}>
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                    {
                        errors.length ? <div className="w-full">
                                { errors.map((error: string, index: number) => <div className="w-full bg-red-400 text-white text-center" key={index}>{error}</div>) }
                            </div>
                        : ''
                    }
                    <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                        <div className="grid grid-cols-3 gap-6">
                            <Form.Group className="col-span-3 sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Old Password
                                </label>
                                <div className="mt-1">
                                    <Form.Password
                                        name="old_password"
                                        value={oldPassword}
                                        onChange={(evt) => setOldPassword(evt.target.value) }
                                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>
                            </Form.Group>
                            <Form.Group className="col-span-3 sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    New Password
                                </label>
                                <div className="mt-1">
                                    <Form.Password
                                        name="new_password"
                                        value={newPassword}
                                        onChange={(evt) => setNewPassword(evt.target.value) }
                                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>
                            </Form.Group>
                            <Form.Group className="col-span-3 sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Confirm New Password
                                </label>
                                <div className="mt-1">
                                    <Form.Password
                                        name="confirm_new_password"
                                        value={confirmNewPassword}
                                        onChange={(evt) => setConfirmNewPassword(evt.target.value) }
                                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>
                            </Form.Group>
                        </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                            Update
                        </button>
                    </div>
                </div>
            </Form>
        </div>
    </>
}

export default Password;
