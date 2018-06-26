import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getPostsAction, getPostsByCategoryAction} from '../actions/getPosts';
import {getCategoriesAction} from '../actions/getCategories';
import PostList from './PostList';
import BackButton from './BackButton';
import Modal from 'react-modal';
class CategoryView extends Component {
    constructor(){
        super();
        this.state = {
            category: ''
        };
    }
    componentDidMount(){
        let { category } = this.props.match.params;
        this.setState({
            category
        });
        if (category){
            this.props.getPostsByCategory(category)
        }else{
            this.props.getPosts()
        }
    }
    componentWillReceiveProps(newProps){
        let {category} = newProps.match.params;
        if (category){
            this.setState({
                category
            });
            this.props.getPostsByCategory(category)
        }else{
            this.props.getPosts()
        }
        
    }
    render(){
        let {category} = this.state;
        let {newPostModalOpen, setNewPostModal} = this.props;
        return (
            <div className="post-list">
                {category&&(<BackButton />)}
                <PostList category={category}/>
                <button onClick={()=>{setNewPostModal('open')}}> New Post </button>
                <Modal
                    isOpen={newPostModalOpen}
                    contentLabel="New Post Modal"
                > <button onClick={()=>{setNewPostModal('closed')}}> close </button>
                </Modal>

            </div>
        );
    }
}
let mapStateToProps = (state, props) => {
    return {posts: state.posts};
};

function mapDispatchToProps(dispatch) {
    return {
      getPosts: (data) => dispatch(getPostsAction(data)),
      getCategories: (data) => dispatch(getCategoriesAction(data)),
      getPostsByCategory: (category)=> dispatch(getPostsByCategoryAction(category))
    }
  }
export default connect(null, mapDispatchToProps)(CategoryView);