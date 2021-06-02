import express from 'express';
import { detail, getEdit, postEdit, getUpload, postUpload } from '../controllers/videoController';

const videoRouter = express.Router();

videoRouter.get('/:id(\\d+)', detail);
videoRouter.route('/:id(\\d+)/edit').get(getEdit).post(postEdit);
videoRouter.route('/upload').get(getUpload).post(postUpload);

export default videoRouter;
