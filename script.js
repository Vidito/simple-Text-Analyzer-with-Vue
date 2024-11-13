const { createApp, ref, watch } = Vue;

createApp({
  setup() {
    const text = ref('');
    const charCount = ref(0);
    const wordCount = ref(0);
    const sentenceCount = ref(0);
    const averageWordLength = ref(0);
    const averageSentenceLength = ref(0);
    const uniqueWordPercentage = ref(0);
    const showWordCloud = ref(false);

    // Function to analyze text
    const analyzeText = () => {
      const processedText = text.value.trim();
      const words = processedText
        .split(/\s+/)
        .filter((word) => word.length > 0);
      wordCount.value = words.length;
      charCount.value = processedText.length;

      const sentences = processedText
        .split(/[.!?]/)
        .filter((sentence) => sentence.length > 0);
      sentenceCount.value = sentences.length;

      const totalWordLength = words.reduce((sum, word) => sum + word.length, 0);
      averageWordLength.value = wordCount.value
        ? (totalWordLength / wordCount.value).toFixed(2)
        : 0;
      averageSentenceLength.value = sentenceCount.value
        ? (wordCount.value / sentenceCount.value).toFixed(2)
        : 0;

      const uniqueWords = new Set(words);
      uniqueWordPercentage.value = wordCount.value
        ? ((uniqueWords.size / wordCount.value) * 100).toFixed(2)
        : 0;
    };

    // Function to generate word cloud
    const generateWordCloud = () => {
      // Ensure the word cloud container is visible first
      showWordCloud.value = true;

      // Small delay to allow the DOM to update
      setTimeout(() => {
        const wordFreq = {};
        text.value.split(/\s+/).forEach((word) => {
          wordFreq[word] = (wordFreq[word] || 0) + 1;
        });

        const wordArray = Object.entries(wordFreq).map(([word, freq]) => [
          word,
          freq,
        ]);

        // Generate the word cloud with more consistent font sizes
        WordCloud(document.getElementById('wordCloud'), {
          list: wordArray,
          gridSize: 8,
          weightFactor: (size) => 10 + Math.log(size) * 5, // Adjust for consistent scaling
          fontFamily: 'Roboto, sans-serif',
          color: () => `hsl(${Math.random() * 360}, 80%, 60%)`,
          backgroundColor: '#ffffff',
          rotateRatio: 0.5,
        });
      }, 50); // Short delay to ensure `showWordCloud` renders first
    };

    // Text cleaning functions
    const cleanText = () => (text.value = '');
    const removeExtraSpaces = () =>
      (text.value = text.value.replace(/\s+/g, ' ').trim());
    const lowercaseText = () => (text.value = text.value.toLowerCase());
    const removePunctuation = () =>
      (text.value = text.value.replace(/[^\w\s]|_/g, '').replace(/\s+/g, ' '));
    const findAndReplace = () => {
      const find = prompt('Enter text to find:');
      const replace = prompt('Enter text to replace with:');
      if (find)
        text.value = text.value.replace(new RegExp(find, 'g'), replace || '');
    };
    const removeLineBreaks = () =>
      (text.value = text.value.replace(/\n+/g, ' '));
    const removeHtml = () => (text.value = text.value.replace(/<[^>]*>/g, ''));
    const removeNumbers = () => (text.value = text.value.replace(/\d+/g, ''));
    const removeStopwords = () => {
      const stopwords = new Set([
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
      ]);
      text.value = text.value
        .split(/\s+/)
        .filter((word) => !stopwords.has(word))
        .join(' ');
    };
    const removeWeirdCharacters = () =>
      (text.value = text.value.replace(/[^\w\s]/g, ''));

    // Watch text for updates and analyze each time it changes
    watch(text, analyzeText);

    // Return all reactive properties and functions to the template
    return {
      text,
      charCount,
      wordCount,
      sentenceCount,
      averageWordLength,
      averageSentenceLength,
      uniqueWordPercentage,
      showWordCloud,
      analyzeText,
      generateWordCloud,
      cleanText,
      removeExtraSpaces,
      lowercaseText,
      removePunctuation,
      findAndReplace,
      removeLineBreaks,
      removeHtml,
      removeNumbers,
      removeStopwords,
      removeWeirdCharacters,
    };
  },
}).mount('#app');
