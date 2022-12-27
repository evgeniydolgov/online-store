import { CardView } from '../../enums/cardView';
import { store } from '../store';
import { renderShopCards } from './renderShopCards';

const CARD_VIEW_KEY = 'mode';

export const getCardViewFromUrl = () => {
    const url = new URL(location.href);

    const view = url.searchParams.get(CARD_VIEW_KEY);

    if (view && view === CardView.tile) return view;

    return CardView.simple;
};

export const setCardView = (newView: CardView) => {
    store.view_settings.mode = newView;

    const url = new URL(location.href);

    url.searchParams.set(CARD_VIEW_KEY, newView.toString());

    // location.href = decodeURIComponent(url.toString());
    history.pushState(null, '', decodeURIComponent(url.toString()));
    renderShopCards('#goods');
};
