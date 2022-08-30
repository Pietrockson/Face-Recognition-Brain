import React from "react";


const Navigation = ({onRouteChange,isSignedIn}) => {
    if(isSignedIn){
        return(
            <nav style={{display:'flex', justifyContent: 'flex-end'}}>
                <p onClick={()=> onRouteChange('signout')}
                className="f4 pa5 fw7 dim underline link black pointer">Sign Out</p>
            </nav>
            );
    }else{
        return(
            <nav style={{display:'flex', justifyContent: 'flex-end'}}>
                <p onClick={()=> onRouteChange('signin')}
                className="f4 pa3 fw8 dim underline link black pointer">Sign In</p>

                <p onClick={()=> onRouteChange('register')}
                className="f4 pa3 fw8 dim underline link black pointer">Register</p>
            </nav>
        );
    }
    
}

export default Navigation;