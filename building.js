function saveBuilding(name, building_json) {
  var BUILDINGS_DIR_NAME = "buildings"
  var Api = Java.type("noppes.npcs.api.NpcAPI").Instance()
  var File = Java.type("java.io.File")
  var Files = Java.type("java.nio.file.Files")
  var Paths = Java.type("java.nio.file.Paths")
  var PrintWriter = Java.type('java.io.PrintWriter')
  var FileWriter = Java.type('java.io.FileWriter')

  var world_dir = Api.getWorldDir()
  var buildings_dir = new File(world_dir, BUILDINGS_DIR_NAME)

  // mkdir
  if (Files.exists(buildings_dir) == false)
    buildings_dir.mkdirs();

  var building_file_name = name + ".json"
  var building_file = new File(buildings_dir, building_file_name)
  var writer = new PrintWriter(new FileWriter(building_file, false));
  writer.println(JSON.stringify(building_json));
  writer.close();

}

function deleteBuilding(name) {
  var BUILDINGS_DIR_NAME = "buildings"
  var Api = Java.type("noppes.npcs.api.NpcAPI").Instance()
  var File = Java.type("java.io.File")
  var Files = Java.type("java.nio.file.Files")
  var Paths = Java.type("java.nio.file.Paths")

  var world_dir = Api.getWorldDir()
  var buildings_dir = new File(world_dir, BUILDINGS_DIR_NAME)

  if (Files.exists(buildings_dir) == false)
    return null

  var building_file_name = name + ".json"
  var building_file = new File(buildings_dir, building_file_name)

  return building_file.delete()

}

function getBuilding(name) {
  var BUILDINGS_DIR_NAME = "buildings"
  var Api = Java.type("noppes.npcs.api.NpcAPI").Instance()
  var File = Java.type("java.io.File")
  var Files = Java.type("java.nio.file.Files")
  var Paths = Java.type("java.nio.file.Paths")

  var world_dir = Api.getWorldDir()
  var buildings_dir = new File(world_dir, BUILDINGS_DIR_NAME)

  if (Files.exists(buildings_dir) == false)
    return null

  var building_file_name = name + ".json"
  var building_file = new File(buildings_dir, building_file_name)

  if ( building_file.exists() && building_file.isFile() ) {
    var building_file_path = Paths.get( building_file.getAbsolutePath() )
    var building_file_content = Files.readAllLines(building_file_path)[0]
    return JSON.parse(building_file_content)
  } else return null

}

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

