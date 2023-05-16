
import React from 'react';
import { withRouter } from "react-router-dom";

class ImageComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      width: 128*2,
      height: 72*2,
      zIndex: 1,
      className: 'simple'
    };
  }


  render() {
    return (
      <video  
      loading="lazy"
      onContextMenu={e => e.preventDefault()}  
      controls  
      controlsList="nodownload" 
      //oncontextmenu="return false;" 
      id={this.props.id}
      alt={this.props.alt}
      style={this.props.zIndex}
      width={this.state.width + 'px'}
      height={this.state.height + 'px'}
      className={this.state.className}
      
      >
                     
                      
      < source src={this.props.src}/>
      </video>
    );
  }
}



export default (withRouter(ImageComponent));
