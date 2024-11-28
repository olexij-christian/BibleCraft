// need bible.lib.js

function makeArrayWithNumbers(size, firstNumber) {
  var array = []
  firstNumber = firstNumber || 0
  for (var i = firstNumber;i < size + firstNumber; i++)
    array.push(i)
  return array
}

function showButtonGrid(width, height, title_list) {
  var X_MARGIN = -32
  var Y_MARGIN = 18

  var MAX_Y = 15

  var BUTTON_WIDTH = 28
  var BUTTON_HEIGHT = 14

  function makeArrayWithNumbersForUI(size, firstNumber) {
    return makeArrayWithNumbers(size, firstNumber).map(function (num, index) { 
      //Java.type("noppes.npcs.api.NpcAPI").indexInstance().getIWorld(0).broadcast(index || (1).toString())
      // if row on bottom of display
      if (num >= MAX_Y)
        // then place row up
        return index - MAX_Y
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
      
      UI.addButton(component_id, title_list_iterator.next(), x_pos, y_pos, BUTTON_WIDTH, BUTTON_HEIGHT)
    }
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
    showButtonGrid(6, 11, makeArrayWithNumbers(66, 1))
  },
  hide: function() {}
}

var ChapterList = {
  show: function() {
    var x_pos_list = [1, 2, 3, 4, 5, 6, 7, 8].map(function(num) num*-28)
    var y_pos_list = [-4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(function(num) num*18)
    for (var i in x_pos_list) {
      for (var j in y_pos_list) {
        var x_pos = x_pos_list[i]
        var y_pos = y_pos_list[j]
        var first_letter = j >= 10 ? "2" : 1
        j = j >= 10 ? j - 10 : j
        var component_id = parseInt(first_letter+i.toString()+j.toString())
        
        UI.addButton(component_id, x_pos.toString(), x_pos, y_pos, 24, 14)
      }
    }
  },
  hide: function() {}
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
  BookList.show()
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


