# Task comments

1. Code review: please list all good/bad practices you find in this application.

To make a more real-life example, I created a new branch, I deleted index.html contents and then recovered it, and I added all code review comments on it too, marking the lines where I found errors, and some general issues. https://github.com/eudelvigio/recruitment-challenges/pull/2

## Good Practices

- I like the pseudo component approach, the index.html file has all needed html, js and css
- JS script part is well documented, maybe a bit overkill, but is better than no comments at all
- Max line length is 82, improving visualization on small screens and resolutions
- Correct camelCase on all js

## Bad Practices

- Index.html is a long file, forcing to make long scroll (>200 lines)
- If it is a HTML document, must have mandatory html, head and body tags
- In HTML, every id must be different from another, and all buttons share same id
- The `el` function can be a bit confusing, as is using two differents dom functions based on the first character of the string parameter. Maybe can reduce a bit the amount of code, but you must look on the function to know how it works
- The oldNum, theNum and resultNum shouldn't store strings, the type of the variable should be consistent. While it can have some almost-advantages, as simplify the part of creating a big number, is something that should be avoided, as it can lead to errors and unexpected issues on the code. This bad practice is used in many parts of the file
- At the end of the file, line 199, the `el` function is being used, but is better to have an extra declaration on the header (lines 100 - 108) than to call a confusing function here
- I would prefer that all colors are hexadecimal or RGB, not mixing it. Is only the background color on line 29, but I prefer it consistent.

## Errors

- Line 18, while number shown is "0", its data-num attribute has "3", so every time I click on "0" button, it puts a "3" on the result
- Line 22, while number shown is "3", its data-num attribute has "0", so every time I click on "3" button, it puts a "0" on the result
- Under styles, is using cascades under the .calculator class (lines 42-56), which in css are not allowed, and there are not any build instructions nor "lang" attribute on style tag
- Under displayNum function (which by the way can be a bit confusing name), under the switch in line 140, it seems to have the operations switched, application is going to subtract when pressing "+", and sum when pressing "-"
- Calculator allows to put unlimited decimal separators ".", while maths only should allow one. This also leads to error with parseFloat functions.


2. It seems the app is buggy... Could you fix it?

I rewrite the application trying to fix detected issues while maintaining current structure. While at start I was thinking on dropping accumulator string for number, at the end I realise that js logic is too hard, and can lead to some extra errors (management of adding and showing "." in particular), so what I done is to assure that every variable maintain its type, and only in needed moments I make the conversion.
Also, to avoid the issue about decimal numbers operation in js, I changed the application counting decimal numbers to perform only integer operations.

As changes was done in code, I increased patch part of the version

3. Add divide and multiply operations.

I decide to use the float numbers directly, because divide and multiply operations can be risky with some numbers, and I think I should add too much logic for achieve it with the integer version.

Also, something I didn't explain before is that I think that, as a legacy app, the button order can be important for current users, so I prefer maintain current layout, and add new buttons on the remaining space of the calculator

As an update was done to the app, and it is a improvement, we should increase package version to 1.3.1

4. How would do you test this app?

As it is something like an html page, I think best way to test application in its current state is to use JSDOM with jest, having the capability of test clicks and expect results, it has end to end tests, and I find this approach ideal for this scenario

If the application is allowed to be partitioned because its usage is not coupled to being only one html page, would be interesant to make functional tests too for the js part

I added tests for all buttons, and also one of each operation, trying to manage limit cases, and it helped me to implement multiply and division with the integer system. It has some drawbacks, result number can have more decimals than the sum of operand decimals, so while we avoid issues with numbers in js, we have lost precission. Maybe the best way is to add a decimal number library, like decimal.js to deal with this issues easily.

Also, I have refactorized a bit the app, like one `el` to header, and also the way to manage decimals. And I fixed some vulnerabilities found on installed package


5. Can you improve the UI/UX?

I did several improvements to UI and UX, like formatting numbers, allowing scroll on result viewer, and an effect when button is pressed.

Also I add keyboard interaction on this task, as I consider it a UX improvement. I found several issues when writing fast with keyboard, so I decide to limit speed here. Also, I found a test issue, as it was added after the development, on decimal numbers. I decide to use a numberformat from Intl package, and I was having issues with numbers with more than 2 decimals, as `writerNum` variable was still accepting more decimals. So I added a new variable setting max decimal numbers, both for the numberFormatter and writerNum.

As mentioned before, as this is a legacy app, I understand there are people using it, so I think, without extra information, that would be risky to modify current layout, maybe can exist some reason to be like is. I planned to make a new layout, and maybe a layout switcher, increasing the major version of the app, as it includes breaking changes. As it is not the case, I only increase minVersion on package json for the improvements done

---

# Payvision calculator

In this exercise you are given the legacy code of Payvision Calculator web app. Maintainance and new features development is your responsability.

## Your tasks

1. Code review: please list all good/bad practices you find in this application.
2. It seems the app is buggy... Could you fix it?
3. Add divide and multiply operations.
4. How would do you test this app?
5. Can you improve the UI/UX?

You are allowed to change as much code as you consider.

**Bonus:**

1. Configure the application to allow use of keyboard numpad.

### 1. Code review

Are you a good code reviewer? This would be one of your daily basis tasks.

- Help our team, list good and bad practices you find, identify bugs or defects and suggest improvements. How would you refactorize it?

Please add code inline comments or include them into your readme file.

### 2. Testing and bug fixing

Product quality, testing and finding bugs is really important at Payvision. This application seems it does not work fine...

Test it and fix any potential bug you find. Feel free to document your findings in readme file or help yourself with commit messages.

### 3. New features implementation

Our product owner required us new features for this application. We would like the application new version to support multiplications and divisions.

- Could you implement these new features?
- Bear in mind usage of git-flow to track your changes.
- Current version is 1.2.2 (see package.json version). Should we increase the version? How? Why?

### 4. Test automation

We would like to automate testing of this application.

- What kind of tests would you implement? Why?

**Bonus**: Implement the tests.

### 5. UI/UX design

Do you consider yourself a good designer or UI/UX developer?

- Improve the UI/UX to be more user friendly.

Feel free to do any changes. Show us what you are capable to!

## How to run the application using local server

To run the project, open a terminal and execute the following command from project root path:

- Install depencencies:

> yarn

- Run the application

> yarn serve

This command will run a local web server in port 8082:
[http://localhost:8082/src/index.html](http://localhost:8082/src/index.html)
