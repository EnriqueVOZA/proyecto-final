export const isFriend = (friendsArray, userId) => {
    console.log('alooo', friendsArray, userId)
    return friendsArray.find(elm => {
        return elm === userId
    })
}