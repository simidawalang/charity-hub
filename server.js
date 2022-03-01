const { createServer } = require("http");
const next = require("next");

const app = next({
    dev: process.env.NODE_ENV !== 'production'
});