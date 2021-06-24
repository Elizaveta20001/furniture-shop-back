export const getQuery = (type: string, userId: string) => {
    const information: { [k: string]: any } = {
        "title": "$$items.title",
        "url": "$$items.url",
        "id": "$$items.id",
        "price": "$$items.price",
        "description": "$$items.description"
    }
    if(type === 'comments'){
        information["rating"] = "$$items.rating";
    }
    return ({
        "$addFields": {
            "items": {
                "$filter": {
                    "input": {
                        "$map": {
                            "input": "$items",
                            "as": "items",
                            "in": {
                                [`${type}`]: {
                                    "$filter": {
                                        "input": `$$items.${type}`,
                                        "as": type,
                                        "cond": {
                                            "$eq": [`$$${type}.userId`, userId]
                                        }
                                    }
                                },
                               ...information
                            }
                        },
                    },
                    "as": "items",
                    "cond": {
                        "$gt": [{"$size": `$$items.${type}`}, 0]
                    }
                }
            }
        }
    });
};