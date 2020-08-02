const timeOfDay = str => {
  if (str.charAt(8) === 'P') {
    return true;
  } else {
    return false;
  }
}

const timeOfDay = str => {
  return str.charAt(8) === 'P';
}