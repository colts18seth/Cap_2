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

    EDIT_POST,
    DELETE_POST
} from './actionTypes';

const INITIAL_STATE = {
    blogs: {},
    blogDetails: {},
    post: {},
    loggedIn: false,
    currentUser: null
}

function rootReducer(state = INITIAL_STATE, action) {
    switch (action.type) {

        case GET_ALL_BLOGS:
            const blogsObj = arrayToObject(action.payload.blogs);
            return { ...state, blogs: blogsObj, blogDetails: {}, post: {}, posts: {} }

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
                return {
                    ...state, posts: {
                        ...state.posts,
                        [postID]: {
                            ...state.posts[postID],
                            votes: state.posts[postID].votes - 1
                        }
                    }
                }
            } else {
                const blogID = action.payload.id;
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
            return { ...state, post: action.payload }








        case EDIT_POST:
            return { ...state, posts: { ...state.posts, [action.payload.id]: action.payload } }

        case DELETE_POST:
            const newObj = state.posts;
            delete newObj[action.payload]
            return { ...state, posts: { ...newObj } }

        default:
            return { ...state }
    }
}

const arrayToObject = (array) =>
    array.reduce((obj, item) => {
        obj[item.blog_id] = item
        return obj
    }, {})

export default rootReducer;