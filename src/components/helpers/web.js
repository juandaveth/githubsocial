import React from 'react';
import ToolBar from '../toolBar';
import {
  View,
  WebView,
  StyleSheet,
} from 'react-native';

class Web extends React.Component{
  render(){
    return(
      <View style={styles.container}>
        <WebView url={this.props.url} />
      </View>
    )
  }
};

Web.propTypes = {
  url: React.PropTypes.string.isRequired
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6EF',
    flexDirection: 'column',
  }
});

module.exports = Web;
