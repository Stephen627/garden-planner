
export const onLongClick = (element: HTMLElement, handler: Function, holdDuration: number = 500) => {
    let timeout: number;
    element.addEventListener('mousedown', () => {
        timeout = setTimeout(handler, holdDuration);
    });
    element.addEventListener('mouseup', () => {
        clearTimeout(timeout);
    });
}
