import { Request } from "express"
import { JwtPayload } from "jsonwebtoken"
import { RowDataPacket } from "mysql2"

export interface mailInter{
   to:string,
   subject:string,
   link:string,
    url?:string,
   message:string
}

export interface userInter{
    user_id?:number
    firstName:string,
    lastName:String,
    userName:string,
    email:string,
    password:string
}

export interface resInter{
    success:boolean,
    message:string,
    accessToken?:string | JwtPayload,
    refreshToken? :string,
    userData?:userInter | null,
    userAdd?:addInter | void,
    pageData?:userInter[] | null
}

export interface jsonDataInter extends JwtPayload {
    email:string,
    userName ?:string
    exp? :number
}

export interface ReqInter extends Request {
    email?:string,
    userName ?:string,
    access_token?:string,
    password?:string,
    token?: string | JwtPayload;
    refresh_token ? :string,
    user?: userInter,
}

export interface addInter{
    address_id?:number,
    user_id?:number,
    address:string,
    city:string,
    state:string,
    pinCode?:string,
    mobileNumber?:string
} 