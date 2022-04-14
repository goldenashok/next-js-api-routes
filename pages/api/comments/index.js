import { comments } from "../../../data/comments";

export default function handler(req, res) {
    if(req.method === 'GET') {
        res.status(200).json(comments);
    } else if(req.method === 'POST'){
        const comment = req.body.comment;
        let newComment = {
            id: Date.now(),
            name: req.body.comment
        }
        comments.push(newComment);
        res.status(200).json(newComment);
    }
}