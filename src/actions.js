import {
    GET_ALL_BLOGS,
    LOGIN_USER,
    LOGOUT_USER,
    SIGN_UP_USER,
    SAVE_BLOG,
    GET_BLOG_DETAILS,
    SAVE_POST,
    UP_VOTE,
    DOWN_VOTE,
    SAVE_POST_TITLE,
    GET_POST_DETAILS
} from './actionTypes';

function gotAllBlogs(blogs) {
    return ({
        type: GET_ALL_BLOGS,
        payload: blogs
    });
}

function loginUser(data) {
    return ({
        type: LOGIN_USER,
        payload: data
    })
}

function logoutUser() {
    return ({
        type: LOGOUT_USER
    })
}

function signUpUser(data) {
    return ({
        type: SIGN_UP_USER,
        payload: data
    })
}

function saveBlog(data) {
    return ({
        type: SAVE_BLOG,
        payload: data
    });
}

function gotBlogDetails(data) {
    return ({
        type: GET_BLOG_DETAILS,
        payload: data
    });
}

function savePost(data) {
    return ({
        type: SAVE_POST,
        payload: data
    });
}

function upVote(id, route) {
    return ({
        type: UP_VOTE,
        payload: { id, route }
    })
}

function downVote(id, route) {
    return ({
        type: DOWN_VOTE,
        payload: { id, route }
    })
}

function savePostTitle(title) {
    return ({
        type: SAVE_POST_TITLE,
        payload: title
    });
}

function gotPostDetails(data) {
    return ({
        type: GET_POST_DETAILS,
        payload: data
    });
}

export { gotAllBlogs, loginUser, logoutUser, signUpUser, saveBlog, gotBlogDetails, savePost, upVote, downVote, savePostTitle, gotPostDetails };