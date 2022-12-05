'use strict'

// NOTE: This is a global used only in the controller
var gLastRes = null

$(document).ready(init)
$('.btn-start').click(onStartGuessing)
$('.btn-yes').click({ ans: 'yes' }, onUserResponse)
$('.btn-no').click({ ans: 'no' }, onUserResponse)
$('.btn-add-guess').click(onAddGuess)
$('ending-form').hide()

function init() {
  console.log('Started...')
  createQuestsTree()
}

function onStartGuessing() {
  // TODO: hide the game-start section
  $('.game-start').hide()
  renderQuest()
  // TODO: show the quest section
  $('.quest').show()
}

function renderQuest() {
  // TODO: select the <h2> inside quest and update
  // its text by the currQuest text
  $('.quest').children('h2').text(getCurrQuestText())
}

function onUserResponse(ev) {
  console.log('ev', ev)
  var res = ev.data.ans
  // If this node has no children
  if (isChildless(getCurrQuest())) {
    if (res === 'yes') {
      alert('Yes, I knew it!')
      onRestartGame()
      // TODO: improve UX
    } else {
      alert('I dont know...teach me!')
      // TODO: hide and show new-quest section
      $('.quest').hide()
      $('.new-quest').show()
    }
  } else {
    // TODO: update the lastRes global var
    moveToNextQuest(res)
    gLastRes = res
    renderQuest()
  }
}

function onAddGuess(ev) {
  ev.preventDefault()
  var newGuess = $('#newGuess').val()
  var newQuest = $('#newQuest').val()

  // TODO: Get the inputs' values
  // TODO: Call the service addGuess
  addGuess(newGuess, newQuest, gLastRes)
  onRestartGame()
}

function onRestartGame() {
  $('.new-quest').hide()
  $('.quest').hide()
  $('.game-start').show()
  gLastRes = null
  init()
}
