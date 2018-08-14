/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text, View,
  TextInput,
  Button,
  ScrollView,
  Dimensions,
  ListView,
  Alert,
  TouchableHighlight,
  StatusBar,
  Image
} from 'react-native';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const ds = new ListView.DataSource({
  rowHasChanged:(r1,r2,)=> (r1!==r2)
})

type Props = {};
export default class App extends Component<Props> {
  constructor(Props){
    super(Props);
    this.state = {
      searchText:'',
      currentPage:0,
      dataSource:ds.cloneWithRows([
        "商品1",
        "商品2",
        "商品3",
        "商品4",
        "商品5",
        "商品6",
        "商品7",
        "商品8",
        "商品9",
        "商品10"
      ]),
      advertisements:[
        { //
          image: require('./images/advertisement-img-1.jpg'),
          url:'http://img1.gtimg.com/rcdimg/20180812/10/3108373175_273x145.jpg',
          title: '广告111',
          backgroundColor: 'gray'
        },{
          image: require('./images/advertisement-img-2.jpg'),
          url:'http://img1.gtimg.com/rcdimg/20180812/13/3731471599_273x145.jpg',
          title: '广告2222',
          backgroundColor: 'orange'
        },{
          image: require('./images/advertisement-img-3.jpg'),
          url:'http://img1.gtimg.com/ninja/2/2018/08/ninja153411020684932.jpg',
          title: '广告3333',
          backgroundColor: 'yellow'
        }
      ]
    };
  }
  render() {
    return (
      // <View style={styles.container}>
      //   <Text style={styles.welcome}>Welcome to React Native!</Text>
      //   <Text style={styles.instructions}>To get started, edit App.js</Text>
      //   <Text style={styles.instructions}>{instructions}</Text>
      // </View>
      <View style={styles.container}>
        <StatusBar backgroundColor={'blue'}
          barStyle={'default'}
          networkActivityIndicatorVisible={true}> // 显示正在请求网络的状态
        </StatusBar>
         <View style={styles.searchbar}>
            <TextInput style={styles.input} placeholder='搜索商品'
              onChangeText={(text)=>{
                this.setState({searchText:text});
                console.log('输入的内容是'+this.state.searchText)
              }}>
            </TextInput>
            <Button style={styles.button} title='搜索' onPress={()=>Alert.alert('搜索内容:' + this.state.searchText ,null,null)}></Button>
        </View>
        <View style={styles.advertisement}>
          <ScrollView ref="scrollView"
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            >
            {this.state.advertisements.map((advertisement,index)=>{
              return (
                <TouchableHighlight key={index} onPress={()=>Alert.alert('你点击了轮播图',null,null)}>
                  <Image style={styles.advertisementContent} source={advertisement.image}
                  ></Image>
                </TouchableHighlight>
              )
            })}
          </ScrollView>
          <View style={[
            styles.indicator,{
              left:left
              }
            ]}>
            {this.state.advertisements.map((advertisement,index)=>{
              return (
                <View key={index}
                  style={(index === this.state.currentPage)
                    ? styles.circleSelected
                    : styles.circle} />);
                }
              )}
          </View>
        </View>
        <View style={styles.products}>
          <ListView dataSource={this.state.dataSource} renderRow={this._renderRow}>

          </ListView>
        </View>

      </View>
    );
  }
  componentDidMount(){
    this._startTimer();
  }
  componentWillUnmount(){
    clearInterval(this.interval)
  }
  _startTimer(){
    this.interval = setInterval(()=>{
      nextPage = this.state.currentPage + 1;
      if(nextPage>=3){
        nextPage=0;
      }
      this.setState({currentPage:nextPage})

      // 计算 scrollView 滚动的X轴偏移量
      const offSetX = nextPage * Dimensions.get('window').width;
      this.refs.scrollView.scrollResponderScrollTo({x:offSetX,y:0,animated:true});
    },2000);
  }
  _renderRow = (rowData,sectionID,rowID)=>{
    return(
      <View style={styles.row}>
        <TouchableHighlight onPress={()=>Alert.alert('你点击了商品列表',null,null)}>
          <Text>
            {rowData}
          </Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchbar:{
    marginTop: Platform.OS === "ios"
             ? 20
             : 0,
    height:40,
    flexDirection:'row'
  },
  advertisement:{
    height: 180,
  },
  products:{
    flex:1,
    backgroundColor:'blue',
    justifyContent:'center',
    alignItems:'center'
  },
  input:{
    flex: 1,
    borderColor:'gray',
    borderWidth: 2,
    borderRadius: 10
  },
  button:{
    flex:1
  },
  row:{
    height:60,
    justifyContent:'center',
    alignItems:'center'
  },
  advertisementContent:{
    width: Dimensions.get('window').width,
    height: 180
  },
  indicator:{
    position: 'absolute',
    top: 160,
    flexDirection: 'row'
  },
  circle:{
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize/2,
    backgroundColor: 'gray',
    marginHorizontal: circleMargin
  },
  circleSelected:{
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize/2,
    backgroundColor: 'white',
    marginHorizontal: circleMargin
  }
});
