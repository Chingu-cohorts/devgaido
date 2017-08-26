import React from 'react';
import PropTypes from 'prop-types';

const SHORTNAME = 'devgaido';
const WEBSITE_URL = 'https://www.devgaido.com';

function renderDisqus() {
  if (window.DISQUS === undefined) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://${SHORTNAME}.disqus.com/embed.js`;
    document.getElementsByTagName('head')[0].appendChild(script);
  } else {
    window.DISQUS.reset({ reload: true });
  }
}

class DisqusThread extends React.Component {
  componentDidMount() {
    renderDisqus();
  }

  shouldComponentUpdate(nextProps) {
    return this.props.id !== nextProps.id ||
      this.props.title !== nextProps.title ||
      this.props.path !== nextProps.path;
  }

  componentDidUpdate() {
    renderDisqus();
  }

  render() {
    const { id, title, path, ...other } = this.props;

    if (process.env.BROWSER) {
      window.disqus_shortname = SHORTNAME;
      window.disqus_identifier = id;
      window.disqus_title = title;
      window.disqus_url = WEBSITE_URL + path;
      console.log(window.disqus_identifier, window.disqus_title, window.disqus_url);
    }

    return <div className="margin-top-small margin-bottom-huge" {...other} id="disqus_thread" />;
  }
}

DisqusThread.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default DisqusThread;
