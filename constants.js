export const  user_routes_path = {
    register:'/register',
    login:'/login',
    getOne:'/get',
    delete:'/delete',
    getWithPage:'/list/:page',
    address:'/address',
    getwithAdd:'/get/:id',
    forgotPassword:'/forgot-password',
    resetPassword:'/verify-reset-password'
}

export const user_res_mess={
    notFound:'User not found',
    signup:'User successfully registered',
    login:'User successfully login',
    deleted:'User successfully deleted',
    notMatch:'Incorrect password or email',
    misMatch:'Password and confirm password not match',
    exists:"Email or username already exists. please login",
    found:'User found successfully ',
    add_created:'User address created successfully',
    notValid:'Input field is not valid',
    passwordReset:'Password have successfully reset'
}