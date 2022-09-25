import { Engine } from "./src/script/engine/engine.js";
import { code } from "./src/script/engine/code.js";
let engine: Engine = null as unknown as Engine;

interface IEditor {
    getValue: () => string;
}

let editor: IEditor = null as unknown as IEditor;

window.addEventListener('DOMContentLoaded', (event) => {
    loadEditor();

    document.querySelector('#run')?.addEventListener('click', (event: Event) => {
        const btn: HTMLSpanElement = event.target as HTMLSpanElement;
        const displayContainer = document.querySelector('.display') as HTMLDivElement;

        if (btn.innerText == 'run') {
            const code = editor.getValue();
            eval(`window.sorting = ${code}`);
            loadDisplay();
            btn.innerText = 'stop';
            displayContainer.style.display = 'flex';

        } else {
            btn.innerText = 'run';
            displayContainer.style.display = 'none';
            engine?.destroy();
            engine = null as unknown as Engine;
        }
    });
});

function loadDisplay() {
    const display = document.querySelector('#display') as HTMLCanvasElement;
    const ctx = display?.getContext('2d') as CanvasRenderingContext2D;
    if (ctx) {
        engine?.destroy();
        engine = new Engine({ ctx, size: 100 });
        // @ts-ignore
        engine.sort(window.sorting);
    }
}

function loadEditor() {
    // @ts-ignore
    require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.26.1/min/vs' }});
    // @ts-ignore
    require(["vs/editor/editor.main"], () => {
        // @ts-ignore
        editor = monaco.editor.create(document.getElementById('container'), {
            value: code,
            language: 'javascript',
            theme: 'vs-dark',
        });
    });
}
