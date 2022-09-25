import { SortAdapter } from "./sortAdapter.js";

interface ISortCfg {
    size: number;
}

export class Sort {

    private _array: number[] = [];

    private _subscribers: {[key: string]: () => void;} = {};

    private _lastKey = 0;

    constructor(cfg: ISortCfg) {
        this._generateArray(cfg.size);
        this.shuffle();
    }

    private _generateArray(size: number): void {
        this._array = new Array(size).fill(null).map((_, index) => index + 1);
    }

    onChange() {
        Object.keys(this._subscribers).forEach((key: string) => this._subscribers[key]());
    }

    subscribeToChange(func: () => void): string {
        const key = `l-${this._lastKey}`;
        this._lastKey++;
        this._subscribers[key] = func;
        return key;
    }

    unsubscribeToChange(key: string): void {
        delete this._subscribers[key];
    }

    shuffle(): void {
        const arr = this._array;
        for (let i = arr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    getAdapter(): SortAdapter {
        return new SortAdapter(this);
    }

    getData(): number[] {
        return this._array;
    }
}
