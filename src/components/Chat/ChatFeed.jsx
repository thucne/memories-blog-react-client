import MyMessage from './MyMessage';
import TheirMessage from './TheirMessage';
import MessageForm from './MessageForm';
import { useState } from 'react';

const ChatFeed = (props) => {
  const { chats, activeChat, userName, messages } = props;
  const chat = chats && chats[activeChat];
  const [color, setColor] = useState('rgb(100,100,100)');
  const [isSetColor, setIsSetColor] = useState(false);
  const {setLinear} = props;

  const random_rgba = () => {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgb(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ')';
  }

  const randomColor = () => {
    if (!isSetColor) {
      setColor(random_rgba);
      setIsSetColor(true);
    }
    return color;
  }

  const renderReadReceipts = (message, isMyMessage) => chat.people.map((person, index) => {
    if (person.last_read === message.id && person.person.avatar) {
      return (
        <div
          key={`read_${index}`}
          className="read-receipt"
          style={{
            float: isMyMessage ? 'right' : 'right',
            backgroundImage: person.person.avatar && `url(${person.person.avatar})`,
            margin: '3px 3px 3px 0px'
          }}
        />
      )
    } else if (person.last_read === message.id && !person.person.avatar) {
      randomColor();
      return (
        <div
          key={`read_${index}`}
          className="read-receipt"
          style={{
            float: isMyMessage ? 'right' : 'right',
            backgroundColor: `${color}`, 
            display: 'inline', 
            alignItems: 'center', 
            top: '50px',
            margin: '3px 3px 3px 0px',
            fontSize: '8px',
            color: 'white'
          }}
        >
          {`${person.person.username.charAt(0).toUpperCase()}${person.person.username.charAt(1).toUpperCase()}`}
        </div>
      )
    }
    return false;
  });

  const renderMessages = () => {
    const keys = Object.keys(messages);

    return keys.map((key, index) => {
      const message = messages[key];
      const lastMessageKey = index === 0 ? null : keys[index - 1];
      const isMyMessage = userName === message.sender.username;

      return (
        <div key={`msg_${index}`} style={{ width: '100%' }}>
          <div className="message-block">
            {isMyMessage
              ? <MyMessage message={message} />
              : <TheirMessage message={message} lastMessage={messages[lastMessageKey]} />}
          </div>
          <div className="read-receipts" style={{ marginRight: isMyMessage ? '18px' : '0px', marginLeft: isMyMessage ? '0px' : '68px' }}>
            {renderReadReceipts(message, isMyMessage)}
          </div>
        </div>
      );
    });
  };

  if (!chat) return <div />;

  return (
    <div className="chat-feed">
      <div className="chat-title-container">
        <div className="chat-title">{chat?.title}</div>
        <div className="chat-subtitle">
          {chat.people.map((person) => ` ${person.person.username}`)}
        </div>
      </div>
      {renderMessages()}
      <div style={{ height: '100px' }} />
      <div className="message-form-container">
        <MessageForm {...props} chatId={activeChat} setLinear={setLinear}/>
      </div>
    </div>
  );
};

export default ChatFeed;