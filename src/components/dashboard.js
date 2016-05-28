import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
} from 'react-native';

import Api from '../utils/api';
import Repositories from './repositories';
import Notes from './notes';
import Badge from './badge';

class Dashboard extends React.Component{
  // S4.P3: Estructura de los botones y colores con función
  makeBackground(btn){
    var obj = {
      flexDirection: 'row',
      alignSelf: 'stretch',
      justifyContent: 'center',
      flex: 1,
    }

    if(btn === 0){
      obj.backgroundColor = '#533C70';
    } else if (btn === 1){
      obj.backgroundColor = '#6386D8';
    } else {
      obj.backgroundColor = '#56C4B7';
    }

    return obj;
  }
  // S5.P7 Apuntar a la siguiente vista que quiero
  goToProfile(){
    this.props.navigator.push({
      name: 'profile',
      passProps: {userInfo: this.props.userInfo}
    });
  }
  goToRepos(){
    Api.getRepos(this.props.userInfo.login)
      .then((res) => {
        this.props.navigator.push({
          name: 'repositories',
          passProps: {
            userInfo: this.props.userInfo,
            repos: res
          }
        });
      });
  }
  // S8.P7 Pegar en Navigator
  goToNotes(){
    Api.getNotes(this.props.userInfo.login)
      .then((res) => {
        res = res || {};
        this.props.navigator.push({
          name: 'notes',
          passProps: {
            notes: res,
            userInfo: this.props.userInfo
          }
        });
      });
  }
  render(){
    return (
      <View style={styles.mainContainer}>
        <View style={styles.navBar}>
          <View style={styles.toolBar}>
            <View style={[styles.backButton, this.border('green')]}>
              <Text>Buscar</Text>
            </View>
            <View style={[styles.title, this.border('blue')]}>
              <Text>Prueba</Text>
            </View>
          </View>
        </View>
        <View style={styles.container}>
          <View style={[styles.photoContainer]}>
            <Badge userInfo={this.props.userInfo} />
          </View>
          <View style={[styles.buttonsContainer]}>
            <TouchableHighlight
              style={this.makeBackground(0)}
              onPress={this.goToProfile.bind(this)}
              underlayColor="#88D4F5">
              <Text style={styles.buttonText}> Ver Perfil </Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={this.makeBackground(1)}
              onPress={this.goToRepos.bind(this)}
              underlayColor="#88D4F5">
              <Text style={styles.buttonText}> Ver Repositorios </Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={this.makeBackground(2)}
              onPress={this.goToNotes.bind(this)}
              underlayColor="#88D4F5">
              <Text style={styles.buttonText}> Ver Notas </Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    )
  }
  border(color) {
    return {
      borderColor: color,
      borderWidth: 1,
    }
  }
};

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  navBar: {
    height: 60,
  },
  toolBar: {
    flexDirection: 'row',
  },
  backButton: {
    flex: 1,
  },
  title: {
    flex: 1
  },
  container: {
    flex: 1
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
  },
  photoContainer: {
    flex: 1,
  },
  buttonsContainer: {
    flex: 1,
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  }
});

module.exports = Dashboard;
