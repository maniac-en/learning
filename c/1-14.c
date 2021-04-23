/* Exercise 1-14. Write a program to print a histogram of
 * the frequencies of different characters it its input */

#include <stdio.h>
#include <ctype.h>

#define SIZE 128		/* number of characters in the ASCII character set */

int main() {
	int c, i, reference;
	int ncharacters[SIZE];

	for (i = 0; i < SIZE; ++i)
		ncharacters[i] = 0;
	reference = 0;

	while ((c = getchar()) != EOF)
		++ncharacters[c];

	/* Routine for creating the vertical histogram */

	/* Find the largest frequency and set as reference */
	for (i = 0; i < SIZE; ++i) {
		if (ncharacters[i] > reference)
			reference = ncharacters[i];
	}

	/* Routine to create the actual vertical histogram */
	putchar('\n');
	while (reference > 0) {
		printf("  ");
		for (i = 0; i < SIZE; ++i) {
			if (ncharacters[i] > 0) {
				if (ncharacters[i] >= reference)
					putchar('|');
				else
					putchar(' ');
				printf("  ");
			}
		}
		printf("\n");
		--reference;
	}

	/* Label on the x-axis */
	for (i = 0; i < SIZE; ++i) {
		if (ncharacters[i] > 0) {
			if (i == ' ')
				printf(" \\s");
			else if (i == '\t')
				printf(" \\t");
			else if (i == '\n')
				printf(" \\n");
			else if (isprint(i))
				printf("%3c", i);
			else
				printf(" \\@");		// non-printable chars
		}
	}
	printf("\n");

	return 0;
}
