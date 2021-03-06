import {
    GET_ALL_BLOGS,
    LOGIN_USER,
    LOGOUT_USER,
    SIGN_UP_USER,
    GET_BLOG_DETAILS,
    UP_VOTE,
    DOWN_VOTE,
    SAVE_POST_TITLE,
    SAVE_POST,
    GET_POST_DETAILS,
    GET_RECENT_POSTS,
    GET_USER
} from '../actions/actionTypes';

const INITIAL_STATE = {
    posts: {},
    blogs: {},
    blogDetails: {},
    postDetails: {},
    loggedIn: false,
    currentUser: null
}

function rootReducer(state = INITIAL_STATE, action) {
    switch (action.type) {

        case GET_USER:
            let user = action.payload.user;
            let userPosts = arrayToObject(action.payload.user.posts, "posts");
            let userBlogs = arrayToObject(action.payload.user.blogs, "blogs");
            return { ...state, user: user, blogs: userBlogs, posts: userPosts }

        case GET_RECENT_POSTS:
            const postsObj = arrayToObject(action.payload.posts, "posts");
            return { ...state, posts: postsObj }

        case GET_ALL_BLOGS:
            const blogsObj = arrayToObject(action.payload.blogs, "blogs");
            return { ...state, blogs: blogsObj }

        case LOGIN_USER:
            return { ...state, loggedIn: true, currentUser: action.payload }

        case SIGN_UP_USER:
            return { ...state, loggedIn: true, currentUser: action.payload }

        case LOGOUT_USER:
            return { ...state, loggedIn: false, currentUser: null }

        case GET_BLOG_DETAILS:
            let posts = {};
            action.payload.blog.posts.map(p => posts[p.post_id] = p)
            return { ...state, blogDetails: action.payload, posts: posts }

        case UP_VOTE:
            if (action.payload.route === "posts") {
                const pID = action.payload.id;
                return {
                    ...state, posts: {
                        ...state.posts,
                        [pID]: {
                            ...state.posts[pID],
                            votes: state.posts[pID].votes + 1
                        }
                    }
                }
            } else {
                const bID = action.payload.id;
                return {
                    ...state, blogs: {
                        ...state.blogs,
                        [bID]: {
                            ...state.blogs[bID],
                            votes: state.blogs[bID].votes + 1
                        }
                    }
                }
            }

        case DOWN_VOTE:
            if (action.payload.route === "posts") {
                const postID = action.payload.id;
                if (state.posts[postID].votes === 0) {
                    return { ...state }
                } else {
                    return {
                        ...state, posts: {
                            ...state.posts,
                            [postID]: {
                                ...state.posts[postID],
                                votes: state.posts[postID].votes - 1
                            }
                        }
                    }
                }
            } else {
                const blogID = action.payload.id;
                if (state.blogs[blogID].votes === 0) {
                    return { ...state }
                } else {
                    return {
                        ...state, blogs: {
                            ...state.blogs,
                            [blogID]: {
                                ...state.blogs[blogID],
                                votes: state.blogs[blogID].votes - 1
                            }
                        }
                    }
                }

            }

        case SAVE_POST_TITLE:
            return {
                ...state, post: {
                    ...state.post,
                    title: action.payload
                }
            }

        case SAVE_POST:
            return {
                ...state, post: {
                }
            }

        case GET_POST_DETAILS:
            return { ...state, postDetails: action.payload }

        default:
            return { ...state }
    }
}

const arrayToObject = (array, type) =>
    array.reduce((obj, item) => {
        if (type === "posts") {
            obj[item.post_id] = item
            return obj
        } else if (type === "blogs") {
            obj[item.blog_id] = item
            return obj
        } else {
            return Error("Set type of obj.")
        }
    }, {})

export default rootReducer;