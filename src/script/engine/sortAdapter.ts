import { Sort } from "./sorting.js";

interface ISortAdapter {
    length: number;
    get: (index: number) => number;
    set: (index: number, value: number) => Promise<boolean>;
    swap: (index1: number, index2: number) => Promise<boolean>;
}

export class SortAdapter implements ISortAdapter {

    private _sort: Sort;

    private _loading = false;

    constructor(sort: Sort) {
        this._sort = sort;
    }

    get length() {
        return this._sort.getData().length;
    }

    get(index: number): number {
        this._checkIsDestroy();
        this._checkLoading();
        const data = this._sort.getData();
        this._validateIndex(index);

        return data[index];
    }

    set(index: number, value: number): Promise<boolean> {
        this._checkIsDestroy();
        this._checkLoading();
        return this._timeResolver().then(() => {
            this._checkIsDestroy();
            const data = this._sort.getData();
            this._validateIndex(index);
            data[index] = value;
            this._sort.onChange();
            return true;
        });
    }

    swap(index1: number, index2: number): Promise<boolean> {
        this._checkIsDestroy();
        this._checkLoading();
        return this._timeResolver().then(() => {
            this._checkIsDestroy();
            const data = this._sort.getData();
            this._validateIndex(index1);
            this._validateIndex(index2);

            [data[index1], data[index2]] = [data[index2], data[index1]];
            this._sort.onChange();
            return true;
        });
    }

    private _validateIndex(index: number): void {
        const data = this._sort.getData();
        if (index < 0 || index > data.length) {
            throw new Error(`index "${index}" out of range'`);
        }
    }

    private _checkLoading(): void {
        if (this._loading) {
            throw new Error('Wait for the operation to complete');
        }
    }

    private _checkIsDestroy(): void {
        if (this._sort.isDestroyed()) {
            throw new Error('Stopped');
        }
    }

    private _timeResolver(time: number = 10): Promise<void> {
        this._loading = true;
        return new Promise((res) => setTimeout(() => {
            this._loading = false;
            res();
        }, time));
    }
}
