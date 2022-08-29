import { useEffect, useRef } from "react";
import { Engine, Scene, Vector3, Color3 } from "@babylonjs/core";
import "@babylonjs/loaders/glTF"

const BabylonComponent = ({
  antialias,
  engineOptions,
  adaptToDeviceRatio,
  onSceneMount,
  ...rest
}) => {
  const reactCanvas = useRef(null);

  useEffect(() => {
    const { current: canvas } = reactCanvas;

    if (!canvas) return;

 // set up basic engine and scene
    let engine = new Engine(canvas, true, engineOptions, adaptToDeviceRatio);
    let scene = new Scene(engine);

 //ADD ELEMENTS TO SCENE
    scene.collisionsEnabled = true;
    scene.gravity = new Vector3(0, -9.81, 0);
    scene.fogEnabled = false;
    // scene.fogMode = Scene.FOGMODE_EXP2;
    // scene.fogDensity = 0.01;
    // scene.fogColor = new Color3(0.8, 0.9, 1.0);
    scene.clearColor = scene.fogColor;

    if (typeof onSceneMount === "function") {
      onSceneMount({
        scene,
        engine,
        canvas,
      });
    } else {
      console.error("onSceneMount function not available");
    }

    //Resizing window
    const resize = () => {
      scene.getEngine().resize();
    };

    if (window) {
      window.addEventListener("resize", resize);
    }

    return () => {
      scene.useRightHandedSystem = true;
      scene.getEngine().dispose();

      if (window) {
        window.removeEventListener("resize", resize);
      }
    };
  }, [onSceneMount,engineOptions,adaptToDeviceRatio]);

  return (
    
    <canvas
      style={{ width:"100vw", height:"100vh"}}
      ref={reactCanvas}
      {...rest}
    />
  );
};

export default BabylonComponent;