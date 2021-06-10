import User from '../models/User';
import bcrypt from 'bcrypt';

export const getJoin = (req, res) => res.render('join', { pageTitle: 'Create Account' });
export const postJoin = async (req, res) => {
  const { name, username, email, password, password2, location } = req.body;
  if (password !== password2) {
    return res.status(400).render('join', {
      pageTitle: 'Join',
      errorMessage: '비밀번호가 일치하지 않습니다.',
    });
  }
  const usernameExists = await User.exists({ username });
  if (usernameExists) {
    return res.status(400).render('join', {
      pageTitle: 'Join',
      errorMessage: 'This username is already taken.',
    });
  }
  const emailExists = await User.exists({ email });
  if (emailExists) {
    return res.status(400).render('join', {
      pageTitle: 'Join',
      errorMessage: 'This email is already taken.',
    });
  }
  try {
    await User.create({
      name,
      username,
      email,
      password,
      location,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).render('join', { pageTitle: `Join`, errorMessage: error._message });
  }
  return res.redirect('/login');
};
export const getLogin = (req, res) => res.render('login', { pageTitle: 'Login' });
export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).render('login', {
      pageTitle: 'Login',
      errorMessage: 'An account with this username does not exists.',
    });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render('login', {
      pageTitle: 'Login',
      errorMessage: 'Wrong password',
    });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect('/');
};
export const logout = (req, res) => res.send('Logout');
export const edit = (req, res) => res.send('Edit User');
export const remove = (req, res) => res.send('Remove User');
export const detail = (req, res) => res.send(`User ID #${req.params.id}`);
