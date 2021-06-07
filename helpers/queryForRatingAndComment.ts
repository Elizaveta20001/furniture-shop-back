export const getQuery = (type: string, userId: string) => {
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
                                "title": "$$items.title",
                                "url": "$$items.url",
                                "id": "$$items.id",
                                "price": "$$items.price",
                                "description": "$$items.description"
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
    })
}