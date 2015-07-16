# check-and-format-number
To reformat a number using a format string '-£#,##0.##0 /m', '(33 years)', '$ -99.00'.

Checks that the number is a valid number.
Based on the format string checks length and whether negative values permitted, pads with zeros/rounds and adds prefix and suffix characters

## Format String Can Include:
- negative signs before or after prefix text
- brackets as negative signs
- prefix and suffix texts
- `.` or `,` as decimal point
- space or `.` or `,` as thousand separators
- space or `.` or `,` as thousanths separators
- `#`, `9` or `0` as number place holders

## Format Notes and Examples

### Decimal points/thousands separators in the format string:
If a format ends in a . or , then this will be taken as the decimal character UNLESS the same character is used elsewhere so:
- `'923324234','#,###.'`  returns '923,324,234'
- `'923324234','#.###,'`  returns '923.324.234'

If a format only has one of ',' or '.' and the character only appears once it is taken as the decimal point
- `'92332,4234','#,###'`  returns '92332,4234'
- `'92332.4234','#.###'`  returns '92332.4234'

If the character appears twice in the format string it is a separator
- `'92332,4234','#,###,###'`  returns '923,324,234'
- `'92332,4234','#.###.###'`  returns error - value must be an integer

When in doubt '.' in the format string is the decimal point, so 
- `'92332,4234.45645','#.###,#'` returns '923324234.456, 45
To create the same structure with decimalChar as ',', just add a '.' at start or end or extend expression eg
- `.#.###,#`
- `#.###,#.`
- `#.###.###,#`

### Padding
A `0` will pad to that position
- `'92332.42','## ##0.##0 ##'`  returns '92 332.420'
- `'.42','## ##0.##0 ##'`  returns '0.420'

### Maximums
A `0` or `9` in the last decimal space will cause rounding to that number of places
- `'92332.42467','## ##0.##0'`  returns '92 332.425'
A `0` or `9` in the first integer position will limit the size
- `'92332.42467','9 ##0.##0'`  returns 'error - number too large''

### Negatives
- `'-2332.42343','(# ###.### #)'`  returns '(2 332.423 43)'
- `'-2332.42343','- # ###.### #)'`  returns '- 2 332.423 43'
- `'-2332.42343','# ###.### #-'`  returns '(2 332.423 43-)'
- `'-2332.42343','# ###.### #'`  returns 'error - must be positive'

### Units/Prefix Text
Units can be before or after negative symbols.
Prefix text cannot contain number placeholder characters
`'-23342456,2343278', '$(# ###.### #) per year'` returns '$(23 342 456.234 327 8) per year'
`'-23342456,2343278', '($# ###.### # per year)'` returns '($23 342 456.234 327 8 per year)'
`'-9,342,456.2353278', '$9 ### ##0.00# ###- per year'` returns '$9 342 456.235 327 8- per year';
`'-9,342,456.2353278', '-$9 ### ##0.00# ### per year'` returns '-$9 342 456.235 327 8 per year';

## Does not work for:
- structured reference numbers, eg 9999-9999
- ignores and removes leading and trailing spaces (but retains those between pre/post fix and negative symbols etc)