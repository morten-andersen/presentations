# No Such Thing as Plain Text


#### Let's start with ..

#### The least interesting thing today


#### Me 😏

Software developer at [Penni.io](https://penni.io)

Holds a *Master in Software Development*

20+ years of full time experience

Still curious on how things *actually* work ⚙️


#### 🤓 Academically Interested Geek 🤓



#### Back to the Subject


#### Text Encoding

Note: On the surface one of the things you use daily, but might not know how the computer actually stores text and strings.


Wondered why you are adding this on HTML pages?

```html
<meta charset="utf-8"/>
```

Note:
* charset?
* utf-8?


received emails like this?

![mail broken encoding](./unicode/images/mail-example-1.png)


or like this

![mail broken encoding](./unicode/images/mail-example-2.png)


when this is how the sender saw it

![mail good encoding](./unicode/images/mail-example-3.png)


#### The Answer and Solution


Just always use UTF-8

No discussion - period!



#### Computing is pop culture.

*Pop culture holds a disdain for history.*

*Pop culture is all about identity and feeling like you’re participating. It has nothing to do with cooperation, the past or the future—it’s living in the present. I think the same is true of most people who write code for money. They have no idea where [their culture came from].*

-- Alan Kay

Note:
* there was the note about me being an academically interested geek - so lets delve into this
* Alan Kay - early pioner on Object oriented programming and Turing award winner in 2003


#### So what is this UTF-8?


#### How is text represented in computer systems

Note: to understand that we will start with talking about how text is represented in computer systems


Computers can only understand numbers

🢃

so how do we represent

`A` or `a`

as a number


#### Going back - a bit of History

The early days of computing - 1960-80

* US centric computers
* inspired by typewriters
* ASCII (American Standard Code for Information Interchange)


#### ASCII - 1 byte

Encode 1 character in 1 byte

Use only 7 of the 8 bits in a byte

Numbers 0-127


#### 1 byte = 8 bits

![1 byte](./unicode/images/byte.png)

`64 + 32 + 2 = 98` which is lowercase `b`


#### US-ASCII

* 32 control characters
* 52 letters A-Z and a-z
  * uppercase and lowercase
* 10 digits 0-9
* 32 special characters `?.,()[]{}/\'"`
* space


#### ASCII Table

![ASCII](./unicode/images/01-asciifull.gif)

Note:
* CR - carriage return
* LF - line feed
* Unix + OS X: LF
* Windows: CR + LF
* Mac OS: CR


#### ASCII Table - old version

![ASCII](./unicode/images/03-ascii.png)


#### Fonts - has nothing to do with encoding

<span style="font-family: Times">A</span> in a Times New Roman font

is the same character as the

<span style="font-family: Helvetica">A</span> in a Helvetica font

but different from "a" in lower case,


#### Style - also has nothing to do with encoding

italic *A*

is the same character as the

bold **A**


#### Works perfectly in US

You are out of luck if your parents named you
* Александра (Bulgarian Aleksandra)
* Réne
* Søren
* Ailís (Irish form of Alice)
* 昭夫 or あきお (Japanese Akio)
* etc.

Note: https://www.behindthename.com/


You are also out of luck if you are writing mathematical formulas

`π ∀ ∈ ∑ ∩ ∫`

Note:
* pi (π)
* for all (∀)
* belong to (∈)
* sum (∑)
* intersection (∩)
* integral (∫)


Currency codes (except `$`) are also a no go

`£ ¥ ₩`

Note: Pound, Yen, Korean Won



#### Extended ASCII

US-ASCII only uses 7 bits (128 characters).

What about using the 8ᵗʰ bit ➜ 128 new characters

🢃

More than 220 different *code pages* for the 128 upper characters in a byte.


Vendor specific (IBM, HP, Microsoft, etc.)

Language specific

Note:
* *code page* is a term from the old IBM mainframes and EBCDIC encoding
* https://en.wikipedia.org/wiki/Code_page


![character encodings 1](./unicode/images/character-encodings-01.png)


![character encodings 2](./unicode/images/character-encodings-02.png)


So if you are in Denmark you set your machine to use

* DOS CP-850 (Western) or CP-865 (Denmark/Norway)
* Windows CP-1252 (Western)
* MacRoman

Note:
* they (of course) differs in the placement of characters.
* windows CP-1252 uses same placement as ISO-8859-1


#### A mess - standardized by ISO/IEC in 1987

ISO-8859-X

16 parts - ISO-8859-1 to 16

Note:
* ISO - International Organization for Standardization
* IEC - International Electrotechnical Commission


#### Western European - ISO-8859-1 (Latin 1)

![ISO-8819-1](./unicode/images/iso-8859-1-western-europe.gif)

Note:
* back in the Cold war days
* the most used
* 8859-15 - variant with €


#### Cyrillic - ISO-8859-5

![ISO-8819-5](./unicode/images/iso-8859-5-cyrillic.gif)


#### Arabic - ISO-8859-6

![ISO-8819-6](./unicode/images/iso-8859-6-arabic.gif)


#### Greek - ISO-8859-7

![ISO-8819-7](./unicode/images/iso-8859-7-greek.gif)


#### Hebrew - ISO-8859-8

![ISO-8819-8](./unicode/images/iso-8859-8-hebrew.gif)


#### History has holes

As always with standards - there are exceptions

No ISO-8859-12

should have been Celtic characters

later planned for Devanagari - used in India


#### Only 256 different characters

No support for East Asian characters

*Japanese - 日本語*

*Chinese - 漢語*

*Korean - 한국어*

many thousand characters

solved by 2 byte encodings (CJK) - 65.536 characters

Note:
* CJK - Chinese, Japanese, Korean
* Japanese: Nihongo - 128 million people
* Chinese: Traditional - 1.3 billion people
* Korean: Hangul - 77 million people
* 65.536 is not enough - more than 70.000 Chinese characters



### So problem solved?


as long ..
as you never moved a string from one computer to another,
or spoke more than one language,
it sort of always work


#### The Internet

Along comes the Internet and its early incarnations in the mid 1990's


Normal to "send" strings

from computer to computer

🢃

this setup breaks



#### Unicode

Note: First version in 1991


#### One Character Set to Rule Them All

Unicode ➜ a brave effort to create one **single character set** that includes every reasonable writing system on the planet


#### Misconception

Unicode is simply a 16-bit code where each character takes 16 bits and therefore there are 65,536 possible characters

🢃

**FALSE**

Note: remember - there are alone more than 70.000 Chinese characters


#### Codepoint and Encodings

Note: Unicode is split up in so called codepoints and encodings of these codepoints.


#### Code Point

Until now, we’ve assumed that a letter maps to some bits which you can store on disk or in memory

`A ➜ 0100 0001`


In Unicode, a letter maps to something called a

**code point**

which is still just a **theoretical concept**

Note: How that code point is represented in memory or on disk is a whole nuther story.


Every letter in every alphabet is assigned a code point by the Unicode consortium which is written like

`U+0639`

`U+` means Unicode - number in hexadecimal

`U+0639` is `ع` (Arabic letter Ain).
`U+0041` is `A`


🔗 <a href="https://www.unicode.org/charts/" target="_blank">Unicode charts</a>


#### Emojis

Remember this 🤓

Code point `U+1F913`


![U+1F913](./unicode/images/U1F913.png)


🔗 <a href="https://emojipedia.org/nerd-face/" target="_blank">https://emojipedia.org/nerd-face/</a>


#### Unbounded

There is no real limit on the number of letters that Unicode can define


#### Hello

Corresponds to these five code points

`U+0048 U+0065 U+006C U+006C U+006F`

Just a bunch of code points. Numbers, really.


We have not said anything about

**how**

to store this in memory / disk / network



#### Unicode Encodings

How to represent a code point in

memory / disk / network


#### Early idea

Store those numbers in two bytes each - UCS-2

So `Hello` becomes

`0048 0065 006C 006C 006F`

but it could also be

`4800 6500 6C00 6C00 6F00`

Note: UCS-2 fixed width used until Unicode 2.0


#### Confusion from the start

Already two encodings


#### How to differentiate?

big-endian byte order - `FE FF`

little-endian byte order - `FF FE`

🢃

Unicode Byte Order Mark (BOM)

Note: Start the file with the UTF-16 - BOM


#### On paper - a great idea

but ...

Programmers were complaining

> *Look at all those zeros!*

Note: they said, since they were Americans and they were looking at English text which rarely used code points above U+00FF


#### Another encoding - UTF-8

Code point from 0-127 is stored in a single byte

Code points 128 and above are stored using 2, 3 or 4 bytes

![UTF-8](./unicode/images/utf-8.png)

(limited to `10 FFFF` ~ 1.1 mill characters).

Note: brilliant concept of UTF-8. UTF-8 was another system for storing your string of Unicode code points, those magic U+ numbers, in memory using 8 bit bytes.


Neat side effect

🢃

English text looks exactly the same in UTF-8 as in ASCII

🢃

Americans don’t notice anything 🇺🇸🤠


Only the rest of the world has to jump through hoops


#### Unicode Discussions

Is the German letter ß a real letter or just a fancy way of writing ss?

If a letter’s shape changes at the end of the word, is that a different letter? Hebrew says yes, Arabic says no.

Note: scharfes S


#### Don't worry

> the smart people at the Unicode consortium have been figuring this out for the last 30 years, accompanied by a great deal of highly political debate, and you don’t have to worry about it. They’ve figured it all out already.


#### Demo Time

* hex editors
* internationalization conversion - iconv


```sh
iconv -f UTF-8 -t ISO-8859-15 utf-8.txt > iso8859.txt
```

```sh
iconv -f UTF-8 -t UTF-16 utf-8.txt > utf16.txt
```

```sh
ghex utf-8.txt utf16.txt iso8859.txt
```

Note:
* -f from encoding
* -t to encoding



#### Unicode Versions


| Version | Year | Scripts |   Chars | Notes       |
| :-----: | :--: | :-----: | ------: | ----------- |
|     1.0 | 1991 |    24   |   7.129 |             |
|     2.0 | 1996 |    25   |  38.885 |             |
|     3.0 | 1999 |    38   |  49.194 | Music nodes Runes |
|     4.0 | 2003 |    52   |  96.382 | Linear B    |
|     5.0 | 2006 |    64   |  99.024 |             |
|     6.0 | 2010 |    93   | 109.384 | 700 emojis  |

Note: Linear B - prehistoric Greek alphabet which it took more than 50 years to decipher


#### Version 14 currently in draft

![unicode v14](./unicode/images/unicode-v14.png)

Note:
* Tangsa spoken by 100.000 people
* Toto spoken by 1.000 people - endangered language
* https://en.wikipedia.org/wiki/List_of_endangered_languages_in_India


#### Script Encoding Initiative

![Script Encoding Initiative](./unicode/images/script-encoding-initiative.png)

Note:
* Berkely, University of California
* [Script Encoding Initiative](https://linguistics.berkeley.edu/sei/)



#### Getting it Right - W3C

World Wide Web Consortium

🔗 [The W3C Internationalization (I18n) Activity](https://www.w3.org/blog/international/)

Note: How do we use this in practice


![W3C - I18n](./unicode/images/w3c-01.png)


![W3C - I18n techniques](./unicode/images/w3c-02.png)


![W3C - I18n techniques - 1](./unicode/images/w3c-03.png)


![W3C - I18n techniques - 2](./unicode/images/w3c-04.png)


![W3C - I18n techniques - 3](./unicode/images/w3c-04-1.png)


![W3C - I18n techniques - 4](./unicode/images/w3c-05.png)


![W3C - I18n techniques - 5](./unicode/images/w3c-05-1.png)


![W3C - I18n techniques - 6](./unicode/images/w3c-06.png)


![W3C - I18n techniques - 7](./unicode/images/w3c-06-1.png)



#### W3C Validators

![W3C - I18n checker](./unicode/images/w3c-i18n-checker.png)


#### Validation Example

🔗 <a href="https://validator.w3.org/i18n-checker/check?uri=https%3A%2F%2Fwww.hackyourfuture.net%2F#validate-by-uri+" target="_blank">W3C - I18n checker ➜ hackyourfuture.net</a>


![hackyourfuture.net source](./unicode/images/w3c-i18n-checker-source.png)


#### Example with inconsistent meta and http headers

🔗 <a href="./unicode/no-encoding.html" target="_blank">ISO-8859-15 encoded</a>



#### We have reached the end of the string

> *It does not make sense to have a string or a text file without knowing what encoding it uses*



#### Resources

* 🔗 [Joel on Software - on Unicode](https://www.joelonsoftware.com/2003/10/08/the-absolute-minimum-every-software-developer-absolutely-positively-must-know-about-unicode-and-character-sets-no-excuses/)
* 🔗 [Programming with Unicode](https://unicodebook.readthedocs.io/index.html)
* 🔗 [Unicode programming, with examples](https://begriffs.com/posts/2019-05-23-unicode-icu.html)
* 🔗 [StackOverflow - *Unicode Support in Various Programming Languages*](https://stackoverflow.com/questions/1036585/unicode-support-in-various-programming-languages)
* 🔗 [UTF-8 history - 1992](https://www.cl.cam.ac.uk/~mgk25/ucs/utf-8-history.txt)


#### Tools

* 🔗 [W3C Internationalization Checker](https://validator.w3.org/i18n-checker/)
