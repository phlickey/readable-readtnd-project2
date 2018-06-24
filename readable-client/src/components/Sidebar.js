import React, { Component } from 'react';
import SidebarItem from './SidebarItem';
import { connect } from 'react-redux';
class Sidebar extends Component {
    render(){
        let { categories } = this.props;
        return(
            <ul className="Sidebar">
                <SidebarItem title='Home' path='/' />
                <SidebarItem title="Categories" />
                {categories.map(category=><SidebarItem title={category.name} path={'/'+category.path} />)}
            </ul>
        );
    }
}

let mapStateToProps = (state, props)=>({
    categories: state.categories
});
export default connect(mapStateToProps)(Sidebar);