import express from 'express';
import { detail, getEdit, postEdit, getUpload, postUpload, deleteVideo } from '../controllers/videoController';

const videoRouter = express.Router();

videoRouter.route('/:id([0-9a-f]{24})').get(detail);
videoRouter.route('/:id([0-9a-f]{24})/edit').get(getEdit).post(postEdit);
videoRouter.route('/:id([0-9a-f]{24})/delete').get(deleteVideo).post();
videoRouter.route('/upload').get(getUpload).post(postUpload);

export default videoRouter;
