import { MeshCollider, Transform, engine, InputAction, Material, MeshRenderer, PointerEventType, inputSystem, pointerEventsSystem, Entity, VisibilityComponent } from '@dcl/sdk/ecs'
import { movePlayerTo } from '~system/RestrictedActions'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { height, sceneSizeX, sceneSizeZ, radiusMultiplier } from './resources'
import { Skybox } from './skybox'

const skyboxRoot = engine.addEntity()
Transform.create(skyboxRoot, { position: Vector3.create(sceneSizeX / 2, height / 2, sceneSizeZ / 2) })

export function main() {

	let i = 1, j = 1

	const dream1 = new Skybox(1, skyboxRoot)
	dream1.show()
	const dream2 = new Skybox(2, skyboxRoot)
	const dream3 = new Skybox(3, skyboxRoot)
	const dream4 = new Skybox(4, skyboxRoot)


	const carpetFlyer = engine.addEntity()
	Transform.create(carpetFlyer, {
		position: Vector3.create(sceneSizeX / 2, height / 2, sceneSizeZ / 2),
		scale: Vector3.create(5, 0.1, 4)
	})
	MeshCollider.setBox(carpetFlyer)
	MeshRenderer.setBox(carpetFlyer)
	Material.setBasicMaterial(carpetFlyer, {
		texture: Material.Texture.Common({
			src: "images/carpet.png"
		})
	})

	
	const bed = engine.addEntity()
	MeshRenderer.setBox(bed)
	MeshCollider.setBox(bed)
	Transform.create(bed, { position: Vector3.create(sceneSizeX / 2, 1, sceneSizeZ / 2) })
	pointerEventsSystem.onPointerDown(
		{
			entity: bed, 
			opts: {
				button: InputAction.IA_POINTER,
				hoverText: 'Sleep'
			}
		}
		,
		function () {
			movePlayerTo({ newRelativePosition: Vector3.create(sceneSizeX / 2, height / 2 + 2, sceneSizeZ / 2) })
		}
	)

	const sphere = engine.addEntity()
	Transform.create(sphere, {
		position: Vector3.create(sceneSizeX/ 2 - Math.random() * 0, height / 2 + Math.random() * 10, sceneSizeZ/ 2 - Math.random() * 10),
		rotation: Quaternion.fromEulerDegrees(0, 90, 0),
		scale: Vector3.create(0.8,0.8,0.8)
	})
	MeshRenderer.setSphere(sphere)
	MeshCollider.setSphere(sphere)
	Material.setBasicMaterial(sphere, {
		texture: Material.Texture.Common({
			src: "images/sphere.png"
		})
	})
	pointerEventsSystem.onPointerDown(
		{
			entity: sphere, 
			opts: {
				button: InputAction.IA_POINTER,
				hoverText: 'Collect'
			}
		}
		,
		function () {

			j++
			switch (j) {
				case 1: 
					dream4.hide()
					dream1.show()
				break;
				case 2: 
					dream1.hide()
					dream2.show()
				break; 
				case 3: 
					dream2.hide()
					dream3.show()
				break; 
				case 4: 
					dream3.hide()
					dream4.show()
				break;
			}
			
			if(j==4) {
				j = 0
			}
			
			Transform.getMutable(sphere).position = Vector3.create(sceneSizeX/ 2 +  Math.random() * 10, height / 2 + Math.random() * 10, sceneSizeZ/ 2 - Math.random() * 10)
				
		}
	)

	//Top 
	const skyboxTop = engine.addEntity()
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
	const skyboxBottom = engine.addEntity()
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
	
	
}
