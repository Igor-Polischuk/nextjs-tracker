import * as yup from 'yup'

export type CreateFoodForm = {
    foodName: string;
    energy: number;
    proteins: number;
    fats: number;
    carbohydrates: number;
}

export const CreateFoodSchema = yup.object({
    foodName: yup.string().min(2).max(100).required(),
    energy: yup.number().min(0).max(1000).required(),
    proteins: yup.number().min(0).max(1000).required(),
    fats: yup.number().min(0).max(1000).required(),
    carbohydrates: yup.number().min(0).max(1000).required(),
})