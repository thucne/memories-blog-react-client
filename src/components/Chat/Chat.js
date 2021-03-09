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
        projectID={process.env.REACT_APP_SOCKET}
        height="100vh"
        userName={`${user?.result?.email}chat`}
        userSecret={`${user?.result?.email}chat1`}
        renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
        onNewMessage={() => new Audio('https://res.cloudinary.com/katyperrycbt/video/upload/v1615222391/juntos-607_k7pgr8.ogg').play()}
    />
    )
}

export default Chat;