import ReactGA from "react-ga";

export const initGA = () => {
  ReactGA.initialize("G-DYQLVBYP7G"); // Ganti dengan ID pelacakan Anda
};

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};
