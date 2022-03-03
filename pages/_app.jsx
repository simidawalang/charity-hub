import Layout from "../components/Layout";
import "semantic-ui-css/semantic.min.css";
import "../scss/style.scss";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
