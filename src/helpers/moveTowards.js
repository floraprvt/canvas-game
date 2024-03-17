export const moveTowards = (position, destinationPosition, speed) => {
  let distanceToTravelX = destinationPosition.x - position.x
  let distanceToTravelY = destinationPosition.y - position.y

  let distance = Math.sqrt(distanceToTravelX ** 2 + distanceToTravelY ** 2)

  if (distance <= speed) {
    // done moving
    position.x = destinationPosition.x
    position.y = destinationPosition.y
  } else {
    // move towards destination
    let normalizedX = distanceToTravelX / distance
    let normalizedY = distanceToTravelY / distance

    position.x += normalizedX * speed
    position.y += normalizedY * speed

    distanceToTravelX = destinationPosition.x - position.x
    distanceToTravelY = destinationPosition.y - position.y

    distance = Math.sqrt(distanceToTravelX ** 2 + distanceToTravelY ** 2)
  }

  return distance
}
