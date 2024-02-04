export interface Plan {
  _id: string
  planType: string;
  price: number;
  blog: boolean;
  chat: boolean;
  trainer: boolean;
  progressTracking: boolean;
  workoutPlan: boolean;
  videoCall: boolean;
}

export interface PlanData{
    plans: Plan[]
}

export interface PlanId{
  id:string
}

export interface PlanResponse{
  plan: Plan
}

export interface planApiResponse{
  message:string
}

export interface SubscriptionStatus{
  isActive:boolean
}

export interface PlanResponse{
  planName:string
}