import axios from 'axios';
import { gotAllBlogs, loginUser, logoutUser, signUpUser, saveBlog, gotBlogDetails, savePost, upVote, downVote, savePostTitle, gotPostDetails, editPost, deletePost, addComment, deleteComment } from './actions';

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

function getAllBlogs(searchOrFilter) {
    if (searchOrFilter) {
        if (searchOrFilter.search) {
            return async function (dispatch) {
                let res = await axios.get(`${BASE_URL}/blogs`, { params: { search: searchOrFilter.search } });
                dispatch(gotAllBlogs(res.data));
            };
        } else if (searchOrFilter.filter) {
            return async function (dispatch) {
                let res = await axios.get(`${BASE_URL}/blogs`, { params: { filter: searchOrFilter.filter } });
                dispatch(gotAllBlogs(res.data));
            };
        }
    } else {
        return async function (dispatch) {
            let res = await axios.get(`${BASE_URL}/blogs`);
            dispatch(gotAllBlogs(res.data));
        };
    }
}

function login(data) {
    return async function (dispatch) {
        let res = await axios.post(`${BASE_URL}/login`, data)
        dispatch(loginUser(res.data))
    }
}

function logout() {
    return async function (dispatch) {
        dispatch(logoutUser())
    }
}

function signUp(data) {
    return async function (dispatch) {
        let res = await axios.post(`${BASE_URL}/users`, data)
        dispatch(signUpUser(res.data))
    }
}

function saveBlogCreator(data) {
    return async function (dispatch) {
        let res = await axios.post(`${BASE_URL}/blogs`, data);
        dispatch(saveBlog(res.data));
    }
}

function getBlogDetails(title) {
    return async function (dispatch) {
        let res = await axios.get(`${BASE_URL}/blogs/${title}`);
        dispatch(gotBlogDetails(res.data));
    }
}

function savePostCreator(data) {
    return async function (dispatch) {
        let res = await axios.post(`${BASE_URL}/posts`, data);
        dispatch(savePost(res.data));
    }
}

function upVoteCreator(id, route) {
    return async function (dispatch) {
        await axios.post(`${BASE_URL}/${route}/${id}/vote/up`);
        dispatch(upVote(id, route));
    }
}

function downVoteCreator(id, route) {
    return async function (dispatch) {
        await axios.post(`${BASE_URL}/${route}/${id}/vote/down`);
        dispatch(downVote(id, route));
    }
}

function savePostTitleCreator(title) {
    return async function (dispatch) {
        dispatch(savePostTitle(title));
    }
}

function getPostDetails(title) {
    return async function (dispatch) {
        let res = await axios.get(`${BASE_URL}/posts/${title}`);
        dispatch(gotPostDetails(res.data));
    }
}









function editPostCreator(id, data) {
    return async function (dispatch) {
        let res = await axios.put(`${BASE_URL}/api/posts/${id}`, data);
        dispatch(editPost(res.data))
    };
}

function deletePostCreator(id) {
    return async function (dispatch) {
        await axios.delete(`${BASE_URL}/api/posts/${id}`)
        dispatch(deletePost(id))
    }
}

function addCommentCreator(postId, text) {
    return async function (dispatch) {
        let res = await axios.post(`${BASE_URL}/api/posts/${postId}/comments`, text)
        dispatch(addComment(postId, res.data))
    }
}

function deleteCommentCreator(cID, pID) {
    return async function (dispatch) {
        await axios.delete(`${BASE_URL}/api/posts/${pID}/comments/${cID}`);
        dispatch(deleteComment(cID, pID))
    }
}

export { getAllBlogs, login, logout, signUp, saveBlogCreator, getBlogDetails, savePostCreator, upVoteCreator, downVoteCreator, savePostTitleCreator, getPostDetails, editPostCreator, deletePostCreator, addCommentCreator, deleteCommentCreator };