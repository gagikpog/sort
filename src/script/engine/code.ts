const sorting = [`
    // bubble sorting
    for(let i = 0; i < data.length; i++) {
        for(let j = 0; j < data.length - i - 1; j++) {
            if (data.get(j) > data.get(j + 1)) {
                await data.swap(j, j + 1);
            }
        }
    }
    return true;`,`
    // gnome sorting
    for(let i = 1; i < data.length; i++) {
        let j = i;
        while(j > 0 && data.get(j) < data.get(j - 1)) {
            await data.swap(j, j - 1);
            j--;
        }
    }
    return true;`, `
    // insert sorting
    for(let i = 1; i < data.length; i++) {
        let j = i;
        const val = data.get(j);

        while(j > 0 && val < data.get(j - 1)) {
            await data.set(j, data.get(j - 1));
            j--;
        }
        await data.set(j, val);
    }

    return true;`
];

export const code =
`/**
 * interface IData {
 *   length: number;
 *   get: (index: number) => number;
 *   set: (index: number, value: number) => Promise<boolean>;
 *   swap: (index1: number, index2: number) => Promise<boolean>;
 * }
 * @params { IData } data implements interface IData
 * @returns { Promise<boolean>}
 */
async function sorting(data) {${sorting[Math.floor(Math.random() * sorting.length)]}
}
`;
