import React from "react";
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onButtonSubmit }) => {
    return(
        <div className="f4">
            <p>
                {'This magic brain will detect faces in your pictures. Give it a try'}
            </p>
            <div className="center">
                <div className="form center pa4 br3 shadow-5">
                    <input className="f4 p2 w-75 ba bg-lightest-blue center" type='text' onChange={onInputChange}/>
                    <button className="w-25 grow f4 link ph3 pv2 dib white bg-light-purple" onClick = {onButtonSubmit}>Detect
                    </button>
                </div>
            </div>
        </div>
        
    );
}

export default ImageLinkForm;