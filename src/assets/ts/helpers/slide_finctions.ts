import { renderValueFilters } from '../lib/renderFilters';
import { renderGoodsCount } from '../lib/renderGoodsCount';
import { renderShopCards } from '../lib/renderShopCards';
import { store } from '../store';

export class dualRangeSlider {
    range;
    min;
    max;
    prevMin;
    prevMax;
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
        this.startPos = 0;
        this.activeHandle;
        this.minCost = document.getElementById(minId) as HTMLElement;
        this.maxCost = document.getElementById(maxId) as HTMLElement;

        this.handles.forEach((handle) => {
            (handle as HTMLElement).addEventListener('mousedown', this.startMove.bind(this));
        });

        window.addEventListener('mouseup', this.stopMove.bind(this));
        window.addEventListener('touchend', this.stopMove.bind(this));
        window.addEventListener('touchcancel', this.stopMove.bind(this));
        window.addEventListener('touchleave', this.stopMove.bind(this));

        const min_value = parseInt(String(left.dataset.value));
        const max_value = parseInt(String(right.dataset.value));

        this.prevMin = min_value;
        this.prevMax = max_value;

        this.setThumbsPosition(min_value, max_value);
    }

    public setThumbsPosition(valLeft: number, valRight: number) {
        if (valLeft === 0 && valRight === 0) return;
        const left = this.range.querySelector('.handle.left');
        const right = this.range.querySelector('.handle.right');

        const rangeRect = this.range.getBoundingClientRect();
        const handleRect = this.handles[0].getBoundingClientRect();

        if (!(left instanceof HTMLElement) || !(right instanceof HTMLElement)) throw new Error('No divs for slider');

        this.prevMin = valLeft;
        this.prevMax = valRight;

        const min_position = ((valLeft - this.min) / this.max) * (rangeRect.width - handleRect.width / 2) + 'px';
        let max_position = rangeRect.width - handleRect.width / 2 + 'px';

        if (this.max - valRight !== 0)
            max_position = (valRight / this.max) * (rangeRect.width - handleRect.width / 2) + 'px';

        this.range.style.setProperty('--x-1', min_position);
        this.range.style.setProperty('--x-2', max_position);

        this.minCost.textContent = `${valLeft}`;
        this.maxCost.textContent = `${valRight}`;
    }

    private startMoveTouch(e: TouchEvent): void {
        const handleRect = (e.target as HTMLElement).getBoundingClientRect();
        this.startPos = e.touches[0].clientX - handleRect.x;
        this.activeHandle = e.target as HTMLElement;
        this.moveTouchListener = this.moveTouch.bind(this);
        window.addEventListener('touchmove', this.moveTouchListener);
    }

    private startMove(e: MouseEvent) {
        this.startPos = e.offsetX;
        this.activeHandle = e.target as HTMLElement;
        this.moveListener = this.move.bind(this);
        window.addEventListener('mousemove', this.moveListener);
    }

    private moveTouch(e: TouchEvent) {
        this.move({ clientX: e.touches[0].clientX });
    }

    private move(e: { clientX: number }) {
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

        this.minCost.textContent = `${this.handles[0].dataset.value}`;
        this.maxCost.textContent = `${this.handles[1].dataset.value}`;
    }

    private calcHandleValue(percentage: number): number {
        return Math.round(percentage * (this.max - this.min) + this.min);
    }

    private stopMove() {
        window.removeEventListener('mousemove', this.moveListener);
        window.removeEventListener('touchmove', this.moveTouchListener);

        if (
            this.prevMin === parseInt(String(this.handles[0].dataset.value)) &&
            this.prevMax === parseInt(String(this.handles[1].dataset.value))
        )
            return;
        const url = new URL(location.href);

        const min_value = this.handles[0].dataset.value;
        const max_value = this.handles[1].dataset.value;

        if (!min_value || !max_value) throw new Error('No data min max');

        store.filters_settings[this.filter_name] = [min_value, max_value];

        url.searchParams.set(this.filter_name, store.filters_settings[this.filter_name].join(','));

        this.prevMin = parseInt(min_value);
        this.prevMax = parseInt(max_value);

        history.pushState(null, '', decodeURIComponent(url.toString()));

        renderShopCards('#goods');
        renderValueFilters();
        renderGoodsCount();
    }
}
