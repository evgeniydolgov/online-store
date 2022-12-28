// import { renderFilters } from '../lib/renderFilters';
import { renderGoodsCount } from '../lib/renderGoodsCount';
import { renderShopCards } from '../lib/renderShopCards';
import { store } from '../store';

export class dualRangeSlider {
    range;
    min;
    max;
    handles: HTMLElement[];
    filter_name: string;
    startPos;
    activeHandle: HTMLElement | undefined;
    moveTouchListener!: (e: TouchEvent) => void;
    moveListener!: (e: MouseEvent) => void;
    minCost: HTMLElement;
    maxCost: HTMLElement;
    constructor(rangeElement: HTMLElement, minId: string, maxId: string, filter_name: string) {
        this.filter_name = filter_name;
        this.range = rangeElement;
        this.min = Number(rangeElement.dataset.min);
        this.max = Number(rangeElement.dataset.max);
        const left = this.range.querySelector('.handle.left');
        const right = this.range.querySelector('.handle.right');

        if (!(left instanceof HTMLElement) || !(right instanceof HTMLElement)) throw new Error('No divs for slider');

        this.handles = [left, right];
        // this.handles = [...this.range.querySelectorAll('.handle')];
        this.startPos = 0;
        this.activeHandle;
        this.minCost = document.getElementById(minId) as HTMLElement;
        this.maxCost = document.getElementById(maxId) as HTMLElement;

        this.handles.forEach((handle) => {
            (handle as HTMLElement).addEventListener('mousedown', this.startMove.bind(this));
            (handle as HTMLElement).addEventListener('touchstart', this.startMoveTouch.bind(this));
        });

        window.addEventListener('mouseup', this.stopMove.bind(this));
        window.addEventListener('touchend', this.stopMove.bind(this));
        window.addEventListener('touchcancel', this.stopMove.bind(this));
        window.addEventListener('touchleave', this.stopMove.bind(this));

        const rangeRect = this.range.getBoundingClientRect();
        const handleRect = this.handles[0].getBoundingClientRect();

        // console.log(this.max, right.dataset.value);
        const min_value =
            (parseInt(String(left.dataset.value)) / this.max) * (rangeRect.width - handleRect.width / 2) + 'px';
        const max_value =
            (parseInt(String(right.dataset.value)) / this.max) * (rangeRect.width - handleRect.width / 2) + 'px';
        // this.range.style.setProperty('--x-1', '0px');
        this.range.style.setProperty('--x-1', min_value);
        this.range.style.setProperty('--x-2', max_value);
        // this.range.style.setProperty('--x-2', rangeRect.width - handleRect.width / 2 + 'px');
        // (this.handles[0] as HTMLElement).dataset.value = this.range.dataset.min;
        // (this.handles[1] as HTMLElement).dataset.value = this.range.dataset.max;

        this.minCost.textContent = `${left.dataset.value}`;
        this.maxCost.textContent = `${right.dataset.value}`;
        // this.minCost.textContent = `${this.range.dataset.min}`;
        // this.maxCost.textContent = `${this.range.dataset.max}`;
    }

    startMoveTouch(e: TouchEvent): void {
        const handleRect = (e.target as HTMLElement).getBoundingClientRect();
        this.startPos = e.touches[0].clientX - handleRect.x;
        this.activeHandle = e.target as HTMLElement;
        this.moveTouchListener = this.moveTouch.bind(this);
        window.addEventListener('touchmove', this.moveTouchListener);
    }

    startMove(e: MouseEvent) {
        this.startPos = e.offsetX;
        this.activeHandle = e.target as HTMLElement;
        this.moveListener = this.move.bind(this);
        window.addEventListener('mousemove', this.moveListener);
    }

    moveTouch(e: TouchEvent) {
        this.move({ clientX: e.touches[0].clientX });
    }

    move(e: { clientX: number }) {
        const isLeft = (this.activeHandle as HTMLElement).classList.contains('left');
        const property = isLeft ? '--x-1' : '--x-2';
        const parentRect = this.range.getBoundingClientRect();
        const handleRect = (this.activeHandle as HTMLElement).getBoundingClientRect();
        let newX = e.clientX - parentRect.x - this.startPos;

        if (isLeft) {
            const otherX = parseInt(this.range.style.getPropertyValue('--x-2'));
            newX = Math.min(newX, otherX - handleRect.width);
            newX = Math.max(newX, 0 - handleRect.width / 2);
        } else {
            const otherX = parseInt(this.range.style.getPropertyValue('--x-1'));
            newX = Math.max(newX, otherX + handleRect.width);
            newX = Math.min(newX, parentRect.width - handleRect.width / 2);
        }
        (this.activeHandle as HTMLElement).dataset.value = `${this.calcHandleValue(
            (newX + handleRect.width / 2) / parentRect.width
        )}`;
        this.range.style.setProperty(property, newX + 'px');
        (this.handles[0] as HTMLElement).addEventListener('click', () => {
            (this.handles[0] as HTMLElement).style.zIndex = `1`;
            (this.handles[1] as HTMLElement).style.zIndex = `0`;
        });
        (this.handles[1] as HTMLElement).addEventListener('click', () => {
            (this.handles[0] as HTMLElement).style.zIndex = `0`;
            (this.handles[1] as HTMLElement).style.zIndex = `1`;
        });
        this.minCost.textContent = `${(this.handles[0] as HTMLElement).dataset.value}`;
        this.maxCost.textContent = `${(this.handles[1] as HTMLElement).dataset.value}`;
    }

    calcHandleValue(percentage: number): number {
        return Math.round(percentage * (this.max - this.min) + this.min);
    }

    stopMove() {
        // console.log(this.handles);
        const url = new URL(location.href);

        const min_value = this.handles[0].dataset.value;
        const max_value = this.handles[1].dataset.value;

        if (!min_value || !max_value) throw new Error('No data min max');

        store.filters_settings[this.filter_name] = [min_value, max_value];

        // console.log(this.filter_name, store.filters_settings[this.filter_name].join(','));

        url.searchParams.set(this.filter_name, store.filters_settings[this.filter_name].join(','));

        history.pushState(null, '', decodeURIComponent(url.toString()));

        renderShopCards('#goods');
        // renderFilters();
        renderGoodsCount();
        console.log('stop slide', this);
        window.removeEventListener('mousemove', this.moveListener);
        window.removeEventListener('touchmove', this.moveTouchListener);
    }
}
