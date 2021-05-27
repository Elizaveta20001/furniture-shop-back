export const search = (str: string, array: any) => {
    const lowerStr = str.toLowerCase();
    const result: any[] = [];
    array.forEach((elem: any) => {
        if(elem.title.toLowerCase().includes(lowerStr)){
            result.push(...elem.items.map(
                (item: any) => {
                    item.collectionName = elem.title.toLowerCase()
                    return item;
                })
            );
        }

        elem.items.forEach((item: any) => {
            if(item.title.toLowerCase().includes(lowerStr)){
                item.collectionName = elem.title.toLowerCase();
                result.push(item);
            }
        })
    });

    return result.filter((item, index) => {
        return index === result.findIndex(obj => {
            return JSON.stringify(obj) === JSON.stringify(item);
        })
    });
}
