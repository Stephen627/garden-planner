export const hardinessInfo: { [key: string]: { temperature: string, category: string, definition: string }} = {
    'H1a': {
        'temperature': 'Warmer than 15ºC (59ºF)',
        'category': 'Heated glasshouse - tropical',
        'definition': 'Needs to be grown as a house plant or under glass all year round.'
    },
    'H1b': {
        'temperature': '10ºC to 15ºC (50ºF to 59ºF)',
        'category': 'Heated glasshouse - subtropical',
        'definition': 'Can be grown outdoors in summer in sunny and sheltered locations but generally performs best as a house plant or under glass all year round.'
    },
    'H1c': {
        'temperature': '5ºC to 10ºC (41ºF to 50ºF)',
        'category': 'Heated glasshouse - warm temperate',
        'definition': 'Can be grown outdoors in summer throughout most of the UK while daytime temperatures are high enough to promote growth.'
    },
    'H2': {
        'temperature': '1ºC to 5ºC (34ºF to 41ºF)',
        'category': 'Tender - cool or frost-free glasshouse',
        'definition': 'Tolerant of low temperatures but will not survive being frozen. Except in frost-free inner-city areas or coastal extremities requires glasshouse conditions in winter, but can be grown outdoors once risk of frost is over'
    },
    'H3': {
        'temperature': '-5ºC to 1ºC (23ºF to 34ºF)',
        'category': 'Half-hardy - unheated glasshouse / mild winter',
        'definition': 'Hardy in coastal / mild areas except in hard winters and at risk from sudden (early) frosts. May be hardy elsewhere with wall shelter or good microclimate. Can survive with artificial winter protection.'
    },
    'H4': {
        'temperature': '-10ºC to -5ºC (14ºF to 23ºF)',
        'category': 'Hardy - average winter',
        'definition': 'Hardy through most of the UK apart from inland valleys, at altitude and central / northerly locations. May suffer foliage damage and stem dieback in harsh winters in cold gardens. Plants in pots are more vulnerable.'
    },
    'H5': {
        'temperature': '-15ºC to -10ºC (5ºF to 14ºF)',
        'category': 'Hardy - cold winter',
        'definition': 'Hardy through most of the UK even in severe winters. May not withstand open or exposed sites or central / northerly locations. Many evergreens suffer foliage damage and plants in pots will be at increased risk.'
    },
    'H6': {
        'temperature': '-20ºC to -15ºC (-4ºF to 5ºF)',
        'category': 'Hardy - very cold winter',
        'definition': 'Hardy throughout the UK and northern Europe. Many plants grown in containers will be damaged unless given protection.'
    },
    'H7': {
        'temperature': 'Colder than -20ºC (-4ºF)',
        'category': 'Very hardy',
        'definition': 'Hardy in the severest European continental climates including exposed upland locations in the UK.'
    }
}

export enum Hardiness {
    'H1a' = 'H1a',
    'H1b' = 'H1b',
    'H1c' = 'H1c',
    'H2' = 'H2',
    'H3' = 'H3',
    'H4' = 'H4',
    'H5' = 'H5',
    'H6' = 'H6',
    'H7' = 'H7'
}

interface Plant {
    name: string;
    icon: string;
    hardiness: string;
    sow?: boolean[];
    plantOut?: boolean[];
    harvest?: boolean[];
}

export default Plant;
