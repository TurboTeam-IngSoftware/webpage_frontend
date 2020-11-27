import React from 'react';
import './ButtonComp.css'

class ButtonComp extends React.Component{
    render() {
        return(
            <div className='buttonmain'>
                <button className='bttn' disabled={this.props.disabled} onClick={()=>this.props.onClick()}>
                    {this.props.text}

                </button>
            </div>
        );
    }
}

export default ButtonComp;