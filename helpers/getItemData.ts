import Collection from "../models/Collection";

export const getItemData = async (id: string) =>{
    const itemData: any = await Collection.findOne({'items.id': id}, {'items.$': id, 'title': id});
    return itemData;

}