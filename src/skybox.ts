import { MeshCollider, Transform, engine, InputAction, Material, MeshRenderer, PointerEventType, inputSystem, pointerEventsSystem, Entity, MaterialTransparencyMode, VisibilityComponent } from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { height, sceneSizeX, sceneSizeZ, radiusMultiplier } from './resources'


let skyboxRoot = engine.addEntity()
Transform.create(skyboxRoot, { position: Vector3.create(sceneSizeX / 2, height / 2, sceneSizeZ / 2) })

//Top 
let skyboxTop = engine.addEntity()
Transform.create(skyboxTop, {
    position: Vector3.create(0, height / 2 * radiusMultiplier, 0),
    rotation: Quaternion.fromEulerDegrees(-90, 0, 0),
    scale: Vector3.create(sceneSizeX * radiusMultiplier, height * radiusMultiplier, sceneSizeZ * radiusMultiplier),
    parent: skyboxRoot
})
MeshRenderer.setPlane(skyboxTop)
Material.setBasicMaterial(skyboxTop, {
    texture: Material.Texture.Common({
        src: "images/glasses.png"
    })
})


//Bottom
let skyboxBottom = engine.addEntity()
Transform.create(skyboxBottom, {
    position: Vector3.create(0, -height / 2 * radiusMultiplier, 0),
    rotation: Quaternion.fromEulerDegrees(90, 0, 0),
    scale: Vector3.create(sceneSizeX * radiusMultiplier, height * radiusMultiplier, sceneSizeZ * radiusMultiplier),
    parent: skyboxRoot
})
MeshRenderer.setPlane(skyboxBottom)
Material.setBasicMaterial(skyboxBottom, {
    texture: Material.Texture.Common({
        src: "images/floor.jpg"
    })
})


export class Skybox {
    private skyboxFront: Entity
    private skyboxLeft: Entity
    private skyboxBack: Entity
    private skyboxRight: Entity

    constructor(dreamNumber: any) {
        
        //Front
        this.skyboxFront = engine.addEntity()
        Transform.create( this.skyboxFront, {
            position: Vector3.create(0, 0, sceneSizeZ / 2 * radiusMultiplier),
            scale: Vector3.create(sceneSizeX * radiusMultiplier, height * radiusMultiplier, sceneSizeZ * radiusMultiplier),
            parent:  skyboxRoot
        })
        MeshRenderer.setPlane( this.skyboxFront)
        Material.setBasicMaterial(this.skyboxFront, {
            texture: Material.Texture.Common({
                src: `images/dreams/${dreamNumber}/Frame 2.png`
            })
        })
        VisibilityComponent.create(this.skyboxFront, { visible: false })

        //Left
        this.skyboxLeft = engine.addEntity()
        Transform.create(this.skyboxLeft, {
            position: Vector3.create(-sceneSizeX / 2 * radiusMultiplier, 0, 0),
            rotation: Quaternion.fromEulerDegrees(0, -90, 0),
            scale: Vector3.create(sceneSizeX * radiusMultiplier, height * radiusMultiplier, sceneSizeZ * radiusMultiplier),
            parent: skyboxRoot
        })
        MeshRenderer.setPlane(this.skyboxLeft)
        Material.setBasicMaterial(this.skyboxLeft, {
            texture: Material.Texture.Common({
                src: `images/dreams/${dreamNumber}/Frame 1.png`
            })
        })
        VisibilityComponent.create(this.skyboxLeft, { visible: false })

        //Back
        this.skyboxBack = engine.addEntity()
        Transform.create(this.skyboxBack, {
            position: Vector3.create(0, 0, -sceneSizeZ / 2 * radiusMultiplier),
            rotation: Quaternion.fromEulerDegrees(0, 180, 0),
            scale: Vector3.create(sceneSizeX * radiusMultiplier, height * radiusMultiplier, sceneSizeZ * radiusMultiplier),
            parent: skyboxRoot
        })
        MeshRenderer.setPlane(this.skyboxBack)
        Material.setBasicMaterial(this.skyboxBack, {
            texture: Material.Texture.Common({
                src: `images/dreams/${dreamNumber}/Frame 4.png`
            })
        })
        VisibilityComponent.create(this.skyboxBack, { visible: false })

        //Right
        this.skyboxRight = engine.addEntity()
        Transform.create(this.skyboxRight, {
            position: Vector3.create(sceneSizeX / 2 * radiusMultiplier, 0, 0),
            rotation: Quaternion.fromEulerDegrees(0, 90, 0),
            scale: Vector3.create(sceneSizeX * radiusMultiplier, height * radiusMultiplier, sceneSizeZ * radiusMultiplier),
            parent: skyboxRoot
        })
        MeshRenderer.setPlane(this.skyboxRight)
        Material.setBasicMaterial(this.skyboxRight, {
            texture: Material.Texture.Common({
                src: `images/dreams/${dreamNumber}/Frame 3.png`
            })
        })
        VisibilityComponent.create(this.skyboxRight, { visible: false })
    }

    show(): void{
        VisibilityComponent.create(this.skyboxFront, { visible: true })
        VisibilityComponent.create(this.skyboxLeft, { visible: true })
        VisibilityComponent.create(this.skyboxBack, { visible: true })
        VisibilityComponent.create(this.skyboxRight, { visible: true })   
    }

    hide(): void{
        VisibilityComponent.create(this.skyboxFront, { visible: false })
        VisibilityComponent.create(this.skyboxLeft, { visible: false })
        VisibilityComponent.create(this.skyboxBack, { visible: false })
        VisibilityComponent.create(this.skyboxRight, { visible: false })   
    }
    
}



