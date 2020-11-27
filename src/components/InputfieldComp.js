import React from 'react';
import './InputfieldComp.css'


class InputfieldComp extends React.Component{
    render() {
        return(
            <div className='inputfieldmain'>
                <input
                    className='input'
                    type={this.props.type}
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                   // onChange={ (e) => this.props.onChange(e.target.value)}
                />
            </div>
        );
    }
}

export default InputfieldComp;