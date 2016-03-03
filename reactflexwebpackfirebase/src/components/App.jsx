import React from 'react';
// import MessageList from './MessageList.jsx';
// import ChannelList from './ChannelList.jsx';
// import MessageBox from './MessageBox.js';
// import Chat from './Chat.js';
import mui from 'material-ui';
// import Login from './Login.jsx';
// import connectToStores from 'alt/utils/connectToStores';
// import ChatStore from '../stores/ChatStore';
import {RouteHandler} from 'react-router';
    
var ThemeManager = new mui.Styles.ThemeManager();
var Colors = mui.Styles.Colors;
var AppBar = mui.AppBar;

// @connectToStores
class App extends React.Component
{
    
    constructor()
    {
        super();
        
        ThemeManager.setPalette({
            
            primary1Color: Colors.blue500,
            primary2Color: Colors.blue700,
            primary3Color: Colors.blue100,
            accentColor: Colors.maroon400
        });
       
    }
    
    /*  
    static getStores(){
        return [ChatStore];
    }
    
    static getPropsFromStores(){
        return ChatStore.getState();
    }
    
    */
    
    
    // declare variables
    static childContextTypes = {
      muiTheme: React.PropTypes.Object  
    }
     
    getChildContext(){
        return{
            muiTheme: ThemeManager.getCurrentTheme()
        };
    }
        
    
    render(){ 

/*
      var view = <Login />;
      
      if(this.props.user){
      
      view = <Chat />;
      }
*/      
      
      return(
      <div>
        <AppBar title="Awesome Chat App" />        
        <RouteHandler />
      </div>
      );   
   
    }
}

export default App;