# Brief

To construct a fully functioning in-browser calculator

## Thoughts before beginning

Oh God... I can feel that I'm going to get stuck on this one at various points. However, since for the last few projects (which felt more like an execise and less like a summary of your current ability) I paid little to no attention to presentational concerns, here I'm going to really 'spit and polish' the way it looks. I won't move on until I'm really happy with it.

## Thoughts after completion

Well... That was both incredibly satisfying and incredibly exhausting! I feel like it took weeks, but actually it was only 5 days, it was just that I spent so long thinking about it between (long) sessions. As mentioned, I really wanted to push myself, not say no to anything for feeling it was beyond my ability, which I'm happy to say is largely the case. This definitely isn't definitive code, it was definitely about finding *a* solution rather than *the* solution or I'd spend 5 times as long reviewing and rewriting when I already feel I relatively overcooked the exercise by setting myself many additional parameters.

The main parameter was:

**Don't be the Google calculator**

I really wanted a calculator that people might *actually* choose to use, myself even since I'm not particularly satisfied by the calculator included in Ubuntu. I wanted an 'old-school' calculator, one like I had at school, with a simple 8-digit display and no E notation. This meant setting several sub-parameters:

- Fixed 8 digit (with permanent decimal point)
- Togglable display operator indicators
- Expansion of E notation as necessary (e.g. 1e-7 expanded to 0.0000001)
- Error for invalid values (not just `x / 0`, but values unable to be expressed in 8 digits such as 100000000, 10000000.1, 0.00000001 etc.)

Being a perfectionist (and seeing that features were missing from or broken in all other student solutions), I also tried to add a lot of traditional calculator functionality:

- % button (functional with all operators)
- Memory functions
- Negative value support

Some additional functionality:

- Randomly generated background

As well as all Odin-suggested 'extra credit' parameters:

- Floating point input
- Good presentation
- Backspace key
- Keyboard support

Basically, I didn't want to come away and feel the project was in any way 'half-baked', as I feel for my previous projects.

I did, however, leave certain features in which make it less like a traditional calculator but to correct would mean removing functionality:

- Backspace works on memory recall, I think on the old calculators it would reset to 0 but people might feasibly want to edit a recalled memory value
- Moving negative minus, on old calculators it would permanently be on the left of the number display but ultimately it was more complication for decreased readability

I am very aware of the following less-than-perfect solutions:

- The background text is inserted in to a `<p>` element when cosmetic text should be separated from the main HTML, however it's generated in JS and from what I understand the `::before` element text content cannot be modified this way, at least in vanilla
- Equally, I just generate 60000 characters whatever happens, which is a lot of wasted processing for small screens! The benefit of not generating text based on viewport size (if possible at all) is not requiring additional calculations on window resizing. I'm willing for the page to take .3s to render at this level of ability
- Were I a mathematician I'm sure I'd have gone about my answer formatting much more logically
- I'm aware that the 3D effect is 'fudged' with two linear box shadows, but it serves its purpose for me
- Keyboard controls should really only be displayed for keyboard users, which is why I made them displayable on keypress, but ultimately it should be a separate box or something readable while operating the calculator
- The calculator fits on small screens, but many more media query based options could be added for better formatting and added features
- To fit my decision to make a fixed-digit display, I had to make some decisions about formatting:
  - 100000000 (too long) = `'error'`
  - 10000000.1 (inexpressible) = `'error'`
  - 0.00000001 (inexpressible) = `'error'`
  - 1000.00001 (inexpressible while distinguishing from integer) = `'error'`
  - 1000.10001 = `1000.1` (even though this means 1000.1 + 0.00001 = 1000.1)

All that said, it seems I have a solid calculator in its current form, and I intend to use it myself in future, which I would call a success. At no point was I really 'stumped', as everything seemed logical (although time-consuming) once the original 'array of strings' approach was decided upon. It's also relatively future-proofed, that is to say:

- Digit display derived from a constant (`digits = 8`), which when changed modifies number formatting throughout the page
- Array-based solution leaves door open for a scientific calculator which displays the equation
- I know my `e-7` formatting is relatively clumsy, but by extracting the power (`7`) again I can in future choose how to display numbers (e.g. `1e-7` displayed as `1 × (10 * ^ -7)` or similar) as suits readability

## Areas for improvement

Apart from all of the examples above of features which could be at least optimised, I noticed the following:

### Take breaks!!!

I'm still really bad at this. I try to pomodoro but inevitably 'I'll just finish this first' becomes another 50mins after the session ended.

### toFixed() vs toPrecision()

I understand the difference but struggle to imagine solutions based on them. I end up trying both and fiddling until I have the code I want. More pracice needed.

### Function separation

I'm aware of the principal of separating functions in to sub-functions for the DRYest code possible and the most 'single purpose' functionality possible, but it still seems like more lines of code than if 2 lines of code repeat in 2 functions, to rewrite it is 4 lines but to declare it as a function and envoke it in each is 6 lines. Again, I had to decide how much I wanted to future-proof the code considering it will only ever be a variation of its current form.

## Lessons learned

### Know all the functionality you want at the end before you begin

I was able to future proof some aspects of my code, but I think if I wanted the above-mentioned left side minus I would have to rewrite a lot of code

### Decide when it's 'done'

I could keep tweaking and tweaking and tweaking this thing, but inevitably there's a line between perfectionism and obsession. In my opinion the code is in a state where the best thing I can do is to move on.