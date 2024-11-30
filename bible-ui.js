// need bible.lib.js

var OverWorld = Java.type("noppes.npcs.api.NpcAPI").Instance().getIWorld(0);

function makeArrayWithNumbers(size, firstNumber) {
  var array = []
  firstNumber = firstNumber || 0
  for (var i = firstNumber;i < size + firstNumber; i++)
    array.push(i)
  return array
}

// list for removing showed buttons
var button_id_grid_list = []
var ButtonGrid = {
  button_id_list: [],
  show: function(width, height, title_list, props) {

    // props is custom property
    props = props || {}

    var MAX_Y         = props.max_y || 14

    var X_MARGIN      = ( props.x_margin || 32 ) * -1
    var Y_MARGIN      = props.y_margin || 18

    var BUTTON_WIDTH  = props.button_width || 28
    var BUTTON_HEIGHT = props.button_height || 14

    function makeArrayWithNumbersForUI(size, firstNumber) {
      return makeArrayWithNumbers(size, firstNumber).map(function (num, index) { 
        // if row on bottom of display
        if (num >= MAX_Y) {
          // then place row up
          return MAX_Y - index
        }
        else
          return num + 1
      })
        // sort from smaller to bigger for right title viewing
        .sort(function (a, b) a-b)
    }

    var title_list_iterator = {
      index: 0,
      next: function() {
        var res = title_list[this.index]
        this.index += 1
        return res
      }
    }

    var x_pos_list = makeArrayWithNumbersForUI(width).map(function(num) num * X_MARGIN)
    var y_pos_list = makeArrayWithNumbersForUI(height, -1).map(function(num) num * Y_MARGIN)

    x_pos_list.reverse()

    for (var i in x_pos_list) {
      for (var j in y_pos_list) {
        var x_pos = x_pos_list[i]
        var y_pos = y_pos_list[j]
        var first_letter = j >= 10 ? "2" : 1
        j = j >= 10 ? j - 10 : j
        var component_id = parseInt(first_letter+i.toString()+j.toString())
        var current_title = title_list_iterator.next()

        // skip last buttons without titles
        if (current_title == undefined)
          return
        
        this.button_id_list.push(component_id)
        UI.addButton(component_id, current_title, x_pos, y_pos, BUTTON_WIDTH, BUTTON_HEIGHT)
      }
    }
  },
  
  hide: function() {
    this.button_id_list.map( function(id) UI.removeComponent(id) )
    this.button_id_list = []
  }
}

var TranslationList = {
  show: function() {
    UI.addButton(100, "Синодальний", -34, 10, 50, 20)
    UI.addButton(101, "Огієнка",     -34, 32, 50, 20)
  },
  hide: function() {
    [100, 101].map(function(num) UI.removeComponent(num))
  }
}

var BookList = {
  show: function() {
    ButtonGrid.show(6, 11, makeArrayWithNumbers(66, 1))
  },
  hide: function() {
    ButtonGrid.hide()
  }
}

var ChapterList = {
  show: function() {
    ButtonGrid.show(8, 19, makeArrayWithNumbers(150, 1), { button_width: 24, x_margin: 28 })
  },
  hide: function() {
    ButtonGrid.hide()
  }
}

var scriptGuiList = {}
var scriptGuiEvents = {
  button: {},
  close:  {},
  slot:   {},
  scroll: {}
}

var guiId = 8
var UI
void function (guiId) {
  scriptGuiList[guiId] = Java.type("noppes.npcs.api.NpcAPI").Instance().createCustomGui(guiId, 256, 256, false); 
  UI = scriptGuiList[guiId]
  scriptGuiList[guiId].setBackgroundTexture("minecraft:textures/gui/book.png");
  scriptGuiList[guiId].setSize(180, 190);
  // BookList.show()
  ChapterList.show()
}(guiId);

function interact(event) {
  event.player.showCustomGui(scriptGuiList[8]);
}


function customGuiButton(event) {
  scriptGuiEvents.button[event.buttonId](event)
}

function customGuiSlot(event) {
  scriptGuiEvents.slot[event.slotId](event)
}

function customGuiClosed(event) {
  scriptGuiEvents.close[event.gui.getID()](event)
}


