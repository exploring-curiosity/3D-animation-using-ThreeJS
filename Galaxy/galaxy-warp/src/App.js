import React, { Component } from 'react';
import * as THREE from 'three';
class App extends Component {
  componentDidMount() {
    var scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight,0.1,1000);
    camera.position.z=100;
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth,window.innerHeight);
    document.body.appendChild(renderer.domElement);
    let LINE_COUNT = 1500;
    let geom = new THREE.BufferGeometry();
    geom.setAttribute('position',new THREE.BufferAttribute(new Float32Array(3*LINE_COUNT),3)); // change to 3*
    geom.setAttribute('velocity',new THREE.BufferAttribute(new Float32Array(1*LINE_COUNT),1)); // change to 1*
    let pos= geom.getAttribute('position');
    let pa=pos.array;
    let vel= geom.getAttribute('velocity');
    let va=vel.array;

    for(let i=0;i<LINE_COUNT;i++)
    {
      var x = Math.random() * 600 -300;
      var y = Math.random() * 600 -300;
      var z = Math.random() * 600 -300;
      pa[3*i] = x;
      pa[3*i+1] = y;
      pa[3*i+2] = z;
      // pa[6*i+3] = xx;
      // pa[6*i+4] = yy;
      // pa[6*i+5] = zz;
      va[i]=0;
    }
    let material = new THREE.PointsMaterial({color:0xffffff});
    let stars = new THREE.Points(geom,material);
    scene.add(stars);
    window.addEventListener('resize',function(){
      renderer.setSize(window.innerWidth,window.innerHeight);
      camera.aspect=window.innerWidth/window.innerHeight;
      camera.needsUpdate=true;
    });
    function animate(){
      for(let i=0;i<LINE_COUNT;i++)
      {
        va[i]+=0.01;

        pa[3*i+2]+=va[i];

        if(pa[3*i+2]>200)
        {
          var z = Math.random() * 600 -300;
          pa[3*i+2] = z;
          va[i]=0;
        }
      }
      pos.needsUpdate= true;
      stars.rotation.z+=0.003;
      renderer.render(scene,camera);
      requestAnimationFrame(animate);
    }
    animate();
  }
  render() { 
    return ( 
      <div class="tetris">
        <h1>Tetris Game</h1>
      </div>
     );
  }
}
 
export default App;
