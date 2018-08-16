import React, {Component} from 'react';
import {
  Button,
  View,
  Image,
  Text,
  Platform
} from 'react-native';
import { createStackNavigator } from 'react-navigation';

class HomeScreen extends Component{
  // static navigationOptions={
  //   title:'Home',
  // }
  static navigationOptions=({navigation})=>{
    return {
      // title:navigation.getParam('otherParam','A Nested Details Screen'),
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      },
      // 使用图片做标题
      headerTitle:<LogoTitle />,
      headerRight:(
        <Button
          onPress={navigation.getParam('increaseCount')}
          title="+1"
          color={Platform.OS==='ios'?'#fff':null}
        />
      )
    }
  };
  componentDidMount(){
    this.props.navigation.setParams({increaseCount:this._increaseCount});
  };
  state = {
    count: 0,
  };
  _increaseCount = () =>{
    this.setState({count: this.state.count + 1})
  };
  render(){
    return (
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <Text>Home Screen</Text>
        <Text>Count: {this.state.count}</Text>
        <Button
        title="Go to Details"
        onPress={()=>this.props.navigation.navigate('Details',{
          itemId: 86,
          otherParam: 'anything you want here',
        })}
        />
      </View>
    )
  }
}

class DetailsScreen extends Component{
  static navigationOptions={
    title:'Details',
  }
  static navigationOptions=({navigation,navigationOptions})=>{
    const {params} = navigation.state;
    return {
      title:params? params.otherParam:'A Nested Details Screen',
      headerStyle:{
        backgroundColor: navigationOptions.headerTintColor,
      },
      headerTintColor: navigationOptions.headerStyle.backgroundColor,
    }
  }

  // static navigationOptions=({navigation})=>{
  //   return {
  //     title:navigation.getParam('otherParam','A Nested Details Screen'),
  //     headerStyle: {
  //       backgroundColor: '#f4511e',
  //     },
  //     headerTintColor: '#fff',
  //     headerTitleStyle: {
  //       fontWeight: 'bold'
  //     }
  //   }
  // }
  render(){
    const {navigation} = this.props;
    const itemId = navigation.getParam('itemId','NO-ID');
    const otherParam = navigation.getParam('otherParam','some default value');

    return(
      <View style={{ flex:1,alignItems:'center',justifyContent:'center'}}>
        <Text>Details Screen</Text>
        <Text>itemId: {JSON.stringify(itemId)}</Text>
        <Text>otherParam:{JSON.stringify(otherParam)}</Text>

        <Button
        title="Update the title"
        onPress={()=>this.props.navigation.setParams({otherParam:'Updated!'})}
        />

        <Button
        title="Go to Details...again"
        onPress={()=>this.props.navigation.push('Details')}
        />
        <Button
        title="Go back"
        onPress={()=>this.props.navigation.goBack()}
        />
        <Button
        title="Go Home"
        onPress={()=>this.props.navigation.navigate('Home')}
        />

        <Button
        title="Go First"
        onPress={()=>this.props.navigation.popToTop()}
        />
      </View>
    )
  }
}

class LogoTitle extends Component{
  render(){
    return (
      <Image
      source={require('./images/meh.png')}
      style={{width:30,height:30}}
      />
    )
  }
}

// const RootStack = createStackNavigator({
//   Home:{
//     screenLHomeScreen
//   },
// })

const RootStack = createStackNavigator({
  Home:HomeScreen,
  Details:DetailsScreen,
},{
  initialRouteName: 'Home',
  navigationOptions: {
    title:'A Nested Details Screen',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }
})

export default class App extends Component{
  render(){
    return <RootStack />
  }
}
