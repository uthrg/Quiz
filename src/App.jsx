import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { ChakraProvider } from "@chakra-ui/react";
import { HTML5Backend } from "react-dnd-html5-backend";

import "./App.css";
import sound from "./jfk.wav";
import Tindercard from "./examples/tinderCard";
import AudioABC from "./examples/Audio";
import DragDrop from "./examples/DragDropWord";
import Record from "./examples/RecordChallenge";
import Layout from "./examples/Layout";

const jfk = new Audio(sound);

const Quiz = [
  {
    id: 1,
    role: "míng tài zǐ guī yú",
    answer: "明太子鮭魚",
    audioUrl: jfk,
    imgURL: "images/ricerolls_434.png",
  },
  {
    id: 2,
    role: "yù xuǎn ròu sōng",
    answer: "御選肉鬆",
    audioUrl: jfk,
    imgURL: "images/ricerolls_399.png",
  },
  {
    id: 3,
    role: "guī yú guī yú luǎn",
    answer: "鮭魚鮭魚卵",
    audioUrl: jfk,
    imgURL: "images/ricerolls_419.png",
  },
  {
    id: 4,
    role: "zhì shāo sōng bǎn zhū",
    answer: "炙燒松阪豬",
    audioUrl: jfk,
    imgURL: "images/ricerolls_430.png",
  },
];

const AllOptions = [
  "雞肉飯",
  "御選肉鬆",
  "鮭魚鮭魚卵",
  "泡菜燒肉",
  "炙燒松阪豬",
  "明太子鮭魚",
];

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <ChakraProvider>
        <div className="app">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout></Layout>}></Route>
              <Route path="/Tinder" element={<Tindercard Quiz={Quiz}/>}></Route>
              <Route path="/AudioABC" element={<AudioABC Quiz={Quiz} AllOptions={AllOptions}/>}></Route>
              <Route path="/DragDrop" element={<DragDrop Quiz={Quiz}/>}></Route>
              <Route path="/Record" element={<Record Quiz={Quiz}/>}></Route>
            </Routes>
          </BrowserRouter>
        </div>
      </ChakraProvider>
    </DndProvider>
  );
};

export default App;
