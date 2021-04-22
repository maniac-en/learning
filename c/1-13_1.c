/* Exercise 1-13. Write a program to print a histogram of the lengths of words
 * in its input. It is easy to draw the histogram with the bars horizontal; a
 * vertical orientation is more challenging. */

/* horizontal histogram version */

#include <stdio.h>

#define IN		1	/* inside a word */
#define OUT		0	/* outside a word */
#define MAX_HIST	15	/* max length of histogram */
#define MAX_WORDLEN	10	/* max length of word */

void printHist(int *arr);

int main() {
	int i, character, state, wordLen, wordsOverflown;
	int lenArr[MAX_WORDLEN];
	wordLen = wordsOverflown = 0;
	state = OUT;

	// initialize all values of array to zero
	for (i = 0; i < MAX_WORDLEN; ++i)
		lenArr[i] = 0;

	// get input, and store the word lengths in lenArr
	while ((character = getchar()) != EOF) {
		if (character == ' ' || character == '\n' || character == '\t') {
			if (state == IN && wordLen < MAX_WORDLEN) {
				++lenArr[wordLen];
				wordLen = 0;
			} else if(wordLen >= MAX_WORDLEN) {
				++wordsOverflown;
				wordLen = 0;
			}
			state = OUT;
		}
		else
			state = IN;

		if (state == IN)
			++wordLen;
	}

	// handle input without any tabs, spaces or newlines
	if (wordLen > 0)
		++lenArr[wordLen];

	// print histogram
	printHist(lenArr);

	// print words overflown
	printf("WO\t:: %d\n\n", wordsOverflown);

	return 0;
}

void printHist(int *arr) {
	int i, j;

	putchar('\n');

	for (i = 1; i < MAX_WORDLEN; ++i) {
		printf("%d\t:: ", i);
		for (j = 0; j < arr[i]; ++j)
			printf("=");
		putchar('\n');
	}
}
