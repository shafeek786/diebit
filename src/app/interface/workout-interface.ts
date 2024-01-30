export interface workout{
    name:string
    duration: number
    calories: number
    effortLevel: string
    date: Date
}

export interface WorkoutHistory{
    burnedCalories : number
    workoutHistory:workout[]
}