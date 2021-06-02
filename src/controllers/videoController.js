const fakeUser = {
  userName: '1nthek',
  loggedIn: false,
};

let videos = [
  {
    id: 1,
    title: 'First Video',
    rating: 4,
    comments: 2,
    createdAt: '2 minutes ago',
    views: 2,
  },
  {
    id: 2,
    title: 'Second Video',
    rating: 3,
    comments: 12,
    createdAt: '5 minutes ago',
    views: 1,
  },
  {
    id: 3,
    title: 'Third Video',
    rating: 2,
    comments: 23,
    createdAt: '60 minutes ago',
    views: 24,
  },
];

export const trending = (req, res) => res.render('home', { pageTitle: 'Home', fakeUser, videos });
export const detail = (req, res) => {
  const { id } = req.params;
  const video = videos.find((e) => e.id === parseInt(id));
  return res.render('watch', { pageTitle: `Watching ${video.title}`, fakeUser, video });
};
export const getEdit = (req, res) => {
  const { id } = req.params;
  console.log(id);
  const video = videos.find((e) => e.id === parseInt(id));
  return res.render('edit', { pageTitle: `Editing ${video.title}`, video });
};
export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const videoIdx = videos.findIndex((e) => e.id === parseInt(id));
  videos[videoIdx].title = title;
  return res.redirect(`/videos/${id}`);
};
export const getUpload = (req, res) => {
  return res.render('upload', { pageTitle: `Upload Video` });
};
export const postUpload = (req, res) => {
  const { title } = req.body;
  let maxIdx = 0;
  videos.map((e) => {
    maxIdx = Math.max(maxIdx, e.id);
  });
  const newVideo = {
    title,
    rating: 0,
    comments: 0,
    createdAt: 'now',
    views: 0,
    id: maxIdx + 1,
  };
  videos = [...videos, newVideo];
  return res.redirect('/');
};
