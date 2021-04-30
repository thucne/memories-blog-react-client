import dotenv from 'dotenv';
import { ChatEngine } from 'react-chat-engine';
import '../../App.css';
import ChatFeed from './ChatFeed';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ModalNotification from '../ModalNotification/ModalNotification';
import MetaTags from 'react-meta-tags';
import {ReactTitle} from 'react-meta-tags';
dotenv.config();


const Chat = (props) => {
    const history = useHistory();

    let user = '';
    user = JSON.parse(localStorage.getItem('profile'));

    if (!user) { history.push('/auth') }
    const noti = useSelector((state) => {
        if (state.noti.noti.length) {
            return state.noti.noti.filter((no) => no.link === '/chat')
        }
        return [];
    });
    const { setLinear } = props;

    return (
        <div style={{position: 'relative', marginTop: '90px'}}>
            <ReactTitle title='MEmories / Chat' />
            <MetaTags>
                <meta id='metaid5' property="og:image"
                    content="https://res.cloudinary.com/katyperrycbt/image/upload/v1619797100/CCV_kkl9lo.png" />
            </MetaTags>
            {
                noti.length ? <ModalNotification noti={noti} /> : <></>
            }
            <ChatEngine
                projectID={process.env.REACT_APP_SOCKET}
                height="100vh"
                userName={`${user?.result?.email}chat`}
                userSecret={`${user?.result?.email}chat1`}
                renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} setLinear={setLinear} />}
                onNewMessage={() => { new Audio('https://res.cloudinary.com/katyperrycbt/video/upload/v1615222391/juntos-607_k7pgr8.ogg').play(); setLinear(false) }}
            />
        </div>
    )
}

export default Chat;