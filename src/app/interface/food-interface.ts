export interface Food {
    name:string,
    quantity: number,
    size:number
}

export interface FoodHistory{
    todayCalorieIntake: number
    foodHistory: foodHistory[]
}

export interface foodHistory{
    name:string,
    quantity:number,
    size:number,
    calories:number
    date:string,
    fat:number,
    protein: number,
    carbohydrates:number
}