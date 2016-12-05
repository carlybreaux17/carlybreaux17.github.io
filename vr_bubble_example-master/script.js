var scene,
   camera,
   renderer,
   element,
   container,
   effect,
   controls;

var mesh, lightMesh, geometry;
var spheres = [];

init();

function init() {

   setScene();
   setControls();
   setLights();
   //setFloor();
   setBackground();
   
   createBubbles();
   
   animate();
}

function setLights() {
  // Lighting
  var light = new THREE.PointLight(0x999999, 2, 100);
  light.position.set(50, 50, 50);
  scene.add(light);

  var lightScene = new THREE.PointLight(0x999999, 2, 100);
  lightScene.position.set(0, 5, 0);
  scene.add(lightScene);
}

function setFloor() {
  var floorTexture = THREE.ImageUtils.loadTexture('textures/grass.png');
  floorTexture.wrapS = THREE.RepeatWrapping;
  floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat = new THREE.Vector2(50, 50);
  floorTexture.anisotropy = renderer.getMaxAnisotropy();

  var floorMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    specular: 0xffffff,
    shininess: 20,
    shading: THREE.FlatShading,
    map: floorTexture
  });

  var geometry = new THREE.PlaneBufferGeometry(1000, 1000);

  var floor = new THREE.Mesh(geometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);
}


function setScene() {
   scene = new THREE.Scene();
   camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.001, 70000);
   camera.position.set(0, 15, 0);
   scene.add(camera);

   renderer = new THREE.WebGLRenderer();
   element = renderer.domElement;
   container = document.getElementById('webglviewer');
   container.appendChild(element);

   effect = new THREE.StereoEffect(renderer);
}

function setControls() {
   // Our initial control fallback with mouse/touch events in case DeviceOrientation is not enabled
   controls = new THREE.OrbitControls(camera, element);
   controls.target.set(
      camera.position.x + 0.15,
      camera.position.y,
      camera.position.z
   );
   controls.noPan = true;
   controls.noZoom = true;

   // Our preferred controls via DeviceOrientation
   function setOrientationControls(e) {
      if (!e.alpha) {
         return;
      }

      controls = new THREE.DeviceOrientationControls(camera, true);
      controls.connect();
      controls.update();

      element.addEventListener('click', fullscreen, false);

      window.removeEventListener('deviceorientation', setOrientationControls, true);
   }
   window.addEventListener('deviceorientation', setOrientationControls, true);
}


function createBubbles() {
   var geometry = new THREE.SphereBufferGeometry(100, 32, 16);

   var textureCube = new THREE.CubeTextureLoader()
      .setPath('textures/cube/skybox')
      .load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']);
   textureCube.mapping = THREE.CubeRefractionMapping;

   var material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      envMap: textureCube,
      refractionRatio: 0.95
   });

   for (var i = 0; i < 500; i++) {

      var mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = Math.random() * 10000 - 5000;
      mesh.position.y = Math.random() * 10000 - 5000;
      mesh.position.z = Math.random() * 10000 - 5000;
      mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1;
      scene.add(mesh);

      spheres.push(mesh);

   }
}


function setBackground() {
   scene.background = new THREE.CubeTextureLoader()
      .setPath('textures/NissiBeach2/')
      .load(['posx.jpg', 'negx.jpg', 'posy.jpg', 'negy.jpg', 'posz.jpg', 'negz.jpg']);

}

function resize() {
   var width = container.offsetWidth;
   var height = container.offsetHeight;

   camera.aspect = width / height;
   camera.updateProjectionMatrix();

   renderer.setSize(width, height);
   effect.setSize(width, height);
}

function update(dt) {
   resize();
   camera.updateProjectionMatrix();
   controls.update(dt);
}

function render(dt) {
   effect.render(scene, camera);
}

function fullscreen() {
   if (container.requestFullscreen) {
      container.requestFullscreen();
   } else if (container.msRequestFullscreen) {
      container.msRequestFullscreen();
   } else if (container.mozRequestFullScreen) {
      container.mozRequestFullScreen();
   } else if (container.webkitRequestFullscreen) {
      container.webkitRequestFullscreen();
   }
}

function getURL(url, callback) {
   var xmlhttp = new XMLHttpRequest();

   xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4) {
         if (xmlhttp.status == 200) {
            callback(JSON.parse(xmlhttp.responseText));
         } else {
            console.log('We had an error, status code: ', xmlhttp.status);
         }
      }
   }

   xmlhttp.open('GET', url, true);
   xmlhttp.send();
}

//

function animate() {
   requestAnimationFrame(animate);
   update();
   render();
}

function render() {
   var timer = 0.0001 * Date.now();
   for (var i = 0, il = spheres.length; i < il; i++) {
      var sphere = spheres[i];
      sphere.position.x = 5000 * Math.cos(timer + i);
      sphere.position.y = 5000 * Math.sin(timer + i * 1.1);
   }
   effect.render(scene, camera);
}