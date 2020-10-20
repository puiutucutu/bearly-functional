export const composeThree = (f) => (g) => (h) => (x) => f(g(h(x)));
