const usersDestructuring = (users) => {
    const resultUsers = users.map((user) => {
		return {
			name: user.name,
			photo: user.photo,
			birthDate: user.birthDate
		}
	})
	return resultUsers
}

module.exports = usersDestructuring