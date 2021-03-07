import { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { savePostCreator } from '../actions/actionCreators';
import './NewPostForm.css';

function NewPostForm({ blogId }) {
    const INITIAL_STATE = {
        data: "",
        _token: ""
    }

    const token = useSelector(s => (s.currentUser.token));
    const blog = useSelector(s => (s.blogDetails.blog));
    const dispatch = useDispatch();
    let history = useHistory();

    const [editorData, setEditorData] = useState("");
    const [data, setData] = useState(INITIAL_STATE);
    const [title, setTitle] = useState("");
    const [error, setError] = useState(false);

    const editor = ClassicEditor;

    useEffect(() => {
        setData({ data: editorData })
    }, [editorData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTitle(data => ({
            ...data,
            [name]: value
        }));
    }

    const handleSubmit = async () => {
        data._token = token;
        data.user_id = blog.user_id;
        data.blog_id = blog.blog_id;
        data.title = title.title;
        await dispatch(savePostCreator(data));
        setData(INITIAL_STATE);
    }

    return (
        <>
            <div className="mt-5">
                {error &&
                    <h4 className="text-danger">This title has already been used.</h4>}
                <input onChange={handleChange} placeholder="Title" name="title" />
                <CKEditor
                    editor={editor}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        setEditorData(data);
                    }}
                />

            </div>
            <button className="btn btn-success mt-3" onClick={async () => {
                try {
                    await handleSubmit();
                    history.push(`/blog/${blogId}`);
                }
                catch {
                    setError(true);
                }
            }}>Save</button>
        </>
    );
}

export default NewPostForm;