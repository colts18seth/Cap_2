import axios from 'axios';
import { gotAllBlogs, loginUser, logoutUser, signUpUser, saveBlog, gotBlogDetails, savePost, upVote, downVote, savePostTitle, gotPostDetails } from './actions';

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

function getAllBlogs(searchOrFilter) {
    if (searchOrFilter) {
        if (searchOrFilter.search) {
            return async function (dispatch) {
                let res = await axios.get(`${BASE_URL}/blogs`, { params: { search: searchOrFilter.search } });
                await dispatch(gotAllBlogs(res.data));
            };
        } else if (searchOrFilter.filter) {
            return async function (dispatch) {
                let res = await axios.get(`${BASE_URL}/blogs`, { params: { filter: searchOrFilter.filter } });
                await dispatch(gotAllBlogs(res.data));
            };
        }
    } else {
        return async function (dispatch) {
            let res = await axios.get(`${BASE_URL}/blogs`);
            await dispatch(gotAllBlogs(res.data));
        };
    }
}

function login(data) {
    return async function (dispatch) {
        let res = await axios.post(`${BASE_URL}/login`, data)
        await dispatch(loginUser(res.data))
    }
}

function logout() {
    return async function (dispatch) {
        await dispatch(logoutUser())
    }
}

function signUp(data) {
    return async function (dispatch) {
        let res = await axios.post(`${BASE_URL}/users`, data)
        await dispatch(signUpUser(res.data))
    }
}

function saveBlogCreator(data) {
    return async function (dispatch) {
        let res = await axios.post(`${BASE_URL}/blogs`, data);
        await dispatch(saveBlog(res.data));
    }
}

function getBlogDetails(title) {
    return async function (dispatch) {
        let res = await axios.get(`${BASE_URL}/blogs/${title}`);
        await dispatch(gotBlogDetails(res.data));
    }
}

function savePostCreator(data) {
    return async function (dispatch) {
        let res = await axios.post(`${BASE_URL}/posts`, data);
        await dispatch(savePost(res.data));
    }
}

function upVoteCreator(id, route) {
    return async function (dispatch) {
        await axios.post(`${BASE_URL}/${route}/${id}/vote/up`);
        await dispatch(upVote(id, route));
    }
}

function downVoteCreator(id, route) {
    return async function (dispatch) {
        await axios.post(`${BASE_URL}/${route}/${id}/vote/down`);
        await dispatch(downVote(id, route));
    }
}

function savePostTitleCreator(title) {
    return async function (dispatch) {
        await dispatch(savePostTitle(title));
    }
}

function getPostDetails(title) {
    return async function (dispatch) {
        let res = await axios.get(`${BASE_URL}/posts/${title}`);
        await dispatch(gotPostDetails(res.data));
    }
}

function editPost(title, data) {
    return async function () {
        await axios.patch(`${BASE_URL}/posts/${title}`, data);
    };
}

function deletePost(title, token) {
    return async function () {
        await axios.delete(`${BASE_URL}/posts/${title}`, { data: { _token: token } })
    }
}

export { getAllBlogs, login, logout, signUp, saveBlogCreator, getBlogDetails, savePostCreator, upVoteCreator, downVoteCreator, savePostTitleCreator, getPostDetails, editPost, deletePost };