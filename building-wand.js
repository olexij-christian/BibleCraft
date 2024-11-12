// need building.js

function init(e) {
  e.item.setTexture(1, "variedcommodities:magic_wand")
}

var first_block_pos = null
var second_block_pos = null

function interact(e) {

  // interact with block
  if (e.type == 2) { 
    if (!first_block_pos) {
      first_block_pos = e.target.getPos()
      second_block_pos = first_block_pos
    }
    else
      second_block_pos = e.target.getPos()
  }

  // interact with air
  else if (e.type == 0) {
    first_block_pos = null
    second_block_pos = null
  }
}

function tick(e) {

  // area must be selected
  if (!first_block_pos || !second_block_pos)
    return

  var player_item = e.player.getMainhandItem()
  if (e.item.compare(player_item, false)) {
    spawnParticleBy3DEdgeArea(e.player.world, "flame", first_block_pos, second_block_pos)
  }
}
