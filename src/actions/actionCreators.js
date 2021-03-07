import axios from 'axios';
import { gotAllBlogs, loginUser, logoutUser, signUpUser, saveBlog, gotBlogDetails, savePost, upVote, downVote, gotPostDetails, gotRecentPosts, gotUser } from './actions';

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

function getRecentPosts(searchOrFilter) {
    if (searchOrFilter) {
        if (searchOrFilter.search) {
            return async function (dispatch) {
                let res = await axios.get(`${BASE_URL}/posts`, { params: { search: searchOrFilter.search } });
                await dispatch(gotRecentPosts(res.data));
            };
        } else if (searchOrFilter.filter) {
            return async function (dispatch) {
                let res = await axios.get(`${BASE_URL}/posts`, { params: { filter: searchOrFilter.filter } });
                await dispatch(gotRecentPosts(res.data));
            };
        }
    } else {
        return async function (dispatch) {
            let res = await axios.get(`${BASE_URL}/posts`);
            await dispatch(gotRecentPosts(res.data));
        };
    }
}

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

function getUser(username) {
    return async function (dispatch) {
        let res = await axios.get(`${BASE_URL}/users/${username}`);
        await dispatch(gotUser(res.data));
    };
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

function getBlogDetails(id) {
    return async function (dispatch) {
        let res = await axios.get(`${BASE_URL}/blogs/${id}`);
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

function getPostDetails(id) {
    return async function (dispatch) {
        let res = await axios.get(`${BASE_URL}/posts/${id}`);
        await dispatch(gotPostDetails(res.data));
    }
}

function editPost(id, data) {
    return async function () {
        await axios.patch(`${BASE_URL}/posts/${id}`, data);
    };
}

function deletePost(id, token) {
    return async function () {
        await axios.delete(`${BASE_URL}/posts/${id}`, { data: { _token: token } })
    }
}

export { getAllBlogs, login, logout, signUp, saveBlogCreator, getBlogDetails, savePostCreator, upVoteCreator, downVoteCreator, getPostDetails, editPost, deletePost, getRecentPosts, getUser };