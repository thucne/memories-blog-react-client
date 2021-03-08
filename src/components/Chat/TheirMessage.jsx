import { useState } from 'react';

const TheirMessage = ({ lastMessage, message }) => {
  const isFirstMessageByUser = !lastMessage || lastMessage.sender.username !== message.sender.username;
  const [color, setColor] = useState('rgb(100,100,100)');
  const [isSetColor, setIsSetColor] = useState(false);

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

  !(message.sender && message.sender.avatar !== null) && randomColor();

  return (
    <div className="message-row">
      {isFirstMessageByUser && (
        <div
          className="message-avatar"
          style={(message.sender && message.sender.avatar !== null) ? { backgroundImage: `url(${message.sender.avatar})` } : { backgroundColor: `${color}`, display: 'inline', alignItems: 'center', top: '50px' }}
        >
          {isSetColor && <div style={{top: '10px', position: 'relative'}}>{`${message.sender.username.charAt(0).toUpperCase()}${message.sender.username.charAt(1).toUpperCase()}`}</div>}
        </div>
      )}
      {message.attachments && message.attachments.length > 0
        ? (
          <img
            src={message.attachments[0].file}
            alt="message-attachment"
            className="message-image"
            style={{ marginLeft: isFirstMessageByUser ? '4px' : '48px' }}
          />
        )
        : (
          <div className="message" style={{ float: 'left', backgroundColor: '#CABCDC', marginLeft: isFirstMessageByUser ? '4px' : '48px' }}>
            {message.text}
          </div>
        )}
    </div>
  );
};

export default TheirMessage;