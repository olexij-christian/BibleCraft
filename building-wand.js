// need building.js

var selected_building_name = null

var first_block_pos = null
var second_block_pos = null

function init(e) {
  e.item.setDurabilityShow(false)
  if (selected_building_name) {
    e.item.setTexture(1, "variedcommodities:sledge_hammer")
    e.item.setItemDamage(1)
  } else {
    e.item.setTexture(2, "variedcommodities:magic_wand")
    e.item.setItemDamage(2)
  }
}

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
    e.player.showCustomGui(scriptGuiList[guiId])
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

// Custom NPCs Scripter code
var scriptGuiList = {}
var scriptGuiEvents = {
  button: {},
  close:  {},
  slot:   {},
  scroll: {}
}

var guiId = 1;
void function (guiId) {
  scriptGuiList[guiId] = Java.type("noppes.npcs.api.NpcAPI").Instance().createCustomGui(guiId, 256, 256, false); 
  scriptGuiList[guiId].setBackgroundTexture("customnpcs:textures/gui/smallbg.png");
  scriptGuiList[guiId].setSize(176, 222);
  scriptGuiList[guiId].addButton(0, "Убрать виделение", 10, 10, 150, 20);
  scriptGuiEvents.button[0] = function(event) {
    first_block_pos = null
    second_block_pos = null
  };
  scriptGuiList[guiId].addTextField(2, 10, 40, 100, 20);
  scriptGuiList[guiId].addButton(3, "Сохранить", 120, 40, 40, 20);
  scriptGuiEvents.button[3] = function(event) {

    // check territory selecting
    if (!first_block_pos || !second_block_pos) {
      event.player.closeGui()
      event.player.message("Територия для копирование не виделена")
      return
    }

    var file_name = event.gui.getComponent(2).getText()

    // save building
    Building(event.player.getWorld())
      .initByArea(first_block_pos, second_block_pos)
      .save(file_name)

    // message success
    event.player.closeGui()
    event.player.message("Постойка успешно сохранена под названием \"" + file_name + "\"")

  };

  function addOrUpdateScroll() {
    scriptGuiList[guiId].addScroll(1, 10, 70, 150, 110, listBuildings())
  }

  // selected scroll element name
  var scr_elem_name
  addOrUpdateScroll()
  scriptGuiEvents.scroll[1] = function(event) {
    scr_elem_name = event.selection[0]
  }

  scriptGuiList[guiId].addButton(5, "Взять для строительства", 10, 190, 100, 20);
  scriptGuiEvents.button[5] = function(event) {  };
  scriptGuiList[guiId].addButton(6, "Удалить", 120, 190, 40, 20);
  scriptGuiEvents.button[6] = function(event) {
    deleteBuilding(scr_elem_name)
    addOrUpdateScroll()
    event.gui.update(event.player)
  };
}(guiId);


function customGuiButton(event) {
  scriptGuiEvents.button[event.buttonId](event)
}

function customGuiSlot(event) {
  scriptGuiEvents.slot[event.slotId](event)
}

function customGuiClosed(event) {
  scriptGuiEvents.close[event.gui.getID()](event)
}

function customGuiScroll(event) {
  scriptGuiEvents.scroll[event.gui.getID()](event)
}


