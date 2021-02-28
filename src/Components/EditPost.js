import { useParams, useHistory } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getPostDetails, editPost } from '../actions/actionCreators';

function EditPost() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const post = useSelector(s => (s.post.post));
    const blog = useSelector(s => (s.blogDetails.blog));
    const token = useSelector(s => {
        if (s.currentUser) {
            return s.currentUser.token
        }
    })
    const editor = ClassicEditor;
    let history = useHistory();

    const [editorData, setEditorData] = useState(post.data);
    const [data, setData] = useState(post.data);

    useEffect(() => {
        setData({ data: editorData })
    }, [editorData]);

    useEffect(() => {
        dispatch((getPostDetails(id)))
    }, [dispatch, id]);

    const handleSubmit = async () => {
        data._token = token;
        data.user_id = blog.user_id;
        data.blog_id = blog.blog_id;
        data.title = post.title;
        dispatch(editPost(id, data));
        setData(post.data);
        history.push(`/blog/${blog.blog_id}`);
    }

    return (
        <div className="mt-5">
            {post ?
                <>
                    <CKEditor
                        editor={editor}
                        data={post.data}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setEditorData(data);
                        }}
                    />
                    <button className="btn btn-success mt-3" onClick={() => handleSubmit()}>Save</button>
                </> :
                "Loading..."}
        </div>
    )
}

export default EditPost;