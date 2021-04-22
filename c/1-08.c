/* Exercise 1-8. Write a program to count blanks, tabs, and newlines */

#include <stdio.h>

int main() {
	int character, num_blanks, num_tabs, num_newlines;

	num_blanks = num_tabs = num_newlines = 0;

	while ((character = getchar()) != EOF) {
		if (character == ' ')
			++num_blanks;
		else if (character == '\t')
			++num_tabs;
		else if (character == '\n')
			++num_newlines;
	}
	printf("Blanks->%d\nTabs->%d\nNewLines->%d\n", num_blanks, num_tabs, num_newlines);
	return 0;
}
