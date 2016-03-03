import React from 'react';
import Message from './Message.js';
import mui from 'material-ui';
import Firebase from 'firebase';
import _ from 'lodash';
import connectToStores from 'alt/utils/connectToStores'; // bind a component to a store 
import ChatStore from '../stores/ChatStore';

var {Card, List, CircularProgress} = mui;

@connectToStores
class MessageList extends React.Component{
    
    constructor(props){
        
        super(props);
        
        this.state = {
            messages: {}            
        };
        
        /*
        // Get data from Firebase and render it 
        this.firebaseRef = new Firebase('https://rfwfapp.firebaseio.com/messages');
        this.firebaseRef.on("child_added", (msg) => {  
            
            if(this.state.messages[msg.key()]){
                return;
            }
            
            let msgVal = msg.val();
            msgVal.key = msg.key();
            this.state.messages[msgVal.key] = msgVal;
            this.setState({messages: this.state.messages});

        });
        
        this.firebaseRef.on("child_removed", (msg) => {
            
            var key = msg.key();
            delete this.state.messages[key];
            this.setState({messages: this.state.messages});
        });
        */
        
    }  
    
    static getStores(){
        return[ChatStore];
    }
    
    static getPropsFromStores(){
        return ChatStore.getState();
    }
        
/*       
       this.firebaseRef.on("value", (dataSnapshot) => {        
         
            var messagesVal = dataSnapshot.val();
            var messages = _(messagesVal)
            .keys()
            // projects each item in a collection 
            .map((messageKey) => {
                var cloned = _.clone(messagesVal[messageKey]);
                cloned.key = messageKey;
                
                return cloned;
            })            
            .value();
            
            this.setState({
               messages: messages 
            });
*/

    
    render(){
        
        let messageNodes = null;
        
        if(!this.props.messagesLoading){
            
            messageNodes = _.values(this.props.messages).map((message) => {
            
            return(
            <Message message={message}/>
            );            
        });
        
        }else{
        
        messageNodes = <CircularProgress mode="indeterminate" style={{paddingTop: 20, paddingBottom: 20, margin: '0 auto', display: 'block', width: '60px'}} />;
        
        }
        
               
        return(
        <Card style={{ flexGrow: 2, marginLeft: 30}}>
            <List>
              {messageNodes}
            </List>
          </Card>
        );        
    }
}

export default MessageList;