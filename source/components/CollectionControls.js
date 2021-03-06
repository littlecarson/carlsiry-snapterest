var React = require('react');
var Header = require('./Header');
var Button = require('./Button');
var CollectionRenameForm = require('./CollectionRenameForm');
var CollectionExportForm = require('./CollectionExportForm');
var CollectionActionCreators = require('../actions/CollectionActionCreators');
var CollectionStore = require('../stores/CollectionStore');


var CollectionControls = React.createClass({
  getInitialState: function () {
    return {
      isEditingName: false
    };
  },
  getHeaderText: function () {
    var numberOfTweetsInCollection = this.props.numberOfTweetsInCollection;
    var text = numberOfTweetsInCollection;
    var name = CollectionStore.getCollectionName();

    if (numberOfTweetsInCollection === 1) {
      text = text + ' tweet in your';
    } else {
      text = text + ' tweets in your';
    }

    return (
      <span>
        {text} <strong> {name} </strong> collection
      </span>
    );
  },
  toggleEditCollectionName: function () {
    this.setState({
      isEditingName: !this.state.isEditingName
    });
  },
  removeAllTweetFromCollection: function () {
    CollectionActionCreators.removeAllTweetFromCollection();
  },
  setCollectionName: function (name) {
    this.setState({
      name: name,
      isEditingName: false
    });
  },
  render: function () {
    if (this.state.isEditingName) {
      return (
        <CollectionRenameForm
            onCancelCollectionNameChange={this.toggleEditCollectionName}
        />
      );
    }
    return (
      <div>
        <Header text={this.getHeaderText()} />
        <Button label="Rename collection"
            handleClick={this.toggleEditCollectionName}
        />
        <Button label="Empty collection"
            handleClick={this.removeAllTweetFromCollection}
        />
        <CollectionExportForm htmlMarkup={this.props.htmlMarkup} />
      </div>
    )
  }
});

module.exports = CollectionControls;
