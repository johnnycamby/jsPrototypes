import React from 'react';
import mui from 'material-ui';
import trim from 'trim';
//import $ from 'jquery';
//import toastr from 'toastr';
//import Firebase from 'firebase';
import Actions from '../actions';


var {Card} = mui;

class MessageBox extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            message: ''
        }
        
        //this.firebaseRef = new Firebase('https://rfwfapp.firebaseio.com/messages');
    }
    
    onChange(evt){
        this.setState({
            message: evt.target.value 
        });
    }
    
    onKeyUp(evt){
        if(evt.keyCode == 13 && trim(evt.target.value) != ''){
            evt.preventDefault();
           
            /*
            this.firebaseRef.push({
                message: this.state.message
            });
            */
            
            Actions.sendMessage(this.state.message);
            
            this.setState({
                message: ''
            });
            
           // toastr.success('Successfully sent a new message: ', evt.target.value);
           // console.log('Successfully sent a new message: ', evt.target.value);
        }
    }
    
    render(){
        return (            
            <Card style={{maxWidth: 1200, margin: '30px auto', padding: 30}}>
            <textarea value={this.state.message} onKeyUp={this.onKeyUp.bind(this)}  onChange={this.onChange.bind(this)}  style={{width: '100%', borderColor: '#d0d0d0', resize: 'none', borderRadius: 3, minHeight: 50, color: '#555', fontSize:14, outline: 'auto 0px'}} />
            </Card>             
        );
    }
}

export default MessageBox;