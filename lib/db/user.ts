import { prisma } from ".";

export async function getCurrentUser() {
    const user = await prisma.user.findFirst({
        where: {
            username: 'Igor',
        }
    })

    if (!user) {
        throw new Error('User not found')
    }

    return user;
}