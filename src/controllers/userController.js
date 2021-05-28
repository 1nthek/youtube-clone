export const join = (req, res) => res.send('Join');
export const login = (req, res) => res.send('Login');
export const logout = (req, res) => res.send('Logout');
export const edit = (req, res) => res.send('Edit User');
export const remove = (req, res) => res.send('Remove User');
export const detail = (req, res) => res.send(`User ID #${req.params.id}`);
