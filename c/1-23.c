/* Exercise 1-23. Write a program to remove all comments
 * from a C program. Don't forget to handle quoted strings
 * and character constants properly. C comments do not
 * nest.  */

/* Procedure:
	-> check for '/'
		-> if next char is '*', then skip printing till it ends
		-> if next char is '/', then skip printing till new line
		-> if none of above, print '/' char as it is */

#include <stdio.h>

int main() {
	int currentChar, nextChar, tempChar1, tempChar2, skipChar;

	while ((currentChar = getchar()) != EOF) {
		if (currentChar == '/') {
			nextChar = getchar();

			if (nextChar == '*') {
				tempChar1 = getchar();
				tempChar2 = getchar();
				while (tempChar1 != '*' || tempChar2 != '/') {
					tempChar1 = tempChar2;
					tempChar2 = getchar();
				}
			} else if (nextChar == '/') {
				// skip till newline
				while ((skipChar = getchar()) != '\n')
					;
				putchar('\n');	// newline replacing single line comment

			} else
				putchar(currentChar);
		} else
			putchar(currentChar);
	}
	return 0;
}
