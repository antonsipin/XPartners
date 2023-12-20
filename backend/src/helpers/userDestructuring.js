const userDestructuring = (user) => {
    return {
        name: user.name,
        gender: user.gender,
        birthDate: user.birthDate,
        photo: user.photo,
        accessToken: user.accessToken,
        refreshToken: user.refreshToken
    }
}

module.exports = userDestructuring