import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { savePostTitleCreator } from '../actions/actionCreators';
import './NewBlogForm.css';

function NewPostTitle() {
    const INITIAL_STATE = {
        title: ""
    }

    let history = useHistory();
    const dispatch = useDispatch();
    const [data, setData] = useState(INITIAL_STATE);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(data => ({
            ...data,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(savePostTitleCreator(data.title));
        history.push(`/newPost`);
        setData(INITIAL_STATE);
    }

    return (
        <form className="blogForm mt-5 bg-light w-50 m-auto p-3 rounded-3" onSubmit={handleSubmit}>
            <h4>Choose a title for your new post.</h4>
            <div className="pt-3">
                <label htmlFor="title">Title: </label>
                <input onChange={handleChange} name="title" id="title" type="text" value={data.title}></input>
            </div>
            <span className="d-flex">
                <button className="justify-content-center mt-5 btn btn-success" type="submit">Save</button>
            </span>
        </form>
    );
}

export default NewPostTitle;