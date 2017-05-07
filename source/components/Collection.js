var React = require('react');
var ReactDOMServer = require('react-dom/server');
var CollectionControls = require('./CollectionControls');
var TweetList = require('./TweetList');
var Header = require('./Header');

var Collection = React.createClass({
  createHtmlMarkupStringOfTweetList: function () {
    var htmlString = ReactDOMServer.renderToStaticMarkup(
        <TwitterList tweet={this.props.tweets} />
      );
    var htmlMarkup = {
      html: htmlString
    };
    return JSON.stringify(htmlMarkup);
  },
  getListOfTweetIds: function () {
    return Object.keys(this.props.tweets);
  },
  getNumberOfTweetsInCollection: function () {
    return this.getListOfTweetIds().length;
  },
  render: function () {
    var numberOfTweetsInCollection = this.getNumberOfTweetsInCollection();
    if (numberOfTweetsInCollection > 0) {
      var tweets = this.props.tweets;
      var htmlMarkup = this.createHtmlMarkupStringOfTweetList();
      // test
      console.log(htmlMarkup);
      var removeAllTweetsFromCollection = this.props.onRemoveAllTweetsFromCollection;
      var handleRemoveTweetFromCollection = this.props.onRemoveTweetFromCollection;
    }
    return (
      <div>
        <CollectionControls
            numberOfTweetsInCollection={numberOfTweetsInCollection}
            htmlMarkup={htmlMarkup}
            onRemoveAllTweetsFromCollection={removeAllTweetsFromCollection}
        />
        <TweetList
            tweets={tweets}
            onRemoveTweetFromCollection={handleRemoveTweetFromCollection}
        />
      </div>
    );
  }
});

module.exports = Collection;