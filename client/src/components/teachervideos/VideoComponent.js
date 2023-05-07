
import React from 'react';
import { withRouter } from "react-router-dom";

class ImageComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      width: 320,
      height: 180,
      zIndex: 1,
      className: 'simple'
    };
  }





  render() {
    return (
 

      <video  
      onContextMenu={e => e.preventDefault()}  
      controls autoPlay 
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
