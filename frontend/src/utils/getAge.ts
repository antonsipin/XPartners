export function getAge(dateString: string) {
    const dateArr = dateString.split('-')
    const day = Number(dateArr[2])
    const month = Number(dateArr[1])
    const year = Number(dateArr[0])

    const today = new Date()
    const birthDate = new Date(year, month - 1, day)
    let age = today.getFullYear() - year
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--
    }
    return age;
}