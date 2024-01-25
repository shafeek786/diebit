export interface weight {
    id:string
    weight:number
}

export interface WeightHistoryData{
    todayWeightHistory: WeightHistory[]
}

export interface WeightHistory{
    weight:number
    date:string
}

