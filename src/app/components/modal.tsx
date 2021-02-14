
import * as React from 'react';

export interface ModalProps {
    children?: React.ReactChild;
    title: string;
    submit: string;
    cancel: string;
    onSubmit: any;
    onClose: any;
    'x-wide'?: boolean;
}

export const Modal = (props: ModalProps) => {
    const modalClasses = [
        'inline-block', 'align-bottom', 'bg-white', 'rounded-lg', 'text-left',
        'overflow-hidden', 'shadow-xl', 'transform', 'transition-all', 'sm:my-8',
        'sm:align-middle', 'w-full'
    ];

    modalClasses.push(props['x-wide'] ? 'sm:max-w-2xl' : 'sm:max-w-lg');

    return <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className={modalClasses.join(' ')} role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        <div className="mt-3 w-full text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">{props.title}</h3>
                            <div className="mt-2">
                                {props.children}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button type="button" onClick={props.onSubmit} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm">
                        {props.submit}
                    </button>
                    <button type="button" onClick={props.onClose} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                        {props.cancel}
                    </button>
                </div>
                </div>
            </div>
        </div>
}

export default Modal;
