import { useParams, useHistory, Link } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { getPostDetails, deletePost } from './actionCreators';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

function Post() {
    const { title } = useParams();
    const dispatch = useDispatch();
    let history = useHistory();
    const blog = useSelector(s => (s.blogDetails.blog));
    const token = useSelector(s => {
        if (s.currentUser) {
            return s.currentUser.token;
        }
    });

    useEffect(() => {
        dispatch((getPostDetails(title)))
    }, [dispatch, title]);

    const post = useSelector(s => (s.post.post));
    const currentUser = useSelector(s => {
        if (s.currentUser) {
            return s.currentUser.username
        }
    });
    const editor = ClassicEditor;

    const handleDelete = async () => {
        dispatch(deletePost(title, token));
        history.push(`/blog/${blog.title}`);
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
                            <Link className="text-decoration-none" to={`/post/${post.title}/edit`}>
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