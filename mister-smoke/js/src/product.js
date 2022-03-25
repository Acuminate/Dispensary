import { transformPrice } from "./utils/transformPrice.js";

export function Product(product) {
  /* html */
  return `
    <div class="col-sm-6 col-lg-4">
      <article class="product-classic">
        <div>
          <figure class="link-image image-block">
            <img
              src="${product.image}"
              alt="${product.name}"
              width="560"
              height="600"
              loading="lazy"
            />
          </figure>
          <div class="product-classic-widgets">
            <div class="product-classic-badges badge-list">
              <a class="badge badge-${
                product.disponibility === "sale" ? "primary" : "secondary"
              }" href="#">${product.disponibility}</a>
            </div>
            <div class="product-classic-rating">
              <div className="product-classic-rating">
                <div className="rating">
                  <div className="rating-empty">
                    <div class="price-current">THC ${product.thc}%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="product-classic-body">
          <h5 class="product-classic-title">
            <a href="single-product.html">${product.name}</a>
          </h5>
          <div class="product-classic-price price">
            ${
              !product.discountPrice
                ? ""
                : `<div class="price-old">${transformPrice(product.totalPrice)}</div>`
            }
            <div class="price-current">${
              product.discountPrice
                ? transformPrice(product.discountPrice)
                : transformPrice(product.totalPrice)
            }</div>
          </div>
        </div>
      </article>
    </div>`;
}
