import navMenuEn from './en/navMenu.json';
import pageNotFoundEn from './en/pageNotFound.json';
import viewsEn from './en/views.json';

const resources = {
  en: {
    navMenu: navMenuEn,
    pageNotFound: pageNotFoundEn,
    views: viewsEn,
  },
};
export const languages = Object.keys(resources);

export default resources;
