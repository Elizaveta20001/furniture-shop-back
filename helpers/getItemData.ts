import Collection from "../models/Collection";


export const getItemData = async (id: number) => {
    const itemData: any = await Collection.findOne({'items.id': id}, {'items.$': id, 'title': id});
    return itemData;
}