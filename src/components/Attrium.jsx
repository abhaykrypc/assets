import React from "react";
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders/glTF"
import BabylonComponent from "./BabylonComponent";
import "@babylonjs/loaders"
import 'babylonjs-loaders';

const ybotURL =
  "https://raw.githubusercontent.com/TheNosiriN/Babylon-Assets/master/ybot.babylon";
  // const cityasGlb = "http://3.7.57.159:8081/ipfs/QmNv5UTnSfCNSN7EtmqjYr1rh4PwTxwWKgUPPkU7akobey"
const cityasGltf = "http://3.7.57.159:8081/ipfs/QmP2Zo3sUHFZWcxdWxkboPY7YAsa8p38SAcruJfZmqNQkt"
console.log("city",cityasGltf)
// const burgerGlb = "../assets/burger.glb"
const cityGlbGit = "https://github.com/krypc-code/lumos-3dassets/blob/master/AttriumScene/city.glb?raw=true"
// const ipfs = "http://3.7.57.159:8081/ipfs/QmP2Zo3sUHFZWcxdWxkboPY7YAsa8p38SAcruJfZmqNQkt"
// const newurl="https://streaklinks.com/BLHX_hNwsEUzbmN7JAphQGrM/https%3A%2F%2Fdrive.google.com%2Ffile%2Fd%2F1ARSEdvoyOeT5VeG3y-yHeaWGWWqvRD_S%2Fview%3Fusp%3Ddrive_web"
const barrelgit="https://github.com/abhaykrypc/assets/blob/main/Barrel_01_1k.glb"

var firstPerson = false;

//animations
var skeleton = null;

// var ak47 = null;

var idleAnim = null;
var walkAnim = null;
var runAnim = null;
var sprintAnim = null;
var jumpAnim = null;

//variables
var animationBlend = 0.005;
var mouseSensitivity = 0.005;
var cameraSpeed = 0.0075;
var walkSpeed = 0.008;
var runSpeed = 0.05;
var sprintSpeed = 0.008;
// var jumpSpeed = 0.0005;
var jumpHeight = 8;
var gravity = new BABYLON.Vector3(0, -0.25, 0);

//in-game changed variables
var speed = 0;
var vsp = 0;
var jumped = false;
var mouseX = 0,
  mouseY = 0;
var mouseMin = -35,
  mouseMax = 45;




let onSceneMount = (e) => {
  const { canvas, scene, engine } = e;

  

  var createScene = function (engine,scene) {
    var scene = new BABYLON.Scene(engine);

    //Adding a light
    var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(20, 20, 100), scene);

    //Adding an Arc Rotate Camera
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 100, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, false);

    // The first parameter can be used to specify which mesh to import. Here we import all meshes
    BABYLON.SceneLoader.ImportMesh("","",barrelgit, scene, function (mesh) {
        // Set the target of the camera to the first imported mesh
        scene.createDefaultCameraOrLight(true, true, true);
        // scene.activeCamera.alpha += Math.PI;
        console.log(mesh)
    });

    // Move the light with the camera
    scene.registerBeforeRender(function () {
        light.position = camera.position;
    });

    return scene;
}

  
  var sceneToRender = createScene(engine,scene);
  

  engine.runRenderLoop(() => {
    if (sceneToRender) {
      sceneToRender.render();
    }
  });
};

const Attrium = () => (
  <div className="App">
    <BabylonComponent onSceneMount={onSceneMount} />
  </div>
);

export default Attrium;