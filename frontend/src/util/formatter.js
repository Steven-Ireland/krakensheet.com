export function fmtModifier(number) {
  if (number >= 0) {
    return '+' + number;
  } else {
    return number;
  }
}

export function fmtClasses(classes) {
  let theseClasses = Object.keys(classes);
  theseClasses.sort((c1, c2) => classes[c1].level >= classes[c2].level);

  let retValue = '';
  for (let i = 0; i < theseClasses.length; i++) {
    retValue +=
      fmtProperWord(theseClasses[i]) + ' ' + classes[theseClasses[i]].level;
    if (i < theseClasses.length - 1) {
      retValue += ' / ';
    }
  }

  return retValue;
}

export function fmtProperWord(text) {
  let words = text.split(' ');
  return words.map(w => w.charAt(0).toUpperCase() + w.substring(1)).join(' ');
}
