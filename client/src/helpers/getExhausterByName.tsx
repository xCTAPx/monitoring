// @ts-ignoretsingnore
export const getExhausterByName = (name: string, data: Object): string => {
    for (let key in data) {
        // @ts-ignoretsingnore
        const exData = data[key];
        // @ts-ignoretsingnore

        if (data[key]['name'] as string === name) {
            // @ts-ignoretsingnore
            return key
        }
    }
}