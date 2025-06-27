import dotenv from 'dotenv';
dotenv.config();

const secrets = {
    admin: process.env.ADMIN_SECRET,
    user: process.env.USER_SECRET,
    employee: process.env.EMPLOYEE_SECRET
};

export { secrets };