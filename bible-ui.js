// need bible.lib.js

var OverWorld = Java.type("noppes.npcs.api.NpcAPI").Instance().getIWorld(0);

function makeArrayWithNumbers(size, firstNumber) {
  var array = []
  firstNumber = firstNumber || 0
  for (var i = firstNumber;i < size + firstNumber; i++)
    array.push(i)
  return array
}

var ButtonGrid = {
  // list for removing showed buttons
  button_id_list: [],

  show: function(width, height, button_passport_list, props) {

    // props is custom property
    props = props || {}

    var MAX_Y         = props.max_y || 14

    var X_MARGIN      = ( props.x_margin || 32 ) * -1
    var Y_MARGIN      = props.y_margin || 18

    var BUTTON_WIDTH  = props.button_width || 28
    var BUTTON_HEIGHT = props.button_height || 16

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

    var button_passport_iterator = {
      index: 0,
      next: function() {
        var res = button_passport_list[this.index]
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

        var current_button_passport = button_passport_iterator.next()

        // skip last buttons without titles
        if (current_button_passport == undefined)
          return

        var button_title = current_button_passport.title
        var button_on_click = current_button_passport.onClick
        
        this.button_id_list.push(component_id)
        ScriptGuiEvents.button.register(component_id, button_on_click)
        UI.addButton(component_id, button_title, x_pos, y_pos, BUTTON_WIDTH, BUTTON_HEIGHT)
      }
    }
  },
  
  hide: function() {
    this.button_id_list.map( function(id) {
      UI.removeComponent(id)
      ScriptGuiEvents.button.unregister(id)
    } )
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
    ButtonGrid.hide()
    var button_passports = makeArrayWithNumbers(66, 1).map(function(num) {
      return {
        title: num,
        onClick: function(event) {
          ChapterList.show()
          UI.update(event.player)
        }
      }
    })
    ButtonGrid.show(6, 11, button_passports)
  },
  hide: function() {
    ButtonGrid.hide()
  }
}

var ChapterList = {
  show: function() {
    ButtonGrid.hide()
    var button_passports = makeArrayWithNumbers(150, 1).map(function(num) {
      return {
        title: num,
        onClick: function(event) {
          ButtonGrid.hide()
          UI.update(event.player)
        }
      }
    })
    ButtonGrid.show(8, 19, button_passports, { button_width: 24, x_margin: 28 })
  },
  hide: function() {
    ButtonGrid.hide()
  }
}

var scriptGuiList = {}
var ScriptGuiEvents = {
  button: {
    register: function(id, onClick) {
      this[id] = onClick
    },
    unregister: function(id) {
      delete this[id]
    }
  },
  close:  {},
  slot:   {},
  scroll: {},

}

var guiId = 8
var UI
void function (guiId) {
  scriptGuiList[guiId] = Java.type("noppes.npcs.api.NpcAPI").Instance().createCustomGui(guiId, 256, 256, false); 
  UI = scriptGuiList[guiId]
  scriptGuiList[guiId].setBackgroundTexture("minecraft:textures/gui/book.png");
  scriptGuiList[guiId].setSize(180, 190);
  ScriptGuiEvents.close[guiId] = function() {}
}(guiId);

function interact(event) {
  BookList.show()
  event.player.showCustomGui(scriptGuiList[8]);
}


function customGuiButton(event) {
  ScriptGuiEvents.button[event.buttonId](event)
}

function customGuiSlot(event) {
  ScriptGuiEvents.slot[event.slotId](event)
}

function customGuiClosed(event) {
  ScriptGuiEvents.close[event.gui.getID()](event)
}


