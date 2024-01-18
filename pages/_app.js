import '../styles/globals.css';
import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import Router from 'next/router';

ReactGA.initialize('G-5M85BYFVWC');

function trackPageView(url) {
  ReactGA.set({ page: url });
  ReactGA.pageview(url);
}

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Track the initial pageview
    trackPageView(window.location.pathname);

    // Listen for page changes after a navigation or when the URL changes
    Router.events.on('routeChangeComplete', trackPageView);

    // Cleanup the listener on unmount
    return () => {
      Router.events.off('routeChangeComplete', trackPageView);
    };
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
