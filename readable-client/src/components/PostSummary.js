import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { deletePostCreator } from '../actions/deletePost';
import { votePostCreator } from '../actions/votePost';
import { setEditPostModalCreator } from '../actions/setEditPostModal';

import DateMeta from './DateMeta';

class PostSummary extends Component {
    editPost(id){
        this.props.setEditPostModal({open: true, id});
    }

    upVote(id){
        this.props.vote({id, vote:'upVote'});
    }

    downVote(id){
        this.props.vote({id, vote:'downVote'});
    }
    render(){
        let {deletePost, post} = this.props;
        let {title, author, timestamp, commentCount, voteScore, category, id} = post;
        return (
            <div className="post-summary">
                <Link to={`/${category}/${id}`}> 
                    <h1>{ title }</h1> 
                </Link>
                <p>Score: {voteScore} </p>
                {commentCount?(
                    <p>{ commentCount } { (commentCount > 1) ? 'comments' : 'comment'} </p>
                ):'No Comments'}
                <br />
                <DateMeta timestamp={timestamp} author={author}/>
                <br />
                <button onClick={()=>{this.editPost(id)}}>Edit</button>
                <button onClick={()=>{deletePost(id)}}>Delete</button>
                <button onClick={()=>{this.upVote(id)}}>Up Vote</button>
                <button onClick={()=>{this.downVote(id)}}>Down Vote</button>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch)=>({
    deletePost: (postId) => dispatch(deletePostCreator(postId)),
    vote: ({id, vote}) => dispatch(votePostCreator({id, vote})),
    setEditPostModal: ({open, id})=>dispatch(setEditPostModalCreator({open, id}))
});

export default connect(null, mapDispatchToProps)(PostSummary);
