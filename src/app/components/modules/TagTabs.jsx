/* eslint react/prop-types: 0 */
import React, {Component} from 'react';
import {browserHistory, Link} from 'react-router';
import {connect} from 'react-redux';
import tt from 'counterpart';
import ScrollMenu from '../elements/ScrollMenu';

const default_fixed_tags = ['life', 'grow', 'edibles', 'nugporn', 'art', 'news', 'contest', 'cbd', 'health', 'dabs', 'legalize', 'nsfw'];

class TagTabs extends Component {
  constructor(){
    super();
  }

  render() {
    const render_tags = default_fixed_tags.map((tag) =>
      <div key={`tag_${tag}`} to={`/trending/${tag}`} className={`image tagboxes ${tag}`}>
        <Link>{tag}</Link>
      </div>
    );

    return (
      <ScrollMenu data={render_tags} dragging={true}
                  wheel={false} alignCenter={false} hideArrows={true}
                  menuClass="tag-wrap" wrapperClass="image-container"
      />
    )
  }
}

export default connect(
  // mapStateToProps
)(TagTabs)
