export const decode = card => [
  card % 3,
  Math.floor(card / 3) % 3,
  Math.floor(card / 9) % 3,
  Math.floor(card / 27) % 3
];

export const encode = ([a, b, c, d]) => a + 3 * b + 9 * c + 27 * d;

export const isSET = ([card1, card2, card3]) => {
  return card3 === completeSET(card1, card2);
};

const completeSET = (card1, card2) => {
  const [a1, b1, c1, d1] = decode(card1);
  const [a2, b2, c2, d2] = decode(card2);

  const a3 = (6 - a1 - a2) % 3;
  const b3 = (6 - b1 - b2) % 3;
  const c3 = (6 - c1 - c2) % 3;
  const d3 = (6 - d1 - d2) % 3;

  return encode([a3, b3, c3, d3]);
};

const hasSet = cards => {
  let b = false;
  cards.forEach(c1 => {
    cards.forEach(c2 => {
      if (c1 !== c2 && cards.includes(completeSET(c1, c2))) {
        b = true;
      }
    });
  });
  return b;
};

export const newCards = () => {
  const cards = [];
  while (cards.length < 12) {
    const val = Math.floor(81 * Math.random());
    if (!cards.includes(val)) {
      cards.push(val);
    }
  }

  if (!hasSet(cards)) {
    cards[0] = completeSET(cards[1], cards[2]);
  }

  return cards.sort(() => 0.5 - Math.random());
};
