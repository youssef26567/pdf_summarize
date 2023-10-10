 
 export function summarizeText(text: string): string {
    // Split the text into sentences (you can use a more sophisticated sentence tokenizer)
    const sentences = text.split('.');
  
    // Calculate the importance score for each sentence
    const sentenceScores: { sentence: string; score: number }[] = [];
    for (const sentence of sentences) {
      const words = sentence.split(' ');
      const score = words.length; // You can use more advanced scoring methods
      sentenceScores.push({ sentence, score });
    }
  
    // Sort sentences by score in descending order
    sentenceScores.sort((a, b) => b.score - a.score);
  
    // Select the top sentences for the summary (e.g., top 3 sentences)
    const numSentencesToInclude = Math.min(8, sentenceScores.length);
    const summarizedSentences = sentenceScores
      .slice(0, numSentencesToInclude)
      .map((entry) => entry.sentence);
  
    // Join the selected sentences as the summary
    return summarizedSentences.join('. ');
  }