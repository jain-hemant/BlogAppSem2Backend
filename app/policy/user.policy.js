const  USER_ROLES = {
    GUEST: 'guest',
    USER: 'user',
    CREATOR: 'creator',
    ADMIN: 'admin',
}


export const policy = {
    [USER_ROLES.GUEST]:['/api/user/create']
}