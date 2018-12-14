//
// Imports
//
import {withRouter} from 'next/router'

// Import fetch library
import fetch from "isomorphic-unfetch";

//(free version) API key from  https://newsapi.org/
// Get your own key!
const apiKey = "3780066b33ef41b9b4b7e957994e9c38";

// Initial News source
const defaultNewsSource = "the-irish-times";

//
// async method fetches and returns data from a url
//
async function getNews(url) {
  // try fetch and catch any errors
  try {
    // Make async call
    const res = await fetch(url);
    // get json data when it arrives
    const data = await res.json();
    // return json data
    return data;
  } catch (error) {
    // return error if it occurs
    return error;
  }
}

//
//  The News page defined as an ES6 Class
//

class Article extends React.Component {
  // Constructor
  // Recieve props and initialise state properties
  constructor(props) {
    super(props);
    this.state = {
		id: this.props.index /*Trying to retrieve the index passed into this page */
	};
  }

  //
  // render() method generates the page
  //
  render() {
    let ids =0;
    
    let article = this.props.articles[ids]; /*Same as stated above, was hoping this would initialize ID to the value passed in */

    return (
      <div>
        {/* Display a title based on source */}
        <h3>{defaultNewsSource.split("-").join(" ")}</h3>
        <div>
          
          <section>
		  
			<h3>{article.title}</h3>
			<h3>{article.publishedAt}</h3>
			<h1>{article.description}</h1>
			<img src={article.urlToImage} alt="article image" className="img-article"></img>
			<h3>{article.content}</h3>
          </section>
          
        </div>
		

        <style jsx>{`
          /* CSS for this page */
          section {
            width: 50%;
            border: 1px solid gray;
            background-color: rgb(240, 248, 255);
            padding: 1em;
            margin: 1em;
          }

          .author {
            font-style: italic;
            font-size: 0.8em;
          }
          .img-article {
            max-width: 50%;
          }
        `}</style>
      </div>
    );
  }

  //
  // Get initial data on server side using an AJAX call
  // This will initialise the 'props' for the News page
  //
  static async getInitialProps(res) {
    // Build the url which will be used to get the data
    // See https://newsapi.org/s/the-irish-times-api
    
    const defaultUrl = `https://newsapi.org/v2/top-headlines?sources=${defaultNewsSource}&apiKey=${apiKey}`;

    // Get news data from the api url
    const data = await getNews(defaultUrl);

    // If the result contains and articles array then it is good so return articles
    if (Array.isArray(data.articles)) {
      return {
        articles: data.articles
      };
    }
    // Otherwise it contains an error, log and redirect to error page (status code 400)
    else {
      console.error(data);
      if (res) {
        res.statusCode = 400;
        res.end(data.message);
      }
    }
  }
} // End class

// export withRouter - enables this class to access React Router properties, e.g. to get the URl parameters
export default withRouter(Article)
