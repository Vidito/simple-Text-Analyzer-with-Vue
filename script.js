const { createApp, ref } = Vue;

createApp({
  setup() {
    const text = ref('');
    const wordCount = ref(0);
    const charCount = ref(0);
    const sentenceCount = ref(0);

    const analyzeText = () => {
      wordCount.value = text.value
        .split(/\s+/)
        .filter((word) => word.length > 0).length;
      charCount.value = text.value.length;
      sentenceCount.value = text.value
        .split(/[.!?]/)
        .filter((sentence) => sentence.length > 0).length;
    };

    const cleanText = () => {
      text.value = '';
      wordCount.value = 0;
      charCount.value = 0;
      sentenceCount.value = 0;
    };

    const removeExtraSpaces = () => {
      text.value = text.value.replace(/\s+/g, ' ').trim();
    };

    const lowercaseText = () => {
      text.value = text.value.toLowerCase();
    };

    const removePunctuation = () => {
      text.value = text.value.replace(
        /[.,\/#!$%\^&\*;:{}=\-_`~()'\[\]\\?<>|""]/g,
        ''
      );
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

    const findAndReplace = () => {
      const find = prompt('Enter the word to find:');
      const replace = prompt('Enter the word to replace with:');
      if (find && replace) {
        const regex = new RegExp(find, 'gi');
        text.value = text.value.replace(regex, replace);
      }
    };

    const removeLineBreaks = () => {
      text.value = text.value.replace(/(\r\n|\n|\r)/gm, ' ');
    };

    const removeHtml = () => {
      text.value = text.value.replace(/<\/?[^>]+(>|$)/g, '');
    };

    const removeNumbers = () => {
      text.value = text.value.replace(/[0-9]/g, '');
    };

    const removeUrlsEmails = () => {
      text.value = text.value
        .replace(/(?:https?|ftp):\/\/[\n\S]+/g, '')
        .replace(/\S+@\S+\.\S+/g, '');
    };

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
      removeUrlsEmails,
    };
  },
}).mount('#app');
