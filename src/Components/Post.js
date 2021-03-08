import { useParams, useHistory, Link } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getPostDetails, deletePost } from '../actions/actionCreators';

function Post() {
    const { id } = useParams();
    const dispatch = useDispatch();
    let history = useHistory();
    const blog = useSelector(s => (s.blogDetails.blog));
    const token = useSelector(s => {
        if (s.currentUser) {
            return s.currentUser.token;
        }
    });

    useEffect(() => {
        dispatch((getPostDetails(id)))
    }, [dispatch, id]);

    const post = useSelector(s => (s.postDetails.post));
    const currentUser = useSelector(s => {
        if (s.currentUser) {
            return s.currentUser.username
        }
    });
    const editor = ClassicEditor;

    const handleDelete = async () => {
        dispatch(deletePost(id, token));
        history.push(`/blog/${blog.blog_id}`);
    }

    const handleBack = async () => {
        history.goBack()
    }

    return (
        <>
            <div className="d-flex flex-row justify-content-start">
                <button className="btn btn-dark m-0 mt-3 mb-3 rounded-3" onClick={() => handleBack()}>{`< Back`}</button>
            </div>
            <div>
                {post ?
                    <CKEditor
                        editor={editor}
                        data={post.data}
                        disabled="true"
                    /> :
                    "Loading..."}
            </div>
            {post &&
                <div>
                    {post.username === currentUser &&
                        <div>
                            <Link className="text-decoration-none" to={`/post/${post.post_id}/edit`}>
                                <button className="btn btn-warning mt-3">Edit</button>
                            </Link>
                            <button className="btn btn-danger text-dark mt-3 ms-3" onClick={() => handleDelete()}>Delete</button>
                        </div>
                    }
                </div>
            }
        </>
    )
}

export default Post;