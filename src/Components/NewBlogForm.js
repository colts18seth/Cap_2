import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { saveBlogCreator } from '../actions/actionCreators';
import './NewBlogForm.css';

function NewBlogForm() {
    const INITIAL_STATE = {
        title: "",
        _token: ""
    }

    let history = useHistory();
    const dispatch = useDispatch();
    const token = useSelector(s => (s.currentUser.token));
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
        data._token = token;
        await dispatch(saveBlogCreator(data));
        setData(INITIAL_STATE);
        history.push("/");
    }

    return (
        <form className="blogForm mt-5 w-50 m-auto p-3 bg-light" onSubmit={handleSubmit}>
            <h4>Choose a title for your new blog.</h4>
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

export default NewBlogForm;