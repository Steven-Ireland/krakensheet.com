const sanitizeKey = text => {
  const lowerCaseNoSpace = text.replace(/[\W_]+/g, '').toLowerCase();
  const notPlural = lowerCaseNoSpace.replace(/s$/, '');

  return notPlural;
};

const sanitizeKeyUnderscores = text => {
  const lowerCaseNoSpace = text.trim().replace(/[\W_]+/g, '_').toLowerCase();
  const notPlural = lowerCaseNoSpace.replace(/s$/, '');

  return notPlural;
};

const sanitizeValue = text => {
  const startsAtLetter = text.replace(/^[\W]+/, '');

  return startsAtLetter;
};

const sanitizeCopyright = text => {
  return text.trim();
};

const sanitizeAlphaNumericOnly = (text, replacement = '') => {
  return text.replace(/[^a-zA-Z0-9]/g, replacement);
};

const sanitizeAlphaNumericDashOnly = (text, replacement = '') => {
  return text.replace(/[^a-zA-Z0-9\-]/g, replacement);
};

const sanitizeExtraSpaces = (text) => {
  return text.replace(/\s+/g, ' ').trim();
}

const sanitizeSpellTitle = (text) => {
  return text.replace(/\’/g, '\'');
}

const sanitizeUnchained = (text) => {
  return text.replace(/unchained /g, '');
}

const sanitizeSpellsPerDayValue = (text) => {
  return text.replace(/\+.*/g, '')   // Strip domain +1
             .replace(/[^\d]/g, ''); // Return only numbers
}

const parseCopyright = $ => {
  return sanitizeCopyright(
    $('.section15 div, .section15 p')
      .eq(1)
      .text()
  );
};

module.exports = {
  parseCopyright,
  sanitizeValue,
  sanitizeAlphaNumericOnly,
  sanitizeAlphaNumericDashOnly,
  sanitizeExtraSpaces,
  sanitizeSpellTitle,
  sanitizeSpellsPerDayValue,
  sanitizeUnchained,
  sanitizeKeyUnderscores,
  sanitizeKey
};
