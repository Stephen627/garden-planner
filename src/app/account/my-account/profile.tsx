import * as React from 'react';
import Form from '../../components/form';
import { Auth } from '../../utils/user';
import { db } from '../../utils/db';
import { storage } from '../../utils/storage';
import PromiseImage from '../../components/promise-image';

const { useEffect, useState } = React;

const Profile = () => {
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ profile, setProfile ] = useState(null);

    useEffect(() => {
        const id = Auth.currentUser().uid;

        db.get(`user_details/${id}`).then((data) => {
            setFirstName(data.first_name);
            setLastName(data.last_name);
            setProfile(data.profile || null);
        });
    }, []);

    const updateData = () => {
        const id = Auth.currentUser().uid;

        if (profile instanceof File) {
            storage.set(`${id}/profile`, profile).then(() => {
                db.set(`user_details/${id}`, {
                    first_name: firstName,
                    last_name: lastName,
                    profile: 'profile'
                });
            });
        } else {
            db.set(`user_details/${id}`, {
                first_name: firstName,
                last_name: lastName,
                profile: profile
            });
        }
    }

    const onFileUpload = (evt: React.ChangeEvent<HTMLInputElement>) => {
        if (typeof evt.target.files[0] === 'undefined') {
            return;
        }
        const file = evt.target.files[0];
        console.log(file);
        setProfile(file);
    }
    
    const getImagePromise = async (url: string): Promise<string> => {
        if (profile === null) {
            return '';
        }
        if (profile instanceof File) {
            return await new Promise((resolve) => {
                const reader = new FileReader();
                reader.addEventListener('load', () => {
                    resolve(reader.result.toString());
                }, false);
                reader.readAsDataURL(profile);
            });
        }

        const uid = Auth.currentUser().uid || null;
        return await storage.get(`${uid}/${url}`);
    }

    return <>
        <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Profile</h3>
                <p className="mt-1 text-sm text-gray-600">
                    This information is only to make the website more personalised.
                </p>
            </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
            <Form onSubmit={updateData}>
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                    <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                        <div className="grid grid-cols-3 gap-6">
                            <Form.Group className="col-span-3 sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    First Name
                                </label>
                                <div className="mt-1">
                                    <Form.Text
                                        name="first_name"
                                        value={firstName}
                                        onChange={(evt) => setFirstName(evt.target.value) }
                                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>
                            </Form.Group>
                            <Form.Group className="col-span-3 sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Last Name
                                </label>
                                <div className="mt-1">
                                    <Form.Text
                                        name="last_name"
                                        value={lastName}
                                        onChange={(evt) => setLastName(evt.target.value) }
                                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>
                            </Form.Group>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Photo
                            </label>
                            <div className="mt-2 flex items-center">
                                <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                                    {
                                        profile ?
                                        <PromiseImage imagePromise={getImagePromise(profile)} alt="Profile" className="h-full w-full object-cover text-gray-300"></PromiseImage>
                                        :
                                        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                    }
                                </span>
                                <label className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                                    Change
                                    <Form.FileUpload
                                        onChange={onFileUpload}
                                        className="hidden"
                                        name="profile"
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                            Save
                        </button>
                    </div>
                </div>
            </Form>
        </div>
    </>
}

export default Profile;
