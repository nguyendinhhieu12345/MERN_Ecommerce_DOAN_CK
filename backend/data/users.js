import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@email.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Testing',
    email: 'testing@email.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Hiếu Nguyễn',
    email: 'dinhhieu@email.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Admin',
    email: 'admin1@email.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Minh Đạo',
    email: 'minhdao@email.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Customer',
    email: 'customer@email.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
