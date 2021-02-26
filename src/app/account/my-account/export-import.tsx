import * as React from 'react';
import * as JSZip from 'jszip';

import Form from '../../components/form';
import Loading from '../../components/loading';

import { getUserZipFolder } from '../../utils/download-file';
import Plant from '../../utils/database/plant';
import { storage } from '../../utils/storage';
import { Auth } from '../../utils/user';
import { db } from '../../utils/db';
import { __ } from '../../utils/lang';

const { useState, useEffect } = React;

export interface Props {

}

const exportData = async () => {
    const zip = await getUserZipFolder();
    const blob = await zip.generateAsync({type: 'blob'});

    return blob;
}

const importData = async (evt: React.ChangeEvent<HTMLInputElement>, setSuccess: Function) => {
    if (typeof evt.target.files[0] === 'undefined') {
        return;
    }

    const file: File = evt.target.files[0];
    const zip: JSZip = await JSZip.loadAsync(file);
    const dataString: string = await zip.file('data.json').async('string');
    const data = JSON.parse(dataString);
    const uid = Auth.currentUser().uid;

    const plantKeys: string[] = Object.keys(data.plants);
    for (let i = 0; i < plantKeys.length; i++) {
        const key = plantKeys[i];

        const plant: Plant = data.plants[key];
        if (plant.icon) {
            const file: Blob = await zip.file(`images/${plant.icon}`).async('blob');
            await storage.set(`${uid}/${plant.icon}`, file);
        }
        
        await db.set(`${uid}/plants/${key}`, plant);
    }

    const gardenKeys: string[] = Object.keys(data.gardens);
    for (let i = 0; i < gardenKeys.length; i++) {
        const key = gardenKeys[i];
        await db.set(`${uid}/gardens/${key}`, data.gardens[key]);
    }

    if (data.user_details) {
        if (data.user_details.profile) {
            const file: Blob = await zip.file(`images/${data.user_details.profile}`).async('blob');
            await storage.set(`${uid}/${data.user_details.profile}`, file);
        }

        await db.set(`${uid}/user_details`, data.user_details);
    }

    setSuccess(true);
}

const ExportImport: React.FC<Props> = (props: Props) => {
    const [ data, setData ] = useState(null);
    const [ loadingExport, setLoadingExport ] = useState(false);
    const [ importSuccess, setImportSuccess ] = useState(false);

    const exportAttr = data === null
        ? {
            onClick: () => {
                setLoadingExport(true);
                exportData().then((blob) => {
                    setData(blob);
                    setLoadingExport(false);
                })
            },
        }
        : {
            target: '_blank',
            download: 'veggie-grow-export.zip',
            href: URL.createObjectURL(data)
        };

    return <>
        <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Export / Import Data</h3>
                <p className="mt-1 text-sm text-gray-600">
                    Export or import your Veggie Grow data.
                </p>
            </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="shadow sm:rounded-md sm:overflow-hidden">
                {
                    importSuccess ? <div className="w-full">
                            <div className="w-full bg-green-400 text-center text-white">{ __('Import success') }</div>
                        </div>
                    : ''
                }
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <div className="grid grid-cols-3 gap-6">
                        <Form.Group className="col-span-3 sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Export
                            </label>
                            <div className="mt-1">
                                {
                                    loadingExport  ? <Loading/> :
                                    <a
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 cursor-pointer"
                                        { ...exportAttr }
                                    >
                                        { data === null ? 'Generate Export' : 'Download Export' }
                                    </a>
                                }
                            </div>
                        </Form.Group>
                    </div>
                </div>
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <div className="grid grid-cols-3 gap-6">
                        <Form.Group className="col-span-3 sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Import
                            </label>
                            <div className="mt-1">
                                <label
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                                >
                                    <Form.FileUpload
                                        className="hidden"
                                        name="upload"
                                        onChange={(evt) => importData(evt, setImportSuccess)}
                                    />
                                    Import
                                </label>
                            </div>
                        </Form.Group>
                    </div>
                </div>
            </div>
        </div>
    </>;
}

export default ExportImport;
