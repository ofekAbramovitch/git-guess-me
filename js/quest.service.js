'use strict'

const KEY = 'questsTree'
var gQuestsTree
var gCurrQuest
var gPrevQuest

function createQuestsTree() {
  gQuestsTree = loadFromStorage(KEY)
  if (!gQuestsTree) {
    gQuestsTree = createQuest('Male?')
    gQuestsTree.yes = createQuest('Gandhi')
    gQuestsTree.no = createQuest('Rita')
    saveToStorage(KEY, gQuestsTree)
  }
  gCurrQuest = gQuestsTree
  gPrevQuest = null
}

function createQuest(txt) {
  return {
    txt: txt,
    yes: null,
    no: null,
  }
}

function isChildless(node) {
  return node.yes === null && node.no === null
}

function moveToNextQuest(res) {
  // TODO: update the gPrevQuest, gCurrQuest global vars
  gPrevQuest = gCurrQuest
  gCurrQuest = gCurrQuest[res]
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
  // TODO: Create and Connect the 2 Quests to the quetsions tree
  const newQuest = gPrevQuest[lastRes]
  newQuest = createQuest(newQuestTxt)
  newQuest.yes = createQuest(newGuessTxt)
  newQuest.no = gCurrQuest
  saveToStorage(KEY, gQuestsTree)
}

function getCurrQuest() {
  return gCurrQuest
}

function getCurrQuestText() {
  return gCurrQuest.txt
}
