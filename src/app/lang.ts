// TODO make this dynamic
const LangMap = require('../langs/en_GB');
const lang = 'en_GB';

export const __ = (phrase: string): string => {
    if (typeof LangMap[phrase] !== 'undefined') {
        return LangMap[phrase];
    }
    return phrase;
}
