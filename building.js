
function spawnParticleBy3DEdgeArea(world, particle, pos1, pos2) {
  var cor1 = {
    x: pos1.getX(),
    y: pos1.getY(),
    z: pos1.getZ()
  }
  var cor2 = {
    x: pos2.getX(),
    y: pos2.getY(),
    z: pos2.getZ()
  }

  // spawn particle for every edge

  // for z edges
  execute2DEdgeArea(function(x, y) {
    spawnSimpleParticle(world, { x:x, y:y, z: cor1.z }, particle, 1)
  }, cor1.x, cor1.y, cor2.x, cor2.y)

  execute2DEdgeArea(function(x, y) {
    spawnSimpleParticle(world, { x:x, y:y, z: cor2.z }, particle, 1)
  }, cor1.x, cor1.y, cor2.x, cor2.y)

  // for y edges
  execute2DEdgeArea(function(x, z) {
    spawnSimpleParticle(world, { x:x, y: cor1.y, z:z }, particle, 1)
  }, cor1.x, cor1.z, cor2.x, cor2.z)

  execute2DEdgeArea(function(x, z) {
    spawnSimpleParticle(world, { x:x, y: cor2.y, z:z }, particle, 1)
  }, cor1.x, cor1.z, cor2.x, cor2.z)

  // and for x edges
  execute2DEdgeArea(function(z, y) {
    spawnSimpleParticle(world, { x: cor1.x, y:y, z:z }, particle, 1)
  }, cor1.z, cor1.y, cor2.z, cor2.y)

  execute2DEdgeArea(function(z, y) {
    spawnSimpleParticle(world, { x: cor2.x, y:y, z:z }, particle, 1)
  }, cor1.z, cor1.y, cor2.z, cor2.y)
}

function spawnSimpleParticle(world, cor, particle, count) {
  world.spawnParticle(particle, cor.x, cor.y, cor.z, 0, 0, 0, 0, count)
}

function execute2DEdgeArea(execute, x1, y1, x2, y2) {
  execute2DAreaWithProperties(execute, x1, y1, x2, y2, { edge_only: true })
}

function execute2DArea(execute, x1, y1, x2, y2) {
  execute2DAreaWithProperties(execute, x1, y1, x2, y2, {})
}

function execute2DAreaWithProperties(execute, x1, y1, x2, y2, props) {
  var left, right
  if (x1 > x2) {
    left = x2
    right = x1
  } else {
    left = x1
    right = x2
  }

  var top, bottom
  if (y1 > y2) {
    top = y1
    bottom = y2
  } else {
    top = y2
    bottom = y1
  }

  for (var x = left; x <= right; x++) {
    for (var y = bottom; y <= top; y++) {
      if (props.edge_only) {
        if ((x == left || x == right) || (y == bottom || y == top))
          execute(x, y);
      } else execute(x, y);
    }
  }
}

