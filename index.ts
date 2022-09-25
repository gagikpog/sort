import { Engine } from "./src/script/engine/engine.js";
import * as sorting from "./src/script/sorting.js";

window.addEventListener('DOMContentLoaded', (event) => {
    const display = document.querySelector('#display') as HTMLCanvasElement;
    const ctx = display?.getContext('2d') as CanvasRenderingContext2D;
    if (ctx) {
        const engine = new Engine({ ctx, size: 200 });

        engine.sort(sorting.insert);
    }
});
