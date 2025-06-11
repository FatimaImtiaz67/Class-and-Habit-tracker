// src/utils/checkClassCodeExistence.js

export default function checkClassCodeExistence(classes, currentClass, code) {
  return classes.some(
    (cls) => cls.code === code && cls.id !== currentClass?.id
  );
}
