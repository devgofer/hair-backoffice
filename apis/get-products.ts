import type {Product} from "~/models/product";

export const getProducts = async (): Promise<Product[]> => {
    return [
        {
            "hidden_period": "官網",
            "store_code": "H-W02_A110",
            "name": "頭皮保濕噴霧【控油平衡露】所有人都需要的頭皮化妝水",
            "price": 750,
            "cost": 750,
            "inventory": "",
            "profit": 0,
            "profit_margin": "0%",
            "on_shelf": false,
            "frontend_display": false
        },
        {
            "hidden_period": "官網",
            "store_code": "H-W01_A110",
            "name": "藝人熱愛的問題頭皮噴霧【調理精華露】",
            "price": 1500,
            "cost": 1500,
            "inventory": "",
            "profit": 0,
            "profit_margin": "0%",
            "on_shelf": true,
            "frontend_display": true
        },
        {
            "hidden_period": "",
            "store_code": "XH-R33_000991",
            "name": "8 折加購 - 晶萃凝露",
            "price": 600,
            "cost": 600,
            "inventory": "",
            "profit": 0,
            "profit_margin": "0%",
            "on_shelf": true,
            "frontend_display": false
        }
    ]
}
