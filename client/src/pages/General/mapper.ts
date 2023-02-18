type Obj = {
    [key: string]: any
}

export function mapData(data: Obj): object {
    const res = []

    for (let key in data) {
        res.push({ name: key, ...data[key] })
    }

    console.log(res)

    return data
}
