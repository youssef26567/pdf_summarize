import express from 'express';
import multer from 'multer';
import pdf from 'pdf-parse';
import { summarizeText } from './service/summarize';

const app = express();
const port = process.env.PORT || 3000;

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(express.json());

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    const pdfData = await pdf(req.file.buffer);
    const textContent = pdfData.text;

    // Implement your summarization logic here
    const summarizedText = summarizeText(textContent);

    // Send the summarized text as a response
    res.json({ summarizedText });
  } catch (error) {
    console.error("error");
    res.status(500).json({ error: 'An error occurred during summarization.' });
  }
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
