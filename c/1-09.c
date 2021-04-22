/* Exercise 1-9. Write a program to copy its input to its
 * output, replacing each string of one or more blanks by a
 * single blank. */

#include <stdio.h>

int main() {
	int character, spaceFound;
	spaceFound = 0;

	while ((character = getchar()) != EOF) {

		if (character != ' ')
			putchar(character);

		else if (character == ' ') {
			if (spaceFound == 0) {
				putchar(' ');
				spaceFound = 1;
			}
		}
	}
	return 0;
}

