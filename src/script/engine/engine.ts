import { View } from '../view/view.js';
import { Sort } from './sorting.js';
import { SortAdapter } from './sortAdapter.js';

interface IEnginCfg {
    size: number;
    ctx: CanvasRenderingContext2D;
}

export class Engine {
    private _view: View;

    private _sorting: Sort;

    constructor(cfg: IEnginCfg) {
        this._sorting = new Sort({ size: cfg.size });
        this._view = new View({ sort: this._sorting, ctx: cfg.ctx });
    }

    destroy() {
        this._view.destroy();
    }

    sort(sorter: (adapter: SortAdapter) => Promise<boolean>) {
        sorter(this._sorting.getAdapter()).then(() => {

        });
    }
}
