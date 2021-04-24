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

void parse_single_quotes();
void parse_double_quotes();
void parse_comments();

int main() {
	int currentChar;
	const char *check = "\" /* not a comment */\"";
	while ((currentChar = getchar()) != EOF) {
		if (currentChar == '\'') {
			parse_single_quotes();

		} else if (currentChar == '"') {
			parse_double_quotes();

		} else if (currentChar == '/') {
			parse_comments();

		} else
			putchar(currentChar);
	}
	return 0;
}

void parse_single_quotes() {
	int currentChar;
	putchar('\'');
	while ((currentChar = getchar()) != '\n')
		putchar(currentChar);
	putchar('\n');
}

void parse_double_quotes() {
	int prevChar, currentChar;
	prevChar = '"';
	currentChar = getchar();
	while (currentChar != '"' || prevChar == '\\') {
		putchar(prevChar);
		prevChar = currentChar;
		currentChar = getchar();
	}
	putchar(prevChar);
	putchar(currentChar);
}

void parse_comments() {
	int nextChar, tempChar1, tempChar2, skipChar;
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
		putchar('/');
}
