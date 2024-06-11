// const express = require('express')
require("dotenv").config();

// const fs = require("fs");
const axios = require("axios");

export const speechToText = async (audioFile) =>{
  const formData = new FormData();
  formData.append("file", audioFile);
  formData.append("model", "whisper-1");
  formData.append("language", "zh");
  const response = await axios.post(
    "https://api.openai.com/v1/audio/transcriptions",
    {
      formData,
      model: "whisper-1",
    },
    {
      headers : {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      }
    }
  );

  return console.log(response.data.text); 
}

// async function main () {
//   const file = fs.createReadStream("jfk.wav")
//   speechToText(file)
// }

// main();