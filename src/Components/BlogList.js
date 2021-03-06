import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllBlogs } from '../actions/actionCreators';
import SearchBar from './SearchBar';
import './BlogList.css';

function BlogList({ upVote, downVote }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterTerm, setFilterTerm] = useState("search");

    const dispatch = useDispatch();
    const { blogs } = useSelector(s => ({ blogs: s.blogs }));
    let blogsArr = Object.keys(blogs).map(i => blogs[i]);
    blogsArr.sort((a, b) => (a.votes < b.votes) ? 1 : -1);

    useEffect(() => {
        dispatch(getAllBlogs())
    }, [dispatch]);

    const handleChange = (e) => {
        const { value } = e.target;
        setSearchTerm(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (searchTerm === "") { return }
        let filter = filterTerm;
        dispatch(getAllBlogs({ [filter]: searchTerm }));
        setFilterTerm("search");
        setSearchTerm("");
    };

    const changeFilter = async (term) => {
        setFilterTerm(term);
    }

    const toggleSearch = async () => {
        dispatch(getAllBlogs())
    }

    return (
        <div className="row justify-content-around my-5" data-testId="BlogList">
            <div className="mb-4 d-flex justify-content-center">

                <button type="button" className="btn btn-light p-0 m-0 filterButton" data-bs-toggle="modal" data-bs-target="#filter">

                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-filter-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M7 11.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z" />
                    </svg>
                    {filterTerm === "search" ? " UpVotes" :
                        " Author"}
                </button>

                <div className="modal fade" id="filter" tabIndex="-1" aria-labelledby="filterModal" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="filterModal">Filter Blogs by:</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body d-flex">
                                <button onClick={() => changeFilter("search")} className="btn btn-dark rounded-3" data-bs-dismiss="modal">Up Votes</button>
                                <button onClick={() => changeFilter("filter")} className="btn btn-dark rounded-3" data-bs-dismiss="modal">Author</button>
                            </div>
                        </div>
                    </div>
                </div>

                <SearchBar toggleSearch={toggleSearch} handleChange={handleChange} handleSubmit={handleSubmit} searchTerm={searchTerm} />

            </div>
            {blogsArr.length > 0 ?
                blogsArr.map(b => (
                    < div key={b.blog_id} className="col-5 p-0 mb-4 bg-light BlogList" >
                        <div className="container mt-1">
                            <Link className="text-decoration-none" to={`/blog/${b.blog_id}`}>
                                <h3>{b.title}</h3>
                            </Link>
                            <div className="d-flex flex-row justify-content-end mb-2">
                                <div onClick={() => upVote(b.blog_id, "blogs")}>
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="text-success bi bi-hand-thumbs-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16v-1c.563 0 .901-.272 1.066-.56a.865.865 0 0 0 .121-.416c0-.12-.035-.165-.04-.17l-.354-.354.353-.354c.202-.201.407-.511.505-.804.104-.312.043-.441-.005-.488l-.353-.354.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581 0-.211-.027-.414-.075-.581-.05-.174-.111-.273-.154-.315L12.793 9l.353-.354c.353-.352.373-.713.267-1.02-.122-.35-.396-.593-.571-.652-.653-.217-1.447-.224-2.11-.164a8.907 8.907 0 0 0-1.094.171l-.014.003-.003.001a.5.5 0 0 1-.595-.643 8.34 8.34 0 0 0 .145-4.726c-.03-.111-.128-.215-.288-.255l-.262-.065c-.306-.077-.642.156-.667.518-.075 1.082-.239 2.15-.482 2.85-.174.502-.603 1.268-1.238 1.977-.637.712-1.519 1.41-2.614 1.708-.394.108-.62.396-.62.65v4.002c0 .26.22.515.553.55 1.293.137 1.936.53 2.491.868l.04.025c.27.164.495.296.776.393.277.095.63.163 1.14.163h3.5v1H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
                                    </svg>
                                </div>
                                <span className="px-2">{b.votes}</span>
                                <div onClick={() => downVote(b.blog_id, "blogs")}>
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="text-danger bi bi-hand-thumbs-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M6.956 14.534c.065.936.952 1.659 1.908 1.42l.261-.065a1.378 1.378 0 0 0 1.012-.965c.22-.816.533-2.512.062-4.51.136.02.285.037.443.051.713.065 1.669.071 2.516-.211.518-.173.994-.68 1.2-1.272a1.896 1.896 0 0 0-.234-1.734c.058-.118.103-.242.138-.362.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.094 2.094 0 0 0-.16-.403c.169-.387.107-.82-.003-1.149a3.162 3.162 0 0 0-.488-.9c.054-.153.076-.313.076-.465a1.86 1.86 0 0 0-.253-.912C13.1.757 12.437.28 11.5.28v1c.563 0 .901.272 1.066.56.086.15.121.3.121.416 0 .12-.035.165-.04.17l-.354.353.353.354c.202.202.407.512.505.805.104.312.043.44-.005.488l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.415-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.353.352.373.714.267 1.021-.122.35-.396.593-.571.651-.653.218-1.447.224-2.11.164a8.907 8.907 0 0 1-1.094-.17l-.014-.004H9.62a.5.5 0 0 0-.595.643 8.34 8.34 0 0 1 .145 4.725c-.03.112-.128.215-.288.255l-.262.066c-.306.076-.642-.156-.667-.519-.075-1.081-.239-2.15-.482-2.85-.174-.502-.603-1.267-1.238-1.977C5.597 8.926 4.715 8.23 3.62 7.93 3.226 7.823 3 7.534 3 7.28V3.279c0-.26.22-.515.553-.55 1.293-.138 1.936-.53 2.491-.869l.04-.024c.27-.165.495-.296.776-.393.277-.096.63-.163 1.14-.163h3.5v-1H8c-.605 0-1.07.08-1.466.217a4.823 4.823 0 0 0-.97.485l-.048.029c-.504.308-.999.61-2.068.723C2.682 1.815 2 2.434 2 3.279v4c0 .851.685 1.433 1.357 1.616.849.232 1.574.787 2.132 1.41.56.626.914 1.28 1.039 1.638.199.575.356 1.54.428 2.591z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="d-flex justify-content-start">
                                <small className="mb-1">By: {b.username}</small>
                            </div>
                        </div>
                    </div>
                )) :
                <p>No Blogs Yet</p>
            }
        </div >
    );
}

export default BlogList;