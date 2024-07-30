import * as THREE from 'three'
import * as dat from 'lil-gui'

// Sizes
export const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}


export const scene = new THREE.Scene();

// Camera
export const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
// const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(- 1 * aspectRatio, 1 * aspectRatio, 1, - 1, 0.1, 100)

export const pointer = new THREE.Vector2()
export const raycaster = new THREE.Raycaster()

export function resize(renderer: THREE.WebGLRenderer, camera: THREE.PerspectiveCamera, sizes: { width: number, height: number }, parentElement: HTMLElement) {
    const updateRendererSize = () => {
        const rect = parentElement.getBoundingClientRect();
        
        // Update sizes
        sizes.width = rect.width;
        sizes.height = rect.height;

        // Update camera
        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();

        // Update renderer
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    // Initial call to set sizes
    updateRendererSize();

    // Update on window resize
    window.addEventListener('resize', updateRendererSize);
    
}

export function cursor(sizes: {width: number, height: number}, camera?: THREE.Camera) {
    window.addEventListener('mousemove', (event) => {
        pointer.x = event.clientX / sizes.width - 0.5
        pointer.y = -(event.clientY / sizes.height) + 0.5
    
        raycaster.setFromCamera(pointer, camera!)
    })
}