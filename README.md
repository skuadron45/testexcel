## How to run

1. Clone this repo at folder www\htdocs (I am using laragon)

command:
`git clone https://github.com/skuadron45/testexcel`

example:
`c:\laragon\www>git clone https://github.com/skuadron45/testexcel.git`

2. Change directory to testexcel

`
c:\laragon\www>cd testexcel
`
`
c:\laragon\www\testexcel>
`

3. Run composer install
   
`c:\laragon\www\testexcel>composer install`

4. Run php spark serve

`c:\laragon\www\testexcel>php spark serve`

5. Open browser with this url: http://localhost:8080/

## Screenshoot
![Capture1](https://raw.githubusercontent.com/skuadron45/testexcel/main/.github/Capture1.PNG)

![Capture2](https://raw.githubusercontent.com/skuadron45/testexcel/main/.github/Capture2.PNG)

![Capture3](https://raw.githubusercontent.com/skuadron45/testexcel/main/.github/Capture3.PNG)

![Capture4](https://raw.githubusercontent.com/skuadron45/testexcel/main/.github/Capture4.PNG)

![Capture5](https://raw.githubusercontent.com/skuadron45/testexcel/main/.github/Capture5.PNG)

## Server Requirements

PHP version 7.3 or higher is required, with the following extensions installed:


- [intl](http://php.net/manual/en/intl.requirements.php)
- [libcurl](http://php.net/manual/en/curl.requirements.php) if you plan to use the HTTP\CURLRequest library
- [mbstring](http://php.net/manual/en/mbstring.installation.php)

Additionally, make sure that the following extensions are enabled in your PHP:

- json (enabled by default - don't turn it off)
- xml (enabled by default - don't turn it off)
- [mysqlnd](http://php.net/manual/en/mysqlnd.install.php)
