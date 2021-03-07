import dotenv from 'dotenv';
import { ChatEngine } from 'react-chat-engine';
import '../../App.css';
import ChatFeed from './ChatFeed';
import Auth from '../Auth/Auth';

dotenv.config();


const Chat = () => {
    let user = '';
    user = JSON.parse(localStorage.getItem('profile'));
    if (!user) return <Auth />;

    if (user) return (
        <ChatEngine
        projectID={process.env.REACT_APP_SOCKET || '9f64e68c-0d84-4635-85ae-6fddc0309bd5'}
        height="100vh"
        userName={`${user?.result?.email}chat`}
        userSecret={`${user?.result?.email}chat1`}
        renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
        onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}
    />
    )
}

export default Chat;