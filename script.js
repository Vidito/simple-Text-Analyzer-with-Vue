// Create Vue app using the createApp function from Vue
const { createApp, ref } = Vue;

createApp({
  // The setup function contains all our app's logic
  setup() {
    // Create reactive variables using ref
    // These will automatically update the UI when their values change
    const text = ref(''); // Stores the text input
    const wordCount = ref(0); // Stores word count
    const charCount = ref(0); // Stores character count
    const sentenceCount = ref(0); // Stores sentence count

    // Function to count words, characters, and sentences
    const analyzeText = () => {
      // Count words by:
      // 1. Split text by spaces using split(/\s+/)
      // 2. Filter out empty strings
      // 3. Count remaining words using length
      wordCount.value = text.value
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0).length;

      // Count all characters (including spaces)
      charCount.value = text.value.length;

      // Count sentences by:
      // 1. Split text by period, exclamation mark, or question mark
      // 2. Filter out empty strings
      // 3. Count remaining sentences using length
      sentenceCount.value = text.value
        .trim()
        .split(/[.!?]/)
        .filter((sentence) => sentence.length > 0).length;
    };

    // Function to clear all text and reset counts
    const cleanText = () => {
      // Clear the text
      text.value = '';
      // Reset all counts to zero
      wordCount.value = 0;
      charCount.value = 0;
      sentenceCount.value = 0;
    };

    // Basic text cleaning functions
    const removeExtraSpaces = () => {
      // Replace multiple spaces with a single space and remove leading/trailing spaces
      text.value = text.value.replace(/\s+/g, ' ').trim();
    };

    const lowercaseText = () => {
      // Convert text to lowercase
      text.value = text.value.toLowerCase();
    };

    const removePunctuation = () => {
      // Remove specified punctuation marks including (), _ - / \ |
      text.value = text.value.replace(/[.,!?;:'"()_\-\/\\|]/g, '');
    };

    const removeWeirdCharacters = () => {
      // Create a regex pattern to match non-ASCII characters
      const pattern = /[^\x00-\x7F]/g;
      // Replace non-ASCII characters with an empty string
      text.value = text.value.replace(pattern, '');
    };

    // Simple find and replace function
    const findAndReplace = () => {
      // Get the word to find
      const findWord = prompt('Enter the word to find:');
      if (!findWord) return; // If user cancels or enters nothing, stop here

      // Get the word to replace it with
      const replaceWord = prompt('Enter the word to replace it with:');
      if (replaceWord === null) return; // If user cancels, stop here

      // Replace all occurrences of the word (case-insensitive)
      const regex = new RegExp(findWord, 'gi');
      text.value = text.value.replace(regex, replaceWord);
    };

    const removeLineBreaks = () => {
      // Replace all types of line breaks with a space
      text.value = text.value.replace(/\n/g, ' ');
    };

    // Simple HTML tag removal
    const removeHtml = () => {
      // Remove anything between < and >
      text.value = text.value.replace(/<[^>]*>/g, '');
    };

    const removeNumbers = () => {
      // Remove all digits
      text.value = text.value.replace(/[0-9]/g, '');
    };
    const removeStopwords = () => {
      const stopwords = [
        'i',
        'me',
        'my',
        'myself',
        'we',
        'our',
        'ours',
        'ourselves',
        'you',
        'your',
        'yours',
        'yourself',
        'yourselves',
        'he',
        'him',
        'his',
        'himself',
        'she',
        'her',
        'hers',
        'herself',
        'it',
        'its',
        'itself',
        'they',
        'them',
        'their',
        'theirs',
        'themselves',
        'what',
        'which',
        'who',
        'whom',
        'this',
        'that',
        'these',
        'those',
        'am',
        'is',
        'are',
        'was',
        'were',
        'be',
        'been',
        'being',
        'have',
        'has',
        'had',
        'having',
        'do',
        'does',
        'did',
        'doing',
        'a',
        'an',
        'the',
        'and',
        'but',
        'if',
        'or',
        'because',
        'as',
        'until',
        'while',
        'of',
        'at',
        'by',
        'for',
        'with',
        'about',
        'against',
        'between',
        'into',
        'through',
        'during',
        'before',
        'after',
        'above',
        'below',
        'to',
        'from',
        'up',
        'down',
        'in',
        'out',
        'on',
        'off',
        'over',
        'under',
        'again',
        'further',
        'then',
        'once',
        'here',
        'there',
        'when',
        'where',
        'why',
        'how',
        'all',
        'any',
        'both',
        'each',
        'few',
        'more',
        'most',
        'other',
        'some',
        'such',
        'no',
        'nor',
        'not',
        'only',
        'own',
        'same',
        'so',
        'than',
        'too',
        'very',
        's',
        't',
        'can',
        'will',
        'just',
        'don',
        'should',
        'now',
        'therefore',
        'however',
        'thus',
        'yet',
        'also',
        'although',
        'though',
        'as well',
        'besides',
        'both',
        'either',
        'neither',
      ];
      text.value = text.value
        .split(' ')
        .filter((word) => !stopwords.includes(word.toLowerCase()))
        .join(' ');
    };

    // Return all variables and functions that we want to use in our template
    return {
      text,
      wordCount,
      charCount,
      sentenceCount,
      analyzeText,
      cleanText,
      removeExtraSpaces,
      lowercaseText,
      removePunctuation,
      removeStopwords,
      findAndReplace,
      removeLineBreaks,
      removeHtml,
      removeNumbers,
      removeWeirdCharacters,
    };
  },
}).mount('#app'); // Mount the app to the element with id="app"
