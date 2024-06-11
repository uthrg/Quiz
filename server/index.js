require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const FormData = require("form-data");
const axios = require("axios");
const { Readable } = require("stream");

const app = express();
const port = 5800;

app.use(cors());

const bufferToStream = (buffer) => {
  return Readable.from(buffer);
};

const upload = multer(
//   {
//   limits: {
//     fileSize: 1024*1024
//   }
// }
);


app.post("/transcribe", upload.single("file"), async (req, res) => {
  const audio = req.file;
  console.log("audio", audio);

  try {
    if (!audio) {
      return res.status(400).json({ error: "No audio file provided" });
    }
    const formData = new FormData();
    const audioStream = bufferToStream(audio.buffer);
    formData.append('file', audioStream, {filename: req.file.originalname, contentType:req.file.mimetype});
    formData.append("model", "whisper-1");

    const config = {
      headers: {
        "Content-Type": "multipart/form-data" ,
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    };
    // Call the OpenAI Whisper API to transcribe the audio
    const response = await axios.post(
      "https://api.openai.com/v1/audio/transcriptions",
      formData,
      config
    ).catch((error)=> console.log("error", error.response.data));
    console.log('!!', response.data.text)
    const transcription = response.data.text;
    res.json({ transcription });
  } catch (error) {
    console.error("Error transcribing audio:", error);
    res.status(500).json({ error: "Error transcribing audio" });
  }
});

app.listen(port, () => {
  console.log(`listen to ${port}`);
});
