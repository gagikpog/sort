import { Sort } from "../engine/sorting.js";

export interface IViewCfg {
    sort: Sort;
    ctx: CanvasRenderingContext2D;
}

export class View {
    private _sort: Sort;

    private _subscribeId: string;

    private _ctx: CanvasRenderingContext2D;

    constructor(cfg: IViewCfg) {
        this._sort = cfg.sort;
        this._ctx = cfg.ctx;

        this._subscribeId = this._sort.subscribeToChange(() => {
            this.draw()
        });

        this._initDisplay();
        this.draw();
    }

    private _initDisplay() {
        this._ctx.canvas.width = window.innerWidth - 20;
        this._ctx.canvas.height = window.innerHeight - 40;
    }

    destroy() {
        if (this._subscribeId) {
            this._sort.unsubscribeToChange(this._subscribeId);
        }
    }

    draw() {
        this._ctx.fillStyle = '#fff';
        const width = this._ctx.canvas.width;
        const height = this._ctx.canvas.height;
        this._ctx.clearRect(0, 0, width, height);

        const data = this._sort.getData();
        const size = data.length;
        const padding = 1;
        const w = width / size;
        const h = height / (size)

        data.forEach((value: number, index): void => {
            this._ctx.fillRect(index * w, height - h * value , w - padding, h * value);
        });
    }
}
