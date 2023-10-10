"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const pdf_parse_1 = __importDefault(require("pdf-parse"));
const summarize_1 = require("./service/summarize");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
app.use(express_1.default.json());
app.post('/upload', upload.single('file'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded.' });
        }
        const pdfData = yield (0, pdf_parse_1.default)(req.file.buffer);
        const textContent = pdfData.text;
        // Implement your summarization logic here
        const summarizedText = (0, summarize_1.summarizeText)(textContent);
        // Send the summarized text as a response
        res.json({ summarizedText });
    }
    catch (error) {
        console.error("error");
        res.status(500).json({ error: 'An error occurred during summarization.' });
    }
}));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
