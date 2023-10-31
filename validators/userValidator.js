import {body} from 'express-validator';

export const registerValidator= [
    body('firstName').notEmpty(),
    body('lastName').notEmpty(),
    body('userName').notEmpty(),
    body('email').isEmail(),
    body('password').notEmpty()
]

export const loginValidator= [
    body('email').isEmail(),
    body('password').notEmpty()
]