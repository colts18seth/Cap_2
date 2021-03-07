import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Login from './Login';
import PostList from './PostList';
import BlogList from './BlogList';
import Blog from './Blog';
import Post from './Post';
import NewBlogForm from './NewBlogForm';
import NewPostForm from './NewPostForm';
import User from './User';
import EditPost from './EditPost';
import { upVoteCreator, downVoteCreator } from '../actions/actionCreators';

function Routes() {
    const dispatch = useDispatch();
    const loggedIn = useSelector(s => (s.loggedIn));
    const currentUsername = useSelector(s => {
        if (s.currentUser) {
            return s.currentUser.username
        }
    });
    const blogId = useSelector(s => {
        if (s.blogDetails.blog) {
            return s.blogDetails.blog.blog_id
        }
    });
    const author = useSelector(s => {
        if (s.blogDetails.blog) {
            return s.blogDetails.blog.username
        }
    });

    const upVote = (id, route) => {
        dispatch(upVoteCreator(id, route))
    }

    const downVote = (id, route) => {
        dispatch(downVoteCreator(id, route))
    }

    return (
        <div>
            <Switch>
                <Route exact path='/login'>
                    <Login />
                </Route>

                <Route exact path='/newBlog'>
                    {loggedIn ?
                        <NewBlogForm /> :
                        <Redirect to='/login' />
                    }
                </Route>

                <Route exact path='/newPost'>
                    {blogId !== undefined ?
                        <NewPostForm blogId={blogId} /> :
                        <Redirect to='/' />
                    }
                </Route>

                <Route exact path='/post/:id/edit'>
                    {author === currentUsername ?
                        <EditPost /> :
                        <Redirect to='/' />
                    }
                </Route>

                <Route exact path='/post/:id'>
                    <Post />
                </Route>

                <Route exact path='/user/:username'>
                    <User upVote={upVote} downVote={downVote} />
                </Route>

                <Route exact path='/blog/:id'>
                    <Blog currentUsername={currentUsername} upVote={upVote} downVote={downVote} />
                </Route>

                <Route exact path='/blogs'>
                    <BlogList upVote={upVote} downVote={downVote} />
                </Route>

                <Route exact path='/'>
                    <PostList upVote={upVote} downVote={downVote} />
                </Route>

                <Redirect to='/' />
            </Switch>
        </div>
    );
}

export default Routes;