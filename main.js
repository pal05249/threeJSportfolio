import './style.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


//scene
const scene = new THREE.Scene();

//camera
const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.setZ(80)
    //renderer
const renderer = new THREE.WebGL1Renderer({
    canvas: document.querySelector('#bg')
})
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)

//objects
const geometry = new THREE.TorusKnotGeometry(10, 50, 50, 50)
const material = new THREE.PointsMaterial({ color: 0xb3ffb3, size: 0.1 })
const torus = new THREE.Points(geometry, material)

//lights
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(10, 50, 10)

const ambeintLight = new THREE.AmbientLight(0x404040)

scene.add(torus, pointLight, ambeintLight)

const lightHelper = new THREE.PointLightHelper(pointLight, 1, 0xffffff)
scene.add(lightHelper)

const controls = new OrbitControls(camera, renderer.domElement)


function addStar() {
    var geometry2 = new THREE.SphereGeometry(0.05)
    var material2 = new THREE.MeshBasicMaterial({ color: 0xb3ffb3 })
    var star = new THREE.Mesh(geometry2, material2)
    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(50))

    star.position.set(x, y, z)
    scene.add(star)
}

// Array(1000).fill().forEach(addStar)



const spaceTexture = new THREE.TextureLoader().load('space2.jpg')
scene.background = spaceTexture

function moveCamera() {
    const t = document.body.getBoundingClientRect().top;


    camera.position.z = t * -0.01
    camera.position.x = t * -0.0002
    camera.position.y = t * -0.0002


}



document.body.onscroll = moveCamera
moveCamera();

function animate() {
    requestAnimationFrame(animate)
    torus.rotation.x += 0.0001;
    torus.rotation.y += 0.0005;
    torus.rotation.z += 0.0001

    controls.update()
    renderer.render(scene, camera)
}
animate()