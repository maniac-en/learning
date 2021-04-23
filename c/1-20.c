/* Exercise 1-20. Write a program detab that replaces the
 * tabs in the input with the proper number of blanks to
 * space to the next tab stop. Assume a fixed set of tab
 * stops, say every n columns. Should n be a variable or a
 * symbolic parameter?
 */

/* Answer for the second part: n should be a symbolic parameter.  */

#include <stdio.h>

#define MAX 1000
#define N 8

/* The character '*' is used to see the effect since a
   blank char can not be seen on the display */

/* Procedure:
   If the character is a tab character, the number of
   blanks will depend on the value of the current col.
   Placement of blanks will start at col up to the tab
   stop which is a factor of n.  */

int main() {
	int c, col, i, x;
	char s[MAX];

	i = 0;
	col = 1;
	while ((c = getchar()) != EOF) {
		if (c == '\t') {
			x = ((col - 1) / N) + 1;
			while (col <= x * N) {
				s[i] = '*';
				++i;

				/* Overflow  check */
				if (i == MAX - 1) {
					s[i] = '\0';
					printf("%s", s);
					i = 0;
				}
				++col;
			}
		} else {
			s[i] = c;
			++i;
			++col;
		}

		if (c == '\n')
			col = 1;

		/* Process the input when the array is full */
		if (i == MAX - 1) {
			s[i] = '\0';
			printf("%s", s);
			i = 0;
		}
	}
	/* Process the remaining input */
	s[i] = '\0';
	printf("%s", s);

	return 0;
}
