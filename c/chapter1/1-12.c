/* Exercise 1-12. Write a program that prints its input one word per line. */

#include <stdio.h>

#define IN	1 /* inside word state */
#define OUT	0 /* outside word state */

int main() {
	int character, state;

	state = OUT;
	while ((character = getchar()) != EOF) {

		if (character == ' ' || character == '\n' || character == '\t') {
			if (state == IN)
				putchar('\n');
			state = OUT;
		}

		else if (state == IN) {
			putchar(character);
		}

		else {
			putchar(character);
			state = IN;
		}
	}
	return 0;
}

