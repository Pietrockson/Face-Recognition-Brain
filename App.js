import React, { Component } from "react";
import Clarifai from "clarifai";
import Navigation from "./components/Navigation/Navigation";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Logo from "./components/Logo/Logo";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import Particles from "react-tsparticles";
import "./App.css";
import { loadLinksPreset } from "tsparticles-preset-links";

const app = new Clarifai.App({
  apiKey: "9d7298ddde654606b7922a30c64ec2b3",
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
      route: "signin",
      isSignedIn: false,
    };
  }
  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_Col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };
  displayFaceBox = (box) => {
    this.setState({ box: box });
  };
  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };
  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then((response) => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch((err) => console.log(err));
  };

  particlesOptions = {
    preset: "links",
    background: {
      color: {
        value: "",
      },
    },
  };
  particlesInit = (instance) => {
    loadLinksPreset(instance);
  };

  onRouteChange=(route)=>{
    if(route==='signout'){
      this.setState({isSignedIn: false})

    }else if (route==='home'){
      this.setState({isSignedIn:true})
    }
    this.setState({route: route})
  } 

  render() {
      /*using destructuring to clean up the code*/
    const {isSignedIn, imageUrl,box, route} = this.state;
    return (
      <div className="App">
        <Particles
          className="particles"
          options={this.particlesOptions}
          init={this.particlesInit}
        />

        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        {/* ternary condition */}
        {this.state.route === "home"
          ?   <div>
                <Logo />
                <Rank />
                <ImageLinkForm
                  onInputChange={this.onInputChange}
                  onButtonSubmit={this.onButtonSubmit}
                />
                <FaceRecognition
                  box={box}
                  imageUrl={imageUrl}
                />
              </div>
            : (
              route==="signin"
            ?  <Signin onRouteChange={this.onRouteChange} />
            :  <Register onRouteChange={this.onRouteChange}/> 
              )
        }
      </div>
    );
  }
}

export default App;
