export const brandLogos = Array.from({ length: 23 }, (_, index) => ({
  id: String(index + 1).padStart(2, "0"),
  image: `/logos/${String(index + 1).padStart(2, "0")}.jpeg`,
}));
