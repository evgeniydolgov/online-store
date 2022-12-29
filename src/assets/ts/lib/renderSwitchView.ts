import { store } from '../store';
import { getSwitchViewHtml } from './getSwitchViewHtml';

export const renderSwitchView = async () => {
    const switcherViewDiv = document.querySelector('#switcher_view');

    if (!switcherViewDiv) throw new Error('Cant find switcher div in document');

    const switcherViewHtml = await getSwitchViewHtml(store.view_settings.mode);

    switcherViewDiv.innerHTML = '';
    switcherViewDiv.append(switcherViewHtml);
};
