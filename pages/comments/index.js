import { useState } from "react";

function CommentsPage() {

    const [comments, setComments] = useState([]),
        [comment, setComment] = useState(''),
        [commentData, setcommnetData] = useState('');

    const fetchComments = async () => {
        const response = await fetch('/api/comments'),
            data = await response.json();
        setComments(data);
    }
    const submitCommit = async () => {
        const response = await fetch('api/comments', {
            method: 'POST',
            body: JSON.stringify({ comment }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json();
        fetchComments();
    }

    const deleteCommit = async id => {
        const response = await fetch(`/api/comments/${id}`, {
            method: 'DELETE'
        })
        const data = await response.json();
        fetchComments();
    }

    const getComment = async id => {
        const response = await fetch(`/api/comments/${id}`, {
            method: 'GET'
        }),
            data = await response.json();
            setcommnetData(data.name);
    }

    return (
        <>
            <input name='comment' id='comment' value={comment} onChange={(e) => setComment(e.target.value)} />
            <button onClick={submitCommit}>Submit Commit</button>
            <br />
            <br />
            <button onClick={fetchComments}>Load Comments</button>
            <hr />
            {comments.map(comment => {
                return (
                    <>
                        <div key={comment.id}>{comment.id} -> {comment.name} <button onClick={() => deleteCommit(comment.id)}>Delete</button>
                            <button onClick={() => getComment(comment.id)}>Get Comment</button>
                        </div>
                        <hr />
                    </>
                )
            })}
            {commentData && <div>{commentData}</div>}
        </>
    )
}
export default CommentsPage;