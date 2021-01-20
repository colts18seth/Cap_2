import { useParams } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { getPostDetails } from './actionCreators';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

function Post() {
    const { title } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch((getPostDetails(title)))
    }, [dispatch, title]);

    const post = useSelector(s => (s.post.post));
    const editor = ClassicEditor;

    return (
        <div className="mt-5">
            {post ?
                <CKEditor
                    editor={editor}
                    data={post.data}
                    disabled="true"
                /> :
                "Loading..."}
        </div>
    )
}

export default Post;