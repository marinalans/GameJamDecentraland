import { MeshCollider, Transform, engine, InputAction, Material, MeshRenderer, PointerEventType, inputSystem, pointerEventsSystem, Entity } from '@dcl/sdk/ecs'
import { movePlayerTo } from '~system/RestrictedActions'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { height, sceneSizeX, sceneSizeZ, radiusMultiplier } from './resources'
import { Skybox } from './skybox'

let dreams: Skybox[]

export function main() {

	let i = 1, j = 1
	const MAX_DREAM = 4

	while(i < MAX_DREAM){
		const dream = new Skybox(i)
		if(i == 1) dream.show()
		dreams.push(dream)
		i++
	}
	

	let carpetFlyer = engine.addEntity()
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

	
	const clickableEntity = engine.addEntity()
	MeshRenderer.setBox(clickableEntity)
	MeshCollider.setBox(clickableEntity)
	Transform.create(clickableEntity, { position: Vector3.create(sceneSizeX / 2, 1, sceneSizeZ / 2) })
	pointerEventsSystem.onPointerDown(
		{
			entity: clickableEntity, 
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
		scale: Vector3.create(1, 1, 1)
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
			dreams[j-1].hide()
			if(j == MAX_DREAM) j = 1
			dreams[j].show()	
			j++		
			Transform.create(sphere, {
				position: Vector3.create(sceneSizeX/ 2 - Math.random() * 0, height / 2 + Math.random() * 10, sceneSizeZ/ 2 - Math.random() * 10),
				rotation: Quaternion.fromEulerDegrees(0, 90, 0),
				scale: Vector3.create(1, 1, 1)
			})
		}
	)
	
	
}
