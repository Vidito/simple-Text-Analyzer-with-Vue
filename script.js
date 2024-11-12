        const { createApp, ref } = Vue;
        
        createApp({
            setup() {
                const text = ref('');
                const wordCount = ref(0);
                const charCount = ref(0);
                const sentenceCount = ref(0);
                
                const analyzeText = () => {
                    wordCount.value = text.value.split(/\s+/).filter(word => word.length > 0).length;
                    charCount.value = text.value.length;
                    sentenceCount.value = text.value.split(/[.!?]/).filter(sentence => sentence.length > 0).length;
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
                    text.value = text.value.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
                };
                
                const removeStopwords = () => {
                    const stopwords = ['a', 'an', 'and', 'the', 'is', 'in', 'at', 'of', 'on', 'for', 'with', 'as', 'by', 'to', 'from'];
                    text.value = text.value.split(' ').filter(word => !stopwords.includes(word.toLowerCase())).join(' ');
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
                    text.value = text.value.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '').replace(/\S+@\S+\.\S+/g, '');
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
                    removeUrlsEmails
                };
            }
        }).mount('#app');
