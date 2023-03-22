import { atom } from 'jotai';
import { Polarities, RestaurantCategorySentiment } from '../types/types';

const defaultPolarities: Polarities = {
	count: 0,
	positive: 0,
	negative: 0,
	neutral: 0,
};
export const polaritiesAtom = atom<Polarities>(defaultPolarities);

const aspectCategoryPolarities: RestaurantCategorySentiment = {};

export const aspectCategoryPolaritiesAtom =
	atom<RestaurantCategorySentiment>(aspectCategoryPolarities);
