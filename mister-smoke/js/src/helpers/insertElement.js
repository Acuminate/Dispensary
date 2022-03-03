export function insertElement() {
  const productFilterBadges = document.querySelector(".product-filter-badges");
  const div = document.createElement("div");
  div.classList.add("row");
  div.classList.add("row-50");

  productFilterBadges.insertAdjacentElement("afterend", div);

  return div;
}
