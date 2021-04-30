import { SET_META } from '../constants/actionTypes';

const meta = (meta = {
    title: 'MEmories',
    link: {
        rel: 'icon',
        href: '%PUBLIC_URL%/photos.favicon.ico'
    },
    meta: {
        'charset': 'utf-8',
        'viewport': 'width=device-width, initial-scale=1',
        'theme-color': '#000000',
        'description': 'A place to post your MEmories!',
        'title': 'MEmories by katyperrycbt',
        'og:type': 'website',
        'og:url': 'https://www.oopsmemories.site/',
        'og:title': 'MEmories for Facebook CUstom',
        'og:description': 'A place to post your MEmories!',
        'og:image': 'https://res.cloudinary.com/katyperrycbt/image/upload/v1615297494/Web_capture_5-3-2021_145319_memories-thuckaty.netlify.app_hrcwg6.jpg'
    }
}, action) => {
    switch (action.type) {
        case SET_META:
            return action?.data;
        default:
            return meta;
    }
}

export default meta;
