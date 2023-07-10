import { MeshCollider, Transform, engine, InputAction, Material, MeshRenderer, PointerEventType, inputSystem, pointerEventsSystem, Entity, MaterialTransparencyMode, VisibilityComponent } from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { height, sceneSizeX, sceneSizeZ, radiusMultiplier } from './resources'

export class Skybox {
    private skyboxFront: Entity
    private skyboxLeft: Entity
    private skyboxBack: Entity
    private skyboxRight: Entity

    constructor(dreamNumber: any, pai: Entity) {
        //Front
        this.skyboxFront = engine.addEntity()
        Transform.create( this.skyboxFront, {
            position: Vector3.create(0, 0, sceneSizeZ / 2 * radiusMultiplier),
            scale: Vector3.create(sceneSizeX * radiusMultiplier, height * radiusMultiplier, sceneSizeZ * radiusMultiplier),
            parent:  pai
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
            parent: pai
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
            parent: pai
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
            parent: pai
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
        VisibilityComponent.getMutable(this.skyboxFront).visible = true
        VisibilityComponent.getMutable(this.skyboxLeft).visible = true
        VisibilityComponent.getMutable(this.skyboxBack).visible = true
        VisibilityComponent.getMutable(this.skyboxRight).visible = true   
    }

    hide(): void{
        VisibilityComponent.getMutable(this.skyboxFront).visible = false
        VisibilityComponent.getMutable(this.skyboxLeft).visible = false
        VisibilityComponent.getMutable(this.skyboxBack).visible = false
        VisibilityComponent.getMutable(this.skyboxRight).visible = false   
    }
    
}



