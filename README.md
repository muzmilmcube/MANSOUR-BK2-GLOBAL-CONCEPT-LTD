# MANSOUR BK2 GLOBAL CONCEPT LTD website

Responsive React, TypeScript, Vite and Tailwind landing page for the company's phone sales, accessories, spare parts and repair services.

## Run locally

```sh
npm install
npm run dev
```

Create a production build with `npm run build` and preview it with `npm run preview`.

## Add verified contact details

Edit `src/config.ts` and add the company's confirmed WhatsApp number (country code and digits only), telephone number and email address. Until then, enquiry and repair forms validate their fields and explain that the message has not been sent. They do not display a success state.

The product gallery shows categories only and uses “Price on enquiry”; it does not imply a specific model, stock count, price or brand. Product availability and pricing should be confirmed with the business before publication.
