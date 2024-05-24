import React, { useState, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { ChakraProvider } from '@chakra-ui/react'
import { HTML5Backend } from "react-dnd-html5-backend";
import update from 'immutability-helper';


import "./App.css";
import sound from "./jfk.wav";
import Advance from "./examples/tinderCard/Advance";
import Tindercard from "./examples/tinderCard";
import TextToSpeech from "./examples/Voice/TextToSpeech";
import AudioABC from "./examples/Voice";
// import PictureABC from "./examples/PictureABC";
import SpellWord from "./examples/SpellVocabulary";
import DragDrop from "./examples/VocabularyDnD";

const jfk = new Audio(sound);

const Quiz = [
  {
    id: 1,
    role: "Chiikawa",
    answer: "abc",  //ちいかわ
    audioUrl: jfk,
    imgURL: "images/Chiikawa_main.jpg",
  },
  {
    id: 2,
    role: "Usagi",
    answer: "うさぎ",
    audioUrl: jfk,
    imgURL: "images/Usagi_main.webp",
  },
  {
    id: 3,
    role: "Hachi",
    answer: "ハチワレ",
    audioUrl: jfk,
    imgURL: "images/Hachi_main.webp",
  },
  {
    id: 4,
    role: "Shisa",
    answer: "シーサー",
    audioUrl: jfk,
    imgURL: "images/susa.webp",
  },
];

const AllOptions = [
  "ちいかわ",
  "うさぎ",
  "ハチワレ",
  "モモンガ",
  "シーサー",
  "ラッコ",
];

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <ChakraProvider>
      <div className="app">
        {/* <Tindercard Quiz={Quiz}/> */}
        {/* <AudioABC Quiz={Quiz} AllOptions={AllOptions} setWrongAnswers={setWrongAnswers}/> */}
        {/* <PictureABC Quiz={Quiz} setWrongAnswers={setWrongAnswers}/> */}
        {/* <SpellWord Quiz={Quiz}/> */}
        <DragDrop Quiz={Quiz} />
      </div>
      </ChakraProvider>
    </DndProvider>
  );
};

export default App;
