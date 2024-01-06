import { prisma } from ".";

export async function getDailyNutritionData(day: Date, userId: number) {
    const startOfDay = new Date(day);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(day);
    endOfDay.setHours(23, 59, 59, 999);

    const data = await prisma.nutrition.findMany({
        where: {
            date: {
                gte: startOfDay,
                lte: endOfDay,
            },
            userId: {
                id: userId
            }
        },
        include: {
            food: true
        }
    });

    return data;
}