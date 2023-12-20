export type UserState = {
    user: {
        name: string
        photo: string
        gender: string
        birthDate: string
        accessToken: string
        refreshToken: string
    },
    error: string,
}