## About

![Screen](assets/screen.png?raw=true "Sales Tax")

Simple UI for adding items to a cart and calculating the tax of 5% on imported items, and 10% for all items other than food, medicine or books.
Tax is also rounded up to the nearest 5 cents, then added to the product's price.

This has only been ran on a 2021 Macbook Air.

## Project setup

```shell
git clone https://github.com/tylerbrownhenry/sales-taxes.git
cd sales-taxes
npm install
npm run dev
```

Then open http://localhost:3000/# to view the UI

## Running Tests 
```shell
npm run test
```

## Project structure

```
/dist   <- compiled JavaScript code goes here
/src    <- TypeScript source code lives here
/test   <- test files (**.test.ts) live     here
/public <- frontend lives here
```

## License

[MIT](./LICENSE)
