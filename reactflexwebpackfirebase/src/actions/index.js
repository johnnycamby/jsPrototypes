import alt from '../alt';
import Firebase from 'firebase';


class Actions{
    
    constructor(){
        this.generateActions(
            'channelsReceived',
            'channelsFailed',
            'messagesReceived',
            'messagesFailed',
            'channelOpened',
            'messagesLoading',
            'sendMessage',
            'messageSendSuccess',
            'messageSendError',
            'messageReceived'
        );
    }
    
    login(router){
        return (dispatch) => {
            var firebaseRef = new Firebase('https://rfwfapp.firebaseio.com');
            firebaseRef.authWithOAuthPopup("facebook", (error, user) => {
                if(error){
                    return;
                }
                
                dispatch(user);
                
                router.transitionTo('/chat');
            });
        }
    }
}

export default alt.createActions(Actions);